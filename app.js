$(document).ready(function () {

    // Load modal on page load.
    $(window).load(function(){
        //Disply the modal popup
          $('#openModal').modal('show');
      });

// click handler for submitting image
// $( "#submit" ).on( "click", function(){
//     


// moving image file to some form that can pass into query


// global variables for face++

//////////////////////////// var faceImage = user uploaded image
var faceImage = "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/13625394_10154011762247869_1447612658950188866_n.jpg?_nc_cat=0%26oh=9af591b71b9810b065670cc7da47f56a%26oe=5B6BA40E";


var faceQuery = "https://cors-anywhere.herokuapp.com/https://api-us.faceplusplus.com/facepp/v3/detect?api_key=s0vdP0fNEcYFymfT0sw0pt-pGCOp37-y&api_secret=7Ri6sHu3XL0WdXmylro7Rvz_v8JJKV_M&image_url=" + faceImage + "&return_attributes=emotion";

// face++ ajax request
var emotions;
var queryAlc;

$.ajax({
    url: faceQuery,
    method: "POST"
}).done( function ( response ) {
    var emotions = response.faces[0].attributes.emotion;
    // console.log(emotions);
    function sortProperties( obj ) {
        // convert object into array
        var sortable = [];
        for ( var key in obj )
            if ( obj.hasOwnProperty(key))
                sortable.push([key, obj[key]]); // each item is an array in format [key, value]

        // sort items by value
        sortable.sort(function (a, b) {
            return a[1] - b[1]; // compare numbers
        });
        return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
    }

    var sortedEmotions = sortProperties(emotions);
    console.log(sortedEmotions.reverse());

    var messages = [{
        header: "header statement about fear",
        message: "some message about fear"
     }, {
        header: "some header statement about sadness",
        message: "some message about sadness"
     }, {
        header: " some header statement about neutral",
        message: " some message about neutral"
     }, {
        header: " some header statement about disgust",
        message: " some message about disgust"
     }, {
        header: " some header statement about anger",
        message: " some message about anger"
     }, {
        header: "some header statement message about happiness",
        message: "some message about happiness"
     }, {
        header: "some header statement message about surprise",
        message: "some message about surprise"
     
     }];
     
    
    if( sortedEmotions[0][0] === "fear" ){
        var queryAlc = "Whiskey";
        $("#messages-header").text(messages[0].header);
        $("#messages-content").text(messages[0].message);
    }else if( sortedEmotions[0][0] === "sadness" ){
        var queryAlc = "Gin";
        $("#messages-header").text(messages[1].header);
        $("#messages-content").text(messages[1].message);
    }else if( sortedEmotions[0][0] === "neutral" ){
        var queryAlc = "Random.php";
        $("#messages-header").text(messages[2].header);
        $("#messages-content").text(messages[2].message);
    }else if( sortedEmotions[0][0] === "disgust" ){
        var queryAlc = "Scotch";
        $("#messages-header").text(messages[3].header);
        $("#messages-content").text(messages[3].message);
    }else if( sortedEmotions[0][0] === "anger" ){
        var queryAlc = "Rum";
        $("#messages-header").text(messages[4].header);
        $("#messages-content").text(messages[4].message);
    }else if( sortedEmotions[0][0] === "happiness" ){
        var queryAlc = "Vodka";
        $("#messages-header").text(messages[5].header);
        $("#messages-content").text(messages[5].message);
    }else if( sortedEmotions[0][0] === "surprise" ){
        var queryAlc = "Champagne";
        $("#messages-header").text(messages[6].header);
        $("#messages-content").text(messages[6].message);
    }

    // cocktailDB ajax request

    var randomDrinkIndex;
    var queryRandomDrink;
    var queryIngredient;
    var drinkElement = $(".drink");
    var imgElement = $("#drinkImg")
   

    /////////////////////// This is where cocktaildb kicks in.
    console.log(queryAlc);
    queryIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + queryAlc;//"Vodka" will be a var input recieved from face++"
    function selectDrink() {
        $.ajax({
            url: queryIngredient,
            method: 'GET',
            //////////////produce random number between one and index length.
        }).then(function (response) {
            randomDrinkIndex = (Math.floor((Math.random() * [response.drinks.length]) + 1));
            //successfully returns link to full drink info page.
            queryRandomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + response.drinks[randomDrinkIndex].idDrink;

            $.ajax({
                url: queryRandomDrink,
                method: 'GET',
            }).then(function (response) {

                var drinkInstructions = response.drinks[0].strInstructions;
                var drinkName = response.drinks[0].strDrink;
                var drink = response.drinks[0];
                var i = 1;
                while(drink["strIngredient" + i]){
                    drinkElement.append("<div>" + drink["strMeasure" + i] + " - " + drink["strIngredient" + i] + "</div>");
                    i++;
                    
                    
                    
                };
                $(".drink-name").append(drinkName);
                $(".drink-instructions").append(drinkInstructions);
                imgElement.prop("src", drink.strDrinkThumb);
               

              
            });
        });


        selectDrink();

    }
             

    

});


// global variables for cocktailDB





});
