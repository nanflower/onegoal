/**
 * Created by wangdongliang on 15/11/30.
 */

var  Tag_door=1;
var  Tag_ball=2;
var  Tag_player=3;
var  Tag_goalkeeper=4;


var gameScene2 = cc.Scene.extend({
    ctor:function(){
        this._super();
        cc.log("HelloWorld init")

    },
    onEnter:function () {
        this._super();
        var winSize = cc.director.getWinSize();

        var door =cc.Sprite.create(res.door);
        door.setPosition(winSize.width/2,winSize.height/2);
        this.addChild(door,1,Tag_door);


        var player = cc.Sprite.create(res.player);
        player.setPosition(winSize.width/2-150,winSize.height/2-120);
        this.addChild(player,2,Tag_player);

        var goalkeeper = cc.Sprite.create(res.Anti);
        goalkeeper.setPosition(winSize.width/2,winSize.height/2+50);
        this.addChild(goalkeeper,2,Tag_goalkeeper);


        var ball = cc.Sprite.create(res.ball);
        //ball.setScale(0.1);
        ball.setPosition(winSize.width/2-200,100);
        this.addChild(ball,3,Tag_ball);
        ball.runAction(cc.jumpTo(4, cc.p(winSize.width/2, winSize.height/2-130), 100, 4));

        this.goalkeeperready();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function(touch,event)
            {
                cc.log("hello");
                event.getCurrentTarget().run(touch.getLocation());
            }

       }, this);


    },

    moveSprite:function(position) {
        var sprite = this.getChildByTag(Tag_ball);
        sprite.stopAllActions();
        sprite.runAction(cc.moveTo(1, position));
        var o = position.x - sprite.x;
        var a = position.y - sprite.y;
        var at = Math.atan(o / a) * 57.29577951;  // radians to degrees

        if (a < 0) {
            if (o < 0)
                at = 180 + Math.abs(at);
            else
                at = 180 - Math.abs(at);
        }

        sprite.runAction(cc.rotateTo(1, at));
    },

    onMouseDown:function (event)
    {
        // if(!this.touchenable)
        // {
        //     this.havePcMouseDown = false;
        //     return;
        // }
        this.touchenable = false;
        this.havePcMouseDown = true;
        this.ready();
    },

    goalkeeperready:function()
    {
       this.schedule(this.update,0.7); 
    },
    update:function()
    {
        var winSize=cc.director.getWinSize();
        var goalkeeper = this.getChildByTag(Tag_goalkeeper);
        var goalkeeperdes = winSize.width/2+150*(Math.random()*2-1);
        var goalkeeperaction = cc.Sequence.create(
            cc.MoveTo.create(0.3,cc.p(goalkeeperdes,winSize.height/2+40)),
            cc.DelayTime.create(0.5),
            cc.CallFunc.create(function(){

            }.bind(this),this)
        );
        goalkeeper.runAction(goalkeeperaction);
    },
    onMouseUp:function(mouselocation)
    {
        this.run(mouselocation);
    },


    run:function(mouselocation)
    {
        // this.unschedule(this.update);

        var man = this.getChildByTag(Tag_player);
        var action = cc.Sequence.create(
            cc.MoveBy.create(1,cc.p(115,10)),
            cc.DelayTime.create(0.3),
            cc.CallFunc.create(function(){
                this.kick(mouselocation);
            }.bind(this),this)
        );
        man.runAction(action);
    },

    kick:function(mouselocation)
    {
        var winSize=cc.director.getWinSize();

        var goalkeeper = this.getChildByTag(Tag_goalkeeper);



        var ball = this.getChildByTag(Tag_ball);

        var targetX = mouselocation.x;


        var targetY = mouselocation.y;

        var shotaction = cc.Sequence.create(
            cc.MoveTo.create(0.3,cc.p(targetX,targetY)),
            cc.CallFunc.create(function(){
               if((Math.abs(goalkeeper.x-targetX)<50)&&(Math.abs(winSize.height/2+40-targetY)<50))
                {
                    score+=0;

                    this.gameOVer();
                }
                else if((targetX<100)||(targetX>390)||(targetY>570)||(targetY<400))
                {
                    score+=0;

                    this.gameOVer();
                }
                else
                {
                    score+=100;
                    cc.audioEngine.playEffect(res.cheer,false);
                    this.unschedule(this.update);
                    var label = cc.LabelTTF.create("GOAL!!!", "Arial", 100);
                    label.setString("GOAL!!!");
                    label.setPosition(250, 600);
                    this.addChild(label, 1);

                    this.runAction(cc.Sequence.create( cc.DelayTime.create(2), cc.CallFunc.create(function () {
                        cc.director.runScene(new gameScene1());}))
                    );



                }
            }.bind(this),this)

        );
        ball.runAction(shotaction);


    },

    gameOVer:function()
    {
        this._size = cc.Director._getInstance().getWinSize(); // 鑾峰緱灞忓箷灏哄澶у皬
        var scene = cc.Scene.create(); //鍒涘缓鏂板満鏅�
        var gsl = new gameScene3();
        //gsl.onEnter(); //
        scene.addChild(gsl,1);
        var bgLayer = cc.Layer.create(); // 鍒涘缓鏂板眰
        var bkPng = cc.Sprite.create(res.gameoverpic); // 鍒涘缓鏂扮簿鐏靛苟鍔犺浇鍥剧墖
        bgLayer.addChild(bkPng); // 灏嗙簿鐏靛姞鍦ㄨ繘灞�
        bkPng.setAnchorPoint(cc.p(0.5, 0.5)); // 璁剧疆閿氱偣
        bkPng.setPosition(this._size.width / 2,this._size.height / 2); // 璁炬柦浣嶇疆
        scene.addChild(bgLayer,0); //灏嗗眰鍔犺浇杩涘満鏅�
        cc.Director._getInstance().runScene(cc.TransitionFade.create(1.2,scene)); // 鍦烘櫙鍒囨崲

    }

});