import React from 'react'

import '../App.css'

function TagSearch(props) {
    return (
        <input type="text" id="tag-search" className="search-bar" placeholder="Search by tag" value={props.tagField} onChange={e => {
            props.getTag(e.target.value)
        }}></input>
    )
}

export default TagSearch