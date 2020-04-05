import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      searchfield: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        console.log(users);
        this.setState({
          monsters: users,
        });
      });
  }

  manageChange = (e) => {
    this.setState(
      {
        searchfield: e.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    //destructuring: pulling state value off the state object and setting them equal to variables called monsters and serchfield
    const { monsters, searchfield } = this.state;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchfield.toLowerCase())
    );
    return (
      <div className='App'>
        <h1>Rolodex</h1>
        <SearchBox
          placeholder='Enter a monster'
          handleChange={this.manageChange}
        />
        {/* <input
          type='search'
          placeholder='Enter a monster'
          onChange={this.handleChange}
        /> */}
        {/*instead of passing in this.state.monsters, we pass in the list of monsters thats being filtered by the input search */}
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
