function readcells() {
    var cells = [];

    for (var i=0;i<81;i++) {
        cells.push($('input[type="number"]')[i].value);
    }
    
    var grid = [];

    for (var i=0;i<9;i++) {
        grid[i] = [];
        for (var j=0;j<9;j++)
            grid[i][j] = cells.shift();
    }
    return grid;
}

function checkrow(cells, row, col, num) {
    for (var i=0;i<9;i++) {
        if ((i != col) && (num == cells[row][i]))
            return true;
    }
    return false;
}

function checkcol(cells, row, col, num) {
    for (var j=0;j<9;j++) {
        if ((j != row) && (num == cells[j][col]))
            return true;
    }
    return false;
}

function checkbox(cells, row, col,num) {
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

    if (checkrow(grid,row,col,num) || checkcol(grid,row,col,num) || checkbox(grid,row,col,num))
        return true;
    return false;
}

function checkinput(grid) {

    for (var row=0;row<grid.length;row++) {
        for (var col=0;col<grid[row].length;col++) {
            if (grid[row][col] != "" && conflict(grid,row,col,grid[row][col]))
                return false;
        }
    }
    return true;
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

function writecells(grid) {
    
}

$(document).ready(function(){
    $("#enter").click(function(){
        var grid = readcells();
        if (!checkinput(grid))
            console.log("Entrada inválida");
        else {
            if (solve(grid))
                console.log(grid);
            else
                console.log("Não há solução")
        }
    });
});