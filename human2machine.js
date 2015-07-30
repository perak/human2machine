var _ = require("underscore");

exports.human2machine = function(input) {
  var output = {
    application: {
      collections: [],

      free_zone: {
        pages: [],
        components: [
          {
            name: "main_menu",
            type: "menu",
            class: "nav navbar-nav",
            items: [
            ]
          }
        ]
      }
    }
  };

  var getOutputPage = function(pageName) {
    return _.find(output.application.free_zone.pages, function(page) { return page.name == pageName; });
  };

  var getOutputCollection = function(collectionName) {
    return _.find(output.application.collections, function(collection) { return collection.name == collectionName; });
  };

  var numbers = {
      'one': 1,
      'two': 2,
      'three': 3,
      'four': 4,
      'five': 5,
      'six': 6,
      'seven': 7,
      'eight': 8,
      'nine': 9,
      'ten': 10,
      'eleven': 11,
      'twelve': 12,
      'thirteen': 13,
      'fourteen': 14,
      'fifteen': 15,
      'sixteen': 16,
      'seventeen': 17,
      'eighteen': 18,
      'nineteen': 19,
      'twenty': 20
  };

  var findSubString = function(str, subStr) {
    return str.search(new RegExp(subStr, "i"));
  };

  var escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  };

  var splitStr = function(str, char) {
    var ch = escapeRegExp(char);
    var res = str.match(new RegExp('(?!' + ch + '|$)[^' + ch + '"]*(("[^"]*")[^' + ch + '"]*)*', 'g'));
    return res || [];
  };

  var equal = function(str1, str2) {
    if(str1 && str2) return str1.toUpperCase() == str2.toUpperCase();

    return str1 == str2;
  };

  var getListAfterSubstring = function(str, subStr1, subStr2) {
    var subStr = "";
    var index = findSubString(str, subStr1);
    if(index < 0) {
      index = findSubString(str, subStr2);
      if(index < 0) {
        return [];
      } else {
        subStr = subStr2;
      }
    } else {
      subStr = subStr1;
    }

    str = str.slice(index + subStr.length).trim();

    var list = splitStr(str.replace(" and ", ", ").replace(" & ", ", "), ",");

    var res = [];
    _.each(list, function(l) {
        res.push(l.trim().replace(/\W+\s/g, ''));
    });
    return res;
  };

  var findWord = function(str, word) {
    var words = splitStr(str, " ");
    var index = -1;
    _.find(words, function(w, i) { if(w == word) { index = i; return true; } else return false; });
    return index;
  };

  var getWordAfterWord = function(str, word) {
    var res = "";
    var words = splitStr(str, " ");
    _.each(words, function(w, i) {
        if(equal(w, word) && words[i + 1]) res = words[i + 1];
    });
    return res;
  };

  var getWordBeforeWord = function(str, word) {
      var res = "";
      var words = splitStr(str, " ");
      _.each(words, function(w, i) {
          if(equal(w, word) && words[i - 1]) res = words[i - 1];
      });
      return res;
  };

  var getWordBetweenWords = function(str, word1, word2) {
      var res = "";
      var words = splitStr(str, " ");
      _.each(words, function(w, i) {
          w = w.trim();
          var w1 = words[i - 1] || "";
          var w2 = words[i + 1] || "";
          if(i && equal(w1.trim(), word1.trim()) && equal(w2.trim(), word2.trim())) res = words[i];
      });
      return res;
  };

  var getQuotedStringAfterSubString = function(str, subStr) {
    var index = findSubString(str, subStr);
    if(index < 0) return "";

    str = str.slice(index + subStr.length).trim();
    var m = str.match( /"(.*?)"/ );//str.match(/[^"]+(?=(" ")|"$)/g);
    if(!m) return "";
    return m[1];
  };

  var toTitleCase = function(s) {
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

    return s.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
      if (index > 0 && index + match.length !== title.length &&
        match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
        (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
        title.charAt(index - 1).search(/[^\s-]/) < 0) {
        return match.toLowerCase();
      }

      if (match.substr(1).search(/[A-Z]|\../) > -1) {
        return match;
      }

      return match.charAt(0).toUpperCase() + match.substr(1);
    });
  };

  var getListOf = function(sentence, singular, plural) {
    var list = [];

    for(var num in numbers) {
      sentence = sentence.replace(num, numbers[num]);
    }

    var words = splitStr(sentence, " ");
    var count = 0;
    _.each(words, function(word, i) {
      var nextWord = words[i + 1];
      if(parseInt(word) && (equal(nextWord, singular) || equal(nextWord, plural) || equal(nextWord, singular + ":") || equal(nextWord, plural + ":")))
        count = parseInt(word);

      if(equal(word, singular + ":") || equal(word, plural + ":")) {
        var items = getListAfterSubstring(sentence, singular + ":", plural + ":");

        _.each(items, function(item) {
            list.push(item.toLowerCase());
        });
      }
    });

    if(!list.length && count) {
      for(var i = 0; i < count; i++) {
          list.push(singular + i);
      }
    }
    return list;
  };

  var createPages = function(sentence) {
    var pageNames = getListOf(sentence, "page", "pages");
    if(!pageNames.length) return;

    output.application.free_zone.pages = [];

    _.each(pageNames, function(pageName) {
        if(pageName == "page0") pageName = "home";
        var name = pageName.replace(" ", "_").replace("-", "_");
        var title = toTitleCase(pageName);

        output.application.free_zone.pages.push({
            name: name,
            title: title,
            pages: [],
            components: []
        });

        output.application.free_zone.components[0].items.push({
            title: title,
            route: name
        });
    });
  };

  var createCollections = function(sentence) {
    var collectionNames = getListOf(sentence, "collection", "collections");
    if(!collectionNames.length) return;

    output.application.collections = [];

    _.each(collectionNames, function(collectionName) {
        var name = collectionName.replace(" ", "_").replace("-", "_");

        output.application.collections.push({
            name: name,
            fields: []
        });
    });
  };

  var addFieldsToCollection = function(sentence) {
    var collectionName = getWordBetweenWords(sentence, "in", "collection");
    if(!collectionName) return;

    var collection = getOutputCollection(collectionName);
    if(!collection) return;

    var fields = getListOf(sentence, "field", "fields");
    if(!fields.length) return;

    _.each(fields, function(field) {
      var name = field.replace(" ", "_").replace("-", "_");
      var title = toTitleCase(field);
      collection.fields.push({
        name: name,
        title: title
      });
    });
  };

  var connectCollectionToMosquitto = function(sentence) {
    var collectionName = getWordBetweenWords(sentence, "connect", "collection");
    var collection = getOutputCollection(collectionName);

    if(!collection) return;

    if(findWord(sentence, "mosquitto") < 0) return;

    var url = getQuotedStringAfterSubString(sentence, "server:");
    if(!url) return;

    if(findSubString(url, "//") < 0) url = "mqtt://" + url;

    var topics = getListAfterSubstring(sentence, "topic:", "topics:");

    var startupCode = output.application.server_startup_code || "";
    var top = "";
    _.each(topics, function(t) {
        if(top) top = top + ", ";
        top = top + "'" + t + "'";
    });
    startupCode = startupCode + toTitleCase(collectionName) + ".mqttConnect('" + url + "', [" + top + "]);";
    output.application.server_startup_code = startupCode;

    output.application.packages = output.application.packages || {};
    output.application.packages.meteor = output.application.packages.meteor || [];
    if(output.application.packages.meteor.indexOf("perak:mqtt-collection") < 0) output.application.packages.meteor.push("perak:mqtt-collection");
  };

  var addJumbotronToPage = function(sentence, page) {
    var title = getQuotedStringAfterSubString(sentence, "title:");
    var text = getQuotedStringAfterSubString(sentence, "text:");
    var buttonRoute = getQuotedStringAfterSubString(sentence, "url:");
    if(!getOutputPage(buttonRoute)) buttonRoute = "";

    var buttonTitle = buttonRoute ? "Continue" : "";
    var jumbotron = {
      name: "jumbotron",
      type: "jumbotron",
      text: text,
      button_route: buttonRoute,
      button_title: buttonTitle,
      title: title
    };
    page.components.push(jumbotron);
    page.title = "";
  };

  var addDataviewToPage = function(sentence, page) {
    var collectionName = getWordBetweenWords(sentence, "for", "collection");
    if(!collectionName || !getOutputCollection(collectionName)) {
      collectionName = getWordBetweenWords(sentence, "showing", "collection");
      if(!getOutputCollection(collectionName)) {
        return;
      }
    }

    var dataView = {
      name: "list",
      type: "dataview",
      query: {
        name: collectionName,
        collection: collectionName,
        filter: {},
        options: {}
      }
    };

    page.components.push(dataView);
  };

  var addCrudToPage = function(sentence, page) {
    var collectionName = getWordBetweenWords(sentence, "for", "collection");
    if(!getOutputCollection(collectionName)) return;

    var dataView = {
      name: "list",
      type: "dataview",
      query: {
        name: collectionName,
        collection: collectionName,
        filter: {},
        options: {}
      },
      insert_route: page.name + ".insert",
      edit_route: page.name + ".edit",
      edit_route_params: [{ name: "customerId", value: "this._id" }]
    };

    var insertPage = {
        name: "insert",
        components: []
    };

    var insertForm = {
      name: "form",
      type: "form",
      mode: "insert",
      title: "Insert",
      query: {
        name: collectionName + "_empty",
        collection: collectionName,
        filter: { _id: null },
        options: {},
        find_one: true
      },
      submit_route: page.name,
      cancel_route: page.name
    };
    insertPage.components.push(insertForm);

    var editPage = {
        name: "edit",
        route_params: ["customerId"],
        components: []
    };

    var editForm = {
      name: "form",
      type: "form",
      mode: "update",
      title: "Edit",
      query: {
        name: collectionName + "_selected",
        collection: collectionName,
        filter: { _id: ":customerId" },
        options: {},
        find_one: true
      },
      submit_route: page.name,
      cancel_route: page.name
    };
    editPage.components.push(editForm);

    page.components.push(dataView);
    page.pages.push(insertPage);
    page.pages.push(editPage);
  };

  var addComponentsToPage = function(sentence) {
      var pageName = getWordBetweenWords(sentence, "in", "page");
      if(!pageName) return;
      var page = getOutputPage(pageName);
      if(!page) {
        if(pageName == "home") page = getOutputPage("home_page");
        if(!page) return;
      }

      // which component?
      if(findSubString(sentence, "jumbotron") >= 0) {
          addJumbotronToPage(sentence, page);
      } else {
        if(findSubString(sentence, "table") >= 0) {
            addDataviewToPage(sentence, page);
        } else {
          if(findSubString(sentence, "crud") >= 0) {
              addCrudToPage(sentence, page);
          } else {
            if(findSubString(sentence, "text") >= 0) {
                page.text = getQuotedStringAfterSubString(sentence, "text");
            }
          }
        }
      }
  };

  var sentences = splitStr(input, ".").filter(function(e) { return e; });
  _.each(sentences, function(sentence) {
    createCollections(sentence);
    addFieldsToCollection(sentence);
    connectCollectionToMosquitto(sentence);
    createPages(sentence);
    addComponentsToPage(sentence);
  });
  return output;
}
