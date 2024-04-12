import OpenAI from "openai";
import "dotenv/config"

const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY });

const gptCategorize = async (content) => {
  const prompt = `Categories: food, entertainment, beauty, clothing, other. 
                  ${content} categorized as:`
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

export default gptCategorize;