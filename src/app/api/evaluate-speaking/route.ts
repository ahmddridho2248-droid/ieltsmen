import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { createClient } from '@/lib/supabase/server';

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    const { question, transcript, part } = await request.json();

    if (!question || !transcript) {
      return NextResponse.json(
        { error: 'Missing question or transcript in request body' }, 
        { status: 400 }
      );
    }

    const skillPath = path.join(process.cwd(), '.agents', 'skills', 'ielts-speaking-examiner.md');
    let systemInstruction = "";
    try {
      systemInstruction = fs.readFileSync(skillPath, 'utf-8');
    } catch (err) {
      console.warn("Could not read ielts-speaking-examiner skill file. Falling back to default.", err);
      systemInstruction = "You are an IELTS speaking examiner. Evaluate the response.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Question:\n${question}\n\nCandidate's Transcript:\n${transcript}`,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for consistent grading
      }
    });

    if (!response.text) {
        throw new Error("No response generated from Gemini");
    }

    // Parse scores from markdown output
    const extractScore = (text: string, regex: RegExp): number | null => {
      const match = text.match(regex);
      if (match && match[1]) {
        const score = parseFloat(match[1]);
        return isNaN(score) ? null : score;
      }
      return null;
    };

    const overallScore = extractScore(response.text, /Overall Band Score:\s*([\d.]+)/i);
    const fcScore = extractScore(response.text, /Fluency and Coherence:\s*\**\s*([\d.]+)/i);
    const lrScore = extractScore(response.text, /Lexical Resource:\s*\**\s*([\d.]+)/i);
    const graScore = extractScore(response.text, /Grammatical Range and Accuracy:\s*\**\s*([\d.]+)/i);
    const pronScore = extractScore(response.text, /Pronunciation:\s*\**\s*([\d.]+)/i);

    // Save to Supabase (speaking_evaluations)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error: dbError } = await supabase.from('speaking_evaluations').insert({
        user_id: user.id,
        part: part || 1, // Default to 1 if part is not provided
        question: question,
        transcript: transcript,
        overall_score: overallScore,
        fc_score: fcScore,
        lr_score: lrScore,
        gra_score: graScore,
        pron_score: pronScore,
        detailed_feedback: response.text,
      });

      if (dbError) {
        console.error("Failed to insert speaking evaluation to Supabase:", dbError);
        // Continue and return the response even if DB save fails
      }
    } else {
      console.warn("No active user session found. Speaking evaluation not saved to database.");
    }

    return NextResponse.json({ evaluation: response.text });
    
  } catch (error) {
    console.error('Error evaluating speaking with Gemini:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate speaking response. Please try again.' }, 
      { status: 500 }
    );
  }
}
