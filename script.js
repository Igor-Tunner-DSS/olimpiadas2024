function showSidebar() {
    const sidebar = document.getElementById("sidebar");
    const menu_button = document.getElementById("menu-button");
    const icon = document.querySelector(".icon");
    const body = document.querySelector("body");

    menu_button.style.display = "none";
    icon.style.display = "none";
    sidebar.style.display = "flex";
    body.style.overflowY = "hidden";
}


function hideSidebar() {
    const sidebar = document.getElementById("sidebar");
    const menu_button = document.getElementById("menu-button");
    const icon = document.querySelector(".icon");
    const body = document.querySelector("body");

    body.style.overflowY = "visible";
    icon.style.display = "flex";
    menu_button.style.display = "flex"
    sidebar.style.display = "none";
}

function evaluateShot() {
    const targetElement = document.querySelector(".target"),
          box = targetElement.getBoundingClientRect(),
          xCenter = (box.left + box.right) / 2,
          yCenter = (box.top + box.bottom) / 2;

    const randomness = window.innerWidth / 200;
          mouseX = event.clientX + Math.floor(Math.random() * randomness),
          mouseY = event.clientY + Math.floor(Math.random() * randomness);

    const delimiterX = box.right,
          delimiterY = box.bottom;

    var precisionX = ((Math.abs((xCenter - mouseX)) * -1) + (delimiterX - xCenter)) / (delimiterX - xCenter);
    var precisionY = ((Math.abs((yCenter - mouseY)) * -1) + (delimiterY - yCenter)) / (delimiterY - yCenter);

    var precision = ((precisionX + precisionY) / 2);
    const colorRange = {
        10 : "rgb(228, 8, 10)",
        20 : "rgb(228, 8, 10)",
        30 : "rgb(228, 8, 10)",
        40 : "rgb(230, 60, 8)",
        50 : "rgb(230, 108, 8)",
        60 : "rgb(230, 152, 8)",
        70 : "rgb(230, 218, 8)",
        80 : "rgb(207, 230, 8)",
        90 : "rgb(152, 230, 8)",
        100 : "rgb(82, 230, 8)"
    };

    var calculatedColor = colorRange[Math.round((precision * 100).toFixed(2) - 90) * 10];
    if (precision * 100 < 90) {
        calculatedColor = colorRange[10];
    }

    const informationText = document.querySelector(".info"),
          targetObject = document.querySelector(".target");
          
    var randomTargetSize = Math.floor(Math.random() * 80) + 20;
    var randomTargetOffsetX = Math.floor(Math.random() * 20) - 10;
    var randomTargetOffsetY = Math.floor(Math.random() * 20) - 10;

    informationText.innerHTML = `${(precision * 100).toFixed(2)}%`;
    
    
    const showTextAnimation = [
        {width: 0, margin: '0 auto', color: 'var(--text-color)'},
        {width: '100%', margin: '0 auto', color: calculatedColor}
    ];

    const resizeTargetAnimation = [
        {
            width: `${randomTargetSize + (Math.floor(Math.random() * 4) - 5)}%`, 
            translate: `${randomTargetOffsetY + (Math.floor(Math.random() * 14) - 7)}% ${randomTargetOffsetX + (Math.floor(Math.random() * 14) - 7)}%`,
            filter: 'none', 
            offset: 0.1
        },
        {width: `${randomTargetSize}%`, translate: `${randomTargetOffsetY}% ${randomTargetOffsetX}%`, filter: 'none', offset: 0.9},
        {width: '60%', translate: '0% 0%', filter: 'none'}
    ];

    const targetFilterAnimation = [
        {
            filter: 'drop-shadow(0 0 30px black) hue-rotate(10deg) saturate(120%)'
        },
        {
            filter: 'none'
        }
    ];

    const targetWobbleAnimation = [
        {
            transform: 'rotateX(0deg)'
        },
        {
            transform: 'rotateX(30deg) rotateY(10deg)'
        },
        {
            transform: 'rotateX(0deg)'
        }
    ]

    targetObject.animate(resizeTargetAnimation, {duration: 9000, fill: 'forwards', easing: 'cubic-bezier(.6,-0.02,.49,1.26)'});
    targetObject.animate(targetFilterAnimation, {duration: 2000, easing: 'cubic-bezier(.5,-0.28,.49,1.26)'});
    targetObject.animate(targetWobbleAnimation, {duration: 300, easing: 'cubic-bezier(.42,-0.23,.77,1.65)'});
    informationText.animate(showTextAnimation, {duration: 2000, iterations: 1, fill: 'forwards'});

}

function toggleCardContent(index) {
    const allCardHeaders = document.querySelectorAll(".header"),
          allCardTexts = document.querySelectorAll(".card-content .text"),
          allCardParents = document.querySelectorAll(".card");

    var cardHeader = allCardHeaders[index - 1];
    var cardText = allCardTexts[index - 1];
    var cardParent = allCardParents[index - 1];


    if (cardHeader.dataset.visible == 1) {
        cardHeader.style.opacity = 0;
        cardHeader.style.transform = 'rotateY(180deg)';
        cardHeader.style.pointerEvents = 'none';
        cardHeader.dataset.visible = 0;

        cardParent.style.transform = 'rotateY(180deg)';

        cardText.style.opacity = 1;
        cardHeader.style.transform = 'rotateY(0deg)';
    }
    else if (cardHeader.dataset.visible == 0) {
        cardText.style.opacity = 0;
        cardHeader.style.transform = 'rotateY(-180deg)';
        cardText.style.pointerEvents = 'none';

        cardHeader.style.opacity = 1;
        cardHeader.dataset.visible = 1;
        cardHeader.style.transform = 'rotateY(0)';

        cardParent.style.transform = 'rotateY(0deg)';
    }
}

function validate(){
    var name = form.name.value;
    var email = form.email.value;

    if(name.length <= 4){
        alert("Insira o seu nome inteiro");
        form.name.focus();
        return false;
    }

    else if (email == '') {
        alert("Insira o seu email");
        form.email.focus();
        return false;
    }
}


const header = document.querySelector(".title");
const hover = document.querySelector('#header .hover');


function setShadow() {
    var query = window.matchMedia("(max-width: 850px)");
    if (query.matches) {
        header.style.textShadow = 'none';
        return;
    }
    const box = header.getBoundingClientRect(),
          xCenter = (box.left + box.right) / 2,
          yCenter = (box.top + box.bottom) / 2;

    const {clientX: x, clientY: y} = event;

    const walkX = (xCenter - x) / 8;
    const walkY = (yCenter - y) / 8;

    header.style.textShadow = `
    ${walkX}px ${walkY}px 2px #00000099
    `;

    hover.style.left = `${x}px`;
    hover.style.top = `${y}px`;
    hover.style.translate = '-75% -50%';
}

document.querySelector('#header:has(.title[title])').addEventListener('mousemove', setShadow);