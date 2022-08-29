/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import NetCard from './Components/Cards/NetCard';
import { BrowserRouter } from 'react-router-dom'
import { Nets } from './Components/pages/Nets';
import { AppRouter } from './Components/AppRouter';
import NavBar from './Components/NavBar';
import { HOSTURL } from './types/DataTypes';
import { getURL } from './http/ClientSkladApi';


export const HostContext = React.createContext<any>(null)

const App = (): JSX.Element => {
  const [host, setHost] = useState<HOSTURL | string>(HOSTURL.LOCALHOST)
  useEffect(() => {
    const url = getURL()
    if (host !== url) setHost(url)

    // localStorage.setItem("server_url", HOSTURL.WORK)
    // localStorage.setItem("server_url", HOSTURL.HOME)

  }, [])

  return (

    <HostContext.Provider
      value={{ host, setHost }}
    >

      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </HostContext.Provider>
  )
}

export default App;
