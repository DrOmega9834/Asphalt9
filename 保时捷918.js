const width = device.width;
const height = device.height;
const cars = [1, 2, 3, 4, 6];

var profileA = {
    compete: {
        x: 1800,
        y: 1000
    },

    //生涯,开始,继续
    goldenPoint: {
        x: 1500,
        y: 1000
    },

    //firstCar
    firstCar: {
        x: 555,
        y: 616
    },

    distance: {
        x: 518,
        y: 363
    }
}

var profile = profileA;


mainEntrence();

//程序主入口
function mainEntrence() {
    toast("请切换至保时捷主界面");
    sleep(2000);
    toast("3秒后将开始运行程序");
    sleep(3000);
    before();
    eventListener();

    while (true) {
        //运行主函数
        main();
    }
}


function before() {
    auto();
    if (!requestScreenCapture()) {
        toast('请求截图失败，程序结束');
        exit();
    }
    //调整屏幕亮度
    device.setBrightness(0);
}

function eventListener() {
    threads.start(function() {
        //启用按键监听
        events.observeKey();
        //监听音量上键按下
        events.onKeyDown("volume_down", function(event) {
            toastLog("程序手动退出");
            device.setBrightness(40);
            threads.shutDownAll();
            exit();
        });
    });
}

function main() {
    //比赛
    click(profile.compete.x, profile.compete.y);
    click(profile.compete.x, profile.compete.y);
    sleep(2000);

    //选车
    chooseModeAndCar();

    sleep(2000);
    //开始
    click(profile.goldenPoint.x, profile.goldenPoint.y);
    sleep(10000);

    //开跑
    threads.start(function() {
        run()
    });

    //跑完之后
    afterRun();
}


function run() {
    //在新线程执行的代码
    //{console.log("定时器启动,定时点击氮气");
    //预计时间90秒
    var exitTime = new Date().getTime() + 85000;
    //定时点击氮气
    var id = setInterval(function() {
        click(height * 4 / 5, width / 2);
        var now = new Date().getTime();
        if (now > exitTime) {
            //{console.log("定时器结束");
            clearInterval(id);
        }
    }, 2000);
}



function afterRun() {
    sleep(83000);
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

                    //倒计时
                    var color1 = images.pixel(img, 331, 292);
                    var color2 = images.pixel(img, 1616, 160);
                    //粉红
                    if (colors.equals(color1, "#ffff0054") && colors.equals(color2, "#ffff0054")) {
                        sleep(3000);
                        //截图
                        var img = captureScreen();

                        //确定(代币)
                        var continue_button = images.pixel(img, 1632, 1000);

                        if (colors.equals(continue_button, "#ffffffff")) {
                            toast("代币");
                            back();
                            sleep(2000);
                        }

                        toast("即将开始下一次奔跑");
                        break outerLoop;
                    }

                    //一直点击返回
                    click(profile.goldenPoint.x, profile.goldenPoint.y);
                    //back();
                    //sleep(2000);
                }
            }
            sleep(1000);
            click(height * 4 / 5, width / 2);
        }
}



/**
 * 选择模式和车
 */
function chooseModeAndCar() {
    toast("选车");
    sleep(700);

    //默认w70
    chooseCar();
}


/**
 * 选车
 */
function chooseCar() {
    var flag = true;
    swipe(300, 500, 900, 500, 500);
    sleep(2000);
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
            flag = false;
            click(carPoint.x - profile.distance.x / 2, carPoint.y - profile.distance.y / 2);
            break;
        }
    }
    if (flag) {
        toastLog("都没油了");
        sleep(60000);
        chooseCar();
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