class Grid{
    constructor(){
        this.COLS = 100;
        //width
        this.ROWS = 100;
        //length
        this.grid = []
        for(let col = 0; col < this.COLS; col++){
            let temp = []
            for(let row = 0; row < this.ROWS; row++){
                temp.push(0);
            }
            this.grid.push(temp);
        }
    }
    restart(){
        this.grid = [];
        for(let col = 0; col < this.COLS; col++){
            let temp = []
            for(let row = 0; row < this.ROWS; row++){
                temp.push(0);
            }
            this.grid.push(temp);
        }
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,this.COLS*5,this.ROWS*5)
    }
    clear(){
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,this.COLS*5,this.ROWS*5)
    }

    draw(){
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,500,500);

 
        for(let col = 0; col < this.COLS; col++){
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(col*20, 0);
            ctx.lineTo(col*20, 500);
            ctx.stroke();
        }
        for(let row = 0; row < this.ROWS; row++){
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, row*20);
            ctx.lineTo(500, row*20);
            ctx.stroke();
        }
        ctx.fillStyle = "white";
        ctx.font = "20px Fira Code";
        ctx.beginPath;
        ctx.textAlign = "left";
        ctx.fillText(p1.wins,20,477);
        ctx.textAlign = "right";
        ctx.fillText(p2.wins,480,477);
        
        for(let row = 0; row < this.ROWS; row++){
            for(let col = 0; col < this.COLS; col++){
                
                if(this.grid[row][col] == 1){
                    
                    if((row % 2 == 0) ^ (col % 2 == 0)){
                        p1.color = "#FF007F";
                    }else{
                        p1.color = "#DA70D6";
                    }
                    ctx.fillStyle = p1.color;
                    ctx.fillRect(col*5,row*5,5,5);
                    
                    
                   
                }else if(this.grid[row][col] == 2){
                    if((row % 2 == 0) ^ (col % 2 == 0)){
                        p2.color = "#CD853F";
                    }else{
                        p2.color = "#8B4513";
                    }
                    ctx.fillStyle = p2.color;
                    ctx.fillRect(col*5,row*5,5,5);
                }
                
              
            }
        }
        
    }
}

class Player{
    constructor(row,col,d,symbol,color){
        this.col = col;
        this.oCol = col;
        //width
        this.row = row;
        this.oRow = row;
        //length
        this.d = d;
        this.oD = d;

        this.symbol = symbol;

        this.wins = 0;
        this.color = color;

        this.invincible = false;
        this.counter = 0;
    }

    restart(){
        this.col = this.oCol;
        this.row = this.oRow;
        this.d = this.oD;
    }
    draw(){
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.col*5+2.5,this.row*5+2.5,1.5,0,2*Math.PI);
        ctx.fill();
    }

 
    move(){
        switch (this.d){
            case "r":
                this.col ++;
                break;
            case "l":
                this.col --;
                break;
            case "d":
                this.row ++;
                break;
            case "u":
                this.row --;
                break;
        }
        try{
            g.grid[this.row][this.col] += this.symbol;
        }catch(err){

        }
    }

}

document.addEventListener('keydown', (e) => {
    switch(e.keyCode){
        //////PLAYER 2
        case 38:
            //up
            if(p2.d != "d"){
                p2.d = "u";
            }
            
            break; 
        case 40:
            //down
            if(p2.d != "u"){
                p2.d = "d";
            }
            break;
        case 39:
            //up
            if(p2.d != "l"){
                p2.d = "r";
            }
            break;
        case 37:
            //down
            if(p2.d != "r"){
                p2.d = "l";
            }
            break;
        ///////////PLAYER 1
        case 87:
            //up
            if(p1.d != "d"){
                p1.d = "u";
            }
            break;
        case 83:
            //down
            if(p1.d != "u"){
                p1.d = "d";
            }
            break;
            break;
        case 68:
            //up
            if(p1.d != "l"){
                p1.d = "r";
            }
            break;
        case 65:
            //down
            if(p1.d != "r"){
                p1.d = "l";
            }
            break;
        case 16:
            p1.invincible = true;
            p2.invincible = true;
            break;
    }
});


class AI extends Player{
    constructor(row,col,d,symbol){
        super(row,col,d,symbol);
    }
    

    
}

function gameOver(invincible){
    let p1IsDead = false;
    let p2IsDead = false;
    
    if(p1.row >= 100 || p1.row < 0 || p1.col >= 100 || p1.col < 0){
        p1IsDead = true;
    }
    if(p2.row >= 100 || p2.row < 0 || p2.col >= 100 || p2.col < 0){      
        p2IsDead = true;
    }
    
    if(!invincible){
        try{
            if(g.grid[p1.row][p1.col] != p1.symbol){
                p1IsDead = true;
            }
        }catch(err){
            p1IsDead = true;
        }
        
        try{
            if(g.grid[p2.row][p2.col] != p2.symbol){
                p2IsDead = true;
            }
        }catch(err){
            p2IsDead = true;
        }
        
    
        if (p1.row == p2.row && p1.col == p2.col) {
            ctx.fillStyle = "red";
            ctx.fillRect(p1.col*5,p1.row*5,5,5);
            return [true, true];
        }
    }
    return [p1IsDead, p2IsDead];
}

const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');
const g = new Grid();
const p1 = new Player(50,10,"r",1, "#FF007F");
//const p1 = new AI(50,10,"r",1);
const p2 = new Player(50,90,"l",2,"#40E0D0");

function gameLoop(){
    g.draw();
    p1.draw();
    p2.draw();
    p1.move(p2);
    p2.move();
    let invincible = false;
    if(p1.invincible || p2.invincible){
        invincible = true;
        p1.counter ++;
        p2.counter ++;
        if(p1.counter == 5){
            p1.invincible = false;
            p2.invincible = false;
            p1.counter = 0;
            p2.counter = 0;
        }
    }
   
    let temp = gameOver(invincible);
    console.log(temp[0]+","+temp[1]);

    let p1IsDead = temp[0];
    let p2IsDead = temp[1];
    

    if(p1IsDead || p2IsDead){
        if(p1IsDead && p2IsDead){
            console.log("TIE");
        }else if(p1IsDead){
            p2.wins ++;
            console.log("PLAYER 2 WINS");
        }else if(p2IsDead){
            p1.wins ++;
            console.log("PLAYER 1 WINS");
        }
        setTimeout(()=>{
            inGame = false;
        },1000);
        clearInterval(i);
    }
       
    

    //setTimeout(5000);
    //window.requestAnimationFrame(gameLoop,1000);
    
}

let inGame = false;

function main(){
    inGame = true;
    i = setInterval(gameLoop,55);
    g.restart();
    p1.restart();
    p2.restart();
}

document.addEventListener('keydown', function foo(e){
    if(!inGame){
        main();
    }
});

main();
