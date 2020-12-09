import React from 'react'

import '../App.css'

function Tags(props) {

    //define and id for input
    const id = `input${props.studentId}`

    //call addTag when enter pressed
    const handleInput = (e) => {
        if (e.code === "Enter") {
            props.addTag(props.studentId, e.target.value)
            document.querySelector(`#${id}`).value = ""
        }
    }

    return (
        <div>
            <p>
                {props.tags.map((tag, i) => {
                    return <span className="tags" key={i}>{tag}</span>
                })}
            </p>
            <input type="text" className="addtag" id={id} placeholder="Add a tag" onKeyDown={e => {
                handleInput(e)
            }}></input>
        </div>
    )
}

export default Tags