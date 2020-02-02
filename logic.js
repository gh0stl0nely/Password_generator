var lower = "abcdefghijklmnopqrstuvwxyz";
var lower_array = lower.split('');
var upper = lower.toUpperCase();
var upper_array = upper.split('');
var number = [1,2,3,4,5,6,7,8,9];
var special = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
var special_array = special.split('');

function randomizeLength(){
    document.getElementById("length").value = Math.floor(Math.random() * (129 - 8) + 8);
}

function checkForNumber(string){
    for(var i = 0; i < string.length; i++){
        if(isNaN(string.charAt(i))){
            alert('Length cannot contain letter. Please enter number only.');
            document.getElementById("length").value = "";
            break;
        }
    }
}
function generate(){
    
    var length = document.getElementById("length").value; // this is a string

    checkForNumber(length); // Helper function, makes sure the password length entered by user doesn't have a letter

    var isLower = document.getElementById("lower").checked;
    var isUpper = document.getElementById("upper").checked;
    var isNumber = document.getElementById("number").checked;
    var isSpecial = document.getElementById("special").checked;

    if(length < 8 || length > 128){
        alert('Please enter a password length between 8 and 128 or click Randomize length');
        document.getElementById("length").value = "";
    } else if(!isLower && !isUpper && !isNumber && !isSpecial) {
       alert('Please select at least one criteria')
    }  else {
        generateCorrect(length,isLower,isUpper,isNumber,isSpecial);
    }
}

function copyAnswer(){
    // This function copies the answer to clipboard

    var text = document.getElementById("result");
    text.select();
    text.setSelectionRange(0, 99999);
    document.execCommand("copy");  
}

function generateCorrect(length,isLower,isUpper,isNumber,isSpecial){
    var result = "";
    var big_list = [];
 // This is a list containing array(s) based on criteria e.g: [upper_array, lower_array]...
    getCriteria(big_list, isLower,isUpper,isNumber,isSpecial); // Helper 
        
    for(var i = 0; i < length; i++){
        var chosen_list = big_list[Math.floor(Math.random() * big_list.length)]; // Chose an array from the big list 
        var chosen_letter = chosen_list[Math.floor(Math.random() * chosen_list.length)]; // Get a random item from that list
        // This is to ensure there is 100% chance that the password contains all the selected criteria     
        if(i < big_list.length){ // i = 0 
            chosen_list = big_list[i]; // Choose list in order 
            chosen_letter = chosen_list[Math.floor(Math.random() * chosen_list.length)] // Make sure the letter is inclusive
            result += chosen_letter;
            continue;
        }
        result += chosen_letter;
    }
    
    document.getElementById("result").value = result;
}

function getCriteria(big_list, isLower,isUpper,isNumber,isSpecial){    
    // This function gathers criteria from the user 

    if(isLower)
        big_list.push(lower_array);

    if(isUpper)
        big_list.push(upper_array);

    if(isSpecial)
        big_list.push(special_array);

    if(isNumber)
        big_list.push(number);
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
  });