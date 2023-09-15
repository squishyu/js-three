import{Vector3 as t,MathUtils as e,Quaternion as r,Matrix4 as s,Raycaster as a,Scene as i,PerspectiveCamera as n,Euler as o,WebGLRenderer as h,PCFSoftShadowMap as d,REVISION as l,sRGBEncoding as c,HemisphereLight as p,DirectionalLight as y}from"three";const{atan:u,cos:v,exp:g,log:m,tan:w,PI:x}=Math,{degToRad:A,radToDeg:M}=e,b=6371010,f=Math.PI*b;function L(t){return window.google&&google.maps&&(t instanceof google.maps.LatLng||t instanceof google.maps.LatLngAltitude)?{altitude:0,...t.toJSON()}:{altitude:0,...t}}function S(e,r,s=new t){const[a,i]=D(e),[n,o]=D(r);return s.set(a-n,i-o,0),s.multiplyScalar(v(A(r.lat))),s.z=e.altitude-r.altitude,s}function D(t){return[b*A(t.lng),b*m(w(.25*x+.5*A(t.lat)))]}function R(t){const[e,r]=t;return{lat:M(.5*x-2*u(g(-r/b))),lng:M(e)/b}}const C=new t(0,0,1);class I{constructor(t={}){this.animationMode="ondemand",this.rotationArray=new Float32Array(3),this.rotationInverse=new r,this.projectionMatrixInverse=new s,this.raycaster=new a,this.stopped=!1;const{anchor:e={lat:0,lng:0,altitude:0},upAxis:o="Z",scene:h,map:d,animationMode:l="ondemand",addDefaultLighting:c=!0,onRender:p}=t;this.id=I.ID,I.ID++,this.overlay=new google.maps.WebGLOverlayView,this.renderer=null,this.camera=null,this.animationMode=l,this.onRender=p,this.setAnchor(e),this.setUpAxis(o),this.scene=h??new i,c&&this.initSceneLights(),this.overlay.onAdd=this.onAdd.bind(this),this.overlay.onRemove=this.onRemove.bind(this),this.overlay.onContextLost=this.onContextLost.bind(this),this.overlay.onContextRestored=this.onContextRestored.bind(this),this.overlay.onStateUpdate=this.onStateUpdate.bind(this),this.overlay.onDraw=this.onDraw.bind(this),this.camera=new n,this.raycaster.camera=this.camera,d&&this.setMap(d)}setAnchor(t){this.anchor=L(t)}setUpAxis(s){const a=new t(0,0,1);"string"!=typeof s?a.copy(s):"y"===s.toLowerCase()?a.set(0,1,0):"z"!==s.toLowerCase()&&console.warn(`invalid value '${s}' specified as upAxis`),a.normalize();const i=new r;i.setFromUnitVectors(a,C),this.rotationInverse.copy(i).invert();const n=(new o).setFromQuaternion(i,"XYZ");this.rotationArray[0]=e.radToDeg(n.x),this.rotationArray[1]=e.radToDeg(n.y),this.rotationArray[2]=e.radToDeg(n.z)}raycast(t,e,r={}){let s;Array.isArray(e)?s=e||null:(s=[this.scene],r={...e,recursive:!0});const{updateMatrix:a=!0,recursive:i=!1,raycasterParameters:n}=r;a&&this.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert(),this.raycaster.ray.origin.set(t.x,t.y,0).applyMatrix4(this.projectionMatrixInverse),this.raycaster.ray.direction.set(t.x,t.y,.5).applyMatrix4(this.projectionMatrixInverse).sub(this.raycaster.ray.origin).normalize();const o=this.raycaster.params;n&&(this.raycaster.params=n);const h=this.raycaster.intersectObjects(s,i);return this.raycaster.params=o,h}onStateUpdate(){}onAdd(){}onBeforeDraw(){}onRemove(){}requestStateUpdate(){this.overlay.requestStateUpdate()}requestRedraw(){this.overlay.requestRedraw()}getMap(){return this.overlay.getMap()}setMap(t){this.overlay.setMap(t)}addListener(t,e){return this.overlay.addListener(t,e)}onContextRestored({gl:t}){this.renderer=new h({canvas:t.canvas,context:t,antialias:!0,preserveDrawingBuffer:!0,...t.getContextAttributes()}),this.renderer.autoClear=!1,this.renderer.autoClearDepth=!1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=d,Number(l)<152&&(this.renderer.outputEncoding=c);const{width:e,height:r}=t.canvas;this.renderer.setViewport(0,0,e,r)}onContextLost(){this.renderer&&(this.renderer.dispose(),this.renderer=null)}onDraw({gl:t,transformer:e}){this.camera&&this.overlay&&this.getMap()&&(this.camera.projectionMatrix.fromArray(e.fromLatLngAltitude(this.anchor,this.rotationArray)),t.disable(t.SCISSOR_TEST),this.onBeforeDraw(),"always"!==this.animationMode||this.stopped||this.requestRedraw(),this.renderer.render(this.scene,this.camera),this.renderer.resetState(),this.onRender?.(this))}latLngAltitudeToVector3(e,r=new t){return S(L(e),this.anchor,r),r.applyQuaternion(this.rotationInverse),r}bindTo(t,e,r,s){this.overlay.bindTo(t,e,r,s)}get(t){return this.overlay.get(t)}notify(t){this.overlay.notify(t)}set(t,e){this.overlay.set(t,e)}setValues(t){this.overlay.setValues(t)}unbind(t){this.overlay.unbind(t)}unbindAll(){this.overlay.unbindAll()}initSceneLights(){const t=new p(16777215,4473924,1);t.position.set(0,-.2,1).normalize();const e=new y(16777215);e.position.set(0,10,100),this.scene.add(t,e)}setStopped(t){this.stopped=t}delete(){this.onContextLost(),this.unbindAll(),this.overlay.setMap(null),delete this.overlay}}export{b as EARTH_RADIUS,I as ThreeJSOverlayView,f as WORLD_SIZE,S as latLngToVector3Relative,D as latLngToXY,L as toLatLngAltitudeLiteral,R as xyToLatLng};
//# sourceMappingURL=index.esm.js.map
