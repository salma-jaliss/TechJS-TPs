let fetch;
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

class Pokemon {
    constructor(name, moves, sprite) {
        this.name = name;
        this.moves = moves;
        this.hp = 300;
        this.maxHp = 300;
    }
    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage);
    }
    isDefeated() {
        return this.hp <= 0;
    }
}

async function getPokemon(name) {
    if (!fetch) {
        fetch = (await import('node-fetch')).default;
    }
    const pokeName = String(name).toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    if (!res.ok) throw new Error('Pokémon not found');
    const data = await res.json();
    return data;
}

async function getMoveDetails(moveUrl) {
    if (!fetch) {
        fetch = (await import('node-fetch')).default;
    }
    const res = await fetch(moveUrl);
    const data = await res.json();
    return {
        name: data.name,
        power: data.power,
        accuracy: data.accuracy,
        pp: data.pp
    };
}

async function chooseMoves(moves, count = 5) {
    const shuffled = moves.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    const details = await Promise.all(selected.map(m => getMoveDetails(m.move.url)));
    return details.map(m => ({ ...m, currentPP: m.pp }));
}

async function main() {
    console.log('Bienvenue dans le mini-jeu Pokémon !');
    let playerName = await ask('Entrez le nom de votre Pokémon : ');
    let playerData;
    try {
        playerData = await getPokemon(playerName);
    } catch {
        console.log('Pokémon introuvable.');
        rl.close();
        return;
    }
    const playerMoves = await chooseMoves(playerData.moves, 5);
    console.log('Vos attaques :');
    playerMoves.forEach((m, i) => {
        console.log(`${i + 1}. ${m.name} (Power: ${m.power || 'N/A'}, Accuracy: ${m.accuracy || 'N/A'}, PP: ${m.pp})`);
    });
    const player = new Pokemon(playerData.name, playerMoves);

    // Enemy
    const enemyId = Math.floor(Math.random() * 898) + 1;
    const enemyData = await getPokemon(enemyId);
    const enemyMoves = await chooseMoves(enemyData.moves, 5);
    const enemy = new Pokemon(enemyData.name, enemyMoves);
    console.log(`Un ${enemy.name} sauvage apparaît !`);

    // Combat
    let turn = 0;
    while (!player.isDefeated() && !enemy.isDefeated()) {
        console.log(`\nVotre HP: ${player.hp} | Ennemi HP: ${enemy.hp}`);
        if (turn % 2 === 0) {
            // Player turn
            console.log('Vos attaques :');
            player.moves.forEach((m, i) => {
                console.log(`${i + 1}. ${m.name} (PP: ${m.currentPP})`);
            });
            let idx = parseInt(await ask('Choisissez une attaque (1-5): ')) - 1;
            if (isNaN(idx) || idx < 0 || idx >= player.moves.length) {
                console.log('Choix invalide.');
                continue;
            }
            let move = player.moves[idx];
            if (move.currentPP <= 0) {
                console.log('Cette attaque n’a plus de PP !');
                continue;
            }
            move.currentPP--;
            if (move.power && Math.random() * 100 < (move.accuracy || 100)) {
                let dmg = Math.floor(move.power * (Math.random() * 0.3 + 0.85));
                enemy.takeDamage(dmg);
                console.log(`Vous utilisez ${move.name} ! Dégâts infligés : ${dmg}`);
            } else {
                console.log(`Vous utilisez ${move.name} ! L’attaque échoue.`);
            }
        } else {
            // Enemy turn
            const available = enemy.moves.filter(m => m.currentPP > 0);
            if (available.length === 0) {
                console.log(`${enemy.name} n’a plus d’attaques utilisables !`);
                turn++;
                continue;
            }
            let move = available[Math.floor(Math.random() * available.length)];
            move.currentPP--;
            if (move.power && Math.random() * 100 < (move.accuracy || 100)) {
                let dmg = Math.floor(move.power * (Math.random() * 0.3 + 0.85));
                player.takeDamage(dmg);
                console.log(`${enemy.name} utilise ${move.name} ! Dégâts subis : ${dmg}`);
            } else {
                console.log(`${enemy.name} utilise ${move.name} ! L’attaque échoue.`);
            }
        }
        turn++;
    }
    if (player.isDefeated()) {
        console.log('Vous avez perdu !');
    } else {
        console.log('Vous avez gagné !');
    }
    rl.close();
}

main();
