'use strict';
var cluster = require('cluster'),i,j,k;
module.exports = function () {
      cluster.worker.on('message', function(msg) {
        if (typeof msg ==='object') {
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
        delete msg.array1;
        cluster.worker.send(msg);
        }
    });

    cluster.worker.on('message', function(msg) {
      if (msg==='shutdown' && cluster.worker.isConnected() && !cluster.worker.isDead()) {
        cluster.worker.disconnect();}
    });
  };
