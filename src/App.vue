<template>
  <video id="myVideo" width="500" height="500" muted autoplay  ref="myVideoRef"></video>
</template>


<script setup>
import { loadSource, initRtcPeerConnection } from "./index.js";
import { onMounted, ref } from "vue";
let myVideoRef = ref();
onMounted(async () => {
  // const url = "http://videostream.tpddns.cn:8887/webrtc/play/1732761152444/ff8080817a3d7444017a3d7510820008";
  const url = "http://videostream.tpddns.cn:8887/webrtc/play/1732761244516/4028a88179f56d670179f5c3b6ca0000"
  initRtcPeerConnection(myVideoRef.value);
  await loadSource(url);
  // await loadSource(url);
  // await loadSource(url);

})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
