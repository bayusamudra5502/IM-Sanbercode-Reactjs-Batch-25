import React, { Component } from "react";
import PropTypes from "prop-types";
import BarisBuah from "./BarisBuah";

class TabelBuah extends Component {
  constructor(props) {
    super(props);
    this.__onEditHandler = this.__onEditHandler.bind(this);
    this.__onDeleteHandler = this.__onDeleteHandler.bind(this);
  }

  __onEditHandler(index) {
    this.props.onEdit(index);
  }

  __onDeleteHandler(index) {
    this.props.onDelete(index);
  }

  render() {
    const data = this.props.data;
    return (
      <div className="tabel-buah">
        <h2>Daftar Harga Buah</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Harga Total</th>
              <th>Berat Total</th>
              <th>Harga per Kg</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            { data.map((datum, index) => (
              <BarisBuah
                key={index}
                onDelete={this.__onDeleteHandler}
                onEdit={this.__onEditHandler}
                data={{currentIndex:index,...datum}}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

TabelBuah.propTypes = {
  data: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default TabelBuah;
