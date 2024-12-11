class Serpente {

    constructor(larghezza, altezza) {
        this.lunghezza = 1;
        this.corpo = [];
        this.corpo[0] = createVector(floor(larghezza / 2), floor(altezza / 2));
        this.xdir = 0;
        this.ydir = 0;
        this.larg = larghezza;
        this.alt = altezza;
    }

    impostaDirezione(x, y) {
        this.xdir = x;
        this.ydir = y;
    }

    aggiorna() {
        let testa = this.corpo[this.corpo.length - 1].copy();
        this.corpo.shift();
        testa.x += this.xdir;
        testa.y += this.ydir;
        this.corpo.push(testa);

    
        for (let i = 0; i < this.corpo.length; i++) {
            noStroke();
            fill(255 - (20 * i));
            rect(this.corpo[i].x, this.corpo[i].y, 1, 1);
        }
    }


    cresci() {
        let testa = this.corpo[this.corpo.length - 1].copy();
        this.lunghezza++;
        this.corpo.push(testa);
    }

    mangia(pos) {
        let x = this.corpo[this.corpo.length - 1].x;
        let y = this.corpo[this.corpo.length - 1].y;

        if (x == pos.x && y == pos.y) {
            console.log("mangiata!");
            this.cresci();
            return true;
        }

        return false;
    }

    fineGioco() {
        let x = this.corpo[this.corpo.length - 1].x;
        let y = this.corpo[this.corpo.length - 1].y;



    }
}