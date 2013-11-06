// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function getStyle(el, prop) {
    if (el.currentStyle) {
        return el.currentStyle[prop];
    } else if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(el, null).getPropertyValue(prop);
    }
}

function setStyle(el, prop, value) {
    if (el.currentStyle) {
        el.currentStyle[prop] = value;
    } else if (window.getComputedStyle) {
        el.setAttribute("style", prop + ":" + value);
    }
}

var $clouds = document.getElementsByClassName('cloud');
var pageWidth = window.innerWidth;
var isAnimating = false;

window.onresize = function() {
    pageWidth = window.innerWidth;
};

function draw() {
    var cloud;
    var width;
    var marginLeft;
    var pos;
    var speed;
    var i = 0;
    var l = $clouds.length;
    for (; i < l; i++) {
        cloud = $clouds[i];
        width = cloud.offsetWidth;
        marginLeft = getStyle(cloud, 'margin-left');
        pos = parseFloat(marginLeft);
        speed = 0.003 * width;

        if (pos + width < 0) {
            marginLeft = pageWidth;
        } else {
            marginLeft = pos - speed;
        }

        setStyle(cloud, "margin-left", marginLeft + "px");
    }
}

function animate() {
    if (!isAnimating) {
        return;
    }

    requestAnimFrame( animate );
    draw();
}

(function start() {
    isAnimating = true;
    animate();
}());
