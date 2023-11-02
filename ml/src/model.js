const brain = require('brain.js');
const fs = require('fs');

// BUILD A NEURAL NETWORK BASED ON THE INPUTS OF PP_DATA.JSON
// Data will have an input and output

/*
Inputs will include: 'duration_minute', 'register_time'
*/

/*
Outputs will include: 'start_time', 'is_reccurent'
*/

/*
FOR SCALING DATA (For brain.js not scalability), CONSIDER DIVIDING ALL VALUES BY ENOUGH TO MAKE THEM A DECIMAL
*/

const PP_DATA = require('../data/preprocessed_data.json'); //Loads data into local var

let trainingData = [];
const getData = function (content) {
    var jsonData = JSON.parse(fs.readFileSync('../data/preprocessed_data.json', 'utf-8'));
    var data = [];
    for (var i = 0; i <jsonData.length; i++)
    {
        var sample = jsonData[i];
        var input = {
            duration_minute: sample.input.duration_minute,
            // Brain expects a consistent format of input and output, so the features of register_time have been flattened to be individual numbers
            // Rather than [ num, arr{}, num ...]
            // The following values are converted to decimal values between [0,1]
            register_time_year: parseFloat((+sample.input.register_time.year / 9999).toFixed(4)), // converts rty into a float with percision 4
            register_time_month: +sample.input.register_time.month / 100, //maps rtm to a float 0.MM
            register_time_day: +sample.input.register_time.day / 100, // maps rtd to a float 0.DD
            register_time_hour: +sample.input.register_time.hour / 100, // maps rth to a float 0.HH
            register_time_minute: +sample.input.register_time.minute / 100, // maps rtmin to a float 0.MM
            register_time_second: +sample.input.register_time.second / 100, // maps rts to a float 0.SS

        };
        var output = {
            // conversions function the same as for input 
            start_time_year: parseFloat((+sample.input.start_time.year / 9999).toFixed(4)),
            start_time_month: +sample.input.start_time.month / 100,
            start_time_day: +sample.input.start_time.day / 100,
            start_time_hour: +sample.input.start_time.hour / 100,
            start_time_minute: +sample.input.start_time.minute / 100,
            start_time_second: +sample.input.start_time.second / 100,
            is_reccurent: sample.input.is_reccurent ? 1:0, // returns a value of 0 or 1 depending on if the boolean value is true or false
        };
        data.push({
            input: input,
            output: output
        });
    }
    return data;
}

trainingData = getData(PP_DATA);


//CREATION OF NEURAL NETWORK
const config = {
    hiddenLayers: [164, 4] // Current config takes very long with minimal improvement in accuracy (already low)
};

const net = new brain.NeuralNetwork(config);


//TRAINING PARAMETERS
net.train(trainingData, {
    errorThresh: 0.0025,
    iterations: 20000,
    log: true,
    logPeriod: 1,
    learningRate: 0.5,
});


//Sample prediction model
const sampleToPredict = trainingData[0];
const prediction = net.run(sampleToPredict.input);
console.log(trainingData[0]); // To check the if the data is parsed correctly

console.log(`Got ${trainingData.length} samples for training`);

console.log('Prediction: ', prediction); // prints out predicted output of when to start cscheduled task for the first index in data

fs.writeFileSync('trained.json', JSON.stringify(net.toJSON(), null, 2)); // Writes results of training to a JSON file