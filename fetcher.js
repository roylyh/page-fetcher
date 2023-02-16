const request = require("request");
const fs = require("fs");
const readline = require("readline");

const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

request(url, (error, response, body) => {
  if (error) {
    console.log('There is an error with url:', error);
    return;
  }
  // Print the error if one occurred
  
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  // check if a file exists
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      console.error("The file not exists and it will download now.");
      fsWriteFile(filePath, body);
      return;
    }
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.question("Do you want to overwrite the file? Y for Yes ", (answer) => {
      if (answer === "Y") {
        fsWriteFile(filePath, body);
      }
      rl.close();
    });
  });
});

const fsWriteFile = function(filePath, body) {
  const length = body.length;
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.log("There is an error on File Path: ", err);
    } else {
      console.log(`Downloaded and saved ${length} bytes to ${filePath}`);
    }
  });
};
