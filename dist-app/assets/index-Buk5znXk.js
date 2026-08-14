(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function e(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=e(o);fetch(o.href,n)}})();const G=globalThis,ct=G.ShadowRoot&&(G.ShadyCSS===void 0||G.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lt=Symbol(),$t=new WeakMap;let Dt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==lt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ct&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=$t.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&$t.set(e,t))}return t}toString(){return this.cssText}};const Jt=r=>new Dt(typeof r=="string"?r:r+"",void 0,lt),f=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,o,n)=>s+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[n+1],r[0]);return new Dt(e,r,lt)},Zt=(r,t)=>{if(ct)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),o=G.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,r.appendChild(s)}},wt=ct?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Jt(e)})(r):r;const{is:Xt,defineProperty:Yt,getOwnPropertyDescriptor:te,getOwnPropertyNames:ee,getOwnPropertySymbols:re,getPrototypeOf:oe}=Object,Z=globalThis,kt=Z.trustedTypes,se=kt?kt.emptyScript:"",ne=Z.reactiveElementPolyfillSupport,L=(r,t)=>r,Q={toAttribute(r,t){switch(t){case Boolean:r=r?se:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},dt=(r,t)=>!Xt(r,t),xt={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:dt};Symbol.metadata??=Symbol("metadata"),Z.litPropertyMetadata??=new WeakMap;let I=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=xt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&Yt(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){const{get:o,set:n}=te(this.prototype,t)??{get(){return this[e]},set(i){this[e]=i}};return{get:o,set(i){const c=o?.call(this);n?.call(this,i),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xt}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;const t=oe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){const e=this.properties,s=[...ee(e),...re(e)];for(const o of s)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)e.unshift(wt(o))}else t!==void 0&&e.push(wt(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Zt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:Q).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const n=s.getPropertyOptions(o),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Q;this._$Em=o;const c=i.fromAttribute(e,n.type);this[o]=c??this._$Ej?.get(o)??c,this._$Em=null}}requestUpdate(t,e,s,o=!1,n){if(t!==void 0){const i=this.constructor;if(o===!1&&(n=this[t]),s??=i.getPropertyOptions(t),!((s.hasChanged??dt)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:n},i){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),n!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,n]of s){const{wrapped:i}=n,c=this[o];i!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,n,c)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[L("elementProperties")]=new Map,I[L("finalized")]=new Map,ne?.({ReactiveElement:I}),(Z.reactiveElementVersions??=[]).push("2.1.2");const pt=globalThis,_t=r=>r,J=pt.trustedTypes,Et=J?J.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ut="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Lt="?"+x,ie=`<${Lt}>`,P=document,R=()=>P.createComment(""),M=r=>r===null||typeof r!="object"&&typeof r!="function",ut=Array.isArray,ae=r=>ut(r)||typeof r?.[Symbol.iterator]=="function",st=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,At=/-->/g,St=/>/g,A=RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pt=/'/g,Ct=/"/g,Rt=/^(?:script|style|textarea|title)$/i,he=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),l=he(1),O=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),It=new WeakMap,S=P.createTreeWalker(P,129);function Mt(r,t){if(!ut(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Et!==void 0?Et.createHTML(t):t}const ce=(r,t)=>{const e=r.length-1,s=[];let o,n=t===2?"<svg>":t===3?"<math>":"",i=U;for(let c=0;c<e;c++){const h=r[c];let d,m,p=-1,w=0;for(;w<h.length&&(i.lastIndex=w,m=i.exec(h),m!==null);)w=i.lastIndex,i===U?m[1]==="!--"?i=At:m[1]!==void 0?i=St:m[2]!==void 0?(Rt.test(m[2])&&(o=RegExp("</"+m[2],"g")),i=A):m[3]!==void 0&&(i=A):i===A?m[0]===">"?(i=o??U,p=-1):m[1]===void 0?p=-2:(p=i.lastIndex-m[2].length,d=m[1],i=m[3]===void 0?A:m[3]==='"'?Ct:Pt):i===Ct||i===Pt?i=A:i===At||i===St?i=U:(i=A,o=void 0);const k=i===A&&r[c+1].startsWith("/>")?" ":"";n+=i===U?h+ie:p>=0?(s.push(d),h.slice(0,p)+Ut+h.slice(p)+x+k):h+x+(p===-2?c:k)}return[Mt(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class B{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let n=0,i=0;const c=t.length-1,h=this.parts,[d,m]=ce(t,e);if(this.el=B.createElement(d,s),S.currentNode=this.el.content,e===2||e===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=S.nextNode())!==null&&h.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(const p of o.getAttributeNames())if(p.endsWith(Ut)){const w=m[i++],k=o.getAttribute(p).split(x),V=/([.?@])?(.*)/.exec(w);h.push({type:1,index:n,name:V[2],strings:k,ctor:V[1]==="."?de:V[1]==="?"?pe:V[1]==="@"?ue:X}),o.removeAttribute(p)}else p.startsWith(x)&&(h.push({type:6,index:n}),o.removeAttribute(p));if(Rt.test(o.tagName)){const p=o.textContent.split(x),w=p.length-1;if(w>0){o.textContent=J?J.emptyScript:"";for(let k=0;k<w;k++)o.append(p[k],R()),S.nextNode(),h.push({type:2,index:++n});o.append(p[w],R())}}}else if(o.nodeType===8)if(o.data===Lt)h.push({type:2,index:n});else{let p=-1;for(;(p=o.data.indexOf(x,p+1))!==-1;)h.push({type:7,index:n}),p+=x.length-1}n++}}static createElement(t,e){const s=P.createElement("template");return s.innerHTML=t,s}}function T(r,t,e=r,s){if(t===O)return t;let o=s!==void 0?e._$Co?.[s]:e._$Cl;const n=M(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),n===void 0?o=void 0:(o=new n(r),o._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=o:e._$Cl=o),o!==void 0&&(t=T(r,o._$AS(r,t.values),o,s)),t}class le{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??P).importNode(e,!0);S.currentNode=o;let n=S.nextNode(),i=0,c=0,h=s[0];for(;h!==void 0;){if(i===h.index){let d;h.type===2?d=new j(n,n.nextSibling,this,t):h.type===1?d=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(d=new fe(n,this,t)),this._$AV.push(d),h=s[++c]}i!==h?.index&&(n=S.nextNode(),i++)}return S.currentNode=P,o}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class j{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),M(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==O&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ae(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=B.createElement(Mt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{const n=new le(o,this),i=n.u(this.options);n.p(e),this.T(i),this._$AH=n}}_$AC(t){let e=It.get(t.strings);return e===void 0&&It.set(t.strings,e=new B(t)),e}k(t){ut(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const n of t)o===e.length?e.push(s=new j(this.O(R()),this.O(R()),this,this.options)):s=e[o],s._$AI(n),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=_t(t).nextSibling;_t(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=g}_$AI(t,e=this,s,o){const n=this.strings;let i=!1;if(n===void 0)t=T(this,t,e,0),i=!M(t)||t!==this._$AH&&t!==O,i&&(this._$AH=t);else{const c=t;let h,d;for(t=n[0],h=0;h<n.length-1;h++)d=T(this,c[s+h],e,h),d===O&&(d=this._$AH[h]),i||=!M(d)||d!==this._$AH[h],d===g?t=g:t!==g&&(t+=(d??"")+n[h+1]),this._$AH[h]=d}i&&!o&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class de extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}}class pe extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}}class ue extends X{constructor(t,e,s,o,n){super(t,e,s,o,n),this.type=5}_$AI(t,e=this){if((t=T(this,t,e,0)??g)===O)return;const s=this._$AH,o=t===g&&s!==g||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==g&&(s===g||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class fe{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}}const ge=pt.litHtmlPolyfillSupport;ge?.(B,j),(pt.litHtmlVersions??=[]).push("3.3.2");const me=(r,t,e)=>{const s=e?.renderBefore??t;let o=s._$litPart$;if(o===void 0){const n=e?.renderBefore??null;s._$litPart$=o=new j(t.insertBefore(R(),n),n,void 0,e??{})}return o._$AI(r),o};const ft=globalThis;class v extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=me(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}}v._$litElement$=!0,v.finalized=!0,ft.litElementHydrateSupport?.({LitElement:v});const be=ft.litElementPolyfillSupport;be?.({LitElement:v});(ft.litElementVersions??=[]).push("4.2.2");const Y=function(t){return e=>{e.prototype.api={},Object.entries(t).forEach(([s,o])=>e.prototype.api[s]=o)}},ye=f`
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
`,ve=f`
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
    --hzt-grid-opacity: 0.05;
    --hzt-screentone-opacity: 0.16;
  }
`,ze=f`
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
`,$e=f`
  :host {
    display: block;
    font-family: var(--hzt-font-body);
    font-size: var(--hzt-size-body);
    line-height: var(--hzt-line-body);
    color: var(--hzt-ink);
  }
`,we=f`
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
`,ke=f`
  .hzt-card {
    background: var(--hzt-panel);
    border: var(--hzt-border-panel) solid var(--hzt-ink);
    border-radius: var(--hzt-corner);
    box-shadow: var(--hzt-shadow-card);
    color: var(--hzt-ink);
  }
`,xe=f`
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
`,a={designTokens:ye,themeTokens:ve,accentTokens:ze,hostStyle:$e,headerStyle:we,cardStyle:ke,buttonStyle:xe};class E extends v{constructor(){super()}static{this.styles=[a.hostStyle,a.designTokens,a.themeTokens,a.accentTokens,f`
      :host {
        display: block;
        min-height: 100vh;
        background: var(--hzt-paper);
        color: var(--hzt-ink);
      }
    `]}navigate(t){t.startsWith("/")?window.location.href=window.location.href.concat(t):t.startsWith("http")?window.location.href=t:window.location.href=`${window.location.origin}/${t}`}triggerPageNavigation(t){this.dispatchEvent(new CustomEvent("page-navigation",{detail:{...t},bubbles:!0,composed:!0}))}navigateToPage(t){const e=new URL(window.location.href);e.search="",Object.entries(t).forEach(([s,o])=>e.searchParams.set(s,o)),window.history.replaceState({},"",e.toString())}openNewTab(t){window.open(t,"_blank")}getHref(){return window.location.href}getHash(){const t=location.search.substring(1);return t&&t.length>0?JSON.parse('{"'+decodeURI(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}getHostname(){return window.location.hostname}getQueryParamsURL(){return new URL(this.getHref()).searchParams}connectedCallback(){super.connectedCallback(),this.onPageInit()}onPageInit(){}}const _e={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:dt},Ee=(r=_e,t,e)=>{const{kind:s,metadata:o}=e;let n=globalThis.litPropertyMetadata.get(o);if(n===void 0&&globalThis.litPropertyMetadata.set(o,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:i}=e;return{set(c){const h=t.get.call(this);t.set.call(this,c),this.requestUpdate(i,h,r,!0,c)},init(c){return c!==void 0&&this.C(i,void 0,r,c),c}}}if(s==="setter"){const{name:i}=e;return function(c){const h=this[i];t.call(this,c),this.requestUpdate(i,h,r,!0,c)}}throw Error("Unsupported decorator location: "+s)};function b(r){return(t,e)=>typeof e=="object"?Ee(r,t,e):((s,o,n)=>{const i=o.hasOwnProperty(n);return o.constructor.createProperty(n,s),i?Object.getOwnPropertyDescriptor(o,n):void 0})(r,t,e)}function u(r){return b({...r,state:!0,attribute:!1})}var Ae=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,gt=(r,t,e,s)=>{for(var o=s>1?void 0:s?Se(t,e):t,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=(s?i(t,e,o):i(o))||o);return s&&o&&Ae(t,e,o),o};const nt="library";let N=class extends E{constructor(){super(...arguments),this.currentRoute=nt,this.bookId=""}get pageParam(){const r=this.getQueryParamsURL().get("page");return r==="reading"||r==="dictionary"?r:nt}get routeBookId(){return this.getQueryParamsURL().get("bookId")??""}onPageInit(){this.currentRoute=this.pageParam,this.bookId=this.routeBookId}onPageNavigation({detail:r}){const t=r.page;this.currentRoute=t==="reading"||t==="dictionary"?t:nt,this.bookId=r.bookId??"",this.navigateToPage(r)}_renderPageContent(){switch(this.currentRoute){case"reading":return l`
          <page-reading
            .bookId=${this.bookId}
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-reading>`;case"dictionary":return l`
          <page-dictionary
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-dictionary>`;default:return l`
          <page-library
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-library>`}}render(){return l`
      <div class="nav-wrap">
        <component-nav-bar
          active="${this.currentRoute}"
          @nav-bar-navigation="${this.onPageNavigation}"
        ></component-nav-bar>
      </div>
      <div id="page-container">
        ${this._renderPageContent()}
      </div>
    `}};N.styles=[...E.styles,f`
      :host {
        min-height: 100vh;
        background: var(--hzt-paper);
      }

      .nav-wrap {
        position: sticky;
        top: 0;
        z-index: 10;
      }
    `];gt([u()],N.prototype,"currentRoute",2);gt([u()],N.prototype,"bookId",2);N=gt([Y({getApi:()=>({})})],N);const z=(r,t)=>{if(document.createElement(r).constructor===HTMLElement){const e=t,s=()=>class extends e{constructor(){super()}};window.customElements.define(r,s())}};var Pe=Object.defineProperty,Ce=(r,t,e,s)=>{for(var o=void 0,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=i(t,e,o)||o);return o&&Pe(t,e,o),o};const Ot=[{path:"library",label:"Inicio"},{path:"dictionary",label:"Diccionario"}];class Bt extends v{constructor(){super(...arguments),this.active=""}static{this.styles=[a.hostStyle,a.designTokens,a.themeTokens,a.accentTokens,f`
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
    `]}triggerNavigation(t){this.dispatchEvent(new CustomEvent("nav-bar-navigation",{detail:{page:t},bubbles:!0,composed:!0}))}render(){const t=this.active||Ot[0].path;return l`
      <nav class="nav-bar" aria-label="Navegación principal">
        ${Ot.map(e=>l`
            <button
              class="nav-link ${t===e.path?"nav-link--active":""}"
              @click=${()=>this.triggerNavigation(e.path)}
              aria-current=${t===e.path?"page":"false"}
              >${e.label}</button
            >
          `)}
      </nav>
    `}}Ce([b({type:String})],Bt.prototype,"active");z("component-nav-bar",Bt);const Ie="hiztegi-db",Oe=1,Tt={books:{keyPath:"id"},chapters:{keyPath:"id"},progress:{keyPath:"bookId"},dictionary:{keyPath:"word"}};let it=null;const H=()=>(it||(it=new Promise((r,t)=>{const e=indexedDB.open(Ie,Oe);e.onupgradeneeded=()=>{const s=e.result;Object.keys(Tt).forEach(o=>{s.objectStoreNames.contains(o)||s.createObjectStore(o,Tt[o])})},e.onsuccess=()=>r(e.result),e.onerror=()=>t(e.error)})),it),tt=r=>new Promise((t,e)=>{r.onsuccess=()=>t(r.result),r.onerror=()=>e(r.error)}),jt=(r,t,e)=>H().then(s=>new Promise((o,n)=>{const i=Array.isArray(r)?r:[r],c=s.transaction(i,t),h={};i.forEach(d=>{h[d]=c.objectStore(d)});try{e(h)}catch(d){c.abort(),n(d);return}c.oncomplete=()=>o(),c.onerror=()=>n(c.error),c.onabort=()=>n(c.error)})),mt=async r=>{const t=await H();return tt(t.transaction(r,"readonly").objectStore(r).getAll())},bt=async(r,t)=>{const e=await H();return tt(e.transaction(r,"readonly").objectStore(r).get(t))},Ht=async(r,t)=>{const e=await H();return tt(e.transaction(r,"readwrite").objectStore(r).put(t))},Te=async(r,t)=>{const e=await H();return tt(e.transaction(r,"readwrite").objectStore(r).delete(t))},Ne=async(r,t)=>{const e=crypto.randomUUID(),s={id:e,title:r.title,format:t,addedAt:new Date().toISOString(),chapterIds:[]},o=r.chapters.map((n,i)=>({id:crypto.randomUUID(),bookId:e,index:i,title:n.title,text:n.text}));return s.chapterIds=o.map(n=>n.id),await jt(["books","chapters"],"readwrite",n=>{n.books.put(s),o.forEach(i=>n.chapters.put(i))}),s},De=async()=>mt("books"),Ft=async r=>bt("books",r),Ue=async r=>(await mt("chapters")).filter(e=>e.bookId===r).sort((e,s)=>e.index-s.index),Le=async r=>{const t=await Ft(r);t&&await jt(["books","chapters","progress"],"readwrite",e=>{e.books.delete(r),t.chapterIds.forEach(s=>e.chapters.delete(s)),e.progress.delete(r)})},Re=async r=>{await Ht("progress",r)},Wt=async r=>bt("progress",r),Nt=15,Me=async r=>{const e=(await r.text()).split(/\n\s*\n+/).map(n=>n.trim()).filter(n=>n.length>0),s=[];for(let n=0;n<e.length;n+=Nt)s.push({title:String(s.length+1),text:e.slice(n,n+Nt).join(`

`)});return s.length===0&&s.push({title:"1",text:""}),{title:r.name.replace(/\.[^.]+$/,"").trim()||"Untitled",chapters:s}},Be=r=>r.split(".").pop()?.toLocaleLowerCase()??"",je=async r=>{const t=Be(r.name);switch(t){case"txt":return Me(r);case"epub":case"pdf":throw new Error(`Parser for "${t}" is not implemented yet`);default:throw new Error(`Unsupported file format: "${t}"`)}};var He=Object.defineProperty,Fe=(r,t,e,s)=>{for(var o=void 0,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=i(t,e,o)||o);return o&&He(t,e,o),o};class qt extends v{constructor(){super(...arguments),this.active=!1}static{this.styles=[a.hostStyle,a.designTokens,a.themeTokens,a.accentTokens,f`
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
    `]}firstUpdated(){this.input=this.shadowRoot?.querySelector('input[type="file"]')??void 0}render(){return l`
      <div
        class="${this.active?"drop-zone active":"drop-zone"}"
        role="button"
        tabindex="0"
        aria-label="Añadir archivos txt"
        @click=${this.openPicker}
        @keydown=${this.onKeyDown}
        @dragover=${this.onDragOver}
        @dragleave=${this.onDragLeave}
        @drop=${this.onDrop}
      >
        <slot>Arrastra los archivos txt aquí o haz clic para seleccionarlos</slot>
      </div>
      <input type="file" accept=".txt,text/plain" multiple hidden @change=${this.onInputChange} />
    `}selectFiles(t){t.length!==0&&this.dispatchEvent(new CustomEvent("files-selected",{detail:{files:t},bubbles:!0,composed:!0}))}openPicker(){this.input?.click()}onKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.openPicker())}onDragOver(t){t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="copy"),this.active=!0}onDragLeave(){this.active=!1}onDrop(t){t.preventDefault(),this.active=!1,this.selectFiles(Array.from(t.dataTransfer?.files??[]))}onInputChange(t){const e=t.target;this.selectFiles(Array.from(e.files??[])),e.value=""}}Fe([u()],qt.prototype,"active");z("component-import-file",qt);var We=Object.defineProperty,Vt=(r,t,e,s)=>{for(var o=void 0,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=i(t,e,o)||o);return o&&We(t,e,o),o};class yt extends v{static{this.styles=[a.hostStyle,a.designTokens,a.themeTokens,a.accentTokens,a.headerStyle,a.cardStyle,a.buttonStyle,f`
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
    `]}render(){const t=this.book?.chapterIds.length??0,e=this.progress?`Capítulo ${this.progress.chapterIndex+1} / ${t}`:"";return l`
      <article class="book-card hzt-card">
        <div class="book-info">
          <h2>${this.book?.title??""}</h2>
          <p class="format">${this.book?.format??""}</p>
          ${e?l`<p class="progress">${e}</p>`:""}
        </div>
        <div class="actions">
          <button class="hzt-button hzt-button--primary" @click=${this.emitRead}>Leer</button>
          <button class="hzt-button hzt-button--destructive" @click=${this.emitDelete}>Eliminar</button>
        </div>
      </article>
    `}emitRead(){this.book&&this.dispatchEvent(new CustomEvent("read-book",{detail:{id:this.book.id},bubbles:!0,composed:!0}))}emitDelete(){this.book&&this.dispatchEvent(new CustomEvent("delete-book",{detail:{id:this.book.id},bubbles:!0,composed:!0}))}}Vt([b({type:Object})],yt.prototype,"book");Vt([b({type:Object})],yt.prototype,"progress");z("component-library-book-card",yt);var qe=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,et=(r,t,e,s)=>{for(var o=s>1?void 0:s?Ve(t,e):t,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=(s?i(t,e,o):i(o))||o);return s&&o&&qe(t,e,o),o};let C=class extends E{constructor(){super(...arguments),this.books=[],this.progressByBook={},this.importing=!1}async onPageInit(){await this.loadBooks()}async loadBooks(){const r=await this.api.getBooks(),t=await Promise.all(r.map(async e=>[e.id,await this.api.getProgress(e.id)]));this.books=r,this.progressByBook=Object.fromEntries(t)}async onFilesSelected(r){const{files:t}=r.detail;this.importing=!0;try{for(const e of t){const s=await this.api.parseBook(e);await this.api.importBook(s,"txt")}await this.loadBooks()}finally{this.importing=!1}}async onDeleteBook(r){const{id:t}=r.detail;window.confirm("¿Seguro que quieres eliminar el libro?")&&(await this.api.deleteBook(t),await this.loadBooks())}onReadBook(r){const{id:t}=r.detail;this.triggerPageNavigation({page:"reading",bookId:t})}render(){return l`
      <div>
        <h1>Biblioteca</h1>
        <component-import-file @files-selected=${this.onFilesSelected}></component-import-file>
        ${this.importing?l`<p class="empty" aria-live="polite">Importando...</p>`:""}
        <div class="books">
          ${this.books.length===0?l`<p class="empty">Aún no hay ningún libro.</p>`:this.books.map(r=>l`
                  <component-library-book-card
                    .book=${r}
                    .progress=${this.progressByBook[r.id]}
                    @read-book=${this.onReadBook}
                    @delete-book=${this.onDeleteBook}
                  ></component-library-book-card>
                `)}
        </div>
      </div>
    `}};C.styles=[...E.styles,a.headerStyle,f`
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
    `];et([u()],C.prototype,"books",2);et([u()],C.prototype,"progressByBook",2);et([u()],C.prototype,"importing",2);C=et([Y({getBooks:De,importBook:Ne,deleteBook:Le,getProgress:Wt,parseBook:je})],C);z("page-library",C);const vt=r=>r.trim().toLocaleLowerCase(),Kt=async()=>mt("dictionary"),Ke=async r=>bt("dictionary",vt(r)),Gt=async r=>{const t={...r,word:vt(r.word)};return await Ht("dictionary",t),t},Ge=async r=>{await Te("dictionary",vt(r))},Qe=async r=>Ke(r),at=r=>/^\p{L}$/u.test(r),ht=r=>/\s/.test(r),Je=r=>{const t=[];let e=0;for(;e<r.length;){const s=e;if(ht(r[e])){for(;e<r.length&&ht(r[e]);)e+=1;t.push({type:"space",text:r.slice(s,e)})}else if(at(r[e])){for(;e<r.length&&at(r[e]);)e+=1;t.push({type:"word",text:r.slice(s,e)})}else{for(;e<r.length&&!ht(r[e])&&!at(r[e]);)e+=1;t.push({type:"punct",text:r.slice(s,e)})}}return t};var Ze=Object.defineProperty,rt=(r,t,e,s)=>{for(var o=void 0,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=i(t,e,o)||o);return o&&Ze(t,e,o),o};class F extends v{constructor(){super(...arguments),this.text="",this.dictionary=[],this.pageSize=100,this.pageIndex=0}static{this.styles=[a.hostStyle,a.designTokens,a.themeTokens,a.accentTokens,a.buttonStyle,f`
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
    `]}willUpdate(t){t.has("text")&&!t.has("pageIndex")&&(this.pageIndex=0)}get pages(){const t=Je(this.text),e=Math.max(1,Math.floor(this.pageSize)),s=[];let o=[],n=0;for(const i of t)o.push(i),i.type==="word"&&(n+=1,n>=e&&(s.push(o),o=[],n=0));return o.length>0&&s.push(o),s.length>0?s:[[]]}get statusMap(){return new Map(this.dictionary.map(t=>[t.word.toLocaleLowerCase(),t.status]))}onPrevious(){this.pageIndex>0&&(this.pageIndex-=1,this.emitPageChange())}onNext(){this.pageIndex<this.pages.length-1&&(this.pageIndex+=1,this.emitPageChange())}emitPageChange(){this.dispatchEvent(new CustomEvent("page-change",{detail:{pageIndex:this.pageIndex,pageCount:this.pages.length},bubbles:!0,composed:!0}))}onWordClick(t,e){const s=e.currentTarget.getBoundingClientRect();this.dispatchEvent(new CustomEvent("word-click",{detail:{word:t,x:s.left+s.width/2,y:s.bottom},bubbles:!0,composed:!0}))}render(){const t=this.pages,e=t.length,s=Math.min(this.pageIndex,e-1),o=t[s]??[],n=this.statusMap;return l`
      <div class="reader">
        <p class="reader-text">${o.map(i=>{if(i.type!=="word")return i.text;const c=n.get(i.text.toLocaleLowerCase())??"none",h=c==="none"?"word":`word word--${c}`;return l`<span class=${h} @click=${d=>this.onWordClick(i.text,d)}>${i.text}</span>`})}</p>
        <div class="controls">
          <button class="hzt-button" ?disabled=${s===0} @click=${this.onPrevious}>Anterior</button>
          <span class="page-info">Página ${s+1} de ${e}</span>
          <button class="hzt-button hzt-button--primary" ?disabled=${s===e-1} @click=${this.onNext}>
            Siguiente
          </button>
        </div>
      </div>
    `}}rt([b({type:String})],F.prototype,"text");rt([b({type:Array})],F.prototype,"dictionary");rt([b({type:Number})],F.prototype,"pageSize");rt([b({type:Number})],F.prototype,"pageIndex");z("component-text-reader",F);var Xe=Object.defineProperty,W=(r,t,e,s)=>{for(var o=void 0,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=i(t,e,o)||o);return o&&Xe(t,e,o),o};const K=8,Ye=8;class D extends v{constructor(){super(...arguments),this.position={left:0,top:0},this.onDocumentClick=t=>{t.composedPath().includes(this)||this.emitClose()},this.onKeyDown=t=>{t.key==="Escape"&&this.emitClose()}}static{this.styles=[a.hostStyle,a.designTokens,a.themeTokens,a.accentTokens,a.headerStyle,a.buttonStyle,f`
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

      .no-entry,
      .translation,
      .note {
        margin: 0.5rem 0 0;
      }

      .translation {
        font-weight: 700;
      }

      .note {
        color: var(--hzt-muted);
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
    `]}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocumentClick,!0),document.addEventListener("keydown",this.onKeyDown,!0)}disconnectedCallback(){document.removeEventListener("click",this.onDocumentClick,!0),document.removeEventListener("keydown",this.onKeyDown,!0),super.disconnectedCallback()}firstUpdated(){this.renderRoot.querySelector(".tooltip")?.focus({preventScroll:!0}),this.clampPosition()}updated(t){(t.has("x")||t.has("y")||t.has("word")||t.has("entry"))&&this.clampPosition()}clampPosition(){const t=this.renderRoot.querySelector(".tooltip");if(!t)return;const e=t.offsetWidth,s=t.offsetHeight,o=Math.max(K,Math.min(this.x??0,window.innerWidth-e-K)),n=Math.max(K,Math.min((this.y??0)+Ye,window.innerHeight-s-K));(o!==this.position.left||n!==this.position.top)&&(this.position={left:o,top:n})}emitSave(t){const e=this.normalizeWord();if(!e)return;const s={word:e,status:t==="known"?"known":"unknown",...this.entry?.translation?{translation:this.entry.translation}:{},...this.entry?.note?{note:this.entry.note}:{}};this.dispatchEvent(new CustomEvent("save-entry",{detail:{entry:s},bubbles:!0,composed:!0}))}emitAdd(){this.emitSave("unknown")}emitClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}normalizeWord(){return(this.word??"").trim().toLocaleLowerCase()}render(){const t=this.entry?.status??"unknown",e=t==="known"?"Conocida":"Nueva";return l`
      <div
        class="tooltip"
        role="dialog"
        aria-label="Detalle de la palabra ${this.word??""}"
        tabindex="-1"
        style="left: ${this.position.left}px; top: ${this.position.top}px;"
      >
        <header class="tooltip-header">
          <h3>${this.word??""}</h3>
          <button
            class="hzt-button hzt-button--text close-button"
            aria-label="Cerrar"
            @click=${this.emitClose}
          >
            ×
          </button>
        </header>

        ${this.entry?l`<span class="badge badge--${t}">${e}</span>`:l`<p class="no-entry">Esta palabra no está en el diccionario.</p>`}
        ${this.entry?.translation?l`<p class="translation">${this.entry.translation}</p>`:""}
        ${this.entry?.note?l`<p class="note">${this.entry.note}</p>`:""}

        <div class="actions">
          ${this.entry?l`
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
              `:l`
                <button class="hzt-button hzt-button--primary" @click=${this.emitAdd}>
                  Añadir al diccionario
                </button>
              `}
        </div>
      </div>
    `}}W([b({type:String})],D.prototype,"word");W([b({type:Object})],D.prototype,"entry");W([b({type:Number})],D.prototype,"x");W([b({type:Number})],D.prototype,"y");W([u()],D.prototype,"position");z("component-word-tooltip",D);var tr=Object.defineProperty,er=Object.getOwnPropertyDescriptor,$=(r,t,e,s)=>{for(var o=s>1?void 0:s?er(t,e):t,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=(s?i(t,e,o):i(o))||o);return s&&o&&tr(t,e,o),o};let y=class extends E{constructor(){super(...arguments),this.bookId="",this.chapters=[],this.chapterIndex=0,this.pageIndex=0,this.dictionary=[],this.loading=!0,this.error="",this.loadStarted=!1}willUpdate(r){r.has("bookId")&&this.bookId&&this.ensureLoaded()}async onPageInit(){await this.ensureLoaded()}async ensureLoaded(){if(!this.loadStarted){this.loadStarted=!0;try{const r=this.bookId||this.getBookIdFromQuery();await this.loadBook(r)}finally{this.loadStarted=!1}}}getBookIdFromQuery(){return this.getQueryParamsURL().get("bookId")??""}async loadBook(r){if(!r){this.error="No se ha indicado ningún libro.",this.loading=!1;return}this.loading=!0,this.error="",this.tooltip=void 0,this.tooltipEntry=void 0;const t=await this.api.getBook(r);if(!t){this.error="Libro no encontrado.",this.loading=!1;return}const[e,s,o]=await Promise.all([this.api.getChapters(r),this.api.getProgress(r),this.api.getAllEntries()]),n=Math.max(0,e.length-1);this.book=t,this.chapters=e,this.dictionary=o,this.chapterIndex=Math.min(s?.chapterIndex??0,n),this.pageIndex=s?.pageIndex??0,this.loading=!1}async persistProgress(){await this.api.saveProgress({bookId:this.bookId,chapterIndex:this.chapterIndex,pageIndex:this.pageIndex})}async onPageChange(r){const{pageIndex:t}=r.detail;this.pageIndex=t,await this.persistProgress()}async onPreviousChapter(){this.chapterIndex>0&&await this.loadChapter(this.chapterIndex-1)}async onNextChapter(){this.chapterIndex<this.chapters.length-1&&await this.loadChapter(this.chapterIndex+1)}async loadChapter(r){this.chapterIndex=r,this.pageIndex=0,await this.persistProgress()}async onWordClick(r){const{word:t,x:e,y:s}=r.detail,o=await this.api.lookupWord(t);this.tooltip={word:t,x:e,y:s},this.tooltipEntry=o}onTooltipClose(){this.tooltip=void 0,this.tooltipEntry=void 0}async onTooltipSave(r){const{entry:t}=r.detail,e=await this.api.upsertEntry(t);this.tooltipEntry=e,this.dictionary=await this.api.getAllEntries()}render(){if(this.error)return l`
        <div>
          <p class="error" role="alert">${this.error}</p>
          <button class="hzt-button" @click=${()=>this.triggerPageNavigation({page:"library"})}>
            Volver a la biblioteca
          </button>
        </div>
      `;if(this.loading)return l`<p class="empty" aria-live="polite">Cargando...</p>`;const r=this.chapters[this.chapterIndex];if(!this.book||this.chapters.length===0||!r)return l`<p class="empty">Este libro no tiene capítulos.</p>`;const t=this.chapterIndex===0,e=this.chapterIndex===this.chapters.length-1;return l`
      <div>
        <header>
          <div class="toolbar">
            <h1>${this.book.title}</h1>
          <button class="hzt-button hzt-button--text" @click=${()=>this.triggerPageNavigation({page:"library"})}>
              Volver a la biblioteca
            </button>
          </div>
          <p class="chapter-title">${r.title}</p>
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
          </div>
        </header>

        <component-text-reader
          .text=${r.text}
          .dictionary=${this.dictionary}
          .pageIndex=${this.pageIndex}
          @page-change=${this.onPageChange}
          @word-click=${this.onWordClick}
        ></component-text-reader>

        ${this.tooltip?l`
              <component-word-tooltip
                .word=${this.tooltip.word}
                .entry=${this.tooltipEntry}
                .x=${this.tooltip.x}
                .y=${this.tooltip.y}
                @save-entry=${this.onTooltipSave}
                @close=${this.onTooltipClose}
              ></component-word-tooltip>
            `:""}
      </div>
    `}};y.styles=[...E.styles,a.headerStyle,a.buttonStyle,f`
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

      .empty {
        color: var(--hzt-muted);
      }

      .error {
        color: var(--hzt-error);
      }
    `];$([b({type:String})],y.prototype,"bookId",2);$([u()],y.prototype,"book",2);$([u()],y.prototype,"chapters",2);$([u()],y.prototype,"chapterIndex",2);$([u()],y.prototype,"pageIndex",2);$([u()],y.prototype,"dictionary",2);$([u()],y.prototype,"tooltip",2);$([u()],y.prototype,"tooltipEntry",2);$([u()],y.prototype,"loading",2);$([u()],y.prototype,"error",2);y=$([Y({getBook:Ft,getChapters:Ue,getProgress:Wt,saveProgress:Re,getAllEntries:Kt,lookupWord:Qe,upsertEntry:Gt})],y);z("page-reading",y);var rr=Object.defineProperty,or=(r,t,e,s)=>{for(var o=void 0,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=i(t,e,o)||o);return o&&rr(t,e,o),o};class Qt extends v{static{this.styles=[a.hostStyle,a.designTokens,a.themeTokens,a.accentTokens,a.headerStyle,a.cardStyle,a.buttonStyle,f`
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
    `]}render(){const t=this.entry?.status??"unknown",e=t==="known"?"Conocida":"Nueva";return l`
      <article class="entry-row hzt-card">
        <div class="entry-info">
          <h2>${this.entry?.word??""}</h2>
          <span class="badge badge--${t}">${e}</span>
          ${this.entry?.note?l`<p class="note">${this.entry.note}</p>`:""}
        </div>
        <div class="actions">
          <button class="hzt-button hzt-button--outline" @click=${this.emitEdit}>Editar</button>
          <button class="hzt-button hzt-button--destructive" @click=${this.emitDelete}>Eliminar</button>
        </div>
      </article>
    `}emitEdit(){this.entry&&this.dispatchEvent(new CustomEvent("edit-entry",{detail:{word:this.entry.word},bubbles:!0,composed:!0}))}emitDelete(){this.entry&&this.dispatchEvent(new CustomEvent("delete-entry",{detail:{word:this.entry.word},bubbles:!0,composed:!0}))}}or([b({type:Object})],Qt.prototype,"entry");z("component-dictionary-entry-row",Qt);var sr=Object.defineProperty,zt=(r,t,e,s)=>{for(var o=void 0,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=i(t,e,o)||o);return o&&sr(t,e,o),o};class ot extends v{constructor(){super(...arguments),this.draft={word:"",status:"unknown",translation:"",note:""},this.showError=!1}static{this.styles=[a.hostStyle,a.designTokens,a.themeTokens,a.accentTokens,a.headerStyle,a.cardStyle,a.buttonStyle,f`
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
    `]}willUpdate(t){t.has("entry")&&(this.draft=this.entry?{word:this.entry.word,status:this.entry.status,translation:this.entry.translation??"",note:this.entry.note??""}:{word:"",status:"unknown",translation:"",note:""},this.showError=!1)}render(){return l`
      <form class="entry-form hzt-card" @submit=${this.handleSubmit}>
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

        ${this.showError?l`<p class="error" role="alert">La palabra es obligatoria</p>`:""}

        <div class="actions">
          <button type="button" class="hzt-button hzt-button--outline" @click=${this.emitCancel}>
            Cancelar
          </button>
          <button type="submit" class="hzt-button hzt-button--primary">Guardar</button>
        </div>
      </form>
    `}handleWordInput(t){const e=t.target.value;this.draft={...this.draft,word:e},this.showError&&(this.showError=!1)}handleTranslationInput(t){const e=t.target.value;this.draft={...this.draft,translation:e}}handleNoteInput(t){const e=t.target.value;this.draft={...this.draft,note:e}}selectKnown(){this.draft={...this.draft,status:"known"}}selectUnknown(){this.draft={...this.draft,status:"unknown"}}handleSubmit(t){t.preventDefault();const e=this.draft.word.trim();if(!e){this.showError=!0;return}const s=this.draft.translation.trim(),o=this.draft.note.trim(),n={word:e,status:this.draft.status,...s?{translation:s}:{},...o?{note:o}:{}};this.dispatchEvent(new CustomEvent("save-entry",{detail:{entry:n},bubbles:!0,composed:!0}))}emitCancel(){this.dispatchEvent(new CustomEvent("cancel-entry",{bubbles:!0,composed:!0}))}}zt([b({type:Object})],ot.prototype,"entry");zt([u()],ot.prototype,"draft");zt([u()],ot.prototype,"showError");z("component-dictionary-form",ot);var nr=Object.defineProperty,ir=Object.getOwnPropertyDescriptor,q=(r,t,e,s)=>{for(var o=s>1?void 0:s?ir(t,e):t,n=r.length-1,i;n>=0;n--)(i=r[n])&&(o=(s?i(t,e,o):i(o))||o);return s&&o&&nr(t,e,o),o};let _=class extends E{constructor(){super(...arguments),this.entries=[],this.search="",this.showForm=!1}async onPageInit(){await this.loadEntries()}async loadEntries(){this.entries=await this.api.getEntries()}get filteredEntries(){const r=this.search.trim().toLocaleLowerCase();return r?this.entries.filter(t=>t.word.toLocaleLowerCase().includes(r)||(t.translation??"").toLocaleLowerCase().includes(r)||(t.note??"").toLocaleLowerCase().includes(r)):this.entries}onSearchInput(r){this.search=r.target.value}onAddClick(){this.editing=void 0,this.showForm=!0}onEditEntry(r){const{word:t}=r.detail;this.editing=this.entries.find(e=>e.word===t),this.showForm=!0}async onDeleteEntry(r){const{word:t}=r.detail;window.confirm("¿Seguro que quieres eliminar la entrada?")&&(await this.api.deleteEntry(t),await this.loadEntries())}async onSaveEntry(r){const{entry:t}=r.detail;await this.api.upsertEntry(t),this.showForm=!1,this.editing=void 0,await this.loadEntries()}onCancelEntry(){this.showForm=!1,this.editing=void 0}render(){const r=this.filteredEntries;return l`
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

        ${this.showForm?l`
              <div class="form-wrap">
                <component-dictionary-form
                  .entry=${this.editing}
                  @save-entry=${this.onSaveEntry}
                  @cancel-entry=${this.onCancelEntry}
                ></component-dictionary-form>
              </div>
            `:""}

        <div class="entries">
          ${r.length===0?l`
                <p class="empty">
                  ${this.entries.length===0?"Aún no hay entradas.":"No hay resultados para tu búsqueda."}
                </p>
              `:r.map(t=>l`
                  <component-dictionary-entry-row
                    .entry=${t}
                    @edit-entry=${this.onEditEntry}
                    @delete-entry=${this.onDeleteEntry}
                  ></component-dictionary-entry-row>
                `)}
        </div>
      </div>
    `}};_.styles=[...E.styles,a.headerStyle,a.buttonStyle,f`
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

      .form-wrap {
        margin-bottom: 1rem;
      }

      .entries {
        display: grid;
        gap: 0.75rem;
      }

      .empty {
        color: var(--hzt-muted);
      }
    `];q([u()],_.prototype,"entries",2);q([u()],_.prototype,"search",2);q([u()],_.prototype,"showForm",2);q([u()],_.prototype,"editing",2);_=q([Y({getEntries:Kt,upsertEntry:Gt,deleteEntry:Ge})],_);z("page-dictionary",_);z("page-hiztegi-app",N);
