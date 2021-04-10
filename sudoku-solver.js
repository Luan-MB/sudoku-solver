var INPUT = [];

function readCells() {

    for (var i=0;i<81;i++) {
        INPUT.push($('input[type="number"]')[i]);
    }
    
    var grid = [];

    k = 0;
    for (var i=0;i<9;i++) {
        grid[i] = [];
        for (var j=0;j<9;j++)
            grid[i][j] = INPUT[k++].value;
    }
    return grid;
}

function checkRow(cells, row, col, num) {
    for (var i=0;i<9;i++) {
        if ((i != col) && (num == cells[row][i]))
            return true;
    }
    return false;
}

function checkCol(cells, row, col, num) {
    for (var j=0;j<9;j++) {
        if ((j != row) && (num == cells[j][col]))
            return true;
    }
    return false;
}

function checkBox(cells, row, col,num) {
    var ibox, jbox;

    if (row < 3)
        ibox = 0;
    else if (row < 6)
        ibox = 3;
    else 
        ibox = 6;

    if (col < 3)
        jbox = 0;
    else if (col < 6)
        jbox = 3;
    else
        jbox = 6;

    for (var i=0;i<3;i++) {
        for (var j=0;j<3;j++) {
            if (((i + ibox != row) || (j + jbox != col)) && (num == cells[i+ibox][j+jbox]))
                return true;
        }
    }
    return false;
}

function conflict(grid,row,col,num) {

    if (checkRow(grid,row,col,num) || checkCol(grid,row,col,num) || checkBox(grid,row,col,num))
        return true;
    return false;
}

function invalidInput(grid) {

    for (var row=0;row<grid.length;row++) {
        for (var col=0;col<grid[row].length;col++) {
            if (grid[row][col] != "" && conflict(grid,row,col,grid[row][col]))
                return true;
        }
    }
    return false;
}

function solve(grid) {

    var row = 0;
    var col = 0;
    var blankSpace = false;

    for (row=0;row<grid.length;row++) {
        for (col=0;col<grid[row].length;col++) {
            if (grid[row][col] == "") {
                blankSpace = true;
                break;
            }
        }
        if (blankSpace)
            break;
    }

    if (!blankSpace)
        return true;

    for (var num=1;num<=9;num++) {
        if (!conflict(grid,row,col,num)) {
            grid[row][col] = num;
            if(solve(grid))
                return true;
            grid[row][col] = "";
        }
    }
    return false;
}

function writeCells(grid) {
    
    for (row=0;row<grid.length;row++) {
        for (col=0;col<grid[row].length;col++) {
            elem = INPUT.shift();
            if (elem.value != "")
                elem.style.backgroundColor = "#99DBF0";
            elem.value = grid[row][col];   
            elem.disabled = true;
        }
    }
}

function resetCells() {

    for (var i=0;i<81;i++) {
        INPUT.push($('input[type="number"]')[i]);
    }

    INPUT.forEach(() => {
        if (this.attr('disabled')) {
            console.log("hey");
        }
    })
}

$(document).ready(function(){
    
    $("#enter").click(() => {
        var grid = readCells();
        if (invalidInput(grid)) {
            console.log("Entrada inválida");
            $("#status").html("Entrada inválida");
        } else {
            if (solve(grid)) {
                writeCells(grid);
                console.log(grid);
            } else {
                console.log("Não há solução");
                $("#status").html("Não há solução");
            }
        }
    });

    $("#reset").click(() => {
        resetCells();
    })
    
    $("#clear").click(() => {
        location.reload();
    })
});