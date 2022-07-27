import { createContext,useState,useContext } from "react";

const AppContext = createContext()

const AppProvider = ({children})=>{
   const [credentials,setCredentials] = useState(null)
   const [activeId,setActiveId]  =useState(null)


    return (
        <AppContext.Provider value={{credentials,setCredentials,setActiveId,activeId}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = ()=> {
    return useContext(AppContext)
}

export {AppProvider,AppContext}