下面把「写页面时最常用、最通用」的 CSS 参数（属性）按功能分组，做成“一张表带走」。只列**实战出场率最高**的值型属性，不列冷门或已废弃的。

---

### 1. 盒模型 & 尺寸
```
width / height           // 宽、高
max-width / max-height   // 最大尺寸，做自适应必备
padding                  // 内边距
margin                   // 外边距
border                   // 三合一：宽度-样式-颜色
border-radius            // 圆角
box-sizing               // 常用值 border-box（把 padding 算进总宽）
box-shadow               // 投影
```

---

### 2. 排版 & 定位
```
display        // block / inline / flex / grid / none
position       // static / relative / absolute / fixed / sticky
top / right / bottom / left   // 配合 position 使用
z-index        // 层叠顺序
overflow       // visible / hidden / scroll / auto
float / clear  // 浮动（旧布局，偶尔用）
```

---

### 3. Flexbox（一维布局高频）
```
justify-content  // 主轴对齐：flex-start / center / space-between...
align-items      // 交叉轴对齐：stretch / center...
flex             // 缩写：flex-grow shrink basis
flex-wrap        // 换行 nowrap / wrap
gap              // 子项间距（Flex & Grid 都能用）
```

---

### 4. Grid（二维布局）
```
grid-template-columns / rows   // 列/行轨道
grid-column / grid-row         // 子项跨轨道
gap                            // 行列间距
```

---

### 5. 文字 & 字体
```
font-size   // 字号
font-weight // 粗细 400 / 700
font-family // 字体栈
color       // 文字颜色
line-height // 行高（数字无单位最常用）
text-align  // left / center / right / justify
text-decoration  // none / underline
white-space    // nowrap / pre / normal
```

---

### 6. 背景 & 边框
```
background        // 颜色、图片、渐变三合一
background-color  // 单背景色
background-image  // url() 或 linear-gradient()
background-size   // cover / contain / 100% 100%
background-position / background-repeat
border / border-radius / border-left...
```

---

### 7. 变形/动画/交互
```
transform  // translate(x,y) / scale / rotate / skew
transition // 简写：property duration timing-function delay
animation  // 简写：name duration timing-function delay iteration-count direction
cursor     // pointer / default / not-allowed
opacity    // 0-1 透明度
visibility // visible / hidden（仍占位）
```

---

### 8. 响应式必备
```
@media (max-width: 768px){ ... }   // 断点查询
rem / em / % / vw / vh            // 相对单位
max-width / min-width             // 流动布局核心
```

---

### 9. 新特性（兼容性已很好）
```
aspect-ratio     // 固定宽高比 16/9
backdrop-filter  // 毛玻璃 blur(10px)
gap              // Flex & Grid 统一间距
```

---

### 使用口诀
1. **尺寸**先定（width/height/padding/margin/border）  
2. **排版**再选（display/position/flex/grid）  
3. **字体**跟上（font-size/color/line-height）  
4. **装饰**收尾（background/border-radius/box-shadow/transform）  
5. **响应**收尾（@media + rem/vw/max-width）

把这张表贴在桌前，80 % 的样式需求都能快速拼出来。