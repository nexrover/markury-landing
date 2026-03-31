type GroqChatResponse = {
  choices?: Array<{ message?: { content?: string } }>
}

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'

export async function groqGeneratePlainText(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured.')
  }

  const models = ['llama3-8b-8192', 'mixtral-8x7b-32768']
  let lastError = 'Failed to generate text.'

  for (const model of models) {
    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      lastError = `Groq API error (${model}): ${errorText}`
      continue
    }

    const data = (await response.json()) as GroqChatResponse
    const text = data.choices?.[0]?.message?.content?.trim()
    if (text) return text

    lastError = `Groq API returned empty content (${model}).`
  }

  throw new Error(lastError)
}

