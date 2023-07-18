import React from 'react'

const Notification = ({ errorMessage }) => {
  return (
    <div>
      <p>{ errorMessage }</p>
    </div>
  )
}

export default Notification
