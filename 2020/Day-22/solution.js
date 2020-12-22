var player1Input = [14, 6, 21, 10, 1, 33, 7, 13, 25, 8, 17, 11, 28, 27, 50, 2, 35, 49, 19, 46, 3, 38, 23, 5, 43];
var player2Input = [18, 9, 12, 39, 48, 24, 32, 45, 47, 41, 40, 15, 22, 36, 30, 26, 42, 34, 20, 16, 4, 31, 37, 44, 29];
var playGame = function (deck1, deck2) {
    while (deck1.length && deck2.length) {
        if (deck1[0] > deck2[0]) {
            deck1.push(deck1.shift());
            deck1.push(deck2.shift());
        }
        else {
            deck2.push(deck2.shift());
            deck2.push(deck1.shift());
        }
    }
    return deck1.length ? deck1.reduce(function (a, b, i) { return a + (b * (deck1.length - i)); }, 0) :
        deck2.reduce(function (a, b, i) { return a + (b * (deck2.length - i)); }, 0);
};
var CombatGame = /** @class */ (function () {
    function CombatGame(deck1, deck2) {
        this.player1Deck = deck1;
        this.player2Deck = deck2;
    }
    return CombatGame;
}());
var playRecursiveCombat = function (game) {
    var tries = 1000;
    game = JSON.parse(JSON.stringify(game));
    while (game.player1Deck.length && game.player2Deck.length) {
        if (--tries <= 0) {
            return game;
        }
        var player1Card = game.player1Deck.shift();
        var player2Card = game.player2Deck.shift();
        if (player1Card <= game.player1Deck.length && player2Card <= game.player2Deck.length) {
            var gameResults = playRecursiveCombat(new CombatGame(game.player1Deck.slice(0, player1Card), game.player2Deck.slice(0, player2Card)));
            if (gameResults.player1Deck.length) {
                game.player1Deck.push(player1Card, player2Card);
            }
            else {
                game.player2Deck.push(player2Card, player1Card);
            }
        }
        else if (player1Card > player2Card) {
            game.player1Deck.push(player1Card, player2Card);
        }
        else {
            game.player2Deck.push(player2Card, player1Card);
        }
    }
    return game;
};
var recursiveResults = playRecursiveCombat(new CombatGame(player1Input, player2Input));
var firstPart = "First part: " + playGame(player1Input, player2Input);
var secondPart = "Second part: " + (recursiveResults.player1Deck.length ? recursiveResults.player1Deck.reduce(function (a, b, i) { return a + (b * (recursiveResults.player1Deck.length - i)); }, 0) : recursiveResults.player2Deck.reduce(function (a, b, i) { return a + (b * (recursiveResults.player2Deck.length - i)); }, 0));
var node1 = document.createElement("div");
var textnode1 = document.createTextNode(firstPart);
node1.appendChild(textnode1);
document.getElementById("output-1").appendChild(node1);
var node2 = document.createElement("div");
var textnode2 = document.createTextNode(secondPart);
node2.appendChild(textnode2);
document.getElementById("output-2").appendChild(node2);
//# sourceMappingURL=solution.js.map