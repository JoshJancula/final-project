window.onload = function() {
  var distanceAllowed = 60;
  var startLat;
  var startLng;
  var username = "test"
   $('.parallax').parallax();
   $('.carousel').carousel();

  function distance(startLng, startLat, lon2, lat2, cb) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - startLat).toRad(); // Javascript functions in radians
    var dLon = (lon2 - startLng).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(startLat.toRad()) * Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log("Distance to user:")
    console.log(d)
    return d;
  }

  /** Converts numeric degrees to radians */
  if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
  }

  function getLocation() {
    function showPosition(position) {
      console.log("getting location")

      startLat = position.coords.latitude;
      startLng = position.coords.longitude;
      console.log(startLat)
      console.log(startLng)
    };
    //if geolocation is supported, the getCurrentPosition will be called
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
      lattitude.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  //Call getLocation 
  getLocation();

  //Click handler for search submit button 
  $("#searchUser").on("click", function(event) {
    event.preventDefault();
    var userFirstName = $("#profileSearchInput").val();
    var isBand = $("input[name=group2]:checked").val();
    var instrumentsPlayed = $("input[name=group1]:checked").val();
    var params = {
      "userFirstName": userFirstName,
      "isBand": isBand,
      "instrumentsPlayed": instrumentsPlayed
    }



    $.get('/api/users/search', params, function(data) {
      let newData = []
      for (let i = 0; i < data.length; i++) {
        let resultLatLng = JSON.parse(data[i].userLocation)
        let resultLat = resultLatLng.lat
        let resultLng = resultLatLng.lng
        // let { resultLat, resultLng } = JSON.parse(data[i].userLocation);

        let d = distance(startLng, startLat, resultLng, resultLat)
        console.log("distance from click handler:")
        console.log(d)
        if (d < distanceAllowed) {
          let obj = data[i]
          let miles = (d * 0.621371).toFixed(2)
          obj["distance"] = miles
          newData.push(obj)
        }
        
      }
      console.log(newData)
      renderUsers(newData);
    });
  });

  function renderUsers(data) {
    if (data.length !== 0) {
      $("#stats").empty();
      $("#stats").show();

      data.forEach(function(result) {

        var div = $("<div>").append(
          "<div class='row'>" +
          "<div class='col s10'>" + "<div class='card horizontal'>" + "<div class='card-image'>" + "<img src='https://www.ctvnews.ca/polopoly_fs/1.1640896.1389819488!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg'>" +
          "</div>" +
          "<div class='card-stacked'>" + "<div class='card-content'>" +
          "<h2>" + result.userFirstName + "</h2>" +
          "<p> Primary Instrument: " + result.instrumentsPlayed + "</p>" +
          "<p> User is: " + result.distance + ' miles away' + "</p>" +
          "<p> Looking to jam with: " + result.searchingFor + "</p>" +
          "<button data-target='contactModal' class='btn modal-trigger contact'  data-id='" + result.email + "'>Contact User</button>" +
          "<button data-target='viewProfileModal' class='btn modal-trigger view'  data-id='" + result.username + "'>View Profile</button>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
        $("#stats").append(div);
        //End for loop
      })

      // $(".delete").click(function() {
      //   var info = {
      //     id: $(this).attr("data-id")
      //   };
      //   $.post("/api/delete", info)
      //     // On success, run the following code
      //     .done(function(deldata) {
      //       // Log the data we found
      //       console.log(deldata);
      //       console.log("Deleted Successfully!");
      //     });
      //   $(this).closest("div").remove();
      // });
    }
  }

  // route to search in nav
  $("#searchNav").on("click", function(event) {
    event.preventDefault();
    // go to the profile
    window.location.href = '/search';
  });
  
  // route to main in nav
  $("#main").on("click", function(event) {
    event.preventDefault();
    // go to the profile
    window.location.href = '/main';
  });

  // button to logout
  $("#logout").on("click", function(event) {
    // event.preventDefault();
    $.get("/logout", function(data) {
      window.location.href = '/login';
    });
  });



  // view profile button
  $("#myProfile").on("click", function(event) {
    event.preventDefault();
    // go to the profile
    window.location.href = '/userProfile';
  });



  // when you click on the view user profile button
  $('select').material_select();
  $('#viewProfileModal').modal({
    ready: function(modal, trigger) {
      console.log("modal ready: "   )
      // gets the reciever email and hides it in #toEmail

      const username = trigger.data('id');
        $.get("api/users/username/" + username, function(data) {

      console.log("console logging data: " + data);

      $("#username").text(data.username);
      $("#name").text((data.userFirstName) + " " + (data.userLastName));
      $("#email").text(data.email);
      $("#instrument").text(data.instrumentsPlayed);
      $("#genre").text(data.genre);
      $("#inBand").text(data.isBand);
      $("#about").text(data.about);
      $(".profilePic").attr("src", data.userImage);
    });
    }

  });


  //End onload
};
