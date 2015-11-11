'use strict';
var clustering = require('./index.js');
var AL=require('nsolvejs').AL;
var cluster = require('cluster');

  if (cluster.isMaster) {

    var A=AL.matrix.create(20,30,function () {
      return Math.random();
    });
    var B=AL.matrix.create(30,10,function () {
      return 10*Math.random();
    });
    console.time('timer');
    console.log('en clustering');
    clustering(A,B,function (C) {
    console.log('result con cluster=',C.array.length);
    console.timeEnd('timer');
    });


    console.time('timer');
    A.x(B,function (C) {
    console.log('result=',C.array.length);
    console.timeEnd('timer');
    });


  }
