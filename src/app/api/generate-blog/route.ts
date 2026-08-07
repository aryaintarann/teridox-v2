import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing. Please configure it in your .env.local file.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Models to try in order
    const geminiModels = [
      "gemini-3.5-flash",
      "gemini-3-flash-preview"
    ];

    const prompt = `You are a professional tech and business journalist working for Teridox. The user wants you to write a news article/blog post about: "${topic}".

Mandatory Instructions:
1. RELIABLE SOURCES: Conduct internal research using your analytical insights to provide factual information. Do not fabricate facts. Mention data contexts or sources where applicable.
2. JOURNALISTIC STYLE: Write using standard journalistic principles (5Ws and 1H), informative, objective, yet engaging and smooth to read. Use the inverted pyramid structure (most important information first).
3. TERIDOX SEO PROMOTION: At the very end of the article (as a closing paragraph), add a subtle, persuasive soft-selling sentence that promotes Teridox's services (such as website development, apps, or digital solutions) relevant to the topic discussed. This is to boost SEO and conversions.
4. FORMAT & JSON SAFETY: Use neat HTML tags (<h2>, <p>, <strong>, <ul>) for the content section. CRITICAL: You must use single quotes for all HTML attributes (e.g., <a href='https://teridox.com'>) to prevent breaking the JSON double-quote structure.
5. LANGUAGE: The entire article, including the title, category, excerpt, and content, MUST be written in ENGLISH.`;

    let blogData = null;
    let lastError = null;

    for (const modelName of geminiModels) {
      console.log(`Generating news blog with ${modelName}...`);
      try {
        const textModel = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: SchemaType.OBJECT,
              properties: {
                title: { type: SchemaType.STRING, description: "A catchy and SEO-friendly news title in English" },
                category: { type: SchemaType.STRING, description: "1 or 2 words category (e.g., Technology, Business, Digital)" },
                excerpt: { type: SchemaType.STRING, description: "A 2-3 sentence summary in the style of a news lead" },
                content: { type: SchemaType.STRING, description: "The full article content in HTML format, minimum 4 paragraphs. Must include the Teridox promotion paragraph at the end." },
                imagePrompt: { type: SchemaType.STRING, description: "Leave empty" },
              },
              required: ["title", "category", "excerpt", "content", "imagePrompt"],
            }
          }
        });

        const result = await textModel.generateContent(prompt);
        const response = await result.response;
        
        let text = response.text();
        
        // Clean up common bad control characters from free LLMs before parsing
        text = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, function (c) {
          if (c === '\n' || c === '\r' || c === '\t') {
            return c === '\n' ? '\\n' : c === '\r' ? '\\r' : '\\t';
          }
          return '';
        });

        blogData = JSON.parse(text);
        
        break; // Success! Exit the loop
      } catch (err: any) {
        console.warn(`${modelName} failed:`, err.message);
        lastError = err.message;
      }
    }

    if (!blogData) {
      return NextResponse.json({ error: 'Gemini 3 Flash failed to generate valid data. Error: ' + lastError }, { status: 500 });
    }

    return NextResponse.json({
      title: blogData.title,
      category: blogData.category,
      excerpt: blogData.excerpt,
      content: blogData.content,
      coverImage: "" // Gambar dihapus sesuai permintaan
    });
  } catch (error: any) {
    console.error("Generate Blog Error:", error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
  }
}
