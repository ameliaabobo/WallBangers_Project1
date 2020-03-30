var wallBangers=function(){
    var self=this;
    this.options={
        height:200, // this is the visible height of the game environment
        width:680,
        wallHeight:2000, // this is how high the wall actually is. This is going to be for programming safe zones and things like that
        wallWidth:50, // idea here is to have the wall width be half the width of the environment
        obstacleSpeed:50,
        obstacleStartHeight:0,
        minX:50,
        minY:100
    }
    this.score=0; // This is the total number of points the player has accumulated so far
                    //player(xPos, yPos, minX, maxX, minY, maxY, veloX, veloY)
    /*this.topOfPreviousSafeZoneRight=0;
    this.topOfPreviousSafeZoneLeft=0;
    this.bottomOfPreviousSafeZoneRight=0;
    this.bottomOfPreviousSafeZoneLeft=0;*/
    this.ninja = new player(0+this.options.wallWidth, this.options.height, 0, this.options.width-this.options.wallWidth, 
                            this.options.height, this.options.height - 100, 0, 0); // Add the coordinates for the ninja. The goal is to have him on the bottom of the right wall essentially
    this.safeZones=function(){ // this will handle generating the safe zones
        this.start = 0; // This will track the beginning of a safe zone. After each safe zone is generated, start will increment by 50
        var sZones = [];
        for(var i = 0; i < 30; i++){
            sZones[i] = [0,0]; // will be 30 sets of pairs of ranges
            sZones[i][0]=this.start; // this will always be the bottom. [i][0] is the bottom of safe zone
            sZones[i][1] = Math.floor(Math.random()*(50-25)+25)+this.start; // [i][1] is the top of the safe zone
            this.start+=50; // now the bottom of the next safe zone will start at 50 
        }
        console.log(sZones);
    }
    this.initialize=function(){
        this.safeZones();
        self.reset();
    };

    this.reset=function(){
        this.score = 0;
    }
    this.initialize();
}

var player = function(xPos, yPos, minX, maxX, minY, maxY, veloX, veloY){
    var self = this;
    this.jump = false;
    this.LtoR = true;
    this.xPos = xPos;
    this.yPos = yPos;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.veloX = veloX;
    this.veloY = veloY;
    this.rightWall = true; // Determines which wall player is on. If on right, bool = true. If on left, bool = false.
    this.initialize = function(){};
    this.setPosition = function(xPos, yPos){ // this is how we move the ninja
        if(xPos < self.minX){
            self.xPos = self.minX;
        }
        else if(xPos > self.maxX){
            self.xPos = self.maxX;
        }
        if(yPos < self.minY){
            self.yPos = self.minY;
        }
        else if(yPos > self.maxY){
            self.yPos = self.maxY;
        }
    };
    this.incrementPosition = function(amount){
        self.setPosition(self.xPos, self.yPos + amount);
    };
    this.jump = function(){
        
        if(!jump){ //Check if already jumping
            switch (this.LtoR) { 
                case true: // jumping left to right
                    //this.veloX += 20; //Left to Right   
                    self.setPosition(xPos + 20, yPos);
                    this.rightWall = true;                
                    break;
                case false: // jumping right to left
                    //this.veloX -= 20; //Right to Left
                    self.setPosition(xPos - 20, yPos);
                    this.rightWall = false;
                    break;
            }
            this.jump = true;
        }
        this.veloY += 15; //Gravity
    };
    this.isCollide=function(/*add possible parameters*/){
        
    };
}

/*var hole=function(xPos, yPos, minY, maxY){
    this.length = Math.floor((Math.random() * 100) + 1);
    this.xPos=xPos;
    this.yPos=yPos;
    this.minY=minY;
    this.maxY=maxY;

    this.move=function(speed){ // this will handle moving the wall 
        if(self.yPos + speed > maxY){ // checking to make sure the hole has not hit the bottom of the wall
            // do something
        }
        else{
            self.yPos = self.yPos + speed;
        }
    }
}*/