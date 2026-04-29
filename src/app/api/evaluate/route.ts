import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// Initialize the Google Gen AI SDK
// Ensure GEMINI_API_KEY is set in your .env.local file
const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    const { essayText, promptText } = await request.json();

    if (!essayText || !promptText) {
      return NextResponse.json(
        { error: 'Missing essayText or promptText in request body' }, 
        { status: 400 }
      );
    }

    // Dynamically read the skill definition so it's always up to date
    const skillPath = path.join(process.cwd(), '.agents', 'skills', 'ielts-examiner.md');
    let systemInstruction = "";
    try {
      systemInstruction = fs.readFileSync(skillPath, 'utf-8');
    } catch (err) {
      console.warn("Could not read ielts-examiner skill file. Falling back to default system instruction.", err);
      // Minimal fallback in case the file is moved
      systemInstruction = "You are an IELTS examiner. Evaluate the essay and return JSON.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Writing Task 2 Prompt:\n${promptText}\n\nStudent's Essay:\n${essayText}`,
      config: {
        systemInstruction,
        // Enforce strict JSON output matching the format requested in the skill file
        responseMimeType: "application/json",
        temperature: 0.2, // Low temperature for more consistent grading
      }
    });

    if (!response.text) {
        throw new Error("No response generated from Gemini");
    }

    // Parse the response to ensure it's valid JSON before sending to the client
    const jsonResponse = JSON.parse(response.text);

    return NextResponse.json(jsonResponse);
    
  } catch (error) {
    console.error('Error evaluating essay with Gemini:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate essay. Please try again later.' }, 
      { status: 500 }
    );
  }
}
