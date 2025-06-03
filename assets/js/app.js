// // jeg ærklere function
// function simpleLog(){
//     console.log("ihh hvor jeg logger")
// }

// function openNewTab(){
//     window.open("https://ucn.dk", "_blank")
// }


// // Function with return value
// function getPi(){
//     return Math.PI;
// }

// function greetAGuest(name, age, favFood){
//     return `Velkommen til ærede ${name}, du er jo ${age}, år gammel men du ligner da en på ${age - 10} hahahahaha. Her er en skål med ${favFood} - det manglede da bare!`;
// }

// // call function

// // alert(greetAGuest("GOATCH", 37, "pølsemix med skumfiduser og remoulade" ))


// // const pi = getPi();
// // console.log('pi:', pi)


// // Declarations og arrow functions
// function sum(num1, num2){
//     return num1 + num2
// };

// console.log(sum(7, 233))

// const sum2 = (num1, num2) => num1 + num2;
// console.log(sum2(7, 233))

// function sayHi(){
//     console.log("Hej Mark")
// }

// const sayHi2 = () => console.log("Hej igen - arrow")
// sayHi2()

// Fang knapper
const openBtnEl = document.querySelector(".openBtn");
const closeBtnEl = document.querySelector(".closeBtn");
const dialogEl = document.querySelector("dialog");

// Opsæt eventlisteners på åbne/lukke knapper
openBtnEl.addEventListener("click", () => dialogEl.showModal())
closeBtnEl.addEventListener("click", () => dialogEl.close())
