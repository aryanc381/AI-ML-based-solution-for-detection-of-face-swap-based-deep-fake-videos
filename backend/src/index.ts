import cors from 'cors';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const app = express();
const port = process.env.PORT || 3000;
const execPromise = promisify(exec);

// Set up multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage });
let fileName = 'uploads/aagfhgtpmv.mp4';
let videoFileName = ''; // To store uploaded video file name

app.use(cors());
app.use(express.json());

// Function to run the Python script
async function runPythonScript(image_path: string) {
  try {
    const { stdout, stderr } = await execPromise(`python ./app.py "./uploads/${image_path}"`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    return stdout;
  } catch (error) {
    console.error(`exec error: ${error}`);
    return `Exec error: ${error}`;
  }
}


// Endpoint for processing the uploaded image file
app.get('/result', async (req, res) => {
  if (!fileName) {
    return res.status(400).json({ message: 'No file has been uploaded yet' });
  }
  const result = await runPythonScript(fileName);
  // const segments = result.split('\r\n');
  // const extractedValue = segments[segments.length - 2];
  res.json({
    status: 'completed',
    originalResult: result,
    message: 'Let us know if anything is wrong',
  });
});

// New endpoint for uploading video files
app.post('/upload-video', upload.single('video'), (req, res) => {
  if (req.file) {
    videoFileName = req.file.originalname;
    res.json({
      message: 'Video uploaded successfully',
      filename: req.file.originalname,
    });
  } else {
    res.status(400).json({
      message: 'No video uploaded',
    });
  }
});

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Test endpoint works",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
