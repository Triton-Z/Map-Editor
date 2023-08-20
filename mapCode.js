const canvas = document.getElementById("mapArea");
const ctx = canvas.getContext("2d");

document.body.style.padding = 0;
document.body.style.margin = 0;
document.body.style.overflow = "hidden";
document.addEventListener('contextmenu', event => event.preventDefault());

canvas.width = window.innerWidth - document.getElementById("sidebar").offsetWidth;
canvas.height = window.innerHeight;

const [
    cursorButton, 
    crossButton,
    wall, 
    door, 
    spike,
    turret,
    fireTower,
    electricTower,
    iceTower,
    repairTower,
    plantTower,
    rockTower,
    waterTower,
    spectrumTower,
    windmill,
    boostPad,
    healPad,
    bearTrap,
    wood,
    stone,
    gold,
    ruby,
    amethyst,
    sapphire,
    amber,
    diamond,
    emerald
] 

= 

[
    document.getElementById("cursorButton"), 
    document.getElementById("crossButton"),
    document.getElementById("wall"),
    document.getElementById("door"),
    document.getElementById("spike"),
    document.getElementById("turret"),
    document.getElementById("fireTower"),
    document.getElementById("electricTower"),
    document.getElementById("iceTower"),
    document.getElementById("repairTower"),
    document.getElementById("plantTower"),
    document.getElementById("rockTower"),
    document.getElementById("waterTower"),
    document.getElementById("spectrumTower"),
    document.getElementById("windmill"),
    document.getElementById("boostPad"),
    document.getElementById("healPad"),
    document.getElementById("bearTrap"),
    document.getElementById("wood"),
    document.getElementById("stone"),
    document.getElementById("gold"),
    document.getElementById("ruby"),
    document.getElementById("amethyst"),
    document.getElementById("sapphire"),
    document.getElementById("amber"),
    document.getElementById("diamond"),
    document.getElementById("emerald"),
];

const mouseCoords = {
    x: NaN,
    y: NaN
}

const obj = []
class Item {
    constructor (degree, x, y, tier, item) {
        this.x = x;
        this.y = y;
        this.degree = degree;
        this.tier = tier;
        this.item = item;
    }
}

let selectedClickEvent = "POINTER";
let selectedItem = "WALL";
let selectedTier = "WOODEN";

let scale = 2;
let rotation = 0;

let mouseTouchCanvas = false;
let prevScale;

function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let cursorItem = document.getElementById(itemFormat(selectedItem));


    if (mouseTouchCanvas) {
        if (selectedClickEvent == "CROSS") {
            cursorItem = document.getElementById("crossImage");
            ctx.drawImage(cursorItem, mouseCoords.x - (cursorItem.width + scale) / 2, mouseCoords.y - (cursorItem.height + scale) / 2, 20, 20);
        } else {
            ctx.save();
            ctx.translate(mouseCoords.x, mouseCoords.y);
            ctx.rotate(rotation);
            ctx.drawImage(cursorItem, 0 - (cursorItem.width + scale) / 2, 0 - (cursorItem.height + scale) / 2, cursorItem.width + scale, cursorItem.height + scale);
            ctx.restore();
        }

    }

    ctx.restore();
    setTimeout(draw, 17);
};

function getMouseCoords (evt) {
    const rect = canvas.getBoundingClientRect();
    mouseCoords.x = evt.clientX - rect.left;
    mouseCoords.y = evt.clientY - rect.top;
}


function changeItemsRarity(tier) {
    const items = [wall, door, spike, turret, fireTower, electricTower, iceTower, repairTower, plantTower, rockTower, waterTower, spectrumTower, windmill]
    items.forEach(i => {
        i.src = i.src.replace(selectedTier.toLowerCase(), tier);
    });
    selectedTier = tier;
}

function changeItemType(type) {
    selectedItem = type;
    selectedClickEvent = "POINTER";
}

function itemFormat(format) {
    if (format.toLowerCase().includes("tower")) {
        return(format.toLowerCase().substring(0, format.indexOf("TOWER")) + "Tower");
    } else
    {
        return(format.toLowerCase());
    }
}

canvas.addEventListener('click', function handleClick() {
    console.log('element clicked');
});

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key == "ArrowRight" || key == "r") {
        rotation += 0.1;   
    } 

    if (key == "ArrowLeft" || key == "e") {
        rotation -= 0.1;   
    } 

});

canvas.addEventListener("mouseleave", function (event) {
    mouseTouchCanvas = false;
}, false);
canvas.addEventListener("mouseover", function (event) {
    mouseTouchCanvas = true;
}, false);

cursorButton.addEventListener("click", function() {
    selectedClickEvent = "POINTER";
}); 

crossButton.addEventListener("click", function() {
    selectedClickEvent = "CROSS";
}); 


window.onload = draw;
