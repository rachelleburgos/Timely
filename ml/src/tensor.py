import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler

# Convert CSV into DataFrame
df = pd.read_csv("output2.csv")

# Perform one-hot encoding for 'summary' and 'description'
df = pd.get_dummies(df, columns=['summary', 'description'])

# Assuming 'dtstart', 'dtend', and 'dtstamp' are datetime columns
df['dtstart'] = pd.to_datetime(df['dtstart'], errors='coerce')
df['dtend'] = pd.to_datetime(df['dtend'], errors='coerce')
df['dtstamp'] = pd.to_datetime(df['dtstamp'], errors='coerce')

# Check for errors and update the format accordingly
date_columns = ['dtstart', 'dtend', 'dtstamp']
for col in date_columns:
    if pd.isnull(df[col]).any():
        df[col] = pd.to_datetime(df[col], format="%Y-%m-%d", errors='coerce')

df['status'] = (df['status'] == 'CONFIRMED').astype(int)

# Define numerical features
numerical_features = ['dtstart']

# Exclude non-numerical columns from features
non_numerical_columns = ['dtend', 'dtstamp', 'organizer', 'uid', 'attendee', 'created', 'last-modified', 'location', 'sequence', 'status', 'transp']
features = df.drop(['status', 'uid'] + non_numerical_columns, axis=1)

# Normalize numerical features
scaler = MinMaxScaler()
features[numerical_features] = scaler.fit_transform(features[numerical_features])

# Convert to NumPy arrays
target_start = df['dtstart'].astype('int64').astype(np.float32)
target_end = df['dtend'].astype('int64').astype(np.float32)

# Exclude 'dtstart' from features
features = features.drop(['dtstart'], axis=1)

X_train, X_test, Y_train_start, Y_test_start, Y_train_end, Y_test_end = train_test_split(
    features.values, target_start.values, target_end.values, test_size=0.2, random_state=42)

# Build model for predicting 'dtstart'
model_start = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1, activation='linear')  # Use linear activation for regression
])

model_start.compile(optimizer='adam', loss='mean_squared_error', metrics=['mean_absolute_error'])

model_start.fit(X_train, Y_train_start, epochs=10, validation_data=(X_test, Y_test_start))
