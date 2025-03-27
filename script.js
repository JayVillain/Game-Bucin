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
  
  function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    // Random arah ledakan
    const offsetX = (Math.random() - 0.5) * 200; // rentang -100 sampai 100
    const offsetY = (Math.random() - 0.5) * 200;
    firework.style.setProperty('--x', offsetX + 'px');
    firework.style.setProperty('--y', offsetY + 'px');
    document.getElementById('fireworks').appendChild(firework);
    // Hapus elemen setelah animasi selesai
    setTimeout(() => firework.remove(), 1500);
  }
  
  function showFireworks() {
    // Ubah tampilan quiz container dengan pesan selamat
    document.getElementById("quiz-container").innerHTML = "<h1>Selamat! 🎉</h1><p>Kamu berhasil menjawab semua pertanyaan!</p>";
    const fireworksContainer = document.getElementById("fireworks");
    fireworksContainer.style.display = "block";
    const numberOfFireworks = 30;
    for (let i = 0; i < numberOfFireworks; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      createFirework(x, y);
    }
    // Sembunyikan container fireworks setelah animasi selesai
    setTimeout(() => { fireworksContainer.style.display = "none"; }, 2000);
  }
  
  showQuestion();
  