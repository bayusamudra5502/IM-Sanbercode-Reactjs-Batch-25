var filterBooksPromise = require("./promise2.js");

// Lanjutkan code untuk menjalankan function filterBookPromise
// KONDISI 1
filterBooksPromise(true, 40)
    .then((data) => console.log(data))
    .catch((msg) => console.error(msg));

// KONDISI 2
async function cariBuku2() {
    try {
        const data = await filterBooksPromise(false, 250);
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

cariBuku2();

// KONDISI 3
async function cariBuku3() {
    try {
        const data = await filterBooksPromise(true, 30)
        console.log(data);
    } catch ({message : errMsg}) {
        console.error(errMsg);
    }
}

cariBuku3();
