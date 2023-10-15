const main = document.querySelector("#main")
const qna = document.querySelector("#qna")
const endPoint = 12
const result = document.querySelector("#result")
const select = []

function calResult() {
    let pointArray = [
        { name: "mouse", value: 0, key: 0 },
        { name: "cow", value: 0, key: 1 },
        { name: "tiger", value: 0, key: 2 },
        { name: "rabbit", value: 0, key: 3 },
        { name: "dragon", value: 0, key: 4 },
        { name: "snake", value: 0, key: 5 },
        { name: "horse", value: 0, key: 6 },
        { name: "sheep", value: 0, key: 7 },
        { name: "monkey", value: 0, key: 8 },
        { name: "chick", value: 0, key: 9 },
        { name: "dog", value: 0, key: 10 },
        { name: "pig", value: 0, key: 11 }
    ];

    for (i = 0; i < endPoint; i++) {
        let target = qnaList[i].a[select[i]];
        for (j = 0; j < target.type.length; j++) {
            for (k = 0; k < pointArray.length; k++) {
                if (target[j] === pointArray[k].name) {
                    pointArray[k].value += 1;
                }
            }
        }
    }
    let resultArray = pointArray.sort(function (a, b) {
        if (a.value > b.value) {
            return -1;
        }
        if (a.value < b.value) {
            return 1;
        }
        return 0;
    });
   console.log(resultArray);
    let resultword = resultArray[0].key;
    return resultword;
}

function addAnswer(answerText, qIdx, idx) {
    let a = document.querySelector(".answerBox");
    let answer = document.createElement("button")
    answer.classList.add("answerList")
    answer.classList.add("my-3")
    answer.classList.add("py-3")
    answer.classList.add("mx-auto")
    answer.classList.add("fadeIn")
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
       let children =  document.querySelectorAll(".answerList")
       for(i=0; i<children.length; i++){
        children[i].disabled = true;
        children[i].style.WebkitAnimation = "fadeOut 0.5s"
        children[i].style.animation = "fadeOut 0.5s"
       }
       setTimeout(()=>{
        select[qIdx] = idx
        for(i=0; i<children.length; i++){
            children[i].style.display = "none"
        }
       }, 100)
       goNext(++qIdx)
    }, false)
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s"
    qna.style.animation = "fadeOut 1s"
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s"
        result.style.animation = "fadeIn 1s"
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)
    })
   // console.log(select)
    calResult()
}

function goNext(qIdx){
 if(qIdx === endPoint){
    goResult()
    return
 }

 let q = document.querySelector(".qBox");
 q.innerHTML = qnaList[qIdx].q;
 for (let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
 };
 let status = document.querySelector(".statusBar")
 status.style.width = (100/endPoint) * (qIdx+1) + "%"
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s"
    main.style.animation = "fadeOut 1s"
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s"
        qna.style.animation = "fadeIn 1s"
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0
        goNext(qIdx)
    }, 450)
}
