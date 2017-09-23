var carCompanies = ["Ferrari", "McLaren", "Honda", "Lamborghini", "Porsche", "Pagani"];

    function displayGifButtons() {
        $("#buttons").empty();
        for (var i = 0; i < carCompanies.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", carCompanies[i]);
            gifButton.text(carCompanies[i]);
            $("#buttons").append(gifButton);
        }
    }

    function makeNewButton() {
        $("addNewButton").on("click", function() {
            var carCompanies = ("input-area").val().trim();
            carCompanies.push(carCompanies);

            display.gifButton();
        });
    }

    function showCarGifs() {
        var carCompanies = $(this).attr("data-name");

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + carCompanies + "&api_key=oxkAofrlO4kyulfi5hP4vBtGda2rUflL&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {
            $("#gifs").empty();
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var cargifdiv = $("<div>");
                cargifdiv.addClass("cargifdiv");

                var gifDisplay = $("<img>");
                gifDisplay.attr("src", results[i].images.fixed_height_small_still.url);
                gifDisplay.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifDisplay.attr("data-animate", results[i].images.fixed_height_small.url);
                gifDisplay.attr("data-state", "still");
                gifDisplay.addClass("image");
                cargifdiv.append(gifDisplay);
                $("#gifs").prepend(gifDisplay);
            }
        })
    }
    displayGifButtons();
    makeNewButton();
    $(document).on("click", ".action", showCarGifs);
    $(document).on("click", ".image", function() {

        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });