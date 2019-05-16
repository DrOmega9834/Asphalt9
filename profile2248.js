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
    // 生涯 ( 从1920复制而来 暂不可用 )
    carrer: {
        // 生涯用车
        cars : carrerCars,

        // 分辨率宽度
        width : 2244,
        
        // 分辨率高度
        height : 1080,
    
        // 最上方代币图标
        token: { x: 1060 , y: 66 },
    
        // 最上方积分图标
        credit: { x: 1366 , y: 66 },
    
        // 生涯,开始,继续
        goldenPoint: { x: 1665, y: 1000 },
    
        // 生涯百分比
        careerPercent: { x: 1990, y: 1024 },
    
        // euro
        euro: { x: 1848, y: 300 },
    
        // 选关
        swipeScreen: function () {
            for (i = 0; i < 4; i++) {
                robot.swipe(this.height * 2 / 3, 150, this.height * 2 / 3, 900, 400);
                sleep(200);
            }
        },
    
        // 12
        block12: { x: 775, y: 261 },
    
        // 推荐性能分
        recommendedPoints: { x: 2030, y: 852 },
    
        // 第一辆车
        firstCar: { x: 633, y: 625 },
    
        // 车辆间距
        distance: { x: 495, y: 360 },
    },

    // 多人
    mp: {

        // 多人数据
        levelName : mpLevelName,

        status : mpStatus,

        carPick : mpCarPick,

        // 分辨率宽度
        width : 2248,
        
        // 分辨率高度
        height : 1080,

        // 最上方代币图标
        token: { x: 1077, y: 54 },

        // 最上方积分图标
        credit: { x: 1401, y: 54 },

        // 多人块
        multiplayer: { x: 888, y: 1050},

        // 开始按钮
        start: { x: 1124, y: 1011 },

        // 领奖按钮
        claim: { x: 1029, y: 747 },
        
        // 青铜
        bronze: { x: 1545, y: 231 },
        
        // 白银
        silver: { x: 1674, y: 231 },

        // 黄金
        gold: { x: 1800, y: 231 },

        // 白金
        platinum: { x: 1932, y: 231 },

        // 传奇
        legend: { x: 2058, y: 231 },

        // 生涯,开始,继续
        goldenPoint: { x: 1992, y: 900 },

        // 第一辆车
        firstCar: { x: 738, y: 625 },

        // 车辆间距
        distance: { x: 496, y: 348 }
    }    
} 