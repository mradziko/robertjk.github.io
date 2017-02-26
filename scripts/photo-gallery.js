document.addEventListener("DOMContentLoaded", function() {

  const PHOTO_GALLERY_CSS_CLASS = "photo-gallery";
  const PHOTO_GALLERY_ENABLED_CSS_CLASS = "photo-gallery_is-enabled";
  const PHOTO_GALLERY_FIRST_PHOTO_CSS_CLASS = "photo-gallery_is-first-photo";
  const PHOTO_GALLERY_LAST_PHOTO_CSS_CLASS = "photo-gallery_is-last-photo";
  const PHOTO_LIST_CSS_CLASS = "photo-gallery_photo-list";
  const CONTROL_PREVIOUS_CSS_CLASS = "photo-gallery_control-previous";
  const CONTROL_NEXT_CSS_CLASS = "photo-gallery_control-next";
  const PHOTO_CSS_CLASS = "photo-gallery_photo";

  let photoGalleries = document.getElementsByClassName(PHOTO_GALLERY_CSS_CLASS);


  /* Increases by increment number of pixels positionName in style property of
     element. */
  function incrementPositionPx(element, positionName, increment) {
    let oldValue = element.style[positionName];
    if (!oldValue) {
      oldValue = 0;
    } else {
      oldValue = parseInt(oldValue);
    }
    let newValue = oldValue + increment;
    element.style[positionName] = newValue + "px";
  }


  /* Finds and returns all the relevant elements for photo gallery. Logs any
     missing elements. */
  function grabGalleryElements(gallery) {
    let photoList = gallery.getElementsByClassName(PHOTO_LIST_CSS_CLASS)[0];
    let controlNext = gallery.getElementsByClassName(CONTROL_NEXT_CSS_CLASS)[0];
    let controlPrevious = gallery.getElementsByClassName(CONTROL_PREVIOUS_CSS_CLASS)[0];
    let allExist = true;

    /* Check if all the elements exist. */
    if (!photoList || !controlNext || !controlPrevious) {
      const messageStart = "Unable to find .";
      const messageEnd = " element for ." + PHOTO_GALLERY_CSS_CLASS;

      allExist = false;

      if (!photoList) {
        console.log(messageStart + PHOTO_LIST_CSS_CLASS + messageEnd);
      }
      if (!controlNext) {
        console.log(messageStart + CONTROL_NEXT_CSS_CLASS + messageEnd);
      }
      if (!controlPrevious) {
        console.log(messageStart + CONTROL_PREVIOUS_CSS_CLASS + messageEnd);
      }
    }

    return {
      allExist: allExist,
      photoList: photoList,
      controlNext: controlNext,
      controlPrevious: controlPrevious
    }
  }


  /* Setup one of the photo galleries. */
  function setupPhotoGallery(gallery) {
    let elements = grabGalleryElements(gallery);

    /* If all the elements exist setup the gallery. */
    if (elements.allExist){
      let photoList = elements.photoList;
      let controlNext = elements.controlNext;
      let controlPrevious = elements.controlPrevious;
      let galleryPosition = 0;  /* Numer of the photo we're currently viewing */
      let gallerySize = photoList.getElementsByClassName(PHOTO_CSS_CLASS).length;

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

});
