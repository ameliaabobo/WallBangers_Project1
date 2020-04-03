var WallBangersUI=function(){
    var self=this;
    // var clock = 0;
    this.game=undefined;
    var isPause = true;
    this.running=false;
    let img_num = 0;
    var zones_leftArray = [];/** Holds Zones */
    var zones_rightArray = [];
    // this.img_num = undefined;
    
    this.initialize=function()
    {
        //this.img_num = 0;
        //Initialize wallbangers.js Back end
        self.game=new wallBangers();
     
            $('#GameStopped').show();
            $('#GameRunning').hide();

            $('#Resetbtn').hide()

        
        // new KeyboardEvent("onKeyPress",self.game.ninja.jump());
        $('body').keypress(function(event){
            //Keycode for space is 32
            if (event.which==32 && !self.game.ninja.jumping && (self.game.ninja.xPos != 0 ||self.game.ninja.xPos != 450) ) 
            {
                self.game.ninja.jump();
            }
            else if(self.game.ninja.jumping && (self.game.ninja.xPos > 30 && self.game.ninja.xPos < 450)){
                self.game.ninja.jetpack();
            }

            // GenerateZone("rightwall");
            self.game.RandomZone();
        });

        $('#Interactbtn').on('click',function(){
            isPause = !isPause;
            if(isPause == false){
            $('#Resetbtn').hide();
            $('#Interactbtn').text("Pause");
            }else 
            {
                $('#Interactbtn').text("Resume");
                $('#Resetbtn').show();
            }
        });

        $('#Resetebtn').on('click',function(){
            isPause = true;
        });

    };

    this.drawPlayer=function(){
        //if(img_num > playerImgURL.length - 1){img_num = 0;}
        //var playerurl = playerImgURL[img_num];
        //console.log(playerurl);
        //$('#player').css("background-image", "url('/assets/Run/adventurer-run-01.png')" );
        //$('#player').css("background-image", playerImgURL[img_num] );
       // img_num ++;
       // console.log(document.getElementById("player").style.right.substr(0,3));
        
        // if(document.getElementById("player").style.right.substr(0,3) > 450/2){
        //     console.log("flip right");
        //     $('#player').css("transform", "transform:rotateY(180deg)" );
        // }else if (document.getElementById("player").style.right < 450/2){
        //     console.log("flip left");
        //     $('#player').css("transform", "transform:rotateY(0deg)" );
        // }

    };
    
    this.RotatePlayer=function(){
        null;
    };

    this.refreshView=function(){
        $('#player').css("right",self.game.ninja.xPos + 'px');
        $('#player').css("bottom",self.game.ninja.yPos + 'px');
        $(".Text").text(self.game.score);
        // self.drawPlayer();
    };
        
    this.updateUI=function(){
            if (!isPause) {
                var result= self.game.update();
                self.refreshView(); 
            } 
           
    };
    
    /**
     * 
     * gets information from .js
     */
    function GenerateDangerZone(wallLocation, height){  
        var zone = document.createElement("div");
        zone.style.top = "10px";
        zone.style.background = "gray";
        zone.style.position = "absolute";
        zone.style.right = 0;
        zone.style.left = 0;
        zone.style.height = height + "px";
        // if (wallLocation == "right"){
        //     zones_rightArray.push(zone);
        // }
        // else{//
        //     zones_leftArray.push(zone);
        // }
        //create a right wall zone array and a left wall zone array
        // need the coordinates of the bottom of a danger zone
        var container = document.getElementById(wallLocation);
        container.insertAdjacentElement("afterbegin",zone);

    }

    function getArray(){
        if(self.game.zones_leftArray != undefined){
            self.game.zones_leftArray.forEach(height =>{ 
                GenerateDangerZone("leftwall", height)
            });
        }
        if(self.game.zones_rightArray != undefined){
                    self.game.zones_rightArray.forEach(height =>{ 
            GenerateDangerZone("rightwall", height)
        });
        }
    }

    /**
     * Checks if the zone is off the screen
     */
    function CheckZones(){
        if(self.game.zones_leftArray != undefined){
            self.game.zones_leftArray.forEach(zone => {
            if(parseInt(zone.style.top,10) >= 500 ){
                self.game.zones_leftArray.shift();
            }
        });
        }
        if(self.game.zones_rightArray != undefined){
            self.game.zones_rightArray.forEach(zone => {
            if(parseInt(zone.style.top,10) >= 500 ){
                self.game.zones_rightArray.shift();
            }
        });
        }
    };

    /** Moves the  Zone then calls Check Zone */
    function MoveZones(){ 
        var rightCount = 0;
        var leftCount = 0;
        zones_rightArray.forEach(zone => {
            var number = parseInt(zone.style.top,10)+ 10;
            zone.style.top = number +"px";
            console.log(zone.style.cssText);
            rightCount++;
        });
        zones_leftArray.forEach(zone => {
            var number = parseInt(zone.style.top,10)+ 10;
            zone.style.top = number +"px";
            console.log(zone.style.cssText);
            leftCount++;
        });
        console.log("Right Count: " + rightCount);
        console.log("Left Count: " + leftCount);
        CheckZones();

    };

    /**Calls Foreach loop on array */
    function UpdateZones(){

        zones_array.forEach(MoveZones);

    };



    this.checkPause = function(){
        if(this.isPause == false){
            this.updateUI();
        }
    };
    
    this.initialize();
    setInterval(MoveZones,200);
    setInterval(getArray, 100);
    //setInterval(this.drawPlayer,200);
    setInterval(this.updateUI,33);
    
}