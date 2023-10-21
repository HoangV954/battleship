import uniquid from 'uniqid';

const generateBoard = () => {
    let boardArray = [];
    let x = 1;
    let y = 1;

    for (let i = 1; i <= 100; i += 1) {

        boardArray.push({
            isHit: false,
            isOccupied: false,
            isHovered: false,
            isOutOfBound: false,
            ship: false,
            index: i,
            x: x,
            y: y,
            key: uniquid()
        })

        y += 1;
        if (y > 10) {
            y = 1;
            x += 1;
        }

    }

    return boardArray
}

const iniPlayerBoard = generateBoard();
const iniComputerBoard = generateBoard();

const findShipIdx = (shipId, arr) => {
    let index;
    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].type === shipId) {
            index = i;
        }
    }

    return index
}

const getCells = (grabbedCell, shipLength, destinationCell, playerBoard, axis) => {
    const beforeTotal = grabbedCell - 1;
    const afterTotal = shipLength - grabbedCell;
    const targetClass = destinationCell.classList[0];
    const targetCellIndex = Number(targetClass.slice(7, targetClass.length));
    const hoveredCellMainBoard = playerBoard[targetCellIndex - 1];
    //cuz array player board start from 1, meaning arr[0] has index 1
    let shipStart;
    let shipEnd;
    const selectedCells = [];
    const invalidCells = [];


    if (axis === 'x') {

        shipStart = targetCellIndex - beforeTotal - 1;
        shipEnd = targetCellIndex + afterTotal;

        for (let i = shipStart; i < shipEnd; i += 1) {
            //sai o day
            selectedCells.push(playerBoard[i])
            if (playerBoard[i] !== undefined && playerBoard[i].x !== hoveredCellMainBoard.x) {
                //Making sure the cell axis prop existed
                invalidCells.push(playerBoard[i]);
            }
        }
    } else {

        shipStart = targetCellIndex - beforeTotal * 10 - 1;
        shipEnd = targetCellIndex + afterTotal * 10;

        for (let i = shipStart; i < shipEnd; i += 10) {

            selectedCells.push(playerBoard[i])
            if (playerBoard[i] !== undefined && playerBoard[i].y !== hoveredCellMainBoard.y) {
                //Making sure the cell axis prop existed
                invalidCells.push(playerBoard[i]);
            }
        }

    }

    return { hoveredCellMainBoard, selectedCells, invalidCells }
}

const getCellsCondition = (cellObj, hoveredCellMainBoard, axis) => {
    if (cellObj === undefined
        || (axis === 'x' ? cellObj.x : cellObj.y) !== (axis === 'x' ? hoveredCellMainBoard.x : hoveredCellMainBoard.y)
        || cellObj.isOccupied) {
        return true;
    }
    return false;
}

const resetHoverBoard = (targetArr) => {
    const newPlayerBoard = [...targetArr];
    newPlayerBoard.forEach((cell) => {
        cell.isHovered = false;
        cell.isOutOfBound = false;
    })
    return newPlayerBoard
}


export { iniPlayerBoard, iniComputerBoard, findShipIdx, getCells, getCellsCondition, resetHoverBoard }