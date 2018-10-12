const compete_x = 1500;
const compete_y = 1000;

const continue_x = 1728;
const continue_y = 1008;


mainEntrence();

//程序主入口
function mainEntrence() {
    toast("请切换至自私惊艳亮相主界面");
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
    //需要安卓7.0
    requiresApi(24);
    //调整屏幕亮度
    //device.setBrightness(0);
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

function main() {
    //比赛
    click(compete_x, compete_y);
    click(compete_x, compete_y);
    sleep(2000);

    //选车
    chooseModeAndCar();

    sleep(2000);
    //开始
    click(continue_x, continue_y);
    sleep(10000);

    //开跑
    threads.start(function () {
        run()
    });

    //跑完之后
    afterRun();
}


function run() {
    //在新线程执行的代码
    //{console.log("定时器启动,定时点击氮气");
    //预计时间90秒
    var exitTime = new Date().getTime() + 94000;
    //定时点击氮气
    var id = setInterval(function () {
        click(1600, 500);
        var now = new Date().getTime();
        if (now > exitTime) {
            //{console.log("定时器结束");
            clearInterval(id);
        }
    }, 1000);
}



function afterRun() {
    sleep(95000);
    toast("跑完了");
    while (true) {
        //截图
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
                toast("5代币");
                click(1632, 1000);
                click(1632, 1000);
                sleep(2000);
            }

            toast("即将开始下一次奔跑");
            break;
        }

        //按钮颜色为黄色
        var button = images.pixel(img, 1440, 1000);
        if (colors.equals(button, "#ffc3fb12")) {
            click(1440, 1000);
            click(1440, 1000);
        }
        //辅助点击
        click(1600,500);
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
    var pink = "#ffff0154";
    secondCar_x = 588;
    secondCar_y = 971;
    thirdCar_x = 1104;
    thirdCar_y = 607;
    fourthCar_x = 1104;
    fourthCar_y = 971;
    //截图
    var img = captureScreen();
    var colorw70 = images.pixel(img, secondCar_x, secondCar_y);
    var colorLambA = images.pixel(img, thirdCar_x, thirdCar_y);
    var colorGTA = images.pixel(img, fourthCar_x, fourthCar_y);
    var w70HasOil = colors.equals(colorw70, pink);
    var lambAHasOil = colors.equals(colorLambA, pink);
    var GTAHasOil = colors.equals(colorGTA, pink);

    // (588,607) (1104, 607)
    // (588,971) (1104, 971)

    if (!w70HasOil) {
        click(secondCar_x, secondCar_y);
    } else if (!lambAHasOil) {
        click(thirdCar_x, thirdCar_y);
    } else if (!GTAHasOil) {
        click(fourthCar_x, fourthCar_y);
    } else {
        toastLog("w70,牛a,gta都没油啦,脚本停止运行");
        threads.shutDownAll();
        exit();
    }
}



