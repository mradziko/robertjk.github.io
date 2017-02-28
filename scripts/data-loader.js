/* Callback is a function that will be called after the data finishes loading. */
var initializeDataLoader = function(dataLoadedCallback) {

  var DATA_API_URL = "https://smf.staging.findor.com/api/v2/hotel/?checkIn=20170527&checkOut=20170529&checkin=20170527&checkout=20170529&contentDetails=all&freeCancel=true&locKeyword=Tampa,+US&locale=en_US&rateDetails=medium&room1=2,0&totalStrikeRate=true&unavailableHotels=false&unknownHotels=false&include_directions=true";

  var HOTEL_OFFERS_TEMPLATE_ID = "hotel-offers-template";
  var HOTEL_OFFERS_CONTAINER_ID = "hotel-offers-hot";

  var hotelOffersTemplate = document.getElementById(HOTEL_OFFERS_TEMPLATE_ID).innerHTML;
  var hotelOffersContainer = document.getElementById(HOTEL_OFFERS_CONTAINER_ID);
  var data;


  /* Makes a request to API and fetches the data. If the request is
     successfull, executes the callback passing the data as it's
     only argument. */
  function fetchData(successCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", DATA_API_URL, true);
    xhr.onload = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          if (data) {
            successCallback(data);
          } else {
            console.error("API request for data returned empty data");
          }
        } else {
          console.error("API request for data error:" + xhr.statusText +
                      " (" + xhr.status + ")");
        }
      }
    }
    xhr.onerror = function() {
      console.error("API request for data error: " + xhr.statusText);
    };
    xhr.send();
  }


  /* Process hotels data, selecting the images to be shown. The processing
     happens in-place (modifies the given data). */
  function processData(hotelsData) {
    var tripAdvisorRating;
    var cheapestRoom;
    var oldPrice, currentPrice;

    Array.prototype.forEach.call(hotelsData, function(hotel) {
      Array.prototype.forEach.call(hotel.photos, function (photo) {
        if (photo.featured_thumbnail) {
          photo.photo_url = photo.thumbnail_photo;
        } else {
          photo.photo_url = photo.main_photo;
        }
      });

      /* TripAdvisor information */
      tripAdvisorRating = parseInt(hotel.tripadvisor_stars);
      hotel.tripadvisor_rating_stars = ratingStarsText(tripAdvisorRating);
      hotel.tripadvisor_rating_description = tripAdvisorRatingDescription(tripAdvisorRating);
      hotel.directions.distance_km = (hotel.directions.distance / 1000).toFixed(1);

      /* Price information */
      // Find the cheapest room
      cheapestRoom = Array.prototype.reduce.call(hotel.rooms, function(cheapest, current) {
        if (current.retail_rate < cheapest.retail_rate) {
          return current;
        }
        else {
          return cheapest;
        }
      }); 
      currentPrice = Math.round(cheapestRoom.total_price / 100);
      oldPrice = Math.round(cheapestRoom.retail_rate / 100);
      hotel.cheapest_price = {
        current_price: currentPrice,
        old_price: oldPrice,
        discount: Math.round((oldPrice - currentPrice) / oldPrice * 100)
      }
    });
  }


  /* Retrns as many stars characters as given rating. */
  var ratingStarsText = (function() {
    var STAR_CHARACTER = "&#9733;";

    return function(rating) {
      return new Array(rating).join(STAR_CHARACTER);
    }
  }());


  /* Returnins text description for rating given as argument. */
  var tripAdvisorRatingDescription = (function() {
    var RATING_MAP = {
      1: "Terrible",
      2: "Poor",
      3: "Average",
      4: "Very good",
      5: "Excellent"
    };

    return function(rating) {
      return RATING_MAP[rating];
    }
  }());


  /* Uses data to fill the elements on the page. */
  function showDataOnPage(hotelsData) {
    var hotelOffersHTML = Mustache.render(hotelOffersTemplate, {
      hotels: hotelsData,
    });
    hotelOffersContainer.innerHTML = hotelOffersHTML;
  }


  fetchData(function(data) {
    processData(data);
    showDataOnPage(data);
    dataLoadedCallback();
  });

};
