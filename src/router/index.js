import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Chatroom from "../views/Chatroom.vue";
import { auth } from '../firebase/config'

// auth guard
const chatroomAuth = () => {
  let user = auth.currentUser
  console.log('current user in auth gurad: ', user)

  if (!user) router.push('/')
}

const welcomeAuth = () => {
  let user = auth.currentUser
  console.log('current user in auth gurad: ', user)

  if (user) router.push('/chatroom')
}

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    beforeEnter: welcomeAuth
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: Chatroom,
    beforeEnter: chatroomAuth
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
