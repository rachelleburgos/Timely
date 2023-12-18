import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

# Make NumPy printouts easier to read.
np.set_printoptions(precision=3, suppress=True)

import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers

print(tf.__version__)

url = 'http://archive.ics.uci.edu/ml/machine-learning-databases/auto-mpg/auto-mpg.data'
column_names = ['MPG', 'Cylinders', 'Displacement', 'Horsepower', 'Weight',
                'Acceleration', 'Model Year', 'Origin']

#local data
local_data = 'dataai.csv'

#Task
task_name = ['Day', 'Task', 'TimeStart', 'TimeEnd', 'Duration']

#get raw data
raw_local = pd.read_csv(local_data, names=task_name)

#example
raw_dataset = pd.read_csv(url, names=column_names,
                          na_values='?', comment='\t',
                          sep=' ', skipinitialspace=True)

#my data
ai_dataset = raw_local.copy()
ai_dataset.tail()

#example
dataset = raw_dataset.copy()
dataset.tail()

#mydata drop na
#fix this later because the description is na and it fucks with the data
#Nte: this was fixed because the way the data was imported. We already had
#the structure so we didnt need the spaces etc above.
ai_dataset.isna().sum()
ai_dataset = ai_dataset.dropna()

#example
dataset.isna().sum()
dataset = dataset.dropna()

#my categories
ai_dataset['Task'] = ai_dataset['Task'].map({1: 'Breakfast', 2: 'Lunch', 3: 'Dinner', 4: 'Math', 5: 'Eng'})

#example
dataset['Origin'] = dataset['Origin'].map({1: 'USA', 2: 'Europe', 3: 'Japan'})

#checkpoint
#print(ai_dataset)
#print(dataset)
#dummy for mew
ai_dataset = pd.get_dummies(ai_dataset, columns=['Task'], prefix='', prefix_sep='')
ai_dataset.tail()


dataset = pd.get_dummies(dataset, columns=['Origin'], prefix='', prefix_sep='')
dataset.tail()

#checkpoint2
#print(dataset)

#train it
ai_train_dataset = ai_dataset.sample(frac=0.8, random_state=0)
ai_test_dataset = ai_dataset.drop(ai_train_dataset.index)


train_dataset = dataset.sample(frac=0.8, random_state=0)
test_dataset = dataset.drop(train_dataset.index)


print(ai_train_dataset)
#pair it
sns.pairplot(ai_train_dataset[['Day', 'TimeStart', 'TimeEnd', 'Duration']], diag_kind='kde')


sns.pairplot(train_dataset[['MPG', 'Cylinders', 'Displacement', 'Weight']], diag_kind='kde')


#des ai data
ai_train_dataset.describe().transpose()


train_dataset.describe().transpose()



#ai train feat
ai_train_features = ai_train_dataset.copy()
ai_test_features = ai_test_dataset.copy()



train_features = train_dataset.copy()
test_features = test_dataset.copy()

print(ai_train_dataset)
print(train_dataset)

#My tain lane
ai_train_labels = ai_train_features.pop('TimeStart')
ai_test_labels = ai_test_features.pop('TimeStart')



train_labels = train_features.pop('MPG')
test_labels = test_features.pop('MPG')



#my train dat
ai_train_dataset.describe().transpose()[['mean', 'std']]

train_dataset.describe().transpose()[['mean', 'std']]

#print(ai_train_features)
#print(train_features)


#my normalizer
ai_normalizer = tf.keras.layers.Normalization(axis=-1)
ai_normalizer.adapt(np.array(ai_train_features, dtype='float32'))
print(ai_normalizer.mean.numpy())
print(ai_train_features[:3])
ai_first = np.array(ai_train_features[:1])

#example
normalizer = tf.keras.layers.Normalization(axis=-1)
normalizer.adapt(np.array(train_features, dtype='float32'))
print(normalizer.mean.numpy())

first = np.array(train_features[:1])

with np.printoptions(precision=2, suppress=True):
  print('AI example:', ai_first)
  print()
  print('Normalized:', ai_normalizer(ai_first).numpy())

with np.printoptions(precision=2, suppress=True):
  print('First example:', first)
  print()
  print('Normalized:', normalizer(first).numpy())

ai_breakfast = np.array(ai_train_features['Breakfast'])

ai_breakfast_normalizer = layers.Normalization(input_shape=[1,], axis=None)
ai_breakfast_normalizer.adapt(ai_breakfast)

breakfast_model = tf.keras.Sequential([
    ai_breakfast_normalizer,
    layers.Dense(units=1)
])

breakfast_model.summary()

breakfast_model.predict(ai_breakfast[:7])

breakfast_model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.1),
    loss='mean_absolute_error')

history = breakfast_model.fit(
    ai_train_features['Lunch'],
    ai_train_labels,
    epochs=100,
    # Calculate validation results on 20% of the training data.
    validation_split = 0.2)

def plot_loss(history):
  plt.plot(history.history['loss'], label='loss')
  plt.plot(history.history['val_loss'], label='val_loss')
  plt.ylim([0, 7])
  plt.xlabel('Epoch')
  plt.ylabel('Error [Task]')
  plt.legend()
  plt.grid(True)
  plt.show()

plot_loss(history)
