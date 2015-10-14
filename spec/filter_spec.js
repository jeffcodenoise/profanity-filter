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
});

// describe('clean', function () {

//   filter.addWord('darn', 'dad-gum');
//   filter.addWord('butt', 'badonkadonk');

//   it('should replace the unallowed words', function () {
//     var filteredString = filter.clean(fixtures.string);

//     assert.equal(filteredString.indexOf('darn'), -1);
//     assert.equal(filteredString.indexOf('butt'), -1);
//   });

//   it('should replace the correct number of characters for grawlix/stars methods', function () {
//     filter.setReplacementMethod('stars');
//     assert.equal(filter.clean(fixtures.string).length, fixtures.string.length);

//     filter.setReplacementMethod('grawlix');
//     assert.equal(filter.clean(fixtures.string).length, fixtures.string.length);
//   });

//   it('should replace the unallowed words with the replacement for "word" method', function () {
//     filter.setReplacementMethod('word');

//     var filteredString = filter.clean(fixtures.string);

//     assert.notEqual(filteredString.indexOf('dad-gum'), -1);
//     assert.notEqual(filteredString.indexOf('badonkadonk'), -1);
//   });
// });

// describe('config', function () {

//   beforeEach(function () {
//     filter.removeWord('darn');
//     filter.removeWord('butt');
//     filter.setReplacementMethod('stars');
//     filter.setGrawlixChars(['!','@','#','$','%','&','*']);
//   });

//   it('should be able to add words to the unallowed list', function () {
//     assert.notEqual(filter.clean(fixtures.string).indexOf('darn'), -1);

//     filter.addWord('darn');

//     assert.equal(filter.clean(fixtures.string).indexOf('darn'), -1);
//   });

//   it('should be able to remove words from the unallowed list', function () {
//     filter.addWord('darn');
//     assert.equal(filter.clean(fixtures.string).indexOf('darn'), -1);

//     filter.removeWord('darn');
//     assert.notEqual(filter.clean(fixtures.string).indexOf('darn'), -1);
//   });

//   it('should be able to change the replacement method', function () {
//     var filteredStrings = {};

//     filter.addWord('darn', 'dad-gum');

//     filter.setReplacementMethod('stars');
//     filteredStrings.stars = filter.clean(fixtures.string);

//     filter.setReplacementMethod('grawlix');
//     filteredStrings.grawlix = filter.clean(fixtures.string);

//     filter.setReplacementMethod('word');
//     filteredStrings.word = filter.clean(fixtures.string);

//     assert.notEqual(filteredStrings.stars, filteredStrings.grawlix);
//     assert.notEqual(filteredStrings.grawlix, filteredStrings.word);
//     assert.notEqual(filteredStrings.word, filteredStrings.stars);
//   });

//   it('should be able to change the grawlix characters', function () {
//     filter.addWord('darn');
//     filter.setReplacementMethod('grawlix');

//     assert.equal(filter.clean(fixtures.string).indexOf('++++'), -1);

//     filter.setGrawlixChars(['+']);
//     assert.notEqual(filter.clean(fixtures.string).indexOf('++++'), -1);
//   });

// });