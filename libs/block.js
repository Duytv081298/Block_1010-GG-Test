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
    block: { width: 0 },
    map: [],
};
var scale = 1;
var spriteSheet;
var blockUse = [], storageBlock;
var containerMain = new createjs.Container(), containerNew = [];
var defaultX = 0, defaultY = 0;
var groupCurr = 0;
var indexHint = {}, hintCurr = 0, groupHint = new createjs.Container(), distanceGTH = 0, hintFree = [];
var hand_tut, text_scores, scores = 0, install_now;
const blockFree = [
    [[1], [1], [1], [1], [1]],
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
    [[1, 1, 1]],
    [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
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
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
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
            [1, 1, 1028, 282, 0, -19, -24],
            [1031, 1, 985, 984, 0, -22, -13],
            [1, 285, 367, 137, 0, 0, -13],
            [370, 285, 300, 533, 0, 0, 0],
            [1, 424, 300, 300, 0, 0, 0],
            [1, 726, 300, 99, 0, 0, 0],
            [303, 820, 205, 67, 0, 0, 0],
            [1, 827, 200, 53, 0, 0, 0],
            [203, 827, 93, 102, 0, 0, 0],
            [1, 882, 200, 53, 0, 0, 0],
            [510, 820, 200, 53, 0, 0, 0],
            [510, 875, 93, 93, 0, 0, 0],
            [298, 889, 93, 93, 0, 0, 0],
            [393, 889, 93, 93, 0, 0, 0],
            [605, 875, 93, 93, 0, 0, 0],
            [700, 875, 93, 93, 0, 0, 0],
            [672, 285, 93, 93, 0, 0, 0],
            [672, 380, 93, 93, 0, 0, 0],
            [672, 475, 93, 93, 0, 0, 0],
            [712, 570, 93, 93, 0, 0, 0]
        ],

        "animations": {
            "img1010": { "frames": [6] },
            "bottom": { "frames": [0] },
            "grid": { "frames": [1] },
            "score": { "frames": [2] },
            "bg": { "frames": [3] },
            "logo": { "frames": [4] },
            "vlock": { "frames": [5] },
            "btn_again": { "frames": [7] },
            "hand_tut": { "frames": [8] },
            "contineu": { "frames": [9] },
            "install_now": { "frames": [10] },
            "block_blue": { "frames": [11] },
            "block_cyan": { "frames": [12] },
            "block_green": { "frames": [13] },
            "block_orange": { "frames": [14] },
            "block_pink": { "frames": [15] },
            "block_purple": { "frames": [16] },
            "block_red": { "frames": [17] },
            "block_yellow": { "frames": [18] },
            "square_hint": { "frames": [19] }
        },
    });
    setBackground();
    stage.addChild(containerMain);
    game.map = setMap(map);
    createGroupBlockFree();
    callEndTime()
}
function setMap(map) {
    var locationArr = [];
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        var x = game.block.width,
            y = i * game.block.width;
        var arr = [];
        for (let j = 0; j < row.length; j++) {
            var xb = j * x;
            const color = map[i][j]
            if (color >= 0) {
                var colorstr = convertBlock(color);
                var block = new createjs.Sprite(spriteSheet, colorstr);
                block.scale = scale
                block.x = 1.024 * xb + defaultX
                block.y = 1.02 * y + defaultY
                containerMain.addChild(block);
                arr.push({ x: block.x, y: block.y, existing: true, block: block, color: null });
            } else arr.push({ x: 1.024 * xb + defaultX, y: 1.02 * y + defaultY, existing: false, block: null, color: null });

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
    stage.addChild(bg);

    var bgText = new createjs.Shape();
    bgText.graphics.f("#ffffff").dr(0, 0, stage.canvas.width, stage.canvas.height / 17);
    var textE = new createjs.Text('New Block Puzzle 2021', "22px Impact", "#000000");

    textE.scale = (stage.canvas.width / 2) / textE.getMeasuredWidth()
    textE.x = (stage.canvas.width - textE.getMeasuredWidth() * textE.scale) / 2
    textE.y = (stage.canvas.height / 17 - textE.getMeasuredHeight() * textE.scale) / 2

    var grid = new createjs.Sprite(spriteSheet, "grid");
    grid.scale = stage.canvas.width * 0.9 / grid.getBounds().width;
    var residual = stage.canvas.width / 45;
    scale = grid.scale;
    grid.x = (stage.canvas.width - grid.getBounds().width * grid.scale) / 2 - residual;

    var score = new createjs.Sprite(spriteSheet, "score");
    score.scale = scale;
    score.x = (stage.canvas.width - score.getBounds().width * score.scale) / 2;
    score.y = stage.canvas.height / 10;
    grid.y = score.y + score.getBounds().height * score.scale - residual / 2;

    defaultX = grid.x + stage.canvas.width / 27;
    defaultY = grid.y + stage.canvas.height / 60;

    var bottom = new createjs.Sprite(spriteSheet, "bottom");
    bottom.scale = stage.canvas.width * 0.9 / bottom.getBounds().width;
    bottom.x = (stage.canvas.width - bottom.getBounds().width * bottom.scale) / 2 - stage.canvas.width / 50;
    bottom.y = grid.y + grid.getBounds().height * grid.scale + residual * 4;
    storageBlock = {
        height: bottom.getBounds().height * bottom.scale,
        avgY: bottom.y + (bottom.getBounds().height * bottom.scale) / 1.65,
        minX: bottom.x + stage.canvas.width / 10,
        maxX: bottom.x + bottom.getBounds().width * bottom.scale - stage.canvas.width / 10
    };
    var block = new createjs.Sprite(spriteSheet, "block_blue");
    game.block = { width: block.getBounds().width * scale };

    hand_tut = new createjs.Sprite(spriteSheet, "hand_tut");

    text_scores = new createjs.Text(scores, "22px Impact", "#ffffff");
    text_scores.y = score.y + score.getBounds().height * score.scale
    text_scores.scale = (stage.canvas.width / 37) / text_scores.getMeasuredWidth();
    text_scores.textBaseline = "alphabetic";
    text_scores.x = (stage.canvas.width - text_scores.getMeasuredWidth() * text_scores.scale) / 2

    install_now = new createjs.Sprite(spriteSheet, "install_now");
    install_now.scaleX = stage.canvas.width / 4.5 / install_now.getBounds().width;
    install_now.scaleY = stage.canvas.width / 4.5 / install_now.getBounds().width;
    install_now.x = (stage.canvas.width - install_now.getBounds().width * install_now.scaleX) / 2;
    install_now.y = stage.canvas.height - install_now.getBounds().height * install_now.scaleY * 1.7;

    stage.addChild(bgText, textE, score, grid, bottom, text_scores, install_now);
    var install_nowx = install_now.x,
        install_nowy = install_now.y,
        install_nowscale = stage.canvas.width / 4.5 / install_now.getBounds().width;
    createjs.Tween.get(install_now, { loop: true })
        .to(
            {
                scale: (stage.canvas.width / 7) / install_now.getBounds().width,
                x: (stage.canvas.width - ((stage.canvas.width / 7) / install_now.getBounds().width) * install_now.getBounds().width) / 2,
                y: install_nowy - (stage.canvas.width / 7 - stage.canvas.width / 8) / 10,
            },
            500,
            createjs.Ease.linear
        )
        .to({ scale: install_nowscale, x: install_nowx, y: install_nowy }, 500, createjs.Ease.linear);
    install_now.addEventListener("click", () => { getLinkInstall() }, false);
}
function renderGroupBlock(blockArr, color, index) {
    var colorstr = convertBlock(color);
    var block = new createjs.Sprite(spriteSheet, colorstr);
    block.scale = (storageBlock.height / 6.5) / block.getBounds().width;
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
        scale: containerBlockUse.scale,
        color: color
    };
    blockUse.push(groupBlock);
    addEventFree(containerBlockUse, blockUse.length - 1)
}
// function addHand() {
//     hand_tut.x = blockUse[0].x;
//     hand_tut.y = blockUse[0].y + (blockUse[0].height * storageBlock.height / 6.5) / 2.5;
//     hand_tut.scale = (stage.canvas.width / 8) / hand_tut.getBounds().width;
//     stage.addChild(hand_tut);
//     createjs.Tween.get(hand_tut, { loop: true })
//         .to({ x: indexHint.realityX, y: indexHint.realityY + ((indexHint.maxY - indexHint.minY) * game.block.width / 2) }, 1500)
//         .wait(300)
//         .to({ x: blockUse[0].x, y: blockUse[0].y + (blockUse[0].height * storageBlock.height / 6.5) / 2.5 }, 1500)
//         .wait(300)
// }
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
    distanceGTH = getDistance(location, { x: location.x, y: game.map[9][0].y })
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
        target.x = location.x;
        target.y = location.y;
        var scaleItem = blockUse[groupCurr].target.children[0].scale;
        var newScaleGroup = scale / scaleItem;
        var percent
        if (location.y > game.map[9][0].y + game.block.width) {
            var distance = location.y - (game.map[9][0].y + game.block.width);
            percent = distance / distanceGTH - 1;
        }
        if (newScaleGroup * Math.abs(percent) > blockUse[groupCurr].scale) {
            target.scale = newScaleGroup * Math.abs(percent);
        }
        renderHint(location)
    }
}
function onMouseUp(evt) {
    if (pressUp) {

        pressMove = false;
        containerNew = []
        var target = blockUse[groupCurr].target;
        if (hintFree.length != 0) {
            scores += hintFree.length * 10
            text_scores.text = scores;
            text_scores.x = (stage.canvas.width - text_scores.getMeasuredWidth() * text_scores.scale) / 2
            removeHand()
            const color = blockUse[groupCurr].color;
            var colorstr = convertBlock(color);
            var block = new createjs.Sprite(spriteSheet, colorstr);
            block.scale = scale;
            for (let i = 0; i < hintFree.length; i++) {
                const hint = hintFree[i].hint;
                const item = game.map[hintFree[i].y][hintFree[i].x]
                var newblock = block.clone()
                newblock.x = hint.x
                newblock.y = hint.y
                containerMain.addChild(newblock);
                containerNew.push({ x: hintFree[i].x, y: hintFree[i].y })
                game.map[hintFree[i].y][hintFree[i].x] = { x: item.x, y: item.y, existing: true, block: newblock, color: color }
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
            target.scale = blockUse[groupCurr].scale;
        }
        pressUp = false
    }
}
function renderHint(location) {
    var array = [];
    var render = true
    removeHint()
    var index = lToI(location)
    var blockChild = blockUse[groupCurr].target.children
    var hint = new createjs.Sprite(spriteSheet, "square_hint");
    hint.scale = scale;
    if (location.x >= game.map[0][0].x - game.block.width / 2 &&
        location.x < game.map[0][9].x + (1.5 - blockUse[groupCurr].width) * game.block.width &&
        location.y > game.map[0][0].y &&
        location.y < game.map[9][0].y + (1.5 - blockUse[groupCurr].height) * game.block.width) {
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
            var newHint = hint.clone()
            newHint.x = item.x;
            newHint.y = item.y;
            containerMain.addChild(newHint);
            hintFree.push({ x: index.x, y: index.y, hint: newHint })
        }
    }
}
function removeHint() {
    for (let i = 0; i < hintFree.length; i++) {
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
        for (let i = 0; i < 3; i++) {
            var block = blockFree[Math.floor(Math.random() * blockFree.length)]
            var color = Math.floor(Math.random() * 8)
            renderGroupBlock(block, color, i);
        }
    }
}

//Collision
function removeBlock() {
    const removeArray = checkRC()
    var removeArr = removeArray.arr
    scores += removeArray.lengthRemove * 15
    text_scores.text = scores;
    text_scores.x = (stage.canvas.width - text_scores.getMeasuredWidth() * text_scores.scale) / 2

    removeHint();

    for (let i = 0; i < removeArr.length; i++) {
        const index = removeArr[i];
        const item = game.map[index.y][index.x]
        const block = item.block;
        block.regX = block.regY = game.block.width / 2
        block.x = block.x + game.block.width / 4
        block.y = block.y + game.block.width / 4
        createjs.Tween.get(block)
            .to({ rotation: 180, scale: 0 }, 500)
            .call(() => { containerMain.removeChild(block); });
        game.map[index.y][index.x] = { x: item.x, y: item.y, existing: false, block: null, color: null }
    }
}
// check row and column
function checkRC() {
    var checkX = [];
    var checkY = [];
    for (let i = 0; i < containerNew.length; i++) {
        var item = containerNew[i];
        if (checkX.indexOf(item.x) < 0) checkX.push(item.x);
        if (checkY.indexOf(item.y) < 0) checkY.push(item.y);
    }
    var arrRemove = [];
    var arrtemp = [];
    var array = [];
    for (let i = 0; i < checkX.length; i++) {
        const x = checkX[i];
        for (let y = 0; y < 10; y++) {
            const item = game.map[y][x];
            if (item.existing) arrtemp.push({ x: x, y: y });
        }
        if (arrtemp.length == 10) arrRemove = arrRemove.concat(arrtemp);
        arrtemp = [];
    }
    for (let i = 0; i < checkY.length; i++) {
        const y = checkY[i];
        for (let x = 0; x < 10; x++) {
            const item = game.map[y][x];
            if (item.existing) arrtemp.push({ x: x, y: y });
        }
        if (arrtemp.length == 10) arrRemove = arrRemove.concat(arrtemp);
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
        createjs.Tween.removeTweens(install_now)
        stage.removeChild(install_now);
        removeAllEvent()
        var particle = new createjs.Shape();
        particle.graphics.f("#fafafa").dr(0, 0, stage.canvas.width, stage.canvas.height);
        particle.alpha = 0.4

        var bgcore = new createjs.Shape();
        bgcore.graphics.f("#000000").rc(0, 0, stage.canvas.width / 2, stage.canvas.height / 5, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50);
        bgcore.x = (stage.canvas.width - stage.canvas.width / 2) / 2
        bgcore.y = stage.canvas.height / 5
        bgcore.alpha = 1
        var best = new createjs.Text('BEST', "22px Impact", "#ffffff");

        best.scale = (stage.canvas.width / 10) / best.getMeasuredWidth()
        best.x = (stage.canvas.width - best.getMeasuredWidth() * best.scale) / 2
        best.y = bgcore.y + best.getMeasuredHeight() * best.scale * 1.4

        var text = text_scores.clone()
        text.scale = (stage.canvas.width / 7) / text.getMeasuredWidth()
        text.x = (stage.canvas.width - text.getMeasuredWidth() * text.scale) / 2
        text.y = bgcore.y * 2 - text.getMeasuredHeight() * text.scale * 1.2


        var play_again = new createjs.Sprite(spriteSheet, "btn_again");
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
                        if (indexGrY > 9 || indexGrX > 9) grTrue = false
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
    var x = (location.x - defaultX) / game.block.width * 1.024;
    var y = (location.y - defaultY) / game.block.width * 1.02;
    if (y < 0) y = 0
    return { x: Math.floor(x), y: Math.floor(y) };
}
function lToIGr(location) {
    var x = location.x / (storageBlock.height / 6.5);
    var y = location.y / (storageBlock.height / 6.5);
    return { x: Math.floor(x), y: Math.floor(y) };
}
function indexToLocation(p) {
    var x = p.x * game.block.width + defaultX + p.x * game.block.width * 0.024;
    var y = p.y * game.block.width + defaultY + (p.y * game.block.width + defaultY) * 0.02;
    return { x: x, y: y };
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
        window.open("https://play.google.com/store/apps/details?id=com.blockpuzzle.galaxy.bluedream.puzzle");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.open("https://play.google.com/store/apps/details?id=com.blockpuzzle.galaxy.bluedream.puzzle");
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
    setTimeout(setEndTime, 45000);
}
function setEndTime() {

    createjs.Tween.removeTweens(install_now)
    removeAllEvent()

    var bg = new createjs.Sprite(spriteSheet, "bg");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;
    bg.alpha = 0.9


    var logo = new createjs.Sprite(spriteSheet, "logo");
    logo.scale = (stage.canvas.width / 3.5) / logo.getBounds().width
    logo.x = (stage.canvas.width - logo.getBounds().width * logo.scale) / 2
    logo.y = stage.canvas.height / 9

    var vlock = new createjs.Sprite(spriteSheet, "vlock");
    vlock.scale = (stage.canvas.width * 2.3 / 3) / vlock.getBounds().width
    vlock.x = (stage.canvas.width - vlock.getBounds().width * vlock.scale) / 2
    vlock.y = logo.y + logo.getBounds().height * logo.scale * 1.3

    var img1010 = new createjs.Sprite(spriteSheet, "img1010");
    img1010.scale = vlock.scale
    img1010.x = (stage.canvas.width - img1010.getBounds().width * img1010.scale) / 2
    img1010.y = vlock.y + vlock.getBounds().height * vlock.scale * 1.2


    var contineu = new createjs.Sprite(spriteSheet, "contineu");
    contineu.scale = (stage.canvas.width / 2.7) / contineu.getBounds().width
    contineu.x = (stage.canvas.width - contineu.getBounds().width * contineu.scale) / 2
    contineu.y = img1010.y + img1010.getBounds().height * img1010.scale * 1.8

    stage.addChild(bg, contineu, logo, vlock, img1010);


    var contineux = contineu.x,
        contineuy = contineu.y,
        contineuscale = stage.canvas.width / 2.7 / contineu.getBounds().width;
    createjs.Tween.get(contineu, { loop: true })
        .to(
            {
                scale: (stage.canvas.width / 4) / contineu.getBounds().width,
                x: (stage.canvas.width - ((stage.canvas.width / 4) / contineu.getBounds().width) * contineu.getBounds().width) / 2,
                y: contineuy - (stage.canvas.width / 5 - stage.canvas.width / 8) / 10,
            },
            500,
            createjs.Ease.linear
        )
        .to({ scale: contineuscale, x: contineux, y: contineuy }, 500, createjs.Ease.linear);
    contineu.addEventListener("click", () => { getLinkInstall() }, false);
}