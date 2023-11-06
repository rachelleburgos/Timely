const express = require('express');
const brain = require('brain.js');
const fs = require('fs');

const app = express();
const port = 3000;

const trainedModel = JSON.parse(fs.readFileSync('./src/trained.json', 'utf-8'));
const net = new brain.NeuralNetwork().fromJSON(trainedModel);

app.use(express.json());

app.post('/predict', (req, res) => {
    try {
        const inputData = req.body;
        const predictions = net.run(inputData);
        res.json({predictions});
    } catch(error) {
        res.status(500).json({ error: 'Prediction failed.' });
    }
});

app.listen(port, () =>{
    console.log(`AI server running on ${port}`);
})