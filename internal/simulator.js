const createSimulator = (inputMaze, delay = 200) => {
    const {maze, start, finish} = JSON.parse(JSON.stringify(inputMaze))
    let stepCount = 0;

    const getFinish = () => ({x: finish[0], y: finish[1]})
    const getStartPos = () => ({x: start[0], y: start[1]})
    let player = getStartPos()

    const wait = async () => {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    const getWidth = () => {
        return maze[0].length
    }

    const getHeight = () => {
        return maze.length
    }


    const print = () => {
        console.clear()
        maze.forEach((row, y) => {
            let line = ""
            row.forEach((column, x) => {
                if (x === player.x && y === player.y) {
                    line += "p ";
                } else if (x === finish[0] && y === finish[1]) {
                    line += "f ";
                } else {
                    line += column ? '█ ' : '  '
                }
            })
            console.log(line)
        })

        console.log("step count:" + stepCount)
    }

    const isValidPos = (x, y) => {
        return x > 0 && y > 0 && y < maze.length && x < maze[y].length &&
            !maze[y][x]
    }
    const move = async (x, y) => {
        await wait(delay)
        stepCount++
        if (isValidPos(x, y)) {
            player.x = x
            player.y = y
            print()

            return true
        }
        return false
    }

    const goUp = async () => {
        return await move(player.x, player.y - 1)
    }
    const goDown = async () => {
        return await move(player.x, player.y + 1)
    }

    const goLeft = async () => {
        return await move(player.x - 1, player.y)
    }
    const goRight = async () => {
        return await move(player.x + 1, player.y)
    }

    const canGoUp = () => {
        return isValidPos(player.x, player.y - 1)
    }
    const canGoDown = () => {
        return isValidPos(player.x, player.y + 1)
    }

    const canGoLeft = () => {
        return isValidPos(player.x - 1, player.y)
    }
    const canGoRight = () => {
        return isValidPos(player.x + 1, player.y)
    }
    const hasWon = () =>
        player.x == getFinish().x && player.y == getFinish().y

    return {
        run: async ({init, step}) => {
            player = getStartPos()
            stepCount = 0
            init({getStartPos, getFinish, getWidth, getHeight})
            print()
            while (!hasWon()) {
                const chosenStep = step({canGoUp, goUp, canGoDown, goDown, canGoLeft, goLeft, canGoRight, goRight})
                await chosenStep()
            }
        }
    }
}


module.exports = {createSimulator}




