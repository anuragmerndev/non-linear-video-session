
# Non Linear Video Session

Designing and implementing backend for a non-linear video session system using NodeJS.

## Overview

This project implements a backend for a non-linear video session system using NodeJS, Express, TypeScript, and MongoDB. Users are presented with different videos based on their choices, and their progress is tracked so they can resume from where they left off.

## Design Choices

1. **NodeJS Framework**: The application is built using Express.js for its simplicity and flexibility. TypeScript is used for type safety and better development experience.
2. **Database**: MongoDB is used as the database to leverage its flexibility in handling schema-less data and ease of scalability.
3. **Data Models**: The main data models are Video, Question, Choice, and UserProgress. These models help manage the videos, questions, choices, and user progress respectively.

## System Architecture

The system is designed to handle the following:
- CRUD operations for managing videos and their mappings.
- APIs for front-end interaction to fetch questions and track user progress.
- User's last visited question, so if the user visits back to the video they can start from where they left

## Run Locally

Clone the project

```bash
  git clone https://github.com/anuragmerndev/non-linear-video-session.git
  cd non-linear-video-session
```

Install dependencies

```bash
  npm install
```

Environment Variables

To run this project, you will need to copy the .env.example to .env

```bash
  mv .env.example .env
```

Start the server

```bash
  npm run start:dev // for dev environment
```