const {readFileSync} = require('fs');

const parseInput = () => readFileSync('./input.txt', 'utf-8').split('\n\n');

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

const lcm = arr => arr.reduce((acc, num) => (acc * num) / gcd(acc, num), 1);

const solveFirst = () => {
    const [instructions, nodes] = parseInput();
    const nodeMap = nodes
                    .split('\n')
                    .reduce((acc, node) => {
                        const [parent, children] = node.split(' = ');
                        return acc.set(parent, children.substring(1, children.length - 1).split(', '))
                    }, new Map());
    
    let start = 'AAA';
    let count = 0;
    while (start !== 'ZZZ') {
        for (let instruction of instructions) {
            const [l, r] = nodeMap.get(start);
            start = instruction === 'R' ? r : l;
            count++;
        }
    }
    return count;
}

const solveSecond = () => {
    const [instructions, nodes] = parseInput();
    const nodeMap = nodes
                    .split('\n')
                    .reduce((acc, node) => {
                        const [parent, children] = node.split(' = ');
                        return acc.set(parent, children.substring(1, children.length - 1).split(', '))
                    }, new Map());

    const counts = [...nodeMap.keys()].filter(n => n.endsWith('A')).map(start => {
        let count = 0;
        while (!start.endsWith('Z')) {
            for (let instruction of instructions) {
                const [l, r] = nodeMap.get(start);
                start = instruction === 'R' ? r : l;
                count++;
            }
        }
        return count;
    });

    return lcm(counts);
}

console.log(solveFirst());
console.log(solveSecond());