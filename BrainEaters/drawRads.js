/*
 *		Curve version 2.0
 *
 *		Smooth curves (cardinal splines) on canvas.
 *
 *		By Ken Fyrstenberg Nilsen (c) 2013
 *		Abdias Software, http://abdiassoftware.com/
 *
 *		MIT licensed.
*/
/*if (typeof CanvasRenderingContext2D !== "undefined") {
    CanvasRenderingContext2D.curve = function (A, I, m, l) {
        var z,
            B = [],
            J, K,
            j,
            E, F, G, H,
            c, d, e, f,
            C, D,
            s,
            w, u, v,
            n, o, p, q,
            parI, parM,
            r = A.length,
            a = !1,
            g, h,
            b = 0.25,
            k = 5;
        I = (typeof I === "number") ? I : 0.5;
        if (typeof m === "number") {
            m = parseInt(m, 10);
            if (m === 0) { m = -4 }
            a = m < 0 ? !0 : !1;
            b = 1 / Math.abs(m);
            parI = parseInt(l);
            parM = parseInt(l, 10);
            if (a === !0) { k = (parI != parM) ? parM : 10 }
            if (k < 1) { k = 1 }
        }
        else { a = !0 }
        z = A.concat();
        z.unshift(A[1]);
        z.unshift(A[0]);
        z.push(A[r - 2], A[r - 1]);
        for (j = 2; j < r; j += 2) {
            n = z[j];
            o = z[j + 1];
            p = z[j + 2];
            q = z[j + 3];
            E = (p - z[j - 2]) * I;
            G = (z[j + 4] - n) * I;
            F = (q - z[j - 1]) * I;
            H = (z[j + 5] - o) * I;
            if (a === !0) {
                g = p - n;
                h = q - n;
                m = (Math.max(k, Math.abs(Math.sqrt(g * g + h * h)) * b + 0.5)) | 0
            }
            for (D = 0; D <= m; D++) {
                C = D / m;
                s = Math.pow(C, 2);
                v = s * C;
                u = s * 3;
                w = v * 2;
                c = w - u + 1;
                d = u - w;
                e = v - 2 * s + C;
                f = v - s;
                J = c * n + d * p + e * E + f * G;
                K = c * o + d * q + e * F + f * H;
                this.lineTo(J, K)
            }
        } return this
    }
};*/
//end of MIT licensed function
//var canvasT = (<HTMLCanvasElement>document.getElementById('myCanvas2')),
//    ctx = canvasT.getContext("2d"),
//    cb = canvasT.width * 0.5,radius = 90,
//pts,
//startAngle = -70,
//endAngle = 70,
//lines = 5,
//angle,
//range,
//steps,
//delta = 15,
//x, y,
//i,
//    cy = canvasT.height * 0.5;
///// calculate angle range normalized to 0 degrees
//startAngle = startAngle * Math.PI / 180;
//endAngle = endAngle * Math.PI / 180;
//range = endAngle - startAngle;
//steps = range / (lines + 1);
///// calculate point at circle (vertical only)
//for (i = 1; i <= lines; i++) {
//    pts = [cb + radius * Math.cos(startAngle + steps * i),
//        cy + radius * Math.sin(startAngle + steps * i),
//        500,
//        y + delta * ((y - cy) / cy),
//        cb - (x - cb),
//        cy + radius * Math.sin(startAngle + steps * i)];
//    ///  draw curve
//    ctx.beginPath();
//    ctx.curve(pts, 0.8);
//    ctx.stroke();
//}
//ctx.lineWidth = 3;
//ctx.strokeStyle = '#000000';
//ctx.beginPath();
//ctx.arc(cb, cy, radius, 0, 2 * Math.PI);
//ctx.stroke();
var canvasR = document.getElementById('myCanvas'), cr = canvasR.getContext("2d"), 
//defaultOptions = [500, 500, 700, 700],
cw = canvasR.width * 0.5, ch = canvasR.height * 0.5, ca = [0, canvasR.width * .25], cb = [canvasR.width * .25, canvasR.width * .5], cc = [canvasR.width * .5, canvasR.width * .75], cd = [canvasR.width * .75, canvasR.width], ra = [0, canvasR.height * .25], rb = [canvasR.height * .25, canvasR.height * .5], rc = [canvasR.height * .5, canvasR.height * .75], rd = [canvasR.height * .75, canvasR.height], numOfSteps = 60, newXEnd, test1, newYEnd, yi, er, san, test, startX, startY, part1二, part2二, part1三, part2三, part3三, c一 = [30, 90, 180, 90], c二 = [40, 60, 165, 60,
    30, 150, 170, 150], c三 = [40, 40, 165, 40,
    50, 100, 150, 100,
    30, 150, 170, 150], goalX, goalY, xStepSize, yStepSize, cripes = [60, 80, 30, 18], bargs = [50, 70, 100, 170];
cr.lineWidth = 1;
cr.strokeStyle = '#000000';
cr.beginPath();
cr.moveTo(ca[0], rb[0]);
cr.lineTo(cd[1], rb[0]);
cr.stroke();
cr.beginPath();
cr.moveTo(ca[0], rc[0]);
cr.lineTo(cd[1], rc[0]);
cr.stroke();
cr.beginPath();
cr.moveTo(ca[0], rd[0]);
cr.lineTo(cd[1], rd[0]);
cr.stroke();
cr.beginPath();
cr.moveTo(ca[1], ra[0]);
cr.lineTo(ca[1], rd[1]);
cr.stroke();
cr.beginPath();
cr.moveTo(cc[1], ra[0]);
cr.lineTo(cc[1], rd[1]);
cr.stroke();
cr.beginPath();
cr.moveTo(cb[1], ra[0]);
cr.lineTo(cb[1], rd[1]);
cr.stroke();
function drawLine(args) {
    cr.lineWidth = 5;
    cr.strokeStyle = '#000000';
    cr.beginPath();
    cr.moveTo(args[0], args[1]);
    //setting goal coordinates for use in the setInterval. 
    goalX = args[2];
    goalY = args[3];
    //setting starter coordinates.
    startX = args[0];
    startY = args[1];
    if (goalX != startX || goalY != startY) {
        xStepSize = (goalX - startX) / numOfSteps;
        yStepSize = (goalY - startY) / numOfSteps;
        setInterval(function () {
            newXEnd = xStepSize + startX;
            newYEnd = yStepSize + startY;
            cr.lineTo(newXEnd, newYEnd);
            cr.stroke();
            startX = newXEnd;
            startY = newYEnd;
            if (xStepSize != Math.abs(xStepSize)) {
                if (startX < goalX || startY < goalY) {
                    startX = goalX;
                    startY = goalY;
                }
            }
            if (xStepSize == Math.abs(xStepSize)) {
                if (startX > goalX || startY > goalY) {
                    startX = goalX;
                    startY = goalY;
                }
            }
        }, 25);
    }
    else {
        cr.lineTo(goalX, goalY);
        cr.stroke();
    }
    cr.closePath();
    // setTimeout(() => { }, 25 * numOfSteps);
}
function drawCurve(args) {
    cr.lineWidth = 5;
    cr.strokeStyle = '#000000';
    cr.beginPath();
    cr.moveTo(args[0], args[1]);
    cr.closePath();
}
function draw(radColRow) {
    console.log(radColRow.length);
    if (radColRow.length == 2) {
        //if (radColRow[0] == ca[0] && radColRow[1] == ca[1] && radColRow[2] == rb[0] && radColRow[3] == rb[1]) {
        drawLine(c一);
    }
    else if (radColRow.length == 4) {
        part1二 = c二.slice(0, 4);
        drawLine(part1二);
        setTimeout(function () {
            part2二 = c二.slice(4, 8);
            drawLine(part2二);
        }, 25 * numOfSteps);
    }
    else if (radColRow.length == 6) {
        part1三 = c三.slice(0, 4);
        drawLine(part1三);
        setTimeout(function () {
            part2三 = c三.slice(4, 8);
            drawLine(part2三);
        }, 25 * numOfSteps);
        setTimeout(function () {
            part3三 = c三.slice(9, 12);
            drawLine(part3三);
        }, 25 * 25 * numOfSteps);
    }
}
function drawCharacter(char) {
    if (char == c一) {
        yi = [ca, rb];
        draw(yi);
    }
    else if (char == c二) {
        er = [ca, rb,
            ca, rd];
        draw(er);
    }
    else if (char == c三) {
        san = [ca, rb,
            cb, rc,
            ca, rd];
        draw(san);
    }
}
drawCharacter(c三);
//drawCharacter(c二); 
//drawCharacter(c一);
function eraseCharacter(obj) {
    //cr.clearRect(x, y, w, h);
}
/* bezier-spline.js
 *
 * computes cubic bezier coefficients to generate a smooth
 * line through specified points. couples with SVG graphics
 * for interactive processing.
 *
 * For more info see:
 * http://www.particleincell.com/2012/bezier-splines/
 *
 * Lubos Brieda, Particle In Cell Consulting LLC, 2012
 * you may freely use this algorithm in your codes however where feasible
 * please include a link/reference to the source article
 */
//var svg = document.documentElement /*svg object*/
//    , S = new Array() /*splines*/
//    , V = new Array() /*vertices*/
//    , C 	/*current object*/
//    , x0, y0;	/*svg offset*/
///*saves elements as global variables*/
//function init() {
//    /*create splines*/
//    S[0] = createPath("blue");
//    S[1] = createPath("red");
//    S[2] = createPath("green");
//    S[3] = createPath("brown");
//    /*create control points*/
//    V[0] = createKnot(60, 60);
//    V[1] = createKnot(220, 300);
//    V[2] = createKnot(420, 300);
//    V[3] = createKnot(700, 240);
//    updateSplines();
//}
///*creates and adds an SVG circle to represent knots*/
//function createKnot(x, y) {
//    var C = document.createElementNS("http://www.w3.org/2000/svg", "circle")
//    C.setAttributeNS(null, "r", 22)
//    C.setAttributeNS(null, "cx", x)
//    C.setAttributeNS(null, "cy", y)
//    C.setAttributeNS(null, "fill", "gold")
//    C.setAttributeNS(null, "stroke", "black")
//    C.setAttributeNS(null, "stroke-width", "6")
//    C.setAttributeNS(null, "onmousedown", "startMove(evt)")
//    svg.appendChild(C)
//    return C
//}
///*creates and adds an SVG path without defining the nodes*/
//function createPath(color, width) {
//    width = (typeof width == 'undefined' ? "8" : width);
//    var P = document.createElementNS("http://www.w3.org/2000/svg", "path")
//    P.setAttributeNS(null, "fill", "none")
//    P.setAttributeNS(null, "stroke", color)
//    P.setAttributeNS(null, "stroke-width", width)
//    svg.appendChild(P)
//    return P
//}
///*from http://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html*/
//function startMove(evt) {
//	/*SVG positions are relative to the element but mouse 
//	  positions are relative to the window, get offset*/
//    x0 = getOffset(svg).left;
//    y0 = getOffset(svg).top;
//    C = evt.target
//    svg.setAttribute("onmousemove", "move(evt)")
//    svg.setAttribute("onmouseup", "drop()")
//}
///*called on mouse move, updates dragged circle and recomputes splines*/
//function move(evt) {
//    x = evt.clientX - x0;
//    y = evt.clientY - y0;
//    /*move the current handle*/
//    C.setAttributeNS(null, "cx", x)
//    C.setAttributeNS(null, "cy", y)
//    updateSplines();
//}
///*called on mouse up event*/
//function drop() {
//    svg = document.getElementsByTagName('svg')[0];
//    svg.setAttributeNS(null, "onmousemove", null)
//}
///*computes spline control points*/
//function updateSplines() {	
//    /*grab (x,y) coordinates of the control points*/
//    x = new Array();
//    y = new Array();
//    for (i = 0; i < 4; i++) {
//        /*use parseInt to convert string to int*/
//        x[i] = parseInt(V[i].getAttributeNS(null, "cx"))
//        y[i] = parseInt(V[i].getAttributeNS(null, "cy"))
//    }
//    /*computes control points p1 and p2 for x and y direction*/
//    px = computeControlPoints(x);
//    py = computeControlPoints(y);
//    /*updates path settings, the browser will draw the new spline*/
//    for (i = 0; i < 3; i++)
//        S[i].setAttributeNS(null, "d",
//            path(x[i], y[i], px.p1[i], py.p1[i], px.p2[i], py.p2[i], x[i + 1], y[i + 1]));
//}
///*creates formated path string for SVG cubic path element*/
//function path(x1, y1, px1, py1, px2, py2, x2, y2) {
//    return "M " + x1 + " " + y1 + " C " + px1 + " " + py1 + " " + px2 + " " + py2 + " " + x2 + " " + y2;
//}
///*computes control points given knots K, this is the brain of the operation*/
//function computeControlPoints(K) {
//    p1 = new Array();
//    p2 = new Array();
//    n = K.length - 1;
//    /*rhs vector*/
//    a = new Array();
//    b = new Array();
//    c = new Array();
//    r = new Array();
//    /*left most segment*/
//    a[0] = 0;
//    b[0] = 2;
//    c[0] = 1;
//    r[0] = K[0] + 2 * K[1];
//    /*internal segments*/
//    for (i = 1; i < n - 1; i++) {
//        a[i] = 1;
//        b[i] = 4;
//        c[i] = 1;
//        r[i] = 4 * K[i] + 2 * K[i + 1];
//    }
//    /*right segment*/
//    a[n - 1] = 2;
//    b[n - 1] = 7;
//    c[n - 1] = 0;
//    r[n - 1] = 8 * K[n - 1] + K[n];
//    /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
//    for (i = 1; i < n; i++) {
//        m = a[i] / b[i - 1];
//        b[i] = b[i] - m * c[i - 1];
//        r[i] = r[i] - m * r[i - 1];
//    }
//    p1[n - 1] = r[n - 1] / b[n - 1];
//    for (i = n - 2; i >= 0; --i)
//        p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];
//    /*we have p1, now compute p2*/
//    for (i = 0; i < n - 1; i++)
//        p2[i] = 2 * K[i + 1] - p1[i + 1];
//    p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);
//    return { p1: p1, p2: p2 };
//}
///*code from http://stackoverflow.com/questions/442404/dynamically-retrieve-html-element-x-y-position-with-javascript*/
//function getOffset(el) {
//    var _x = 0;
//    var _y = 0;
//    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
//        _x += el.offsetLeft - el.scrollLeft;
//        _y += el.offsetTop - el.scrollTop;
//        el = el.offsetParent;
//    }
//    return { top: _y, left: _x };
//}
//function animateA(opts) {
//    let start = new Date;
//    let id = setInterval(() => {
//        let timePassed = Number(new Date) - Number(start);
//        let progress = timePassed / opts.duration;
//        if (progress > 1) {
//            progress = 1;
//        }
//        let delta = opts.delta(progress);
//        opts.step(delta);
//        if (progress == 1) {
//            clearInterval(id);
//        }
//    }, opts.delay || 10)
//}
//function draw(element, delta, x, duration = 1000) {
//    let to = 40;
//    animateA({
//        delay: 10,
//        duration: duration, // 1 sec by default
//        delta: delta,
//        step: ((delta) => {
//            element.style.x = to * delta + "px";
//        })
//    })
//}
//function move(element, delta, duration = 1000) {
//    let to = 500;
//    //var leftNum = (<HTMLDivElement>document.getElementById(`${element}`)).style.left;
//    animateA({
//        delay: 10,
//        duration: duration, // 1 sec by default
//        delta: delta,
//        step: ((delta) => {
//            element.style.left = to * delta + "px";
//        })
//    })
//}
//$('.example_path').click(() => {
//    $('.exampBlock').animate({
//        width: "+=10px"
//    }, 1000);
//});
//$('.exampBlock').click(() => {
//    var left = $('.exampBlock').css("left");
//    $("#result").html("That div is <span style='left:" +
//        left + ";'>" + left + "</span>.");
//});
//$('.example_path').click(() => {
//    let to = 500;
//});
//animate({
//    delay: 10,
//    duration: 1000, // 1 sec by default
//    delta: function (p) { return p; },
//    step: ((delta) => {
//        $('.exampBlock').css("width") = to * delta;
//    })
//})
/*var app = angular.module('myApp', ['ngAnimate']); app.controller('animationsCtrl', function ($scope) { $scope.fadeAnimation = false; });

var apper = angular.module('myApp', ['ngAnimate'])
    .directive('customDirective', function ($animate) {
        return function (scope, element, attrs) {
            element.on('click', function () {
                if (element.hasClass('clicked')) {
                    $animate.removeClass(element, 'clicked');
                } else {
                    $animate.addClass(element, 'clicked');
                }
            });
        };
//    });*/
//var app = angular.module('myApp', ['ngAnimate']); app.controller('animationsCtrl', function ($scope) { $scope.items = [{ name: 'Richard' }, { name: 'Bruno' }, { name: 'Jobson' }]; $scope.counter = 0; $scope.addItem = function () { var name = 'Item' + $scope.counter++; $scope.items.push({ name: name }); }; $scope.removeItem = function () { var length = $scope.items.length; var indexRemoved = Math.floor(Math.random() * length); $scope.items.splice(indexRemoved, 1); }; $scope.sortItems = function () { $scope.items.sort(function (a, b) { return a[name] < b[name] ? -1 : 1 }); }; });
//var canvasR = (<HTMLCanvasElement>document.getElementById('myCanvas')),
//    cr = canvasR.getContext("2d"),
//    //defaultOptions = [500, 500, 700, 700],
//    cw = canvasR.width * 0.5,
//    ch = canvasR.height * 0.5,
//    radius = 90,
//    pts,
//    startAngle = -70,
//    endAngle = 70,
//    lines = 5,
//    angle,
//    range,
//    steps,
//    delta = 15,
//    x, y,
//    i,
//    numOfSteps = 60,
//    args = [50, 70, 100, 170];
//cr.lineWidth = 3;
//cr.strokeStyle = '#000000';
////cr.beginPath();
////cr.arc(cw, ch, radius, 0, 2 * Math.PI);
////cr.stroke();
//function drawLine(args) {
//    cr.beginPath();
//    if (args[0] && args[1]) {
//        cr.moveTo(args[0], args[1]);
//    }
//    //setting goal coordinates for use in the setInterval. 
//    let goalX = args[2];
//    let goalY = args[3];
//    //setting starter coordinates.
//    let startX = args[0];
//    let startY = args[1];
//    if (goalX != startX && goalY != startY) {
//        let xStepSize = (goalX - startX) / numOfSteps;
//        let yStepSize = (goalY - startY) / numOfSteps;
//        setInterval(() => {
//            let newXEnd = xStepSize + startX;
//            let newYEnd = yStepSize + startY;
//            cr.lineTo(newXEnd, newYEnd);
//            cr.stroke();
//            startX = newXEnd;
//            startY = newYEnd;
//            if (startX > goalX) { startX = goalX; }
//            if (startY > goalY) { startY = goalY; }
//        }, 25);
//    }
//    else {
//        cr.lineTo(goalX, goalY);
//        cr.stroke();
//    }
//    cr.closePath();
//}
//let cripes = [60, 60, 80, 180];
//drawLine(cripes);
//drawLine(args);
