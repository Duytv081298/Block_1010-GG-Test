
var isMobile = detectMobile();
var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
width = isMobile ? width : height / 1.7;
var canvas, stage, update = true;
var supportsPassive = false, pressMove = false, pressUp = false;
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
    [-1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [6, 6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [6, 6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [6, 6, 6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [6, 6, 6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 6, 6, 6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 6, 6, -1, -1, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1],
    [-1, 6, 6, -1, -1, -1, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1],
    [-1, 6, 6, -1, -1, -1, -1, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1],
    [-1, 6, 6, -1, -1, -1, -1, -1, 6, 6, 6, 6, 6, 6, 6, -1, -1],
    [-1, 6, 6, -1, -1, -1, -1, -1, -1, 6, 6, 6, 6, 6, 6, 6, -1],
    [-1, 6, 6, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, 6, 6, 6, 6],
    [-1, 6, 6, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, 6, 6, 6, 6],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
];
//game initialization
async function gameinit() {
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
            [1, 1, 882, 882, 0, 0, 0],
            [885, 1, 874, 231, 0, 0, 0],
            [1761, 1, 46, 46, 0, 0, 0],
            [1761, 49, 46, 46, 0, 0, 0],
            [1761, 97, 46, 46, 0, 0, 0],
            [1761, 145, 46, 46, 0, 0, 0],
            [1761, 193, 46, 46, 0, 0, 0],
            [885, 234, 864, 110, 0, 0, 0],
            [1751, 241, 46, 46, 0, 0, 0],
            [1751, 289, 46, 46, 0, 0, 0],
            [1751, 337, 46, 46, 0, 0, 0],
            [885, 346, 300, 533, 0, 0, 0],
            [1187, 385, 622, 111, 0, 0, 0],
            [1187, 498, 300, 300, 0, 0, 0],
            [1489, 498, 300, 99, 0, 0, 0],
            [1187, 800, 205, 67, 0, 0, 0],
            [1394, 800, 200, 53, 0, 0, 0],
            [1596, 599, 200, 53, 0, 0, 0],
            [1596, 654, 200, 53, 0, 0, 0],
            [1489, 709, 45, 53, 0, -5, -1],
            [1536, 599, 46, 46, 0, 0, 0]
        ],

        "animations": {
            "img1010": { "frames": [15] },
            "grid": { "frames": [0] },
            "bot": { "frames": [1] },
            "block_blue": { "frames": [2] },
            "block_cyan": { "frames": [3] },
            "block_green": { "frames": [4] },
            "block_orange": { "frames": [5] },
            "block_pink": { "frames": [6] },
            "score": { "frames": [7] },
            "block_purple": { "frames": [8] },
            "block_red": { "frames": [9] },
            "block_yellow": { "frames": [10] },
            "bg": { "frames": [11] },
            "best": { "frames": [12] },
            "logo": { "frames": [13] },
            "vlock": { "frames": [14] },
            "play_again": { "frames": [16] },
            "continue": { "frames": [17] },
            "install_now": { "frames": [18] },
            "hand_tut": { "frames": [19] },
            "square_hint": { "frames": [20] }
        },
    });
    setBackground();
    stage.addChild(containerMain);
    game.map = setMap(map);
    createGroupBlockFree();
    addHand()
    setTimeEnd = setTimeout(setEndTime, 45000)
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

    var bg = new createjs.Sprite(spriteSheet, "bg");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;


    var best = new createjs.Sprite(spriteSheet, "best");
    best.scale = (stage.canvas.width / 2) / best.getBounds().width;
    best.x = stage.canvas.width / 14
    best.y = stage.canvas.height / 15


    var bestText = new createjs.Text('BEST', "30px Haettenschweiler", "#24e6f1");
    bestText.scaleX = ((best.getBounds().height * best.scale * 0.9) / bestText.getMeasuredHeight()) / 1.5;
    bestText.scaleY = bestText.scaleX / 1.5
    bestText.x = best.x + stage.canvas.width / 25
    bestText.y = best.y + (best.getBounds().height * best.scaleY - bestText.getMeasuredHeight() * bestText.scale) / 1.5

    var txtBesttemp = new createjs.Text(game.best, "30px Haettenschweiler", "#eaf7ff");
    txtBesttemp.scaleX = bestText.scaleX
    txtBesttemp.scaleY = bestText.scaleY
    txtBesttemp.x = best.x + best.getBounds().width * best.scale - stage.canvas.width / 10 - txtBesttemp.getMeasuredWidth() * txtBesttemp.scale
    txtBesttemp.y = best.y + (best.getBounds().height * best.scale - txtBesttemp.getMeasuredHeight() * txtBesttemp.scale) / 1.5




    txtBest = {
        x: best.x + best.getBounds().width * best.scale - stage.canvas.width / 10,
        y: best.y + best.getBounds().height * best.scale / 1.5,
        txt: txtBesttemp
    }
    var score = new createjs.Sprite(spriteSheet, "score");
    score.scale = best.scale
    score.x = best.x
    score.y = best.y + best.getBounds().height * best.scale * 1.5


    var scoreText = new createjs.Text('SCORE', "30px Haettenschweiler", "#24e6f1");

    scoreText.scaleX = bestText.scaleX
    scoreText.scaleY = bestText.scaleY
    scoreText.x = score.x + stage.canvas.width / 25
    scoreText.y = score.y + (score.getBounds().height * score.scale - scoreText.getMeasuredHeight() * bestText.scale) / 1.5


    var txtScore = new createjs.Text(scoresTemp, "30px Haettenschweiler", "#eaf7ff");

    txtScore.scaleX = bestText.scaleX
    txtScore.scaleY = bestText.scaleY
    txtScore.x = score.x + score.getBounds().width * score.scale - stage.canvas.width / 10 - txtScore.getMeasuredWidth() * txtScore.scale
    txtScore.y = score.y + (score.getBounds().height * score.scale - txtScore.getMeasuredHeight() * txtScore.scale) / 1.5

    txtScores = {
        x: score.x + score.getBounds().width * score.scale - stage.canvas.width / 10,
        y: score.y + score.getBounds().height * score.scale / 1.5,
        txt: txtScore
    }

    var grid = new createjs.Sprite(spriteSheet, "grid");
    grid.scale = (stage.canvas.width * 2.6 / 3) / grid.getBounds().width;
    grid.x = (stage.canvas.width - grid.getBounds().width * grid.scale) / 2
    grid.y = score.y + score.getBounds().height * score.scale * 1.5


    var bot = new createjs.Sprite(spriteSheet, "bot");
    bot.scale = grid.scale
    bot.scaleY = bot.scale * 1.3;
    bot.x = (stage.canvas.width - bot.getBounds().width * bot.scale) / 2
    bot.y = grid.y + grid.getBounds().height * grid.scale * 1.07


    stage.addChild(bg, best, bestText, txtBest.txt, score, scoreText, txtScores.txt, grid, bot,);

    var block_cyan = new createjs.Sprite(spriteSheet, "block_cyan");

    game.scale = grid.scale
    defaultX = grid.x + 0.72 * block_cyan.getBounds().width * game.scale
    defaultY = grid.y + 0.74 * block_cyan.getBounds().height * game.scale
    game.block = { width: block_cyan.getBounds().width * game.scale, height: block_cyan.getBounds().height * game.scale };
    tempX = (grid.getBounds().width * game.scale - block_cyan.getBounds().width * game.scale * 17 - (defaultX - grid.x) * 2) / 16
    tempY = (grid.getBounds().height * game.scale - block_cyan.getBounds().height * game.scale * 17 - (defaultY - grid.y) * 2) / 16



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
        .to({ x: game.map[3][1].x, y: game.map[3][1].y }, 1500)
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
    distanceGTH = getDistance(location, { x: location.x, y: game.map[16][0].y })

    var target = blockUse[groupCurr].target;
    var scaleItem = blockUse[groupCurr].target.children[0].scale;
    var newScaleGroup = game.scale / scaleItem;
    var widthGrBlock = blockUse[groupCurr].width * storageBlock.height / 6 * target.scale
    var heightGrBlock = (blockUse[groupCurr].height + 2) * storageBlock.height / 6 * target.scale
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
        pressUp = true;
        var location = currentMouse(evt);
        var target = blockUse[groupCurr].target;
        var widthGrBlock = blockUse[groupCurr].width * storageBlock.height / 6 * target.scale
        var heightGrBlock = isMobile ? (blockUse[groupCurr].height + 2) * storageBlock.height / 6 * target.scale : blockUse[groupCurr].height * storageBlock.height / 6 * target.scale
        grWHCrr = { width: widthGrBlock, height: heightGrBlock }
        target.x = location.x - grWHCrr.width / 2;
        target.y = location.y - grWHCrr.height;
        var scaleItem = blockUse[groupCurr].target.children[0].scale;
        var newScaleGroup = game.scale / scaleItem;
        target.scale = newScaleGroup
        renderHint({ x: location.x - grWHCrr.width / 2, y: location.y - grWHCrr.height })
    }
}
function onMouseUp(evt) {
    if (pressUp) {

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
            // target.scale = blockUse[groupCurr].scale;
        }
        pressUp = false
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
    var render = true
    removeHint()
    removeBlockTemp()
    lowerBlock = false
    var hint = new createjs.Sprite(spriteSheet, "square_hint");
    hint.scale = game.scale;
    if (location.x >= game.map[0][0].x - game.block.width / 2 &&
        location.x < game.map[0][16].x + (1.5 - blockUse[groupCurr].width) * game.block.width &&
        location.y > game.map[0][0].y &&
        location.y < game.map[16][0].y + (1.5 - blockUse[groupCurr].height) * game.block.width) {
        var index = lToI(location)
        var blockChild = blockUse[groupCurr].target.children
        hintFree = []
        for (let i = 0; i < blockChild.length; i++) {
            var block = blockChild[i];
            var index1 = lToIGr({ x: block.x, y: block.y })
            var x = index.x + index1.x
            var y = index.y + index1.y
            var item = game.map[y][x]
            if (!item.existing) {
                array.push({ x: x, y: y })
            } else render = false
        }
    } else {
        hintFree = []
    }
    if (render) {
        for (let i = 0; i < array.length; i++) {
            const index = array[i];
            var item = game.map[index.y][index.x]
            game.map[index.y][index.x] = { x: item.x, y: item.y, existing: true, block: item.block, color: item.color, colorTemp: item.colorTemp, blockTemp: item.blockTemp }
            var newHint = hint.clone()
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
    for (let i = 0; i < 3; i++) {
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
function blockDie(item) {
    var block = new createjs.Sprite(spriteSheet, convertAnimations(blockUse[groupCurr].color));
    block.scale = game.scale * 1.2;
    block.x = item.x + game.block.width / 2 - block.getBounds().width * block.scale;
    block.y = item.y + game.block.height / 2 - block.getBounds().height * block.scale;
    stage.addChild(block);
    block.on("animationend", handleComplete);
    function handleComplete() {
        stage.removeChild(this);
        block = null;
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
        for (let y = 0; y < 17; y++) {
            const item = game.map[y][x];
            if (item.existing) arrtemp.push({ x: x, y: y });
        }
        if (arrtemp.length == 17) arrRemove = arrRemove.concat(arrtemp);
        arrtemp = [];
    }
    for (let i = 0; i < checkY.length; i++) {
        const y = checkY[i];
        for (let x = 0; x < 17; x++) {
            const item = game.map[y][x];
            if (item.existing) arrtemp.push({ x: x, y: y });
        }
        if (arrtemp.length == 17) arrRemove = arrRemove.concat(arrtemp);
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
        particle.alpha = 0.4

        var bgcore = new createjs.Shape();
        bgcore.graphics.lf(["#2d3779", "#58407b"], [0, 1], stage.canvas.width / 4, 0, stage.canvas.width / 4, stage.canvas.height / 5);
        bgcore.graphics.rc(0, 0, stage.canvas.width / 2, stage.canvas.height / 5, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50);
        bgcore.x = (stage.canvas.width - stage.canvas.width / 2) / 2
        bgcore.y = stage.canvas.height / 4.7
        bgcore.alpha = 1

        var best = new createjs.Text('BEST', "Italic 30px Impact", "#ffffff");
        best.scale = (stage.canvas.width / 7) / best.getMeasuredWidth()
        best.x = (stage.canvas.width - best.getMeasuredWidth() * best.scale) / 2
        best.y = bgcore.y + best.getMeasuredHeight() * best.scale
        var text = new createjs.Text(game.scores, "30px Impact", "#ffffff");
        if (game.scores < 1000) {
            text.scale = (stage.canvas.width / 6.5) / text.getMeasuredWidth()
            text.x = (stage.canvas.width - text.getMeasuredWidth() * text.scale) / 2
            text.y = bgcore.y * 2 - text.getMeasuredHeight() * text.scale * 1.6
        } else {
            text.scale = (stage.canvas.width / 5.5) / text.getMeasuredWidth()
            text.x = (stage.canvas.width - text.getMeasuredWidth() * text.scale) / 2
            text.y = bgcore.y * 2 - text.getMeasuredHeight() * text.scale * 1.8
        }


        var play_again = new createjs.Sprite(spriteSheet, "play_again");
        play_again.scale = (stage.canvas.width / 2.7) / play_again.getBounds().width
        play_again.x = (stage.canvas.width - play_again.getBounds().width * play_again.scale) / 2
        play_again.y = text.y + play_again.getBounds().height * play_again.scale * 2.5

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
                        if (indexGrY > 16 || indexGrX > 16) grTrue = false
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
function tick(event) {
    if (update) {
        stage.update(event);
    }
}

//Support
function getLinkInstall() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
        window.open("https://play.google.com/store/apps/details?id=com.puzzlegamefree.blockpuzzle.gems.jewel&hl=en")
    } else if (/android/i.test(userAgent)) {
        window.open("https://play.google.com/store/apps/details?id=com.puzzlegamefree.blockpuzzle.gems.jewel&hl=en");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.open("https://play.google.com/store/apps/details?id=com.puzzlegamefree.blockpuzzle.gems.jewel&hl=en");
    } else {
        window.open("https://play.google.com/store/apps/details?id=com.puzzlegamefree.blockpuzzle.gems.jewel&hl=en")
    }
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
function convertAnimations(color) {
    switch (color) {
        case 0:
            return "explosive_cyan";
        case 1:
            return "explosive_green";
        case 2:
            return "explosive_orange";
        case 3:
            return "explosive_pink";
        case 4:
            return "explosive_purple";
        case 5:
            return "explosive_red";
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
function callEndTime() {

}
function setEndTime() {
    createjs.Tween.removeTweens(install_now)
    removeAllEvent()
    removeHand()

    var bg = new createjs.Sprite(spriteSheet, "bg");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;
    bg.alpha = 0.9


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
            txtScores.txt.y = txtScores.y - txtScores.txt.getMeasuredHeight() * txtScores.txt.scale / 1.5;
            txtScores.txt.text = scoresTemp;
            if (scoresTemp > game.best) {
                game.best = scoresTemp
                txtBest.txt.x = txtBest.x - txtBest.txt.getMeasuredWidth() * txtBest.scale;
                txtBest.txt.y = txtBest.y - txtBest.txt.getMeasuredHeight() * txtBest.txt.scale / 1.5;
                txtBest.txt.text = scoresTemp;
            }
        }
        else clearInterval(upScore);
    }, 30);
}