'use strict';

var assert = require('assert');
var filter = require('../lib/filter.js');

var fixtures = {
  dirtyString: 'That darn UX change was such a pain in the butt. It was f-ing crappy.',
  cleanString:  'That silly UX change was such a pain in the elbow. It was horse back riding chicken.',
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
      'f-ing': 'verb',
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

  it ("should work with lots of bad words", function() {
    var badString = "butt butt butt butt butt";
    var expectedString = "elbow elbow elbow elbow elbow";
    var filteredString = filter.clean(badString);
    assert.equal(filteredString, expectedString);
  });
});
