const profile = require('profile1920.js');
const cars = profile.carrer.cars;
const levelName = profile.mp.levelName;
const status = profile.mp.status;
const carPick = profile.mp.carPick;

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
            while (false){
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
         */
        chooseMode() {
            var Flag = false;
            while (!Flag){
                switch(carrerCheckState()) {
                    /* 主页
                    case 1: {
                        log('Index')
                        this.beforeRun();
                        break;
                    } */
                    // Euro界面
                    case 3: {
                        log('Euro')
                        Flag = true;
                        break;
                    }
                    // 结算
                    case 5: {
                        log('Result')
                        robot.back();
                        sleep(3950);
                        break;
                    }
                    default: {
                        log("isEuro ?= " + carrerCheckState());
                        // robot.back();
                        sleep(5950);
                    }
                }
                sleep(100);
            }
            toast("选择12关")
            sleep(700);
            profile.carrer.swipeScreen();

            // toastLog("请在此处截图,截图时不要滑动屏幕");
            // exit();
            sleep(800);
            // 选择第12关
            robot.click(profile.carrer.block12.x, profile.carrer.block12.y);
            sleep(1000);
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
            return counter_carrer;
        }
    },

    // 多人
    mp: {
        /**
         * 非循环部分
         */
        beforeRun() {
            var Flag = false;
            // 判断是否是否已经到达开始界面
            while (!Flag){
                switch(mpCheckState()){
                    // Home
                    case 0: {
                        toast('home');
                        if (true) {
                            robot.click(profile.mp.homeup.x, profile.mp.homeup.y);
                        } else {
                            robot.click(profile.mp.homedown.x, profile.mp.homedown.y);
                        }
                        sleep(2000);
                        break;
                    }
                    // error
                 	case 2: {
                        toast('error');
		                log ('error');
		                for (let j=0; j<1; j++) {
		              	    robot.back();
                            sleep(1000);     
		                }  
		                sleep(2000);                       
                     	break;            
                    } 
                        
                    // 游戏主界面
                    case 1: {
                        // 点击多人按钮
                        //log('index')
                        robot.click(profile.mp.multiplayer.x, profile.mp.multiplayer.y);
                        sleep(2000);
                        break;
                    }
                    // 多人开始界面
                    case 3: {
                        //log('start')
                        Flag = true;
                        break;
                    }
                    // 结算界面
                    case 5: {
                        //log('result')
                        robot.back();
                        sleep(3950);
                    }
                    // 打满了 5 / 10 / 20 个奖杯
                    case 7: {
                        //log('claim')
                        robot.click(profile.mp.claim.x, profile.mp.claim.y);
                        sleep(2000);
                        break;
                    }
                    // 否则暂时停止运行
                    default: {
                        log('default')
                        robot.back();
                        sleep(5950);
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
            sleep(4000);
            var FOUND = false;
            for (let i = 0; i < 5 && !FOUND; i++){
                if (status[i]){
                    if (hasFuel(levelName[i])){
                        FOUND = true;
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
                toastLog("\n无油。\nNo fuel.");
                return false;
            }
        },

        /**
         * 完成每局比赛之后的结算
         * @param {number} counter_mp 已完成的多人比赛次数 
         */
        run(counter_mp) {
            var left = 0;
            // 检查是否已经到达结算界面
            while (true) {
                if (mpCheckState() != -1) {
                    break;
                }
                // 若未跑完仍可点击氮气
                else {
                    robot.click(profile.mp.width * 4 / 5, profile.mp.height / 2);
                    /* robot.swipe(profile.mp.height * 5 / 8, profile.mp.width / 2, 
                        profile.mp.height * 7 / 8, profile.mp.width / 2, 
                    300); */
                    if (left == 5){
                        left = 0;
                        robot.click(profile.mp.width * 3 / 10, profile.mp.height / 2);
                        sleep(400);
                        robot.click(profile.mp.width * 3 / 10, profile.mp.height / 2);
                    }
                    sleep(950);
                    // toastLog("isNext ?= " + checkState());
                }
            }
            toastLog(++counter_mp + "场多人比赛已完成。\n即将开始下一场比赛。");
        }
    }
}
/**
 * 
 * @param {string} level 段位
 */
function hasFuel(level) {
//    log('checkFuel(' + level + ')');
    var cars;
    var swipes = 0;

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
    
    // 寻找还有油的车
    for (let i = 0; i < cars.length; i++) {
        let n = cars[i];
        
        // 定位到相应的level
        if (level == 'legend'){
            robot.click(profile.mp.legend.x, profile.mp.legend.y);
        } else if (level == 'platinum'){
            robot.click(profile.mp.platinum.x, profile.mp.platinum.y);
        } else if (level == 'gold'){
            robot.click(profile.mp.gold.x, profile.mp.gold.y);
        } else if (level == 'silver'){
            robot.click(profile.mp.silver.x, profile.mp.silver.y);
        } else if (level == 'bronze'){
            robot.click(profile.mp.bronze.x, profile.mp.bronze.y);
        }

        sleep(1000);
        
        swipes = parseInt( ( n - 1) / 2 );

        for(let j = 0; j < swipes; j++) {
            let dur = 700;
            let slp = 2000;
            sleep(slp);
            toast("作揖1次");
            robot.swipe(1004, 480, 472, 480, dur);
            sleep(slp);
        }

        // toastLog(n);
        var carPoint = {
            x: profile.mp.firstCar.x,
            y: profile.mp.firstCar.y + profile.mp.distance.y * ((n - 1) % 2)
        }
        // toastLog(carPoint.x + "," + carPoint.y);
        var img = captureScreen();
        var carcheckState = images.pixel(img, carPoint.x, carPoint.y);
        // toastLog(colors.toString(carcheckState));

        if (colors.equals(carcheckState, "#ffc3fb12")) {
            log(level+"-car"+n);
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

    // 代币
    var token = images.pixel(img, profile.mp.token.x, profile.mp.token.y);
    // log('token '+colors.toString(token))
    var isToken = colors.equals(token, "#0090ff") || colors.equals(token, "#0392fb") || colors.equals(token, "#0492fa");
    // log('isToken ' + isToken)

    // 积分
    var credit = images.pixel(img, profile.mp.credit.x, profile.mp.credit.y);
    // log('credit '+colors.toString(credit))
    var isCredit = colors.isSimilar(credit, "#ffc600", 2, "diff");
    // log('isCredit ' + isCredit)

    // 继续按钮
    var next = images.pixel(img, profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
    var isNext = colors.equals(next, "#c3fb12");
    // log('isNext ' + isNext)

    // 推荐性能分
    var recommendedPoints = images.pixel(img, profile.carrer.recommendedPoints.x, profile.carrer.recommendedPoints.y);
    var isReco = colors.equals(recommendedPoints, "#c3fc0f") || colors.equals(recommendedPoints, "#ff0054");
    // log('isNext ' + isNext)

    // 1 主页
    if (!isNext && isToken && isCredit)
        return 1;
    // 3 EURO
    if (isReco)
        return 3;
    // 5 结算
    if (isNext && !isReco)
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
    var isToken = colors.equals(token, "#0090ff") || colors.equals(token, "#0492fa") || colors.equals(token, "#0392fb");

    // 积分
    var credit = images.pixel(img, profile.mp.credit.x, profile.mp.credit.y);
    var isCredit = colors.equals(credit, "#ffc600");
    
    // 多人开始按钮
    var start = images.pixel(img, profile.mp.start.x, profile.mp.start.y);
    var isStart = colors.equals(start, "#c3fb12");

    // 继续按钮
    var next = images.pixel(img, profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
    var isNext = colors.equals(next, "#c3fb12");

	// 车库按钮
	var garage = images.pixel(img, profile.mp.garage.x, profile.mp.garage.y);
    var isGarage = colors.equals(garage, "#fffffe") || colors.equals(garage, "#ffffff");
		
	// 领取5-10-20
    var claim1 = images.pixel(img, profile.mp.mpackage1.x, profile.mp.mpackage1.y);
    var claim2 = images.pixel(img, profile.mp.mpackage2.x, profile.mp.mpackage2.y);
    var isClaim = colors.equals(claim1, "#c3fc0f") && colors.equals(claim2, "#fa154f");

	// 多人选取
    var homeup = images.pixel(img, profile.mp.homeup.x, profile.mp.homeup.y);
    var isHomeup = colors.equals(homeup, "#ffffff");
    var homedown = images.pixel(img, profile.mp.homedown.x, profile.mp.homedown.y);
    var isHomedown = colors.equals(homedown, "#ffffff");

	// 各种出错
    var errorleft = images.pixel(img, profile.mp.errorleft.x, profile.mp.errorleft.y);
    var errorright = images.pixel(img, profile.mp.errorright.x, profile.mp.errorright.y);
    var iserror = colors.equals(errorleft, "#1c5ab2") && colors.equals(errorright, "#1c5ab2");

    // 2 error
    if (iserror)
	    state = 2;
    // 0 Home
    else if (isToken && isCredit && isGarage && !isStart && !isClaim && isHomedown && isHomeup)
        state = 0;
    // 1 主页
    if (isToken && isCredit && !isStart && !isClaim)
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
