// const profile = require('profile1920.js');
// const robot = require('robot.js');
const DEVICE = require('device.js');
const PLAY = require('play.js').mp;
const PLAY2 = require('play.js').mp2;
const carHunt = require('play.js').ch;
const robot = require('robot.js');
var counterMP = 0;

toast("7秒后将开始运行程序,请迅速切换至游戏主界面");
sleep(3000);
toast("开局可能会弹广告,请自己手动关掉,直至保证程序正常选关为止");
sleep(4000);

DEVICE.checkPermission();
DEVICE.setEventListener();
DEVICE.savePower();

var startTime = new Date().getTime();
var nowTime = new Date().getTime();
var mp2Time = new Date().getTime();

// 因寻车不太稳定 下方多人一般是掉分赛季 故暂时屏蔽 
// 愿意尝试的可以解除注释

// mp2任务间隔
var mp2interval = 15;
// 寻车任务间隔
var interval = 100;
// 寻车按钮位置，0=特别赛事寻车
var position = 3;
// 选取上次用车上面/下面
var up = 1;

if (0) {
    // start carHunt
    for ( let i = 0; i < 5; i++ ) {
        carHunt.beforeRun(position);
        carHunt.chooseCar(up);
        sleep(10000);
        carHunt.run(i);
    }
}

if (0) {
    // start mp2
    for ( let i = 0; i < 5; i++ ) {
        PLAY2.beforeRun();
        PLAY2.chooseCar();
        sleep(10000);
        PLAY2.run(i);
    }
    PLAY2.goingHome();
}

for (;;counterMP++) {
    /* 因寻车不太稳定 下方多人一般是掉分赛季 故暂时屏蔽
    // 下方多人 mp2
    if (0){
        nowTime = new Date().getTime();
        toastLog("倒计时："+(mp2interval*60000 - (nowTime-mp2Time))/60000);
        if ((nowTime - mp2Time) > (mp2interval*60000)) {
            PLAY2.goingHome();
            // start mp2
            for ( let i = 0; i < 5; i++ ) {
                PLAY2.beforeRun();
                PLAY2.chooseCar();
                sleep(10000);
                PLAY2.run(i);
            }
            PLAY2.goingHome();
            mp2Time = new Date().getTime();
        }
    }//endof mp2
   
    // 限时赛事或特殊赛事
    if(0){        
        nowTime = new Date().getTime();
        toastLog("倒计时："+(interval*60000 - (nowTime-startTime))/60000);
        if ((nowTime - startTime) > (interval*60000)) {
            // toastLog(nowTime+"-"+startTime+"="+(nowTime-startTime));
            // start carHunt
            for ( let i = 0; i < 5; i++ ) {
                carHunt.beforeRun(position);
                carHunt.chooseCar(up);
                sleep(10000);
                carHunt.run(i);
            }
            PLAY2.goingHome();
            startTime = new Date().getTime();
        }
    }//endof 定时任务*/
    
    // 多人
    if (1){
        PLAY.beforeRun();
        if(PLAY.chooseCar()){
            sleep(12000);
            PLAY.run(counterMP);
        }
        else{
            robot.back();
            counterMP--;
            sleep(500);
            continue;
        }
    }
    else {
       sleep(60000);
    } // endof 多人
       
}