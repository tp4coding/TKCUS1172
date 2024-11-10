document.addEventListener('DOMContentLoaded', () => {
    // Use precompiled Handlebars templates
    const startTemplate = Handlebars.templates['start'];
    const questionTemplate = Handlebars.templates['quiz'];

    let timerInterval;

    function loadStartScreen() {
        document.getElementById('app-container').innerHTML = startTemplate();
    }

    loadStartScreen();

    document.getElementById('app-container').addEventListener('submit', async (event) => {
        if (event.target && event.target.id === 'start-form') {
            event.preventDefault();
            const userName = document.getElementById('username').value.trim();
            const selectedQuiz = document.getElementById('quiz-select').value;

            if (userName) {
                const questions = await loadQuizData(selectedQuiz);
                if (questions) {
                    startQuiz(userName, questions);
                }
            }
        }
    });

    async function loadQuizData(quizId) {
        try {
            const response = await fetch(`https://my-json-server.typicode.com/tp4coding/TKCUS1172/${quizId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            alert('Failed to load quiz data. Please try again later.');
            console.error('Error loading quiz data:', error);
        }
    }

    function startQuiz(userName, questions) {
        let currentQuestionIndex = 0;
        let score = 0;
        let timeElapsed = 0;

        if (timerInterval) clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            timeElapsed++;
            document.getElementById('time-elapsed').innerText = timeElapsed;
        }, 1000);

        loadQuestion(questions[currentQuestionIndex]);

        function loadQuestion(question) {
            document.getElementById('app-container').innerHTML = questionTemplate({
                questionNumber: currentQuestionIndex + 1,
                questionText: question.questionText,
                isMultipleChoice: question.type === 'multiple-choice',
                isImageChoice: question.type === 'image-choice',
                options: question.options,
                score: score,
                timeElapsed: timeElapsed
            });
            document.getElementById('score-display').innerText = score;

            document.getElementById('submit-answer').addEventListener('click', () => {
                let userAnswer;
                if (question.type === 'multiple-choice' || question.type === 'image-choice') {
                    userAnswer = document.querySelector('input[name="answer"]:checked')?.value;
                } else {
                    userAnswer = document.getElementById('answer-input').value.trim();
                }

                if (userAnswer) {
                    if (userAnswer === question.correctAnswer) {
                        score++;
                        alert("Correct! Brilliant!");
                        loadNextQuestion();
                    } else {
                        showIncorrectAnswerFeedback(question.correctAnswer);
                    }
                } else {
                    alert("Please provide an answer before proceeding.");
                }
            });
        }

        function showIncorrectAnswerFeedback(correctAnswer) {
            document.getElementById('app-container').innerHTML = `
                <div class="text-center">
                    <h2>Incorrect Answer</h2>
                    <p>The correct answer was: ${correctAnswer}</p>
                    <button class="btn btn-primary mt-3" id="got-it-button">Got it</button>
                </div>
            `;
            document.getElementById('got-it-button').addEventListener('click', () => {
                loadNextQuestion();
            });
        }

        function loadNextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(questions[currentQuestionIndex]);
            } else {
                clearInterval(timerInterval);
                endQuiz(userName, score, questions.length);
            }
        }

        function endQuiz(userName, score, totalQuestions) {
            clearInterval(timerInterval);
            const message = score / totalQuestions >= 0.8
                ? `Congratulations ${userName}! You passed the quiz!`
                : `Sorry ${userName}, you failed the quiz.`;
            document.getElementById('app-container').innerHTML = `<div class="text-center"><h2>${message}</h2><button class="btn btn-primary mt-3" id="restart-quiz">Return to Start</button></div>`;

            document.getElementById('restart-quiz').addEventListener('click', () => {
                loadStartScreen();
            });
        }
    }
});
