import React, { Component } from 'react'
import Student from './Components/Student'
import NameSearch from './Components/NameSearch'
import TagSearch from './Components/TagSearch'

import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: false,
      unfiltered: [],
      students: [],
      nameField: '',
      tagField: ''
    }
  }

  //API call
  apiCall = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        let students = response.students.map(student => {
          student.tags = []
          return student
        })
        this.setState({
          data: true,
          unfiltered: students,
          students: students
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  //get input from NameSearch
  getName = (str) => {
    let tag = this.state.tagField
    this.setState({ nameField: str })
    this.filter(str, tag)
  }

  //get input from TagSearch
  getTag = (str) => {
    let name = this.state.nameField
    this.setState({ tagField: str })
    this.filter(name, str)
  }

  //add tag to student
  addTag = (id, str) => {
    let current = this.state.unfiltered
    current[id - 1].tags.push(str)
    this.setState(prevState => ({
      unfiltered: current
    }))
  }

  //filter results displayed by name and or tag
  filter = (name, tag) => {
    name = name.toLowerCase()
    tag = tag.toLowerCase()
    let filtered
    if (!tag) {
      filtered = this.state.unfiltered.filter(student => {
        let studentName = `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`
        return studentName.includes(name)
      })
    }
    if (!name) {
      filtered = this.state.unfiltered.filter(student => {
        let tags = student.tags.join('')
        return tags.includes(tag)
      })
    }
    filtered = this.state.unfiltered.filter(student => {
      let studentName = `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`
      let tags = student.tags.join('')
      return studentName.includes(name) && tags.includes(tag)
    })
    this.setState(prevState => ({
      students: filtered
    }))
  }

  //control the appearance of the plus sign and grades display
  unhide = (div, line, inactive) => {
    if (inactive) {
      document.querySelector(`#${div}`).classList.add("unhide")
      document.querySelector(`#${line}`).classList.add("invisible")
    } else {
      document.querySelector(`#${div}`).classList.remove('unhide')
      document.querySelector(`#${line}`).classList.remove("invisible")
    }
  }

  componentDidMount() {
    this.apiCall("https://api.hatchways.io/assessment/students")
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <NameSearch nameField={this.state.nameField} getName={this.getName} />
          <TagSearch tagField={this.state.tagField} getTag={this.getTag} />
          <div className="student-list">
            {this.state.data ? this.state.students.map((student) => {
              return <Student student={student} key={student.id} studentId={student.id} unhide={this.unhide} divid={student.id} addTag={this.addTag}></Student>
            }) : ''}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
