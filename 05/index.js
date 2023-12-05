const {readFileSync} = require('fs');

const parseSeed = str => str.replace('seeds: ', '').split(' ').map(w => parseInt(w.trim()));

const parseRange = arr => {
    let [_, ...rest] = arr.split('\n');
    return rest.map(w => w.split(' ').map(w => parseInt(w)));
}

const parseInput = () => readFileSync('./input.txt', 'utf-8')
                            .split('\n\n');

const getFromRange = (range, val) => {
    for (const part of range) {
        const [d, s, r] = part;
        if (val >= s && val < (s + r)) {
            return (d + (val - s));
        }
    }
    return val;
}

const getLocation = (seed, rangeMap) => {
    const [s2s, s2f, f2w, w2l, l2t, t2h, h2l] = rangeMap;
    const s =  getFromRange(s2s, seed);
    const f =  getFromRange(s2f, s);
    const w =  getFromRange(f2w, f);
    const li = getFromRange(w2l, w);
    const t =  getFromRange(l2t, li);
    const h =  getFromRange(t2h, t);
    const l =  getFromRange(h2l, h);

    return l;
}

const solveFirst = () => {
    const [seeds, ...range] = parseInput();
    const seedList = parseSeed(seeds);
    const rangeMap = range.map(line => parseRange(line));

    return seedList
            .reduce((acc, seed) => 
                        Math.min(acc, getLocation(seed, rangeMap)), 
                    Number.MAX_VALUE);
}

const isDropped = (start, end, rangeMap, minVal) => {
    const sLoc = getLocation(start, rangeMap);
    const eLoc = getLocation(end, rangeMap);
    return sLoc < eLoc;
} 

const solveSecond = (minVal, step) => {
    const [seeds, ...range] = parseInput();
    const seedList = parseSeed(seeds);
    const rangeMap = range.map(line => parseRange(line));

    let out = Number.MAX_VALUE;
    let minIndex = -1;
    for (let i = 0; i < seedList.length; i++) {
        const seedStart = seedList[i];
        const seedRange = seedList[i + 1];
        const seedEnd = seedStart + seedRange;
        i++;

        for (let j = seedStart; j < seedEnd; j = j + step) {
            if (isDropped(j, j + step, rangeMap, minVal)) {
                const location = getLocation(j, rangeMap);
                out = Math.min(location, out);
                if (out === location) {
                    minIndex = j;
                }
            }
        }
    }

    for (let k = minIndex - step; k < minIndex + step; k++) {
        out = Math.min(getLocation(k, rangeMap), out);   
    }

    return out;
}

const first = solveFirst();

console.log(first);
// increase step to 1000 for a faster execution with bigger input
console.log(solveSecond(first, 1));
