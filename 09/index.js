const {readFileSync} = require('fs');

const parseInput = () => readFileSync('./input.txt', 'utf-8')
                            .split('\n')
                            .map(l => l
                                        .split(' ')
                                        .map(w => parseInt(w.trim()))
                            );


const runIterator = line => {
    let sum = 0;

    while(line.some(l => l !== 0)) {
        line = line.map((val, i, arr) => (i < arr.length - 1) ? arr[i + 1] - val : val);
        sum += line.pop();
    }

    return sum;
}

const solveFirst = () => parseInput().map(line => runIterator(line)).reduce((a, b) => a + b, 0);
const solveSecond = () => parseInput().map(line => runIterator(line.reverse())).reduce((a, b) => a + b, 0);

console.log(solveFirst());
console.log(solveSecond());
