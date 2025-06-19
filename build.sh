#!/bin/bash

# Navigate to your React app root, run build, move to dist/
cd ../..
npm install
npm run build

cd api/venv
pip install -r requirements.txt