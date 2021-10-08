import React from 'react';
import AddNote from './components/AddNote'
import NotesList from './components/NotesList'
import 'bootstrap/dist/css/bootstrap.min.css';

import { nanoid } from 'nanoid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    } //array
    this.addNotes = this.addNotes.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
  }

  addNotes(body, title) {
    const date = new Date()

    const newNote = {
      id: nanoid(),
      title: title,
      text: body,
      date: date.toLocaleDateString('en-GB')
    }

    const newNotes = [...this.state.notes, newNote]

    this.setState({ notes: newNotes })

  }

  deleteNote(id) {
    const newNotes = this.state.notes.filter(note => note.id !== id)
    this.setState({ notes: newNotes })
  }

  render() {
    return (
      <div className="container ">
        <div className="d-flex justify-content-center mt-1">
          <AddNote handleAddNotes={this.addNotes} />
        </div>
        <div className="mt-2">
          <NotesList notes={this.state.notes} handleDeleteNote={this.deleteNote}/>
        </div>
      </div>
    )
  }
}

export default App
