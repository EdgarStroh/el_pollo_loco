let intervalIds = [];
let i = 1;

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

setStoppableInterval(sayHello, 500);
setStoppableInterval(sayGoodbye, 500);

function stopGame() {
    if (world.keyboard.ESC) {
        intervalIds.forEach(clearInterval);
    }
}

function sayHello() {
    console.log('Hallo', i);
    i++;
}

function sayGoodbye() {
    console.log('Tschüss', i);
    i++;
}