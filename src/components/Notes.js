import React from 'react'
import { MdDeleteForever } from 'react-icons/md'

const Notes = ({ note, handleDeleteNote }) => {
    const { id, text, date, title } = note
    return (
        <div className="note">
            <h2>{(title.length > 0) ? `Title: ${title}` : ''}</h2>
            <span>{text}</span>
            <div className="note-footer">
                <small>{date}</small>
                <MdDeleteForever className="delete-icon" size='1.3em' onClick={() => {
                    (window.confirm('Are you sure you want to delete this note')) ?
                        handleDeleteNote(id) : alert('Deleted Cancelled')
                }} />
            </div>
        </div>
    )
}

export default Notes
