$(document).ready(() => {
  // Fetching data.json using AJAX
  $.ajax({
    url: "/data.json",
    method: "GET",
    dataType: "json",
  })
    .done((data) => {
      // Success
      populateDOM(data);
    })
    .fail((error) => {
      // Fail
      console.log("Error:", error);
    });

  function populateDOM(obj) {
    $(".profile-nav ul li").click(function (e) {
      // Switch colour of the active tab
      $(this).siblings().css("color", "var(--desaturated-blue)");
      $(this).css("color", "white");
      // Gets the content of the nav element clicked
      clickedElement = $(this).text().toLowerCase();
      e.stopPropagation();

      // Iterates through data.json and updates the corresponding elements
      obj.forEach((item) => {
        const className = item.title.toLowerCase().replace(" ", "-");
        let currentTime = item.timeframes[clickedElement].current;
        let previousTime = item.timeframes[clickedElement].previous;
        // Current
        $(`.${className} h2`).text(
          // Ternary to handle singularity
          `${currentTime === 1 ? currentTime + "hr" : currentTime + "hrs"}`
        );
        // Previous
        $(`.${className} p`).text(
          `${
            clickedElement === "daily"
              ? "Yesterday"
              : clickedElement === "weekly"
              ? "Last Week"
              : "Last Year"
          } - ${
            previousTime === 1 ? previousTime + "hr" : previousTime + "hrs"
          }`
        );
      });
    });
  }
});
