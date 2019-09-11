// GLOBAL VARIABLES
// ************************************
var availableChar = [
    "assets/images/dv-image.jpg",
    "assets/images/luke-image.jpg",
    "assets/images/obi-image.jpg",
    "assets/images/princess-image.jpg"
];
var myAttackPower = 0;
var enemyAttackPower = 0;


// FUNCTIONS
// ************************************
newGame();
selectChar();


function newGame() {
    var availableCharImage = $("#availableCharImage");
    for (i of availableChar) {
        var charImage = $("<img>");
        charImage.addClass("char-image img-responsive available-char");
        charImage.attr("src", i);
        charImage.attr("data-attackPower", Math.floor(Math.random() * (25 - 0)) + 0);
        $("#availableCharImage").append(charImage);
    }
}

function selectChar() {

    // On click in char-image at the beginning to the game to differentiate your character and the available enemies
    $(".available-char").on("click", function() {
        // move the selected character to myCharImage
        $("#myCharImage").append(this);
        myAttackPower = ($(this).attr("data-attackPower"))
        $(this).addClass("myChar")

        // move the available character images to myEnemiesImage
        $("#myEnemiesImage").append($("#availableCharImage"));
        // $("#availableCharImage").attr("id","availableEnemies");

        // loop through each child element to add new class
        $('#availableCharImage').children('img').each(function () {
            $(this).addClass("availableEnemies") // "this" is the current element in the loop
            $(this).removeClass("available-char")
        });

        // TESTING & DEBUGGING
        console.log("myAttackPower inside", myAttackPower);
        console.log("myCharImage", myCharImage);

        // On click in availableEnemies to move them to defender area and start attacking
        $(".availableEnemies").on("click", function() {
            $(".fightSection").append(this);
            enemyAttackPower = ($(this).attr("data-attackPower"))
            console.log(this)
        });

    });
};




// EXECUTIONS
// ************************************