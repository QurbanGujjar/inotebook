import axios from "axios";
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const host = "http://localhost:5000";
var FormData = require('form-data');


const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [imgData, setImgData] = useState(null);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log(imgData)

    let imageName =imgData.imageName.name

    var fd = new FormData();

    fd.append("title", note.title);
    fd.append("description", note.description);
    fd.append("tag", note.tag);
    fd.append("img", imgData);
    // fd.append("imageName", imgData.imageName);
    // console.log(imgData);

    // console.log(imageName)
    // addNote(note.title,note.description,note.tag,imgData)
    // addNote(fd);

    axios.post(`${host}/api/notes/addnote`, fd , {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        "auth-token":localStorage.getItem("token")

      }
    }).then(resp => {
      console.log(resp.data);

    })

    //  fetch(`${host}/api/notes/addnote`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type":"multipart/form-data;boundary=MyBoundary",
    //     "auth-token":
    //       localStorage.getItem("token")
    //   },
      // body: JSON.stringify(title, description, tag),
      // file:imgData
      // body:fd
      // body:fd
    // }).then((resp)=>{
    //   resp.json().then((result)=>{
    //     console.log("result",result)
    //   })
    // })


    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully", "success");
  };

  const fileSelectedHandler = (e) => {
    // setNote({...note,[e.target.name]:e.target.files[0]})
    // console.log(e.target.files[0])
    setImgData({ [e.target.name]: e.target.files[0] });
  };
  return (
    <div className='container   '>
      <h2>Add a note</h2>

      <form className='my-3'>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            value={note.title}
            aria-describedby='emailHelp'
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='dec' className='form-label'>
            Description
          </label>
          <input
            type='text'
            className='form-control'
            id='description'
            value={note.description}
            name='description'
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='tag' className='form-label'>
            Tag
          </label>
          <input
            type='text'
            className='form-control'
            id='tag'
            value={note.tag}
            name='tag'
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='file' className='form-label'>
            Upload image
          </label>
          {/* <input type="file" className="form-control" id="file" value={note.imageName} name="imageName"onChange={fileSelectedHandler}/> */}
          <input
            type='file'
            className='form-control'
            id='file'
            name='imageName'
            onChange={fileSelectedHandler}
          />
        </div>

        <button
          className='btn btn-primary'
          disabled={note.title.length < 5 || note.description.length < 5}
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
