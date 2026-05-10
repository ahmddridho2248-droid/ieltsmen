import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    const { question, transcript } = await request.json();

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

    return NextResponse.json({ evaluation: response.text });
    
  } catch (error) {
    console.error('Error evaluating speaking with Gemini:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate speaking response. Please try again.' }, 
      { status: 500 }
    );
  }
}
