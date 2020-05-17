
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      errorFlag : false
    };
  }
  decrementCounter=()=>{
    if(this.state.counter>0){
      this.setState({counter : this.state.counter-1})
    }else{
      this.setState({errorFlag:true});
    }

  }
  render() {
    return (
      <main>
      <div data-test="component-app" className="container">
      <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
      {
        this.state.errorFlag && <h2 data-test="error-display" style={{color:"red"}}>You cannot decrement.</h2>
      }
      <button
        data-test="increment-button"
        onClick={() => this.setState({ counter: this.state.counter + 1,errorFlag:false })}
        >
        Increment counter
      </button>&nbsp;
      <button data-test="decrement-counter" onClick={this.decrementCounter}>Decrement Counter</button>
      </div>
      </main>
    );
  }
}
export default App;
