import React from 'react'

import '../App.css'

function NameSearch(props) {
    return (
        <input type="text" id="name" className="search-bar" placeholder="Search by name" value={props.nameField} onChange={e => {
            props.getName(e.target.value)
        }}></input>
    )
}

export default NameSearch