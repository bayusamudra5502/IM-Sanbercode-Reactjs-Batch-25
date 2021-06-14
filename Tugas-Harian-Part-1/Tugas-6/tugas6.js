// SOAL 1
console.log("--- NOMOR 1 ---");
const PI = 22 / 7;
const luasLingkaran = (r) => PI * r ** 2;
const kelilingLingkaran = (r) => PI * r * 2;

console.log(luasLingkaran(7));
console.log(kelilingLingkaran(7));
console.log();

// SOAL 2
console.log("--- NOMOR 2 ---");
const introduce = (...identitas) => {
    const [nama, umur, jenisKelamin, job] = identitas;
    const panggilan = jenisKelamin === "Perempuan" ? "Bu" : "Pak";

    return `${panggilan} ${nama} adalah seorang ${job} yang berusia ${umur} tahun`;
};

//kode di bawah ini jangan dirubah atau dihapus
const perkenalan = introduce("John", "30", "Laki-Laki", "penulis");
console.log(perkenalan); // Menampilkan "Pak John adalah seorang penulis yang berusia 30 tahun"

// SOAL 3
console.log();
console.log("--- NOMOR 3 ---");

const newFunction = (firstName, lastName) => {
    return {
        firstName,
        lastName,
        fullName: () => console.log(`${firstName} ${lastName}`),
    };
};

// kode di bawah ini jangan diubah atau dihapus sama sekali
console.log(newFunction("John", "Doe").firstName);
console.log(newFunction("Richard", "Roe").lastName);
newFunction("William", "Imoh").fullName();

console.log();

// SOAL 4
console.log("--- NOMOR 4 ---");
let phone = {
    name: "Galaxy Note 20",
    brand: "Samsung",
    year: 2020,
    colors: ["Mystic Bronze", "Mystic White", "Mystic Black"],
};
// kode diatas ini jangan di rubah atau di hapus sama sekali

const {
    brand: phoneBrand,
    name: phoneName,
    year,
    colors: [colorBronze, , colorBlack],
} = phone;
// kode di bawah ini jangan dirubah atau dihapus
console.log(phoneBrand, phoneName, year, colorBlack, colorBronze);
console.log();

// SOAL 5
console.log("--- NOMOR 5 ---");

let warna = ["biru", "merah", "kuning", "hijau"];

let dataBukuTambahan = {
    penulis: "john doe",
    tahunTerbit: 2020,
};

let buku = {
    nama: "pemograman dasar",
    jumlahHalaman: 172,
    warnaSampul: ["hitam"],
};
// kode diatas ini jangan di rubah atau di hapus sama sekali

buku = {
    ...buku,
    ...dataBukuTambahan,
    warnaSampul: [...buku.warnaSampul, ...warna],
};
console.log(buku);
