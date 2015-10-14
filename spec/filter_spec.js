'use strict';

var assert = require('assert');
var filter = require('../lib/filter.js');

var fixtures = {
  dirtyString: 'I do not give a fudge. That darn UX change was such a pain in the butt. It was fudging crappy.',
  cleanString:  'I do not give a chicken. That silly UX change was such a pain in the elbow. It was horse back riding chicken.',
  seed: {
    'replacements': {
      'body-part': ['elbow'],
      'adjective': ['silly'],
      'verb': ['horse back riding'],
      'noun': ['chicken']
    },
    'words': {
      'darn': 'adjective',
      'butt': 'body-part',
      'butthole': 'body-part',
      'fudging': 'verb',
      'fudge': 'noun',
      'buck': 'noun',
      'bucking': 'verb',
      'crappy': 'noun'
    }
  }
};

describe ("clean", function() {
  filter.seed(fixtures.seed);

  it ("should replace the string", function() {
    var filteredString = filter.clean(fixtures.dirtyString);
    assert.equal(filteredString, fixtures.cleanString);
  });

  it ("should work with fancy stuff", function() {
    var badString = "The buck was bucking.";
    var expectedString = "The chicken was horse back riding.";
    var filteredString = filter.clean(badString);
    assert.equal(filteredString, expectedString);
  });

  it ("should work with butt and butthole", function() {
    var badString = "That butthole has a butt.";
    var expectedString = "That elbow has a elbow.";
    var filteredString = filter.clean(badString);
    assert.equal(filteredString, expectedString);
  });

  it ("should work with lots of bad words", function() {
    var badString = "butt butt butt butt butt";
    var expectedString = "elbow elbow elbow elbow elbow";
    var filteredString = filter.clean(badString);
    assert.equal(filteredString, expectedString);
  });
});
