const {readFileSync} = require('fs');

const parseInput = () => readFileSync('./input.txt', 'utf-8')
                            .split('\n').map(line => line.split(' '))
                            .map(([hand, value]) => [hand.split(''), parseInt(value)]);

const handValue = '123456789TJQKA';

const convertHand = (hand, withJoker = false) => hand.map(value => withJoker && value === 'J' ? 0 : handValue.indexOf(value) + 1);

const sortHands = arr => arr.sort(([id, [a, b, c, d, e]], [id1, [a1, b1, c1, d1, e1]]) => 
                                        (a === a1 ? b === b1 ? c === c1 ? d === d1 ? e === e1 ? 0 : e - e1 : d - d1 : c - c1 : b - b1 : a - a1));

const matchedCounts = str => {
    const letterMap = str.reduce((letterMap, s) => letterMap.set(s, letterMap.has(s) ? letterMap.get(s) + 1 : 1), new Map());
    return [...letterMap.values()].sort((a, b) => b - a);
}

const getWinTypeWithJoker = (winType, jokerCount) => jokerCount === 0 ? winType : 
       (winType === 5 || winType === 4) ? 6 : 
            winType === 3 ? 5 :
                (winType === 2 && jokerCount === 1) ? 4 :
                    (winType === 2 && jokerCount === 2) ? 5 :
                        winType === 1 ? 3 : 
                            winType === 0 ? 1 : winType;

const getWinType = countArr => { 
    const [maxVal, secondMaxVal, ..._] = countArr;

    return maxVal === 5 ? 6 :
            maxVal === 4 ? 5 : 
                maxVal === 3 && secondMaxVal === 2 ? 4 : 
                    maxVal === 3 && secondMaxVal === 1 ? 3 :
                        maxVal === 2 && secondMaxVal === 2 ? 2 :
                            maxVal === 2 && secondMaxVal === 1 ? 1 : 0;
}

const solveFirst = () => {
    const lines = parseInput();
    const handMap = lines.reduce((handMap, [hand, value]) => {
        const count = matchedCounts(hand);
        const winType = getWinType(count);
        const arr = handMap.has(winType) ? handMap.get(winType) : [];
        arr.push([value, convertHand(hand)]);
        handMap.set(winType, arr);
        return handMap;
    }, new Map());


    return [...handMap.keys()].sort().reduce(([rank, out], handType) =>
        sortHands(handMap.get(handType)).reduce(([rank, out], [id, _]) => [rank + 1, out + (rank * id)], [rank, out]), [1, 0]);
}

const solveSecond = () => {
    const lines = parseInput();
    const handMap = lines.reduce((handMap, [hand, value]) => {
        const count = matchedCounts(hand);
        const jokerCount = hand.filter(l => l === 'J').length;
        const winType = getWinTypeWithJoker(getWinType(count), jokerCount);
        const arr = handMap.has(winType) ? handMap.get(winType) : [];
        arr.push([value, convertHand(hand, true)]);
        handMap.set(winType, arr);
        return handMap;
    }, new Map());

    return [...handMap.keys()].sort().reduce(([rank, out], handType) =>
        sortHands(handMap.get(handType)).reduce(([rank, out], [id, _]) => [rank + 1, out + (rank * id)], [rank, out]), [1, 0]);
}


console.log(solveFirst());
console.log(solveSecond());
