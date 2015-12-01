/**
 * Created by xuchi on 15/11/30.
 */
cc.game.onStart = function () {
    var mode = cc.sys.isMobile && window.navigator.userAgent.indexOf("MicroMessenger") != -1 ? cc.ResolutionPolicy.EXACT_FIT : cc.sys.isMobile ? cc.ResolutionPolicy.EXACT_FIT : cc.ResolutionPolicy.SHOW_ALL;
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(480,800,mode);
    cc.view.resizeWithBrowserSize(true);

    cc.LoaderScene.preload(res.fengmian, function(){
        cc.director.runScene(new gamebegin());
    },this);
};
cc.game.run("gameCanvas");