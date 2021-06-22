import React, { Component } from "react";
import FormBuah from "./FormBuah";
import TabelBuah from "./TableBuah";
import "./Buah.css"

const INIT_DATA = [
  { nama: "Nanas", hargaTotal: 100000, beratTotal: 4000 },
  { nama: "Manggis", hargaTotal: 350000, beratTotal: 10000 },
  { nama: "Nangka", hargaTotal: 90000, beratTotal: 2000 },
  { nama: "Durian", hargaTotal: 400000, beratTotal: 5000 },
  { nama: "Strawberry", hargaTotal: 120000, beratTotal: 6000 },
];

class Buah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: INIT_DATA,
      isEditMode: false,
      editIndex: -1,
      editData: {
        nama: "",
        hargaTotal: 0,
        beratTotal: 1,
      },
    };

    this.__editHandler = this.__editHandler.bind(this);
    this.__addHandler = this.__addHandler.bind(this);
    this.__editSubmitHandler = this.__editSubmitHandler.bind(this);
    this.__deleteHandler = this.__deleteHandler.bind(this);
  }

  __editHandler(index) {
    this.setState({
      editIndex: index,
      editData: this.state.data[index],
      isEditMode: true,
    });
  }
  __addHandler(newData) {
    this.setState({
      data: [...this.state.data, newData],
    });
  }

  __editSubmitHandler(index, newData) {
    const dataSet = this.state.data;
    dataSet[index] = newData;

    this.setState({ data: dataSet, isEditMode: false });
  }

  __deleteHandler(index) {
    const newDataSet = this.state.data;
    newDataSet.splice(index, 1);
    this.setState({ data: newDataSet });
  }

  render() {
    return (
      <div className="container">
        <TabelBuah
          data={this.state.data}
          onEdit={this.__editHandler}
          onDelete={this.__deleteHandler}
        />
        <FormBuah
          isEditMode={this.state.isEditMode}
          editIndex={this.state.editIndex}
          editData={this.state.editData}
          onAddData={this.__addHandler}
          onEditData={this.__editSubmitHandler}
        />
      </div>
    );
  }
}

export default Buah;
