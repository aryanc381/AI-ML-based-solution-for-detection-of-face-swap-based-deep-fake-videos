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

def square_crop_frame(image):
    """Crop the given image to a square format."""
    height, width = image.shape[:2]
    min_dimension = min(height, width)
    start_x = (width - min_dimension) // 2
    start_y = (height - min_dimension) // 2
    return image[start_y:start_y + min_dimension, start_x:start_x + min_dimension]

def process_video_frames(video_path, max_frames=0, resize_dims=(IMG_SIZE, IMG_SIZE)):
    """Extract and process frames from a video file."""
    capture = cv2.VideoCapture(video_path)
    processed_frames = []
    try:
        while True:
            read_success, frame = capture.read()
            if not read_success:
                break
            frame = square_crop_frame(frame)
            frame = cv2.resize(frame, resize_dims)
            frame = frame[..., ::-1]  # Convert BGR to RGB
            processed_frames.append(frame)

            if max_frames > 0 and len(processed_frames) >= max_frames:
                break
    finally:
        capture.release()
    return np.array(processed_frames)

def extract_video_features(video_frames, feature_extractor):
    """Extract features from video frames using a feature extractor."""
    features = []
    for frame in video_frames:
        frame = np.expand_dims(frame, axis=0)  
        feature = feature_extractor.predict(frame)
        features.append(feature)
    
    features = np.array(features)
    return features.squeeze()

def build_feature_extractor(model_name='ResNet50'):
    """Build the feature extractor model."""
    base_model_class = getattr(keras.applications, model_name)
    base_model = base_model_class(
        weights="imagenet",
        include_top=False,
        pooling="avg",
        input_shape=(IMG_SIZE, IMG_SIZE, 3)
    )
    preprocess_input = getattr(keras.applications, model_name.lower()).preprocess_input

    inputs = keras.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    x = preprocess_input(inputs)
    outputs = base_model(x)

    model = keras.Model(inputs=inputs, outputs=outputs, name=f"{model_name}_feature_extractor")
    return model

feature_extractor = build_feature_extractor('ResNet50')


video_frames = process_video_frames(VIDEO_PATH, max_frames=MAX_SEQ_LENGTH)
video_features = extract_video_features(video_frames, feature_extractor)


def prepare_input(features, max_seq_length=MAX_SEQ_LENGTH):
    """Prepare features with masks for model prediction."""
    num_features = features.shape[-1]
    input_features = np.zeros((1, max_seq_length, num_features), dtype="float32")
    input_mask = np.zeros((1, max_seq_length), dtype=bool)

    num_frames = features.shape[0]
    frames_to_use = min(max_seq_length, num_frames)
    input_features[0, :frames_to_use] = features[:frames_to_use]
    input_mask[0, :frames_to_use] = True

    return input_features, input_mask


input_features, input_mask = prepare_input(video_features)


prediction = model.predict([input_features, input_mask])
print(f"Prediction: {'FAKE' if prediction[0] > 0. else 'REAL'}")