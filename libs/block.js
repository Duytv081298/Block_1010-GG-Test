
var isMobile = detectMobile();
var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
width = isMobile ? width : height / 1.7;
var canvas, stage, update = true;
var supportsPassive = false, pressMove = false;
var game = {
    block: { width: 0, height: 0 },
    scale: 0,
    map: [],
    best: 1098,
    scores: 0
};
var lowerBlock = false;
var spriteSheet, setTimeEnd;
var blockUse = [], storageBlock;
var containerMain = new createjs.Container(), containerNew = [], blockTempNew = [];
var defaultX = 0, defaultY = 0;
var groupCurr = 0, grWHCrr = {};
var indexHint = {}, hintCurr = 0, groupHint = new createjs.Container(), distanceGTH = 0, hintFree = [];
var hand_tut, scoresTemp = 0, install_now, removeArray = [];
var txtBest, txtScores;
var tempX, tempY;

var rotation_time = 0, level_rotation = 0, spin_rotation;
var intestines_spin = new createjs.Container();
var spin = new createjs.Container();

var level = 0;
const blockFree = [
    [[0, 1], [1, 1], [0, 1]],
    [[1, 1], [1, 1]],
    [[0, 1], [1, 1]],
    [[1], [1, 1]],
    [[1, 1], [1], [1]],
    [[1, 1], [0, 1]],
    [[1, 1]],
    [[1], [1], [1], [1]],
    [[1, 1], [1]],
    [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    [[1, 0], [1, 1], [1, 0]],
    [[1, 1, 1, 1, 1]],
    [[1, 1, 1, 1]],
    [[1], [1], [1]],
    [[1], [1]],
    [[1, 1], [0, 1], [0, 1]],
    [[1, 1, 1]]
];

const blockFreeHard = [
    [[1, 1], [1], [1]],
    [[1], [1], [1], [1], [1]],
    [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
    [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    [[1, 1], [0, 1], [0, 1]],
    [[1, 1, 1, 1, 1]],
];
const map = [
    [
        [-1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1],
        [6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1],
        [6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1],
        [6, 6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1],
        [6, 6, 6, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1],
        [-1, 6, 6, -1, 6, 6, 6, 6, -1, -1, -1, -1, -1],
        [-1, 6, 6, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1],
        [-1, 6, 6, -1, -1, 6, 6, 6, 6, 6, 6, -1, -1],
        [-1, 6, 6, -1, -1, -1, 6, 6, 6, 6, 6, 6, -1],
        [-1, 6, 6, -1, -1, -1, -1, 6, 6, 6, 6, 6, 6],
        [-1, 6, -1, -1, -1, -1, -1, -1, 6, 6, 6, 6, 6]
    ],
    [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, 4, 4, 4, 3, 3, -1, -1, -1, -1],
        [-1, -1, -1, 4, 4, 4, 3, 3, 3, 3, -1, -1, -1],
        [-1, -1, 5, 5, 5, 5, 7, 7, 7, 7, 7, -1, -1],
        [-1, 0, 0, 0, 0, 5, 7, 1, 1, 1, 1, 1, -1],
        [-1, -1, -1, 2, -1, 5, 7, -1, -1, 3, -1, -1, -1],
        [-1, -1, -1, 2, -1, -1, 2, 3, -1, 3, -1, -1, -1],
        [-1, -1, -1, 2, 2, 2, 2, 3, 3, 3, -1, -1, -1],
        [-1, -1, -1, 6, 6, -1, -1, -1, 5, 5, -1, -1, -1],
        [-1, -1, -1, 6, 6, -1, -1, -1, 5, 5, -1, -1, -1],
        [-1, -1, -1, 6, 6, -1, -1, -1, 5, 5, -1, -1, -1],
        [-1, -1, -1, 4, 4, 4, 4, 4, 4, 4, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ],
    [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 5, 5, 5, -1, -1, -1, 2, 2, 2, -1, -1],
        [-1, 5, 1, 1, 1, 5, -1, 2, 0, 0, 0, 2, -1],
        [-1, 1, 1, 1, 1, 5, 6, 2, 0, 0, 0, 0, 4],
        [-1, 3, 1, 1, 7, 7, 6, 7, 7, 0, 0, 4, 4],
        [-1, 3, 3, 7, 7, 7, 7, 7, 7, 7, 4, 4, 4],
        [-1, 3, 3, 7, 7, 7, 6, 7, 7, 7, 4, 4, 4],
        [-1, 3, 3, 3, 7, 6, 6, 6, 7, 4, 4, 4, -1],
        [-1, -1, 3, 3, 3, 7, 6, 7, 4, 4, 4, -1, -1],
        [-1, -1, -1, 3, 3, 3, 7, 4, 4, 4, -1, -1, -1],
        [-1, -1, -1, -1, 6, 6, 6, 6, 6, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1]
    ],
    [
        [-1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, 7, 7, -1, -1, -1, 7, 7, -1],
        [7, 7, 7, 7, -1, 7, 7, 7, -1, 7, 7, 7, 7],
        [-1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, -1],
        [-1, -1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, -1],
        [-1, -1, -1, 7, 7, 7, 7, 7, 7, 7, 7, -1, -1],
        [-1, -1, -1, -1, 7, 7, 7, 7, 7, 7, -1, -1, -1],
        [-1, -1, -1, 7, 7, 7, 7, 7, 7, -1, -1, -1, -1],
        [-1, -1, 7, 7, 7, 7, 7, 7, -1, -1, -1, -1, -1],
        [-1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [7, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ],
    [
        [-1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1],
        [1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1],
        [-1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, -1],
        [-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, -1],
        [-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, -1],
        [-1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1],
        [1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]
];
//game initialization
function gameinit() {
    createjs.RotationPlugin.install();
    createjs.MotionGuidePlugin.install();
    setStage();
    loadImage();
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tick);
}
async function loadImage() {
    queue = new createjs.LoadQueue(false);
    var manifest = [
        { src: './images/full_block.png', id: 'full_block' },
    ];
    queue.on("complete", setAnimation);
    queue.loadManifest(manifest);
}
function setAnimation() {
    spriteSheet = new createjs.SpriteSheet({
        images: [queue.getResult("full_block")],
        framerate: 25,
        frames: [
            [1, 1, 874, 231, 0, 0, 0],
            [877, 1, 140, 144, 0, 0, 0],
            [877, 147, 134, 142, 0, 0, 0],
            [1, 234, 864, 110, 0, 0, 0],
            [867, 291, 143, 137, 0, 0, 0],
            [1, 346, 670, 668, 0, 0, 0],
            [673, 430, 300, 533, 0, 0, 0],
            [673, 346, 80, 82, 0, 0, 0],
            [975, 430, 28, 29, 0, 0, 0],
            [755, 346, 45, 53, 0, -5, -1],
            [802, 346, 46, 46, 0, 0, 0],
            [673, 965, 300, 301, 0, 0, 0],
            [1, 1268, 133, 140, 0, 0, 0],
            [136, 1268, 133, 140, 0, 0, 0],
            [1, 1016, 622, 111, 0, 0, 0],
            [271, 1129, 300, 300, 0, 0, 0],
            [625, 1016, 46, 46, 0, 0, 0],
            [625, 1064, 46, 46, 0, 0, 0],
            [625, 1112, 46, 46, 0, 0, 0],
            [573, 1129, 46, 46, 0, 0, 0],
            [621, 1160, 46, 46, 0, 0, 0],
            [573, 1177, 46, 46, 0, 0, 0],
            [621, 1208, 46, 46, 0, 0, 0],
            [573, 1225, 46, 46, 0, 0, 0],
            [573, 1273, 300, 99, 0, 0, 0],
            [573, 1374, 200, 53, 0, 0, 0],
            [775, 1374, 200, 53, 0, 0, 0],
            [1, 1129, 205, 67, 0, 0, 0],
            [1, 1198, 200, 53, 0, 0, 0]
        ],

        "animations": {
            "bot": { "frames": [0] },
            "spin_heart": { "frames": [1] },
            "spin_bird": { "frames": [2] },
            "score": { "frames": [3] },
            "spin_house": { "frames": [4] },
            "grid": { "frames": [5] },
            "bg": { "frames": [6] },
            "spin_button": { "frames": [7] },
            "spin_center": { "frames": [8] },
            "hand_tut": { "frames": [9] },
            "block_blue": { "frames": [10] },
            "spin_border": { "frames": [11] },
            "spin_dog": { "frames": [12] },
            "spin_high_heels": { "frames": [13] },
            "best": { "frames": [14] },
            "logo": { "frames": [15] },
            "block_cyan": { "frames": [16] },
            "block_green": { "frames": [17] },
            "block_orange": { "frames": [18] },
            "block_pink": { "frames": [19] },
            "block_purple": { "frames": [20] },
            "block_red": { "frames": [21] },
            "block_yellow": { "frames": [22] },
            "square_hint": { "frames": [23] },
            "vlock": { "frames": [24] },
            "continue": { "frames": [25] },
            "install_now": { "frames": [26] },
            "img1010": { "frames": [27] },
            "play_again": { "frames": [28] }
        },
    });


    var bg = new createjs.Sprite(spriteSheet, "bg");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;
    stage.addChild(bg)
    renderSpin()
}
function renderSpin() {
    var w = stage.canvas.width;
    var h = stage.canvas.height;

    var tapSpin = new createjs.Text('Tap to spin', "30px Impact", "#ffffff");
    tapSpin.scale = w / 2 / tapSpin.getMeasuredWidth();
    tapSpin.x = (w - tapSpin.getMeasuredWidth() * tapSpin.scale) / 2

    tapSpin.y = h / 10

    var spin_border = new createjs.Sprite(spriteSheet, "spin_border");
    spin_border.scale = (w * 2.5 / 3) / spin_border.getBounds().width
    spin_border.x = w / 2 - spin_border.getBounds().width * spin_border.scale / 2

    var spin_dog = new createjs.Sprite(spriteSheet, "spin_dog");
    spin_dog.scale = spin_border.scale
    var spin_high_heels = new createjs.Sprite(spriteSheet, "spin_high_heels");
    spin_high_heels.scale = spin_border.scale
    spin_high_heels.x = spin_dog.getBounds().width * spin_dog.scale

    var spin_house = new createjs.Sprite(spriteSheet, "spin_house");
    spin_house.scale = spin_border.scale
    spin_house.rotation = -18
    spin_house.x = spin_high_heels.x * 0.99
    spin_house.y = spin_high_heels.y + spin_high_heels.getBounds().height * spin_high_heels.scale * 0.98

    var spin_bird = new createjs.Sprite(spriteSheet, "spin_bird");
    spin_bird.scale = spin_border.scale

    spin_bird.rotation = -72
    spin_bird.x = spin_high_heels.x - spin_bird.getBounds().width * spin_bird.scale * 1.31
    spin_bird.y = spin_dog.y + spin_dog.getBounds().height * spin_dog.scale * 1.59

    var spin_heart = new createjs.Sprite(spriteSheet, "spin_heart");
    spin_heart.scale = spin_border.scale

    spin_heart.rotation = 37
    spin_heart.x = spin_high_heels.x
    spin_heart.y = spin_dog.y + spin_dog.getBounds().height * spin_dog.scale * 0.97
    intestines_spin.addChild(spin_high_heels, spin_dog, spin_house, spin_bird, spin_heart)

    var spin_button = new createjs.Sprite(spriteSheet, "spin_button");
    spin_button.scale = (w / 6) / spin_button.getBounds().width
    spin_button.x = w / 2 - spin_button.getBounds().width * spin_button.scale / 2
    spin_button.y = spin_border.y + (spin_border.getBounds().height * spin_border.scale - spin_button.getBounds().height * spin_button.scale) / 2
    spin_button.shadow = new createjs.Shadow('#000', 0, 0, 10);
    var containerTemp = new createjs.Container()
    containerTemp.addChild(intestines_spin, spin_border, spin_button)
    spin.addChild(tapSpin, containerTemp)
    stage.addChild(spin)
    intestines_spin.regX = spin_dog.getBounds().width * spin_dog.scale
    intestines_spin.regY = spin_dog.getBounds().height * spin_dog.scale
    intestines_spin.x = w / 2
    intestines_spin.y = spin_border.getBounds().height * spin_border.scale / 50 + spin_dog.getBounds().height * spin_dog.scale
    containerTemp.y = tapSpin.y + tapSpin.getMeasuredHeight() * tapSpin.scale * 2
    if (isMobile) canvas.addEventListener("mousedown", rotationSpin, supportsPassive ? { passive: true } : false);
    else canvas.addEventListener("mousedown", rotationSpin);


}
function startLevel() {
    setTimeout(() => {
        stage.removeChild(spin)
        setBackground();
        stage.addChild(containerMain);
        game.map = setMap(map[level_rotation]);
        createGroupBlockFree();
        addHand()
        setTimeEnd = setTimeout(setEndTime, 50000)
    }, 1000);
}

function setMap(map) {
    var locationArr = [];
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        var x = game.block.width,
            y = i * (game.block.height + tempY);
        var arr = [];
        for (let j = 0; j < row.length; j++) {
            var xb = j * (x + tempX);
            const color = map[i][j]
            if (color >= 0) {
                var colorstr = convertBlock(color);
                var block = new createjs.Sprite(spriteSheet, colorstr);
                block.scale = game.scale
                block.x = xb + defaultX
                block.y = y + defaultY
                containerMain.addChild(block);
                arr.push({ x: block.x, y: block.y, existing: true, block: block, color: null, colorTemp: null, blockTemp: null });
            } else arr.push({ x: xb + defaultX, y: y + defaultY, existing: false, block: null, color: null, colorTemp: null, blockTemp: null });

        }
        locationArr.push(arr);
    }
    return locationArr;
}
function setStage() {
    canvas = document.getElementById("myCanvas");
    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    stage.mouseMoveOutside = true;
    canvas.height = height;
    canvas.width = width;
}
function setBackground() {
    var randomN = isMobile ? 0.49 : 0.51

    var best = new createjs.Sprite(spriteSheet, "best");
    best.scale = (stage.canvas.width / 2) / best.getBounds().width;
    best.x = stage.canvas.width / 14
    best.y = stage.canvas.height / 15

    var bestText = new createjs.Text('BEST', "22px Haettenschweiler", "#24e6f1");
    bestText.scale = (stage.canvas.width / 12) / bestText.getMeasuredWidth();
    bestText.textBaseline = "alphabetic";
    bestText.x = best.x + stage.canvas.width / 25
    bestText.y = best.y + best.getBounds().height * best.scale * randomN + bestText.getMeasuredHeight() * bestText.scale / 2

    var txtBesttemp = new createjs.Text(game.best, "22px Haettenschweiler", "#eaf7ff");
    txtBesttemp.scale = bestText.scale
    txtBesttemp.textBaseline = "alphabetic";
    txtBesttemp.x = best.x + best.getBounds().width * best.scale - stage.canvas.width / 10 - txtBesttemp.getMeasuredWidth() * txtBesttemp.scale
    txtBesttemp.y = best.y + best.getBounds().height * best.scale * randomN + txtBesttemp.getMeasuredHeight() * txtBesttemp.scale / 2

    txtBest = {
        x: best.x + best.getBounds().width * best.scale - stage.canvas.width / 10,
        y: best.y + best.getBounds().height * best.scale * randomN,
        txt: txtBesttemp
    }
    var score = new createjs.Sprite(spriteSheet, "score");
    score.scale = best.scale
    score.x = best.x
    score.y = best.y + best.getBounds().height * best.scale * 1.5


    var scoreText = new createjs.Text('SCORE', "22px Haettenschweiler", "#24e6f1");

    scoreText.scale = bestText.scale
    scoreText.textBaseline = "alphabetic";
    scoreText.x = score.x + stage.canvas.width / 25
    scoreText.y = score.y + best.getBounds().height * score.scale * randomN + scoreText.getMeasuredHeight() * scoreText.scale / 2

    var txtScore = new createjs.Text(scoresTemp, "22px Haettenschweiler", "#eaf7ff");

    txtScore.scale = bestText.scale
    txtScore.textBaseline = "alphabetic";
    txtScore.x = score.x + score.getBounds().width * score.scale - stage.canvas.width / 10 - txtScore.getMeasuredWidth() * txtScore.scale
    txtScore.y = score.y + best.getBounds().height * score.scale * randomN + txtScore.getMeasuredHeight() * txtScore.scale / 2
    txtScores = {
        x: score.x + score.getBounds().width * score.scale - stage.canvas.width / 10,
        y: score.y + best.getBounds().height * score.scale * randomN,
        txt: txtScore
    }

    var grid = new createjs.Sprite(spriteSheet, "grid");
    grid.scale = (stage.canvas.width * 2.6 / 3) / grid.getBounds().width;
    grid.x = (stage.canvas.width - grid.getBounds().width * grid.scale) / 2
    grid.y = score.y + score.getBounds().height * score.scale * 1.5


    var bot = new createjs.Sprite(spriteSheet, "bot");
    bot.scale = (stage.canvas.width * 2.6 / 3) / bot.getBounds().width;
    bot.scaleY = bot.scale * 1.3;
    bot.x = (stage.canvas.width - bot.getBounds().width * bot.scale) / 2
    bot.y = grid.y + grid.getBounds().height * grid.scale * 1.07


    stage.addChild(best, bestText, txtBest.txt, score, scoreText, txtScores.txt, grid, bot,);


    game.scale = grid.scale * 0.99


    var block_cyan = new createjs.Sprite(spriteSheet, "block_cyan");


    defaultX = grid.x + 0.56 * block_cyan.getBounds().width * game.scale
    defaultY = grid.y + 0.5 * block_cyan.getBounds().height * game.scale
    game.block = { width: block_cyan.getBounds().width * game.scale, height: block_cyan.getBounds().height * game.scale };
    tempX = (grid.getBounds().width * game.scale - block_cyan.getBounds().width * game.scale * 13 - (defaultX - grid.x) * 1.75) / 12
    tempY = (grid.getBounds().height * game.scale - block_cyan.getBounds().height * game.scale * 13 - (defaultY - grid.y) * 1.9) / 12
    storageBlock = {
        height: bot.getBounds().height * bot.scaleY,
        avgY: bot.y + bot.getBounds().height * bot.scaleY / 2,
        minX: bot.x + stage.canvas.width / 10,
        maxX: bot.x + bot.getBounds().width * bot.scale - stage.canvas.width / 10
    };
    hand_tut = new createjs.Sprite(spriteSheet, "hand_tut");

    install_now = new createjs.Sprite(spriteSheet, "install_now");
    install_now.scale = stage.canvas.width / 4 / install_now.getBounds().width;
    install_now.x = (stage.canvas.width - install_now.getBounds().width * install_now.scale) / 2;
    install_now.y = stage.canvas.height - install_now.getBounds().height * install_now.scale * 1.2;

    stage.addChild(install_now);
    var install_nowx = install_now.x,
        install_nowy = install_now.y,
        install_nowscale = stage.canvas.width / 4 / install_now.getBounds().width;
    createjs.Tween.get(install_now, { loop: true })
        .to(
            {
                scale: (stage.canvas.width / 5) / install_now.getBounds().width,
                x: (stage.canvas.width - ((stage.canvas.width / 5) / install_now.getBounds().width) * install_now.getBounds().width) / 2,
                y: install_nowy - (stage.canvas.width / 5 - stage.canvas.width / 8) / 10,
            },
            500, createjs.Ease.linear
        )
        .to({ scale: install_nowscale, x: install_nowx, y: install_nowy }, 500, createjs.Ease.linear);
    install_now.addEventListener("click", () => { getLinkInstall() }, false);
}

function renderGroupBlock(blockArr, color, index) {
    var colorstr = convertBlock(color);
    var block = new createjs.Sprite(spriteSheet, colorstr);
    block.scale = (storageBlock.height / 6) / block.getBounds().width;
    var colContainer = blockArr[0].length;
    var size = block.scale * block.getBounds().width;

    var arr = [];
    var containerBlockUse = new createjs.Container();
    for (let i = 0; i < blockArr.length; i++) {
        for (let j = 0; j < blockArr[i].length; j++) {
            if (blockArr[i][j] == 1) {
                var blockClone = block.clone();
                blockClone.y = i * size;
                blockClone.x = j * size;
                containerBlockUse.addChild(blockClone);
            }
        }
        if (colContainer < blockArr[i].length) colContainer = blockArr[i].length;
        arr.push({ x: blockClone.x, y: blockClone.y });
    }
    var heightContainer = blockArr.length * block.getBounds().height * block.scale;
    var widthContainer = colContainer * block.getBounds().width * block.scale;

    containerBlockUse.y = storageBlock.avgY - heightContainer / 2;
    containerBlockUse.x = index == 0 ? storageBlock.minX : index == 1 ? (storageBlock.maxX + storageBlock.minX - widthContainer + stage.canvas.width / 40) / 2 : storageBlock.maxX - widthContainer;

    stage.addChild(containerBlockUse);
    var groupBlock = {
        target: containerBlockUse,
        x: containerBlockUse.x,
        y: containerBlockUse.y,
        width: colContainer,
        height: blockArr.length,
        sizeItem: block.scale * block.getBounds().width,
        color: color
    };
    blockUse.push(groupBlock);
    addEventFree(containerBlockUse, blockUse.length - 1)
}
function addHand() {
    hand_tut.x = blockUse[1].x - hand_tut.getBounds().width * hand_tut.scale * 0.5;
    hand_tut.y = blockUse[1].y + (blockUse[1].height * storageBlock.height / 6) / 2;
    hand_tut.scale = (stage.canvas.width / 8) / hand_tut.getBounds().width;
    stage.addChild(hand_tut);
    createjs.Tween.get(hand_tut, { loop: true })
        .to({ x: game.map[5][10].x, y: game.map[5][10].y }, 1500)
        .wait(300)
        .to({ x: blockUse[1].x - hand_tut.getBounds().width * hand_tut.scale * 0.5, y: blockUse[1].y + (blockUse[1].height * storageBlock.height / 6) / 2 }, 1500)
        .wait(300)
}
function removeHand() {
    createjs.Tween.removeTweens(hand_tut);
    stage.removeChild(hand_tut)
}

//Event
function removeAllEvent() {
    for (let i = 0; i < blockUse.length; i++) {
        const target = blockUse[i].target;
        if (isMobile) {
            if (target) {
                target.removeEventListener("mousedown", onMouseDown, supportsPassive ? { passive: true } : false);
                canvas.removeEventListener("touchmove", onPressMove, supportsPassive ? { passive: true } : false);
                canvas.removeEventListener("touchend", onMouseUp, supportsPassive ? { passive: true } : false);
            }
        } else {
            if (target) {
                target.removeEventListener("mousedown", onMouseDown);
                canvas.removeEventListener("mousemove", onPressMove);
                canvas.removeEventListener("mouseup", onMouseUp);
            }
        }
    }
}
function detectMobile() {
    try {
        var opts = Object.defineProperty({}, "passive", {
            get: function () {
                supportsPassive = true;
            },
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
    } catch (e) { }
    var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false;
    if (iOS) {
        return true;
    }
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) {
        return true;
    }
    return false;
}
function onMouseDown(evt) {
    pressMove = true;
    var location = currentMouse(evt);
    groupCurr = evt.currentTarget.myParam;
    distanceGTH = getDistance(location, { x: location.x, y: game.map[12][0].y })

    var target = blockUse[groupCurr].target;
    var scaleItem = blockUse[groupCurr].target.children[0].scale;
    var newScaleGroup = game.scale / scaleItem;
    var widthGrBlock = blockUse[groupCurr].width * storageBlock.height / 6 * target.scale
    var heightGrBlock = isMobile ? (blockUse[groupCurr].height + 2) * storageBlock.height / 6 * target.scale : blockUse[groupCurr].height * storageBlock.height / 6 * target.scale
    grWHCrr = { width: widthGrBlock, height: heightGrBlock }
    target.x = location.x - grWHCrr.width / 2;
    target.y = location.y - grWHCrr.height;
    target.scale = newScaleGroup
}

// Free
function addEventFree(target, i) {
    if (isMobile) {
        target.addEventListener("mousedown", onMouseDown, supportsPassive ? { passive: true } : false);
        canvas.addEventListener("touchmove", onPressMove, supportsPassive ? { passive: true } : false);
        canvas.addEventListener("touchend", onMouseUp, supportsPassive ? { passive: true } : false);
        target.myParam = i;

    } else {
        target.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onPressMove);
        canvas.addEventListener("mouseup", onMouseUp);
        target.myParam = i;
    }

}
function onPressMove(evt) {
    if (pressMove) {
        var location = currentMouse(evt);
        var target = blockUse[groupCurr].target;
        target.x = location.x - grWHCrr.width / 2;
        target.y = location.y - grWHCrr.height;
        var scaleItem = blockUse[groupCurr].target.children[0].scale;
        var newScaleGroup = game.scale / scaleItem;
        target.scale = newScaleGroup
        renderHint({ x: location.x - grWHCrr.width / 2, y: location.y - grWHCrr.height })
    }
}
function onMouseUp(evt) {
    pressMove = false;
    containerNew = []
    var target = blockUse[groupCurr].target;
    if (hintFree.length != 0) {
        lowerBlock = true;
        removeHand()
        game.scores += hintFree.length * 5
        updateScore()
        const color = blockUse[groupCurr].color;
        var colorstr = convertBlock(color);
        var block = new createjs.Sprite(spriteSheet, colorstr);
        block.scale = game.scale;
        for (let i = 0; i < hintFree.length; i++) {
            const hint = hintFree[i].hint;
            const item = game.map[hintFree[i].y][hintFree[i].x]
            var newblock = block.clone()
            newblock.x = hint.x
            newblock.y = hint.y
            containerMain.addChild(newblock);
            containerNew.push({ x: hintFree[i].x, y: hintFree[i].y })
            game.map[hintFree[i].y][hintFree[i].x] = { x: item.x, y: item.y, existing: true, block: newblock, color: color, colorTemp: item.colorTemp, blockTemp: item.blockTemp }
        }
        removeBlock();
        blockUse[groupCurr].target.removeAllChildren()
        stage.removeChild(blockUse[groupCurr].target)
        blockUse[groupCurr].target = null
        createGroupBlockFree();
        endGame();

    } else {
        target.x = blockUse[groupCurr].x;
        target.y = blockUse[groupCurr].y;
    }
}

function addBlock(index) {
    const color = blockUse[groupCurr].color;
    var colorstr = convertBlock(color);
    var block = new createjs.Sprite(spriteSheet, colorstr);
    block.scale = game.scale;
    var item = game.map[index.y][index.x]
    block.x = item.x
    block.y = item.y
    containerMain.addChild(block);
    blockTempNew.push({ x: index.x, y: index.y })
    game.map[index.y][index.x] = { x: item.x, y: item.y, existing: true, block: item.block, color: item.color, colorTemp: color, blockTemp: block }
}

function removeBlockTemp() {
    if (blockTempNew) {
        for (let i = 0; i < blockTempNew.length; i++) {
            const index = blockTempNew[i];
            var item = game.map[index.y][index.x]
            containerMain.removeChild(item.blockTemp)
        }
        blockTempNew = []
    }
}
function renderHint(location) {
    var array = [];
    var render = true;
    removeHint();
    removeBlockTemp();
    lowerBlock = false;
    var hint = new createjs.Sprite(spriteSheet, "square_hint");
    hint.scale = game.scale;
    if (location.x >= game.map[0][0].x - game.block.width / 2 &&
        location.x < game.map[0][12].x + (1.5 - blockUse[groupCurr].width) * game.block.width &&
        location.y > game.map[0][0].y &&
        location.y < game.map[12][0].y + (1.5 - blockUse[groupCurr].height) * game.block.width) {
        var index = lToI(location)
        var blockChild = blockUse[groupCurr].target.children;
        hintFree = [];
        for (let i = 0; i < blockChild.length; i++) {
            var block = blockChild[i];
            var index1 = lToIGr({ x: block.x, y: block.y });
            var x = index.x + index1.x;
            var y = index.y + index1.y;
            var item = game.map[y][x];
            if (!item.existing) {
                array.push({ x: x, y: y });
            } else render = false;
        }
    } else {
        hintFree = [];
    }
    if (render) {
        for (let i = 0; i < array.length; i++) {
            const index = array[i];
            var item = game.map[index.y][index.x]
            game.map[index.y][index.x] = { x: item.x, y: item.y, existing: true, block: item.block, color: item.color, colorTemp: item.colorTemp, blockTemp: item.blockTemp }
            var newHint = hint.clone();
            newHint.x = item.x;
            newHint.y = item.y;
            containerMain.addChild(newHint);
            hintFree.push({ x: index.x, y: index.y, hint: newHint })
        }
        removeArray = checkRC(hintFree)
        if (removeArray.lengthRemove) {
            removeArray.arr.forEach(index => {
                addBlock(index)
            });
        } else {
            removeBlockTemp()
        }
    }
}
function removeHint() {
    for (let i = 0; i < hintFree.length; i++) {
        if (!lowerBlock) {
            var hintt = hintFree[i]
            var item = game.map[hintt.y][hintt.x]
            game.map[hintt.y][hintt.x] = { x: item.x, y: item.y, existing: false, block: item.block, color: item.color, colorTemp: item.colorTemp, blockTemp: item.blockTemp }
        }
        const hint = hintFree[i].hint;
        containerMain.removeChild(hint)

    }
    hintFree = [];
}
function createGroupBlockFree() {
    var render = true
    for (let i = 0; i < blockUse.length; i++) {
        const target = blockUse[i].target;
        if (target != null) render = false
    }
    if (render) {
        level++
        blockUse = []
        var listBlock = randomIndex()
        for (let i = 0; i < listBlock.length; i++) {
            const block = listBlock[i];
            var color = Math.floor(Math.random() * 6)
            renderGroupBlock(block, color, i);
        }

    }
}
function randomIndex() {
    var pass = true;
    var listIndex = [];
    var index;
    var num = level >= 6 ? 2 : 3
    if (level >= 6) {
        index = Math.floor(Math.random() * blockFreeHard.length)
        listIndex.push(blockFreeHard[index])
    }
    for (let i = 0; i < num; i++) {
        index = Math.floor(Math.random() * blockFree.length)
        if (listIndex.indexOf(index) != -1) {
            if (pass) {
                while (listIndex.indexOf(index) != -1) {
                    index = Math.floor(Math.random() * blockFree.length)
                }
            } else {
                while (listIndex.indexOf(index) != -1 && getCol(blockFree[index]) >= 3) {
                    index = Math.floor(Math.random() * blockFree.length)
                }
            }
        } else {
            var a = getCol(blockFree[index])
            if (!pass) while (a >= 3) {
                index = Math.floor(Math.random() * blockFree.length)
                a = getCol(blockFree[index])
            }
        }
        if (getCol(blockFree[index]) > 2) pass = false
        listIndex.push(blockFree[index])
    }
    return listIndex
}
function getCol(grBlock) {
    var maxCol = grBlock[0].length
    grBlock.forEach(row => {
        if (maxCol < row.length) maxCol = row.length
    });
    return maxCol
}

//Collision
function removeBlock() {
    var removeArr = removeArray.arr
    game.scores += removeArr.length * 10
    updateScore()
    removeHint()
    for (let i = 0; i < removeArr.length; i++) {
        const index = removeArr[i];
        const item = game.map[index.y][index.x]
        containerMain.removeChild(item.block);
        const block = item.blockTemp;

        block.regX = block.regY = game.block.width / 2
        block.x = block.x + game.block.width / 4
        block.y = block.y + game.block.width / 4
        createjs.Tween.get(block)
            .to({ rotation: 180, scale: 0 }, 500)
            .call(() => {
                containerMain.removeChild(block);
            });
        game.map[index.y][index.x] = { x: item.x, y: item.y, existing: false, block: null, color: null }
    }
}
// check row and column
function checkRC(arr) {
    var checkX = [];
    var checkY = [];
    for (let i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (checkX.indexOf(item.x) < 0) checkX.push(item.x);
        if (checkY.indexOf(item.y) < 0) checkY.push(item.y);
    }
    var arrRemove = [];
    var arrtemp = [];
    var array = [];
    for (let i = 0; i < checkX.length; i++) {
        const x = checkX[i];
        for (let y = 0; y < 13; y++) {
            const item = game.map[y][x];
            if (item.existing) arrtemp.push({ x: x, y: y });
        }
        if (arrtemp.length == 13) arrRemove = arrRemove.concat(arrtemp);
        arrtemp = [];
    }
    for (let i = 0; i < checkY.length; i++) {
        const y = checkY[i];
        for (let x = 0; x < 13; x++) {
            const item = game.map[y][x];
            if (item.existing) arrtemp.push({ x: x, y: y });
        }
        if (arrtemp.length == 13) arrRemove = arrRemove.concat(arrtemp);
        arrtemp = [];
    }
    for (let i = 0; i < arrRemove.length; i++) {
        var add = true;
        const item = arrRemove[i];
        for (let j = 0; j < array.length; j++) {
            const element = array[j];
            if (item.x == element.x && item.y == element.y) add = false
        }
        if (add) array.push(item)

    }
    return { arr: array, lengthRemove: arrRemove.length }
}

function endGame() {
    var close = checkLose();
    if (close) {
        clearTimeout(setTimeEnd);
        createjs.Tween.removeTweens(install_now)
        stage.removeChild(install_now);
        removeAllEvent()
        var particle = new createjs.Shape();
        particle.graphics.f("#fafafa").dr(0, 0, stage.canvas.width, stage.canvas.height);
        particle.alpha = 0.7

        var bgcore = new createjs.Shape();
        bgcore.graphics.lf(["#2d3779", "#58407b"], [0, 1], stage.canvas.width / 4, 0, stage.canvas.width / 4, stage.canvas.height / 5);
        bgcore.graphics.rc(0, 0, stage.canvas.width / 1.7, stage.canvas.height / 4.5, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50);
        bgcore.x = (stage.canvas.width - stage.canvas.width / 1.7) / 2
        bgcore.y = stage.canvas.height / 3.3
        bgcore.alpha = 1

        var txt = game.scores > game.best ? "BEST" : "Your Score"
        var best = new createjs.Text(txt, "30px Impact", "#ffffff");
        best.scale = game.scores > game.best ? (stage.canvas.width / 6.5) / best.getMeasuredWidth() : (stage.canvas.width / 3) / best.getMeasuredWidth()
        best.x = (stage.canvas.width - best.getMeasuredWidth() * best.scale) / 2
        best.y = bgcore.y + best.getMeasuredHeight() * best.scale
        var text = new createjs.Text(game.scores, "30px Impact", "#ffffff");
        if (game.scores < 1000) {
            text.scale = (stage.canvas.width / 5) / text.getMeasuredWidth()
        } else {
            text.scale = (stage.canvas.width / 4.4) / text.getMeasuredWidth()
        }
        text.y = best.y + best.getMeasuredHeight() * best.scale * 2
        text.x = (stage.canvas.width - text.getMeasuredWidth() * text.scale) / 2


        var play_again = new createjs.Sprite(spriteSheet, "play_again");
        play_again.scale = (stage.canvas.width / 2.7) / play_again.getBounds().width
        play_again.x = (stage.canvas.width - play_again.getBounds().width * play_again.scale) / 2
        play_again.y = text.y + play_again.getBounds().height * play_again.scale * 3.5

        stage.addChild(particle, bgcore, best, text, play_again);

        var play_againx = play_again.x,
            play_againy = play_again.y,
            play_againscale = stage.canvas.width / 2.7 / play_again.getBounds().width;
        createjs.Tween.get(play_again, { loop: true })
            .to(
                {
                    scale: (stage.canvas.width / 4) / play_again.getBounds().width,
                    x: (stage.canvas.width - ((stage.canvas.width / 4) / play_again.getBounds().width) * play_again.getBounds().width) / 2,
                    y: play_againy - (stage.canvas.width / 5 - stage.canvas.width / 8) / 10,
                },
                500,
                createjs.Ease.linear
            )
            .to({ scale: play_againscale, x: play_againx, y: play_againy }, 500, createjs.Ease.linear);
        play_again.addEventListener("click", () => { getLinkInstall() }, false);


    }
}
function checkLose() {
    var mainGr = [];
    var close = false;
    for (let i = 0; i < blockUse.length; i++) {
        if (blockUse[i].target != null) {
            const blockChild = blockUse[i].target.children;
            var indexChild = [];
            for (let i = 0; i < blockChild.length; i++) {
                var block = blockChild[i];
                var index = lToIGr({ x: block.x, y: block.y });
                indexChild.push(index)
            }
            mainGr.push(indexChild)
        }
    }
    var map = game.map
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const item = map[y][x];
            if (!item.existing) {
                for (let i = 0; i < mainGr.length; i++) {
                    var grTrue = true;
                    for (let j = 0; j < mainGr[i].length; j++) {
                        const index = mainGr[i][j];
                        var indexGrX = x + index.x
                        var indexGrY = y + index.y
                        if (indexGrY > 12 || indexGrX > 12) grTrue = false
                        else {
                            var block = map[indexGrY][indexGrX]
                            if (block.existing) grTrue = false
                        }
                    }
                    if (grTrue) {
                        close = true
                        break;
                    }
                }
            }

        }
    }
    return !close
}
// location to index
function lToI(location) {
    var x = (location.x - defaultX) / (game.block.width + tempX);
    var y = (location.y - defaultY) / (game.block.height + tempY);
    var decimalX = parseFloat("0." + (x + "").split(".")[1])
    var decimalY = parseFloat("0." + (y + "").split(".")[1])
    if (y < 0) y = 0.0
    if (x < 0) x = 0.0
    var xtemp = decimalX > 0.7 ? Math.round(x) : Math.floor(x)
    var ytemp = decimalY > 0.7 ? Math.round(y) : Math.floor(y)
    return { x: xtemp, y: ytemp };
}
function lToIGr(location) {
    var x = location.x / blockUse[groupCurr].sizeItem;
    var y = location.y / blockUse[groupCurr].sizeItem;
    return { x: Math.round(x), y: Math.round(y) };
}
//Support
function getLinkInstall() {
    window.open("https://play.google.com/store/apps/details?id=com.ezos.block.tenten.puzzle")
}

function convertBlock(id) {
    switch (id) {
        case 0:
            return "block_blue";
        case 1:
            return "block_cyan";
        case 2:
            return "block_green";
        case 3:
            return "block_orange";
        case 4:
            return "block_pink";
        case 5:
            return "block_purple";
        case 6:
            return "block_red";
        case 7:
            return "block_yellow";
        case 100:
            return "square_hint";
        default:
            return null;
    }
}
function getDistance(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    return Math.sqrt(a * a + b * b);
}
function currentMouse(evt) {
    if (evt.type == 'mousedown') {
        if (isMobile) return { x: evt.currentTarget.x, y: evt.currentTarget.y }
        else return { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY }
    }
    else if (isMobile) return { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY }
    else return { x: evt.layerX, y: evt.layerY }
}

function setEndTime() {
    createjs.Tween.removeTweens(install_now)
    removeAllEvent()
    removeHand()

    var bg = new createjs.Sprite(spriteSheet, "bg");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;
    bg.alpha = 0.95


    var logo = new createjs.Sprite(spriteSheet, "logo");
    logo.scale = (stage.canvas.width / 3.5) / logo.getBounds().width
    logo.x = (stage.canvas.width - logo.getBounds().width * logo.scale) / 2
    logo.y = stage.canvas.height / 9
    logo.shadow = new createjs.Shadow('#000', 0, 0, 10);

    var vlock = new createjs.Sprite(spriteSheet, "vlock");
    vlock.scale = (stage.canvas.width * 2.3 / 3) / vlock.getBounds().width
    vlock.x = (stage.canvas.width - vlock.getBounds().width * vlock.scale) / 2
    vlock.y = logo.y + logo.getBounds().height * logo.scale * 1.3

    var img1010 = new createjs.Sprite(spriteSheet, "img1010");
    img1010.scale = vlock.scale
    img1010.x = (stage.canvas.width - img1010.getBounds().width * img1010.scale) / 2
    img1010.y = vlock.y + vlock.getBounds().height * vlock.scale * 1.2


    var btn_continue = new createjs.Sprite(spriteSheet, "continue");
    btn_continue.scale = (stage.canvas.width / 2.7) / btn_continue.getBounds().width
    btn_continue.x = (stage.canvas.width - btn_continue.getBounds().width * btn_continue.scale) / 2
    btn_continue.y = img1010.y + img1010.getBounds().height * img1010.scale * 1.8

    stage.addChild(bg, btn_continue, logo, vlock, img1010);


    var btn_continuex = btn_continue.x,
        btn_continuey = btn_continue.y,
        btn_continuescale = stage.canvas.width / 2.7 / btn_continue.getBounds().width;
    createjs.Tween.get(btn_continue, { loop: true })
        .to(
            {
                scale: (stage.canvas.width / 4) / btn_continue.getBounds().width,
                x: (stage.canvas.width - ((stage.canvas.width / 4) / btn_continue.getBounds().width) * btn_continue.getBounds().width) / 2,
                y: btn_continuey - (stage.canvas.width / 5 - stage.canvas.width / 8) / 10,
            },
            500,
            createjs.Ease.linear
        )
        .to({ scale: btn_continuescale, x: btn_continuex, y: btn_continuey }, 500, createjs.Ease.linear);
    btn_continue.addEventListener("click", () => { getLinkInstall() }, false);
}

function updateScore() {
    var upScore = setInterval(function () {
        scoresTemp += 1;
        if (scoresTemp <= game.scores) {
            txtScores.txt.x = txtScores.x - txtScores.txt.getMeasuredWidth() * txtScores.txt.scale;
            txtScores.txt.y = txtScores.y + txtScores.txt.getMeasuredHeight() * txtScores.txt.scale / 2;
            txtScores.txt.text = scoresTemp;
            if (scoresTemp > game.best) {
                game.best = scoresTemp
                txtBest.txt.x = txtBest.x - txtBest.txt.getMeasuredWidth() * txtBest.txt.scale;
                txtBest.txt.y = txtBest.y + txtBest.txt.getMeasuredHeight() * txtBest.txt.scale / 2;
                txtBest.txt.text = scoresTemp;
            }
        }
        else clearInterval(upScore);
    }, 30);
}

function tick(event) {
    if (update) {
        stage.update(event);
        intestines_spin.rotation += rotation_time;
        if (rotation_time > 0 && rotation_time <= 20) endRotation();
    }
}

function endRotation() {
    if (Math.abs(intestines_spin.rotation % 360 - 360) >= 0 && Math.abs(intestines_spin.rotation % 360 - 360) <= 72 && level_rotation == 0) {
        clearInterval(spin_rotation);
        intestines_spin.rotation = -37;
        rotation_time = 0;
        startLevel();
    }
    else if (Math.abs(intestines_spin.rotation % 360 - 360) > 72 && Math.abs(intestines_spin.rotation % 360 - 360) <= 144 && level_rotation == 1) {
        clearInterval(spin_rotation);
        intestines_spin.rotation = -108;
        rotation_time = 0;
        startLevel();
    }
    else if (Math.abs(intestines_spin.rotation % 360 - 360) > 144 && Math.abs(intestines_spin.rotation % 360 - 360) <= 216 && level_rotation == 2) {
        clearInterval(spin_rotation);
        intestines_spin.rotation = 180;
        rotation_time = 0;
        startLevel();
    }
    else if (Math.abs(intestines_spin.rotation % 360 - 360) > 216 && Math.abs(intestines_spin.rotation % 360 - 360) <= 288 && level_rotation == 3) {
        clearInterval(spin_rotation);
        intestines_spin.rotation = 108;
        rotation_time = 0;
        startLevel();
    }
    else if (Math.abs(intestines_spin.rotation % 360 - 360) > 288 && Math.abs(intestines_spin.rotation % 360 - 360) <= 360 && level_rotation == 4) {
        clearInterval(spin_rotation);
        intestines_spin.rotation = 37;
        rotation_time = 0;
        startLevel();
    }
}
function endRotation1() {
    switch (level_rotation) {
        case 0:
            clearInterval(spin_rotation);
            intestines_spin.rotation = -37;
            rotation_time = 0;
            startLevel();
            break;
        case 1:
            clearInterval(spin_rotation);
            intestines_spin.rotation = -108;
            rotation_time = 0;
            startLevel();
            break;
        case 2:
            clearInterval(spin_rotation);
            intestines_spin.rotation = 180;
            rotation_time = 0;
            startLevel();
            break;
        case 3:
            clearInterval(spin_rotation);
            intestines_spin.rotation = 108;
            rotation_time = 0;
            startLevel();
            break;
        case 4:
            clearInterval(spin_rotation);
            intestines_spin.rotation = 37;
            rotation_time = 0;
            startLevel();
            break;

    }
}
function rotationSpin() {
    if (isMobile) canvas.removeEventListener("mousedown", rotationSpin, supportsPassive ? { passive: true } : false);
    else canvas.removeEventListener("mousedown", rotationSpin);
    level_rotation = Math.floor(Math.random() * 5);
    rotation_time = 60;
    var xxx = 0;
    spin_rotation = setInterval(function () {
        if (rotation_time <= 20) {
            rotation_time--;
            if (rotation_time <= 0) clearInterval(spin_rotation);
        } else {
            rotation_time -= (2 + xxx);
            xxx++;
        }
    }, 100);
}