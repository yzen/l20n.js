#!/usr/bin/env node

'use strict';

var program = require('commander');
var PSEUDO_STRATEGIES = require('../lib/l20n/pseudo').PSEUDO_STRATEGIES;

program
  .version('0.0.1')
  .usage('[options]')
  .option('-l, --locale <code>',
          'Pseudolocale to use: qps-ploc (default), qps-plocm',
          'qps-ploc')
  .parse(process.argv);

function localize(str) {
  return PSEUDO_STRATEGIES[program.locale].translate(str);
}

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(localize(chunk));
  }
  process.stdout.write('> ');
});
