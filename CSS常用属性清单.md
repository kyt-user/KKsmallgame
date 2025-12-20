  # CSS 常用属性清单

本文档总结了在前端开发中最常用、最通用的 CSS 属性，按功能分组整理，帮助开发者快速掌握和应用 CSS 样式。

## 1. 盒模型 & 尺寸

### 尺寸属性
- [width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) / [height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) - 设置元素的宽度和高度
  ```css
  /* 设置固定宽度和高度 */
  .container { width: 300px; height: 200px; }
  
  /* 设置最大宽度，常用于响应式设计 */
  .image { max-width: 100%; height: auto; }
  ```

- [max-width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-width) / [max-height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-height) - 设置元素的最大宽度和高度
- [min-width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-width) / [min-height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-height) - 设置元素的最小宽度和高度

### 内外边距
- [padding](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) - 设置内边距（简写属性）
  ```css
  /* 统一内边距 */
  .card { padding: 20px; }
  
  /* 分别设置上下和左右 */
  .button { padding: 10px 15px; }
  
  /* 分别设置上、右、下、左 */
  .box { padding: 10px 15px 20px 25px; }
  ```

- [padding-top](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-top) / [padding-right](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-right) / [padding-bottom](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-bottom) / [padding-left](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-left) - 分别设置四个方向的内边距
- [margin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) - 设置外边距（简写属性）
  ```css
  /* 自动外边距居中 */
  .center { margin: 0 auto; width: 80%; }
  
  /* 负边距用于重叠效果 */
  .overlap { margin-top: -10px; }
  ```

- [margin-top](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-top) / [margin-right](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-right) / [margin-bottom](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-bottom) / [margin-left](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-left) - 分别设置四个方向的外边距

### 边框
- [border](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) - 设置边框（简写属性：宽度 样式 颜色）
  ```css
  /* 基本边框 */
  .box { border: 1px solid #ccc; }
  
  /* 只设置底部边框 */
  .input { border-bottom: 2px solid #007bff; }
  ```

- [border-width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) - 设置边框宽度
- [border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) - 设置边框样式（solid/dashed/dotted 等）
- [border-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color) - 设置边框颜色
- [border-radius](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius) - 设置边框圆角
  ```css
  /* 圆形 */
  .circle { border-radius: 50%; }
  
  /* 不同角的圆角 */
  .button { border-radius: 10px 5px 10px 5px; }
  ```

### 盒模型相关
- [box-sizing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) - 设置盒模型计算方式（content-box/border-box）
  ```css
  /* 更直观的盒模型计算 */
  * { box-sizing: border-box; }
  ```

- [box-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow) - 设置盒子阴影
  ```css
  /* 外阴影 */
  .card { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  
  /* 内阴影 */
  .inset { box-shadow: inset 0 0 5px rgba(0,0,0,0.2); }
  ```

## 2. 排版 & 定位

### 显示类型
- [display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) - 设置元素的显示类型（block/inline/flex/grid/none 等）
  ```css
  /* 隐藏元素 */
  .hidden { display: none; }
  
  /* 创建弹性容器 */
  .flex-container { display: flex; }
  
  /* 创建网格容器 */
  .grid-container { display: grid; }
  ```

### 定位
- [position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) - 设置定位方式（static/relative/absolute/fixed/sticky）
  ```css
  /* 固定定位，常用于导航栏 */
  .navbar { position: fixed; top: 0; left: 0; width: 100%; }
  
  /* 绝对定位，相对于最近的定位祖先元素 */
  .tooltip { position: absolute; top: 100%; left: 50%; }
  ```

- [top](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top) / [right](https://developer.mozilla.org/zh-CN/docs/Web/CSS/right) / [bottom](https://developer.mozilla.org/zh-CN/docs/Web/CSS/bottom) / [left](https://developer.mozilla.org/zh-CN/docs/Web/CSS/left) - 设置定位元素的位置偏移
- [z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index) - 设置元素的层叠顺序
  ```css
  /* 控制层叠顺序 */
  .modal { z-index: 1000; }
  .overlay { z-index: 999; }
  ```

### 其他布局属性
- [overflow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) - 设置内容溢出时的处理方式（visible/hidden/scroll/auto）
  ```css
  /* 隐藏溢出内容 */
  .crop { overflow: hidden; }
  
  /* 显示滚动条 */
  .scrollable { overflow: auto; max-height: 200px; }
  ```

- [float](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) / [clear](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear) - 浮动相关属性
- [vertical-align](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align) - 设置元素的垂直对齐方式

## 3. Flexbox（弹性布局）

- [flex-direction](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction) - 设置主轴方向（row/column）
  ```css
  /* 水平排列 */
  .horizontal { display: flex; flex-direction: row; }
  
  /* 垂直排列 */
  .vertical { display: flex; flex-direction: column; }
  ```

- [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) - 设置主轴对齐方式
  ```css
  /* 主轴居中对齐 */
  .center-main { display: flex; justify-content: center; }
  
  /* 两端对齐 */
  .space-between { display: flex; justify-content: space-between; }
  ```

- [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) - 设置交叉轴对齐方式
  ```css
  /* 交叉轴居中 */
  .center-cross { display: flex; align-items: center; }
  ```

- [align-self](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-self) - 设置单个项目在交叉轴上的对齐方式
- [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) - 设置是否换行（nowrap/wrap）
  ```css
  /* 允许换行 */
  .wrap { display: flex; flex-wrap: wrap; }
  ```

- [flex-flow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-flow) - flex-direction 和 flex-wrap 的简写
- [align-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content) - 设置多行弹性盒子的对齐方式
- [flex-grow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow) - 设置放大比例
  ```css
  /* 占据剩余空间 */
  .grow { flex-grow: 1; }
  ```

- [flex-shrink](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink) - 设置缩小比例
- [flex-basis](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) - 设置分配多余空间之前元素占据的主轴空间
- [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex) - flex-grow, flex-shrink 和 flex-basis 的简写
  ```css
  /* 等价于 flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
  .flex-item { flex: 1; }
  ```

- [gap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap) - 设置子项之间的间距
  ```css
  /* 设置flex子项间距 */
  .flex-container { display: flex; gap: 20px; }
  ```

## 4. Grid（网格布局）

- [grid-template-columns](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns) / [grid-template-rows](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-rows) - 定义网格的列和行
  ```css
  /* 创建三列网格 */
  .grid { 
    display: grid; 
    grid-template-columns: 1fr 2fr 1fr; 
    grid-template-rows: auto; 
  }
  
  /* 重复列 */
  .repeat-grid { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
  }
  ```

- [grid-column](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-column) / [grid-row](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-row) - 设置网格项目占据的行列范围
  ```css
  /* 跨越列 */
  .spanning-item { grid-column: 1 / 3; }
  
  /* 指定起始和结束线 */
  .specific-item { grid-column: 2 / 4; grid-row: 1 / 3; }
  ```

- [grid-template-areas](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas) - 通过命名区域定义网格模板
  ```css
  .layout {
    display: grid;
    grid-template-areas: 
      "header header header"
      "sidebar main aside"
      "footer footer footer";
    grid-template-rows: 100px 1fr 50px;
    grid-template-columns: 200px 1fr 100px;
  }
  
  .header { grid-area: header; }
  .sidebar { grid-area: sidebar; }
  .main { grid-area: main; }
  .aside { grid-area: aside; }
  .footer { grid-area: footer; }
  ```

- [grid-area](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-area) - 设置网格项目在网格中的位置和大小
- [grid-gap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap) / [gap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap) - 设置网格行列间距
  ```css
  /* 设置网格间距 */
  .spaced-grid { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr);
    gap: 20px; 
  }
  ```

- [justify-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-items) - 设置网格中所有项目在行轴的对齐方式
- [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) - 设置网格中所有项目在列轴的对齐方式
- [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) - 设置网格在容器中的行轴对齐方式
- [align-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content) - 设置网格在容器中的列轴对齐方式

## 5. 文字 & 字体

### 字体相关
- [font-size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size) - 设置字体大小
  ```css
  /* 响应式字体大小 */
  .heading { font-size: clamp(1.5rem, 4vw, 3rem); }
  
  /* 相对单位 */
  .body { font-size: 1.125rem; /* 18px */ }
  ```

- [font-weight](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight) - 设置字体粗细
  ```css
  .bold { font-weight: bold; /* 或 700 */ }
  .normal { font-weight: normal; /* 或 400 */ }
  ```

- [font-family](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family) - 设置字体族
  ```css
  .text {
    font-family: "Helvetica Neue", Arial, sans-serif;
  }
  ```

- [font-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-style) - 设置字体样式（normal/italic/oblique）

### 文本相关
- [color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color) - 设置文字颜色
  ```css
  .primary { color: #007bff; }
  .secondary { color: rgba(0,0,0,0.6); }
  ```

- [line-height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height) - 设置行高
  ```css
  /* 无单位数值，相对于当前字体大小 */
  .readable { line-height: 1.6; }
  ```

- [text-align](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align) - 设置文本水平对齐方式
  ```css
  .centered { text-align: center; }
  .right-aligned { text-align: right; }
  ```

- [text-decoration](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration) - 设置文本装饰（underline/overline/line-through/none）
  ```css
  .link { text-decoration: none; }
  .strike { text-decoration: line-through; }
  ```

- [text-transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform) - 控制文本的大小写（uppercase/lowercase/capitalize）
  ```css
  .uppercase { text-transform: uppercase; }
  .capitalize { text-transform: capitalize; }
  ```

- [white-space](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space) - 设置如何处理元素内的空白
  ```css
  /* 保持原有格式 */
  .preformatted { white-space: pre; }
  ```

- [word-break](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break) - 设置单词换行规则
- [word-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap) / [overflow-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap) - 设置长单词或URL地址换行规则
- [letter-spacing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/letter-spacing) - 设置字符间距
  ```css
  .spaced { letter-spacing: 2px; }
  ```

- [text-overflow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-overflow) - 设置文本溢出时的处理方式
  ```css
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ```

## 6. 背景 & 边框

### 背景
- [background](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background) - 背景简写属性
  ```css
  /* 渐变背景 */
  .gradient { 
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
  }
  
  /* 图片背景 */
  .bg-image {
    background: url('image.jpg') center/cover no-repeat;
  }
  ```

- [background-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color) - 设置背景颜色
- [background-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image) - 设置背景图像
- [background-repeat](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat) - 设置背景图像的重复方式
- [background-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position) - 设置背景图像的位置
- [background-size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size) - 设置背景图像的尺寸
  ```css
  /* 覆盖整个容器 */
  .cover { background-size: cover; }
  
  /* 包含在容器内 */
  .contain { background-size: contain; }
  ```

- [background-attachment](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment) - 设置背景图像是否固定或随页面滚动

### 边框扩展
- [border-top](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top) / [border-right](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-right) / [border-bottom](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom) / [border-left](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-left) - 分别设置四边的边框
- [border-top-left-radius](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-left-radius) / [border-top-right-radius](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-right-radius) / [border-bottom-right-radius](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-right-radius) / [border-bottom-left-radius](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-left-radius) - 分别设置四个角的圆角

## 7. 变形/动画/交互

### 变形
- [transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) - 应用变换（translate/scale/rotate/skew 等）
  ```css
  /* 平移 */
  .moved { transform: translateX(100px); }
  
  /* 缩放 */
  .scaled { transform: scale(1.2); }
  
  /* 旋转 */
  .rotated { transform: rotate(45deg); }
  
  /* 组合变换 */
  .combined { transform: translateX(50px) scale(1.1) rotate(10deg); }
  ```

- [transform-origin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin) - 设置变换原点

### 过渡动画
- [transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition) - 过渡效果简写属性
  ```css
  /* 基本过渡 */
  .button {
    background-color: blue;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: darkblue;
  }
  
  /* 多属性过渡 */
  .smooth {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .smooth.hidden {
    opacity: 0;
    transform: translateY(-10px);
  }
  ```

- [transition-property](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-property) - 指定应用过渡效果的CSS属性
- [transition-duration](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-duration) - 指定过渡效果的持续时间
- [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function) - 指定过渡效果的时间曲线
- [transition-delay](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-delay) - 指定过渡效果的延迟时间

### 关键帧动画
- [animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation) - 动画简写属性
  ```css
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .slide-in {
    animation: slideIn 0.5s ease-out;
  }
  
  /* 无限循环动画 */
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .spinner {
    animation: spin 1s linear infinite;
  }
  ```

- [animation-name](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-name) - 指定要使用的动画名称
- [animation-duration](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-duration) - 指定动画完成一个周期所需的时间
- [animation-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function) - 指定动画的速度曲线
- [animation-delay](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-delay) - 指定动画开始前的延迟时间
- [animation-iteration-count](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-iteration-count) - 指定动画播放的次数
- [animation-direction](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction) - 指定动画播放的方向
- [animation-fill-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode) - 指定动画在执行前后如何应用样式
- [animation-play-state](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-play-state) - 指定动画是否正在运行或暂停

### 交互相关
- [cursor](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor) - 设置鼠标指针悬停时的光标类型
  ```css
  .pointer { cursor: pointer; }
  .not-allowed { cursor: not-allowed; }
  ```

- [opacity](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity) - 设置元素的透明度
  ```css
  .transparent { opacity: 0.5; }
  ```

- [visibility](https://developer.mozilla.org/zh-CN/docs/Web/CSS/visibility) - 设置元素是否可见
  ```css
  .invisible { visibility: hidden; } /* 隐藏但仍占据空间 */
  ```

## 8. 响应式设计

### 媒体查询
- [@media](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media) - 媒体查询，用于根据不同设备特性应用不同样式
  ```css
  /* 移动优先设计 */
  .responsive-card {
    padding: 1rem;
  }
  
  @media (min-width: 768px) {
    .responsive-card {
      padding: 2rem;
      font-size: 1.25rem;
    }
  }
  
  @media (min-width: 1024px) {
    .responsive-card {
      padding: 3rem;
      font-size: 1.5rem;
    }
  }
  
  /* 暗色主题 */
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #1a1a1a;
      color: #ffffff;
    }
  }
  
  /* 减少动画 */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

### 单位
- [rem](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) - 相对于根元素字体大小的单位
- [em](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) - 相对于父元素字体大小的单位
- [%](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage) - 百分比单位
- [vw](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) / [vh](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) - 视窗宽度和高度的百分比单位
  ```css
  /* 全屏元素 */
  .fullscreen { 
    width: 100vw; 
    height: 100vh; 
  }
  
  /* 响应式字体 */
  .responsive-text { 
    font-size: calc(1rem + 1vw); 
  }
  ```

## 9. 现代CSS特性

- [aspect-ratio](https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio) - 设置元素的宽高比
  ```css
  /* 保持16:9宽高比 */
  .video {
    aspect-ratio: 16 / 9;
    width: 100%;
  }
  ```

- [backdrop-filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter) - 为元素背后区域应用图形效果（如模糊）
  ```css
  /* 毛玻璃效果 */
  .glass {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.1);
  }
  ```

- [clip-path](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path) - 创建元素的裁剪区域
  ```css
  /* 创建圆形裁剪 */
  .circle-img {
    clip-path: circle(50% at 50% 50%);
  }
  ```

## 使用建议

1. **尺寸优先** - 先确定元素的基本尺寸（width/height/padding/margin/border）
2. **布局选择** - 根据需求选择合适的布局方式（display/position/flex/grid）
3. **字体设置** - 设置文字样式（font-size/color/line-height）
4. **装饰美化** - 添加视觉效果（background/border-radius/box-shadow/transform）
5. **响应适配** - 实现不同设备的适配（@media + rem/vw/max-width）

将此清单作为参考，可以解决大部分CSS样式需求。