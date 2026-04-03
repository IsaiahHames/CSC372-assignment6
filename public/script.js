//script.js
"use strict";
(function () {
  const MY_SERVER_BASEURL = "/api/jokebook";
  window.addEventListener("load", init);
  function init() {
    getRandomJoke();
  }
  function getRandomJoke() {
    let jokesDiv = id("random-joke-container");
    fetch(MY_SERVER_BASEURL + "/random")
      .then(checkStatus)
      .then((response) => {
        addParagraph(jokesDiv, response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  const categoriesButton = id("categories-button");
  categoriesButton.addEventListener("click", getJokeCategories);
  function getJokeCategories() {
    let categoriesDiv = id("categories-container");
      fetch(MY_SERVER_BASEURL + "/categories")
        .then(checkStatus)
        .then((response) => {
          response.forEach((JokebookCategory) => {
            addCategory(categoriesDiv, JokebookCategory);
          });
          let heading = document.createElement("h3");
          heading.appendChild(document.createTextNode("Joke Categories:"));
          const categoriesHeader = id("categories-header");
          categoriesHeader.appendChild(heading);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
  }

  function addParagraph(jokesDiv, jokeObject) {
    let article = document.createElement("article");
    let heading = document.createElement("h3");
    heading.appendChild(document.createTextNode(jokeObject.setup));
    let para = document.createElement("p");
    para.appendChild(document.createTextNode(jokeObject.delivery));
    article.appendChild(heading);
    article.appendChild(para);
    jokesDiv.appendChild(article);
  }

  function addCategory(categoriesDiv, JokebookCategory) {
    let button = document.createElement("button");
    button.setAttribute("id", JokebookCategory.category + "-button");
    button.appendChild(document.createTextNode(JokebookCategory.category));
    categoriesDiv.appendChild(button);

      button.addEventListener("click", function () {
        fetch(MY_SERVER_BASEURL + "/category/" + JokebookCategory.category)
          .then(checkStatus)
          .then((response) => {
            let JokesDiv = id("jokes-container");
            if(JokesDiv.childElementCount > 0){
              JokesDiv.replaceChildren();
            }
            response.forEach((jokeObject) => {
              addJokeCard(JokesDiv, jokeObject);
            });
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      });
  }

  function addJokeCard(jokesDiv, jokeObject) {
    let article = document.createElement("article");
    article.setAttribute("id", "joke-card");
    let heading = document.createElement("h3");
    heading.appendChild(document.createTextNode(jokeObject.setup));
    let para = document.createElement("p");
    para.appendChild(document.createTextNode(jokeObject.delivery));
    article.appendChild(heading);
    article.appendChild(para);
    jokesDiv.appendChild(article);
  }

  const submitButton = id("joke-submit");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    let categoryInput = id("joke-category");
    let setupInput = id("joke-setup");
    let deliveryInput = id("joke-delivery");
    let jokeObject = {
      category: categoryInput.value,
      setup: setupInput.value,
      delivery: deliveryInput.value,
    };
    fetch(MY_SERVER_BASEURL + "/joke/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeObject),
    })
      .then(checkStatus)
      .then((response) => {
        categoryInput.value = "";
        setupInput.value = "";
        deliveryInput.value = "";
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

      fetch(MY_SERVER_BASEURL + "/category/" + categoryInput.value)
          .then(checkStatus)
          .then((response) => {
            let JokesDiv = id("jokes-container");
            if(JokesDiv.childElementCount > 0){
              JokesDiv.replaceChildren();
            }
            response.forEach((jokeObject) => {
              addJokeCard(JokesDiv, jokeObject);
            });
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      
  });

  function id(idName) {
    return document.getElementById(idName);
  }
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response.json();
  }
})();



