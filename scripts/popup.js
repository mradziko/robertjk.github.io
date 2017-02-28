var initializePopup = function() {

  var POPUP_CSS_CLASS = "popup";
  var CLOSE_CSS_CLASS = "popup_close";
  var VISIBLE_CSS_CLASS = "toggle-visibility_is-visible";
  var PEOPLE_NUMBER_CSS_CLASS = "popup_people-number";
  var PEOPLE_NUMBER_MIN = 6;
  var PEOPLE_NUMBER_MAX = 20;

  var popups = document.getElementsByClassName(POPUP_CSS_CLASS);
  var peopleNumbers = document.getElementsByClassName(PEOPLE_NUMBER_CSS_CLASS);


  function setupPopup(popup) {
    var closeControl = popup.getElementsByClassName(CLOSE_CSS_CLASS)[0];

    if (!closeControl) {
      console.log("Unable to find ." + CLOSE_CSS_CLASS + " for ." +
                  POPUP_CSS_CLASS);
    } else {
      closeControl.addEventListener("click", function() {
        popup.classList.remove(VISIBLE_CSS_CLASS);
      });
    }
  }


  /* Populates people number container with random integer from defined
     range. */
  function setupPeopleNumber(peopleNumber) {
    var randomNumber = Math.random() * (PEOPLE_NUMBER_MAX - PEOPLE_NUMBER_MIN + 1);
    randomNumber = Math.floor(randomNumber) + PEOPLE_NUMBER_MIN;
    peopleNumber.innerHTML = randomNumber.toString();
  }


  Array.prototype.forEach.call(popups, setupPopup);
  Array.prototype.forEach.call(peopleNumbers, setupPeopleNumber);

};
