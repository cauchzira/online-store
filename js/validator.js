"use strict";

//Находим объекты с которыми будем работать в дальнейшем
const sendBtn = document.querySelector(".form-btn-send");
const userInputData = document.querySelectorAll(".form-input");
const userMessage = document.querySelector(".form-user-message");
const incorrectInput = document.querySelectorAll(".incorrect-input");

// console.log(sendBtn);
// console.dir(userInputData);
// console.log(userMessage);

sendBtn.addEventListener("click", () => {
  // console.dir(userInputData);
  for (const item of userInputData) {
    const regexpLit = /^(?:(?:[А-Я])|[а-я])[а-я]+$/g;
    if (item.id === "name") {
      if (regexpLit.test(item.value)) {
        item.classList.remove("red");
        getAttrId(item.classList.contains("red"), item.id);
      } else {
        item.classList.add("red");
        getAttrId(item.classList.contains("red"), item.id);
        // console.log(item.classList.contains("red"));
      }
      item.value = "";
    }

    if (item.id === "telephone") {
      const regexpNum = /^(?:(?:\+7)|8)\d{10}$/g;
      if (regexpNum.test(item.value)) {
        item.classList.remove("red");
        getAttrId(item.classList.contains("red"), item.id);
      } else {
        item.classList.add("red");
        getAttrId(item.classList.contains("red"), item.id);
        // console.log(item.classList.contains("red"));
      }
      item.value = "";
    }

    if (item.id === "mail") {
      const regexpMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (regexpMail.test(item.value)) {
        item.classList.remove("red");
        getAttrId(item.classList.contains("red"), item.id);
      } else {
        item.classList.add("red");
        getAttrId(item.classList.contains("red"), item.id);
        // console.log(item.classList.contains("red"));
      }
      item.value = "";
    }
  }
});

function getAttrId(flag, idItem) {
  // console.log(flag);
  incorrectInput.forEach(elementAttr => {
    // console.log(elementAttr.dataset.id);
    if (elementAttr.dataset.id === idItem) {
      if (flag) {
        elementAttr.classList.remove("hidden");
      } else {
        elementAttr.classList.add("hidden");
      }
    }
  });
}

let str = `One: 'Hi Mary.'
Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'`;
console.log(str);

// console.log(str.replace(/'/gi, `"`));
console.log(str.replace(/\B'/g, `"`));
