import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

// Function to create a commit on a specific date
const createCommit = (weeks, days) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(weeks, "w")
    .add(days, "d")
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date });
  });
};

// Function to create multiple commits in a row
const createRow = (week, startDay, endDay) => {
  for (let day = startDay; day <= endDay; day++) {
    createCommit(week, day);
  }
};

// Function to create the letter G
const createG = (startWeek) => {
  // Top horizontal line
  createRow(startWeek, 0, 4);
  // Right vertical line
  for (let week = startWeek; week <= startWeek + 4; week++) {
    createCommit(week, 4);
  }
  // Bottom horizontal line
  createRow(startWeek + 4, 0, 4);
  // Left vertical line
  for (let week = startWeek; week <= startWeek + 4; week++) {
    createCommit(week, 0);
  }
  // Middle horizontal line
  createRow(startWeek + 2, 2, 4);
};

// Function to create the letter A
const createA = (startWeek) => {
  // Left diagonal
  for (let i = 0; i <= 4; i++) {
    createCommit(startWeek + i, i);
  }
  // Right diagonal
  for (let i = 0; i <= 4; i++) {
    createCommit(startWeek + i, 4 - i);
  }
  // Middle horizontal line
  createRow(startWeek + 2, 1, 3);
};

// Create the pattern GAGAN
const createPattern = () => {
  // First G
  createG(0);
  // First A
  createA(6);
  // Second G
  createG(12);
  // Second A
  createA(18);
  // N
  for (let i = 0; i <= 4; i++) {
    createCommit(24 + i, 0);
    createCommit(24 + i, 4);
    createCommit(24 + i, i);
  }
};

// Execute the pattern creation
createPattern();
