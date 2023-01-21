// getting all required elements

const startBtn = document.querySelector(".start_button button"),
    infoBox = document.querySelector(".info_box"),
    exitBtn = infoBox.querySelector(".buttons .quit"),
    continueBtn = infoBox.querySelector(".buttons .restart"),
    quizBox = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quizBox.querySelector(".timer .timer_sec");
const timeLine = quizBox.querySelector("header .time_line");
const timeOff = quizBox.querySelector("header .time_text");


//if start quiz button clicked
startBtn.onclick = () => {
    infoBox.classList.add("activeInfo"); // show the info box
}

// if exit button is clicked
exitBtn.onclick = () => {
    infoBox.classList.remove("activeInfo"); // hide the info box
}

//if continue button is clicked
continueBtn.onclick = () => {
    infoBox.classList.remove("activeInfo"); // hide the info box
    quizBox.classList.add("activeQuiz"); // show quix box
    showQuestions(0);
    queCounter(1)
    startTimer(15);
    startTimerLine(0);
}


let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quizBox.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
//if next button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter)
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "time Left :";


    } else {
        clearInterval(counter)
        clearInterval(counterLine);
        // console.log("questioned completed");
        showResultBox();
    }
}

//getting questions and options from array

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = `<span>` + questions[index].numb + "." + questions[index].question + `</span>`;
    let option_tag = ` <div class="option"><span>` + questions[index].options[0] + `</span></div>`
        + ` <div class="option"><span>` + questions[index].options[1] + `</span></div>`
        + ` <div class="option"><span>` + questions[index].options[2] + `</span></div>`
        + ` <div class="option"><span>` + questions[index].options[3] + `</span></div>`;
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")
    }

}

let tickIcon = ` <div class="icon tick"><i class="fa-solid fa-check"></i></div>`;
let crossIcon = ` <div class="icon cross"><i class="fa-solid fa-xmark"></i></div>`;

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    let allOption = option_list.children.length;
    if (userAns == correctAnswer) {
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        userScore++;
        console.log(userScore)
        // console.log("answer is correcr")
    } else {
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeend", crossIcon)
        // console.log("incorrect answer")

        // if the answer is incorrect then automatically selected the correct answer
        for (let i = 0; i < allOption; i++) {
            if (option_list.children[i].textContent == correctAnswer) {
                option_list.children[i].setAttribute("class", "option correct")
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
            }
        }
    }

    // once user selected disabled all options
    for (let i = 0; i < allOption; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function queCounter(index) {
    const bottom_ques_counter = quizBox.querySelector(".total_que");
    let totalQuestionCountTag = `<span><p>` + index + `</p> Of <p> ` + questions.length + `</p>Questions</span>`;
    bottom_ques_counter.innerHTML = totalQuestionCountTag;
}

function showResultBox() {
    quizBox.classList.remove("activeQuiz"); // hide the info box
    result_box.classList.add("activeResult"); // show quix box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 4) {
        let score_tag = `<span>and Congrats! you got  <p>` + userScore + `</p> out of <p>` + questions.length + `.</p></span>`;
        scoreText.innerHTML = score_tag;
    }
    else if (userScore > 1) {
        let score_tag = `<span>and Nice, you got only <p>` + userScore + `</p> out of <p>` + questions.length + `.</p></span>`;
        scoreText.innerHTML = score_tag;
    }
    else {
        let score_tag = `<span>and Sorry, you got  <p>` + userScore + `</p> out of <p>` + questions.length + `.</p></span>`;
        scoreText.innerHTML = score_tag;
    }

}

restart_quiz.onclick = () => {
    quizBox.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");

    let que_count = 0;
    let que_numb = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter)
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "time Left :";
}

quit_quiz.onclick = () => {
    window.location.reload();
}



function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.innerText = time;
        time--;

        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }

        if (time < 0) {
            clearInterval(counter);
            timeCount.innerText = "00";

            timeOff.textContent = "time Off :";

            // let userAns = answer.textContent;
            let correctAnswer = questions[que_count].answer;
            let allOption = option_list.children.length;

            // if answer is not selected till 00 , then show the correct answer
            for (let i = 0; i < allOption; i++) {
                if (option_list.children[i].textContent == correctAnswer) {
                    option_list.children[i].setAttribute("class", "option correct")
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
                }
            }

            for (let i = 0; i < allOption; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";


        }
    }
}




function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";


        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}


