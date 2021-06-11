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
var processCr = new createjs.Container();
var text_new = new createjs.Container();
var process = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    realityWidth: 0,
    reality: {},
    star: {},
    radius: 0,
    rStar: 0,
    score: 24,
    text_scores: {},
    text_IQ: {}
};
var main = {}, dog, border, hand, hint;
var listBlock = [], listBlockUse = [], blockUse;
var win = 0;

var totalScore = 44;
var score = 24;
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
            [1, 1, 400, 711, 0, 0, 0],
            [1, 714, 200, 53, 0, 0, 0],
            [1, 769, 200, 53, 0, 0, 0],
            [1, 824, 200, 53, 0, 0, 0],
            [203, 714, 88, 115, 0, 0, 0],
            [293, 714, 82, 105, 0, 0, 0],
            [377, 714, 82, 82, 0, -6, -2],
            [377, 798, 62, 79, 0, -1, 0],
            [403, 1, 300, 223, 0, 0, 0],
            [403, 226, 300, 223, 0, 0, 0],
            [403, 451, 300, 223, 0, 0, 0],
            [461, 676, 113, 164, 0, 0, 0],
            [576, 676, 60, 108, 0, 0, 0],
            [638, 676, 60, 108, 0, 0, 0]
        ],

        "animations": {
            "background": { "frames": [0] },
            "btn_again": { "frames": [1] },
            "install_now": { "frames": [2] },
            "play_now": { "frames": [3] },
            "orange_block": { "frames": [4] },
            "hand": { "frames": [5] },
            "yellow_block": { "frames": [6] },
            "purple_block": { "frames": [7] },
            "bg": { "frames": [8] },
            "border": { "frames": [9] },
            "full": { "frames": [10] },
            "blue_block": { "frames": [11] },
            "hint_red_block": { "frames": [12] },
            "red_block": { "frames": [13] }
        },
    });
    setBackground();
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
    var bg = new createjs.Sprite(spriteSheet, "background");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;
    stage.addChild(bg);

    process.width = stage.canvas.width * 2.3 / 3;
    process.height = stage.canvas.height / 50;
    process.radius = stage.canvas.width / 50;
    process.realityWidth = (process.score / totalScore) * process.width;
    process.rStar = stage.canvas.height / 55;
    stage.addChild(processCr);
    renderProcess();
    updateProcess();

    dog = new createjs.Sprite(spriteSheet, "bg");
    dog.scale = (stage.canvas.width * 2.2 / 3) / dog.getBounds().width;
    dog.x = (stage.canvas.width - dog.getBounds().width * dog.scale) / 2;
    dog.y = stage.canvas.height / 4.5;
    main = { x: dog.x, y: dog.y, width: dog.getBounds().width * dog.scale, height: dog.getBounds().height * dog.scale, scale: dog.scale };

    border = new createjs.Sprite(spriteSheet, "border");
    border.scale = main.scale;
    border.x = main.x;
    border.y = main.y;

    var text1 = new createjs.Text('Drag and Drop', "30px Impact", "#ffffff");
    text1.scale = (stage.canvas.height / 27) / text1.getMeasuredHeight();
    text1.scaleX = text1.scale * 1.1;
    text1.x = (stage.canvas.width - text1.getMeasuredWidth() * text1.scale) / 2;
    text1.y = dog.y + (dog.getBounds().height * dog.scale / 2.3 - text1.getMeasuredHeight() * text1.scale / 2);

    text_block = new createjs.Text('Blocks', "30px Impact", "#ffffff");
    text_block.scale = (stage.canvas.height / 27) / text1.getMeasuredHeight();
    text_block.scaleX = text1.scale * 1.1;
    text_block.x = (stage.canvas.width - text_block.getMeasuredWidth() * text_block.scale) / 2;
    text_block.y = text1.y + text_block.getMeasuredHeight() * text_block.scale * 1.2;
    text_new.addChild(text1, text_block);

    stage.addChild(dog, border);
    temp();
    renderBlock();
    addEvent();

}
function temp() {
    var orange_block = new createjs.Sprite(spriteSheet, "orange_block");
    orange_block.scale = main.scale;
    orange_block.x = main.x + main.width - orange_block.getBounds().width * orange_block.scale;
    orange_block.y = main.y;
    listBlock.push({ x: orange_block.x, y: orange_block.y });
    var red_block = new createjs.Sprite(spriteSheet, "red_block");
    red_block.scale = main.scale;
    red_block.x = orange_block.x + orange_block.getBounds().width * orange_block.scale - 2.98 / 4 * orange_block.getBounds().width * orange_block.scale - red_block.getBounds().width * red_block.scale;
    red_block.y = orange_block.y + orange_block.getBounds().height * orange_block.scale;
    listBlock.push({ x: red_block.x, y: red_block.y });
    var purple_block = new createjs.Sprite(spriteSheet, "purple_block");
    purple_block.scale = main.scale;
    purple_block.x = orange_block.x - purple_block.getBounds().width * purple_block.scale;
    purple_block.y = orange_block.y + 0.95 / 3 * orange_block.getBounds().height * orange_block.scale;
    listBlock.push({ x: purple_block.x, y: purple_block.y });
    var blue_block = new createjs.Sprite(spriteSheet, "blue_block");
    blue_block.scale = main.scale;
    blue_block.x = main.x;
    blue_block.y = main.y + main.height - blue_block.getBounds().height * blue_block.scale;
    listBlock.push({ x: blue_block.x, y: blue_block.y });
    var yellow_block = new createjs.Sprite(spriteSheet, "yellow_block");
    yellow_block.scale = main.scale;
    yellow_block.x = blue_block.x + 0.93 * blue_block.getBounds().width * blue_block.scale;
    yellow_block.y = blue_block.y - 0.02 * blue_block.getBounds().height * blue_block.scale;
    listBlock.push({ x: yellow_block.x, y: yellow_block.y });
}

function renderProcess() {
    var bg1 = new createjs.Shape();
    bg1.graphics.s("#946885");
    bg1.graphics.ss(3);
    bg1.graphics.rc(0, 0, process.width, process.height, process.radius, process.radius, process.radius, process.radius);
    bg1.x = (stage.canvas.width - process.width) / 2;
    bg1.y = stage.canvas.height / 10;
    process.x = bg1.x;
    process.y = bg1.y;
    processCr.addChild(bg1);

    process.star = new createjs.Shape();
    process.star.graphics.lf(["#ecbf6f", "#f8e953"], [0.7, 0.1], process.x, process.y + process.rStar / 2, process.x + process.rStar / 2, process.y + process.rStar / 3).drawPolyStar(process.x + process.rStar / 3, process.y + process.rStar / 2, process.rStar, 5, 0.6, 45);

    process.text_IQ = new createjs.Text('IQ', "bold 22px Impact", "#ffffff");
    process.text_IQ.x = process.x - process.rStar / 3;
    process.text_IQ.scaleX = (stage.canvas.width / 22) / process.text_IQ.getMeasuredWidth();
    process.text_IQ.scaleY = process.text_IQ.scaleX * 0.8;
    process.text_IQ.y = process.y - process.height / 1.5;
    process.text_IQ.textBaseline = "alphabetic";

    process.text_scores = new createjs.Text(process.score + 81, "bold 22px Impact", "#ffffff");
    process.text_scores.x = process.x;
    process.text_scores.scaleX = (stage.canvas.width / 15) / process.text_scores.getMeasuredWidth();
    process.text_scores.scaleY = process.text_scores.scaleX * 0.8;
    process.text_scores.y = process.y + process.height * 2.7;
    process.text_scores.textBaseline = "alphabetic";

    stage.addChild(process.star, process.text_IQ, process.text_scores);
}
function updateProcess() {
    processCr.removeChild(process.reality);
    process.realityWidth = (process.score / totalScore) * process.width;
    process.reality = new createjs.Shape();
    process.reality.graphics.s("#946885");
    process.reality.graphics.ss(3);
    if(process.score <= 8) process.reality.graphics.lf(["#FFA07A", "#FF0000"], [0.7, 0.3], 0, process.height / 2, process.realityWidth, process.height / 2);
    else process.reality.graphics.lf(["#47d4dd", "#4c43f1"], [0.7, 0.3], 0, process.height / 2, process.realityWidth, process.height / 2);
    process.reality.graphics.rc(0, 0, process.realityWidth, process.height, process.radius, process.radius, process.radius, process.radius);
    process.reality.x = process.x;
    process.reality.y = process.y;
    process.star.x = process.realityWidth - process.rStar / 1.7;
    processCr.addChild(process.reality);
    process.text_IQ.x = process.realityWidth + process.x - process.rStar;
    process.text_scores.x = process.x + process.realityWidth - process.rStar * (0.8 + (process.score / totalScore));
    process.text_scores.text = process.score + 81;
}
function updateIQ() {
    var upProcess = setInterval(function () {
        process.score += 1;
        if (process.score <= score) updateProcess();
        else clearInterval(upProcess);
    }, 30);
}
function updateIQD() {
    var upProcess = setInterval(function () {
        process.score -= 1;
        if (process.score >= score) updateProcess();
        else clearInterval(upProcess);
    }, 30);
}
function renderBlock() {
    var minY = main.y + main.height;
    var maxX = main.x + main.width;

    var yellow_block = new createjs.Sprite(spriteSheet, "yellow_block");
    yellow_block.scale = main.scale;
    yellow_block.x = main.x + yellow_block.getBounds().width * yellow_block.scale / 10;
    yellow_block.y = minY + yellow_block.getBounds().height * yellow_block.scale / 1.5;

    var purple_block = new createjs.Sprite(spriteSheet, "purple_block");
    purple_block.scale = main.scale;
    purple_block.x = yellow_block.x + yellow_block.getBounds().width * yellow_block.scale - purple_block.getBounds().width * purple_block.scale;
    purple_block.y = yellow_block.y + 1.7 * yellow_block.getBounds().height * yellow_block.scale;


    var blue_block = new createjs.Sprite(spriteSheet, "blue_block");
    blue_block.scale = main.scale;
    blue_block.x = yellow_block.x + 0.8 * yellow_block.getBounds().width * yellow_block.scale;
    blue_block.y = yellow_block.y + 0.7 * yellow_block.getBounds().height * yellow_block.scale;


    var red_block = new createjs.Sprite(spriteSheet, "red_block");
    red_block.scale = main.scale;
    red_block.x = maxX - red_block.getBounds().width * red_block.scale;
    red_block.y = minY + red_block.getBounds().height * red_block.scale / 2;


    var orange_block = new createjs.Sprite(spriteSheet, "orange_block");
    orange_block.scale = main.scale;
    orange_block.x = main.x + main.width - orange_block.getBounds().width * orange_block.scale;
    orange_block.y = red_block.y + 1.1 * red_block.getBounds().height * red_block.scale;



    listBlockUse = [{ x: orange_block.x, y: orange_block.y, block: orange_block },
    { x: red_block.x, y: red_block.y, block: red_block },
    { x: purple_block.x, y: purple_block.y, block: purple_block },
    { x: blue_block.x, y: blue_block.y, block: blue_block },
    { x: yellow_block.x, y: yellow_block.y, block: yellow_block }];
    for (let i = 0; i < listBlockUse.length; i++) {
        const blocks = listBlockUse[i];
        blocks.block.addEventListener("mousedown", () => { onMouseDown({ target: blocks, index: i }) });
    }
    hand = new createjs.Sprite(spriteSheet, "hand");
    hand.scale = main.scale / 1.3;
    hand.x = red_block.x + red_block.getBounds().width * red_block.scale / 3;
    hand.y = red_block.y + red_block.getBounds().height * red_block.scale / 2.2;

    hint = new createjs.Sprite(spriteSheet, "hint_red_block");
    hint.scale = main.scale;
    hint.x = listBlock[1].x;
    hint.y = listBlock[1].y;

    stage.addChild(hint, text_new, orange_block, red_block, purple_block, blue_block, yellow_block, hand);
    createjs.Tween.get(hand, { loop: true })
        .to({
            x: listBlock[1].x + red_block.getBounds().width * red_block.scale / 6,
            y: listBlock[1].y + red_block.getBounds().height * red_block.scale / 2.2
        }, 400, createjs.Ease.linear)
        .wait(100)
        .to({
            x: red_block.x + red_block.getBounds().width * red_block.scale / 3,
            y: red_block.y + red_block.getBounds().height * red_block.scale / 2.2
        }, 700, createjs.Ease.linear)
        .wait(100);
    createjs.Tween.get(hint, { loop: true })
        .to({ alpha: 0.1 }, 700, createjs.Ease.linear)
        .to({ alpha: 1 }, 500, createjs.Ease.linear);
}

function removeHand() {
    createjs.Tween.removeTweens(hand);
    stage.removeChild(hand);
    createjs.Tween.removeTweens(hint);
    stage.removeChild(hint);
}
function removeEvent() {
    for (let i = 0; i < listBlockUse.length; i++) {
        const block = listBlockUse[i].block;
        block._listeners = {};
        block.removeEventListener("mousedown", () => { onMouseDown() });
    }
}

//Event
function addEvent() {
    if (isMobile) {
        canvas.addEventListener("touchmove", onPressMove, supportsPassive ? { passive: true } : false);
        canvas.addEventListener("touchend", onMouseUp, supportsPassive ? { passive: true } : false);
    } else {
        canvas.addEventListener("mousemove", onPressMove);
        canvas.addEventListener("mouseup", onMouseUp);
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
function onMouseDown(block) {
    text_new.removeAllChildren();
    stage.removeChild(text_new);
    pressMove = true;
    blockUse = block;
}
function onPressMove(evt) {
    if (pressMove) {
        pressUp = true;
        var target = blockUse.target.block;
        var location = currentMouse(evt);
        target.x = location.x - target.getBounds().width / 2;
        target.y = location.y - target.getBounds().height / 2;
    }
}
function onMouseUp(evt) {
    pressMove = false;
    if (pressUp) {
        var location = currentMouse(evt);

        var target = blockUse.target.block;
        index = listBlock[blockUse.index];
        if (target.x >= index.x - target.getBounds().width / 3 && target.x <= index.x + target.getBounds().width / 3) {
            if (target.y >= index.y - target.getBounds().height / 3 && target.y <= index.y + target.getBounds().height / 3) {
                removeHand()
                target.x = index.x;
                target.y = index.y;
                win += 1;
                if (score < totalScore) score += 4;
                updateIQ();
                setStar();
            } else {
                target.x = listBlockUse[blockUse.index].x;
                target.y = listBlockUse[blockUse.index].y;
                score -= 4;
                updateIQD();
                gameClose();
            }
        } else {
            target.x = listBlockUse[blockUse.index].x;
            target.y = listBlockUse[blockUse.index].y;
            score -= 4;
            updateIQD();
            gameClose();
        }
        pressUp = false;
    }
}
function tick(event) {
    if (update) {
        updateParticles();
        stage.update(event);
    }
}
//Support
function gameClose() {
    if (win < 5 && score <= 0) {
        removeEvent()
        listBlockUse.forEach(blocks => {
            createjs.Tween.get(blocks.block)
                .to(
                    { x: blocks.x, y: blocks.y }, 200, createjs.Ease.linear
                )
        });

        var shape = new createjs.Shape();
        shape.graphics.f("#fafafa").dr(0, 0, stage.canvas.width, stage.canvas.height);
        shape.alpha = 0.4;


        var bgcore = new createjs.Shape();

        bgcore.graphics.s("#18236b");
        bgcore.graphics.ss(3);
        bgcore.graphics.lf(["#1e134c", "#35125b"], [0.7, 0.3], stage.canvas.width / 4, 0, stage.canvas.width / 4, stage.canvas.height / 5);
        bgcore.graphics.rc(0, 0, stage.canvas.width / 2, stage.canvas.height / 5, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50);
        bgcore.x = (stage.canvas.width - stage.canvas.width / 2) / 2;
        bgcore.y = stage.canvas.height / 4;


        var fail = new createjs.Text('FAILED ', "Italic 30px Impact", "#ffffff");

        fail.scale = (stage.canvas.width / 3) / fail.getMeasuredWidth();
        fail.x = (stage.canvas.width - fail.getMeasuredWidth() * fail.scale) / 2;
        fail.y = bgcore.y + (stage.canvas.height / 5) / 3 - fail.getMeasuredHeight() * fail.scale / 2;

        var full = new createjs.Sprite(spriteSheet, "full");
        full.scale = (stage.canvas.width / 7) / full.getBounds().width;
        full.x = (stage.canvas.width - full.getBounds().width * full.scale) / 2;
        full.y = fail.y + fail.getMeasuredHeight() * fail.scale + full.getBounds().height * full.scale / 3;

        var containerfail = new createjs.Container();
        containerfail.y = - bgcore.y - stage.canvas.height / 4;
        containerfail.addChild(bgcore, fail, full);

        var play_again = new createjs.Sprite(spriteSheet, "btn_again");
        play_again.scale = (stage.canvas.width / 2.7) / play_again.getBounds().width;
        play_again.x = (stage.canvas.width - play_again.getBounds().width * play_again.scale) / 2;
        play_again.y = stage.canvas.height;

        var play_againx = play_again.x,
            play_againy = bgcore.y + stage.canvas.height / 5 + play_again.getBounds().height * play_again.scale * 2.5,
            play_againscale = stage.canvas.width / 2.7 / play_again.getBounds().width;

        createjs.Tween.get(play_again)
            .to(
                { y: play_againy }, 500, createjs.Ease.linear
            ).call(() => {
                createjs.Tween.get(play_again, { loop: true })
                    .to(
                        {
                            scale: (stage.canvas.width / 3) / play_again.getBounds().width,
                            x: (stage.canvas.width - ((stage.canvas.width / 3) / play_again.getBounds().width) * play_again.getBounds().width) / 2,
                            y: play_againy - (stage.canvas.width / 5 - stage.canvas.width / 8) / 10,
                        },
                        500,
                        createjs.Ease.linear
                    )
                    .to({ scale: play_againscale, x: play_againx, y: play_againy }, 500, createjs.Ease.linear);
            });
        play_again.addEventListener("click", () => { getLinkInstall() }, false);

        stage.addChild(shape, containerfail, play_again);
        createjs.Tween.get(containerfail)
            .to({ y: 0 }, 500, createjs.Ease.linear);
    }
}
function setStar() {
    if (win == 5) {
        removeEvent();
        setInterval(emitParticles, Math.random() * 700 + 300);
        setInterval(emitParticles, Math.random() * 700 + 300);

        var bgcore = new createjs.Shape();

        bgcore.graphics.s("#18236b");
        bgcore.graphics.ss(3);
        bgcore.graphics.lf(["#1e134c", "#35125b"], [0.7, 0.3], stage.canvas.width / 4, 0, stage.canvas.width / 4, stage.canvas.height / 5);
        bgcore.graphics.rc(0, 0, stage.canvas.width / 2, stage.canvas.height / 5, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50, stage.canvas.width / 50);
        bgcore.x = (stage.canvas.width - stage.canvas.width / 2) / 2;
        bgcore.y = stage.canvas.height / 4;

        var best = new createjs.Text('Your IQ ', "22px Impact", "#ffffff");

        best.scale = (stage.canvas.width / 6) / best.getMeasuredWidth();
        best.x = (stage.canvas.width - best.getMeasuredWidth() * best.scale) / 2;
        best.y = bgcore.y + best.getMeasuredHeight() * best.scale * 1.4;

        var text = new createjs.Text(score + 81, "22px Impact", "#ffffff");
        text.scale = (stage.canvas.width / 7) / text.getMeasuredWidth();
        text.x = (stage.canvas.width - text.getMeasuredWidth() * text.scale) / 2;
        text.y = bgcore.y + stage.canvas.height / 5 - text.getMeasuredHeight() * text.scale * 1.6;


        var play_again = new createjs.Sprite(spriteSheet, "btn_again");
        play_again.scale = (stage.canvas.width / 2.7) / play_again.getBounds().width;
        play_again.x = (stage.canvas.width - play_again.getBounds().width * play_again.scale) / 2;
        play_again.y = text.y + text.getMeasuredHeight() * text.scale + play_again.getBounds().height * play_again.scale * 2.5;

        var play_againx = play_again.x,
            play_againy = play_again.y,
            play_againscale = stage.canvas.width / 2.7 / play_again.getBounds().width;
        createjs.Tween.get(play_again, { loop: true })
            .to(
                {
                    scale: (stage.canvas.width / 3) / play_again.getBounds().width,
                    x: (stage.canvas.width - ((stage.canvas.width / 3) / play_again.getBounds().width) * play_again.getBounds().width) / 2,
                    y: play_againy - (stage.canvas.width / 5 - stage.canvas.width / 8) / 10,
                },
                500,
                createjs.Ease.linear
            )
            .to({ scale: play_againscale, x: play_againx, y: play_againy }, 500, createjs.Ease.linear);
        play_again.addEventListener("click", () => { getLinkInstall() }, false);
        removeBlock();
        stage.removeChild(dog, border);
        var full = new createjs.Sprite(spriteSheet, "full");
        full.scale = (stage.canvas.width * 2.2 / 3) / full.getBounds().width;
        full.x = (stage.canvas.width - full.getBounds().width * full.scale) / 2;
        full.y = stage.canvas.height / 4.5;

        stage.addChild(full, bgcore, best, text, play_again);

        createjs.Tween.get(full)
            .to(
                {
                    scale: (stage.canvas.width / 2) / dog.getBounds().width,
                    x: (stage.canvas.width - stage.canvas.width / 2) / 2,
                    y: play_again.y + play_again.getBounds().height * play_again.scale * 2
                },
                500,
                createjs.Ease.linear
            );

    }
}
function removeBlock() {
    listBlockUse.forEach(blocks => {
        stage.removeChild(blocks.block);
    });
}

var particles = [];
const MAX_LIFE = 100;
var count = 0;
function emitParticles() {
    var fire_x = Math.floor(Math.random() * stage.canvas.width);
    var circle_r = Math.round(Math.random() * stage.canvas.width * 0.01 + stage.canvas.width * 0.006);
    var a = Math.floor(Math.random() * 2);
    var fire_y = a == 0 ? Math.floor((Math.random() * stage.canvas.height) / 5) - stage.canvas.height / 30 : Math.floor((Math.random() * stage.canvas.height) / 10) + (stage.canvas.height * 2) / 5;
    for (var i = 0; i < 180; i += 5) {
        var particle = new createjs.Shape();
        particle.graphics.beginFill(createjs.Graphics.getHSL(0, 75, 75)).drawPolyStar(100, 100, circle_r, 5, 0.6, 0);
        particle.x = fire_x;
        particle.y = fire_y;
        particle.regX = particle.regY = 100;
        particle.compositeOperation = "lighter";
        stage.addChild(particle);
        var angle = i + 1;
        var pow = Math.random() * stage.canvas.width * 0.02 + stage.canvas.width * 0.007;
        particle.vx = pow * Math.cos((angle * 5 * Math.PI) / 180);
        particle.vy = pow * Math.sin((angle * 5 * Math.PI) / 180);
        particle.life = MAX_LIFE;
        particles.push(particle);
    }
}
function updateParticles() {
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        particle.vy += 0.3;
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.x += particle.vx - 0.9;
        particle.y += particle.vy;
        var scale = particle.life / MAX_LIFE;
        particle.scaleX = particle.scaleY = scale;
        particle.life -= 1;
        particle.rotation -= 4;
        if (particle.life <= 0) {
            stage.removeChild(particle);
            particles.splice(i, 1);
        }
    }
}
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