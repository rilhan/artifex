import { createContext, useState, useEffect } from "react";
import { isMobile } from 'react-device-detect';
import { auth } from '@/components/firebase-config';
import { onAuthStateChanged } from "firebase/auth";

const AppContext = createContext();

export function AppProvider({ children }) {

  const [user, setUser] = useState(null)
  const [devicePhone, setDevicePhone] = useState(true)
  const [slider, setSlider] = useState([])
  const [authWindow, setAuthWindow] = useState(false)

  useEffect(() => {
    setDevicePhone(isMobile)
    setSlider(isMobile ? [2, 1, 5] : [5, 3, 10])

    // listen for auth
    onAuthStateChanged(auth, (user) => { if (user) { setUser(auth.currentUser) } })
  }, [])

  useEffect(() => {
    authWindow ? document.body.style.setProperty('overflow-y', 'hidden', 'important') : document.body.style.setProperty('overflow-y', null)
  }, [authWindow])

  return (
    <AppContext.Provider value={{ user, setUser, devicePhone, slider, setSlider, authWindow, setAuthWindow }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext;