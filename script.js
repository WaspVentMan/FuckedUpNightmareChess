let board = [
    ["br", "bp", "", "", "", "", "wp", "wr"],
    ["bn", "bp", "", "", "", "", "wp", "wn"],
    ["bb", "bp", "", "", "", "", "wp", "wb"],
    ["bq", "bp", "", "", "", "", "wp", "wq"],
    ["bk", "bp", "", "", "", "", "wp", "wk"],
    ["bb", "bp", "", "", "", "", "wp", "wb"],
    ["bn", "bp", "", "", "", "", "wp", "wn"],
    ["br", "bp", "", "", "", "", "wp", "wr"],
]

let pieceIndex = {
    "r": "rook",
    "n": "knight",
    "b": "bishop",
    "q": "queen",
    "k": "king",
    "p": "pawn"
}

let select = [8, 8]
let turn = false

function posCheck(piece, x, y){
    if (piece[1] == undefined){
        return false
    }

    if (board[x][y][0] == board[select[0]][select[1]][0]){
        return false
    }

    if (piece[1] == "p"){
        if (piece[0] == "b"){
            if (select[1] == 1 && y - 2 == select[1] && board[x][y - 1] == "" && x == select[0]){
                return true
            }
            if (y - 1 == select[1] && x == select[0] && board[x][y][0] != "w"){
                return true
            }
            if (((y - 1 == select[1] && x - 1 == select[0]) || (y - 1 == select[1] && x + 1 == select[0])) && board[x][y][0] == "w"){
                return true
            }
        } else if (piece[0] == "w"){
            if (select[1] == 6 && y + 2 == select[1] && board[x][y + 1] == "" && x == select[0]){
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

                while (x < select[0]){
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

                while (x < select[0]){
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

function constructor(){
    document.body.innerHTML = ""

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
                if ((turn && board[x][y][0] != "w") || (!turn && board[x][y][0] != "b"))
                outerPiece.onclick = function(){
                    if (board[x][y] != ""){
                        select = [x, y]
                        let audio = new Audio('audio/grab.mp3')
                        audio.play()
                    } else {
                        select = [8, 8]
                    }
    
                    constructor()
                }
            } else {
                outerPiece.onclick = function(){
                    if (board[x][y] != "" && Math.random() > 0.999){
                        let audio = new Audio('funny/luigiScream.mp3')
                        audio.play()
                    }

                    board[select[0]][select[1]] = ""
                    board[x][y] = piece

                    turn = !turn
                    select = [8, 8]

                    let audio = new Audio('audio/place.mp3')
                    audio.play()
    
                    constructor()
                }
            }

            outerPiece.appendChild(innerPiece)
            containPiece.appendChild(outerPiece)
            document.body.appendChild(containPiece)
        }
    }

    console.log(winState)

    if (winState[0]){
        document.body.innerHTML = ""
        document.body.style.display = "block"
        let winCard = document.createElement("div")
        winCard.className = "winCard"
        winCard.textContent = "BLACK WINS!"
        winCard.style.color = "black"
        document.body.appendChild(winCard)
    } else if (winState[1]){
        document.body.innerHTML = ""
        document.body.style.display = "block"
        let winCard = document.createElement("div")
        winCard.className = "winCard"
        winCard.textContent = "WHITE WINS!"
        winCard.style.color = "white"
        document.body.appendChild(winCard)
    }
}

constructor()