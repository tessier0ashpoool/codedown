#!/usr/bin/env node

var fs = require('fs');
var marked = require('marked');

if (process.argv.length === 4) {

  var filename = process.argv[2];
  var content = fs.readFileSync(filename, 'utf-8');

  var lang  = process.argv[3];

  var renderer = new marked.Renderer();

  renderer.code = function (code, language) {
    return language === lang ? code + '\n\n' : '';
  };

  renderer.blockquote = function (quote) { return ''; };
  renderer.html = function (html) { return ''; };
  renderer.heading = function (text, level) { return ''; };
  renderer.hr = function () { return ''; };
  renderer.list = function (body, ordered) { return body; };
  renderer.listitem = function (text) { return text; };
  renderer.paragraph = function (text) { return ''; };
  renderer.table = function (header, body) { return ''; };
  renderer.tablerow = function (content) { return ''; };
  renderer.tablecell = function (content, flags) { return ''; };

  console.log(marked(content, { renderer: renderer }));
  
} else {
  console.log('usage: rundown.js <markdown file> <lang>');
  console.log('ex: rundown.js myfile.md haskell');
}