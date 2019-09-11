// GLOBAL VARIABLES
// ************************************
var availableChar = [
    "assets/images/dv-image.jpg",
    "assets/images/luke-image.jpg",
    "assets/images/obi-image.jpg",
    "assets/images/princess-image.jpg"
];
var myCharSrc = "";

// FUNCTIONS
// ************************************
newGame();

function newGame() {
    var availableCharImage = $(availableCharImage);
    for (i of availableChar) {
        var charImage = $("<img>");
        charImage.addClass("char-image img-responsive");
        charImage.attr("src", i);
        charImage.attr("data-attackPower", Math.floor(Math.random() * (25 - 0)) + 0);
        $("#availableCharImage").append(charImage);
    }
}

$(".char-image").on("click", function() {
    var myAttackPower = ($(this).attr("data-attackPower"));
    var myCharImage = ($(this).attr("src"));
    console.log(myAttackPower);
    console.log(myCharImage);
    var myChar = $("<img>");
    myChar.addClass("char-image img-responsive");
    myChar.attr("src", myCharImage);
    $("#myCharImage").append(myChar);
});
// EXECUTIONS
// ************************************