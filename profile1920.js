// 1920×1080分辨率
// 选择可用的车,第一列第一张编号为1,第一列第二张为2,第二列第一张为3,依次递增.可根据自己需求修改
// 填写车的编号,1920*1080分辨率下最多6张车循环,按填写先后顺序用车

/*********************** 生涯用车 ******************************/
var carrerCars = [1, 2, 3, 4, 5, 6];
/*********************** 生涯用车 ******************************/

/*********************** 多人用车 开始 ******************************/
var mpLevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze', 'legend2', 'platinum2', 'gold2', 'silver2', 'bronze2'];
// 传奇、白金、黄金、白银、青铜的车是否可用，true表示可用，false表示不可用
var mpStatus = [
    false,  // 传奇 Legend
    true,   // 白金 Platinum
    true,   // 黄金 Gold
    false,  // 白银 Silver
    false,  // 青铜 Bronze
        
    // 传奇
    false, 
    // 白金
    false, 
    // 黄金
    true, 
    // 白银
    true, 
    // 青铜
    true    
];

var mpCarPick = {
    legend: [1, 2, 3, 4, 5],        // 传奇 Legend
    platinum: [1, 2, 4, 5, 6, 7, 9],// 白金 Platinum
    gold: [5, 6, 7, 8, 9, 10, 11],  // 黄金 Gold
    silver: [7, 8, 10, 11, 12],     // 白银 Silver
    bronze: [5, 6, 7, 8, 9, 10],     // 青铜 Bronze
    
    // 传奇
    legend2: [1, 2, 3, 4],
    // 白金
    platinum2: [1, 2, 3, 4, 5, 6, 7, 12],
    // 黄金
    gold2: [1, 2, 3],
    // 白银
    silver2: [1, 2, 3],
    // 青铜
    bronze2: [1, 2, 3]
};

/*********************** 多人用车 结束 ******************************/

const robot = require('robot.js');

module.exports = {
    // 生涯
    carrer: {
        // 生涯用车
        cars : carrerCars,

        // 分辨率宽度
        width : 1920,
        
        // 分辨率高度
        height : 1080,
    
        // 最上方代币图标
        token: { x: 1226 , y: 42 },
    
        // 最上方积分图标
        credit: { x: 1530 , y: 42 },

        // 主界面的生涯块
        carrerBlock : { x : 1860 , y : 1020 },
    
        // 生涯,开始,继续
        goldenPoint: { x: 1500, y: 1000 },
    
        // 生涯百分比
        careerPercent: { x: 1560, y: 1050 },
    
        // euro
        euro: { x: 350, y: 300 },
    
        // 选关
        swipeScreen: function () {
            for (i = 0; i < 4; i++) {
                robot.swipe(this.height * 2 / 3, 150, this.height * 2 / 3, 900, 400);
                sleep(200);
            }
        },
    
        // 12
        block12: { x: 680, y: 800 },
    
        // 推荐性能分
        recommendedPoints: { x: 1800, y: 900 },
    
        // 第一辆车
        firstCar: { x: 555, y: 616 },
    
        // 车辆间距
        distance: { x: 519, y: 365 },
    },

    // 多人
    mp: {
        // classic race
        homeup: { x : 1841, y : 279 },
        // limit race
        homedown: { x : 1842, y : 615 },
        
        // error
        errorleft: { x : 225, y : 490 },
        errorright: { x : 1695, y : 490 },
        
        // 多人数据
        levelName : mpLevelName,

        status : mpStatus,

        carPick : mpCarPick,

        // 分辨率宽度
        width : 1920,
        
        // 分辨率高度
        height : 1080,

        // 最上方代币图标
        token: { x: 1226, y: 42 },

        // 最上方积分图标
        credit: { x: 1530, y: 42 },
        
        // 返回按钮
        back: { x: 25, y: 25 },
        // 返回按钮里的黑色<
        backward: { x: 51, y: 46 },

        // 多人块
        multiplayer: { x: 1050, y: 1050},
        meiri: { x: 760, y: 1050},
        teshu: { x: 400, y: 1050},

        // 开始按钮
        start: { x: 960, y: 999 },

        // 领奖按钮
        claim: { x: 960, y: 750 },
        // 多人包的绿色
        mpackage1: { x: 1050, y: 565 },
        mpackage2: { x: 1050, y: 600 },
                
        // 青铜
        bronze: { x: 1290, y: 168 },
        
        // 白银
        silver: { x: 1410, y: 168 },

        // 黄金
        gold: { x: 1530, y: 168 },

        // 白金
        platinum: { x: 1650, y: 168 },

        // 传奇
        legend: { x: 1770, y: 168 },

        // 生涯,开始,继续
        goldenPoint: { x: 1500, y: 1000 },
        

        // 第一辆车
        firstCar: { x: 693, y: 600 },

        // 车辆间距
        distance: { x: 510, y: 355 }
    }    
} 
