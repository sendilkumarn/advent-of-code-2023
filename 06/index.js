const {readFileSync} = require('fs');

const parseInput = () => readFileSync('./input.txt', 'utf-8')
                            .split('\n')
                            .map(line => parseLine(line));

const parseLine = line => line
                            .replace('Time: ', '')
                            .replace('Distance: ', '')
                            .split(' ')
                            .filter(v => v.trim())
                            .map((v) => parseInt(v));

const solveFirst = () => {
    const [times, distances] = parseInput();

    return times.reduce((acc, time, i) => {
        let valid = 0;
        let start = 1;
        while(start < (time - 1)) {
            if (((time - start) * start) > distances[i]) {
                valid++;
            }
            start++;
        }
        return acc * valid;
    }, 1);
}

const solveSecond = () => {
    const [time, distance] = parseInput().map(line => parseInt(line.join('')));

    let start = 1;
    while (((time - start) * start) <= distance) {
        start++;
    }

    let end = time - 1;
    while (((time - end) * end) <= distance) {
        end--;
    }

    return end - start + 1;
}

console.log(solveFirst());
console.log(solveSecond());
