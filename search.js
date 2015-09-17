'use strict';
var     run  = require('comandante') ,
        commander = require('commander');
        commander.option('-s, --search <s>', 'looking for').parse(process.argv);
        console.log('commander=',commander.search);
        var arg  = ['cloudsearchdomain','--endpoint-url',' http://search-test-01-2aaolnzgjoka6lampwc2vdh2ne.us-east-1.cloudsearch.amazonaws.com/','search','--search-query'];
        arg.push(commander.search);
        var search = run('aws',arg);
        //console.log('search=',search);
