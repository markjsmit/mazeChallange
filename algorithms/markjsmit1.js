const createAlgorithm = () => {
    const searchMap = []
    let currentPos, endPos;
    let width, height;

    const createPosObject = (x, y) => {
        const baseScore = Math.abs(x - endPos.x) + Math.abs(y - endPos.y)
        let visits = 0
        let isDeadEnd = false;
        const pos = {
            getScore: () => {
                return isDeadEnd ? Number.MAX_SAFE_INTEGER : visits * (width + height) + baseScore
            },
            visit: () => {
                visits++;
            },
            markDeadEnd: () => {
                isDeadEnd = true
            }
        }
        return pos;
    };

    const createScorer = (mazeCheck, xOffset, yOffset) => () => {
        return !mazeCheck() ? Number.MAX_SAFE_INTEGER : (searchMap[currentPos.y + yOffset][currentPos.x + xOffset]).getScore()
    }


    const createMover = (mazeInstruction, moveFinder, xOffset, yOffset) => async () => {
        await mazeInstruction()
        const pos = searchMap[currentPos.y + yOffset][currentPos.x + xOffset];
        currentPos.y += yOffset
        currentPos.x += xOffset
        const possibleMoves = moveFinder()
        if (possibleMoves == 1) {
            pos.markDeadEnd()
        } else {
            pos.visit()
        }
    }

    const createDirection = (mazeInstruction, mazeCheck, moveFinder, xOffset, yOffset) => {
        return {
            getScore: createScorer(mazeCheck, xOffset, yOffset),
            move: createMover(mazeInstruction, moveFinder, xOffset, yOffset)
        }
    }

    let init = ({getWidth, getHeight, getStartPos, getFinish}) => {
        width = getWidth()
        height = getHeight()
        currentPos = getStartPos()
        endPos = getFinish()
        for (let y = 0; y < height; y++) {
            const row = [];
            searchMap.push(row)
            for (let x = 0; x < width; x++) {
                const pos = createPosObject(x, y);
                if (x == currentPos.x && y == currentPos.y) {
                    pos.visit()
                }
                row.push(pos)
            }
        }
    }

    const step = ({canGoUp, goUp, canGoDown, goDown, canGoLeft, goLeft, canGoRight, goRight}) => {

        const directions = [
            createDirection(goUp, canGoUp, findPossibleMoves, 0, -1),
            createDirection(goDown, canGoDown, findPossibleMoves, 0, 1),
            createDirection(goLeft, canGoLeft, findPossibleMoves, -1, 0),
            createDirection(goRight, canGoRight, findPossibleMoves, 1, 0),
        ]

        function findPossibleMoves() {
            let possibleMoves = 0;
            for (let i = 0; i < 4; i++) {
                if (directions[i].getScore() != Number.MAX_SAFE_INTEGER) {
                    possibleMoves++;
                }
            }
            return possibleMoves
        }


        let bestDirection = directions[0]
        for (let i = 1; i < 4; i++) {
            if (directions[i].getScore() < bestDirection.getScore()) {
                bestDirection = directions[i]
            }
        }

        return bestDirection.move
    }
    return {init, step}
}

module.exports = {createAlgorithm}