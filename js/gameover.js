/**

 */

var gameScene3 = cc.Scene.extend({

    // init:function()
    // {
    //     if(this._super())
    //     {

    //         return true;
    //     }
    //     return false;
    // },

    onEnter:function()
    {
        this._super();
        var winsize = cc.director.getWinSize();

        var gameoverpic = cc.Sprite.create(res.gameoverpic);
        gameoverpic.setPosition(winsize.width / 2, winsize.height / 2+100);
        gameoverpic.setScale(1);
        this.addChild(gameoverpic, 0);

        var labelsocre = cc.LabelTTF.create("Your score is ", "Arial", 40);
        labelsocre.setPosition(winsize.width / 2-50, winsize.height / 2-100);
        this.addChild(labelsocre, 1);

        var result = cc.LabelTTF.create("result ", "Arial", 40);
        result.setPosition(winsize.width / 2+100, winsize.height / 2-100);
        this.addChild(result, 2);
        var string = parseInt(score, 10).toString();
        result.setString(string);
        score = 0;

        //var newGameNormal = cc.Sprite.create("images/new.png", cc.rect(0, 0, 126, 33));
        /*this._size = cc.Director._getInstance().getWinSize(); // 获得游戏屏幕尺寸 

        var gameoverpic = cc.Sprite.create(res.gameoverpic); // 创建精灵加载图片“s_HelloWorld” 
        this.addChild(gameoverpic, 0); //在gameLayer层上加载这个精灵 
        gameoverpic.setAnchorPoint(cc.p(0.5, 0.5));// 设置锚点 
        gameoverpic.setPosition(this._size.width / 2, this._size.height /2);// 设置位置

        var labelsocre = cc.LabelTTF.create("Your score is ", "Arial", 40);
        labelsocre.setPosition(winsize.width / 2-50, winsize.height / 2-100);
        this.addChild(labelsocre, 2);

        var result = cc.LabelTTF.create("result ", "Arial", 40);
        result.setPosition(winsize.width / 2+100, winsize.height / 2-100);
        this.addChild(result, 3);
        var string = parseInt(score, 10).toString();
        result.setString(string);*/

        var newGameNormal = cc.Sprite.create("images/resetmenu.png", cc.rect(0, 0, 126, 33));
        var newGameSelected = cc.Sprite.create("images/resetmenu.png", cc.rect(0, 33, 126, 33));
        var newGameDisabled = cc.Sprite.create("images/resetmenu.png", cc.rect(0, 33 * 2, 126, 33));
        var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, this.onResetGame, this);
        var menu = cc.Menu.create(newGame);
        menu.setAnchorPoint(cc.p(0.5, 0.5));// 设置锚点 
        menu.setPosition(winsize.width / 2 , winsize.height /2 );// 设置位置
        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu, 2);

        //cc.AudioEngine.playMusic("images/res/bgMusic.mp3",true);
    },

    onResetGame:function (pSender)
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
    },


    onExit:function()
    {


        this._super();
    }

});
