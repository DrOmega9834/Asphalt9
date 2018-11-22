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
 * @param {boolean} enable 
 */
const enablePowerSave = enable => enable ? _savePower() : _revertPower();
/********** 设备 end **********/



var rootAutomator;
var robot = new Robot();

//1920*1080分辨率
var profileA = {
    //生涯,开始,继续
    goldenPoint: { x: 1500, y: 1000 },

    //生涯百分比
    careerPercent: { x: 1630, y: 1050 },

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

    distance: { x: 519, y: 365 }

}

//2160*1080分辨率
var profileB = {
    //生涯,开始,继续
    goldenPoint: { x: 1700, y: 1000 },

    //生涯百分比
    careerPercent: { x: 1776, y: 1023 },

    //euro
    euro: { x: 1700, y: 280 },

    swipeScreen: function () {
        for (i = 0; i < 4; i++) {
            robot.swipe(height * 2 / 3, 150, height * 2 / 3, 900, 400);
            sleep(200);
        }
    },

    //12
    block12: { x: 765, y: 306 },

    //推荐性能分
    recommendedPoints: { x: 2000, y: 860 },

    //firstCar
    firstCar: { x: 565, y: 630 },

    distance: { x: 513, y: 359 }

}

//2220*1080分辨率
var profileC = {
    //生涯,开始,继续
    goldenPoint: { x: 1700, y: 980 },

    //生涯百分比
    careerPercent: { x: 1839, y: 1020 },

    //euro
    euro: { x: 1488, y: 276 },

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

    distance: { x: 513, y: 359 }

}

// //1280*720分辨率
// //720p分辨率可以通过1008p缩放计算出来
// var profileD = {
//     //生涯,开始,继续
//     goldenPoint: { x: 980, y: 650 },

//     //生涯百分比
//     careerPercent: { x: 1079.3, y: 693 },

//     //euro
//     euro: { x: 420, y: 184 },

//     swipeScreen: function () {
//         for (i = 0; i < 2; i++) {
//             robot.swipe(height * 2 / 3, 150, height * 2 / 3, 900, 400);
//             sleep(200);
//         }
//     },

//     //12
//     block12: { x: 450, y: 100 },

//     //推荐性能分
//     recommendedPoints: { x: 1200, y: 588 },

//     //firstCar
//     firstCar: { x: 370, y: 410.6 },

//     distance: { x: 346, y: 243.3 }

// }

var profile;
if (height === 1920 && width == 1080) {
    profile = profileA;
} else if (height === 2160 && width === 1080) {
    profile = profileB;
} else if (height === 2220 && width === 1080) {
    profile = profileC;
}
// else if (height === 1280 && width === 720) {
//     profile = profileD;
// } 
else {
    toast("该分辨率暂未支持,程序结束");
    exit();
}

mainEntrence();

// 程序主入口
function mainEntrence() {
    sleep(2000);
    toast("3秒后将开始运行程序,请迅速切换至游戏主界面");
    sleep(3000);
    toast("开局可能会弹广告,请自己手动关掉,直至保证程序正常选关为止");
    deviceInfo();
    eventListener();

    // 选关卡
    beforeRun();
    while (true) {
        // 运行主函数
        main();
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
    // 点击生涯
    robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
    robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
    robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
    sleep(2000);

    // 点击位置
    robot.click(profile.careerPercent.x, profile.careerPercent.y);
    sleep(500);
    // 选择关卡
    robot.click(profile.euro.x, profile.euro.y);
    sleep(1000);
}

function deviceInfo() {
    auto();
    if (!requestScreenCapture()) {
        toast('请求截图失败，程序结束');
        exit();
    }
    enablePowerSave(true);
}

function main() {
    // 选择模式
    chooseMode();

    // 选车
    chooseCar();

    sleep(2000);
    // 开始
    robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
    sleep(6000);

    // 开跑
    threads.start(function () {
        run()
    });

    // 跑完之后
    afterRun();
}

function afterRun() {
    sleep(69000);
    toast("跑完了");

    var temp = 1;

    //点击三次确认
    while (temp <= 3) {
        // 截图
        var img = captureScreen();
        // 按钮颜色为黄色
        var button = images.pixel(img,
            checkForResolution(profile.goldenPoint.x, profile.goldenPoint.y, img).positionX,
            checkForResolution(profile.goldenPoint.x, profile.goldenPoint.y, img).positionY);
        // 推荐性能分
        var color = images.pixel(img,
            checkForResolution(profile.recommendedPoints.x, profile.recommendedPoints.y, img).positionX,
            checkForResolution(profile.recommendedPoints.x, profile.recommendedPoints.y, img).positionY);

        var hasFinish = colors.equals(color, "#ffc3fc0f") || colors.equals(color, "#ffff0054");
        if (colors.equals(button, "#ffc3fb12") && !hasFinish) {
            robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
            sleep(500);
            temp++;
        }
        //若未跑完仍可点击氮气
        robot.click(height * 4 / 5, width / 2);
    }

    //可能升级或有广告.
    while (true) {
        //若退出选关,可将此值调大
        sleep(1500);
        // 截图
        var img = captureScreen();
        // 推荐性能分
        var color = images.pixel(img,
            checkForResolution(profile.recommendedPoints.x, profile.recommendedPoints.y, img).positionX,
            checkForResolution(profile.recommendedPoints.x, profile.recommendedPoints.y, img).positionY);
        var hasFinish = colors.equals(color, "#ffc3fc0f") || colors.equals(color, "#ffff0054");
        if (hasFinish) {
            break;
        } else {
            robot.back();
            sleep(3000);
        }

        // 截图
        var img = captureScreen();
        var leftup = images.pixel(img, checkForResolution(height / 8, width / 4, img).positionX, checkForResolution(height / 4, width / 4, img).positionY);
        var rightup = images.pixel(img, checkForResolution(height * 7 / 8, width / 4, img).positionX, checkForResolution(height * 7 / 8, width / 4, img).positionY);
        var leftdown = images.pixel(img, checkForResolution(height / 8, width * 3 / 4, img).positionX, checkForResolution(height / 8, width * 3 / 4, img).positionY);
        var rightdown = images.pixel(img, checkForResolution(height * 7 / 8, width * 3 / 4, img).positionX, checkForResolution(height * 7 / 8, width * 3 / 4, img).positionY);

        var AD1 = color_equal(leftup, "#ff080906");
        var AD2 = color_equal(rightup, "#ff080906");
        var AD3 = color_equal(leftdown, "#ff080906");
        var AD4 = color_equal(rightdown, "#ff080906");

        if (AD1 && AD2 && AD3 && AD4) {
            robot.back();
            sleep(3000);
        }
    }
}

function color_equal(color1, color2) {
    if (colors.equals(color1, color2))
        return 1;
    else
        return 0;
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
 * 选择模式
 */
function chooseMode() {
    toast("选择模式");
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
    sleep(2000);
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

function checkForResolution(x, y, img) {
    var width = img.getWidth();
    var height = img.getHeight();
    if (width < height) {
        var e = x;
        x = y;
        y = e;
    }

    return {
        positionX: x,
        positionY: y
    };
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
