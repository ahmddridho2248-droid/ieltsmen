import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({});

export async function GET() {
  try {
    const skillPath = path.join(process.cwd(), '.agents', 'skills', 'ielts-speaking-question-generator.md');
    let systemInstruction = "";
    try {
      systemInstruction = fs.readFileSync(skillPath, 'utf-8');
    } catch (err) {
      console.warn("Could not read ielts-speaking-question-generator skill file. Falling back to default.", err);
      systemInstruction = 'You are an expert IELTS Speaking Examiner. Your task is to generate ONE random IELTS Speaking question. Randomly choose between Part 1 (short daily topics), Part 2 (a Cue Card topic with 3-4 bullet points), or Part 3 (abstract discussion). OUTPUT STRICTLY IN JSON FORMAT: {"part": 1|2|3, "question": "The question text or cue card text..."}. Do not include markdown formatting like ```json or any other text.';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a random IELTS speaking question.",
      config: {
        systemInstruction,
        temperature: 0.9,
        responseMimeType: "application/json",
      }
    });

    if (!response.text) {
        throw new Error("No response generated from Gemini");
    }

    // Sanitise AI response: strip accidental markdown fences before parsing
    const cleanText = response.text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();
    const data = JSON.parse(cleanText);

    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error generating speaking question with Gemini:', error);
    return NextResponse.json(
      { error: 'Failed to generate question. Please try again.' }, 
      { status: 500 }
    );
  }
}
