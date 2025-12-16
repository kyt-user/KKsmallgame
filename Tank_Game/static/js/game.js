// 版本选择逻辑
document.getElementById('desktopVersion').addEventListener('click', () => {
    document.getElementById('versionSelect').style.display = 'none';
    initGame(false); // 初始化桌面版游戏
});

document.getElementById('mobileVersion').addEventListener('click', () => {
    document.getElementById('versionSelect').style.display = 'none';
    initGame(true); // 初始化移动版游戏
});

// 游戏初始化函数
function initGame(isMobile) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'flex';

    if (isMobile) {
        gameContainer.classList.add('mobile-layout');
    } else {
        gameContainer.classList.remove('mobile-layout');
    }

    // 获取DOM元素
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const moveStick = document.getElementById('moveStick');
    const knob = moveStick ? moveStick.querySelector('.knob') : null;
    const fireBtn = document.getElementById('fireBtn');
    const countdownOverlay = document.getElementById('countdownOverlay');
    const restartBtn = document.getElementById('restartBtn');

    // 设置canvas尺寸
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - document.getElementById('topBar').offsetHeight - (isMobile ? 140 : 0);
    }

    window.addEventListener('resize', resize);
    resize();

    // 游戏常量
    const T = { w: 36, h: 36, speed: 3, bulletSpd: 7, fireCd: 400 };
    let W = canvas.width, H = canvas.height;

    // 游戏变量
    let gameMode = '1v1'; // '1v1' 或 '2v2'
    let gameStarted = false;
    let countdownValue = 3;
    let countdownInterval;
    let players = [];
    let gameOver = false;

    // 玩家类
    class Player {
        constructor(id, x, y, angle, color, isControlled = false) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.color = color;
            this.hp = 100;
            this.lastFire = 0;
            this.bullets = [];
            this.isControlled = isControlled; // 是否为玩家控制

            if (!isControlled && !isMobile) {
                // 桌面版AI玩家属性
                this.aiCd = 0;
            }
        }
    }

    // 初始化玩家
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

    function drawTank(t) {
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.angle);
        ctx.fillStyle = t.color;
        ctx.fillRect(-T.w/2, -T.h/2, T.w, T.h);
        ctx.fillStyle = '#000';
        ctx.fillRect(T.w/2-4, -3, 18, 6);

        // 绘制坦克顶部装饰 (仅桌面版)
        if (!isMobile) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(-T.w/2 + 4, -T.h/2 + 4, T.w - 8, 6);
        }

        ctx.restore();

        // 血条
        ctx.fillStyle = '#000';
        ctx.fillRect(t.x-22, t.y-T.h/2-12, 44, 6);
        ctx.fillStyle = t.color;
        ctx.fillRect(t.x-22, t.y-T.h/2-12, (t.hp/100)*44, 6);
    }

    function drawBullets(arr, col) {
        ctx.fillStyle = col;
        if (isMobile) {
            arr.forEach(b => ctx.fillRect(b.x-3, b.y-3, 6, 6));
        } else {
            arr.forEach(b => {
                ctx.beginPath();
                ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }

    function bulletUpdate(arr) {
        for (let i = arr.length-1; i >= 0; i--) {
            let b = arr[i];
            b.x += b.vx;
            b.y += b.vy;
            if (b.x < -10 || b.x > W + 10 || b.y < -10 || b.y > H + 10) {
                arr.splice(i, 1);
            }
        }
    }

    function dist(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }

    function hit(t, b) {
        return dist(t, b) < T.w/2 + 4;
    }

    function checkHit() {
        // 检查子弹击中坦克
        players.forEach(shooter => {
            shooter.bullets.forEach((b, i) => {
                players.forEach(target => {
                    if (target.id !== shooter.id && hit(target, b)) {
                        target.hp -= 25;
                        shooter.bullets.splice(i, 1);

                        if (target.hp <= 0) {
                            checkGameOver();
                        }
                    }
                });
            });
        });
    }

    function checkGameOver() {
        const alivePlayers = players.filter(p => p.hp > 0);

        if (alivePlayers.length <= 1) {
            gameOver = true;

            if (alivePlayers.length === 1) {
                const winner = alivePlayers[0];
                if (isMobile) {
                    if (winner.isControlled) {
                        document.getElementById('finalTxt').textContent = `你方获胜！`;
                    } else {
                        document.getElementById('finalTxt').textContent = `电脑获胜！`;
                    }
                } else {
                    document.getElementById('finalTxt').textContent = `玩家${winner.id}获胜！`;
                }
            } else {
                document.getElementById('finalTxt').textContent = '平局！';
            }

            document.getElementById('pauseMask').style.display = 'flex';
        }
    }

    function updateScores() {
        players.forEach(player => {
            document.getElementById(`player${player.id}HP`).textContent = Math.max(0, player.hp);
        });
    }

    // 简单 AI：瞄准+随机开火+躲避
    function aiControl(aiPlayer, targetPlayer) {
        if (gameOver || !gameStarted || !aiPlayer || !targetPlayer) return;

        // 角度瞄准
        let dx = targetPlayer.x - aiPlayer.x;
        let dy = targetPlayer.y - aiPlayer.y;
        let target = Math.atan2(dy, dx);
        aiPlayer.angle = target;

        // 移动：被瞄准时横向移动
        let danger = players.some(p => 
            p !== aiPlayer && 
            p.bullets.some(b => Math.abs(b.vx) > 0 && Math.abs(b.x - aiPlayer.x) < 150)
        );

        if (danger) {
            let perp = aiPlayer.angle + Math.PI/2;
            aiPlayer.y += Math.sin(perp) * 2;
        } else {
            // 微移
            aiPlayer.x += (Math.sin(Date.now()/600) > 0 ? 1 : -1) * 1.2;
            aiPlayer.y += (Math.sin(Date.now()/600) > 0 ? 1 : -1) * 1.2;

        }

        // 添加边界检查，防止坦克超出地图范围
        aiPlayer.x = Math.max(T.w/2, Math.min(W - T.w/2, aiPlayer.x));
        aiPlayer.y = Math.max(T.h/2, Math.min(H - T.h/2, aiPlayer.y));

        // 开火
        if (Date.now() - aiPlayer.lastFire > 600 + Math.random() * 400) {
            aiPlayer.bullets.push({
                x: aiPlayer.x, 
                y: aiPlayer.y, 
                vx: Math.cos(aiPlayer.angle) * T.bulletSpd, 
                vy: Math.sin(aiPlayer.angle) * T.bulletSpd
            });
            aiPlayer.lastFire = Date.now();
        }
    }

    // 操控
    let mv = {x: 0, y: 0};
    let firing = false;

    function controlHandler() {
        if (!gameStarted) return;

        if (isMobile) {
            // 移动版控制
            const controlledPlayers = players.filter(p => p.isControlled);

            controlledPlayers.forEach(player => {
                player.x += mv.x * T.speed;
                player.y += mv.y * T.speed;

                if (mv.x !== 0 || mv.y !== 0) {
                    player.angle = Math.atan2(mv.y, mv.x);
                }

                if (player.x < T.w/2) player.x = T.w/2;
                if (player.x > W - T.w/2) player.x = W - T.w/2;
                if (player.y < T.h/2) player.y = T.h/2;
                if (player.y > H - T.h/2) player.y = H - T.h/2;

                if (firing && Date.now() - player.lastFire > T.fireCd) {
                    player.bullets.push({
                        x: player.x, 
                        y: player.y, 
                        vx: Math.cos(player.angle) * T.bulletSpd, 
                        vy: Math.sin(player.angle) * T.bulletSpd
                    });
                    player.lastFire = Date.now();
                }
            });
        } else {
            // 桌面版控制
            let keys = window.gameKeys || {};

            players.forEach(player => {
                // 只处理受玩家控制的坦克
                if (!player.isControlled || !player.controls) return;

                const controls = player.controls;

                // 移动控制
                let dx = 0, dy = 0;
                if (keys[controls.up]) dy -= 1;
                if (keys[controls.down]) dy += 1;
                if (keys[controls.left]) dx -= 1;
                if (keys[controls.right]) dx += 1;

                player.x += dx * T.speed;
                player.y += dy * T.speed;

                // 角度控制
                if (dx !== 0 || dy !== 0) {
                    player.angle = Math.atan2(dy, dx);
                }

                // 边界限制
                player.x = Math.max(T.w/2, Math.min(W - T.w/2, player.x));
                player.y = Math.max(T.h/2, Math.min(H - T.h/2, player.y));

                // 开火控制
                if (keys[controls.fire] && Date.now() - player.lastFire > T.fireCd) {
                    player.bullets.push({
                        x: player.x,
                        y: player.y,
                        vx: Math.cos(player.angle) * T.bulletSpd,
                        vy: Math.sin(player.angle) * T.bulletSpd
                    });
                    player.lastFire = Date.now();
                }
            });
        }
    }

    // 虚拟摇杆 (仅移动版)
    if (isMobile && moveStick) {
        let stickActive = false;

        function handleStick(e) {
            e.preventDefault();
            const t = e.touches[0];
            const rect = moveStick.getBoundingClientRect();
            const cx = rect.left + rect.width/2;
            const cy = rect.top + rect.height/2;
            let x = t.clientX - cx;
            let y = t.clientY - cy;
            let d = Math.hypot(x, y);
            let max = rect.width/2 - 20;

            if (d > max) {
                x = x/d * max;
                y = y/d * max;
                d = max;
            }

            knob.style.transform = `translate(${x}px, ${y}px)`;
            mv.x = x/max;
            mv.y = y/max;

            const controlledPlayers = players.filter(p => p.isControlled);
            if (controlledPlayers.length > 0 && (mv.x !== 0 || mv.y !== 0)) {
                controlledPlayers[0].angle = Math.atan2(mv.y, mv.x);
            }
        }

        moveStick.addEventListener('touchstart', e => {
            stickActive = true;
            handleStick(e);
        });

        moveStick.addEventListener('touchmove', e => {
            if (stickActive) handleStick(e);
        });

        moveStick.addEventListener('touchend', e => {
            stickActive = false;
            mv = {x: 0, y: 0};
            knob.style.transform = 'translate(-50%, -50%)';
        });

        if (fireBtn) {
            fireBtn.addEventListener('touchstart', e => {
                firing = true;
                e.preventDefault();
            });

            fireBtn.addEventListener('touchend', e => {
                firing = false;
                e.preventDefault();
            });
        }
    }

    // 键盘控制 (仅桌面版)
    if (!isMobile) {
        window.gameKeys = {};

        window.addEventListener('keydown', e => {
            window.gameKeys[e.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', e => {
            window.gameKeys[e.key.toLowerCase()] = false;
        });

        // 立即为桌面版玩家设置控制键位
        // 等待下一帧确保玩家数组已经初始化
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

    // 倒计时功能
    function startCountdown() {
        gameStarted = false;
        countdownValue = 3;
        countdownOverlay.textContent = countdownValue;
        countdownOverlay.style.display = 'flex';

        countdownInterval = setInterval(() => {
            countdownValue--;
            if (countdownValue > 0) {
                countdownOverlay.textContent = countdownValue;
            } else {
                countdownOverlay.style.display = 'none';
                gameStarted = true;
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    // 主循环
    function loop() {
        ctx.clearRect(0, 0, W, H);

        // 背景网格 - 确保地图自适应铺满全屏
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

        if (gameStarted && !gameOver) {
            controlHandler();

            // 控制AI玩家 - 统一处理移动版和桌面版
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

            players.forEach(player => {
                bulletUpdate(player.bullets);
            });

            checkHit();
            updateScores();
        }

        players.forEach(player => {
            drawTank(player);
            drawBullets(player.bullets, player.color);
        });

        requestAnimationFrame(loop);
    }

    function resetGame() {
        // 更新UI显示
        if (gameMode === '1v1') {
            document.querySelector('.player3').style.display = 'none';
            document.querySelector('.player4').style.display = 'none';
        } else {
            document.querySelector('.player3').style.display = 'inline-block';
            document.querySelector('.player4').style.display = 'inline-block';
        }

        initPlayers();
        gameOver = false;
        document.getElementById('pauseMask').style.display = 'none';
        updateScores();
        startCountdown();
    }

    // 模式选择
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

    // 重新开始按钮
    restartBtn.addEventListener('click', resetGame);

    // 初始化游戏
    initPlayers();
    startCountdown();
    loop();
}