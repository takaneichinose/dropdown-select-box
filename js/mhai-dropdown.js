var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

MhaiCombobox = function () {
  function MhaiCombobox(elm) {_classCallCheck(this, MhaiCombobox);
    this.elm = elm;
    this.combo = document.querySelector(elm);
    this.input = null;
    this.hidden = null;
    this.options = null;
    this.option = null;
    this.caret = null;
    this.data = null;
    this.valueName = null;
    this.textName = null;
    this.optionCount = null;
    this.transitionTime = null;
    this.inputTime = null;
    this.caseSensitive = null;
    this.closeOnSelect = null;
    this.placeholder = null;
    this.errorCallback = null;
    this.optionsBorder = null;
    this.shown = false;
    this.onprocess = false;
    this.inputTimeout = null;
    this.active = null;
    this.optionsHeight = 0;
  }_createClass(MhaiCombobox, [{ key: 'init', value: function init(

    options) {
      var t = this;

      t.data = typeof options !== 'undefined' && typeof options.data !== 'undefined' ? options.data : null;
      t.valueName = typeof options !== 'undefined' && typeof options.valueName !== 'undefined' ? options.valueName : null;
      t.textName = typeof options !== 'undefined' && typeof options.textName !== 'undefined' ? options.textName : null;
      t.optionCount = typeof options !== 'undefined' && typeof options.optionCount !== 'undefined' ? options.optionCount : 10;
      t.transitionTime = typeof options !== 'undefined' && typeof options.transitionTime !== 'undefined' ? options.transitionTime : 300;
      t.inputTime = typeof options !== 'undefined' && typeof options.inputTime !== 'undefined' ? options.inputTime : 500;
      t.caseSensitive = typeof options !== 'undefined' && typeof options.caseSensitive !== 'undefined' ? options.caseSensitive : false;
      t.closeOnSelect = typeof options !== 'undefined' && typeof options.closeOnSelect !== 'undefined' ? options.closeOnSelect : true;
      t.placeholder = typeof options !== 'undefined' && typeof options.placeholder !== 'undefined' ? options.placeholder : null;
      t.errorCallback = typeof options !== 'undefined' && typeof options.errorCallback !== 'undefined' ? options.errorCallback : null;
      // XXX: This is just a workaround to get the border size of options element.
      t.optionsBorder = typeof options !== 'undefined' && typeof options.optionsBorder !== 'undefined' ? options.optionsBorder : 1;

      t.createElms(function () {
        t.createEvents();
      });
    } }, { key: 'createElms', value: function createElms(

    callback) {
      this.input = document.createElement('input');
      this.options = document.createElement('div');
      this.caret = document.createElement('a');

      this.input.setAttribute('type', 'text');
      this.input.classList.add('mhai-text');

      if (this.textName !== null) {
        this.input.setAttribute('name', this.textName);
        this.input.setAttribute('autocomplete', 'off');

        if (this.placeholder !== null) {
          this.input.setAttribute('placeholder', this.placeholder);
        }
      }

      this.options.classList.add('mhai-options');
      this.options.setAttribute('tabindex', -1);

      this.caret.classList.add('mhai-caret');
      this.caret.setAttribute('tabindex', -1);

      this.combo.appendChild(this.input);
      this.combo.appendChild(this.options);
      this.combo.appendChild(this.caret);

      if (this.valueName !== null) {
        this.hidden = document.createElement('input');

        this.hidden.setAttribute('type', 'hidden');
        this.hidden.setAttribute('name', this.valueName);

        this.combo.appendChild(this.hidden);
      }

      callback();
    } }, { key: 'hideOptions', value: function hideOptions()

    {var _this = this;
      this.options.style.height = '0px';

      setTimeout(function () {
        _this.shown = false;
        _this.onprocess = false;
        _this.options.innerHTML = '';
        _this.optionsHeight = 0;

        _this.options.classList.remove('mhai-options-top');
        _this.options.classList.remove('mhai-options-bottom');
      }, this.transitionTime);
    } }, { key: 'toggleOptions', value: function toggleOptions(

    i, value) {var _this2 = this;var j = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      if (this.shown === false) {
        setTimeout(function () {
          if (i < _this2.data.length) {
            var data = _this2.data[i];
            var text = _this2.caseSensitive === true ? data.text : data.text.toLowerCase();
            var input = _this2.caseSensitive === true ? value : value.toLowerCase();

            if (text.indexOf(input) >= 0) {
              var option = document.createElement('a');

              option.classList.add('mhai-option');

              if (_this2.valueName !== null && _this2.hidden.value === data.value) {
                option.classList.add('mhai-active');

                _this2.active = option;
              }

              option.dataset.mhaiValue = data.value;
              option.dataset.mhaiText = data.text;
              option.innerText = data.text;

              _this2.options.appendChild(option);

              option.addEventListener('click', function (evt) {
                if (_this2.valueName !== null) {
                  _this2.hidden.value = data.value;
                }

                if (_this2.textName !== null) {
                  _this2.input.value = data.text;
                }

                option.classList.add('mhai-active');

                _this2.active = option;

                if (_this2.closeOnSelect === true) {
                  _this2.hideOptions();
                }
              });

              if (j < _this2.optionCount) {
                _this2.optionsHeight += option.offsetHeight;

                j++;
              }
            }

            _this2.toggleOptions(i + 1, value, j);
          } else
          {
            _this2.option = document.querySelectorAll(_this2.elm + ' div.mhai-options a.mhai-option');

            _this2.options.style.height = _this2.optionsHeight + _this2.optionsBorder + 'px';

            if (_this2.active !== null) {
              _this2.options.scrollTop = _this2.optionScroll(_this2.active);
            }

            _this2.options.classList.add('mhai-options-bottom');

            setTimeout(function () {
              _this2.shown = true;
              _this2.onprocess = false;
            }, _this2.transitionTime);
          }
        }, 0);
      } else
      {
        this.hideOptions();
      }
    } }, { key: 'optionScroll', value: function optionScroll(

    elm) {
      var scroll = 0;

      try {
        if (this.options.scrollTop + this.options.offsetHeight - this.optionsBorder <= elm.offsetTop) {
          scroll = elm.offsetTop - this.options.offsetHeight + this.optionsBorder + elm.offsetHeight;
        } else
        if (this.options.scrollTop > elm.offsetTop) {
          scroll = elm.offsetTop;
        } else
        {
          scroll = this.options.scrollTop;
        }
      }
      catch (e) {
        if (this.errorCallback !== null) {
          this.errorCallback('Result not found');
        }
      }

      return scroll;
    } }, { key: 'optionSelection', value: function optionSelection(

    y) {
      var focusElm = null;
      var setScroll = 0;

      if (this.active !== null) {
        this.active.classList.remove('mhai-active');
      }

      if (y === true) {
        if (this.active === null || this.active.nextElementSibling === null) {
          this.active = this.option[0];
        } else
        {
          this.active = this.active.nextElementSibling;
        }
      } else
      {
        if (this.active === null || this.active.previousElementSibling === null) {
          this.active = this.option[this.option.length - 1];
        } else
        {
          this.active = this.active.previousElementSibling;
        }
      }

      setScroll = this.optionScroll(this.active);

      this.active.classList.add('mhai-active');

      this.options.scrollTop = setScroll;
    } }, { key: 'createEvents', value: function createEvents()

    {var _this3 = this;
      ['click', 'scroll', 'blur'].forEach(function (evt) {
        window.addEventListener(evt, function () {
          _this3.hideOptions();
        });
      });

      this.combo.addEventListener('click', function (evt) {
        evt.stopPropagation();
      });

      this.input.addEventListener('input', function (evt) {
        if (_this3.data.length !== null) {
          if (_this3.inputTimeout !== null) {
            clearTimeout(_this3.inputTimeout);
          }

          _this3.inputTimeout = setTimeout(function () {
            _this3.shown = false;
            _this3.onprocess = false;
            _this3.optionsHeight = 0;
            _this3.active = null;
            _this3.options.innerHTML = '';

            if (_this3.valueName !== null) {
              _this3.hidden.value = '';
            }

            _this3.toggleOptions(0, _this3.input.value);
          }, _this3.inputTime);
        }
      });

      this.input.addEventListener('keydown', function (evt) {
        if (_this3.shown === true) {
          if (evt.keyCode === 9) {
            if (_this3.valueName !== null && _this3.active == null) {
              evt.preventDefault();

              if (_this3.errorCallback !== null) {
                _this3.errorCallback('Value not found');
              }
            } else
            {
              _this3.hideOptions();
            }
          } else
          if (evt.keyCode === 13) {
            evt.preventDefault();

            var data = _this3.active.dataset;

            if (_this3.valueName !== null) {
              _this3.hidden.value = data.mhaiValue;
            }

            if (_this3.textName !== null) {
              _this3.input.value = data.mhaiText;
            }

            if (_this3.closeOnSelect === true) {
              _this3.hideOptions();
            }
          } else
          if (evt.keyCode === 27) {
            _this3.hideOptions();
          } else
          if (evt.keyCode === 38) {
            _this3.optionSelection(false);
          } else
          if (evt.keyCode === 40) {
            _this3.optionSelection(true);
          }
        } else
        if (_this3.onprocess === false && (evt.keyCode === 38 || evt.keyCode === 40)) {
          _this3.onprocess = true;

          _this3.toggleOptions(0, _this3.input.value);
        }
      });

      this.caret.addEventListener('click', function () {
        if (_this3.data.length !== null && _this3.onprocess === false) {
          _this3.onprocess = true;

          _this3.toggleOptions(0, '');
          _this3.input.focus();
          _this3.input.select();
        }
      });
    } }]);return MhaiCombobox;}();

