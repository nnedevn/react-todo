import React, { Component } from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: '',
      toDos: ['Get stuff', 'Clean house', 'Homework'],
      newItem: ''
    }
  }

  //Clear function // the =>fx is binding this. if declared otherwise a .bind will be necessary
  clear = () => {
  this.setState({toDos: [] });
  }
  //Add function
  add = (e) => {
    e.preventDefault();
    if(this.state.newItem){
      //newItem is a non-empty str. 
      let toDosLocal = this.state.toDos;
      toDosLocal.push(this.state.newItem);
      this.setState({error:'', newItem:'', toDos: toDosLocal})
    } else {
      //newItem is empty, do not add
      this.setState({error:'Please enter a ToDo.'});
    }
    console.log(this.state.newItem);
  }

  deleteItem = (item) => {
    let toDosLocal = this.state.toDos;
    let itemIndex = toDosLocal.indexOf(item);
    if (itemIndex >= 0 ){
      //found a valid item
      toDosLocal.splice(itemIndex, 1);
      this.setState({toDos: toDosLocal});
    }
  }
// Read and store the current value on the input field onChange
  newItemChange = (e) =>{
    this.setState({newItem: e.target.value, error: ''});
  }

  
  render() {
   const tooltip = (
     <Tooltip id="tooltip"> <strong> Wow!</strong> Do you really want to delete everything? </Tooltip>
    );
    
    return (
      <div className="container">
        <header className="header-background">
          <h1 className="header-title">To-Do List</h1>
        </header>
       {/* To-do list goes here */}
       <ToDoList items={this.state.toDos} onDelete={this.deleteItem}/>
       {/* Error handling/error message */}
       <p className="text-danger">{this.state.error}</p>

       {/* Form to add  new item */}
       <form onSubmit={this.add}>
        <input value={this.state.newItem} onChange={this.newItemChange} type="text" className="form-control" placeholder="What do you need to get done." />
       </form>
      
       {/* Button to clear the list */}
       <div className="text-left">
        <button className="btn btn-primary" onClick={this.add} >Add</button>
       
        <OverlayTrigger overlay={tooltip} placement="top">
         <button className="btn btn-warning" onClick={this.clear}>Clear</button>
        </OverlayTrigger>
       </div>
       
      </div>
    );
  }
}

class ToDoList extends Component{

  render(){
    const toDoItems = this.props.items.map(thing => {
      return <ListItem key={Math.random()} item={thing} onDelete={this.props.onDelete}/>
    });
  
    return(
      //it breaks without the ul
      <ul className="list-group">{toDoItems}</ul>
    );
  }
}

class ListItem extends Component{

deleteHandler = () => {
  //pass the item prop
  console.log('delete handler', this.props.item); 
  this.props.onDelete(this.props.item)
}
  render(){
    return(
      <li className="list-group-item" >{this.props.item}
        <button className="btn-xs btn-danger pull-right" onClick={this.deleteHandler} >X</button>
      </li>
      
    )
  }
}


export default App;
