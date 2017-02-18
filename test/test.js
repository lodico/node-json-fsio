import test from 'ava';
import jsonpersist from '../';

/*var assert = require('assert')
var fs = require('fs')
var os = require('os')
var path = require('path')
var rimraf = require('rimraf')
var jf = require('../')
*/
const TYPE_FUNCTION = 'function';
const TYPE_OBJECT = 'object';
const ENCODING_UTF8 = 'utf8';

console.log(jsonpersist.fs);

test('Check API', t => {
  t.is(typeof jsonpersist.readFile,      TYPE_FUNCTION, '\'readFile\' should be a function.');
  t.is(typeof jsonpersist.readFileSync,  TYPE_FUNCTION, '\'readFileSync\' should be a function.');
  t.is(typeof jsonpersist.writeFile,     TYPE_FUNCTION, '\'writeFile\' should be a function.');
  t.is(typeof jsonpersist.writeFileSync, TYPE_FUNCTION, '\'writeFileSync\' should be a function.');

  t.is(typeof jsonpersist.fs, TYPE_OBJECT, '\'fs\' should be an object.');
  t.is(jsonpersist.fs,        null,        '\'fs\' should be null.');

  t.pass();
});

test('Options', t => {
  t.truthy(jsonpersist.options,       'Options do not exist.');
  t.false(jsonpersist.options.throws, 'Default \'throws\' is not false.');
  t.is(jsonpersist.options.encoding,  ENCODING_UTF8, 'Default encoding is not UTF-8.');
  t.is(jsonpersist.options.reviver,   null,          'Default JSON reviver is not null.');
  t.is(jsonpersist.options.replacer,  null,          'Default JSON replacer is not null.');
  t.is(jsonpersist.options.spaces,    0,             'Default JSON indentation is not zero spaces.');
  
  t.snapshot(jsonpersist.options);
  
  t.pass();
});
/*

describe('jsonfile', function () {
  var TEST_DIR

  beforeEach(function (done) {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests')
    rimraf.sync(TEST_DIR)
    fs.mkdir(TEST_DIR, done)
  })

  afterEach(function (done) {
    rimraf.sync(TEST_DIR)
    done()
  })

  describe('spaces', function () {
    it('should default to null', function () {
      assert.strictEqual(jf.spaces, null)
    })
  })
})
*/