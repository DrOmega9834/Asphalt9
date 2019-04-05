/**
 * 安卓5机器人
 * @constructor
 */
function LollipopRobot() {
    rootAutomator = new RootAutomator();
    this.click = function (x, y) {
        // return rootAutomator.tap(x, y);
        return Tap(x, y);
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        // return rootAutomator.swipe(x1, y1, x2, y2, duration);
        return Swipe(x1, y1, x2, y2, duration);
    };

    this.back = function () {
        return Back();
    }
}

/**
 * 安卓7机器人
 * @constructortap
 */
function NougatRobot() {
    this.click = function (x, y) {
        return click(x, y);
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        return swipe(x1, y1, x2, y2, duration);
    };

    this.back = function () {
        return back();
    }
}

/**
 * 机器人工厂
 */
function Robot() {
    if (device.sdkInt < 24) {
        const hasRoot = files.exists("/sbin/su") || files.exists("/system/xbin/su") || files.exists("/system/bin/su");
        if (!hasRoot) {
            toast("安卓版本在安卓7以下需要root,程序结束");
            exit();
        }
        this.robot = new LollipopRobot();
    } else {
        this.robot = new NougatRobot();
    }
    this.click = function (x, y) {
        return this.robot.click(x, y);
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        return this.robot.swipe(x1, y1, x2, y2, duration);
    };

    this.back = function () {
        return this.robot.back();
    };
}

const robot = new Robot();
module.exports = robot;