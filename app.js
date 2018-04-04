// Load modal on page load.
$(window).on('load', function () {    
    $('#modal1').modal({
        dismissible: false
    });  
    $('#modal1').modal('open');  
    // Once clicked lets you enter the site
    $("#yes").on("click", function() {
        $('#modal1').modal('close');
    });
    //Redirect if under 21 years of age
    $("#no").on("click", function() {
        window.location.assign("https://www.responsibility.org/")
    });
}); 




var messages = [{
    header: "You looked afraid!",
    message: "I don't know whats making you so scared but maybe a delicious Whiskey drink will hep calm you down!"
}, {
    header: "You looked Sad!",
    message: "It's time to perk up! Try some refreshing Gin based cocktails to help forget about your problems!"
}, {
    header: "You looked Neutral!",
    message: "I don't know what makes you so aloof, but its creeping me out! Try any of these delicious cocktails to put some emotion in ya"
}, {
    header: "You looked disgusted!",
    message: "Whatever you looked were looking at thoroughly disgusted you. Hopefully this scotch based cocktail will wash that disgust out!"
}, {
    header: "You looked Angry!",
    message: "You need to calm the heck down! Cool off with a one of these amazing Rum based tropical cocktails!"
}, {
    header: "You looked Happy!",
    message: "Someone looks pretty happy today! Keep that happiness going with one of these Vodka based cocktails!"
}, {
    header: "You looked Surprised!",
    message: "Whoa! I don't know what surprised you so much but heres some Champagne based cocktails to help wash it down!"

}];

// click handler for submitting image
$("#link-submit").on("click", function (event) {
    event.preventDefault();
    var faceURL = $("#link-url").val().trim();


    // moving image file to some form that can pass into query


    //////////////////////////// var faceImage = user uploaded image
    // var faceImage = "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/13625394_10154011762247869_1447612658950188866_n.jpg?_nc_cat=0%26oh=9af591b71b9810b065670cc7da47f56a%26oe=5B6BA40E";


    var faceQuery = "https://cors-anywhere.herokuapp.com/https://api-us.faceplusplus.com/facepp/v3/detect?api_key=s0vdP0fNEcYFymfT0sw0pt-pGCOp37-y&api_secret=7Ri6sHu3XL0WdXmylro7Rvz_v8JJKV_M&image_url=" + faceURL + "&return_attributes=emotion";

    // face++ ajax request
    var emotions;
    var queryAlc;

    $.ajax({
        url: faceQuery,
        method: "POST"
    }).done(function (response) {
        var emotions = response.faces[0].attributes.emotion;
        // console.log(emotions);
        function sortProperties(obj) {
            // convert object into array
            var sortable = [];
            for (var key in obj)
                if (obj.hasOwnProperty(key))
                    sortable.push([key, obj[key]]); // each item is an array in format [key, value]

            // sort items by value
            sortable.sort(function (a, b) {
                return a[1] - b[1]; // compare numbers
            });
            return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
        }

        var sortedEmotions = sortProperties(emotions);
        console.log(sortedEmotions.reverse());

        if (sortedEmotions[0][0] === "fear") {
            var queryAlc = "Whiskey";
            $("#comment-header").text(messages[0].header);
            $("#comment-text").text(messages[0].message);
        } else if (sortedEmotions[0][0] === "sadness") {
            var queryAlc = "Gin";
            $("#comment-header").text(messages[1].header);
            $("#comment-text").text(messages[1].message);
        } else if (sortedEmotions[0][0] === "neutral") {
            var queryAlc = "Midori";
            $("#comment-header").text(messages[2].header);
            $("#comment-text").text(messages[2].message);
        } else if (sortedEmotions[0][0] === "disgust") {
            var queryAlc = "Scotch";
            $("#comment-header").text(messages[3].header);
            $("#comment-text").text(messages[3].message);
        } else if (sortedEmotions[0][0] === "anger") {
            var queryAlc = "Rum";
            $("#comment-header").text(messages[4].header);
            $("#comment-text").text(messages[4].message);
        } else if (sortedEmotions[0][0] === "happiness") {
            var queryAlc = "Vodka";
            $("#comment-header").text(messages[5].header);
            $("#comment-text").text(messages[5].message);
        } else if (sortedEmotions[0][0] === "surprise") {
            var queryAlc = "Champagne";
            $("#comment-header").text(messages[6].header);
            $("#comment-text").text(messages[6].message);
        }

        // cocktailDB ajax request

        var randomDrinkIndex;
        var queryRandomDrink;
        var queryIngredient;
        var drinkElement = $("#recipe");
        var imgElement = $("#drink-image")


        /////////////////////// This is where cocktaildb kicks in.
        console.log(queryAlc);
        queryIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + queryAlc; //"Vodka" will be a var input recieved from face++"
        function selectDrink() {
            console.log(queryIngredient);
            $.ajax({
                url: queryIngredient,
                method: 'GET',
                //////////////produce random number between one and index length.
            }).then(function (response) {
                console.log( "howdy", response );
                randomDrinkIndex = (Math.floor((Math.random() * [response.drinks.length]) + 1));
                //successfully returns link to full drink info page.
                queryRandomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + response.drinks[randomDrinkIndex].idDrink;

                $.ajax({
                    url: queryRandomDrink,
                    method: 'GET',
                }).then(function (response) {
                    console.log("next call", response);
                    var drinkInstructions = response.drinks[0].strInstructions;
                    var drinkName = response.drinks[0].strDrink;
                    var drinkGlass = response.drinks[0].strGlass;
                    console.log(drinkName);
                    var drink = response.drinks[0];
                    console.log(drink);
                    var i = 1;
                    drinkElement.empty();
                    while (drink["strIngredient" + i]) {
                        drinkElement.append("<div>" + drink["strMeasure" + i] + " - " + drink["strIngredient" + i] + "</div><br>");
                        i++;



                    };
                    $("#glass").empty().append(drinkGlass);
                    $("#drink-name").empty().append(drinkName);
                    $("#instructions").append(drinkInstructions);
                    imgElement.attr("src", drink.strDrinkThumb);



                });
            });

        }

        selectDrink();

    });

    // global variables for cocktailDB
});

// });
