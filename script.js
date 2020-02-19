const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const modal=document.getElementById("modal")
const modals=document.getElementById("modals")
const container=document.getElementById("container1")
const restart_btn=document.getElementById("restart-btn")
const try_btn=document.getElementById("try-btn")
const time001=document.getElementById("time001")
const cor=document.getElementById("cor")
const wro=document.getElementById("wro")




let shuffledQuestions, currentQuestionIndex

 let correct_sum=0;
 var wrong_sum=0;


function timer001(){
    c=c-1;
    if(c<100){
        time001.innerHTML = c;
    }
    if(c<1){
        window.clearInterval(update);
    //     startButton.innerText = 'Finish';
    // startButton.classList.remove('hide')
    
    //modal.innerHTML="Out Of Time";
        modals.classList.add("active");
    container.classList.add('hide');
        
      
      try_btn.addEventListener('click', () => {
        modals.classList.remove("active");
    container.classList.remove('hide');
    update=setInterval(timer001,1000)
    c=100;
        
      })
        
    }
}
// update=setInterval(timer001,1000)


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  c=100;
  update=setInterval(timer001,1000)
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
  const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
     
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  
  if(correct){
    correct_sum++;
  }
  if(!correct){
    wrong_sum++;
  }
 
  console.log(correct_sum)
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    modal.classList.remove("active");
  } else {
    window.clearInterval(update);
    c="-";
    startButton.innerText = 'Finish';
    startButton.classList.remove('hide')
    
    startButton.addEventListener('click', () => {
        cor.innerHTML=correct_sum;
        wro.innerHTML=wrong_sum;
        modal.classList.add("active");
    container.classList.add('hide');
        
      })
      restart_btn.addEventListener('click', () => {
        modal.classList.remove("active");
    container.classList.remove('hide');
    correct_sum=0;
    wrong_sum=0;

    
        
      })
      
  }

}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    // correct_sum++;
    // alert(correct);
  } else {
    // wrong_sum++;
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
  modal.classList.remove("active");
}

const questions = [
  {
    question: 'How many Storage Classes in C?',
    answers: [
      { text: '4', correct: true },
      { text: '6', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Bhuvan Bam', correct: true },
      { text: 'Amit Bhadana', correct: true },
      { text: 'Technical Guruji', correct: true },
      { text: 'Harsh Benival', correct: true }
    ]
  },
  {
    question: 'Are you satisfied with your life?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 8?',
    answers: [
      { text: '6', correct: false },
      { text: '32', correct: true }
    ]
  }
]
