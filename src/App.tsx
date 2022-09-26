/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import NetCard from './Components/Cards/NetCard';
import { BrowserRouter } from 'react-router-dom'
import { Nets } from './Components/pages/Nets';
import { AppRouter } from './Components/AppRouter';
import NavBar from './Components/NavBar';
import { HOSTURL } from './types/IServerData';
import { getURL } from './http/useFetchApi';
import { ContextDataType, ContextWarehouse, IWhContext } from './Context/WhContext';


export const HostContext = React.createContext<any>(null)

const App = (): JSX.Element => {
  const [host, setHost] = useState<HOSTURL | string>(HOSTURL.CKO3)
  const [formdata, setFormdata] = useState<ContextDataType>({} as ContextDataType)
  useEffect(() => {
    const url = getURL() + "/"
    // if (host !== url) setHost(url)
    setHost(url)
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
