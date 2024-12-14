// Elad Silam - 208112185
// Shai Salem - 314784372

const fs = require("fs");
const path = require("path");

// Get the list of files in the 'input_files' folder
const inputFilesDirName = "input_files";
const inputFilesDirectory = path.join(__dirname, inputFilesDirName); // Points to the 'input_files' folder
const files = fs.readdirSync(inputFilesDirectory);
const nameOfOutputFile = "output.txt";
const pathToOutputFile = path.join(inputFilesDirectory, nameOfOutputFile);

// Only adding to the array if it's an input file
const inputFileNames = files.filter(
  (file) =>
    fs.statSync(path.join(inputFilesDirectory, file)).isFile() &&
    !file.startsWith("output")
);
const filePaths = inputFileNames.map((file) =>
  path.join(inputFilesDirectory, file)
);

// Function to count lines in a file
const countLines = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const lines = fileContent.split("\n");
  return lines.length;
};

// Function to write a certain number of lines from a file to an output file
const writeLines = (fromFile, amountOfLines) => {
  const fromFileContent = fs.readFileSync(fromFile, "utf8");
  const lines = fromFileContent.split("\n");
  const linesToWrite = lines.slice(0, amountOfLines); // Take the first `amountOfLines` lines
  linesToWrite.forEach((line) => {
    fs.appendFileSync(pathToOutputFile, line + "\n");
  });
};

// Get the line counts for all files
const lineCounts = filePaths.map((filePath) => countLines(filePath));
const maxLines = Math.max(...lineCounts); // Find the file with the maximum number of lines

// Run a loop to write x lines (from 1 to the maximum number of lines)
for (let currLinesAmount = 1; currLinesAmount <= maxLines; currLinesAmount++) {
  filePaths.forEach((filePath) => {
    const linesInFile = countLines(filePath); // Get the number of lines in the current file
    const linesToWrite = Math.min(currLinesAmount, linesInFile); // Don't write more lines than the file has

    if (linesToWrite > 0) {
      writeLines(filePath, linesToWrite); // Write lines from the current file
    }
  });
}
