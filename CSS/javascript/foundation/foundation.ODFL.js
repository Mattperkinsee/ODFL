var libFuncName = null;
if (typeof jQuery === "undefined" && typeof Zepto === "undefined" && typeof $ === "function") {
    libFuncName = $
} else if (typeof jQuery === "function") {
    libFuncName = jQuery
} else if (typeof Zepto === "function") {
    libFuncName = Zepto
} else {
    throw new TypeError
}(function(e, t, n, r) {
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
})(libFuncName, this, this.document);
(function(e, t, n, r) {
    "use strict";
    var i = i || false;
    Foundation.libs.joyride = {
        name: "joyride",
        version: "4.3.2",
        defaults: {
            expose: false,
            modal: false,
            tipLocation: "bottom",
            nubPosition: "auto",
            scrollSpeed: 300,
            timer: 0,
            startTimerOnClick: true,
            startOffset: 0,
            nextButton: true,
            tipAnimation: "fade",
            pauseAfter: [],
            exposed: [],
            tipAnimationFadeSpeed: 300,
            cookieMonster: false,
            cookieName: "joyride",
            cookieDomain: false,
            cookieExpires: 365,
            tipContainer: "body",
            postRideCallback: function() {},
            postStepCallback: function() {},
            preStepCallback: function() {},
            preRideCallback: function() {},
            postExposeCallback: function() {},
            template: {
                link: '<a href="#close" class="joyride-close-tip">&times;</a>',
                timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
                wrapper: '<div class="joyride-content-wrapper"></div>',
                button: '<a href="#" class="small button joyride-next-tip"></a>',
                modal: '<div class="joyride-modal-bg"></div>',
                expose: '<div class="joyride-expose-wrapper"></div>',
                exposeCover: '<div class="joyride-expose-cover"></div>'
            },
            exposeAddClass: ""
        },
        settings: {},
        init: function(t, n, r) {
            this.scope = t || this.scope;
            Foundation.inherit(this, "throttle data_options scrollTo scrollLeft delay");
            if (typeof n === "object") {
                e.extend(true, this.settings, this.defaults, n)
            } else {
                e.extend(true, this.settings, this.defaults, r)
            }
            if (typeof n !== "string") {
                if (!this.settings.init) this.events();
                return this.settings.init
            } else {
                return this[n].call(this, r)
            }
        },
        events: function() {
            var n = this;
            e(this.scope).on("click.joyride", ".joyride-next-tip, .joyride-modal-bg", function(e) {
                e.preventDefault();
                if (this.settings.$li.next().length < 1) {
                    this.end()
                } else if (this.settings.timer > 0) {
                    clearTimeout(this.settings.automate);
                    this.hide();
                    this.show();
                    this.startTimer()
                } else {
                    this.hide();
                    this.show()
                }
            }.bind(this)).on("click.joyride", ".joyride-close-tip", function(e) {
                e.preventDefault();
                this.end()
            }.bind(this));
            e(t).on("resize.fndtn.joyride", n.throttle(function() {
                if (e("[data-joyride]").length > 0 && n.settings.$next_tip) {
                    if (n.settings.exposed.length > 0) {
                        var t = e(n.settings.exposed);
                        t.each(function() {
                            var t = e(this);
                            n.un_expose(t);
                            n.expose(t)
                        })
                    }
                    if (n.is_phone()) {
                        n.pos_phone()
                    } else {
                        n.pos_default(false, true)
                    }
                }
            }, 100));
            this.settings.init = true
        },
        start: function() {
            var t = this,
                n = e(this.scope).find("[data-joyride]"),
                r = ["timer", "scrollSpeed", "startOffset", "tipAnimationFadeSpeed", "cookieExpires"],
                i = r.length;
            if (!this.settings.init) this.events();
            this.settings.$content_el = n;
            this.settings.$body = e(this.settings.tipContainer);
            this.settings.body_offset = e(this.settings.tipContainer).position();
            this.settings.$tip_content = this.settings.$content_el.find("> li");
            this.settings.paused = false;
            this.settings.attempts = 0;
            this.settings.tipLocationPatterns = {
                top: ["bottom"],
                bottom: [],
                left: ["right", "top", "bottom"],
                right: ["left", "top", "bottom"]
            };
            if (typeof e.cookie !== "function") {
                this.settings.cookieMonster = false
            }
            if (!this.settings.cookieMonster || this.settings.cookieMonster && e.cookie(this.settings.cookieName) === null) {
                this.settings.$tip_content.each(function(n) {
                    var s = e(this);
                    e.extend(true, t.settings, t.data_options(s));
                    for (var o = i - 1; o >= 0; o--) {
                        t.settings[r[o]] = parseInt(t.settings[r[o]], 10)
                    }
                    t.create({
                        $li: s,
                        index: n
                    })
                });
                if (!this.settings.startTimerOnClick && this.settings.timer > 0) {
                    this.show("init");
                    this.startTimer()
                } else {
                    this.show("init")
                }
            }
        },
        resume: function() {
            this.set_li();
            this.show()
        },
        tip_template: function(t) {
            var n, r;
            t.tip_class = t.tip_class || "";
            n = e(this.settings.template.tip).addClass(t.tip_class);
            r = e.trim(e(t.li).html()) + this.button_text(t.button_text) + this.settings.template.link + this.timer_instance(t.index);
            n.append(e(this.settings.template.wrapper));
            n.first().attr("data-index", t.index);
            e(".joyride-content-wrapper", n).append(r);
            return n[0]
        },
        timer_instance: function(t) {
            var n;
            if (t === 0 && this.settings.startTimerOnClick && this.settings.timer > 0 || this.settings.timer === 0) {
                n = ""
            } else {
                n = this.outerHTML(e(this.settings.template.timer)[0])
            }
            return n
        },
        button_text: function(t) {
            if (this.settings.nextButton) {
                t = e.trim(t) || "Next";
                t = this.outerHTML(e(this.settings.template.button).append(t)[0])
            } else {
                t = ""
            }
            return t
        },
        create: function(t) {
            var n = t.$li.attr("data-button") || t.$li.attr("data-text"),
                r = t.$li.attr("class"),
                i = e(this.tip_template({
                    tip_class: r,
                    index: t.index,
                    button_text: n,
                    li: t.$li
                }));
            e(this.settings.tipContainer).append(i)
        },
        show: function(t) {
            var n = null;
            if (this.settings.$li === r || e.inArray(this.settings.$li.index(), this.settings.pauseAfter) === -1) {
                if (this.settings.paused) {
                    this.settings.paused = false
                } else {
                    this.set_li(t)
                }
                this.settings.attempts = 0;
                if (this.settings.$li.length && this.settings.$target.length > 0) {
                    if (t) {
                        this.settings.preRideCallback(this.settings.$li.index(), this.settings.$next_tip);
                        if (this.settings.modal) {
                            this.show_modal()
                        }
                    }
                    this.settings.preStepCallback(this.settings.$li.index(), this.settings.$next_tip);
                    if (this.settings.modal && this.settings.expose) {
                        this.expose()
                    }
                    this.settings.tipSettings = e.extend(this.settings, this.data_options(this.settings.$li));
                    this.settings.timer = parseInt(this.settings.timer, 10);
                    this.settings.tipSettings.tipLocationPattern = this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation];
                    if (!/body/i.test(this.settings.$target.selector)) {
                        this.scroll_to()
                    }
                    if (this.is_phone()) {
                        this.pos_phone(true)
                    } else {
                        this.pos_default(true)
                    }
                    n = this.settings.$next_tip.find(".joyride-timer-indicator");
                    if (/pop/i.test(this.settings.tipAnimation)) {
                        n.width(0);
                        if (this.settings.timer > 0) {
                            this.settings.$next_tip.show();
                            this.delay(function() {
                                n.animate({
                                    width: n.parent().width()
                                }, this.settings.timer, "linear")
                            }.bind(this), this.settings.tipAnimationFadeSpeed)
                        } else {
                            this.settings.$next_tip.show()
                        }
                    } else if (/fade/i.test(this.settings.tipAnimation)) {
                        n.width(0);
                        if (this.settings.timer > 0) {
                            this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed).show();
                            this.delay(function() {
                                n.animate({
                                    width: n.parent().width()
                                }, this.settings.timer, "linear")
                            }.bind(this), this.settings.tipAnimationFadeSpeed)
                        } else {
                            this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)
                        }
                    }
                    this.settings.$current_tip = this.settings.$next_tip
                } else if (this.settings.$li && this.settings.$target.length < 1) {
                    this.show()
                } else {
                    this.end()
                }
            } else {
                this.settings.paused = true
            }
        },
        is_phone: function() {
            if (i) {
                return i.mq("only screen and (max-width: 767px)") || e(".lt-ie9").length > 0
            }
            return e(t).width() < 767
        },
        hide: function() {
            if (this.settings.modal && this.settings.expose) {
                this.un_expose()
            }
            if (!this.settings.modal) {
                e(".joyride-modal-bg").hide()
            }
            this.settings.$current_tip.css("visibility", "hidden");
            setTimeout(e.proxy(function() {
                this.hide();
                this.css("visibility", "visible")
            }, this.settings.$current_tip), 0);
            this.settings.postStepCallback(this.settings.$li.index(), this.settings.$current_tip)
        },
        set_li: function(e) {
            if (e) {
                this.settings.$li = this.settings.$tip_content.eq(this.settings.startOffset);
                this.set_next_tip();
                this.settings.$current_tip = this.settings.$next_tip
            } else {
                this.settings.$li = this.settings.$li.next();
                this.set_next_tip()
            }
            this.set_target()
        },
        set_next_tip: function() {
            this.settings.$next_tip = e(".joyride-tip-guide[data-index='" + this.settings.$li.index() + "']");
            this.settings.$next_tip.data("closed", "")
        },
        set_target: function() {
            var t = this.settings.$li.attr("data-class"),
                r = this.settings.$li.attr("data-id"),
                i = function() {
                    if (r) {
                        return e(n.getElementById(r))
                    } else if (t) {
                        return e("." + t).first()
                    } else {
                        return e("body")
                    }
                };
            this.settings.$target = i()
        },
        scroll_to: function() {
            var n, r;
            n = e(t).height() / 2;
            r = Math.ceil(this.settings.$target.offset().top - n + this.outerHeight(this.settings.$next_tip));
            if (r > 0) {
                this.scrollTo(e("html, body"), r, this.settings.scrollSpeed)
            }
        },
        paused: function() {
            return e.inArray(this.settings.$li.index() + 1, this.settings.pauseAfter) === -1
        },
        restart: function() {
            this.hide();
            this.settings.$li = r;
            this.show("init")
        },
        pos_default: function(n, r) {
            var i = Math.ceil(e(t).height() / 2),
                s = this.settings.$next_tip.offset(),
                o = this.settings.$next_tip.find(".joyride-nub"),
                u = Math.ceil(this.outerWidth(o) / 2),
                a = Math.ceil(this.outerHeight(o) / 2),
                f = n || false;
            if (f) {
                this.settings.$next_tip.css("visibility", "hidden");
                this.settings.$next_tip.show()
            }
            if (typeof r === "undefined") {
                r = false
            }
            if (!/body/i.test(this.settings.$target.selector)) {
                if (this.bottom()) {
                    var l = this.settings.$target.offset().left;
                    if (Foundation.rtl) {
                        l = this.settings.$target.offset().width - this.settings.$next_tip.width() + l
                    }
                    this.settings.$next_tip.css({
                        top: this.settings.$target.offset().top + a + this.outerHeight(this.settings.$target),
                        left: l
                    });
                    this.nub_position(o, this.settings.tipSettings.nubPosition, "top")
                } else if (this.top()) {
                    var l = this.settings.$target.offset().left;
                    if (Foundation.rtl) {
                        l = this.settings.$target.offset().width - this.settings.$next_tip.width() + l
                    }
                    this.settings.$next_tip.css({
                        top: this.settings.$target.offset().top - this.outerHeight(this.settings.$next_tip) - a,
                        left: l
                    });
                    this.nub_position(o, this.settings.tipSettings.nubPosition, "bottom")
                } else if (this.right()) {
                    this.settings.$next_tip.css({
                        top: this.settings.$target.offset().top,
                        left: this.outerWidth(this.settings.$target) + this.settings.$target.offset().left + u
                    });
                    this.nub_position(o, this.settings.tipSettings.nubPosition, "left")
                } else if (this.left()) {
                    this.settings.$next_tip.css({
                        top: this.settings.$target.offset().top,
                        left: this.settings.$target.offset().left - this.outerWidth(this.settings.$next_tip) - u
                    });
                    this.nub_position(o, this.settings.tipSettings.nubPosition, "right")
                }
                if (!this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tipSettings.tipLocationPattern.length) {
                    o.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");
                    this.settings.tipSettings.tipLocation = this.settings.tipSettings.tipLocationPattern[this.settings.attempts];
                    this.settings.attempts++;
                    this.pos_default()
                }
            } else if (this.settings.$li.length) {
                this.pos_modal(o)
            }
            if (f) {
                this.settings.$next_tip.hide();
                this.settings.$next_tip.css("visibility", "visible")
            }
        },
        pos_phone: function(t) {
            var n = this.outerHeight(this.settings.$next_tip),
                r = this.settings.$next_tip.offset(),
                i = this.outerHeight(this.settings.$target),
                s = e(".joyride-nub", this.settings.$next_tip),
                o = Math.ceil(this.outerHeight(s) / 2),
                u = t || false;
            s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");
            if (u) {
                this.settings.$next_tip.css("visibility", "hidden");
                this.settings.$next_tip.show()
            }
            if (!/body/i.test(this.settings.$target.selector)) {
                if (this.top()) {
                    this.settings.$next_tip.offset({
                        top: this.settings.$target.offset().top - n - o
                    });
                    s.addClass("bottom")
                } else {
                    this.settings.$next_tip.offset({
                        top: this.settings.$target.offset().top + i + o
                    });
                    s.addClass("top")
                }
            } else if (this.settings.$li.length) {
                this.pos_modal(s)
            }
            if (u) {
                this.settings.$next_tip.hide();
                this.settings.$next_tip.css("visibility", "visible")
            }
        },
        pos_modal: function(e) {
            this.center();
            e.hide();
            this.show_modal()
        },
        show_modal: function() {
            if (!this.settings.$next_tip.data("closed")) {
                var t = e(".joyride-modal-bg");
                if (t.length < 1) {
                    e("body").append(this.settings.template.modal).show()
                }
                if (/pop/i.test(this.settings.tipAnimation)) {
                    t.show()
                } else {
                    t.fadeIn(this.settings.tipAnimationFadeSpeed)
                }
            }
        },
        expose: function() {
            var n, r, i, s, o, u = "expose-" + Math.floor(Math.random() * 1e4);
            if (arguments.length > 0 && arguments[0] instanceof e) {
                i = arguments[0]
            } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
                i = this.settings.$target
            } else {
                return false
            }
            if (i.length < 1) {
                if (t.console) {
                    console.error("element not valid", i)
                }
                return false
            }
            n = e(this.settings.template.expose);
            this.settings.$body.append(n);
            n.css({
                top: i.offset().top,
                left: i.offset().left,
                width: this.outerWidth(i, true),
                height: this.outerHeight(i, true)
            });
            r = e(this.settings.template.exposeCover);
            s = {
                zIndex: i.css("z-index"),
                position: i.css("position")
            };
            o = i.attr("class") == null ? "" : i.attr("class");
            i.css("z-index", parseInt(n.css("z-index")) + 1);
            if (s.position == "static") {
                i.css("position", "relative")
            }
            i.data("expose-css", s);
            i.data("orig-class", o);
            i.attr("class", o + " " + this.settings.exposeAddClass);
            r.css({
                top: i.offset().top,
                left: i.offset().left,
                width: this.outerWidth(i, true),
                height: this.outerHeight(i, true)
            });
            this.settings.$body.append(r);
            n.addClass(u);
            r.addClass(u);
            i.data("expose", u);
            this.settings.postExposeCallback(this.settings.$li.index(), this.settings.$next_tip, i);
            this.add_exposed(i)
        },
        un_expose: function() {
            var n, r, i, s, o, u = false;
            if (arguments.length > 0 && arguments[0] instanceof e) {
                r = arguments[0]
            } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
                r = this.settings.$target
            } else {
                return false
            }
            if (r.length < 1) {
                if (t.console) {
                    console.error("element not valid", r)
                }
                return false
            }
            n = r.data("expose");
            i = e("." + n);
            if (arguments.length > 1) {
                u = arguments[1]
            }
            if (u === true) {
                e(".joyride-expose-wrapper,.joyride-expose-cover").remove()
            } else {
                i.remove()
            }
            s = r.data("expose-css");
            if (s.zIndex == "auto") {
                r.css("z-index", "")
            } else {
                r.css("z-index", s.zIndex)
            }
            if (s.position != r.css("position")) {
                if (s.position == "static") {
                    r.css("position", "")
                } else {
                    r.css("position", s.position)
                }
            }
            o = r.data("orig-class");
            r.attr("class", o);
            r.removeData("orig-classes");
            r.removeData("expose");
            r.removeData("expose-z-index");
            this.remove_exposed(r)
        },
        add_exposed: function(t) {
            this.settings.exposed = this.settings.exposed || [];
            if (t instanceof e || typeof t === "object") {
                this.settings.exposed.push(t[0])
            } else if (typeof t == "string") {
                this.settings.exposed.push(t)
            }
        },
        remove_exposed: function(t) {
            var n, r;
            if (t instanceof e) {
                n = t[0]
            } else if (typeof t == "string") {
                n = t
            }
            this.settings.exposed = this.settings.exposed || [];
            r = this.settings.exposed.length;
            for (var i = 0; i < r; i++) {
                if (this.settings.exposed[i] == n) {
                    this.settings.exposed.splice(i, 1);
                    return
                }
            }
        },
        center: function() {
            var n = e(t);
            this.settings.$next_tip.css({
                top: (n.height() - this.outerHeight(this.settings.$next_tip)) / 2 + n.scrollTop(),
                left: (n.width() - this.outerWidth(this.settings.$next_tip)) / 2 + this.scrollLeft(n)
            });
            return true
        },
        bottom: function() {
            return /bottom/i.test(this.settings.tipSettings.tipLocation)
        },
        top: function() {
            return /top/i.test(this.settings.tipSettings.tipLocation)
        },
        right: function() {
            return /right/i.test(this.settings.tipSettings.tipLocation)
        },
        left: function() {
            return /left/i.test(this.settings.tipSettings.tipLocation)
        },
        corners: function(n) {
            var r = e(t),
                i = r.height() / 2,
                s = Math.ceil(this.settings.$target.offset().top - i + this.settings.$next_tip.outerHeight()),
                o = r.width() + this.scrollLeft(r),
                u = r.height() + s,
                a = r.height() + r.scrollTop(),
                f = r.scrollTop();
            if (s < f) {
                if (s < 0) {
                    f = 0
                } else {
                    f = s
                }
            }
            if (u > a) {
                a = u
            }
            return [n.offset().top < f, o < n.offset().left + n.outerWidth(), a < n.offset().top + n.outerHeight(), this.scrollLeft(r) > n.offset().left]
        },
        visible: function(e) {
            var t = e.length;
            while (t--) {
                if (e[t]) return false
            }
            return true
        },
        nub_position: function(e, t, n) {
            if (t === "auto") {
                e.addClass(n)
            } else {
                e.addClass(t)
            }
        },
        startTimer: function() {
            if (this.settings.$li.length) {
                this.settings.automate = setTimeout(function() {
                    this.hide();
                    this.show();
                    this.startTimer()
                }.bind(this), this.settings.timer)
            } else {
                clearTimeout(this.settings.automate)
            }
        },
        end: function() {
            if (this.settings.cookieMonster) {
                e.cookie(this.settings.cookieName, "ridden", {
                    expires: this.settings.cookieExpires,
                    domain: this.settings.cookieDomain
                })
            }
            if (this.settings.timer > 0) {
                clearTimeout(this.settings.automate)
            }
            if (this.settings.modal && this.settings.expose) {
                this.un_expose()
            }
            this.settings.$next_tip.data("closed", true);
            e(".joyride-modal-bg").hide();
            this.settings.$current_tip.hide();
            this.settings.postStepCallback(this.settings.$li.index(), this.settings.$current_tip);
            this.settings.postRideCallback(this.settings.$li.index(), this.settings.$current_tip);
            e(".joyride-tip-guide").remove()
        },
        outerHTML: function(e) {
            return e.outerHTML || (new XMLSerializer).serializeToString(e)
        },
        off: function() {
            e(this.scope).off(".joyride");
            e(t).off(".joyride");
            e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride");
            e(".joyride-tip-guide, .joyride-modal-bg").remove();
            clearTimeout(this.settings.automate);
            this.settings = {}
        },
        reflow: function() {}
    }
})(Foundation.zj, this, this.document);
(function(e, t, n, r) {
    "use strict";
    Foundation.libs.magellan = {
        name: "magellan",
        version: "4.3.2",
        settings: {
            activeClass: "active",
            threshold: 50
        },
        init: function(t, n, r) {
            this.scope = t || this.scope;
            Foundation.inherit(this, "data_options");
            if (typeof n === "object") {
                e.extend(true, this.settings, n)
            }
            if (typeof n !== "string") {
                if (!this.settings.init) {
                    this.fixed_magellan = e("[data-magellan-expedition]");
                    this.set_threshold();
                    this.last_destination = e("[data-magellan-destination]").last();
                    this.events()
                }
                return this.settings.init
            } else {
                return this[n].call(this, r)
            }
        },
        events: function() {
            var n = this;
            e(this.scope).on("arrival.fndtn.magellan", "[data-magellan-arrival]", function(t) {
                var r = e(this),
                    i = r.closest("[data-magellan-expedition]"),
                    s = i.attr("data-magellan-active-class") || n.settings.activeClass;
                r.closest("[data-magellan-expedition]").find("[data-magellan-arrival]").not(r).removeClass(s);
                r.addClass(s)
            });
            this.fixed_magellan.on("update-position.fndtn.magellan", function() {
                var t = e(this)
            }).trigger("update-position");
            e(t).on("resize.fndtn.magellan", function() {
                this.fixed_magellan.trigger("update-position")
            }.bind(this)).on("scroll.fndtn.magellan", function() {
                var r = e(t).scrollTop();
                n.fixed_magellan.each(function() {
                    var t = e(this);
                    if (typeof t.data("magellan-top-offset") === "undefined") {
                        t.data("magellan-top-offset", t.offset().top)
                    }
                    if (typeof t.data("magellan-fixed-position") === "undefined") {
                        t.data("magellan-fixed-position", false)
                    }
                    var i = r + n.settings.threshold > t.data("magellan-top-offset");
                    var s = t.attr("data-magellan-top-offset");
                    if (t.data("magellan-fixed-position") != i) {
                        t.data("magellan-fixed-position", i);
                        if (i) {
                            t.addClass("fixed");
                            t.css({
                                position: "fixed",
                                top: 50
                            })
                        } else {
                            t.removeClass("fixed");
                            t.css({
                                position: "",
                                top: ""
                            })
                        }
                        if (i && typeof s != "undefined" && s != false) {
                            t.css({
                                position: "fixed",
                                top: s + "px"
                            })
                        }
                    }
                })
            });
            if (this.last_destination.length > 0) {
                e(t).on("scroll.fndtn.magellan", function(r) {
                    var i = e(t).scrollTop(),
                        s = i + e(t).height(),
                        o = Math.ceil(n.last_destination.offset().top);
                    e("[data-magellan-destination]").each(function() {
                        var t = e(this),
                            r = t.attr("data-magellan-destination"),
                            u = t.offset().top - i;
                        if (u <= n.settings.threshold) {
                            e("[data-magellan-arrival='" + r + "']").trigger("arrival")
                        }
                        if (s >= e(n.scope).height() && o > i && o < s) {
                            e("[data-magellan-arrival]").last().trigger("arrival")
                        }
                    })
                })
            }
            this.settings.init = true
        },
        set_threshold: function() {
            if (typeof this.settings.threshold !== "number") {
                this.settings.threshold = this.fixed_magellan.length > 0 ? this.outerHeight(this.fixed_magellan, true) : 0
            }
        },
        off: function() {
            e(this.scope).off(".fndtn.magellan");
            e(t).off(".fndtn.magellan")
        },
        reflow: function() {}
    }
})(Foundation.zj, this, this.document);
(function(e) {
    "use strict";

    function t(e, t, n) {
        if (e.addEventListener) {
            return e.addEventListener(t, n, false)
        }
        if (e.attachEvent) {
            return e.attachEvent("on" + t, n)
        }
    }

    function n(e, t) {
        var n, r;
        for (n = 0, r = e.length; n < r; n++) {
            if (e[n] === t) {
                return true
            }
        }
        return false
    }

    function r(e, t) {
        var n;
        if (e.createTextRange) {
            n = e.createTextRange();
            n.move("character", t);
            n.select()
        } else if (e.selectionStart) {
            e.focus();
            e.setSelectionRange(t, t)
        }
    }

    function i(e, t) {
        try {
            e.type = t;
            return true
        } catch (n) {
            return false
        }
    }
    e.Placeholders = {
        Utils: {
            addEventListener: t,
            inArray: n,
            moveCaret: r,
            changeType: i
        }
    }
})(this);
(function(e) {
    "use strict";

    function M() {}

    function _(e) {
        var t;
        if (e.value === e.getAttribute(a) && e.getAttribute(f) === "true") {
            e.setAttribute(f, "false");
            e.value = "";
            e.className = e.className.replace(s, "");
            t = e.getAttribute(l);
            if (t) {
                e.type = t
            }
            return true
        }
        return false
    }

    function D(e) {
        var t, n = e.getAttribute(a);
        if (e.value === "" && n) {
            e.setAttribute(f, "true");
            e.value = n;
            e.className += " " + i;
            t = e.getAttribute(l);
            if (t) {
                e.type = "text"
            } else if (e.type === "password") {
                if (b.changeType(e, "text")) {
                    e.setAttribute(l, "password")
                }
            }
            return true
        }
        return false
    }

    function P(e, t) {
        var n, r, i, s, f;
        if (e && e.getAttribute(a)) {
            t(e)
        } else {
            n = e ? e.getElementsByTagName("input") : o;
            r = e ? e.getElementsByTagName("textarea") : u;
            for (f = 0, s = n.length + r.length; f < s; f++) {
                i = f < n.length ? n[f] : r[f - n.length];
                t(i)
            }
        }
    }

    function H(e) {
        P(e, _)
    }

    function B(e) {
        P(e, D)
    }

    function j(e) {
        return function() {
            if (w && e.value === e.getAttribute(a) && e.getAttribute(f) === "true") {
                b.moveCaret(e, 0)
            } else {
                _(e)
            }
        }
    }

    function F(e) {
        return function() {
            D(e)
        }
    }

    function I(e) {
        return function(t) {
            S = e.value;
            if (e.getAttribute(f) === "true") {
                if (S === e.getAttribute(a) && b.inArray(n, t.keyCode)) {
                    if (t.preventDefault) {
                        t.preventDefault()
                    }
                    return false
                }
            }
        }
    }

    function q(e) {
        return function() {
            var t;
            if (e.getAttribute(f) === "true" && e.value !== S) {
                e.className = e.className.replace(s, "");
                e.value = e.value.replace(e.getAttribute(a), "");
                e.setAttribute(f, false);
                t = e.getAttribute(l);
                if (t) {
                    e.type = t
                }
            }
            if (e.value === "") {
                e.blur();
                b.moveCaret(e, 0)
            }
        }
    }

    function R(e) {
        return function() {
            if (e === document.activeElement && e.value === e.getAttribute(a) && e.getAttribute(f) === "true") {
                b.moveCaret(e, 0)
            }
        }
    }

    function U(e) {
        return function() {
            H(e)
        }
    }

    function z(e) {
        if (e.form) {
            k = e.form;
            if (!k.getAttribute(c)) {
                b.addEventListener(k, "submit", U(k));
                k.setAttribute(c, "true")
            }
        }
        b.addEventListener(e, "focus", j(e));
        b.addEventListener(e, "blur", F(e));
        if (w) {
            b.addEventListener(e, "keydown", I(e));
            b.addEventListener(e, "keyup", q(e));
            b.addEventListener(e, "click", R(e))
        }
        e.setAttribute(h, "true");
        e.setAttribute(a, N);
        D(e)
    }
    var t = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
        n = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
        r = "#ccc",
        i = "placeholdersjs",
        s = new RegExp("(?:^|\\s)" + i + "(?!\\S)"),
        o, u, a = "data-placeholder-value",
        f = "data-placeholder-active",
        l = "data-placeholder-type",
        c = "data-placeholder-submit",
        h = "data-placeholder-bound",
        p = "data-placeholder-focus",
        d = "data-placeholder-live",
        v = document.createElement("input"),
        m = document.getElementsByTagName("head")[0],
        g = document.documentElement,
        y = e.Placeholders,
        b = y.Utils,
        w, E, S, x, T, N, C, k, L, A, O;
    y.nativeSupport = v.placeholder !== void 0;
    if (!y.nativeSupport) {
        o = document.getElementsByTagName("input");
        u = document.getElementsByTagName("textarea");
        w = g.getAttribute(p) === "false";
        E = g.getAttribute(d) !== "false";
        x = document.createElement("style");
        x.type = "text/css";
        T = document.createTextNode("." + i + " { color:" + r + "; }");
        if (x.styleSheet) {
            x.styleSheet.cssText = T.nodeValue
        } else {
            x.appendChild(T)
        }
        m.insertBefore(x, m.firstChild);
        for (O = 0, A = o.length + u.length; O < A; O++) {
            L = O < o.length ? o[O] : u[O - o.length];
            N = L.attributes.placeholder;
            if (N) {
                N = N.nodeValue;
                if (N && b.inArray(t, L.type)) {
                    z(L)
                }
            }
        }
        C = setInterval(function() {
            for (O = 0, A = o.length + u.length; O < A; O++) {
                L = O < o.length ? o[O] : u[O - o.length];
                N = L.attributes.placeholder;
                if (N) {
                    N = N.nodeValue;
                    if (N && b.inArray(t, L.type)) {
                        if (!L.getAttribute(h)) {
                            z(L)
                        }
                        if (N !== L.getAttribute(a) || L.type === "password" && !L.getAttribute(l)) {
                            if (L.type === "password" && !L.getAttribute(l) && b.changeType(L, "text")) {
                                L.setAttribute(l, "password")
                            }
                            if (L.value === L.getAttribute(a)) {
                                L.value = N
                            }
                            L.setAttribute(a, N)
                        }
                    }
                }
            }
            if (!E) {
                clearInterval(C)
            }
        }, 100)
    }
    y.disable = y.nativeSupport ? M : H;
    y.enable = y.nativeSupport ? M : B
})(this);
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
})(Foundation.zj, this, this.document);
(function(e, t, n) {
    "use strict";
    Foundation.libs.section = {
        name: "section",
        version: "4.3.2",
        settings: {
            deep_linking: false,
            small_breakpoint: 768,
            one_up: true,
            multi_expand: false,
            section_selector: "[data-section]",
            region_selector: "section, .section, [data-section-region]",
            title_selector: ".title, [data-section-title]",
            resized_data_attr: "data-section-resized",
            small_style_data_attr: "data-section-small-style",
            content_selector: ".content, [data-section-content]",
            nav_selector: '[data-section="vertical-nav"], [data-section="horizontal-nav"]',
            active_class: "active",
            callback: function() {}
        },
        init: function(t, n, r) {
            var i = this;
            Foundation.inherit(this, "throttle data_options position_right offset_right");
            if (typeof n === "object") {
                e.extend(true, i.settings, n)
            }
            if (typeof n !== "string") {
                this.events();
                return true
            } else {
                return this[n].call(this, r)
            }
        },
        events: function() {
            var r = this;
            var i = [],
                s = r.settings.section_selector,
                o = r.settings.region_selector.split(","),
                u = r.settings.title_selector.split(",");
            for (var a = 0, f = o.length; a < f; a++) {
                var l = o[a];
                for (var c = 0, h = u.length; c < h; c++) {
                    var p = s + ">" + l + ">" + u[c];
                    i.push(p + " a");
                    i.push(p)
                }
            }
            e(r.scope).on("click.fndtn.section", i.join(","), function(t) {
                var n = e(this).closest(r.settings.title_selector);
                r.close_navs(n);
                if (n.siblings(r.settings.content_selector).length > 0) {
                    r.toggle_active.call(n[0], t)
                }
            });
            e(t).on("resize.fndtn.section", r.throttle(function() {
                r.resize()
            }, 30)).on("hashchange.fndtn.section", r.set_active_from_hash);
            e(n).on("click.fndtn.section", function(t) {
                if (t.isPropagationStopped && t.isPropagationStopped()) return;
                if (t.target === n) return;
                r.close_navs(e(t.target).closest(r.settings.title_selector))
            });
            e(t).triggerHandler("resize.fndtn.section");
            e(t).triggerHandler("hashchange.fndtn.section")
        },
        close_navs: function(t) {
            var n = Foundation.libs.section,
                r = e(n.settings.nav_selector).filter(function() {
                    return !e.extend({}, n.settings, n.data_options(e(this))).one_up
                });
            if (t.length > 0) {
                var i = t.parent().parent();
                if (n.is_horizontal_nav(i) || n.is_vertical_nav(i)) {
                    r = r.filter(function() {
                        return this !== i[0]
                    })
                }
            }
            r.children(n.settings.region_selector).removeClass(n.settings.active_class)
        },
        toggle_active: function(t) {
            var n = e(this),
                r = Foundation.libs.section,
                i = n.parent(),
                s = n.siblings(r.settings.content_selector),
                o = i.parent(),
                u = e.extend({}, r.settings, r.data_options(o)),
                a = o.children(r.settings.region_selector).filter("." + r.settings.active_class);
            if (!u.deep_linking && s.length > 0) {
                t.preventDefault()
            }
            t.stopPropagation();
            if (!i.hasClass(r.settings.active_class)) {
                if (!r.is_accordion(o) || r.is_accordion(o) && !r.settings.multi_expand) {
                    a.removeClass(r.settings.active_class);
                    a.trigger("closed.fndtn.section")
                }
                i.addClass(r.settings.active_class);
                r.resize(i.find(r.settings.section_selector).not("[" + r.settings.resized_data_attr + "]"), true);
                i.trigger("opened.fndtn.section")
            } else if (i.hasClass(r.settings.active_class) && r.is_accordion(o) || !u.one_up && (r.small(o) || r.is_vertical_nav(o) || r.is_horizontal_nav(o) || r.is_accordion(o))) {
                i.removeClass(r.settings.active_class);
                i.trigger("closed.fndtn.section")
            }
            u.callback(o)
        },
        check_resize_timer: null,
        resize: function(t, n) {
            var r = Foundation.libs.section,
                i = e(r.settings.section_selector),
                s = r.small(i),
                o = function(e, t) {
                    return !r.is_accordion(e) && !e.is("[" + r.settings.resized_data_attr + "]") && (!s || r.is_horizontal_tabs(e)) && t === (e.css("display") === "none" || !e.parent().is(":visible"))
                };
            t = t || e(r.settings.section_selector);
            clearTimeout(r.check_resize_timer);
            if (!s) {
                t.removeAttr(r.settings.small_style_data_attr)
            }
            t.filter(function() {
                return o(e(this), false)
            }).each(function() {
                var t = e(this),
                    i = t.children(r.settings.region_selector),
                    s = i.children(r.settings.title_selector),
                    o = i.children(r.settings.content_selector),
                    u = 0;
                if (n && t.children(r.settings.region_selector).filter("." + r.settings.active_class).length == 0) {
                    var a = e.extend({}, r.settings, r.data_options(t));
                    if (!a.deep_linking && (a.one_up || !r.is_horizontal_nav(t) && !r.is_vertical_nav(t) && !r.is_accordion(t))) {
                        i.filter(":visible").first().addClass(r.settings.active_class)
                    }
                }
                if (r.is_horizontal_tabs(t) || r.is_auto(t)) {
                    var f = 0;
                    s.each(function() {
                        var t = e(this);
                        if (t.is(":visible")) {
                            t.css(!r.rtl ? "left" : "right", f);
                            var n = parseInt(t.css("border-" + (r.rtl ? "left" : "right") + "-width"), 10);
                            if (n.toString() === "Nan") {
                                n = 0
                            }
                            f += r.outerWidth(t) - n;
                            u = Math.max(u, r.outerHeight(t))
                        }
                    });
                    s.css("height", u);
                    i.each(function() {
                        var t = e(this),
                            n = t.children(r.settings.content_selector),
                            i = parseInt(n.css("border-top-width"), 10);
                        if (i.toString() === "Nan") {
                            i = 0
                        }
                        t.css("padding-top", u - i)
                    });
                    t.css("min-height", u)
                } else if (r.is_horizontal_nav(t)) {
                    var l = true;
                    s.each(function() {
                        u = Math.max(u, r.outerHeight(e(this)))
                    });
                    i.each(function() {
                        var n = e(this);
                        n.css("margin-left", "-" + (l ? t : n.children(r.settings.title_selector)).css("border-left-width"));
                        l = false
                    });
                    i.css("margin-top", "-" + t.css("border-top-width"));
                    s.css("height", u);
                    o.css("top", u);
                    t.css("min-height", u)
                } else if (r.is_vertical_tabs(t)) {
                    var c = 0;
                    s.each(function() {
                        var t = e(this);
                        if (t.is(":visible")) {
                            t.css("top", c);
                            var n = parseInt(t.css("border-top-width"), 10);
                            if (n.toString() === "Nan") {
                                n = 0
                            }
                            c += r.outerHeight(t) - n
                        }
                    });
                    o.css("min-height", c + 1)
                } else if (r.is_vertical_nav(t)) {
                    var h = 0,
                        p = true;
                    s.each(function() {
                        h = Math.max(h, r.outerWidth(e(this)))
                    });
                    i.each(function() {
                        var n = e(this);
                        n.css("margin-top", "-" + (p ? t : n.children(r.settings.title_selector)).css("border-top-width"));
                        p = false
                    });
                    s.css("width", h);
                    o.css(!r.rtl ? "left" : "right", h);
                    t.css("width", h)
                }
                t.attr(r.settings.resized_data_attr, true)
            });
            if (e(r.settings.section_selector).filter(function() {
                    return o(e(this), true)
                }).length > 0) r.check_resize_timer = setTimeout(function() {
                r.resize(t.filter(function() {
                    return o(e(this), false)
                }), true)
            }, 700);
            if (s) {
                t.attr(r.settings.small_style_data_attr, true)
            }
        },
        is_vertical_nav: function(e) {
            return /vertical-nav/i.test(e.data("section"))
        },
        is_horizontal_nav: function(e) {
            return /horizontal-nav/i.test(e.data("section"))
        },
        is_accordion: function(e) {
            return /accordion/i.test(e.data("section"))
        },
        is_horizontal_tabs: function(e) {
            return /^tabs$/i.test(e.data("section"))
        },
        is_vertical_tabs: function(e) {
            return /vertical-tabs/i.test(e.data("section"))
        },
        is_auto: function(e) {
            var t = e.data("section");
            return t === "" || /auto/i.test(t)
        },
        set_active_from_hash: function() {
            var n = Foundation.libs.section,
                r = t.location.hash.substring(1),
                i = e(n.settings.section_selector);
            var s;
            i.each(function() {
                var t = e(this),
                    i = t.children(n.settings.region_selector);
                i.each(function() {
                    var i = e(this),
                        o = i.children(n.settings.content_selector).data("slug");
                    if ((new RegExp(o, "i")).test(r)) {
                        s = t;
                        return false
                    }
                });
                if (s != null) {
                    return false
                }
            });
            if (s != null) {
                i.each(function() {
                    if (s == e(this)) {
                        var t = e(this),
                            i = e.extend({}, n.settings, n.data_options(t)),
                            o = t.children(n.settings.region_selector),
                            u = i.deep_linking && r.length > 0,
                            a = false;
                        o.each(function() {
                            var t = e(this);
                            if (a) {
                                t.removeClass(n.settings.active_class)
                            } else if (u) {
                                var i = t.children(n.settings.content_selector).data("slug");
                                if (i && (new RegExp(i, "i")).test(r)) {
                                    if (!t.hasClass(n.settings.active_class)) t.addClass(n.settings.active_class);
                                    a = true
                                } else {
                                    t.removeClass(n.settings.active_class)
                                }
                            } else if (t.hasClass(n.settings.active_class)) {
                                a = true
                            }
                        });
                        if (!a && (i.one_up || !n.is_horizontal_nav(t) && !n.is_vertical_nav(t) && !n.is_accordion(t))) o.filter(":visible").first().addClass(n.settings.active_class)
                    }
                })
            }
        },
        reflow: function() {
            var t = Foundation.libs.section;
            e(t.settings.section_selector).removeAttr(t.settings.resized_data_attr);
            t.throttle(function() {
                t.resize()
            }, 30)()
        },
        small: function(t) {
            var n = e.extend({}, this.settings, this.data_options(t));
            if (this.is_horizontal_tabs(t)) {
                return false
            }
            if (t && this.is_accordion(t)) {
                return true
            }
            if (e("html").hasClass("lt-ie9")) {
                return true
            }
            if (e("html").hasClass("ie8compat")) {
                return true
            }
            return e(this.scope).width() < n.small_breakpoint
        },
        off: function() {
            e(this.scope).off(".fndtn.section");
            e(t).off(".fndtn.section");
            e(n).off(".fndtn.section")
        }
    };
    e.fn.reflow_section = function(e) {
        var t = this,
            n = Foundation.libs.section;
        t.removeAttr(n.settings.resized_data_attr);
        n.throttle(function() {
            n.resize(t, e)
        }, 30)();
        return this
    }
})(Foundation.zj, window, document);
(function(e, t, n, r) {
    "use strict";
    Foundation.libs.topbar = {
        name: "topbar",
        version: "4.3.2",
        settings: {
            index: 0,
            stickyClass: "sticky",
            custom_back_text: true,
            back_text: "BackAgain",
            is_hover: true,
            mobile_show_parent_link: false,
            scrolltop: true,
            init: false
        },
        init: function(n, r, i) {
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
            this.settings.$section.detach();
            this.settings.$section.find(".has-dropdown>a").each(function() {
                var n = e(this),
                    r = n.siblings(".dropdown"),
                    i = n.attr("href");
                if (t.settings.mobile_show_parent_link && i && i.length > 1) {
                    var s = e('<li class="title back js-generated"><h5><a href="#"></a></h5></li><li><a class="parent-link js-generated" href="' + i + '">' + n.text() + "</a></li>")
                } else {
                    var s = e('<li class="title back js-generated"><h5><a href="#"></a></h5></li>')
                }
                if (t.settings.custom_back_text == true) {
                    s.find("h5>a").html(t.settings.back_text)
                } else {
                    s.find("h5>a").html("&laquo; " + n.html())
                }
                r.prepend(s)
            });
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
})(Foundation.zj, this, this.document)