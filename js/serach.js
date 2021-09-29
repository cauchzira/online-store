"use strict";
//Первое решение
document.querySelector(".search").oninput = function () {
  let value = this.value.toLowerCase().trim();
  const itemList = document.querySelectorAll(".product-item");
  if (value.toLowerCase() != "") {
    itemList.forEach(function (elem) {
      //   console.log(elem.inneText);
      if (elem.innerText.toLowerCase().search(value) == -1) {
        elem.classList.add("hidden");
      } else {
        elem.classList.remove("hidden");
      }
    });
  } else {
    itemList.forEach(function (elem) {
      elem.classList.remove("hidden");
    });
  }
};

// МЕГАСУПЕРПУПЕРРЕШЕНИЯINONELINE
//Второе решение

// const searchInput = document.querySelector(".search");

// function searchCart({target}) {
//   Array.from(document.querySelectorAll(".product-item")).map(v => (v.classList.remove("hidden"), v)).filter(() => Boolean(target.value)).forEach(v => !v.textContent.toLowerCase().includes(value.toLowerCase()) && v.classList.add("hidden"));
// }
// searchInput.addEventListener("input", searchCart);
