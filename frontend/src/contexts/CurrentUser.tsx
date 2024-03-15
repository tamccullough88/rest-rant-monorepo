import React, { createContext, useState, useEffect } from "react";

interface contextType {
    currentUser: string
}

export const CurrentUser: any = createContext<string | contextType>(null!)

function CurrentUserProvider({ children }: any) {

    const [currentUser, setCurrentUser]: any = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            let response: any = await fetch('http://localhost:5000/authentication/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            let user: any = await response.json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])

    const wdw: any = window

    let setsUser: any = wdw.setCurrentUser = setCurrentUser
    return (
        <CurrentUser.Provider value={{ currentUser, setsUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider
