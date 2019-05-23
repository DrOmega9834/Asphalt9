// const profile = require('profile1920.js');
// const robot = require('robot.js');
const DEVICE = require('device.js');
const PLAY = require('play.js').mp;
const robot = require('robot.js');
var counterMP = 0;

toast("7秒后将开始运行程序,请迅速切换至游戏主界面");
sleep(3000);
toast("开局可能会弹广告,请自己手动关掉,直至保证程序正常选关为止");
sleep(4000);

DEVICE.checkPermission();
DEVICE.setEventListener();
DEVICE.savePower();

for (;;counterMP++) {
    PLAY.beforeRun();
    if(PLAY.chooseCar()){
        sleep(12000);
        PLAY.run(counterMP);
    }
    else{
        robot.back();
        counterMP--;
        sleep(300000);
        continue;
    }
}