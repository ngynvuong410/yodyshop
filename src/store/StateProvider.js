import React, { useReducer ,useContext} from 'react'
const MyContext = React.createContext()
export const StateProvider = ({reducer,initialstate,children})=>{
   return <MyContext.Provider  value = {useReducer(reducer,initialstate)}>
           {children}
   </MyContext.Provider>

}
export const useStateValue =  ()=>useContext(MyContext)