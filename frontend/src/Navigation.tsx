import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router";

import { CurrentUser } from './contexts/CurrentUser';
import React from 'react';



function Navigation() {

    const history: any = useHistory()

    const { currentUser }: any = useContext(CurrentUser)






    let loginActions: any = (
        <>
            <li style={{ float: 'right' }}>
                <a href="" onClick={() => history.push("/sign-up")}>
                    Sign Up
                </a>
            </li>
            <li style={{ float: 'right' }}>
                <a href="" onClick={() => history.push("/login")}>
                    Login
                </a>
            </li>
        </>
    )

    const handleLogout: any = async () => {
        await localStorage.clear();
        window.location.reload()
            ;
    }

    if (currentUser) {
        loginActions = (
            <div style={{ float: 'right' }}>
                <li>
                    {currentUser.firstName}
                </li>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>

        )
    }

    let addPlaceButton: any = null

    if (currentUser?.role === 'admin') {
        addPlaceButton = (
            <li>
                <a href="" onClick={() => history.push("/places/new")}>
                    Add Place
                </a>
            </li>
        )
    }

    return (
        <nav>
            <ul>
                <li>
                    <a href="" onClick={() => history.push("/")}>
                        Home
                    </a>
                </li>
                <li>
                    <a href="" onClick={() => history.push("/places")}>
                        Places
                    </a>
                </li>
                {addPlaceButton}
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;