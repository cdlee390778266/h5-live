var AjaxLite = {
    Browser: {
        IE: !!(window.attachEvent && !window.opera),
        Opera: !!window.opera,
        WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
        Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1
    },
    IE: __getIE(),
    mode: {
        Post: "Post",
        Get: "Get"
    },
    getRequest: function () {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        } else {
            try {
                return new ActiveXObject("MSXML2.XMLHTTP")
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    return false
                }
            }
        }
    }
};
function __getIE() {
    if (window.ActiveXObject) {
        var v = navigator.userAgent.match(/MSIE ([^;]+)/)[1];
        return parseFloat(v.substring(0, v.indexOf(".")))
    }
    return false
};
Array.prototype.foreach = function (func) {
    if (func && this.length > 0) {
        for (var i = 0; i < this.length; i++) {
            func(this[i])
        }
    }
};
String.format = function () {
    if (arguments.length == 0) return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regExp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(regExp, arguments[i])
    }
    return str
};
String.prototype.startWith = function (s) {
    return this.indexOf(s) == 0
};
String.prototype.endWith = function (s) {
    var d = this.length - s.length;
    return (d >= 0 && this.lastIndexOf(s) == d)
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '')
};
function getid(id) {
    return (typeof id == 'string') ? document.getElementById(id) : id
};

document.getElementsByClassName = function (name) {
    var tags = document.getElementsByTagName('*') || document.all;
    var els = [];
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className && typeof tags[i].className=="string") {
            var cs = tags[i].className.split(' ');
            for (var j = 0; j < cs.length; j++) {
                if (name == cs[j]) {
                    els.push(tags[i]);
                    break
                }
            }
        }
    }
    return els
};
var getby = document.getElementsByClassName;
function Cookie() { }
Cookie.Save = function (n, v, mins, dn, path) {
    if (n) {
        if (!mins) mins = 365 * 24 * 60;
        if (!path) path = "/";
        var date = new Date();
        date.setTime(date.getTime() + (mins * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        if (dn) dn = "domain=" + dn + "; ";
        document.cookie = name + "=" + value + expires + "; " + dn + "path=" + path
    }
};
Cookie.Del = function (n) {
    save(n, '', -1)
};
Cookie.Get = function (n) {
    var name = n + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return ""
};

function getcookie(name) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}
function setcookie(cookieName, cookieValue) {
    var expires = new Date();
    var now = parseInt(expires.getTime());
    var et = (86400 - expires.getHours() * 3600 - expires.getMinutes() * 60 - expires.getSeconds());
    expires.setTime(now + 1000000 * (et - expires.getTimezoneOffset() * 60));
    document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";expires=" + expires.toGMTString() + "; path=/";
}
function getOffsetTop(el, p) {
    var _t = el.offsetTop;
    while (el = el.offsetParent) {
        if (el == p) break;
        _t += el.offsetTop
    }
    return _t
};
function getOffsetLeft(el, p) {
    var _l = el.offsetLeft;
    while (el = el.offsetParent) {
        if (el == p) break;
        _l += el.offsetLeft
    }
    return _l
};
function attach(o, e, f) {
    if (document.attachEvent)
        o.attachEvent("on" + e, f);
    else if (document.addEventListener)
        o.addEventListener(e, f, false);
}




//--------- ToolBox --------------
var currentInput = null;
var iswords = false;

function BoxShow(e) {
    var input = e;
    if (!input.id) {
        input = e.target ? e.target : e.srcElement;
    }
    currentInput = input;
    if (iswords) {
        FillUrls("toolbox_words");
    }
    else {
        FillUrls("toolbox_urls");
    }
    var box = getid("ToolBox");
    if (box.style.display == 'block' && currentInput.id == input.id) {
        return;
    }
    
    box.style.left = getOffsetLeft(input) + 'px';
    box.style.top = (getOffsetTop(input) + (input.offsetHeight - 1)) + 'px';
    box.style.width = (input.offsetWidth - 2) + 'px';
    box.style.display = 'block';
}
function BoxShowWords(e) {
    iswords = true;
    BoxShow(e);
}
function BoxShowUrls(e) {
    iswords = false;
    BoxShow(e);
}
function InputSetValue(val) {
    var obj = currentInput;
    obj.value = val;
    if (obj.getAttribute('url') == 'true') {
        var tags = document.getElementsByTagName('input');
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].getAttribute('url') == 'true' && tags[i] != obj) {
                tags[i].value = val;
            }
        }
    }
    BoxHide();
}
function BoxHide() {
    if (getid("ToolBox")) {
        getid("ToolBox").style.display = 'none';
    }
}
function InputMouseOverWords(e) {
    var input = e.target ? e.target : e.srcElement;
    if (input) {
        input.focus();
    }
}
function ToolBoxExsit(val)
{
	var urls = getcookie("toolbox_urls");
	 if (urls != '' && urls != ';') {
		var urllist = urls.split('|');
		for (var i = 0; i < urllist.length; i++) {
			 var textval = urllist[i];
			if(textval ==val)
			{
				return true;
			}
		}
	}
	return false;
}
function ToolBoxAdd() {
    BoxHide();
    var val = currentInput.value;
    if (val.trim() == '') {
        alert("不能添加空值。");
        return;
    }
	if(ToolBoxExsit(val )==true)
{
//alert("不能添加重复值。");
        return;
}
	var urls = getcookie("toolbox_urls");
	 if (urls == '' )
	 {
		urls=val; 
	 }	
	else
	{
		urls=urls+"|"+val;
	}
			
    setcookie("toolbox_urls",urls);
}
function ToolBoxDeleteValue(val) {
    BoxHide();
	var nstr='';
	var urls = getcookie("toolbox_urls");
   if (urls != '' && urls != ';') {
        var urllist = urls.split('|');
        for (var i = 0; i < urllist.length; i++) {
            var textval = urllist[i];
			if(val!=textval)
			{
				if(nstr=='')
				{
					nstr=textval;
				}
				else{
					nstr=nstr+"|"+textval;
				}
			}
        }
		setcookie("toolbox_urls",nstr);
    }
}

function FillUrls(cookieName) {
    var urls = getcookie(cookieName);
	
    var html = "<li><a href='javascript:;' onclick='ToolBoxAdd()'>＋保存输入框的网址</a></li>";
    if (urls != '' && urls != ';') {
        var urllist = urls.split('|');
        for (var i = 0; i < urllist.length; i++) {
            var textval = urllist[i];
            html += "<li><a href=\"javascript:InputSetValue('" + textval + "');\"><input type='button' value='删除' onclick=\"ToolBoxDeleteValue('" + textval + "');\" /> " + textval + "</a></li>";
        }
    }
    else {
        html += "<li>没有记录</li>"
    }
    getid("xlist").innerHTML = html;
}

function closeIME(e){
    var obj = e.target ? e.target : e.srcElement;
    obj.style.imeMode = 'disabled';
}

function OnPaste(e) {
    var obj = e.target ? e.target : e.srcElement;
   // setTimeout("MoveHttp('" + obj.id + "')", 100);
}

function MoveHttp(id) {
    var val = getid(id).value;
    val = val.replace("http://", "");
    var temp = val.split('/');
    if (temp.length <= 2) {
        if (val[val.length - 1] == '/') {
            val = val.substring(0, val.length - 1);
        }
    }
    getid(id).value = val;
}

function OnKeyup(e) {
    var obj = e.target ? e.target : e.srcElement;
    setTimeout("addInput('" + obj.id + "')", 200);
}

function addInput(id) {
    var obj = getid(id);
    if (obj.value.indexOf('。') > 0) {
        obj.value = obj.value.replace('。', '.');
    }
    var tags = document.getElementsByTagName('input');
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].getAttribute('url') == 'true' && tags[i] != obj) {
            tags[i].value = obj.value;
        }
    }
}


//-----------------最近查询创建节点结束----------------------
function Init() {
    getid("ToolBox").style.display = 'none';
    var tags = document.getElementsByTagName('input');
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].getAttribute('url') == 'true') {
            attach(tags[i], 'keyup', OnKeyup);
            attach(tags[i], 'mousedown', BoxShowUrls);
            attach(tags[i], 'mouseout', BoxHide);
            attach(tags[i], 'paste', OnPaste);
            tags[i].setAttribute('autocomplete', 'off');
        }
        else if (tags[i].getAttribute('words') == 'true') {
            attach(tags[i], 'click', BoxShowWords);
            attach(tags[i], 'mouseout', BoxHide);
            tags[i].setAttribute('autocomplete', 'off');
        }
    }
}


function IsURL(strUrl) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|xyz|top|ren|club|wang|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    }
    else {
        return false;
    }
}
var isload = false;
window.onload = window.onresize = function () {
    var ex_width = document.body.offsetWidth;
    var gotop_left = (ex_width - 900) / 2 - 26;
    isload = true;
}
window.onscroll = function () {
    document.getElementById('gotop').style.display = 'none';
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    if (scrollTop > 0) {
        if (!isload) {
            var ex_width = document.body.offsetWidth;
            var gotop_left = (ex_width - 900) / 2 - 26;
            document.getElementById('gotop').style.right = gotop_left + 'px';
            isload = true;
        }
        document.getElementById('gotop').style.display = 'block';
    } else {
        document.getElementById('gotop').style.display = 'none';
    }
}

