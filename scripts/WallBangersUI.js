var WallBangersUI=function(){
    var self=this;
    // var clock = 0;
    this.game=undefined;
     var isPause = true;
    this.running=false;
    let img_num = 0;
    var zones_array = [];/** Holds Zones */
    // this.img_num = undefined;
    
    function Initialize(){
    
        // this.img_num = 0;
        //Initialize wallbangers.js Back end
        self.game=new wallBangers();

        console.log(isPause);
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
            RandomZone();
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

        $('#Resetbtn').on('click',function(){
            Reset();
            $('#Resetbtn').hide();
            console.log("RESTe CALLED");
        });

    };


    function Reset(){

        var isPause = true;
        this.running=false;
        let img_num = 0;
       
        /**Delete Zones */
        while (zones_array.length > 0) {
              zones_array.shift();
        }

        $('#Interactbtn').text("Start");
        $('#leftwall').empty();
        $('#rightwall').empty();
        self.game.score = 0;

        self.game.ninja.xPos = 0;
        self.game.ninja.yPos = 0;
        $('#player').css("bottom","0px");
        $('#player').css("right","0px");
    
    }



    this.drawPlayer=function(){
      
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
        zone.style.width = "50%";
        if(wallLocation == "leftwall") zone.style.right = 0;
        else zone.style.left = 0;
        zone.style.height = "49px";
        zones_array.push(zone);
        
        var container = document.getElementById(wallLocation);
        container.insertAdjacentElement("afterbegin",zone);

    }

    /**
     * Checks if the zone is off the screen
     */
    function CheckZones(){
        zones_array.forEach(zone => {
            if(parseInt(zone.style.top,10) >= 500 ){
                zones_array.shift();
            }
        });
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
        CheckZones();
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
    }



    this.checkPause = function(){
        if(this.isPause == false){
            this.updateUI();

        }
    };
    
    Initialize();
    setInterval(MoveZones,200);
    //setInterval(this.drawPlayer,200);
    setInterval(this.updateUI,33);
    
}