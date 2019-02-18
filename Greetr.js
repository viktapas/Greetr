; (function (global, $) {

  // Greetr constructor
  // `new` creates an empty object {}
  var Greetr = function (firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);
  }

  // supported languages
  // hidden within the scope of IIFE and never directly accessible
  var supportedLangs = ['en', 'es', 'hi'];

  // informal grettings
  var greetings = {
    en: 'Hello',
    es: 'Hola',
    hi: 'नमस्ते'
  };

  // formal greetings
  var formalGrettings = {
    en: 'Greetings',
    es: 'Saludos',
    hi: 'नमस्कार'
  };

  // logger messages
  var logMessages = {
    en: 'Logged In',
    es: 'Inició sesión',
    hi: 'प्रवेश संपन्न'
  };

  // all methods accessible to `Greetr` object
  Greetr.prototype = {

    // get fullname
    fullName: function () {
      return this.firstname + ' ' + this.lastname;
    },

    // validate the language
    validate: function () {
      if (supportedLangs.indexOf(this.language) == -1) {
        throw 'Invalid language';
      }
    },

    // informal greeting
    greeting: function () {
      return greetings[this.language] + ' ' + this.firstname + '!';
    },

    // formal greeting
    formalGretting: function () {
      return formalGrettings[this.language] + ', ' + this.fullName();
    },

    // shorthand of greeting
    greet: function (formal) {
      var msg;

      // if `undefined` or `null`, it will be coerced to `false`
      if (formal) {
        msg = this.formalGretting();
      } else {
        msg = this.greeting();
      }

      // if console object exsists in global environment
      if (console) {
        console.log(msg);
      }

      // `this` refers to the calling object at execution time
      // makes the method chainable
      return this;

    },

    log: function () {

      // if console object available (or) exists
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());

        // makes chainable
        return this;
      }
    },

    // update the language
    setLang: function (lang) {
      // sets language
      this.language = lang;
      // validate
      this.validate();
      // makes chainable
      return this;
    },

    // using jQuery method
    HTMLGreeting: function (selector, formal) {
      // if jQuery object exisits
      if (!$) {
        throw 'jQuery not loaded';
      }
      // if selector exists. `undefined` or `null` will coerce to `false`
      if (!selector) {
        throw 'Selector is missing';
      }
      // variable declaration
      var msg;
      // if formal is true
      if (formal) {
        msg = this.formalGretting();
      } else {
        msg = this.greeting();
      }
      // using jQuery and calling `html` method
      // inject the message in the chosen place in the DOM
      $(selector).html(msg);

      // makes chainable
      return this;
    }

  };

  // the actual object is created here. Allowing us to `new` an object without calling `new`
  Greetr.init = function (firstname, lastname, language) {
    var self = this;
    self.firstname = firstname || '';
    self.lastname = lastname || '';
    self.language = language || 'en';

    // validate language
    self.validate();
  };

  // every object created from `Greet.init`, their prototype points to `Greeter.prototype`
  // Trick borrowed from jQuery so we don't have to use the `new` keyword
  Greetr.init.prototype = Greetr.prototype;

  // exposing Greetr object ot global environment and setting alias to `G$`
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
