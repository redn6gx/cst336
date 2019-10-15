        /* global $*/
        $(document).ready(function() {
            var tempK;
            var tempF;
            $('#image').hide();
            $('#search').click(function(){
                if ($('#city').is(':checked')) {
                    $("#error").hide();
                    if(Number.isInteger(parseInt($('#cityInput').val()))){
                        $('#error').html('You entered a number!');
                        $('#error').css("color", "red");
                        $('#error').show();
                        
                        $('#description').hide();
                        $('#temp').hide();
                        $('#image').hide();
                    }
                    else {
                    $.ajax({
                        method: "GET",
                        url: "https://api.openweathermap.org/data/2.5/weather",
                        dataType: "json",
                        data: { "q": $('#cityInput').val(), "APPID": "b18e9b45ec54703bd3a644ef82d7886a" },
                        success: function(result, status) {
                            $('#description').html("Current Weather: " + result.weather[0].description);
                            tempK = result.main.temp;
                            tempF = Math.round(((tempK - 273.15) * (1.8)) + 32);
                            $('#temp').html("Temperature: " + tempF + " Degrees Farenheit");
                            if(parseInt(tempF) > 70) {
                                $('#image').attr('src', "img/hot.jpg");
                            } else {
                                $('#image').attr('src', "img/cold.jpg");
                            }
                            $('#description').show();
                            $('#temp').show();
                            $('#image').show();
                        }
                    }); //ajax
                    }//else not a number
                }//if city checked
                else if($('#zip').is(':checked')) {
                    $("#error").hide();
                    if(Number.isInteger(parseInt($('#cityInput').val()))){
                    $.ajax({
                        method: "GET",
                        url: "https://api.openweathermap.org/data/2.5/weather",
                        dataType: "json",
                        data: { "zip": $('#cityInput').val(), "APPID": "b18e9b45ec54703bd3a644ef82d7886a" },
                        success: function(result, status) {
                            $('#description').html("Current Weather: " + result.weather[0].description);
                            tempK = result.main.temp;
                            tempF = Math.round(((tempK - 273.15) * (1.8)) + 32);
                            $('#temp').html("Temperature: " + tempF + " Degrees Farenheit");
                            if(parseInt(tempF) > 70) {
                                $('#image').attr('src', "img/hot.jpg");
                            } else {
                                $('#image').attr('src', "img/cold.jpg");
                            }
                            $('#description').show();
                            $('#temp').show();
                            $('#image').show();
                        }
                    }); //ajax
                    }//is a number true
                    else {
                        $('#error').html('You did not enter a number!');
                        $('#error').css("color", "red");
                        $('#error').show();
                        
                        $('#description').hide();
                        $('#temp').hide();
                        $('#image').hide();
                    }
                }//if zip checked
                else {
                    $('#error').html("You didn't check an option!");
                    $('#error').css("color", "red");
                }
            }); //click
        }); //ready