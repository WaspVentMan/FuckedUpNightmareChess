screenBoard = document.querySelector(".board")
screenMenu = document.querySelector(".menu")

let emptyBoard = [
    ["br", "bp", "", "", "", "", "wp", "wr"],
    ["bn", "bp", "", "", "", "", "wp", "wn"],
    ["bb", "bp", "", "", "", "", "wp", "wb"],
    ["bq", "bp", "", "", "", "", "wp", "wq"],
    ["bk", "bp", "", "", "", "", "wp", "wk"],
    ["bb", "bp", "", "", "", "", "wp", "wb"],
    ["bn", "bp", "", "", "", "", "wp", "wn"],
    ["br", "bp", "", "", "", "", "wp", "wr"],
]

let board = []

let pieceIndex = {
    "r": "rook",
    "n": "knight",
    "b": "bishop",
    "q": "queen",
    "k": "king",
    "p": "pawn"
}

let select = [8, 8]
let sTurn = false
let turn = false
let funny = false
let cpu = {
    "enabled": true,
    "valid": [],
    "validMove": []
}

function toggleTurn(){
    sTurn = !sTurn

    let turnText = document.querySelector(".turnToggle")

    if (sTurn){
        turnText.textContent = "Black Starts"
    } else {
        turnText.textContent = "White Starts"
    }
}

function toggleCPU(){
    cpu.enabled = !cpu.enabled

    let cpuText = document.querySelector(".cpuToggle")

    if (cpu.enabled){
        cpuText.textContent = "YOU vs CPU"
    } else {
        cpuText.textContent = "YOU vs FRIEND"
    }
}

function toggleFunny(){
    funny = !funny

    let funnyText = document.querySelector(".funnyToggle")

    if (funny){
        funnyText.textContent = "Enabled :)"
    } else {
        funnyText.textContent = "Disabled"
    }
}

function resetBoard(){
    turn = sTurn
    board = JSON.parse(JSON.stringify(emptyBoard))
}

function posCheck(piece, x, y){
    if (piece[1] == undefined){
        return false
    }

    if (board[x][y][0] == piece[0]){
        return false
    }

    if (piece[1] == "p"){
        if (piece[0] == "b"){
            if (select[1] == 1 && y - 2 == select[1] && board[x][y - 1] == "" && board[x][y] == "" && x == select[0]){
                return true
            }
            if (y - 1 == select[1] && x == select[0] && board[x][y][0] != "w"){
                return true
            }
            if (((y - 1 == select[1] && x - 1 == select[0]) || (y - 1 == select[1] && x + 1 == select[0])) && board[x][y][0] == "w"){
                return true
            }
        } else if (piece[0] == "w"){
            if (select[1] == 6 && y + 2 == select[1] && board[x][y + 1] == "" && board[x][y] == "" && x == select[0]){
                return true
            }
            if (y + 1 == select[1] && x == select[0] && board[x][y][0] != "b"){
                return true
            }
            if (((y + 1 == select[1] && x - 1 == select[0]) || (y + 1 == select[1] && x + 1 == select[0])) && board[x][y][0] == "b"){
                return true
            }
        }
    }

    if (piece[1] == "n"){
        let pos = [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [-2, 1], [2, -1], [-2, -1]]
        for (let z = 0; z < 8; z++){
            if (y - pos[z][0] == select[1] && x - pos[z][1] == select[0] && board[x][y][0] != piece[0]){
                return true
            }
        }
    }

    if (piece[1] == "k"){
        let pos = [[1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1]]
        for (let z = 0; z < 8; z++){
            if (y - pos[z][0] == select[1] && x - pos[z][1] == select[0] && board[x][y][0] != piece[0]){
                return true
            }
        }
    }

    if (piece[1] == "r"){
        if (x == select[0]){
            if (y < select[1]){
                y++
                while (y < select[1]){
                    if (board[x][y] != ""){
                        return false
                    }
                    
                    y++
                }

                return true
            }

            if (y > select[1]){
                y--
                while (y > select[1]){
                    if (board[x][y] != ""){
                        return false
                    }

                    y--
                }

                return true
            }
        }

        if (y == select[1]){
            if (x < select[0]){
                x++
                while (x < select[0]){
                    if (board[x][y] != ""){
                        return false
                    }
                    
                    x++
                }

                return true
            }

            if (x > select[0]){
                x--
                while (x > select[0]){
                    if (board[x][y] != ""){
                        return false
                    }

                    x--
                }

                return true
            }
        }
    }

    if (piece[1] == "b"){
        if (x - y == select[0] - select[1]){
            if (x < select[0]){
                x++
                y++

                while (x < select[0]){
                    if (board[x][y] != ""){
                        return false
                    }

                    x++
                    y++
                }

                return true
            }

            if (x > select[0]){
                x--
                y--

                while (x > select[0]){
                    if (board[x][y] != ""){
                        return false
                    }

                    x--
                    y--
                }

                return true
            }
        }

        if (x - select[0] == select[1] - y){
            if (x < select[0]){
                x++
                y--

                while (x < select[0]){
                    if (board[x][y] != ""){
                        return false
                    }

                    x++
                    y--
                }

                return true
            }

            if (x > select[0]){
                x--
                y++

                while (x > select[0]){
                    if (board[x][y] != ""){
                        return false
                    }

                    x--
                    y++
                }

                return true
            }
        }
    }

    if (piece[1] == "q"){
        if (x == select[0]){
            if (y < select[1]){
                y++
                while (y < select[1]){
                    if (board[x][y] != ""){
                        return false
                    }
                    
                    y++
                }

                return true
            }

            if (y > select[1]){
                y--
                while (y > select[1]){
                    if (board[x][y] != ""){
                        return false
                    }

                    y--
                }

                return true
            }
        }

        if (y == select[1]){
            if (x < select[0]){
                x++
                while (x < select[0]){
                    if (board[x][y] != ""){
                        return false
                    }
                    
                    x++
                }

                return true
            }

            if (x > select[0]){
                x--
                while (x > select[0]){
                    if (board[x][y] != ""){
                        return false
                    }

                    x--
                }

                return true
            }
        }

        if (x - y == select[0] - select[1]){
            if (x < select[0]){
                x++
                y++

                while (x < select[0]){
                    if (board[x][y] != ""){
                        return false
                    }

                    x++
                    y++
                }

                return true
            }

            if (x > select[0]){
                x--
                y--

                while (x > select[0]){
                    if (board[x][y] != ""){
                        return false
                    }

                    x--
                    y--
                }

                return true
            }
        }

        if (x - select[0] == select[1] - y){
            if (x < select[0]){
                x++
                y--

                while (x < select[0]){
                    if (board[x][y] != ""){
                        return false
                    }

                    x++
                    y--
                }

                return true
            }

            if (x > select[0]){
                x--
                y++

                while (x > select[0]){
                    if (board[x][y] != ""){
                        return false
                    }

                    x--
                    y++
                }

                return true
            }
        }
    }
}

function renderWinner(colour){
    screenBoard.innerHTML = ""
    screenBoard.style.display = "block"
    let winCard = document.createElement("div")
    winCard.innerHTML = `<p class="winText">${colour.toUpperCase()} WINS!</p><div class="winButtonDiv"><button class="winButton" onclick="resetBoard(); renderBoard()">Restart</button><button class="winButton" onclick="screenMenu.style.left = '16px'; screenBoard.innerHTML = ''">Menu</button></div>`
    
    winCard.className = "winCard"
    winCard.style.color = colour
    screenBoard.appendChild(winCard)

    turn = false
}

function renderBoard(){
    screenMenu.style.left = '-800px'
    screenBoard.innerHTML = ""
    screenBoard.style.display = "grid"

    cpu.valid = []
    cpu.validMove = []

    let winState = [true, true]
    let turnColour = "#000000AA"

    if (turn){
        turnColour = "#ffffffAA"
    }

    let piece = ""
    
    if (select[0] != 8){
        piece = board[select[0]][select[1]]
    }

    for (let y = 0; y < 8; y++){
        for (let x = 0; x < 8; x++){
            let check = posCheck(piece, x, y)

            let containPiece = document.createElement("div")
            containPiece.className = "containPiece"

            if (board[x][y] == "wk"){
                winState[0] = false
            }

            if (board[x][y] == "bk"){
                winState[1] = false
            }

            if ((select[0] == x && select[1] == y) || check){
                containPiece.style.backgroundColor = turnColour
            }

            let innerPiece = document.createElement("div")
            innerPiece.className = "innerPiece"

            if (board[x][y] != ""){
                innerPiece.style.backgroundImage = "url('pieces/" + pieceIndex[board[x][y][1]] + "_outline.png')"
            }

            innerPiece.style.filter = "invert()"

            let outerPiece = document.createElement("div")
            outerPiece.className = "outerPiece"

            outerPiece.style.backgroundImage = "url('pieces/" + pieceIndex[board[x][y][1]] + ".png')"

            if (board[x][y][0] == "b"){
                outerPiece.style.filter = "invert()"
            } else {
                outerPiece.style.filter = "none"
            }

            if (!check){
                if ((turn && board[x][y][0] != "w" && !cpu.enabled) || (!turn && board[x][y][0] != "b")) {
                    outerPiece.onclick = function(){
                        if (board[x][y] != ""){
                            select = [x, y]
                            let audio = new Audio('audio/grab.mp3')
                            audio.play()
                        } else {
                            select = [8, 8]
                        }
        
                        renderBoard()
                    }
                } else if (turn && board[x][y][0] == "b" && cpu.enabled) {
                    cpu.valid.push([x, y])
                }
            } else {
                outerPiece.onclick = function(){
                    if (board[x][y] != "" && funny){
                        let audio = new Audio('funny/luigiScream.mp3')
                        audio.play()
                    }

                    board[select[0]][select[1]] = ""
                    board[x][y] = piece

                    turn = !turn
                    select = [8, 8]

                    let audio = new Audio('audio/place.mp3')
                    audio.play()
    
                    renderBoard()
                }
            }

            outerPiece.appendChild(innerPiece)
            containPiece.appendChild(outerPiece)
            screenBoard.appendChild(containPiece)
        }
    }

    console.log(winState)

    if (winState[0]){
        renderWinner("black")
        return
    } else if (winState[1]){
        renderWinner("white")
        return
    }

    if (turn && cpu.enabled) {
        setTimeout(function(){
            while (true){
                let choice = Math.round(Math.random()*(cpu.valid.length-1))
                console.log(choice)
    
                select = [cpu.valid[choice][0], cpu.valid[choice][1]]
    
                piece = board[select[0]][select[1]]
    
                for (let y = 0; y < 8; y++){
                    for (let x = 0; x < 8; x++){
                        if (posCheck(piece, x, y)){
                            cpu.validMove.push([x, y])
                        }
                    }
                }
    
                if (cpu.validMove.length == 0){
                    continue
                }

                let audio = new Audio('audio/grab.mp3')
                audio.play()

                renderBoardLite()
                break
            }
            setTimeout(function(){
                choice = Math.round(Math.random()*(cpu.validMove.length-1))
    
                if (board[cpu.validMove[choice][0]][cpu.validMove[choice][1]] != "" && funny){
                    let audio = new Audio('funny/luigiScream.mp3')
                    audio.play()
                } else {
                    let audio = new Audio('audio/place.mp3')
                    audio.play()
                }
    
                board[select[0]][select[1]] = ""
                board[cpu.validMove[choice][0]][cpu.validMove[choice][1]] = piece
    
                select = [8, 8]

                turn = !turn
                renderBoard()
            }, (1000*Math.random())+500)
        }, (1000*Math.random())+500)
    }
}

function renderBoardLite(){
    screenMenu.style.left = '-800px'
    screenBoard.innerHTML = ""
    screenBoard.style.display = "grid"

    let turnColour = "#000000AA"

    if (turn){
        turnColour = "#ffffffAA"
    }

    let piece = ""
    
    if (select[0] != 8){
        piece = board[select[0]][select[1]]
    }

    for (let y = 0; y < 8; y++){
        for (let x = 0; x < 8; x++){
            let check = posCheck(piece, x, y)

            let containPiece = document.createElement("div")
            containPiece.className = "containPiece"

            if ((select[0] == x && select[1] == y) || check){
                containPiece.style.backgroundColor = turnColour
            }

            let innerPiece = document.createElement("div")
            innerPiece.className = "innerPiece"

            if (board[x][y] != ""){
                innerPiece.style.backgroundImage = "url('pieces/" + pieceIndex[board[x][y][1]] + "_outline.png')"
            }

            innerPiece.style.filter = "invert()"

            let outerPiece = document.createElement("div")
            outerPiece.className = "outerPiece"

            outerPiece.style.backgroundImage = "url('pieces/" + pieceIndex[board[x][y][1]] + ".png')"

            if (board[x][y][0] == "b"){
                outerPiece.style.filter = "invert()"
            } else {
                outerPiece.style.filter = "none"
            }

            outerPiece.appendChild(innerPiece)
            containPiece.appendChild(outerPiece)
            screenBoard.appendChild(containPiece)
        }
    }
}