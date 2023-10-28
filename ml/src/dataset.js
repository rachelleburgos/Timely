import { createReadStream } from 'fs';
import csv from 'csv-parser';

const data_path = 'data/sample_data.csv';
let trainingData = [];

createReadStream(data_path)
    .pipe(csv({ headers: false }))
    .on('data', (rowArray) => {
        trainingData.push({
            input: {
                email_address: rowArray[0],
                title: rowArray[1],
                duration_minute: rowArray[2],
                register_time: rowArray[3],
                start_time: rowArray[4],
                start_iso_year: rowArray[5],
                start_iso_week: rowArray[6],
                week_register_sequence: rowArray[7],
                register_start_week_distance: rowArray[8],
                register_start_day_distance: rowArray[9],
                is_recurrent: rowArray[10] === 'True', // Convert to boolean
                start_time_slot: rowArray[11]
            }, 
        });
    })
    .on('end', () => { // When the file is done being read, train the network
        console.log('CSV file successfully processed');
        console.log(trainingData); // This is the data that will be used to train the network
    });