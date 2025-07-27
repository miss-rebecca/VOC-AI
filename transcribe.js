const transcribeBtn = document.getElementById('transcribeBtn');
const resultText = document.getElementById('resultText');

let recognition;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
  recognition = new SpeechRecognition();
} else {
  alert("Speech Recognition is not supported in this browser.");
}

if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'id-ID'; // ganti 'en-US' kalau mau Bahasa Inggris
  recognition.interimResults = false;

  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    resultText.innerText = transcript;
  };

  recognition.onerror = event => {
    resultText.innerText = 'Error: ' + event.error;
  };

  transcribeBtn.addEventListener('click', () => {
    resultText.innerText = '🎤 Listening...';
    recognition.start();
  });
}
