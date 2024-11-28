let rtcPeerConnection = null;
const initRtcPeerConnection = () => {
  const e = new RTCPeerConnection;
  e.addTransceiver("video", {  direction: "recvonly"  }),
  e.addTransceiver("audio", {  direction: "recvonly" }),
  e.ontrack = (e) => {
    if (e.streams.length === 0) return;
    // myVideo.srcObject = e.streams[0];
  };
  e.ondatachannel = (e) => {
    console.log("data channel created");
    console.log(e.channel);
    const t = e.channel;
    t.onopen = function () {
      console.log("Data channel is open and ready to be used.");
    };
    t.onmessage = (e) => {
      console.log(e.data);
    }
    t.onclose = () => {
      console.log( "ondatachannel and onclose")
    }
  }
  e.createDataChannel("h265");

  rtcPeerConnection = e;
}
const sendOfferToServer = (url, sdp) => {
  return fetch(url, {
      method: "POST",
      mode: "cors",                // 支持跨域请求
      cache: "no-cache",           // 不缓存请求
      credentials: "include",      // 发送认证凭证
      redirect: "follow",          // 允许重定向
      referrerPolicy: "no-referrer", // 禁止发送来源信息
      headers: {
          "Content-Type": "application/sdp" // 设置请求头 Content-Type 为 application/sdp
      },
      body: sdp                    // 将生成的 SDP 放在请求体中
  });
}

const loadSource = async (url) => {
  const offer = await rtcPeerConnection.createOffer();
  await rtcPeerConnection.setLocalDescription(offer);
  const response = await sendOfferToServer(url, offer.sdp);
  const data = await response.text();
  rtcPeerConnection.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: data }));
}


export { loadSource, initRtcPeerConnection };