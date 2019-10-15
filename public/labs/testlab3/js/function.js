$(document).ready(function() {
    /*global $*/
    /*global _*/
    
    //Global variables
    let score = 0;
    let answered = [];
    for (var i = 0; i < 8; i++) {
        answered.push(false);
    }

    //Event listener
    //Submit Quiz button
    $('button').on('click', gradeQuiz);

    //Question 5 images
    $(".q5Choice").on("click", function() {
        $(".q5Choice").css("background", "");
        $(this).css("background-color", "rgb(255,255,0)");
    });

    //functions

    displayChoices(["Maine", "Rhode Island", "Maryland", "Delaware"],4);
    displayChoices(["True","False","IDK"],6);
    
    /*
    function displayQ4Choices() {
        let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
        q4ChoicesArray = _.shuffle(q4ChoicesArray);
        for (let i = 0; i < q4ChoicesArray.length; i++) {
            $("#q4Choices").append(` <input type="radio" name="q4"
                    id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label 
                    for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`);
        }
    }
    */
    
    function displayChoices(choicesArray, number){ // generic method to randomize radio buttons
        choicesArray = _.shuffle(choicesArray);
        
        for (let i = 0; i < choicesArray.length; i++) {
            $(`#q${number}Choices`).append(` <input type="radio" name="q${number}"
                    id="${choicesArray[i]}" value="${choicesArray[i]}"> <label 
                    for="${choicesArray[i]}"> ${choicesArray[i]}</label>`);
        }
    }

    function isFormValid() { //modified isFormValid to tell which questions are unanswered
        let isValid = true;
        unanswered = [];

        //$('input[name=q4]:checked').val();

        for (var i = 0; i < 8; i++) {
            if (!answered[i]) {
                unanswered.push(i + 1);
            }
        }

        if (unanswered.length > 0) {
            $("#validationFdbk").html("Unanswered Questions: " + unanswered);
            return false;
        }
        //if ($("#q1").val() == "") {
        //   isValid = false;
        //   $("#validationFdbk").html("Question one was not answered");
        //}
        return true;
    }

    function rightAnswer(index) {
        $(`#q${index}Feedback`).html("Correct!");
        $(`#q${index}Feedback`).attr("class", "bg-success white-text");
        $(`#markImg${index}`).html("<img src='img/checkmark.png' alt='checkmark'/>");
        answered[index - 1] = true;
        score += 12.5;
    }

    function wrongAnswer(index) {
        $(`#q${index}Feedback`).html("Incorrect!");
        $(`#q${index}Feedback`).attr("class", "bg-warning white-text");
        $(`#markImg${index}`).html("<img src='img/xmark.png' alt='xmark'/>");
    }

    function gradeQuiz() {
        $("#validationFdbk").html("");

        //variables
        score = 0;
        let q1Response = $('#q1').val().toLowerCase();
        let q2Response = $('#q2').val();
        let q4Response = $('input[name=q4]:checked').val();
        console.log(q4Response);
        let q6Response = $('input[name=q6]:checked').val();
        let q7Response = $('#q7').val();
        let q8Response = $('#q8').val().toLowerCase();
        let scoreArr = localStorage.scoreArr ? localStorage.getItem("scoreArr").split(",") : [];
        let timesTaken = localStorage.timesTaken ? Number(localStorage.getItem("timesTaken")) : 0;
        
        //Question 1
        if (q1Response == "sacramento") {
            rightAnswer(1);
        }
        else {
            wrongAnswer(1);

            if (q1Response != "") {
                answered[0] = true;
            }else{
                answered[0] = false;
            }
        }

        //Question 2
        if (q2Response == "mo") {
            rightAnswer(2);
        }
        else {
            wrongAnswer(2);

            if (q2Response != "") {
                answered[1] = true;
            }else{
                answered[1] = false;
            }
        }

        //Question 3
        if ($('#Jefferson').is(":checked") && $('#Roosevelt').is(":checked") &&
            !$('#Jackson').is(":checked") && !$('#Franklin').is(":checked")) {
            rightAnswer(3);
        }
        else {
            wrongAnswer(3);

            if ($("input[name=q3]").is(":checked")) {
                answered[2] = true;
            }else{
                answered[2] = false;
            }
        }

        //Question 4
        if (q4Response == "Rhode Island") {
            rightAnswer(4);
        }
        else {
            wrongAnswer(4);

            if ($('input[name=q4]').is(":checked")) {
                answered[3] = true;
            }else{
                answered[3] = false;
            }
        }

        //Question 5
        if ($("#seal2").css("background-color") == "rgb(255, 255, 0)") {
            rightAnswer(5);
        }
        else {
            wrongAnswer(5);

            if ($('#seal1').css("background-color") != "rgba(0, 0, 0, 0)" || $('#seal2').css("background-color") != "rgba(0, 0, 0, 0)" || $('#seal3').css("background-color") != "rgba(0, 0, 0, 0)") {
                answered[4] = true;
            }else{
                answered[4] = false;
            }
        }

        //Question 6
        if (q6Response == "True") {
            rightAnswer(6);
        }
        else {
            wrongAnswer(6);

            if ($('input[name=q6]:checked').val() != null) {
                answered[5] = true;
            }else{
                answered[5] = false;
            }
        }
        
        //Question 7
        if (q7Response == "none") {
            rightAnswer(7);
        }
        else {
            wrongAnswer(7);

            if (q7Response != "") {
                answered[6] = true;
            }else{
                answered[6] = false;
            }
        }
        
        //Question 8
        if (q8Response == "alaska") {
            rightAnswer(8);
        }
        else {
            wrongAnswer(8);

            if (q8Response != "") {
                answered[7] = true;
            }else{
                answered[7] = false;
            }
        }

        if (score < 80) {
            $('#totalScore').css("color","red");
        }else{
            
            $('#totalScore').css("color","green");
        }

        $('#totalScore').html(`Total Score: ${score}`);
        
        //increments times taken in local storage
        timesTaken++;
        localStorage.setItem("timesTaken", timesTaken);
        $("#timesPlayed").html("Total Attempts: " + timesTaken);
        
        //adds the last score to local storage
        scoreArr.push(score);
        $("#scores").html("Previous scores: ");
        for (var i = 0; i < scoreArr.length; i++) {
            $("#scores").append(scoreArr[i] + " ");
        }
        localStorage.setItem("scoreArr",scoreArr);

        if (score == 100) {
            $("#congrats").html("Congrats you got a perfect score!").css("color","green");
        }else{
            $("#congrats").html(""); //removes the congrats if they submit again without a perfect score.
        }

        if (!isFormValid()) {
            return;
        }

    }

});