var WallBangersUI=function(){
    var self=this;
    // var clock = 0;
    this.game=undefined;
     var isPause = true;
    this.running=false;
    this.img_num = 0;
    this.initialize=function()
    {
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
        // if(img_num >= 7){img_num = 0;}
        // $('#player').css("background-image", url("assets/Run/adventurer-run-0\(img_num).png"));
        // img_num += 1;
        // console.log("\(img_num)");

        var x = document.getElementById("player_image");
        //x.;

    };
    

    this.refreshView=function(){
        $('#player').css("right",self.game.ninja.xPos + 'px');
        $('#player').css("bottom",self.game.ninja.yPos + 'px');
        $(".Text").text(self.game.score);
        self.drawPlayer();
    };
        
    this.updateUI=function(){
            if (!isPause) {
                var result= self.game.update();
                self.refreshView(); 
            } 
            // if(img_num >= 7){img_num = 0;}
            // $('#player').css("background-image", url("assets/Run/adventurer-run-0\(img_num).png"));
            // img_num += 1;
            //this.drawplayer();
    }

    this.checkPause = function(){
        if(this.isPause == false){
            this.updateUI();
        }
    }
    
    this.initialize();
    setInterval(this.updateUI,33);
    
}