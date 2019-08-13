"auto";

const profile = require('profile1920.js');
const robot = require('robot.js');
const DEVICE = require('device.js');
var counterMP = 0;

DEVICE.checkPermission();
DEVICE.setEventListener();
//DEVICE.savePower();

/* times of running */
var times = 8;
/* car select 1,2,3 */
var up = 2;

var startTime = new Date().getTime();
var timer = new Date().getTime();

function chCheckState() {
    var state = -1;
    
    var img = captureScreen();

    var cart = images.pixel(img, 1812, 73);
    var isCart = colors.equals(cart, "#32EDF4");

    var start = images.pixel(img, 1437, 901);
    var isStart = colors.equals(start, "#32EDF4");

    var home = images.pixel(img, 1868, 34);
    var isHome = colors.equals(home, "#00E9F4");
      
    var white = images.pixel(img, 1000, 920);
    var isWhite = colors.equals(white, "#ffffff");
    
    var lwhite = images.pixel(img, 450, 950);
    var isLwhite = colors.equals(lwhite, "#ffffff");
    
    var token = images.pixel(img, profile.mp.token.x, profile.mp.token.y);
    var isToken = colors.equals(token, "#0090ff") || colors.equals(token, "#0492fa") || colors.equals(token, "#0392fb") || colors.equals(token, "#0291fd");
    
    var credit = images.pixel(img, profile.mp.credit.x, profile.mp.credit.y);
    var isCredit = colors.equals(credit, "#ffc600");
    
    var everyday_duoren = images.pixel(img, 1817, 161);
    var everyday_teshu = images.pixel(img, 1817, 184);
    var isEveryday = colors.equals(everyday_duoren, "#c3fb12") || colors.equals(everyday_teshu, "#c3fb12") ;

    var CarHuntX = 1320;
    var CarHuntY = 1015;
    var CarHunt = images.pixel(img, CarHuntX, CarHuntY);
    var isCarHunt = colors.equals(CarHunt, "#c3fb12");

    var next = images.pixel(img, profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
    var isNext = colors.equals(next, "#c3fb12");

    var meiri = images.pixel(img, profile.mp.meiri.x, profile.mp.meiri.y);
    var isMeiri = colors.equals(meiri, "#ffffff");

    var teshu = images.pixel(img, profile.mp.teshu.x, profile.mp.teshu.y);
    var isTeshu = colors.equals(teshu, "#ffffff");
    
    var back = images.pixel(img, profile.mp.back.x, profile.mp.back.y);
    var backward = images.pixel(img, 51, 46);
    var isBack = (colors.equals(back, "#fffffe") || colors.equals(back, "#ffffff")) && colors.equals(backward, "#010101");
    
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
    // 1 ��ʼ�ر�����
    else if (isCart && isHome && isWhite && !isLwhite && !isStart)
        state = 1;
    // 2 ����
    else if (isCart && isHome && !isWhite && isLwhite && isStart)
        state = 2;
    // 3 ÿ�տ�ʼ
    else if (isToken && isCredit && isBack && isEveryday && !isNext)
        state = 3;
    else if (isToken && isCredit && !isCart)
        state = 4;
    // 5 result
    else if (!isCart && !isHome && !isWhite && isNext)
        state = 5;

    return state;
}

function beforeRun() {
    var Flag = false;

    while (!Flag){
        var chStatus = chCheckState();
/*        
        if (chStatus != -1) {
            timer = new Date().getTime();
        }
        else {
            var now = new Date().getTime();
            if ((now - timer) > 300000) {
                toastLog("blocked!restart!");
                timer = new Date().getTime();
                restart();
            }
        }
*/        
        switch(chStatus){
            // error
            case -2: {
                toastLog('error');
                sleep(2000);
                break;
            }
            // ��Ϸ�����
            case 1: {
                robot.click(1675, 930);
                sleep(1000);
                break;
            }
            case 2: {
                robot.click(1675, 930);
                sleep(1000);
                Flag = true;
                break;
            }
            case 4: {
                robot.click(400, 1000);
                sleep(1000);
                break;
            }
            // �������
            case 5: {
                toast('result');
                robot.back();
                sleep(3950);
                break;
            }
            // ������ʱֹͣ����
            default: {
                toast('default');
                robot.back();
                sleep(5950);
            }
                
        }
        sleep(100);
    }
}
    
function chooseCar(up) {
    var img = captureScreen();

    robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
    sleep(2000);
    if (up == 1)
        robot.click(360, 450);
    else if (up == 2)
        robot.click(360, 850);
    else 
        robot.click(850, 850);
        
    sleep(2000);
    robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
    return true;
}
    
function run(counter_mp) {
    var left = 0;
    
    // ����Ƿ��Ѿ�����������
    while (true) {
        if (chCheckState() != -1) {
            break;
        }
        // ��δ�����Կɵ����
        else {
            robot.click(profile.mp.width * 4 / 5, profile.mp.height / 2);
            if (left == 5){
                left = 0;
                robot.click(profile.mp.width * 3 / 10, profile.mp.height / 2);
                sleep(400);
                robot.click(profile.mp.width * 3 / 10, profile.mp.height / 2);
            }
            sleep(950);
            // toastLog("isNext ?= " + checkState());
        }
    }
    toastLog(++counter_mp + "completed.");
}
sleep(7000);
toastLog("start.");
for ( let i = 0; i < times; i++ ) {
    beforeRun();
    chooseCar(up);
    sleep(10000);
    run(i);
}
toastLog("end.");
