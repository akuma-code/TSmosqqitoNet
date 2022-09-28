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

type HostContextType = {
  host: string,
  setHost: (host: string) => void,
  isAuth: boolean,
  setAuth: (auth: boolean) => void
}

export const HostContext = React.createContext<any>(null)

const App = (): JSX.Element => {
  const [host, setHost] = useState(HOSTURL.CKO3 as any)
  const [isAuth, setAuth] = useState(true)
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
      value={{ host, setHost, isAuth, setAuth }}
    >

      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </HostContext.Provider>
  )
}

export default App;
