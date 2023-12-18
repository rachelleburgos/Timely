import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

np.set_printoptions(precision=3, suppress=True)

print(tf.__version__)

# We load the dataset but I'm thinking to load it with arrays
url = 'http://archive.ics.uci.edu/ml/machine-learning-databases/auto-mpg/auto-mpg.data'
column_names = ['MPG', 'Cylinders', 'Displacement', 'Horsepower', 'Weight',
                'Acceleration', 'Model Year', 'Origin']

localData = 'dataai.csv'
ai_col_names = ['Day', 'Task', 'TimeStart', 'TimeEnd', 'Duration', 'Description']

load_local = pd.read_csv(localData, names=ai_col_names,
                         na_values='?', comment='\t')

dataset = load_local
dataset.tail()

# ai_col_days = ['Sunday', 'Monday', ' Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
# Convert the category data into numbers
train_dataset = dataset.sample(frac=0.8, random_state=0)


raw_dataset = pd.read_csv(url, names=column_names,
                          na_values='?', comment='\t',
                          sep=' ', skipinitialspace=True)

print(train_dataset.describe().transpose())

train_features = train_dataset.copy()

normalizer = tf.keras.layers.Normalization(axis=-1)

# Since we have days as a string change it to 0-6
# Change tasks in a unique id
normalizer.adapt(np.array(train_features))

print(normalizer.mean.numpy())
