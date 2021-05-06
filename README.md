# Live Chatroom

## Challenge - Auto-Scrolling the Chat Window

add a `messages` ref to the messages template

within setup(), do the following
- create `messages` ref inside `setup()`
- create `onUpdated` lifecycle hook which fires a function every time we get an update in firestore
```
onUpdated(() => {
  messages.value.scrollTop = messages.value.scrollHeight
})
```

## Unsubscribing from Real-Time Listener

If we use onSnapShot(), be sure to unsubscribe it or we will fire multiple snapshot which is not performant and easily exceed firebase free tier

we use watchEffect() to unsubscribe real-time listener
- assign onSnapshot() to `unsub` constant
- create a `watchEffect()` life cycle hook to unsub real-time listener
- when component is unmounted, the `onInvalidate` function inside `watchEffect` argument is fired
```
const unsub = db.collection(collection).onSnapshot()

watchEffect((onInvalidate) => {
  onInvalidate(() => unsub()))
})
``` 
