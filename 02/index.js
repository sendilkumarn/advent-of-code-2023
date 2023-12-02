const {readFileSync} = require('fs');

const parseInput = () => readFileSync('./input.txt', 'utf-8').split('\n');

const gameCheck = new Map();
gameCheck.set('red', 12);
gameCheck.set('green', 13);
gameCheck.set('blue', 14);

const parseGame = game => {
    let [gameId, scores] = game.split(':');
    const gId = parseInt(gameId.replace('Game', ''));
    const turns = scores.split('; ');
    const tokenMap = turns
        .flatMap(score => score.split(', ').map(t => t.trim().split(' ')))
        .reduce((gMap, [count, color]) => {
            let nCount = parseInt(count);
            if (gMap.get(color)) nCount = nCount < gMap.get(color) ? gMap.get(color) : nCount;
            gMap.set(color, nCount);
            return gMap;
        }, new Map());

    return [gId, tokenMap];
}
const solveFirst = () => parseInput()
       .map(game => parseGame(game))
       .filter(([_, gameMap]) => [...gameCheck.keys()].every(key => gameCheck.get(key) >= gameMap.get(key)))
       .reduce((a, [gameId, _]) => a + gameId, 0);

const solveSecond = () => parseInput()
        .map(game => parseGame(game))
        .map(([_, gameMap]) => [...gameCheck.keys()].reduce((acc, key) => acc * gameMap.get(key), 1))
        .reduce((a, b) => a + b, 0);

console.log(solveFirst());
console.log(solveSecond());