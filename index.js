let rtcPeerConnection = null;
const initRtcPeerConnection = () => {
  const e = new RTCPeerConnection({
    iceServers: [{
      urls: 'turn:kingtopware.tpddns.cn:3478',
      credential: 'ktw123',
      username: 'ktw'
    }],
  });
  e.addTransceiver("video", {  direction: "recvonly"  }),
  e.addTransceiver("audio", {  direction: "recvonly" }),
  e.ontrack = (e) => {
    if (e.streams.length === 0) return;
    myVideo.srcObject = e.streams[0];
  };
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
  sendOfferToServer(url, offer.sdp).then(response => {
    response.text().then(data => {
      rtcPeerConnection.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: data }));
    });
  });
}

initRtcPeerConnection();
loadSource("http://videostream.tpddns.cn:8887/webrtc/play/1732703264196/2c2882ff7a797705017a79a265070007")