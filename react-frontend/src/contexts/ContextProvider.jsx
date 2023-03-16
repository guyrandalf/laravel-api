import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    setMessage: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [message, _setMessage] = useState('')
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const setMessage = (message) => {
        _setMessage(message)
        setTimeout(() => {
            _setMessage('')
        }, 3000)
    }

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            message,
            setMessage,
        }}>
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)