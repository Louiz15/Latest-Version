const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const modal = document.getElementById("gameOverModal");
const finalScoreElement = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

// Set canvas size
function resizeCanvas() {
    const gameBoard = document.getElementById("gameBoard");
    canvas.width = gameBoard.offsetWidth;
    canvas.height = gameBoard.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game variables
const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
};
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let direction = null;
let gameRunning = true;
let lastRenderTime = 0;
let gameSpeed = 10; // Base speed in moves per second

// Speed levels configuration
const speedLevels = {
    1: { speed: 5, name: "Very Slow" },
    2: { speed: 8, name: "Slow" },
    3: { speed: 10, name: "Normal" },
    4: { speed: 15, name: "Fast" },
    5: { speed: 20, name: "Very Fast" }
};

// Speed control elements
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

// Update speed based on slider
speedSlider.addEventListener('input', function() {
    const level = speedLevels[this.value];
    gameSpeed = level.speed;
    speedValue.textContent = level.name;
});

// Update score display
function updateScore() {
    document.getElementById("scoreText").textContent = score;
    document.getElementById("highScoreText").textContent = highScore;
}

// Draw game elements
function drawGame() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment) => {
        const gradient = ctx.createLinearGradient(
            segment.x, segment.y,
            segment.x + box, segment.y + box
        );
        gradient.addColorStop(0, '#00ff87');
        gradient.addColorStop(1, '#60efff');
        
        ctx.fillStyle = gradient;
        ctx.shadowColor = '#00ff87';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(segment.x + box / 2, segment.y + box / 2, box / 2, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw food
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff4444';
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;
}

// Update game state
function update() {
    if (!direction || !gameRunning) return;

    const head = { ...snake[0] };

    switch (direction) {
        case "UP": head.y -= box; break;
        case "DOWN": head.y += box; break;
        case "LEFT": head.x -= box; break;
        case "RIGHT": head.x += box; break;
    }

    // Check collisions
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver();
        return;
    }

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        // Increase speed slightly when food is eaten
        gameSpeed = speedLevels[speedSlider.value].speed * (1 + score * 0.01);
        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);
    updateScore();
}

// Game over handling
function gameOver() {
    gameRunning = false;
    finalScoreElement.textContent = score;
    modal.style.display = "block";
}

// Restart game
function restartGame() {
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = null;
    score = 0;
    gameRunning = true;
    modal.style.display = "none";
    // Reset speed to the selected level
    gameSpeed = speedLevels[speedSlider.value].speed;
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
    updateScore();
    // Reset the game loop
    lastRenderTime = 0;
    requestAnimationFrame(gameLoop);
}

// Event listeners
restartBtn.addEventListener("click", restartGame);

// Keyboard controls
document.addEventListener("keydown", event => {
    if (!gameRunning) return;
    
    switch (event.key) {
        case "ArrowUp": if (direction !== "DOWN") direction = "UP"; break;
        case "ArrowDown": if (direction !== "UP") direction = "DOWN"; break;
        case "ArrowLeft": if (direction !== "RIGHT") direction = "LEFT"; break;
        case "ArrowRight": if (direction !== "LEFT") direction = "RIGHT"; break;
    }
});

// Mobile controls
document.getElementById("upBtn").addEventListener("click", () => {
    if (direction !== "DOWN") direction = "UP";
});
document.getElementById("downBtn").addEventListener("click", () => {
    if (direction !== "UP") direction = "DOWN";
});
document.getElementById("leftBtn").addEventListener("click", () => {
    if (direction !== "RIGHT") direction = "LEFT";
});
document.getElementById("rightBtn").addEventListener("click", () => {
    if (direction !== "LEFT") direction = "RIGHT";
});

// Touch controls for swipe
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchend', (e) => {
    if (!gameRunning) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && direction !== "LEFT") direction = "RIGHT";
        else if (deltaX < 0 && direction !== "RIGHT") direction = "LEFT";
    } else {
        if (deltaY > 0 && direction !== "UP") direction = "DOWN";
        else if (deltaY < 0 && direction !== "DOWN") direction = "UP";
    }
});

// Game loop
function gameLoop(timestamp) {
    if (!gameRunning) return;

    const deltaTime = timestamp - lastRenderTime;
    if (deltaTime > 1000 / gameSpeed) {
        update();
        drawGame();
        lastRenderTime = timestamp;
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
