import React from "react";
import "./JamMundur.css";

const INIT_TIMER_COUNT = 100;

class JamMundur extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jam: new Date(),
            counter: INIT_TIMER_COUNT
        }
    }

    render() {
        return this.state.counter > 0 && (
            <div className="jam-mundur">
                <p>
                    Sekarang jam - {this.state.jam.toLocaleTimeString()}
                </p>
                <p>
                    hitung Mundur: {this.state.counter}
                </p>
            </div>
        );
    }

    componentDidMount(){
        this.tick = setInterval(() => {
            this.setState({
                jam: new Date(),
                counter: this.state.counter - 1
            });
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.tick)
    }
}

export default JamMundur;