mainEntrence();

//程序主入口
function mainEntrence() {
    //权限请求
    requestPermission();
    //事件监听
    eventListener();
    sleep(2000);
    toast("3秒后将开始运行程序");
    sleep(3000);
    //选关卡
    beforeRun();
    while (true) {
        //运行主函数
        main();
    }
}

function requestPermission() {
    auto();
    // 获取截图权限
    if (!requestScreenCapture()) {
        toast('请求截图失败，程序结束');
        exit();
    }
}

function eventListener() {
    threads.start(function () {
        //启用按键监听
        events.observeKey();
        //监听音量上键按下
        events.onKeyDown("volume_down", function (event) {
            toastLog("程序手动退出");
            device.setBrightness(40);
            threads.shutDownAll();
            exit();
        });
    });
}

function beforeRun() {
    //点击生涯
    click(1728, 1008);
    click(1728, 1008);
    sleep(200);
    click(1728, 1008);
    sleep(2000);

    //点击位置
    click(1446, 1049);
    sleep(500);
    //选择关卡
    click(900, 300);

    //关闭亮度和声音
    startConfig();
}

function startConfig() {
    //明亮度0-255
    device.setBrightness(0);
    //媒体音量
    device.setMusicVolume(0);
}

function main() {
    sleep(1000);
    //选车
    chooseModeAndCar();

    //开始
    click(1728, 1008);
    sleep(6000);

    //开跑
    threads.start(function () {
        run()
    });

    //跑完之后
    afterRun();
}

function afterRun() {
    sleep(86000);
    toast("跑完了");
    while (true) {
        //截图
        var img = captureScreen();
        //推荐性能分
        var color = images.pixel(img, 1460, 888);
        //黄色或红色
        if (colors.equals(color, "#ffc3fc0f") || colors.equals(color, "#ffff0054")) {
            toast("即将开始下一次奔跑");
            break;
        } else {
            click(1440, 1000);
            click(1440, 1000);
            sleep(2000);
        }
    }

}

function run() {
    //在新线程执行的代码
    console.log("定时器启动,定时点击氮气");
    //预计时间1分20秒
    var exitTime = new Date().getTime() + 83000;
    //定时点击氮气
    var id = setInterval(function () {
        click(1600, 500);
        var now = new Date().getTime();
        if (now > exitTime) {
            console.log("定时器结束");
            clearInterval(id);
        }
    }, 1000);
}

/**
 * 选择模式和车
 */
function chooseModeAndCar() {
    toast("选择模式和车");
    //向↓滑动,选关
    for (i = 0; i < 5; i++) {
        swipe(1200, 100, 1200, 1020, 400);
        sleep(200);
    }
    sleep(500);
    //选择第13关
    click(943, 931);

    //继续
    click(1728, 1008);
    sleep(1000);

    //向→滑动,保证车位置
    swipe(300, 500, 900, 500, 500);
    sleep(1000);

    //z4
    chooseCar(400, 500);

}

function chooseCar(x, y) {
    //选车,默认第一排第一个
    click(x, y);
    sleep(2000);

    //截图
    var img = captureScreen();
    var color = images.pixel(img, 1440, 1000);
    // 白色 #ffffffff
    // 红色 #fffb1264
    //黄色 #ffc3fb12

    //没油
    if (colors.isSimilar(color, "#ffffffff")) {
        toast("换车");
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