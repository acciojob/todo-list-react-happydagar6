import React, { useState } from 'react';

const App = () => {
  // State for the list of tasks
  const [tasks, setTasks] = useState([]);
  
  // State for the main input field (adding tasks)
  const [inputValue, setInputValue] = useState('');
  
  // State to track which task is currently being edited
  const [editId, setEditId] = useState(null);
  
  // State to track the updated text while editing
  const [editValue, setEditValue] = useState('');

  // Function to add a new task
  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
      };
      setTasks([...tasks, newTask]);
      setInputValue(''); // Clear the input after adding
    }
  };

  // Function to delete a task
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Function to initiate the edit mode for a task
  const handleEdit = (task) => {
    setEditId(task.id);
    setEditValue(task.text);
  };

  // Function to save the edited task
  const handleSave = (id) => {
    if (editValue.trim() !== '') {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: editValue } : task
      ));
      setEditId(null); // Exit edit mode
      setEditValue('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      
      {/* ADD TASKS SECTION */}
      <div 
        className="add_tasks_section" 
        style={{ backgroundColor: '#f0f0f0', padding: '30px', textAlign: 'center', marginBottom: '20px', borderRadius: '5px' }}
      >
        <h3 style={{ marginTop: '0' }}>To Do List</h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task..."
          style={{ width: '70%', padding: '10px', marginRight: '10px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleAddTask}
          style={{ padding: '10px 20px', backgroundColor: '#4285f4', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}
        >
          Add
        </button>
      </div>

      {/* TASKS SECTION */}
      <div className="tasks_section">
        {tasks.map(task => (
          <div 
            className="task" 
            key={task.id} 
            style={{ display: 'flex', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}
          >
            
            {/* Conditional Rendering: Input field (if editing) OR Text span (if not editing) */}
            {editId === task.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{ flexGrow: 1, padding: '8px', marginRight: '10px' }}
              />
            ) : (
              <span style={{ flexGrow: 1, paddingLeft: '5px' }}>{task.text}</span>
            )}

            {/* Conditional Rendering: Save button (if editing) OR Edit button (if not editing) */}
            {editId === task.id ? (
              <button
                className="save"
                onClick={() => handleSave(task.id)}
                style={{ padding: '8px 20px', backgroundColor: '#5cb85c', color: 'white', border: 'none', marginRight: '10px', cursor: 'pointer', borderRadius: '3px' }}
              >
                Save
              </button>
            ) : (
              <button
                className="edit"
                onClick={() => handleEdit(task)}
                style={{ padding: '8px 20px', backgroundColor: '#5cb85c', color: 'white', border: 'none', marginRight: '10px', cursor: 'pointer', borderRadius: '3px' }}
              >
                Edit
              </button>
            )}

            {/* Delete button is always present */}
            <button
              className="delete"
              onClick={() => handleDelete(task.id)}
              style={{ padding: '8px 15px', backgroundColor: '#d9534f', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}
            >
              Delete
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default App;