//1920*1080分辨率
var profile1080 = {
    //生涯,开始,继续
    goldenPoint: { x: 1500, y: 1000 },

    //左边按钮
    left: { x: 840, y: 735 },

    //右边按钮
    right: { x: 1340, y: 735 }
}

var profile2160 = {
    //生涯,开始,继续
    goldenPoint: { x: 1700, y: 1000 },

    //左边按钮
    left: { x: 961, y: 730 },

    //右边按钮
    right: { x: 1170, y: 730 }
}

var profile;
const height = device.height;
const width = device.width;
if (height === 1920 && width == 1080) {
    profile = profile1080;
} if ((height === 2160 || height === 2220) && width == 1080) {
    profile = profile1080;
} else {
    toast("该分辨率暂未支持,程序结束");
    exit();
}



mainEntrence();

// 程序主入口
function mainEntrence() {
    sleep(2000);
    toast("3秒后将开始运行程序,请迅速切至选完车的界面");
    sleep(3000);
    deviceInfo();
    eventListener();
    click(profile.goldenPoint.x, profile.goldenPoint.y);
    click(profile.goldenPoint.x, profile.goldenPoint.y);
    sleep(3000);
    // 运行主函数
    main();

}

function deviceInfo() {
    auto();
    if (!requestScreenCapture()) {
        toast('请求截图失败，程序结束');
        exit();
    }
    console.log("height:" + height);
    console.log("width:" + width);
    // 调整屏幕亮度
    // device.setBrightness(0);
    // 调整媒体声音
    device.setMusicVolume(0);
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

function main() {
    toastLog("action");
    //本循环用来点击观看广告,因为点击跳过之后所卡顿时间不同
    while (true) {
        // 截图
        var img = captureScreen();
        var left = images.pixel(img, profile.left.x, profile.left.y);
        var img = captureScreen();
        var right = images.pixel(img, profile.right.x, profile.right.y);
        // toastLog(colors.toString(left));
        // toastLog(colors.toString(right));
        //这里估计是auto.js的bug, 取点的颜色一直不对,取的点颜色一直是#ff0000
        if (colors.equals(left, "#c3fb12") && (colors.equals(right, "#ffffff") || colors.equals(right, "#ff0000"))) {
            click(profile.right.x, profile.right.y);
            click(profile.right.x, profile.right.y);
            break;
        } else {
            sleep(1000);
        }
    }

    toast("开始看广告");

    //广告时间
    sleep(25000);

    while (true) {
        //一次back有时候未生效
        back();
        sleep(1000);
        back();
        sleep(1500);
        //toast("返回");
        // 截图
        var img = captureScreen();
        var left = images.pixel(img, profile.left.x, profile.left.y);
        var right = images.pixel(img, profile.right.x, profile.right.y);
        // toastLog(colors.toString(left));
        // toastLog(colors.toString(right));
        //广告还在继续
        if (colors.equals(left, "#bababa")
            // && colors.isSimilar(right, "#2580d8")
        ) {
            toast("继续广告");
            click(profile.right.x, profile.right.y);
            click(profile.right.x, profile.right.y);
            //下次返回时间
            sleep(7000);
        } else {
            sleep(8000);
            // 截图
            var img = captureScreen();
            var left = images.pixel(img, profile.left.x, profile.left.y);
            var right = images.pixel(img, profile.right.x, profile.right.y);
            // toastLog(colors.toString(left));
            // toastLog(colors.toString(right));
            if (colors.equals(left, "#c3fb12")
                // && colors.equals(right, "#ffffff")
            ) {
                main();
            }
            var button = images.pixel(img, profile.goldenPoint.x, profile.goldenPoint.y);
            if (colors.equals(button, "#c3fb12")) {
                toastLog("广告已看完");
                exit();
            }
            if (colors.equals(button, "#ffffff")) {
                click(profile.goldenPoint.x, profile.goldenPoint.y);
                main();
            } else {
                toastLog("程序异常");
                exit();
            }
        }
    }
}