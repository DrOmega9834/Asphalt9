// 选择可用的车,第一列第一张编号为1,第一列第二张为2,第二列第一张为3,依次递增.可根据自己需求修改
// 填写车的编号,1920*1080分辨率下最多6张车循环,按填写先后顺序用车

const cars = [1, 2, 3, 4, 5, 6];
const profile = require('profile1920.js');
const robot = require('robot.js');
const DEVICE = require('device.js');
DEVICE.checkPermission();

function Play() {
    var p = {

        /**
         * 非循环部分
         */
        beforeRun() {
            // 判断是否从主页开始
            while (true){
                if (checkState() == 1){
                    // toastLog("即将开始比赛");
                    break;
                }
                // else toastLog("isHome ?= " + checkState());
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
        },

        /**
         * 选择关卡
         * @param {Number} counter_carrer 已完成的生涯比赛次数
         */
        chooseMode(counter_carrer) {
            if (!counter_carrer){
                while (true){
                    if (checkState() == 3){
                        toast("选择关卡");
                        break;
                    }
                    else {
                        log("isEuro ?= " + checkState());
                        sleep(200);
                    }
                }
            }
            
            sleep(700);
            profile.swipeScreen();

            // toastLog("请在此处截图,截图时不要滑动屏幕");
            // exit();
            sleep(800);
            // 选择第12关
            robot.click(profile.block12.x, profile.block12.y);

            // 继续
            robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
        },

        /**
         * 选车
         */
        chooseCar() {
            for (let i = 0; i < cars.length; i++) {
                let n = cars[i];
                // toastLog(n);
                var carPoint = {
                    x: profile.firstCar.x + profile.distance.x * parseInt((n - 1) / 2),
                    y: profile.firstCar.y + profile.distance.y * ((n - 1) % 2)
                }
                // toastLog(carPoint.x + "," + carPoint.y);
                var img = captureScreen();
                var carcheckState = images.pixel(img, carPoint.x, carPoint.y);
                // toastLog(colors.toString(carcheckState));

                if (colors.equals(carcheckState, "#ffc3fb12")) {
                    robot.click(carPoint.x - profile.distance.x / 2, carPoint.y - profile.distance.y / 2);
                    break;
                }
            }
            sleep(4000);
            // 开始
            robot.click(profile.goldenPoint.x, profile.goldenPoint.y);
        },

        /**
         * 完成每局比赛之后的结算
         * @param {Number} counter_carrer 已完成的生涯比赛次数 
         */
        run(counter_carrer) {
            
            // 检查是否已经到达结算界面
            while (true) {
                if (checkState() == 5) {
                    break;
                }
                // 若未跑完仍可点击氮气
                else {
                    robot.click(profile.width * 4 / 5, profile.height / 2);
                    sleep(1000);
                    // toastLog("isNext ?= " + checkState());
                }
            }
            toastLog(++counter_carrer + "场比赛已完成");
            
            var counter_euro = 0;
            while (counter_euro < 15) {
                // 检查是否返回euro界面
                switch(checkState()) {
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
    }

    return p;
}

var pl = new Play();
module.exports = pl;

function checkState() {
    var state = -1;

    var img = captureScreen();
    
    // 若干点的颜色值
    var token = images.pixel(img, profile.token.x, profile.token.y);
    var credit = images.pixel(img, profile.credit.x, profile.credit.y);
    var goldenPoint = images.pixel(img, profile.goldenPoint.x, profile.goldenPoint.y);
    var recommendedPoints = images.pixel(img, profile.recommendedPoints.x, profile.recommendedPoints.y);

    // 1 主页
    if (!colors.equals(goldenPoint, "#c3fb12") && colors.equals(token, "#0090ff") && colors.isSimilar(credit, "#ffc600", 2, "diff"))
        state = 1;
    // 3 EURO
    else if (colors.equals(recommendedPoints, "#c3fc0f") || colors.equals(credit, "#ff0054"))
        state = 3;
    // 5 结算
    else if (colors.equals(goldenPoint, "#c3fb12") && !(colors.equals(recommendedPoints, "#c3fc0f") || colors.equals(recommendedPoints, "#ff0054")))
        state = 5;
    
    return state;
}