// SOAL 1
var kataPertama = "saya";
var kataKedua = "senang";
var kataKetiga = "belajar";
var kataKeempat = "javascript";

kataKedua = kataKedua[0].toUpperCase() + kataKedua.substring(1);
kataKetiga =
    kataKetiga.substring(0, kataKetiga.length - 1) +
    kataKetiga.substr(-1, 1).toUpperCase();

kataKeempat = kataKeempat.toUpperCase();

console.log(
    kataPertama + " " + kataKedua + " " + kataKetiga + " " + kataKeempat
);
console.log();

// SOAL 2
var panjangPersegiPanjang = "8";
var lebarPersegiPanjang = "5";

var alasSegitiga = "6";
var tinggiSegitiga = "7";

var kelilingPersegiPanjang =
    2 * (parseInt(panjangPersegiPanjang) + parseInt(lebarPersegiPanjang));

var luasSegitiga = 0.5 * parseInt(alasSegitiga) * parseInt(tinggiSegitiga);

console.log("Keliling Persegi Panjang :", kelilingPersegiPanjang);
console.log("Luas Segitiga :", luasSegitiga);
console.log();

// SOAL 3
var sentences = "wah javascript itu keren sekali";

var firstWord = sentences.substring(0, 3);
var secondWord = sentences.substring(4, 14); // do your own!
var thirdWord = sentences.substring(15, 18); // do your own!
var fourthWord = sentences.substring(19, 24); // do your own!
var fifthWord = sentences.substring(25); // do your own!

console.log("Kata Pertama: " + firstWord);
console.log("Kata Kedua: " + secondWord);
console.log("Kata Ketiga: " + thirdWord);
console.log("Kata Keempat: " + fourthWord);
console.log("Kata Kelima: " + fifthWord);
console.log();

// SOAL 4
var nilaiJohn = 80;
var nilaiDoe = 50;

if (nilaiJohn >= 80) {
    console.log("Indeks John : A");
} else if (nilaiJohn >= 70) {
    console.log("Indeks John : B");
} else if (nilaiJohn >= 60) {
    console.log("Indeks John : C");
} else if (nilaiJohn >= 50) {
    console.log("Indeks John : D");
} else {
    console.log("Indeks John : E");
}

if (nilaiDoe >= 80) {
    console.log("Indeks Doe : A");
} else if (nilaiDoe >= 70) {
    console.log("Indeks Doe : B");
} else if (nilaiDoe >= 60) {
    console.log("Indeks Doe : C");
} else if (nilaiDoe >= 50) {
    console.log("Indeks Doe : D");
} else {
    console.log("Indeks Doe : E");
}
console.log();

// SOAL 5
var tanggal = 5;
var bulan = 5;
var tahun = 2002;
var namaBulan = null;

switch (bulan) {
    case 1:
        namaBulan = "Januari";
        break;
    case 2:
        namaBulan = "Februari";
        break;
    case 3:
        namaBulan = "Maret";
        break;
    case 4:
        namaBulan = "April";
        break;
    case 5:
        namaBulan = "Mei";
        break;
    case 6:
        namaBulan = "Juni";
        break;
    case 7:
        namaBulan = "Juli";
        break;
    case 8:
        namaBulan = "Agustus";
        break;
    case 9:
        namaBulan = "September";
        break;
    case 10:
        namaBulan = "Oktober";
        break;
    case 11:
        namaBulan = "November";
        break;
    case 12:
        namaBulan = "Desember";
        break;
    default:
        namaBulan = null;
}

if (namaBulan) {
    console.log("Tanggal Lahir:");
    console.log(tanggal.toString(), namaBulan, tahun.toString());
} else {
    console.error("Nama bulan tidak dikenal");
}
