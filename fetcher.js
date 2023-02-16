const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];


request(url, (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  const length = body.length;
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Downloaded and saved ${length} bytes to ${filePath}`);
    }

  }
  );
});