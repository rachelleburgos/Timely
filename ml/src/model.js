const brain = require('brain.js');
const fs = require('fs');

// BUILD A NEURAL NETWORK BASED ON THE INPUTS OF PP_DATA.JSON
// Data will have an input and output

/*
Inputs will include: 'Title', 'Start_time'
*/

/*
Outputs will include: 'start_time_slot'
*/

/*
FOR SCALING DATA (For brain.js not scalability), CONSIDER DIVIDING ALL VALUES BY ENOUGH TO MAKE THEM A DECIMAL
*/

const PP_DATA = require('../data/preprocessed_data.json'); //Loads data into local var

let trainingData = [];
const getData = function (content) {
    var jsonData = JSON.parse(fs.readFileSync('../data/preprocessed_data.json', 'utf-8'));
    var data = [];
    for (var i = 0; i < 110; i++)
    {
        var sample = jsonData[i];
        var input = {
            //duration_minute: sample.input.duration_minute /100,
            // Brain expects a consistent format of input and output, so the features of register_time have been flattened to be individual numbers
            // Rather than [ num, arr{}, num ...]
            // The following values are converted to decimal values between [0,1]

            //Calls function Map to num and then converts it to a value between [0,1]
            title: (mapToNum(sample.input.title))/10,

            //start_time_year: parseFloat((+sample.input.start_time.year / 9999).toFixed(4)),
            //start_time_month: +sample.input.start_time.month / 100,
            start_time_day: +sample.input.start_time.day / 100,
            start_time_hour: +sample.input.start_time.hour / 100,
            start_time_minute: +sample.input.start_time.minute / 100,
            //start_time_second: +sample.input.start_time.second / 100,

            //start_iso_year: parseFloat((+sample.input.start_iso_year / 9999).toFixed(4)),
            //start_iso_week: +sample.input.start_iso_week / 100,

            //register_start_week_distance: +sample.input.register_start_week_distance / 10,
            register_start_day_distance: sample.input.register_start_day_distance/ 10,

        };
        var output = {
            //THe output should be the 30 minute slot of the week the task is scheduled for
            start_time_slot: parseFloat((+sample.input.start_time_slot / 1000).toFixed(4)),
        };
        data.push({
            input: input,
            output: output
        });
    }
    return data;
}

function mapToNum(title) {
    //Converts string title into a number because 
    switch (title) {
        case "Personal":
            return 1;
        case "Work":
            return 2;
        case "School":
            return 3;
        case "Recreation":
            return 4;
    }
}

trainingData = getData(PP_DATA);

//CREATION OF NEURAL NETWORK
const config = {
    //[Title, year, month, day, hour, minute, reg_dist]
    hiddenLayers: [4, 31, 24, 60, 60, 7] // Current config has low accuracy
};

const net = new brain.NeuralNetwork(config);

//TRAINING PARAMETERS
net.train(trainingData, {
    errorThresh: 0.0025,
    iterations: 1500,
    log: true,
    logPeriod: 1,
    learningRate: 0.5,
    momentum: 0.17,
    activation: 'relu',
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
});

//Sample prediction model
// const x = {
//     title: .1,
//     start_time_day: 
// }
const sampleToPredict = trainingData[1];
const prediction = net.run(sampleToPredict.input);
console.log(trainingData[1]); // To check the if the data is parsed correctly

console.log(`Got ${trainingData.length} samples for training`);

fs.writeFileSync('trained.json', JSON.stringify(net.toJSON(), null, 2)); // Writes results of training to a JSON file

const savedModel = JSON.parse(fs.readFileSync('trained.json', 'utf8'));


net.fromJSON(savedModel);
console.log('Prediction: ', prediction); // prints out predicted output of when to start cscheduled task for the first index in data
