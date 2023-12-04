const {readFileSync} = require('fs');

const parseInput = () => readFileSync('./input.txt', 'utf-8').split('\n');

const trimNumbers = numbers => numbers
                                .trim()
                                .split(" ")
                                .map(num => parseInt(num))
                                .filter(num => Number.isInteger(num));

const parseScratchCards = scratchCard => {
    const [_, numbers] = scratchCard.split(":");
    const [winning, allNumbers] = numbers.split("|");
    return [winning, allNumbers].map(numbers => trimNumbers(numbers));
}

const solveFirst = () => {
    const sum = parseInput().map(line => parseScratchCards(line))
                    .map(([winning, allNumbers]) => {
                        const count = allNumbers
                                        .filter(num => winning.indexOf(num) !== -1)
                                        .length;
                        return count > 0 ? Math.pow(2, count - 1) : 0
                    })
                    .reduce((a, b) => a + b, 0);
    
    return sum;
}

const solveSecond = () => {
    const lines = parseInput();
    const copy = lines.reduce((acc, line, idx) => {
        const [winning, allNumbers] = parseScratchCards(line);
        const count = allNumbers
                        .filter(num => winning.indexOf(num) !== -1)
                        .length;
        if (count > 0) {
            for (let k = 0; k < acc[idx]; k++) {
                for (let i = idx + 1; i < (idx + count + 1); i++) {
                    acc[i] += 1;
                }
            }
        }
        return acc;
    }, new Array(lines.length).fill(1));

    return copy.reduce((a, b) => a + b, 0);
}

console.log(solveFirst());
console.log(solveSecond());
