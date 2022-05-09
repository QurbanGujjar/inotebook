import React,{useContext,useEffect, useRef,useState} from 'react'
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
const Notes = (props) => {

    const context =useContext(noteContext)
    const {notes,getNotes,editNote}=context
    const navigate = useNavigate();
     const ref=useRef(null)
     const refClose=useRef(null)
    useEffect(() => {
      if(localStorage.getItem("token")){
        getNotes()
      }else{
        navigate("/login")

      }

     });
const updateNote=(currentNote)=>{
  ref.current.click()
  setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  // props.showAlert("Updated successfully","success")
}



const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});

const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
const handleClick=(e)=>{
  // console.log("Update note", note)
  refClose.current.click()
  editNote(note.id,note.etitle,note.edescription,note.etag)
  props.showAlert("Updata successfully","success")


}
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
{/* start model */}


<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* Update note form  */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

<form className='my-3'>
<div className="mb-3">
<label htmlFor="title" className="form-label">Title</label>
<input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>

</div>
<div className="mb-3">
<label htmlFor="dec" className="form-label">Description</label>
<input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription"onChange={onChange}/>
</div>
<div className="mb-3">
<label htmlFor="tag" className="form-label">Tag</label>
<input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
</div>

</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>

{/* End Model */}



   <div className="row my-3">
         <h2> Your Notes</h2>
         <div className="container mx-2">
           {notes.length===0 &&"No note to display"}
         </div>
        {notes.map((note)=>{
           return <NoteItem note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert}/>
        })}

    </div>
    </>
  )
}

export default Notes
