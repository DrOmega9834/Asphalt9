# 狂野飙车 9 挂机脚本

## 特别感谢：<a href = "https://github.com/zlsq" target = "_blank">zlsq</a>

* <a href = "https://github.com/zlsq/A9" target = "_blank">他的仓库</a>

## 简介
* 狂野飙车9脚本
  * 生涯刷金币
  * 多人刷声望、金币、上分
* 使用Auto.js作为开发平台
* 安卓7.0及以上**无需ROOT**权限，安卓6暂不支持，安卓5及以下必须要ROOT权限
* 生涯脚本每小时能完成33场比赛，即每小时能获取8万金币
* 多人脚本每小时能完成24场比赛，声望请自行计算
* 欢迎使用和提交bug反馈
* 如果您觉得脚本好用，请点个star或者拉到底部捐赠作者

## 目录

* 使用条件 **（必看，不满足的请不要问我为什么不能运行）** 
* 安装教程 **（必看）** 
* 脚本详细说明（遇到问题先看这个，确认看完了不能解决再问我）
* 捐赠

## 不能使用的时候，首先查看使用条件

### 设备条件

* 安卓7.0版本及以上无需ROOT权限，其余安卓版本需要ROOT
* 支持如下分辨率：
  * 1920×1080
  * 2160×1080
  * 2244×1080
  * 2246×1080
  * 2248×1080
* 如果您的手机分辨率不在上述之列，又需要脚本的话，请<a href="https://github.com/Dr-Omega9834/Asphalt9/releases/download/1.0/Screenshots.zip">点击此处下载截图示例</a>，参照我的截图示例，带上您的截图原图发邮件私戳我
* 需流畅运行a9，若有卡顿可能会出现意料之外的问题

### 游戏内条件

* 生涯脚本（New Euro 12.js）
  * euro12脚本 **必须完成** 第四章 **EURO SHOW DOWN** 这个赛季
  * 必须解锁赛事所用车辆
  * 所用车辆必须性能分足够（足够是指在指定时间内能在自动驾驶的情况下通过一直点击氮气达成目标）

## 小白/萌新安装教程

##### 阅读完上述“使用条件“！ 

##### 阅读完上述“使用条件“！

##### 阅读完上述“使用条件“！

##### 点击以下链接下载并安装Auto.js 4.0.4 Alpha 6 版本

* <a href="https://github.com/hyb1996/Auto.js/releases/download/4.0.4Alpha6/commonRelease-4.0.4.Alpha6.apk">Auto.js下载链接</a>
* **本脚本不能在 Auto.js 4.0.5 Alpha 版本上运行，运行时报错"redeclaration"**

##### 点击以下链接，下载并导入脚本，*如有和以前重复，先删除旧文件再导入*

* <a href="https://github.com/Dr-Omega9834/Asphalt9/releases/download/1.2/device.js">device.js</a>
* <a href="https://github.com/Dr-Omega9834/Asphalt9/releases/download/1.2/multiplayer.js">multiplayer.js</a>
* <a href="https://github.com/Dr-Omega9834/Asphalt9/releases/download/1.2/New.Euro.12.js">New Euro 12.js</a>
* <a href="https://github.com/Dr-Omega9834/Asphalt9/releases/download/1.2/play.js">play.js</a>
* 以下三个分辨率文件下载自己手机对应的那个就可以了，，非1920×1080分辨率的在导入时注意将文件名改为1920
  * <a href="https://github.com/Dr-Omega9834/Asphalt9/releases/download/1.2/profile1920.js">profile1920.js</a>
  * <a href="https://github.com/Dr-Omega9834/Asphalt9/releases/download/1.2/profile2160.js">profile2160.js</a>
  * <a href="https://github.com/Dr-Omega9834/Asphalt9/releases/download/1.2/profile2248.js">profile2248.js（2244/2246/2248的都下载这个）</a>
* <a href="https://github.com/Dr-Omega9834/Asphalt9/releases/download/1.2/robot.js">robot.js</a>
* 除profile以外的其他文件导入时均需要保证文件名不变
* 请确认脚本全部都导入后开始下一步

##### 调整参数（参见脚本详细说明）

* 后续更新会做一个交互界面和用户互动，避免用户去自行调整脚本

##### 开始运行脚本

* New Euro 12.js 是生涯脚本

* multiPlayer.js 是多人脚本

* 其他脚本直接运行都会报错，只能运行上面两个脚本

* 推荐打开auto.js的悬浮窗，这样就可以直接在悬浮窗中点击运行脚本了

* 如若没开悬浮窗，则切出游戏界面至auto.js界面，立即切回游戏中， 等待脚本运行

##### 停止运行脚本

* 按下**音量下键**即可立即停止运行脚本，也可以按电源键关闭屏幕
* 也可以打开Auto.js设置项中的“音量上键停止脚本”，之后用音量上停止运行

* 除此以外脚本不会自动停止
* **若没有手动停止脚本运行而直接触摸屏幕，则会有可能性切换到商店中的代币购买金币界面造成代币亏损（前人的血泪史）**

## 脚本详细说明
* 脚本运行后会设置屏幕亮度为0，媒体音量为0，是正常现象，手动停止脚本会重置音量和亮度为开始运行脚本之前的状态。
* 脚本每次运行时需要给无障碍权限(模拟点击，滑动等操作)，第一次运行时需要修改系统设置权限(修改屏幕亮度和音量)
* 可以自定义使用的车辆，选车界面第一列第一排车为编号1，第一列第二排车为编号2，第二列第一排车为编号3，依次递增，填写play.js开始部分的数组中，默认为 [1，2，3，4，5，6] ，表示使用6张车。当然你也可以自行定义使用车的顺序,你可以定义为[6， 5，4，3，2，1]，表示先使用第6张车，没油了就用第5张依次递减。

---

目前有两个脚本：

* euro脚本（euro12.js）能循环跑第四章EURO SHOW DOWN赛季的第十二关的计时赛

    * 游戏主界面（进入游戏后玩家可以自由操作的第一个界面）运行脚本
    * 脚本达到的效果:平均1分40秒一个循环，86400积分/小时
    * 脚本若被广告打断，请联系我，并附上广告截图
    * 有人可能遇到在跑完后脚本无限点击返回的bug，请发邮件私戳我

* 多人脚本（multiPlayer.js）能循环完成多人赛事
    * 游戏主界面/多人界面运行均可

    * 运行之前请按照实际段位更改profile1920.js中以下内容：

      ---

      * 第14、16、18、20、22行的参数控制脚本会使用什么段位的车

        * true表示可用，false表示不可用；请按照实际段位修改：已到达的段位应为true，尚未到达的段位应为false

        * 可使用的车里面，优先使用段位较高的车；同一个段位的车中，优先使用编号小的车（编号大小参见上文）

        * 文件中默认白银和青铜为true，黄金、白金和传奇为false

        * 将未达到的段位改为修改true导致任何的后果请自己负责

      ---

      * 第26、28、30、32、34行的参数控制各个段位具体使用哪些车，修改方法参见上文

    * 因脚本原因，不可使用某些车辆，详情请 <a href="https://github.com/Dr-Omega9834/Asphalt9/issues/3">点击此处</a> 查看，该issue每个多人赛季开始时更新，请定时查看

* 看广告脚本（暂不可用）

    * 选择你想补充燃油的车辆，点击”跳过“，然后运行脚本

## 联系我们:
* omegadot9834@foxmail.com
* **先看完这篇说明再问问题**

## 捐赠：
如果您觉得我的脚本有帮到您，您可以捐赠作者，您的捐赠将是我最大的动力.<br/>

| 支付宝支付: | 微信支付: |
| ---------- | -------- |
| ![alipay](../pay/alipay.png) | ![wechat](../pay/wechat.png) |


