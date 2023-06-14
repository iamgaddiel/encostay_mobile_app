import React, { createContext, useState } from 'react'
import PocketBase from 'pocketbase'
import { Storage } from '@ionic/storage';
import Settings from '../helpers/settings'






// const { pb, storage, DEBUG } = Settings() // uncomment to use settings file
// This context is used for project based settings 
// such as showing tabs, prefered user theme...
// 

export const SettingsContext = createContext<SettingsContextType | null>(null)


function SettingsProvider({ children }: { children: any }) {

  // states
  const [showTabs, setshowTabs] = useState(false)


  return (
    <SettingsContext.Provider value={{
      showTabs,
      setshowTabs,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export interface SettingsContextType {
  showTabs: boolean
  setshowTabs: React.Dispatch<React.SetStateAction<boolean>>
}

export default SettingsProvider
