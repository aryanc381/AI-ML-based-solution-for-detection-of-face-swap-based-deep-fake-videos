import tensorflow as tf
from tensorflow import keras
import numpy as np
import cv2
import os

# Constants
IMG_SIZE = 224
MAX_SEQ_LENGTH = 20
NUM_FEATURES = 2048
MODEL_PATH = 'models/final_model6.h5'
VIDEO_PATH = 'uploads/aagfhgtpmv.mp4'

model = keras.models.load_model(MODEL_PATH)
print("yeh chal raha hai :))")
