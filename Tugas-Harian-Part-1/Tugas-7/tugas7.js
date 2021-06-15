// SOAL 1
console.log("--- SOAL 1 ---");

// Release 0
console.log("--- RELEASE 0 ---");
class Animal {
    constructor(name) {
        this._name = name;
        this._legs = 4;
        this._coldBlodded = false;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    get legs() {
        return this._legs;
    }

    set legs(numLegs) {
        this._legs = numLegs;
    }

    get cold_blooded() {
        return this._coldBlodded;
    }

    set cold_blooded(isColdBloded) {
        this._coldBlodded = isColdBloded;
    }
}

var sheep = new Animal("shaun");

console.log(sheep.name); // "shaun"
console.log(sheep.legs); // 4
console.log(sheep.cold_blooded); // false
sheep.legs = 3;
console.log(sheep.legs);
console.log();

// RELEASE 1
console.log("--- RELEASE 1 ---");

class Frog extends Animal {
    constructor(name) {
        super(name);
    }

    jump() {
        console.log("hop hop");
    }
}

class Ape extends Animal {
    constructor(name) {
        super(name);
    }

    yell() {
        console.log("Auoo");
    }
}

var sungokong = new Ape("kera sakti");
sungokong.yell(); // "Auooo"
sungokong.legs = 2;
console.log(sungokong.name);
console.log(sungokong.legs);
console.log(sungokong.cold_blooded);

var kodok = new Frog("buduk");
kodok.jump(); // "hop hop"
console.log(kodok.name);
console.log(kodok.legs);
console.log(kodok.cold_blooded);
console.log();

// SOAL 2
console.log("--- SOAL 2 ---");
class Clock {
    constructor({ template }) {
        this._timer = null;
        this._template = template;
    }

    start() {
        const render = () => {
            var date = new Date();

            var hours = date.getHours();
            if (hours < 10) hours = "0" + hours;

            var mins = date.getMinutes();
            if (mins < 10) mins = "0" + mins;

            var secs = date.getSeconds();
            if (secs < 10) secs = "0" + secs;

            var output = this._template
                .replace("h", hours)
                .replace("m", mins)
                .replace("s", secs);

            console.log(output);
        };

        render();
        this._timer = setInterval(render, 1000);
    }

    stop() {
        if (this._timer) {
            clearInterval(this._timer);
        } else {
            console.error("Timer belum pernah dijalankan");
        }
    }
}

var clock = new Clock({ template: "h:m:s" });
clock.start();

setTimeout(() => {
    clock.stop();
}, 5000);
