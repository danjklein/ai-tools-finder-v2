import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const toolsData = {
  categories: [
    "AI Detection",
    "Aggregators",
    "Avatar",
    "Chat",
    "Copywriting",
    "Finance",
    "Generative Art",
    "Generative Code",
    "Generative Video",
    "Image Improvement",
    "Marketing",
    "Productivity",
    "Research",
    "Self-Improvement",
    "Social Media",
    "Text-To-Speech",
    "Translation",
    "Video Editing",
    "Voice Modulation"
  ],
  tools: [
    {
      name: "InVideo",
      description: "Turn your ideas into full-length videos using simple text prompts",
      categories: ["Video Editing", "Generative Video"],
      upvotes: 257
    },
    {
      name: "Touchbase",
      description: "Relationship management and interaction tracking tool",
      categories: ["Self-Improvement"],
      upvotes: 217
    },
    {
      name: "Soul Machines",
      description: "Digital human creation for customer engagement",
      categories: ["Avatar"],
      upvotes: 22
    },
    {
      name: "Didocs.ai",
      description: "Document analysis and information extraction",
      categories: ["Research"],
      upvotes: 22
    }
  ]
};

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are an AI tool recommendation expert. Use the following database to recommend tools based on user queries. Always explain why you're recommending each tool and include relevant details like upvotes and categories.

When responding:
1. Analyze the user's needs and requirements
2. Recommend 2-3 most relevant tools
3. For each tool, explain:
   - What it does
   - Why it's relevant to their needs
   - Its popularity (upvotes)
   - Which categories it belongs to

Database: ${JSON.stringify(toolsData)}`
      },
      {
        role: 'user',
        content: prompt
      }
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}