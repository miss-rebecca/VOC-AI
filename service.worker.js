let mediaRecorder;
let chunks = [];

document.getElementById("startBtn").addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        chunks = [];

        mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/webm" });
            const reader = new FileReader();
            reader.onload = () => {
                transcribeAudio(reader.result);
            };
            reader.readAsDataURL(blob);
        };

        mediaRecorder.start();
        console.log("Recording started...");
    } catch (err) {
        alert("Failed to access microphone: " + err.message);
    }
});

document.getElementById("stopBtn").addEventListener("click", () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        console.log("Recording stopped.");
    }
});

function transcribeAudio(audioDataURL) {
    // Simulasi transkrip (karena kita belum konek API Speech-to-Text asli)
    document.getElementById("transcript").textContent = "Transkrip akan muncul di sini (simulasi)";
}
