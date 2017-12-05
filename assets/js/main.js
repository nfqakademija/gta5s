window.$ = window.jQuery = require("jquery");

require("bootstrap-sass");

if (url) {
    var urllocal = global.__URL__;
    delete global.__URL__;
}

import "./reactApp/index";