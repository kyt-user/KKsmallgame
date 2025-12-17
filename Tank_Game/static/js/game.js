// 版本选择逻辑 - 为桌面版和移动版按钮添加点击事件监听器
document.getElementById('desktopVersion').addEventListener('click', () => {
    document.getElementById('versionSelect').style.display = 'none';
    initGame(false); // 初始化桌面版游戏
});

document.getElementById('mobileVersion').addEventListener('click', () => {
    document.getElementById('versionSelect').style.display = 'none';
    initGame(true); // 初始化移动版游戏
});

/**
 * 游戏初始化函数
 * @param {boolean} isMobile - 是否为移动版游戏
 */
function initGame(isMobile) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'flex';

    // 根据设备类型添加或移除移动端布局类
    if (isMobile) {
        gameContainer.classList.add('mobile-layout');
    } else {
        gameContainer.classList.remove('mobile-layout');
    }

    // 获取游戏所需的DOM元素
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const moveStick = document.getElementById('moveStick');
    const knob = moveStick ? moveStick.querySelector('.knob') : null;
    const fireBtn = document.getElementById('fireBtn');
    const countdownOverlay = document.getElementById('countdownOverlay');
    const restartBtn = document.getElementById('restartBtn');

    // 设置canvas尺寸以适应窗口大小
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - document.getElementById('topBar').offsetHeight - (isMobile ? 140 : 0);
    }

    window.addEventListener('resize', resize);
    resize();

    // 游戏常量定义
    const TANK = { 
        WIDTH: 36, 
        HEIGHT: 36, 
        SPEED: 3, 
        BULLET_SPEED: 7, 
        FIRE_COOLDOWN: 400 
    };
    
    let W = canvas.width, H = canvas.height;

    // 游戏变量初始化
    let gameMode = '1v1'; // '1v1' 或 '2v2'
    let gameStarted = false;
    let countdownValue = 3;
    let countdownInterval;
    let players = [];
    let gameOver = false;
    let gameLoopId;

    /**
     * 玩家类 - 定义玩家坦克的属性和方法
     */
    class Player {
        constructor(id, x, y, angle, color, isControlled = false) {
            this.id = id;                 // 玩家ID
            this.x = x;                   // X坐标
            this.y = y;                   // Y坐标
            this.angle = angle;           // 坦克朝向角度
            this.color = color;           // 坦克颜色
            this.hp = 100;                // 生命值
            this.lastFire = 0;            // 上次开火时间
            this.bullets = [];            // 子弹数组
            this.isControlled = isControlled; // 是否为玩家控制

            // 为AI玩家添加额外属性
            if (!isControlled && !isMobile) {
                this.aiCd = 0;
            }
        }
    }

    /**
     * 初始化玩家 - 根据游戏模式和设备类型创建玩家
     */
    function initPlayers() {
        players = [];

        if (gameMode === '1v1') {
            if (isMobile) {
                // 移动版1v1模式: 玩家1 vs 玩家2
                players.push(new Player(1, 80, H/2, 0, '#ff6b6b', true));  // 玩家控制
                players.push(new Player(2, W-80, H/2, Math.PI, '#4ecdc4')); // AI控制
            } else {
                // 桌面版1v1模式: 玩家1 vs 玩家2
                players.push(new Player(1, 80, H/2, 0, '#ff6b6b', true));   // 玩家1控制
                players.push(new Player(2, W-80, H/2, Math.PI, '#4ecdc4')); // 玩家2控制
            }
        } else {
            if (isMobile) {
                // 移动版2v2模式: 玩家1+玩家3 vs Kimi(AI)+对手(AI)
                players.push(new Player(1, 80, H/3, 0, '#ff6b6b', true));   // 玩家控制
                players.push(new Player(2, W-80, H/3, Math.PI, '#4ecdc4'));  // AI控制
                players.push(new Player(3, 80, 2*H/3, 0, '#ffe66d', true)); // 玩家控制
                players.push(new Player(4, W-80, 2*H/3, Math.PI, '#6a0572')); // AI控制
            } else {
                // 桌面版2v2模式: 玩家1+玩家2 vs 玩家3+玩家4
                players.push(new Player(1, 80, H/4, 0, '#ff6b6b', true));     // 玩家1控制
                players.push(new Player(2, 80, 3*H/4, 0, '#4ecdc4', true));   // 玩家2控制
                players.push(new Player(3, W-80, H/4, Math.PI, '#ffe66d', true)); // 玩家3控制
                players.push(new Player(4, W-80, 3*H/4, Math.PI, '#6a0572', true)); // 玩家4控制
            }
        }
    }

    /**
     * 绘制坦克
     * @param {Player} tank - 要绘制的坦克对象
     */
    function drawTank(tank) {
        ctx.save();
        ctx.translate(tank.x, tank.y);
        ctx.rotate(tank.angle);
        ctx.fillStyle = tank.color;
        ctx.fillRect(-TANK.WIDTH/2, -TANK.HEIGHT/2, TANK.WIDTH, TANK.HEIGHT);
        ctx.fillStyle = '#000';
        ctx.fillRect(TANK.WIDTH/2-4, -3, 18, 6);

        // 绘制坦克顶部装饰 (仅桌面版)
        if (!isMobile) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(-TANK.WIDTH/2 + 4, -TANK.HEIGHT/2 + 4, TANK.WIDTH - 8, 6);
        }

        ctx.restore();

        // 绘制血条
        ctx.fillStyle = '#000';
        ctx.fillRect(tank.x-22, tank.y-TANK.HEIGHT/2-12, 44, 6);
        ctx.fillStyle = tank.color;
        ctx.fillRect(tank.x-22, tank.y-TANK.HEIGHT/2-12, (tank.hp/100)*44, 6);
    }

    /**
     * 绘制子弹
     * @param {Array} bullets - 子弹数组
     * @param {string} color - 子弹颜色
     */
    function drawBullets(bullets, color) {
        ctx.fillStyle = color;
        if (isMobile) {
            // 移动版使用方形子弹
            bullets.forEach(bullet => ctx.fillRect(bullet.x-3, bullet.y-3, 6, 6));
        } else {
            // 桌面版使用圆形子弹
            bullets.forEach(bullet => {
                ctx.beginPath();
                ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }

    /**
     * 更新子弹位置并移除超出边界的子弹
     * @param {Array} bullets - 子弹数组
     */
    function updateBullets(bullets) {
        for (let i = bullets.length-1; i >= 0; i--) {
            let bullet = bullets[i];
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;
            // 移除超出边界的子弹
            if (bullet.x < -10 || bullet.x > W + 10 || bullet.y < -10 || bullet.y > H + 10) {
                bullets.splice(i, 1);
            }
        }
    }

    /**
     * 计算两个对象之间的距离
     * @param {Object} obj1 - 第一个对象
     * @param {Object} obj2 - 第二个对象
     * @returns {number} 两个对象之间的距离
     */
    function getDistance(obj1, obj2) {
        return Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
    }

    /**
     * 检查子弹是否击中坦克
     * @param {Player} tank - 坦克对象
     * @param {Object} bullet - 子弹对象
     * @returns {boolean} 是否击中
     */
    function isHit(tank, bullet) {
        return getDistance(tank, bullet) < TANK.WIDTH/2 + 4;
    }

    /**
     * 检查所有子弹的命中情况
     */
    function checkHits() {
        // 检查子弹击中坦克
        players.forEach(shooter => {
            // 从后往前遍历，避免索引问题
            for (let i = shooter.bullets.length - 1; i >= 0; i--) {
                let bullet = shooter.bullets[i];
                let hit = false;
                
                // 检查是否击中任何敌方坦克
                for (let j = 0; j < players.length; j++) {
                    let target = players[j];
                    // 排除自己
                    if (target.id !== shooter.id && isHit(target, bullet)) {
                        target.hp -= 25;
                        // 移除子弹
                        shooter.bullets.splice(i, 1);
                        hit = true;
                        
                        // 检查目标是否死亡
                        if (target.hp <= 0) {
                            checkGameOver();
                        }
                        break;
                    }
                }
            }
        });
    }

    /**
     * 检查游戏是否结束
     */
    function checkGameOver() {
        // 获取所有存活的玩家
        const alivePlayers = players.filter(player => player.hp > 0);

        // 如果存活玩家少于等于1个，则游戏结束
        if (alivePlayers.length <= 1) {
            gameOver = true;

            if (alivePlayers.length === 1) {
                // 有玩家获胜
                const winner = alivePlayers[0];
                if (isMobile) {
                    // 移动版显示胜负信息
                    if (winner.isControlled) {
                        document.getElementById('finalTxt').textContent = `你方获胜！`;
                    } else {
                        document.getElementById('finalTxt').textContent = `电脑获胜！`;
                    }
                } else {
                    // 桌面版显示获胜玩家编号
                    document.getElementById('finalTxt').textContent = `玩家${winner.id}获胜！`;
                }
            } else {
                // 平局
                document.getElementById('finalTxt').textContent = '平局！';
            }

            // 显示游戏结束界面
            document.getElementById('pauseMask').style.display = 'flex';
        }
    }

    /**
     * 更新玩家分数显示
     */
    function updateScores() {
        players.forEach(player => {
            document.getElementById(`player${player.id}HP`).textContent = Math.max(0, player.hp);
        });
    }

    /**
     * AI控制逻辑
     * @param {Player} aiPlayer - AI控制的玩家
     * @param {Player} targetPlayer - 目标玩家
     */
    function aiControl(aiPlayer, targetPlayer) {
        // 游戏结束或未开始时不执行AI逻辑
        if (gameOver || !gameStarted || !aiPlayer || !targetPlayer) return;

        // 计算朝向目标的角度
        let dx = targetPlayer.x - aiPlayer.x;
        let dy = targetPlayer.y - aiPlayer.y;
        let targetAngle = Math.atan2(dy, dx);
        aiPlayer.angle = targetAngle;

        // 检测是否处于危险中（附近有子弹）
        let danger = players.some(player => 
            player !== aiPlayer && 
            player.bullets.some(bullet => Math.abs(bullet.vx) > 0 && Math.abs(bullet.x - aiPlayer.x) < 150)
        );

        // 根据是否处于危险中采取不同行动
        if (danger) {
            // 处于危险中时，侧向移动躲避
            let perpAngle = aiPlayer.angle + Math.PI/2;
            aiPlayer.y += Math.sin(perpAngle) * 2;
        } else {
            // 安全时，轻微移动
            aiPlayer.x += (Math.sin(Date.now()/600) > 0 ? 1 : -1) * 1.2;
            aiPlayer.y += (Math.sin(Date.now()/600) > 0 ? 1 : -1) * 1.2;
        }

        // 添加边界检查，防止坦克超出地图范围
        aiPlayer.x = Math.max(TANK.WIDTH/2, Math.min(W - TANK.WIDTH/2, aiPlayer.x));
        aiPlayer.y = Math.max(TANK.HEIGHT/2, Math.min(H - TANK.HEIGHT/2, aiPlayer.y));

        // 控制开火频率
        if (Date.now() - aiPlayer.lastFire > 600 + Math.random() * 400) {
            aiPlayer.bullets.push({
                x: aiPlayer.x, 
                y: aiPlayer.y, 
                vx: Math.cos(aiPlayer.angle) * TANK.BULLET_SPEED, 
                vy: Math.sin(aiPlayer.angle) * TANK.BULLET_SPEED
            });
            aiPlayer.lastFire = Date.now();
        }
    }

    // 移动控制向量和开火状态
    let moveVector = {x: 0, y: 0};
    let firing = false;

    /**
     * 处理玩家控制逻辑
     */
    function handleControls() {
        // 游戏未开始时不处理控制
        if (!gameStarted) return;

        if (isMobile) {
            // 移动版控制逻辑
            const controlledPlayers = players.filter(player => player.isControlled);

            controlledPlayers.forEach(player => {
                // 根据摇杆方向移动
                player.x += moveVector.x * TANK.SPEED;
                player.y += moveVector.y * TANK.SPEED;

                // 根据摇杆方向调整坦克朝向
                if (moveVector.x !== 0 || moveVector.y !== 0) {
                    player.angle = Math.atan2(moveVector.y, moveVector.x);
                }

                // 边界检查
                if (player.x < TANK.WIDTH/2) player.x = TANK.WIDTH/2;
                if (player.x > W - TANK.WIDTH/2) player.x = W - TANK.WIDTH/2;
                if (player.y < TANK.HEIGHT/2) player.y = TANK.HEIGHT/2;
                if (player.y > H - TANK.HEIGHT/2) player.y = H - TANK.HEIGHT/2;

                // 处理开火逻辑
                if (firing && Date.now() - player.lastFire > TANK.FIRE_COOLDOWN) {
                    player.bullets.push({
                        x: player.x, 
                        y: player.y, 
                        vx: Math.cos(player.angle) * TANK.BULLET_SPEED, 
                        vy: Math.sin(player.angle) * TANK.BULLET_SPEED
                    });
                    player.lastFire = Date.now();
                }
            });
        } else {
            // 桌面版控制逻辑
            let keys = window.gameKeys || {};

            players.forEach(player => {
                // 只处理受玩家控制的坦克
                if (!player.isControlled || !player.controls) return;

                const controls = player.controls;

                // 处理移动控制
                let dx = 0, dy = 0;
                if (keys[controls.up]) dy -= 1;
                if (keys[controls.down]) dy += 1;
                if (keys[controls.left]) dx -= 1;
                if (keys[controls.right]) dx += 1;

                player.x += dx * TANK.SPEED;
                player.y += dy * TANK.SPEED;

                // 根据移动方向调整坦克朝向
                if (dx !== 0 || dy !== 0) {
                    player.angle = Math.atan2(dy, dx);
                }

                // 边界限制
                player.x = Math.max(TANK.WIDTH/2, Math.min(W - TANK.WIDTH/2, player.x));
                player.y = Math.max(TANK.HEIGHT/2, Math.min(H - TANK.HEIGHT/2, player.y));

                // 处理开火控制
                if (keys[controls.fire] && Date.now() - player.lastFire > TANK.FIRE_COOLDOWN) {
                    player.bullets.push({
                        x: player.x,
                        y: player.y,
                        vx: Math.cos(player.angle) * TANK.BULLET_SPEED,
                        vy: Math.sin(player.angle) * TANK.BULLET_SPEED
                    });
                    player.lastFire = Date.now();
                }
            });
        }
    }

    // 存储事件监听器，以便在重置时移除
    let stickEventListeners = [];
    let fireButtonEventListeners = [];
    let keyboardEventListeners = [];

    /**
     * 移除之前绑定的事件监听器
     */
    function removeEventListeners() {
        // 移除虚拟摇杆事件监听器
        if (isMobile && moveStick) {
            stickEventListeners.forEach(({ event, handler }) => {
                moveStick.removeEventListener(event, handler);
            });
            stickEventListeners = [];

            // 移除开火按钮事件监听器
            if (fireBtn) {
                fireButtonEventListeners.forEach(({ event, handler }) => {
                    fireBtn.removeEventListener(event, handler);
                });
                fireButtonEventListeners = [];
            }
        }

        // 移除键盘事件监听器
        if (!isMobile) {
            keyboardEventListeners.forEach(({ event, handler }) => {
                window.removeEventListener(event, handler);
            });
            keyboardEventListeners = [];
        }
    }

    /**
     * 绑定控制事件监听器
     */
    function bindControlEvents() {
        // 移除之前的事件监听器
        removeEventListeners();

        // 虚拟摇杆控制 (仅移动版)
        if (isMobile && moveStick) {
            let stickActive = false;

            /**
             * 处理虚拟摇杆触摸事件
             * @param {TouchEvent} e - 触摸事件
             */
            function handleStick(e) {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = moveStick.getBoundingClientRect();
                const centerX = rect.left + rect.width/2;
                const centerY = rect.top + rect.height/2;
                let x = touch.clientX - centerX;
                let y = touch.clientY - centerY;
                let distance = Math.hypot(x, y);
                let maxDistance = rect.width/2 - 20;

                // 限制摇杆移动范围
                if (distance > maxDistance) {
                    x = x/distance * maxDistance;
                    y = y/distance * maxDistance;
                    distance = maxDistance;
                }

                // 更新摇杆位置
                knob.style.transform = `translate(${x}px, ${y}px)`;
                moveVector.x = x/maxDistance;
                moveVector.y = y/maxDistance;

                // 更新坦克朝向
                const controlledPlayers = players.filter(player => player.isControlled);
                if (controlledPlayers.length > 0 && (moveVector.x !== 0 || moveVector.y !== 0)) {
                    controlledPlayers[0].angle = Math.atan2(moveVector.y, moveVector.x);
                }
            }

            // 添加触摸事件监听器并存储引用
            const touchStartHandler = (e) => {
                stickActive = true;
                handleStick(e);
            };
            
            const touchMoveHandler = (e) => {
                if (stickActive) handleStick(e);
            };
            
            const touchEndHandler = (e) => {
                stickActive = false;
                moveVector = {x: 0, y: 0};
                knob.style.transform = 'translate(-50%, -50%)';
            };

            moveStick.addEventListener('touchstart', touchStartHandler);
            moveStick.addEventListener('touchmove', touchMoveHandler);
            moveStick.addEventListener('touchend', touchEndHandler);
            
            // 存储事件监听器引用
            stickEventListeners.push(
                { event: 'touchstart', handler: touchStartHandler },
                { event: 'touchmove', handler: touchMoveHandler },
                { event: 'touchend', handler: touchEndHandler }
            );

            // 添加开火按钮事件监听器
            if (fireBtn) {
                const fireTouchStartHandler = (e) => {
                    firing = true;
                    e.preventDefault();
                };

                const fireTouchEndHandler = (e) => {
                    firing = false;
                    e.preventDefault();
                };

                fireBtn.addEventListener('touchstart', fireTouchStartHandler);
                fireBtn.addEventListener('touchend', fireTouchEndHandler);
                
                // 存储事件监听器引用
                fireButtonEventListeners.push(
                    { event: 'touchstart', handler: fireTouchStartHandler },
                    { event: 'touchend', handler: fireTouchEndHandler }
                );
            }
        }

        // 键盘控制 (仅桌面版)
        if (!isMobile) {
            window.gameKeys = {};

            // 添加键盘事件监听器并存储引用
            const keyDownHandler = (e) => {
                window.gameKeys[e.key.toLowerCase()] = true;
            };

            const keyUpHandler = (e) => {
                window.gameKeys[e.key.toLowerCase()] = false;
            };

            window.addEventListener('keydown', keyDownHandler);
            window.addEventListener('keyup', keyUpHandler);
            
            // 存储事件监听器引用
            keyboardEventListeners.push(
                { event: 'keydown', handler: keyDownHandler },
                { event: 'keyup', handler: keyUpHandler }
            );

            // 为桌面版玩家设置控制键位
            requestAnimationFrame(() => {
                if (players.length > 0) {
                    // 玩家1控制键位 (WASD + 空格)
                    players[0].controls = {
                        up: 'w', down: 's', left: 'a', right: 'd', fire: ' '
                    };

                    // 玩家2控制键位 (方向键 + 回车)
                    if (players.length > 2) {
                        players[3].controls = {
                            up: 'arrowup', down: 'arrowdown', left: 'arrowleft', right: 'arrowright', fire: 'enter'
                        };
                    }
                }
            });
        }
    }

    /**
     * 启动游戏倒计时
     */
    function startCountdown() {
        gameStarted = false;
        countdownValue = 3;
        countdownOverlay.textContent = countdownValue;
        countdownOverlay.style.display = 'flex';

        // 每秒更新倒计时
        countdownInterval = setInterval(() => {
            countdownValue--;
            if (countdownValue > 0) {
                countdownOverlay.textContent = countdownValue;
            } else {
                // 倒计时结束，开始游戏
                countdownOverlay.style.display = 'none';
                gameStarted = true;
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    /**
     * 游戏主循环
     */
    function gameLoop() {
        // 清除画布
        ctx.clearRect(0, 0, W, H);

        // 绘制背景网格
        ctx.strokeStyle = '#2d7a2d';
        ctx.lineWidth = 1;

        // 绘制垂直线
        for (let i = 0; i <= W; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, H);
            ctx.stroke();
        }

        // 绘制水平线
        for (let i = 0; i <= H; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(W, i);
            ctx.stroke();
        }

        // 游戏进行中才处理游戏逻辑
        if (gameStarted && !gameOver) {
            handleControls();

            // 控制AI玩家
            players.forEach(player => {
                // 只有非玩家控制的坦克才应用AI控制
                if (!player.isControlled) {
                    // 寻找存活的对手作为目标
                    const targets = players.filter(p => p.id !== player.id && p.hp > 0);
                    if (targets.length > 0) {
                        // 简单选择第一个存活的目标
                        const target = targets[0];
                        aiControl(player, target);
                    }
                }
            });

            // 更新所有玩家的子弹
            players.forEach(player => {
                updateBullets(player.bullets);
            });

            // 检查子弹命中情况
            checkHits();
            // 更新分数显示
            updateScores();
        }

        // 绘制所有玩家的坦克和子弹
        players.forEach(player => {
            drawTank(player);
            drawBullets(player.bullets, player.color);
        });

        // 继续下一帧
        gameLoopId = requestAnimationFrame(gameLoop);
    }

    /**
     * 重置游戏
     */
    function resetGame() {
        // 取消之前的动画循环
        if (gameLoopId) {
            cancelAnimationFrame(gameLoopId);
        }
        
        // 清除倒计时
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        // 根据游戏模式更新UI显示
        if (gameMode === '1v1') {
            document.querySelector('.player3').style.display = 'none';
            document.querySelector('.player4').style.display = 'none';
        } else {
            document.querySelector('.player3').style.display = 'inline-block';
            document.querySelector('.player4').style.display = 'inline-block';
        }

        // 重新初始化玩家
        initPlayers();
        gameOver = false;
        document.getElementById('pauseMask').style.display = 'none';
        updateScores();
        
        // 重新绑定控制事件监听器
        bindControlEvents();
        
        startCountdown();
        gameLoop();
    }

    // 游戏模式选择按钮事件监听器
    document.getElementById('mode1v1').addEventListener('click', () => {
        gameMode = '1v1';
        document.getElementById('mode1v1').classList.add('active');
        document.getElementById('mode2v2').classList.remove('active');
        resetGame();
    });

    document.getElementById('mode2v2').addEventListener('click', () => {
        gameMode = '2v2';
        document.getElementById('mode2v2').classList.add('active');
        document.getElementById('mode1v1').classList.remove('active');
        resetGame();
    });

    // 重新开始按钮事件监听器
    restartBtn.addEventListener('click', resetGame);

    // 初始化游戏
    initPlayers();
    bindControlEvents();
    startCountdown();
    gameLoop();
}