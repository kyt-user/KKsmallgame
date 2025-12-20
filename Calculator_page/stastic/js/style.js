// clearAll()           // C 键：清空表达式和结果
// clearEntry()         // CE 键：只清空当前输入
// deleteLast()         // ⌫ 键：退格删除最后一位
// appendNumber(n)      // 0-9 键：把数字接到表达式
// appendOperator(op)   // + - * / 键：把运算符接到表达式
// appendDecimal()      // . 键：添加小数点并防重复
// calculate()          // = 键：计算结果并写历史
// updateDisplay()      // 私有工具：把表达式和结果刷到屏幕
// addToHistory(expr, res) // 工具：把一次计算压入历史列表
// updateHistoryDisplay()  // 工具：把历史数组渲染到页面

let currentExpression = '';   // 草稿纸空白
let currentResult     = '0';  // 屏幕先显示 0
let history           = [];   // 小本本还没字
let shouldResetDisplay = false; // 下一次按键要不要先清空屏幕

// updateDisplay() 函数：把表达式和结果刷到屏幕
function updateDisplay() {
  // .textContent 属性：安全地读取或设置元素内部的纯文本内容
  document.getElementById("expression").textContent = currentExpression;
  document.getElementById("result").textContent = currentResult;
}

// clearAll() 函数：C 键：清空表达式和结果
function clearAll() {
    currentExpression = '';
    currentResult = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

// clearEntry() 函数：CE 键：只清空当前输入
function clearEntry() {
    currentExpression = '';
    updateDisplay();
}

// deleteLast() 函数：⌫ 键：退格删除最后一位
function deleteLast() {
    if(currentExpression.length > 0) {
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay();
    }
}

// appendNumber(n) 函数：把数字接到表达式
function appendNumber(n) {
    // 擦除草稿纸
    if (shouldResetDisplay) {
        currentExpression = '';
        shouldResetDisplay = false;
    }
    // 防止多个前导零
    if (currentExpression === '0' && n === '0') return;
    if (currentExpression === '0' && n !== '0') {
        currentExpression = n;
    } else {
        currentExpression += n;
    }
    updateDisplay();
}

// appendOperator(op) 函数：把运算符接到表达式
function appendOperator(op) {
    if (shouldResetDisplay) {
        currentExpression = currentResult;
        shouldResetDisplay = false;
    }
    //防止连续运算符输入
    const lastChar = currentExpression.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentExpression = currentExpression.slice(0, -1);
    }
    currentExpression += op;
    updateDisplay();
}

// appendDecimal() 函数：添加小数点并防重复
function appendDecimal() {
    if (shouldResetDisplay) {
        currentExpression = '0';
        shouldResetDisplay = false;
    }
    // 获取当前数字部分
    const parts = currentExpression.split(/[\+\-\*\/]/);
    const currentNumber = parts[parts.length - 1];

    // 如果当前数字包含小数点，则不再添加
    if (currentNumber.includes('.')) return;
    // 如果当前数字为空或运算符后，加0
    if (currentNumber === '' || ['+', '-', '*', '/'].includes(currentExpression.slice(-1))) {
        currentExpression += '0.';
    } else {
        currentExpression += '.'
    }
    updateDisplay();
}

// addToHistory(expr, res) 函数：把一次计算压入历史列表
function addToHistory(expr, res) {
    const historyItem = {
      expr: expr,
      res: res,
      timestamp: new Date().toLocaleTimeString(),
    };
    history.unshift(historyItem);
    // 只保留最近十条
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    updateHistoryDisplay();
}

// calculate() 函数：计算结果并写历史
function calculate() {
    if (currentExpression === '') return;

    if (currentExpression === '') return;

    try {
        // 安全地计算表达式
        let expression = currentExpression.replace(/×|x/g, '*').replace(/÷/g, '/');
        // 使用 Function 构造器而不是 eval 来计算表达式
        let result = new Function('return ' + expression)();
        
        // 格式化结果
        if (result.toString().length > 12) {
            currentResult = result.toExponential(6);
        } else {
            currentResult = parseFloat(result.toFixed(10)).toString();
        }
        
        // 添加到历史记录
        addToHistory(currentExpression, currentResult);
        
        // 设置下次输入前重置显示屏
        shouldResetDisplay = true;
    } catch (error) {
        currentResult = '错误';
        document.getElementById("result").classList.add('error');
        setTimeout(() => {
            document.getElementById("result").classList.remove('error');
        }, 1000);
    }
    
    updateDisplay();
}

// updateHistoryDisplay() 函数：把历史数组渲染到页面
function updateHistoryDisplay() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML =
      '<div style="color: #999; text-align: center;">暂无历史记录</div>';
    return;
  }

  history.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = `${item.expr} = ${item.res}`;
    historyList.appendChild(historyItem);
  });
}

// 键盘支持
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

// 初始化显示
updateDisplay();
updateHistoryDisplay();