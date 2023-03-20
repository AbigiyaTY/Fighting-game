const playButton = document.getElementById('play');
const resultDiv = document.getElementById('result');
const p1HealthDiv = document.getElementById('p1Health');
const p2HealthDiv = document.getElementById('p2Health');
const p1NameDiv = document.getElementById('p1Name');
const p2NameDiv = document.getElementById('p2Name');


const updateGame = (p1, p2, p1HealthDiv, p2HealthDiv, gameState) => {
    p1NameDiv.innerText = p1.name;
    p2NameDiv.innerText = p2.name;
    p1HealthDiv.innerText = p1.health;
    p2HealthDiv.innerText = p2.health;

    if (p1.health <= 0 || p2.health <= 0) {
        game.isOver = true;
        gameState = game.isOver;
        resultDiv.innerText = game.declareWinner(game.isOver, p1, p2);
        return gameState;
    }
};

class Player {
    constructor(name, health, attackDmg) {
        this.name = name;
        this.health = health;
        this.attackDmg = attackDmg;
    }

    striker(player, enemy, attackDmg) {
        const damageAmount = Math.ceil(Math.random() * attackDmg);
        enemy.health -= damageAmount;

        updateGame(p1, p2, p1HealthDiv, p2HealthDiv, gameState);

        return `${player.name} attacks ${enemy.name} for ${damageAmount} damage!`;
    }

    heal(player) {
        const healAmount = Math.ceil(Math.random() * 5);
        player.health += healAmount;

        updateGame(p1, p2, p1HealthDiv, p2HealthDiv, gameState);
        return `${player.name} heals for ${healAmount}`;
    }
}

class Game {
    constructor(p1HealthDiv, p2HealthDiv) {
        this.isOver = false;
        this.p1HealthDiv = p1HealthDiv;
        this.p2HealthDiv = p2HealthDiv;
    }

    declareWinner(isOver, p1, p2) {
        let message = 'It Is A TIE';

        if (isOver == true && p1.health <= 0) {
            message = `${p2.name} WINS!`;
        } else if (isOver == true && p2.health <= 0) {
            message = `${p1.name} WINS!`;
        }
        document.getElementById('victory').play();
        return message;
    }

    reset(p1, p2) {
        p1.health = 100;
        p2.health = 100;
        this.isOver = false;
        resultDiv.innerText = '';
        updateGame(p1, p2, p1HealthDiv, p2HealthDiv);
    }

    play(p1, p2) {
        this.reset(p1, p2);

        while (!this.isOver) {
            p1.striker(p1, p2, p1.attackDmg);
            p2.heal(p2);
            p2.striker(p2, p1, p2.attackDmg);
            p1.heal(p1);
            updateGame(p1, p2, p1HealthDiv, p2HealthDiv);
        }

        return this.declareWinner(this.isOver, player1, player2);
    }
}

let player1 = new Player('Kairoshi', 100, 10);
let player2 = new Player('Kayiwa', 100, 10);

let p1 = player1;
let p2 = player2;

let game = new Game(p1HealthDiv, p2HealthDiv);


let gameState = game.isOver;

playButton.onclick = () => result.innerText = game.play(player1, player2);

document.addEventListener('keydown', (e) => {
    if (e.key == 'q' && p2.health > 0 && game.isOver == false) {
        p1.striker(p1, p2, p1.attackDmg);
        document.getElementById('p1attack').play();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'a' && player2.health > 0) {
        player1.heal(player1);
        document.getElementById('p1heal').play();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'p' && p1.health > 0 && game.isOver == false) {
        p2.striker(p2, p1, p2.attackDmg);
        document.getElementById('p2attack').play();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'l' && player1.health > 0) {
        player2.heal(player2);
        document.getElementById('p2heal').play();
    }
});