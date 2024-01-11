const readline = require('readline');
const fs = require('fs')

const getAllFiles = (folder) => new Promise((resolve, reject) => fs.readdir(folder, (err, files) => {
    err ? reject(err) : resolve(files)
}))


const getOptionsForFolder = async (folder) => {
    const files = (await getAllFiles(folder)).map(fileName => fileName.split('.')[0])
    return files
}

const pickOption = async (field, options) => {

    const rl = readline.createInterface({input: process.stdin, output: process.stdout});
    const prompt = (query) => new Promise((resolve) => rl.question(query, resolve))

    options.forEach((val, key) => console.log("[" + key + "] " + val))
    let result
    while (!result) {
        let answer = await prompt("Which " + field + " do you choose? ")
        let number = Number.parseInt(answer)
        if (options[number] != undefined) {
            rl.close()
            return options[number]
        } else {
            console.log("This is not a valid answer, please pick a number which is in the options.")
        }
    }

}

const getLoadInfo = async () => {
    const mazes = await getOptionsForFolder('./mazes')
    const maze = await pickOption("maze", mazes)

    const algorithms = await getOptionsForFolder('./algorithms')
    const algorithm = await pickOption("algorithm", algorithms)
    return {mazeFile: "./mazes/" + maze, algorithmFile: "./algorithms/" + algorithm}
}

module.exports = {getLoadInfo}