const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const finalPreview = document.getElementById('finalPreview');
const downloadLink = document.getElementById('downloadLink');
const countdownOverlay = document.getElementById('countdownOverlay');

let canvasStream;
let screenStream, webcamStream, micStream;
let mixedRecorder;
let chunks = [];
let canvas, ctx;
let screenVideo = document.createElement('video');
let webcamVideo = document.createElement('video');
let drawInterval;
let webcamPopup;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showCountdown(seconds) {
  countdownOverlay.style.display = 'flex';
  for (let i = seconds; i > 0; i--) {
    countdownOverlay.textContent = i;
    await sleep(1000);
  }
  countdownOverlay.style.display = 'none';
}

startBtn.onclick = async () => {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  chunks = [];

  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    screenVideo.srcObject = screenStream;
  } catch (err) {
    console.error('Error accessing screen media:', err);
    alert('Failed to access screen media. Please check permissions.');
    return;
  }

  if (mode === 'screen+mic' || mode === 'screen+webcam') {
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Failed to access microphone. Please check permissions.');
      return;
    }
  }

  if (mode === 'screen+webcam') {
    try {
      webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
      webcamVideo.srcObject = webcamStream;
      webcamVideo.muted = true;
      webcamVideo.play();

      webcamPopup = window.open('', 'Webcam Preview', 'width=240,height=180');
      webcamPopup.document.body.style.margin = '0';
      const previewElement = webcamPopup.document.createElement('video');
      previewElement.srcObject = webcamStream;
      previewElement.autoplay = true;
      previewElement.muted = true;
      previewElement.playsInline = true;
      previewElement.style.width = '100%';
      previewElement.style.height = '100%';
      webcamPopup.document.body.appendChild(previewElement);
    } catch (err) {
      console.error('Error accessing webcam:', err);
      alert('Failed to access webcam. Please check permissions.');
      return;
    }
  }

  await showCountdown(3);

  await screenVideo.play();
  await new Promise(resolve => {
    if (screenVideo.readyState >= 1) {
      resolve();
    } else {
      screenVideo.onloadedmetadata = resolve;
    }
  });

  canvas = document.createElement('canvas');
  canvas.width = screenVideo.videoWidth;
  canvas.height = screenVideo.videoHeight;
  ctx = canvas.getContext('2d');
  canvasStream = canvas.captureStream(30);

  const audioTracks = [];

  if (screenStream.getAudioTracks().length > 0 || (micStream && micStream.getAudioTracks().length > 0)) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const destination = audioContext.createMediaStreamDestination();

    if (screenStream.getAudioTracks().length > 0) {
      const screenSource = audioContext.createMediaStreamSource(screenStream);
      screenSource.connect(destination);
    }

    if (micStream && micStream.getAudioTracks().length > 0) {
      const micSource = audioContext.createMediaStreamSource(micStream);
      micSource.connect(destination);
    }

    destination.stream.getAudioTracks().forEach(track => canvasStream.addTrack(track));
  }

  drawInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);
    if (mode === 'screen+webcam') {
      ctx.drawImage(webcamVideo, 10, canvas.height - 160, 200, 150);
    }
  }, 1000 / 30);

  mixedRecorder = new MediaRecorder(canvasStream);
  mixedRecorder.ondataavailable = e => chunks.push(e.data);
  mixedRecorder.onstop = () => {
    clearInterval(drawInterval);
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    finalPreview.src = url;

    setTimeout(() => {
      finalPreview.classList.remove('hidden');
    }, 10);

    downloadLink.href = url;
    downloadLink.style.display = 'inline-block';
    downloadLink.textContent = 'Download Final Video';
  };

  mixedRecorder.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.onclick = () => {
  if (webcamStream) webcamStream.getTracks().forEach(t => t.stop());
  if (micStream) micStream.getTracks().forEach(t => t.stop());
  if (screenStream) screenStream.getTracks().forEach(t => t.stop());
  if (webcamPopup && !webcamPopup.closed) webcamPopup.close();
  if (mixedRecorder && mixedRecorder.state !== 'inactive') mixedRecorder.stop();

  startBtn.disabled = false;
  stopBtn.disabled = true;
};
