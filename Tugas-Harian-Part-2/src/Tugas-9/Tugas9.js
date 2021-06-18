import "./Tugas9.css"

function FormBuah() {
    return (
        <div className="form">
            <h1>Form Pembelian Buah</h1>
            <form action="#">
                <div>
                    <label htmlFor="nama-pelanggan">Nama Pelanggan</label>
                    <input id="nama-pelanggan" name="nama" required />
                </div>
                <div>
                    <label>Daftar Item</label>
                    <div className="daftar-buah">
                        <p className="pilihan-buah">
                            <input
                                type="checkbox"
                                name="buahSemangka"
                                id="semangka"
                                value="true"
                            />
                            <label htmlFor="semangka">Semangka</label>
                        </p>
                        <p className="pilihan-buah">
                            <input
                                type="checkbox"
                                name="buahJeruk"
                                id="jeruk"
                                value="true"
                            />
                            <label htmlFor="jeruk">Jeruk</label>
                        </p>
                        <p className="pilihan-buah">
                            <input
                                type="checkbox"
                                name="buahNanas"
                                id="nanas"
                                value="true"
                            />
                            <label htmlFor="nanas">Nanas</label>
                        </p>
                        <p className="pilihan-buah">
                            <input
                                type="checkbox"
                                name="buahSalak"
                                id="salak"
                                value="true"
                            />
                            <label htmlFor="salak">Salak</label>
                        </p>
                        <p className="pilihan-buah">
                            <input
                                type="checkbox"
                                name="buahAnggur"
                                id="anggur"
                                value="true"
                            />
                            <label htmlFor="anggur">Anggur</label>
                        </p>
                    </div>
                </div>
                <div>
                    <button>Kirim</button>
                </div>
            </form>
        </div>
    );
}

export default FormBuah;
