/* Initializes all modules. */
document.addEventListener("DOMContentLoaded", function() {
  initializePopup();
  initializeToggleVisibility();
  initializeDataLoader(function() {
    /* Photo galleries should be initialized only after data
       has been fetched and rendered. */
    initializePhotoGallery();
  });
});
