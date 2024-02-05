const { OpenAI } = require('openai');
const openai = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});

export async function sendMessageToOpenAI(message) {
  const res = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: message,
    temperature: 1.0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  return res.choices[0].text;
}
