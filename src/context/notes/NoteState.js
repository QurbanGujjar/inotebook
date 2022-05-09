import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitital = [];
  const [notes, setNotes] = useState(notesInitital);

  // Add a note
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0YjM1ZjQzNjM5NjA1NTQzNjU4Y2Y1In0sImlhdCI6MTY0OTEzODU0Nn0.U3f7zfWJD4xMt4FRZHpizyYwk3z6ZbjRulFXsV-lkqg"
 const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json =await response.json()
    const note=json
    // let note = {
    //   _id: json._id,
    //   user: json.user,
    //   title: title,
    //   description: description,
    //   tag: json.tag,
    //   date: json.date,
    //   __v: json.__v,
    // };
    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    // API call
   await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      // body: JSON.stringify({title,description,tag}),
    });
    // const json= response.json();
    const afterDel = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(afterDel);
  };

  // edit a note

  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    await response.json()
    // const json = response.json();
    // console.log(json)

    let newNote=JSON.parse(JSON.stringify(notes))
    // Login to edit client

    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        // console.log(id)
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break
      }
    }
    setNotes(newNote)
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
