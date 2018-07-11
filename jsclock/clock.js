const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsdeg = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsdeg}deg)`;

    const minutes = now.getMinutes();
    const mindeg = ((minutes / 60) * 360) + 90;
    minHand.style.transform = `rotate(${mindeg}deg)`;

    const hour = now.getHours();
    const hourdeg = ((hour / 12) * 360) + 120;
    hourHand.style.transform = `rotate(${hourdeg}deg)`;
}

setInterval(setDate, 1000)