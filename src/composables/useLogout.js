import { ref } from "@vue/reactivity";
import { auth } from "../firebase/config";

const error = ref(null);

const logout = async () => {
  error.value = null;
  try {
    await auth.signOut();
  } catch (err) {
    // error sent back from firebase
    error.value = err.message;
  }
};

const useLogout = () => {
  return { error, logout };
};

export default useLogout;
