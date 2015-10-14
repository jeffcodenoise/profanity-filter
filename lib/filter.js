'use strict';

var replacementMethod = 'stars';
var grawlixChars = ['!','@','#','$','%','&','*'];
var dictionary = {};
var leetReplacements = [
  {
    regexp: /a/g,
    replacement: "[aA@4]"
  },
  {
    regexp: /b/g,
    replacement: "[bB]"
  },
  {
    regexp: /c/g,
    replacement: "[cC]"
  },
  {
    regexp: /d/g,
    replacement: "[dD]"
  },
  {
    regexp: /e/g,
    replacement: "[eE3]"
  },
  {
    regexp: /f/g,
    replacement: "[fF]"
  },
  {
    regexp: /g/g,
    replacement: "[gG]"
  },
  {
    regexp: /h/g,
    replacement: "[hH]"
  },
  {
    regexp: /i/g,
    replacement: "[iI1]"
  },
  {
    regexp: /j/g,
    replacement: "[jJ]"
  },
  {
    regexp: /k/g,
    replacement: "[kK]"
  },
  {
    regexp: /l/g,
    replacement: "[lL1]"
  },
  {
    regexp: /m/g,
    replacement: "[mM]"
  },
  {
    regexp: /n/g,
    replacement: "[nN]"
  },
  {
    regexp: /o/g,
    replacement: "[oO0]"
  },
  {
    regexp: /p/g,
    replacement: "[pP]"
  },
  {
    regexp: /q/g,
    replacement: "[qQ]"
  },
  {
    regexp: /r/g,
    replacement: "[rR]"
  },
  {
    regexp: /s/g,
    replacement: "[sS$]"
  },
  {
    regexp: /t/g,
    replacement: "[tT7]"
  },
  {
    regexp: /u/g,
    replacement: "[uU]"
  },
  {
    regexp: /v/g,
    replacement: "[vV]"
  },
  {
    regexp: /w/g,
    replacement: "[wW]"
  },
  {
    regexp: /x/g,
    replacement: "[xX]"
  },
  {
    regexp: /y/g,
    replacement: "[yY]"
  },
  {
    regexp: /z/g,
    replacement: "[zZ]"
  }
];

var replacement = {
  stars: function (key) {
    var keyReplacement = '', i, len;

    for (i = 0, len = key.length; i < len; i++) {
      keyReplacement += '*';
    }

    return keyReplacement;
  },
  word: function (key) {
    return dictionary[key];
  },
  grawlix: function (key) {
    var keyReplacement = '',
      grawlixLen = grawlixChars.length,
      wordLen = key.length,
      rand,
      i;

    for (i = 0; i < wordLen; i++) {
      rand = Math.floor(Math.random() * grawlixLen);
      keyReplacement += grawlixChars[rand];
    }

    return keyReplacement;
  }
};

function getReplacement(type) {
  var possibleWords = dictionary.replacements[type];
  var word = possibleWords[Math.floor(Math.random() * possibleWords.length)];
  return word;
}

function cleanKey(key) {
  var regexp;
  var chars = "$!^.()[]|-";

  for(var i in chars) {
    var c = chars[i];
    regexp = new RegExp("\\" + c, "g");
    key = key.replace(regexp, "\\" + c);
  }

  for(var i = 0; i < leetReplacements.length; i++) {
    var replacement = leetReplacements[i];
    key = key.replace(replacement.regexp, replacement.replacement);
  }

  return key;
}

module.exports = {

  /**
   * Clean the supplied string of all words in the internal dictionary
   * @method clean
   * @param  {String} string The phrase to be cleaned
   * @return {String}        The phrase with all words in the dictionary filtered
   */
   clean: function(string) {
    var key, keyReplacement, type, lowerString, regexp;

    lowerString = string.toLowerCase();
    for(key in dictionary.words) {
      type = dictionary.words[key];
      key = cleanKey(key);
      keyReplacement = getReplacement(type);
      regexp = new RegExp(key + "([^a-zA-Z]|$)", "g");
      string = string.replace(regexp, keyReplacement + "$1");
    }

    return string;
   },

  /**
   * Populate the dictionary with words
   * @method seed
   * @param  {Object|String} name Either an object containing all dictionary key/values or the name of a preset seed data file
   */
  seed: function (name) {
    if (typeof name === 'object') {
      dictionary = name;
    } else {
      try {
        dictionary = require('./seeds/' + name);
      } catch (err) {
        console.warn('Couldn\'t load profanity filter seed file: ' + name, err);
      }
    }

    return this;
  },

  /**
   * Set the method of replacement for the clean() method
   * @method setReplacementMethod
   * @param {String} method The replacement method (stars, grawlix, word)
   */
  setReplacementMethod: function (method) {
    if (typeof replacement[method] === 'undefined') {
      throw 'Replacement method "' + method + '" not valid.';
    }
    replacementMethod = method;

    return this;
  },

  /**
   * Set the characters to be used for grawlix filtering
   * @setGrawlixChars
   * @param {Array} chars An array of strings that will be used at random for grawlix filtering
   */
  setGrawlixChars: function (chars) {
    grawlixChars = chars;

    return this;
  },

  /**
   * Adds a word to the dictionary
   * @method addWord
   * @param {String} word          The word to search for during clean()
   * @param {String} [replacement] The string to replace the unallowed word, if the 'word' replacementMethod is being used
   */
  addWord: function (word, replacement) {
    dictionary[word] = replacement || 'BLEEP';

    return this;
  },

  /**
   * Remove a word from the dictionary
   * @method removeWord
   * @param  {String} word The word to be removed
   */
  removeWord: function (word) {
    if (dictionary[word]) {
      delete dictionary[word];
    }

    return this;
  },

  /**
   * Obtain the internal dictionary, replacementMethod, and grawlixChars properties for debugging purposes
   * @method debug
   * @return {Object} The debugging data
   */
  debug: function () {
    return {
      dictionary: dictionary,
      replacementMethod: replacementMethod,
      grawlixChars: grawlixChars
    };
  }
};
