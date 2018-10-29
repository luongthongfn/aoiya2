"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        throw new Error("Cannot find module '" + o + "'");
      }

      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }

  return s;
})({
  1: [function (require, module, exports) {
    // on ready
    $(function () {
      //go-top button
      $("#go-top, .go-top").click(function () {
        $("html, body").animate({
          scrollTop: 0
        }, "slow");
        return false;
      }); // var $posToShow = $('.slide').height() - $(window).height() + 200;
      // $(window).scroll(function () {
      //     if ($(window).scrollTop() >= $posToShow) {
      //         $('#go-top').show();
      //     } else {
      //         $('#go-top').hide();
      //     }
      // });
      //mobile nav button

      $(document).on('click', '.nav-toggle', function () {
        $('#menu').toggleClass('is-active');
      }); //----sticky-header

      if ($('.sticky-header').length) {
        var _this = $('.sticky-header');

        var afterFixed = $('.js-after-fixed'); // _this.after(afterFixed);

        if (afterFixed) {
          afterFixed.css('padding-top', $('.fixed').height());
        } // var stickyPos = _this.offset().top;
        // $(window).scroll(function () {
        //     if (window.innerWidth > 992) {
        //         if ($(window).scrollTop() >= stickyPos) {
        //             _this.addClass('fixed');
        //             $('.after-fixed').css('padding-top', $('.fixed').height());
        //         } else {
        //             _this.removeClass('fixed');
        //             $('.after-fixed').css('padding-top', '0px');
        //         }
        //     } else {
        //         _this.removeClass('fixed');
        //         $('.after-fixed').css('padding-top', '0px');
        //     }
        // })

      } //==== js-tab ====//
      // .js-tab
      //     ul.js-tabnav
      //         a[href="#tab1"]
      //         a[href="#tab2"]
      //     .js-tab-content
      //         #tab1.tab-panel.fade.in
      //         #tab2.tab-panel.fade


      $('.js-tab').each(function () {
        var _this = $(this);

        var nav = _this.find('.js-tabnav');

        var handleClick = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
        $(nav).on(handleClick, "a[href^='#']", function (e) {
          e.preventDefault();

          if ($(this).parent().hasClass('active')) {
            return;
          }

          $(nav).find('.active').removeClass('active');
          $(this).parent().addClass('active');
          var target = $($(this).attr('href'));
          target.siblings().removeClass('in');
          setTimeout(function () {
            target.siblings().removeClass('active');
          }, 100);
          target.addClass('active');
          setTimeout(function () {
            target.addClass('in');
          }, 100);
        });
      });
    }); //goto #id

    $(window).on('load', function () {
      $("a.go-to[href^='#']").click(function (e) {
        e.preventDefault();
        $('#menu').removeClass('is-active');
        var target = $($(this).attr('href'));

        if (target.length) {
          var fixedHeight = $('.fixed').height() || 0;
          var pos = target.offset().top - fixedHeight;
          $("html, body").animate({
            scrollTop: pos
          }, "slow");
        }
      });
    }); //custom-select

    $(function () {
      var input = $('#request'),
          inputHidden = $('#request_hidden'),
          $select = $('.custom-select'),
          _open = function _open() {
        $select.addClass('select-open');
      },
          _close = function _close() {
        $select.removeClass('select-open');
      },
          _changeSlected = function _changeSlected(elem) {
        $select.find('li').removeClass('selected');
        $(elem).addClass('selected');
      },
          _update = function _update(val) {
        val = val || "項目を選択してください";
        input.text(val);
        inputHidden.val(val); // console.log(inputHidden.val());

        _validate();
      },
          _validate = function _validate() {
        if (input.text().trim() == "項目を選択してください") {
          inputHidden.addClass('has-error');
          inputHidden.val('');
        } else {
          inputHidden.removeClass('has-error');
        }
      }; //handle


      input.on('click', function () {
        _open();
      });
      $select.on('click', 'li', function () {
        var val = $(this).data('value');

        _changeSlected(this);

        _update(val);

        _close();
      });
      $(document).on('click touchstart', function (event) {
        // Check if clicked outside target
        if (!$(event.target).closest(".custom-select").length) {
          // Hide target
          _close();
        }
      });
    }); //contact-form

    $(function () {
      var $reqVal, $nameVal, $companyVal, $emailVal, $questionVal; //dialog confirm send mail

      var submitCallBack = function submitCallBack() {
        $('.contact-submit .fa').addClass('fa-spin fa-spinner');
        $.ajax({
          url: 'gmail.php',
          type: 'POST',
          data: {
            send_mail: true,
            request: $reqVal,
            name: $nameVal,
            company: $companyVal,
            email: $emailVal,
            question: $questionVal
          },
          success: function success(res) {
            $('.contact-submit .fa').removeClass('fa-spinner fa-spin').addClass('fa-check');
            document.getElementsByClassName("contact--form")[0].reset();
          },
          error: function error(xhr, status, err) {
            console.log(xhr, status, err);
            $('.contact-submit .fa').removeClass('fa-spinner fa-spin').addClass('fa-exclamation');
          }
        });
      };

      var closeCallBack = function closeCallBack() {
        $('#js_mail_result').removeClass('show');
      };

      var setPreviewValue = function setPreviewValue() {
        $reqVal = $('input[name = "request_hidden"]').val(); //from custom-select

        $nameVal = $('#name').val();
        $companyVal = $('#company').val();
        $emailVal = $('#email').val();
        $questionVal = $('#question').val();
        $('.review-request .review-text').text($reqVal);
        $('.review-name .review-text').text($nameVal);
        $('.review-company .review-text').text($companyVal);
        $('.review-email .review-text').text($emailVal);
        $('.review-question .review-text').text($questionVal);
      }; //validate


      $.validator.setDefaults({
        submitHandler: function submitHandler() {
          alert("submitted!");
        }
      });
      $("#contact--form").validate({
        focusInvalid: false,
        ignore: '',
        rules: {
          //key is name of input
          request_hidden: "required",
          name: "required",
          company: "required",
          email: {
            required: true,
            email: true,
            maxlength: 255
          },
          question: {
            required: true,
            minlength: 2
          }
        },
        messages: {
          //key is name of input
          request_hidden: "",
          // request: "お問い合わせ項目を選択してください。",
          name: "お名前を入力してください。",
          company: "貴社名を入力してください。",
          email: {
            required: "メールアドレスを入力してください。",
            email: "正しいメールアドレスを入力してください。",
            maxlength: "正しいメールアドレスを入力してください。"
          },
          question: {
            required: "お問い合わせ内容を入力してください。",
            minlength: "少なくとも二文字以上"
          }
        },
        errorElement: "span",
        errorContainer: '.notice-error',
        errorPlacement: function errorPlacement(error, element) {
          // Add the class to the error element
          error.addClass("required-notice");

          if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
          } else {
            error.insertAfter(element);
          }
        },
        highlight: function highlight(element, errorClass, validClass) {
          $(element).addClass("has-error");
        },
        unhighlight: function unhighlight(element, errorClass, validClass) {
          $(element).removeClass("has-error");
        },
        submitHandler: function submitHandler() {
          setPreviewValue();
          $('#js_contact_confirm').addClass('show');
        }
      }); // --------------------- add event ---------------------------------
      // --------------------- add event ---------------------------------

      $('.btn_accept_send').click(function () {
        submitCallBack();
        $('#js_contact_confirm').removeClass('show');
      });
      $('.btn_cancel_send').click(function () {
        closeCallBack();
        $('#js_contact_confirm').removeClass('show');
      });
      $(document).on('click', '.contact_reset', function () {
        $('#js_mail_result').removeClass('show');
      });
    }); // select date 

    $(function () {
      if ($('#js-select-date').length) {
        var Year = $('#year'),
            Month = $('#month'),
            Day = $('#day'),
            daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            thisYear = new Date().getFullYear(),
            reCruitFrom = thisYear - 60,
            reCruitTo = thisYear - 20,
            listYear = [],
            isLeapYear = function isLeapYear(year) {
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        },
            appendOption = function appendOption(elm, value) {
          var value = value || '';
          elm.append("<option value=\"".concat(value, "\" >").concat(value, "</option>"));
        },
            changeMonth = function changeMonth() {
          var yealVal = Year.val(),
              monthVal = Month.val(),
              dayVal = Day.val(),
              dayInMonth;

          if (monthVal == 2) {
            isLeapYear(yealVal) ? daysInMonth[1] = 29 : daysInMonth[1] = 28;
          }

          totalDay = daysInMonth[monthVal - 1];

          if (!monthVal) {
            return;
          } else {
            //selected < days in month
            var lastOptionVal = Day.find('option').last().val();

            if (lastOptionVal < totalDay) {
              while (lastOptionVal < totalDay) {
                appendOption(Day, ++lastOptionVal);
              }
            } else if (lastOptionVal > totalDay) {
              while (lastOptionVal > totalDay) {
                Day.find('option').last().remove();
                lastOptionVal--;
              }
            }

            return;
          }
        },
            testSelectDate = function testSelectDate() {
          $('body').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>');
          setTimeout(function () {
            var yealVal = Year.val(),
                monthVal = Month.val(),
                dayVal = Day.val(),
                date = moment("".concat(dayVal, ".").concat(monthVal, ".").concat(yealVal), 'DD.MM.YYYY');
            console.log('test select :', date.isValid());
          }, 500);
        };

        for (var i = reCruitFrom; i <= reCruitTo; i++) {
          listYear.push(i);
        } //init render:
        //-render year


        appendOption(Year);
        listYear.forEach(function (item, index) {
          //render year
          appendOption(Year, item);
        }); //-render month

        appendOption(Month);

        for (var _i = 1; _i <= 12; _i++) {
          appendOption(Month, _i);
        } //-render day


        appendOption(Day);

        for (var _i2 = 1; _i2 <= 31; _i2++) {
          appendOption(Day, _i2);
        } //handle


        Year.on('change', changeMonth);
        Month.on('change', changeMonth); //test
        // $('#year, #month, #day').on('change', testSelectDate);
      }
    });

    var validateInput = function validateInput() {}; //step nav


    $('.step-nav').on('click', "a", function () {
      var targetHref = $(this).attr('href');

      if (targetHref == "#tab2" && !validateInput()) {
        return;
      }

      var target = $(targetHref);
      target.siblings().removeClass('in');
      setTimeout(function () {
        target.siblings().removeClass('active');
      }, 100);
      target.addClass('active');
      setTimeout(function () {
        target.addClass('in');
      }, 100); // $(`a[href='${target}']`).trigger('click');

      var nav = $('.js-tabnav');
      $(nav).find('.active').removeClass('active');
      nav.find("a[href=\"".concat(targetHref, "\"]")).parent().addClass('active');
    }); //maps

    function myMap() {
      var mapElem = document.getElementById("googleMap");

      if (mapElem) {
        var myLatLng = {
          lat: 35.527735,
          lng: 139.699773
        };
        var mapProp = {
          center: new google.maps.LatLng(myLatLng),
          zoom: 16,
          styles: [{
            elementType: 'labels.text.fill',
            stylers: [{
              color: '#7c9eb0'
            }]
          }, {
            elementType: 'geometry.fill',
            stylers: [{
              color: '#ecf1f3'
            }]
          }, {
            elementType: 'geometry.stroke',
            stylers: [{
              color: '#98bbce'
            }]
          }, // {
          //   featureType: '-----------------',
          //   elementType: 'geometry.fill',
          //   stylers: [{color: '#00ff00'}]
          // },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{
              color: '#c1d1d9'
            }]
          }, {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [{
              color: '#ffffff'
            }]
          }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
              color: '#80a0b2'
            }]
          }, {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{
              color: '#d5dfe5'
            }]
          }, {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{
              color: '#638ba1'
            }]
          }]
        };
        var map = new google.maps.Map(mapElem, mapProp);
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
        marker.setMap(map);
      }
    }

    var postal_code = require('japan-postal-code');

    $('.btn-gray').click(function (e) {
      e.preventDefault();
      var first3 = $('#p-code1').val();
      var last4 = $('#p-code2').val();
      var zipCode = first3 + last4;
      console.log(zipCode);
      postal_code.get(zipCode, function (address) {
        console.log(address);
        console.log(address.prefecture); // => "東京都"

        console.log(address.city); // => "千代田区"

        console.log(address.area); // => "千代田"

        console.log(address.street); // => ""
      });
    });
  }, {
    "japan-postal-code": 4
  }],
  2: [function (require, module, exports) {
    (function (process) {
      /**
       * This is the web browser implementation of `debug()`.
       *
       * Expose `debug()` as the module.
       */
      exports = module.exports = require('./debug');
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
      /**
       * Colors.
       */

      exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];
      /**
       * Currently only WebKit-based Web Inspectors, Firefox >= v31,
       * and the Firebug extension (any Firefox version) are known
       * to support "%c" CSS customizations.
       *
       * TODO: add a `localStorage` variable to explicitly enable/disable colors
       */

      function useColors() {
        // NB: In an Electron preload script, document will be defined but not fully
        // initialized. Since we know we're in Chrome, we'll just detect this case
        // explicitly
        if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
          return true;
        } // is webkit? http://stackoverflow.com/a/16459606/376773
        // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


        return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
        typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      /**
       * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
       */


      exports.formatters.j = function (v) {
        try {
          return JSON.stringify(v);
        } catch (err) {
          return '[UnexpectedJSONParseError]: ' + err.message;
        }
      };
      /**
       * Colorize log arguments if enabled.
       *
       * @api public
       */


      function formatArgs(args) {
        var useColors = this.useColors;
        args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
        if (!useColors) return;
        var c = 'color: ' + this.color;
        args.splice(1, 0, c, 'color: inherit'); // the final "%c" is somewhat tricky, because there could be other
        // arguments passed either before or after the %c, so we need to
        // figure out the correct index to insert the CSS into

        var index = 0;
        var lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, function (match) {
          if ('%%' === match) return;
          index++;

          if ('%c' === match) {
            // we only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      /**
       * Invokes `console.log()` when available.
       * No-op when `console.log` is not a "function".
       *
       * @api public
       */


      function log() {
        // this hackery is required for IE8/9, where
        // the `console.log` function doesn't have 'apply'
        return 'object' === (typeof console === "undefined" ? "undefined" : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
      }
      /**
       * Save `namespaces`.
       *
       * @param {String} namespaces
       * @api private
       */


      function save(namespaces) {
        try {
          if (null == namespaces) {
            exports.storage.removeItem('debug');
          } else {
            exports.storage.debug = namespaces;
          }
        } catch (e) {}
      }
      /**
       * Load `namespaces`.
       *
       * @return {String} returns the previously persisted debug modes
       * @api private
       */


      function load() {
        var r;

        try {
          r = exports.storage.debug;
        } catch (e) {} // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


        if (!r && typeof process !== 'undefined' && 'env' in process) {
          r = process.env.DEBUG;
        }

        return r;
      }
      /**
       * Enable namespaces listed in `localStorage.debug` initially.
       */


      exports.enable(load());
      /**
       * Localstorage attempts to return the localstorage.
       *
       * This is necessary because safari throws
       * when a user disables cookies/localstorage
       * and you attempt to access it.
       *
       * @return {LocalStorage}
       * @api private
       */

      function localstorage() {
        try {
          return window.localStorage;
        } catch (e) {}
      }
    }).call(this, require("qC859L"));
  }, {
    "./debug": 3,
    "qC859L": 7
  }],
  3: [function (require, module, exports) {
    /**
     * This is the common logic for both the Node.js and web browser
     * implementations of `debug()`.
     *
     * Expose `debug()` as the module.
     */
    exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require('ms');
    /**
     * The currently active debug mode names, and names to skip.
     */

    exports.names = [];
    exports.skips = [];
    /**
     * Map of special "%n" handling functions, for the debug "format" argument.
     *
     * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
     */

    exports.formatters = {};
    /**
     * Previous log timestamp.
     */

    var prevTime;
    /**
     * Select a color.
     * @param {String} namespace
     * @return {Number}
     * @api private
     */

    function selectColor(namespace) {
      var hash = 0,
          i;

      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    /**
     * Create a debugger with the given `namespace`.
     *
     * @param {String} namespace
     * @return {Function}
     * @api public
     */


    function createDebug(namespace) {
      function debug() {
        // disabled?
        if (!debug.enabled) return;
        var self = debug; // set `diff` timestamp

        var curr = +new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr; // turn the `arguments` into a proper Array

        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }

        args[0] = exports.coerce(args[0]);

        if ('string' !== typeof args[0]) {
          // anything else let's inspect with %O
          args.unshift('%O');
        } // apply any `formatters` transformations


        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
          // if we encounter an escaped % then don't increase the array index
          if (match === '%%') return match;
          index++;
          var formatter = exports.formatters[format];

          if ('function' === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val); // now we need to remove `args[index]` since it's inlined in the `format`

            args.splice(index, 1);
            index--;
          }

          return match;
        }); // apply env-specific formatting (colors, etc.)

        exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }

      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace); // env-specific initialization logic for debug instances

      if ('function' === typeof exports.init) {
        exports.init(debug);
      }

      return debug;
    }
    /**
     * Enables a debug mode by namespaces. This can include modes
     * separated by a colon and wildcards.
     *
     * @param {String} namespaces
     * @api public
     */


    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
      var len = split.length;

      for (var i = 0; i < len; i++) {
        if (!split[i]) continue; // ignore empty strings

        namespaces = split[i].replace(/\*/g, '.*?');

        if (namespaces[0] === '-') {
          exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
        } else {
          exports.names.push(new RegExp('^' + namespaces + '$'));
        }
      }
    }
    /**
     * Disable debug output.
     *
     * @api public
     */


    function disable() {
      exports.enable('');
    }
    /**
     * Returns true if the given mode name is enabled, false otherwise.
     *
     * @param {String} name
     * @return {Boolean}
     * @api public
     */


    function enabled(name) {
      var i, len;

      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }

      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }

      return false;
    }
    /**
     * Coerce `val`.
     *
     * @param {Mixed} val
     * @return {Mixed}
     * @api private
     */


    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }, {
    "ms": 6
  }],
  4: [function (require, module, exports) {
    /* ================================================================ *
        ajaxzip3.js ---- AjaxZip3 郵便番号→住所変換ライブラリ
    
        Copyright (c) 2015 MIZUNO Hiroki
        http://github.com/mzp/japan-postal-code
    
        Copyright (c) 2008-2015 Ninkigumi Co.,Ltd.
        http://ajaxzip3.github.io/
    
        Copyright (c) 2006-2007 Kawasaki Yusuke <u-suke [at] kawa.net>
        http://www.kawa.net/works/ajax/AjaxZip2/AjaxZip2.html
    
        Permission is hereby granted, free of charge, to any person
        obtaining a copy of this software and associated documentation
        files (the "Software"), to deal in the Software without
        restriction, including without limitation the rights to use,
        copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the
        Software is furnished to do so, subject to the following
        conditions:
    
        The above copyright notice and this permission notice shall be
        included in all copies or substantial portions of the Software.
    
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
        OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
        HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
        WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
        OTHER DEALINGS IN THE SOFTWARE.
    * ================================================================ */
    var jsonp = require('jsonp'),
        JSONDATA = 'https://yubinbango.github.io/yubinbango-data/data',
        CACHE = [],
        PREFMAP = [null, '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'];

    exports.get = function (zip_code, callback) {
      // 郵便番号を数字のみ7桁取り出す
      //    var zipoptimize = function(AjaxZip3.fzip1, AjaxZip3.fzip2){
      var vzip = zip_code;
      if (!vzip) return; // extract number only

      var nzip = '';

      for (var i = 0; i < vzip.length; i++) {
        var chr = vzip.charCodeAt(i);
        if (chr < 48) continue;
        if (chr > 57) continue;
        nzip += vzip.charAt(i);
      }

      if (nzip.length < 7) return; // fetch from cache data using upper 3 digit

      var zip3 = nzip.substr(0, 3);
      var data = CACHE[zip3];
      if (data) return parse(nzip, data, callback); // fetch by jsonp

      fetchRemote(nzip, callback);
    };

    var parse = function parse(nzip, data, callback) {
      var array = data[nzip]; // Opera バグ対策：0x00800000 を超える添字は +0xff000000 されてしまう

      var opera = nzip - 0 + 0xff000000 + "";
      if (!array && data[opera]) array = data[opera];
      if (!array) return;
      var pref_id = array[0]; // 都道府県ID

      if (!pref_id) return;
      var jpref = PREFMAP[pref_id]; // 都道府県名

      if (!jpref) return;
      var jcity = array[1];
      if (!jcity) jcity = ''; // 市区町村名

      var jarea = array[2];
      if (!jarea) jarea = ''; // 町域名

      var jstrt = array[3];
      if (!jstrt) jstrt = ''; // 番地

      callback({
        'prefecture': jpref,
        'city': jcity,
        'area': jarea,
        'street': jstrt
      });
    };

    var fetchRemote = function fetchRemote(nzip, callback) {
      var zip3 = nzip.substr(0, 3);
      var url = JSONDATA + '/' + zip3 + '.js';
      jsonp(url, {
        name: '$yubin'
      }, function (error, data) {
        if (!error) {
          CACHE[zip3] = data;
          parse(nzip, data, callback);
        }
      });
    };
  }, {
    "jsonp": 5
  }],
  5: [function (require, module, exports) {
    /**
     * Module dependencies
     */
    var debug = require('debug')('jsonp');
    /**
     * Module exports.
     */


    module.exports = jsonp;
    /**
     * Callback index.
     */

    var count = 0;
    /**
     * Noop function.
     */

    function noop() {}
    /**
     * JSONP handler
     *
     * Options:
     *  - param {String} qs parameter (`callback`)
     *  - prefix {String} qs parameter (`__jp`)
     *  - name {String} qs parameter (`prefix` + incr)
     *  - timeout {Number} how long after a timeout error is emitted (`60000`)
     *
     * @param {String} url
     * @param {Object|Function} optional options / callback
     * @param {Function} optional callback
     */


    function jsonp(url, opts, fn) {
      if ('function' == typeof opts) {
        fn = opts;
        opts = {};
      }

      if (!opts) opts = {};
      var prefix = opts.prefix || '__jp'; // use the callback name that was passed if one was provided.
      // otherwise generate a unique name by incrementing our counter.

      var id = opts.name || prefix + count++;
      var param = opts.param || 'callback';
      var timeout = null != opts.timeout ? opts.timeout : 60000;
      var enc = encodeURIComponent;
      var target = document.getElementsByTagName('script')[0] || document.head;
      var script;
      var timer;

      if (timeout) {
        timer = setTimeout(function () {
          cleanup();
          if (fn) fn(new Error('Timeout'));
        }, timeout);
      }

      function cleanup() {
        if (script.parentNode) script.parentNode.removeChild(script);
        window[id] = noop;
        if (timer) clearTimeout(timer);
      }

      function cancel() {
        if (window[id]) {
          cleanup();
        }
      }

      window[id] = function (data) {
        debug('jsonp got', data);
        cleanup();
        if (fn) fn(null, data);
      }; // add qs component


      url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
      url = url.replace('?&', '?');
      debug('jsonp req "%s"', url); // create script

      script = document.createElement('script');
      script.src = url;
      target.parentNode.insertBefore(script, target);
      return cancel;
    }
  }, {
    "debug": 2
  }],
  6: [function (require, module, exports) {
    /**
     * Helpers.
     */
    var s = 1000;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    /**
     * Parse or format the given `val`.
     *
     * Options:
     *
     *  - `long` verbose formatting [false]
     *
     * @param {String|Number} val
     * @param {Object} [options]
     * @throws {Error} throw an error if val is not a non-empty string or a number
     * @return {String|Number}
     * @api public
     */

    module.exports = function (val, options) {
      options = options || {};

      var type = _typeof(val);

      if (type === 'string' && val.length > 0) {
        return parse(val);
      } else if (type === 'number' && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }

      throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
    };
    /**
     * Parse the given `str` and return milliseconds.
     *
     * @param {String} str
     * @return {Number}
     * @api private
     */


    function parse(str) {
      str = String(str);

      if (str.length > 100) {
        return;
      }

      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);

      if (!match) {
        return;
      }

      var n = parseFloat(match[1]);
      var type = (match[2] || 'ms').toLowerCase();

      switch (type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
          return n * y;

        case 'days':
        case 'day':
        case 'd':
          return n * d;

        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
          return n * h;

        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
          return n * m;

        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
          return n * s;

        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
          return n;

        default:
          return undefined;
      }
    }
    /**
     * Short format for `ms`.
     *
     * @param {Number} ms
     * @return {String}
     * @api private
     */


    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + 'd';
      }

      if (ms >= h) {
        return Math.round(ms / h) + 'h';
      }

      if (ms >= m) {
        return Math.round(ms / m) + 'm';
      }

      if (ms >= s) {
        return Math.round(ms / s) + 's';
      }

      return ms + 'ms';
    }
    /**
     * Long format for `ms`.
     *
     * @param {Number} ms
     * @return {String}
     * @api private
     */


    function fmtLong(ms) {
      return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
    }
    /**
     * Pluralization helper.
     */


    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }

      if (ms < n * 1.5) {
        return Math.floor(ms / n) + ' ' + name;
      }

      return Math.ceil(ms / n) + ' ' + name + 's';
    }
  }, {}],
  7: [function (require, module, exports) {
    // shim for using process in browser
    var process = module.exports = {};

    process.nextTick = function () {
      var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
      var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

      if (canSetImmediate) {
        return function (f) {
          return window.setImmediate(f);
        };
      }

      if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
          var source = ev.source;

          if ((source === window || source === null) && ev.data === 'process-tick') {
            ev.stopPropagation();

            if (queue.length > 0) {
              var fn = queue.shift();
              fn();
            }
          }
        }, true);
        return function nextTick(fn) {
          queue.push(fn);
          window.postMessage('process-tick', '*');
        };
      }

      return function nextTick(fn) {
        setTimeout(fn, 0);
      };
    }();

    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;

    process.binding = function (name) {
      throw new Error('process.binding is not supported');
    }; // TODO(shtylman)


    process.cwd = function () {
      return '/';
    };

    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
    };
  }, {}]
}, {}, [1]);