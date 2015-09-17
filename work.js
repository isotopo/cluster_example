'use strict';
// Load MathWorkersJS for this worker
 var MathWorkers =require('mathworkers');
var worker = new MathWorkers.MathWorker();

// On the Coordinator trigger, compute the dot product in parallel
worker.on("compute", function() {
    var v = MathWorkers.Vector.fromArray([1, 2, 3, 4]);
    var w = MathWorkers.Vector.fromArray([5, 6, 7, 8]);
	v.workerDotVector(w, "dot");
});
