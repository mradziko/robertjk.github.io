document.addEventListener("DOMContentLoaded", function() {

  const POPUP_CSS_CLASS = "popup";
  const CLOSE_CSS_CLASS = "popup_close";
  const POPUP_CLOSED_CSS_CLASS = "popup_is-closed";
  const PEOPLE_NUMBER_CSS_CLASS = "popup_people-number";
  const PEOPLE_NUMBER_MIN = 6;
  const PEOPLE_NUMBER_MAX = 20;

  let popups = document.getElementsByClassName(POPUP_CSS_CLASS);
  let peopleNumbers = document.getElementsByClassName(PEOPLE_NUMBER_CSS_CLASS);


  function setupPopup(popup) {
    let closeControl = popup.getElementsByClassName(CLOSE_CSS_CLASS)[0];

    if (!closeControl) {
      console.log("Unable to find ." + CLOSE_CSS_CLASS + " for ." +
                  POPUP_CSS_CLASS);
    } else {
      closeControl.addEventListener("click", function() {
        popup.classList.add(POPUP_CLOSED_CSS_CLASS);
      });
    }
  }


  /* Populates people number container with random integer from defined
     range. */
  function setupPeopleNumber(peopleNumber) {
    let randomNumber = Math.random() * (PEOPLE_NUMBER_MAX - PEOPLE_NUMBER_MIN + 1);
    randomNumber = Math.floor(randomNumber) + PEOPLE_NUMBER_MIN;
    peopleNumber.innerHTML = randomNumber.toString();
  }


  Array.prototype.forEach.call(popups, setupPopup);
  Array.prototype.forEach.call(peopleNumbers, setupPeopleNumber);

});
