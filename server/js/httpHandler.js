const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messagequeue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////


let messageQueue = null;

module.exports.initialize = (queue) => {
  messageQueue = queue;
  console.log(messageQueue);
};

randomCommand = () => {
  var commands = ['up', 'left', 'down', 'right'];
  return commands[Math.floor(Math.random() * Math.floor(4))]
}

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // res.writeHead(200, headers);
  // res.end(randomCommand());
  if (req.method === 'GET') {
    res.writeHead(200, headers);
    res.end(messagequeue.dequeue());
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};

