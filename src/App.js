import { useState, useEffect } from 'react';

import AddNote from './components/AddNote'
import NotesList from './components/NotesList'
import ArchiveList from './components/ArchiveList'

import 'bootstrap/dist/css/bootstrap.min.css';
import * as localForage from "localforage";
import swal from '@sweetalert/with-react'

import { nanoid } from 'nanoid';

import date from 'date-and-time'
import ordinal from 'date-and-time/plugin/ordinal'

date.plugin(ordinal)

const App = () => {

  const [notes, setNotes] = useState([])
  const [archiveNotes, setNotesArchive] = useState([])
  const [showArchiveList, setShowArchiveList] = useState(false)

  useEffect(() => {
    async function getNotesFromForage() {
      const savedNotes = await localForage.getItem('notes-app')
      const savedArchiveNotes = await localForage.getItem('notes-restore-app')
      if (savedNotes) {
        setNotes(savedNotes)
        alertNote(savedNotes)
      }

      if (savedArchiveNotes) {
        setNotesArchive(savedArchiveNotes)
        alertNote(savedArchiveNotes)
      }
    }
    getNotesFromForage()
  }, [])

  function alertNote(notesToRemind) {
    notesToRemind.forEach(note => {
      if (note.datetoremind.toLocaleDateString() === new Date().toLocaleDateString()) {
        const diff = Math.abs(note.datetoremind.getTime() - new Date().getTime())
        if (Math.ceil(diff / 1000 / 60) < 10)
          swal(
            <div>
              <small>⌚</small>
              <h2>{`Title: ${note.title}`}</h2>
              <p>
                {`${note.text}`}
              </p>
            </div>
          )
      }
    });
  }


  function addNotes(body, title, datereminder) {

    const now = new Date()

    const newNote = {
      id: nanoid(),
      title: title,
      text: body,
      createdate: date.format(now, 'MMM DDD hh:mm A'),
      updatedate: null,
      datetoremind: datereminder
    }

    const newNotes = [...notes, newNote]

    setNotes(newNotes)

    localForage.setItem('notes-app', newNotes)
  }

  function editNotes(id, title, body) {

    const now = new Date()
    const foundNotes = notes.find(note => note.id === id)
    foundNotes.title = title
    foundNotes.text = body
    foundNotes.updatedate = date.format(now, 'MMM DDD hh:mm A')
    setNotes(notes)
    localForage.setItem('notes-app', notes)
  }

  function deleteNote(id) {
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
    localForage.setItem('notes-app', newNotes)
  }

  function handleArchiveNotes(id) {
    const index = notes.findIndex(note => note.id === id)
    const note = notes[index]
    const arrayArchiveNotes = [...archiveNotes, note]
    notes.splice(index, 1)
    setNotes(notes)
    setNotesArchive(arrayArchiveNotes)
    localForage.setItem('notes-app', notes)
    localForage.setItem('notes-restore-app', arrayArchiveNotes)
  }

  function restoreNote(id) {
    const index = archiveNotes.findIndex(restorenotes => restorenotes.id === id)
    const note = archiveNotes[index]
    const restoreNotes = [...notes, note]
    archiveNotes.splice(index, 1)
    setNotes(restoreNotes)
    setNotesArchive(archiveNotes)
    localForage.setItem('notes-app', restoreNotes)
    localForage.setItem('notes-restore-app', archiveNotes)
  }

  return (
    <div className="container ">
      <div className="d-flex justify-content-center mt-1">
        <AddNote handleAddNotes={addNotes} />
      </div>
      <div className="mt-2">
        <NotesList notes={notes} handleDeleteNote={deleteNote} editNotes={editNotes} handleArchiveNote={handleArchiveNotes} />
      </div>
      <div className="text-center mt-5 mb-5" >
        <button className="btn btn-dark"
          onClick={() => (archiveNotes.length === 0) ? alert('Empty Notes')
            : setShowArchiveList(!showArchiveList)}>Archive Notes
        </button>
        {showArchiveList && <ArchiveList archivenotes={archiveNotes} handleRestoreNote={restoreNote} />}
      </div>
    </div >

  )

}

export default App
