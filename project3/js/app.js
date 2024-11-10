document.addEventListener('DOMContentLoaded', () => {
    // h template
    let startTemplateSource = document.getElementById('start-template').innerHTML;
    let startTemplate = Handlebars.compile(startTemplateSource);

    // reender
    document.getElementById('app-container').innerHTML = startTemplate();

    // submit
    document.getElementById('start-form').addEventListener('submit', (event) => {
        event.preventDefault();
        let userName = document.getElementById('username').value;
        let selectedQuiz = document.getElementById('quiz-select').value;

        if (userName) {
            // quiz start
            console.log("User Name:", userName);
            console.log("Selected Quiz:", selectedQuiz);
            startQuiz(userName, selectedQuiz);
        }
    });
});

function startQuiz(userName, selectedQuiz) {
    // Placeholder function to be implemented in future steps
    // Load the first question dynamically
    console.log(`Starting quiz for ${userName} with ${selectedQuiz}`);
}
