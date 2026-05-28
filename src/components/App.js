import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditValue(task.text);
  };

  const handleSave = (id) => {
    if (editValue.trim() !== '') {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: editValue } : task
      ));
      setEditId(null);
      setEditValue('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      
      {/* Add Tasks Section */}
      <div className="add_tasks_section" style={{ backgroundColor: '#f0f0f0', padding: '30px', textAlign: 'center', marginBottom: '20px' }}>
        <h3>To Do List</h3>
        
        {/* Changed from <input> to <textarea> to pass the Cypress test */}
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Task..."
          style={{ width: '70%', padding: '10px', marginRight: '10px', height: '30px', verticalAlign: 'middle' }}
        />
        
        <button
          onClick={handleAddTask}
          style={{ padding: '10px 20px', backgroundColor: '#4285f4', color: 'white', border: 'none', cursor: 'pointer', verticalAlign: 'middle' }}
        >
          Add
        </button>
      </div>

      {/* Tasks Section */}
      <div className="tasks_section">
        {tasks.map(task => (
          <div className="task" key={task.id} style={{ display: 'flex', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
            
            {editId === task.id ? (
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{ flexGrow: 1, padding: '8px', marginRight: '10px', height: '30px' }}
              />
            ) : (
              <span style={{ flexGrow: 1, paddingLeft: '5px' }}>{task.text}</span>
            )}

            {editId === task.id ? (
              <button
                className="save"
                onClick={() => handleSave(task.id)}
                style={{ padding: '8px 20px', backgroundColor: '#5cb85c', color: 'white', border: 'none', marginRight: '10px', cursor: 'pointer' }}
              >
                Save
              </button>
            ) : (
              <button
                className="edit"
                onClick={() => handleEdit(task)}
                style={{ padding: '8px 20px', backgroundColor: '#5cb85c', color: 'white', border: 'none', marginRight: '10px', cursor: 'pointer' }}
              >
                Edit
              </button>
            )}

            <button
              className="delete"
              onClick={() => handleDelete(task.id)}
              style={{ padding: '8px 15px', backgroundColor: '#d9534f', color: 'white', border: 'none', cursor: 'pointer' }}
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