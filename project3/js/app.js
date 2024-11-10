document.addEventListener('DOMContentLoaded', () => {
    const startTemplate = Handlebars.compile(document.getElementById('start-template').innerHTML);
    const questionTemplate = Handlebars.compile(document.getElementById('question-template').innerHTML);

    document.getElementById('app-container').innerHTML = startTemplate();

    document.getElementById('start-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const userName = document.getElementById('username').value.trim();
        const selectedQuiz = document.getElementById('quiz-select').value;

        if (userName) {
            startQuiz(userName, selectedQuiz);
        }
    });

    function startQuiz(userName, selectedQuiz) {
        // Example question data to simplify
        const questions = [
            { questionText: "What is JavaScript?", type: "multiple-choice", options: ["Programming Language", "Fruit", "Car"], correctAnswer: "Programming Language" },
            { questionText: "Which HTML tag is used to link JavaScript?", type: "text", correctAnswer: "<script>" }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        loadQuestion(questions[currentQuestionIndex]);

        function loadQuestion(question) {
            document.getElementById('app-container').innerHTML = questionTemplate({
                questionNumber: currentQuestionIndex + 1,
                questionText: question.questionText,
                isMultipleChoice: question.type === 'multiple-choice',
                options: question.options
            });

            document.getElementById('submit-answer').addEventListener('click', () => {
                let userAnswer;
                if (question.type === 'multiple-choice') {
                    userAnswer = document.querySelector('input[name="answer"]:checked')?.value;
                } else {
                    userAnswer = document.getElementById('answer-input').value.trim();
                }

                if (userAnswer) {
                    if (userAnswer === question.correctAnswer) {
                        score++;
                        alert("Correct! Brilliant!");
                    } else {
                        alert(`Wrong answer! The correct answer is: ${question.correctAnswer}`);
                    }

                    currentQuestionIndex++;
                    if (currentQuestionIndex < questions.length) {
                        loadQuestion(questions[currentQuestionIndex]);
                    } else {
                        endQuiz(userName);
                    }
                } else {
                    alert("Please provide an answer before proceeding.");
                }
            });
        }

        function endQuiz(userName) {
            const message = score / questions.length >= 0.8
                ? `Congratulations ${userName}! You passed the quiz!`
                : `Sorry ${userName}, you failed the quiz.`;
            document.getElementById('app-container').innerHTML = `<div class="text-center"><h2>${message}</h2><button class="btn btn-primary mt-3" id="restart-quiz">Return to Start</button></div>`;

            document.getElementById('restart-quiz').addEventListener('click', () => {
                document.getElementById('app-container').innerHTML = startTemplate();
            });
        }
    }
});
