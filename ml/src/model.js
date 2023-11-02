const brain = require('brain.js');
const fs = require('fs');

const config = {
    hiddenLayers: [4, 4]
};

const net = new brain.NeuralNetwork(config);