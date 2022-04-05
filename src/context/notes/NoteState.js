import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    const notesInitital=[
        {
          "_id": "624c14fc116a520c33922e6c",
          "user": "624b35f43639605543658cf5",
          "title": "my title",
          "description": "title description",
          "tag": "tag for title",
          "date": "2022-04-05T10:07:56.100Z",
          "__v": 0
        },
        {
          "_id": "624c1c307caca2704343278d",
          "user": "624b35f43639605543658cf5",
          "title": "my title",
          "description": "title description",
          "tag": "tag for title",
          "date": "2022-04-05T10:38:40.412Z",
          "__v": 0
        },
        {
            "_id": "624c14fc116a520c33922e6c",
            "user": "624b35f43639605543658cf5",
            "title": "my title",
            "description": "title description",
            "tag": "tag for title",
            "date": "2022-04-05T10:07:56.100Z",
            "__v": 0
          },
          {
            "_id": "624c1c307caca2704343278d",
            "user": "624b35f43639605543658cf5",
            "title": "my title",
            "description": "title description",
            "tag": "tag for title",
            "date": "2022-04-05T10:38:40.412Z",
            "__v": 0
          },
          {
            "_id": "624c14fc116a520c33922e6c",
            "user": "624b35f43639605543658cf5",
            "title": "my title",
            "description": "title description",
            "tag": "tag for title",
            "date": "2022-04-05T10:07:56.100Z",
            "__v": 0
          },
          {
            "_id": "624c1c307caca2704343278d",
            "user": "624b35f43639605543658cf5",
            "title": "my title",
            "description": "title description",
            "tag": "tag for title",
            "date": "2022-04-05T10:38:40.412Z",
            "__v": 0
          }
      ]



    const [notes,setNotes]=useState(notesInitital)


  return (
    <NoteContext.Provider value={{notes,setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
