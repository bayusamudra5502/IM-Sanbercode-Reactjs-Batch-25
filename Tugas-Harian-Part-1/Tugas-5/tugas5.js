// Soal 1
console.log("--- SOAL NOMOR 1 ---");

function luasPersegiPanjang(panjang, lebar) {
    return panjang * lebar;
}

function kelilingPersegiPanjang(panjang, lebar) {
    return 2 * (panjang + lebar);
}

function volumeBalok(panjang, lebar, tinggi) {
    return panjang * lebar * tinggi;
}

var panjang = 12;
var lebar = 4;
var tinggi = 8;

var luasPersegiPanjang = luasPersegiPanjang(panjang, lebar);
var kelilingPersegiPanjang = kelilingPersegiPanjang(panjang, lebar);
var volumeBalok = volumeBalok(panjang, lebar, tinggi);

console.log(luasPersegiPanjang);
console.log(kelilingPersegiPanjang);
console.log(volumeBalok);
console.log();

// SOAL 2
console.log("--- SOAL NOMOR 2 ---");

function introduce(name, age, address, hobby) {
    return (
        "Nama saya " +
        name +
        " umur saya " +
        age +
        " tahun, alamat saya di " +
        address +
        ", dan saya punya hobby yaitu " +
        hobby +
        "!"
    );
}

var name = "John";
var age = 30;
var address = "Jalan belum jadi";
var hobby = "Gaming";

var perkenalan = introduce(name, age, address, hobby);
console.log(perkenalan); // Menampilkan "Nama saya John, umur saya 30 tahun, alamat saya di Jalan belum jadi, dan saya punya hobby yaitu Gaming!"
console.log();

// SOAL 3
console.log("--- SOAL NOMOR 3 ---");
var arrayDaftarPeserta = ["John Doe", "laki-laki", "baca buku", 1992];

arrayDaftarPeserta = {
    nama: arrayDaftarPeserta[0],
    jenisKelamin: arrayDaftarPeserta[1],
    hobi: arrayDaftarPeserta[2],
    tahunLahir: arrayDaftarPeserta[3],
};
console.log(arrayDaftarPeserta);
console.log();

// SOAL 4
console.log("--- SOAL NOMOR 4 ---");
function buahBuilder(nama, warna, adaBiji, harga) {
    return {
        nama: nama,
        warna: warna,
        adaBijinya: adaBiji,
        harga: harga,
    };
}

var dataBuah = [];
dataBuah.push(buahBuilder("Nanas", "Kuning", false, 9000));
dataBuah.push(buahBuilder("Jeruk", "Oranye", true, 8000));
dataBuah.push(buahBuilder("Semangka", "Hijau & Merah", true, 10000));
dataBuah.push(buahBuilder("Pisang", "Kuning", false, 5000));

console.log(
    dataBuah.filter(function (item) {
        return !item.adaBijinya;
    })
);
console.log();

// SOAL 5
console.log("--- SOAL NOMOR 5 ---");

function tambahDataFilm(nama, durasi, genre, tahun) {
    dataFilm.push({ nama: nama, durasi: durasi, genre: genre, tahun: tahun });
}

var dataFilm = [];

tambahDataFilm("LOTR", "2 jam", "action", "1999");
tambahDataFilm("avenger", "2 jam", "action", "2019");
tambahDataFilm("spiderman", "2 jam", "action", "2004");
tambahDataFilm("juon", "2 jam", "horror", "2004");

console.log(dataFilm);
