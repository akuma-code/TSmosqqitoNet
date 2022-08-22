import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodoStore } from './Components/Stores/TodoStore';

const AppCTX = React.createContext<TodoStore | null>(null)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const TODOS = new TodoStore()

root.render(

  <AppCTX.Provider value={TODOS}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppCTX.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
