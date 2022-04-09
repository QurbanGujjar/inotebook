const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/inodebook";

const connectToMongo = () => {
    mongoose.connect(mongooseURI, () => {
        console.log("Connect to Mongoos Successfully")

    });
}

module.exports = connectToMongo;


// This happened probably because the MongoDB service isn't started. Follow the below steps to start it:

// Go to Control Panel and click on Administrative Tools.
// Double click on Services. A new window opens up.
// Search MongoDB.exe. Right click on it and select Start.
// The server will start. Now execute npm start again and the code might work this time.