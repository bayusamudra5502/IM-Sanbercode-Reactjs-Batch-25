import React, { Component } from "react";
import PropTypes from "prop-types";

class FormBuah extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        nama: "",
        hargaTotal: "",
        beratTotal: 0,
      },
      isNotDisplayed: true,
    };

    this.__submitHandler = this.__submitHandler.bind(this);
    this.__changeHandler = this.__changeHandler.bind(this);
  }

  __onAddData(sendData) {
    this.props.onAddData(sendData);
  }

  __onEditData(sendData) {
    this.props.onEditData(this.props.editIndex, sendData);
  }

  __submitHandler(e) {
    e.preventDefault();

    const sendData = {
      nama: this.state.data.nama,
      hargaTotal: parseInt(
        this.__removeThousandDel(this.state.data.hargaTotal)
      ),
      beratTotal: parseInt(this.state.data.beratTotal),
    };

    if (this.props.isEditMode) {
      this.__onEditData(sendData);
    } else {
      this.__onAddData(sendData);
    }

    this.setState({
      data: {
        nama: "",
        hargaTotal: "",
        beratTotal: 0,
      },
      isNotDisplayed: true,
    });
  }

  __removeThousandDel(text) {
    return text.replaceAll(".", "");
  }

  __changeHandler(e) {
    const name = e.target.name;
    let value = e.target.value;

    if (e.target.id === "harga-total") {
      value = this.__removeThousandDel(value);
      value = (parseInt(value) || 0).toLocaleString("id");
    }

    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }

  componentDidUpdate() {
    if (this.state.isNotDisplayed && this.props.isEditMode) {
      let price = (
        parseInt(this.props.editData.hargaTotal) || 0
      ).toLocaleString("id");

      this.setState({
        data: { ...this.props.editData, hargaTotal: price },
        isNotDisplayed: false,
      });
    }
  }

  render() {
    return (
      <div className="form-buah">
        <h2>Form Daftar Harga Buah</h2>
        <form action="#" method="GET" onSubmit={this.__submitHandler}>
          <div className="form-component">
            <label htmlFor="nama">Nama Buah</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={this.state.data.nama}
              placeholder="Masukkan Nama Buah"
              onChange={this.__changeHandler}
              required
            />
          </div>
          <div className="form-component">
            <label htmlFor="harga-total">Harga Total</label>
            <input
              type="text"
              name="hargaTotal"
              id="harga-total"
              placeholder="Masukkan Harga Buah Total"
              value={this.state.data.hargaTotal}
              onChange={this.__changeHandler}
              required
            />
          </div>
          <div className="form-component">
            <label htmlFor="berat-total">Berat Total (dalam Gram)</label>
            <input
              type="number"
              name="beratTotal"
              id="berat-total"
              value={this.state.data.beratTotal}
              onChange={this.__changeHandler}
              min="2000"
              required
            />
          </div>
          <div className="form-control">
            <button type="submit">
              {this.props.isEditMode ? "Edit Data" : "Tambah Data"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

FormBuah.propTypes = {
  isEditMode: PropTypes.bool,
  editIndex: PropTypes.number,
  editData: PropTypes.exact({
    nama: PropTypes.string,
    hargaTotal: PropTypes.number,
    beratTotal: PropTypes.number,
  }),

  onAddData: PropTypes.func,
  onEditData: PropTypes.func,
};

export default FormBuah;
