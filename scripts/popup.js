document.addEventListener("DOMContentLoaded", function() {

  const POPUP_CSS_CLASS = "popup";
  const CLOSE_CSS_CLASS = "popup_close";
  const POPUP_CLOSED_CSS_CLASS = "popup_is-closed";

  let popups = document.getElementsByClassName(POPUP_CSS_CLASS);


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

  Array.prototype.forEach.call(popups, setupPopup);

});
