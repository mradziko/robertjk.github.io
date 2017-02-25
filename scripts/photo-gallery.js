document.addEventListener("DOMContentLoaded", function() {

  function incrementPosition(element, positionName, increment) {
    let oldValue = element.style[positionName];
    if (!oldValue) {
      oldValue = 0;
    } else {
      oldValue = parseInt(oldValue);
    }
    let newValue = oldValue + increment;
    element.style[positionName] = newValue + "px";
  }

  let photoGalleries = document.getElementsByClassName("photo-gallery");

  Array.prototype.forEach.call(photoGalleries, function(gallery) {
    let photoList = gallery.getElementsByClassName("photo-gallery_photo-list")[0];
    let nextButton = gallery.getElementsByClassName("photo-gallery_control-next")[0];
    let prevButton = gallery.getElementsByClassName("photo-gallery_control-previous")[0];

    let galleryPosition = 0;  /* Numer of the photo we're currently viewing */
    let gallerySize = photoList.getElementsByClassName("photo-gallery_photo").length;

    nextButton.addEventListener("click", function() {
      if (galleryPosition < gallerySize - 1) {
        incrementPosition(photoList, "left", -gallery.offsetWidth);
        galleryPosition += 1;
      }
    })

    prevButton.addEventListener("click", function() {
      if (galleryPosition > 0) {
        incrementPosition(photoList, "left", gallery.offsetWidth);
        galleryPosition -= 1;
      }
    });
  });

});
