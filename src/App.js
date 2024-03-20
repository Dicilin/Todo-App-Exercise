import React, { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash, faCheck, faUndo} from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import './App.css';
import imageSrc from './main-white.png';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [value, setValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

 const handleInputChange = (e) => {
  setValue(e.target.value);
};
  const AddTodo = () => {
    if (value.trim() !== '') {
      setTodos([...todos, { text: value, completed: false }]);
      setValue('');
    }
  };
  
  const handleDeleteTodo = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
   if (confirmDelete){ const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    if (editIndex === index) setEditIndex(-1);
   }
  };

  const handleEditTodo = (index, newValue) => {
    const newTodos = [...todos];
    newTodos[index].text = newValue;
    setTodos(newTodos);
  };

  const handleToggleEdit = (index) => {
    setEditIndex(index === editIndex ? -1 : index);
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleClearTodos = () => {
    const confirmClear = window.confirm('Are you sure you want to delete all tasks?');
    if (confirmClear) {
      setTodos([]);
      setEditIndex(-1);
    }
  };
  const handleCheckAll = () => {
    const updatedTodos = todos.map(todo => {
      return { ...todo, completed: true };
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    // Save todos to localStorage whenever todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const gradientStyle = {
    background: 'linear-gradient(to bottom right, #F4512C, #5E1B89)', // Define your gradient colors here
    color: 'white', // Set the text color to contrast with the gradient background
    padding: '20px', // Add padding for content inside the column
    height: '740px'
  
  };

  return (
    <div className='Container'>
      <Row>
      <div className = "col-md-5 d-flex flex-column justify-content-center align-items-center" style={gradientStyle}> 
      <div className='image-container'>
      <img src = {imageSrc} alt="" className='imagesrc'/>
      </div>
      <h1>Todo App</h1>
      <p>Boost your productivity by organizing your daily tasks</p>
      </div>

      <div className=" contask col-md-7 d-flex flex-column justify-content-center align-items-center">
        <h2>Create Task</h2>
        <div className='d-flex'>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="What is your task today?"
        
      />
      <Button variant='success' style={{ backgroundColor: '#800080', marginLeft:3}} onClick={AddTodo}>Add Todo</Button>
      </div>
      <ul style={{ listStyleType: 'none' }}>
      <div className='mb-3'>
      </div>
     
        {todos.map((todo, index) =>(
          <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => handleEditTodo(index, e.target.value)}
                />
                
                <button style={{backgroundColor:'#F8FFFE', color: '#F4512C', marginRight: 80, marginBottom: 5}}onClick={() => handleToggleEdit(index)}>Save</button>
                
              </>
             
            ) : (
              <>
                  <div className='task'>
                    <div className='todo'> 
               {todo.text} 
               </div>
               <div className='icon'>
                <FontAwesomeIcon className='edit'icon={faPenSquare} onClick={() => handleToggleEdit(index)}/>
                <FontAwesomeIcon className='delete'icon={faTrash} onClick={() => handleDeleteTodo(index)}/>
                <FontAwesomeIcon className='check'icon={todo.completed ? faUndo : faCheck} onClick={() => handleToggleComplete(index)}/>
               </div> </div> <div className='mb-3'>
      </div>
      
      </> 
            )}
           
           
          </li>
          
        ))}
         <Button className='deleteall' onClick={handleClearTodos}>Delete All</Button>
         <Button className='checkall' onClick={handleCheckAll}>Check All</Button>
      </ul>
      </div>
      
      </Row>
    </div>
  );
}

export default App;
