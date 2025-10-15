import { initialState, reducerApp } from "./ReducerWorkout";
import { createContext, useReducer } from "react";

export const ContextWorkout = createContext();

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducerApp, initialState);

    return (
        <ContextWorkout.Provider value={{ state, dispatch }}>
            {children}
        </ContextWorkout.Provider>
    )
}
