import React, { useState } from 'react';

const Todo = () => {
  const [task, setTask] = useState('');
  const [todo, setTodo] = useState([]);
  const [filter, setFilter] = useState('All'); // All, Completed, Active
  const addTodos = () => {
    setTodo([...todo, { text: task, completed: false }]);
    setTask('');
  };

  const removeTodos = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  const markDone = (index) => {
    setTodo(
      todo.map((to, i) => (i === index ? { ...to, completed: true } : to))
    );
  };

  const markNotDone = (index) => {
    setTodo(
      todo.map((to, i) => (i === index ? { ...to, completed: false } : to))
    );
  };

  const filteredTodos = todo.filter((to) => {
    if (filter === 'Active') return !to.completed;
    if (filter === 'Completed') return to.completed;
    return true;
  });

  console.log(todo);
  return (
    <div>
      <div>
        <input
          type="text"
          value={task}
          style={{ marginRight: '20px', height: '30px' }}
          placeholder="Enter a task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="button" onClick={addTodos} disabled={task.trim() === ''}>
          Add
        </button>
      </div>
      <div>
        <h2>Todos</h2>
        {filteredTodos.length === 0 ? (
          <> No todos found.</>
        ) : (
          <div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value={'All'}> All</option>
              <option value={'Completed'}>Completed</option>
              <option value={'Active'}>Active</option>
            </select>
            {filteredTodos.map((tasks, index) => (
              <div
                key={index}
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <h3
                  style={{
                    textDecoration: tasks.completed ? 'line-through' : 'none',
                  }}
                >
                  {tasks.text}
                </h3>
                <button
                  onClick={() => markDone(index)}
                  style={{ backgroundColor: 'white' }}
                >
                  ✅
                </button>
                <button
                  onClick={() => markNotDone(index)}
                  style={{ backgroundColor: 'white' }}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
