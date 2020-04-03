var wallBangers=function(){
    var self=this;
    this.options={
        height:500, // this is the visible height of the game environment
        width:680,
        wallHeight:500, // this is how high the wall actually is. This is going to be for programming safe zones and things like that
        wallWidth:50, // idea here is to have the wall width be half the width of the environment
        obstacleSpeed:50,
        obstacleStartHeight:0,
        minX:50,
        minY:50
    }
    var zones_leftArray = [];
    var zones_rightArray = [];
    this.score=0; // This is the total number of points the player has accumulated so far
    this.ninja = new player()
    
    
    //ZONE GENERATION PATHWAY: initialize -> RandomZone -> Generate Zone -> push to zone_array -> move zone

    /**
     * Description:
     *      Randomly generates a zone on the right of left wall
     */
    this.RandomZone=function(){
        var random = Math.floor(Math.random()*2);
        switch (random){
            case 1:
                GenerateDZone("right");

                break;
            case 0:
                GenerateDZone("left");
                break;
        }
    }

    /**
     * IMPORTANT: Function only generates zones
     */
    function GenerateDZone(wallLocation){ //ranges between 50 and 75 in height
        if (wallLocation == "rightwall"){//generated on right wall
            //var num = Math.floor(Math.random()*(75-50)+50);
            zones_rightArray.push(Math.floor(Math.random()*(75-50)+50));
            
            //zones_rightArray.push(num);
            /*
            console.log("num =", num)
            for (var i in zones_rightArray){
                console.log("in right array ", zones_rightArray[i]);
            }
            */
        }
        else{//generated on left wall
            //var num1 = Math.floor(Math.random()*(75-50)+50);
            zones_leftArray.push(Math.floor(Math.random()*(75-50)+50));
            //zones_leftArray.push(num1);
            /*
            console.log("num1=", num1)
            for (var j in zones_leftArray){
                console.log("in left array ", zones_leftArray[j]);
            }
            */
        }
    }

    /*this.safeZones=function(){ // this will handle generating the safe zones
        this.start = 0; // This will track the beginning of a safe zone. After each safe zone is generated, start will increment by 50
        var sZones = [];
        for(var i = 0; i < 30; i++){
            sZones[i] = [0,0]; // will be 30 sets of pairs of ranges
            sZones[i][0]=this.start; // this will always be the bottom. [i][0] is the bottom of safe zone
            sZones[i][1] = Math.floor(Math.random()*(50-25)+25)+this.start; // [i][1] is the top of the safe zone
            this.start+=50; // now the bottom of the next safe zone will start at 50 
        }
        console.log(sZones);
    }*/
    this.initialize=function(){
        this.RandomZone();
        self.reset();
    };

    this.update=function(){
        this.ninja.updatePlayer();
        this.updateScore(); 
        self.ninja.isCollide();
    };


    this.reset=function(){
        this.score = 0;
    }

    this.updateScore = function(){
        this.score += 1;
    }

    this.initialize();
}

var player = function(xPos, yPos, minX, maxX, minY, maxY, veloX, veloY){
    var self = this;
    this.jumping = false;
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
    this.gravity = function(){
        this.veloY -=10;
    }
    this.jetpack=function(){
        this.veloY +=40;
    }
    this.jump = function(){
        // var currentlyJumping = this.jumping;
        console.log("PLAYER JUMP CALLED");
        if(this.jumping == false && (this.xPos ==0 || this.xPos == 450)){
            if(this.LtoR == true){
                    this.veloX -= 20;
                    this.jumping = true;
                }else{
                    this.veloX += 20;  
                    this.jumping = true;
                }    
            this.veloY = 50;
        }
    };

    this.Flip=function(){
        if(this.xPos > 450/2){
            console.log("flip right");
            $('#player').css({transform: 'rotateY(180deg)'} );
        }else if (this.xPos < 450/2){
            console.log("flip left");
            $('#player').css({transform: 'rotateY(0deg)'} );
        }
    }




    this.isCollide=function(/*add possible parameters*/){
       
        this.jumping = (this.xPos >= 450 || this.xPos <= 0) ? false : this.jumping; 

        this.xPos = (this.xPos > 450 ) ? 450 : this.xPos;
        this.xPos =  (this.xPos < 0 ) ? 0 : this.xPos;

        this.yPos = (this.yPos < 0  ) ? 0 : this.yPos;
        this.yPos =  (this.yPos > 470 ) ? 470 : this.yPos;
        

        this.veloX = (this.xPos >= 450 || this.xPos <= 0) ? 0: this.veloX;
        this.yPos = (this.jumping && (this.xPos >= 450 || this.xPos <= 0)) ? this.yPos : this.yPos;
        // this.veloY = (!this.jumping && (this.xPos >= 450 || this.xPos <= 0)) ? 0: this.veloy;

        this.LtoR = (this.xPos == 450) ? true: this.LtoR;
        this.LtoR = (this.xPos == 0) ? false: this.LtoR;


        
    };
    
    this.updatePlayer = function(){
        self.xPos += self.veloX;
        self.yPos += self.veloY;
        if(this.jump){ 
            this.gravity();
        }else{
            // this.jetpack();
        }
        this.Flip();

    };
    
};

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








