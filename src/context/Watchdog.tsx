import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DebugContext } from "./Debug";
import { useRouter } from "next/router";

interface WatchProviderProps {
  children?: ReactNode;
}

export interface WatchContextType {}

export const WatchContext = createContext({} as WatchContextType);

export function WatchProvider({ children }: WatchProviderProps) {
  const [str, setStr] = useState("");
  const { debugging, setDebugging } = useContext(DebugContext);
  const { push } = useRouter();

  function handler() {
    switch (str) {
      case "debugon":
        setStr("");
        setDebugging(true);
        break;

      case "debugoff":
        setStr("");
        setDebugging(false);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (key == "Escape") {
        setStr("");
      } else {
        setStr((prevState) => `${prevState}${key.toLocaleLowerCase()}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    handler();
  }, [str]);

  return <WatchContext.Provider value={{}}>{children}</WatchContext.Provider>;
}
