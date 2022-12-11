const questions = [
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
            "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
            "Ice Cream Sandwich",
            "Jelly Bean",
            "Marshmallow",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
];

let answerArray = [];
let currentQuestion = 0;
let score = 0;
let tryAgain = false;
let showAnswer = false;

function getAllAnswers() {
    for (const wAnswer of questions) {
        answerArray.push(wAnswer.incorrect_answers)
    }
    let i = 0;
    for (const rAnswer of questions) {
        answerArray[i].push(rAnswer.correct_answer)
        i++;
    }
}

getAllAnswers()


function shuffleAnserts() {

    for (let singleArr of answerArray) {
        let i = singleArr.length;
        let randomNumber = 0;
        let temp = 0;
        while (--i > 0) {
            randomNumber = Math.floor(Math.random() * (i + 1));
            temp = singleArr[randomNumber];
            singleArr[randomNumber] = singleArr[i]
            singleArr[i] = temp;
        }
    }
}

shuffleAnserts()


function displayQandA(currentQuestion) {
    let nodeParentDiv = document.getElementsByClassName('questionDiv')[0]
    let nodePQuestion = document.createElement('p');
    nodePQuestion.innerText = questions[currentQuestion].question
    nodePQuestion.classList.add('question')
    nodeParentDiv.appendChild(nodePQuestion)
    for (const answer of answerArray[currentQuestion]) {
        let nodeDivAnswer = document.createElement('div');
        nodeDivAnswer.innerText = answer;
        nodeDivAnswer.classList.add('answer');
        nodeDivAnswer.addEventListener('click', function (event) {
            event.target.classList.toggle('selected')
        })
        nodeParentDiv.appendChild(nodeDivAnswer)
    }
    showAnswer = true
}

displayQandA(currentQuestion)

function hidePrevious() {

    let question = document.getElementsByClassName('question')[currentQuestion - 1];
    let answers = document.getElementsByClassName('answer');
    question.classList.add('hide')
    for (const answer of answers) {
        answer.classList.add('hide')
    }
}

function checkAnswer(currentQuestion) {
    let falseAnswer = false;
    let rightAnswer = false;
    let answers = document.getElementsByClassName('answer')
    for (const answer of answers) {

        if (answer.innerText === questions[currentQuestion].correct_answer) {
            if (answer.className === 'answer selected') {
                score++;
                rightAnswer = true;
            }
            answer.classList.add('correct')
        }
        if (answer.className === 'answer selected') {
            answer.classList.add('false')
            falseAnswer = true;
        }
    }
    if (falseAnswer && rightAnswer) {
        score--;
    }
    showAnswer = false;
}

function showResult() {
    let nodePResult = document.createElement('p');
    let nodeParentDiv = document.getElementsByClassName('questionDiv')[0]
    if (score >= 5) {
        nodePResult.innerText = `Congratulations you answered ${score}/10 questions right, you passed the quiz`
    }
    else {
        if (score <= 0) {
            score = 0
        }
        nodePResult.innerText = `You answered ${score}/10 questions right, you failed the quiz`
    }
    nodePResult.classList.add('resultScore')
    nodeParentDiv.appendChild(nodePResult)

    tryAgain = true

    let nextQuestionBtn = document.getElementById('nextQuestion');
    nextQuestionBtn.innerText = 'Try Again'

}


function nextQuestion() {
    if (tryAgain) {
        tryAgain = false;
        let nextQuestionBtn = document.getElementById('nextQuestion');
        nextQuestionBtn.innerText = 'Next Question'
        location.reload()
        showAnswer = true
    }
    else if (showAnswer) {
        checkAnswer(currentQuestion)
    }
    else if (currentQuestion + 1 >= questions.length) {
        currentQuestion++;
        hidePrevious()
        showResult()
    }
    else {

        currentQuestion++;
        hidePrevious()
        displayQandA(currentQuestion)
    }
}

// Check if the clicked answer is in the array of abjects, if not, questio is print, counter +1

