// Function to add an event listener
function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
      obj.attachEvent("on" + evt, fn);
    }
  }
  
  // Function to slide down the lightbox
  function slideDownLightbox() {
    document.querySelector(".lightbox").style.display = "block";
  }
  
  // Function to slide up the lightbox
  function slideUpLightbox() {
    document.querySelector(".lightbox").style.display = "none";
  }
  
  // Check if a cookie indicating successful submission exists
  function hasSuccessfulSubmissionCookie() {
    return document.cookie.indexOf("successful_submission=1") !== -1;
  }
  
  // Check if a cookie indicating popup close exists
  function hasPopupCloseCookie() {
    return document.cookie.indexOf("popup_closed=1") !== -1;
  }
  
  // Check if the viewport width is below a certain threshold (for mobile view)
  function isMobileView() {
    return window.innerWidth < 600; // Adjust the width threshold as needed
  }
  
  // Auto-appear popup for mobile view
  if (isMobileView()) {
    // Function to display the auto-appearing popup after 5 seconds
    function displayAutoAppearPopup() {
      setTimeout(slideDownLightbox, 5000); // 5000 milliseconds (5 seconds)
    }
  
    // Display the auto-appearing popup if no cookies are present
    if (!hasSuccessfulSubmissionCookie() && !hasPopupCloseCookie()) {
      displayAutoAppearPopup();
    }
  } else {
    // Add 'mouseout' event listener to the document for non-mobile view
    addEvent(document, "mouseout", function (evt) {
      if (
        !hasSuccessfulSubmissionCookie() &&
        !hasPopupCloseCookie() &&
        evt.toElement == null &&
        evt.relatedTarget == null
      ) {
        slideDownLightbox();
      }
    });
  }
  
  // Add 'click' event listener to the close button
  document.querySelector("a.close").addEventListener("click", function () {
    slideUpLightbox();
    // Create a cookie to indicate that the popup was closed
    document.cookie = "popup_closed=1; expires=Fri, 24 Dec 2023 23:59:59 GMT";
  });
  
  // Add a submit event listener to your form
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
  
    // Check if the email or checkbox is blank
    const email = document.getElementById("email").value;
    const subscribeCheckbox = document.getElementById("subscribe");
  
    if (email === "" || !subscribeCheckbox.checked) {
      // Show an error message here or handle it as needed
      alert("Please provide a valid email and subscribe to the newsletter.");
    } else {
      // Create a cookie to indicate successful submission
      document.cookie =
        "successful_submission=1; expires=Fri, 24 Dec 2023 23:59:59 GMT";
      // Auto close the popup
      slideUpLightbox();
    }
  });
  
  // Check if any of the cookies exist on page load and hide the popup if needed
  if (hasSuccessfulSubmissionCookie() || hasPopupCloseCookie()) {
    document.querySelector(".exit-intent-popup").style.display = "none";
  }
  