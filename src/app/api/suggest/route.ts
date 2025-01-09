import { NextResponse } from 'next/server';
import { Mistral } from '@mistralai/mistralai';
import { PRIMARY_MODEL, getFallbackModel } from '@/utils/model-selection';

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

async function generateSuggestionWithFallback(messages: any[]) {
  try {
    return await client.chat.complete({
      messages,
      model: PRIMARY_MODEL,
    });
  } catch (error) {
    // If the primary model fails, try with a fallback model
    console.error('Primary model failed, trying fallback model');
    return await client.chat.complete({
      messages,
      model: getFallbackModel(),
    });
  }
}

export async function POST(request: Request) {
  try {
    const { html } = await request.json();

    if (!html) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    const completion = await generateSuggestionWithFallback([
      {
        role: 'user',
        content: `Given this HTML content, suggest a concise title and brief description that captures the essence of the app. The title should be descriptive, while the description should explain what the app does in a single sentence. Format the response as JSON with "title" and "description" fields.

<app html>
${html}
</app html>`,
      },
    ]);

    let responseContent = (completion.choices[0]?.message?.content || "") as string;

    const startIndex = responseContent.indexOf('{');
    const endIndex = responseContent.lastIndexOf('}');
    
    if (startIndex === -1 || endIndex === -1) {
      throw new Error('Invalid JSON response from AI');
    }

    const jsonContent = responseContent.substring(startIndex, endIndex + 1);
    const suggestions = JSON.parse(jsonContent);

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
