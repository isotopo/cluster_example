'use strict';
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var AL = require('nsolvejs').AL;
module.exports = function (A,B,cb) {
  var array=[];
  if (cluster.isMaster) {
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
      console.log('msg enviado',i,j);
      cluster.workers[id].send({array1:A.array,array2:B.array, from:i,to:j});
      i=j;
      cluster.workers[id].on('message',function (msg) {
         array.concat(msg.array);
      });

    });

    cluster.disconnect(function () {
      cb((new AL.matrix(array)));
    });

  }  else if (cluster.isWorker) {
      cluster.worker.on('message', function(msg) {
        var l = msg.array1[0].length, l2 = msg.array2[0].length ,array=[];
        for ( i = msg.from; i < msg.to; i++) {
          array[i-msg.from]=[];
          for (j = 0; j < l2; j++) {
            for ( k = 0; k < l; k++) {
              array[i-msg.from][j]=msg.array1[i][k]*msg.array2[k][j];
            }
          }
        }
      msg.array=array;
      delete  msg.array2;
      cluster.worker.send(msg);
    });
  }

};

var A=
module.exports
