// di index.js
var readBooks = require("./callback.js");

var books = [
    { name: "LOTR", timeSpent: 3000 },
    { name: "Fidas", timeSpent: 2000 },
    { name: "Kalkulus", timeSpent: 4000 },
    { name: "komik", timeSpent: 1000 }
];

// Tulis code untuk memanggil function readBooks di sini

const mulaiBaca = (readTime = 10000) => {
    let lastTime =  readTime;

    const bookObj = books.shift();
    const pemanggil = (timeLeft) => {
        if(timeLeft >= 0 && books.length > 0 && lastTime !== timeLeft){
            lastTime = timeLeft
            const bookObj = books.shift();
            readBooks(timeLeft, bookObj, pemanggil);
        }
    }

    readBooks(readTime, bookObj, pemanggil);
}

mulaiBaca(10000);