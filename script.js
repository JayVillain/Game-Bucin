const questions = [
    { q: "Apa makanan favorit aku?", a: "pizza" },
    { q: "Dimana kita pertama kali ketemu?", a: "mall" },
    { q: "Tanggal jadian kita? (DD/MM/YYYY)", a: "14/02/2023" }
  ];
  
  let currentQuestion = 0;
  
  function showQuestion() {
    document.getElementById("question").innerText = questions[currentQuestion].q;
    document.getElementById("answer").value = "";
    document.getElementById("feedback").innerText = "";
  }
  
  function checkAnswer() {
    const answer = document.getElementById("answer").value.toLowerCase().trim();
    if (answer === questions[currentQuestion].a.toLowerCase()) {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        celebrateSuccess();
      }
    } else {
      document.getElementById("feedback").innerText = "Jawaban salah, coba lagi!";
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
    
    // Tampilkan fireworks
    const numberOfFireworks = 40;
    for (let i = 0; i < numberOfFireworks; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.8;
      createFirework(x, y);
    }
    
    // Tampilkan confetti secara berulang
    const confettiInterval = setInterval(createConfetti, 100);
    setTimeout(() => {
      clearInterval(confettiInterval);
      fireworksContainer.style.display = "none";
    }, 3000);
  }
  
  showQuestion();
  