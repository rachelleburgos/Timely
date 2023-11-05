sample_data.csv from https://github.com/dmis-lab/nesa

event fields:
[email_address, title, duration_minute, register_time, start_time, start_iso_year, start_iso_week, week_register_sequence, register_start_week_distance, register_start_day_distance, is_recurrent, start_time_slot]

If AI model is predicting a start_time_slot of 0, change the momentum from a value of 0.15 -> 0.17

AI model 
    Input: [Title, start_time_day, start_time_hour, start_time_minute, register_start_day_distance]
    (Title is mapped to a number)
    Output: [start_time_slot]

For demonstration sake always try to predict for an input that would have a start slot of near 241. This falls around Thursday at 00:30:00 (12:30 AM)