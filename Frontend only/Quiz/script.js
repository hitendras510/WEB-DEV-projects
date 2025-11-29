document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "Do you know JERSEY NO 18?",
      choices: ["Rohit sharma", "dhoba", "Messi", "Virat"],
      answer: "Virat",
    },
    {
      question: "Which player holds record of highest run in an IPL season?",
      choices: ["Rohit sharma", "dhoba", "Messi", "Virat"],
      answer: ["Virat"],
    },
    {
      question:
        "Which so-called cricketing legend is known as one of the biggest Credit chor?",
      choices: ["MS dhoni", "dhoba", "mahi", "MSD"],
      answer: ["MS dhoni", "dhoba", "mahi", "MSD"],
    },
    {
      question: "Among all of this who is the goatest cricketer?",
      choices: ["Rohit sharma", "dhoba", "Messi", "Virat"],
      answer: ["Virat"],
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice; // ✅ fixed
      li.addEventListener("click", () => selectAnswer(choice));
      choicesList.appendChild(li); // ✅ fixed
    });
  }

  function selectAnswer(choice) {
    const correctAnswer = questions[currentQuestionIndex].answer; // ✅ fixed

    // Handle both string and array answers
    if (
      (Array.isArray(correctAnswer) && correctAnswer.includes(choice)) ||
      choice === correctAnswer
    ) {
      score++;
    }
    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});
