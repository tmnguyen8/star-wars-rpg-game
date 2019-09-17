// ******************** GLOBAL VARIABLES *************************
var characters = {
    darthV: {
        name: "Darth Vader",
        source: "assets/images/dv-image.jpg",
        attackerPower: Math.floor(Math.random() * (30 - 20) ) + 20, //random between 30-20
        healthPoint: Math.floor(Math.random() * (120 - 100) ) + 100, //random between 100-120
        counterAttack: Math.floor(Math.random() * (30 - 20) ) + 20, //random between 30-20
    },
    lukeS: {
        name: "Luke Skywalker",
        source: "assets/images/luke-image.jpg",
        attackerPower: Math.floor(Math.random() * (30 - 20) ) + 20, //random between 30-20
        healthPoint: Math.floor(Math.random() * (120 - 100) ) + 100, //random between 100-120
        counterAttack: Math.floor(Math.random() * (30 - 20) ) + 20, //random between 30-20
    },
    obiW: {
        name: "Obi-wan Kenobi",
        source: "assets/images/obi-image.jpg",
        attackerPower: Math.floor(Math.random() * (30 - 20) ) + 20, //random between 30-20
        healthPoint: Math.floor(Math.random() * (120 - 100) ) + 100, //random betwen 100-120
        counterAttack: Math.floor(Math.random() * (30 - 20) ) + 20, //random between 30-20
    },
    princessL: {
        name: "Princess Leia",
        source: "assets/images/princess-image.jpg",
        attackerPower: Math.floor(Math.random() * (30 - 20) ) + 20, //random between 30-20
        healthPoint: Math.floor(Math.random() * (120 - 100) ) + 100, //random between 100-120
        counterAttack: Math.floor(Math.random() * (30 - 20) ) + 20, //random between 30-20
    },
};

var charKeys = Object.keys(characters);
var availableCharList = charKeys;
var myEnemyList = [];
//myChar variables
var myCharName = "";//object name
var myName = ""; //actual name attribute in object
var myCharAttackPower = 0;
var myCharHP = 0;
//defneder variables
var defenderName = "";//object name
var dName = ""; //actual name attribute in object
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
    defenderHP -= myCharAttackPower;
    $("#myAttack").append(`
        <p>I attacked ${dName} with ${myCharAttackPower}.</p>

    `);

    
    myCharAttackPower += characters[myCharName].attackerPower;

    myCharHP -= defenderCounterAttack;

    $("#myAttack").append(`
        <p>My new attack power is ${myCharAttackPower}.</p>
        <p>${dName} has ${defenderHP} health point.</p>
    `);

    $("#enemyAttack").append(`
        <p>${dName} attacked me with ${defenderCounterAttack}.</p>
        <p>I have  ${myCharHP} health point.</p>
    `);

    // testing & debugging
    console.log("defenderHP is",defenderHP);
    console.log("myAttackPower is", myCharAttackPower);
    console.log("myCharHP is", myCharHP);
}

function displayResult(){
    if ((myCharHP <= 0) && (myEnemyList.length !== 0)) {
        $("#result").append(`
        <h3>Game Over!!</h3>
        <button id="reset">Reset Game</button>
        `);
    }else if (defenderHP <= 0) {
        
        $("#myEnemyImage").empty();
        displayMyEnemies();
        $(".fightSection").empty();
        $("#result").append(`
            <h3>${dName} is defeated!!</h3>
            <h3>Pick another defender.</h3>
        `);
        myEnemyList = removeArr(myEnemyList, defenderName);
        defenderHP = 0;
        defenderCounterAttack = 0;
        defenderName = "";
        checkEndGame();    
    }
}

function checkEndGame () {
    if (myEnemyList.length === 0) {
        $("#result").empty();
        $("#result").append(`
        <h3>You Win!!!</h3>
        <button id="reset">Reset Game</button>
        `);
        
    }
}

function resetGame (){
    myEnemyList = [];
    //myChar variables
    myCharName = "";//object name
    myName = ""; //actual name attribute in object
    myCharAttackPower = 0;
    myCharHP = 0;
    //defneder variables
    defenderName = "";//object name
    dName = ""; //actual name attribute in object
    defenderCounterAttack = 0;
    defenderHP = 0;
    // reset display
    $("#myAttack").empty();
    $("#enemyAttack").empty();
    $("#result").empty();
    $("#myCharImage").empty();
    $(".fightSection").empty()
    $(".availableChar").show();
}

// ******************** EXECUTIONS *************************
// Beginning of the Game where you select your character
$(document).on("click", "#availableChar", function() {
    myCharName = $(this).attr("data-name");
    myName = characters[myCharName].name;
    myCharAttackPower = characters[myCharName].attackerPower;
    myCharHP = characters[myCharName].healthPoint;
    myEnemyList = removeArr(availableCharList, myCharName);
    console.log(`${myCharName} is clicked`);
    displayMyChar();
    displayMyEnemies()
    $(".availableChar").hide();
});

// select defender from #myEnemy to attack
$(document).on("click", "#myEnemy", function() {
    defenderName = $(this).attr("data-name");
    dName = characters[defenderName].name;
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
    checkEndGame();

});
$(document).on("click", "#reset", function() {
    resetGame();

});



    












