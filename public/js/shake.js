function harlem_shake(scriptFolder,dom_id_first) {
    var MIN_HEIGHT = 30;
    var MIN_WIDTH = 30;
    var MAX_HEIGHT = 1000;
    var MAX_WIDTH = 1000;
    var PATH_TO_SONG = scriptFolder +"/harlem-shake.ogg";
    var CSS_BASE_CLASS = "mw-harlem_shake_me"
    var CSS_FIRST_CLASS = "im_first";
    var CSS_OTHER_CLASSES = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
    var CSS_STROBE_CLASS = "mw-strobe_light";
    var PATH_TO_CSS =  scriptFolder+"/shake.css";
    var FILE_ADDED_CLASS = "mw_added_css";

    firstNode = document.getElementById(dom_id_first);
    if (dom_id_first == undefined || firstNode == null)
    {
        var allNodes = document.getElementsByTagName("*");
        for (var i = 0; i < allNodes.length; i++)
        {
            var thisNode = allNodes[i];
            if (withinBounds(thisNode))
            {
                firstNode = thisNode;
                break;
            }
        }
    }

    function addCSS() {
        var css = document.createElement("link");
        css.setAttribute("type", "text/css");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", PATH_TO_CSS);
        css.setAttribute("class", FILE_ADDED_CLASS);
        document.body.appendChild(css);
    }

    function removeAddedFiles() {
        var addedFiles = document.getElementsByClassName(FILE_ADDED_CLASS);
        for (var i = 0; i < addedFiles.length; i++) {
            document.body.removeChild(addedFiles[i]);
        }
    }

    function flashScreen() {
        var flash = document.createElement("div");
        flash.setAttribute("class", CSS_STROBE_CLASS);
        document.body.appendChild(flash);
        setTimeout(function () {
            document.body.removeChild(flash);
        }, 100);
    }

    function size(node) {
        return {
            height: node.offsetHeight,
            width: node.offsetWidth
        }
    }

    function withinBounds(node) {
        var nodeFrame = size(node);
        return (nodeFrame.height > MIN_HEIGHT && nodeFrame.height < MAX_HEIGHT && nodeFrame.width > MIN_WIDTH && nodeFrame.width < MAX_WIDTH);
    }

    function posY(elm) {
        var test = elm;
        var top = 0;
        while ( !! test) {
            top += test.offsetTop;
            test = test.offsetParent;
        }
        return top;
    }

    function viewPortHeight() {
        var de = document.documentElement;
        if ( !! window.innerWidth) {
            return window.innerHeight;
        } else if (de && !isNaN(de.clientHeight)) {
            return de.clientHeight;
        }
        return 0;
    }

    function scrollY() {
        if (window.pageYOffset) {
            return window.pageYOffset;
        }
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    }

    var vpH = viewPortHeight();
    var st = scrollY();

    function isVisible(node) {
        var y = posY(node);
        return (y >= st && y <= (vpH + st));
    }

    function playSong() {
        var audioTag = document.createElement("audio");
        audioTag.setAttribute("class", FILE_ADDED_CLASS);
        audioTag.src = PATH_TO_SONG;
        audioTag.loop = false;
        audioTag.addEventListener("canplay", function () {
            setTimeout(function () {
                shakeFirst(firstNode);
            }, 500);
            setTimeout(function () {
                stopShakeAll();
                flashScreen();
                for (var i = 0; i < allShakeableNodes.length; i++) {
                    shakeOther(allShakeableNodes[i]);
                }
            }, 15500);
        }, true);
        audioTag.addEventListener("ended", function () {
            stopShakeAll();
            removeAddedFiles();
        }, true);
        audioTag.innerHTML = "<p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p>"
        document.body.appendChild(audioTag);
        audioTag.play();
    }

    function shakeFirst(node) {
        node.className += " " + CSS_BASE_CLASS + " " + CSS_FIRST_CLASS;
    }

    function shakeOther(node) {
        node.className += " " + CSS_BASE_CLASS + " " + CSS_OTHER_CLASSES[Math.floor(Math.random() * CSS_OTHER_CLASSES.length)];
    }

    function stopShakeAll() {
        var shakingNodes = document.getElementsByClassName(CSS_BASE_CLASS);
        var regex = new RegExp('\\b' + CSS_BASE_CLASS + '\\b');
        for (var i = 0; i < shakingNodes.length;) {
            shakingNodes[i].className = shakingNodes[i].className.replace(regex, "");
        }
    }
    var allNodes = document.getElementsByTagName("*");
    addCSS();
    playSong();
    var allShakeableNodes = [];
    for (var i = 0; i < allNodes.length; i++)
    {
        var thisNode = allNodes[i];
        if (withinBounds(thisNode))
        {
            allShakeableNodes.push(thisNode);
        }
    }
    if (dom_id_first != undefined && firstNode != null)
    {
        allShakeableNodes.push(firstNode);
    }
}

var scriptlocs = document.getElementsByTagName("script"), thisscriptsrc = scriptlocs[scriptlocs.length-1].src;
var scriptFolder = thisscriptsrc.substr(0, thisscriptsrc.lastIndexOf( '/' )+1 );


jQuery(function () {
    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
    jQuery(document).keydown(function(e)
    {
        kkeys.push( e.keyCode );
        if ( kkeys.toString().indexOf( konami ) >= 0 )
        {
            jQuery(document).unbind("keydown", arguments.callee);
            harlem_shake(scriptFolder, 'shakemefirst');
        }
    });
});