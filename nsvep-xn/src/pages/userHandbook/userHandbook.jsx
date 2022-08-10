// /*
//  * @Author: XN
//  * @Date: 2020-08-08 11:42:16
//  * @LastEditTime: 2020-08-08 11:58:23
//  * @LastEditors: XN
//  * @Description:
//  * @FilePath: /gitee-nsvep/src/pages/userHandbook/userHandbook.jsx
//  */
// import React, { Component } from "react";
// import { Card } from "antd";
// import {hb1} from '../../images/hb1.png'
// import {hb2} from '../../images/hb2.PNG'
// import {hb3} from '../../images/hb3.PNG'

// const { Meta } = Card;
// export default class UserHandbook extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   render() {
//     const style = { color: "white" };
//     return (
//       <div id="write" class="is-node" style={style}>
//         <div>
//           <span>用户使用手册</span>
//         </div>
//         <div>
//           <span>一、如图是实验环境的默认开始界面</span>
//           <Card
//             hoverable
//             style={{ width: 240 }}
//             cover={
//               <img
//                 alt="example"
//                 src="../../images/hb1.png"
//               />
//             }
//           >
//           </Card>
//         </div>
//         <div></div>
//         <div>{/* <img src=""  alt="table"> */}</div>
//         <div>
//           <span>二、下面依次介绍左边的导航栏功能</span>
//         </div>
//         <div>
//           {/* <img src="" alt="leftNavbar" style="float:left"/> */}
//           <span></span>
//           <span>左边的导航栏从上到下依次为：</span>
//         </div>
//         <div>
//           <span></span>
//           <span>
//             1、显示额外按键：有一些可供选择键盘快捷键，如Ctrl、Alt、Win键等，方便一些快捷操作（其中，鼠标停留在对应按钮上都可以看到对应的说明）
//             ；
//           </span>
//         </div>
//         <div>
//           <span></span>
//           <span>
//             2、剪切板：实验平台环境内外的复制粘贴操作都需要通过这里转化一下，例如从本机word文档中复制一段代码进来需要先复制到此处剪切板处才可以进一步使用到实验中；
//           </span>
//         </div>
//         <div>
//           <span></span>
//           <span>3、全屏：点击可将本界面扩大到整个屏幕中；</span>
//         </div>
//         <div>
//           <span></span>
//           <span>
//             4、设置：建议保留默认设置； 5、终端连接：点击控制是否断开连接。
//           </span>
//         </div>
//         <div>
//           <span>三、下面依次介绍底部菜单栏功能</span>
//         </div>
//         <div>
//           {/* <img src="" referrerpolicy="no-referrer" alt="bottomNavbar"> */}
//         </div>
//         <div>
//           <span>底部左边几个功能：</span>
//         </div>
//         <div>
//           <span>1、开始按钮：</span>
//         </div>
//         <div>
//           <span>Internet：</span>
//           <u>
//             <span>只能</span>
//           </u>
//           <span>访问Firefox Web Browser用来浏览正常网页，</span>
//           <u>
//             <span>不支持</span>
//           </u>
//           <span>游戏、影音等；</span>
//         </div>
//         <div>
//           <span>Logout：</span>
//           <u>
//             <span>未完成</span>
//           </u>
//           <span>实验情况下不可退出；</span>
//         </div>
//         <div>
//           <span>2、File Manager PCManFM：文件资源管理；</span>
//         </div>
//         <div>
//           <span>3、Web Browser：暂时无法使用；</span>
//         </div>
//         <div>
//           <span>4、点击可以将桌面上打开的窗口统一缩小</span>
//         </div>
//         <div>
//           <span>5、有4个桌面壁纸样式可以自主切换</span>
//         </div>
//         <div>
//           <span>底部右边几个功能：</span>
//         </div>
//         <div>
//           <span>1、流量监控显示</span>
//         </div>
//         <div>
//           <span>2、其他（时间等）：对实验没有影响，无需点击</span>
//         </div>
//         <div>&nbsp;</div>
//         <div>&nbsp;</div>
//       </div>
//     );
//   }
// }
