<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <title>Online Quiz App</title>
</head>
<body>
    <div id="app-container" class="container mt-5"></div>

    <!-- Handlebars Templates -->
    <script id="start-template" type="text/x-handlebars-template">
        <div class="text-center">
            <h1>Welcome to the Online Quiz!</h1>
            <form id="start-form">
                <input type="text" class="form-control mb-3" id="username" placeholder="Enter Your Name" required>
                <select class="form-control mb-3" id="quiz-select">
                    <option value="quiz1">Quiz 1 - JavaScript Basics</option>
                    <option value="quiz2">Quiz 2 - CSS Fundamentals</option>
                </select>
                <button type="submit" class="btn btn-primary btn-block">Start Quiz</button>
            </form>
        </div>
    </script>

    <script id="question-template" type="text/x-handlebars-template">
        <div class="question-view">
            <h2>Question {{questionNumber}}</h2>
            <p>{{questionText}}</p>
            {{#if isMultipleChoice}}
                {{#each options}}
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer" value="{{this}}" id="option-{{@index}}">
                        <label class="form-check-label" for="option-{{@index}}">{{this}}</label>
                    </div>
                {{/each}}
            {{else}}
                <input type="text" id="answer-input" class="form-control" placeholder="Type your answer here">
            {{/if}}
            <button id="submit-answer" class="btn btn-primary mt-3">Submit Answer</button>
        </div>
    </script>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>
    <script>
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
    </script>
</body>
</html>
