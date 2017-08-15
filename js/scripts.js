var msg = 'Nie udało się ustalić';
var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;


$('#start').hide().fadeIn(800);
$('.container').hide();
$('.loading').hide();

$('#start').on('click', function() {

    if (Modernizr.geolocation) {
        console.log("tak");
        navigator.geolocation.getCurrentPosition(success, fail);
        $('#start').hide();
        $('.loading').show();


    } else {
        $('.loading').hide();

    }

    function success(position) {

        var lat = position.coords.latitude;
        console.log("lat: " + lat);

        var lon = position.coords.longitude;
        console.log("lon: " + lon);

        api = api + "lat=" + lat + "&lon=" + lon;
        $.ajax({
            type: "GET",
            url: api,
            timeout: 2000,
            beforeSend: function() {
                console.log("wczytywanie danych");
            },
            success: function(data) {
                $('.loading').hide();
                $('#city').text(data.name + ",");
                $('#country').text(data.sys.country);
                $('#temp').text(data.main.temp + " " + String.fromCharCode(176) + "C");
                $('#weather').text(data.weather[0].main);
                $('img').attr("src", data.weather[0].icon);
                $('#pressure').text(data.main.pressure + "hPa");
                $('.container').fadeIn(700);
            }
        });


    }

    function fail() {
        $('.loading').hide();
        alert("brak dostępu do lokalizacji");
    }

});