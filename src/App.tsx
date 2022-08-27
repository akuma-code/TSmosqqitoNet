/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import NetCard from './Components/Cards/NetCard';
import { BrowserRouter } from 'react-router-dom'
import { Nets } from './Components/pages/Nets';
import { AppRouter } from './Components/AppRouter';
import NavBar from './Components/NavBar';
import { HOSTURL } from './types/DataTypes';


const HostContext = React.createContext(null)

const App = (): JSX.Element => {
  const [host, setHost] = useState(HOSTURL.LOCALHOST)
  return (


    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
