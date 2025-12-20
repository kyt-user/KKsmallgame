# JavaScript 常用方法和属性清单

本文档总结了在 KKsmallgame 项目的 JavaScript 代码中使用的常见方法和属性，并补充了一些前端开发中常用的其他方法和属性。

## 1. 数据类型相关方法和属性

### 字符串(String)相关
- [String.length](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length) - 返回字符串的长度
- [String.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice) - 提取字符串的一部分并返回新字符串
- [String.split()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) - 使用指定分隔符将字符串分割成数组
- [String.replace()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) - 替换字符串中的部分内容
- [String.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes) - 判断字符串是否包含指定子串
- [String.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) - 返回表示该对象的字符串
- [String.match()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) - 使用正则表达式检索字符串
- [String.trim()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trim) - 去除字符串两端的空白字符

### 数组(Array)相关
- [Array.length](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) - 设置或返回数组元素的个数
- [Array.unshift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) - 向数组开头添加一个或多个元素
- [Array.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) - 返回数组的一部分（浅拷贝）
- [Array.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) - 对数组的每个元素执行一次给定的函数
- [Array.push()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) - 向数组末尾添加一个或多个元素
- [Array.pop()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) - 删除并返回数组的最后一个元素
- [Array.shift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) - 删除并返回数组的第一个元素
- [Array.join()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join) - 将数组元素连接成字符串
- [Array.filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - 创建一个符合回调函数条件的新数组
- [Array.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) - 创建一个由回调函数返回值组成的新数组
- [Array.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) - 查找元素在数组中的索引

### 数字(Number)相关
- [Number.toFixed()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) - 返回指定小数位数的字符串表示
- [Number.toExponential()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential) - 返回指数表示法的字符串
- [parseFloat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) - 解析字符串并返回浮点数
- [parseInt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt) - 解析字符串并返回整数
- [isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN) - 判断值是否为 NaN

### 对象(Object)相关
- [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) - 返回对象自身可枚举属性组成的数组
- [Object.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values) - 返回对象自身可枚举属性值组成的数组
- [Object.entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) - 返回对象自身可枚举属性的键值对数组

## 2. DOM 操作相关方法和属性

### Document 方法
- [document.getElementById()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById) - 通过ID获取元素
- [document.addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) - 向文档添加事件监听器
- [document.createElement()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement) - 创建指定的HTML元素
- [document.querySelector()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector) - 返回文档中匹配指定选择器的第一个元素
- [document.querySelectorAll()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll) - 返回文档中匹配指定选择器的所有元素组成的 NodeList

### Element 属性和方法
- [element.textContent](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent) - 获取或设置节点及其后代的文本内容
- [element.innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML) - 获取或设置元素内的HTML或XML标记
- [element.className](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/className) - 获取或设置元素的class属性
- [element.classList](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList) - 返回元素的CSS类列表
- [element.appendChild()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild) - 向节点的子节点列表末尾添加新子节点
- [element.removeChild()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild) - 删除一个子节点
- [element.setAttribute()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute) - 设置元素的属性值
- [element.getAttribute()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getAttribute) - 获取元素的属性值
- [element.style](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/style) - 获取或设置元素的内联样式

### ClassList 方法
- [classList.add()](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/add) - 添加指定的类值
- [classList.remove()](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/remove) - 删除指定的类值
- [classList.contains()](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/contains) - 判断元素是否包含指定的类
- [classList.toggle()](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/toggle) - 切换指定的类

### NodeList 方法
- [NodeList.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/forEach) - 对 NodeList 中的每个元素执行一次给定的函数

## 3. 事件相关

### Event 对象
- [event.key](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key) - 返回按下的键值
- [event.preventDefault()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault) - 阻止事件的默认行为
- [event.target](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target) - 获取触发事件的元素
- [event.type](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/type) - 获取事件的类型

### 常用事件类型
- click - 鼠标点击事件
- keydown - 键盘按下事件
- keyup - 键盘释放事件
- load - 页面加载完成事件
- DOMContentLoaded - DOM内容加载完成事件

## 4. 全局对象和函数

### Date 对象
- [new Date()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) - 创建Date实例
- [Date.prototype.toLocaleTimeString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString) - 返回该日期对象时间部分的字符串
- [Date.now()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/now) - 返回当前时间的时间戳

### 全局函数
- [setTimeout()](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout) - 设置延时执行函数
- [setInterval()](https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval) - 设置周期性执行函数
- [clearTimeout()](https://developer.mozilla.org/zh-CN/docs/Web/API/clearTimeout) - 取消由 setTimeout 设置的定时器
- [clearInterval()](https://developer.mozilla.org/zh-CN/docs/Web/API/clearInterval) - 取消由 setInterval 设置的定时器
- [Function() 构造器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/Function) - 创建新的Function对象
- [JSON.parse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) - 将 JSON 字符串解析为对象
- [JSON.stringify()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) - 将对象转换为 JSON 字符串

## 5. 控制结构和函数

### 条件语句
- if...else - 条件判断语句
- switch - 多分支选择语句

### 循环语句
- for - 循环语句
- for...of - 遍历可迭代对象
- for...in - 遍历对象属性

### 函数相关
- function - 函数声明
- arrow function (=>) - 箭头函数
- return - 返回函数结果

## 6. 正则表达式
- [正则表达式语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions) - 用于字符串匹配和替换
- [RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) - 正则表达式对象

## 7. 数学方法
- [Math.random()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random) - 返回 0 到 1 之间的随机数
- [Math.floor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) - 向下取整
- [Math.ceil()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) - 向上取整
- [Math.round()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round) - 四舍五入
- [Math.max()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max) - 返回最大值
- [Math.min()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/min) - 返回最小值
- [Math.abs()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/abs) - 返回绝对值

## 8. 控制台调试
- [console.log()](https://developer.mozilla.org/zh-CN/docs/Web/API/console/log) - 在控制台输出信息
- [console.error()](https://developer.mozilla.org/zh-CN/docs/Web/API/console/error) - 在控制台输出错误信息
- [console.warn()](https://developer.mozilla.org/zh-CN/docs/Web/API/console/warn) - 在控制台输出警告信息