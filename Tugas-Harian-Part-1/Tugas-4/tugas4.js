// SOAL 1
var i = 0;
console.log("LOOPING PERTAMA");

while (i <= 20) {
    if (i > 0 && i % 2 === 0) {
        console.log(i.toString(), "-", "I love coding");
    }

    i += 1;
}
console.log("LOOPING KEDUA");

while (i > 0) {
    if (i <= 20 && i % 2 === 0) {
        console.log(i.toString(), "-", "I will become a frontend developer");
    }

    i -= 1;
}

console.log();

// SOAL 2
for (i = 1; i <= 20; i++) {
    if (i % 3 === 0 && i % 2 !== 0) {
        console.log(i.toString(), "-", "I Love Coding");
    } else if (i % 2 == 0) {
        console.log(i.toString(), "-", "Berkualitas");
    } else {
        console.log(i.toString(), "-", "Santai");
    }
}
console.log();

// SOAL 3
// Cara lain :
// for (i = 1; i <= 7; i++) {
//     console.log("#".repeat(i));
// }

for (i = 1; i <= 7; i++) {
    var str = "";
    for (var j = 0; j < i; j++) {
        str += "#";
    }

    console.log(str);
}
console.log();

// SOAL 4
var kalimat = [
    "aku",
    "saya",
    "sangat",
    "sangat",
    "senang",
    "belajar",
    "javascript",
];

kalimat.shift();
kalimat.splice(1, 1);
console.log('"' + kalimat.join(" ") + '"');
console.log();

// SOAL 5
var sayuran = [];
sayuran.push(
    "Bayam",
    "Buncis",
    "Kangkung",
    "Kubis",
    "Seledri",
    "Tauge",
    "Timun"
);

sayuran.sort();

for (i = 0; i < sayuran.length; i++) {
    console.log((i + 1).toString() + ".", sayuran[i]);
}

console.log();
