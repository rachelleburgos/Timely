const fs = require('fs');
const {createReadStream} = require('fs');
const csv = require('csv-parser');
const data_path = './data/sample_data.csv';
const output_path = './data/preprocessed_data.json'
let trainingData = [];

createReadStream(data_path)
    .pipe(csv({ headers: false }))
    .on('data', (rowArray) => {
        const rt_feature = new Date(rowArray[3].slice(0 , -6));
        // Converts date string for register_time into JS Date objects
        const st_feature =  new Date(rowArray[4].slice(0, -6));
        //Converts date string for start_time into JS Date objects
        trainingData.push({
            input: {
                email_address: rowArray[0], // Stores as a string
                title: rowArray[1], // Stores as a string
                duration_minute: +rowArray[2], // Stores as a signed INT
                register_time: {  
                    year: rt_feature.getFullYear(), // Returns the year of the specified date according to local time
                    month: rt_feature.getMonth() + 1, // Returns the hour of the specified date according to local time, +1 because months start from 0
                    day: rt_feature.getDate(), // Returns the day(DD) of the specified date according to local time
                    hour: rt_feature.getHours(), // Returns the hour(HH) of the specified date according to local time
                    minute: rt_feature.getMinutes(), // Returns the minutes(MM) of the specified date according to local time
                    second: rt_feature.getSeconds(), // Returns the seconds(SS) of the specified date according to local time
                }, // Stores register_time, as an object with a feature for each individual component related to time
                start_time: {
                    year: st_feature.getFullYear(), // Returns the year of the specified date according to local time
                    month: st_feature.getMonth() + 1, // Returns the hour of the specified date according to local time, +1 because months start from 0
                    day: st_feature.getDate(), // Returns the day(DD) of the specified date according to local time
                    hour: st_feature.getHours(), // Returns the hour(HH) of the specified date according to local time
                    minute: st_feature.getMinutes(), // Returns the minutes(MM) of the specified date according to local time
                    second: st_feature.getSeconds(), // Returns the seconds(SS) of the specified date according to local time
                }, //Stores start_time, as an object with a feature for each individual component related to time
                start_iso_year: +rowArray[5], //Stores as a signed INT
                start_iso_week: +rowArray[6], //Stores as a signed INT
                week_register_sequence: +rowArray[7], //Stores as a signed INT
                register_start_week_distance: +rowArray[8], //Stores as a signed INT
                register_start_day_distance: +rowArray[9], //Stores as a signed INT
                is_recurrent: rowArray[10] === 'True', // Convert to boolean
                start_time_slot: +rowArray[11] //Stores as a signed INT
            }, 
        });
    })
    .on('end', () => { // When the file is done being read, train the network
        console.log('CSV file successfully processed');
        console.log(trainingData); // This is the data that will be used to train the network

        fs.writeFileSync(output_path, JSON.stringify(trainingData, null, 2)); //the last 2 paramaters are for indentation and formatting
        //Writes the data to the output path
        console.log('Successfully written to output path');
    });