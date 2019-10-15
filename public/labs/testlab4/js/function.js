$(document).ready(function() {
     var usernameAvailable = false;
     var isValidZip = false;

     // Uses states api to populate all the states
     $.ajax({
         method: "GET",
         url: "https://cst336.herokuapp.com/projects/api/state_abbrAPI.php",
         dataType: "json",
         success: function(result, status) {
             console.log(result[0].usps);
             $("#states").append(`<option value="">Select a State</option>`);
             for (let i = 0; i < result.length; i++) {
                 $("#states").append(`<option value="${result[i].usps}">${result[i].state}</option>`);
             }
         }
     });
     //state    

     //Displaying city from api after entering zip
     $("#zip").on("change", function() {
         //alert($("#zip").val()); 
         $.ajax({
             method: "GET",
             url: "https://cst336.herokuapp.com/projects/api/cityInfoAPI.php",
             dataType: "json",
             data: { "zip": $("#zip").val() },
             success: function(result, status) {
                 //alert(result.city);
                 if (result) {
                     isValidZip = true;
                     $("#invalidZip").html("");
                     $("#city").html(result.city);
                     $("#latitude").html(result.latitude);
                     $("#longitude").html(result.longitude);
                 }
                 else {
                     isValidZip = false;
                     $("#invalidZip").html("Invalid Zip Code").css("color", "red");
                     $("#city").html("");
                     $("#latitude").html("");
                     $("#longitude").html("");
                 }
             }
         }); //ajax

     }); //zip

     //Displaying county api after enter two letter state abbrevation 
     $("#stateslist").on("change", function() {
         //alert($("#state").val()); 
         console.log($("#stateslist").val());
         $.ajax({
             method: "GET",
             url: "https://cst336.herokuapp.com/projects/api/countyListAPI.php",
             dataType: "json",
             data: { "state": $("#stateslist").val() },
             success: function(result, status) {
                 $("#county").empty();
                 for (let i = 0; i < result.length; i++) {
                     $("#county").append(`<option>${result[i].county}</option>`);
                 }
             }
         });
     }); //state

     // Using username api
     $("#username").change(function() {
         //console.log($("#username").val()); 

         $.ajax({
             method: "GET",
             url: "https://cst336.herokuapp.com/projects/api/usernamesAPI.php",
             dataType: "json",
             data: { "username": $("#username").val() },
             success: function(result, status) {
                 if (result.available) {
                     $("#usernameError").html("Username is available!");
                     $("#usernameError").css("color", "green");
                     usernameAvailable = true;
                 }
                 else {
                     $("#usernameError").html("Username is unavailable!");
                     $("#usernameError").css("color", "red");
                     usernameAvailable = false;
                 }

             }
         });

     }); //username

     $("#signupForm").on("submit", function(event) {
         //alert("submitting ...."); 
         if (!isFormValid()) {
             event.preventDefault();
         }

     });

     function isFormValid() {
         var isValid = true;

         if (!usernameAvailable) {
             isValid = false;
         }

         if ($("#username").val().length == 0) {
             isValid = false;
             $("#usernameError").html("Username is required!");
             $("#usernameError").css("color", "red");
         }

         if ($("#password").val().length >= 6) {
             $("#passwordError").html("");

             if ($("#password").val() != $("#passwordAgain").val()) {
                 $("#passwordAgainError").html("Passwords do not match!").css("color", "red");
                 isValid = false;
             }else{
                  $("#passwordAgainError").html(""); 
             }
         }
         else {
             $("#passwordError").html("Password is not 6 characters long!").css("color", "red");
             $("#passwordAgainError").html("");
             isValid = false;
         }

         isValid &= hasZip();
         isValid &= isNameValid();
         isValid &= isStatePicked();
         isValid &= isEmailValid();


         return isValid;
     }

     function isNameValid() { // checks if the name inputs are filled
         if (!$("#firstName").val() || !$("#lastName").val()) {
             $("#noNameError").html(" Missing first name, last name, or both!").css("color", "red");
             return false;
         }
         else {
             $("#noNameError").html("");
             return true;
         }
     }

     function hasZip() { // checks if the zip is filled, and valid
         if (!$("#zip").val()) {
             $("#invalidZip").html(" Missing a zip code").css("color", "red");
             return false;
         }
         else {
             return isValidZip;
         }

     }

     function isStatePicked() { // checks if a state is picked
         if (!$("#stateslist").val()) {
             $("#stateError").html(" Pick a State!").css("color", "red");
             return false;
         }
         else {
             $("#stateError").html("");
             return true;
         }
     }

     function isEmailValid() { // checks that there is a email
         if (!$("#email").val()) {
             $("#emailError").html(" You need a email!").css("color", "red");
             return false;
         }
         else {
             $("#emailError").html("");
             return true;
         }
     }

 });