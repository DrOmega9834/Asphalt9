// 选择可用的车,第一列第一张编号为1,第一列第二张为2,第二列第一张为3,依次递增.可根据自己需求修改
// 填写车的编号,1920*1080分辨率下最多6张车循环,按填写先后顺序用车

/*********************** 生涯用车 ******************************/
const cars = [1, 2, 3, 4, 5, 6];
/*********************** 生涯用车 ******************************/

/*********************** 多人用车 ******************************/
const level = ['legend', 'platinum', 'gold', 'silver', 'bronze'];
// 传奇、白金、黄金、白银、青铜的车是否可用，true表示可用，false表示不可用
const status = [false, false, false, true, true];
const carPick = {
    // 传奇
    legend: [1, 2],
    // 白金
    platinum: [1, 2, 3, 4],
    // 黄金
    gold: [1, 2, 3, 4],
    // 白银
    silver: [1, 2, 3, 4],
    // 青铜
    bronze: [1, 2, 3, 4]
}
/*********************** 多人用车 ******************************/

const profile = require('profile1920.js');
const robot = require('robot.js');
const DEVICE = require('device.js');
DEVICE.checkPermission();

module.exports = {
    // 生涯
    carrer: {
        /**
         * 非循环部分
         */
        beforeRun() {
            // 判断是否从主页开始
            while (true){
                if (carrerCheckState() == 1){
                    // toastLog("即将开始比赛");
                    break;
                }
                // else toastLog("isHome ?= " + checkState());
            }
        
            // 点击生涯
            robot.click(profile.carrer.goldenPoint.x, profile.carrer.goldenPoint.y);
            sleep(1000);
            robot.click(profile.carrer.goldenPoint.x, profile.carrer.goldenPoint.y);
            sleep(1000);
            robot.click(profile.carrer.goldenPoint.x, profile.carrer.goldenPoint.y);
            sleep(2000);
        
            // 点击位置
            robot.click(profile.carrer.careerPercent.x, profile.carrer.careerPercent.y);
            sleep(2000);
            // 选择关卡
            robot.click(profile.carrer.euro.x, profile.carrer.euro.y);
            sleep(1000);
        },

        /**
         * 选择关卡
         * @param {Number} counter_carrer 已完成的生涯比赛次数
         */
        chooseMode(counter_carrer) {
            if (!counter_carrer){
                while (true){
                    if (carrerCheckState() == 3){
                        toast("选择关卡");
                        break;
                    }
                    else {
                        log("isEuro ?= " + carrerCheckState());
                        sleep(200);
                    }
                }
            }
            
            sleep(700);
            profile.carrer.swipeScreen();

            // toastLog("请在此处截图,截图时不要滑动屏幕");
            // exit();
            sleep(800);
            // 选择第12关
            robot.click(profile.carrer.block12.x, profile.carrer.block12.y);

            // 继续
            robot.click(profile.carrer.goldenPoint.x, profile.carrer.goldenPoint.y);
        },

        /**
         * 选车
         */
        chooseCar() {
            for (let i = 0; i < cars.length; i++) {
                let n = cars[i];
                // toastLog(n);
                var carPoint = {
                    x: profile.carrer.firstCar.x + profile.carrer.distance.x * parseInt((n - 1) / 2),
                    y: profile.carrer.firstCar.y + profile.carrer.distance.y * ((n - 1) % 2)
                }
                // toastLog(carPoint.x + "," + carPoint.y);
                var img = captureScreen();
                var carcheckState = images.pixel(img, carPoint.x, carPoint.y);
                // toastLog(colors.toString(carcheckState));

                if (colors.equals(carcheckState, "#ffc3fb12")) {
                    robot.click(carPoint.x - profile.carrer.distance.x / 2, carPoint.y - profile.carrer.distance.y / 2);
                    break;
                }
            }
            sleep(4000);
            // 开始
            robot.click(profile.carrer.goldenPoint.x, profile.carrer.goldenPoint.y);
        },

        /**
         * 完成每局比赛之后的结算
         * @param {Number} counter_carrer 已完成的生涯比赛次数 
         */
        run(counter_carrer) {
            
            // 检查是否已经到达结算界面
            while (true) {
                if (carrerCheckState() == 5) {
                    break;
                }
                // 若未跑完仍可点击氮气
                else {
                    robot.click(profile.carrer.width * 4 / 5, profile.carrer.height / 2);
                    sleep(1000);
                    // toastLog("isNext ?= " + checkState());
                }
            }
            toastLog(++counter_carrer + "场比赛已完成");
            
            var counter_euro = 0;
            while (counter_euro < 15) {
                // 检查是否返回euro界面
                switch(carrerCheckState()) {
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
    },

    // 多人
    mp: {
        /**
         * 非循环部分
         */
        beforeRun() {
            var Flag = false;
            // 判断是否从主页开始
            while (!Flag){
                switch(mpCheckState()){
                    case 1: {
                        log('index')
                        // 点击多人按钮
                        robot.click(profile.mp.multiplayer.x, profile.mp.multiplayer.y);
                        sleep(3000);
                        break;
                    }
                    case 3: {
                        log('start')
                        Flag = true;
                        sleep(2000);
                        break;
                    }
                    default: {
                        log('default')
                        sleep(1000);
                    }
                }
                sleep(100);
            }
        },

        /**
         * 选车
         */
        chooseCar() {
            robot.click(profile.mp.start.x, profile.mp.start.y);
            sleep(3000);
            var FOUND = false;
            for (let i = 0; i < 5; i++){
                if (status[i]){
                    LV = level[i];
                    if (hasFuel(LV)){
                        FOUND = true;
                        break;
                    }
                }
            }
            if (FOUND){
                // 找到有油的车
                sleep(4000);
                robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                return true;
            }
            else {
                toastLog("无油。\nNo fuel.");
                return false;
            }
        },

        /**
         * 完成每局比赛之后的结算
         * @param {number} counter_mp 已完成的多人比赛次数 
         */
        run(counter_mp) {
            
            // 检查是否已经到达结算界面
            while (true) {
                if (mpCheckState() == 5) {
                    break;
                }
                // 若未跑完仍可点击氮气
                else {
                    robot.click(profile.mp.width * 4 / 5, profile.mp.height / 2);
                    sleep(1000);
                    // toastLog("isNext ?= " + checkState());
                }
            }
            toastLog(++counter_mp + "场比赛已完成");
            
            var counterStart = 0;
            while (counterStart < 15) {
                // 检查是否返回多人界面
                switch(mpCheckState()) {
                    // 多人开始界面
                    case 3: {
                        counterStart++;
                        break;
                    }
                    // 游戏主界面
                    case 1: {
                        // 点击多人按钮
                        robot.click(profile.mp.multiplayer.x, profile.mp.multiplayer.y);
                        sleep(3000);
                        return ;
                    }
                    // 打满了 5 / 10 / 20 个奖杯
                    case 7: {
                        robot.click(profile.mp.claim.x, profile.mp.claim.y);
                        sleep(2000);
                        break;
                    }
                    // 否则模拟按下一次返回键
                    default:
                        robot.back();
                        sleep(7950);
                }
                sleep(50);
            }
            toastLog("即将开始下一场比赛");
        }
    }
}
/**
 * 
 * @param {string} level 段位
 */
function hasFuel(level) {
    log('checkFuel(' + level + ')');
    var cars;

    // 给cars[]赋值
    if (level == 'legend'){
        cars = carPick.legend;
        robot.click(profile.mp.legend.x, profile.mp.legend.y);
    } else if (level == 'platinum'){
        cars = carPick.platinum;
        robot.click(profile.mp.platinum.x, profile.mp.platinum.y);
    } else if (level == 'gold'){
        cars = carPick.gold;
        robot.click(profile.mp.gold.x, profile.mp.gold.y);
    } else if (level == 'silver'){
        cars = carPick.silver;
        robot.click(profile.mp.silver.x, profile.mp.silver.y);
    } else if (level == 'bronze'){
        cars = carPick.bronze;
        robot.click(profile.mp.bronze.x, profile.mp.bronze.y);
    } else {
        cars = [1, 2];
        robot.click(profile.mp.bronze.x, profile.mp.bronze.y);
    }

    sleep(4000);
    
    // 寻找还有油的车
    for (let i = 0; i < cars.length; i++) {
        let n = cars[i];
        // toastLog(n);
        var carPoint = {
            x: profile.mp.firstCar.x + profile.mp.distance.x * parseInt((n - 1) / 2),
            y: profile.mp.firstCar.y + profile.mp.distance.y * ((n - 1) % 2)
        }
        // toastLog(carPoint.x + "," + carPoint.y);
        var img = captureScreen();
        var carcheckState = images.pixel(img, carPoint.x, carPoint.y);
        // toastLog(colors.toString(carcheckState));

        if (colors.equals(carcheckState, "#ffc3fb12")) {
            robot.click( carPoint.x - profile.mp.distance.x / 2 , carPoint.y - profile.mp.distance.y / 2 );
            return true;
        }
    }

    return false;
}

/**
 * 生涯状态机
 */
function carrerCheckState() {
    var img = captureScreen();
    
    // 若干点的颜色值
    var token = images.pixel(img, profile.carrer.token.x, profile.carrer.token.y);
    var credit = images.pixel(img, profile.carrer.credit.x, profile.carrer.credit.y);
    var goldenPoint = images.pixel(img, profile.carrer.goldenPoint.x, profile.carrer.goldenPoint.y);
    var recommendedPoints = images.pixel(img, profile.carrer.recommendedPoints.x, profile.carrer.recommendedPoints.y);

    // 1 主页
    if (!colors.equals(goldenPoint, "#c3fb12") && colors.equals(token, "#0090ff") && colors.isSimilar(credit, "#ffc600", 2, "diff"))
        return 1;
    // 3 EURO
    if (colors.equals(recommendedPoints, "#c3fc0f") || colors.equals(recommendedPoints, "#ff0054"))
        return 3;
    // 5 结算
    if (colors.equals(goldenPoint, "#c3fb12") && !(colors.equals(recommendedPoints, "#c3fc0f") || colors.equals(recommendedPoints, "#ff0054")))
        return 5;
    /*
    toastLog("goldenPoint is " + colors.toString(goldenPoint));
    toastLog("token is " + colors.toString(token));
    toastLog("credit is " + colors.toString(credit));
    toastLog("recommendedPoints is " + colors.toString(recommendedPoints));
    */
    return -1;
}

/**
 * 多人状态机
 */
function mpCheckState() {
    var state = -1;

    var img = captureScreen();
    
    // 代币
    var token = images.pixel(img, profile.mp.token.x, profile.mp.token.y);
    log('token '+colors.toString(token))
    var isToken = colors.equals(token, "#0090ff");
    log('isToken '+isToken)

    // 积分
    var credit = images.pixel(img, profile.mp.credit.x, profile.mp.credit.y);
    log('credit '+colors.toString(credit))
    var isCredit = colors.equals(credit, "#ffc600");
    log('isCredit '+isCredit)
    
    // 多人开始按钮
    var start = images.pixel(img, profile.mp.start.x, profile.mp.start.y);
    log('start '+colors.toString(start))
    var isStart = colors.equals(start, "#c3fb12");
    log('isStart '+isStart)

    // 继续按钮
    var next = images.pixel(img, profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
    var isNext = colors.equals(next, "#c3fb12");
    log('isNext '+isNext)

    var claim = images.pixel(img, profile.mp.claim.x, profile.mp.claim.y);
    var isClaim = colors.equals(claim, "#fdd901");
    log('isClaim'+ isClaim)

    // 1 主页
    if (isToken && isCredit && !isStart)
        state = 1;
    // 3 多人开始
    else if (isToken && isCredit && isStart)
        state = 3;
    // 5 结算
    else if (isNext && !isCredit && !isToken)
        state = 5;
    // 7 5/10/20奖杯包
    else if (isToken && isCredit && isClaim)
        state = 7;
    
    return state;
}