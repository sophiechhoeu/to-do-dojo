import React, { Component } from 'react';

let currentId = 6;

const newId = () => {
  currentId += 1
  return currentId
}

class App extends Component {
  state = {
    filter: 'all',
    newTodo: '',
    items: [
      { id: 1, completed: true, text: 'Do stuff'},
      { id: 2, completed: true, text: 'Do stuff'},
      { id: 3, completed: true, text: 'Do stuff'},
      { id: 4, completed: true, text: 'Do stuff'},
      { id: 5, completed: true, text: 'Do stuff'},
      { id: 6, completed: true, text: 'Do stuff'}
    ]
  }

  addNewTodo = (event) => {
    event.preventDefault();
    const { items, newTodo } = this.state;
    const newItems = [
      ...items,
      { id: newId(), completed: false, text: newTodo }
    ]
    this.setState({ items: newItems })
  }

  onChange = (event) => {
    const { items, newTodo } = this.state;
    // console.log(id)
    // const item = this.state.items.find(item => item.id === id)
    // const newItems = {...items, completed: !item.completed };
    //if you don't know the name of the value [event.target.name ]
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.setState({ [event.target.name] : value })
  };

//filter includes the element if true, removes if false

deleteToDo = (id) => {
  const { items} = this.state;
  const newItems = items.filter(item => item.id !== id)
  this.setState({ items: newItems })
}

onItemChange = (id, event) => {
  const { items } = this.state;
  // console.log(id)
  // const item = this.state.items.find(item => item.id === id)
  // const newItems = {...items, completed: !item.completed };
  //if you don't know the name of the value [event.target.name ]
  const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

  const newItems = items.map((item) => {
     if (item.id === id) {
       return {
         ...item,
         [event.target.name]: value
        };
     }
    return item;
  })
  this.setState({ items: newItems})
};

  render() {
    const { items, newTodo, filter } = this.state;
    const filteredItems = items.filter(item => {
       switch (filter) {
         case 'active':
          return !item.completed
         break;
         case 'completed':
          return item.completed
         break;
         default:
          return true
       }
      })

    return (
      <div className="App">
      <form onSubmit={this.addNewTodo}>
      <input value={newTodo} onChange={this.onChange} name="newTodo"/><button>Submit</button>
      <label>All</label><input onChange={this.onChange} type="radio" name="filter" value="all" checked={filter === 'all'}/>
      <label>Active</label><input onChange={this.onChange} type="radio" name="filter" value="active" checked={filter === 'active'} />
      <label>Completed</label><input onChange={this.onChange} type="radio" name="filter" value="completed" checked={filter === 'completed'}/>
      <br />
        <ul>
          {
            filteredItems.map(item => (
            <li>
            <input name="completed" type="checkbox" onChange={(event) => this.onItemChange(item.id, event)} checked={item.completed} />
            <input name="text" onChange={(event) => this.onItemChange(item.id, event)} value={item.text}/>
            <button onClick={() => this.deleteToDo(item.id)}>x</button>
            </li>
          ))}
        </ul>
        </form>
      </div>
    );
  }
}

export default App;
