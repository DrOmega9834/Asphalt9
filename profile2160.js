// 1920×1080分辨率
// 选择可用的车,第一列第一张编号为1,第一列第二张为2,第二列第一张为3,依次递增.可根据自己需求修改
// 填写车的编号,1920*1080分辨率下最多6张车循环,按填写先后顺序用车

/*********************** 生涯用车 ******************************/
var carrerCars = [1, 2, 3, 4, 5, 6];
/*********************** 生涯用车 ******************************/

/*********************** 多人用车 开始 ******************************/
var mpLevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze'];
// 传奇、白金、黄金、白银、青铜的车是否可用，true表示可用，false表示不可用
var mpStatus = [
    // 传奇
    false, 
    // 白金
    false, 
    // 黄金
    false, 
    // 白银
    true, 
    // 青铜
    true
];
var mpCarPick = {
    // 传奇
    legend: [1, 2, 3, 4],
    // 白金
    platinum: [1, 2, 3, 4],
    // 黄金
    gold: [1, 2, 3, 4],
    // 白银
    silver: [1, 2, 3, 4],
    // 青铜
    bronze: [1, 2, 3, 4]
};
/*********************** 多人用车 结束 ******************************/

const robot = require('robot.js');

module.exports = {
    // 生涯
    carrer: {
        // 生涯用车
        cars : carrerCars,

        // 分辨率宽度
        width : 2160,
        
        // 分辨率高度
        height : 1080,
    
        // 最上方代币图标
        token: { x: 1035 , y: 48 },
    
        // 最上方积分图标
        credit: { x: 1350 , y: 48 },
    
        // 生涯,开始,继续
        goldenPoint: { x: 1700, y: 1000 },
    
        // 生涯百分比
        careerPercent: { x: 1776, y: 1023 },
    
        // euro
        euro: { x: 1700, y: 280 },
    
        // 选关
        swipeScreen: function () {
            for (i = 0; i < 4; i++) {
                robot.swipe(this.height * 2 / 3, 150, this.height * 2 / 3, 900, 400);
                sleep(200);
            }
        },
    
        // 12
        block12: { x: 765, y: 306 },
    
        // 推荐性能分
        recommendedPoints: { x: 2000, y: 860 },
    
        // 第一辆车
        firstCar: { x: 565, y: 630 },
    
        // 车辆间距
        distance: { x: 513, y: 359 },
    },

    // 多人
    mp: {

        // 多人数据
        levelName : mpLevelName,

        status : mpStatus,

        carPick : mpCarPick,

        // 分辨率宽度
        width : 2160,
        
        // 分辨率高度
        height : 1080,

        // 最上方代币图标
        token: { x: 1035, y: 48 },

        // 最上方积分图标
        credit: { x: 1350, y: 48 },

        // 多人块
        multiplayer: { x: 840, y: 1020},

        // 开始按钮
        start: { x: 1080, y: 1020 },

        // 领奖按钮
        claim: { x: 966, y: 756 },
        
        // 青铜
        bronze: { x: 1488, y: 210 },
        
        // 白银
        silver: { x: 1611, y: 210 },

        // 黄金
        gold: { x: 1734, y: 210 },

        // 白金
        platinum: { x: 1860, y: 210 },

        // 传奇
        legend: { x: 1980, y: 210 },

        // 生涯,开始,继续
        goldenPoint: { x: 1656, y: 985 },

        // 第一辆车
        firstCar: { x: 728, y: 620 },

        // 车辆间距
        distance: { x: 500, y: 352 }
    }    
} 