const strategyMatrix = [
    ["X", "2", "3", "4", "5", "6", "7", "8", "9", "T", "A"],
    [8, "H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
    [9, "H", "D", "D", "D", "D", "H", "H", "H", "H", "H"],
    [10, "D", "D", "D", "D", "D", "D", "D", "H", "H", "H"],
    [11, "D", "D", "D", "D", "D", "D", "D", "D", "D", "H"],
    [12, "H", "H", "S", "S", "S", "H", "H", "H", "H", "H"],
    [13, "S", "S", "S", "S", "S", "H", "H", "H", "H", "H"],
    [14, "S", "S", "S", "S", "S", "H", "H", "H", "H", "H"],
    [15, "S", "S", "S", "S", "S", "H", "H", "H", "H", "H"],
    [16, "S", "S", "S", "S", "S", "H", "H", "H", "H", "H"],
    [17, "S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["A2", "H", "H", "H", "D", "D", "H", "H", "H", "H", "H"],
    ["A3", "H", "H", "H", "D", "D", "H", "H", "H", "H", "H"],
    ["A4", "H", "H", "D", "D", "D", "H", "H", "H", "H", "H"],
    ["A5", "H", "H", "D", "D", "D", "H", "H", "H", "H", "H"],
    ["A6", "H", "D", "D", "D", "D", "H", "H", "H", "H", "H"],
    ["A7", "D", "D", "D", "D", "D", "S", "S", "H", "H", "H"],
    ["A8", "S", "S", "S", "S", "D", "S", "S", "S", "S", "S"],
    ["A9", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["AA", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
    ["TT", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["99", "P", "P", "P", "P", "P", "S", "P", "P", "S", "S"],
    ["88", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
    ["77", "P", "P", "P", "P", "P", "P", "H", "H", "H", "H"],
    ["66", "P", "P", "P", "P", "P", "H", "H", "H", "H", "H"],
    ["55", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
    ["44", "H", "H", "H", "P", "P", "H", "H", "H", "H", "H"],
    ["33", "P", "P", "P", "P", "P", "P", "H", "H", "H", "H"],
    ["22", "P", "P", "P", "P", "P", "P", "H", "H", "H", "H"],
];

var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let lastRandomSuitIndex = 0;
let score = 0;
let maxScore = 280;


const shuffledDeck = generateCombinations(strategyMatrix);
let shuffledDeckIndex = 0;
document.getElementById("split").classList.add('hidden')
renderDealerDeck(getDeck());
renderPlayerDeck(getDeck());
let currentHand = getNewHand(shuffledDeckIndex);


function verifyAnswer(playerAction) {
    if(playerAction === currentHand.correctAction) {
        document.getElementById("message").classList.remove('hidden')
        document.getElementById("message").innerHTML = "Correct!";
        document.getElementById("message").style.color = 'green';
        score++;
    } else {
        document.getElementById("message").classList.remove('hidden')
        document.getElementById("message").innerHTML = "Incorrect. The right answer is "+ currentHand.correctAction;
        document.getElementById("message").style.color = 'red';
    }

    setTimeout(function() {
        document.getElementById("split").classList.add('hidden')
        document.getElementById("message").classList.add('hidden')
        document.querySelectorAll('.card').forEach(card=> {
            card.classList.add('hidden');
        })
        if(shuffledDeckIndex > maxScore) {
            document.getElementById("message").classList.remove('hidden')
            document.getElementById("message").innerHTML = "All done! You scored " + score + " out of " + maxScore;
            document.getElementById("message").style.color = 'green';
            return;
        }
        shuffledDeckIndex++;
        currentHand = getNewHand(shuffledDeckIndex);
    }, 1000)

}
 
//Generate first hand
function getNewHand(shuffledDeckIndex) {
    const hand = shuffledDeck[shuffledDeckIndex];
    displayPlayerHand(hand.playerHand)
    displayDealerHand(hand.dealerHand)
    return hand;
}

function displayDealerHand(hand) {
    if(hand.charAt(0)=="T") {
        document.querySelector(`.dealer-card-${getRandomTen()}-${getRandomSuit()}`).classList.remove('hidden')
    }
    else {
        document.querySelector(`.dealer-card-${hand.charAt(0)}-${getRandomSuit()}`).classList.remove('hidden')
    }
}

function displayPlayerHand(hand) {
    if (typeof (hand) === "number") {
        let card1Value = Math.floor(Math.random() * ((hand - 2) - 2 + 1)) + 2;
        let card2Value = hand - card1Value;
        if(card1Value > 10 || card2Value > 10) {
            card1Value = getRandomTen();
            card2Value = hand - 10;
        }
        document.querySelector(`.player-card-${card1Value}-${getRandomSuit()}`).classList.remove('hidden')
        document.querySelector(`.player-card-${card2Value}-${getRandomSuit()}`).classList.remove('hidden')
    }
    else if(hand.charAt(0)=="A") {
        document.querySelector(`.player-card-A-${getRandomSuit()}`).classList.remove('hidden')
        document.querySelector(`.player-card-${hand.charAt(1)}-${getRandomSuit()}`).classList.remove('hidden')
    }
    else if(hand.charAt(0)=="T") {
        let card1Value = getRandomTen() + "-" + getRandomSuit();
        let card2Value = getRandomTen() + "-" + getRandomSuit();
        if(card1Value === card2Value) {
            card1Value = "Q-spades"
            card2Value = "K-hearts"
        }
        document.getElementById("split").classList.remove('hidden')
        document.querySelector(`.player-card-${card1Value}`).classList.remove('hidden')
        document.querySelector(`.player-card-${card2Value}`).classList.remove('hidden')
    }
    else {
        document.getElementById("split").classList.remove('hidden')
        document.querySelector(`.player-card-${hand.charAt(0)}-${getRandomSuit()}`).classList.remove('hidden')
        document.querySelector(`.player-card-${hand.charAt(1)}-${getRandomSuit()}`).classList.remove('hidden')
    }

}

function getRandomSuit() {
    //Will never return the same suit twice in row
    let splicedSuits = suits.filter(item => item != suits[lastRandomSuitIndex])
    let randomSuit = splicedSuits[Math.floor(Math.random() * splicedSuits.length)];
    lastRandomSuitIndex = suits.indexOf(randomSuit);
    return randomSuit;
}

function getRandomTen() {
    var values = ["10", "J", "Q", "K"];
    return values[Math.floor(Math.random() * values.length)];
}

function generateCombinations(matrix) {
    const firstRow = matrix[0].slice(1);
    const firstCol = matrix.map(row => row[0]).slice(1);
    const combinations = [];
    for (let i = 0; i < firstRow.length; i++) {
        for (let j = 0; j < firstCol.length; j++) {
            if (firstRow[i] !== matrix[0][0] && firstCol[j] !== matrix[0][0]) {
                combinations.push({
                    playerHand: firstCol[j],
                    dealerHand: firstRow[i],
                    correctAction: matrix[j + 1][i + 1]
                })
            }
        }
    }
    return combinations.sort(() => Math.random() - 0.5);
}


function getDeck() {
    let deck = new Array();

    for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < values.length; x++) {
            let card = { Value: values[x], Suit: suits[i] };
            deck.push(card);
        }
    }

    return deck;
}

function renderDealerDeck(deck) {
    document.getElementById("dealer-deck-upcard").innerHTML = "";

    for (let i = 0; i < deck.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");
        card.className = `card dealer-card-${deck[i].Value}-${deck[i].Suit} hidden`;
        value.className = "value";
        suit.className = "suit " + deck[i].Suit;

        value.innerHTML = deck[i].Value;
        card.appendChild(value);
        card.appendChild(suit);

        document.getElementById("dealer-deck-upcard").appendChild(card);
    }
}

function renderPlayerDeck(deck) {
    document.getElementById("player-deck-upcards").innerHTML = "";

    for (let i = 0; i < deck.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");
        card.className = `card player-card-${deck[i].Value}-${deck[i].Suit} hidden`;
        value.className = "value";
        suit.className = "suit " + deck[i].Suit;

        value.innerHTML = deck[i].Value;
        card.appendChild(value);
        card.appendChild(suit);

        document.getElementById("player-deck-upcards").appendChild(card);
    }
}