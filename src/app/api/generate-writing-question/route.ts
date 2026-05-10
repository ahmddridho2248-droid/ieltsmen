import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({});

export const dynamic = 'force-dynamic'; // Prevent Next.js from caching this GET route

export async function GET() {
  try {
    const skillPath = path.join(process.cwd(), '.agents', 'skills', 'ielts-question-generator.md');
    let systemInstruction = "";
    try {
      systemInstruction = fs.readFileSync(skillPath, 'utf-8');
    } catch (err) {
      console.warn("Could not read ielts-question-generator skill file. Falling back to default.", err);
      systemInstruction = "Generate an IELTS Writing Task 2 question.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a new IELTS Writing Task 2 question.",
      config: {
        systemInstruction,
        temperature: 0.9, // Higher temperature for more varied questions
      }
    });

    if (!response.text) {
        throw new Error("No response generated from Gemini");
    }

    return NextResponse.json({ question: response.text.trim() });
    
  } catch (error) {
    console.error('Error generating question with Gemini:', error);
    return NextResponse.json(
      { error: 'Failed to generate question. Please try again later.' }, 
      { status: 500 }
    );
  }
}
