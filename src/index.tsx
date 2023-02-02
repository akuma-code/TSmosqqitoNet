import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'dayjs/locale/ru'
import dayjs from 'dayjs'
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { themeCBX } from './Components/OfferNotes/ThemedCheckBox';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

dayjs.locale('ru')


root.render(
  <ChakraProvider theme={themeCBX}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


//TODO: настроить аутентификацию
//TODO: добавить поля для сортировки склада
//TODO: сделать визуальные различия карточек, в зависимости от профиля-количества и т.п.
//TODO: в редакторе сделать активным клик по полю превьюшки
//TODO: поправить цветовую гамму с вырвиглазной на нормальную