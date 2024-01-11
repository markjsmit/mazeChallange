const {getLoadInfo} = require('./internal/getLoadInfo')
const {createSimulator} = require('./internal/simulator')

const run = async () => {
    const {mazeFile, algorithmFile} = await getLoadInfo()
    const {maze} = require(mazeFile)
    const {createAlgorithm} = require(algorithmFile)

    const mazeRunner = createSimulator(maze, 200)
    await mazeRunner.run(createAlgorithm())
}

run()
