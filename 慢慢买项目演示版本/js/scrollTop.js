function myEvent(t, n, e) {
    t.attachEvent ? t.attachEvent("on" + n, e) : t.addEventListener(n, e, !1)
}
myEvent(window, "load", function () {
    var n, t = document.getElementById("rtt"),
        e = (document.documentElement.clientHeight, null);
    window.onscroll = function () {
        return n = document.documentElement.scrollTop || document.body.scrollTop, t.style.display = "block", n
    }, t.onclick = function () {
        clearInterval(e), e = setInterval(function () {
            var t = (0 - n) / 10;
            t = 0 < t ? Math.ceil(t) : Math.floor(t), 0 == n && clearInterval(e), document.documentElement.scrollTop = n + t, document.body.scrollTop = n + t
        }, 30)
    }
});