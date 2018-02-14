import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Simple Country Application", 
      countries: []
    }
  }
  componentDidMount(){
    console.log('Component has mounted');
  }
  render() {
    var title = this.state.title;
    return (
      <div className="App">
      <h1>{title}</h1>
      <form ref="countryForm">
      <input type="text" ref="country_name" placeholder="country name"/>
       <input type="text" ref="continent_name" placeholder="continent name"/>
       <button onClick={this.addCountry.bind(this)}>Add Country</button>
      </form>
      </div>
      );
  }
  addCountry(event) {
    event.preventDefault();
    console.log('in method');
    var data = {
      country_name:this.refs.country_name.value, 
      continent_name:this.refs.continent_name.value,
    };
    var request = new Request ('http://localhost:3000/api/new-country', {
      method: 'POST', 
      headers: new Headers({'Content-Type': 'application/json'}), 
      body: JSON.stringify(data)
    });
    //xmlhttprequest()

    fetch(request) 
      .then(function(response) {
        response.json()
          .then(function(data) {
            console.log(data)
          })
      })
  }
}

export default App;
