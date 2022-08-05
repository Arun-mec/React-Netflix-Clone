import React,{createContext, useState} from 'react';

export const ViewpostContext = createContext(null)

export const ViewPost =({children})=>{
    const [viewMovie,setviewMovie] = useState('');

    return(
        <ViewpostContext.Provider value={{viewMovie,setviewMovie}}>
            {children}
        </ViewpostContext.Provider>
    )
}