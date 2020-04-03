var wallBangers=function(){
    var self=this;
    this.options={
        height:500,
        width:680,
        wallHeight:500,
        wallWidth:50,// idea here is to have the wall width be half the width of the environment
        obstacleSpeed:50,
        minX:50,
        minY:100
    } 

    this.score = 0; /* points scored */
    //player(xPos, yPos, minX, maxX, minY, maxY, veloX, veloY)
    var zones_leftArray = [];
    var zones_rightArray = [];
    this.ninja = new player(); 
    this.initialize=function(){
        // self.ninja = new Player();
        // self.reset();
        this.RandomZone();
    };
    
    this.reset=function(){
        this.score = 0;
    }

    /* Updates Score */
    this.updateScore = function(){
        this.score +=1 ;
    }

    /* this function is what is used to update the state of the backend */
    this.update=function(){
        this.ninja.updatePlayer();
        this.updateScore(); 
        self.ninja.isCollide();
        this.RandomZone();
    };


    /**
     * Description:
     *      Randomly generates a zone on the right or left wall
     */
    this.RandomZone=function(){
        console.log("calling randomzone")
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
        if (wallLocation == "right"){//generated on right wall
            //var num = Math.floor(Math.random()*(75-50)+50);
            zones_rightArray.push(Math.floor(Math.random()*(75-50)+50));
            /*
            zones_rightArray.push(num);
            console.log("num =", num)
            var count0 = 0;
            zones_rightArray.forEach(height =>{
                console.log("in right array ", height);
                count0++;
            });
            console.log("count0 = ", count0);
            */
        }
        else{//generated on left wall
            //var num1 = Math.floor(Math.random()*(75-50)+50);
            zones_leftArray.push(Math.floor(Math.random()*(75-50)+50));
            /*
            zones_leftArray.push(num1);
            console.log("num1=", num1)
            var count = 0;
            zones_leftArray.forEach(height =>{
                console.log("in left array ", height);
                count++;
            });
            console.log("count = ", count);
            */
        }
    }

}

function player(){
    var self = this;
    this.jumping = false;
    this.LtoR = false;
    this.xPos = 0;
    this.yPos = 0;
    this.minX = 0;
    this.maxX = 0;
    this.minY = 0;
    this.maxY = 0;
    this.veloX = 0;
    this.veloY = 0;
    this.rightWall = true; //determines which wall the player is on
    this.initialize = function(){};
    this.gravity = function(){
        this.veloY -= 10;
    };
    this.jetpack = function(){
        this.veloY += 40;
    }
    this.jump = function(){
        
        // var currentlyJumping = this.jumping;
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
        // this.jetpack();
       
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

