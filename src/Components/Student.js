import React from 'react'
import Tags from './Tags'
import '../App.css'

function Student(props) {

    //function to determine average of grades
    const getAverage = (nums) => {
        const total = nums.reduce((tot, num) => {
            return parseInt(tot) + parseInt(num)
        })
        return total / nums.length
    }

    //start as plus icon, value is passed to unhide to toggle minus/plus when clicked
    let plus = true
    const toggle = () => {
        plus = !plus
    }

    //define ids for the plus/minus sign and the grades div, to be used to show/hide
    const lineId = `line${props.divid}`
    const divId = `student${props.divid}`

    return (
        <div className="student">
            <div className="student-pic"><img src={props.student.pic} className="student-img" alt="student pic" /></div>
            <div className="info">
                <h1><b>{props.student.firstName} {props.student.lastName}</b>
                    <span className="button" alt="button" onClick={e => {
                        props.unhide(divId, lineId, plus)
                        toggle()
                    }}>
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <line x1="10" x2="10" y1="0" y2="20" strokeWidth="3.5" id={lineId} />
                            <line x1="0" x2="20" y1="10" y2="10" strokeWidth="3.5" />
                        </svg>
                    </span>
                </h1><br></br>

                <div className="detail" >
                    <span>Email: {props.student.email}</span><br></br>
                    <span>Company: {props.student.company}</span><br></br>
                    <span>Skill: {props.student.skill}</span><br></br>
                    <span>Average: {getAverage(props.student.grades)}%</span><br></br>
                    <div id={divId} className="grades">
                        <table>
                            <tbody>
                                {props.student.grades.map((score, i) => {
                                    return <tr key={i}>
                                        <td >Test {i + 1}</td>
                                        <td >{score}%</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Tags addTag={props.addTag} tags={props.student.tags} studentId={props.studentId}></Tags>
                </div>
            </div>
            <div className="divider"></div>
        </div>
    )
}

export default Student