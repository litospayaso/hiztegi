(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=e(o);fetch(o.href,n)}})();const et=globalThis,wt=et.ShadowRoot&&(et.ShadyCSS===void 0||et.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$t=Symbol(),Ot=new WeakMap;let Zt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==$t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(wt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ot.set(e,t))}return t}toString(){return this.cssText}};const be=a=>new Zt(typeof a=="string"?a:a+"",void 0,$t),v=(a,...t)=>{const e=a.length===1?a[0]:t.reduce((s,o,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+a[n+1],a[0]);return new Zt(e,a,$t)},ye=(a,t)=>{if(wt)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),o=et.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,a.appendChild(s)}},Tt=wt?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return be(e)})(a):a;const{is:ze,defineProperty:we,getOwnPropertyDescriptor:$e,getOwnPropertyNames:xe,getOwnPropertySymbols:ke,getPrototypeOf:Ee}=Object,ot=globalThis,Lt=ot.trustedTypes,_e=Lt?Lt.emptyScript:"",Ie=ot.reactiveElementPolyfillSupport,B=(a,t)=>a,at={toAttribute(a,t){switch(t){case Boolean:a=a?_e:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},xt=(a,t)=>!ze(a,t),jt={attribute:!0,type:String,converter:at,reflect:!1,useDefault:!1,hasChanged:xt};Symbol.metadata??=Symbol("metadata"),ot.litPropertyMetadata??=new WeakMap;let T=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=jt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&we(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){const{get:o,set:n}=$e(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:o,set(r){const i=o?.call(this);n?.call(this,r),this.requestUpdate(t,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??jt}static _$Ei(){if(this.hasOwnProperty(B("elementProperties")))return;const t=Ee(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(B("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(B("properties"))){const e=this.properties,s=[...xe(e),...ke(e)];for(const o of s)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)e.unshift(Tt(o))}else t!==void 0&&e.push(Tt(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ye(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:at).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const n=s.getPropertyOptions(o),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:at;this._$Em=o;const i=r.fromAttribute(e,n.type);this[o]=i??this._$Ej?.get(o)??i,this._$Em=null}}requestUpdate(t,e,s,o=!1,n){if(t!==void 0){const r=this.constructor;if(o===!1&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??xt)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,n]of s){const{wrapped:r}=n,i=this[o];r!==!0||this._$AL.has(o)||i===void 0||this.C(o,void 0,n,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[B("elementProperties")]=new Map,T[B("finalized")]=new Map,Ie?.({ReactiveElement:T}),(ot.reactiveElementVersions??=[]).push("2.1.2");const kt=globalThis,Rt=a=>a,st=kt.trustedTypes,Ft=st?st.createPolicy("lit-html",{createHTML:a=>a}):void 0,Yt="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,te="?"+_,Ae=`<${te}>`,N=document,M=()=>N.createComment(""),H=a=>a===null||typeof a!="object"&&typeof a!="function",Et=Array.isArray,Se=a=>Et(a)||typeof a?.[Symbol.iterator]=="function",ut=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ut=/-->/g,Bt=/>/g,C=RegExp(`>|${ut}(?:([^\\s"'>=/]+)(${ut}*=${ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Mt=/'/g,Ht=/"/g,ee=/^(?:script|style|textarea|title)$/i,Ce=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),l=Ce(1),L=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Wt=new WeakMap,P=N.createTreeWalker(N,129);function ae(a,t){if(!Et(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ft!==void 0?Ft.createHTML(t):t}const Pe=(a,t)=>{const e=a.length-1,s=[];let o,n=t===2?"<svg>":t===3?"<math>":"",r=U;for(let i=0;i<e;i++){const c=a[i];let d,p,u=-1,z=0;for(;z<c.length&&(r.lastIndex=z,p=r.exec(c),p!==null);)z=r.lastIndex,r===U?p[1]==="!--"?r=Ut:p[1]!==void 0?r=Bt:p[2]!==void 0?(ee.test(p[2])&&(o=RegExp("</"+p[2],"g")),r=C):p[3]!==void 0&&(r=C):r===C?p[0]===">"?(r=o??U,u=-1):p[1]===void 0?u=-2:(u=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?C:p[3]==='"'?Ht:Mt):r===Ht||r===Mt?r=C:r===Ut||r===Bt?r=U:(r=C,o=void 0);const E=r===C&&a[i+1].startsWith("/>")?" ":"";n+=r===U?c+Ae:u>=0?(s.push(d),c.slice(0,u)+Yt+c.slice(u)+_+E):c+_+(u===-2?i:E)}return[ae(a,n+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class W{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let n=0,r=0;const i=t.length-1,c=this.parts,[d,p]=Pe(t,e);if(this.el=W.createElement(d,s),P.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(o=P.nextNode())!==null&&c.length<i;){if(o.nodeType===1){if(o.hasAttributes())for(const u of o.getAttributeNames())if(u.endsWith(Yt)){const z=p[r++],E=o.getAttribute(u).split(_),S=/([.?@])?(.*)/.exec(z);c.push({type:1,index:n,name:S[2],strings:E,ctor:S[1]==="."?De:S[1]==="?"?Oe:S[1]==="@"?Te:nt}),o.removeAttribute(u)}else u.startsWith(_)&&(c.push({type:6,index:n}),o.removeAttribute(u));if(ee.test(o.tagName)){const u=o.textContent.split(_),z=u.length-1;if(z>0){o.textContent=st?st.emptyScript:"";for(let E=0;E<z;E++)o.append(u[E],M()),P.nextNode(),c.push({type:2,index:++n});o.append(u[z],M())}}}else if(o.nodeType===8)if(o.data===te)c.push({type:2,index:n});else{let u=-1;for(;(u=o.data.indexOf(_,u+1))!==-1;)c.push({type:7,index:n}),u+=_.length-1}n++}}static createElement(t,e){const s=N.createElement("template");return s.innerHTML=t,s}}function j(a,t,e=a,s){if(t===L)return t;let o=s!==void 0?e._$Co?.[s]:e._$Cl;const n=H(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),n===void 0?o=void 0:(o=new n(a),o._$AT(a,e,s)),s!==void 0?(e._$Co??=[])[s]=o:e._$Cl=o),o!==void 0&&(t=j(a,o._$AS(a,t.values),o,s)),t}class Ne{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??N).importNode(e,!0);P.currentNode=o;let n=P.nextNode(),r=0,i=0,c=s[0];for(;c!==void 0;){if(r===c.index){let d;c.type===2?d=new V(n,n.nextSibling,this,t):c.type===1?d=new c.ctor(n,c.name,c.strings,this,t):c.type===6&&(d=new Le(n,this,t)),this._$AV.push(d),c=s[++i]}r!==c?.index&&(n=P.nextNode(),r++)}return P.currentNode=N,o}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class V{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=j(this,t,e),H(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Se(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==y&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=W.createElement(ae(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{const n=new Ne(o,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=Wt.get(t.strings);return e===void 0&&Wt.set(t.strings,e=new W(t)),e}k(t){Et(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const n of t)o===e.length?e.push(s=new V(this.O(M()),this.O(M()),this,this.options)):s=e[o],s._$AI(n),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=Rt(t).nextSibling;Rt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class nt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,n){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=y}_$AI(t,e=this,s,o){const n=this.strings;let r=!1;if(n===void 0)t=j(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==L,r&&(this._$AH=t);else{const i=t;let c,d;for(t=n[0],c=0;c<n.length-1;c++)d=j(this,i[s+c],e,c),d===L&&(d=this._$AH[c]),r||=!H(d)||d!==this._$AH[c],d===y?t=y:t!==y&&(t+=(d??"")+n[c+1]),this._$AH[c]=d}r&&!o&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class De extends nt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}}class Oe extends nt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}}class Te extends nt{constructor(t,e,s,o,n){super(t,e,s,o,n),this.type=5}_$AI(t,e=this){if((t=j(this,t,e,0)??y)===L)return;const s=this._$AH,o=t===y&&s!==y||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==y&&(s===y||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Le{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){j(this,t)}}const je=kt.litHtmlPolyfillSupport;je?.(W,V),(kt.litHtmlVersions??=[]).push("3.3.2");const Re=(a,t,e)=>{const s=e?.renderBefore??t;let o=s._$litPart$;if(o===void 0){const n=e?.renderBefore??null;s._$litPart$=o=new V(t.insertBefore(M(),n),n,void 0,e??{})}return o._$AI(a),o};const _t=globalThis;class w extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Re(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}w._$litElement$=!0,w.finalized=!0,_t.litElementHydrateSupport?.({LitElement:w});const Fe=_t.litElementPolyfillSupport;Fe?.({LitElement:w});(_t.litElementVersions??=[]).push("4.2.2");const rt=function(t){return e=>{e.prototype.api={},Object.entries(t).forEach(([s,o])=>e.prototype.api[s]=o)}},Ue=v`
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
`,Be=v`
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
    --hzt-verb: var(--hzt-app-verb, #2f8f83);
    --hzt-on-verb: var(--hzt-app-on-verb, #ffffff);
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
    --hzt-verb: #2f8f83;
    --hzt-on-verb: #ffffff;
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
    --hzt-verb: #4ec9b0;
    --hzt-on-verb: #0c0a07;
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
    --hzt-verb: #8fbcbb;
    --hzt-on-verb: #2e3440;
    --hzt-grid-opacity: 0.05;
    --hzt-screentone-opacity: 0.16;
  }
`,Me=v`
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
`,He=v`
  :host {
    display: block;
    font-family: var(--hzt-font-body);
    font-size: var(--hzt-size-body);
    line-height: var(--hzt-line-body);
    color: var(--hzt-ink);
  }
`,We=v`
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
`,Ve=v`
  .hzt-card {
    background: var(--hzt-panel);
    border: var(--hzt-border-panel) solid var(--hzt-ink);
    border-radius: var(--hzt-corner);
    box-shadow: var(--hzt-shadow-card);
    color: var(--hzt-ink);
  }
`,Ge=v`
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
`,h={designTokens:Ue,themeTokens:Be,accentTokens:Me,hostStyle:He,headerStyle:We,cardStyle:Ve,buttonStyle:Ge};class A extends w{constructor(){super()}static{this.styles=[h.hostStyle,h.designTokens,h.themeTokens,h.accentTokens,v`
      :host {
        display: block;
        min-height: 100vh;
        background: var(--hzt-paper);
        color: var(--hzt-ink);
      }
    `]}navigate(t){t.startsWith("/")?window.location.href=window.location.href.concat(t):t.startsWith("http")?window.location.href=t:window.location.href=`${window.location.origin}/${t}`}triggerPageNavigation(t){this.dispatchEvent(new CustomEvent("page-navigation",{detail:{...t},bubbles:!0,composed:!0}))}navigateToPage(t){const e=new URL(window.location.href);e.search="",Object.entries(t).forEach(([s,o])=>e.searchParams.set(s,o)),window.history.replaceState({},"",e.toString())}openNewTab(t){window.open(t,"_blank")}getHref(){return window.location.href}getHash(){const t=location.search.substring(1);return t&&t.length>0?JSON.parse('{"'+decodeURI(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}getHostname(){return window.location.hostname}getQueryParamsURL(){return new URL(this.getHref()).searchParams}connectedCallback(){super.connectedCallback(),this.onPageInit()}onPageInit(){}}const qe={attribute:!0,type:String,converter:at,reflect:!1,hasChanged:xt},Ke=(a=qe,t,e)=>{const{kind:s,metadata:o}=e;let n=globalThis.litPropertyMetadata.get(o);if(n===void 0&&globalThis.litPropertyMetadata.set(o,n=new Map),s==="setter"&&((a=Object.create(a)).wrapped=!0),n.set(e.name,a),s==="accessor"){const{name:r}=e;return{set(i){const c=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,c,a,!0,i)},init(i){return i!==void 0&&this.C(r,void 0,a,i),i}}}if(s==="setter"){const{name:r}=e;return function(i){const c=this[r];t.call(this,i),this.requestUpdate(r,c,a,!0,i)}}throw Error("Unsupported decorator location: "+s)};function f(a){return(t,e)=>typeof e=="object"?Ke(a,t,e):((s,o,n)=>{const r=o.hasOwnProperty(n);return o.constructor.createProperty(n,s),r?Object.getOwnPropertyDescriptor(o,n):void 0})(a,t,e)}function m(a){return f({...a,state:!0,attribute:!1})}var Qe=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,It=(a,t,e,s)=>{for(var o=s>1?void 0:s?Je(t,e):t,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Qe(t,e,o),o};const mt="library";let R=class extends A{constructor(){super(...arguments),this.currentRoute=mt,this.bookId=""}get pageParam(){const a=this.getQueryParamsURL().get("page");return a==="reading"||a==="dictionary"?a:mt}get routeBookId(){return this.getQueryParamsURL().get("bookId")??""}onPageInit(){this.currentRoute=this.pageParam,this.bookId=this.routeBookId}onPageNavigation({detail:a}){const t=a.page;this.currentRoute=t==="reading"||t==="dictionary"?t:mt,this.bookId=a.bookId??"",this.navigateToPage(a)}_renderPageContent(){switch(this.currentRoute){case"reading":return l`
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
    `}};R.styles=[...A.styles,v`
      :host {
        min-height: 100vh;
        background: var(--hzt-paper);
      }

      .nav-wrap {
        position: sticky;
        top: 0;
        z-index: 10;
      }
    `];It([m()],R.prototype,"currentRoute",2);It([m()],R.prototype,"bookId",2);R=It([rt({getApi:()=>({})})],R);const $=(a,t)=>{if(document.createElement(a).constructor===HTMLElement){const e=t,s=()=>class extends e{constructor(){super()}};window.customElements.define(a,s())}};var Xe=Object.defineProperty,Ze=(a,t,e,s)=>{for(var o=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=r(t,e,o)||o);return o&&Xe(t,e,o),o};const Vt=[{path:"library",label:"Inicio"},{path:"dictionary",label:"Diccionario"}];class se extends w{constructor(){super(...arguments),this.active=""}static{this.styles=[h.hostStyle,h.designTokens,h.themeTokens,h.accentTokens,v`
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
    `]}triggerNavigation(t){this.dispatchEvent(new CustomEvent("nav-bar-navigation",{detail:{page:t},bubbles:!0,composed:!0}))}render(){const t=this.active||Vt[0].path;return l`
      <nav class="nav-bar" aria-label="Navegación principal">
        ${Vt.map(e=>l`
            <button
              class="nav-link ${t===e.path?"nav-link--active":""}"
              @click=${()=>this.triggerNavigation(e.path)}
              aria-current=${t===e.path?"page":"false"}
              >${e.label}</button
            >
          `)}
      </nav>
    `}}Ze([f({type:String})],se.prototype,"active");$("component-nav-bar",se);const Ye="hiztegi-db",ta=1,Gt={books:{keyPath:"id"},chapters:{keyPath:"id"},progress:{keyPath:"bookId"},dictionary:{keyPath:"word"}};let ft=null;const G=()=>(ft||(ft=new Promise((a,t)=>{const e=indexedDB.open(Ye,ta);e.onupgradeneeded=()=>{const s=e.result;Object.keys(Gt).forEach(o=>{s.objectStoreNames.contains(o)||s.createObjectStore(o,Gt[o])})},e.onsuccess=()=>a(e.result),e.onerror=()=>t(e.error)})),ft),it=a=>new Promise((t,e)=>{a.onsuccess=()=>t(a.result),a.onerror=()=>e(a.error)}),oe=(a,t,e)=>G().then(s=>new Promise((o,n)=>{const r=Array.isArray(a)?a:[a],i=s.transaction(r,t),c={};r.forEach(d=>{c[d]=i.objectStore(d)});try{e(c)}catch(d){i.abort(),n(d);return}i.oncomplete=()=>o(),i.onerror=()=>n(i.error),i.onabort=()=>n(i.error)})),At=async a=>{const t=await G();return it(t.transaction(a,"readonly").objectStore(a).getAll())},St=async(a,t)=>{const e=await G();return it(e.transaction(a,"readonly").objectStore(a).get(t))},ne=async(a,t)=>{const e=await G();return it(e.transaction(a,"readwrite").objectStore(a).put(t))},ea=async(a,t)=>{const e=await G();return it(e.transaction(a,"readwrite").objectStore(a).delete(t))},aa=async(a,t)=>{const e=crypto.randomUUID(),s={id:e,title:a.title,format:t,addedAt:new Date().toISOString(),chapterIds:[]},o=a.chapters.map((n,r)=>({id:crypto.randomUUID(),bookId:e,index:r,title:n.title,text:n.text}));return s.chapterIds=o.map(n=>n.id),await oe(["books","chapters"],"readwrite",n=>{n.books.put(s),o.forEach(r=>n.chapters.put(r))}),s},sa=async()=>At("books"),re=async a=>St("books",a),oa=async a=>(await At("chapters")).filter(e=>e.bookId===a).sort((e,s)=>e.index-s.index),na=async a=>{const t=await re(a);t&&await oe(["books","chapters","progress"],"readwrite",e=>{e.books.delete(a),t.chapterIds.forEach(s=>e.chapters.delete(s)),e.progress.delete(a)})},ra=async a=>{await ne("progress",a)},ie=async a=>St("progress",a),qt=15,Ct=a=>{const t=[];for(let e=0;e<a.length;e+=qt)t.push({title:String(t.length+1),text:a.slice(e,e+qt).join(`

`)});return t.length===0&&t.push({title:"1",text:""}),t},Pt=a=>a.replace(/\.[^.]+$/,"").trim()||"Untitled",ia=async a=>{const e=(await a.text()).split(/\n\s*\n+/).map(s=>s.trim()).filter(s=>s.length>0);return{title:Pt(a.name),chapters:Ct(e)}},ca=async a=>{const t=await a.text(),s=new DOMParser().parseFromString(t,"text/html").body,o=[];let n=null,r=[];const i=()=>{n!==null&&(o.push({title:n,text:r.filter(d=>d!=="").join(`

`)}),n=null,r=[])},c=d=>{n!==null&&i(),n=d};for(const d of Array.from(s.childNodes))if(d.nodeType===Node.ELEMENT_NODE){const p=d,u=p.tagName.toLocaleLowerCase();if(u==="h1"||u==="h2"){c(p.textContent?.trim()??"");continue}const z=(p.textContent??"").replace(/\s*\n\s*/g," ").trim();z!==""&&r.push(z)}else if(d.nodeType===Node.TEXT_NODE){const p=(d.textContent??"").trim();p!==""&&r.push(p)}return i(),{title:Pt(a.name),chapters:o.length>0?o:Ct(r)}},la=/^(#{1,6})\s+(.*)$/,Kt=/^(?:```|~~~)/,ha=/^>\s?/,da=/^\s*(?:[-*+]|\d+[.)])\s+/,pa=/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/,gt=a=>a.replace(/!\[[^\]]*\]\([^)]*\)/g,"").replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/~~([^~]+)~~/g,"$1").trim(),Qt=a=>{const t=[];let e=[];for(const s of a)s===""?e.length>0&&(t.push(e.join(`
`)),e=[]):e.push(s);return e.length>0&&t.push(e.join(`
`)),t},ua=async a=>{const e=(await a.text()).split(`
`),s=[];let o=null,n=[],r=!1;const i=()=>{o!==null&&(s.push({title:o,text:Qt(n).join(`

`)}),o=null,n=[])},c=d=>{o!==null&&i(),o=d};for(const d of e){const p=d.trim();if(!r&&Kt.test(p)){r=!0;continue}if(r){Kt.test(p)?r=!1:n.push(d);continue}if(p===""){n.length>0&&n.push("");continue}const u=la.exec(d);if(u!==null){if(u[1].length<=2)c(gt(u[2]));else{const S=gt(u[2]);S!==""&&n.push(S)}continue}if(pa.test(p))continue;let z=gt(d.replace(ha,"").replace(da,""));z!==""&&n.push(z)}return i(),{title:Pt(a.name),chapters:s.length>0?s:Ct(Qt(n))}},ce=a=>a.split(".").pop()?.toLocaleLowerCase()??"",ma=a=>{const t=ce(a);switch(t){case"txt":return"txt";case"md":case"markdown":return"md";case"html":case"htm":return"html";case"epub":return"epub";case"pdf":return"pdf";default:throw new Error(`Unsupported file format: "${t}"`)}},fa=async a=>{const t=ce(a.name);switch(t){case"txt":return ia(a);case"md":case"markdown":return ua(a);case"html":case"htm":return ca(a);case"epub":case"pdf":throw new Error(`Parser for "${t}" is not implemented yet`);default:throw new Error(`Unsupported file format: "${t}"`)}};var ga=Object.defineProperty,va=(a,t,e,s)=>{for(var o=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=r(t,e,o)||o);return o&&ga(t,e,o),o};class le extends w{constructor(){super(...arguments),this.active=!1}static{this.styles=[h.hostStyle,h.designTokens,h.themeTokens,h.accentTokens,v`
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
    `}selectFiles(t){t.length!==0&&this.dispatchEvent(new CustomEvent("files-selected",{detail:{files:t},bubbles:!0,composed:!0}))}openPicker(){this.input?.click()}onKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.openPicker())}onDragOver(t){t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="copy"),this.active=!0}onDragLeave(){this.active=!1}onDrop(t){t.preventDefault(),this.active=!1,this.selectFiles(Array.from(t.dataTransfer?.files??[]))}onInputChange(t){const e=t.target;this.selectFiles(Array.from(e.files??[])),e.value=""}}va([m()],le.prototype,"active");$("component-import-file",le);var ba=Object.defineProperty,he=(a,t,e,s)=>{for(var o=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=r(t,e,o)||o);return o&&ba(t,e,o),o};class Nt extends w{static{this.styles=[h.hostStyle,h.designTokens,h.themeTokens,h.accentTokens,h.headerStyle,h.cardStyle,h.buttonStyle,v`
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
    `}emitRead(){this.book&&this.dispatchEvent(new CustomEvent("read-book",{detail:{id:this.book.id},bubbles:!0,composed:!0}))}emitDelete(){this.book&&this.dispatchEvent(new CustomEvent("delete-book",{detail:{id:this.book.id},bubbles:!0,composed:!0}))}}he([f({type:Object})],Nt.prototype,"book");he([f({type:Object})],Nt.prototype,"progress");$("component-library-book-card",Nt);var ya=Object.defineProperty,za=Object.getOwnPropertyDescriptor,ct=(a,t,e,s)=>{for(var o=s>1?void 0:s?za(t,e):t,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&ya(t,e,o),o};let D=class extends A{constructor(){super(...arguments),this.books=[],this.progressByBook={},this.importing=!1}async onPageInit(){await this.loadBooks()}async loadBooks(){const a=await this.api.getBooks(),t=await Promise.all(a.map(async e=>[e.id,await this.api.getProgress(e.id)]));this.books=a,this.progressByBook=Object.fromEntries(t)}async onFilesSelected(a){const{files:t}=a.detail;this.importing=!0;try{for(const e of t){const s=await this.api.parseBook(e);await this.api.importBook(s,ma(e.name))}await this.loadBooks()}finally{this.importing=!1}}async onDeleteBook(a){const{id:t}=a.detail;window.confirm("¿Seguro que quieres eliminar el libro?")&&(await this.api.deleteBook(t),await this.loadBooks())}onReadBook(a){const{id:t}=a.detail;this.triggerPageNavigation({page:"reading",bookId:t})}render(){return l`
      <div>
        <h1>Biblioteca</h1>
        <component-import-file @files-selected=${this.onFilesSelected}></component-import-file>
        ${this.importing?l`<p class="empty" aria-live="polite">Importando...</p>`:""}
        <div class="books">
          ${this.books.length===0?l`<p class="empty">Aún no hay ningún libro.</p>`:this.books.map(a=>l`
                  <component-library-book-card
                    .book=${a}
                    .progress=${this.progressByBook[a.id]}
                    @read-book=${this.onReadBook}
                    @delete-book=${this.onDeleteBook}
                  ></component-library-book-card>
                `)}
        </div>
      </div>
    `}};D.styles=[...A.styles,h.headerStyle,v`
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
    `];ct([m()],D.prototype,"books",2);ct([m()],D.prototype,"progressByBook",2);ct([m()],D.prototype,"importing",2);D=ct([rt({getBooks:sa,importBook:aa,deleteBook:na,getProgress:ie,parseBook:fa})],D);$("page-library",D);const Dt=a=>a.trim().toLocaleLowerCase(),de=async()=>At("dictionary"),wa=async a=>St("dictionary",Dt(a)),pe=async a=>{const t={...a,word:Dt(a.word)};return await ne("dictionary",t),t},$a=async a=>{await ea("dictionary",Dt(a))},xa=async a=>wa(a),ue="opendata/eu-esp",ka=`${ue}/index.json`,lt=a=>a.trim().normalize("NFC").toLocaleLowerCase(),me=a=>new URL(a,typeof document>"u"?"http://localhost/":document.baseURI).href,Ea=a=>{const t=lt(a).normalize("NFD").charAt(0);return/^[a-z]$/.test(t)?t:"otros"},_a=a=>{const t=(a??"").trim();return t?t.replace(/^\[|\]$/g,"").split(/[;,]\s*/).map(e=>e.trim()).filter(Boolean):[]},Ia=a=>{const t=a.split(" :_: ");if(t.length<2)return;const e=lt(t[0]),s=t[1]?.trim();if(!e||!s)return;const o=t[2]?.trim()||void 0;return{word:e,translations:[s],...o?{partOfSpeech:o}:{},domains:_a(t[3])}},Aa=(a,t)=>{const e=a.get(t.word);if(!e){a.set(t.word,t);return}e.translations.includes(t.translations[0])||e.translations.push(t.translations[0]),!e.partOfSpeech&&t.partOfSpeech&&(e.partOfSpeech=t.partOfSpeech);for(const s of t.domains)e.domains.includes(s)||e.domains.push(s)};let J,X;const vt=new Map,Sa=a=>{const t=vt.get(a);if(t)return t;const e=fetch(me(`${ue}/${a}.json`)).then(async s=>{if(!s.ok)throw new Error(`Open Data letter ${a} returned ${s.status}`);const o=await s.json();if(!Array.isArray(o))throw new Error(`Open Data letter ${a} is not an array`);const n=new Map;for(const r of o){const i=Ia(String(r));i&&Aa(n,i)}return n}).catch(s=>(vt.delete(a),console.warn(`[opendata] could not load ${a}.json`,s),new Map));return vt.set(a,e),e},Ca=async()=>X||(J||(J=fetch(me(ka)).then(async a=>{if(!a.ok)throw new Error(`Open Data index returned ${a.status}`);const t=await a.json();if(!Array.isArray(t))throw new Error("Open Data index is not an array");return new Set(t.map(e=>lt(String(e))).filter(Boolean))}).catch(a=>(J=void 0,console.warn("[opendata] could not load index.json",a),new Set))),X=await J,X),Pa=async a=>{const t=lt(a);return t?(await Sa(Ea(t))).get(t):void 0},fe="opendata/verbs",Na=`${fe}/index.json`,ht=a=>a.trim().normalize("NFC").toLocaleLowerCase(),ge=a=>new URL(a,typeof document>"u"?"http://localhost/":document.baseURI).href,Da=a=>{const t=ht(a).normalize("NFD").charAt(0);return/^[a-z]$/.test(t)?t:"otros"},Oa=a=>{if(!a||typeof a!="object")return{};const t=a;return{...typeof t.nor=="string"?{nor:t.nor}:{},...typeof t.nori=="string"?{nori:t.nori}:{},...typeof t.nork=="string"?{nork:t.nork}:{}}},Ta=a=>{if(!a||typeof a!="object")return;const t=a;if(typeof t.lemma!="string"||typeof t.paradigm!="string"||typeof t.tense!="string"||typeof t.mode!="string")return;const e=t.source;if(!e||typeof e!="object")return;const s=e,o=typeof s.page=="number"?s.page:void 0,n=typeof s.table=="string"?s.table:void 0,r=typeof s.name=="string"?s.name:void 0,i=typeof s.url=="string"?s.url:void 0,c=typeof s.note=="string"?s.note:void 0,d=o!==void 0&&n!==void 0;if(!(!d&&!r&&!i))return{lemma:t.lemma,kind:t.kind==="synthetic"?"synthetic":"auxiliary",paradigm:t.paradigm,tense:t.tense,mode:t.mode,...typeof t.subtype=="string"?{subtype:t.subtype}:{},persons:Oa(t.persons),...t.allocutive==="m"||t.allocutive==="f"?{allocutive:t.allocutive}:{},...typeof t.meaning=="string"?{meaning:t.meaning}:{},source:{...d?{page:o,table:n}:{},...r?{name:r}:{},...i?{url:i}:{},...c?{note:c}:{}}}},La=(a,t)=>{const e=a.get(t.word);if(!e){a.set(t.word,t);return}for(const s of t.analyses){const o=JSON.stringify([s.lemma,s.paradigm,s.tense,s.mode,s.subtype??"",s.persons.nor??"",s.persons.nori??"",s.persons.nork??"",s.allocutive??""]);e.analyses.some(r=>JSON.stringify([r.lemma,r.paradigm,r.tense,r.mode,r.subtype??"",r.persons.nor??"",r.persons.nori??"",r.persons.nork??"",r.allocutive??""])===o)||e.analyses.push(s)}};let Z,Y;const bt=new Map,ja=a=>{const t=bt.get(a);if(t)return t;const e=fetch(ge(`${fe}/${a}.json`)).then(async s=>{if(!s.ok)throw new Error(`Verb letter ${a} returned ${s.status}`);const o=await s.json();if(!Array.isArray(o))throw new Error(`Verb letter ${a} is not an array`);const n=new Map;for(const r of o){if(!r||typeof r!="object")continue;const i=r,c=ht(String(i.word??""));if(!c||!Array.isArray(i.analyses))continue;const d=i.analyses.map(Ta).filter(p=>!!p);d.length>0&&La(n,{word:c,analyses:d})}return n}).catch(s=>(bt.delete(a),console.warn(`[verbs] could not load ${a}.json`,s),new Map));return bt.set(a,e),e},Ra=async()=>Y||(Z||(Z=fetch(ge(Na)).then(async a=>{if(!a.ok)throw new Error(`Verb index returned ${a.status}`);const t=await a.json();if(!Array.isArray(t))throw new Error("Verb index is not an array");return new Set(t.map(e=>ht(String(e))).filter(Boolean))}).catch(a=>(Z=void 0,console.warn("[verbs] could not load index.json",a),new Set))),Y=await Z,Y),Fa=async a=>{const t=ht(a);return t?(await ja(Da(t))).get(t):void 0},yt=a=>/^\p{L}$/u.test(a),zt=a=>/\s/.test(a),Ua=a=>{const t=[];let e=0;for(;e<a.length;){const s=e;if(zt(a[e])){for(;e<a.length&&zt(a[e]);)e+=1;t.push({type:"space",text:a.slice(s,e)})}else if(yt(a[e])){for(;e<a.length&&yt(a[e]);)e+=1;t.push({type:"word",text:a.slice(s,e)})}else{for(;e<a.length&&!zt(a[e])&&!yt(a[e]);)e+=1;t.push({type:"punct",text:a.slice(s,e)})}}return t},Ba=[{suffix:"-enganaino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta donde (los/las)"}]},{suffix:"-anganaino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta donde (el/la)"}]},{suffix:"-rengandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (los/las)"}]},{suffix:"-rangandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (el/la)"}]},{suffix:"-eganaino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta donde (hombre)"}]},{suffix:"-regandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (hijo/hombre)"}]},{suffix:"-engandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (los/las)"}]},{suffix:"-arentzat",cases:[{caseId:"destinativo",caseName:"Destinativo",meaning:"para el/la"}]},{suffix:"-etaraino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta (los/las / valle)"}]},{suffix:"-angandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (el/la)"}]},{suffix:"-rentzat",cases:[{caseId:"destinativo",caseName:"Destinativo",meaning:"para (alguien)"}]},{suffix:"-ganaino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta donde (hijo)"}]},{suffix:"-rekin",cases:[{caseId:"asociativo",caseName:"Asociativo",meaning:"con (alguien)"}]},{suffix:"-arekin",cases:[{caseId:"asociativo",caseName:"Asociativo",meaning:"con el/la"}]},{suffix:"-angana",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a donde (el/la)"}]},{suffix:"-taraino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta (monte)"}]},{suffix:"-engana",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a donde (los/las)"}]},{suffix:"-entzat",cases:[{caseId:"destinativo",caseName:"Destinativo",meaning:"para (los/las / valle / hombre)"}]},{suffix:"-gandik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (hijo/hombre)"}]},{suffix:"-eraino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta (el/la / Gasteiz)"}]},{suffix:"-retatik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (palabra en -r)"}]},{suffix:"-etatik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (los/las / valle)"}]},{suffix:"-egana",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a donde (hombre)"}]},{suffix:"-etara",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a (los/las / valle)"}]},{suffix:"-era",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"al/la / a (Gasteiz)"}]},{suffix:"-ekin",cases:[{caseId:"asociativo",caseName:"Asociativo",meaning:"con (los/las / valle / hombre)"}]},{suffix:"-etako",cases:[{caseId:"gen_locativo",caseName:"Genitivo Locativo",meaning:"de (los/las / valle)"}]},{suffix:"-tako",cases:[{caseId:"gen_locativo",caseName:"Genitivo Locativo",meaning:"de (monte)"}]},{suffix:"-tatik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (monte)"}]},{suffix:"-etan",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (los/las / valle / hombre)"}]},{suffix:"-tara",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a (monte)"}]},{suffix:"-raino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta (el/la / Donostia)"}]},{suffix:"-egan",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (hombre)"}]},{suffix:"-gana",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"a donde (hijo)"}]},{suffix:"-ean",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (el/la / Gasteiz)"}]},{suffix:"-aren",cases:[{caseId:"genitivo",caseName:"Genitivo Posesivo",meaning:"del/la"}]},{suffix:"-gan",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (hijo)"}]},{suffix:"-retik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (el/la / palabra en -r)"}]},{suffix:"-etik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (el/la)"}]},{suffix:"-tzat",cases:[{caseId:"prolativo",caseName:"Prolativo",meaning:"por (considerar)"}]},{suffix:"-ari",cases:[{caseId:"dativo",caseName:"Dativo",meaning:"al/la"}]},{suffix:"-ak",cases:[{caseId:"nominativo",caseName:"Nominativo",meaning:"el/la/las/los"},{caseId:"ergativo",caseName:"Ergativo",meaning:"el/la (agente)"}]},{suffix:"-ek",cases:[{caseId:"ergativo",caseName:"Ergativo",meaning:"los/las (agente)"}]},{suffix:"-ei",cases:[{caseId:"dativo",caseName:"Dativo",meaning:"a los/las"}]},{suffix:"-ri",cases:[{caseId:"dativo",caseName:"Dativo",meaning:"a (alguien)"}]},{suffix:"-ko",cases:[{caseId:"gen_locativo",caseName:"Genitivo Locativo",meaning:"del/la / de (lugar)"}]},{suffix:"-ra",cases:[{caseId:"adlativo",caseName:"Adlativo",meaning:"al/la / a (Donostia)"}]},{suffix:"-rik",cases:[{caseId:"partitivo",caseName:"Partitivo",meaning:"algún"}]},{suffix:"-ik",cases:[{caseId:"partitivo",caseName:"Partitivo",meaning:"algún"}]},{suffix:"-az",cases:[{caseId:"instrumental",caseName:"Instrumental",meaning:"con el/la"}]},{suffix:"-en",cases:[{caseId:"genitivo",caseName:"Genitivo Posesivo",meaning:"de (los/las / valle / hombre)"},{caseId:"inesivo",caseName:"Inesivo",meaning:"en (Gasteiz)"}]},{suffix:"-an",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en el/la"}]},{suffix:"-tan",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (monte)"}]},{suffix:"-tik",cases:[{caseId:"ablativo",caseName:"Ablativo",meaning:"de/desde (el/la / Donostia / Gasteiz)"}]},{suffix:"-ren",cases:[{caseId:"genitivo",caseName:"Genitivo Posesivo",meaning:"de (alguien)"}]},{suffix:"-eko",cases:[{caseId:"gen_locativo",caseName:"Genitivo Locativo",meaning:"del/la"}]},{suffix:"-aino",cases:[{caseId:"adl_terminal",caseName:"Adlativo Terminal",meaning:"hasta (Gasteiz)"}]},{suffix:"-ez",cases:[{caseId:"instrumental",caseName:"Instrumental",meaning:"con (los/las / valle / hombre)"}]},{suffix:"-k",cases:[{caseId:"ergativo",caseName:"Ergativo",meaning:"monte/hijo/Donostia (agente)"}]},{suffix:"-i",cases:[{caseId:"dativo",caseName:"Dativo",meaning:"a (valle/hombre/Gasteiz)"}]},{suffix:"-a",cases:[{caseId:"nominativo",caseName:"Nominativo",meaning:"el/la"},{caseId:"adlativo",caseName:"Adlativo",meaning:"a (Gasteiz)"}]},{suffix:"-z",cases:[{caseId:"instrumental",caseName:"Instrumental",meaning:"con (monte/hijo/Donostia)"}]},{suffix:"-n",cases:[{caseId:"inesivo",caseName:"Inesivo",meaning:"en (Donostia)"}]}],Ma=[...Ba].sort((a,t)=>t.suffix.length-a.suffix.length),Ha=2;function Wa(a){const t=a.trim().toLocaleLowerCase(),e=[];for(const s of Ma){const o=s.suffix.slice(1);if(!t.endsWith(o))continue;const n=t.slice(0,t.length-o.length);if(n.length<Ha)continue;const r=`${n}|${s.suffix}`,i=e.find(c=>`${c.baseForm}|${c.suffix}`===r);if(i){for(const c of s.cases)i.cases.some(d=>d.caseId===c.caseId)||i.cases.push(c);continue}e.push({baseForm:n,suffix:s.suffix,cases:s.cases})}return e}var Va=Object.defineProperty,F=(a,t,e,s)=>{for(var o=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=r(t,e,o)||o);return o&&Va(t,e,o),o};class O extends w{constructor(){super(...arguments),this.text="",this.dictionary=[],this.opendataIndex=new Set,this.verbIndex=new Set,this.pageSize=100,this.pageIndex=0}static{this.styles=[h.hostStyle,h.designTokens,h.themeTokens,h.accentTokens,h.buttonStyle,v`
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

      .word--verb {
        background: var(--hzt-verb);
        color: var(--hzt-on-verb);
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
    `]}willUpdate(t){t.has("text")&&!t.has("pageIndex")&&(this.pageIndex=0)}get pages(){const t=Ua(this.text),e=Math.max(1,Math.floor(this.pageSize)),s=[];let o=[],n=0;for(const r of t)o.push(r),r.type==="word"&&(n+=1,n>=e&&(s.push(o),o=[],n=0));return o.length>0&&s.push(o),s.length>0?s:[[]]}get directMap(){return new Map(this.dictionary.map(t=>[t.word.toLocaleLowerCase(),t.status]))}resolveWord(t,e=this.directMap){const s=t.toLocaleLowerCase(),o=e.get(s);if(o)return{status:o};if(this.verbIndex.has(s))return{status:"verb"};if(this.opendataIndex.has(s))return{status:"opendata"};const n=Wa(s);for(const r of n){const i=e.get(r.baseForm);if(i)return{status:i,baseForm:r.baseForm,suffix:r.suffix,cases:r.cases.map(c=>c.caseName)}}for(const r of n)if(this.opendataIndex.has(r.baseForm))return{status:"opendata",baseForm:r.baseForm,suffix:r.suffix,cases:r.cases.map(i=>i.caseName)};return{status:"none"}}onPrevious(){this.pageIndex>0&&(this.pageIndex-=1,this.emitPageChange())}onNext(){this.pageIndex<this.pages.length-1&&(this.pageIndex+=1,this.emitPageChange())}emitPageChange(){this.dispatchEvent(new CustomEvent("page-change",{detail:{pageIndex:this.pageIndex,pageCount:this.pages.length},bubbles:!0,composed:!0}))}onWordClick(t,e){const s=e.currentTarget.getBoundingClientRect(),{baseForm:o,suffix:n,cases:r}=this.resolveWord(t);this.dispatchEvent(new CustomEvent("word-click",{detail:{word:t,x:s.left+s.width/2,y:s.bottom,...o?{baseForm:o,suffix:n,cases:r}:{}},bubbles:!0,composed:!0}))}render(){const t=this.pages,e=t.length,s=Math.min(this.pageIndex,e-1),o=t[s]??[],n=this.directMap;return l`
      <div class="reader">
        <p class="reader-text">${o.map(r=>{if(r.type!=="word")return r.text;const i=this.resolveWord(r.text,n).status,c=i==="none"?"word":`word word--${i}`;return l`<span class=${c} @click=${d=>this.onWordClick(r.text,d)}>${r.text}</span>`})}</p>
        <div class="controls">
          <button class="hzt-button" ?disabled=${s===0} @click=${this.onPrevious}>Anterior</button>
          <span class="page-info">Página ${s+1} de ${e}</span>
          <button class="hzt-button hzt-button--primary" ?disabled=${s===e-1} @click=${this.onNext}>
            Siguiente
          </button>
        </div>
      </div>
    `}}F([f({type:String})],O.prototype,"text");F([f({type:Array})],O.prototype,"dictionary");F([f({type:Object})],O.prototype,"opendataIndex");F([f({type:Object})],O.prototype,"verbIndex");F([f({type:Number})],O.prototype,"pageSize");F([f({type:Number})],O.prototype,"pageIndex");$("component-text-reader",O);var Ga=Object.defineProperty,k=(a,t,e,s)=>{for(var o=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=r(t,e,o)||o);return o&&Ga(t,e,o),o};const tt=8,qa=8;class x extends w{constructor(){super(...arguments),this.position={left:0,top:0},this.onDocumentClick=t=>{t.composedPath().includes(this)||this.emitClose()},this.onKeyDown=t=>{t.key==="Escape"&&this.emitClose()}}static{this.styles=[h.hostStyle,h.designTokens,h.themeTokens,h.accentTokens,h.headerStyle,h.buttonStyle,v`
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

      .badge--verb {
        background: var(--hzt-verb);
        color: var(--hzt-on-verb);
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

      .verb-analyses {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        margin: 0.75rem 0 0;
        padding: 0;
        list-style: none;
      }

      .verb-analysis {
        padding-top: 0.6rem;
        border-top: var(--hzt-border-chip) solid var(--hzt-well);
      }

      .verb-analysis:first-child {
        padding-top: 0;
        border-top: 0;
      }

      .verb-lemma {
        font-weight: 900;
      }

      .verb-lemma span {
        font-weight: 400;
        color: var(--hzt-muted);
      }

      .verb-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-top: 0.3rem;
      }

      .verb-tag {
        padding: 0.05rem 0.35rem;
        border: var(--hzt-border-chip) solid var(--hzt-ink);
        font-size: var(--hzt-size-label);
        background: var(--hzt-well);
      }

      .verb-source {
        margin: 0.35rem 0 0;
        font-size: var(--hzt-size-label);
        color: var(--hzt-muted);
      }

      .verb-source a {
        color: inherit;
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
    `]}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocumentClick,!0),document.addEventListener("keydown",this.onKeyDown,!0)}disconnectedCallback(){document.removeEventListener("click",this.onDocumentClick,!0),document.removeEventListener("keydown",this.onKeyDown,!0),super.disconnectedCallback()}firstUpdated(){this.renderRoot.querySelector(".tooltip")?.focus({preventScroll:!0}),this.clampPosition()}updated(t){(t.has("x")||t.has("y")||t.has("word")||t.has("entry")||t.has("openDataEntry")||t.has("verbEntry"))&&this.clampPosition()}clampPosition(){const t=this.renderRoot.querySelector(".tooltip");if(!t)return;const e=t.offsetWidth,s=t.offsetHeight,o=Math.max(tt,Math.min(this.x??0,window.innerWidth-e-tt)),n=Math.max(tt,Math.min((this.y??0)+qa,window.innerHeight-s-tt));(o!==this.position.left||n!==this.position.top)&&(this.position={left:o,top:n})}tenseLabel(t){switch(t){case"orain":return"presente";case"iragan":return"pasado";case"alegiazko":return"condicional";case"agintera":return"imperativo"}}modeLabel(t){switch(t){case"ahala":return"-ahala";case"ke":return"+ke";case"agintera":return"agintera"}}subtypeLabel(t){switch(t){case"subjunctive":return"subjuntivo";case"subjunctive-la":return"subjuntivo -la";case"conditional-ba":return"condicional ba-";case"potential":return"potencial";case"agintera":return"imperativo"}}personTags(t){return[t.persons.nor?`nor: ${t.persons.nor}`:"",t.persons.nori?`nori: ${t.persons.nori}`:"",t.persons.nork?`nork: ${t.persons.nork}`:""].filter(Boolean)}renderVerbSource(t){const e=[];return t.page!==void 0&&t.table&&e.push(`p. ${t.page} · ${t.table}`),t.name?e.push(t.url?l`<a href=${t.url} target="_blank" rel="noopener noreferrer">${t.name}</a>`:t.name):t.url&&e.push(l`<a href=${t.url} target="_blank" rel="noopener noreferrer">${t.url}</a>`),t.note&&e.push(t.note),l`
      <p class="verb-source">
        ${e.map((s,o)=>l`${o>0?" · ":""}${s}`)}
      </p>
    `}renderVerbAnalyses(t){return l`
      <ul class="verb-analyses">
        ${t.analyses.map(e=>l`
          <li class="verb-analysis">
            <div class="verb-lemma">
              ${e.lemma}${e.meaning?l` <span>· ${e.meaning}</span>`:""}
            </div>
            <div class="verb-tags">
              <span class="verb-tag">${e.paradigm}</span>
              <span class="verb-tag">${this.tenseLabel(e.tense)}</span>
              <span class="verb-tag">${this.modeLabel(e.mode)}</span>
              ${e.subtype?l`<span class="verb-tag">${this.subtypeLabel(e.subtype)}</span>`:""}
              ${this.personTags(e).map(s=>l`<span class="verb-tag">${s}</span>`)}
              ${e.allocutive?l`<span class="verb-tag">alocutivo ${e.allocutive}</span>`:""}
            </div>
            ${this.renderVerbSource(e.source)}
          </li>
        `)}
      </ul>
    `}emitSave(t){const e=this.normalizeWord();if(!e)return;const s={word:e,status:t==="known"?"known":"unknown",...this.entry?.translation?{translation:this.entry.translation}:{},...this.entry?.note?{note:this.entry.note}:{}};this.dispatchEvent(new CustomEvent("save-entry",{detail:{entry:s},bubbles:!0,composed:!0}))}emitAdd(){const t=this.baseForm??this.normalizeWord();if(!t)return;const e=this.openDataEntry?.translations[0];this.dispatchEvent(new CustomEvent("open-add-modal",{detail:{word:t,...e?{translation:e}:{}},bubbles:!0,composed:!0}))}emitClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}normalizeWord(){return(this.word??"").trim().toLocaleLowerCase()}render(){const t=this.entry?.status??"unknown",e=t==="known"?"Conocida":"Nueva";return l`
      <div
        class="tooltip"
        role="dialog"
        aria-label="Detalle de la palabra ${this.baseForm??this.word??""}"
        tabindex="-1"
        style="left: ${this.position.left}px; top: ${this.position.top}px;"
      >
        <header class="tooltip-header">
          <h3>${this.baseForm?l`${this.word} → ${this.baseForm}`:this.word??""}</h3>
          <button
            class="hzt-button hzt-button--text close-button"
            aria-label="Cerrar"
            @click=${this.emitClose}
          >
            ×
          </button>
        </header>

        ${this.entry?l`<span class="badge badge--${t}">${e}</span>`:this.verbEntry?l`<span class="badge badge--verb">Verbo</span>`:this.openDataEntry?l`<span class="badge badge--opendata">Open Data</span>`:l`<p class="no-entry">Esta palabra no está en el diccionario.</p>`}
        ${this.entry?.translation?l`<p class="translation">${this.entry.translation}</p>`:""}
        ${this.entry?.note?l`<p class="note">${this.entry.note}</p>`:""}
        ${!this.entry&&this.verbEntry?this.renderVerbAnalyses(this.verbEntry):""}
        ${!this.entry&&!this.verbEntry&&this.openDataEntry?l`
              <ul class="translations">
                ${this.openDataEntry.translations.map(s=>l`<li>${s}</li>`)}
              </ul>
              ${this.openDataEntry.partOfSpeech||this.openDataEntry.domains.length?l`<p class="note">
                    ${[this.openDataEntry.partOfSpeech,this.openDataEntry.domains.join(", ")].filter(Boolean).join(" · ")}
                  </p>`:""}
              <p class="opendata-source">Fuente: Open Data Euskadi (CC BY 4.0)</p>
            `:""}
        ${this.baseForm&&this.word!==this.baseForm&&this.suffix&&this.cases?.length?l`
          <p class="base-form">
            ${this.suffix} (${this.cases[0]})
          </p>
        `:""}

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
    `}}k([f({type:String})],x.prototype,"word");k([f({type:Object})],x.prototype,"entry");k([f({type:Object})],x.prototype,"openDataEntry");k([f({type:Object})],x.prototype,"verbEntry");k([f({type:Number})],x.prototype,"x");k([f({type:Number})],x.prototype,"y");k([f({type:String})],x.prototype,"baseForm");k([f({type:String})],x.prototype,"suffix");k([f({type:Array})],x.prototype,"cases");k([m()],x.prototype,"position");$("component-word-tooltip",x);var Ka=Object.defineProperty,dt=(a,t,e,s)=>{for(var o=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=r(t,e,o)||o);return o&&Ka(t,e,o),o};class q extends w{constructor(){super(...arguments),this.open=!1,this.draft={word:"",status:"unknown",translation:"",note:""},this.showError=!1,this.onKeyDown=t=>{t.key==="Escape"&&this.open&&this.emitClose()}}static{this.styles=[h.hostStyle,h.designTokens,h.themeTokens,h.accentTokens,h.headerStyle,h.cardStyle,h.buttonStyle,v`
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
    `]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){document.removeEventListener("keydown",this.onKeyDown),super.disconnectedCallback()}willUpdate(t){t.has("entry")&&(this.draft=this.entry?{word:this.entry.word,status:this.entry.status,translation:this.entry.translation??"",note:this.entry.note??""}:{word:"",status:"unknown",translation:"",note:""},this.showError=!1)}render(){return this.open?l`
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

            ${this.showError?l`<p class="error" role="alert">La palabra es obligatoria</p>`:""}

            <div class="actions">
              <button type="button" class="hzt-button hzt-button--outline" @click=${this.emitClose}>
                Cancelar
              </button>
              <button type="submit" class="hzt-button hzt-button--primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `:l``}onBackdropClick(){this.emitClose()}handleWordInput(t){const e=t.target.value;this.draft={...this.draft,word:e},this.showError&&(this.showError=!1)}handleTranslationInput(t){const e=t.target.value;this.draft={...this.draft,translation:e}}handleNoteInput(t){const e=t.target.value;this.draft={...this.draft,note:e}}selectKnown(){this.draft={...this.draft,status:"known"}}selectUnknown(){this.draft={...this.draft,status:"unknown"}}handleSubmit(t){t.preventDefault();const e=this.draft.word.trim();if(!e){this.showError=!0;return}const s=this.draft.translation.trim(),o=this.draft.note.trim(),n={word:e,status:this.draft.status,...s?{translation:s}:{},...o?{note:o}:{}};this.dispatchEvent(new CustomEvent("save-entry",{detail:{entry:n},bubbles:!0,composed:!0}))}emitClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}}dt([f({type:Boolean,reflect:!0})],q.prototype,"open");dt([f({type:Object})],q.prototype,"entry");dt([m()],q.prototype,"draft");dt([m()],q.prototype,"showError");$("component-dictionary-form",q);var Qa=Object.defineProperty,pt=(a,t,e,s)=>{for(var o=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=r(t,e,o)||o);return o&&Qa(t,e,o),o};const Jt="https://www.euskara.euskadi.eus/itzuli/",Xt="hiztegi-itzuli-panel-open";class K extends w{constructor(){super(...arguments),this.open=!1,this.word="",this.searchWord="",this.iframeSrc=Jt}static{this.styles=[h.hostStyle,h.designTokens,h.themeTokens,h.accentTokens,h.buttonStyle,v`
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
    `]}connectedCallback(){super.connectedCallback(),this.loadState()}updated(t){t.has("word")&&this.word&&(this.searchWord=this.word,this.updateIframeSrc())}loadState(){const t=localStorage.getItem(Xt);t!==null&&(this.open=t==="true")}saveState(){localStorage.setItem(Xt,String(this.open))}togglePanel(){this.open=!this.open,this.saveState(),this.dispatchEvent(new CustomEvent("toggle",{detail:{open:this.open},bubbles:!0,composed:!0}))}onSearchInput(t){this.searchWord=t.target.value}onSearchKeydown(t){t.key==="Enter"&&this.updateIframeSrc()}onSearchClick(){this.updateIframeSrc()}updateIframeSrc(){this.searchWord.trim()&&(this.iframeSrc=`${Jt}?q=${encodeURIComponent(this.searchWord.trim())}`)}render(){return this.open?l`
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
    `:l``}}pt([f({type:Boolean})],K.prototype,"open");pt([f({type:String})],K.prototype,"word");pt([m()],K.prototype,"searchWord");pt([m()],K.prototype,"iframeSrc");$("component-iframe-panel",K);var Ja=Object.defineProperty,Xa=Object.getOwnPropertyDescriptor,b=(a,t,e,s)=>{for(var o=s>1?void 0:s?Xa(t,e):t,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Ja(t,e,o),o};let g=class extends A{constructor(){super(...arguments),this.bookId="",this.chapters=[],this.chapterIndex=0,this.pageIndex=0,this.dictionary=[],this.opendataIndex=new Set,this.verbIndex=new Set,this.loading=!0,this.error="",this.showDictForm=!1,this.showItzuliPanel=!1,this.selectedWord="",this.loadStarted=!1}willUpdate(a){a.has("bookId")&&this.bookId&&this.ensureLoaded()}async onPageInit(){await this.ensureLoaded()}async ensureLoaded(){if(!this.loadStarted){this.loadStarted=!0;try{const a=this.bookId||this.getBookIdFromQuery();await this.loadBook(a)}finally{this.loadStarted=!1}}}getBookIdFromQuery(){return this.getQueryParamsURL().get("bookId")??""}async loadBook(a){if(!a){this.error="No se ha indicado ningún libro.",this.loading=!1;return}this.loading=!0,this.error="",this.tooltip=void 0,this.tooltipEntry=void 0,this.tooltipOpenDataEntry=void 0,this.tooltipVerbEntry=void 0,this.showDictForm=!1,this.dictFormEntry=void 0;const t=await this.api.getBook(a);if(!t){this.error="Libro no encontrado.",this.loading=!1;return}const[e,s,o,n,r]=await Promise.all([this.api.getChapters(a),this.api.getProgress(a),this.api.getAllEntries(),this.api.loadOpenDataIndex(),this.api.loadVerbIndex()]),i=Math.max(0,e.length-1);this.book=t,this.chapters=e,this.dictionary=o,this.opendataIndex=n,this.verbIndex=r,this.chapterIndex=Math.min(s?.chapterIndex??0,i),this.pageIndex=s?.pageIndex??0,this.loading=!1}async persistProgress(){await this.api.saveProgress({bookId:this.bookId,chapterIndex:this.chapterIndex,pageIndex:this.pageIndex})}async onPageChange(a){const{pageIndex:t}=a.detail;this.pageIndex=t,await this.persistProgress()}async onPreviousChapter(){this.chapterIndex>0&&await this.loadChapter(this.chapterIndex-1)}async onNextChapter(){this.chapterIndex<this.chapters.length-1&&await this.loadChapter(this.chapterIndex+1)}async loadChapter(a){this.chapterIndex=a,this.pageIndex=0,await this.persistProgress()}async onWordClick(a){const{word:t,x:e,y:s,baseForm:o,suffix:n,cases:r}=a.detail,i=o??t,c=await this.api.resolveWord(i),d=c?void 0:await this.api.lookupVerb(i),p=c||d?void 0:await this.api.lookupOpenData(i);this.tooltip={word:t,x:e,y:s,baseForm:o,suffix:n,cases:r},this.tooltipEntry=c,this.tooltipVerbEntry=d,this.tooltipOpenDataEntry=p,this.selectedWord=t}onTooltipClose(){this.tooltip=void 0,this.tooltipEntry=void 0,this.tooltipOpenDataEntry=void 0,this.tooltipVerbEntry=void 0}async onTooltipSave(a){const{entry:t}=a.detail,e=await this.api.upsertEntry(t);this.tooltipEntry=e,this.tooltipOpenDataEntry=void 0,this.tooltipVerbEntry=void 0,this.dictionary=await this.api.getAllEntries()}onOpenAddModal(a){const{word:t,translation:e}=a.detail;this.tooltip=void 0,this.tooltipEntry=void 0,this.tooltipOpenDataEntry=void 0,this.tooltipVerbEntry=void 0,this.dictFormEntry={word:t,status:"unknown",...e?{translation:e}:{}},this.showDictForm=!0}async onDictFormSave(a){const{entry:t}=a.detail,e=await this.api.upsertEntry(t);this.showDictForm=!1,this.dictFormEntry=void 0,this.dictionary=await this.api.getAllEntries(),this.tooltipEntry=e}onDictFormClose(){this.showDictForm=!1,this.dictFormEntry=void 0}toggleItzuliPanel(){this.showItzuliPanel=!this.showItzuliPanel,localStorage.setItem("hiztegi-itzuli-panel-open",String(this.showItzuliPanel))}onItzuliToggle(a){const{open:t}=a.detail;this.showItzuliPanel=t}render(){if(this.error)return l`
        <div>
          <p class="error" role="alert">${this.error}</p>
          <button class="hzt-button" @click=${()=>this.triggerPageNavigation({page:"library"})}>
            Volver a la biblioteca
          </button>
        </div>
      `;if(this.loading)return l`<p class="empty" aria-live="polite">Cargando...</p>`;const a=this.chapters[this.chapterIndex];if(!this.book||this.chapters.length===0||!a)return l`<p class="empty">Este libro no tiene capítulos.</p>`;const t=this.chapterIndex===0,e=this.chapterIndex===this.chapters.length-1;return l`
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
            .verbIndex=${this.verbIndex}
            .pageIndex=${this.pageIndex}
            @page-change=${this.onPageChange}
            @word-click=${this.onWordClick}
          ></component-text-reader>

          ${this.showItzuliPanel?l`
                <component-iframe-panel
                  .open=${this.showItzuliPanel}
                  .word=${this.selectedWord}
                  @toggle=${this.onItzuliToggle}
                ></component-iframe-panel>
              `:""}
        </div>

        ${this.tooltip?l`
              <component-word-tooltip
                .word=${this.tooltip.word}
                .entry=${this.tooltipEntry}
                .openDataEntry=${this.tooltipOpenDataEntry}
                .verbEntry=${this.tooltipVerbEntry}
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
    `}};g.styles=[...A.styles,h.headerStyle,h.buttonStyle,v`
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
    `];b([f({type:String})],g.prototype,"bookId",2);b([m()],g.prototype,"book",2);b([m()],g.prototype,"chapters",2);b([m()],g.prototype,"chapterIndex",2);b([m()],g.prototype,"pageIndex",2);b([m()],g.prototype,"dictionary",2);b([m()],g.prototype,"opendataIndex",2);b([m()],g.prototype,"verbIndex",2);b([m()],g.prototype,"tooltip",2);b([m()],g.prototype,"tooltipEntry",2);b([m()],g.prototype,"tooltipOpenDataEntry",2);b([m()],g.prototype,"tooltipVerbEntry",2);b([m()],g.prototype,"loading",2);b([m()],g.prototype,"error",2);b([m()],g.prototype,"showDictForm",2);b([m()],g.prototype,"dictFormEntry",2);b([m()],g.prototype,"showItzuliPanel",2);b([m()],g.prototype,"selectedWord",2);g=b([rt({getBook:re,getChapters:oa,getProgress:ie,saveProgress:ra,getAllEntries:de,resolveWord:xa,loadOpenDataIndex:Ca,lookupOpenData:Pa,loadVerbIndex:Ra,lookupVerb:Fa,upsertEntry:pe})],g);$("page-reading",g);var Za=Object.defineProperty,Ya=(a,t,e,s)=>{for(var o=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=r(t,e,o)||o);return o&&Za(t,e,o),o};class ve extends w{static{this.styles=[h.hostStyle,h.designTokens,h.themeTokens,h.accentTokens,h.headerStyle,h.cardStyle,h.buttonStyle,v`
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
    `}emitEdit(){this.entry&&this.dispatchEvent(new CustomEvent("edit-entry",{detail:{word:this.entry.word},bubbles:!0,composed:!0}))}emitDelete(){this.entry&&this.dispatchEvent(new CustomEvent("delete-entry",{detail:{word:this.entry.word},bubbles:!0,composed:!0}))}}Ya([f({type:Object})],ve.prototype,"entry");$("component-dictionary-entry-row",ve);var ts=Object.defineProperty,es=Object.getOwnPropertyDescriptor,Q=(a,t,e,s)=>{for(var o=s>1?void 0:s?es(t,e):t,n=a.length-1,r;n>=0;n--)(r=a[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&ts(t,e,o),o};let I=class extends A{constructor(){super(...arguments),this.entries=[],this.search="",this.showForm=!1}async onPageInit(){await this.loadEntries()}async loadEntries(){this.entries=await this.api.getEntries()}get filteredEntries(){const a=this.search.trim().toLocaleLowerCase();return a?this.entries.filter(t=>t.word.toLocaleLowerCase().includes(a)||(t.translation??"").toLocaleLowerCase().includes(a)||(t.note??"").toLocaleLowerCase().includes(a)):this.entries}onSearchInput(a){this.search=a.target.value}onAddClick(){this.editing=void 0,this.showForm=!0}onEditEntry(a){const{word:t}=a.detail;this.editing=this.entries.find(e=>e.word===t),this.showForm=!0}async onDeleteEntry(a){const{word:t}=a.detail;window.confirm("¿Seguro que quieres eliminar la entrada?")&&(await this.api.deleteEntry(t),await this.loadEntries())}async onSaveEntry(a){const{entry:t}=a.detail;await this.api.upsertEntry(t),this.showForm=!1,this.editing=void 0,await this.loadEntries()}onCancelEntry(){this.showForm=!1,this.editing=void 0}render(){const a=this.filteredEntries;return l`
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
          ${a.length===0?l`
                <p class="empty">
                  ${this.entries.length===0?"Aún no hay entradas.":"No hay resultados para tu búsqueda."}
                </p>
              `:a.map(t=>l`
                  <component-dictionary-entry-row
                    .entry=${t}
                    @edit-entry=${this.onEditEntry}
                    @delete-entry=${this.onDeleteEntry}
                  ></component-dictionary-entry-row>
                `)}
        </div>
      </div>
    `}};I.styles=[...A.styles,h.headerStyle,h.buttonStyle,v`
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
    `];Q([m()],I.prototype,"entries",2);Q([m()],I.prototype,"search",2);Q([m()],I.prototype,"showForm",2);Q([m()],I.prototype,"editing",2);I=Q([rt({getEntries:de,upsertEntry:pe,deleteEntry:$a})],I);$("page-dictionary",I);$("page-hiztegi-app",R);
