let topics = ["Lamborghini", "Bugatti", "Pagani", "Koenigsegg", "Audi", "Ferrari", "Ford", "Honda", "Subaru"];

$(document).ready(function() {
    for (var i = 0; i < topics.length; i++) {
        $("#car-buttons").append("<button type='button' onclick='searchCar(\"" + topics[i] + "\")' class='btn btn-primary' value=' " + topics[i] + "'> " + topics[i] + " </button>");
    }
});

function carButtonClicked() {
    let userInput = $('#car-input').val();
    searchCar(userInput);
}

function submitButtonClicked() {
    let userInput = $('#car-input').val();
    if (userInput) {
        $('#car-buttons').append("<button type='button' onclick='searchCar(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchCar(gifName) {
    $.ajax({
    url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=EfCoZFL05g4J0pd7eQZttHNRS862glfs&limit=10',
    method: "GET"
        })
        .done(function(response) {
            displayGif(response);

        })
}

function displayGif(response) {
    $('#cars-div').empty();
    for (let i = 0; i < response.data.length; i++) {
        let rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        let image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';
        image = '<div class="col-md-4">' + image + "</div>";
        $('#cars-div').append(image);


    }

    $('.movImage').on('click', function() {
        let state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }
    });
}