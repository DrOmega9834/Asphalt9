// 1920×1080分辨率

const robot = require('robot.js');

module.exports = {
    // 生涯
    carrer: {

        // 分辨率宽度
        width : 1920,
        
        // 分辨率高度
        height : 1080,
    
        // 最上方代币图标
        token: { x: 921 , y: 42 },
    
        // 最上方积分图标
        credit: { x: 1206 , y: 42 },
    
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
        // 分辨率宽度
        width : 1920,
        
        // 分辨率高度
        height : 1080,

        // 最上方代币图标
        token: { x: 915, y: 42 },

        // 最上方积分图标
        credit: { x: 1203, y: 42 },

        // 多人块
        multiplayer: { x: 795, y: 990},

        // 开始按钮
        start: { x: 999, y: 963 },

        // 领奖按钮
        claim: { x: 915, y: 1011},
        
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