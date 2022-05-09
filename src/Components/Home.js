import React from 'react'
import Notes from './Notes'

function Home(props) {


    // console.log(notes)


  return (
    <div>



<Notes  showAlert={props.showAlert} />


    </div>
  )
}

export default Home
