"auto";

const profile = require('profile2340.js');
const robot = require('robot.js');
const DEVICE = require('device.js');
var counterMP = 0;

DEVICE.checkPermission();
DEVICE.setEventListener();
//DEVICE.savePower();

/* times of running */
var times = 5*3;
/* car select 1,2,3 */
var up = 2;

var startTime = new Date().getTime();
var timer = new Date().getTime();

function chCheckState() {
    var state = -1;
    
    var img = captureScreen();
    // 蓝币
    var token = images.pixel(img, 1067, 51);
    var isToken = colors.isSimilar(token, "#0090ff", 10, "diff");
    
    // 积分
    var credit = images.pixel(img, 637, 55);
    var isCredit = colors.isSimilar(credit, "#ffc500", 10, "diff");

    // 大白条
    var whitebar = images.pixel(img, 956, 822);  
    var isWhiteBar = colors.isSimilar(whitebar, "#ffffff", 10, "diff"); 
     
    // 结束按钮
    var end = images.pixel(img, 1979, 958);
    var isEnd = colors.isSimilar(end, "#c3fb12", 10, "diff");

    // 开始按钮
    var start = images.pixel(img, 1900, 930);
    var isStart = colors.isSimilar(start, "#ffbe00", 10, "diff");

    // 多人按钮
    var duoren = images.pixel(img, profile.mp.multiplayer.x, profile.mp.multiplayer.y);
    var isDuoren = colors.equals(duoren, "#ffffff");

    // 返回按钮
    var back = images.pixel(img, profile.mp.back.x, profile.mp.back.y);
    var backward = images.pixel(img, profile.mp.backward.x, profile.mp.backward.y);
    var isBack = (colors.equals(back, "#fffffe") || colors.equals(back, "#ffffff")) && (colors.equals(backward, "#010101") || colors.equals(backward, "#000000"));
		
	// 领取5-10-20
    var claim1 = images.pixel(img, profile.mp.mpackage1.x, profile.mp.mpackage1.y);
    var claim2 = images.pixel(img, profile.mp.mpackage2.x, profile.mp.mpackage2.y);
    var isClaim = colors.equals(claim1, "#fa154f") || colors.equals(claim2, "#fa154e");

	// 多人选取
    var homeup = images.pixel(img, profile.mp.homeup.x, profile.mp.homeup.y);
    var isHomeup = colors.equals(homeup, "#ffffff");
    var homedown = images.pixel(img, profile.mp.homedown.x, profile.mp.homedown.y);
    var isHomedown = colors.equals(homedown, "#ffffff");

	// 各种出错
    var errorleft = images.pixel(img, profile.mp.errorleft.x, profile.mp.errorleft.y);
    var errorright = images.pixel(img, profile.mp.errorright.x, profile.mp.errorright.y);
    var iserror = colors.equals(errorleft, "#1c5ab2") && colors.equals(errorright, "#1c5ab2");

     if (0) {
     var ds="";
     if (isCredit)
     ds += "Cre";
     if (isToken)
     ds += "Tok";
     if (isBack)
     ds += "Back";
     if (isNext)
     ds += "next";
     if (isEveryday)
     ds += "everyday";
     else
     ds += colors.toString(everyday_duoren);
     
     toastLog(ds);
     }
     
    // -2 error
    if (iserror)
        state = -2;
    // step
    else if (isToken && isCredit && !isEnd)
        state = 1;
    // end
    else if (!isToken && !isCredit && isEnd)
        state = 2;

    return state;
}

function beforeRun() {

        var chStatus = chCheckState();

        switch(chStatus){
            // error
            case -2: {
                toastLog('error');
                sleep(2000);
                break;
            }
            // step 
            case 1: {
                toastLog('Start...');
                times --;
                robot.click(1900, 930);
                sleep(1000);
                break;
            }
            case 2: {
                toastLog('End...');
                robot.click(1979, 958);
                sleep(1000);
                break;
            }
            default: {
//                toast('default');
                robot.click(profile.mp.width * 4 / 5, profile.mp.height / 2);
            }
                
        }
        sleep(100);
}
    
sleep(7000);
toastLog("RUN.");
while ( times > 0 ) {
    beforeRun();
    sleep(900);
}
toastLog("end.");
