(function () {
    function l(a, d) {
        this.i = (this.g = "PUBLIC" !== a) ? a : "*";
        this.j = d
    }
    l.prototype.init = function (a) {
        window.addEventListener("message", function (d) {
            d = d.data;
            d.isCanvaApi && (a[d.type] || $.noop)(d)
        }, !1);
        this.sendMessage({
            type: "Init",
            authenticated: this.g
        })
    };
    l.prototype.sendMessage = function (a) {
        a.isCanvaApi = !0;
        this.j.postMessage(a, this.i)
    };
    var x = new q;

    function q() { }
    q.prototype.setInterval = function (a, d) {
        return window.setInterval(a, d)
    };
    q.prototype.clearInterval = function (a) {
        window.clearInterval(a)
    };
    q.prototype.setTimeout = function (a, d) {
        return window.setTimeout(a, d)
    };
    q.prototype.clearTimeout = function (a) {
        window.clearTimeout(a)
    };
    q.prototype.requestAnimationFrame = function (a) {
        return window.requestAnimationFrame(a)
    };
    q.prototype.cancelAnimationFrame = function (a) {
        window.cancelAnimationFrame(a)
    };

    function y() {
        var a = $("body");

        function d() {
            a.mousemove(function (b) {
                p = b.clientX;
                r = b.clientY;
                w = Date.now();
                t || k()
            });
            $(window).on("blur mouseout", function () {
                r = p = null
            }).on("resize", function () {
                e && e.parentNode && e.parentNode.removeChild(e);
                m()
            });
            m()
        }

        function m() {
            var b, c;
            u();
            b = a.width();
            c = a.height();
            e = document.createElement("canvas");
            e.className = "loginFun";
            e.width = b;
            e.height = c;
            //e.style.background = "url(www.canva.com/images/under2_.jpg) no-repeat center center fixed #3f4652";
            //e.style.backgroundSize = "cover";
            a.append(e);
            f = document.createElement("canvas");
            f.width = b;
            f.height = c;
            if (e.getContext && e.getContext("2d") && (n = e.getContext("2d"), g = f.getContext("2d"),
                g.lineCap = "round", g.shadowColor = "#000000", g.shadowBlur = -1 < navigator.userAgent.indexOf("Firefox") ? 0 : 30, !h)) {
                h = new Image;
                if (!a.css("background-image")) throw Error("element must have a background image");
                $(h).one("load", k);
                $(h).attr("src", "www.canva.com/images/under1_.jpg");
              //  $(h).css("background","url(../../../../../www.canva.com/images/under2_.jpg) no-repeat center center fixed #3f4652");
            }
        }

        function u() {
            v = [];
            $(".js-blurEffect--skip").each(function (b, a) {
                var c;
                c = $(a);
                c.is(":visible") && (b = c.position(), a = c.outerWidth(), c = c.outerHeight(), v.push({
                    top: b.top,
                    left: b.left,
                    width: a,
                    height: c
                }))
            })
        }

        function k() {
            var b, d = Date.now();
            b = a.scrollTop();
            t = d > w + 500 ? !1 : !0;
            p && t && c.unshift({
                time: d,
                x: p,
                y: r + b
            });
            for (b = 0; b < c.length;) 1E3 < d - c[b].time ? c.length = b : b++;
            0 < c.length && x.requestAnimationFrame(k);
            g.clearRect(0, 0, f.width, f.height);
            for (b = 1; b < c.length; b++) {
                var m = Math.sqrt(Math.pow(c[b].x - c[b - 1].x, 2) + Math.pow(c[b].y - c[b - 1].y, 2));
                g.strokeStyle = "rgba(0,0,0," + Math.max(1 - (d - c[b].time) / 1E3, 0) + ")";
                g.lineWidth = 25 + 75 * Math.max(1 - m / 50, 0);
                g.beginPath();
                g.moveTo(c[b - 1].x, c[b - 1].y);
                g.lineTo(c[b].x, c[b].y);
                g.stroke()
            }
            d = e.width;
            b = e.width / h.naturalWidth *
                h.naturalHeight;
            b < e.height && (b = e.height, d = e.height / h.naturalHeight * h.naturalWidth);
            n.drawImage(h, 0, 0, d, b);
            n.globalCompositeOperation = "destination-in";
            n.drawImage(f, 0, 0);
            n.globalCompositeOperation = "source-over";
            v.forEach(function (b) {
                n.clearRect(b.left, b.top, b.width, b.height)
            })
        }
        var e, f, n, g, h, p = null,
            r = null,
            c = [],
            w = 0,
            t = !0,
            v = [];
        "createTouch" in document || a.hasClass("newSignup") || $(d)
    };
    $(function () {
        y()
    });

    function z() {
        var a = {
            embedDomain: "PUBLIC"
        };

        function d(a) {
            0 === $(a.target).closest(".signupForm, .loginForm, .resetForm, .header, .footer").length && f.sendMessage({
                type: "LoginSignup",
                action: "hide"
            })
        }

        function m(a) {
            a = a.emailAddress;
            e();
            a && $("#emailSignup #email").val(a);
            u()
        }

        function u() {
            window.setTimeout(function () {
                f.sendMessage({
                    type: "LoginSignup",
                    action: "show"
                })
            }, 300)
        }

        function k() {
            var a = $("body").css("background-image").replace("url", "").replace("(", "").replace(")", "").replace(/["']/g, "");
            f.sendMessage({
                type: "LoginSignup",
                action: "pageTransition",
                l: a
            })
        }

        function e() {
            $("html").addClass("embedded");
            $(".embedded canvas").css("display", "none");
            if (/login\?redirect/gi.test(window.location.href)) {
                var a = window.location.href.replace("login?", "signup?").replace("redirect", "signupRedirect"),
                    a = a + "%3Fonboarding%26layouts";
                $(function () {
                    if (1 === $("#signupLinkWrapper a").length) $("#signupLinkWrapper a").attr("href", a), $("#signupLinkWrapper a").on("mousedown", k);
                    else {
                        var d = $('\x3ca href\x3d"' + a + '"\x3eSignup now\x3c/a\x3e');
                        d.on("mousedown",
                            k);
                        $("#loginForm .message").html("Don\x26#8217;t have an account?").append(d)
                    }
                })
            } else if (/signup\?signupRedirect/gi.test(window.location.href)) {
                var d = window.location.href.replace("signup?", "login?").replace("signupRedirect", "redirect");
                $(function () {
                    if (1 === $("#loginLinkWrapper a").length) $("#loginLinkWrapper a").attr("href", d), $("#loginLinkWrapper a").on("mousedown", k);
                    else {
                        var a = $('\x3cp style\x3d"margin-top:2em;"\x3eAlready have an account?\x3c/p\x3e'),
                            c = $('\x3ca href\x3d"' + d + '"\x3eLogin\x3c/a\x3e');
                        a.append(c);
                        c.on("mousedown", k);
                        $("#signupForm").append(a)
                    }
                })
            }
            var e = document.createElement("style");
            e.setAttribute("type", "text/css");
            var f = document.head || document.getElementsByTagName("head")[0];
            e.styleSheet ? e.styleSheet.cssText = "\n.embedded .header__menu { display: none !important; } .embedded footer { display: none !important; } .embedded body \x3e canvas { display: none !important; } " : e.appendChild(document.createTextNode("\n.embedded .header__menu { display: none !important; } .embedded footer { display: none !important; } .embedded body \x3e canvas { display: none !important; } "));
            f.appendChild(e);
            $("footer").hide()
        }
        if (window !== window.top) {
            var f = new l(a.embedDomain, window.parent);
            f.init({
                blur: function () { },
                focus: function () { },
                registerOrShowLogin: m
            });
            f.sendMessage({
                type: "LoginSignup"
            });
            window.addEventListener("click", d, !1)
        }
    }
    window !== window.top && z();
})();