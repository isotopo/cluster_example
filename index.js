'use strict';
var cluster = require('cluster');
var master = require('./master');
var worker = require('./worker');
module.exports = function (A,B,cb) {
  if (cluster.isMaster) {
    master(A,B,cb);
  }  else if (cluster.isWorker) {
      worker();
  }
};
