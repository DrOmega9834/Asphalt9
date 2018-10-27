const height = device.height;
const width = device.width;
const cars = [1, 2, 3, 4, 5, 6];

//1920*1080分辨率
var profileA = {
    //生涯,开始,继续
    goldenPoint: { x: 1500, y: 1000 },

    //生涯百分比
    careerPercent: { x: 1630, y: 1050 },

    //euro
    euro: { x: 350, y: 300 },

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

    //12
    block12: { x: 765, y: 306 },

    //推荐性能分
    recommendedPoints: { x: 2000, y: 860 },

    //firstCar
    firstCar: { x: 565, y: 630 },

    distance: { x: 513, y: 359 }

}
var profile;
if (height === 1920 && width == 1080) {
    profile = profileA;
} else if (height === 2160 && width === 1080) {
    profile = profileB;
} else {
    toast("该分辨率暂未支持,程序结束");
    exit();
}

mainEntrence();

// 程序主入口
function mainEntrence() {
    sleep(2000);
    toast("3秒后将开始运行程序,请迅速切换至游戏主界面");
    sleep(3000);
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
            device.setBrightness(40);
            threads.shutDownAll();
            exit();
        });
    });
}

function beforeRun() {
    // 点击生涯
    click(profile.goldenPoint.x, profile.goldenPoint.y);
    click(profile.goldenPoint.x, profile.goldenPoint.y);
    click(profile.goldenPoint.x, profile.goldenPoint.y);
    sleep(2000);

    // 点击位置
    click(profile.careerPercent.x, profile.careerPercent.y);
    sleep(500);
    // 选择关卡
    click(profile.euro.x, profile.euro.y);
    sleep(1000);
}

function deviceInfo() {
    auto();
    if (!requestScreenCapture()) {
        toast('请求截图失败，程序结束');
        exit();
    }
    // 调整屏幕亮度
    device.setBrightness(0);
    // 调整媒体声音
    device.setMusicVolume(0);
}

function main() {
    // 选车
    chooseModeAndCar();

    sleep(2000);
    // 开始
    click(profile.goldenPoint.x, profile.goldenPoint.y);
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

    outerLoop:
    while (true) {
        // 截图
        var img = captureScreen();
        // 按钮颜色为黄色
        var button = images.pixel(img,
            checkForResolution(profile.goldenPoint.x, profile.goldenPoint.y, img).positionX,
            checkForResolution(profile.goldenPoint.x, profile.goldenPoint.y, img).positionY);
        if (colors.equals(button, "#ffc3fb12")) {
            while (true) {
                // 截图
                var img = captureScreen();

                // 推荐性能分
                var color = images.pixel(img,
                    checkForResolution(profile.recommendedPoints.x, profile.recommendedPoints.y, img).positionX,
                    checkForResolution(profile.recommendedPoints.x, profile.recommendedPoints.y, img).positionY);
                // 黄色或红色
                if (colors.equals(color, "#ffc3fc0f") || colors.equals(color, "#ffff0054")) {
                    toast("即将开始下一次奔跑");
                    break outerLoop;
                }

                //一直点击返回
                back();
                sleep(500);
            }
        }
        sleep(500);
        click(height * 4 / 5, width / 2);
    }
}

function run() {
    // 在新线程执行的代码
    // 预计时间70秒
    var exitTime = new Date().getTime() + 70000;
    // 定时点击氮气
    var id = setInterval(function () {
        click(height * 4 / 5, width / 2);
        var now = new Date().getTime();
        if (now > exitTime) {
            clearInterval(id);
        }
    }, 1000);
}


/**
 * 选择模式和车
 */
function chooseModeAndCar() {
    toast("选择模式和车");
    sleep(700);
    // 向↓滑动,选关
    for (i = 0; i < 4; i++) {
        swipe(height * 2 / 3, 150, height * 2 / 3, 900, 400);
        sleep(200);
    }
    // toastLog("请在此处截图");
    // exit();
    sleep(800);
    // 选择第12关
    click(profile.block12.x, profile.block12.y);

    // 继续
    click(profile.goldenPoint.x, profile.goldenPoint.y);
    sleep(2000);

    // 选车
    chooseCar();
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
        // toastLog(carPoint.x + ","+ carPoint.y);
        var img = captureScreen();
        var carStatus = images.pixel(img, carPoint.x, carPoint.y);

        if (colors.equals(carStatus, "#ffc3fb12")) {
            click(carPoint.x - profile.distance.x / 2, carPoint.y - profile.distance.y / 2);
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
