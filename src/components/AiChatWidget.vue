<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  entityType: {
    type: String,
    default: 'car'
  },

  entity: {
    type: Object,
    default: null
  }
})

const isOpen = ref(false)
const message = ref('')
const loading = ref(false)

const messages = ref([
  {
    role: 'assistant',
    text: 'Hi! 👋 I am the AutoLux AI Assistant. Ask me anything about this car.'
  }
])

const messagesContainer = ref(null)

const scrollToBottom = async () => {
  await nextTick()

  if (messagesContainer.value) {
    messagesContainer.value.scrollTop =
      messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  const text = message.value.trim()

  if (!text || loading.value) return

  messages.value.push({
    role: 'user',
    text
  })

  message.value = ''

  loading.value = true

  await scrollToBottom()

  try {
    const response = await fetch(
      'http://localhost:3001/api/ai',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          entityType: props.entityType,
          entity: props.entity
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.error || 'AI request failed.'
      )
    }

    messages.value.push({
      role: 'assistant',
      text: data.reply
    })

  } catch (error) {
    messages.value.push({
      role: 'assistant',
      text: 'Sorry, I could not connect to the AI service.'
    })
  } finally {
    loading.value = false
    await scrollToBottom()
  }
}
</script>

<template>
  <div class="ai-chat">

    <button
      v-if="!isOpen"
      class="ai-chat-button"
      type="button"
      @click="isOpen = true"
    >
      🤖
    </button>

    <div
      v-else
      class="ai-chat-window"
    >

      <div class="ai-chat-header">

        <div>
          <strong>
            AutoLux AI
          </strong>

          <small>
            Ask about this {{ entityType }}
          </small>
        </div>

        <button
          type="button"
          class="ai-close"
          @click="isOpen = false"
        >
          ×
        </button>

      </div>

      <div
        ref="messagesContainer"
        class="ai-chat-messages"
      >

        <div
          v-for="(item, index) in messages"
          :key="index"
          class="ai-message"
          :class="item.role === 'user'
            ? 'ai-message-user'
            : 'ai-message-assistant'"
        >
          {{ item.text }}
        </div>

        <div
          v-if="loading"
          class="ai-message ai-message-assistant"
        >
          Thinking...
        </div>

      </div>

      <form
        class="ai-chat-input"
        @submit.prevent="sendMessage"
      >

        <input
          v-model="message"
          type="text"
          placeholder="Ask about this car..."
          :disabled="loading"
        >

        <button
          type="submit"
          :disabled="loading || !message.trim()"
        >
          Send
        </button>

      </form>

    </div>

  </div>
</template>