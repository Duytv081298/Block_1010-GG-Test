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
    block: { width: 0 },
    map: [],
    scores: 0,
};
var scale = 1;
var spriteSheet;
var levelCurr = 0;
var blockUse = [], storageBlock;
var containerMain = new createjs.Container(), containerNew = [];
var defaultX = 0, defaultY = 0;
var indexGroup = {}, groupCurr = 0, newScaleGroup, numGroup;
var indexHint = {}, hintCurr = 0, groupHint = new createjs.Container(), distanceGTH = 0, hintFree = [];
var hand_tut, text_scores, scores = 0;
var freeUser = false;
const blockFree = [
    [[1], [1], [1], [1], [1]],
    [[0, 1], [1, 1], [0, 1]],
    [[1]],
    [[1, 1], [1, 1]],
    [[0, 1], [1, 1]],
    [[1], [1, 1]],
    [[1, 1], [1], [1]],
    [[1, 1], [0, 1]],
    [[1, 1]],
    [[1], [1], [1], [1]],
    [[1, 1], [1]],
    [[1, 0], [1, 1], [1, 0]],
    [[1, 1, 1, 1, 1]],
    [[1, 1, 1, 1]],
    [[1], [1], [1]],
    [[1], [1]],
    [[1, 1], [0, 1], [0, 1]],
    [[1, 1, 1]],
];
const level1 = {
    "map":
        [
            [
                [-1, -1, -1, -1, 3, 4, -1, -1, -1, -1],
                [-1, -1, -1, -1, 3, 4, -1, -1, -1, -1],
                [-1, -1, -1, -1, 3, 4, -1, -1, -1, -1],
                [-1, -1, -1, -1, 3, 4, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, 4, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, 6, -1, -1, -1, -1],
                [-1, -1, -1, -1, 6, 6, -1, -1, -1, -1],
                [-1, -1, -1, -1, 7, 7, -1, -1, -1, -1],
                [-1, -1, -1, -1, 7, 7, -1, -1, -1, -1]
            ],
            [
                [-1, -1, -1, 1, 1, -1, -1, -1, -1, -1],
                [-1, -1, -1, 4, 1, -1, -1, -1, -1, -1],
                [-1, -1, -1, 4, 1, -1, -1, -1, -1, -1],
                [-1, -1, -1, 4, 4, -1, -1, -1, -1, -1],
                [2, 2, 2, -1, -1, 6, 6, 3, 3, 7],
                [5, 5, 5, -1, -1, 6, 6, 6, 3, 7],
                [-1, -1, -1, 7, 7, -1, -1, -1, -1, -1],
                [-1, -1, -1, 0, 7, -1, -1, -1, -1, -1],
                [-1, -1, -1, 0, 0, -1, -1, -1, -1, -1],
                [-1, -1, -1, 0, 0, -1, -1, -1, -1, -1]
            ],
            [
                [-1, -1, 5, 5, 1, 1, 7, 3, 3, 3],
                [-1, -1, 5, 5, 1, 4, 7, 3, 3, 3],
                [-1, -1, -1, -1, -1, 4, 4, -1, -1, -1],
                [-1, -1, -1, -1, -1, 4, 4, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, 2, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, 2, -1, -1, -1],
                [-1, -1, -1, -1, -1, 0, 0, -1, -1, -1],
                [-1, -1, -1, -1, -1, 6, 6, -1, -1, -1],
                [-1, -1, -1, -1, -1, 6, 1, -1, -1, -1]
            ],
            [
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
            ],
        ],
    "step":
        [
            [
                {
                    "hint": [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 4, y: 6 }],
                    "block": [[1, 0], [1, 1], [1, 0]],
                    "color": 6,
                    "use": true
                },
                {
                    "hint": [],
                    "block": [[1, 1], [1, 1]],
                    "color": 7,
                    "use": false
                },
                {
                    "hint": [],
                    "block": [[0, 1], [1, 1]],
                    "color": 6,
                    "use": false
                },
                {
                    "hint": [],
                    "block": [[1, 1, 1]],
                    "color": 5,
                    "use": false
                },
                {
                    "hint": [],
                    "block": [[1, 1]],
                    "color": 3,
                    "use": false
                },
                {
                    "hint": [],
                    "block": [[1], [1, 1], [1]],
                    "color": 3,
                    "use": false
                }
            ],
            [
                {
                    "hint": [{ x: 3, y: 4 }, { x: 4, y: 4 }, { x: 3, y: 5 }, { x: 4, y: 5 }],
                    "block": [[1, 1], [1, 1],],
                    "color": 0,
                    "use": true
                },
                {
                    "hint": [],
                    "block": [[1, 0], [1, 1], [1, 0]],
                    "color": 6,
                    "use": false
                },
                {
                    "hint": [],
                    "block": [[1, 1, 1]],
                    "color": 5,
                    "use": false
                },
                {
                    "hint": [],
                    "block": [[1], [1, 1], [1]],
                    "color": 3,
                    "use": false
                }
            ],
            [
                {
                    "hint": [{ x: 5, y: 4 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 }],
                    "block": [[1, 1], [1], [1]],
                    "color": 0,
                    "use": true
                },
                {
                    "hint": [],
                    "block": [[1, 1], [1, 1]],
                    "color": 7,
                    "use": true
                },
                {
                    "hint": [],
                    "block": [[0, 1], [1, 1]],
                    "color": 6,
                    "use": true
                },
                {
                    "hint": [],
                    "block": [[1, 0], [1, 1], [1, 0]],
                    "color": 6,
                    "use": true
                }
            ]
        ]
}
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
            [1, 1, 1026, 280, 0, -20, -25],
            [1029, 1, 983, 982, 0, -23, -14],
            [1, 283, 366, 136, 0, 0, -14],
            [369, 283, 93, 102, 0, 0, 0],
            [369, 387, 93, 93, 0, 0, 0],
            [1, 421, 93, 93, 0, 0, 0],
            [96, 421, 93, 93, 0, 0, 0],
            [191, 421, 93, 93, 0, 0, 0],
            [464, 283, 93, 93, 0, 0, 0],
            [464, 378, 93, 93, 0, 0, 0],
            [464, 473, 93, 93, 0, 0, 0],
            [1, 516, 93, 93, 0, 0, 0],
            [96, 516, 93, 93, 0, 0, 0]
        ],

        animations: {
            bottom: { frames: [0] },
            grid: { frames: [1] },
            score: { frames: [2] },
            hand_tut: { frames: [3] },
            block_blue: { frames: [4] },
            block_cyan: { frames: [5] },
            block_green: { frames: [6] },
            block_orange: { frames: [7] },
            block_pink: { frames: [8] },
            block_purple: { frames: [9] },
            block_red: { frames: [10] },
            block_yellow: { frames: [11] },
            square_hint: { frames: [12] }
        }
    });
    setBackground();
    stage.addChild(containerMain);
    var map = level1.map[levelCurr];
    game.map = setMap(map);
    renderBlockHint();
    renderGroupBlockDefault();
    addHand()
    addEvent();
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
    var grid = new createjs.Sprite(spriteSheet, "grid");
    grid.scale = stage.canvas.width * 0.9 / grid.getBounds().width;
    var residual = stage.canvas.width / 45;
    scale = grid.scale;
    grid.x = (stage.canvas.width - grid.getBounds().width * grid.scale) / 2 - residual;

    var score = new createjs.Sprite(spriteSheet, "score");
    score.scale = scale;
    score.x = (stage.canvas.width - score.getBounds().width * score.scale) / 2;
    score.y = stage.canvas.height / 15;
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

    stage.addChild(score, grid, bottom, text_scores);
}

//Group Block
function renderGroupBlockDefault() {
    if (!freeUser) {
        var listStep = level1.step[levelCurr];
        for (let i = 0; i < 3; i++) {
            const step = listStep[i];
            renderGroupBlock(step.block, step.color, i);
        }
        numGroup = 2
    } else {
        for (let i = 0; i < 3; i++) {
            var block = blockFree[Math.floor(Math.random() * blockFree.length)]
            var color = Math.floor(Math.random() * 8)
            renderGroupBlock(block, color, i);
        }

    }
}
function createGroupBlock() {
    switch (groupCurr) {
        case 0:
            var gr1w = blockUse[groupCurr + 1].width * (storageBlock.height / 7);
            var gr2w = blockUse[groupCurr + 2].width * (storageBlock.height / 7);
            var gr1 = blockUse[groupCurr + 1].target;
            var gr2 = blockUse[groupCurr + 2].target;
            blockUse[groupCurr] = blockUse[groupCurr + 1]
            blockUse[groupCurr].x = indexGroup.x0 + (storageBlock.height / 7)
            blockUse[groupCurr + 1] = blockUse[groupCurr + 2]
            blockUse[groupCurr + 1].x = indexGroup.x1 - gr2w / 2
            createjs.Tween.get(gr1)
                .to({ x: blockUse[groupCurr].x, y: blockUse[groupCurr].y }, 100)
            createjs.Tween.get(gr2)
                .to({ x: blockUse[groupCurr + 1].x, y: blockUse[groupCurr + 1].y }, 100)
            break;
        case 1:
            var gr1w = blockUse[groupCurr + 1].width * (storageBlock.height / 7);
            var gr1 = blockUse[groupCurr + 1].target;
            blockUse[groupCurr] = blockUse[groupCurr + 1]
            blockUse[groupCurr].x = indexGroup.x1 - gr1w / 2
            createjs.Tween.get(gr1)
                .to({ x: blockUse[groupCurr].x, y: blockUse[groupCurr].y }, 100)
            break;
    }
    if (!freeUser) {
        const step = level1.step[levelCurr][numGroup];
        renderGroupBlock(step.block, step.color);
    } else {
        var block = blockFree[Math.floor(Math.random() * blockFree.length)]
        var color = Math.floor(Math.random() * 8)
        renderGroupBlock(block, color);
    }
}
function renderGroupBlock(blockArr, color, index) {
    if (index == null) index = 2;
    var colorstr = convertBlock(color);
    var block = new createjs.Sprite(spriteSheet, colorstr);
    block.scale = (storageBlock.height / 7) / block.getBounds().width;
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
    containerBlockUse.x = index == 0 ? storageBlock.minX : index == 1 ? (storageBlock.maxX + storageBlock.minX - widthContainer) / 2 : storageBlock.maxX - widthContainer;
    indexGroup = {
        x0: storageBlock.minX,
        x1: (storageBlock.maxX + storageBlock.minX) / 2,
        x2: storageBlock.maxX
    };
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
    if (blockUse.length == 3) blockUse[2] = groupBlock;
    else blockUse.push(groupBlock);

}
function blockToContainer() {
    var blockChild = blockUse[groupCurr].target.children
    scores += blockChild.length * 10

    text_scores.text = scores;
    text_scores.x = (stage.canvas.width - text_scores.getMeasuredWidth() * text_scores.scale) / 2

    var originX = blockChild[0].x + blockUse[groupCurr].target.x;
    var originY = (blockUse[groupCurr].target.y);
    var index = lToI({ x: originX, y: originY })

    const color = blockUse[groupCurr].color;
    var colorstr = convertBlock(color);
    var blocknew = new createjs.Sprite(spriteSheet, colorstr);
    blocknew.scale = scale;
    for (let i = 0; i < blockChild.length; i++) {
        var block = blockChild[i];
        var index1 = lToIGr({ x: block.x, y: block.y });
        var x = index.x + index1.x;
        var y = index.y + index1.y;
        var item = game.map[y][x];
        var newblock = blocknew.clone();
        newblock.x = item.x;
        newblock.y = item.y;
        containerMain.addChild(newblock);
        containerNew.push({ x: x, y: y });
        game.map[y][x] = { x: item.x, y: item.y, existing: true, block: newblock, color: color };

    }
    blockUse[groupCurr].target.removeAllChildren()
    stage.removeChild(blockUse[groupCurr].target)
}
function removeGrBlock() {
    for (let i = 0; i < blockUse.length; i++) {
        const grBlock = blockUse[i];
        stage.removeChild(grBlock.target)
    }
    blockUse = []
}
function addHand() {
    hand_tut.x = blockUse[0].x;
    hand_tut.y = blockUse[0].y + (blockUse[0].height * storageBlock.height / 7) / 2.5;
    hand_tut.scale = scale;
    stage.addChild(hand_tut);
    createjs.Tween.get(hand_tut, { loop: true })
        .to({ x: indexHint.realityX, y: indexHint.realityY + ((indexHint.maxY - indexHint.minY) * game.block.width / 2) }, 2000)
        .wait(500)
        .to({ x: blockUse[0].x, y: blockUse[0].y + (blockUse[0].height * storageBlock.height / 7) / 2.5 }, 2000)
        .wait(500)
}
function removeHand() {
    createjs.Tween.removeTweens(hand_tut);
    stage.removeChild(hand_tut)
}

//Hint Block
function renderBlockHint() {
    groupHint.removeAllChildren()
    var hint = new createjs.Sprite(spriteSheet, "square_hint");
    hint.scale = scale;
    const hintArr = level1.step[levelCurr][hintCurr].hint;
    for (let i = 0; i < hintArr.length; i++) {
        var item = hintArr[i];
        var blockHint = hint.clone();
        var index = game.map[item.y][item.x];
        blockHint.x = index.x;
        blockHint.y = index.y;
        groupHint.addChild(blockHint);
    }
    containerMain.addChild(groupHint);
    if (level1.step[levelCurr][hintCurr].hint.length != 0) indexHint = getIndexHint();

}
function getIndexHint() {
    var currStep = level1.step[levelCurr][hintCurr].hint;
    var minX = currStep[0].x;
    var maxX = currStep[0].x;
    var minY = currStep[0].y;
    var maxY = currStep[0].y;
    for (let i = 0; i < currStep.length; i++) {
        const item = currStep[i];
        if (item.x < minX) minX = item.x;
        if (item.x > maxX) maxX = item.x;
        if (item.y < minY) minY = item.y;
        if (item.y > maxY) maxY = item.y;
    }
    var index = game.map[minY][minX];
    return { minX: minX, minY: minY, maxX: maxX, maxY: maxY, realityX: index.x, realityY: index.y };
}

//Event
function addEvent() {
    for (let i = 0; i < blockUse.length; i++) {
        const target = blockUse[i].target;
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
}
function removeEvent(target) {
    if (isMobile) {
        target.removeEventListener("mousedown", onMouseDown, supportsPassive ? { passive: true } : false);
        canvas.removeEventListener("touchmove", onPressMove, supportsPassive ? { passive: true } : false);
        canvas.removeEventListener("touchend", onMouseUp, supportsPassive ? { passive: true } : false);
    } else {
        target.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onPressMove);
        canvas.removeEventListener("mouseup", onMouseUp);
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
    distanceGTH = getDistance(location, { x: indexHint.realityX, y: indexHint.realityY })
}
function onPressMove(evt) {
    if (pressMove) {
        var location = currentMouse(evt);
        var target = blockUse[groupCurr].target;
        target.x = location.x;
        target.y = location.y;
        var scaleItem = blockUse[groupCurr].target.children[0].scale;
        var distance = getDistance(location, { x: indexHint.realityX, y: indexHint.realityY });
        var percent = distance / distanceGTH - 1;
        newScaleGroup = scale / scaleItem;
        if (newScaleGroup * Math.abs(percent) > blockUse[groupCurr].scale) {
            target.scale = newScaleGroup * Math.abs(percent);
        }
    }

}
function onMouseUp(evt) {
    pressMove = false;
    var location = currentMouse(evt);
    var target = blockUse[groupCurr].target;
    var standard = { x: indexHint.realityX, y: indexHint.realityY }
    if (target.x >= standard.x - game.block.width / 3 && target.x <= standard.x + game.block.width / 3 && groupCurr == 0) {
        if (target.y >= standard.y - game.block.width / 3 && target.y <= standard.y + game.block.width / 3) {

            removeEvent(target);
            if (level1.step[levelCurr][hintCurr + 1].hint.length != 0) {
                hintCurr++;
                numGroup++;
                blockToContainer()
                createGroupBlock();
                removeBlock(0);
                if (hintCurr == 1) removeHand();
            } else {
                removeHand()
                blockToContainer()
                groupHint.removeAllChildren()
                removeBlock(1);
            }
        }
    } else {
        target.x = blockUse[groupCurr].x;
        target.y = blockUse[groupCurr].y;
        target.scale = blockUse[groupCurr].scale;
    }
}

// Free
function addEventFree() {
    for (let i = 0; i < blockUse.length; i++) {
        const target = blockUse[i].target;
        if (isMobile) {
            target.addEventListener("mousedown", onMouseDown, supportsPassive ? { passive: true } : false);
            canvas.addEventListener("touchmove", onPressMoveFree, supportsPassive ? { passive: true } : false);
            canvas.addEventListener("touchend", onMouseUpFree, supportsPassive ? { passive: true } : false);
            target.myParam = i;
        } else {
            target.addEventListener("mousedown", onMouseDown);
            canvas.addEventListener("mousemove", onPressMoveFree);
            canvas.addEventListener("mouseup", onMouseUpFree);
            target.myParam = i;
        }
    }
}
function onPressMoveFree(evt) {
    if (pressMove) {
        var location = currentMouse(evt);
        var target = blockUse[groupCurr].target;
        target.x = location.x;
        target.y = location.y;
        var scaleItem = blockUse[groupCurr].target.children[0].scale;
        newScaleGroup = scale / scaleItem;
        var percent
        if (location.y > game.map[9][0].y + game.block.width) {
            var distance = location.y - (game.map[9][0].y + game.block.width);
            percent = distance / distanceGTH - 1;
        }
        if (newScaleGroup * Math.abs(percent) > blockUse[groupCurr].scale) {
            target.scale = newScaleGroup * Math.abs(percent);
        }
        renderHintFree(location)
    }
}
function onMouseUpFree(evt) {

    pressMove = false;
    containerNew = []
    // var location = currentMouse(evt);
    var target = blockUse[groupCurr].target;
    if (hintFree.length != 0) {
        scores += hintFree.length * 10
        text_scores.text = scores;
        text_scores.x = (stage.canvas.width - text_scores.getMeasuredWidth() * text_scores.scale) / 2
        removeHand()
        removeEvent(target);
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
        blockUse[groupCurr].target.removeAllChildren()
        stage.removeChild(blockUse[groupCurr].target)
        createGroupBlock();
        removeBlock(2);
    } else {
        target.x = blockUse[groupCurr].x;
        target.y = blockUse[groupCurr].y;
        target.scale = blockUse[groupCurr].scale;
    }
}
function renderHintFree(location) {
    var array = [];
    var render = true
    removeHintFree()
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
function removeHintFree() {
    for (let i = 0; i < hintFree.length; i++) {
        const hint = hintFree[i].hint;
        containerMain.removeChild(hint)
    }
}

//Collision
function removeBlock(remove) {
    const removeArray = checkRC()
    var removeArr = removeArray.arr
    scores += removeArray.lengthRemove * 15
    text_scores.text = scores;
    text_scores.x = (stage.canvas.width - text_scores.getMeasuredWidth() * text_scores.scale) / 2

    if (remove == 0) {
        addEvent();
        renderBlockHint();
    } else if (remove == 2) {
        addEventFree();
        removeHintFree()
        hintFree = []
    }
    for (let i = 0; i < removeArr.length; i++) {
        const index = removeArr[i];
        const item = game.map[index.y][index.x]
        const block = item.block;
        block.regX = block.regY = game.block.width / 2
        block.x = block.x + game.block.width / 4
        block.y = block.y + game.block.width / 4
        createjs.Tween.get(block)
            .to({ rotation: 180, scale: 0 }, 1000)
            .call(() => {
                containerMain.removeChild(block);
                if (i == removeArr.length - 1) {
                    if (remove == 1) newLevel()
                }
            });
        game.map[index.y][index.x] = { x: item.x, y: item.y, existing: false, block: null, color: null }
    }
}
function newLevel() {
    if (levelCurr + 1 <= level1.map.length - 2) {
        containerMain.removeAllChildren()
        removeGrBlock()
        hintCurr = 0
        levelCurr++
        var map = level1.map[levelCurr];
        game.map = setMap(map);
        renderBlockHint();
        renderGroupBlockDefault();
        addHand()
        addEvent();
    } else {
        freeUser = true
        containerMain.removeAllChildren()
        removeGrBlock()
        var map = level1.map[3];
        game.map = setMap(map);
        renderGroupBlockDefault()
        addEventFree();
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
// location to index
function lToI(location) {
    var x = (location.x - defaultX) / game.block.width * 1.024;
    var y = (location.y - defaultY) / game.block.width * 1.02;
    if (y < 0) y = 0
    return { x: Math.floor(x), y: Math.floor(y) };
}
function lToIGr(location) {
    var x = location.x / (storageBlock.height / 7);
    var y = location.y / (storageBlock.height / 7);
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
        window.open("https://play.google.com/store/apps/details?id=bubble.shooter.primitive.dinosaurs.egg.shot")
    } else if (/android/i.test(userAgent)) {
        window.open("https://play.google.com/store/apps/details?id=bubble.shooter.primitive.dinosaurs.egg.shot");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.open("https://apps.apple.com/vn/app/dinosaurs-bubble-shooter/id1563711673?itsct=apps_box_link&itscg=30200");
    } else {
        window.open("https://play.google.com/store/apps/details?id=bubble.shooter.primitive.dinosaurs.egg.shot")
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