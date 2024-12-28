// Creates polygons in Desmos 3D from Blender output

state = Calc.getState()

// Set object name
objectName = 'newton'

//// PASTE BLENDER OUTPUT HERE

////

n = polygons.length
a = 0
a2 = -0.247
phi = 2.2
d = 1000
lightlist = [Math.cos(phi),Math.sin(phi),0.25] // CHANGED
light = normalize(lightlist)
// flattenedVertices = []

dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

function cross(a, b) {
    return [-1*(a[1]*b[2]-a[2]*b[1]), -1*(a[2]*b[0]-a[0]*b[2]), -1*(a[0]*b[1]-a[1]*b[0])];
}

function normalize(v) {
    mag = Math.sqrt(v[0]**2+v[1]**2+v[2]**2);
    return [v[0]/mag, v[1]/mag, v[2]/mag];
}

function normal(v) {
    return cross([v[6]-v[3], v[7]-v[4], v[8]-v[5]], [v[0]-v[3], v[1]-v[4], v[2]-v[5]]);
}

function shadow(face) {
    return 0.5 + dot(light, normalize(normal(getface(face)))) * .5;
}

function winding(list) {
    // console.log(list)
    sum = 0;
    for (i in [...Array(list.length - 1).keys()]) {
        sum += (list[parseInt(i)+1][0]-list[parseInt(i)][0])*(list[parseInt(i)+1][1]+list[parseInt(i)][1])
    }
    sum += (list[0][0]-list[list.length-1][0])*(list[0][1]+list[list.length-1][1]);
    // console.log(sum)
    return sum;
}

function f1(x,y,theta) {
    return [d/(d-f2(x,y,theta))*x*Math.cos(a+theta), d/(d-f2(x,y,theta))*(x*Math.sin(a2)*Math.sin(a+theta)+y*Math.cos(a2))];
}

function f1c(x,y,z) {
    if (x<0) {
        // return f1(Math.sqrt(x**2+z**2),Math.atan((z+0.0001)/x) + Math.PI,y); // CHANGED

        return f1(Math.sqrt(x**2+z**2),y,Math.atan((z+0.0001)/x) + Math.PI);
    }
    // return f1(Math.sqrt(x**2+z**2),Math.atan((z+0.0001)/x),y); // CHANGED

    return f1(Math.sqrt(x**2+z**2),y,Math.atan((z+0.0001)/x));
}

function f2(x,y,theta) {
    return x*Math.sin(a+theta)*Math.cos(a2)-y*Math.sin(a2);
}

function f2c(x,y,z) {
    x = parseFloat(x);
    y = parseFloat(y);
    z = parseFloat(z);
    if (x < 0) {
        return f2(Math.sqrt(x**2+z**2),y,Math.atan((z+0.0001)/x) + Math.PI);
    }
    return f2(Math.sqrt(x**2+z**2),y,Math.atan((z+0.0001)/x));
}

// Define color list
var myColors="";
var myDepths="";
var myOpacity=[];
var v1=""; // First vertex of each triangle
var v2=""; // Second
var v3=""; // Third
// v1Text = ""
// v2Text = ""
// v3Text = ""

// for (let i = 0; i < n; i++) {
//     v1_2d = f1c(verticesRaw[polygons[i].slice(4,5)][0], -verticesRaw[polygons[i].slice(4,5)][2], verticesRaw[polygons[i].slice(4,5)][1]); // CHANGED (swapped [2] and [1], made [2] negative
//     v2_2d = f1c(verticesRaw[polygons[i].slice(5,6)][0], -verticesRaw[polygons[i].slice(5,6)][2], verticesRaw[polygons[i].slice(5,6)][1]);
//     v3_2d = f1c(verticesRaw[polygons[i].slice(6,7)][0], -verticesRaw[polygons[i].slice(6,7)][2], verticesRaw[polygons[i].slice(6,7)][1]);
//     flattenedVertices.push([v1_2d, v2_2d, v3_2d])
// }
// console.log(flattenedVertices)

for (let i = 0; i < n; i++) {
    // coordRaw = flattenedVertices[i];
    // if (winding(coordRaw) > 0) {
        vertex1 = "v_{ertices}\\left[" + polygons[i].slice(4,5) + "+1\\right]"
        vertex2 = "v_{ertices}\\left[" + polygons[i].slice(5,6) + "+1\\right]";
        vertex3 = "v_{ertices}\\left[" + polygons[i].slice(6,7) + "+1\\right]";
        // if (!myColors.includes("\\operatorname{hsv}\\left("+polygons[i].slice(1,4)+"\\right),")) {
        //     myColors += "\\operatorname{hsv}\\left("+polygons[i].slice(1,4)+"\\right),";
        // }
        myColors += "\\operatorname{rgb}\\left("+polygons[i].slice(1,4)+"\\right),";

        // myColors += "\\operatorname{hsv}\\left("+polygons[i].slice(1,4)+"\\cdot s_{hadow}\\left("+ vertex1 + "," + vertex2 + "," + vertex3 + "\\right)\\right),";
        myOpacity.push(polygons[i].slice(0,1));
        v1 += "v_{ertices" + objectName + "}\\left[" + polygons[i].slice(4,5) + "+1\\right],";
        v2 += "v_{ertices" + objectName + "}\\left[" + polygons[i].slice(5,6) + "+1\\right],";
        v3 += "v_{ertices" + objectName + "}\\left[" + polygons[i].slice(6,7) + "+1\\right],";
        // v1 += "(" + v1Raw + "),"
        // v2 += "(" + v2Raw + "),"
        // v3 += "(" + v3Raw + "),"
    // }
    
    // v1_2d = f1c(verticesRaw[polygons[i].slice(4,5)][0], verticesRaw[polygons[i].slice(4,5)][1], verticesRaw[polygons[i].slice(4,5)][2]);
    // v2_2d = f1c(verticesRaw[polygons[i].slice(5,6)][0], verticesRaw[polygons[i].slice(5,6)][1], verticesRaw[polygons[i].slice(5,6)][2]);
    // v3_2d = f1c(verticesRaw[polygons[i].slice(6,7)][0], verticesRaw[polygons[i].slice(6,7)][1], verticesRaw[polygons[i].slice(6,7)][2]);
    // flattenedVertices.push([v1_2d, v2_2d, v3_2d])
}

myDepths = myDepths.slice(0,-1)
myColors = myColors.slice(0,-1)
v1 = v1.slice(0,-1)
v2 = v2.slice(0,-1)
v3 = v3.slice(0,-1)

var myPolygons2 = ""

// Flatten vertices
// for (v in verticesRaw) {
//     flattenedVertices.push(f1c(verticesRaw[v][0], verticesRaw[v][1], verticesRaw[v][2]));
// }

// console.log(flattenedVertices);

// FIXME: backface culling
// v1Text = ""
// v2Text = ""
// v3Text = ""
// var polygonText = "\\operatorname{triangle}\\left(\\left["+v1+"\\right],\\left["+v2+"\\right],\\left["+v3+"\\right]\\right)";
// for (let i = 0; i < n; i++) {
//     // Only add polygons that face the camera
//     coordRaw = flattenedVertices[i];
//     if (winding(coordRaw) > 0) {
//         v1Text += v1[i] + ","
//         v2Text += v2[i] + ","
//         v3Text += v3[i] + ","
//     }
// }
// v1Text = v1Text.slice(0,-1)
// v2Text = v2Text.slice(0,-1)
// v3Text = v3Text.slice(0,-1)
// console.log(v1Text);
// console.log(v1)

var polygonText = "\\operatorname{triangle}\\left(\\left["+v1+"\\right],\\left["+v2+"\\right],\\left["+v3+"\\right]\\right)";



// for (let i = 0; i < n; i++) {
//     // numVertices = polygons[i].length - 4
//     polygonText = "v_{ertices}\\left[s_{"+objectName+i+"}+1\\right],"
//     polygonText = polygonText.slice(0,-1)
    
//     myPolygons2 += "p_{olygon}\\left("+polygonText+"\\right),"
// }
// myPolygons2 = myPolygons2.slice(0,-1)


state.expressions.list.push(
{
    type: "folder",
    id: "3",
    collapsed: true,
    title: objectName
},
{ // Color list
    type: "expression",
    folderId: "3",
    latex: "c_{olors" + objectName + "}=\\left["+myColors+"\\right]"
},
// { // Graph polygons
//     type: "expression",
//     folderId: "3",
//     lineOpacity: "1",
//     lineWidth: "1",
//     fillOpacity: "0",
//     colorLatex: "\\left(\\left["+myColors+"\\right]",
//     latex: polygonText
// },
{ // Graph polygons
    type: "expression",
    folderId: "3",
    lineOpacity: "0",
    fillOpacity: "\\left["+myOpacity+"\\right]",
    visible: "v_{isible}=1",
    colorLatex: "\\left["+myColors+"\\right]",
    latex: polygonText
},
{
    type: "expression",
    folderId: "3",
    hidden: true,
    latex: "v_{ertices" + objectName + "}=[" + vertices + "]"
},
// {
//     type: "expression",
//     folderId: "3",
//     latex: "v_{ertices3d"+objectName+"}=[" + vertices_3d + "]",
//     hidden: true
// },
)
// Add individual polygon expressions
// for (let i = 0; i < polygons.length; i++) {
//     state.expressions.list.push({
//         type: "expression",
//         folderId: "3",
//         latex: "s_{"+objectName+i+"}=\\left["+polygons[i].slice(4)+"\\right]"
//     })
// }

Calc.setState(state)
