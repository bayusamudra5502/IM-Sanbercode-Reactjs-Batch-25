import React from "react";
import FormBuah from "./Tugas-9/Tugas9";
import TabelBuahTerisi from "./Tugas-10/Tugas10";
import "./App.css";


export default class App extends React.Component{
    render(){
        return (
            <main>
                <FormBuah/>
                <TabelBuahTerisi />
            </main>
        )
    }
}