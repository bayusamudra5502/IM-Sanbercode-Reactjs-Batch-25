import React from "react";
import "./Tugas10.css";
import PropTypes from "prop-types";

class TabelBuah extends React.Component {
    render() {
        const barisData = this.props.dataBuah.map((buah) => (
            <TabelBuahRow
                key={buah.nama}
                nama={buah.nama}
                harga={buah.harga}
                berat={buah.berat} />
        ));

        return (
            <>
                <h2>Tabel Harga Buah</h2>
                <table>
                    <colgroup>
                        <col className="kolom-nama" />
                        <col className="kolom-harga" />
                        <col className="kolom-berat" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Berat</th>
                        </tr>
                    </thead>
                    <tbody>
                        { barisData }
                    </tbody>
                </table>
            </>
        );
    }
}

class TabelBuahTerisi extends React.Component {
    render() {
        const dataHargaBuah = [
            { nama: "Semangka", harga: 10000, berat: 1000 },
            { nama: "Anggur", harga: 40000, berat: 500 },
            { nama: "Strawberry", harga: 30000, berat: 400 },
            { nama: "Jeruk", harga: 30000, berat: 1000 },
            { nama: "Mangga", harga: 30000, berat: 500 }
        ];

        return (<TabelBuah dataBuah={dataHargaBuah} />)
    }
}

class TabelBuahRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.nama}</td>
                <td>{this.props.harga}</td>
                <td>{this.props.berat / 1000} kg</td>
            </tr>
        );
    }
}

TabelBuahRow.propTypes = {
    nama: PropTypes.string,
    harga: PropTypes.number,
    berat: PropTypes.number
};

TabelBuah.propTypes = {
    dataBuah: PropTypes.arrayOf(PropTypes.exact(TabelBuahRow.propTypes))
};

export {
    TabelBuahTerisi as default,
    TabelBuah
}