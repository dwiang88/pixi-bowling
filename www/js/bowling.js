/*
 Copyright (c) 2015, Mike Linkovich. All rights reserved.

 http://www.spacejack.ca/

 No part of this software may be reproduced without express consent.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function elementsWithId() {
    var t, e, n, i = document.querySelectorAll("[id]");
    for (c = {}, t = 0, e = i.length; e > t; ++t)n = i[t], c[n.id] = n
}
function createCanvas() {
    try {
        var t = document.createElement("canvas");
        return !!window.WebGLRenderingContext && (t.getContext("webgl") || t.getContext("experimental-webgl"))
    } catch (e) {
        return !1
    }
}
function detectPlatform() {
    return void 0 !== navigator.standalone ? navigator.standalone : window.external && window.external.msIsSiteMode ? window.external.msIsSiteMode() : !1
}
function changeWebpage(t) {
    window.location.href = t
}
function changeWebpageFromIframe(t) {
    top.location.href = t
}
function isOnIframe() {
    return window.self !== window.top
}
function getHostName(t) {
    return t === window.location.hostname
}
function log(t) {
    var e = c.console;
    e && (e.innerHTML = t)
}
var c = {};
window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
            window.setTimeout(t, 1e3 / 60)
        }
}();
var device = {
    Android: function () {
        return navigator.userAgent.match(/Android/i)
    }, BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i)
    }, iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    }, Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i)
    }, Windows: function () {
        return navigator.userAgent.match(/IEMobile/i)
    }, FirefoxOS: function () {
        return navigator.userAgent.match(/\(Mobile/i)
    }, any: function () {
        return device.Android() || device.BlackBerry() || device.iOS() || device.Opera() || device.Windows() || device.FirefoxOS()
    }
}, ajax = {
    numActiveRequests: 0,
    doRequest: function (t, e, n, i, o) {
        var s = "GET", a = "text/xml", r = !1;
        o && (("post" === o.method || "POST" === o.method) && (s = "POST"), o.contentType && (a = o.contentType), o.sync && (r = !0));
        var h = null;
        if (window.XMLHttpRequest)h = new XMLHttpRequest, h.overrideMimeType && h.overrideMimeType(a); else if (window.ActiveXObject)try {
            h = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (l) {
            try {
                h = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (l) {
            }
        }
        if (!h)return console.error("This browser does not support AJAX."), !1;
        h.onreadystatechange = function () {
            4 === h.readyState && (--ajax.numActiveRequests, 200 === h.status ? n && n(h.responseText) : i && i(h.status))
        };
        var c = "";
        for (var u in e)if (e.hasOwnProperty(u)) {
            var p = e[u];
            c.length > 0 && (c += "&"), c += u + "=" + encodeURIComponent(p)
        }
        return ++ajax.numActiveRequests, "POST" === s ? (h.open("POST", t, !r), h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), h.send(c)) : (c && (t += "?" + c), h.open("GET", t, !r), h.send("")), !0
    }
}, converter = {
    arrayToBase64: function (t) {
        var e, n, i, o, s, a, r = "", h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", l = h.length, c = t.byteLength, u = c % 3, d = c - u;
        for (e = 0; d > e; e += 3) {
            if (a = t[e] << 16 | t[e + 1] << 8 | t[e + 2], n = (16515072 & a) >> 18, i = (258048 & a) >> 12, o = (4032 & a) >> 6, s = 63 & a, 0 > n || n >= l || 0 > i || i >= l || 0 > o || o >= l || 0 > s || s >= l)throw"Out of range bitmask during base64 encoding";
            r += h[n] + h[i] + h[o] + h[s]
        }
        return 1 === u ? (a = t[d], n = (252 & a) >> 2, i = (3 & a) << 4, r += h[n] + h[i] + "==") : 2 === u && (a = t[d] << 8 | t[d + 1], n = (64512 & a) >> 10, i = (1008 & a) >> 4, o = (15 & a) << 2, r += h[n] + h[i] + h[o] + "="), r
    }, base64ToArray: function (t) {
        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        if (t.length % 4 !== 0)throw"base64 string length not multiple of 4";
        var n = e.indexOf(t.charAt(t.length - 1)), i = e.indexOf(t.charAt(t.length - 2)), o = t.length / 4 * 3;
        64 === n && o--, 64 === i && o--;
        var s, a, r, h, l, c, u, d = 0, p = 0, w = new Uint8Array(o);
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""), d = 0; o > d; d += 3) {
            if (h = e.indexOf(t.charAt(p++)), l = e.indexOf(t.charAt(p++)), c = e.indexOf(t.charAt(p++)), u = e.indexOf(t.charAt(p++)), 0 > h || 0 > l || 0 > c || 0 > u)throw"Encountered illegal character in base64 string";
            s = h << 2 | l >> 4, a = (15 & l) << 4 | c >> 2, r = (3 & c) << 6 | u, w[d] = s, 64 !== c && (w[d + 1] = a), 64 !== u && (w[d + 2] = r)
        }
        return w
    }, hexToBase64: function (t) {
        return btoa(String.fromCharCode.apply(null, t.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")))
    }, base64ToHex: function (t) {
        var e, n, i, o;
        for (n = 0, i = atob(t.replace(/[ \r\n]+$/, "")), o = []; n < i.length; ++n)e = i.charCodeAt(n).toString(16), 1 === e.length && (e = "0" + e), o[o.length] = e;
        return o.join(" ")
    }
}, util = {
    enc: function (t) {
        return util.hex(util.md51(t))
    }, cycle: function (t, e) {
        var n = t[0], i = t[1], o = t[2], s = t[3], a = util.ff, r = util.gg, h = util.hh, l = util.ii, c = util.add32;
        n = a(n, i, o, s, e[0], 7, -680876936), s = a(s, n, i, o, e[1], 12, -389564586), o = a(o, s, n, i, e[2], 17, 606105819), i = a(i, o, s, n, e[3], 22, -1044525330), n = a(n, i, o, s, e[4], 7, -176418897), s = a(s, n, i, o, e[5], 12, 1200080426), o = a(o, s, n, i, e[6], 17, -1473231341), i = a(i, o, s, n, e[7], 22, -45705983), n = a(n, i, o, s, e[8], 7, 1770035416), s = a(s, n, i, o, e[9], 12, -1958414417), o = a(o, s, n, i, e[10], 17, -42063), i = a(i, o, s, n, e[11], 22, -1990404162), n = a(n, i, o, s, e[12], 7, 1804603682), s = a(s, n, i, o, e[13], 12, -40341101), o = a(o, s, n, i, e[14], 17, -1502002290), i = a(i, o, s, n, e[15], 22, 1236535329), n = r(n, i, o, s, e[1], 5, -165796510), s = r(s, n, i, o, e[6], 9, -1069501632), o = r(o, s, n, i, e[11], 14, 643717713), i = r(i, o, s, n, e[0], 20, -373897302), n = r(n, i, o, s, e[5], 5, -701558691), s = r(s, n, i, o, e[10], 9, 38016083), o = r(o, s, n, i, e[15], 14, -660478335), i = r(i, o, s, n, e[4], 20, -405537848), n = r(n, i, o, s, e[9], 5, 568446438), s = r(s, n, i, o, e[14], 9, -1019803690), o = r(o, s, n, i, e[3], 14, -187363961), i = r(i, o, s, n, e[8], 20, 1163531501), n = r(n, i, o, s, e[13], 5, -1444681467), s = r(s, n, i, o, e[2], 9, -51403784), o = r(o, s, n, i, e[7], 14, 1735328473), i = r(i, o, s, n, e[12], 20, -1926607734), n = h(n, i, o, s, e[5], 4, -378558), s = h(s, n, i, o, e[8], 11, -2022574463), o = h(o, s, n, i, e[11], 16, 1839030562), i = h(i, o, s, n, e[14], 23, -35309556), n = h(n, i, o, s, e[1], 4, -1530992060), s = h(s, n, i, o, e[4], 11, 1272893353), o = h(o, s, n, i, e[7], 16, -155497632), i = h(i, o, s, n, e[10], 23, -1094730640), n = h(n, i, o, s, e[13], 4, 681279174), s = h(s, n, i, o, e[0], 11, -358537222), o = h(o, s, n, i, e[3], 16, -722521979), i = h(i, o, s, n, e[6], 23, 76029189), n = h(n, i, o, s, e[9], 4, -640364487), s = h(s, n, i, o, e[12], 11, -421815835), o = h(o, s, n, i, e[15], 16, 530742520), i = h(i, o, s, n, e[2], 23, -995338651), n = l(n, i, o, s, e[0], 6, -198630844), s = l(s, n, i, o, e[7], 10, 1126891415), o = l(o, s, n, i, e[14], 15, -1416354905), i = l(i, o, s, n, e[5], 21, -57434055), n = l(n, i, o, s, e[12], 6, 1700485571), s = l(s, n, i, o, e[3], 10, -1894986606), o = l(o, s, n, i, e[10], 15, -1051523), i = l(i, o, s, n, e[1], 21, -2054922799), n = l(n, i, o, s, e[8], 6, 1873313359), s = l(s, n, i, o, e[15], 10, -30611744), o = l(o, s, n, i, e[6], 15, -1560198380), i = l(i, o, s, n, e[13], 21, 1309151649), n = l(n, i, o, s, e[4], 6, -145523070), s = l(s, n, i, o, e[11], 10, -1120210379), o = l(o, s, n, i, e[2], 15, 718787259), i = l(i, o, s, n, e[9], 21, -343485551), t[0] = c(n, t[0]), t[1] = c(i, t[1]), t[2] = c(o, t[2]), t[3] = c(s, t[3])
    }, cmn: function (t, e, n, i, o, s) {
        return e = util.add32(util.add32(e, t), util.add32(i, s)), util.add32(e << o | e >>> 32 - o, n)
    }, ff: function (t, e, n, i, o, s, a) {
        return util.cmn(e & n | ~e & i, t, e, o, s, a)
    }, gg: function (t, e, n, i, o, s, a) {
        return util.cmn(e & i | n & ~i, t, e, o, s, a)
    }, hh: function (t, e, n, i, o, s, a) {
        return util.cmn(e ^ n ^ i, t, e, o, s, a)
    }, ii: function (t, e, n, i, o, s, a) {
        return util.cmn(n ^ (e | ~i), t, e, o, s, a)
    }, md51: function (t) {
        var e, n = t.length, i = [1732584193, -271733879, -1732584194, 271733878], o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (e = 64; n >= e; e += 64)util.cycle(i, util.blk(t.substring(e - 64, e)));
        for (t = t.substring(e - 64), e = 0; e < t.length; e++)o[e >> 2] |= t.charCodeAt(e) << (e % 4 << 3);
        if (o[e >> 2] |= 128 << (e % 4 << 3), e > 55)for (util.cycle(i, o), e = 0; 16 > e; e++)o[e] = 0;
        return o[14] = 8 * n, util.cycle(i, o), i
    }, blk: function (t) {
        var e, n = [];
        for (e = 0; 64 > e; e += 4)n[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);
        return n
    }, hex_chr: "0123456789abcdef".split(""), rhex: function (t) {
        for (var e = "", n = 0; 4 > n; n++)e += util.hex_chr[t >> 8 * n + 4 & 15] + util.hex_chr[t >> 8 * n & 15];
        return e
    }, hex: function (t) {
        for (var e = 0; e < t.length; e++)t[e] = util.rhex(t[e]);
        return t.join("")
    }, add32: function (t, e) {
        return t + e & 4294967295
    }
}, encryptor = {
    c0: "`~,<.>!@#$%^&*()-_=+/?:;'\"[]{}0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    c1: "0co!v$2q#Ril(5W?{zbV_H*y;N>u}r<dOj~UCsQg9]`JME.fL[K=X/:xa)n-PG8D@7^Fm\"AeSY%B46T,twh&3'+1IpZk",
    enc: function (t) {
        if (!t)return "";
        for (var e, n, i, o = "", e = 0, i = t.length; i > e; ++e)n = encryptor.c0.indexOf(t.charAt(e)), o += encryptor.c1.charAt(n);
        return o
    },
    dec: function (t) {
        if (!t || 0 == t.length)return "";
        for (var e, n, i, o = "", e = 0, i = t.length; i > e; ++e)n = encryptor.c1.indexOf(t.charAt(e)), o += encryptor.c0.charAt(n);
        return o
    }
}, functions = 2 * Math.PI, T = {
    sign: function (t) {
        return "number" == typeof t ? t ? 0 > t ? -1 : 1 : t === t ? 0 : 0 / 0 : 0 / 0
    }, clamp: function (t, e, n) {
        return Math.min(Math.max(t, e), n)
    }, pmod: function (t, e) {
        return (t % e + e) % e
    }, angle: function (t, e) {
        return Math.atan2(e, t)
    }, lerp: function (t, e, n) {
        var i = 1 - n;
        return t * i + e * n
    }, terp: function (t, e, n) {
        var i = Math.PI * n, o = .5 * (1 - Math.cos(i)), s = 1 - o;
        return t * s + e * o
    }, len: function (t) {
        return Math.sqrt(t.x * t.x + t.y * t.y)
    }, lenSq: function (t) {
        return t.x * t.x + t.y * t.y
    }, setLen: function (t, e) {
        var n = T.len(t);
        n > 0 ? (n = e / n, t.x *= n, t.y *= n) : (t.x = e, t.y = 0)
    }, normalize: function (t) {
        T.setLen(t, 1)
    }, rotate: function (t, e) {
        var n = t.x, i = t.y, o = Math.cos(e), s = Math.sin(e);
        t.x = n * o - i * s, t.y = n * s + i * o
    }
}, graphics = function (t) {
    this.num = t ? t : 16, this.ticks = [], this.sum = 0, this.index = 0, this.f = 60, this.frameCount = 0;
    for (var e = 0; e < this.num; ++e)this.ticks.push(15), this.sum += 15;
    this.frameCount = this.num
};
graphics.prototype.update = function (t) {
    return this.sum -= this.ticks[this.index], this.sum += t, this.ticks[this.index] = t, this.index = (this.index + 1) % this.num, this.f = 1e3 * this.num / this.sum, ++this.frameCount, this.f
}, graphics.prototype.fps = function () {
    return parseFloat(Math.round(10 * this.f) / 10).toFixed(1)
};
var Model = function (t) {
    this.meshes = {}, this.textures = {}, this.quality = 2, this.completeFn = t.success, this.errFn = t.error, this.progFn = t.progress, this.totalToLoad = 3, this.numToLoad = this.totalToLoad
};
Model.tbu = "\"^'^_'Ap_", Model.mbu = "\"^'^_Tt\"A6_", Model.prototype.load = function () {
    var t = this, e = new THREE.JSONLoader, n = encryptor.dec(Model.tbu);
    this.textures.ball = THREE.ImageUtils.loadTexture(n + "ball.jpg", {}, function () {
        t.onLoadedTex()
    }), this.textures.atlas = THREE.ImageUtils.loadTexture(n + "texture-atlas-" + this.quality + ".jpg", {}, function () {
        t.onLoadedTex()
    });
    var i = encryptor.dec(Model.mbu);
    e.load(i + "pin.json", function (e, n) {
        t.onLoadedMesh("pin", e, n)
    })
}, Model.prototype.progress = function (t) {
    t = t || 1, this.numToLoad -= t, this.progFn && this.progFn(1 - this.numToLoad / this.totalToLoad), this.numToLoad < 1 && this.completeFn && this.completeFn()
}, Model.prototype.onLoadedMesh = function (t, e) {
    e.applyMatrix((new THREE.Matrix4).makeRotationX(Math.PI / 2)), e.computeVertexNormals(), this.meshes[t] = e, this.progress(1)
}, Model.prototype.onLoadedTex = function () {
    this.progress(1)
};
var action = function () {
    this.swipts = [], this.pressed = !1, this.startT = 0, this.endT = 0
};
action.prototype.onPress = function (t) {
    this.pressed || (this.pressed = !0, this.startT = Date.now(), this.endT = this.startT, this.swipts = [], this.swipts.push({
        x: t.x,
        y: t.y
    }))
}, action.prototype.onDrag = function (t) {
    this.pressed && this.swipts.push({x: t.x, y: t.y})
}, action.prototype.onRelease = function (t) {
    this.pressed && (this.swipts.push({x: t.x, y: t.y}), this.endT = Date.now(), this.pressed = !1)
}, action.prototype.getMotion = function () {
    var t, e = this.swipts.length;
    if (1 > e)return null;
    if (3 > e)return t = 2 * Math.random() - 1, {
        v: {x: 0, y: t},
        angle: T.angle(0, t),
        bias: 0,
        len: 100,
        vel: 100,
        dur: 1e3
    };
    var n = this.swipts[0], i = this.swipts[e - 1], o = {
        x: -(i.y - n.y),
        y: -(i.x - n.x)
    }, s = T.angle(o.x, o.y), a = T.len(o), r = this.endT - this.startT, h = a / (.001 * r), l = {x: 0, y: 0};
    for (t = e - 2; t > 0; --t)l.x -= this.swipts[t].y - n.y, l.y -= this.swipts[t].x - n.x;
    l.x /= e - 2, l.y /= e - 2, T.rotate(l, -s);
    var c = l.y / a;
    return {v: o, angle: s, bias: c, len: a, vel: h, dur: r}
};
var E = function (t) {
    this.alive = !0, this.lifeT = 0, this.radius = t.radius || 0, this.body = t.body || null, this.mesh = t.mesh || null
};
E.assets = null, E.canvasWidth = 640, E.canvasHeight = 640, E._v0 = {x: 0, y: 0}, E.prototype.update = function (t) {
    this.lifeT += t
}, E.prototype.render = function () {
    this.mesh && this.body && (this.mesh.position.copy(this.body.position), this.mesh.quaternion.copy(this.body.quaternion))
}, E.prototype.snuff = function () {
    this.mesh && (this.mesh.parent.remove(this.mesh), this.mesh = null), this.body && (this.body.world.remove(this.body), this.body = null)
};
var A = {};
A.LENGTH = 400, A.WIDTH = 12, A.PINS_START = A.LENGTH - 20, A.CEILING_HEIGHT = 28, A.HOLE_HEIGHT = 6, A.GUTTER_WIDTH = 3.2, A.GUTTER_HEIGHT = -1, A.ROOM_WIDTH = A.WIDTH + 2 * A.GUTTER_WIDTH, A.create = function (t, e, n) {
    var i, o, s, a, r, h, l = A.LENGTH, c = A.WIDTH, u = 1;
    i = new CANNON.Box(new CANNON.Vec3(l / 2, c / 2, u / 2)), o = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(l / 2, 0, -u / 2),
        material: n
    }), o.addShape(i), t.add(o);
    var s = new THREE.BufferGeometry, d = new Float32Array([0, -c / 2, 0, l, -c / 2, 0, l, c / 2, 0, 0, c / 2, 0, A.PINS_START, -A.ROOM_WIDTH / 2, A.HOLE_HEIGHT, A.PINS_START, -A.ROOM_WIDTH / 2, A.CEILING_HEIGHT, A.PINS_START, A.ROOM_WIDTH / 2, A.CEILING_HEIGHT, A.PINS_START, A.ROOM_WIDTH / 2, A.HOLE_HEIGHT, 0, A.ROOM_WIDTH / 2, A.GUTTER_HEIGHT, l, A.ROOM_WIDTH / 2, A.GUTTER_HEIGHT, l, A.ROOM_WIDTH / 2, A.CEILING_HEIGHT, 0, A.ROOM_WIDTH / 2, A.CEILING_HEIGHT, l, -A.ROOM_WIDTH / 2, A.GUTTER_HEIGHT, 0, -A.ROOM_WIDTH / 2, A.GUTTER_HEIGHT, 0, -A.ROOM_WIDTH / 2, A.CEILING_HEIGHT, l, -A.ROOM_WIDTH / 2, A.CEILING_HEIGHT, 0, A.ROOM_WIDTH / 2, A.CEILING_HEIGHT, l, A.ROOM_WIDTH / 2, A.CEILING_HEIGHT, l, -A.ROOM_WIDTH / 2, A.CEILING_HEIGHT, 0, -A.ROOM_WIDTH / 2, A.CEILING_HEIGHT, 0, A.ROOM_WIDTH / 2, A.GUTTER_HEIGHT, 0, c / 2, A.GUTTER_HEIGHT, l, c / 2, A.GUTTER_HEIGHT, l, A.ROOM_WIDTH / 2, A.GUTTER_HEIGHT, 0, -c / 2, A.GUTTER_HEIGHT, 0, -A.ROOM_WIDTH / 2, A.GUTTER_HEIGHT, l, -A.ROOM_WIDTH / 2, A.GUTTER_HEIGHT, l, -c / 2, A.GUTTER_HEIGHT]), p = new Float32Array([0, .5, .5, .5, .5, 1, 0, 1, .5, 0, .5, .5, 0, .5, 0, 0, .5, .5, 1, .5, 1, 1, .5, 1, .5, .5, 1, .5, 1, 1, .5, 1, .75, .25, 1, .25, 1, 0, .75, 0, .75, .5, .75, .44, 1, .44, 1, .5, .75, .5, .75, .44, 1, .44, 1, .5]), w = new Uint16Array([0, 1, 2, 2, 3, 0, 4, 5, 6, 6, 7, 4, 8, 9, 10, 10, 11, 8, 12, 13, 14, 14, 15, 12, 16, 17, 18, 18, 19, 16, 20, 21, 22, 22, 23, 20, 24, 25, 26, 26, 27, 24]);
    return s.addAttribute("position", new THREE.BufferAttribute(d, 3)), s.addAttribute("uv", new THREE.BufferAttribute(p, 2)), s.addAttribute("index", new THREE.BufferAttribute(w, 1)), r = new THREE.Mesh(s, new THREE.MeshBasicMaterial({
        shading: THREE.FlatShading,
        color: 15789024,
        map: E.assets.textures.atlas
    })), r.receiveShadow = !0, e.add(r), h = {mesh: r}, i = new CANNON.Box(new CANNON.Vec3(l / 2, A.ROOM_WIDTH / 2, .2)), o = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(l / 2, 0, A.GUTTER_HEIGHT - .2)
    }), o.addShape(i), t.add(o), a = new THREE.MeshBasicMaterial({
        shading: THREE.FlatShading,
        color: 3815994,
        ambient: 0
    }), i = new CANNON.Box(new CANNON.Vec3(l / 2, .1, (A.CEILING_HEIGHT - A.GUTTER_HEIGHT) / 2)), o = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(l / 2, -(c / 2 + A.GUTTER_WIDTH - .1), (A.CEILING_HEIGHT - A.GUTTER_HEIGHT) / 2)
    }), o.addShape(i), t.add(o), i = new CANNON.Box(new CANNON.Vec3(l / 2, .1, (A.CEILING_HEIGHT - A.GUTTER_HEIGHT) / 2)), o = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(l / 2, c / 2 + A.GUTTER_WIDTH - .1, (A.CEILING_HEIGHT - A.GUTTER_HEIGHT) / 2)
    }), o.addShape(i), t.add(o), i = new CANNON.Box(new CANNON.Vec3(.5, A.ROOM_WIDTH + 8, 4 * A.HOLE_HEIGHT)), o = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(l + 20, 0, 0),
        quaternion: (new CANNON.Quaternion).setFromEuler(0, -.1 * Math.PI, 0),
        linearDamping: .05
    }), o.addShape(i), t.add(o), h
};
var b = function (t) {
    E.call(this, t), this.mesh_shadow = t.mesh_shadow || null
};
b.prototype = Object.create(E.prototype), b.prototype.constructor = b, b.MASS = 20, b.RADIUS = 1, b.XVEL_MAX = 70, b.YVEL_MAX = 8, b.prototype.render = function (t) {
    E.prototype.render.call(this, t), this.mesh_shadow && this.mesh_shadow.position.set(this.body.position.x, this.body.position.y, .01)
}, b.prototype.snuff = function () {
    E.prototype.snuff.call(this), this.mesh_shadow && (this.mesh_shadow.parent.remove(this.mesh_shadow), this.mesh_shadow = null)
}, b.create = function (t, e, n, i) {
    var o, s, a = b.RADIUS, r = new CANNON.Sphere(a), h = null, l = new CANNON.Body({
        mass: b.MASS,
        quaternion: (new CANNON.Quaternion).setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.random() * Math.PI),
        material: n
    });
    if (l.addShape(r), e) {
        l.position.set(1, 0, a + .5);
        var c = i.getMotion();
        s = c.v, o = c.angle, Math.abs(o) > .3 && (o = .3 * T.sign(o), s.x = Math.cos(o), s.y = Math.sin(o)), T.normalize(s);
        var u = Math.min(c.vel / (1.75 * E.canvasHeight), 1);
        .6 > u && (u = .6);
        var d = b.XVEL_MAX * u, p = b.YVEL_MAX * u;
        s.x *= d, s.y *= p;
        var w = 5 - 3 * u;
        l.velocity.set(s.x, s.y, w), T.normalize(s), l.angularVelocity.set(30 * c.bias + s.y * p, s.x * d * .4, 0)
    } else l.position.set(A.PINS_START - 10, 0, a + .1), l.velocity.set(b.XVEL_MAX, 3, 0);
    if (t.add(l), e) {
        var m = new THREE.SphereGeometry(a, 32, 16);
        h = new THREE.Mesh(m, new THREE.MeshPhongMaterial({
            shading: THREE.SmoothShading,
            color: 16777215,
            ambient: 3355443,
            specular: 6710360,
            shininess: 5,
            map: E.assets.textures.ball
        })), h.castShadow = !0, e.add(h), h.position.copy(l.position), h.quaternion.copy(l.quaternion)
    }
    var f = new b({radius: a, body: l, mesh: h});
    return f
};
var _ = function (t) {
    E.call(this, t), this.state = _.STATE_ASLEEP, this.world = t.world;
    var e = this.body.position;
    this.initPos = {x: e.x, y: e.y, z: e.z}
};
_.prototype = Object.create(E.prototype), _.prototype.constructor = _, _.MASS = 3, _.STATE_ASLEEP = 0, _.STATE_AWAKE = 1, _.prototype.render = function () {
    this.state !== _.STATE_ASLEEP && this.mesh && this.body && (this.mesh.position.copy(this.body.position), this.mesh.quaternion.copy(this.body.quaternion))
}, _.prototype.snuff = function () {
    this.mesh && (this.mesh.parent.remove(this.mesh), this.mesh = null), this.body && (this.state === _.STATE_AWAKE && this.body.world.remove(this.body), this.body = null)
}, _.prototype.wake = function () {
    return this.state === _.STATE_AWAKE ? void console.warn("pin already awake") : (this.world.add(this.body), void(this.state = _.STATE_AWAKE))
}, _.prototype.sleep = function () {
    return this.state === _.STATE_ASLEEP ? void console.warn("pin already asleep") : (this.world.remove(this.body), void(this.state = _.STATE_ASLEEP))
}, _.prototype.reset = function () {
    this.body.position.copy(this.initPos), this.body.quaternion.set(0, 0, 0, 1), this.body.velocity.set(0, 0, 0), this.body.angularVelocity.set(0, 0, 0), this.body.vlambda.set(0, 0, 0), this.body.wlambda.set(0, 0, 0), this.mesh.position.copy(this.body.position), this.mesh.quaternion.copy(this.body.quaternion)
}, _.create = function (t, e, n, i) {
    var o = .25, s = 4, a = 1e-8, r = E.assets.meshes.pin, h = new CANNON.Body({
        mass: _.MASS,
        position: new CANNON.Vec3(n, i, s / 2 + a)
    }), l = new CANNON.Box(new CANNON.Vec3(o, o, s / 2));
    h.addShape(l), l = new CANNON.Sphere(2.9 * o), h.addShape(l, new CANNON.Vec3(0, 0, -.175 * s)), l = new CANNON.Sphere(2 * o), h.addShape(l, new CANNON.Vec3(0, 0, .425 * s));
    var c = null;
    e && (c = new THREE.Mesh(r, new THREE.MeshPhongMaterial({
        shading: THREE.SmoothShading,
        color: 14540253,
        ambient: 2105376,
        specular: 6710360,
        shininess: 5
    })), c.castShadow = !0, e.add(c), c.position.set(n, i, s / 2 + a));
    var u = new _({radius: o, body: h, world: t, mesh: c});
    return u
}, _.createAll = function (t, e) {
    var n, i, o, s, a = A.PINS_START, r = 3, h = 2.85, l = [];
    for (n = 1; 4 >= n; ++n)for (i = 0; n > i; ++i)o = a + r * n, s = -(h * (n - 1) / 2) + i * h, l.push(_.create(t, e, o, s));
    return l
};
var C = function (t) {
    this.camera = t.camera, this.scene = t.scene, this.xvel = 0, this.prevBallx = 0, this.camera.rotation.order = "ZXY", this.camera.rotation.set(.5 * Math.PI, .5 * Math.PI, Math.PI), this.obj = new THREE.Object3D, this.obj.add(this.camera), this.scene.add(this.obj), this.reset()
};
C.BALL_X0 = 50, C.BALL_X1 = A.LENGTH - 15, C.BALL_X_RANGE = C.BALL_X1 - C.BALL_X0, C.CAM_X0 = 0, C.CAM_X1 = A.LENGTH - 50, C.CAM_X_RANGE = C.CAM_X1 - C.CAM_X0, C.CAM_Z0 = 3.4, C.CAM_Z1 = 8, C.CAM_Z_RANGE = C.CAM_Z1 - C.CAM_Z0, C.CAM_ROT0 = 0, C.CAM_ROT1 = .15, C.CAM_ROT_RANGE = C.CAM_ROT1 - C.CAM_ROT0, C.CAM_FOV0 = 10, C.CAM_FOV1 = 36, C.CAM_FOV_RANGE = C.CAM_FOV1 - C.CAM_FOV0, C.FRICTION = .42, C.prototype.reset = function () {
    this.obj.position.set(C.CAM_X0, 0, C.CAM_Z0), this.obj.rotation.y = C.CAM_ROT0, this.camera.fov !== C.CAM_FOV0 && (this.camera.fov = C.CAM_FOV0, this.camera.updateProjectionMatrix()), this.xvel = 0, this.prevBallx = 0
}, C.prototype.update = function (t, e) {
    var n, i, o, s, a, r, h = this.camera.fov, l = h, c = .001 * e;
    t <= C.BALL_X0 ? (this.obj.position.x = C.CAM_X0, this.obj.position.z = C.CAM_Z0, this.obj.rotation.y = C.CAM_ROT0, h = C.CAM_FOV0) : t >= C.BALL_X1 ? (s = this.xvel, a = C.FRICTION * s * 6, this.xvel -= a * c, this.obj.position.x += (this.xvel + s) / 2 * c, this.obj.position.z = C.CAM_Z1, this.obj.rotation.y = C.CAM_ROT1, h = C.CAM_FOV1) : (r = (t - this.prevBallx) / c, n = (t - C.BALL_X0) / C.BALL_X_RANGE, i = T.terp(0, 1, n), o = C.CAM_X0 + i * C.CAM_X_RANGE, o < .8 * C.CAM_X1 - 1.7 * r ? this.xvel = (o - this.obj.position.x) / c : (s = this.xvel, a = C.FRICTION * s, this.xvel -= a * c, o = this.obj.position.x + (this.xvel + s) / 2 * c), this.obj.position.x = o, this.obj.position.z = C.CAM_Z0 + i * C.CAM_Z_RANGE, this.obj.rotation.y = C.CAM_ROT0 + i * C.CAM_ROT_RANGE, h = C.CAM_FOV0 + i * C.CAM_FOV_RANGE), h !== l && (this.camera.fov = h, this.camera.updateProjectionMatrix()), this.prevBallx = t
};
var v = function (t, e) {
    this.world = t, this.ball = null, this.ballMat = e, this.pins = null, this.running = !1, this.startT = Date.now(), this.prevT = this.startT
};
v.prototype.begin = function () {
    if (!this.running) {
        this.ball = b.create(this.world, null, this.ballMat, null), this.pins = _.createAll(this.world);
        for (var t = this.pins.length - 1; t >= 0; --t)this.pins[t].wake();
        this.startT = Date.now(), this.prevT = this.startT, this.running = !0;
        var e = this;
        requestAnimFrame(function () {
            e._doFrame()
        })
    }
}, v.prototype.end = function () {
    if (this.running && console.log("Warmup ending"), this.ball && (this.ball.snuff(), this.ball = null), this.pins) {
        for (var t = this.pins.length - 1; t >= 0; --t)this.pins[t].snuff();
        this.pins = null
    }
    this.running = !1
}, v.prototype._doFrame = function () {
    if (this.running) {
        var t = this, e = Date.now();
        if (e - this.startT > 5e3)return void this.end();
        var n = e - this.prevT;
        n > 100 && (n = 100);
        var i = .001 * n;
        this.world.step(i), this.prevT = e, requestAnimFrame(function () {
            t._doFrame()
        })
    }
};
var L = function (t) {
    this.container = t.container, this.world = null, this.laneMat = null, this.ballMat = null, this.ballLaneCMat = null, this.scene = null, this.camera = null, this.renderer = null, this.sunlight = null, this.assets = null, this.lane = null, this.ball = null, this.pins = null, this.camMan = null, this.swipe = new action, this.prevT = 0, this.state = L.STATE_BOOT, this.ballAtEndT = 0, this.frameScores = new Array(10), this.throwScores = [], this.frameThrowCounts = new Array(10), this.throwScore = 0, this.throwCount = 0, this.frameCount = 0, this.firstThrowScore = 0, this.score = 0, this.scores = [], this.playerName = "Anonymous", this.introVisible = !1, this.throwEnding = !1, this.waitThrow = !1, this.usingTouch = !1, this.isMobile = !1, this.performance = 1, this.warmup = null, this.fky = null, this.fky_time = 0, this.fpsMon = new graphics
};
L.STATE_BOOT = 0, L.STATE_INIT = 1, L.STATE_WAITSTART = 2, L.STATE_PLAYING = 3, L.STATE_GAMEOVER = 4, L.udst = "Y''w*__IIIv3w^mAB^m4vm^_FtI6%,S_", L.upat = "IIIv3w^mAB^m4vm^", L.run = function () {
    if (L._instance)return L._instance;
    if (elementsWithId(), !c.app_canvas_container)return console.error("app_canvas_container element not found in page"), null;
    if (!createCanvas())return c.loading_text.innerHTML = "WebGL unavailable.", null;
    var t = new L({container: c.app_canvas_container});
    return t.init() ? (L._instance = t, t) : null
}, L._instance = null, L.prototype.init = function () {
    var t = this.container.clientWidth, e = this.container.clientHeight, n = t / e, o = this;
    if (this.state = L.STATE_INIT, console.log("container: " + t + "x" + e + " aspect: " + n), !(this.renderer = new THREE.WebGLRenderer({antialias: !0})))return console.error("Failed to create THREE.WebGLRenderer"), !1;
    this.isMobile = device.any(), this.isMobile ? device.Android() || detectPlatform() || (c.homescreen_prompt.style.display = "block") : console.log("Assuming non-mobile device");
    var l = this.renderer.getContext(), d = l.getParameter(l.MAX_TEXTURE_SIZE);
    if (this.performance = 10 * d / 16384, console.log("Performance estimate: " + this.performance), this.renderer.setClearColor(1118481, 1), this.renderer.shadowMapEnabled = !0, this.renderer.shadowMapType = THREE.PCFSoftShadowMap, this.renderer.setSize(t, e), this.container.appendChild(this.renderer.domElement), E.canvasWidth = t, E.canvasHeight = e, this.scene = new THREE.Scene, this.camera = new THREE.PerspectiveCamera(20, n, 1, 1e3), this.camMan = new C({
            camera: this.camera,
            scene: this.scene
        }), this.sunlight = new THREE.DirectionalLight(16776424, 1), this.performance >= 5) {
        console.log("Good GPU detected, using shadows"), this.sunlight.castShadow = !0, this.sunlight.shadowDarkness = .625, this.sunlight.shadowCameraLeft = 30, this.sunlight.shadowCameraRight = 350, this.sunlight.shadowCameraBottom = -11, this.sunlight.shadowCameraTop = 11, this.sunlight.shadowCameraFar = 1100;
        var p = this.performance >= 9 ? 2048 : 1024;
        console.log("Using shadow map size: " + p), this.sunlight.shadowMapWidth = p, this.sunlight.shadowMapHeight = p
    }
    return this.sunlight.position.set(-30, 0, 50), this.scene.add(this.sunlight), this.ambientlight = new THREE.AmbientLight(16777215, 1), this.scene.add(this.ambientlight), window.addEventListener("resize", function () {
        o.resize()
    }, !1), this.assets = new Model({
        performance: this.performance, success: function () {
            o.onAssetsLoaded()
        }, error: function (t) {
            o.onLoadProgress(t)
        }
    }), (console.log("Loading assets..."), this.assets.load(), this.getScores(), !0)
}, L.prototype.onLoadProgress = function (t) {
    var e = Math.ceil(100 * t);
    c.loading_bar_inner.style.width = e + "%"
}, L.prototype.onAssetsLoaded = function () {
    var t = this;
    E.assets = this.assets, this.world = new CANNON.World, this.world.gravity.set(0, 0, -14), this.world.broadphase = new CANNON.SAPBroadphase(this.world), console.log("CANNON initialized"), this.laneMat = new CANNON.Material("laneMat"), this.ballMat = new CANNON.Material("ballMat"), this.ballLaneCMat = new CANNON.ContactMaterial(this.ballMat, this.laneMat, {friction: 5e-4}), this.world.addContactMaterial(this.ballLaneCMat), this.lane = A.create(this.world, this.scene, this.laneMat), this.render(), this.warmup = new v(this.world, this.ballMat), this.warmup.begin(), c.loading_block.style.display = "none", c.start_block.style.visibility = "visible", c.btn_start.onclick = function () {
        c.title_block.style.display = "none", t.start()
    }, c.btn_backtomain.onclick = function () {
        t.returnToMain()
    }, c.btn_scores.onclick = function () {
        c.title_block.style.display = "none", c.scores_block.style.display = "block"
    }, c.inp_playername.onfocus = function () {
        this.setSelectionRange(0, this.value.length)
    }, c.inp_playername.onkeyup = function (t) {
        13 == t.keyCode && c.btn_start.focus()
    }, console.log("Assets loaded, all inits ok.")
}, L.prototype.getScores = function () {
    var t = this;
    ajax.doRequest("leaderboard/data/scores.json?" + Math.floor(1e6 * Math.random()), null, function (e) {
        var n = JSON.parse(e);
        n && n.scores ? (t.scores = n.scores, t.renderScoresTable()) : console.log("Invalid scores data.")
    }, function (t) {
        console.warn("Failed to load scores: " + t)
    }, {contentType: "application/json"})
}, L.prototype.renderScoresTable = function () {
    var t = '<tr><th style="text-align:left">Name</th><th>Score</th></tr>';
    t += '<tr><td colspan="2"><hr style="margin:0" /></td></tr>';
    for (var e = 0, n = this.scores.length; n > e; ++e) {
        var i = this.scores[e];
        t += 0 === e && i.nickname === this.playerName && i.score === this.score ? '<tr><td style="text-align:left;color:#111;font-size:28px;font-weight:bold">' + i.nickname + '</td><td style="color:#111;font-size:28px;font-weight:bold">' + i.score + "</td></tr>" : '<tr><td style="text-align:left">' + i.nickname + "</td><td>" + i.score + "</td></tr>"
    }
    c.scores_table.innerHTML = t
}, L.prototype.returnToMain = function () {
    this.camMan.reset(), this.render(), c.scores_block.style.display = "none", c.score_block.style.display = "none", c.title_block.style.display = "block"
}, L.prototype.setInputHandlers = function () {
    var t = this, e = document.body, n = e.getBoundingClientRect(), i = n.left, o = n.top;
    e.addEventListener("mousedown", function (e) {
        t.onPress({x: e.clientX - i, y: e.clientY - o}), t.waitThrow && e.preventDefault()
    }), e.addEventListener("mousemove", function (e) {
        t.onDrag({x: e.clientX - i, y: e.clientY - o}), t.waitThrow && e.preventDefault()
    }), e.addEventListener("mouseup", function (e) {
        t.onRelease({x: e.clientX - i, y: e.clientY - o}), t.waitThrow && e.preventDefault()
    }), e.addEventListener("touchstart", function (e) {
        t.usingTouch = !0, t.onPress({
            x: e.changedTouches[0].clientX - i,
            y: e.changedTouches[0].clientY - o
        }), t.waitThrow && e.preventDefault()
    }), e.addEventListener("touchmove", function (e) {
        t.onDrag({
            x: e.changedTouches[0].clientX - i,
            y: e.changedTouches[0].clientY - o
        }), t.waitThrow && e.preventDefault()
    }), e.addEventListener("touchend", function (e) {
        t.onRelease({
            x: e.changedTouches[0].clientX - i,
            y: e.changedTouches[0].clientY - o
        }), t.usingTouch = !1, t.waitThrow && e.preventDefault()
    })
}, L.prototype.getfky = function () {
    var t = this;
    ajax.doRequest("services.json", {action: "fky"}, function (e) {
        var n = JSON.parse(e);
        t.fky = n.__fky, t.fky_time = Date.now()
    }, function (t) {
        console.warn("fky error: " + t)
    }, {method: "post", contentType: "application/json"})
}, L.prototype.start = function () {
    var t = this;
    this.warmup && (this.warmup.end(), this.warmup = null), this.getfky(), this.prevT = Date.now(), this.playerName = c.inp_playername.value, this.playerName = this.playerName.trim(), c.score_playername.innerHTML = this.playerName, c.score_block.style.display = "block", this.pins = _.createAll(this.world, this.scene);
    for (var e = this.pins.length - 1; e >= 0; --e)this.pins[e].wake();
    this.state = L.STATE_PLAYING, this.render(), setTimeout(function () {
        for (var e = t.pins.length - 1; e >= 0; --e)t.pins[e].sleep();
        t.setInputHandlers(), t.setupThrow()
    }, 1e3), c.btn_start.onclick = function () {
        c.score_block.style.display = "block", c.title_block.style.display = "none", t.restart()
    }, requestAnimFrame(function () {
        t.doFrame()
    })
}, L.prototype.restart = function () {
    var t = this;
    this.prevT = Date.now(), this.prevT - this.fky_time > 108e3 && this.getfky(), this.clearScoreBoard(), this.playerName = c.inp_playername.value, this.playerName = this.playerName.trim(), c.score_playername.innerHTML = this.playerName, this.snuffPins(), this.pins = _.createAll(this.world, this.scene), this.state = L.STATE_PLAYING, this.frameScores = new Array(10), this.throwScores = [], this.frameThrowCounts = new Array(10), this.throwScore = 0, this.throwCount = 0, this.frameCount = 0, this.firstThrowScore = 0, this.score = 0, this.camMan.reset(), this.render(), setTimeout(function () {
        t.setupThrow()
    }, 1e3)
}, L.prototype.clearScoreBoard = function () {
    var t;
    for (t = 1; 10 >= t; ++t)c["score" + t].innerHTML = "&nbsp;", c["bonus_" + t + "_1"].innerHTML = "&nbsp;", c["bonus_" + t + "_2"].innerHTML = "&nbsp;";
    c.bonus_10_3.innerHTML = "&nbsp;", c.score_total.innerHTML = "&nbsp;"
}, L.prototype.setupThrow = function () {
    c.throw_block.style.display = "block", this.waitThrow = !0
}, L.prototype.throwBall = function () {
    this.ball || (c.throw_block.style.display = "none", this.ball = b.create(this.world, this.scene, this.ballMat, this.swipe), this.ballAtEndT = 0)
}, L.prototype.snuffPins = function () {
    for (var t = this.pins.length - 1; t >= 0; --t)this.pins[t].snuff();
    this.pins = null
}, L.prototype.removeFallenPins = function () {
    var t, e, n, i = 0;
    for (t = this.pins.length - 1; t >= 0; --t)e = this.pins[t], n = e.body.position, (n.z < 1.95 || n.z > 2.05) && (e.snuff(), this.pins.splice(t, 1), ++i);
    return i
}, L.prototype.endThrow = function () {
    var t, e, n = this.removeFallenPins(), i = this.throwScores.length, o = !1;
    for (this.ball.snuff(), this.ball = null, t = this.pins.length - 1; t >= 0; --t)this.pins[t].sleep(), this.pins[t].reset();
    if (++this.throwCount, 1 === this.throwCount ? (e = 10 > n ? n : "<b>X</b>", c["bonus_" + (this.frameCount + 1) + "_1"].innerHTML = e, this.firstThrowScore = n, t = this.frameCount - 1, this.frameCount > 0 && (10 === this.throwScores[i - 1] || this.throwScores[i - 1] + this.throwScores[i - 2] >= 10) && (this.throwScores[i - 1] < 10 && (this.frameScores[t] = 10 + n, c["score" + (t + 1)].innerHTML = this.frameScores[t], this.score += this.frameScores[t], c.score_total.innerHTML = this.score), this.frameCount > 1 && 10 === this.throwScores[i - 1] && 10 === this.throwScores[i - 2] && (--t, this.frameScores[t] = 20 + n, c["score" + (t + 1)].innerHTML = this.frameScores[t], this.score += this.frameScores[t], c.score_total.innerHTML = this.score))) : 2 === this.throwCount ? (e = 10 === n ? "<b>X</b>" : this.pins.length > 0 ? n : "<b><i>/</i></b>", c["bonus_" + (this.frameCount + 1) + "_2"].innerHTML = e, t = this.frameCount - 1, this.frameCount > 0 && 10 === this.throwScores[i - 2] && (this.frameScores[t] = n + this.firstThrowScore + 10, c["score" + (t + 1)].innerHTML = this.frameScores[t], this.score += this.frameScores[t], c.score_total.innerHTML = this.score), n + this.firstThrowScore < 10 && (this.frameScore = n + this.firstThrowScore, this.frameScores[this.frameCount] = this.frameScore, c["score" + (this.frameCount + 1)].innerHTML = this.frameScore, this.score += this.frameScore, c.score_total.innerHTML = this.score)) : 3 === this.throwCount && (e = 10 === n ? "<b>X</b>" : this.pins.length > 0 ? n : "<b><i>/</i></b>", c.bonus_10_3.innerHTML = e, this.frameScore = n + this.throwScores[i - 1] + this.throwScores[i - 2], this.frameScores[9] = this.frameScore, c.score10.innerHTML = this.frameScore, this.score += this.frameScore, c.score_total.innerHTML = this.score), this.throwCount > 1 || this.pins.length < 1) {
        if (this.frameThrowCounts[this.frameCount] = this.throwCount, this.frameCount >= 9) {
            if (3 === this.throwCount || 2 === this.throwCount && n + this.throwScores[i - 1] < 10)return this.throwScores.push(n), void this.endGame();
            o = !0
        }
        o || (this.throwCount = 0, this.firstThrowScore = 0, ++this.frameCount), (!o || this.pins.length < 1) && (this.snuffPins(), this.pins = _.createAll(this.world, this.scene))
    }
    this.throwScores.push(n), this.throwEnding = !1, this.camMan.reset(), this.setupThrow(), this.render()
}, L.prototype.endGame = function () {
    c.scores_block.style.display = "block", this.postScore(), this.state = L.STATE_GAMEOVER, this.throwEnding = !1
}, L.prototype.postScore = function () {
    var t = this, e = this.score, n = this.playerName || "Anonymous";
    if (!(1 > e || e > 300)) {
        var i = converter.hexToBase64(util.enc(n + "	" + e));
        ajax.doRequest("services.php", {
            action: "postscore",
            __fky: this.fky,
            score: this.score,
            nickname: n,
            data: i
        }, function (e) {
            var n = JSON.parse(e);
            t.scores = n.scores, console.log("Score posted."), t.renderScoresTable()
        }, function (t) {
            console.warn("Post score failed: " + t)
        }, {method: "post", contentType: "application/json"})
    }
}, L.prototype.doFrame = function () {
    var t = Date.now(), e = t - this.prevT, n = this;
    this.fpsMon.update(e), e > 0 && (this.ball && (e > 100 && (e = 100, this.prevT = t - 100), this.update(e), this.render(e, 0)), this.prevT = t), requestAnimFrame(function () {
        n.doFrame()
    })
}, L.prototype.update = function (t) {
    var e, n = 1.25, i = .022, o = .001 * t, s = Math.ceil(o / i), a = o / s, r = this.prevT + t, h = this;
    for (e = 0; s > e; ++e)this.world.step(a * n);
    if (!this.throwEnding && this.ball) {
        var l = this.ball.body.position;
        if (l.x > A.PINS_START - 2)if (this.ballAtEndT > 0)r - this.ballAtEndT > 5e3 && (this.throwEnding = !0, this.ballAtEndT = 0, setTimeout(function () {
            h.endThrow()
        }, 100)); else {
            for (e = this.pins.length - 1; e >= 0; --e)this.pins[e].wake();
            this.ballAtEndT = r
        }
        this.camMan.update(l.x, t), l.z < -1 && (this.throwEnding = !0, setTimeout(function () {
            h.endThrow()
        }, 3e3))
    } else this.throwEnding && this.camMan.update(A.LENGTH, t)
}, L.prototype.render = function () {
    if (this.ball && this.ball.render(), this.pins)for (var t = 0, e = this.pins.length; e > t; ++t)this.pins[t].render();
    this.renderer.render(this.scene, this.camera)
}, L.prototype.resize = function () {
    var t = this.container.clientWidth, e = this.container.clientHeight;
    E.canvasWidth = t, E.canvasHeight = e, this.camera.aspect = t / e, this.camera.updateProjectionMatrix(), this.renderer.setSize(t, e), this.render()
}, L.prototype.onClick = function (t) {
    t.preventDefault()
}, L.prototype.onPress = function (t) {
    this.waitThrow && this.swipe.onPress(t)
}, L.prototype.onDrag = function (t) {
    this.swipe.pressed && this.swipe.onDrag(t)
}, L.prototype.onRelease = function (t) {
    this.swipe.pressed && (this.swipe.onRelease(t), this.waitThrow = !1, this.throwBall())
}, window.addEventListener("load", function () {
    var t = window.applicationCache;
    t && (t.addEventListener("updateready", function () {
        t.status == t.UPDATEREADY && confirm("A new version of this site is available. Load it?") && window.location.reload()
    }, !1), t.addEventListener("error", function (t) {
        console.log("app cache error: " + t)
    }, !1)), L.run()
}, !1);