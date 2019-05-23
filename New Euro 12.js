// const profile = require('profile1920.js');
// const robot = require('robot.js');
const DEVICE = require('device.js');
const PLAY = require('play.js').carrer;

toast("5秒后将开始运行程序,请迅速切换至游戏主界面");
sleep(2000);
toast("开局可能会弹广告,请自己手动关掉,直至保证程序正常选关为止");
sleep(3000);
DEVICE.checkPermission();
DEVICE.setEventListener();
DEVICE.savePower();
var counterCarrer = 0;
PLAY.beforeRun();
while(true) {
    // 选择关卡
    PLAY.chooseMode();
    sleep(2000);

    // 选车
    PLAY.chooseCar();
    sleep(6000);

    // 跑完之后
    counterCarrer = PLAY.run(counterCarrer);
};
/*
// 游戏闪退监听
var isA9 = true;
setInterval(function() {
    if(currentPackage() != "com.gameloft.android.ANMP.GloftA9HM") {
        isA9 = false;
        clearTimeout(game);
        toastLog("游戏闪退");
        launch("com.gameloft.android.ANMP.GloftA9HM");
        waitingForActivty("com.gameloft.android.ANMP.GloftA9HM.MainActivity", 500);
        isA9 = true;
    }
}, 500)

// 主线程循环
var counterCarrer = 0;
while(isA9) {
    var game = setTimeout(function(){
        // 选择关卡
        PLAY.chooseMode(counterCarrer);
        sleep(2000);
    
        // 选车
        PLAY.chooseCar();
        sleep(6000);
    
        // 跑完之后
        counterCarrer = PLAY.run(counterCarrer);
    }, 1000);
    sleep(100000);
}*/