import React from 'react';
import Counter from './components/counter/Counter';
import './App.css';
import TodoApp from './components/todo/TodoApp';

function App() {
    return (
        <div className="App">
            {/* <Counter/> */}
            <TodoApp/>
        </div>
    );
}

export default App;
