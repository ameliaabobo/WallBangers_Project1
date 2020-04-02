var WallBangersUI=function(){
    var self=this;
    // var clock = 0;
    this.game=undefined;
     var isPause = true;
    this.running=false;
    let img_num = 0;
    var zones_array = [];/** Holds Zones */
    // this.img_num = undefined;
    var playerImgURL =   [
        "url('/assets/Run/adventurer-run-00.png')",
        "url('/assets/Run/adventurer-run-01.png')",
        "url('/assets/Run/adventurer-run-02.png')",
        "url('/assets/Run/adventurer-run-03.png')",
        "url('/assets/Run/adventurer-run-04.png')",
        "url('/assets/Run/adventurer-run-05.png')",
        ]
    this.initialize=function()
    {
        // this.img_num = 0;
        //Initialize wallbangers.js Back end
        self.game=new wallBangers();
     
            $('#GameStopped').show();
            $('#GameRunning').hide();
     
        
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
            RandomZone();
        });

        $('#resumebtn').on('click',function(){
            $('#resumebtn').text("Resume");
            isPause = false;
        });

        $('#pausebtn').on('click',function(){
            isPause = true;
        });

    };

    this.drawPlayer=function(){
        if(img_num > playerImgURL.length - 1){img_num = 0;}
        var playerurl = playerImgURL[img_num];
        //console.log(playerurl);
        $('#player').css("background-image", "url('/assets/Run/adventurer-run-01.png')" );
        //$('#player').css("background-image", playerImgURL[img_num] );
        img_num ++;
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
     * IMPORTANT: Function only generates zones
     */
    function GenerateZone(wallLocation){  
        var zone = document.createElement("div");
        zone.style.top = "10px";
        zone.style.background = "gray";
        zone.style.position = "absolute";
        zone.style.right = 0;
        zone.style.left = 0;
        zone.style.height = "49px";
        zones_array.push(zone);
        
        var container = document.getElementById(wallLocation);
        container.insertAdjacentElement("afterbegin",zone);

    }



    /**
     * Checks if the zone is off the screen
     */
    function CheckZones(){

        // zones_array.forEach();


    };

    /** Moves the  Zone then calls Check Zone */
    function MoveZones(){ 
        var count = 0;
        zones_array.forEach(zone => {
            var number = parseInt(zone.style.top,10)+ 10;
            zone.style.top = number +"px";
            console.log(zone.style.cssText);
            count++;
        });
        console.log(count);

    };

    /**Calls Foreach loop on array */
    function UpdateZones(){

        zones_array.forEach(MoveZones);

    };




    /**
     * Description:
     *      Randomly generates a zone on the right of left wall
     */
    function RandomZone(){
        var random = Math.floor(Math.random()*2);
        switch (random){
            case 1:
                GenerateZone("rightwall");

                break;
            case 0:
                GenerateZone("leftwall");
                break;
        }

        // if(Math.random())

    }



    this.checkPause = function(){
        if(this.isPause == false){
            this.updateUI();
        }
    };
    
    this.initialize();
    setInterval(MoveZones,200);
    setInterval(this.drawPlayer,200);
    setInterval(this.updateUI,33);
    
}