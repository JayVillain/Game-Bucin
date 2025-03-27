// Array pertanyaan dengan narasi (story) dan counter percobaan per pertanyaan
const questions = [
    { q: "Apa makanan favorit aku?", a: "pizza", story: "Makanan yang selalu membuatku tersenyum.", attempts: 0 },
    { q: "Dimana kita pertama kali ketemu?", a: "mall", story: "Tempat itu selalu jadi kenangan manis kita.", attempts: 0 },
    { q: "Tanggal jadian kita? (DD/MM/YYYY)", a: "14/02/2023", story: "Hari penuh cinta yang tak terlupakan.", attempts: 0 }
  ];
  
  let currentQuestion = 0;
  const totalQuestions = questions.length;
  let quizStartTime;
  let totalAttempts = 0;
  let userName = "";
  
  // Elemen DOM
  const startScreen = document.getElementById("start-screen");
  const userNameInput = document.getElementById("userNameInput");
  const quizContainer = document.getElementById("quiz-container");
  const questionEl = document.getElementById("question");
  const storyEl = document.getElementById("story");
  const feedbackEl = document.getElementById("feedback");
  const answerInput = document.getElementById("answer");
  const progressEl = document.getElementById("progress");
  const statisticsEl = document.getElementById("statistics");
  const statTextEl = document.getElementById("statText");
  const performanceMessageEl = document.getElementById("performanceMessage");
  const particleOverlay = document.getElementById("particle-overlay");
  const bgMusic = document.getElementById("bgMusic");
  const volumeSlider = document.getElementById("volumeSlider");
  
  let isMusicPlaying = true;
  
  // Set volume dari slider
  volumeSlider.addEventListener("input", () => {
    bgMusic.volume = volumeSlider.value;
  });
  
  // Mulai kuis setelah input nama
  function startQuiz() {
    userName = userNameInput.value.trim();
    if (userName === "") {
      alert("Tolong masukkan nama kamu!");
      return;
    }
    startScreen.classList.add("hidden");
    document.getElementById("audio-controls").classList.remove("hidden");
    quizContainer.classList.remove("hidden");
    // Set background dinamis awal
    updateBackground(0);
    quizStartTime = Date.now();
    showQuestion();
  }
  
  // Tampilkan pertanyaan dengan animasi slide-in
  function showQuestion() {
    // Reset animasi dan feedback
    questionEl.classList.remove("show");
    feedbackEl.textContent = "";
    answerInput.classList.remove("error");
    
    // Update progress bar
    progressEl.style.width = ((currentQuestion / totalQuestions) * 100) + "%";
    // Update background berdasarkan progress
    updateBackground(currentQuestion / totalQuestions);
    
    setTimeout(() => {
      questionEl.innerText = questions[currentQuestion].q;
      // Sisipkan nama pengguna ke dalam narasi bila relevan
      storyEl.innerText = questions[currentQuestion].story.replace("{nama}", userName);
      questionEl.classList.add("show");
    }, 300);
    
    // Reset input
    answerInput.value = "";
  }
  
  // Cek jawaban dan hitung percobaan
  function checkAnswer() {
    const answer = answerInput.value.toLowerCase().trim();
    questions[currentQuestion].attempts++;
    totalAttempts++;
    if (answer === questions[currentQuestion].a.toLowerCase()) {
      // Mainkan suara jawaban benar
      document.getElementById("correctSound").play().catch(err => console.error(err));
      // Transisi keluar (slide-out) sebelum pindah ke pertanyaan berikutnya
      questionEl.classList.remove("show");
      setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
          showQuestion();
        } else {
          quizEnd();
        }
      }, 500);
    } else {
      // Mainkan suara salah dan tampilkan feedback serta animasi getar
      document.getElementById("wrongSound").play().catch(err => console.error(err));
      feedbackEl.innerText = "Jawaban salah, coba lagi! 😢";
      answerInput.classList.add("error");
      setTimeout(() => answerInput.classList.remove("error"), 300);
    }
  }
  
  // Fungsi overlay background dinamis (ubah gradasi berdasarkan progress)
  function updateBackground(progressRatio) {
    // Misalnya, background berubah dari warna lembut ke lebih intens
    const startColor = [255, 230, 230]; // RGB awal
    const endColor = [255, 128, 128]; // RGB akhir
    const r = Math.floor(startColor[0] + (endColor[0] - startColor[0]) * progressRatio);
    const g = Math.floor(startColor[1] + (endColor[1] - startColor[1]) * progressRatio);
    const b = Math.floor(startColor[2] + (endColor[2] - startColor[2]) * progressRatio);
    document.body.style.background = `linear-gradient(135deg, rgb(${r},${g},${b}), #fff2f2)`;
  }
  
  // Fungsi partikel overlay sederhana (misalnya, titik-titik kecil yang bergerak secara acak)
  function launchParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = Math.random() * window.innerHeight + "px";
      particle.style.animationDuration = (Math.random() * 3 + 2) + "s";
      particleOverlay.appendChild(particle);
      setTimeout(() => particle.remove(), 5000);
    }
  }
  
  // Fungsi untuk animasi perayaan (fireworks dan confetti)
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
  
  // Fungsi untuk membuat elemen firework
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
  
  // Fungsi untuk membuat confetti
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
  
  // Fungsi saat kuis selesai
  function quizEnd() {
    launchCelebration();
    const quizEndTime = Date.now();
    const timeTaken = Math.floor((quizEndTime - quizStartTime) / 1000);
    
    // Hitung total percobaan dan persentase rata-rata percobaan per pertanyaan
    let totalAttemptsForQuiz = questions.reduce((sum, q) => sum + q.attempts, 0);
    const averageAttempts = (totalAttemptsForQuiz / totalQuestions).toFixed(1);
    const successRate = ((totalQuestions / totalAttemptsForQuiz) * 100).toFixed(0);
    
    // Tampilkan statistik dengan umpan balik dinamis berdasarkan performa
    quizContainer.innerHTML = `<h1>Selamat, ${userName}! 🎉</h1>`;
    statisticsEl.classList.remove("hidden");
    statTextEl.innerText = `Kamu menjawab ${totalQuestions} pertanyaan dengan benar dalam ${timeTaken} detik.
    Rata-rata percobaan per pertanyaan: ${averageAttempts}.
    Tingkat keberhasilan: ${successRate}%.`;
    
    // Umpan balik dinamis
    if(successRate >= 90) {
      performanceMessageEl.innerText = "Luar biasa! Kamu benar-benar mengenalku dengan sempurna!";
    } else if(successRate >= 70) {
      performanceMessageEl.innerText = "Bagus! Tapi masih ada ruang untuk lebih mengenal lagi.";
    } else {
      performanceMessageEl.innerText = "Hmmm, ayo coba lagi supaya semakin dekat!";
    }
    
    // Luncurkan partikel overlay sebagai sentuhan akhir
    launchParticles();
  }
  
  // Toggle musik
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
  
  // Fungsi untuk mengulang kuis (restart)
  function restartQuiz() {
    // Reset variabel
    currentQuestion = 0;
    totalAttempts = 0;
    questions.forEach(q => q.attempts = 0);
    statisticsEl.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    // Reset background
    updateBackground(0);
    quizStartTime = Date.now();
    showQuestion();
  }
  