var navInit = false;
console.log('this is logged');
function closeAcctModal(e) {
    var t = e.target.id.split("-");
    var n = $("#row-" + t[1] + "-" + t[2]).clone();
    n = n.removeAttr("id");
    $("#" + t[1] + "Modal").foundation("reveal", "close");
    $("[name=" + t[1] + "Hidden]").val(t[3]);
    $("#" + t[1] + "Display").html(n);
    return true
}

function closeLocModal(e) {
    var t = e.target.id.split("-");
    var n = $("#row-" + t[1] + "-" + t[2]).clone();
    n = n.removeAttr("id");
    $("#" + t[1] + "Modal").foundation("reveal", "close");
    $("[name=" + t[1] + "Hidden]").val(t[2]);
    $("#" + t[1] + "Display").html(n);
    return true
}

function acctSearch(e, t) {
    var n = e.value.toUpperCase();
    $(":not(:contains(" + n + '))[id^="row-' + t + '"]').hide();
    $(":contains(" + n + ')[id^="row-' + t + '"]').show()
}

function acctSearchStart(e) {
    $("#" + e + "Search").val("")
}

function acctSearchClear(e) {
    var t = e.target.id.split("-");
    var n = $("input[name=" + t[0] + "HiddenMessage]").val();
    $("[name=" + t[0] + "Hidden]").val("");
    $("#" + t[0] + "Display").html(n);
    return false
}

function openHelpModal(e, t) {
    $("#selectHelpModal").foundation("reveal", "open", {
        url: "/Help/selectHelpModal.faces",
        data: {
            url: window.location.href.toString(),
            topic: e,
            location: t
        }
    })
}

function refreshMyTab(e) {
    if ($("#myTabList").length) {
        $.ajax({
            type: "GET",
            url: "/MyTab/myTabList.faces",
            async: false,
            data: {
                action: e,
                url: window.location.href.toString()
            },
            success: function(e) {
                $("#myTabList").html(e)
            }
        })
    }
}

function openDatePicker(e, t, n, r, i) {
    if (t != "undefined") {
        var s = t.getDate();
        var o = t.getMonth();
        var u = t.getFullYear()
    }
    if (n != "undefined") {
        var a = n.getDate();
        var f = n.getMonth();
        var l = n.getFullYear()
    }
    var c = false;
    var h = e.pickadate({
        format: "mm/dd/yyyy",
        min: t == "undefined" ? undefined : new Date(u, o, s),
        max: n == "undefined" ? undefined : new Date(l, f, a),
        today: "Today",
        clear: "Clear",
        selectMonths: i == true ? true : undefined,
        selectYears: r == true ? true : undefined,
        onClose: function(e) {
            this.$node.blur()
        },
        onOpen: function() {
            if (c == true && isIEgt8()) {
                console.log("IE 9 or above");
                var e = h.pickadate("picker");
                e.close();
                c = false
            }
        },
        onSet: function(e) {
            c = true
        }
    })
}

function opentimePicker(e, t, n, r, i, s) {
    var o = false;
    var u = e.pickatime({
        interval: t,
        min: [n, r],
        max: [i, s],
        format: "h:i",
        onClose: function(e) {
            this.$node.blur()
        },
        onOpen: function() {
            if (o == true && isIEgt8()) {
                var e = u.pickatime("picker");
                e.close();
                o = false
            }
        },
        onSet: function(e) {
            o = true
        }
    })
}

function isIEgt8() {
    var e = navigator.appVersion;
    var t = 8;
    if (navigator.appVersion.indexOf("MSIE") != -1) {
        var n = e.split("MSIE");
        t = n[1].split(".");
        if (t[0] >= 9) return true
    }
    return false
}
var libFuncName = null;
if (typeof jQuery === "undefined" && typeof Zepto === "undefined" && typeof $ === "function") {
    libFuncName = $
} else if (typeof jQuery === "function") {
    libFuncName = jQuery
} else if (typeof Zepto === "function") {
    libFuncName = Zepto
} else {
    throw new TypeError
}
(function(e, t, n, r) {
    "use strict";
    e("head").append('<meta class="foundation-mq-small">');
    e("head").append('<meta class="foundation-mq-medium">');
    e("head").append('<meta class="foundation-mq-large">');
    t.matchMedia = t.matchMedia || function(e, t) {
        "use strict";
        var n, r = e.documentElement,
            i = r.firstElementChild || r.firstChild,
            s = e.createElement("body"),
            o = e.createElement("div");
        o.id = "mq-test-1";
        o.style.cssText = "position:absolute;top:-100em";
        s.style.background = "none";
        s.appendChild(o);
        return function(e) {
            o.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>';
            r.insertBefore(s, i);
            n = o.offsetWidth === 42;
            r.removeChild(s);
            return {
                matches: n,
                media: e
            }
        }
    }(n);
    if (!Array.prototype.filter) {
        Array.prototype.filter = function(e) {
            "use strict";
            if (this == null) {
                throw new TypeError
            }
            var t = Object(this),
                n = t.length >>> 0;
            if (typeof e !== "function") {
                return
            }
            var r = [],
                i = arguments[1];
            for (var s = 0; s < n; s++) {
                if (s in t) {
                    var o = t[s];
                    if (e && e.call(i, o, s, t)) {
                        r.push(o)
                    }
                }
            }
            return r
        }
    }
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(e) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
            }
            var t = Array.prototype.slice.call(arguments, 1),
                n = this,
                r = function() {},
                i = function() {
                    return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
                };
            r.prototype = this.prototype;
            i.prototype = new r;
            return i
        }
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(e) {
            "use strict";
            if (this == null) {
                throw new TypeError
            }
            var t = Object(this);
            var n = t.length >>> 0;
            if (n === 0) {
                return -1
            }
            var r = 0;
            if (arguments.length > 1) {
                r = Number(arguments[1]);
                if (r != r) {
                    r = 0
                } else if (r != 0 && r != Infinity && r != -Infinity) {
                    r = (r > 0 || -1) * Math.floor(Math.abs(r))
                }
            }
            if (r >= n) {
                return -1
            }
            var i = r >= 0 ? r : Math.max(n - Math.abs(r), 0);
            for (; i < n; i++) {
                if (i in t && t[i] === e) {
                    return i
                }
            }
            return -1
        }
    }
    e.fn.stop = e.fn.stop || function() {
        return this
    };
    t.Foundation = {
        name: "Foundation",
        version: "4.3.2",
        cache: {},
        media_queries: {
            small: e(".foundation-mq-small").css("font-family").replace(/\'/g, ""),
            medium: e(".foundation-mq-medium").css("font-family").replace(/\'/g, ""),
            large: e(".foundation-mq-large").css("font-family").replace(/\'/g, "")
        },
        stylesheet: e("<style></style>").appendTo("head")[0].sheet,
        init: function(t, n, r, i, s, o) {
            var u, a = [t, r, i, s],
                f = [],
                o = o || false;
            if (o) this.nc = o;
            this.rtl = /rtl/i.test(e("html").attr("dir"));
            this.scope = t || this.scope;
            if (n && typeof n === "string" && !/reflow/i.test(n)) {
                if (/off/i.test(n)) return this.off();
                u = n.split(" ");
                if (u.length > 0) {
                    for (var l = u.length - 1; l >= 0; l--) {
                        f.push(this.init_lib(u[l], a))
                    }
                }
            } else {
                if (/reflow/i.test(n)) a[1] = "reflow";
                for (var c in this.libs) {
                    f.push(this.init_lib(c, a))
                }
            }
            if (typeof n === "function") {
                a.unshift(n)
            }
            return this.response_obj(f, a)
        },
        response_obj: function(e, t) {
            for (var n = 0, r = t.length; n < r; n++) {
                if (typeof t[n] === "function") {
                    return t[n]({
                        errors: e.filter(function(e) {
                            if (typeof e === "string") return e
                        })
                    })
                }
            }
            return e
        },
        init_lib: function(e, t) {
            return this.trap(function() {
                if (this.libs.hasOwnProperty(e)) {
                    this.patch(this.libs[e]);
                    return this.libs[e].init.apply(this.libs[e], t)
                } else {
                    return function() {}
                }
            }.bind(this), e)
        },
        trap: function(e, t) {
            if (!this.nc) {
                try {
                    return e()
                } catch (n) {
                    return this.error({
                        name: t,
                        message: "could not be initialized",
                        more: n.name + " " + n.message
                    })
                }
            }
            return e()
        },
        patch: function(e) {
            this.fix_outer(e);
            e.scope = this.scope;
            e.rtl = this.rtl
        },
        inherit: function(e, t) {
            var n = t.split(" ");
            for (var r = n.length - 1; r >= 0; r--) {
                if (this.lib_methods.hasOwnProperty(n[r])) {
                    this.libs[e.name][n[r]] = this.lib_methods[n[r]]
                }
            }
        },
        random_str: function(e) {
            var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
            if (!e) {
                e = Math.floor(Math.random() * t.length)
            }
            var n = "";
            for (var r = 0; r < e; r++) {
                n += t[Math.floor(Math.random() * t.length)]
            }
            return n
        },
        libs: {},
        lib_methods: {
            set_data: function(e, t) {
                var n = [this.name, +(new Date), Foundation.random_str(5)].join("-");
                Foundation.cache[n] = t;
                e.attr("data-" + this.name + "-id", n);
                return t
            },
            get_data: function(e) {
                return Foundation.cache[e.attr("data-" + this.name + "-id")]
            },
            remove_data: function(t) {
                if (t) {
                    delete Foundation.cache[t.attr("data-" + this.name + "-id")];
                    t.attr("data-" + this.name + "-id", "")
                } else {
                    e("[data-" + this.name + "-id]").each(function() {
                        delete Foundation.cache[e(this).attr("data-" + this.name + "-id")];
                        e(this).attr("data-" + this.name + "-id", "")
                    })
                }
            },
            throttle: function(e, t) {
                var n = null;
                return function() {
                    var r = this,
                        i = arguments;
                    clearTimeout(n);
                    n = setTimeout(function() {
                        e.apply(r, i)
                    }, t)
                }
            },
            data_options: function(t) {
                function u(e) {
                    return !isNaN(e - 0) && e !== null && e !== "" && e !== false && e !== true
                }

                function a(t) {
                    if (typeof t === "string") return e.trim(t);
                    return t
                }
                var n = {},
                    r, i, s = (t.attr("data-options") || ":").split(";"),
                    o = s.length;
                for (r = o - 1; r >= 0; r--) {
                    i = s[r].split(":");
                    if (/true/i.test(i[1])) i[1] = true;
                    if (/false/i.test(i[1])) i[1] = false;
                    if (u(i[1])) i[1] = parseInt(i[1], 10);
                    if (i.length === 2 && i[0].length > 0) {
                        n[a(i[0])] = a(i[1])
                    }
                }
                return n
            },
            delay: function(e, t) {
                return setTimeout(e, t)
            },
            scrollTo: function(n, r, i) {
                if (i < 0) return;
                var s = r - e(t).scrollTop();
                var o = s / i * 10;
                this.scrollToTimerCache = setTimeout(function() {
                    if (!isNaN(parseInt(o, 10))) {
                        t.scrollTo(0, e(t).scrollTop() + o);
                        this.scrollTo(n, r, i - 10)
                    }
                }.bind(this), 10)
            },
            scrollLeft: function(e) {
                if (!e.length) return;
                return "scrollLeft" in e[0] ? e[0].scrollLeft : e[0].pageXOffset
            },
            empty: function(e) {
                if (e.length && e.length > 0) return false;
                if (e.length && e.length === 0) return true;
                for (var t in e) {
                    if (hasOwnProperty.call(e, t)) return false
                }
                return true
            },
            addCustomRule: function(e, t) {
                if (t === r) {
                    Foundation.stylesheet.insertRule(e, Foundation.stylesheet.cssRules.length)
                } else {
                    var n = Foundation.media_queries[t];
                    if (n !== r) {
                        Foundation.stylesheet.insertRule("@media " + Foundation.media_queries[t] + "{ " + e + " }")
                    }
                }
            }
        },
        fix_outer: function(e) {
            e.outerHeight = function(e, t) {
                if (typeof Zepto === "function") {
                    return e.height()
                }
                if (typeof t !== "undefined") {
                    return e.outerHeight(t)
                }
                return e.outerHeight()
            };
            e.outerWidth = function(e, t) {
                if (typeof Zepto === "function") {
                    return e.width()
                }
                if (typeof t !== "undefined") {
                    return e.outerWidth(t)
                }
                return e.outerWidth()
            }
        },
        error: function(e) {
            return e.name + " " + e.message + "; " + e.more
        },
        off: function() {
            e(this.scope).off(".fndtn");
            e(t).off(".fndtn");
            return true
        },
        zj: e
    };
    e.fn.foundation = function() {
        var e = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            Foundation.init.apply(Foundation, [this].concat(e));
            return this
        })
    }
})

(libFuncName, this, this.document);
(function(e, t, n, r) {
    "use strict";
    Foundation.libs.reveal = {
        name: "reveal",
        version: "4.3.2",
        locked: false,
        settings: {
            animation: "fadeAndPop",
            animationSpeed: 250,
            closeOnBackgroundClick: true,
            closeOnEsc: true,
            dismissModalClass: "close-reveal-modal",
            bgClass: "reveal-modal-bg",
            open: function() {},
            opened: function() {},
            close: function() {},
            closed: function() {},
            bg: e(".reveal-modal-bg"),
            css: {
                open: {
                    opacity: 0,
                    visibility: "visible",
                    display: "block"
                },
                close: {
                    opacity: 1,
                    visibility: "hidden",
                    display: "none"
                }
            }
        },
        init: function(t, n, r) {
            Foundation.inherit(this, "data_options delay");
            if (typeof n === "object") {
                e.extend(true, this.settings, n)
            } else if (typeof r !== "undefined") {
                e.extend(true, this.settings, r)
            }
            if (typeof n !== "string") {
                this.events();
                return this.settings.init
            } else {
                return this[n].call(this, r)
            }
        },
        events: function() {
            var t = this;
            e(this.scope).off(".fndtn.reveal").on("click.fndtn.reveal", "[data-reveal-id]", function(n) {
                n.preventDefault();
                if (!t.locked) {
                    var r = e(this),
                        i = r.data("reveal-ajax");
                    t.locked = true;
                    if (typeof i === "undefined") {
                        t.open.call(t, r)
                    } else {
                        var s = i === true ? r.attr("href") : i;
                        t.open.call(t, r, {
                            url: s
                        })
                    }
                }
            }).on("click.fndtn.reveal touchend", this.close_targets(), function(n) {
                n.preventDefault();
                if (!t.locked) {
                    var r = e.extend({}, t.settings, t.data_options(e(".reveal-modal.open"))),
                        i = e(n.target)[0] === e("." + r.bgClass)[0];
                    if (i && !r.closeOnBackgroundClick) {
                        return
                    }
                    t.locked = true;
                    t.close.call(t, i ? e(".reveal-modal.open") : e(this).closest(".reveal-modal"))
                }
            });
            if (e(this.scope).hasClass("reveal-modal")) {
                e(this.scope).on("open.fndtn.reveal", this.settings.open).on("opened.fndtn.reveal", this.settings.opened).on("opened.fndtn.reveal", this.open_video).on("close.fndtn.reveal", this.settings.close).on("closed.fndtn.reveal", this.settings.closed).on("closed.fndtn.reveal", this.close_video)
            } else {
                e(this.scope).on("open.fndtn.reveal", ".reveal-modal", this.settings.open).on("opened.fndtn.reveal", ".reveal-modal", this.settings.opened).on("opened.fndtn.reveal", ".reveal-modal", this.open_video).on("close.fndtn.reveal", ".reveal-modal", this.settings.close).on("closed.fndtn.reveal", ".reveal-modal", this.settings.closed).on("closed.fndtn.reveal", ".reveal-modal", this.close_video)
            }
            e("body").bind("keyup.reveal", function(n) {
                var r = e(".reveal-modal.open"),
                    i = e.extend({}, t.settings, t.data_options(r));
                if (n.which === 27 && i.closeOnEsc) {
                    r.foundation("reveal", "close")
                }
            });
            return true
        },
        open: function(t, n) {
            if (t) {
                if (typeof t.selector !== "undefined") {
                    var r = e("#" + t.data("reveal-id"))
                } else {
                    var r = e(this.scope);
                    n = t
                }
            } else {
                var r = e(this.scope)
            }
            if (!r.hasClass("open")) {
                var i = e(".reveal-modal.open");
                if (typeof r.data("css-top") === "undefined") {
                    r.data("css-top", parseInt(r.css("top"), 10)).data("offset", this.cache_offset(r))
                }
                r.trigger("open");
                if (i.length < 1) {
                    this.toggle_bg()
                }
                if (typeof n === "undefined" || !n.url) {
                    this.hide(i, this.settings.css.close);
                    this.show(r, this.settings.css.open)
                } else {
                    var s = this,
                        o = typeof n.success !== "undefined" ? n.success : null;
                    e.extend(n, {
                        success: function(t, n, u) {
                            if (e.isFunction(o)) {
                                o(t, n, u)
                            }
                            r.html(t);
                            e(r).foundation("section", "reflow");
                            s.hide(i, s.settings.css.close);
                            s.show(r, s.settings.css.open)
                        }
                    });
                    e.ajax(n)
                }
            }
        },
        close: function(t) {
            var t = t && t.length ? t : e(this.scope),
                n = e(".reveal-modal.open");
            if (n.length > 0) {
                this.locked = true;
                t.trigger("close");
                this.toggle_bg();
                this.hide(n, this.settings.css.close)
            }
        },
        close_targets: function() {
            var e = "." + this.settings.dismissModalClass;
            if (this.settings.closeOnBackgroundClick) {
                return e + ", ." + this.settings.bgClass
            }
            return e
        },
        toggle_bg: function() {
            if (e("." + this.settings.bgClass).length === 0) {
                this.settings.bg = e("<div />", {
                    "class": this.settings.bgClass
                }).appendTo("body")
            }
            if (this.settings.bg.filter(":visible").length > 0) {
                this.hide(this.settings.bg)
            } else {
                this.show(this.settings.bg)
            }
        },
        show: function(n, r) {
            if (r) {
                if (n.parent("body").length === 0) {
                    var i = n.wrap('<div style="display: none;" />').parent();
                    n.on("closed.fndtn.reveal.wrapped", function() {
                        n.detach().appendTo(i);
                        n.unwrap().unbind("closed.fndtn.reveal.wrapped")
                    });
                    n.detach().appendTo("body")
                }
                if (/pop/i.test(this.settings.animation)) {
                    r.top = e(t).scrollTop() - n.data("offset") + "px";
                    var s = {
                        top: e(t).scrollTop() + n.data("css-top") + "px",
                        opacity: 1
                    };
                    return this.delay(function() {
                        return n.css(r).animate(s, this.settings.animationSpeed, "linear", function() {
                            this.locked = false;
                            n.trigger("opened")
                        }.bind(this)).addClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                if (/fade/i.test(this.settings.animation)) {
                    var s = {
                        opacity: 1
                    };
                    return this.delay(function() {
                        return n.css(r).animate(s, this.settings.animationSpeed, "linear", function() {
                            this.locked = false;
                            n.trigger("opened")
                        }.bind(this)).addClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                return n.css(r).show().css({
                    opacity: 1
                }).addClass("open").trigger("opened")
            }
            if (/fade/i.test(this.settings.animation)) {
                return n.fadeIn(this.settings.animationSpeed / 2)
            }
            return n.show()
        },
        hide: function(n, r) {
            if (r) {
                if (/pop/i.test(this.settings.animation)) {
                    var i = {
                        top: -e(t).scrollTop() - n.data("offset") + "px",
                        opacity: 0
                    };
                    return this.delay(function() {
                        return n.animate(i, this.settings.animationSpeed, "linear", function() {
                            this.locked = false;
                            n.css(r).trigger("closed")
                        }.bind(this)).removeClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                if (/fade/i.test(this.settings.animation)) {
                    var i = {
                        opacity: 0
                    };
                    return this.delay(function() {
                        return n.animate(i, this.settings.animationSpeed, "linear", function() {
                            this.locked = false;
                            n.css(r).trigger("closed")
                        }.bind(this)).removeClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                return n.hide().css(r).removeClass("open").trigger("closed")
            }
            if (/fade/i.test(this.settings.animation)) {
                return n.fadeOut(this.settings.animationSpeed / 2)
            }
            return n.hide()
        },
        close_video: function(t) {
            var n = e(this).find(".flex-video"),
                r = n.find("iframe");
            if (r.length > 0) {
                r.attr("data-src", r[0].src);
                r.attr("src", "about:blank");
                n.hide()
            }
        },
        open_video: function(t) {
            var n = e(this).find(".flex-video"),
                i = n.find("iframe");
            if (i.length > 0) {
                var s = i.attr("data-src");
                if (typeof s === "string") {
                    i[0].src = i.attr("data-src")
                } else {
                    var o = i[0].src;
                    i[0].src = r;
                    i[0].src = o
                }
                n.show()
            }
        },
        cache_offset: function(e) {
            var t = e.show().height() + parseInt(e.css("top"), 10);
            e.hide();
            return t
        },
        off: function() {
            e(this.scope).off(".fndtn.reveal")
        },
        reflow: function() {}
    }
})
(Foundation.zj, this, this.document);

(function(e, t, n, r) {
    "use strict";
    Foundation.libs.topbar = {
        name: "topbar",
        version: "4.3.2",
        settings: {
            index: 0,
            stickyClass: "sticky",
            custom_back_text: true,
            back_text: "Back",
            is_hover: true,
            mobile_show_parent_link: false,
            scrolltop: true,
            init: false
        },
        /*This init function is running twice*/
        init: function(n, r, i) {
            
            if(navInit == false){
                navInit = true; 
            Foundation.inherit(this, "data_options addCustomRule");
            var s = this;
            if (typeof r === "object") {
                e.extend(true, this.settings, r)
            } else if (typeof i !== "undefined") {
                e.extend(true, this.settings, i)
            }
            if (typeof r !== "string") {
                e(".top-bar, [data-topbar]").each(function() {
                    e.extend(true, s.settings, s.data_options(e(this)));
                    s.settings.$w = e(t);
                    s.settings.$topbar = e(this);
                    s.settings.$section = s.settings.$topbar.find("section");
                    s.settings.$titlebar = s.settings.$topbar.children("ul").first();
                    s.settings.$topbar.data("index", 0);
                    var n = s.settings.$topbar.parent();
                    if (n.hasClass("fixed") || n.hasClass(s.settings.stickyClass)) {
                        s.settings.$topbar.data("height", s.outerHeight(n));
                        s.settings.$topbar.data("stickyoffset", n.offset().top)
                    } else {
                        s.settings.$topbar.data("height", s.outerHeight(s.settings.$topbar))
                    }
                    var r = e("<div class='top-bar-js-breakpoint'/>").insertAfter(s.settings.$topbar);
                    s.settings.breakPoint = r.width();
                    r.remove();
                    console.log('initassemble');
                    s.assemble();
                    if (s.settings.is_hover) {
                        s.settings.$topbar.find(".has-dropdown").addClass("not-click")
                    }
                    s.addCustomRule(".f-topbar-fixed { padding-top: " + s.settings.$topbar.data("height") + "px }");
                    if (s.settings.$topbar.parent().hasClass("fixed")) {
                        e("body").addClass("f-topbar-fixed")
                    }
                });
                if (!s.settings.init) {
                    this.events()
                }
                return this.settings.init
            } else {
                return this[r].call(this, i)
            }
            }
        },
        toggle: function() {
            var n = this;
            var r = e(".top-bar, [data-topbar]"),
                i = r.find("section, .section");
            if (n.breakpoint()) {
                if (!n.rtl) {
                    i.css({
                        left: "0%"
                    });
                    i.find(">.name").css({
                        left: "100%"
                    })
                } else {
                    i.css({
                        right: "0%"
                    });
                    i.find(">.name").css({
                        right: "100%"
                    })
                }
                i.find("li.moved").removeClass("moved");
                r.data("index", 0);
                r.toggleClass("expanded").css("height", "")
            }
            if (n.settings.scrolltop) {
                if (!r.hasClass("expanded")) {
                    if (r.hasClass("fixed")) {
                        r.parent().addClass("fixed");
                        r.removeClass("fixed");
                        e("body").addClass("f-topbar-fixed")
                    }
                } else if (r.parent().hasClass("fixed")) {
                    if (n.settings.scrolltop) {
                        r.parent().removeClass("fixed");
                        r.addClass("fixed");
                        e("body").removeClass("f-topbar-fixed");
                        t.scrollTo(0, 0)
                    } else {
                        r.parent().removeClass("expanded")
                    }
                }
            } else {
                if (r.parent().hasClass(n.settings.stickyClass)) {
                    r.parent().addClass("fixed")
                }
                if (r.parent().hasClass("fixed")) {
                    if (!r.hasClass("expanded")) {
                        r.removeClass("fixed");
                        r.parent().removeClass("expanded");
                        n.updateStickyPositioning()
                    } else {
                        r.addClass("fixed");
                        r.parent().addClass("expanded")
                    }
                }
            }
        },
        timer: null,
        events: function() {
            var r = this;
            e(this.scope).off(".fndtn.topbar").on("click.fndtn.topbar", ".top-bar .toggle-topbar, [data-topbar] .toggle-topbar", function(e) {
                e.preventDefault();
                r.toggle()
            }).on("click.fndtn.topbar", ".top-bar li.has-dropdown", function(t) {
                var n = e(this),
                    i = e(t.target),
                    s = n.closest("[data-topbar], .top-bar"),
                    o = s.data("topbar");
                if (i.data("revealId")) {
                    r.toggle();
                    return
                }
                if (r.breakpoint()) return;
                if (r.settings.is_hover && !Modernizr.touch) return;
                t.stopImmediatePropagation();
                if (i[0].nodeName === "A" && i.parent().hasClass("has-dropdown")) {
                    t.preventDefault()
                }
                if (n.hasClass("hover")) {
                    n.removeClass("hover").find("li").removeClass("hover");
                    n.parents("li.hover").removeClass("hover")
                } else {
                    n.addClass("hover")
                }
            }).on("click.fndtn.topbar", ".top-bar .has-dropdown>a, [data-topbar] .has-dropdown>a", function(n) {
                if (r.breakpoint() && e(t).width() != r.settings.breakPoint) {
                    n.preventDefault();
                    var i = e(this),
                        s = i.closest(".top-bar, [data-topbar]"),
                        o = s.find("section, .section"),
                        u = i.next(".dropdown").outerHeight(),
                        a = i.closest("li");
                    s.data("index", s.data("index") + 1);
                    a.addClass("moved");
                    if (!r.rtl) {
                        o.css({
                            left: -(100 * s.data("index")) + "%"
                        });
                        o.find(">.name").css({
                            left: 100 * s.data("index") + "%"
                        })
                    } else {
                        o.css({
                            right: -(100 * s.data("index")) + "%"
                        });
                        o.find(">.name").css({
                            right: 100 * s.data("index") + "%"
                        })
                    }
                    s.css("height", r.outerHeight(i.siblings("ul"), true) + r.settings.$topbar.data("height"))
                }
            });
            e(t).on("resize.fndtn.topbar", function() {
                if (typeof r.settings.$topbar === "undefined") {
                    return
                }
                var t = r.settings.$topbar.parent("." + this.settings.stickyClass);
                var i;
                if (!r.breakpoint()) {
                    var s = r.settings.$topbar.hasClass("expanded");
                    e(".top-bar, [data-topbar]").css("height", "").removeClass("expanded").find("li").removeClass("hover");
                    if (s) {
                        r.toggle()
                    }
                }
                if (t.length > 0) {
                    if (t.hasClass("fixed")) {
                        t.removeClass("fixed");
                        i = t.offset().top;
                        if (e(n.body).hasClass("f-topbar-fixed")) {
                            i -= r.settings.$topbar.data("height")
                        }
                        r.settings.$topbar.data("stickyoffset", i);
                        t.addClass("fixed")
                    } else {
                        i = t.offset().top;
                        r.settings.$topbar.data("stickyoffset", i)
                    }
                }
            }.bind(this));
            e("body").on("click.fndtn.topbar", function(t) {
                var n = e(t.target).closest("li").closest("li.hover");
                if (n.length > 0) {
                    return
                }
                e(".top-bar li, [data-topbar] li").removeClass("hover")
            });
            e(this.scope).on("click.fndtn", ".top-bar .has-dropdown .back, [data-topbar] .has-dropdown .back", function(t) {
                t.preventDefault();
                var n = e(this),
                    i = n.closest(".top-bar, [data-topbar]"),
                    s = i.find("section, .section"),
                    o = n.closest("li.moved"),
                    u = o.parent();
                i.data("index", i.data("index") - 1);
                if (!r.rtl) {
                    s.css({
                        left: -(100 * i.data("index")) + "%"
                    });
                    s.find(">.name").css({
                        left: 100 * i.data("index") + "%"
                    })
                } else {
                    s.css({
                        right: -(100 * i.data("index")) + "%"
                    });
                    s.find(">.name").css({
                        right: 100 * i.data("index") + "%"
                    })
                }
                if (i.data("index") === 0) {
                    i.css("height", "")
                } else {
                    i.css("height", r.outerHeight(u, true) + r.settings.$topbar.data("height"))
                }
                setTimeout(function() {
                    o.removeClass("moved")
                }, 300)
            })
        },
        breakpoint: function() {
            return e(n).width() <= this.settings.breakPoint || e("html").hasClass("lt-ie9")
        },

        assemble: function() {
            var t = this;
            var counter = 0;
            var acc = 0;
            console.log('assemble');
            var backElem = document.querySelector('title back js-generated');

            this.settings.$section.detach();
            if (acc === 0) {
                this.settings.$section.find(".has-dropdown>a").each(function() {
                    var n = e(this),
                        r = n.siblings(".dropdown"),
                        i = n.attr("href");
                    if (t.settings.mobile_show_parent_link && i && i.length > 1) {
                        var s = e('<li class="title back js-generated"><h5><a href="#"></a></h5></li><li><a class="parent-link js-generated" href="' + i + '">' + n.text() + "</a></li>")
                    } else {
                        var s = e('<li class="title back js-generated"><h5><a href="#"></a></h5></li>')
                        console.log('added');
                        console.log(counter++);
                        console.log(s);

                    }
                    if (t.settings.custom_back_text == true) {
                        s.find("h5>a").html(t.settings.back_text)
                    } else {
                        s.find("h5>a").html("&laquo; " + n.html())
                    }

                    r.prepend(s)
                    acc++;
                    console.log('acc is ' + acc);
                });
            }
            this.settings.$section.appendTo(this.settings.$topbar);
            this.sticky()
        },
        height: function(t) {
            var n = 0,
                r = this;
            t.find("> li").each(function() {
                n += r.outerHeight(e(this), true)
            });
            return n
        },
        sticky: function() {
            var n = e(t),
                r = this;
            n.scroll(function() {
                r.updateStickyPositioning()
            })
        },
        updateStickyPositioning: function() {
            var n = "." + this.settings.stickyClass;
            var r = e(t);
            if (e(n).length > 0) {
                var i = this.settings.$topbar.data("stickyoffset");
                if (!e(n).hasClass("expanded")) {
                    if (r.scrollTop() > i) {
                        if (!e(n).hasClass("fixed")) {
                            e(n).addClass("fixed");
                            e("body").addClass("f-topbar-fixed")
                        }
                    } else if (r.scrollTop() <= i) {
                        if (e(n).hasClass("fixed")) {
                            e(n).removeClass("fixed");
                            e("body").removeClass("f-topbar-fixed")
                        }
                    }
                }
            }
        },
        off: function() {
            e(this.scope).off(".fndtn.topbar");
            e(t).off(".fndtn.topbar")
        },
        reflow: function() {}
    }
})(Foundation.zj, this, this.document);
$(document).ready(function() {
    $(".boxgrid.slidedown").hover(function() {
        $(".cover", this).stop().animate({
            top: "-260px"
        }, {
            queue: false,
            duration: 300
        })
    }, function() {
        $(".cover", this).stop().animate({
            top: "0px"
        }, {
            queue: false,
            duration: 300
        })
    });
    $(".boxgrid.slideright").hover(function() {
        $(".cover", this).stop().animate({
            left: "325px"
        }, {
            queue: false,
            duration: 300
        })
    }, function() {
        $(".cover", this).stop().animate({
            left: "0px"
        }, {
            queue: false,
            duration: 300
        })
    });
    $(".boxgrid.thecombo").hover(function() {
        $(".cover", this).stop().animate({
            top: "260px",
            left: "325px"
        }, {
            queue: false,
            duration: 300
        })
    }, function() {
        $(".cover", this).stop().animate({
            top: "0px",
            left: "0px"
        }, {
            queue: false,
            duration: 300
        })
    });
    $(".boxgrid.peek").hover(function() {
        $(".cover", this).stop().animate({
            top: "90px"
        }, {
            queue: false,
            duration: 160
        })
    }, function() {
        $(".cover", this).stop().animate({
            top: "0px"
        }, {
            queue: false,
            duration: 160
        })
    });
    $(".boxgrid.captionfull").hover(function() {
        $(".cover", this).stop().animate({
            top: "130px"
        }, {
            queue: false,
            duration: 160
        })
    }, function() {
        $(".cover", this).stop().animate({
            top: "260px"
        }, {
            queue: false,
            duration: 160
        })
    });
    $(".boxgrid.caption").hover(function() {
        $(".cover", this).stop().animate({
            top: "160px"
        }, {
            queue: false,
            duration: 160
        })
    }, function() {
        $(".cover", this).stop().animate({
            top: "220px"
        }, {
            queue: false,
            duration: 160
        })
    })
});
$(document).foundation("reveal", {
    opened: function(e) {
        $(e.target).find("input").first().focus()
    }
})