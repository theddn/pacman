'use strict'

const WALL = '🧱'
const FOOD = '&middot;'
const EMPTY = ' '
const CHERRY = '🍒'
const SUPER_FOOD = '🍬'


const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gCherryInterval

function init() {
 
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')

    gGame.isOn = true
    gCherryInterval = setInterval(addsCherry, 15000)
    onCloseModal()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2) || (j === 6 && i >= 2 && i < size - 5)) {
                board[i][j] = WALL
            }
        }
    }
    addsSuperFood(board)
    return board
}

function updateScore(diff) {
    const elScore = document.querySelector('h2 span')

    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score

}

function addsSuperFood(board) {
    board[1][1] = SUPER_FOOD
    board[1][board[0].length - 2] = SUPER_FOOD
    board[board[0].length - 2][1] = SUPER_FOOD
    board[board.length - 2][board[0].length - 2] = SUPER_FOOD
}
function addsCherry() {
    const emptyLocation = getEmptyLocation(gBoard)
    if (!emptyLocation) return
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    // update DOM 
    renderCell(emptyLocation, CHERRY)
}
function getEmptyLocation(board) {
    const emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyLocations.push({ i, j })
            }
        }
    }
    if (!emptyLocations.length) return null
    const randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    return emptyLocations[randIdx]
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gCherryInterval)
    clearInterval(gGhostsInterval)
    gGame.isOn = false
    renderCell(gPacman.location,EMPTY)
    onOpenModal()
}

function onOpenModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}

