const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '100mb' })); // Set your desired limit
const port = 3000;

app.use(cors())
// Serve static files from the "public" folder
const uri = "mongodb+srv://lakshin2563:nirma123@cluster0.qtmkizi.mongodb.net/?retryWrites=true&w=majority";
app.use(express.static('public'));
app.use(express.json()); 


async function connect() {

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}


const router = require('./server/routes'); // Update the path to 'routes.js'

app.use('/', router);

app.listen(port, () => {
    
    connect();
    console.log(`Server is running on port ${port}`);
});


//in these web  application i have made so far which takes csv file as input and then uploading csv file it adds the fields of csv file in drop down menu then user selects option from dropdown and according to it a graph is plot ,then user inputs one mongodb query and clicking execute query button query output(object) gets printed on the dashboard , now i want that 



{/* <div class="dashboard-container mt-5 p-3">
            <h5>Select a MongoDB Query:</h5>
            <div class="form-group">
                <select class="form-control" id="queryOption">
                    <option value="groupByDate">Group by Date</option>
                    <option value="groupByCurrency">Group by Currency</option>
                    <!-- Add more predefined query options here -->
                 </select>
            </div>
            <button id="executeQueryButton" class="btn btn-primary mt-2">Execute Query</button>
        </div>  */}
        