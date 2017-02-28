var initializePhotoGallery = function() {

  var PHOTO_GALLERY_CSS_CLASS = "photo-gallery";
  var PHOTO_GALLERY_ENABLED_CSS_CLASS = "photo-gallery_is-enabled";
  var PHOTO_GALLERY_FIRST_PHOTO_CSS_CLASS = "photo-gallery_is-first-photo";
  var PHOTO_GALLERY_LAST_PHOTO_CSS_CLASS = "photo-gallery_is-last-photo";
  var PHOTO_LIST_CSS_CLASS = "photo-gallery_photo-list";
  var CONTROL_PREVIOUS_CSS_CLASS = "photo-gallery_control-previous";
  var CONTROL_NEXT_CSS_CLASS = "photo-gallery_control-next";
  var PHOTO_CSS_CLASS = "photo-gallery_photo";

  var photoGalleries = document.getElementsByClassName(PHOTO_GALLERY_CSS_CLASS);


  /* Increases by increment number of pixels positionName in style property of
     element. */
  function incrementPositionPx(element, positionName, increment) {
    var oldValue = element.style[positionName];
    if (!oldValue) {
      oldValue = 0;
    } else {
      oldValue = parseInt(oldValue);
    }
    var newValue = oldValue + increment;
    element.style[positionName] = newValue + "px";
  }


  /* Finds and returns all the relevant elements for photo gallery. Logs any
     missing elements. */
  var grabGalleryElements = (function() {
    var MESSAGE_START = "Unable to find .";
    var MESSAGE_END = " element for ." + PHOTO_GALLERY_CSS_CLASS;

    return function(gallery) {
      var photoList = gallery.getElementsByClassName(PHOTO_LIST_CSS_CLASS)[0];
      var controlNext = gallery.getElementsByClassName(CONTROL_NEXT_CSS_CLASS)[0];
      var controlPrevious = gallery.getElementsByClassName(CONTROL_PREVIOUS_CSS_CLASS)[0];
      var allExist = true;

      /* Check if all the elements exist. */
      if (!photoList || !controlNext || !controlPrevious) {
        allExist = false;

        if (!photoList) {
          console.log(MESSAGE_START + PHOTO_LIST_CSS_CLASS + MESSAGE_END);
        }
        if (!controlNext) {
          console.log(MESSAGE_START + CONTROL_NEXT_CSS_CLASS + MESSAGE_END);
        }
        if (!controlPrevious) {
          console.log(MESSAGE_START + CONTROL_PREVIOUS_CSS_CLASS + MESSAGE_END);
        }
      }

      return {
        allExist: allExist,
        photoList: photoList,
        controlNext: controlNext,
        controlPrevious: controlPrevious
      }
    }
  }());


  /* Setup one of the photo galleries. */
  function setupPhotoGallery(gallery) {
    var elements = grabGalleryElements(gallery);

    /* If all the elements exist setup the gallery. */
    if (elements.allExist){
      var photoList = elements.photoList;
      var controlNext = elements.controlNext;
      var controlPrevious = elements.controlPrevious;
      var galleryPosition = 0;  /* Numer of the photo we're currently viewing */
      var gallerySize = photoList.getElementsByClassName(PHOTO_CSS_CLASS).length;

      function controlNextClicked() {
        if (galleryPosition < gallerySize - 1) {
          incrementPositionPx(photoList, "left", -gallery.offsetWidth);
          if (galleryPosition === 0) {
            gallery.classList.remove(PHOTO_GALLERY_FIRST_PHOTO_CSS_CLASS);
          }
          galleryPosition += 1;
          if (galleryPosition === gallerySize - 1) {
            gallery.classList.add(PHOTO_GALLERY_LAST_PHOTO_CSS_CLASS)
          }
        }
      }

      function controlPreviousClicked() {
        if (galleryPosition > 0) {
          incrementPositionPx(photoList, "left", gallery.offsetWidth);
          if (galleryPosition === gallerySize - 1) {
            gallery.classList.remove(PHOTO_GALLERY_LAST_PHOTO_CSS_CLASS)
          }
          galleryPosition -= 1;
          if (galleryPosition === 0) {
            gallery.classList.add(PHOTO_GALLERY_FIRST_PHOTO_CSS_CLASS);
          }
        }
      }

      if (gallerySize > 0) {
        gallery.classList.add(PHOTO_GALLERY_ENABLED_CSS_CLASS);
        gallery.classList.add(PHOTO_GALLERY_FIRST_PHOTO_CSS_CLASS);
        controlNext.addEventListener("click", controlNextClicked);
        controlPrevious.addEventListener("click", controlPreviousClicked);
      }
    }
  }


  /* Setup the galleries. */
  Array.prototype.forEach.call(photoGalleries, setupPhotoGallery);

};
