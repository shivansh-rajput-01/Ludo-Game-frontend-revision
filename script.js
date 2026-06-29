// Section for taking number of players as input

let main = document.querySelector(".main-box");
let input = document.querySelector(".input-box");
let numUsr = document.querySelector("#users");
let userNumberForm = document.querySelector("#user-number-input");
let humanNumberForm = document.querySelector("#human-number-form");
let nameForm = document.querySelector("#name-input");
let h1 = document.querySelector("h1");
let nameLabel = document.querySelector("#name-label");
let name = document.querySelector("#name");
let color = document.querySelector("#color");
let gender = document.querySelector("#gender");
let availableColors = ["red", "blue", "green", "yellow"];
let numPlayers;
let playerNames = [];
let inputPlayers = 0;
let finalPlayers = [];
let sortedPlayersName = [];
let blueTokens = document.querySelectorAll(".bt");
let redTokens = document.querySelectorAll(".rt");
let yellowTokens = document.querySelectorAll(".yt");
let greenTokens = document.querySelectorAll(".gt");
let p1 = document.querySelector(".One");
let p2 = document.querySelector(".Two");
let p3 = document.querySelector(".Three");
let p4 = document.querySelector(".Four");
let again = document.querySelector("#restart");
let p = [p1, p2, p3, p4];
let c = document.querySelector("#color");
let center = document.querySelectorAll(".center");
let badges = Array.from(document.querySelectorAll(".badge"));
let boardTokens = document.querySelectorAll(".board-token"); // YBGR
boardTokens = Array.from(boardTokens);
let dummyTokens = [...yellowTokens, ...blueTokens, ...greenTokens, ...redTokens];
let chanceLoop = ['blue', 'yellow', 'green', 'red'];
let obj = {
    "red": redTokens,
    "yellow": yellowTokens,
    "blue": blueTokens,
    "green": greenTokens,
};

boardTokens.forEach((token, index) => {
    token.dataset.tokenIdx = index % 4; 
});

again.addEventListener("click", () => {
    location.reload();
});

numUsr.addEventListener("input", function(){
    let display = document.querySelector("#display-user");
    display.innerText = this.value;
});


userNumberForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    numPlayers = this.elements[0].value;
    alert(`Number of players are: ${numPlayers}`);
    this.classList.add("hide");
    nameForm.classList.remove("hide");
    if(numPlayers != 4){
        c.classList.add("hide");
        c.required = false;
        c.removeAttribute('required');
        document.querySelector("#c-label").classList.add("hide");
    }
});

nameForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    if(numPlayers == 4){
        console.log(name.value);
        console.log(gender.value);
        console.log(color.value);
        playerNames.push({name: name.value, color: color.value, gender: gender.value});
        let colorIdx = availableColors.indexOf(color.value);
        availableColors.splice(colorIdx, 1);
    }else{
        playerNames.push({name: name.value, color: chanceLoop[inputPlayers], gender: gender.value});
        let colorIdx = availableColors.indexOf(chanceLoop[inputPlayers]);
        availableColors.splice(colorIdx, 1);
    }
    inputPlayers++;
    if(inputPlayers == numPlayers){
        main.classList.remove("hide");
        h1.classList.add("hide");
        this.classList.add("hide");
        playerNames.forEach((el) => {
            console.log(`name:${el.name}\ncolor:${el.color}\ngender:${el.gender}`);
        });
        finalPlayers = [...playerNames];
        console.log("--------------------------------------");
        finalPlayers.forEach((el) => {
            console.log(`name:${el.name}\ncolor:${el.color}\ngender:${el.gender}`);
        });
        availableColors.forEach((el) => {
            let collection = obj[el];
            for(let i=0; i<collection.length; i++){
                collection[i].classList.add('hide');
            }
        });
        finalPlayers.forEach((el) => {
            let g = el.gender;
            let n = el.name;
            let c = el.color;
            let currP = p.shift();
            console.log(currP);
            currP.classList.remove("hidden");
            currP.children[1].innerText = `${n}`;
            currP.children[1].style.backgroundColor = `${c}`;
            if(c == "yellow") currP.children[1].style.color = "black";
            currP.children[2].innerText = `${c}`;
            if(g == "bot"){
                currP.children[0].style.backgroundImage = "URL(bot.png)";
            }else if(g == "male"){
                currP.children[0].style.backgroundImage = "URL(male.png)";
            }else if(g == "female"){
                currP.children[0].style.backgroundImage = "URL(female.png)";
            }
        });
        chanceLoop.forEach((el) => {
            finalPlayers.forEach((e, idx) => {
                if(e.color == el) sortedPlayersName.push({name: e.name, idx: idx});
            });
        });
        console.log(sortedPlayersName);
        badges[sortedPlayersName[0].idx].classList.remove("hide");
        return;
    };
    if(numPlayers == 4){
        if(color.value == "red"){
            color.children[1].disabled = true;
        }
        else if(color.value == "blue"){
            color.children[2].disabled = true;
        }
        else if(color.value == "yellow"){
            color.children[3].disabled = true;
        }
        else if(color.value == "green"){
            color.children[4].disabled = true;
        }
    }
    nameLabel.innerText = `Enter Name of Player ${inputPlayers+1}:`;
    name.value = "";
    if(numPlayers == 4) color.value = "";
});

// Game section

let dice = document.querySelector("#dice-roll");
let diceGraphics = document.querySelector(".dice");
let gameBoard = Array.from(document.querySelectorAll(".play-box"));

// gameBoard.forEach((el, idx) => {
//     el.innerText = `${idx}`;
// });

center.forEach((el) => {
    gameBoard.push(el);
});

let diceObj = {
    1: [5],
    2: [1, 9],
    3: [3, 5, 7],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9]
}
const rollSound = new Audio('dice_sound.ogg');

let savePoints = [5, 6, 23, 24, 47, 48, 65, 66];

// let presentTokensObj = {};

let yellowPath = [5, 8, 11, 14, 17, 38, 41, 44, 47, 50, 53, 52, 51, 48, 45, 42, 39, 36, 56, 59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 33, 30, 27, 24, 21, 18, 19, 20, 23, 26, 29, 32, 35, 15, 12, 9, 6, 3, 0, 1, 4, 7, 10, 13, 16, 72];

let greenPath =  [48, 45, 42, 39, 36, 56, 59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 33, 30, 27, 24, 21, 18, 19, 20, 23, 26, 29, 32, 35, 15, 12, 9, 6, 3, 0, 1, 2, 5, 8, 11, 14, 17, 38, 41, 44, 47, 50, 53, 52, 49, 46, 43, 40, 37, 74];

let bluePath =   [23, 26, 29, 32, 35, 15, 12, 9, 6, 3, 0, 1, 2, 5, 8, 11, 14, 17, 38, 41, 44, 47, 50, 53, 52, 51, 48, 45, 42, 39, 36, 56, 59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 33, 30, 27, 24, 21, 18, 19, 22, 25, 28, 31, 34, 73];

let redPath =    [66, 63, 60, 57, 54, 33, 30, 27, 24, 21, 18, 19, 20, 23, 26, 29, 32, 35, 15, 12, 9, 6, 3, 0, 1, 2, 5, 8, 11, 14, 17, 38, 41, 44, 47, 50, 53, 52, 51, 48, 45, 42, 39, 36, 56, 59, 62, 65, 68, 71, 70, 67, 64, 61, 58, 55, 75];

let yellowTokensPos = [5, 5, 5, 5];
let redTokensPos = [66, 66, 66, 66];
let blueTokensPos = [23, 23, 23, 23];
let greenTokensPos = [48, 48, 48, 48];

let blueWin = [-1, -1, -1, -1];
let yellowWin = [-1, -1, -1, -1];
let greenWin = [-1, -1, -1, -1];
let redWin = [-1, -1, -1, -1];

let winner = [];

function isComplete(winner){
    return winner.every((el) => {
        return el != 0;
    });
}

let chance = 0; // 0 -> blue, 1 -> yellow, 2 -> green, 3 -> red
let dummyChance = 0;
let currMoves = [];
let flagMoves = [];
let killChance = [];
let killFlag = false;
let winFlag = false;
let chanceTokenMap = {
    0: blueTokens,
    1: yellowTokens,
    2: greenTokens,
    3: redTokens,
};
let chancePosMap = {
    0: blueTokensPos,
    1: yellowTokensPos,
    2: greenTokensPos,
    3: redTokensPos,
};
let chancePathMap = {
    0: bluePath,
    1: yellowPath,
    2: greenPath,
    3: redPath,
};
let chanceWinMap = {
    0: blueWin,
    1: yellowWin,
    2: greenWin,
    3: redWin,
};


// Game loop

// while(!isComplete(winner)){

// }

boardTokens.forEach((el) => {
    el.addEventListener("click", BoardToken);
});

dummyTokens.forEach((el) => {
    el.addEventListener("click", DummyToken);
});

function DummyToken(){
    if(currMoves.length <= 3 && currMoves[currMoves.length - 1] == 6) return;
    if(this.classList.contains("bt") && chance == 0 && (currMoves.includes(1) || currMoves.includes(6))){
        this.classList.add("hide");
        if(currMoves.includes(1) && !currMoves.includes(6)){
            currMoves.splice(currMoves.indexOf(1), 1);
        }
        else if(!currMoves.includes(1) && currMoves.includes(6)){
            currMoves.splice(currMoves.indexOf(6), 1);
        }
        else{
            currMoves.splice(currMoves.indexOf(6), 1);
        }
        removeHide(4, 7);
    }
    else if(this.classList.contains("yt") && chance == 1 && (currMoves.includes(1) || currMoves.includes(6))){
        this.classList.add("hide");
        if(currMoves.includes(1) && !currMoves.includes(6)){
            currMoves.splice(currMoves.indexOf(1), 1);
        }
        else if(!currMoves.includes(1) && currMoves.includes(6)){
            currMoves.splice(currMoves.indexOf(6), 1);
        }
        else{
            currMoves.splice(currMoves.indexOf(6), 1);
        }
        removeHide(0, 3);
    }
    else if(this.classList.contains("gt") && chance == 2 && (currMoves.includes(1) || currMoves.includes(6))){
        this.classList.add("hide");
        if(currMoves.includes(1) && !currMoves.includes(6)){
            currMoves.splice(currMoves.indexOf(1), 1);
        }
        else if(!currMoves.includes(1) && currMoves.includes(6)){
            currMoves.splice(currMoves.indexOf(6), 1);
        }
        else{
            currMoves.splice(currMoves.indexOf(6), 1);
        }
        removeHide(8, 11);
    }
    else if(this.classList.contains("rt") && chance == 3 && (currMoves.includes(1) || currMoves.includes(6))){
        this.classList.add("hide");
        if(currMoves.includes(1) && !currMoves.includes(6)){
            currMoves.splice(currMoves.indexOf(1), 1);
        }
        else if(!currMoves.includes(1) && currMoves.includes(6)){
            currMoves.splice(currMoves.indexOf(6), 1);
        }
        else{
            currMoves.splice(currMoves.indexOf(6), 1);
        }
        removeHide(12, 15);
    }
    if(currMoves.length == 0){
        chance = dummyChance;
        dice.classList.remove("hide");
        badges.forEach((el) => {
                el.classList.add("hide");
        });
        badges[sortedPlayersName[dummyChance].idx].classList.remove("hide");
    }
}

function removeHide(start, end){
    for(let i=start; i<=end; i++){
        if(boardTokens[i].classList.contains("hide")){
            boardTokens[i].classList.remove("hide");
            console.log("remove hide on : ",boardTokens[i]);
            break;
        }
    }
}

function findKill(val, arr1, arr2, arr3, num){
    console.log("inside kill");
    if(!arr1.includes(val) && !arr2.includes(val) && !arr3.includes(val)){
        console.log(arr1);
        console.log(arr2);
        console.log(arr3);
        console.log(val);
        console.log("no kill found");
        return;
    }
    console.log("kill found");
    console.log(arr1);
    console.log(arr2);
    console.log(arr3);
    console.log(val);
    let arrIdx;
    let reqArr;
    let tokenPos;
    let tokenPath;
    let start;
    let end;
    if(arr1.includes(val)){
        arrIdx = arr1.indexOf(val);
        reqArr = returnArray(num, 1);
    }
    else if(arr2.includes(val)){
        arrIdx = arr2.indexOf(val);
        reqArr = returnArray(num, 2);
    }
    else if(arr3.includes(val)){
        arrIdx = arr3.indexOf(val);
        reqArr = returnArray(num, 3);
    }
    tokenPos = reqArr[0];
    tokenPath = reqArr[1][0];
    start = reqArr[2];
    end = reqArr[3];
    gameBoard[val].removeChild(boardTokens[start + arrIdx]);
    console.log("current position :" , gameBoard[val]);
    console.log("killed token: ", boardTokens[start + arrIdx]);
    gameBoard[tokenPath].prepend(boardTokens[start + arrIdx]);
    console.log("new parent", gameBoard[tokenPath]);
    boardTokens[start + arrIdx].classList.add("hide");
    for(let i=start; i<=end; i++){
        if(dummyTokens[i].classList.contains("hide")){
            dummyTokens[i].classList.remove("hide");
            break;
        }
    }
    tokenPos[arrIdx] = tokenPath;
    killFlag = true;
}

function returnArray(num, val){
    if(num.indexOf(val) == 0){
        return [yellowTokensPos, yellowPath, 0, 3];
    }else if(num.indexOf(val) == 1){
        return [blueTokensPos, bluePath, 4, 7];
    }else if(num.indexOf(val) == 2){
        return [greenTokensPos, greenPath, 8, 11];
    }else if(num.indexOf(val) == 3){
        return [redTokensPos, redPath, 12, 15];
    }
}

function isSafeMove(idx, path, pos, tokens, i){
    let sum = 0;
    for(let i=0; i<currMoves.length; i++){
        sum += currMoves[i];
    }
    if(sum + idx < path.length){
        return true;
    }
    return checkBoardMoves(idx, path, pos, tokens, sum, i);
}

function checkBoardMoves(idx, path, pos, tokens, s, id){
    let locked = 0;
    let t = [...tokens];
    let dupMoves = [...currMoves];
    t.forEach((el, idx) => {
        if(!el.classList.contains("hide")){
            locked++;
        }
    });
    if(locked > 0 && (dupMoves.includes(6) || dupMoves.includes(1))){
        return true;
    }
    for(let i=0; i<pos.length; i++){
        if(pos[i] == path[0] && locked != 0){
            locked--;
            break;
        }
        if(i != id && s + path.indexOf(pos[i]) < path.length){
            return true;
        }
        if(dupMoves[0] + path.indexOf(pos[i]) < path.length){
            dupMoves.shift();
        }else if(dupMoves[1] + path.indexOf(pos[i]) < path.length){
            dupMoves.splice(1, 1);
        }
        if(dupMoves.length == 0){
            return true;
        }
    }
    return false;
}

function BoardToken(){
    console.log("------------------------------------------------------------");
    console.log("token clicked", this, chance);
    if(currMoves.length <= 3 && currMoves[currMoves.length - 1] == 6) return;
    if(this.getAttribute("id") == 'b' && chance == 0){
        let n = currMoves.shift();
        let pathIdx = bluePath.indexOf(blueTokensPos[boardTokens.indexOf(this) - 4]);
        // to check if clicked token cannot go inside win because the value of n is greater than required number
        if(pathIdx + n >= bluePath.length){
            currMoves.unshift(n);
            return;
        }
        // to check if after movement game will be in safe state or not
        if(currMoves.length > 1){
            let isSafe = isSafeMove(pathIdx+n, bluePath, blueTokensPos, blueTokens, boardTokens.indexOf(this) - 4);
            if(!isSafe){
                currMoves.unshift(n);
                return;
            }
        }
        // to update position of token after move
        blueTokensPos[boardTokens.indexOf(this) - 4] = move(bluePath, blueTokensPos[boardTokens.indexOf(this) - 4], n, this);
        // check any kill is present here or not
        let curPos = blueTokensPos[boardTokens.indexOf(this) - 4];
        if(savePoints.indexOf(curPos) == -1){ // current position is not a savepoint
            findKill(curPos, yellowTokensPos, greenTokensPos, redTokensPos, [1, 0, 2, 3]);
            // return;
        }
        console.log("blue", curPos, bluePath[bluePath.length - 1]);
        if(curPos == bluePath[bluePath.length - 1]){
            winFlag = true;
            console.log("make win flag true");
            for(let i=0; i<blueWin.length; i++){
                if(blueWin[i] == -1){
                    blueWin[i] = 0;
                    break;
                }
            }
        }
    }
    if(this.getAttribute("id") == 'y' && chance == 1){
        let n = currMoves.shift();
        let pathIdx = yellowPath.indexOf(yellowTokensPos[boardTokens.indexOf(this)]);
        if(pathIdx + n >= yellowPath.length){
            currMoves.unshift(n);
            return;
        }
        if(currMoves.length > 1){
            let isSafe = isSafeMove(pathIdx+n, yellowPath, yellowTokensPos, yellowTokens, boardTokens.indexOf(this));
            if(!isSafe){
                currMoves.unshift(n);
                return;
            }
        }
        yellowTokensPos[boardTokens.indexOf(this)] = move(yellowPath, yellowTokensPos[boardTokens.indexOf(this)], n, this);
        let curPos = yellowTokensPos[boardTokens.indexOf(this)];
        if(savePoints.indexOf(curPos) == -1){ // current position is not a savepoint
            findKill(curPos, blueTokensPos, greenTokensPos, redTokensPos, [0, 1, 2, 3]);
            // return;
        }
        console.log("yellow", curPos, yellowPath[yellowPath.length - 1]);
        if(curPos == yellowPath[yellowPath.length - 1]){
            winFlag = true;
            console.log("make win flag true");
            for(let i=0; i<yellowWin.length; i++){
                if(yellowWin[i] == -1){
                    yellowWin[i] = 0;
                    break;
                }
            }
        }
    }
    if(this.getAttribute("id") == 'g' && chance == 2){
        let n = currMoves.shift();
        let pathIdx = greenPath.indexOf(greenTokensPos[boardTokens.indexOf(this) - 8]);
        if(pathIdx + n >= greenPath.length){
            currMoves.unshift(n);
            return;
        }
        if(currMoves.length > 1){
            let isSafe = isSafeMove(pathIdx+n, greenPath, greenTokensPos, greenTokens, boardTokens.indexOf(this) - 8);
            if(!isSafe){
                currMoves.unshift(n);
                return;
            }
        }
        greenTokensPos[boardTokens.indexOf(this) - 8] = move(greenPath, greenTokensPos[boardTokens.indexOf(this) - 8], n, this);
        let curPos = greenTokensPos[boardTokens.indexOf(this) - 8];
        if(savePoints.indexOf(curPos) == -1){ // current position is not a savepoint
            findKill(curPos, yellowTokensPos, blueTokensPos, redTokensPos, [1, 2, 0, 3]);
            // return;
        }
        if(curPos == greenPath[greenPath.length - 1]){
            winFlag = true;
            console.log("make win flag true");
            for(let i=0; i<greenWin.length; i++){
                if(greenWin[i] == -1){
                    greenWin[i] = 0;
                    break;
                }
            }
        }
    }
    if(this.getAttribute("id") == 'r' && chance == 3){
        let n = currMoves.shift();
        let pathIdx = redPath.indexOf(redTokensPos[boardTokens.indexOf(this) - 12]);
        if(pathIdx + n >= redPath.length){
            currMoves.unshift(n);
            return;
        }
        if(currMoves.length > 1){
            let isSafe = isSafeMove(pathIdx+n, redPath, redTokensPos, redTokens, boardTokens.indexOf(this) - 12);
            if(!isSafe){
                currMoves.unshift(n);
                return;
            }
        }
        redTokensPos[boardTokens.indexOf(this) - 12] = move(redPath, redTokensPos[boardTokens.indexOf(this) - 12], n, this);
        let curPos = redTokensPos[boardTokens.indexOf(this) - 12];
        if(savePoints.indexOf(curPos) == -1){ // current position is not a savepoint
            findKill(curPos, yellowTokensPos, blueTokensPos, greenTokensPos, [1, 2, 3, 0]);
            // return;
        }
        if(curPos == redPath[redPath.length - 1]){
            winFlag = true;
            console.log("make win flag true");
            for(let i=0; i<redWin.length; i++){
                if(redWin[i] == -1){
                    redWin[i] = 0;
                    break;
                }
            }
        }
    }
    if(currMoves.length == 0){
        console.log("redwin", redWin);
        console.log("bluewin", blueWin);
        console.log("greenwin", greenWin);
        console.log("yellowwin", yellowWin);
        console.log("going to check victory");
        let w = checkVictory(chance);
        if(w) return;
        if(!killFlag && !winFlag) chance = dummyChance;
        dice.classList.remove("hide");
        // if(winner.includes(chance)) return;
        // badges.forEach((el) => {
        //         el.classList.add("hide");
        // });
        // badges[sortedPlayersName[chance].idx].classList.remove("hide");
        while(true){
            if(!winner.includes(chance)){
                badges.forEach((el) => {
                    el.classList.add("hide");
                });
                badges[sortedPlayersName[chance].idx].classList.remove("hide");
                break;
            };
            chance = (chance + 1) % numPlayers;
            dummyChance = chance;
        }
    }
}

function checkVictory(c){
    console.log(winner);
    let winArray = chanceWinMap[chance];
    for(let i=0; i<winArray.length; i++){
        if(winArray[i] == -1){
            return false;
        }
    }
    winFlag = false;
    if(!winner.includes(chance)) winner.push(chance);
    if(winner.length == numPlayers - 1){
        displayResult();
        return true;
    }
    while(true){
        chance = (chance + 1) % numPlayers;
        dummyChance = chance;
        if(!winner.includes(chance)) break;
    }
    return false;
}

function displayResult(){
    for(let i=0; i<numPlayers; i++){
        if(winner.includes(i)) continue;
        else winner.push(i);
    }
    document.querySelector(".dice-heading").innerText = `Result`;
    let roll = document.querySelector(".roll");
    roll.classList.add("hide");
    dice.classList.add("hide");
    document.querySelector(".outcome").classList.add("hide");
    let resultBox = document.querySelector("#result-box");
    resultBox.classList.remove("hide");
    again.classList.remove("hide");
    let table;
    table = `<table><tr><th>Rank</th><th>Name</th></tr>`;
    for(let i=0; i<winner.length; i++){
        table += `<tr><td>${i+1}</td><td style="background-color: ${chanceLoop[winner[i]]}">${sortedPlayersName[winner[i]].name}</td></tr>`;
    }
    table += `</table>`;
    resultBox.innerHTML = table;
}

function move(arr, start, moves, element){
    let idx = arr.indexOf(start);
    let endIdx = idx + moves;
    moveTokenGraphically(idx, endIdx, arr[idx], arr[endIdx], element, arr);
    return arr[endIdx];
}

async function moveTokenGraphically(idx, endIdx, start, end, ele, arr){
    let curr = gameBoard[start];
    let final = gameBoard[end];
    for(let i=1; i<=endIdx-idx; i++){
        // await moveForwardOne(gameBoard[arr[idx + i - 1]], gameBoard[arr[idx + i]], ele);
        setTimeout(() => {
            gameBoard[arr[idx + i - 1]].removeChild(ele);
            gameBoard[arr[idx + i]].prepend(ele);
        }, i * 200);
    }
}

function moveForwardOne(start, end, ele){
    return new Promise((resolve) => {
        start.removeChild(ele);
        setTimeout(() => {
            end.prepend(ele);
            resolve(); 
        }, 100);
    });
}

function badgeUpdate(){
    while(true){
        if(!winner.includes(chance)){
            badges.forEach((el) => {
                el.classList.add("hide");
            });
            badges[sortedPlayersName[chance].idx].classList.remove("hide");
            break;
        };
        chance = (chance + 1) % numPlayers;
        dummyChance = chance;
    }
}

let diceFunc = async function(){
    let number = Math.floor(Math.random() * 6) + 1;
    if(flagMoves.length == 0) currMoves = [];
    currMoves.push(number);
    flagMoves.push(number);
    rollSound.currentTime = 0; 
    rollSound.loop = true; 
    rollSound.play();
    diceGraphics.children[1].style.animationName = "none";
    void diceGraphics.children[1].offsetWidth;
    diceGraphics.children[1].style.animationName = "rotate";
    dice.classList.add("hide");
    setTimeout(() => {
        rollSound.pause();
        rollSound.currentTime = 0;
        diceGraphics.children[2].innerText = `Outcome: ${number}`;
        updateDice(number);
        dice.classList.remove("hide");
        if(number != 1 && number != 6 && tokenLocked(chance) && currMoves.length == 1){
            flagMoves = [];
            currMoves = [];
            dummyChance = (dummyChance + 1) % numPlayers;
            chance = (chance + 1) % numPlayers;
            badgeUpdate();
            return;
        }
        if(currentPlayerBlocked(chance, number)){
            console.log("inside block");
            flagMoves = [];
            currMoves = [];
            dummyChance = (dummyChance + 1) % numPlayers;
            chance = (chance + 1) % numPlayers;
            badgeUpdate();
            return;
        }
        if(number != 6){
            if(!killFlag && !winFlag) dummyChance = (dummyChance + 1) % numPlayers;
            flagMoves = [];
            dice.classList.add("hide");
            if(killFlag) killFlag = false;
            if(winFlag) winFlag = false;
        }
        else if(number == 6 && currMoves.length == 3){
            flagMoves = [];
            currMoves = [];
            if(!killFlag && !winFlag) dummyChance = (dummyChance + 1) % numPlayers;
            chance = (chance + 1) % numPlayers;
            badgeUpdate();
            if(killFlag) killFlag = false;
            if(winFlag) winFlag = false;
        }
    }, 2400);
}

function advanceCheck(chance, number, pos, path){
    let sum = 0;
    let dupMoves = [...currMoves];
    let newMoves = [...currMoves];
    let dumPos = [...pos];
    for(let i=0; i<currMoves.length; i++){
        sum += currMoves[i];
    }
    if(currMoves.length == 2 && currMoves[1] == 6){
        dupMoves.push(1);
        sum++;
    }
    for(let i=0; i<pos.length; i++){
        dupMoves = [...newMoves];
        if(sum + path.indexOf(pos[i]) < path.length){
            return false;
        }
        for(let j=0; j<dupMoves.length; j++){
            if(dupMoves[j] + path.indexOf(dumPos[i]) < path.length){
                dumPos[i] += dupMoves[j];
                newMoves.splice(j, 1);
                if(newMoves.length == 0){
                    return false;
                }
            }
        }
    }
    return true;
}

function currentPlayerBlocked(chance, number){
    let arr = Array.from(chanceTokenMap[chance]);
    if(currMoves.includes(6) || currMoves.includes(1)){
        let boolean = arr.some((el) => {
            return !el.classList.contains("hide");
        });
        if(boolean) return false;
    }
    let pos = chancePosMap[chance];
    let path = chancePathMap[chance];
    if(currMoves.length > 1){
        return advanceCheck(chance, number, pos, path);
    }
    let l = path.length;
    let locked = [];
    let start, end;
    let c;
    c = chance;
    if(chance == 0) c = 1;
    if(chance == 1) c = 0;
    start = c * 4;
    end = start + 3;
    console.log("start", start);
    console.log("end", end);
    for(let idx=0; idx<4; idx++){
        if(boardTokens[start + idx].classList.contains("hide")){
            locked[idx] = 1;
        }else{
            locked[idx] = 0;
            console.log("number < (l - path.indexOf(pos[idx])):", number, l, path.indexOf(pos[idx]));
            console.log("number < (l - path.indexOf(pos[idx])):", number < (l - path.indexOf(pos[idx])));
            if(number < (l - path.indexOf(pos[idx]))){
                console.log("returning false");
                return false;
            }
        }
    }
    console.log("chance:",chance);
    console.log("Locked:", locked);
    // locked.forEach((el, idx) => {
    //     if(el == 0){
            
    //     }
    // });
    return true;
}

function tokenLocked(chance){
    let arr = chanceTokenMap[chance];
    arr = Array.from(arr);
    return arr.every((el) => {
        return !el.classList.contains("hide");
    });
}

dice.addEventListener("click", diceFunc);

function updateDice(number){
    let arr = diceObj[number];
    for(let i=0; i<9; i++){
        diceGraphics.children[1].children[i].children[0].classList.add("hide");
    }
    for(box of arr){
        diceGraphics.children[1].children[box-1].children[0].classList.remove("hide");
    }
}
