import React from 'react'

const Note = ({ note, toggleImportance, onDelete }) => {
  const label = note.important
    ? 'make not important' : 'make important'

    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
        <button onClick={onDelete}>delete</button>
      </li>
    )
  }
  
  export default Note
  