const questions = [
    { q: "Apa makanan favorit aku?", a: "pizza", story: "Makanan yang selalu membuatku bahagia!" },
    { q: "Dimana kita pertama kali ketemu?", a: "mall", story: "Tempat itu jadi kenangan manis kita." },
    { q: "Tanggal jadian kita? (DD/MM/YYYY)", a: "14/02/2023", story: "Hari itu penuh cinta." }
  ];
  
  let currentQuestion = 0;
  const totalQuestions = questions.length;
  let quizStartTime = Date.now();
  
  const questionEl = document.getElementById("question");
  const storyEl = document.getElementById("story");
  const feedbackEl = document.getElementById("feedback");
  const progressEl = document.getElementById("progress");
  const bgMusic = document.getElementById("bgMusic");
  const volumeSlider = document.getElementById("volumeSlider");
  
  let isMusicPlaying = true;
  
  // Atur volume dari slider
  volumeSlider.addEventListener("input", () => {
    bgMusic.volume = volumeSlider.value;
  });
  
  // Mulai musik & tampilkan pertanyaan
  window.onload = () => {
    bgMusic.volume = volumeSlider.value;
    bgMusic.play().catch(err => console.error("Autoplay gagal:", err));
    showQuestion();
  };
  
  function showQuestion() {
    // Reset animasi dan feedback
    questionEl.classList.remove("show");
    storyEl.textContent = "";
    feedbackEl.textContent = "";
    document.getElementById("answer").classList.remove("error");
    
    setTimeout(() => {
      questionEl.innerText = questions[currentQuestion].q;
      questionEl.classList.add("show");
      // Tampilkan pesan cerita interaktif secara singkat
      storyEl.textContent = questions[currentQuestion].story;
    }, 200);
    
    // Update progress bar
    progressEl.style.width = ((currentQuestion / totalQuestions) * 100) + "%";
    
    // Reset input
    document.getElementById("answer").value = "";
  }
  
  function checkAnswer() {
    const answerInput = document.getElementById("answer");
    const answer = answerInput.value.toLowerCase().trim();
    if (answer === questions[currentQuestion].a.toLowerCase()) {
      // Mainkan suara benar
      document.getElementById("correctSound").play().catch(err => console.error(err));
      currentQuestion++;
      if (currentQuestion < totalQuestions) {
        showQuestion();
      } else {
        quizEnd();
      }
    } else {
      // Mainkan suara salah dan tampilkan feedback
      document.getElementById("wrongSound").play().catch(err => console.error(err));
      feedbackEl.innerText = "Jawaban salah, coba lagi! 😢";
      answerInput.classList.add("error");
      setTimeout(() => answerInput.classList.remove("error"), 300);
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
  
  function launchCelebration() {
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
  
  function quizEnd() {
    launchCelebration();
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "<h1>Selamat! 🎉</h1>";
    
    // Hitung waktu kuis
    const quizEndTime = Date.now();
    const timeTaken = Math.floor((quizEndTime - quizStartTime) / 1000);
    
    // Tampilkan statistik
    const statDiv = document.getElementById("statistics");
    statDiv.classList.remove("hidden");
    document.getElementById("statText").innerText = `Kamu menjawab ${totalQuestions} pertanyaan dengan benar dalam ${timeTaken} detik!`;
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
  