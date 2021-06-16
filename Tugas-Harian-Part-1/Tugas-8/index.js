// di index.js
var readBooks = require("./callback.js");

var books = [
    { name: "LOTR", timeSpent: 3000 },
    { name: "Fidas", timeSpent: 2000 },
    { name: "Kalkulus", timeSpent: 4000 },
    { name: "komik", timeSpent: 1000 }
];

// Tulis code untuk memanggil function readBooks di sini
const WAKTU_BACA = 10000

const mulaiBaca = (readTime) => {
    let lastTime =  readTime;

    const bookObj = books.shift();
    const pemanggil = (timeLeft) => {
        // Menjaga agar tidak repeat jika waktu habis atau habis karena
        // membaca buku yg waktunya melebihi sisa waktu. (Konsistensi dgn no.2)

        if(timeLeft > 0 && books.length > 0 && lastTime !== timeLeft){
            lastTime = timeLeft
            const bookObj = books.shift();
            readBooks(timeLeft, bookObj, pemanggil);
        }
    }

    readBooks(readTime, bookObj, pemanggil);
}

mulaiBaca(WAKTU_BACA);