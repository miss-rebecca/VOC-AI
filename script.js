let mediaRecorder;
let chunks = [];

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const recordingsList = document.getElementById('recordingsList');

startBtn.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  chunks = [];

  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'audio/webm' });
    const audioURL = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = audioURL;
    recordingsList.appendChild(audio);
  };

  mediaRecorder.start();
});

stopBtn.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
});
