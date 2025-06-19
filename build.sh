#!/bin/bash

# Navigate to your React app root, run build, move to dist/
cd src
npm install
npm run build

cd api
venv\Scripts\activate
pip install -r ../../requirements.txt
cd venv