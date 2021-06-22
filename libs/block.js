
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
var randomN;
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
    setTimeEnd = setTimeout(setEndTime, 60000)
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
    randomN = 1.5
    console.log('ssssssssssss');

    var bg = new createjs.Sprite(spriteSheet, "bg");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;


    var best = new createjs.Sprite(spriteSheet, "best");
    best.scale = (stage.canvas.width / 2) / best.getBounds().width;
    best.x = stage.canvas.width / 14
    best.y = stage.canvas.height / 15


    var bestText = new createjs.Text('BEST', "30px Haettenschweiler", "#24e6f1");
    bestText.scaleX = ((best.getBounds().height * best.scale * 0.7) / bestText.getMeasuredHeight());
    bestText.scaleY = bestText.scaleX / 1.3
    bestText.x = best.x + stage.canvas.width / 25
    bestText.y = best.y + (best.getBounds().height * best.scale ) / 3

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
        snd.play();
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
    if (removeArr.length) snd1.play();
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
        window.open("https://play.google.com/store/apps/details?id=com.blockpuzzle.galaxy.bluedream.puzzle")
    } else if (/android/i.test(userAgent)) {
        window.open("https://play.google.com/store/apps/details?id=com.blockpuzzle.galaxy.bluedream.puzzle")
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.open("https://play.google.com/store/apps/details?id=com.blockpuzzle.galaxy.bluedream.puzzle")
    } else {
        window.open("https://play.google.com/store/apps/details?id=com.blockpuzzle.galaxy.bluedream.puzzle")
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
var snd = new Audio('data:audio/mpeg;base64,SUQzAwAAAAEEdVRZRVIAAAAGAAAAMjAyMQBUREFUAAAABgAAADE1MDYAVElNRQAAAAYAAAAxMzQ1AFBSSVYAADo7AABYTVAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcERNPSJodHRwOi8vbnMuYWRvYmUuY29tL3htcC8xLjAvRHluYW1pY01lZGlhLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOmJleHQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20vYndmL2JleHQvMS4wLyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplOWVjNjhhOC0yYWYyLTkzNGUtOTJjNC0xODIxNmMyZjQ4YmIiCiAgIHhtcE1NOkRvY3VtZW50SUQ9IjM1YjY0YTEzLTZhM2QtNDZhMS1iZWI0LWY3OWUwMDAwMDA1OSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQyYTkxMjliLTk0YWQtOGQ0NC04NzZlLWIyODZlOTYwYzA2YSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNi0xNVQxMzo0NjowOCswNzowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDYtMTVUMTM6NDY6MDgrMDc6MDAiCiAgIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA2LTE1VDEzOjQ1OjM4KzA3OjAwIgogICB4bXBETTphdWRpb1NhbXBsZVJhdGU9Ii0xIgogICB4bXBETTphdWRpb1NhbXBsZVR5cGU9IjE2SW50IgogICB4bXBETTphdWRpb0NoYW5uZWxUeXBlPSJTdGVyZW8iCiAgIHhtcERNOnN0YXJ0VGltZVNjYWxlPSI2MCIKICAgeG1wRE06c3RhcnRUaW1lU2FtcGxlU2l6ZT0iMSIKICAgZGM6Zm9ybWF0PSJNUDMiCiAgIGJleHQ6b3JpZ2luYXRvcj0iQWRvYmUgUHJlbWllcmUgUHJvIDIwMjAuMCAoV2luZG8iCiAgIGJleHQ6b3JpZ2luYXRpb25EYXRlPSIyMDIxLTA2LTE1IgogICBiZXh0Om9yaWdpbmF0aW9uVGltZT0iMTM6NDQ6MTYiCiAgIGJleHQ6dGltZVJlZmVyZW5jZT0iNDA0MDAwIgogICBiZXh0OnZlcnNpb249IjEiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0iMDNlM2VmZmMtZDcyMS04NjVkLTgyMDItNjZiYzAwMDAwMDg2IgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTE1VDEzOjQ2OjA4KzA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQcmVtaWVyZSBQcm8gMjAyMC4wIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0iZjJlMWFlZjgtNjA0NC0zYmVjLTRiY2EtMGViYjAwMDAwMDg2IgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTE1VDEzOjQ0OjE2KzA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQcmVtaWVyZSBQcm8gMjAyMC4wIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0iZTFkYWU0NzktODQzZi0wODg5LTFhMDItZTIxMjAwMDAwMDZlIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA0LTIwVDEzOjQ1OjEyKzA3OjAwIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249ImNyZWF0ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjE3NzY3MjYtY2Y2Ny0yYTRmLTkzMDEtZTI0NjNkZGQ1YjI2IgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA0LTA4VDE0OjAzOjQ1KzA3OjAwIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVhYTM2MTFhLWRmNTctYzg0ZS1iNjgxLTEzMGUyM2NlZmM3ZSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNC0wOFQxNDo1MzowNCswNzowMCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL2NvbnRlbnQiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTAxMmNmMjQtNzJkOC1iNjQ4LWI0YzItYjc3NjM2NzIzMmRmIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA0LTIwVDEzOjIzOjMzKzA3OjAwIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvY29udGVudCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ZjNlNTEyNS05NTFlLTQ1NDQtODAyNy1hMjk4MTA5ODU1NGMiCiAgICAgIHN0RXZ0OndoZW49IjIwMjEtMDQtMjBUMTM6NDM6NDIrMDc6MDAiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NGQ1MTI4MGYtY2YwZi1iMzQwLWE5N2ItNzA2Y2VjZWIyZDQyIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA0LTIwVDEzOjQ1OjEyKzA3OjAwIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjM5ZDFhNTU2LTgwZmYtNjM0Zi1iYWQ3LTFkMGU2OTIxOTlmMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNC0yMFQxMzo0NToxMiswNzowMCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmRmZjRhOTZiLTA1YjUtMmU0YS1hZGUzLTBhZDBjNzMwNTRmNyIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNi0xNVQxMzo0NDoxNiswNzowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUHJlbWllcmUgUHJvIDIwMjAuMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2Y1MmUxNzItOGE1OC1lOTQxLTgwZTMtZDUwNWQ2MDZlOWMxIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTE1VDEzOjQ0OjE2KzA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQcmVtaWVyZSBQcm8gMjAyMC4wIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphOTI4ZjMzYS1mMGEyLTNjNDctODBjNC05ZTdlYzc0NDk3NDAiCiAgICAgIHN0RXZ0OndoZW49IjIwMjEtMDYtMTVUMTM6NDQ6MTYrMDc6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFByZW1pZXJlIFBybyAyMDIwLjAgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Njk2ODdhNTMtZDAwOC1mZDQ5LWEwYmMtY2EzODM5ZGQ3ZGYzIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTE1VDEzOjQ0OjI1KzA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQcmVtaWVyZSBQcm8gMjAyMC4wIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0YjUwNDE5OS0zNmVjLTk4NDgtOTU2NC1hOTNiZmJhYzQ4NTgiCiAgICAgIHN0RXZ0OndoZW49IjIwMjEtMDYtMTVUMTM6NDQ6MjUrMDc6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFByZW1pZXJlIFBybyAyMDIwLjAgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEveG1wRE0vVHJhY2tzIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjg3MGQzMGJhLTMwMmItYjI0NS05N2Q5LWY4YTNjYjc0MzA2OCIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNi0xNVQxMzo0NjowOCswNzowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUHJlbWllcmUgUHJvIDIwMjAuMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTllYzY4YTgtMmFmMi05MzRlLTkyYzQtMTgyMTZjMmY0OGJiIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTE1VDEzOjQ2OjA4KzA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQcmVtaWVyZSBQcm8gMjAyMC4wIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHhtcE1NOkluZ3JlZGllbnRzPgogICAgPHJkZjpCYWc+CiAgICAgPHJkZjpsaQogICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAwMmNlNzJlLTVmOTQtNzU0Mi1hMzU4LWU1OTg5NzZhOTU5MCIKICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ3NjgwMDBmMzA3MjAiCiAgICAgIHN0UmVmOnRvUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgc3RSZWY6bWFza01hcmtlcnM9Ik5vbmUiLz4KICAgIDwvcmRmOkJhZz4KICAgPC94bXBNTTpJbmdyZWRpZW50cz4KICAgPHhtcE1NOkRlcml2ZWRGcm9tCiAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRiNTA0MTk5LTM2ZWMtOTg0OC05NTY0LWE5M2JmYmFjNDg1OCIKICAgIHN0UmVmOmRvY3VtZW50SUQ9IjkzZGYzZDZlLTk0ZDgtNjdkMS00ZTJhLWZhODgwMDAwMDA1OSIKICAgIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMmZlYjJjMy03OGFlLWEzNDktYTZhMS1hYzI3ZjRhNjVlYzAiLz4KICAgPHhtcE1NOlBhbnRyeT4KICAgIDxyZGY6QmFnPgogICAgIDxyZGY6bGk+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24KICAgICAgIHhtcDpDcmVhdGVEYXRlPSIxOTA0LTAxLTAxVDAwOjAwWiIKICAgICAgIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTIwVDEzOjQzOjQxKzA3OjAwIgogICAgICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNC0yMFQxMzo0Mzo0MSswNzowMCIKICAgICAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgICAgICB4bXBNTTpJbnN0YW5jZUlEPSIwYjdiMzljOS1jYmQ0LWM2YWEtNjA4OS1kMTE1MDAwMDAwODYiCiAgICAgICB4bXBNTTpEb2N1bWVudElEPSJlZjk2ZWMxYi00N2JlLTY5OGEtYTdlMS0yNWM2MDAwMDAwNTkiCiAgICAgICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzBjOWVkMmEtYmQ2MC1jMDRlLWFiNTItNzlkODNiN2ZhOGVkIj4KICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICA8cmRmOlNlcT4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9IjBiN2IzOWM5LWNiZDQtYzZhYS02MDg5LWQxMTUwMDAwMDA4NiIKICAgICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNC0yMFQxMzo0Mzo0MSswNzowMCIKICAgICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgICAgPC9yZGY6U2VxPgogICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgIDx4bXBETTpkdXJhdGlvbgogICAgICAgeG1wRE06dmFsdWU9IjE4ODAwIgogICAgICAgeG1wRE06c2NhbGU9IjEvMTAwMCIvPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICA8L3JkZjpsaT4KICAgICA8cmRmOmxpPgogICAgICA8cmRmOkRlc2NyaXB0aW9uCiAgICAgICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5hZnRlcmVmZmVjdHMuY29tcCIKICAgICAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDAyY2U3MmUtNWY5NC03NTQyLWEzNTgtZTU5ODk3NmE5NTkwIj4KICAgICAgPGRjOnRpdGxlPgogICAgICAgPHJkZjpBbHQ+CiAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5kb2NfMjwvcmRmOmxpPgogICAgICAgPC9yZGY6QWx0PgogICAgICA8L2RjOnRpdGxlPgogICAgICA8eG1wTU06SW5ncmVkaWVudHM+CiAgICAgICA8cmRmOkJhZz4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDAyYjNiYTktNDNjOC0wNTRhLTg1MzQtNmUzOWUwMDM1ZjFmIgogICAgICAgICBzdFJlZjpmcm9tUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgICAgc3RSZWY6dG9QYXJ0PSJ0aW1lOjBkNzY4MDAwZjMwNzIwIgogICAgICAgICBzdFJlZjptYXNrTWFya2Vycz0iTm9uZSIvPgogICAgICAgPC9yZGY6QmFnPgogICAgICA8L3htcE1NOkluZ3JlZGllbnRzPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICA8L3JkZjpsaT4KICAgICA8cmRmOmxpPgogICAgICA8cmRmOkRlc2NyaXB0aW9uCiAgICAgICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5hZnRlcmVmZmVjdHMubGF5ZXIiCiAgICAgICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1YjYzYTI4LTkxMTgtMzc0OC1hMjUxLWViYmYzODM5ODk4MSI+CiAgICAgIDxkYzp0aXRsZT4KICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+MDwvcmRmOmxpPgogICAgICAgPC9yZGY6QWx0PgogICAgICA8L2RjOnRpdGxlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICA8L3JkZjpsaT4KICAgICA8cmRmOmxpPgogICAgICA8cmRmOkRlc2NyaXB0aW9uCiAgICAgICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5hZnRlcmVmZmVjdHMubGF5ZXIiCiAgICAgICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQwMmIzYmE5LTQzYzgtMDU0YS04NTM0LTZlMzllMDAzNWYxZiI+CiAgICAgIDxkYzp0aXRsZT4KICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+NC41XzI8L3JkZjpsaT4KICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPHhtcE1NOkluZ3JlZGllbnRzPgogICAgICAgPHJkZjpCYWc+CiAgICAgICAgPHJkZjpsaQogICAgICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmZiMTk2ZTllLTA2NzctZDc0ZC05YzljLTJhYjIyOWE4YzU1OSIKICAgICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ3NjgwMDBmMzA3MjAiCiAgICAgICAgIHN0UmVmOnRvUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgICAgc3RSZWY6bWFza01hcmtlcnM9Ik5vbmUiLz4KICAgICAgIDwvcmRmOkJhZz4KICAgICAgPC94bXBNTTpJbmdyZWRpZW50cz4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgPC9yZGY6bGk+CiAgICAgPHJkZjpsaT4KICAgICAgPHJkZjpEZXNjcmlwdGlvbgogICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi92bmQuYWRvYmUuYWZ0ZXJlZmZlY3RzLmxheWVyIgogICAgICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0YWI3MzIwNS03NzFlLWMwNDctYTk3My0zMjZmMWU5N2IyNjMiPgogICAgICA8ZGM6dGl0bGU+CiAgICAgICA8cmRmOkFsdD4KICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPlNoYXBlIExheWVyIDE8L3JkZjpsaT4KICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgPC9yZGY6bGk+CiAgICAgPHJkZjpsaT4KICAgICAgPHJkZjpEZXNjcmlwdGlvbgogICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi92bmQuYWRvYmUuYWZ0ZXJlZmZlY3RzLmxheWVyIgogICAgICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0ZjJlNWIwYy01ZDk4LWY4NGYtOGFmNC1hMTk4MGI0ZjE4NzAiPgogICAgICA8ZGM6dGl0bGU+CiAgICAgICA8cmRmOkFsdD4KICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPkJsYWNrIFNvbGlkIDI8L3JkZjpsaT4KICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgPC9yZGY6bGk+CiAgICAgPHJkZjpsaT4KICAgICAgPHJkZjpEZXNjcmlwdGlvbgogICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi92bmQuYWRvYmUuYWZ0ZXJlZmZlY3RzLmxheWVyIgogICAgICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5YzNhOWI4NC03N2M4LWI3NDQtYTgyMi01Njg4M2I2MzY0OTUiPgogICAgICA8ZGM6dGl0bGU+CiAgICAgICA8cmRmOkFsdD4KICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPm1haW48L3JkZjpsaT4KICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPHhtcE1NOkluZ3JlZGllbnRzPgogICAgICAgPHJkZjpCYWc+CiAgICAgICAgPHJkZjpsaQogICAgICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE3ZTlmY2M4LTY2MmEtNzg0NS05MGI1LWM5OTkxY2FiYjFlZSIKICAgICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ3MDc1ODRmMzA3MjAiCiAgICAgICAgIHN0UmVmOnRvUGFydD0idGltZTowZDcwNzU4NGYzMDcyMCIKICAgICAgICAgc3RSZWY6bWFza01hcmtlcnM9Ik5vbmUiLz4KICAgICAgIDwvcmRmOkJhZz4KICAgICAgPC94bXBNTTpJbmdyZWRpZW50cz4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgPC9yZGY6bGk+CiAgICAgPHJkZjpsaT4KICAgICAgPHJkZjpEZXNjcmlwdGlvbgogICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi92bmQuYWRvYmUuYWZ0ZXJlZmZlY3RzLmNvbXAiCiAgICAgICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmE3ZTlmY2M4LTY2MmEtNzg0NS05MGI1LWM5OTkxY2FiYjFlZSI+CiAgICAgIDxkYzp0aXRsZT4KICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+bWFpbjwvcmRmOmxpPgogICAgICAgPC9yZGY6QWx0PgogICAgICA8L2RjOnRpdGxlPgogICAgICA8eG1wTU06SW5ncmVkaWVudHM+CiAgICAgICA8cmRmOkJhZz4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Y2M5NWIwZjItODI2Yy1mMDQzLWJkMWYtZTBlYWEzNzUyNGJkIgogICAgICAgICBzdFJlZjpmcm9tUGFydD0idGltZTo4MzMxMDM4MjcwMjdmMjU0MDE2MDAwMDAwZDM2OTY3MjczOTQ1OTVmMjU0MDE2MDAwMDAwIgogICAgICAgICBzdFJlZjp0b1BhcnQ9InRpbWU6MGQzNDY2MjRmMzA3MjAiCiAgICAgICAgIHN0UmVmOm1hc2tNYXJrZXJzPSJOb25lIi8+CiAgICAgICA8L3JkZjpCYWc+CiAgICAgIDwveG1wTU06SW5ncmVkaWVudHM+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgIDwvcmRmOmxpPgogICAgIDxyZGY6bGk+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24KICAgICAgIGRjOmZvcm1hdD0iYXBwbGljYXRpb24vdm5kLmFkb2JlLmFmdGVyZWZmZWN0cy5sYXllciIKICAgICAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Y2M5NWIwZjItODI2Yy1mMDQzLWJkMWYtZTBlYWEzNzUyNGJkIj4KICAgICAgPGRjOnRpdGxlPgogICAgICAgPHJkZjpBbHQ+CiAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij4yMDIxLTA0LTA4IDE0LTI4LTAxLm1wNDwvcmRmOmxpPgogICAgICAgPC9yZGY6QWx0PgogICAgICA8L2RjOnRpdGxlPgogICAgICA8eG1wTU06SW5ncmVkaWVudHM+CiAgICAgICA8cmRmOkJhZz4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0UmVmOmluc3RhbmNlSUQ9IjBiN2IzOWM5LWNiZDQtYzZhYS02MDg5LWQxMTUwMDAwMDA4NiIKICAgICAgICAgc3RSZWY6ZG9jdW1lbnRJRD0iZWY5NmVjMWItNDdiZS02OThhLWE3ZTEtMjVjNjAwMDAwMDU5IgogICAgICAgICBzdFJlZjpmcm9tUGFydD0idGltZTo4MzMxMDM4MjcwMjdmMjU0MDE2MDAwMDAwZDM2OTY3MjczOTQ1OTVmMjU0MDE2MDAwMDAwIgogICAgICAgICBzdFJlZjp0b1BhcnQ9InRpbWU6ODMzMTAzODI3MDI3ZjI1NDAxNjAwMDAwMGQzNjk2NzI3Mzk0NTk1ZjI1NDAxNjAwMDAwMCIKICAgICAgICAgc3RSZWY6bWFza01hcmtlcnM9IkFsbCIvPgogICAgICAgPC9yZGY6QmFnPgogICAgICA8L3htcE1NOkluZ3JlZGllbnRzPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICA8L3JkZjpsaT4KICAgICA8cmRmOmxpPgogICAgICA8cmRmOkRlc2NyaXB0aW9uCiAgICAgICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5hZnRlcmVmZmVjdHMubGF5ZXIiCiAgICAgICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmQ5MTE0ZjJmLTczMjQtZDI0Ny1hNDQ2LTdjMjFiYTQ5NjRlYiI+CiAgICAgIDxkYzp0aXRsZT4KICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+TmV3IGJsb2NrIHB1enpsZSAyMDIxPC9yZGY6bGk+CiAgICAgICA8L3JkZjpBbHQ+CiAgICAgIDwvZGM6dGl0bGU+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgIDwvcmRmOmxpPgogICAgIDxyZGY6bGk+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24KICAgICAgIGRjOmZvcm1hdD0iYXBwbGljYXRpb24vdm5kLmFkb2JlLmFmdGVyZWZmZWN0cy5jb21wIgogICAgICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmYjE5NmU5ZS0wNjc3LWQ3NGQtOWM5Yy0yYWIyMjlhOGM1NTkiPgogICAgICA8ZGM6dGl0bGU+CiAgICAgICA8cmRmOkFsdD4KICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPjQuNV8yPC9yZGY6bGk+CiAgICAgICA8L3JkZjpBbHQ+CiAgICAgIDwvZGM6dGl0bGU+CiAgICAgIDx4bXBNTTpJbmdyZWRpZW50cz4KICAgICAgIDxyZGY6QmFnPgogICAgICAgIDxyZGY6bGkKICAgICAgICAgc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNWI2M2EyOC05MTE4LTM3NDgtYTI1MS1lYmJmMzgzOTg5ODEiCiAgICAgICAgIHN0UmVmOmZyb21QYXJ0PSJ0aW1lOjBkNzA3NTg0ZjMwNzIwIgogICAgICAgICBzdFJlZjp0b1BhcnQ9InRpbWU6MGQ3MDc1ODRmMzA3MjAiCiAgICAgICAgIHN0UmVmOm1hc2tNYXJrZXJzPSJOb25lIi8+CiAgICAgICAgPHJkZjpsaQogICAgICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRhYjczMjA1LTc3MWUtYzA0Ny1hOTczLTMyNmYxZTk3YjI2MyIKICAgICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ3NjgwMDBmMzA3MjAiCiAgICAgICAgIHN0UmVmOnRvUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgICAgc3RSZWY6bWFza01hcmtlcnM9Ik5vbmUiLz4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NGYyZTViMGMtNWQ5OC1mODRmLThhZjQtYTE5ODBiNGYxODcwIgogICAgICAgICBzdFJlZjpmcm9tUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgICAgc3RSZWY6dG9QYXJ0PSJ0aW1lOjBkNzY4MDAwZjMwNzIwIgogICAgICAgICBzdFJlZjptYXNrTWFya2Vycz0iTm9uZSIvPgogICAgICAgIDxyZGY6bGkKICAgICAgICAgc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5YzNhOWI4NC03N2M4LWI3NDQtYTgyMi01Njg4M2I2MzY0OTUiCiAgICAgICAgIHN0UmVmOmZyb21QYXJ0PSJ0aW1lOjBkNzA3NTg0ZjMwNzIwIgogICAgICAgICBzdFJlZjp0b1BhcnQ9InRpbWU6MGQ3MDc1ODRmMzA3MjAiCiAgICAgICAgIHN0UmVmOm1hc2tNYXJrZXJzPSJOb25lIi8+CiAgICAgICAgPHJkZjpsaQogICAgICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmQ5MTE0ZjJmLTczMjQtZDI0Ny1hNDQ2LTdjMjFiYTQ5NjRlYiIKICAgICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ3NjgwMDBmMzA3MjAiCiAgICAgICAgIHN0UmVmOnRvUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgICAgc3RSZWY6bWFza01hcmtlcnM9Ik5vbmUiLz4KICAgICAgIDwvcmRmOkJhZz4KICAgICAgPC94bXBNTTpJbmdyZWRpZW50cz4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgPC9yZGY6bGk+CiAgICA8L3JkZjpCYWc+CiAgIDwveG1wTU06UGFudHJ5PgogICA8eG1wRE06c3RhcnRUaW1lY29kZQogICAgeG1wRE06dGltZUZvcm1hdD0iMjk5N0Ryb3BUaW1lY29kZSIKICAgIHhtcERNOnRpbWVWYWx1ZT0iMDA7MDA7MDg7MTIiLz4KICAgPHhtcERNOmFsdFRpbWVjb2RlCiAgICB4bXBETTp0aW1lVmFsdWU9IjAwOzAwOzA4OzEyIgogICAgeG1wRE06dGltZUZvcm1hdD0iMjk5N0Ryb3BUaW1lY29kZSIvPgogICA8eG1wRE06ZHVyYXRpb24KICAgIHhtcERNOnZhbHVlPSIyMjU0MDgwIgogICAgeG1wRE06c2NhbGU9IjEvOTAwMDAiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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s4qhVy1mpQahddZOEYx8lkTS1bjTMowWhuNIYqssLf3r9orz8Op48YiyIS48BEgka/+WEgFPLJP2////Wlr+kKmaQmMA///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7lGCLAARqUM9J70tqAAAJcAAAAQPAARqgAAAAAAAlwAAABP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7lEDjAAkYAEuAAAAIAAAJcAAAAQAAAS4AAAAgAAAlwAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFRBRwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIwMjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
var snd1 = new Audio('data:audio/mpeg;base64,SUQzAwAAAAEEdVRZRVIAAAAGAAAAMjAyMQBUREFUAAAABgAAADE1MDYAVElNRQAAAAYAAAAxMzQ2AFBSSVYAADo7AABYTVAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcERNPSJodHRwOi8vbnMuYWRvYmUuY29tL3htcC8xLjAvRHluYW1pY01lZGlhLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOmJleHQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20vYndmL2JleHQvMS4wLyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplMmNiMmQzYi04ODFjLTQ1NDItYjk4NS05MjJhZDIwNTM1MGQiCiAgIHhtcE1NOkRvY3VtZW50SUQ9Ijc4ZDZmOWFmLWZiYzctMDc5MS1hNDgxLWY1M2YwMDAwMDA1ZCIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQ0ZjViMGE2LTI2OTktZDg0OS1iMjgwLWQ5ZjhhNjg0OTQ3NSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNi0xNVQxMzo0Njo0MiswNzowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDYtMTVUMTM6NDY6NDIrMDc6MDAiCiAgIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA2LTE1VDEzOjQ2OjExKzA3OjAwIgogICB4bXBETTphdWRpb1NhbXBsZVJhdGU9Ii0xIgogICB4bXBETTphdWRpb1NhbXBsZVR5cGU9IjE2SW50IgogICB4bXBETTphdWRpb0NoYW5uZWxUeXBlPSJTdGVyZW8iCiAgIHhtcERNOnN0YXJ0VGltZVNjYWxlPSI2MCIKICAgeG1wRE06c3RhcnRUaW1lU2FtcGxlU2l6ZT0iMSIKICAgZGM6Zm9ybWF0PSJNUDMiCiAgIGJleHQ6b3JpZ2luYXRvcj0iQWRvYmUgUHJlbWllcmUgUHJvIDIwMjAuMCAoV2luZG8iCiAgIGJleHQ6b3JpZ2luYXRpb25EYXRlPSIyMDIxLTA2LTE1IgogICBiZXh0Om9yaWdpbmF0aW9uVGltZT0iMTM6NDY6MjMiCiAgIGJleHQ6dGltZVJlZmVyZW5jZT0iNTA2NDAwIgogICBiZXh0OnZlcnNpb249IjEiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0iOTljZjE3NDAtMzIyOS0yNWE3LTMzYWYtZjFjNDAwMDAwMDhhIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTE1VDEzOjQ2OjQyKzA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQcmVtaWVyZSBQcm8gMjAyMC4wIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0iMGI4ZmNhNjctYzZhNi03YTUwLTdiODEtZmI5NjAwMDAwMDhhIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTE1VDEzOjQ2OjIzKzA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQcmVtaWVyZSBQcm8gMjAyMC4wIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0iZTFkYWU0NzktODQzZi0wODg5LTFhMDItZTIxMjAwMDAwMDZlIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA0LTIwVDEzOjQ1OjEyKzA3OjAwIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249ImNyZWF0ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjE3NzY3MjYtY2Y2Ny0yYTRmLTkzMDEtZTI0NjNkZGQ1YjI2IgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA0LTA4VDE0OjAzOjQ1KzA3OjAwIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVhYTM2MTFhLWRmNTctYzg0ZS1iNjgxLTEzMGUyM2NlZmM3ZSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNC0wOFQxNDo1MzowNCswNzowMCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL2NvbnRlbnQiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTAxMmNmMjQtNzJkOC1iNjQ4LWI0YzItYjc3NjM2NzIzMmRmIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA0LTIwVDEzOjIzOjMzKzA3OjAwIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvY29udGVudCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ZjNlNTEyNS05NTFlLTQ1NDQtODAyNy1hMjk4MTA5ODU1NGMiCiAgICAgIHN0RXZ0OndoZW49IjIwMjEtMDQtMjBUMTM6NDM6NDIrMDc6MDAiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NGQ1MTI4MGYtY2YwZi1iMzQwLWE5N2ItNzA2Y2VjZWIyZDQyIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA0LTIwVDEzOjQ1OjEyKzA3OjAwIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjM5ZDFhNTU2LTgwZmYtNjM0Zi1iYWQ3LTFkMGU2OTIxOTlmMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNC0yMFQxMzo0NToxMiswNzowMCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmEwMzE0NjViLTIyNzQtOWU0MS04ZWM5LTM0NDY0Y2U1N2ZhOSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNi0xNVQxMzo0NjoyMyswNzowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUHJlbWllcmUgUHJvIDIwMjAuMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NDBmN2JhZTctZWJmZS1jNTQ1LTg1OTEtM2U4ZThhY2U1ZGU5IgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTE1VDEzOjQ2OjIzKzA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQcmVtaWVyZSBQcm8gMjAyMC4wIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NzBiMDgzNC0wYzQxLTUxNDgtYmI0YS00M2E5NjBlN2NiODMiCiAgICAgIHN0RXZ0OndoZW49IjIwMjEtMDYtMTVUMTM6NDY6MjMrMDc6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFByZW1pZXJlIFBybyAyMDIwLjAgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NzNiMWQ3NmMtZmNiYS1hODQ5LWI0MTYtZDk1YzNmMmMzNGJkIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTE1VDEzOjQ2OjMzKzA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQcmVtaWVyZSBQcm8gMjAyMC4wIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphNjQzZGMwNC1hNjk3LWJhNDYtYjkwNi0zZmQzMjVhNjFjZjgiCiAgICAgIHN0RXZ0OndoZW49IjIwMjEtMDYtMTVUMTM6NDY6MzMrMDc6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFByZW1pZXJlIFBybyAyMDIwLjAgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEveG1wRE0vVHJhY2tzIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQ5ZDZlMjY1LTI0YTctM2I0Ny04ZmU4LTI0ODE5Y2RhMTZmYiIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNi0xNVQxMzo0Njo0MiswNzowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUHJlbWllcmUgUHJvIDIwMjAuMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTJjYjJkM2ItODgxYy00NTQyLWI5ODUtOTIyYWQyMDUzNTBkIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTE1VDEzOjQ2OjQyKzA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQcmVtaWVyZSBQcm8gMjAyMC4wIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHhtcE1NOkluZ3JlZGllbnRzPgogICAgPHJkZjpCYWc+CiAgICAgPHJkZjpsaQogICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAwMmNlNzJlLTVmOTQtNzU0Mi1hMzU4LWU1OTg5NzZhOTU5MCIKICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ3NjgwMDBmMzA3MjAiCiAgICAgIHN0UmVmOnRvUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgc3RSZWY6bWFza01hcmtlcnM9Ik5vbmUiLz4KICAgIDwvcmRmOkJhZz4KICAgPC94bXBNTTpJbmdyZWRpZW50cz4KICAgPHhtcE1NOkRlcml2ZWRGcm9tCiAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE2NDNkYzA0LWE2OTctYmE0Ni1iOTA2LTNmZDMyNWE2MWNmOCIKICAgIHN0UmVmOmRvY3VtZW50SUQ9ImZkZTM2M2JjLWZiMmEtNGJiYS03ZTRlLWRlZWUwMDAwMDA1ZCIKICAgIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMWVjMjRjMS03MDhiLTU1NGYtYWI3OS01ZTFmYjRiMTg5NmYiLz4KICAgPHhtcE1NOlBhbnRyeT4KICAgIDxyZGY6QmFnPgogICAgIDxyZGY6bGk+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24KICAgICAgIHhtcDpDcmVhdGVEYXRlPSIxOTA0LTAxLTAxVDAwOjAwWiIKICAgICAgIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTIwVDEzOjQzOjQxKzA3OjAwIgogICAgICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNC0yMFQxMzo0Mzo0MSswNzowMCIKICAgICAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgICAgICB4bXBNTTpJbnN0YW5jZUlEPSIwYjdiMzljOS1jYmQ0LWM2YWEtNjA4OS1kMTE1MDAwMDAwODYiCiAgICAgICB4bXBNTTpEb2N1bWVudElEPSJlZjk2ZWMxYi00N2JlLTY5OGEtYTdlMS0yNWM2MDAwMDAwNTkiCiAgICAgICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzBjOWVkMmEtYmQ2MC1jMDRlLWFiNTItNzlkODNiN2ZhOGVkIj4KICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICA8cmRmOlNlcT4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9IjBiN2IzOWM5LWNiZDQtYzZhYS02MDg5LWQxMTUwMDAwMDA4NiIKICAgICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNC0yMFQxMzo0Mzo0MSswNzowMCIKICAgICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgICAgPC9yZGY6U2VxPgogICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgIDx4bXBETTpkdXJhdGlvbgogICAgICAgeG1wRE06dmFsdWU9IjE4ODAwIgogICAgICAgeG1wRE06c2NhbGU9IjEvMTAwMCIvPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICA8L3JkZjpsaT4KICAgICA8cmRmOmxpPgogICAgICA8cmRmOkRlc2NyaXB0aW9uCiAgICAgICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5hZnRlcmVmZmVjdHMuY29tcCIKICAgICAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDAyY2U3MmUtNWY5NC03NTQyLWEzNTgtZTU5ODk3NmE5NTkwIj4KICAgICAgPGRjOnRpdGxlPgogICAgICAgPHJkZjpBbHQ+CiAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5kb2NfMjwvcmRmOmxpPgogICAgICAgPC9yZGY6QWx0PgogICAgICA8L2RjOnRpdGxlPgogICAgICA8eG1wTU06SW5ncmVkaWVudHM+CiAgICAgICA8cmRmOkJhZz4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDAyYjNiYTktNDNjOC0wNTRhLTg1MzQtNmUzOWUwMDM1ZjFmIgogICAgICAgICBzdFJlZjpmcm9tUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgICAgc3RSZWY6dG9QYXJ0PSJ0aW1lOjBkNzY4MDAwZjMwNzIwIgogICAgICAgICBzdFJlZjptYXNrTWFya2Vycz0iTm9uZSIvPgogICAgICAgPC9yZGY6QmFnPgogICAgICA8L3htcE1NOkluZ3JlZGllbnRzPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICA8L3JkZjpsaT4KICAgICA8cmRmOmxpPgogICAgICA8cmRmOkRlc2NyaXB0aW9uCiAgICAgICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5hZnRlcmVmZmVjdHMubGF5ZXIiCiAgICAgICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1YjYzYTI4LTkxMTgtMzc0OC1hMjUxLWViYmYzODM5ODk4MSI+CiAgICAgIDxkYzp0aXRsZT4KICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+MDwvcmRmOmxpPgogICAgICAgPC9yZGY6QWx0PgogICAgICA8L2RjOnRpdGxlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICA8L3JkZjpsaT4KICAgICA8cmRmOmxpPgogICAgICA8cmRmOkRlc2NyaXB0aW9uCiAgICAgICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5hZnRlcmVmZmVjdHMubGF5ZXIiCiAgICAgICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQwMmIzYmE5LTQzYzgtMDU0YS04NTM0LTZlMzllMDAzNWYxZiI+CiAgICAgIDxkYzp0aXRsZT4KICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+NC41XzI8L3JkZjpsaT4KICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPHhtcE1NOkluZ3JlZGllbnRzPgogICAgICAgPHJkZjpCYWc+CiAgICAgICAgPHJkZjpsaQogICAgICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmZiMTk2ZTllLTA2NzctZDc0ZC05YzljLTJhYjIyOWE4YzU1OSIKICAgICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ3NjgwMDBmMzA3MjAiCiAgICAgICAgIHN0UmVmOnRvUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgICAgc3RSZWY6bWFza01hcmtlcnM9Ik5vbmUiLz4KICAgICAgIDwvcmRmOkJhZz4KICAgICAgPC94bXBNTTpJbmdyZWRpZW50cz4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgPC9yZGY6bGk+CiAgICAgPHJkZjpsaT4KICAgICAgPHJkZjpEZXNjcmlwdGlvbgogICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi92bmQuYWRvYmUuYWZ0ZXJlZmZlY3RzLmxheWVyIgogICAgICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0YWI3MzIwNS03NzFlLWMwNDctYTk3My0zMjZmMWU5N2IyNjMiPgogICAgICA8ZGM6dGl0bGU+CiAgICAgICA8cmRmOkFsdD4KICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPlNoYXBlIExheWVyIDE8L3JkZjpsaT4KICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgPC9yZGY6bGk+CiAgICAgPHJkZjpsaT4KICAgICAgPHJkZjpEZXNjcmlwdGlvbgogICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi92bmQuYWRvYmUuYWZ0ZXJlZmZlY3RzLmxheWVyIgogICAgICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0ZjJlNWIwYy01ZDk4LWY4NGYtOGFmNC1hMTk4MGI0ZjE4NzAiPgogICAgICA8ZGM6dGl0bGU+CiAgICAgICA8cmRmOkFsdD4KICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPkJsYWNrIFNvbGlkIDI8L3JkZjpsaT4KICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgPC9yZGY6bGk+CiAgICAgPHJkZjpsaT4KICAgICAgPHJkZjpEZXNjcmlwdGlvbgogICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi92bmQuYWRvYmUuYWZ0ZXJlZmZlY3RzLmxheWVyIgogICAgICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5YzNhOWI4NC03N2M4LWI3NDQtYTgyMi01Njg4M2I2MzY0OTUiPgogICAgICA8ZGM6dGl0bGU+CiAgICAgICA8cmRmOkFsdD4KICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPm1haW48L3JkZjpsaT4KICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPHhtcE1NOkluZ3JlZGllbnRzPgogICAgICAgPHJkZjpCYWc+CiAgICAgICAgPHJkZjpsaQogICAgICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE3ZTlmY2M4LTY2MmEtNzg0NS05MGI1LWM5OTkxY2FiYjFlZSIKICAgICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ3MDc1ODRmMzA3MjAiCiAgICAgICAgIHN0UmVmOnRvUGFydD0idGltZTowZDcwNzU4NGYzMDcyMCIKICAgICAgICAgc3RSZWY6bWFza01hcmtlcnM9Ik5vbmUiLz4KICAgICAgIDwvcmRmOkJhZz4KICAgICAgPC94bXBNTTpJbmdyZWRpZW50cz4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgPC9yZGY6bGk+CiAgICAgPHJkZjpsaT4KICAgICAgPHJkZjpEZXNjcmlwdGlvbgogICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi92bmQuYWRvYmUuYWZ0ZXJlZmZlY3RzLmNvbXAiCiAgICAgICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmE3ZTlmY2M4LTY2MmEtNzg0NS05MGI1LWM5OTkxY2FiYjFlZSI+CiAgICAgIDxkYzp0aXRsZT4KICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+bWFpbjwvcmRmOmxpPgogICAgICAgPC9yZGY6QWx0PgogICAgICA8L2RjOnRpdGxlPgogICAgICA8eG1wTU06SW5ncmVkaWVudHM+CiAgICAgICA8cmRmOkJhZz4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Y2M5NWIwZjItODI2Yy1mMDQzLWJkMWYtZTBlYWEzNzUyNGJkIgogICAgICAgICBzdFJlZjpmcm9tUGFydD0idGltZTo4MzMxMDM4MjcwMjdmMjU0MDE2MDAwMDAwZDM2OTY3MjczOTQ1OTVmMjU0MDE2MDAwMDAwIgogICAgICAgICBzdFJlZjp0b1BhcnQ9InRpbWU6MGQzNDY2MjRmMzA3MjAiCiAgICAgICAgIHN0UmVmOm1hc2tNYXJrZXJzPSJOb25lIi8+CiAgICAgICA8L3JkZjpCYWc+CiAgICAgIDwveG1wTU06SW5ncmVkaWVudHM+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgIDwvcmRmOmxpPgogICAgIDxyZGY6bGk+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24KICAgICAgIGRjOmZvcm1hdD0iYXBwbGljYXRpb24vdm5kLmFkb2JlLmFmdGVyZWZmZWN0cy5sYXllciIKICAgICAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Y2M5NWIwZjItODI2Yy1mMDQzLWJkMWYtZTBlYWEzNzUyNGJkIj4KICAgICAgPGRjOnRpdGxlPgogICAgICAgPHJkZjpBbHQ+CiAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij4yMDIxLTA0LTA4IDE0LTI4LTAxLm1wNDwvcmRmOmxpPgogICAgICAgPC9yZGY6QWx0PgogICAgICA8L2RjOnRpdGxlPgogICAgICA8eG1wTU06SW5ncmVkaWVudHM+CiAgICAgICA8cmRmOkJhZz4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0UmVmOmluc3RhbmNlSUQ9IjBiN2IzOWM5LWNiZDQtYzZhYS02MDg5LWQxMTUwMDAwMDA4NiIKICAgICAgICAgc3RSZWY6ZG9jdW1lbnRJRD0iZWY5NmVjMWItNDdiZS02OThhLWE3ZTEtMjVjNjAwMDAwMDU5IgogICAgICAgICBzdFJlZjpmcm9tUGFydD0idGltZTo4MzMxMDM4MjcwMjdmMjU0MDE2MDAwMDAwZDM2OTY3MjczOTQ1OTVmMjU0MDE2MDAwMDAwIgogICAgICAgICBzdFJlZjp0b1BhcnQ9InRpbWU6ODMzMTAzODI3MDI3ZjI1NDAxNjAwMDAwMGQzNjk2NzI3Mzk0NTk1ZjI1NDAxNjAwMDAwMCIKICAgICAgICAgc3RSZWY6bWFza01hcmtlcnM9IkFsbCIvPgogICAgICAgPC9yZGY6QmFnPgogICAgICA8L3htcE1NOkluZ3JlZGllbnRzPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICA8L3JkZjpsaT4KICAgICA8cmRmOmxpPgogICAgICA8cmRmOkRlc2NyaXB0aW9uCiAgICAgICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5hZnRlcmVmZmVjdHMubGF5ZXIiCiAgICAgICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmQ5MTE0ZjJmLTczMjQtZDI0Ny1hNDQ2LTdjMjFiYTQ5NjRlYiI+CiAgICAgIDxkYzp0aXRsZT4KICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+TmV3IGJsb2NrIHB1enpsZSAyMDIxPC9yZGY6bGk+CiAgICAgICA8L3JkZjpBbHQ+CiAgICAgIDwvZGM6dGl0bGU+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgIDwvcmRmOmxpPgogICAgIDxyZGY6bGk+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24KICAgICAgIGRjOmZvcm1hdD0iYXBwbGljYXRpb24vdm5kLmFkb2JlLmFmdGVyZWZmZWN0cy5jb21wIgogICAgICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmYjE5NmU5ZS0wNjc3LWQ3NGQtOWM5Yy0yYWIyMjlhOGM1NTkiPgogICAgICA8ZGM6dGl0bGU+CiAgICAgICA8cmRmOkFsdD4KICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPjQuNV8yPC9yZGY6bGk+CiAgICAgICA8L3JkZjpBbHQ+CiAgICAgIDwvZGM6dGl0bGU+CiAgICAgIDx4bXBNTTpJbmdyZWRpZW50cz4KICAgICAgIDxyZGY6QmFnPgogICAgICAgIDxyZGY6bGkKICAgICAgICAgc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNWI2M2EyOC05MTE4LTM3NDgtYTI1MS1lYmJmMzgzOTg5ODEiCiAgICAgICAgIHN0UmVmOmZyb21QYXJ0PSJ0aW1lOjBkNzA3NTg0ZjMwNzIwIgogICAgICAgICBzdFJlZjp0b1BhcnQ9InRpbWU6MGQ3MDc1ODRmMzA3MjAiCiAgICAgICAgIHN0UmVmOm1hc2tNYXJrZXJzPSJOb25lIi8+CiAgICAgICAgPHJkZjpsaQogICAgICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRhYjczMjA1LTc3MWUtYzA0Ny1hOTczLTMyNmYxZTk3YjI2MyIKICAgICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ3NjgwMDBmMzA3MjAiCiAgICAgICAgIHN0UmVmOnRvUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgICAgc3RSZWY6bWFza01hcmtlcnM9Ik5vbmUiLz4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NGYyZTViMGMtNWQ5OC1mODRmLThhZjQtYTE5ODBiNGYxODcwIgogICAgICAgICBzdFJlZjpmcm9tUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgICAgc3RSZWY6dG9QYXJ0PSJ0aW1lOjBkNzY4MDAwZjMwNzIwIgogICAgICAgICBzdFJlZjptYXNrTWFya2Vycz0iTm9uZSIvPgogICAgICAgIDxyZGY6bGkKICAgICAgICAgc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5YzNhOWI4NC03N2M4LWI3NDQtYTgyMi01Njg4M2I2MzY0OTUiCiAgICAgICAgIHN0UmVmOmZyb21QYXJ0PSJ0aW1lOjBkNzA3NTg0ZjMwNzIwIgogICAgICAgICBzdFJlZjp0b1BhcnQ9InRpbWU6MGQ3MDc1ODRmMzA3MjAiCiAgICAgICAgIHN0UmVmOm1hc2tNYXJrZXJzPSJOb25lIi8+CiAgICAgICAgPHJkZjpsaQogICAgICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmQ5MTE0ZjJmLTczMjQtZDI0Ny1hNDQ2LTdjMjFiYTQ5NjRlYiIKICAgICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ3NjgwMDBmMzA3MjAiCiAgICAgICAgIHN0UmVmOnRvUGFydD0idGltZTowZDc2ODAwMGYzMDcyMCIKICAgICAgICAgc3RSZWY6bWFza01hcmtlcnM9Ik5vbmUiLz4KICAgICAgIDwvcmRmOkJhZz4KICAgICAgPC94bXBNTTpJbmdyZWRpZW50cz4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgPC9yZGY6bGk+CiAgICA8L3JkZjpCYWc+CiAgIDwveG1wTU06UGFudHJ5PgogICA8eG1wRE06c3RhcnRUaW1lY29kZQogICAgeG1wRE06dGltZUZvcm1hdD0iMjk5N0Ryb3BUaW1lY29kZSIKICAgIHhtcERNOnRpbWVWYWx1ZT0iMDA7MDA7MTA7MTYiLz4KICAgPHhtcERNOmFsdFRpbWVjb2RlCiAgICB4bXBETTp0aW1lVmFsdWU9IjAwOzAwOzEwOzE2IgogICAgeG1wRE06dGltZUZvcm1hdD0iMjk5N0Ryb3BUaW1lY29kZSIvPgogICA8eG1wRE06ZHVyYXRpb24KICAgIHhtcERNOnZhbHVlPSIyMjU0MDgwIgogICAgeG1wRE06c2NhbGU9IjEvOTAwMDAiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7lEAAAAAAAEuAAAAIAAAJcAAAAQAAAS4UAAAgAAAlwoAABAmGwkHAoAwggwggf8ZACjABgBExGgXIMmOOSP8wFUArMCHAKTP9iTg0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xIlStyhRGWFWcWDeciJgg3FUuRMSna6wtWpHJl7PncYe4MFLkoXSjskZNP/7lGClgATdQs5rWHrsAAAJcAAAAQ8c/0Wt4GuwAAAlwAAABAkYhiXk48WnQeLmT4ckyGtOEljM/cm9Ft79Mxzd+P5v2L+z2d63S2mc4kWJnjMXdBP7j/////////////////////////////////////////y0BXf/W2RABVMSAB5jVTMdDOmLDRokYUiXXPHJNiJYcDAhEUZ4YkW7gOIMHFi76K3Q4o9B7MG6KZsnlLtuPFQ4gw68E2USKMBzyhZNGxqQ5Z9SQIuZtZToELvTPCh2RuXOn4yHMbunRFIDN3h9vrWwH9MFA04woDGHA5p7OCgdSJQOsoBCCdH9nHVmZPAxigJEMfOcqEz8uCjJmhjIMlcDTszMqDIhXM9gkxoLjCgDAw4EYLBQnMCBAKAcwqDQADggSAEHl0TOEYErSgnS0aiW7CoCKxocRBNKSqIHAYy30okkmjbwO4/9HGG7tWcuRSi7L6WN52pRM2ohMz8rhy1HZfvC7rOvKc6CUf/7lGDJAAQ9Kk/rOGLeAAAJcAAAAQzsvUWsaMt4AAAlwAAABISDiP2DjOrPPjiOpFf/T+/////////////8kQBm3//1klggVHgAiGBU/C/awIMsCoWeixKXJKOzTBViHNuqT4sgMMIAtyQHPJSAaSsj7s5fcOu87Vi1SolZVOYFYKyt+WSusN0MVDRIBxm+tK7UjIhj58hTfg5jeNJcLhQysfolEOVCHSq4/IVdwmByznNN6h51fW/PubXja1nG49c0vZ7luqCS6K1iA5Qsztxdd6632Om1j33/a3/iVVAABHeP/7ZAF1hRKQQQNzAMu8OkHnQ7TCAYcmQ4pIQBKlYho6XSAcOAr1SwWEX3eYqKIgJMCgURUDWtTTUGSWH4vNRmYSoHsEXzK0TINxAXi9aciStJbC0k8yhfRmlHWkP4b6zarFkb1tfy18/oO12szTmK2x2aUlf9svbciFIdbaJ2Dv/////////////////////////////////////////7lGD/gAXlL9J7fMLeAAAJcAAAARPo6U+tYeu4AAAlwAAABP/////////////////////////////////////////////////////////////////////1IATLtba2kAn6mYCQQaIIDFn2C8xHGvcQiJGi3E16ckWoCvAFKVWCBmAQKw3oFOhenUj8go66wyJjbMgpYQTMsZ4qs8mRUF5NdhN5Foa8YShRb16aq6ZmpliwJ1VXN5ourX+fS7+kzusZ9C3r4jR74j619ZxuuNfWd1ta8Wh80hXqrvyxcqKV2+31rYD+g0CAj6WxvLBshaAcEhQcahRjEhwtxvCIHHJgoGY+cGYFhgwqccsGFHZmI2SDxkgAIR9AEZgNMNMSHEdTLS0QgAGSE3TDwEdCAUSDABogNWLDUcZqutjQQgQOHiAE6QYUQRAM4UImWPs7kda8ziQO3NLsh5iEAy+Ucv5aiFK/+qSnhuRzlNzPUr7lcsauYz9n+/hhzLmvzv8mHv/7lGD/gAa8PVP7GGLuAAAJcAAAARCQ4z+s4et4AAAlwAAABLBX9qtwfzzNf////////////////////////////////////9tZAm///2sgQ7pKhZpZV9gKZBYRzDEODSlWQGvHp4si4yXylRzAxdpJEpCUVikhjMoYvpj4KKkYRmQTlFWZNag+D2trgU6iMMkmRRhNYj5+qYmzxNRHh+KFU2Yk7DMlVMKealBCrKomVierpqma9NySVUXFfExR9BhaxBgWvDjRtvIr7xosClrQJNbcUdPLHpmvox0wVVMgA1eP/rZGCULTQU5RsVEWxV0CCi0X6sjqgm0vwYO/MvBA0JzOw4ywSq6tQKWPLVyXuCMHUBapPIaIMJcxf7NF8whp6D8OZkQjCThwFxBiKBgj025uMjlZ/aK0r9oNIsCtnvneMeJJcMNokt803XcKWDvVsQ7YpryahQnXiZpFxndo6oUeaPhJWHW34j/////////////////////////////7lGD/gAY5NlJrW8LeAAAJcAAAARKQ61GsYeu4AAAlwAAABP///////////////////////////////////////////////////////////////////////////////////cpIMu1traQCdqZoqIxmGYNbhBUEcBl1ZIPHFrIOyhIsDMd8kSztiZsKJ1RqLaKAA8gCpNlznVQybR3maqgRhrDeIOI0N48akOLirJ9RlEzsK2r1wbzA6c5HKPrGN2+9SU/1WW2c6zPSvxvP1Mp448lsm8rg1jR1wEwsthALu2tsjbkjEQYKTUk7g4U3gjNEonli4jXJ6XnkK+H8ftWEwhVSMBi8KwqmYIEWhTUQ7p+CpS9gQAamKgeVtW5r4k8DwiJw06rJGHxiWySINffAPR8JZwXYzQrnQklgQyohqjw7QkQ+ldIzGsJ5eRFh9IyucO0ylQW2KvRL2IkBfAlaRH6E64vWQrlh3A6oP2IVzi9h1xeshtEvgdcfYhtEvv/7lGD/gAcOO9N7GHruAAAJcAAAAQ9Euz+sYet4AAAlwAAABArE+xDaJfA7E+xDaJ9isV2IbRPsVifpC1z7HRP0htV+lYo2kS3JJI2kmZ3AjqEhFsvyY4DITcdJRWl3zFEOizp4QkAowrRumAZYFkG0JyOAWohJPTAL2B9BNDLFsFaBhE9HIL8OkL4bI/B5C4khLoXsYo3jPNApiEk9Nw8x+kqNk6DWLiT03DzMktx6oYgi4m6iEecJzHqhiCOk/UQjzhOZIqBLHSfqkVaNOZIqxLISfq4VaNQ5IqxNqFOrhVqlDlywNKhTq4Z1SnlywLapTq4Z1lXLlgW1SnV5nWVcpWBzVKdXmdZVylYHNUq1qfrKuYWxzcVa1P3FXMLY5uKtbn7pmYWxzcVa3P3TMwtjm4ugSSJKQAUEMSiJU27TRE/////////////////////////////////////////////////////////////////////////////////////7lGD/gAYmX1DrOGNsAAAJcAAAAR25fUWsPe2wAAAlwAAABP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7lGDUAAgoAccgQQAKAAAJcAAAAQAAAS4AAAAgAAAlwAAABP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7lED/gArgAEuAAAAIAAAJcAAAAQAAAS4AAAAgAAAlwAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFRBRwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIwMjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');