import React from 'react';

import logo from 'src/logo.svg';
import { useMe } from 'src/hooks/users';

export const FrontPage = (): JSX.Element => {
    const [me] = useMe();
    console.log(me)

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <a href="/login">Login with Google</a>
            </header>
        </div>
    )
}
