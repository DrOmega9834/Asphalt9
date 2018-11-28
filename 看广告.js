var profile1920 = {

    goldenPoint: { x: 1500, y: 1000 },

    left: { x: 840, y: 735 },

    right: { x: 1340, y: 735 }
}

var profile2160 = {

    goldenPoint: { x: 1700, y: 1000 },

    left: { x: 961, y: 730 },

    right: { x: 1170, y: 730 }
}

var profile;
const height = device.height;
const width = device.width;
if (height === 1920 && width == 1080) {
    profile = profile1920;
} else if ((height === 2160 || height === 2220) && width == 1080) {
    profile = profile2160;
} else {
    toast("Unstackable resolution.");
    exit();
}



mainEntrence();

// 程序主入口
function mainEntrence() {
    sleep(2000);
    toast("3s to start.");
    sleep(3000);
    deviceInfo();
    eventListener();
    click(profile.goldenPoint.x, profile.goldenPoint.y);
    click(profile.goldenPoint.x, profile.goldenPoint.y);
    ad();

}

function deviceInfo() {
    auto();
    if (!requestScreenCapture()) {
        toast('No captureScreen permission.');
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
            toastLog("Mannualy Exit");

            device.setBrightness(40);
            threads.shutDownAll();
            exit();
        });
    });
}

function ad() {
    toastLog("开始为车辆补充燃油");
    while (true) {
        // confirm the UI
        var img = captureScreen();
        var left = images.pixel(img, profile.left.x, profile.left.y);
        var right = images.pixel(img, profile.right.x, profile.right.y);
        // toastLog("left is " + colors.toString(left));
        // toastLog("right is " + colors.toString(right));
        if (colors.equals(left, "#c3fb12") && colors.equals(right, "#ffffff")) {
            click(profile.right.x, profile.right.y);
            toastLog("开始看这个广告");
            break;
        }
        else {
            sleep(1000);
        }
    }

    // wait for playing ad
    sleep(30000);

    var jump_back = 0;

    while (true) {
        if (!jump_back) {
            toastLog("尝试返回")
            back();
            // sleep(1000);
            // back();
            sleep(5000);
        }

        var img = captureScreen();
        var left = images.pixel(img, profile.left.x, profile.left.y);
        var right = images.pixel(img, profile.right.x, profile.right.y);
        var next = images.pixel(img, profile.goldenPoint.x, profile.goldenPoint.y);
        // toastLog("left is " + colors.toString(left));
        // toastLog("right is " + colors.toString(right));
        // toastLog("next is " + colors.toString(next));

        // grey blue
        if (colors.equals(left, "#bababa") && colors.isSimilar(right, "#2580d8")) {
            toastLog("继续广告");
            click(profile.right.x, profile.right.y);
            // click(profile.right.x, profile.right.y);
            sleep(8000);
        }
        // green white
        else if (colors.equals(left, "#c3fb12") && colors.equals(right, "#ffffff")) {
            toastLog("看下一个广告")
            ad();
        }
        // next is green
        else if (colors.equals(next, "#c3fb12")) {
            toastLog("车辆燃油已恢复");
            exit();
        }
        // next is white
        else if (colors.equals(next, "#ffffff")) {
            toastLog("偶然多点一次返回，看下一个广告")
            click(profile.goldenPoint.x, profile.goldenPoint.y);
            ad();
        }
        // In progress
        else {
            toastLog("请稍等");
            sleep(3000);
            jump_back = 1;
        }
    }
}