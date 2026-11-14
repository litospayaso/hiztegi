(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();const Y=globalThis,vt=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,bt=Symbol(),Ct=new WeakMap;let Vt=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(vt&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=Ct.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&Ct.set(e,t))}return t}toString(){return this.cssText}};const pe=a=>new Vt(typeof a=="string"?a:a+"",void 0,bt),v=(a,...t)=>{const e=a.length===1?a[0]:t.reduce((o,s,n)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[n+1],a[0]);return new Vt(e,a,bt)},ue=(a,t)=>{if(vt)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const o=document.createElement("style"),s=Y.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=e.cssText,a.appendChild(o)}},Pt=vt?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return pe(e)})(a):a;const{is:me,defineProperty:fe,getOwnPropertyDescriptor:ge,getOwnPropertyNames:ve,getOwnPropertySymbols:be,getPrototypeOf:ye}=Object,at=globalThis,Nt=at.trustedTypes,ze=Nt?Nt.emptyScript:"",we=at.reactiveElementPolyfillSupport,U=(a,t)=>a,tt={toAttribute(a,t){switch(t){case Boolean:a=a?ze:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},yt=(a,t)=>!me(a,t),Dt={attribute:!0,type:String,converter:tt,reflect:!1,useDefault:!1,hasChanged:yt};Symbol.metadata??=Symbol("metadata"),at.litPropertyMetadata??=new WeakMap;let O=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,e);s!==void 0&&fe(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){const{get:s,set:n}=ge(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){const i=s?.call(this);n?.call(this,r),this.requestUpdate(t,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Dt}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;const t=ye(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){const e=this.properties,o=[...ve(e),...be(e)];for(const s of o)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[o,s]of e)this.elementProperties.set(o,s)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const s=this._$Eu(e,o);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const s of o)e.unshift(Pt(s))}else t!==void 0&&e.push(Pt(t));return e}static _$Eu(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ue(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(s!==void 0&&o.reflect===!0){const n=(o.converter?.toAttribute!==void 0?o.converter:tt).toAttribute(e,o.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const o=this.constructor,s=o._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const n=o.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:tt;this._$Em=s;const i=r.fromAttribute(e,n.type);this[s]=i??this._$Ej?.get(s)??i,this._$Em=null}}requestUpdate(t,e,o,s=!1,n){if(t!==void 0){const r=this.constructor;if(s===!1&&(n=this[t]),o??=r.getPropertyOptions(t),!((o.hasChanged??yt)(n,e)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:s,wrapped:n},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[s,n]of o){const{wrapped:r}=n,i=this[s];r!==!0||this._$AL.has(s)||i===void 0||this.C(s,void 0,n,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[U("elementProperties")]=new Map,O[U("finalized")]=new Map,we?.({ReactiveElement:O}),(at.reactiveElementVersions??=[]).push("2.1.2");const zt=globalThis,Ot=a=>a,et=zt.trustedTypes,Tt=et?et.createPolicy("lit-html",{createHTML:a=>a}):void 0,Qt="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Jt="?"+E,$e=`<${Jt}>`,N=document,B=()=>N.createComment(""),M=a=>a===null||typeof a!="object"&&typeof a!="function",wt=Array.isArray,xe=a=>wt(a)||typeof a?.[Symbol.iterator]=="function",ht=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Lt=/-->/g,jt=/>/g,C=RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rt=/'/g,Ft=/"/g,Xt=/^(?:script|style|textarea|title)$/i,ke=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),d=ke(1),T=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Ut=new WeakMap,P=N.createTreeWalker(N,129);function Zt(a,t){if(!wt(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tt!==void 0?Tt.createHTML(t):t}const _e=(a,t)=>{const e=a.length-1,o=[];let s,n=t===2?"<svg>":t===3?"<math>":"",r=F;for(let i=0;i<e;i++){const c=a[i];let h,m,p=-1,z=0;for(;z<c.length&&(r.lastIndex=z,m=r.exec(c),m!==null);)z=r.lastIndex,r===F?m[1]==="!--"?r=Lt:m[1]!==void 0?r=jt:m[2]!==void 0?(Xt.test(m[2])&&(s=RegExp("</"+m[2],"g")),r=C):m[3]!==void 0&&(r=C):r===C?m[0]===">"?(r=s??F,p=-1):m[1]===void 0?p=-2:(p=r.lastIndex-m[2].length,h=m[1],r=m[3]===void 0?C:m[3]==='"'?Ft:Rt):r===Ft||r===Rt?r=C:r===Lt||r===jt?r=F:(r=C,s=void 0);const k=r===C&&a[i+1].startsWith("/>")?" ":"";n+=r===F?c+$e:p>=0?(o.push(h),c.slice(0,p)+Qt+c.slice(p)+E+k):c+E+(p===-2?i:k)}return[Zt(a,n+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};class H{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let n=0,r=0;const i=t.length-1,c=this.parts,[h,m]=_e(t,e);if(this.el=H.createElement(h,o),P.currentNode=this.el.content,e===2||e===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=P.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(const p of s.getAttributeNames())if(p.endsWith(Qt)){const z=m[r++],k=s.getAttribute(p).split(E),S=/([.?@])?(.*)/.exec(z);c.push({type:1,index:n,name:S[2],strings:k,ctor:S[1]==="."?Ie:S[1]==="?"?Ae:S[1]==="@"?Se:st}),s.removeAttribute(p)}else p.startsWith(E)&&(c.push({type:6,index:n}),s.removeAttribute(p));if(Xt.test(s.tagName)){const p=s.textContent.split(E),z=p.length-1;if(z>0){s.textContent=et?et.emptyScript:"";for(let k=0;k<z;k++)s.append(p[k],B()),P.nextNode(),c.push({type:2,index:++n});s.append(p[z],B())}}}else if(s.nodeType===8)if(s.data===Jt)c.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(E,p+1))!==-1;)c.push({type:7,index:n}),p+=E.length-1}n++}}static createElement(t,e){const o=N.createElement("template");return o.innerHTML=t,o}}function L(a,t,e=a,o){if(t===T)return t;let s=o!==void 0?e._$Co?.[o]:e._$Cl;const n=M(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(a),s._$AT(a,e,o)),o!==void 0?(e._$Co??=[])[o]=s:e._$Cl=s),s!==void 0&&(t=L(a,s._$AS(a,t.values),s,o)),t}class Ee{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??N).importNode(e,!0);P.currentNode=s;let n=P.nextNode(),r=0,i=0,c=o[0];for(;c!==void 0;){if(r===c.index){let h;c.type===2?h=new W(n,n.nextSibling,this,t):c.type===1?h=new c.ctor(n,c.name,c.strings,this,t):c.type===6&&(h=new Ce(n,this,t)),this._$AV.push(h),c=o[++i]}r!==c?.index&&(n=P.nextNode(),r++)}return P.currentNode=N,s}p(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class W{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),M(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):xe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=H.createElement(Zt(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const n=new Ee(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=Ut.get(t.strings);return e===void 0&&Ut.set(t.strings,e=new H(t)),e}k(t){wt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const n of t)s===e.length?e.push(o=new W(this.O(B()),this.O(B()),this,this.options)):o=e[s],o._$AI(n),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const o=Ot(t).nextSibling;Ot(t).remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class st{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=b}_$AI(t,e=this,o,s){const n=this.strings;let r=!1;if(n===void 0)t=L(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==T,r&&(this._$AH=t);else{const i=t;let c,h;for(t=n[0],c=0;c<n.length-1;c++)h=L(this,i[o+c],e,c),h===T&&(h=this._$AH[c]),r||=!M(h)||h!==this._$AH[c],h===b?t=b:t!==b&&(t+=(h??"")+n[c+1]),this._$AH[c]=h}r&&!s&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ie extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Ae extends st{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class Se extends st{constructor(t,e,o,s,n){super(t,e,o,s,n),this.type=5}_$AI(t,e=this){if((t=L(this,t,e,0)??b)===T)return;const o=this._$AH,s=t===b&&o!==b||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==b&&(o===b||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Ce{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}}const Pe=zt.litHtmlPolyfillSupport;Pe?.(H,W),(zt.litHtmlVersions??=[]).push("3.3.2");const Ne=(a,t,e)=>{const o=e?.renderBefore??t;let s=o._$litPart$;if(s===void 0){const n=e?.renderBefore??null;o._$litPart$=s=new W(t.insertBefore(B(),n),n,void 0,e??{})}return s._$AI(a),s};const $t=globalThis;class w extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ne(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}}w._$litElement$=!0,w.finalized=!0,$t.litElementHydrateSupport?.({LitElement:w});const De=$t.litElementPolyfillSupport;De?.({LitElement:w});($t.litElementVersions??=[]).push("4.2.2");const ot=function(t){return e=>{e.prototype.api={},Object.entries(t).forEach(([o,s])=>e.prototype.api[o]=s)}},Oe=v`
  :host {
    /* Typography */
    --hzt-font-display: 'Anton', 'Arial Black', 'Noto Sans', system-ui, sans-serif;
    --hzt-font-body: 'Noto Sans', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
    --hzt-font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Consolas, monospace;

    --hzt-size-display: 28px;
    --hzt-size-title: 22px;
    --hzt-size-stamp: 15px;
    --hzt-size-body: 14px;
    --hzt-size-label: 12px;
    --hzt-size-mono: 12px;

    --hzt-line-display: 1;
    --hzt-line-title: 1.05;
    --hzt-line-stamp: 1;
    --hzt-line-body: 1.45;
    --hzt-line-label: 1.2;
    --hzt-line-mono: 1.4;

    --hzt-tracking-display: 0.02em;
    --hzt-tracking-title: 0.01em;
    --hzt-tracking-stamp: 0.06em;
    --hzt-tracking-label: 0.02em;

    /* Shapes (sharp corners, inked borders) */
    --hzt-corner: 0px;
    --hzt-corner-small: 0px;
    --hzt-border-panel: 3px;
    --hzt-border-button: 2.5px;
    --hzt-border-chip: 2px;
    --hzt-skew-stamp: -10deg;
    --hzt-badge-rotation: -8deg;

    /* Hard, zero-blur "printed ink" shadows */
    --hzt-shadow-card: 6px 6px 0 var(--hzt-shadow);
    --hzt-shadow-button: 4px 4px 0 var(--hzt-shadow);
    --hzt-shadow-modal: 14px 14px 0 var(--hzt-shadow);
    --hzt-press-translate: 4px;

    /* Motion */
    --hzt-motion-card: 240ms;
    --hzt-motion-press: 100ms;
    --hzt-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  }
`,Te=v`
  :host {
    /* Comic palette — driven by the --hzt-app-* document variables, Day fallback */
    --hzt-paper: var(--hzt-app-paper, #f1eadc);
    --hzt-panel: var(--hzt-app-panel, #faf5ea);
    --hzt-well: var(--hzt-app-well, #e7dec9);
    --hzt-ink: var(--hzt-app-ink, #1b150d);
    --hzt-muted: var(--hzt-app-muted, #695f50);
    --hzt-shadow: var(--hzt-app-shadow, #1b150d);
    --hzt-error: var(--hzt-app-error, #b3261e);
    --hzt-on-error: var(--hzt-app-on-error, #ffffff);
    --hzt-mark: var(--hzt-app-mark, #ffd60a);
    --hzt-on-mark: var(--hzt-app-on-mark, #1b150d);
    --hzt-opendata: var(--hzt-app-opendata, #f28c28);
    --hzt-on-opendata: var(--hzt-app-on-opendata, #1b150d);
    --hzt-grid-opacity: var(--hzt-app-grid-opacity, 0.05);
    --hzt-screentone-opacity: var(--hzt-app-screentone-opacity, 0.16);
  }

  :host([data-theme='day']) {
    color-scheme: light;
    --hzt-paper: #f1eadc;
    --hzt-panel: #faf5ea;
    --hzt-well: #e7dec9;
    --hzt-ink: #1b150d;
    --hzt-muted: #695f50;
    --hzt-shadow: #1b150d;
    --hzt-error: #b3261e;
    --hzt-on-error: #ffffff;
    --hzt-mark: #ffd60a;
    --hzt-on-mark: #1b150d;
    --hzt-opendata: #f28c28;
    --hzt-on-opendata: #1b150d;
    --hzt-grid-opacity: 0.05;
    --hzt-screentone-opacity: 0.16;
  }

  :host([data-theme='night']) {
    color-scheme: dark;
    --hzt-paper: #0c0a07;
    --hzt-panel: #16120c;
    --hzt-well: #211b12;
    --hzt-ink: #f0e9da;
    --hzt-muted: #968b77;
    --hzt-shadow: #000000;
    --hzt-error: #ff6b5e;
    --hzt-on-error: #1b150d;
    --hzt-mark: #e0b400;
    --hzt-on-mark: #0c0a07;
    --hzt-opendata: #ff9f43;
    --hzt-on-opendata: #0c0a07;
    --hzt-grid-opacity: 0.06;
    --hzt-screentone-opacity: 0.2;
  }

  :host([data-theme='nord']) {
    color-scheme: dark;
    --hzt-paper: #2e3440;
    --hzt-panel: #3b4252;
    --hzt-well: #434c5e;
    --hzt-ink: #eceff4;
    --hzt-muted: #9aa5bd;
    --hzt-shadow: #20242e;
    --hzt-error: #e5818a;
    --hzt-on-error: #20242e;
    --hzt-mark: #ebcb8b;
    --hzt-on-mark: #2e3440;
    --hzt-opendata: #d08770;
    --hzt-on-opendata: #2e3440;
    --hzt-grid-opacity: 0.05;
    --hzt-screentone-opacity: 0.16;
  }
`,Le=v`
  :host {
    --hzt-accent: var(--hzt-app-accent, #d8202a);
    --hzt-on-accent: var(--hzt-app-on-accent, #ffffff);
  }

  :host([data-accent='crimson']) {
    --hzt-accent: #d8202a;
    --hzt-on-accent: #ffffff;
  }

  :host([data-accent='cobalt']) {
    --hzt-accent: #1f4ed8;
    --hzt-on-accent: #ffffff;
  }

  :host([data-accent='sun']) {
    --hzt-accent: #f5a300;
    --hzt-on-accent: #1b150d;
  }

  :host([data-accent='frost']) {
    --hzt-accent: #88c0d0;
    --hzt-on-accent: #2e3440;
  }

  :host([data-accent='mono']) {
    --hzt-accent: var(--hzt-ink);
    --hzt-on-accent: var(--hzt-paper);
  }
`,je=v`
  :host {
    display: block;
    font-family: var(--hzt-font-body);
    font-size: var(--hzt-size-body);
    line-height: var(--hzt-line-body);
    color: var(--hzt-ink);
  }
`,Re=v`
  h1,
  h2,
  h3,
  .hzt-title {
    margin: 0;
    font-family: var(--hzt-font-display);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: var(--hzt-tracking-display);
    line-height: var(--hzt-line-display);
    color: var(--hzt-ink);
  }

  h1 {
    font-size: var(--hzt-size-display);
  }

  h2 {
    font-size: var(--hzt-size-title);
  }

  h3 {
    font-size: var(--hzt-size-title);
    letter-spacing: var(--hzt-tracking-title);
  }
`,Fe=v`
  .hzt-card {
    background: var(--hzt-panel);
    border: var(--hzt-border-panel) solid var(--hzt-ink);
    border-radius: var(--hzt-corner);
    box-shadow: var(--hzt-shadow-card);
    color: var(--hzt-ink);
  }
`,Ue=v`
  .hzt-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem 1.25rem;
    border: var(--hzt-border-button) solid var(--hzt-ink);
    border-radius: var(--hzt-corner);
    background: var(--hzt-panel);
    color: var(--hzt-ink);
    font-family: var(--hzt-font-body);
    font-weight: 900;
    font-size: var(--hzt-size-label);
    line-height: var(--hzt-line-label);
    letter-spacing: var(--hzt-tracking-label);
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: var(--hzt-shadow-button);
    transition:
      transform var(--hzt-motion-press) var(--hzt-ease),
      box-shadow var(--hzt-motion-press) var(--hzt-ease),
      background-color var(--hzt-motion-press) var(--hzt-ease);
  }

  .hzt-button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--hzt-shadow);
  }

  .hzt-button:active {
    transform: translate(var(--hzt-press-translate), var(--hzt-press-translate));
    box-shadow: 0 0 0 var(--hzt-shadow);
  }

  .hzt-button:focus-visible {
    outline: var(--hzt-border-chip) solid var(--hzt-accent);
    outline-offset: 3px;
  }

  .hzt-button[disabled] {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .hzt-button--primary {
    background: var(--hzt-accent);
    color: var(--hzt-on-accent);
  }

  .hzt-button--destructive {
    background: var(--hzt-error);
    color: var(--hzt-on-error);
  }

  .hzt-button--outline {
    background: transparent;
  }

  .hzt-button--text {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  .hzt-button--text:active {
    transform: translate(1px, 1px);
  }
`,l={designTokens:Oe,themeTokens:Te,accentTokens:Le,hostStyle:je,headerStyle:Re,cardStyle:Fe,buttonStyle:Ue};class A extends w{constructor(){super()}static{this.styles=[l.hostStyle,l.designTokens,l.themeTokens,l.accentTokens,v`
      :host {
        display: block;
        min-height: 100vh;
        background: var(--hzt-paper);
        color: var(--hzt-ink);
      }
    `]}navigate(t){t.startsWith("/")?window.location.href=window.location.href.concat(t):t.startsWith("http")?window.location.href=t:window.location.href=`${window.location.origin}/${t}`}triggerPageNavigation(t){this.dispatchEvent(new CustomEvent("page-navigation",{detail:{...t},bubbles:!0,composed:!0}))}navigateToPage(t){const e=new URL(window.location.href);e.search="",Object.entries(t).forEach(([o,s])=>e.searchParams.set(o,s)),window.history.replaceState({},"",e.toString())}openNewTab(t){window.open(t,"_blank")}getHref(){return window.location.href}getHash(){const t=location.search.substring(1);return t&&t.length>0?JSON.parse('{"'+decodeURI(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}getHostname(){return window.location.hostname}getQueryParamsURL(){return new URL(this.getHref()).searchParams}connectedCallback(){super.connectedCallback(),this.onPageInit()}onPageInit(){}}const Be={attribute:!0,type:String,converter:tt,reflect:!1,hasChanged:yt},Me=(a=Be,t,e)=>{const{kind:o,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),o==="setter"&&((a=Object.create(a)).wrapped=!0),n.set(e.name,a),o==="accessor"){const{name:r}=e;return{set(i){const c=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,c,a,!0,i)},init(i){return i!==void 0&&this.C(r,void 0,a,i),i}}}if(o==="setter"){const{name:r}=e;return function(i){const c=this[r];t.call(this,i),this.requestUpdate(r,c,a,!0,i)}}throw Error("Unsupported decorator location: "+o)};function f(a){return(t,e)=>typeof e=="object"?Me(a,t,e):((o,s,n)=>{const r=s.hasOwnProperty(n);return s.constructor.createProperty(n,o),r?Object.getOwnPropertyDescriptor(s,n):void 0})(a,t,e)}function u(a){return f({...a,state:!0,attribute:!1})}var He=Object.defineProperty,We=Object.getOwnPropertyDescriptor,xt=(a,t,e,o)=>{for(var s=o>1?void 0:o?We(t,e):t,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&He(t,e,s),s};const dt="library";let j=class extends A{constructor(){super(...arguments),this.currentRoute=dt,this.bookId=""}get pageParam(){const a=this.getQueryParamsURL().get("page");return a==="reading"||a==="dictionary"?a:dt}get routeBookId(){return this.getQueryParamsURL().get("bookId")??""}onPageInit(){this.currentRoute=this.pageParam,this.bookId=this.routeBookId}onPageNavigation({detail:a}){const t=a.page;this.currentRoute=t==="reading"||t==="dictionary"?t:dt,this.bookId=a.bookId??"",this.navigateToPage(a)}_renderPageContent(){switch(this.currentRoute){case"reading":return d`
          <page-reading
            .bookId=${this.bookId}
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-reading>`;case"dictionary":return d`
          <page-dictionary
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-dictionary>`;default:return d`
          <page-library
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-library>`}}render(){return d`
      <div class="nav-wrap">
        <component-nav-bar
          active="${this.currentRoute}"
          @nav-bar-navigation="${this.onPageNavigation}"
        ></component-nav-bar>
      </div>
      <div id="page-container">
        ${this._renderPageContent()}
      </div>
    `}};j.styles=[...A.styles,v`
      :host {
        min-height: 100vh;
        background: var(--hzt-paper);
      }

      .nav-wrap {
        position: sticky;
        top: 0;
        z-index: 10;
      }
    `];xt([u()],j.prototype,"currentRoute",2);xt([u()],j.prototype,"bookId",2);j=xt([ot({getApi:()=>({})})],j);const $=(a,t)=>{if(document.createElement(a).constructor===HTMLElement){const e=t,o=()=>class extends e{constructor(){super()}};window.customElements.define(a,o())}};var Ge=Object.defineProperty,qe=(a,t,e,o)=>{for(var s=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=r(t,e,s)||s);return s&&Ge(t,e,s),s};const Bt=[{path:"library",label:"Inicio"},{path:"dictionary",label:"Diccionario"}];class Yt extends w{constructor(){super(...arguments),this.active=""}static{this.styles=[l.hostStyle,l.designTokens,l.themeTokens,l.accentTokens,v`
      .nav-bar {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: var(--hzt-panel);
        border-bottom: var(--hzt-border-panel) solid var(--hzt-ink);
      }

      .nav-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.4rem 1rem;
        border: var(--hzt-border-button) solid var(--hzt-ink);
        border-radius: var(--hzt-corner);
        background: var(--hzt-panel);
        color: var(--hzt-ink);
        font-family: var(--hzt-font-body);
        font-weight: 900;
        font-size: var(--hzt-size-label);
        line-height: var(--hzt-line-label);
        letter-spacing: var(--hzt-tracking-label);
        text-transform: uppercase;
        text-decoration: none;
        cursor: pointer;
        box-shadow: var(--hzt-shadow-button);
        transition:
          transform var(--hzt-motion-press) var(--hzt-ease),
          box-shadow var(--hzt-motion-press) var(--hzt-ease),
          background-color var(--hzt-motion-press) var(--hzt-ease);
      }

      .nav-link:hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0 var(--hzt-shadow);
      }

      .nav-link:active {
        transform: translate(var(--hzt-press-translate), var(--hzt-press-translate));
        box-shadow: 0 0 0 var(--hzt-shadow);
      }

      .nav-link:focus-visible {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
        outline-offset: 3px;
      }

      .nav-link--active {
        background: var(--hzt-accent);
        color: var(--hzt-on-accent);
        transform: translate(var(--hzt-press-translate), var(--hzt-press-translate));
        box-shadow: 0 0 0 var(--hzt-shadow);
      }
    `]}triggerNavigation(t){this.dispatchEvent(new CustomEvent("nav-bar-navigation",{detail:{page:t},bubbles:!0,composed:!0}))}render(){const t=this.active||Bt[0].path;return d`
      <nav class="nav-bar" aria-label="Navegación principal">
        ${Bt.map(e=>d`
            <button
              class="nav-link ${t===e.path?"nav-link--active":""}"
              @click=${()=>this.triggerNavigation(e.path)}
              aria-current=${t===e.path?"page":"false"}
              >${e.label}</button
            >
          `)}
      </nav>
    `}}qe([f({type:String})],Yt.prototype,"active");$("component-nav-bar",Yt);const Ke="hiztegi-db",Ve=1,Mt={books:{keyPath:"id"},chapters:{keyPath:"id"},progress:{keyPath:"bookId"},dictionary:{keyPath:"word"}};let pt=null;const G=()=>(pt||(pt=new Promise((a,t)=>{const e=indexedDB.open(Ke,Ve);e.onupgradeneeded=()=>{const o=e.result;Object.keys(Mt).forEach(s=>{o.objectStoreNames.contains(s)||o.createObjectStore(s,Mt[s])})},e.onsuccess=()=>a(e.result),e.onerror=()=>t(e.error)})),pt),nt=a=>new Promise((t,e)=>{a.onsuccess=()=>t(a.result),a.onerror=()=>e(a.error)}),te=(a,t,e)=>G().then(o=>new Promise((s,n)=>{const r=Array.isArray(a)?a:[a],i=o.transaction(r,t),c={};r.forEach(h=>{c[h]=i.objectStore(h)});try{e(c)}catch(h){i.abort(),n(h);return}i.oncomplete=()=>s(),i.onerror=()=>n(i.error),i.onabort=()=>n(i.error)})),kt=async a=>{const t=await G();return nt(t.transaction(a,"readonly").objectStore(a).getAll())},_t=async(a,t)=>{const e=await G();return nt(e.transaction(a,"readonly").objectStore(a).get(t))},ee=async(a,t)=>{const e=await G();return nt(e.transaction(a,"readwrite").objectStore(a).put(t))},Qe=async(a,t)=>{const e=await G();return nt(e.transaction(a,"readwrite").objectStore(a).delete(t))},Je=async(a,t)=>{const e=crypto.randomUUID(),o={id:e,title:a.title,format:t,addedAt:new Date().toISOString(),chapterIds:[]},s=a.chapters.map((n,r)=>({id:crypto.randomUUID(),bookId:e,index:r,title:n.title,text:n.text}));return o.chapterIds=s.map(n=>n.id),await te(["books","chapters"],"readwrite",n=>{n.books.put(o),s.forEach(r=>n.chapters.put(r))}),o},Xe=async()=>kt("books"),ae=async a=>_t("books",a),Ze=async a=>(await kt("chapters")).filter(e=>e.bookId===a).sort((e,o)=>e.index-o.index),Ye=async a=>{const t=await ae(a);t&&await te(["books","chapters","progress"],"readwrite",e=>{e.books.delete(a),t.chapterIds.forEach(o=>e.chapters.delete(o)),e.progress.delete(a)})},ta=async a=>{await ee("progress",a)},se=async a=>_t("progress",a),Ht=15,Et=a=>{const t=[];for(let e=0;e<a.length;e+=Ht)t.push({title:String(t.length+1),text:a.slice(e,e+Ht).join(`

`)});return t.length===0&&t.push({title:"1",text:""}),t},It=a=>a.replace(/\.[^.]+$/,"").trim()||"Untitled",ea=async a=>{const e=(await a.text()).split(/\n\s*\n+/).map(o=>o.trim()).filter(o=>o.length>0);return{title:It(a.name),chapters:Et(e)}},aa=async a=>{const t=await a.text(),o=new DOMParser().parseFromString(t,"text/html").body,s=[];let n=null,r=[];const i=()=>{n!==null&&(s.push({title:n,text:r.filter(h=>h!=="").join(`

`)}),n=null,r=[])},c=h=>{n!==null&&i(),n=h};for(const h of Array.from(o.childNodes))if(h.nodeType===Node.ELEMENT_NODE){const m=h,p=m.tagName.toLocaleLowerCase();if(p==="h1"||p==="h2"){c(m.textContent?.trim()??"");continue}const z=(m.textContent??"").replace(/\s*\n\s*/g," ").trim();z!==""&&r.push(z)}else if(h.nodeType===Node.TEXT_NODE){const m=(h.textContent??"").trim();m!==""&&r.push(m)}return i(),{title:It(a.name),chapters:s.length>0?s:Et(r)}},sa=/^(#{1,6})\s+(.*)$/,Wt=/^(?:```|~~~)/,oa=/^>\s?/,na=/^\s*(?:[-*+]|\d+[.)])\s+/,ra=/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/,ut=a=>a.replace(/!\[[^\]]*\]\([^)]*\)/g,"").replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/~~([^~]+)~~/g,"$1").trim(),Gt=a=>{const t=[];let e=[];for(const o of a)o===""?e.length>0&&(t.push(e.join(`
`)),e=[]):e.push(o);return e.length>0&&t.push(e.join(`
`)),t},ia=async a=>{const e=(await a.text()).split(`
`),o=[];let s=null,n=[],r=!1;const i=()=>{s!==null&&(o.push({title:s,text:Gt(n).join(`

`)}),s=null,n=[])},c=h=>{s!==null&&i(),s=h};for(const h of e){const m=h.trim();if(!r&&Wt.test(m)){r=!0;continue}if(r){Wt.test(m)?r=!1:n.push(h);continue}if(m===""){n.length>0&&n.push("");continue}const p=sa.exec(h);if(p!==null){if(p[1].length<=2)c(ut(p[2]));else{const S=ut(p[2]);S!==""&&n.push(S)}continue}if(ra.test(m))continue;let z=ut(h.replace(oa,"").replace(na,""));z!==""&&n.push(z)}return i(),{title:It(a.name),chapters:o.length>0?o:Et(Gt(n))}},oe=a=>a.split(".").pop()?.toLocaleLowerCase()??"",ca=a=>{const t=oe(a);switch(t){case"txt":return"txt";case"md":case"markdown":return"md";case"html":case"htm":return"html";case"epub":return"epub";case"pdf":return"pdf";default:throw new Error(`Unsupported file format: "${t}"`)}},la=async a=>{const t=oe(a.name);switch(t){case"txt":return ea(a);case"md":case"markdown":return ia(a);case"html":case"htm":return aa(a);case"epub":case"pdf":throw new Error(`Parser for "${t}" is not implemented yet`);default:throw new Error(`Unsupported file format: "${t}"`)}};var ha=Object.defineProperty,da=(a,t,e,o)=>{for(var s=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=r(t,e,s)||s);return s&&ha(t,e,s),s};class ne extends w{constructor(){super(...arguments),this.active=!1}static{this.styles=[l.hostStyle,l.designTokens,l.themeTokens,l.accentTokens,v`
      .drop-zone {
        border: 2px dashed var(--hzt-ink);
        border-radius: var(--hzt-corner);
        padding: 2rem;
        text-align: center;
        background: var(--hzt-panel);
        color: var(--hzt-ink);
        cursor: pointer;
        transition:
          background-color var(--hzt-motion-card) var(--hzt-ease),
          border-color var(--hzt-motion-card) var(--hzt-ease);
      }

      .drop-zone:hover,
      .drop-zone.active {
        border-color: var(--hzt-accent);
        background-color: var(--hzt-well);
      }

      .drop-zone:focus-visible {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
        outline-offset: 2px;
      }
    `]}firstUpdated(){this.input=this.shadowRoot?.querySelector('input[type="file"]')??void 0}render(){return d`
      <div
        class="${this.active?"drop-zone active":"drop-zone"}"
        role="button"
        tabindex="0"
        aria-label="Añadir archivos txt, markdown o html"
        @click=${this.openPicker}
        @keydown=${this.onKeyDown}
        @dragover=${this.onDragOver}
        @dragleave=${this.onDragLeave}
        @drop=${this.onDrop}
      >
        <slot>Arrastra los archivos txt, markdown o html aquí o haz clic para seleccionarlos</slot>
      </div>
      <input
        type="file"
        accept=".txt,.md,.markdown,.html,.htm,text/plain,text/markdown,text/html"
        multiple
        hidden
        @change=${this.onInputChange}
      />
    `}selectFiles(t){t.length!==0&&this.dispatchEvent(new CustomEvent("files-selected",{detail:{files:t},bubbles:!0,composed:!0}))}openPicker(){this.input?.click()}onKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.openPicker())}onDragOver(t){t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="copy"),this.active=!0}onDragLeave(){this.active=!1}onDrop(t){t.preventDefault(),this.active=!1,this.selectFiles(Array.from(t.dataTransfer?.files??[]))}onInputChange(t){const e=t.target;this.selectFiles(Array.from(e.files??[])),e.value=""}}da([u()],ne.prototype,"active");$("component-import-file",ne);var pa=Object.defineProperty,re=(a,t,e,o)=>{for(var s=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=r(t,e,s)||s);return s&&pa(t,e,s),s};class At extends w{static{this.styles=[l.hostStyle,l.designTokens,l.themeTokens,l.accentTokens,l.headerStyle,l.cardStyle,l.buttonStyle,v`
      .book-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
      }

      .book-info {
        min-width: 0;
      }

      .book-info h2 {
        margin-bottom: 0.25rem;
      }

      .format {
        margin: 0;
        font-size: var(--hzt-size-stamp);
        color: var(--hzt-muted);
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
      }

      .progress {
        margin: 0.25rem 0 0;
        font-size: var(--hzt-size-body);
        color: var(--hzt-accent);
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        flex-shrink: 0;
      }
    `]}render(){const t=this.book?.chapterIds.length??0,e=this.progress?`Capítulo ${this.progress.chapterIndex+1} / ${t}`:"";return d`
      <article class="book-card hzt-card">
        <div class="book-info">
          <h2>${this.book?.title??""}</h2>
          <p class="format">${this.book?.format??""}</p>
          ${e?d`<p class="progress">${e}</p>`:""}
        </div>
        <div class="actions">
          <button class="hzt-button hzt-button--primary" @click=${this.emitRead}>Leer</button>
          <button class="hzt-button hzt-button--destructive" @click=${this.emitDelete}>Eliminar</button>
        </div>
      </article>
    `}emitRead(){this.book&&this.dispatchEvent(new CustomEvent("read-book",{detail:{id:this.book.id},bubbles:!0,composed:!0}))}emitDelete(){this.book&&this.dispatchEvent(new CustomEvent("delete-book",{detail:{id:this.book.id},bubbles:!0,composed:!0}))}}re([f({type:Object})],At.prototype,"book");re([f({type:Object})],At.prototype,"progress");$("component-library-book-card",At);var ua=Object.defineProperty,ma=Object.getOwnPropertyDescriptor,rt=(a,t,e,o)=>{for(var s=o>1?void 0:o?ma(t,e):t,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&ua(t,e,s),s};let D=class extends A{constructor(){super(...arguments),this.books=[],this.progressByBook={},this.importing=!1}async onPageInit(){await this.loadBooks()}async loadBooks(){const a=await this.api.getBooks(),t=await Promise.all(a.map(async e=>[e.id,await this.api.getProgress(e.id)]));this.books=a,this.progressByBook=Object.fromEntries(t)}async onFilesSelected(a){const{files:t}=a.detail;this.importing=!0;try{for(const e of t){const o=await this.api.parseBook(e);await this.api.importBook(o,ca(e.name))}await this.loadBooks()}finally{this.importing=!1}}async onDeleteBook(a){const{id:t}=a.detail;window.confirm("¿Seguro que quieres eliminar el libro?")&&(await this.api.deleteBook(t),await this.loadBooks())}onReadBook(a){const{id:t}=a.detail;this.triggerPageNavigation({page:"reading",bookId:t})}render(){return d`
      <div>
        <h1>Biblioteca</h1>
        <component-import-file @files-selected=${this.onFilesSelected}></component-import-file>
        ${this.importing?d`<p class="empty" aria-live="polite">Importando...</p>`:""}
        <div class="books">
          ${this.books.length===0?d`<p class="empty">Aún no hay ningún libro.</p>`:this.books.map(a=>d`
                  <component-library-book-card
                    .book=${a}
                    .progress=${this.progressByBook[a.id]}
                    @read-book=${this.onReadBook}
                    @delete-book=${this.onDeleteBook}
                  ></component-library-book-card>
                `)}
        </div>
      </div>
    `}};D.styles=[...A.styles,l.headerStyle,v`
      :host {
        padding: 1rem;
      }

      h1 {
        margin-bottom: 0.75rem;
      }

      .books {
        display: grid;
        gap: 0.75rem;
        margin-top: 1rem;
      }

      .empty {
        color: var(--hzt-muted);
      }
    `];rt([u()],D.prototype,"books",2);rt([u()],D.prototype,"progressByBook",2);rt([u()],D.prototype,"importing",2);D=rt([ot({getBooks:Xe,importBook:Je,deleteBook:Ye,getProgress:se,parseBook:la})],D);$("page-library",D);const St=a=>a.trim().toLocaleLowerCase(),ie=async()=>kt("dictionary"),fa=async a=>_t("dictionary",St(a)),ce=async a=>{const t={...a,word:St(a.word)};return await ee("dictionary",t),t},ga=async a=>{await Qe("dictionary",St(a))},va=async a=>fa(a),le="opendata/eu-esp",ba=`${le}/index.json`,it=a=>a.trim().normalize("NFC").toLocaleLowerCase(),he=a=>new URL(a,typeof document>"u"?"http://localhost/":document.baseURI).href,ya=a=>{const t=it(a).normalize("NFD").charAt(0);return/^[a-z]$/.test(t)?t:"otros"},za=a=>{const t=(a??"").trim();return t?t.replace(/^\[|\]$/g,"").split(/[;,]\s*/).map(e=>e.trim()).filter(Boolean):[]},wa=a=>{const t=a.split(" :_: ");if(t.length<2)return;const e=it(t[0]),o=t[1]?.trim();if(!e||!o)return;const s=t[2]?.trim()||void 0;return{word:e,translations:[o],...s?{partOfSpeech:s}:{},domains:za(t[3])}},$a=(a,t)=>{const e=a.get(t.word);if(!e){a.set(t.word,t);return}e.translations.includes(t.translations[0])||e.translations.push(t.translations[0]),!e.partOfSpeech&&t.partOfSpeech&&(e.partOfSpeech=t.partOfSpeech);for(const o of t.domains)e.domains.includes(o)||e.domains.push(o)};let J,X;const mt=new Map,xa=a=>{const t=mt.get(a);if(t)return t;const e=fetch(he(`${le}/${a}.json`)).then(async o=>{if(!o.ok)throw new Error(`Open Data letter ${a} returned ${o.status}`);const s=await o.json();if(!Array.isArray(s))throw new Error(`Open Data letter ${a} is not an array`);const n=new Map;for(const r of s){const i=wa(String(r));i&&$a(n,i)}return n}).catch(o=>(mt.delete(a),console.warn(`[opendata] could not load ${a}.json`,o),new Map));return mt.set(a,e),e},ka=async()=>X||(J||(J=fetch(he(ba)).then(async a=>{if(!a.ok)throw new Error(`Open Data index returned ${a.status}`);const t=await a.json();if(!Array.isArray(t))throw new Error("Open Data index is not an array");return new Set(t.map(e=>it(String(e))).filter(Boolean))}).catch(a=>(J=void 0,console.warn("[opendata] could not load index.json",a),new Set))),X=await J,X),_a=async a=>{const t=it(a);return t?(await xa(ya(t))).get(t):void 0},ft=a=>/^\p{L}$/u.test(a),gt=a=>/\s/.test(a),Ea=a=>{const t=[];let e=0;for(;e<a.length;){const o=e;if(gt(a[e])){for(;e<a.length&&gt(a[e]);)e+=1;t.push({type:"space",text:a.slice(o,e)})}else if(ft(a[e])){for(;e<a.length&&ft(a[e]);)e+=1;t.push({type:"word",text:a.slice(o,e)})}else{for(;e<a.length&&!gt(a[e])&&!ft(a[e]);)e+=1;t.push({type:"punct",text:a.slice(o,e)})}}return t},Ia=[{suffix:"-enganaino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta donde (los/las)"}]},{suffix:"-anganaino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta donde (el/la)"}]},{suffix:"-rengandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (los/las)"}]},{suffix:"-rangandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (el/la)"}]},{suffix:"-eganaino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta donde (hombre)"}]},{suffix:"-regandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (hijo/hombre)"}]},{suffix:"-engandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (los/las)"}]},{suffix:"-arentzat",cases:[{caseId:"destinativo",caseName:"Destinativo",meaning:"para el/la"}]},{suffix:"-etaraino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta (los/las / valle)"}]},{suffix:"-angandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (el/la)"}]},{suffix:"-rentzat",cases:[{caseId:"destinativo",caseName:"Destinativo",meaning:"para (alguien)"}]},{suffix:"-ganaino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta donde (hijo)"}]},{suffix:"-rekin",cases:[{caseId:"asociativo",caseName:"Asociativo",meaning:"con (alguien)"}]},{suffix:"-arekin",cases:[{caseId:"asociativo",caseName:"Asociativo",meaning:"con el/la"}]},{suffix:"-angana",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a donde (el/la)"}]},{suffix:"-taraino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta (monte)"}]},{suffix:"-engana",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a donde (los/las)"}]},{suffix:"-entzat",cases:[{caseId:"destinativo",caseName:"Destinativo",meaning:"para (los/las / valle / hombre)"}]},{suffix:"-gandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (hijo/hombre)"}]},{suffix:"-eraino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta (el/la / Gasteiz)"}]},{suffix:"-retatik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (palabra en -r)"}]},{suffix:"-etatik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (los/las / valle)"}]},{suffix:"-egana",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a donde (hombre)"}]},{suffix:"-etara",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a (los/las / valle)"}]},{suffix:"-era",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"al/la / a (Gasteiz)"}]},{suffix:"-ekin",cases:[{caseId:"asociativo",caseName:"Asociativo",meaning:"con (los/las / valle / hombre)"}]},{suffix:"-etako",cases:[{caseId:"gen_locativo",caseName:"Genitivo Locativo",meaning:"de (los/las / valle)"}]},{suffix:"-tako",cases:[{caseId:"gen_locativo",caseName:"Genitivo Locativo",meaning:"de (monte)"}]},{suffix:"-tatik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (monte)"}]},{suffix:"-etan",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (los/las / valle / hombre)"}]},{suffix:"-tara",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a (monte)"}]},{suffix:"-raino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta (el/la / Donostia)"}]},{suffix:"-egan",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (hombre)"}]},{suffix:"-gana",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a donde (hijo)"}]},{suffix:"-ean",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (el/la / Gasteiz)"}]},{suffix:"-aren",cases:[{caseId:"genitivo",caseName:"Genitivo Posesivo",meaning:"del/la"}]},{suffix:"-gan",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (hijo)"}]},{suffix:"-retik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (el/la / palabra en -r)"}]},{suffix:"-etik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (el/la)"}]},{suffix:"-tzat",cases:[{caseId:"prolativo",caseName:"Prolativo",meaning:"por (considerar)"}]},{suffix:"-ari",cases:[{caseId:"dativo",caseName:"Dativo",meaning:"al/la"}]},{suffix:"-ak",cases:[{caseId:"nominativo",caseName:"Nominativo",meaning:"el/la/las/los"},{caseId:"ergativo",caseName:"Ergativo",meaning:"el/la (agente)"}]},{suffix:"-ek",cases:[{caseId:"ergativo",caseName:"Ergativo",meaning:"los/las (agente)"}]},{suffix:"-ei",cases:[{caseId:"dativo",caseName:"Dativo",meaning:"a los/las"}]},{suffix:"-ri",cases:[{caseId:"dativo",caseName:"Dativo",meaning:"a (alguien)"}]},{suffix:"-ko",cases:[{caseId:"gen_locativo",caseName:"Genitivo Locativo",meaning:"del/la / de (lugar)"}]},{suffix:"-ra",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"al/la / a (Donostia)"}]},{suffix:"-rik",cases:[{caseId:"partitivo",caseName:"Partitivo",meaning:"algún"}]},{suffix:"-ik",cases:[{caseId:"partitivo",caseName:"Partitivo",meaning:"algún"}]},{suffix:"-az",cases:[{caseId:"instrumental",caseName:"Instrumental",meaning:"con el/la"}]},{suffix:"-en",cases:[{caseId:"genitivo",caseName:"Genitivo Posesivo",meaning:"de (los/las / valle / hombre)"},{caseId:"inesivo",caseName:"Inesivo",meaning:"en (Gasteiz)"}]},{suffix:"-an",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en el/la"}]},{suffix:"-tan",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (monte)"}]},{suffix:"-tik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (el/la / Donostia / Gasteiz)"}]},{suffix:"-ren",cases:[{caseId:"genitivo",caseName:"Genitivo Posesivo",meaning:"de (alguien)"}]},{suffix:"-eko",cases:[{caseId:"gen_locativo",caseName:"Genitivo Locativo",meaning:"del/la"}]},{suffix:"-aino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta (Gasteiz)"}]},{suffix:"-ez",cases:[{caseId:"instrumental",caseName:"Instrumental",meaning:"con (los/las / valle / hombre)"}]},{suffix:"-k",cases:[{caseId:"ergativo",caseName:"Ergativo",meaning:"monte/hijo/Donostia (agente)"}]},{suffix:"-i",cases:[{caseId:"dativo",caseName:"Dativo",meaning:"a (valle/hombre/Gasteiz)"}]},{suffix:"-a",cases:[{caseId:"nominativo",caseName:"Nominativo",meaning:"el/la"},{caseId:"adlativo",caseName:"Adlativo",meaning:"a (Gasteiz)"}]},{suffix:"-z",cases:[{caseId:"instrumental",caseName:"Instrumental",meaning:"con (monte/hijo/Donostia)"}]},{suffix:"-n",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (Donostia)"}]}],Aa=[...Ia].sort((a,t)=>t.suffix.length-a.suffix.length),Sa=2;function Ca(a){const t=a.trim().toLocaleLowerCase(),e=[];for(const o of Aa){const s=o.suffix.slice(1);if(!t.endsWith(s))continue;const n=t.slice(0,t.length-s.length);if(n.length<Sa)continue;const r=`${n}|${o.suffix}`,i=e.find(c=>`${c.baseForm}|${c.suffix}`===r);if(i){for(const c of o.cases)i.cases.some(h=>h.caseId===c.caseId)||i.cases.push(c);continue}e.push({baseForm:n,suffix:o.suffix,cases:o.cases})}return e}var Pa=Object.defineProperty,q=(a,t,e,o)=>{for(var s=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=r(t,e,s)||s);return s&&Pa(t,e,s),s};class R extends w{constructor(){super(...arguments),this.text="",this.dictionary=[],this.opendataIndex=new Set,this.pageSize=100,this.pageIndex=0}static{this.styles=[l.hostStyle,l.designTokens,l.themeTokens,l.accentTokens,l.buttonStyle,v`
      .reader-text {
        margin: 0 0 1rem;
        font-family: var(--hzt-font-body);
        font-size: var(--hzt-size-title);
        line-height: 1.8;
        white-space: pre-wrap;
        overflow-wrap: break-word;
      }

      .word {
        cursor: pointer;
      }

      .word--known {
        font-weight: 700;
      }

      .word--unknown {
        background: var(--hzt-mark);
        color: var(--hzt-on-mark);
        box-shadow: 2px 2px 0 var(--hzt-shadow);
      }

      .word--opendata {
        background: var(--hzt-opendata);
        color: var(--hzt-on-opendata);
        box-shadow: 2px 2px 0 var(--hzt-shadow);
      }

      .controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .page-info {
        font-family: var(--hzt-font-display);
        font-size: var(--hzt-size-stamp);
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
        color: var(--hzt-muted);
      }
    `]}willUpdate(t){t.has("text")&&!t.has("pageIndex")&&(this.pageIndex=0)}get pages(){const t=Ea(this.text),e=Math.max(1,Math.floor(this.pageSize)),o=[];let s=[],n=0;for(const r of t)s.push(r),r.type==="word"&&(n+=1,n>=e&&(o.push(s),s=[],n=0));return s.length>0&&o.push(s),o.length>0?o:[[]]}get directMap(){return new Map(this.dictionary.map(t=>[t.word.toLocaleLowerCase(),t.status]))}resolveWord(t,e=this.directMap){const o=t.toLocaleLowerCase(),s=e.get(o);if(s)return{status:s};const n=Ca(o);for(const r of n){const i=e.get(r.baseForm);if(i)return{status:i,baseForm:r.baseForm,suffix:r.suffix,cases:r.cases.map(c=>c.caseName)}}if(this.opendataIndex.has(o))return{status:"opendata"};for(const r of n)if(this.opendataIndex.has(r.baseForm))return{status:"opendata",baseForm:r.baseForm,suffix:r.suffix,cases:r.cases.map(i=>i.caseName)};return{status:"none"}}onPrevious(){this.pageIndex>0&&(this.pageIndex-=1,this.emitPageChange())}onNext(){this.pageIndex<this.pages.length-1&&(this.pageIndex+=1,this.emitPageChange())}emitPageChange(){this.dispatchEvent(new CustomEvent("page-change",{detail:{pageIndex:this.pageIndex,pageCount:this.pages.length},bubbles:!0,composed:!0}))}onWordClick(t,e){const o=e.currentTarget.getBoundingClientRect(),{baseForm:s,suffix:n,cases:r}=this.resolveWord(t);this.dispatchEvent(new CustomEvent("word-click",{detail:{word:t,x:o.left+o.width/2,y:o.bottom,...s?{baseForm:s,suffix:n,cases:r}:{}},bubbles:!0,composed:!0}))}render(){const t=this.pages,e=t.length,o=Math.min(this.pageIndex,e-1),s=t[o]??[],n=this.directMap;return d`
      <div class="reader">
        <p class="reader-text">${s.map(r=>{if(r.type!=="word")return r.text;const i=this.resolveWord(r.text,n).status,c=i==="none"?"word":`word word--${i}`;return d`<span class=${c} @click=${h=>this.onWordClick(r.text,h)}>${r.text}</span>`})}</p>
        <div class="controls">
          <button class="hzt-button" ?disabled=${o===0} @click=${this.onPrevious}>Anterior</button>
          <span class="page-info">Página ${o+1} de ${e}</span>
          <button class="hzt-button hzt-button--primary" ?disabled=${o===e-1} @click=${this.onNext}>
            Siguiente
          </button>
        </div>
      </div>
    `}}q([f({type:String})],R.prototype,"text");q([f({type:Array})],R.prototype,"dictionary");q([f({type:Object})],R.prototype,"opendataIndex");q([f({type:Number})],R.prototype,"pageSize");q([f({type:Number})],R.prototype,"pageIndex");$("component-text-reader",R);var Na=Object.defineProperty,_=(a,t,e,o)=>{for(var s=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=r(t,e,s)||s);return s&&Na(t,e,s),s};const Z=8,Da=8;class x extends w{constructor(){super(...arguments),this.position={left:0,top:0},this.onDocumentClick=t=>{t.composedPath().includes(this)||this.emitClose()},this.onKeyDown=t=>{t.key==="Escape"&&this.emitClose()}}static{this.styles=[l.hostStyle,l.designTokens,l.themeTokens,l.accentTokens,l.headerStyle,l.buttonStyle,v`
      .tooltip {
        position: fixed;
        z-index: 1000;
        min-width: 220px;
        max-width: 320px;
        padding: 1rem 1.25rem;
        background: var(--hzt-panel);
        border: var(--hzt-border-panel) solid var(--hzt-ink);
        border-radius: var(--hzt-corner);
        box-shadow: var(--hzt-shadow-modal);
      }

      .tooltip:focus-visible {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
        outline-offset: 3px;
      }

      .tooltip-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
      }

      .tooltip-header h3 {
        margin: 0;
      }

      .close-button {
        padding: 0.15rem 0.5rem;
      }

      .badge {
        display: inline-block;
        padding: 0.1rem 0.5rem;
        border: var(--hzt-border-chip) solid var(--hzt-ink);
        font-size: var(--hzt-size-label);
        font-weight: 900;
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
      }

      .badge--known {
        background: var(--hzt-ink);
        color: var(--hzt-panel);
      }

      .badge--unknown {
        background: var(--hzt-well);
        color: var(--hzt-ink);
      }

      .badge--opendata {
        background: var(--hzt-opendata);
        color: var(--hzt-on-opendata);
      }

      .no-entry,
      .translation,
      .note,
      .translations,
      .opendata-source {
        margin: 0.5rem 0 0;
      }

      .translation {
        font-weight: 700;
      }

      .translations {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding-left: 1.1rem;
      }

      .translations li {
        font-weight: 700;
      }

      .opendata-source {
        font-size: var(--hzt-size-label);
        color: var(--hzt-muted);
      }

      .note {
        color: var(--hzt-muted);
      }

      .base-form {
        margin: 0.5rem 0 0;
        font-size: var(--hzt-size-label);
        color: var(--hzt-muted);
      }

      .base-form strong {
        color: var(--hzt-ink);
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.75rem;
      }

      .actions .hzt-button {
        padding: 0.4rem 0.85rem;
      }
    `]}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocumentClick,!0),document.addEventListener("keydown",this.onKeyDown,!0)}disconnectedCallback(){document.removeEventListener("click",this.onDocumentClick,!0),document.removeEventListener("keydown",this.onKeyDown,!0),super.disconnectedCallback()}firstUpdated(){this.renderRoot.querySelector(".tooltip")?.focus({preventScroll:!0}),this.clampPosition()}updated(t){(t.has("x")||t.has("y")||t.has("word")||t.has("entry")||t.has("openDataEntry"))&&this.clampPosition()}clampPosition(){const t=this.renderRoot.querySelector(".tooltip");if(!t)return;const e=t.offsetWidth,o=t.offsetHeight,s=Math.max(Z,Math.min(this.x??0,window.innerWidth-e-Z)),n=Math.max(Z,Math.min((this.y??0)+Da,window.innerHeight-o-Z));(s!==this.position.left||n!==this.position.top)&&(this.position={left:s,top:n})}emitSave(t){const e=this.normalizeWord();if(!e)return;const o={word:e,status:t==="known"?"known":"unknown",...this.entry?.translation?{translation:this.entry.translation}:{},...this.entry?.note?{note:this.entry.note}:{}};this.dispatchEvent(new CustomEvent("save-entry",{detail:{entry:o},bubbles:!0,composed:!0}))}emitAdd(){const t=this.baseForm??this.normalizeWord();if(!t)return;const e=this.openDataEntry?.translations[0];this.dispatchEvent(new CustomEvent("open-add-modal",{detail:{word:t,...e?{translation:e}:{}},bubbles:!0,composed:!0}))}emitClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}normalizeWord(){return(this.word??"").trim().toLocaleLowerCase()}render(){const t=this.entry?.status??"unknown",e=t==="known"?"Conocida":"Nueva";return d`
      <div
        class="tooltip"
        role="dialog"
        aria-label="Detalle de la palabra ${this.baseForm??this.word??""}"
        tabindex="-1"
        style="left: ${this.position.left}px; top: ${this.position.top}px;"
      >
        <header class="tooltip-header">
          <h3>${this.baseForm?d`${this.word} → ${this.baseForm}`:this.word??""}</h3>
          <button
            class="hzt-button hzt-button--text close-button"
            aria-label="Cerrar"
            @click=${this.emitClose}
          >
            ×
          </button>
        </header>

        ${this.entry?d`<span class="badge badge--${t}">${e}</span>`:this.openDataEntry?d`<span class="badge badge--opendata">Open Data</span>`:d`<p class="no-entry">Esta palabra no está en el diccionario.</p>`}
        ${this.entry?.translation?d`<p class="translation">${this.entry.translation}</p>`:""}
        ${this.entry?.note?d`<p class="note">${this.entry.note}</p>`:""}
        ${!this.entry&&this.openDataEntry?d`
              <ul class="translations">
                ${this.openDataEntry.translations.map(o=>d`<li>${o}</li>`)}
              </ul>
              ${this.openDataEntry.partOfSpeech||this.openDataEntry.domains.length?d`<p class="note">
                    ${[this.openDataEntry.partOfSpeech,this.openDataEntry.domains.join(", ")].filter(Boolean).join(" · ")}
                  </p>`:""}
              <p class="opendata-source">Fuente: Open Data Euskadi (CC BY 4.0)</p>
            `:""}
        ${this.baseForm&&this.word!==this.baseForm&&this.suffix&&this.cases?.length?d`
          <p class="base-form">
            ${this.suffix} (${this.cases[0]})
          </p>
        `:""}

        <div class="actions">
          ${this.entry?d`
                <button
                  class="hzt-button hzt-button--${t==="known"?"primary":"outline"}"
                  @click=${()=>this.emitSave("known")}
                >
                  Marcar conocida
                </button>
                <button
                  class="hzt-button hzt-button--${t==="unknown"?"primary":"outline"}"
                  @click=${()=>this.emitSave("unknown")}
                >
                  Marcar nueva
                </button>
              `:d`
                <button class="hzt-button hzt-button--primary" @click=${this.emitAdd}>
                  Añadir al diccionario
                </button>
              `}
        </div>
      </div>
    `}}_([f({type:String})],x.prototype,"word");_([f({type:Object})],x.prototype,"entry");_([f({type:Object})],x.prototype,"openDataEntry");_([f({type:Number})],x.prototype,"x");_([f({type:Number})],x.prototype,"y");_([f({type:String})],x.prototype,"baseForm");_([f({type:String})],x.prototype,"suffix");_([f({type:Array})],x.prototype,"cases");_([u()],x.prototype,"position");$("component-word-tooltip",x);var Oa=Object.defineProperty,ct=(a,t,e,o)=>{for(var s=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=r(t,e,s)||s);return s&&Oa(t,e,s),s};class K extends w{constructor(){super(...arguments),this.open=!1,this.draft={word:"",status:"unknown",translation:"",note:""},this.showError=!1,this.onKeyDown=t=>{t.key==="Escape"&&this.open&&this.emitClose()}}static{this.styles=[l.hostStyle,l.designTokens,l.themeTokens,l.accentTokens,l.headerStyle,l.cardStyle,l.buttonStyle,v`
      :host {
        display: none;
      }

      :host([open]) {
        display: block;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal {
        position: relative;
        max-width: 420px;
        width: calc(100% - 2rem);
        max-height: calc(100vh - 2rem);
        overflow-y: auto;
      }

      .entry-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.25rem;
      }

      .entry-form h2 {
        margin-bottom: 0.25rem;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin: 0;
        padding: 0;
        border: 0;
      }

      .field span,
      .field legend {
        font-size: var(--hzt-size-label);
        font-weight: 900;
        letter-spacing: var(--hzt-tracking-label);
        text-transform: uppercase;
        color: var(--hzt-muted);
      }

      input[type='text'],
      textarea {
        font-family: var(--hzt-font-body);
        font-size: var(--hzt-size-body);
        line-height: var(--hzt-line-body);
        color: var(--hzt-ink);
        background: var(--hzt-panel);
        border: var(--hzt-border-button) solid var(--hzt-ink);
        border-radius: var(--hzt-corner);
        padding: 0.5rem 0.6rem;
      }

      textarea {
        resize: vertical;
        min-height: 4.5rem;
      }

      input[type='text']:focus-visible,
      textarea:focus-visible {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
        outline-offset: 3px;
      }

      input[type='text'][aria-invalid='true'] {
        border-color: var(--hzt-error);
      }

      .status-options {
        display: flex;
        gap: 1rem;
      }

      .status-options label {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: var(--hzt-size-body);
      }

      input[type='radio'] {
        accent-color: var(--hzt-accent);
      }

      .error {
        margin: 0;
        font-size: var(--hzt-size-label);
        font-weight: 700;
        color: var(--hzt-error);
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
    `]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){document.removeEventListener("keydown",this.onKeyDown),super.disconnectedCallback()}willUpdate(t){t.has("entry")&&(this.draft=this.entry?{word:this.entry.word,status:this.entry.status,translation:this.entry.translation??"",note:this.entry.note??""}:{word:"",status:"unknown",translation:"",note:""},this.showError=!1)}render(){return this.open?d`
      <div class="backdrop" @click=${this.onBackdropClick}>
        <div
          class="modal hzt-card"
          role="dialog"
          aria-label="${this.entry?"Editar entrada":"Nueva entrada"}"
          @click=${t=>t.stopPropagation()}
        >
          <form class="entry-form" @submit=${this.handleSubmit}>
            <h2>${this.entry?"Editar entrada":"Nueva entrada"}</h2>

            <label class="field">
              <span>Palabra</span>
              <input
                type="text"
                name="word"
                .value=${this.draft.word}
                aria-invalid=${this.showError}
                @input=${this.handleWordInput}
              />
            </label>

            <fieldset class="field">
              <legend>Estado</legend>
              <div class="status-options">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="known"
                    .checked=${this.draft.status==="known"}
                    @change=${this.selectKnown}
                  />
                  Conocida
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="unknown"
                    .checked=${this.draft.status==="unknown"}
                    @change=${this.selectUnknown}
                  />
                  Nueva
                </label>
              </div>
            </fieldset>

            <label class="field">
              <span>Traducción</span>
              <input
                type="text"
                name="translation"
                .value=${this.draft.translation}
                @input=${this.handleTranslationInput}
              />
            </label>

            <label class="field">
              <span>Nota</span>
              <textarea
                name="note"
                .value=${this.draft.note}
                @input=${this.handleNoteInput}
              ></textarea>
            </label>

            ${this.showError?d`<p class="error" role="alert">La palabra es obligatoria</p>`:""}

            <div class="actions">
              <button type="button" class="hzt-button hzt-button--outline" @click=${this.emitClose}>
                Cancelar
              </button>
              <button type="submit" class="hzt-button hzt-button--primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `:d``}onBackdropClick(){this.emitClose()}handleWordInput(t){const e=t.target.value;this.draft={...this.draft,word:e},this.showError&&(this.showError=!1)}handleTranslationInput(t){const e=t.target.value;this.draft={...this.draft,translation:e}}handleNoteInput(t){const e=t.target.value;this.draft={...this.draft,note:e}}selectKnown(){this.draft={...this.draft,status:"known"}}selectUnknown(){this.draft={...this.draft,status:"unknown"}}handleSubmit(t){t.preventDefault();const e=this.draft.word.trim();if(!e){this.showError=!0;return}const o=this.draft.translation.trim(),s=this.draft.note.trim(),n={word:e,status:this.draft.status,...o?{translation:o}:{},...s?{note:s}:{}};this.dispatchEvent(new CustomEvent("save-entry",{detail:{entry:n},bubbles:!0,composed:!0}))}emitClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}}ct([f({type:Boolean,reflect:!0})],K.prototype,"open");ct([f({type:Object})],K.prototype,"entry");ct([u()],K.prototype,"draft");ct([u()],K.prototype,"showError");$("component-dictionary-form",K);var Ta=Object.defineProperty,lt=(a,t,e,o)=>{for(var s=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=r(t,e,s)||s);return s&&Ta(t,e,s),s};const qt="https://www.euskara.euskadi.eus/itzuli/",Kt="hiztegi-itzuli-panel-open";class V extends w{constructor(){super(...arguments),this.open=!1,this.word="",this.searchWord="",this.iframeSrc=qt}static{this.styles=[l.hostStyle,l.designTokens,l.themeTokens,l.accentTokens,l.buttonStyle,v`
      :host {
        display: block;
        height: 100%;
      }

      .panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        border-left: var(--hzt-border-panel) solid var(--hzt-ink);
        background: var(--hzt-panel);
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
        border-bottom: var(--hzt-border-panel) solid var(--hzt-ink);
        background: var(--hzt-well);
      }

      .panel-header h3 {
        margin: 0;
        font-size: var(--hzt-size-stamp);
      }

      .search-container {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-bottom: var(--hzt-border-panel) solid var(--hzt-ink);
      }

      .search-input {
        flex: 1;
        padding: 0.35rem 0.5rem;
        border: var(--hzt-border-chip) solid var(--hzt-ink);
        background: var(--hzt-panel);
        font-family: var(--hzt-font-body);
        font-size: var(--hzt-size-body);
      }

      .search-input:focus {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
      }

      .iframe-container {
        flex: 1;
        overflow: hidden;
      }

      .iframe-container iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    `]}connectedCallback(){super.connectedCallback(),this.loadState()}updated(t){t.has("word")&&this.word&&(this.searchWord=this.word,this.updateIframeSrc())}loadState(){const t=localStorage.getItem(Kt);t!==null&&(this.open=t==="true")}saveState(){localStorage.setItem(Kt,String(this.open))}togglePanel(){this.open=!this.open,this.saveState(),this.dispatchEvent(new CustomEvent("toggle",{detail:{open:this.open},bubbles:!0,composed:!0}))}onSearchInput(t){this.searchWord=t.target.value}onSearchKeydown(t){t.key==="Enter"&&this.updateIframeSrc()}onSearchClick(){this.updateIframeSrc()}updateIframeSrc(){this.searchWord.trim()&&(this.iframeSrc=`${qt}?q=${encodeURIComponent(this.searchWord.trim())}`)}render(){return this.open?d`
      <div class="panel">
        <header class="panel-header">
          <h3>Itzuli</h3>
          <button
            class="hzt-button hzt-button--text"
            aria-label="Cerrar panel"
            @click=${this.togglePanel}
          >
            ×
          </button>
        </header>
        <div class="search-container">
          <input
            class="search-input"
            type="text"
            placeholder="Bilatu hitza..."
            .value=${this.searchWord}
            @input=${this.onSearchInput}
            @keydown=${this.onSearchKeydown}
          />
          <button class="hzt-button hzt-button--primary" @click=${this.onSearchClick}>
            Bilatu
          </button>
        </div>
        <div class="iframe-container">
          <iframe
            src=${this.iframeSrc}
            title="Itzuli - Euskara hiztegia"
            sandbox="allow-same-origin allow-scripts allow-forms"
          ></iframe>
        </div>
      </div>
    `:d``}}lt([f({type:Boolean})],V.prototype,"open");lt([f({type:String})],V.prototype,"word");lt([u()],V.prototype,"searchWord");lt([u()],V.prototype,"iframeSrc");$("component-iframe-panel",V);var La=Object.defineProperty,ja=Object.getOwnPropertyDescriptor,y=(a,t,e,o)=>{for(var s=o>1?void 0:o?ja(t,e):t,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&La(t,e,s),s};let g=class extends A{constructor(){super(...arguments),this.bookId="",this.chapters=[],this.chapterIndex=0,this.pageIndex=0,this.dictionary=[],this.opendataIndex=new Set,this.loading=!0,this.error="",this.showDictForm=!1,this.showItzuliPanel=!1,this.selectedWord="",this.loadStarted=!1}willUpdate(a){a.has("bookId")&&this.bookId&&this.ensureLoaded()}async onPageInit(){await this.ensureLoaded()}async ensureLoaded(){if(!this.loadStarted){this.loadStarted=!0;try{const a=this.bookId||this.getBookIdFromQuery();await this.loadBook(a)}finally{this.loadStarted=!1}}}getBookIdFromQuery(){return this.getQueryParamsURL().get("bookId")??""}async loadBook(a){if(!a){this.error="No se ha indicado ningún libro.",this.loading=!1;return}this.loading=!0,this.error="",this.tooltip=void 0,this.tooltipEntry=void 0,this.tooltipOpenDataEntry=void 0,this.showDictForm=!1,this.dictFormEntry=void 0;const t=await this.api.getBook(a);if(!t){this.error="Libro no encontrado.",this.loading=!1;return}const[e,o,s,n]=await Promise.all([this.api.getChapters(a),this.api.getProgress(a),this.api.getAllEntries(),this.api.loadOpenDataIndex()]),r=Math.max(0,e.length-1);this.book=t,this.chapters=e,this.dictionary=s,this.opendataIndex=n,this.chapterIndex=Math.min(o?.chapterIndex??0,r),this.pageIndex=o?.pageIndex??0,this.loading=!1}async persistProgress(){await this.api.saveProgress({bookId:this.bookId,chapterIndex:this.chapterIndex,pageIndex:this.pageIndex})}async onPageChange(a){const{pageIndex:t}=a.detail;this.pageIndex=t,await this.persistProgress()}async onPreviousChapter(){this.chapterIndex>0&&await this.loadChapter(this.chapterIndex-1)}async onNextChapter(){this.chapterIndex<this.chapters.length-1&&await this.loadChapter(this.chapterIndex+1)}async loadChapter(a){this.chapterIndex=a,this.pageIndex=0,await this.persistProgress()}async onWordClick(a){const{word:t,x:e,y:o,baseForm:s,suffix:n,cases:r}=a.detail,i=s??t,c=await this.api.resolveWord(i),h=c?void 0:await this.api.lookupOpenData(i);this.tooltip={word:t,x:e,y:o,baseForm:s,suffix:n,cases:r},this.tooltipEntry=c,this.tooltipOpenDataEntry=h,this.selectedWord=t}onTooltipClose(){this.tooltip=void 0,this.tooltipEntry=void 0,this.tooltipOpenDataEntry=void 0}async onTooltipSave(a){const{entry:t}=a.detail,e=await this.api.upsertEntry(t);this.tooltipEntry=e,this.tooltipOpenDataEntry=void 0,this.dictionary=await this.api.getAllEntries()}onOpenAddModal(a){const{word:t,translation:e}=a.detail;this.tooltip=void 0,this.tooltipEntry=void 0,this.tooltipOpenDataEntry=void 0,this.dictFormEntry={word:t,status:"unknown",...e?{translation:e}:{}},this.showDictForm=!0}async onDictFormSave(a){const{entry:t}=a.detail,e=await this.api.upsertEntry(t);this.showDictForm=!1,this.dictFormEntry=void 0,this.dictionary=await this.api.getAllEntries(),this.tooltipEntry=e}onDictFormClose(){this.showDictForm=!1,this.dictFormEntry=void 0}toggleItzuliPanel(){this.showItzuliPanel=!this.showItzuliPanel,localStorage.setItem("hiztegi-itzuli-panel-open",String(this.showItzuliPanel))}onItzuliToggle(a){const{open:t}=a.detail;this.showItzuliPanel=t}render(){if(this.error)return d`
        <div>
          <p class="error" role="alert">${this.error}</p>
          <button class="hzt-button" @click=${()=>this.triggerPageNavigation({page:"library"})}>
            Volver a la biblioteca
          </button>
        </div>
      `;if(this.loading)return d`<p class="empty" aria-live="polite">Cargando...</p>`;const a=this.chapters[this.chapterIndex];if(!this.book||this.chapters.length===0||!a)return d`<p class="empty">Este libro no tiene capítulos.</p>`;const t=this.chapterIndex===0,e=this.chapterIndex===this.chapters.length-1;return d`
      <div>
        <header>
          <div class="toolbar">
            <h1>${this.book.title}</h1>
          <button class="hzt-button hzt-button--text" @click=${()=>this.triggerPageNavigation({page:"library"})}>
              Volver a la biblioteca
            </button>
          </div>
          <p class="chapter-title">${a.title}</p>
          <div class="chapter-controls">
            <button class="hzt-button" ?disabled=${t} @click=${this.onPreviousChapter}>
              Capítulo anterior
            </button>
            <span class="chapter-info"
              >Capítulo ${this.chapterIndex+1} de ${this.chapters.length}</span
            >
            <button
              class="hzt-button hzt-button--primary"
              ?disabled=${e}
              @click=${this.onNextChapter}
            >
              Capítulo siguiente
            </button>
            <button
              class="hzt-button ${this.showItzuliPanel?"hzt-button--primary":""}"
              @click=${this.toggleItzuliPanel}
            >
              Itzuli
            </button>
          </div>
        </header>

        <div class="reading-content">
          <component-text-reader
            .text=${a.text}
            .dictionary=${this.dictionary}
            .opendataIndex=${this.opendataIndex}
            .pageIndex=${this.pageIndex}
            @page-change=${this.onPageChange}
            @word-click=${this.onWordClick}
          ></component-text-reader>

          ${this.showItzuliPanel?d`
                <component-iframe-panel
                  .open=${this.showItzuliPanel}
                  .word=${this.selectedWord}
                  @toggle=${this.onItzuliToggle}
                ></component-iframe-panel>
              `:""}
        </div>

        ${this.tooltip?d`
              <component-word-tooltip
                .word=${this.tooltip.word}
                .entry=${this.tooltipEntry}
                .openDataEntry=${this.tooltipOpenDataEntry}
                .x=${this.tooltip.x}
                .y=${this.tooltip.y}
                .baseForm=${this.tooltip.baseForm}
                .suffix=${this.tooltip.suffix}
                .cases=${this.tooltip.cases}
                @save-entry=${this.onTooltipSave}
                @open-add-modal=${this.onOpenAddModal}
                @close=${this.onTooltipClose}
              ></component-word-tooltip>
            `:""}

        <component-dictionary-form
          .open=${this.showDictForm}
          .entry=${this.dictFormEntry}
          @save-entry=${this.onDictFormSave}
          @close=${this.onDictFormClose}
        ></component-dictionary-form>
      </div>
    `}};g.styles=[...A.styles,l.headerStyle,l.buttonStyle,v`
      :host {
        padding: 1rem;
      }

      header {
        margin-bottom: 1rem;
      }

      .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
      }

      .toolbar h1 {
        margin: 0;
      }

      .chapter-title {
        margin: 0 0 0.75rem;
        font-family: var(--hzt-font-display);
        font-size: var(--hzt-size-stamp);
        font-weight: 400;
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
        color: var(--hzt-muted);
      }

      .chapter-controls {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .chapter-info {
        font-family: var(--hzt-font-display);
        font-size: var(--hzt-size-stamp);
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
        color: var(--hzt-muted);
      }

      .reading-content {
        display: flex;
        gap: 1rem;
        min-height: 400px;
      }

      .reading-content > :first-child {
        flex: 1;
      }

      .reading-content > component-iframe-panel {
        width: 350px;
        flex-shrink: 0;
      }

      .empty {
        color: var(--hzt-muted);
      }

      .error {
        color: var(--hzt-error);
      }
    `];y([f({type:String})],g.prototype,"bookId",2);y([u()],g.prototype,"book",2);y([u()],g.prototype,"chapters",2);y([u()],g.prototype,"chapterIndex",2);y([u()],g.prototype,"pageIndex",2);y([u()],g.prototype,"dictionary",2);y([u()],g.prototype,"opendataIndex",2);y([u()],g.prototype,"tooltip",2);y([u()],g.prototype,"tooltipEntry",2);y([u()],g.prototype,"tooltipOpenDataEntry",2);y([u()],g.prototype,"loading",2);y([u()],g.prototype,"error",2);y([u()],g.prototype,"showDictForm",2);y([u()],g.prototype,"dictFormEntry",2);y([u()],g.prototype,"showItzuliPanel",2);y([u()],g.prototype,"selectedWord",2);g=y([ot({getBook:ae,getChapters:Ze,getProgress:se,saveProgress:ta,getAllEntries:ie,resolveWord:va,loadOpenDataIndex:ka,lookupOpenData:_a,upsertEntry:ce})],g);$("page-reading",g);var Ra=Object.defineProperty,Fa=(a,t,e,o)=>{for(var s=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=r(t,e,s)||s);return s&&Ra(t,e,s),s};class de extends w{static{this.styles=[l.hostStyle,l.designTokens,l.themeTokens,l.accentTokens,l.headerStyle,l.cardStyle,l.buttonStyle,v`
      .entry-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
      }

      .entry-info {
        min-width: 0;
      }

      .entry-info h2 {
        margin-bottom: 0.25rem;
      }

      .badge {
        display: inline-block;
        padding: 0.1rem 0.5rem;
        border: var(--hzt-border-chip) solid var(--hzt-ink);
        font-size: var(--hzt-size-label);
        font-weight: 900;
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
      }

      .badge--known {
        background: var(--hzt-ink);
        color: var(--hzt-panel);
      }

      .badge--unknown {
        background: var(--hzt-well);
        color: var(--hzt-ink);
      }

      .note {
        margin: 0.25rem 0 0;
        color: var(--hzt-muted);
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        flex-shrink: 0;
      }
    `]}render(){const t=this.entry?.status??"unknown",e=t==="known"?"Conocida":"Nueva";return d`
      <article class="entry-row hzt-card">
        <div class="entry-info">
          <h2>${this.entry?.word??""}</h2>
          <span class="badge badge--${t}">${e}</span>
          ${this.entry?.note?d`<p class="note">${this.entry.note}</p>`:""}
        </div>
        <div class="actions">
          <button class="hzt-button hzt-button--outline" @click=${this.emitEdit}>Editar</button>
          <button class="hzt-button hzt-button--destructive" @click=${this.emitDelete}>Eliminar</button>
        </div>
      </article>
    `}emitEdit(){this.entry&&this.dispatchEvent(new CustomEvent("edit-entry",{detail:{word:this.entry.word},bubbles:!0,composed:!0}))}emitDelete(){this.entry&&this.dispatchEvent(new CustomEvent("delete-entry",{detail:{word:this.entry.word},bubbles:!0,composed:!0}))}}Fa([f({type:Object})],de.prototype,"entry");$("component-dictionary-entry-row",de);var Ua=Object.defineProperty,Ba=Object.getOwnPropertyDescriptor,Q=(a,t,e,o)=>{for(var s=o>1?void 0:o?Ba(t,e):t,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&Ua(t,e,s),s};let I=class extends A{constructor(){super(...arguments),this.entries=[],this.search="",this.showForm=!1}async onPageInit(){await this.loadEntries()}async loadEntries(){this.entries=await this.api.getEntries()}get filteredEntries(){const a=this.search.trim().toLocaleLowerCase();return a?this.entries.filter(t=>t.word.toLocaleLowerCase().includes(a)||(t.translation??"").toLocaleLowerCase().includes(a)||(t.note??"").toLocaleLowerCase().includes(a)):this.entries}onSearchInput(a){this.search=a.target.value}onAddClick(){this.editing=void 0,this.showForm=!0}onEditEntry(a){const{word:t}=a.detail;this.editing=this.entries.find(e=>e.word===t),this.showForm=!0}async onDeleteEntry(a){const{word:t}=a.detail;window.confirm("¿Seguro que quieres eliminar la entrada?")&&(await this.api.deleteEntry(t),await this.loadEntries())}async onSaveEntry(a){const{entry:t}=a.detail;await this.api.upsertEntry(t),this.showForm=!1,this.editing=void 0,await this.loadEntries()}onCancelEntry(){this.showForm=!1,this.editing=void 0}render(){const a=this.filteredEntries;return d`
      <div>
        <h1>Diccionario</h1>
        <div class="toolbar">
          <input
            type="search"
            class="search"
            placeholder="Buscar palabra..."
            aria-label="Buscar palabra"
            .value=${this.search}
            @input=${this.onSearchInput}
          />
          <button class="hzt-button hzt-button--primary" @click=${this.onAddClick}>Añadir</button>
        </div>

        <component-dictionary-form
          .open=${this.showForm}
          .entry=${this.editing}
          @save-entry=${this.onSaveEntry}
          @close=${this.onCancelEntry}
        ></component-dictionary-form>

        <div class="entries">
          ${a.length===0?d`
                <p class="empty">
                  ${this.entries.length===0?"Aún no hay entradas.":"No hay resultados para tu búsqueda."}
                </p>
              `:a.map(t=>d`
                  <component-dictionary-entry-row
                    .entry=${t}
                    @edit-entry=${this.onEditEntry}
                    @delete-entry=${this.onDeleteEntry}
                  ></component-dictionary-entry-row>
                `)}
        </div>
      </div>
    `}};I.styles=[...A.styles,l.headerStyle,l.buttonStyle,v`
      :host {
        padding: 1rem;
      }

      h1 {
        margin-bottom: 0.75rem;
      }

      .toolbar {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 1rem;
      }

      .search {
        flex: 1;
        min-width: 0;
        font-family: var(--hzt-font-body);
        font-size: var(--hzt-size-body);
        color: var(--hzt-ink);
        background: var(--hzt-panel);
        border: var(--hzt-border-button) solid var(--hzt-ink);
        border-radius: var(--hzt-corner);
        padding: 0.5rem 0.6rem;
      }

      .search:focus-visible {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
        outline-offset: 3px;
      }

      .entries {
        display: grid;
        gap: 0.75rem;
      }

      .empty {
        color: var(--hzt-muted);
      }
    `];Q([u()],I.prototype,"entries",2);Q([u()],I.prototype,"search",2);Q([u()],I.prototype,"showForm",2);Q([u()],I.prototype,"editing",2);I=Q([ot({getEntries:ie,upsertEntry:ce,deleteEntry:ga})],I);$("page-dictionary",I);$("page-hiztegi-app",j);
