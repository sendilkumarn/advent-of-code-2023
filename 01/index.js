const {readFileSync} = require('fs');

const parseInput = () => 
    readFileSync('./input.txt', 'utf-8').split('\n').map(line => line.split(''));

const numbers = 'one, two, three, four, five, six, seven, eight, nine'.split(', ');

const convert = arr => parseInt(arr[0]) * 10 + parseInt(arr[arr.length -1]);

const solveFirst = () => parseInput()
        .map(line => line.filter(ch => Number.isInteger(parseInt(ch))))
        .reduce((a, b) => a + convert(b), 0);

const solveSecond = () => parseInput()
        .map(line => line.reduce((arr, ch, idx) => {
            if (Number.isInteger(parseInt(ch))) arr.push(parseInt(ch));
            numbers.forEach((num, numIdx) => {
                if (line.join('').substring(idx, idx + num.length) === num) {
                    arr.push(numIdx + 1);
                }
            });
            return arr;
        }, []))
        .reduce((a, b) => a + convert(b), 0);

console.log(solveFirst());
console.log(solveSecond());
