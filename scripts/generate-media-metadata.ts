import fs from 'fs';
import path from 'path';
import * as mime from 'mime-types';

const mediaDir = path.resolve(__dirname, '../public/media'); // Assuming media is stored here

// Function to generate metadata for media files
function generateMediaMetadata(filePath: string) {
  const stats = fs.statSync(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const mimeType = mime.lookup(filePath);

  const metadata: any = {
    file: filePath,
    size: stats.size,
    type: mimeType,
    duration: 0, // Placeholder, real duration extraction would happen here for videos
  };

  if (extension === '.mp4' || extension === '.webm') {
    // If it's a video, extract the duration (could use libraries like 'fluent-ffmpeg')
    metadata.duration = 120; // Placeholder for video duration in seconds
  }

  return metadata;
}

// Example of reading media files from a directory and generating metadata
fs.readdir(mediaDir, (err, files) => {
  if (err) throw err;
  const mediaMetadata = files
    .filter((file) => ['.jpg', '.jpeg', '.png', '.mp4', '.webm'].includes(path.extname(file)))
    .map((file) => generateMediaMetadata(path.join(mediaDir, file)));

  console.log(mediaMetadata);
});
