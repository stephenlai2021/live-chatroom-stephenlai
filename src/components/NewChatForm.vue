<template>
  <form>
    <textarea
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    >
    </textarea>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import getUser from '../composables/getUser'
import useCollection from '../composables/useCollection'
import { timestamp } from '../firebase/config'

export default {
  setup() {
    const { user } = getUser()
    const { addDoc, error } = useCollection('live-chatroom')

    const message = ref('')

    const handleSubmit = async () => {
      if (!message.value) return
      
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp()
      }

      await addDoc(chat)
      if (!error.value) {
        message.value = ''
      }
      message.value = ''
    }

    return { handleSubmit, message, error }
  }
}
</script>

<style scoped>
form {
  /* margin: 10px; */
  /* position: fixed;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px; */
}
textarea {
  width: 100%;
  max-width: 100%;
  /* margin-bottom: 6px; */
  padding: 10px 20px;
  box-sizing: border-box;
  border: 0;
  /* border-radius: 20px; */
  font-family: inherit;
  outline: none;
}
</style>