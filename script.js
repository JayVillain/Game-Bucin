const questions = [
    { q: "Apa makanan favorit aku?", a: "pizza" },
    { q: "Dimana kita pertama kali ketemu?", a: "mall" },
    { q: "Tanggal jadian kita? (DD/MM/YYYY)", a: "14/02/2023" }
  ];
  
  let currentQuestion = 0;
  const totalQuestions = questions.length;
  const questionEl = document.getElementById("question");
  const feedbackEl = document.getElementById("feedback");
  const progressEl = document.getElementById("progress");
  const bgMusic = document.getElementById("bgMusic");
  let isMusicPlaying = true;
  
  window.onload = () => {
    bgMusic.volume = 0.3;
    // Coba autoplay musik; browser modern mungkin membutuhkan interaksi pengguna
    bgMusic.play().catch(err => console.error("Autoplay gagal:", err));
    showQuestion();
  };
  
  function showQuestion() {
    questionEl.classList.remove("show");
    setTimeout(() => {
      questionEl.innerText = questions[currentQuestion].q;
      questionEl.classList.add("show");
    }, 200);
    progressEl.style.width = ((currentQuestion / totalQuestions) * 100) + "%";
    feedbackEl.innerText = "";
    document.getElementById("answer").value = "";
  }
  
  function checkAnswer() {
    const answer = document.getElementById("answer").value.toLowerCase().trim();
    if (answer === questions[currentQuestion].a.toLowerCase()) {
      currentQuestion++;
      if (currentQuestion < totalQuestions) {
        showQuestion();
      } else {
        celebrateSuccess();
      }
    } else {
      feedbackEl.innerText = "Jawaban salah, coba lagi! 😢";
    }
  }
  
  function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    const offsetX = (Math.random() - 0.5) * 200;
    const offsetY = (Math.random() - 0.5) * 200;
    firework.style.setProperty('--x', offsetX + 'px');
    firework.style.setProperty('--y', offsetY + 'px');
    document.getElementById('fireworks').appendChild(firework);
    setTimeout(() => firework.remove(), 1500);
  }
  
  function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    const colors = ['#ff4d4d', '#ff9999', '#ffcccb', '#ffc0cb'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('fireworks').appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  }
  
  function celebrateSuccess() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "<h1>Selamat! 🎉</h1><p>Kamu berhasil menjawab semua pertanyaan!</p>";
    const fireworksContainer = document.getElementById("fireworks");
    fireworksContainer.style.display = "block";
    const numberOfFireworks = 50;
    for (let i = 0; i < numberOfFireworks; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.8;
      createFirework(x, y);
    }
    const confettiInterval = setInterval(createConfetti, 100);
    setTimeout(() => {
      clearInterval(confettiInterval);
      fireworksContainer.style.display = "none";
    }, 3000);
    progressEl.style.width = "100%";
  }
  
  function toggleMusic() {
    const musicBtn = document.getElementById("musicToggle");
    if (isMusicPlaying) {
      bgMusic.pause();
      isMusicPlaying = false;
      musicBtn.textContent = "Putar Musik 🎶";
    } else {
      bgMusic.play().catch(err => console.error("Play music error:", err));
      isMusicPlaying = true;
      musicBtn.textContent = "Hentikan Musik 🎵";
    }
  }
  