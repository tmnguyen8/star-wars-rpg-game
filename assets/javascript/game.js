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
var characters = {
    darthV: {
        name: "Darth Vader",
        source: "assets/images/dv-image.jpg",
        attackerPower: 6, //change to random later
        healthPoint: 120,
        counterAttack: 10 //change to random later
    },
    lukeS: {
        name: "Luke Skywalker",
        source: "assets/images/luke-image.jpg",
        attackerPower: 68, //change to random later
        healthPoint: 100,
        counterAttack: 12 //change to random later
    },
    obiW: {
        name: "Obi-wan Kenobi",
        source: "assets/images/obi-image.jpg",
        attackerPower: 40, //change to random later
        healthPoint: 130,
        counterAttack: 6 //change to random later
    },
    princessL: {
        name: "Princess Leia",
        source: "assets/images/princess-image.jpg",
        attackerPower: 45, //change to random later
        healthPoint: 90,
        counterAttack: 12 //change to random later
    },
};

var charKeys = Object.keys(characters);
var availableCharList = charKeys;
var myEnemyList = [];
//myChar variables
var myCharName = "";
var myCharAttackPower = 0;
var myCharHP = 0;
//defneder variables
var defenderName = "";
var defenderCounterAttack = 0;
var defenderHP = 0;

// ******************** FUNCTIONS *************************
// function to remove an element from an array;
function removeArr(array, element) {
    var result = [];
    for (i of array) {
        if (i !== element) {
            result.push(i)
        }
    }
    return result;
}

// function to display my character
function displayMyChar () {    
    $("#myCharImage").html(`
    <img src="${characters[myCharName].source}" class="img-responsive" id="myChar">
    `)
}
// function to display my enemies
function displayMyEnemies () {
    // Testing & Debugging
    // console.log("availableCharList",availableCharList);
    // console.log("myCharName",myCharName);
    // console.log("my enemyList", myEnemyList);

    // loop through myEnemyList to display in #myEnemyImage
    for (i of myEnemyList) {        
        $("#myEnemyImage").append(`
        <img src="${characters[i].source}" class="img-responsive" id="myEnemy" data-name="${i}">
        `);
    };
}
// function to display defender in fight arena
function displayFightArena () {
    //testing and debugging
    // console.log("defender is", defenderName);
    // console.log("defender object is",characters[defenderName])
    // console.log("defender source", characters[defenderName].source)
    $(".fightSection").html(`
    <button id="attackDefender">Attack</button>
    <img src="${characters[defenderName].source}" class="img-responsive" id="myEnemy" data-name="${defenderName}">
    `);
};

//attack defender function to keep track of health points and my attack Power
function attackDefender() {
    // clear out the old stats
    $("#myAttack").empty();
    $("#enemyAttack").empty();

    $("#myAttack").append(`
        <p>I attacked ${defenderName} with ${myCharAttackPower}.</p>

    `);

    defenderHP -= myCharAttackPower;
    myCharAttackPower += characters[myCharName].attackerPower;

    myCharHP -= defenderCounterAttack;

    $("#myAttack").append(`
        <p>My new attack power is ${myCharAttackPower}.</p>
        <p>${defenderName} has ${defenderHP} health point.</p>
    `);

    $("#enemyAttack").append(`
        <p>${defenderName} attacked me with ${defenderCounterAttack}.</p>
        <p>I have  ${myCharHP} health point.</p>
    `);

    // testing & debugging
    console.log("defenderHP is",defenderHP);
    console.log("myAttackPower is", myCharAttackPower);
    console.log("myCharHP is", myCharHP);
}

function displayResult(){
    if (defenderHP <= 0) {
        
        $("#myEnemyImage").empty();
        displayMyEnemies();
        $(".fightSection").empty();
        $("#result").append(`
            <h3>${defenderName} is defeated!!</h3>
            <h3>Pick another defender.</h3>
        `);
        myEnemyList = removeArr(myEnemyList, defenderName);
        defenderHP = 0;
        defenderCounterAttack = 0;
        defenderName = "";
    } else if (myEnemyList == []) {
        $("#result").html(`<h3>You Win!!!</h3>`)
    
    } else if (myCharHP <= 0) {
        $("#result").html(`<h3>Game Over</h3>`)
    }
}

// ******************** EXECUTIONS *************************
// Beginning of the Game where you select your character
$(document).on("click", "#availableChar", function() {
    myCharName = $(this).attr("data-name");
    myCharAttackPower = characters[myCharName].attackerPower;
    myCharHP = characters[myCharName].healthPoint;
    myEnemyList = removeArr(availableCharList, myCharName);
    console.log(`${myCharName} is clicked`);
    displayMyChar();
    displayMyEnemies()
    $(".availableChar").empty();
});

// select defender from #myEnemy to attack
$(document).on("click", "#myEnemy", function() {
    defenderName = $(this).attr("data-name");
    defenderCounterAttack = characters[defenderName].counterAttack;
    defenderHP = characters[defenderName].healthPoint;
    myEnemyList = removeArr(myEnemyList, defenderName);
    console.log(`${defenderName} defender is clicked`);
    displayFightArena()
    $("#myEnemyImage").empty();
    displayMyEnemies();
    $("#result").empty();

});
$(document).on("click", "#attackDefender", function() {
    attackDefender();
    displayResult();

});



    












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


// // FUNCTIONS
// // ************************************
// newGame();
// selectChar();


// function newGame() {
//     var availableCharImage = $("#availableCharImage");
//     for (i of availableChar) {
//         var charImage = $("<img>");
//         charImage.addClass("char-image img-responsive available-char");
//         charImage.attr("src", i);
//         charImage.attr("data-attackPower", Math.floor(Math.random() * (25 - 0)) + 0);
//         $("#availableCharImage").append(charImage);
//     }
// }

// function selectChar() {

//     // On click in char-image at the beginning to the game to differentiate your character and the available enemies
//     $(".available-char").on("click", function() {
//         // move the selected character to myCharImage
//         $("#myCharImage").append(this);
//         myAttackPower = ($(this).attr("data-attackPower"))
//         $(this).addClass("myChar")

//         // move the available character images to myEnemiesImage
//         $("#myEnemiesImage").append($("#availableCharImage"));
//         // $("#availableCharImage").attr("id","availableEnemies");

//         // loop through each child element to add new class
//         $('#availableCharImage').children('img').each(function () {
//             $(this).addClass("availableEnemies") // "this" is the current element in the loop
//             $(this).removeClass("available-char")
//         });

//         // TESTING & DEBUGGING
//         console.log("myAttackPower inside", myAttackPower);
//         console.log("myCharImage", myCharImage);

//         // On click in availableEnemies to move them to defender area and start attacking
//         $(".availableEnemies").on("click", function() {
//             $(".fightSection").append(this);
//             enemyAttackPower = ($(this).attr("data-attackPower"))
//             console.log(this)
//         });

//     });
// };




// EXECUTIONS
// ************************************