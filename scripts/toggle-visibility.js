"use strict";


var initializeToggleVisibility = function() {

  var INITIALLY_HIDDEN_CSS_CLASS = "toggle-visibility_initially-hidden";
  var IS_VISIBLE_CLASS = "toggle-visibility_is-visible";
  var hiddenElements = document.getElementsByClassName(INITIALLY_HIDDEN_CSS_CLASS);


  setTimeout(function() {
    /* Display the elements that were initially hidden only to be animated into view. */
    Array.prototype.forEach.call(hiddenElements, function(element) {
      element.classList.add(IS_VISIBLE_CLASS);
    });
  }, 100);

};
