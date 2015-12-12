/**
 * Created by xuchi on 15/11/30.
 */

var score=0;
var gamebegin = cc.Scene.extend({
    onEnter:function(){
        this._super();
        gameLayer = new gamestart();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var gamestart = cc.Layer.extend({
    init:function () {
        //this._super();
        this._size = cc.Director._getInstance().getWinSize(); // 获得游戏屏幕尺寸 
        this.gameLayer = cc.Layer.create(); // 创建名为“gameLayer”的新图层 
        this.addChild(this.gameLayer); //加在这个新图层 
        var bg = cc.Sprite.create(res.fengmian); // 创建精灵加载图片“s_HelloWorld” 
        this.gameLayer.addChild(bg, 1); //在gameLayer层上加载这个精灵 
        bg.setAnchorPoint(cc.p(0.5, 0.5));// 设置锚点 
        bg.setPosition(this._size.width / 2, this._size.height /2);// 设置位置

        var newGameNormal = cc.Sprite.create("images/goalmenu.png", cc.rect(0, 0, 126, 33));
        var newGameSelected = cc.Sprite.create("images/goalmenu.png", cc.rect(0, 33, 126, 33));
        var newGameDisabled = cc.Sprite.create("images/goalmenu.png", cc.rect(0, 33 * 2, 126, 33));
        var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, this.onNewGame, this);
        var menu = cc.Menu.create(newGame);
        menu.setAnchorPoint(cc.p(0.5, 0.5));// 设置锚点 
        menu.setPosition(this._size.width / 2 , this._size.height /2 - 100);// 设置位置
        menu.alignItemsVerticallyWithPadding(10);
        this.gameLayer.addChild(menu, 1, 2);

        //cc.AudioEngine.playMusic("images/res/bgMusic.mp3",true);
    },

    onNewGame:function (pSender)
    {
        this._size = cc.Director._getInstance().getWinSize(); // 获得屏幕尺寸大小
        var scene = cc.Scene.create(); //创建新场景
        var gsl = new gameScene1();
        //gsl.onEnter(); //
        scene.addChild(gsl,1);
        var bgLayer = cc.Layer.create(); // 创建新层
        var bkPng = cc.Sprite.create("images/background.png"); // 创建新精灵并加载图片
        bgLayer.addChild(bkPng); // 将精灵加在进层
        bkPng.setAnchorPoint(cc.p(0.5, 0.5)); // 设置锚点
        bkPng.setPosition(this._size.width / 2,this._size.height / 2); // 设施位置
        scene.addChild(bgLayer,0); //将层加载进场景
        cc.Director._getInstance().runScene(cc.TransitionFade.create(1.2,scene)); // 场景切换

        //var musicStop = cc.AudioEngine.getInstance();
       // musicStop.stopMusic("../res/bgMusic.mp3");

       // var anotherMusicPlay = cc.AudioEngine.getInstance();
       // anotherMusicPlay.playMusic("../res/fireEffect.mp3",true);
    }
});