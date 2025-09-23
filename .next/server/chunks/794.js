"use strict";exports.id=794,exports.ids=[794],exports.modules={9149:(e,t,r)=>{r.d(t,{H:()=>SplashCursor});var i=r(997),a=r(6689);function SplashCursor({SIM_RESOLUTION:e=128,DYE_RESOLUTION:t=1440,CAPTURE_RESOLUTION:r=512,DENSITY_DISSIPATION:o=3.5,VELOCITY_DISSIPATION:n=2,PRESSURE:l=.1,PRESSURE_ITERATIONS:u=20,CURL:c=3,SPLAT_RADIUS:s=.2,SPLAT_FORCE:d=6e3,SHADING:f=!0,COLOR_UPDATE_SPEED:m=10,BACK_COLOR:v={r:.5,g:0,b:0},TRANSPARENT:g=!0}){let x=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let r,i,a,v,g,h;let p=x.current;if(!p)return;let PointerPrototype=class PointerPrototype{constructor(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[0,0,0]}};let T={SIM_RESOLUTION:e,DYE_RESOLUTION:t,DENSITY_DISSIPATION:o,VELOCITY_DISSIPATION:n,PRESSURE:l,PRESSURE_ITERATIONS:u,CURL:c,SPLAT_RADIUS:s,SPLAT_FORCE:d,SHADING:f,COLOR_UPDATE_SPEED:m},R=[new PointerPrototype],{gl:E,ext:y}=getWebGLContext(p);function getWebGLContext(e){let t,r,i,a,o;let n={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},l=e.getContext("webgl2",n),u=!!l;u||(l=e.getContext("webgl",n)||e.getContext("experimental-webgl",n)),u?(l.getExtension("EXT_color_buffer_float"),r=l.getExtension("OES_texture_float_linear")):(t=l.getExtension("OES_texture_half_float"),r=l.getExtension("OES_texture_half_float_linear")),l.clearColor(0,0,0,1);let c=u?l.HALF_FLOAT:t&&t.HALF_FLOAT_OES;return u?(i=getSupportedFormat(l,l.RGBA16F,l.RGBA,c),a=getSupportedFormat(l,l.RG16F,l.RG,c),o=getSupportedFormat(l,l.R16F,l.RED,c)):(i=getSupportedFormat(l,l.RGBA,l.RGBA,c),a=getSupportedFormat(l,l.RGBA,l.RGBA,c),o=getSupportedFormat(l,l.RGBA,l.RGBA,c)),{gl:l,ext:{formatRGBA:i,formatRG:a,formatR:o,halfFloatTexType:c,supportLinearFiltering:r}}}function getSupportedFormat(e,t,r,i){if(!supportRenderTextureFormat(e,t,r,i))switch(t){case e.R16F:return getSupportedFormat(e,e.RG16F,e.RG,i);case e.RG16F:return getSupportedFormat(e,e.RGBA16F,e.RGBA,i);default:return null}return{internalFormat:t,format:r}}function supportRenderTextureFormat(e,t,r,i){let a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t,4,4,0,r,i,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0);let n=e.checkFramebufferStatus(e.FRAMEBUFFER);return n===e.FRAMEBUFFER_COMPLETE}y.supportLinearFiltering||(T.DYE_RESOLUTION=256,T.SHADING=!1);let Material=class Material{constructor(e,t){this.vertexShader=e,this.fragmentShaderSource=t,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(e){let t=0;for(let r=0;r<e.length;r++)t+=hashCode(e[r]);let r=this.programs[t];if(null==r){let i=compileShader(E.FRAGMENT_SHADER,this.fragmentShaderSource,e);r=createProgram(this.vertexShader,i),this.programs[t]=r}r!==this.activeProgram&&(this.uniforms=getUniforms(r),this.activeProgram=r)}bind(){E.useProgram(this.activeProgram)}};let Program=class Program{constructor(e,t){this.uniforms={},this.program=createProgram(e,t),this.uniforms=getUniforms(this.program)}bind(){E.useProgram(this.program)}};function createProgram(e,t){let r=E.createProgram();return E.attachShader(r,e),E.attachShader(r,t),E.linkProgram(r),E.getProgramParameter(r,E.LINK_STATUS)||console.trace(E.getProgramInfoLog(r)),r}function getUniforms(e){let t=[],r=E.getProgramParameter(e,E.ACTIVE_UNIFORMS);for(let i=0;i<r;i++){let r=E.getActiveUniform(e,i).name;t[r]=E.getUniformLocation(e,r)}return t}function compileShader(e,t,r){t=addKeywords(t,r);let i=E.createShader(e);return E.shaderSource(i,t),E.compileShader(i),E.getShaderParameter(i,E.COMPILE_STATUS)||console.trace(E.getShaderInfoLog(i)),i}function addKeywords(e,t){if(!t)return e;let r="";return t.forEach(e=>{r+="#define "+e+"\n"}),r+e}let S=compileShader(E.VERTEX_SHADER,`
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `),D=compileShader(E.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `),b=compileShader(E.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
     `),F=`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `,w=compileShader(E.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `),_=compileShader(E.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,y.supportLinearFiltering?null:["MANUAL_FILTERING"]),A=compileShader(E.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `),P=compileShader(E.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `),B=compileShader(E.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),U=compileShader(E.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `),L=compileShader(E.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),z=(E.bindBuffer(E.ARRAY_BUFFER,E.createBuffer()),E.bufferData(E.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),E.STATIC_DRAW),E.bindBuffer(E.ELEMENT_ARRAY_BUFFER,E.createBuffer()),E.bufferData(E.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),E.STATIC_DRAW),E.vertexAttribPointer(0,2,E.FLOAT,!1,0,0),E.enableVertexAttribArray(0),(e,t=!1)=>{null==e?(E.viewport(0,0,E.drawingBufferWidth,E.drawingBufferHeight),E.bindFramebuffer(E.FRAMEBUFFER,null)):(E.viewport(0,0,e.width,e.height),E.bindFramebuffer(E.FRAMEBUFFER,e.fbo)),t&&(E.clearColor(0,0,0,1),E.clear(E.COLOR_BUFFER_BIT)),E.drawElements(E.TRIANGLES,6,E.UNSIGNED_SHORT,0)}),N=new Program(S,D),C=new Program(S,b),I=new Program(S,w),k=new Program(S,_),M=new Program(S,A),O=new Program(S,P),X=new Program(S,B),G=new Program(S,U),Y=new Program(S,L),H=new Material(S,F);function initFramebuffers(){let e=getResolution(T.SIM_RESOLUTION),t=getResolution(T.DYE_RESOLUTION),o=y.halfFloatTexType,n=y.formatRGBA,l=y.formatRG,u=y.formatR,c=y.supportLinearFiltering?E.LINEAR:E.NEAREST;E.disable(E.BLEND),r=r?resizeDoubleFBO(r,t.width,t.height,n.internalFormat,n.format,o,c):createDoubleFBO(t.width,t.height,n.internalFormat,n.format,o,c),i=i?resizeDoubleFBO(i,e.width,e.height,l.internalFormat,l.format,o,c):createDoubleFBO(e.width,e.height,l.internalFormat,l.format,o,c),a=createFBO(e.width,e.height,u.internalFormat,u.format,o,E.NEAREST),v=createFBO(e.width,e.height,u.internalFormat,u.format,o,E.NEAREST),g=createDoubleFBO(e.width,e.height,u.internalFormat,u.format,o,E.NEAREST)}function createFBO(e,t,r,i,a,o){E.activeTexture(E.TEXTURE0);let n=E.createTexture();E.bindTexture(E.TEXTURE_2D,n),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MIN_FILTER,o),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MAG_FILTER,o),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_S,E.CLAMP_TO_EDGE),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_T,E.CLAMP_TO_EDGE),E.texImage2D(E.TEXTURE_2D,0,r,e,t,0,i,a,null);let l=E.createFramebuffer();E.bindFramebuffer(E.FRAMEBUFFER,l),E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,n,0),E.viewport(0,0,e,t),E.clear(E.COLOR_BUFFER_BIT);let u=1/e,c=1/t;return{texture:n,fbo:l,width:e,height:t,texelSizeX:u,texelSizeY:c,attach:e=>(E.activeTexture(E.TEXTURE0+e),E.bindTexture(E.TEXTURE_2D,n),e)}}function createDoubleFBO(e,t,r,i,a,o){let n=createFBO(e,t,r,i,a,o),l=createFBO(e,t,r,i,a,o);return{width:e,height:t,texelSizeX:n.texelSizeX,texelSizeY:n.texelSizeY,get read(){return n},set read(value){n=value},get write(){return l},set write(value){l=value},swap(){let e=n;n=l,l=e}}}function resizeFBO(e,t,r,i,a,o,n){let l=createFBO(t,r,i,a,o,n);return N.bind(),E.uniform1i(N.uniforms.uTexture,e.attach(0)),z(l),l}function resizeDoubleFBO(e,t,r,i,a,o,n){return e.width===t&&e.height===r||(e.read=resizeFBO(e.read,t,r,i,a,o,n),e.write=createFBO(t,r,i,a,o,n),e.width=t,e.height=r,e.texelSizeX=1/t,e.texelSizeY=1/r),e}h=[],T.SHADING&&h.push("SHADING"),H.setKeywords(h),initFramebuffers();let V=Date.now(),j=0;function updateFrame(){let e=calcDeltaTime();resizeCanvas()&&initFramebuffers(),updateColors(e),applyInputs(),step(e),render(null),requestAnimationFrame(updateFrame)}function calcDeltaTime(){let e=Date.now(),t=(e-V)/1e3;return t=Math.min(t,.016666),V=e,t}function resizeCanvas(){let e=scaleByPixelRatio(p.clientWidth),t=scaleByPixelRatio(p.clientHeight);return(p.width!==e||p.height!==t)&&(p.width=e,p.height=t,!0)}function updateColors(e){(j+=e*T.COLOR_UPDATE_SPEED)>=1&&(j=wrap(j,0,1),R.forEach(e=>{e.color=generateColor()}))}function applyInputs(){R.forEach(e=>{e.moved&&(e.moved=!1,splatPointer(e))})}function step(e){E.disable(E.BLEND),O.bind(),E.uniform2f(O.uniforms.texelSize,i.texelSizeX,i.texelSizeY),E.uniform1i(O.uniforms.uVelocity,i.read.attach(0)),z(v),X.bind(),E.uniform2f(X.uniforms.texelSize,i.texelSizeX,i.texelSizeY),E.uniform1i(X.uniforms.uVelocity,i.read.attach(0)),E.uniform1i(X.uniforms.uCurl,v.attach(1)),E.uniform1f(X.uniforms.curl,T.CURL),E.uniform1f(X.uniforms.dt,e),z(i.write),i.swap(),M.bind(),E.uniform2f(M.uniforms.texelSize,i.texelSizeX,i.texelSizeY),E.uniform1i(M.uniforms.uVelocity,i.read.attach(0)),z(a),C.bind(),E.uniform1i(C.uniforms.uTexture,g.read.attach(0)),E.uniform1f(C.uniforms.value,T.PRESSURE),z(g.write),g.swap(),G.bind(),E.uniform2f(G.uniforms.texelSize,i.texelSizeX,i.texelSizeY),E.uniform1i(G.uniforms.uDivergence,a.attach(0));for(let e=0;e<T.PRESSURE_ITERATIONS;e++)E.uniform1i(G.uniforms.uPressure,g.read.attach(1)),z(g.write),g.swap();Y.bind(),E.uniform2f(Y.uniforms.texelSize,i.texelSizeX,i.texelSizeY),E.uniform1i(Y.uniforms.uPressure,g.read.attach(0)),E.uniform1i(Y.uniforms.uVelocity,i.read.attach(1)),z(i.write),i.swap(),k.bind(),E.uniform2f(k.uniforms.texelSize,i.texelSizeX,i.texelSizeY),y.supportLinearFiltering||E.uniform2f(k.uniforms.dyeTexelSize,i.texelSizeX,i.texelSizeY);let t=i.read.attach(0);E.uniform1i(k.uniforms.uVelocity,t),E.uniform1i(k.uniforms.uSource,t),E.uniform1f(k.uniforms.dt,e),E.uniform1f(k.uniforms.dissipation,T.VELOCITY_DISSIPATION),z(i.write),i.swap(),y.supportLinearFiltering||E.uniform2f(k.uniforms.dyeTexelSize,r.texelSizeX,r.texelSizeY),E.uniform1i(k.uniforms.uVelocity,i.read.attach(0)),E.uniform1i(k.uniforms.uSource,r.read.attach(1)),E.uniform1f(k.uniforms.dissipation,T.DENSITY_DISSIPATION),z(r.write),r.swap()}function render(e){E.blendFunc(E.ONE,E.ONE_MINUS_SRC_ALPHA),E.enable(E.BLEND),drawDisplay(e)}function drawDisplay(e){let t=null==e?E.drawingBufferWidth:e.width,i=null==e?E.drawingBufferHeight:e.height;H.bind(),T.SHADING&&E.uniform2f(H.uniforms.texelSize,1/t,1/i),E.uniform1i(H.uniforms.uTexture,r.read.attach(0)),z(e)}function splatPointer(e){let t=e.deltaX*T.SPLAT_FORCE,r=e.deltaY*T.SPLAT_FORCE;splat(e.texcoordX,e.texcoordY,t,r,e.color)}function clickSplat(e){let t=generateColor();t.r*=10,t.g*=10,t.b*=10,splat(e.texcoordX,e.texcoordY,10*(Math.random()-.5),30*(Math.random()-.5),t)}function splat(e,t,a,o,n){I.bind(),E.uniform1i(I.uniforms.uTarget,i.read.attach(0)),E.uniform1f(I.uniforms.aspectRatio,p.width/p.height),E.uniform2f(I.uniforms.point,e,t),E.uniform3f(I.uniforms.color,a,o,0),E.uniform1f(I.uniforms.radius,correctRadius(T.SPLAT_RADIUS/100)),z(i.write),i.swap(),E.uniform1i(I.uniforms.uTarget,r.read.attach(0)),E.uniform3f(I.uniforms.color,n.r,n.g,n.b),z(r.write),r.swap()}function correctRadius(e){let t=p.width/p.height;return t>1&&(e*=t),e}function updatePointerDownData(e,t,r,i){e.id=t,e.down=!0,e.moved=!1,e.texcoordX=r/p.width,e.texcoordY=1-i/p.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=generateColor()}function updatePointerMoveData(e,t,r,i){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=t/p.width,e.texcoordY=1-r/p.height,e.deltaX=correctDeltaX(e.texcoordX-e.prevTexcoordX),e.deltaY=correctDeltaY(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=i}function updatePointerUpData(e){e.down=!1}function correctDeltaX(e){let t=p.width/p.height;return t<1&&(e*=t),e}function correctDeltaY(e){let t=p.width/p.height;return t>1&&(e/=t),e}function generateColor(){let e=HSVtoRGB(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function HSVtoRGB(e,t,r){let i,a,o,n,l,u,c,s;switch(n=Math.floor(6*e),l=6*e-n,u=r*(1-t),c=r*(1-l*t),s=r*(1-(1-l)*t),n%6){case 0:i=r,a=s,o=u;break;case 1:i=c,a=r,o=u;break;case 2:i=u,a=r,o=s;break;case 3:i=u,a=c,o=r;break;case 4:i=s,a=u,o=r;break;case 5:i=r,a=u,o=c}return{r:i,g:a,b:o}}function wrap(e,t,r){let i=r-t;return 0===i?t:(e-t)%i+t}function getResolution(e){let t=E.drawingBufferWidth/E.drawingBufferHeight;t<1&&(t=1/t);let r=Math.round(e),i=Math.round(e*t);return E.drawingBufferWidth>E.drawingBufferHeight?{width:i,height:r}:{width:r,height:i}}function scaleByPixelRatio(e){let t=window.devicePixelRatio||1;return Math.floor(e*t)}function hashCode(e){if(0===e.length)return 0;let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r)|0;return t}window.addEventListener("mousedown",e=>{let t=R[0];updatePointerDownData(t,-1,scaleByPixelRatio(e.clientX),scaleByPixelRatio(e.clientY)),clickSplat(t)}),document.body.addEventListener("mousemove",function handleFirstMouseMove(e){let t=R[0],r=scaleByPixelRatio(e.clientX),i=scaleByPixelRatio(e.clientY),a=generateColor();updateFrame(),updatePointerMoveData(t,r,i,a),document.body.removeEventListener("mousemove",handleFirstMouseMove)}),window.addEventListener("mousemove",e=>{let t=R[0],r=scaleByPixelRatio(e.clientX),i=scaleByPixelRatio(e.clientY),a=t.color;updatePointerMoveData(t,r,i,a)}),document.body.addEventListener("touchstart",function handleFirstTouchStart(e){let t=e.targetTouches,r=R[0];for(let e=0;e<t.length;e++){let i=scaleByPixelRatio(t[e].clientX),a=scaleByPixelRatio(t[e].clientY);updateFrame(),updatePointerDownData(r,t[e].identifier,i,a)}document.body.removeEventListener("touchstart",handleFirstTouchStart)}),window.addEventListener("touchstart",e=>{let t=e.targetTouches,r=R[0];for(let e=0;e<t.length;e++){let i=scaleByPixelRatio(t[e].clientX),a=scaleByPixelRatio(t[e].clientY);updatePointerDownData(r,t[e].identifier,i,a)}}),window.addEventListener("touchmove",e=>{let t=e.targetTouches,r=R[0];for(let e=0;e<t.length;e++)updatePointerMoveData(r,scaleByPixelRatio(t[e].clientX),scaleByPixelRatio(t[e].clientY),r.color)},!1),window.addEventListener("touchend",e=>{let t=e.changedTouches,r=R[0];for(let e=0;e<t.length;e++)updatePointerUpData(r)}),updateFrame()},[e,t,r,o,n,l,u,c,s,d,f,m,v,g]),i.jsx("div",{className:"fixed top-0 left-0 z-50 pointer-events-none",children:i.jsx("canvas",{ref:x,id:"fluid",className:"w-screen h-screen"})})}},8794:(e,t,r)=>{r.a(e,async(e,i)=>{try{r.r(t),r.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var a=r(997),o=r(9816),n=r.n(o),l=r(6689),u=r(6197),c=r(9149),s=e([u]);u=(s.then?(await s)():s)[0];let __WEBPACK_DEFAULT_EXPORT__=({isActive:e,activeSection:t,onBack:r,onComplete:i})=>{let o=(0,l.useRef)(null),[s,d]=(0,l.useState)(!1),[f,m]=(0,l.useState)(!1);(0,l.useEffect)(()=>{e?o.current&&(o.current.style.transform="translateX(0%)",d(!0)):"intro-projects"===t?o.current&&(o.current.style.transform="translateX(0%)",d(!1)):o.current&&(o.current.style.transform="translateX(100%)",d(!1))},[e,t]);let[v,g]=(0,l.useState)(!1);return(0,l.useEffect)(()=>{if(f&&e){let e=setTimeout(()=>{g(!0)},0);return()=>clearTimeout(e)}},[f,e]),(0,l.useEffect)(()=>{if(s){let e=setTimeout(()=>{m(!0)},2e3);return()=>clearTimeout(e)}m(!1)},[s]),(0,l.useEffect)(()=>(s&&!f?document.body.style.overflow="hidden":document.body.style.overflow="auto",()=>{document.body.style.overflow="auto"}),[s,f]),(0,a.jsxs)("div",{ref:o,className:"fixed top-0 left-0 w-full h-screen z-20 transition-transform duration-500 ease-out bg-blue-900",style:{transform:"translateX(100%)"},children:[(0,a.jsxs)("div",{className:"jsx-3c190f806d045eec relative z-10 flex justify-between items-center px-8 py-12 w-full max-w-7xl mx-auto h-full",children:[a.jsx(n(),{id:"3c190f806d045eec",children:".gradient-text.jsx-3c190f806d045eec{background:-webkit-linear-gradient(45deg,#22c55e,#15803d,#22c55e);background:-moz-linear-gradient(45deg,#22c55e,#15803d,#22c55e);background:-o-linear-gradient(45deg,#22c55e,#15803d,#22c55e);background:linear-gradient(45deg,#22c55e,#15803d,#22c55e);-webkit-background-size:200%200%;-moz-background-size:200%200%;-o-background-size:200%200%;background-size:200%200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;-webkit-animation:gradientMove 3s ease-in-out infinite;-moz-animation:gradientMove 3s ease-in-out infinite;-o-animation:gradientMove 3s ease-in-out infinite;animation:gradientMove 3s ease-in-out infinite;padding:0 2px;margin:0 -2px}.blue-gradient-text.jsx-3c190f806d045eec{background:-webkit-linear-gradient(45deg,#3b82f6,#60a5fa,#1e40af);background:-moz-linear-gradient(45deg,#3b82f6,#60a5fa,#1e40af);background:-o-linear-gradient(45deg,#3b82f6,#60a5fa,#1e40af);background:linear-gradient(45deg,#3b82f6,#60a5fa,#1e40af);-webkit-background-size:200%200%;-moz-background-size:200%200%;-o-background-size:200%200%;background-size:200%200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;-webkit-animation:gradientMove 3s ease-in-out infinite;-moz-animation:gradientMove 3s ease-in-out infinite;-o-animation:gradientMove 3s ease-in-out infinite;animation:gradientMove 3s ease-in-out infinite;padding:0 2px;margin:0 -2px}.purple-gradient-text.jsx-3c190f806d045eec{background:-webkit-linear-gradient(45deg,#a855f7,#ec4899,#7c3aed);background:-moz-linear-gradient(45deg,#a855f7,#ec4899,#7c3aed);background:-o-linear-gradient(45deg,#a855f7,#ec4899,#7c3aed);background:linear-gradient(45deg,#a855f7,#ec4899,#7c3aed);-webkit-background-size:200%200%;-moz-background-size:200%200%;-o-background-size:200%200%;background-size:200%200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;-webkit-animation:gradientMove 3s ease-in-out infinite;-moz-animation:gradientMove 3s ease-in-out infinite;-o-animation:gradientMove 3s ease-in-out infinite;animation:gradientMove 3s ease-in-out infinite;padding:0 2px;margin:0 -2px}@-webkit-keyframes gradientMove{0%{background-position:0%50%}50%{background-position:100%50%}100%{background-position:0%50%}}@-moz-keyframes gradientMove{0%{background-position:0%50%}50%{background-position:100%50%}100%{background-position:0%50%}}@-o-keyframes gradientMove{0%{background-position:0%50%}50%{background-position:100%50%}100%{background-position:0%50%}}@keyframes gradientMove{0%{background-position:0%50%}50%{background-position:100%50%}100%{background-position:0%50%}}"}),(0,a.jsxs)("div",{className:"jsx-3c190f806d045eec flex flex-col space-y-8",children:[(0,a.jsxs)(u.motion.h1,{initial:{opacity:0,y:30},animate:s?{opacity:1,y:0}:{opacity:0,y:30},transition:{delay:.2,duration:.8,ease:[.2,.65,.3,.9]},className:"text-5xl md:text-7xl lg:text-8xl font-bold text-white",style:{fontFamily:"'Inter', sans-serif",letterSpacing:"-0.1em"},children:["I ",a.jsx("span",{className:"jsx-3c190f806d045eec gradient-text",children:"DESIGN"})]}),(0,a.jsxs)(u.motion.h1,{initial:{opacity:0,y:30},animate:s?{opacity:1,y:0}:{opacity:0,y:30},transition:{delay:.3,duration:.8,ease:[.2,.65,.3,.9]},className:"text-5xl md:text-7xl lg:text-8xl font-bold text-white",style:{fontFamily:"'Inter', sans-serif",letterSpacing:"-0.1em"},children:["I ",a.jsx("span",{className:"jsx-3c190f806d045eec blue-gradient-text",children:"ENGINEER"})]}),(0,a.jsxs)(u.motion.h1,{initial:{opacity:0,y:30},animate:s?{opacity:1,y:0}:{opacity:0,y:30},transition:{delay:.4,duration:.8,ease:[.2,.65,.3,.9]},className:"text-5xl md:text-7xl lg:text-8xl font-bold text-white",style:{fontFamily:"'Inter', sans-serif",letterSpacing:"-0.1em"},children:["I ",a.jsx("span",{className:"jsx-3c190f806d045eec purple-gradient-text",children:"BUILD"})]})]}),a.jsx(u.motion.h1,{initial:{opacity:0,x:30},animate:s?{opacity:1,x:0}:{opacity:0,x:30},transition:{delay:.6,duration:.8,ease:[.2,.65,.3,.9]},className:"text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-lg text-right",style:{fontFamily:"'Inter', sans-serif",letterSpacing:"-0.1em"},children:"PRODUCTS IN PHYSICAL AND DIGITAL WORLDS"})]}),a.jsx(c.H,{SIM_RESOLUTION:64,DYE_RESOLUTION:512,CAPTURE_RESOLUTION:256,DENSITY_DISSIPATION:2,VELOCITY_DISSIPATION:1.5,PRESSURE:.05,PRESSURE_ITERATIONS:10,CURL:2,SPLAT_RADIUS:.15,SPLAT_FORCE:3e3,SHADING:!1,COLOR_UPDATE_SPEED:5}),a.jsx(u.AnimatePresence,{children:v&&a.jsx(u.motion.button,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},transition:{duration:.5,ease:"easeOut"},onClick:()=>{i()},className:"absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer",children:a.jsx("svg",{className:"w-8 h-8",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 14l-7 7m0 0l-7-7m7 7V3"})})})}),a.jsx("div",{className:"fixed top-6 left-6 z-50",children:a.jsx("img",{src:"/whitelogo.png",alt:"Alex Rottman",className:"h-16 w-auto brightness-110 hue-rotate-15 saturate-75"})})]})};i()}catch(e){i(e)}})}};