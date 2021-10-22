import React from "react";

function Header() {

    const deleteLocalStorage = () => {
        localStorage.clear()
    }

    return (
        <header>
            <h1>Groupomania</h1>
            <a href="/" onClick={deleteLocalStorage}>Se déconnecter</a>
        </header>
    )
}

export default Header;
  