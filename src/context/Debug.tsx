import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

interface DebugProviderProps{
    children?: ReactNode
}

export interface DebugContextType {
    debugging: boolean;
  setDebugging: Dispatch<SetStateAction<boolean>>;
}

export const DebugContext = createContext({} as DebugContextType);

export function DebugProvider({children}: DebugProviderProps){
    const [str, setStr] = useState('')
    const [debugging, setDebugging] = useState(false)

  return (
    <DebugContext.Provider
      value={{
        debugging,
        setDebugging
      }}
    >
        {children}
    </DebugContext.Provider>
  );
};