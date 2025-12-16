// 游戏数据
const gamesData = {
  hot: [
    {
      id: 1,
      title: "超级玛丽冒险",
      description: "经典的横版冒险游戏，帮助玛丽拯救公主",
      category: "冒险",
      players: "单人",
      image: "../imgs/R-C.jpg",
      link: " ",
      featured: true,
    },
    {
      id: 2,
      title: "贪吃蛇大作战",
      description: "多人在线贪吃蛇游戏，吃掉对手变得更长",
      category: "休闲",
      players: "多人",
      image: "../imgs/贪吃蛇大作战.jpg",
      link: " ",
      featured: true,
    },
    {
      id: 3,
      title: "坦克大作战",
      description: "经典坦克射击游戏，保卫基地消灭敌人",
      category: "射击",
      players: "单人",
      image: "../imgs/坦克大作战.jpg",
      link: "../../Tank_Game/static/Tank.html",
      featured: true,
    },
    {
      id: 4,
      title: "俄罗斯方块",
      description: "经典益智游戏，消除方块获得高分",
      category: "益智",
      players: "单人",
      image: "../imgs/俄罗斯方块.webp",
      link: " ",
      featured: true,
    },
    {
      id: 5,
      title: "赛车竞速",
      description: "刺激的赛车游戏，体验极速驾驶乐趣",
      category: "赛车",
      players: "单人",
      image: "../imgs/赛车竞速.webp",
      link: " ",
      featured: true,
    },
    {
      id: 6,
      title: "飞机大战",
      description: "经典飞行射击游戏，消灭敌机保卫天空",
      category: "射击",
      players: "单人",
      image: "../imgs/飞机大战.webp",
      link: " ",
      featured: true,
    },
  ],
  new: [
    // {
    //   id: 7,
    //   title: "像素冒险岛",
    //   description: "像素风格的冒险游戏，探索神秘的岛屿",
    //   category: "冒险",
    //   players: "单人",
    //   image: "https://via.placeholder.com/300x200/A29BFE/FFFFFF?text=像素冒险",
    //   featured: false,
    // },
    // {
    //   id: 8,
    //   title: "数字华容道",
    //   description: "经典数字拼图游戏，考验你的逻辑思维",
    //   category: "益智",
    //   players: "单人",
    //   image:
    //     "https://via.placeholder.com/300x200/FD79A8/FFFFFF?text=数字华容道",
    //   featured: false,
    // },
    // {
    //   id: 9,
    //   title: "篮球大师",
    //   description: "精彩的篮球投篮游戏，成为投篮高手",
    //   category: "体育",
    //   players: "单人",
    //   image: "https://via.placeholder.com/300x200/FDCB6E/FFFFFF?text=篮球大师",
    //   featured: false,
    // },
    // {
    //   id: 10,
    //   title: "塔防王国",
    //   description: "策略塔防游戏，建造防御塔抵御敌人",
    //   category: "策略",
    //   players: "单人",
    //   image: "https://via.placeholder.com/300x200/6C5CE7/FFFFFF?text=塔防王国",
    //   featured: false,
    // },
    // {
    //   id: 11,
    //   title: "跳跃忍者",
    //   description: "动作跳跃游戏，控制忍者不断向上跳跃",
    //   category: "动作",
    //   players: "单人",
    //   image: "https://via.placeholder.com/300x200/00B894/FFFFFF?text=跳跃忍者",
    //   featured: false,
    // },
    // {
    //   id: 12,
    //   title: "记忆翻牌",
    //   description: "记忆力训练游戏，找出相同的卡牌配对",
    //   category: "益智",
    //   players: "单人",
    //   image: "https://via.placeholder.com/300x200/E17055/FFFFFF?text=记忆翻牌",
    //   featured: false,
    // },
  ],
};

// DOM元素
const hotGamesGrid = document.getElementById("hotGamesGrid");
const newGamesGrid = document.getElementById("newGamesGrid");
const gameModal = document.getElementById("gameModal");
const modalClose = document.querySelector(".close");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryCards = document.querySelectorAll(".category-card");

// 创建游戏卡片
function createGameCard(game) {
  return `
        <div class="game-card" data-id="${game.id}" data-category="${game.category}">
            <img src="${game.image}" alt="${game.title}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <span class="game-category">${game.category}</span>
                    <span class="game-players"><i class="fas fa-users"></i> ${game.players}</span>
                </div>
                <button class="play-btn" onclick="openGameModal(${game.id})">开始游戏</button>
            </div>
        </div>
    `;
}

// 渲染游戏列表
function renderGames() {
  // 渲染热门游戏
  hotGamesGrid.innerHTML = gamesData.hot
    .map((game) => createGameCard(game))
    .join("");

  // 渲染新游戏
  newGamesGrid.innerHTML = gamesData.new
    .map((game) => createGameCard(game))
    .join("");
}

// 打开游戏详情模态框
function openGameModal(gameId) {
  const allGames = [...gamesData.hot, ...gamesData.new];
  const game = allGames.find((g) => g.id === gameId);

  if (game) {
    document.getElementById("modalGameImage").src = game.image;
    document.getElementById("modalGameTitle").textContent = game.title;
    document.getElementById("modalGameDescription").textContent =
      game.description;
    document.getElementById("modalGameCategory").textContent = game.category;
    document.getElementById("modalGamePlayers").textContent = game.players;

    // 绑定开始游戏按钮的点击事件
    const modalPlayBtn = document.getElementById("modalPlayBtn");
    modalPlayBtn.onclick = function () {
      if (game.link && game.link.trim() !== "") {
        window.location.href = game.link;
      } else {
        alert("该游戏暂不支持直接跳转，请稍后重试。");
      }
    };

    gameModal.style.display = "block";
  }
}

// 关闭模态框
function closeModal() {
  gameModal.style.display = "none";
}

// 搜索功能
function searchGames() {
  const searchTerm = searchInput.value.toLowerCase();
  const allGameCards = document.querySelectorAll(".game-card");

  allGameCards.forEach((card) => {
    const title = card.querySelector(".game-title").textContent.toLowerCase();
    const description = card
      .querySelector(".game-description")
      .textContent.toLowerCase();
    const category = card.dataset.category.toLowerCase();

    if (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      category.includes(searchTerm)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// 分类筛选
function filterGames(category) {
  const allGameCards = document.querySelectorAll(".game-card");

  allGameCards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// 轮播图功能
function initBannerSlider() {
  const bannerItems = document.querySelectorAll(".banner-item");
  let currentIndex = 0;

  function showNextBanner() {
    bannerItems[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % bannerItems.length;
    bannerItems[currentIndex].classList.add("active");
  }

  setInterval(showNextBanner, 5000);
}

// 事件监听器
modalClose.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === gameModal) {
    closeModal();
  }
});

searchBtn.addEventListener("click", searchGames);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchGames();
  }
});

// 分类卡片点击事件
categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;
    filterGames(category);

    // 更新导航状态
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    document.querySelector(`[href="#categories"]`).classList.add("active");
  });
});

// 导航链接点击事件
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // 更新活跃状态
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // 滚动到对应区域
    const targetId = link.getAttribute("href");
    if (targetId !== "#home") {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
});

// 初始化页面
document.addEventListener("DOMContentLoaded", () => {
  renderGames();
  initBannerSlider();
});

// 添加一些交互动画
document.addEventListener("DOMContentLoaded", () => {
  // 为游戏卡片添加悬停效果
  const gameCards = document.querySelectorAll(".game-card");

  gameCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // 为分类卡片添加点击效果
  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      // 添加点击动画
      card.style.transform = "scale(0.95)";
      setTimeout(() => {
        card.style.transform = "scale(1)";
      }, 150);
    });
  });
});

// 响应式菜单（移动端）
function toggleMobileMenu() {
  const nav = document.querySelector(".nav");
  nav.classList.toggle("mobile-active");
}

// 添加滚动效果
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background =
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.2)";
  } else {
    header.style.background =
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }
});
