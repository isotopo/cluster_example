'use strict';
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var AL = require('nsolvejs').AL;
module.exports = function (A,B,cb) {
  var array=[];
    var i=0,j=0,step,k=0;
    // Fork workers.
    for ( i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
     step = A.array.length/numCPUs;
     i=0;
     Object.keys(cluster.workers).forEach(function(id) {
      k=k+1;
      j=Math.floor(k*step);

      cluster.workers[id].send({array1:A.array,array2:B.array, from:i,to:j});
      i=j;
      cluster.workers[id].on('message',function (msg) {
         array = array.concat(msg.array);
         cluster.workers[id].send('shutdown');
      });
    });

    cluster.disconnect(function () {
      cb((new AL.matrix(array)));
    });
  };
