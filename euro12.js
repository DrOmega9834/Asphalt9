mainEntrence();

//程序主入口
function mainEntrence() {
    sleep(2000);
    toast("3秒后将开始运行程序");
    sleep(3000);
    deviceInfo();
    eventListener();

    //选关卡
    beforeRun();
    while (true) {
        //运行主函数
        main();
    }
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

function beforeRun() {
    //点击生涯
    click(1371, 1017);
    click(1371, 1017);
    sleep(200);
    click(1371, 1017);
    sleep(2000);

    //点击位置
    click(1630, 1050);
    sleep(500);
    //选择关卡
    click(350, 300);
    sleep(1000);
}

function deviceInfo() {
    auto();
    if (!requestScreenCapture()) {
        toast('请求截图失败，程序结束');
        exit();
    }
    //调整屏幕亮度
    device.setBrightness(0);
}

function main() {
    //选车
    chooseModeAndCar();

    //开始
    click(1728, 1008);
    sleep(6000);

    //开跑
    threads.start(function() {
        run()
    });

    //跑完之后
    afterRun();
}

function afterRun() {
    sleep(69000);
    toast("跑完了");
    while (true) {
        //截图
        var img = captureScreen();

        //确定
        var upgrade = images.pixel(img, checkForResolution(820, 950, img).positionX, checkForResolution(820, 950, img).positionY);

        //恭喜
        var upgrade2 = images.pixel(img, checkForResolution(500, 110, img).positionX, checkForResolution(500, 110, img).positionY);

        if (colors.equals(upgrade, "#ffffffff") && colors.equals(upgrade2, "#ffffffff")) {
            toast("升级");
            click(820, 950);
            click(820, 950);
            sleep(2000);
        }
        //推荐性能分
        var color = images.pixel(img, checkForResolution(1460, 888, img).positionX, checkForResolution(1460, 888, img).positionY);
        //黄色或红色
        if (colors.equals(color, "#ffc3fc0f") || colors.equals(color, "#ffff0054")) {
            toast("即将开始下一次奔跑");
            break;
        }

        //按钮颜色为黄色
        var button = images.pixel(img, checkForResolution(1440, 1000, img).positionX, checkForResolution(1440, 1000, img).positionY);
        if (colors.equals(button, "#ffc3fb12")) {
            click(1440, 1000);
            click(1440, 1000);
        }
        click(1600, 500);
    }

}

function run() {
    //在新线程执行的代码
    //{console.log("定时器启动,定时点击氮气");
    //预计时间70秒
    var exitTime = new Date().getTime() + 70000;
    //定时点击氮气
    var id = setInterval(function() {
        click(1600, 500);
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
    //向↓滑动,选关
    for (i = 0; i < 3; i++) {
        swipe(1200, 100, 1200, 1020, 400);
        sleep(200);
    }
    sleep(800);
    //选择第12关
    click(700, 610);

    //继续
    click(1728, 1008);
    sleep(2000);

    //向→滑动,保证车位置
    //swipe(300, 500, 900, 500, 500);
    //sleep(1000);

    //z4
    chooseCar(400, 500);

}
/**
 * 暂时只支持六量
 */
function chooseCar(x, y) {
    //选车,默认第一排第一个
    click(x, y);
    sleep(2000);

    //截图
    var img = captureScreen();
    var color = images.pixel(img, checkForResolution(1440, 1000, img).positionX, checkForResolution(1440, 1000, img).positionY);
    // 白色 #ffffffff
    // 红色 满油 #fffb1264
    //黄色 #ffc3fb12

    //没油
    if (colors.isSimilar(color, "#ffffffff")) {
        toast("没油,换车");
        //退出
        click(36, 58);
        sleep(2500);
        //如果是第一排的车
        if (y < 700) {
            //用第二排的,x不变
            y = 800;
        } else {
            //用第一排的,x变大
            y = 400;
            x = x + 520;
        }

        //递归调用.
        chooseCar(x, y)
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
