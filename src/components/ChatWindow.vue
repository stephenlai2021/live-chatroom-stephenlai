<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt }}</span>
        <div class="name-message">
          <span class="name">{{ doc.name }}</span>
          <span class="message">{{ doc.message }}</span>
        </div>
      </div>
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "vue";

export default {
  setup() {
    const { error, documents } = getCollection("live-chatroom");

    const formattedDocuments = computed(() => {
      // if we currently have documents
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: time };
        });
      }
      return {};
    });

    // auto-scroll to bottom of messages
    const messages = ref(null);

    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight;
    });

    return { error, documents, formattedDocuments, messages };
  },
};
</script>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 20px;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 500px;
  overflow-y: scroll;
  /* border: 1px solid green; */
}
.name-message {
  display: flex;
  width: 100%;
}
.message {
  max-width: 90%;
  word-wrap: break-word;
  /* border: 1px solid red; */
}
</style>
