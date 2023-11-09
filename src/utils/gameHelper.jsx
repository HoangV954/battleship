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

const countOccurence = (arr) => {
    const count = {};
    arr.forEach((el) => {
        count[el] = (count[el] || 0) + 1
    })
    return count
}

const findMaxValues = (obj) => {
    const values = Object.values(obj);
    const max = Math.max(...values);

    return max;
}

const compareDuplicate = (arr) => {
    const xCounts = new Map();
    const yCounts = new Map();
    for (const item of arr) {
        const x = item.x;
        const y = item.y;

        xCounts.set(x, (xCounts.get(x) || 0) + 1);
        yCounts.set(y, (yCounts.get(y) || 0) + 1);
    }

    const xDupCount = Math.max(...xCounts.values());
    const yDupCount = Math.max(...yCounts.values());
    //Never do Math.max([]...xCounts.values()]); because Math.max expects arguments, not array

    if (xDupCount === yDupCount) {
        return 'x';
    } else {
        return xDupCount > yDupCount ? 'x' : 'y';
    }
}

const cellProximityFinder = (targetCell, availArr, axis) => {
    let nextShotArr = [];
    if (targetCell && availArr.length !== 0) {
        if (axis !== undefined) {
            if (axis === 'x') {
                for (let i = 0; i < availArr.length; i += 1) {
                    if ((availArr[i].y === targetCell.y + 1) && availArr[i].x === targetCell.x || (availArr[i].y === targetCell.y - 1) && availArr[i].x === targetCell.x) {
                        nextShotArr.push(availArr[i])
                    }
                }
            }
            else if (axis === 'y') {
                for (let i = 0; i < availArr.length; i += 1) {
                    if ((availArr[i].x === targetCell.x + 1) && availArr[i].y === targetCell.y || (availArr[i].x === targetCell.x - 1) && availArr[i].y === targetCell.y) {
                        nextShotArr.push(availArr[i])
                    }
                }
            }
        }
    }
    return nextShotArr
}

const findNextCell = (hitArr, availArr) => {
    const currentAxis = compareDuplicate(hitArr);
    let currentOppAxis;
    currentAxis === 'x' ? currentOppAxis = 'y' : currentOppAxis = 'x';
    const hitCellsWithMainAxisCells = hitArr.filter((hitCell) => {
        const availableAxis = cellProximityFinder(hitCell, availArr, currentAxis);

        return availableAxis.length !== 0
    })
    const hitCellsWithOppAxisCells = hitArr.filter((hitCell) => {

        const availableOppAxis = cellProximityFinder(hitCell, availArr, currentOppAxis);
        return availableOppAxis.length !== 0
    })

    let newestHitCell;
    if (hitCellsWithMainAxisCells.length > 0) {
        newestHitCell = hitCellsWithMainAxisCells[hitCellsWithMainAxisCells.length - 1];
    } else if (hitCellsWithMainAxisCells.length === 0) {
        newestHitCell = hitCellsWithOppAxisCells[hitCellsWithOppAxisCells.length - 1];
    }

    let surroundingCells;
    surroundingCells = cellProximityFinder(newestHitCell, availArr, currentAxis);
    if (surroundingCells.length === 0) {
        surroundingCells = cellProximityFinder(newestHitCell, availArr, currentOppAxis);
    }

    return surroundingCells;
}
export { iniPlayerBoard, iniComputerBoard, findShipIdx, getCells, getCellsCondition, resetHoverBoard, countOccurence, findMaxValues, compareDuplicate, findNextCell, generateBoard }



