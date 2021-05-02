import { ref } from "@vue/reactivity"
import { auth } from '../firebase/config'

const error = ref(null)  

const signup = async (email, password, displayName) => {
// const signup = async (email, password) => {
  // reset error value
  error.value = null

  try {
    const res = await auth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error('Could not complete the signup')
    }
    // add user name into response
    await res.user.updateProfile({ displayName })
    error.value = null
    console.log(res.user)

    return res
  } catch (err) {
    error.value = err.message
  }
}

const useSignup = () => {
  return { error, signup }
}

export default useSignup