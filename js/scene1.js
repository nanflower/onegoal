/**
 * Created by fanwei on 15/11/30.
 */


var gameScene1 = cc.Scene.extend({
    ctor:function(){
        this._super();

        cc.log("HelloWorld init");



        return true;
    },
    onEnter:function () {
        this._super();

        var size = cc.winSize;

        var SPEED = 50;

        var bg = new cc.Sprite(res.Background);
        bg.x = size.width/2;
        bg.y = 1250;
        this.addChild(bg, 0, 0);

        var ball = new cc.Sprite(res.playerball);
        ball.x = size.width/2;
        ball.y = size.height/4;
        this.addChild(ball,10);

        var stateLabel = new cc.LabelTTF("labelTTF", "Arial", 24);
        stateLabel.setString("Socre:"+score);
        this.addChild(stateLabel,15);
        stateLabel.setPosition(cc.p(100,750));

        var anti = new cc.Sprite(res.Anti);
        anti.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
        anti.y = size.height - 40;
        this.addChild(anti,10);

        var anti2 = new cc.Sprite(res.Anti);
        anti2.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
        anti2.y = size.height - 240;
        this.addChild(anti2,10);

        var anti3 = new cc.Sprite(res.Anti);
        anti3.x = size.width*3/4;
        anti3.y = size.height - 440;
        this.addChild(anti3,10);

        var anti4 = new cc.Sprite(res.Anti);
        anti4.x = size.width/4;
        anti4.y = size.height - 640;
        this.addChild(anti4,10);

        var ballPosition = 0;
        var ballState = false;

        cc.inputManager.setAccelerometerEnabled(true);

        cc.eventManager.addListener({
            event: cc.EventListener.ACCELERATION, 
            callback: function(acc, event){ 
                var ptx;
                var global_ball;
                global_ball = ball.getPosition();
                var pty = global_ball.y;

                if(pty > 20 ){
                                   
                    if(acc.x > -0.2 && acc.x < 0.2 && ballState)
                    {
                        ptx = size.width/2;
                        ball.runAction(cc.place(cc.p( ptx, pty)));
                        ballState = false;
                    }

                    if(acc.x < -0.3 && global_ball.x > size.width/4)
                    {
                        ptx = size.width/4;
                        ballState = true;
                        ball.runAction(cc.place(cc.p( ptx, pty)))
                    }

                    if(acc.x > 0.3 && global_ball.x <size.width*3/4)
                    {
                        ptx = size.width*3/4;
                        ballState = true;
                        ball.runAction(cc.place(cc.p( ptx, pty)))
                    }

                }   
            }  
          }, ball);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                this.touchLaction = touch.getLocation();
                return true;
            },
            onTouchMoved: function (touch, event) {
            },
            onTouchEnded: function (touch, event) {
                var touchEnd = touch.getLocation();
                var delat = this.touchLaction.x - touchEnd.x;
                //delat取50为边界，确保不会因为误操作而变动；
                if (delat >= 50 || delat <= -50){
                    if (delat < -50){
                      if(ballPosition != 1)
                      {
                        ballPosition++;
                      }
                    }
                    else if (delat >50){
                      if(ballPosition != -1)
                      {
                        ballPosition--;
                      }
                    }           
                }else if (delat >= -5 || delat <= 5){
                    if(touchEnd.x < size.width/2){
                      if(ballPosition != -1)
                      {
                        ballPosition--;
                      }
                    }           
                    if(touchEnd.x > size.width/2){
                      if(ballPosition != 1)
                      {
                        ballPosition++;
                      }
                    }
                }

                var p0 = ball.getPosition();
                var p1x = 0;
                var p1y = p0.y;
                if(ballPosition === 0)
                {
                    p1x = size.width/2;
                }else if(ballPosition === 1){
                    p1x = size.width*3/4;
                }else if(ballPosition === -1){
                    p1x = size.width/4;
                }
                ball.runAction(cc.place(cc.p( p1x, p1y)));
            }
        }, this);

        this.schedule(function(f){

            function Reset(){
                bg.x = size.width/2;
                bg.y = 1250;

                ball.x = size.width/2;
                ball.y = size.height/4;

                anti.x = size.width/2 + (Math.round(Math.random()*2.8)-1.4)*size.width/4;
                anti.y = size.height - 40;

                anti2.x = size.width/2 + (Math.round(Math.random()*2.8)-1.4)*size.width/4;
                anti2.y = size.height - 240;

                anti3.x = size.width*3/4;
                anti3.y = size.height - 440;


                anti4.x = size.width/4;
                anti4.y = size.height - 640;
            }

            if(bg.getPosition().y > -450)
                bg.y = bg.getPosition().y - 1.5;
            else if(ball.getPosition().y < 580)
                ball.y = ball.getPosition().y + 1.5;
            else{
                stateLabel.setString("Socre:"+score);
                cc.director.runScene(new gameScene2());
            }

            function Crash(player){
                if(player.x == ball.x)
                    if(player.y > ball.y && player.y - ball.y < 105){
                        this._size = cc.Director._getInstance().getWinSize(); // 鑾峰緱灞忓箷灏哄澶у皬
                        var scene = cc.Scene.create(); //鍒涘缓鏂板満鏅�
                        var gsl = new gameScene3();
                        scene.addChild(gsl,1);
                        var bgLayer = cc.Layer.create(); // 鍒涘缓鏂板眰
                        var bkPng = cc.Sprite.create(res.gameoverpic); // 鍒涘缓鏂扮簿鐏靛苟鍔犺浇鍥剧墖
                        bgLayer.addChild(bkPng); // 灏嗙簿鐏靛姞鍦ㄨ繘灞�
                        bkPng.setAnchorPoint(cc.p(0.5, 0.5)); // 璁剧疆閿氱偣
                        bkPng.setPosition(this._size.width / 2,this._size.height / 2); // 璁炬柦浣嶇疆
                        scene.addChild(bgLayer,0); //灏嗗眰鍔犺浇杩涘満鏅�
                        cc.Director._getInstance().runScene(cc.TransitionFade.create(1.2,scene)); // 鍦烘櫙鍒囨崲

                    }
            }

            anti.y = anti.getPosition().y - 2.5;
            Crash(anti);
            if(anti.y < -40)
            {
                anti.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti.y = size.height - 40;
            }

            anti2.y = anti2.getPosition().y - 2.5;
            Crash(anti2);
            if(anti2.y < -40)
            {
                anti2.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti2.y = size.height - 40;
            }

            anti3.y = anti3.getPosition().y - 2.5;
            Crash(anti3);
            if(anti3.y < -40)
            {
                anti3.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti3.y = size.height - 40;
            }

            anti4.y = anti4.getPosition().y - 2.5;
            Crash(anti4);
            if(anti4.y < -40)
            {
                anti4.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti4.y = size.height - 40;
            }
        });
    }
});
