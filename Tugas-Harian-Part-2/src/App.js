import "./App.css";

function App() {
    return (
        <div className="form">
            <h1>Form Pembelian Buah</h1>
            <form action="#">
                <p>
                    <label htmlFor="nama-pelanggan">Nama Pelanggan</label>
                    <input id="nama-pelanggan" name="nama" required />
                </p>
                <p>
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
                </p>
                <p>
                    <button>Kirim</button>
                </p>
            </form>
        </div>
    );
}

export default App;
