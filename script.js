const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultsEl = document.getElementById('results')
let score = 0;
let currentIndex;

const questionsArray = [
    {
        type: 'input',
        question: 'Кто автор эпической поэмы Одиссея?',
        answers: 'Гомер'
    },
    {
        type: 'check',
        question: 'Какая основная тема Одиссеи?',
        answers: [
            {text: 'вмешательство богов в судьбы людей', right: false},
            {text: 'битва за троны', right: false},
            {text: 'путешествие домой и возвращение в Итаку', right: true},
            {text: 'поиск сокровищ в далёких странах', right: false}
        ]
    },
    {
        type: 'check',
        question: 'Где Одиссей встретил циклопа Полифема?',
        answers: [
            {text: 'на Олимпе', right: false},
            {text: 'в городе Троя', right: false},
            {text: 'на острове Церцеи', right: false},
            {text: 'в пещере', right: true}
        ]
    },
    {
        type: 'input',
        question: 'Какой бог помогает Одисссею в его путешествии?',
        answers: 'Афина'
    },
    {
        type: 'check',
        question: 'Кто такой Телемах?',
        answers: [
            {text: 'отец Одиссея', right: false},
            {text: 'сын Одиссея', right: true},
            {text: 'бог', right: false},
            {text: 'герой Трои', right: false}
        ]
    }
]

startBtn.addEventListener('click', startQuiz)

function startQuiz() {
    questionContainer.classList.remove('hidden')
    startBtn.classList.add('hidden');
    currentIndex = 0;
    showQuestion(questionsArray[currentIndex])
}

function showQuestion() {
    answersEl.innerHTML = ''
    questionEl.innerText = questionsArray[currentIndex].question;
    if (questionsArray[currentIndex].type === 'check') {
        questionsArray[currentIndex].answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('button');
        answersEl.appendChild(button);
        
        button.addEventListener('click', () => {
           if (answer.right) {
                //alert('Вы ответили верно')
                button.setAttribute('id', 'right')
                score++;
            } else {
                //alert('Вы ответили не верно')
                button.setAttribute('id', 'wrong')
            } 
            setTimeout(setNextQuestion, 2000)  
        })    
    });
    } else if (questionsArray[currentIndex].type === 'input') {
        const inputEl = document.createElement('input');
        inputEl.type = 'text';
        inputEl.name = 'answer';
        inputEl.placeholder = 'Введите ответ'
        answersEl.appendChild(inputEl);
        const button = document.createElement('button');
        button.innerText = 'Ответить';       
        button.classList.add('button', 'btn-input');
        answersEl.appendChild(button);

        button.addEventListener('click', () => {
            if (inputEl.value.toLowerCase() === questionsArray[currentIndex].answers.toLowerCase()) {
                alert('Вы ответили верно')
                score++;
            } else {
                alert('Вы ответили не верно')
            }
            setTimeout(setNextQuestion, 1000)   
        })     
    }
}

function setNextQuestion() {
    answersEl.innerHTML = ''
    if (currentIndex < questionsArray.length - 1) {
        currentIndex++; 
        showQuestion(questionsArray[currentIndex]) 
    } else {
        showResults()
    }
}
    
function showResults() {
    questionEl.innerHTML ='';
    resultsEl.classList.remove('hidden')
    resultsEl.innerHTML = `
    <h1>Викторина окончена!</h1>
    <p>Вы ответили правильно на ${score} из ${questionsArray.length} 
    вопросов (${Math.floor(score/questionsArray.length*100)}%) </p>
    <button class="button btn-input" onclick="restartQuiz()">Перезапустить</button>
    `;
}

function restartQuiz() {
    resultsEl.innerHTML ='';
    score = 0;
    currentIndex = 0;
    startQuiz()
}