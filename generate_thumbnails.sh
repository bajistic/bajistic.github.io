#!/bin/bash
for video in assets/videos/*.mp4; do
  ffmpeg -i "$video" -vf "select=eq(n\,0)" -vframes 1 "${video%.*}_thumbnail.jpg"
done
