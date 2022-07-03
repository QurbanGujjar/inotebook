const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
// const upload = require("../middleware/upload");
const Notes = require("../models/Notes");
const multer = require('multer')
    // const fileUpload = require('express-fileupload');
const { body, validationResult } = require("express-validator");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/public/uploads/images')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


// fileUpload()
//Route - 1: get all the notes using:Get 'api/auth/fetchallnotes' login required
router.get("/fetchallnotes", fetchuser, async(req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }
});

//Route - 2: Add a new notes using:Post 'api/notes/addnote' login required
router.post(
    "/addnote", [
        body("title", "Enter a valid Title").isLength({ min: 3 }),
        body("description", "description must be five Character").isLength({
            min: 5,
        }),
    ],
    fetchuser, upload.single('img'),
    async(req, res) => {
        try {
            // console.log(req, res)
            const { title, description, tag } = req.body;
            console.log(req.file)
            console.log(title, description, tag)
            const img = req.file

            // if (req.file) {
            //     const img = req.file.path;
            // }

            // if there is an error return bad request and error message
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title,
                description,
                tag,
                img,
                user: req.user.id,
            });
            const savedNote = await note.save();
            res.json(savedNote);



        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error ");
        }
    }
);

//Route - 3: Update a notes using:put 'api/notes/addnote' login required
router.put("/updatenote/:id", fetchuser, async(req, res) => {
    const { title, description, tag } = req.body;

    try {
        // create a new object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(
            req.params.id, { $set: newNote }, { new: true }
        );
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }

});


//Route - 4: Delete a notes using:Delete 'api/notes/deletenote' login required
router.delete("/deletenote/:id", fetchuser, async(req, res) => {

    try {

        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        //Allow deletetion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }


});



module.exports = router;