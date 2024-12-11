let serpente;
let risoluzione = 20;
let scalatura = 2;
let mela;
let larghezza;
let altezza;

function setup() {
    createCanvas(400, 400);
    frameRate(2);
    larghezza = floor(width / risoluzione);
    altezza = floor(height / risoluzione);
    serpente = new Serpente(larghezza,altezza);
    posizioneMela();
}

function posizioneMela() {
    let x = floor(random(larghezza));
    let y = floor(random(altezza));
    mela = createVector(x, y);
}

function draw() {
    scale(risoluzione);
    background(120);

    if(serpente.mangia(mela)){
        posizioneMela();
    };

    serpente.aggiorna();

    noStroke();
    fill(180,0,0);
    square(mela.x,mela.y,1);
}

function keyPressed() {

    switch (keyCode) {
        case UP_ARROW:
            serpente.impostaDirezione(0, -1);
            break;
        case DOWN_ARROW:
            serpente.impostaDirezione(0, 1);
            break;
        case LEFT_ARROW:
            serpente.impostaDirezione(-1, 0);
            break;
        case RIGHT_ARROW:
            serpente.impostaDirezione(1, 0);
            break;

        default:
            break;
    }

}