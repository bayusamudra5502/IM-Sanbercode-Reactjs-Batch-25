import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BarisBuah extends Component {
  constructor(props){
    super(props);

    this.__editClickHandler = this.__editClickHandler.bind(this);
    this.__deleteClickHandler = this.__deleteClickHandler.bind(this);
  }

  __editClickHandler(){
    this.props.onEdit(this.props.data.currentIndex)
  }

  __deleteClickHandler(){
    this.props.onDelete(this.props.data.currentIndex)
  }

  render(){
    const hargaPerKilo = this.props.data.hargaTotal / this.props.data.beratTotal * 1000
    return (
      <tr>
        <td>
          {this.props.data.currentIndex + 1}
        </td>
        <td>{this.props.data.nama}</td>
        <td>Rp{this.props.data.hargaTotal.toLocaleString("id", {maximumFractionDigits: 2})}</td>
        <td>{this.props.data.beratTotal / 1000} kg</td>
        <td>Rp{hargaPerKilo.toLocaleString("id", {maximumFractionDigits: 2})}</td>
        <td>
          <button onClick={this.__editClickHandler}>Edit</button>
          <button onClick={this.__deleteClickHandler}>Delete</button>
        </td>
      </tr>
    )
  }
}

BarisBuah.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  data: PropTypes.exact({
    currentIndex: PropTypes.number,
    nama: PropTypes.string,
    hargaTotal: PropTypes.number,
    beratTotal: PropTypes.number
  })
}

export default BarisBuah;