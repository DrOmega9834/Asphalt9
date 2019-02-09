// 白色 #ffffffff
// 红色 #fffb1264
// 继续 绿色 #ffc3fb12
// 推荐性能分 绿色 #ffc3fc0f
// 广告黑 #ff080906
// 代币蓝 #ff0009ff
// 积分黄 #ffffc600

//选择可用的车,第一列第一张编号为1,第一列第二张为2,第二列第一张为3,依次递增.可根据自己需求修改
//填写车的编号,1920*1080上最多6张车循环,按填写先后顺序用车
const cars = [1, 2, 3, 4, 5, 6];


/********** 设备 start **********/
const { width, height } = device;

const POWER_SAVE_BRIGHTNESS = 0;
const POWER_SAVE_MUSIC_VOLUME = 0;
const AUTO_BRIGHTNESS_MODE = 1;

const isAutoBrightnessMode = device.getBrightnessMode();
const previousBrightness = device.getBrightness();
const previousMusicVolume = device.getMusicVolume();

/**
 * 调节亮度及音量，进入低功耗模式
 */
const _savePower = () => {
    device.setBrightness(POWER_SAVE_BRIGHTNESS);
    device.setMusicVolume(POWER_SAVE_MUSIC_VOLUME);
}

/**
 * 还原运行时脚本之前的屏幕亮度及设备音量
 */
const _revertPower = () => {
    isAutoBrightnessMode ? device.setBrightnessMode(AUTO_BRIGHTNESS_MODE) : device.setBrightness(previousBrightness);
    device.setMusicVolume(previousMusicVolume);
}

/**
 * 是否调节亮度及音量，以此减少功耗
 */
const enablePowerSave = enable => enable ? _savePower() : _revertPower();
/********** 设备 end **********/



var rootAutomator;
var robot = new Robot();

//1920*1080分辨率
var profile1920 = {

    // 最上方代币图标
    token: { x: 921 , y: 42 },

    // 最上方积分图标
    credit: { x: 1206 , y: 42 },

    //生涯,开始,继续
    goldenPoint: { x: 1500, y: 1000 },

    //生涯百分比
    careerPercent: { x: 1560, y: 1050 },

    //euro
    euro: { x: 350, y: 300 },

    swipeScreen: function () {
        for (i = 0; i < 4; i++) {
            robot.swipe(height * 2 / 3, 150, height * 2 / 3, 900, 400);
            sleep(200);
        }
    },

    //12
    block12: { x: 680, y: 800 },

    //推荐性能分
    recommendedPoints: { x: 1800, y: 900 },

    //firstCar
    firstCar: { x: 555, y: 616 },

    distance: { x: 519, y: 365 },

    // 升级按钮
    upgrade: { x: 960, y: 900 }

}

//2160*1080分辨率
var profile2160 = {

    // 最上方代币图标
    token: { x: 1035 , y: 48 },

    // 最上方积分图标
    credit: { x: 1350 , y: 48 },

    // 生涯,开始,继续
    goldenPoint: { x: 1700, y: 1000 },

    // 生涯百分比
    careerPercent: { x: 1728, y: 1023 },

    // euro
    euro: { x: 1080, y: 280 },

    swipeScreen: function () {
        for (i = 0; i < 4; i++) {
            robot.swipe(height * 2 / 3, 150, height * 2 / 3, 900, 400);
            sleep(200);
        }
    },

    // 第12关
    block12: { x: 765, y: 306 },

    // 推荐性能分
    recommendedPoints: { x: 2000, y: 860 },

    // 第一辆车
    firstCar: { x: 565, y: 630 },

    // 车辆间距
    distance: { x: 513, y: 359 },

    // 升级按钮
    upgrade: { x: 1080, y: 930 }

}

// 2220*1080分辨率
var profile2220 = {
    
    // 最上方代币图标
    token: { x: 1068 , y: 50 },

    // 最上方积分图标
    credit: { x: 1386 , y: 50 },

    //生涯,开始,继续
    goldenPoint: { x: 1700, y: 980 },

    //生涯百分比
    careerPercent: { x: 1803, y: 1020 },

    //euro
    euro: { x: 600, y: 270 },

    swipeScreen: function () {
        for (i = 0; i < 4; i++) {
            robot.swipe(height * 2 / 3, 150, height * 2 / 3, 900, 400);
            sleep(200);
        }
    },

    //12
    block12: { x: 792, y: 180 },

    //推荐性能分
    recommendedPoints: { x: 2070, y: 864 },

    //firstCar
    firstCar: { x: 565, y: 630 },

    distance: { x: 513, y: 359 },
    
    upgrade: {x: 1110, y:870 }
}

// 2244*1080分辨率
// var profile2244 = {

//     // 最上方代币图标
//     token: { x: 1060 , y: 66 },

//     // 最上方积分图标
//     credit: { x: 1366 , y: 66 },

//     // 生涯,开始,继续
//     goldenPoint: { x: 1665, y: 1000 },

//     // 生涯百分比
//     careerPercent: { x: 1990, y: 1024 },

//     // euro
//     euro: { x: 1848, y: 300 },

//     swipeScreen: function () {
//         for (i = 0; i < 4; i++) {
//             robot.swipe(height * 2 / 3, 150, height * 2 / 3, 900, 400);
//             sleep(200);
//         }
//     },

//     // 第12关
//     block12: { x: 775, y: 261 },

//     // 推荐性能分
//     recommendedPoints: { x: 2030, y: 852 },

//     // 第一辆车
//     firstCar: { x: 633, y: 625 },

//     // 车辆间距
//     distance: { x: 495, y: 360 },

//    // 升级按钮
//    upgrade: { x: 1080, y: 930 }
// }

// 2280*1080分辨率
var profile2280 = {

    // 最上方代币图标
    token: { x: 1098 , y: 51 },

    // 最上方积分图标
    credit: { x: 1422 , y: 48 },

    // 生涯,开始,继续
    goldenPoint: { x: 1750, y: 1000 },

    // 生涯百分比
    careerPercent: { x: 1875, y: 1023 },

    // euro
    euro: { x: 1848, y: 300 },

    swipeScreen: function () {
        for (i = 0; i < 4; i++) {
            robot.swipe(height * 2 / 3, 150, height * 2 / 3, 1000, 400);
            sleep(200);
        }
    },

    // 第12关
    block12: { x: 805, y: 677 },

    // 推荐性能分
    recommendedPoints: { x: 2100, y: 852 },

    // 第一辆车
    firstCar: { x: 570, y: 630 },

    // 车辆间距
    distance: { x: 512, y: 358 },

    // 升级按钮
    upgrade: { x: 1140, y: 870 }

}

// 2340*1080分辨率
var profile2340 = {

    // 最上方代币图标
    token: { x: 1106 , y: 72 },

    // 最上方积分图标
    credit: { x: 1443 , y: 72 },

    // 生涯,开始,继续
    goldenPoint: { x: 1800, y: 1000 },

    // 生涯百分比
    careerPercent: { x: 1850, y: 1010 },

    // euro
    euro: { x: 1800, y: 282 },

    swipeScreen: function () {
        for (i = 0; i < 4; i++) {
            robot.swipe(height * 2 / 3, 150, height * 2 / 3, 1000, 400);
            sleep(200);
        }
    },

    // 第12关
    block12: { x: 831, y: 555 },

    // 推荐性能分
    recommendedPoints: { x: 2200, y: 838 },

    // 第一辆车
    firstCar: { x: 573, y: 643 },

    // 车辆间距
    distance: { x: 510, y: 358 },

   // 升级按钮
   upgrade: { x: 1140, y: 870 }
}

var profile;
if (height === 1920 && width == 1080) {
    profile = profile1920;
} 
else if (height === 2160 && width === 1080) {
    profile = profile2160;
} 
else if (height === 2220 && width === 1080) {
    profile = profile2220;
}
// else if ((height === 2244 || height === 2246) && width === 1080) {
//     profile = profile2244;
// }
// else if (height === 1280 && width === 720) {
//     profile = profile_1280;
// } 
else if (height == 2280 && width == 1080){
    profile = profile2280;
}
else if (height === 2340 && width === 1080) {
    profile = profile2340;
}
else {
    toast("该分辨率暂未支持,程序结束");
    exit();
}

main();

function main() {
    sleep(2000);
    toast("3秒后将开始运行程序,请迅速切换至游戏主界面");
    sleep(3000);
    toast("开局可能会弹广告,请自己手动关掉,直至保证程序正常选关为止");
    deviceInfo();
    eventListener();
    // 选关卡
    beforeRun();
    
    for (var counter_loop = 0;;counter_loop++) {
        // 运行主函数
        loop(counter_loop);
    }
}

function eventListener() {
    threads.start(function () {
        // 启用按键监听
        events.observeKey();
        // 监听音量上键按下
        events.onKeyDown("volume_down", function (event) {
            toastLog("程序手动退出");
            if (rootAutomator != null) {
                rootAutomator.exit();
            }
            enablePowerSave(false);
            threads.shutDownAll();
            exit();
        });
    });
}

function beforeRun() {
    // 判断是否从主页开始
    while (true){
        if (check_state() == 1){
            // toastLog("即将开始比赛");
            break;
        }
        // else toastLog("isHome ?= " + check_state());
    }

    // 点击生涯
    robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
    sleep(1000);
    robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
    sleep(1000);
    robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
    sleep(2000);

    // 点击位置
    robot.click(profile.careerPercent.x, profile.careerPercent.y);
    sleep(2000);
    // 选择关卡
    robot.click(profile.euro.x, profile.euro.y);
    sleep(1000);
}

function deviceInfo() {
    auto();
    if (!requestScreenCapture()) {
        toastLog('请求截图失败，程序结束');
        exit();
    }
    enablePowerSave(true);
}

function loop(counter_loop) {

    // 选择关卡
    chooseMode(counter_loop);
    sleep(2000);

    // 选车
    chooseCar();
    sleep(2000);

    sleep(2000);
    // 开始
    robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
    sleep(6000);

    // 开跑
    threads.start(function () {
        run()
    });

    // 跑完之后
    afterRun(counter_loop);
}

function afterRun(counter_loop) {
    sleep(69000);
    toastLog(++counter_loop + "场比赛已完成");

    // 检查是否已经到达结算界面
    while (true) {
        if (check_state() == 5) {
            break;
        }
        // 若未跑完仍可点击氮气
        else {
            robot.click(height * 4 / 5, width / 2);
            sleep(500);
            // toastLog("isNext ?= " + check_state());
        }
    }
    
    var counter_euro = 0;
    while (counter_euro < 15) {
        // 检查是否返回euro界面
        switch(check_state()) {
            // 是Euro界面
            case 3:{
                counter_euro++;
                break;
            }
            // 否则模拟按下一次返回键
            default:
                robot.back();
                sleep(3800);
        }
        sleep(200);
    }
    toastLog("即将开始下一场比赛");
}

function run() {
    // 在新线程执行的代码
    // 预计时间70秒
    var exitTime = new Date().getTime() + 70000;
    // 定时点击氮气
    var id = setInterval(function () {
        robot.click(height * 4 / 5, width / 2);
        var now = new Date().getTime();
        if (now > exitTime) {
            clearInterval(id);
        }
    }, 1000);
}

/**
 * 选择关卡
 */
function chooseMode(counter_loop) {
    if (!counter_loop){
        while (true){
            if (check_state() == 3){
                toast("选择关卡");
                break;
            }
            else {
                // toastLog("isEuro ?= " + check_state());
                sleep(200);
            }
        }
    }
    
    sleep(700);
    // 向↓滑动,选关
    // for (i = 0; i < 4; i++) {
    //     robot.swipe(height * 2 / 3, 150, height * 2 / 3, 900, 400);
    //     sleep(200);
    // }
    profile.swipeScreen();

    // toastLog("请在此处截图,截图时不要滑动屏幕");
    // exit();
    sleep(800);
    // 选择第12关
    robot.click(profile.block12.x, profile.block12.y);

    // 继续
    robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
}
/**
 * 选车
 */
function chooseCar() {
    for (let i = 0; i < cars.length; i++) {
        let n = cars[i];
        // toastLog(n);
        var carPoint = {
            x: profile.firstCar.x + profile.distance.x * parseInt((n - 1) / 2),
            y: profile.firstCar.y + profile.distance.y * ((n - 1) % 2)
        }
        // toastLog(carPoint.x + "," + carPoint.y);
        var img = captureScreen();
        var carStatus = images.pixel(img, carPoint.x, carPoint.y);
        // toastLog(colors.toString(carStatus));

        if (colors.equals(carStatus, "#ffc3fb12")) {
            robot.click(carPoint.x - profile.distance.x / 2, carPoint.y - profile.distance.y / 2);
            break;
        }
    }
}

/**
 * 安卓5机器人
 * @constructor
 */
function LollipopRobot() {
    rootAutomator = new RootAutomator();
    this.click = function (x, y) {
        // return rootAutomator.tap(x, y);
        return Tap(x, y);
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        // return rootAutomator.swipe(x1, y1, x2, y2, duration);
        return Swipe(x1, y1, x2, y2, duration);
    };

    this.back = function () {
        return Back();
    }
}

/**
 * 安卓7机器人
 * @constructortap
 */
function NougatRobot() {
    this.click = function (x, y) {
        return click(x, y);
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        return swipe(x1, y1, x2, y2, duration);
    };

    this.back = function () {
        return back();
    }
}

/**
 * 机器人工厂
 */
function Robot() {
    if (device.sdkInt < 24) {
        const hasRoot = files.exists("/sbin/su") || files.exists("/system/xbin/su") || files.exists("/system/bin/su");
        if (!hasRoot) {
            toast("安卓版本在安卓7以下需要root,程序结束");
            exit();
        }
        this.robot = new LollipopRobot();
    } else {
        this.robot = new NougatRobot();
    }
    this.click = function (x, y) {
        return this.robot.click(x, y);
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        return this.robot.swipe(x1, y1, x2, y2, duration);
    };

    this.back = function () {
        return this.robot.back();
    };
}

function check_state() {
    var img = captureScreen();
    
    // 若干点的颜色值
    var token = images.pixel(img, profile.token.x, profile.token.y);
    var credit = images.pixel(img, profile.credit.x, profile.credit.y);
    var goldenPoint = images.pixel(img, profile.goldenPoint.x, profile.goldenPoint.y);
    var recommendedPoints = images.pixel(img, profile.recommendedPoints.x, profile.recommendedPoints.y);
    var upgrade = images.pixel(img, profile.upgrade.x, profile.upgrade.y);

    // 1 主页
    if (!colors.equals(goldenPoint, "#c3fb12") && colors.equals(token, "#0090ff") && colors.equals(credit, "#ffc600"))
        return 1;
    // 3 EURO
    if (/*colors.equals(goldenPoint, "#c3fb12") && colors.equals(token, "#0090ff") && colors.equals(credit, "#ffc600") &&*/ (colors.equals(recommendedPoints, "#c3fc0f") || colors.equals(credit, "#ff0054")))
        return 3;
    // 5 结算
    if (colors.equals(goldenPoint, "#c3fb12") && !(colors.equals(recommendedPoints, "#c3fc0f") || colors.equals(recommendedPoints, "#ff0054")))
        return 5;
    // 7 升级
    if (colors.equals(upgrade, "#ffffff"))
        return 7;
    /*
    toastLog("goldenPoint is " + colors.toString(goldenPoint));
    toastLog("token is " + colors.toString(token));
    toastLog("credit is " + colors.toString(credit));
    toastLog("recommendedPoints is " + colors.toString(recommendedPoints));
    */
    return -1;
}
