const questions = [
    { q: "Apa makanan favorit aku?", a: "pizza" },
    { q: "Dimana kita pertama kali ketemu?", a: "mall" },
    { q: "Tanggal jadian kita? (DD/MM/YYYY)", a: "14/02/2023" }
];

let currentQuestion = 0;

function showQuestion() {
    document.getElementById("question").innerText = questions[currentQuestion].q;
    document.getElementById("answer").value = "";
}

function checkAnswer() {
    let answer = document.getElementById("answer").value.toLowerCase().trim();
    if (answer === questions[currentQuestion].a.toLowerCase()) {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showFireworks();
        }
    } else {
        document.getElementById("feedback").innerText = "Jawaban salah, coba lagi!";
    }
}

function showFireworks() {
    document.getElementById("quiz-container").innerHTML = "<h1>Selamat! 🎉</h1><p>Kamu berhasil menjawab semua pertanyaan!</p>";
    document.getElementById("fireworks").style.display = "block";
    setTimeout(() => { document.getElementById("fireworks").style.display = "none"; }, 4000);
}

showQuestion();
