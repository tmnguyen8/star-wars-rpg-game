// ******************** PSEUDO CODE *************************
// create available characters with the following data attributes
    // assign the following attributes to each character using OOP
        // source of image
        // CSS properties (i.g. class to style)
        // attacking power
        // health point
        // counter attack power
// On click a character from available characters
    // assign that character to myChar with the following attributes
        // source of image
        // CSS properties (i.g. class to style)
        // attacking power (increment after each attack)
        // health point (decreases after each hit)
    // assign the rest of the other characters as available enemies
// display my character in my character area in HTML
// display available enemies in my enemies area in HTML
    // enemies are assigned with the following attributes
        // source of image
        // CSS properties (i.g. class to style)
        // counter attack power (the same after each attack)
        // health point (decreases after each hit)
// On click a character from available enemies
    // my character and selected enemies are inside Fight Arena
        // on press Attack
            // enemy's health power is decreased by my attacking power
            // my attacking power increases
            // check if enemy's health power is <= 0, if it is I win
            // allow user to choose another enemy from available enemies
            // Update game stats
                // my health power
                // my attack power (incrasing value)
                // enemy health power
                // enemy counter attack power (no change)
        // enemy counter attack
            // my health power is decreased by enemy counter attack
            // check if my health power is <= 0, if it is I lose, Game Over
            // Update game stats
                // my health power
                // my attack power (incrasing value)
                // enemy health power
                // enemy counter attack power (no change)


// ******************** GLOBAL VARIABLES *************************

// ******************** FUNCTIONS *************************

// ******************** EXECUTIONS *************************


    












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