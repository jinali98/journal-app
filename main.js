let addPage = document.querySelector(".get-page-button");
let modalBg = document.querySelector(".modal-bg");
let close = document.querySelector(".close");
// get themes buttons
let theme1 = document.querySelector(".theme1");
let theme2 = document.querySelector(".theme2");
let theme3 = document.querySelector(".theme3");

let nav = document.querySelector(".nav-container");
let page = document.querySelector(".page");
let model = document.querySelector(".modal");

addPage.addEventListener("click", function () {
  modalBg.classList.add("modal-active");
});
close.addEventListener("click", function () {
  modalBg.classList.remove("modal-active");
});

// theme 1
theme1.addEventListener("click", function () {
  nav.classList.remove("theme2-nav");
  nav.classList.remove("theme3-nav");
  nav.classList.add("theme1-nav");

  page.classList.remove("theme2-page");
  page.classList.remove("theme3-page");
  page.classList.add("theme1-page");

  model.classList.remove("theme2-modal");
  model.classList.remove("theme3-modal");
  model.classList.add("theme1-modal");

  page.classList.remove("newPage");
});

// theme 2
theme2.addEventListener("click", function () {
  nav.classList.remove("theme1-nav");
  nav.classList.remove("theme3-nav");
  nav.classList.add("theme2-nav");

  page.classList.remove("theme1-page");
  page.classList.remove("theme3-page");
  page.classList.add("theme2-page");

  model.classList.remove("theme1-modal");
  model.classList.remove("theme3-modal");
  model.classList.add("theme2-modal");

  page.classList.remove("newPage");
});

// theme 3
theme3.addEventListener("click", function () {
  nav.classList.remove("theme2-nav");
  nav.classList.remove("theme1-nav");
  nav.classList.add("theme3-nav");

  page.classList.remove("theme2-page");
  page.classList.remove("theme1-page");
  page.classList.add("theme3-page");

  model.classList.remove("theme2-modal");
  model.classList.remove("theme1-modal");
  model.classList.add("theme3-modal");

  page.classList.remove("newPage");
});

// get the current date

let currentDay = document.getElementById("current-day");

let date = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};
let currentDate = date.toLocaleDateString("en-US", options);
currentDay.innerHTML = currentDate;

// add to local storage

let textTitle = document.getElementById("textTitle");
let textContent = document.getElementById("textContent");
let display = document.getElementById("newPage");
let success = document.getElementById("success");

document.getElementById("add").addEventListener("click", addToStorage);

function addToStorage() {
  let textTitleValue = textTitle.value;
  let textContentValue = textContent.value;
  let date = currentDate;

  if (textTitleValue === "" || textContentValue === "") {
    document.getElementById(
      "error"
    ).innerHTML = `<h3 class="error-message">Please add Title and Content to create a page</h3>`;
  } else {
    // insert user inpurt into an abject array
    let notes = [
      {
        title: textTitleValue,
        content: textContentValue,
        date: date,
      },
    ];
    // get the exsisting jason data from the local storage and convert to string values
    let getNotes = JSON.parse(localStorage.getItem("diary")) || [];
    // push the user input into the converted object array
    getNotes.push(notes);

    // convert string to json data
    let notes_s = JSON.stringify(getNotes);
    // send the json data in to localstorage
    localStorage.setItem("diary", notes_s);
    console.log(getNotes);
    // displayTodo();
    location.reload();
  }
}

function displayTodo() {
  if (localStorage.getItem("diary")) {
    let notesObject = JSON.parse(localStorage.getItem("diary"));

    for (let i = 0; i < notesObject.length; i++) {
      let item = `
            <p class="page-title">${notesObject[i][0].title}</p>   
			<p class="page-date">${notesObject[i][0].date} </p>
            <p class="page-content">${notesObject[i][0].content}</p>
            <button id="delete-button" class="deleteButton">Remove</button>
			<hr/>
        `;
      display.innerHTML += item;
    }
    // select all the delete buttons
    let deleteButtons = document.getElementsByClassName("deleteButton");
    // select a remove button when user click on it
    for (i = 0; i < deleteButtons.length; i++) {
      let button = deleteButtons[i];

      button.addEventListener("click", function (e) {
        let buttonClicked = e.target;

        getClicked(buttonClicked);
      });
    }
  }
}

// compare the value of the selected content with the values in local storage
function getClicked(buttonClicked) {
  let deletetitle =
    buttonClicked.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent;
  let getLSContent = JSON.parse(localStorage.getItem("diary"));

  getLSContent.forEach((content, index) => {
    if (content[0].title === deletetitle) {
      console.log(content[0].title);
      getLSContent.splice(index, 1);
    }
  });

  localStorage.setItem("diary", JSON.stringify(getLSContent));

  // displayTodo();
  location.reload();
}
