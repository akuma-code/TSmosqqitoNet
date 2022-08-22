/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import NetCard from './Components/Cards/NetCard';
import { BrowserRouter } from 'react-router-dom'
import { Nets } from './Components/pages/Nets';
import { AppRouter } from './Components/AppRouter';
import NavBar from './Components/NavBar';




const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
