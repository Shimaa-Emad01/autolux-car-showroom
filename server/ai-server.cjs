const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const OpenAI = require('openai')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

app.get('/', (req, res) => {
  res.json({
    message: 'AutoLux AI Server is running'
  })
})

app.post('/api/ai', async (req, res) => {
  try {
    const {
      message,
      entityType,
      entity
    } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: 'Message is required.'
      })
    }

    const context = entity
      ? `
Current ${entityType} information:

Name: ${entity.name || 'N/A'}
Brand: ${entity.brandName || 'N/A'}
Year: ${entity.year || 'N/A'}
Price: ${entity.price || 'N/A'}
Discount: ${entity.discount || 0}%
Stock: ${entity.stock || 0}
Description: ${entity.description || 'N/A'}
Tags: ${
  Array.isArray(entity.tags)
    ? entity.tags.join(', ')
    : 'N/A'
}
`
      : 'No specific entity information is available.'

    const instructions = `
You are AutoLux AI Assistant.

AutoLux is a premium car showroom.

The user is currently viewing a ${entityType || 'general'}.

Answer questions about the current car or brand using the provided information.

Rules:
- Be helpful and concise.
- Do not invent car specifications.
- If information is not provided, clearly say that it is not available.
- You can answer in English or Arabic depending on the user's language.
- Do not claim to have real-time inventory beyond the provided stock.
- Keep answers suitable for a car showroom website.

${context}
`

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
      instructions,
      input: message
    })

    res.json({
      reply: response.output_text
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'AI service failed. Please try again.'
    })
  }
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`AI server running on http://localhost:${PORT}`)
})