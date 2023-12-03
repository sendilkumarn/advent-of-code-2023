const {readFileSync} = require('fs');

const parseInput = () => readFileSync('input.txt', 'utf-8').split('\n').map(line => line.split(''));

const dirs = [[0,1], [0, -1], [1, 0], [-1, 0], [-1, 1], [-1, -1], [1, -1], [1, 1]];

const checkBoundaries = (grid, r, c, dir) => r + dir[0] >=0 && c + dir[1] >= 0 && r + dir[0] < grid.length && c + dir[1] < grid[r].length

const checkForSymbol = (r, c, grid) => {
    const ds  = dirs.filter(dir => {
        if (checkBoundaries(grid, r, c, dir)) {
            if (grid[r + dir[0]][c + dir[1]] !== '.' && !Number.isInteger(parseInt(grid[r + dir[0]][c + dir[1]]))) {
                return true;
            }
        }
        return false;
    });

    return ds.length > 0;
}


const solveFirst = () => {
    const lines = parseInput();

    let numbers = [];
    let witSym = [];

    lines.forEach((line, r) => {
        line.forEach((element, c) => {
            const nElement = parseInt(element);
            if (Number.isInteger(nElement)) {
                numbers.push([nElement, checkForSymbol(r, c, lines)]);
            } else {
                if (numbers.filter(([_, c]) => c).length > 0) {
                    witSym.push(parseInt(numbers.map(([e, _]) => e).join('')));
                }
                numbers.length = 0;
            }
        })
    });

    return witSym.reduce((a, b) => a + b, 0);
}

const findNumberForThatIndex = (pt, grid) => {
    let tmp = [];
    let [r, c] = pt;
    tmp.push(grid[r][c]);

    for (let i = c - 1; i >= 0; i--) {
        if (Number.isInteger(parseInt(grid[r][i]))) {
            tmp.splice(0, 0, grid[r][i]);
        } else {
            break;
        }
    }

    for (let i = c + 1; i < grid[r].length; i++) {
        if (Number.isInteger(parseInt(grid[r][i]))) {
            tmp.push(grid[r][i]);
        } else {
            break;
        }
    }

    return parseInt(tmp.join(''));
}


const findAdjacentGears = (grid, r, c) => {
    const numberIndex = dirs
        .map(dir => {
            if (checkBoundaries(grid, r, c, dir)) {
                if (Number.isInteger(parseInt(grid[r + dir[0]][c + dir[1]]))) {
                    return ([r + dir[0], c + dir[1]]);
                }
            }
        })
        .filter(d => d)
        .map(idx => findNumberForThatIndex(idx, grid));

    const s = [...new Set(numberIndex)]

    return s.length === 2 ? s.reduce((a, b) => a * b, 1) : 0;
}


const solveSecond = () => {
    const lines = parseInput();
    let witSym = [];

    lines.forEach((line, r) => {
        line.forEach((element, c) => {
            if (element === '*') witSym.push(findAdjacentGears(lines, r, c))
        })
    });

    return witSym.reduce((a, b) => a + b, 0);
}

console.log(solveFirst());
console.log(solveSecond());