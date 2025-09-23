"use strict";exports.id=515,exports.ids=[515],exports.modules={515:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var s=a(997),i=a(6689),l=a.n(i),n=a(1163),o=a(3784),c=a(2949),u=e([c]);c=(u.then?(await u)():u)[0];let x=`
varying vec2 vUv;
uniform float time;
uniform vec4 resolution;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`,d=`
precision highp float;
varying vec2 vUv;
uniform float time;
uniform vec4 resolution;

float PI = 3.141592653589793238;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
}

float smin( float a, float b, float k ) {
    k *= 6.0;
    float h = max( k-abs(a-b), 0.0 )/k;
    return min(a,b) - h*h*h*k*(1.0/6.0);
}

float sphereSDF(vec3 p, float r) {
    return length(p) - r;
}

float sdf(vec3 p) {
    vec3 p1 = rotate(p, vec3(0.0, 0.0, 1.0), time/5.0);
    vec3 p2 = rotate(p, vec3(1.), -time/5.0);
    vec3 p3 = rotate(p, vec3(1., 1., 0.), -time/4.5);
    vec3 p4 = rotate(p, vec3(0., 1., 0.), -time/4.0);
    
    float final = sphereSDF(p1 - vec3(-0.5, 0.0, 0.0), 0.35);
    float nextSphere = sphereSDF(p2 - vec3(0.55, 0.0, 0.0), 0.3);
    final = smin(final, nextSphere, 0.1);
    nextSphere = sphereSDF(p2 - vec3(-0.8, 0.0, 0.0), 0.2);
    final = smin(final, nextSphere, 0.1);
    nextSphere = sphereSDF(p3 - vec3(1.0, 0.0, 0.0), 0.15);
    final = smin(final, nextSphere, 0.1);
    nextSphere = sphereSDF(p4 - vec3(0.45, -0.45, 0.0), 0.15);
    final = smin(final, nextSphere, 0.1);
    
    return final;
}

vec3 getNormal(vec3 p) {
    float d = 0.001;
    return normalize(vec3(
        sdf(p + vec3(d, 0.0, 0.0)) - sdf(p - vec3(d, 0.0, 0.0)),
        sdf(p + vec3(0.0, d, 0.0)) - sdf(p - vec3(0.0, d, 0.0)),
        sdf(p + vec3(0.0, 0.0, d)) - sdf(p - vec3(0.0, 0.0, d))
    ));
}

float rayMarch(vec3 rayOrigin, vec3 ray) {
    float t = 0.0;
    for (int i = 0; i < 100; i++) {
        vec3 p = rayOrigin + ray * t;
        float d = sdf(p);
        if (d < 0.001) return t;
        t += d;
        if (t > 100.0) break;
    }
    return -1.0;
}

void main() {
    vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
    vec3 cameraPos = vec3(0.0, 0.0, 5.0);
    vec3 ray = normalize(vec3((vUv - vec2(0.5)) * resolution.zw, -1));
    vec3 color = vec3(0.95, 0.95, 0.95); // Slightly darker off-white background
    
    float t = rayMarch(cameraPos, ray);
    if (t > 0.0) {
        vec3 p = cameraPos + ray * t;
        vec3 normal = getNormal(p);
        float fresnel = pow(1.0 + dot(ray, normal), 3.0);
        color = vec3(0.8, 0.0, 0.0); // Red lava
        gl_FragColor = vec4(color, 1.0);
    } else {
        gl_FragColor = vec4(color, 1.0); // White background
    }
}
`,f=l().memo(()=>{let e=(0,i.useRef)(),{size:t}=(0,o.useThree)(),a=(0,i.useMemo)(()=>({time:{value:0},resolution:{value:new c.Vector4}}),[]);return(0,i.useEffect)(()=>{let e,r;let{width:s,height:i}=t;i/s>1?(e=s/i*1,r=1):(e=1,r=i/s/1),a.resolution.value.set(s,i,e,r)},[t,a]),(0,o.useFrame)(t=>{e.current&&(a.time.value=t.clock.elapsedTime)}),(0,s.jsxs)("mesh",{ref:e,children:[s.jsx("planeGeometry",{args:[5,5]}),s.jsx("shaderMaterial",{uniforms:a,vertexShader:x,fragmentShader:d})]})});f.displayName="LavaLampShader";let Typewriter=({text:e,speed:t=100,cursor:a="|",loop:r=!1,deleteSpeed:l=50,delay:n=1500,className:o,style:c})=>{let[u,x]=(0,i.useState)(""),[d,f]=(0,i.useState)(0),[v,m]=(0,i.useState)(!1),[p,h]=(0,i.useState)(0),g=Array.isArray(e)?e:[e],y=g[p]||"";return(0,i.useEffect)(()=>{if(!y)return;let e=setTimeout(()=>{v?u.length>0?x(e=>e.slice(0,-1)):(m(!1),f(0),h(e=>(e+1)%g.length)):d<y.length?(x(e=>e+y[d]),f(e=>e+1)):r&&setTimeout(()=>m(!0),n)},v?l:t);return()=>clearTimeout(e)},[d,v,y,r,t,l,n,u,e]),(0,s.jsxs)("span",{className:o,style:c,children:[u,s.jsx("span",{className:"animate-pulse",children:a})]})},__WEBPACK_DEFAULT_EXPORT__=({isActive:e,onBack:t})=>{let a=(0,i.useRef)(null),[r,l]=(0,i.useState)(!1),[c,u]=(0,i.useState)(!1),[x,d]=(0,i.useState)(!1),[v,m]=(0,i.useState)(!1),[p,h]=(0,i.useState)(!1),[g,y]=(0,i.useState)(null),[S,w]=(0,i.useState)({left:0,width:0}),j=(0,i.useRef)(null),b=(0,i.useRef)(null),N=(0,n.useRouter)();return(0,i.useEffect)(()=>{if(null!==g&&j.current&&b.current){let e=j.current.children[g],t=j.current.getBoundingClientRect(),a=e.getBoundingClientRect(),r=b.current.getBoundingClientRect(),s=a.left-t.left+(a.width-r.width)/2;w({left:Math.max(0,Math.min(s,t.width-r.width)),width:r.width})}},[g]),(0,i.useEffect)(()=>{e?a.current&&setTimeout(()=>{a.current&&(a.current.style.transform="translateY(0%)",l(!0),setTimeout(()=>{l(!1),setTimeout(()=>{l(!0)},100)},200))},100):a.current&&(a.current.style.transform="translateY(100%)",l(!1))},[e]),(0,s.jsxs)("div",{ref:a,className:"fixed bottom-0 left-0 w-full h-screen z-40 transition-transform duration-700 ease-out bg-gray-50",style:{transform:"translateY(100%)"},children:[s.jsx("div",{className:"fixed top-6 left-6 z-[100]",children:s.jsx("button",{onClick:()=>N.push("/"),className:"bg-transparent border-none p-0 cursor-pointer",children:s.jsx("img",{src:"/logo.png",alt:"Alex Rottman",className:"h-16 w-auto brightness-110 hue-rotate-15 saturate-75 transition-transform duration-300 ease-in-out hover:scale-110"})})}),s.jsx("div",{style:{width:"100%",height:"100%",position:"absolute",zIndex:0},children:s.jsx(o.Canvas,{camera:{left:-.5,right:.5,top:.5,bottom:-.5,near:-1e3,far:1e3,position:[0,0,2]},orthographic:!0,gl:{antialias:!0},children:s.jsx(f,{},e?"active":"inactive")})}),(0,s.jsxs)("div",{className:"h-full relative z-10",children:[s.jsx("div",{className:"fixed left-16",style:{top:"1in"},children:s.jsx("button",{onClick:()=>{N.push("/physical-projects")},onMouseEnter:()=>u(!0),onMouseLeave:()=>u(!1),className:"relative px-12 py-8 rounded-full transition-all duration-300 ease-in-out bg-transparent hover:scale-105",children:s.jsx("div",{className:"flex items-center",children:s.jsx("h2",{className:"text-6xl md:text-8xl font-bold",children:s.jsx("div",{className:"relative",children:s.jsx(Typewriter,{text:"lets get physical",speed:150,loop:!1,className:`uppercase tracking-[-0.1em] whitespace-nowrap mix-blend-difference transition-colors duration-300 ${c?"text-red-300":"text-white"}`,style:{fontFamily:"'Inter', sans-serif",letterSpacing:"-0.1em",textShadow:"0 0 10px rgba(255,255,255,0.5)"}},`physical-${r?"active":"inactive"}`)})})})})}),s.jsx("div",{className:"fixed right-16",style:{bottom:"1in"},children:s.jsx("button",{onClick:()=>{N.push("/visual-projects")},onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),className:"relative px-12 py-8 rounded-full transition-all duration-300 ease-in-out bg-transparent hover:scale-105",children:s.jsx("div",{className:"flex items-center",children:s.jsx("h2",{className:"text-6xl md:text-8xl font-bold",children:s.jsx("div",{className:"relative",children:s.jsx(Typewriter,{text:"lets get visual",speed:150,loop:!1,className:`uppercase tracking-[-0.1em] whitespace-nowrap mix-blend-difference transition-colors duration-300 ${x?"text-red-300":"text-white"}`,style:{fontFamily:"'Inter', sans-serif",letterSpacing:"-0.1em",textShadow:"0 0 10px rgba(255,255,255,0.5)"}},`visual-${r?"active":"inactive"}`)})})})})})]})]})};r()}catch(e){r(e)}})}};