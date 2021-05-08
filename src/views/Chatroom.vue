<template>
  <div class="container">
    <div class="chat">
      <Navbar />
      <ChatWindow />
      <NewChatForm />
    </div>
  </div>
</template>

<script>
import ChatWindow from "../components/ChatWindow.vue";
import Navbar from "../components/Navbar.vue";
import NewChatForm from "../components/NewChatForm.vue";
import getUser from "../composables/getUser";
import { watch } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { Navbar, NewChatForm, ChatWindow },
  setup() {
    const { user } = getUser();
    const router = useRouter();

    watch(user, () => {
      if (!user.value) {
        router.push("/");
      }
    });

    return {};
  },
};
</script>

<style scoped></style>
