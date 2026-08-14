"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
      if (decorator = decorators[i5])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = /* @__PURE__ */ Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t3, e5, o6) {
      if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3, this.t = e5;
    }
    get styleSheet() {
      let t3 = this.o;
      const s4 = this.t;
      if (e && void 0 === t3) {
        const e5 = void 0 !== s4 && 1 === s4.length;
        e5 && (t3 = o.get(s4)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s4, t3));
      }
      return t3;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
  var i = (t3, ...e5) => {
    const o6 = 1 === t3.length ? t3[0] : e5.reduce((e6, s4, o7) => e6 + ((t4) => {
      if (true === t4._$cssResult$) return t4.cssText;
      if ("number" == typeof t4) return t4;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s4) + t3[o7 + 1], t3[0]);
    return new n(o6, t3, s);
  };
  var S = (s4, o6) => {
    if (e) s4.adoptedStyleSheets = o6.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
    else for (const e5 of o6) {
      const o7 = document.createElement("style"), n5 = t.litNonce;
      void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e5.cssText, s4.appendChild(o7);
    }
  };
  var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e5 = "";
    for (const s4 of t4.cssRules) e5 += s4.cssText;
    return r(e5);
  })(t3) : t3;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t3, s4) => t3;
  var u = { toAttribute(t3, s4) {
    switch (s4) {
      case Boolean:
        t3 = t3 ? l : null;
        break;
      case Object:
      case Array:
        t3 = null == t3 ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, s4) {
    let i5 = t3;
    switch (s4) {
      case Boolean:
        i5 = null !== t3;
        break;
      case Number:
        i5 = null === t3 ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          i5 = JSON.parse(t3);
        } catch (t4) {
          i5 = null;
        }
    }
    return i5;
  } };
  var f = (t3, s4) => !i2(t3, s4);
  var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
  Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var y = class extends HTMLElement {
    static addInitializer(t3) {
      this._$Ei(), (this.l ??= []).push(t3);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t3, s4 = b) {
      if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t3) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t3, s4), !s4.noAccessor) {
        const i5 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t3, i5, s4);
        void 0 !== h3 && e2(this.prototype, t3, h3);
      }
    }
    static getPropertyDescriptor(t3, s4, i5) {
      const { get: e5, set: r6 } = h(this.prototype, t3) ?? { get() {
        return this[s4];
      }, set(t4) {
        this[s4] = t4;
      } };
      return { get: e5, set(s5) {
        const h3 = e5?.call(this);
        r6?.call(this, s5), this.requestUpdate(t3, h3, i5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) ?? b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t3 = n2(this);
      t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t4 = this.properties, s4 = [...r2(t4), ...o2(t4)];
        for (const i5 of s4) this.createProperty(i5, t4[i5]);
      }
      const t3 = this[Symbol.metadata];
      if (null !== t3) {
        const s4 = litPropertyMetadata.get(t3);
        if (void 0 !== s4) for (const [t4, i5] of s4) this.elementProperties.set(t4, i5);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t4, s4] of this.elementProperties) {
        const i5 = this._$Eu(t4, s4);
        void 0 !== i5 && this._$Eh.set(i5, t4);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s4) {
      const i5 = [];
      if (Array.isArray(s4)) {
        const e5 = new Set(s4.flat(1 / 0).reverse());
        for (const s5 of e5) i5.unshift(c(s5));
      } else void 0 !== s4 && i5.push(c(s4));
      return i5;
    }
    static _$Eu(t3, s4) {
      const i5 = s4.attribute;
      return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t3) => t3(this));
    }
    addController(t3) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t3), void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
    }
    removeController(t3) {
      this._$EO?.delete(t3);
    }
    _$E_() {
      const t3 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
      for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t3.set(i5, this[i5]), delete this[i5]);
      t3.size > 0 && (this._$Ep = t3);
    }
    createRenderRoot() {
      const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t3, this.constructor.elementStyles), t3;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t3) => t3.hostConnected?.());
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t3) => t3.hostDisconnected?.());
    }
    attributeChangedCallback(t3, s4, i5) {
      this._$AK(t3, i5);
    }
    _$ET(t3, s4) {
      const i5 = this.constructor.elementProperties.get(t3), e5 = this.constructor._$Eu(t3, i5);
      if (void 0 !== e5 && true === i5.reflect) {
        const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
        this._$Em = t3, null == h3 ? this.removeAttribute(e5) : this.setAttribute(e5, h3), this._$Em = null;
      }
    }
    _$AK(t3, s4) {
      const i5 = this.constructor, e5 = i5._$Eh.get(t3);
      if (void 0 !== e5 && this._$Em !== e5) {
        const t4 = i5.getPropertyOptions(e5), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== t4.converter?.fromAttribute ? t4.converter : u;
        this._$Em = e5;
        const r6 = h3.fromAttribute(s4, t4.type);
        this[e5] = r6 ?? this._$Ej?.get(e5) ?? r6, this._$Em = null;
      }
    }
    requestUpdate(t3, s4, i5, e5 = false, h3) {
      if (void 0 !== t3) {
        const r6 = this.constructor;
        if (false === e5 && (h3 = this[t3]), i5 ??= r6.getPropertyOptions(t3), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t3) && !this.hasAttribute(r6._$Eu(t3, i5)))) return;
        this.C(t3, s4, i5);
      }
      false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t3, s4, { useDefault: i5, reflect: e5, wrapped: h3 }, r6) {
      i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t3) && (this._$Ej.set(t3, r6 ?? s4 ?? this[t3]), true !== h3 || void 0 !== r6) || (this._$AL.has(t3) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t3, s4)), true === e5 && this._$Em !== t3 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t3));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t4) {
        Promise.reject(t4);
      }
      const t3 = this.scheduleUpdate();
      return null != t3 && await t3, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t5, s5] of this._$Ep) this[t5] = s5;
          this._$Ep = void 0;
        }
        const t4 = this.constructor.elementProperties;
        if (t4.size > 0) for (const [s5, i5] of t4) {
          const { wrapped: t5 } = i5, e5 = this[s5];
          true !== t5 || this._$AL.has(s5) || void 0 === e5 || this.C(s5, void 0, i5, e5);
        }
      }
      let t3 = false;
      const s4 = this._$AL;
      try {
        t3 = this.shouldUpdate(s4), t3 ? (this.willUpdate(s4), this._$EO?.forEach((t4) => t4.hostUpdate?.()), this.update(s4)) : this._$EM();
      } catch (s5) {
        throw t3 = false, this._$EM(), s5;
      }
      t3 && this._$AE(s4);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      this._$EO?.forEach((t4) => t4.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    _$EM() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      this._$Eq &&= this._$Eq.forEach((t4) => this._$ET(t4, this[t4])), this._$EM();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = (t3) => t3;
  var s2 = t2.trustedTypes;
  var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
  var h2 = "$lit$";
  var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var n3 = "?" + o3;
  var r3 = `<${n3}>`;
  var l2 = document;
  var c3 = () => l2.createComment("");
  var a2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
  var u2 = Array.isArray;
  var d2 = (t3) => u2(t3) || "function" == typeof t3?.[Symbol.iterator];
  var f2 = "[ 	\n\f\r]";
  var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g = /'/g;
  var $ = /"/g;
  var y2 = /^(?:script|style|textarea|title)$/i;
  var x = (t3) => (i5, ...s4) => ({ _$litType$: t3, strings: i5, values: s4 });
  var b2 = x(1);
  var w = x(2);
  var T = x(3);
  var E = /* @__PURE__ */ Symbol.for("lit-noChange");
  var A = /* @__PURE__ */ Symbol.for("lit-nothing");
  var C = /* @__PURE__ */ new WeakMap();
  var P = l2.createTreeWalker(l2, 129);
  function V(t3, i5) {
    if (!u2(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== e3 ? e3.createHTML(i5) : i5;
  }
  var N = (t3, i5) => {
    const s4 = t3.length - 1, e5 = [];
    let n5, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
    for (let i6 = 0; i6 < s4; i6++) {
      const s5 = t3[i6];
      let a3, u3, d3 = -1, f3 = 0;
      for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
      const x2 = c4 === p2 && t3[i6 + 1].startsWith("/>") ? " " : "";
      l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e5.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i6 : x2);
    }
    return [V(t3, l3 + (t3[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e5];
  };
  var S2 = class _S {
    constructor({ strings: t3, _$litType$: i5 }, e5) {
      let r6;
      this.parts = [];
      let l3 = 0, a3 = 0;
      const u3 = t3.length - 1, d3 = this.parts, [f3, v2] = N(t3, i5);
      if (this.el = _S.createElement(f3, e5), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
        const t4 = this.el.content.firstChild;
        t4.replaceWith(...t4.childNodes);
      }
      for (; null !== (r6 = P.nextNode()) && d3.length < u3; ) {
        if (1 === r6.nodeType) {
          if (r6.hasAttributes()) for (const t4 of r6.getAttributeNames()) if (t4.endsWith(h2)) {
            const i6 = v2[a3++], s4 = r6.getAttribute(t4).split(o3), e6 = /([.?@])?(.*)/.exec(i6);
            d3.push({ type: 1, index: l3, name: e6[2], strings: s4, ctor: "." === e6[1] ? I : "?" === e6[1] ? L : "@" === e6[1] ? z : H }), r6.removeAttribute(t4);
          } else t4.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r6.removeAttribute(t4));
          if (y2.test(r6.tagName)) {
            const t4 = r6.textContent.split(o3), i6 = t4.length - 1;
            if (i6 > 0) {
              r6.textContent = s2 ? s2.emptyScript : "";
              for (let s4 = 0; s4 < i6; s4++) r6.append(t4[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
              r6.append(t4[i6], c3());
            }
          }
        } else if (8 === r6.nodeType) if (r6.data === n3) d3.push({ type: 2, index: l3 });
        else {
          let t4 = -1;
          for (; -1 !== (t4 = r6.data.indexOf(o3, t4 + 1)); ) d3.push({ type: 7, index: l3 }), t4 += o3.length - 1;
        }
        l3++;
      }
    }
    static createElement(t3, i5) {
      const s4 = l2.createElement("template");
      return s4.innerHTML = t3, s4;
    }
  };
  function M(t3, i5, s4 = t3, e5) {
    if (i5 === E) return i5;
    let h3 = void 0 !== e5 ? s4._$Co?.[e5] : s4._$Cl;
    const o6 = a2(i5) ? void 0 : i5._$litDirective$;
    return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t3), h3._$AT(t3, s4, e5)), void 0 !== e5 ? (s4._$Co ??= [])[e5] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = M(t3, h3._$AS(t3, i5.values), h3, e5)), i5;
  }
  var R = class {
    constructor(t3, i5) {
      this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i5;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t3) {
      const { el: { content: i5 }, parts: s4 } = this._$AD, e5 = (t3?.creationScope ?? l2).importNode(i5, true);
      P.currentNode = e5;
      let h3 = P.nextNode(), o6 = 0, n5 = 0, r6 = s4[0];
      for (; void 0 !== r6; ) {
        if (o6 === r6.index) {
          let i6;
          2 === r6.type ? i6 = new k(h3, h3.nextSibling, this, t3) : 1 === r6.type ? i6 = new r6.ctor(h3, r6.name, r6.strings, this, t3) : 6 === r6.type && (i6 = new Z(h3, this, t3)), this._$AV.push(i6), r6 = s4[++n5];
        }
        o6 !== r6?.index && (h3 = P.nextNode(), o6++);
      }
      return P.currentNode = l2, e5;
    }
    p(t3) {
      let i5 = 0;
      for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t3, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t3[i5])), i5++;
    }
  };
  var k = class _k {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t3, i5, s4, e5) {
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i5, this._$AM = s4, this.options = e5, this._$Cv = e5?.isConnected ?? true;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i5 = this._$AM;
      return void 0 !== i5 && 11 === t3?.nodeType && (t3 = i5.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i5 = this) {
      t3 = M(this, t3, i5), a2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== E && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : d2(t3) ? this.k(t3) : this._(t3);
    }
    O(t3) {
      return this._$AA.parentNode.insertBefore(t3, this._$AB);
    }
    T(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
    }
    _(t3) {
      this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(l2.createTextNode(t3)), this._$AH = t3;
    }
    $(t3) {
      const { values: i5, _$litType$: s4 } = t3, e5 = "number" == typeof s4 ? this._$AC(t3) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
      if (this._$AH?._$AD === e5) this._$AH.p(i5);
      else {
        const t4 = new R(e5, this), s5 = t4.u(this.options);
        t4.p(i5), this.T(s5), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i5 = C.get(t3.strings);
      return void 0 === i5 && C.set(t3.strings, i5 = new S2(t3)), i5;
    }
    k(t3) {
      u2(this._$AH) || (this._$AH = [], this._$AR());
      const i5 = this._$AH;
      let s4, e5 = 0;
      for (const h3 of t3) e5 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e5], s4._$AI(h3), e5++;
      e5 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e5), i5.length = e5);
    }
    _$AR(t3 = this._$AA.nextSibling, s4) {
      for (this._$AP?.(false, true, s4); t3 !== this._$AB; ) {
        const s5 = i3(t3).nextSibling;
        i3(t3).remove(), t3 = s5;
      }
    }
    setConnected(t3) {
      void 0 === this._$AM && (this._$Cv = t3, this._$AP?.(t3));
    }
  };
  var H = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t3, i5, s4, e5, h3) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i5, this._$AM = e5, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
    }
    _$AI(t3, i5 = this, s4, e5) {
      const h3 = this.strings;
      let o6 = false;
      if (void 0 === h3) t3 = M(this, t3, i5, 0), o6 = !a2(t3) || t3 !== this._$AH && t3 !== E, o6 && (this._$AH = t3);
      else {
        const e6 = t3;
        let n5, r6;
        for (t3 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r6 = M(this, e6[s4 + n5], i5, n5), r6 === E && (r6 = this._$AH[n5]), o6 ||= !a2(r6) || r6 !== this._$AH[n5], r6 === A ? t3 = A : t3 !== A && (t3 += (r6 ?? "") + h3[n5 + 1]), this._$AH[n5] = r6;
      }
      o6 && !e5 && this.j(t3);
    }
    j(t3) {
      t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
    }
  };
  var I = class extends H {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t3) {
      this.element[this.name] = t3 === A ? void 0 : t3;
    }
  };
  var L = class extends H {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t3) {
      this.element.toggleAttribute(this.name, !!t3 && t3 !== A);
    }
  };
  var z = class extends H {
    constructor(t3, i5, s4, e5, h3) {
      super(t3, i5, s4, e5, h3), this.type = 5;
    }
    _$AI(t3, i5 = this) {
      if ((t3 = M(this, t3, i5, 0) ?? A) === E) return;
      const s4 = this._$AH, e5 = t3 === A && s4 !== A || t3.capture !== s4.capture || t3.once !== s4.once || t3.passive !== s4.passive, h3 = t3 !== A && (s4 === A || e5);
      e5 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var Z = class {
    constructor(t3, i5, s4) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      M(this, t3);
    }
  };
  var B = t2.litHtmlPolyfillSupport;
  B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.2");
  var D = (t3, i5, s4) => {
    const e5 = s4?.renderBefore ?? i5;
    let h3 = e5._$litPart$;
    if (void 0 === h3) {
      const t4 = s4?.renderBefore ?? null;
      e5._$litPart$ = h3 = new k(i5.insertBefore(c3(), t4), t4, void 0, s4 ?? {});
    }
    return h3._$AI(t3), h3;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = globalThis;
  var i4 = class extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t3 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t3.firstChild, t3;
    }
    update(t3) {
      const r6 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(r6, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return E;
    }
  };
  i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
  var o4 = s3.litElementPolyfillSupport;
  o4?.({ LitElement: i4 });
  (s3.litElementVersions ??= []).push("4.2.2");

  // src/shared/api.decorator.ts
  var api = function PluginDecorator(apis) {
    return (ctor) => {
      ctor.prototype.api = {};
      Object.entries(apis).forEach(([key, value]) => ctor.prototype.api[key] = value);
    };
  };

  // src/shared/styles.ts
  var designTokens = i`
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
`;
  var themeTokens = i`
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
`;
  var accentTokens = i`
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
`;
  var hostStyle = i`
  :host {
    display: block;
    font-family: var(--hzt-font-body);
    font-size: var(--hzt-size-body);
    line-height: var(--hzt-line-body);
    color: var(--hzt-ink);
  }
`;
  var headerStyle = i`
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
`;
  var cardStyle = i`
  .hzt-card {
    background: var(--hzt-panel);
    border: var(--hzt-border-panel) solid var(--hzt-ink);
    border-radius: var(--hzt-corner);
    box-shadow: var(--hzt-shadow-card);
    color: var(--hzt-ink);
  }
`;
  var buttonStyle = i`
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
`;
  var styles = {
    designTokens,
    themeTokens,
    accentTokens,
    hostStyle,
    headerStyle,
    cardStyle,
    buttonStyle
  };

  // src/shared/page.ts
  var Page = class extends i4 {
    constructor() {
      super();
    }
    static {
      this.styles = [
        styles.hostStyle,
        styles.designTokens,
        styles.themeTokens,
        styles.accentTokens,
        i`
      :host {
        display: block;
        min-height: 100vh;
        background: var(--hzt-paper);
        color: var(--hzt-ink);
      }
    `
      ];
    }
    /**
     * Full page load to another url (external links only, never internal nav).
     * If the string starts with / will concat string to the current url.
     * If it starts with http the whole location will be replaced.
     * Other case it will use the same origin to concat the url.
     * @param {string} url location to navigate
     */
    navigate(url) {
      if (url.startsWith("/")) {
        window.location.href = window.location.href.concat(url);
      } else if (url.startsWith("http")) {
        window.location.href = url;
      } else {
        window.location.href = `${window.location.origin}/${url}`;
      }
    }
    /**
     * Request a navigation to another page. Dispatches a `page-navigation`
     * CustomEvent with the given query params; the app entry
     * (`pageHiztegiApp`) listens for it and updates the URL.
     * @param queryParams object with key value pairs
     */
    triggerPageNavigation(queryParams) {
      this.dispatchEvent(new CustomEvent("page-navigation", {
        detail: { ...queryParams },
        bubbles: true,
        composed: true
      }));
    }
    /**
     * Navigate to another page replacing the current query params.
     * ONLY the app entry (`pageHiztegiApp`) is allowed to call this.
     * @param queryParams object with key value pairs
     */
    navigateToPage(queryParams) {
      const url = new URL(window.location.href);
      url.search = "";
      Object.entries(queryParams).forEach(([key, value]) => url.searchParams.set(key, value));
      window.history.replaceState({}, "", url.toString());
    }
    /**
     * Function to open a url in a new tab.
     * @param {string} url to open in a new tab
     */
    openNewTab(url) {
      window.open(url, "_blank");
    }
    /**
     * Function to get current url where the webcomponent is located
     * @returns window.location.href
     */
    getHref() {
      return window.location.href;
    }
    /**
     * Function to get the current query params as a plain object
     * (e.g. `?page=reading&bookId=b1` -> `{ page: 'reading', bookId: 'b1' }`).
     * Prefer `getQueryParamsURL()` when you need a typed `URLSearchParams`.
     * @returns query params of the current url
     */
    getHash() {
      const search = location.search.substring(1);
      if (search && search.length > 0)
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
      return {};
    }
    /**
     * Function to get hostname of current url
     * @returns window.location.hostname
     */
    getHostname() {
      return window.location.hostname;
    }
    /**
     * Function to get queryparams from current url
     * @returns url.searchParams: URLSearchParams
     */
    getQueryParamsURL() {
      const url = new URL(this.getHref());
      return url.searchParams;
    }
    connectedCallback() {
      super.connectedCallback();
      this.onPageInit();
    }
    /**
     * It will be called after the Page component is loaded.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPageInit() {
    }
  };

  // node_modules/@lit/reactive-element/decorators/property.js
  var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r4 = (t3 = o5, e5, r6) => {
    const { kind: n5, metadata: i5 } = r6;
    let s4 = globalThis.litPropertyMetadata.get(i5);
    if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t3 = Object.create(t3)).wrapped = true), s4.set(r6.name, t3), "accessor" === n5) {
      const { name: o6 } = r6;
      return { set(r7) {
        const n6 = e5.get.call(this);
        e5.set.call(this, r7), this.requestUpdate(o6, n6, t3, true, r7);
      }, init(e6) {
        return void 0 !== e6 && this.C(o6, void 0, t3, e6), e6;
      } };
    }
    if ("setter" === n5) {
      const { name: o6 } = r6;
      return function(r7) {
        const n6 = this[o6];
        e5.call(this, r7), this.requestUpdate(o6, n6, t3, true, r7);
      };
    }
    throw Error("Unsupported decorator location: " + n5);
  };
  function n4(t3) {
    return (e5, o6) => "object" == typeof o6 ? r4(t3, e5, o6) : ((t4, e6, o7) => {
      const r6 = e6.hasOwnProperty(o7);
      return e6.constructor.createProperty(o7, t4), r6 ? Object.getOwnPropertyDescriptor(e6, o7) : void 0;
    })(t3, e5, o6);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function r5(r6) {
    return n4({ ...r6, state: true, attribute: false });
  }

  // src/components/pageHiztegiApp/pageHiztegiApp.ts
  var DEFAULT_PAGE = "library";
  var PageHiztegiApp = class extends Page {
    constructor() {
      super(...arguments);
      this.currentRoute = DEFAULT_PAGE;
      this.bookId = "";
    }
    get pageParam() {
      const page = this.getQueryParamsURL().get("page");
      return page === "reading" || page === "dictionary" ? page : DEFAULT_PAGE;
    }
    get routeBookId() {
      return this.getQueryParamsURL().get("bookId") ?? "";
    }
    onPageInit() {
      this.currentRoute = this.pageParam;
      this.bookId = this.routeBookId;
    }
    onPageNavigation({ detail }) {
      const page = detail.page;
      this.currentRoute = page === "reading" || page === "dictionary" ? page : DEFAULT_PAGE;
      this.bookId = detail.bookId ?? "";
      this.navigateToPage(detail);
    }
    _renderPageContent() {
      const page = this.currentRoute;
      switch (page) {
        case "reading":
          return b2`
          <page-reading
            .bookId=${this.bookId}
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-reading>`;
        case "dictionary":
          return b2`
          <page-dictionary
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-dictionary>`;
        case "library":
        default:
          return b2`
          <page-library
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-library>`;
      }
    }
    render() {
      return b2`
      <div class="nav-wrap">
        <component-nav-bar
          active="${this.currentRoute}"
          @nav-bar-navigation="${this.onPageNavigation}"
        ></component-nav-bar>
      </div>
      <div id="page-container">
        ${this._renderPageContent()}
      </div>
    `;
    }
  };
  PageHiztegiApp.styles = [
    ...Page.styles,
    i`
      :host {
        min-height: 100vh;
        background: var(--hzt-paper);
      }

      .nav-wrap {
        position: sticky;
        top: 0;
        z-index: 10;
      }
    `
  ];
  __decorateClass([
    r5()
  ], PageHiztegiApp.prototype, "currentRoute", 2);
  __decorateClass([
    r5()
  ], PageHiztegiApp.prototype, "bookId", 2);
  PageHiztegiApp = __decorateClass([
    api({
      getApi: () => ({})
    })
  ], PageHiztegiApp);

  // src/shared/functions.ts
  var register = (tag, component) => {
    if (document.createElement(tag).constructor === HTMLElement) {
      const newComponent = component;
      const classVersion = () => class Version extends newComponent {
        constructor() {
          super();
        }
      };
      window.customElements.define(tag, classVersion());
    }
  };

  // src/components/componentNavBar/componentNavBar.ts
  var NAV_ITEMS = [
    { path: "library", label: "Inicio" },
    { path: "dictionary", label: "Diccionario" }
  ];
  var ComponentNavBar = class extends i4 {
    constructor() {
      super(...arguments);
      this.active = "";
    }
    static {
      this.styles = [
        styles.hostStyle,
        styles.designTokens,
        styles.themeTokens,
        styles.accentTokens,
        i`
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
    `
      ];
    }
    triggerNavigation(path) {
      this.dispatchEvent(new CustomEvent("nav-bar-navigation", {
        detail: { page: path },
        bubbles: true,
        composed: true
      }));
    }
    render() {
      const current = this.active || NAV_ITEMS[0].path;
      return b2`
      <nav class="nav-bar" aria-label="Navegación principal">
        ${NAV_ITEMS.map(
        (item) => b2`
            <button
              class="nav-link ${current === item.path ? "nav-link--active" : ""}"
              @click=${() => this.triggerNavigation(item.path)}
              aria-current=${current === item.path ? "page" : "false"}
              >${item.label}</button
            >
          `
      )}
      </nav>
    `;
    }
  };
  __decorateClass([
    n4({ type: String })
  ], ComponentNavBar.prototype, "active", 2);

  // src/components/componentNavBar/index.ts
  register("component-nav-bar", ComponentNavBar);

  // src/shared/storage.ts
  var DB_NAME = "hiztegi-db";
  var DB_VERSION = 1;
  var STORE_CONFIG = {
    books: { keyPath: "id" },
    chapters: { keyPath: "id" },
    progress: { keyPath: "bookId" },
    dictionary: { keyPath: "word" }
  };
  var dbPromise = null;
  var open = () => {
    if (!dbPromise) {
      dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
          const db = request.result;
          Object.keys(STORE_CONFIG).forEach((store) => {
            if (!db.objectStoreNames.contains(store)) {
              db.createObjectStore(store, STORE_CONFIG[store]);
            }
          });
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    return dbPromise;
  };
  var requestResult = (request) => new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  var transaction = (storeNames, mode, callback) => {
    return open().then(
      (db) => new Promise((resolve, reject) => {
        const names = Array.isArray(storeNames) ? storeNames : [storeNames];
        const tx = db.transaction(names, mode);
        const stores = {};
        names.forEach((name) => {
          stores[name] = tx.objectStore(name);
        });
        try {
          callback(stores);
        } catch (err) {
          tx.abort();
          reject(err);
          return;
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      })
    );
  };
  var getAll = async (store) => {
    const db = await open();
    return requestResult(db.transaction(store, "readonly").objectStore(store).getAll());
  };
  var get = async (store, key) => {
    const db = await open();
    return requestResult(db.transaction(store, "readonly").objectStore(store).get(key));
  };
  var put = async (store, value) => {
    const db = await open();
    return requestResult(db.transaction(store, "readwrite").objectStore(store).put(value));
  };
  var remove = async (store, key) => {
    const db = await open();
    return requestResult(db.transaction(store, "readwrite").objectStore(store).delete(key));
  };

  // src/shared/bookStore.ts
  var importBook = async (parsed, format) => {
    const id = crypto.randomUUID();
    const book = {
      id,
      title: parsed.title,
      format,
      addedAt: (/* @__PURE__ */ new Date()).toISOString(),
      chapterIds: []
    };
    const chapters = parsed.chapters.map((chapter, index) => ({
      id: crypto.randomUUID(),
      bookId: id,
      index,
      title: chapter.title,
      text: chapter.text
    }));
    book.chapterIds = chapters.map((chapter) => chapter.id);
    await transaction(["books", "chapters"], "readwrite", (stores) => {
      stores.books.put(book);
      chapters.forEach((chapter) => stores.chapters.put(chapter));
    });
    return book;
  };
  var getBooks = async () => {
    return getAll("books");
  };
  var getBook = async (id) => {
    return get("books", id);
  };
  var getChapters = async (bookId) => {
    const chapters = await getAll("chapters");
    return chapters.filter((chapter) => chapter.bookId === bookId).sort((a3, b3) => a3.index - b3.index);
  };
  var deleteBook = async (id) => {
    const book = await getBook(id);
    if (!book) {
      return;
    }
    await transaction(["books", "chapters", "progress"], "readwrite", (stores) => {
      stores.books.delete(id);
      book.chapterIds.forEach((chapterId) => stores.chapters.delete(chapterId));
      stores.progress.delete(id);
    });
  };
  var saveProgress = async (progress) => {
    await put("progress", progress);
  };
  var getProgress = async (bookId) => {
    return get("progress", bookId);
  };

  // src/shared/parsers/txt.ts
  var PARAGRAPHS_PER_CHAPTER = 15;
  var parseTxt = async (file) => {
    const text = await file.text();
    const paragraphs = text.split(/\n\s*\n+/).map((paragraph) => paragraph.trim()).filter((paragraph) => paragraph.length > 0);
    const chapters = [];
    for (let index = 0; index < paragraphs.length; index += PARAGRAPHS_PER_CHAPTER) {
      chapters.push({
        title: String(chapters.length + 1),
        text: paragraphs.slice(index, index + PARAGRAPHS_PER_CHAPTER).join("\n\n")
      });
    }
    if (chapters.length === 0) {
      chapters.push({ title: "1", text: "" });
    }
    const title = file.name.replace(/\.[^.]+$/, "").trim() || "Untitled";
    return { title, chapters };
  };

  // src/shared/parsers/index.ts
  var getExtension = (name) => name.split(".").pop()?.toLocaleLowerCase() ?? "";
  var parseBook = async (file) => {
    const extension = getExtension(file.name);
    switch (extension) {
      case "txt":
        return parseTxt(file);
      case "epub":
      case "pdf":
        throw new Error(`Parser for "${extension}" is not implemented yet`);
      default:
        throw new Error(`Unsupported file format: "${extension}"`);
    }
  };

  // src/components/componentImportFile/componentImportFile.ts
  var ComponentImportFile = class extends i4 {
    constructor() {
      super(...arguments);
      this.active = false;
    }
    static {
      this.styles = [
        styles.hostStyle,
        styles.designTokens,
        styles.themeTokens,
        styles.accentTokens,
        i`
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
    `
      ];
    }
    firstUpdated() {
      this.input = this.shadowRoot?.querySelector('input[type="file"]') ?? void 0;
    }
    render() {
      return b2`
      <div
        class="${this.active ? "drop-zone active" : "drop-zone"}"
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
    `;
    }
    selectFiles(files) {
      if (files.length === 0) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("files-selected", {
          detail: { files },
          bubbles: true,
          composed: true
        })
      );
    }
    openPicker() {
      this.input?.click();
    }
    onKeyDown(event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.openPicker();
      }
    }
    onDragOver(event) {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "copy";
      }
      this.active = true;
    }
    onDragLeave() {
      this.active = false;
    }
    onDrop(event) {
      event.preventDefault();
      this.active = false;
      this.selectFiles(Array.from(event.dataTransfer?.files ?? []));
    }
    onInputChange(event) {
      const input = event.target;
      this.selectFiles(Array.from(input.files ?? []));
      input.value = "";
    }
  };
  __decorateClass([
    r5()
  ], ComponentImportFile.prototype, "active", 2);

  // src/components/componentImportFile/index.ts
  register("component-import-file", ComponentImportFile);

  // src/components/componentLibraryBookCard/componentLibraryBookCard.ts
  var ComponentLibraryBookCard = class extends i4 {
    static {
      this.styles = [
        styles.hostStyle,
        styles.designTokens,
        styles.themeTokens,
        styles.accentTokens,
        styles.headerStyle,
        styles.cardStyle,
        styles.buttonStyle,
        i`
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
    `
      ];
    }
    render() {
      const totalChapters = this.book?.chapterIds.length ?? 0;
      const progressText = this.progress ? `Cap\xEDtulo ${this.progress.chapterIndex + 1} / ${totalChapters}` : "";
      return b2`
      <article class="book-card hzt-card">
        <div class="book-info">
          <h2>${this.book?.title ?? ""}</h2>
          <p class="format">${this.book?.format ?? ""}</p>
          ${progressText ? b2`<p class="progress">${progressText}</p>` : ""}
        </div>
        <div class="actions">
          <button class="hzt-button hzt-button--primary" @click=${this.emitRead}>Leer</button>
          <button class="hzt-button hzt-button--destructive" @click=${this.emitDelete}>Eliminar</button>
        </div>
      </article>
    `;
    }
    emitRead() {
      if (!this.book) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("read-book", {
          detail: { id: this.book.id },
          bubbles: true,
          composed: true
        })
      );
    }
    emitDelete() {
      if (!this.book) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("delete-book", {
          detail: { id: this.book.id },
          bubbles: true,
          composed: true
        })
      );
    }
  };
  __decorateClass([
    n4({ type: Object })
  ], ComponentLibraryBookCard.prototype, "book", 2);
  __decorateClass([
    n4({ type: Object })
  ], ComponentLibraryBookCard.prototype, "progress", 2);

  // src/components/componentLibraryBookCard/index.ts
  register("component-library-book-card", ComponentLibraryBookCard);

  // src/components/pageLibrary/pageLibrary.ts
  var PageLibrary = class extends Page {
    constructor() {
      super(...arguments);
      this.books = [];
      this.progressByBook = {};
      this.importing = false;
    }
    async onPageInit() {
      await this.loadBooks();
    }
    async loadBooks() {
      const books = await this.api.getBooks();
      const entries = await Promise.all(
        books.map(async (book) => [book.id, await this.api.getProgress(book.id)])
      );
      this.books = books;
      this.progressByBook = Object.fromEntries(entries);
    }
    async onFilesSelected(event) {
      const { files } = event.detail;
      this.importing = true;
      try {
        for (const file of files) {
          const parsed = await this.api.parseBook(file);
          await this.api.importBook(parsed, "txt");
        }
        await this.loadBooks();
      } finally {
        this.importing = false;
      }
    }
    async onDeleteBook(event) {
      const { id } = event.detail;
      if (!window.confirm("\xBFSeguro que quieres eliminar el libro?")) {
        return;
      }
      await this.api.deleteBook(id);
      await this.loadBooks();
    }
    onReadBook(event) {
      const { id } = event.detail;
      this.triggerPageNavigation({ page: "reading", bookId: id });
    }
    render() {
      return b2`
      <div>
        <h1>Biblioteca</h1>
        <component-import-file @files-selected=${this.onFilesSelected}></component-import-file>
        ${this.importing ? b2`<p class="empty" aria-live="polite">Importando...</p>` : ""}
        <div class="books">
          ${this.books.length === 0 ? b2`<p class="empty">Aún no hay ningún libro.</p>` : this.books.map(
        (book) => b2`
                  <component-library-book-card
                    .book=${book}
                    .progress=${this.progressByBook[book.id]}
                    @read-book=${this.onReadBook}
                    @delete-book=${this.onDeleteBook}
                  ></component-library-book-card>
                `
      )}
        </div>
      </div>
    `;
    }
  };
  PageLibrary.styles = [
    ...Page.styles,
    styles.headerStyle,
    i`
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
    `
  ];
  __decorateClass([
    r5()
  ], PageLibrary.prototype, "books", 2);
  __decorateClass([
    r5()
  ], PageLibrary.prototype, "progressByBook", 2);
  __decorateClass([
    r5()
  ], PageLibrary.prototype, "importing", 2);
  PageLibrary = __decorateClass([
    api({ getBooks, importBook, deleteBook, getProgress, parseBook })
  ], PageLibrary);

  // src/components/pageLibrary/index.ts
  register("page-library", PageLibrary);

  // src/shared/dictionaryStore.ts
  var normalize = (word) => word.trim().toLocaleLowerCase();
  var getAllEntries = async () => {
    return getAll("dictionary");
  };
  var getEntry = async (word) => {
    return get("dictionary", normalize(word));
  };
  var upsertEntry = async (entry) => {
    const normalized = { ...entry, word: normalize(entry.word) };
    await put("dictionary", normalized);
    return normalized;
  };
  var removeEntry = async (word) => {
    await remove("dictionary", normalize(word));
  };
  var lookup = async (word) => {
    return getEntry(word);
  };

  // src/shared/tokenizer.ts
  var isLetter = (char) => /^\p{L}$/u.test(char);
  var isSpace = (char) => /\s/.test(char);
  var tokenize = (text) => {
    const tokens = [];
    let index = 0;
    while (index < text.length) {
      const start = index;
      if (isSpace(text[index])) {
        while (index < text.length && isSpace(text[index])) index += 1;
        tokens.push({ type: "space", text: text.slice(start, index) });
      } else if (isLetter(text[index])) {
        while (index < text.length && isLetter(text[index])) index += 1;
        tokens.push({ type: "word", text: text.slice(start, index) });
      } else {
        while (index < text.length && !isSpace(text[index]) && !isLetter(text[index])) index += 1;
        tokens.push({ type: "punct", text: text.slice(start, index) });
      }
    }
    return tokens;
  };

  // src/components/componentTextReader/componentTextReader.ts
  var ComponentTextReader = class extends i4 {
    constructor() {
      super(...arguments);
      this.text = "";
      this.dictionary = [];
      this.pageSize = 100;
      this.pageIndex = 0;
    }
    static {
      this.styles = [
        styles.hostStyle,
        styles.designTokens,
        styles.themeTokens,
        styles.accentTokens,
        styles.buttonStyle,
        i`
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
    `
      ];
    }
    willUpdate(changed) {
      if (changed.has("text") && !changed.has("pageIndex")) {
        this.pageIndex = 0;
      }
    }
    get pages() {
      const tokens = tokenize(this.text);
      const size = Math.max(1, Math.floor(this.pageSize));
      const pages = [];
      let page = [];
      let wordCount = 0;
      for (const token of tokens) {
        page.push(token);
        if (token.type === "word") {
          wordCount += 1;
          if (wordCount >= size) {
            pages.push(page);
            page = [];
            wordCount = 0;
          }
        }
      }
      if (page.length > 0) {
        pages.push(page);
      }
      return pages.length > 0 ? pages : [[]];
    }
    get statusMap() {
      return new Map(this.dictionary.map((entry) => [entry.word.toLocaleLowerCase(), entry.status]));
    }
    onPrevious() {
      if (this.pageIndex > 0) {
        this.pageIndex -= 1;
        this.emitPageChange();
      }
    }
    onNext() {
      if (this.pageIndex < this.pages.length - 1) {
        this.pageIndex += 1;
        this.emitPageChange();
      }
    }
    emitPageChange() {
      this.dispatchEvent(
        new CustomEvent("page-change", {
          detail: { pageIndex: this.pageIndex, pageCount: this.pages.length },
          bubbles: true,
          composed: true
        })
      );
    }
    onWordClick(word, event) {
      const rect = event.currentTarget.getBoundingClientRect();
      this.dispatchEvent(
        new CustomEvent("word-click", {
          detail: {
            word,
            x: rect.left + rect.width / 2,
            y: rect.bottom
          },
          bubbles: true,
          composed: true
        })
      );
    }
    render() {
      const pages = this.pages;
      const pageCount = pages.length;
      const currentIndex = Math.min(this.pageIndex, pageCount - 1);
      const current = pages[currentIndex] ?? [];
      const statusMap = this.statusMap;
      return b2`
      <div class="reader">
        <p class="reader-text">${current.map((token) => {
        if (token.type !== "word") {
          return token.text;
        }
        const status = statusMap.get(token.text.toLocaleLowerCase()) ?? "none";
        const className = status === "none" ? "word" : `word word--${status}`;
        return b2`<span class=${className} @click=${(event) => this.onWordClick(token.text, event)}>${token.text}</span>`;
      })}</p>
        <div class="controls">
          <button class="hzt-button" ?disabled=${currentIndex === 0} @click=${this.onPrevious}>Anterior</button>
          <span class="page-info">Página ${currentIndex + 1} de ${pageCount}</span>
          <button class="hzt-button hzt-button--primary" ?disabled=${currentIndex === pageCount - 1} @click=${this.onNext}>
            Siguiente
          </button>
        </div>
      </div>
    `;
    }
  };
  __decorateClass([
    n4({ type: String })
  ], ComponentTextReader.prototype, "text", 2);
  __decorateClass([
    n4({ type: Array })
  ], ComponentTextReader.prototype, "dictionary", 2);
  __decorateClass([
    n4({ type: Number })
  ], ComponentTextReader.prototype, "pageSize", 2);
  __decorateClass([
    n4({ type: Number })
  ], ComponentTextReader.prototype, "pageIndex", 2);

  // src/components/componentTextReader/index.ts
  register("component-text-reader", ComponentTextReader);

  // src/components/componentWordTooltip/componentWordTooltip.ts
  var EDGE_MARGIN = 8;
  var BELOW_OFFSET = 8;
  var ComponentWordTooltip = class extends i4 {
    constructor() {
      super(...arguments);
      this.position = { left: 0, top: 0 };
      this.onDocumentClick = (event) => {
        if (!event.composedPath().includes(this)) {
          this.emitClose();
        }
      };
      this.onKeyDown = (event) => {
        if (event.key === "Escape") {
          this.emitClose();
        }
      };
    }
    static {
      this.styles = [
        styles.hostStyle,
        styles.designTokens,
        styles.themeTokens,
        styles.accentTokens,
        styles.headerStyle,
        styles.buttonStyle,
        i`
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
    `
      ];
    }
    connectedCallback() {
      super.connectedCallback();
      document.addEventListener("click", this.onDocumentClick, true);
      document.addEventListener("keydown", this.onKeyDown, true);
    }
    disconnectedCallback() {
      document.removeEventListener("click", this.onDocumentClick, true);
      document.removeEventListener("keydown", this.onKeyDown, true);
      super.disconnectedCallback();
    }
    firstUpdated() {
      this.renderRoot.querySelector(".tooltip")?.focus({ preventScroll: true });
      this.clampPosition();
    }
    updated(changed) {
      if (changed.has("x") || changed.has("y") || changed.has("word") || changed.has("entry")) {
        this.clampPosition();
      }
    }
    clampPosition() {
      const tooltip = this.renderRoot.querySelector(".tooltip");
      if (!tooltip) {
        return;
      }
      const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      const left = Math.max(
        EDGE_MARGIN,
        Math.min(this.x ?? 0, window.innerWidth - width - EDGE_MARGIN)
      );
      const top = Math.max(
        EDGE_MARGIN,
        Math.min((this.y ?? 0) + BELOW_OFFSET, window.innerHeight - height - EDGE_MARGIN)
      );
      if (left !== this.position.left || top !== this.position.top) {
        this.position = { left, top };
      }
    }
    emitSave(status) {
      const word = this.normalizeWord();
      if (!word) {
        return;
      }
      const entry = {
        word,
        status: status === "known" ? "known" : "unknown",
        ...this.entry?.translation ? { translation: this.entry.translation } : {},
        ...this.entry?.note ? { note: this.entry.note } : {}
      };
      this.dispatchEvent(
        new CustomEvent("save-entry", {
          detail: { entry },
          bubbles: true,
          composed: true
        })
      );
    }
    emitAdd() {
      this.emitSave("unknown");
    }
    emitClose() {
      this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    }
    normalizeWord() {
      return (this.word ?? "").trim().toLocaleLowerCase();
    }
    render() {
      const status = this.entry?.status ?? "unknown";
      const statusText = status === "known" ? "Conocida" : "Nueva";
      return b2`
      <div
        class="tooltip"
        role="dialog"
        aria-label="Detalle de la palabra ${this.word ?? ""}"
        tabindex="-1"
        style="left: ${this.position.left}px; top: ${this.position.top}px;"
      >
        <header class="tooltip-header">
          <h3>${this.word ?? ""}</h3>
          <button
            class="hzt-button hzt-button--text close-button"
            aria-label="Cerrar"
            @click=${this.emitClose}
          >
            ×
          </button>
        </header>

        ${this.entry ? b2`<span class="badge badge--${status}">${statusText}</span>` : b2`<p class="no-entry">Esta palabra no está en el diccionario.</p>`}
        ${this.entry?.translation ? b2`<p class="translation">${this.entry.translation}</p>` : ""}
        ${this.entry?.note ? b2`<p class="note">${this.entry.note}</p>` : ""}

        <div class="actions">
          ${this.entry ? b2`
                <button
                  class="hzt-button hzt-button--${status === "known" ? "primary" : "outline"}"
                  @click=${() => this.emitSave("known")}
                >
                  Marcar conocida
                </button>
                <button
                  class="hzt-button hzt-button--${status === "unknown" ? "primary" : "outline"}"
                  @click=${() => this.emitSave("unknown")}
                >
                  Marcar nueva
                </button>
              ` : b2`
                <button class="hzt-button hzt-button--primary" @click=${this.emitAdd}>
                  Añadir al diccionario
                </button>
              `}
        </div>
      </div>
    `;
    }
  };
  __decorateClass([
    n4({ type: String })
  ], ComponentWordTooltip.prototype, "word", 2);
  __decorateClass([
    n4({ type: Object })
  ], ComponentWordTooltip.prototype, "entry", 2);
  __decorateClass([
    n4({ type: Number })
  ], ComponentWordTooltip.prototype, "x", 2);
  __decorateClass([
    n4({ type: Number })
  ], ComponentWordTooltip.prototype, "y", 2);
  __decorateClass([
    r5()
  ], ComponentWordTooltip.prototype, "position", 2);

  // src/components/componentWordTooltip/index.ts
  register("component-word-tooltip", ComponentWordTooltip);

  // src/components/pageReading/pageReading.ts
  var PageReading = class extends Page {
    constructor() {
      super(...arguments);
      this.bookId = "";
      this.chapters = [];
      this.chapterIndex = 0;
      this.pageIndex = 0;
      this.dictionary = [];
      this.loading = true;
      this.error = "";
      this.loadStarted = false;
    }
    willUpdate(changed) {
      if (changed.has("bookId") && this.bookId) {
        void this.ensureLoaded();
      }
    }
    async onPageInit() {
      await this.ensureLoaded();
    }
    async ensureLoaded() {
      if (this.loadStarted) {
        return;
      }
      this.loadStarted = true;
      try {
        const id = this.bookId || this.getBookIdFromQuery();
        await this.loadBook(id);
      } finally {
        this.loadStarted = false;
      }
    }
    getBookIdFromQuery() {
      return this.getQueryParamsURL().get("bookId") ?? "";
    }
    async loadBook(id) {
      if (!id) {
        this.error = "No se ha indicado ning\xFAn libro.";
        this.loading = false;
        return;
      }
      this.loading = true;
      this.error = "";
      this.tooltip = void 0;
      this.tooltipEntry = void 0;
      const book = await this.api.getBook(id);
      if (!book) {
        this.error = "Libro no encontrado.";
        this.loading = false;
        return;
      }
      const [chapters, progress, entries] = await Promise.all([
        this.api.getChapters(id),
        this.api.getProgress(id),
        this.api.getAllEntries()
      ]);
      const lastChapter = Math.max(0, chapters.length - 1);
      this.book = book;
      this.chapters = chapters;
      this.dictionary = entries;
      this.chapterIndex = Math.min(progress?.chapterIndex ?? 0, lastChapter);
      this.pageIndex = progress?.pageIndex ?? 0;
      this.loading = false;
    }
    async persistProgress() {
      await this.api.saveProgress({
        bookId: this.bookId,
        chapterIndex: this.chapterIndex,
        pageIndex: this.pageIndex
      });
    }
    async onPageChange(event) {
      const { pageIndex } = event.detail;
      this.pageIndex = pageIndex;
      await this.persistProgress();
    }
    async onPreviousChapter() {
      if (this.chapterIndex > 0) {
        await this.loadChapter(this.chapterIndex - 1);
      }
    }
    async onNextChapter() {
      if (this.chapterIndex < this.chapters.length - 1) {
        await this.loadChapter(this.chapterIndex + 1);
      }
    }
    async loadChapter(index) {
      this.chapterIndex = index;
      this.pageIndex = 0;
      await this.persistProgress();
    }
    async onWordClick(event) {
      const { word, x: x2, y: y3 } = event.detail;
      const entry = await this.api.lookupWord(word);
      this.tooltip = { word, x: x2, y: y3 };
      this.tooltipEntry = entry;
    }
    onTooltipClose() {
      this.tooltip = void 0;
      this.tooltipEntry = void 0;
    }
    async onTooltipSave(event) {
      const { entry } = event.detail;
      const saved = await this.api.upsertEntry(entry);
      this.tooltipEntry = saved;
      this.dictionary = await this.api.getAllEntries();
    }
    render() {
      if (this.error) {
        return b2`
        <div>
          <p class="error" role="alert">${this.error}</p>
          <button class="hzt-button" @click=${() => this.triggerPageNavigation({ page: "library" })}>
            Volver a la biblioteca
          </button>
        </div>
      `;
      }
      if (this.loading) {
        return b2`<p class="empty" aria-live="polite">Cargando...</p>`;
      }
      const chapter = this.chapters[this.chapterIndex];
      if (!this.book || this.chapters.length === 0 || !chapter) {
        return b2`<p class="empty">Este libro no tiene capítulos.</p>`;
      }
      const isFirst = this.chapterIndex === 0;
      const isLast = this.chapterIndex === this.chapters.length - 1;
      return b2`
      <div>
        <header>
          <div class="toolbar">
            <h1>${this.book.title}</h1>
          <button class="hzt-button hzt-button--text" @click=${() => this.triggerPageNavigation({ page: "library" })}>
              Volver a la biblioteca
            </button>
          </div>
          <p class="chapter-title">${chapter.title}</p>
          <div class="chapter-controls">
            <button class="hzt-button" ?disabled=${isFirst} @click=${this.onPreviousChapter}>
              Capítulo anterior
            </button>
            <span class="chapter-info"
              >Capítulo ${this.chapterIndex + 1} de ${this.chapters.length}</span
            >
            <button
              class="hzt-button hzt-button--primary"
              ?disabled=${isLast}
              @click=${this.onNextChapter}
            >
              Capítulo siguiente
            </button>
          </div>
        </header>

        <component-text-reader
          .text=${chapter.text}
          .dictionary=${this.dictionary}
          .pageIndex=${this.pageIndex}
          @page-change=${this.onPageChange}
          @word-click=${this.onWordClick}
        ></component-text-reader>

        ${this.tooltip ? b2`
              <component-word-tooltip
                .word=${this.tooltip.word}
                .entry=${this.tooltipEntry}
                .x=${this.tooltip.x}
                .y=${this.tooltip.y}
                @save-entry=${this.onTooltipSave}
                @close=${this.onTooltipClose}
              ></component-word-tooltip>
            ` : ""}
      </div>
    `;
    }
  };
  PageReading.styles = [
    ...Page.styles,
    styles.headerStyle,
    styles.buttonStyle,
    i`
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
    `
  ];
  __decorateClass([
    n4({ type: String })
  ], PageReading.prototype, "bookId", 2);
  __decorateClass([
    r5()
  ], PageReading.prototype, "book", 2);
  __decorateClass([
    r5()
  ], PageReading.prototype, "chapters", 2);
  __decorateClass([
    r5()
  ], PageReading.prototype, "chapterIndex", 2);
  __decorateClass([
    r5()
  ], PageReading.prototype, "pageIndex", 2);
  __decorateClass([
    r5()
  ], PageReading.prototype, "dictionary", 2);
  __decorateClass([
    r5()
  ], PageReading.prototype, "tooltip", 2);
  __decorateClass([
    r5()
  ], PageReading.prototype, "tooltipEntry", 2);
  __decorateClass([
    r5()
  ], PageReading.prototype, "loading", 2);
  __decorateClass([
    r5()
  ], PageReading.prototype, "error", 2);
  PageReading = __decorateClass([
    api({
      getBook,
      getChapters,
      getProgress,
      saveProgress,
      getAllEntries,
      lookupWord: lookup,
      upsertEntry
    })
  ], PageReading);

  // src/components/pageReading/index.ts
  register("page-reading", PageReading);

  // src/components/componentDictionaryEntryRow/componentDictionaryEntryRow.ts
  var ComponentDictionaryEntryRow = class extends i4 {
    static {
      this.styles = [
        styles.hostStyle,
        styles.designTokens,
        styles.themeTokens,
        styles.accentTokens,
        styles.headerStyle,
        styles.cardStyle,
        styles.buttonStyle,
        i`
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
    `
      ];
    }
    render() {
      const status = this.entry?.status ?? "unknown";
      const statusText = status === "known" ? "Conocida" : "Nueva";
      return b2`
      <article class="entry-row hzt-card">
        <div class="entry-info">
          <h2>${this.entry?.word ?? ""}</h2>
          <span class="badge badge--${status}">${statusText}</span>
          ${this.entry?.note ? b2`<p class="note">${this.entry.note}</p>` : ""}
        </div>
        <div class="actions">
          <button class="hzt-button hzt-button--outline" @click=${this.emitEdit}>Editar</button>
          <button class="hzt-button hzt-button--destructive" @click=${this.emitDelete}>Eliminar</button>
        </div>
      </article>
    `;
    }
    emitEdit() {
      if (!this.entry) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("edit-entry", {
          detail: { word: this.entry.word },
          bubbles: true,
          composed: true
        })
      );
    }
    emitDelete() {
      if (!this.entry) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("delete-entry", {
          detail: { word: this.entry.word },
          bubbles: true,
          composed: true
        })
      );
    }
  };
  __decorateClass([
    n4({ type: Object })
  ], ComponentDictionaryEntryRow.prototype, "entry", 2);

  // src/components/componentDictionaryEntryRow/index.ts
  register("component-dictionary-entry-row", ComponentDictionaryEntryRow);

  // src/components/componentDictionaryForm/componentDictionaryForm.ts
  var ComponentDictionaryForm = class extends i4 {
    constructor() {
      super(...arguments);
      this.draft = { word: "", status: "unknown", translation: "", note: "" };
      this.showError = false;
    }
    static {
      this.styles = [
        styles.hostStyle,
        styles.designTokens,
        styles.themeTokens,
        styles.accentTokens,
        styles.headerStyle,
        styles.cardStyle,
        styles.buttonStyle,
        i`
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
    `
      ];
    }
    willUpdate(changed) {
      if (changed.has("entry")) {
        this.draft = this.entry ? {
          word: this.entry.word,
          status: this.entry.status,
          translation: this.entry.translation ?? "",
          note: this.entry.note ?? ""
        } : { word: "", status: "unknown", translation: "", note: "" };
        this.showError = false;
      }
    }
    render() {
      return b2`
      <form class="entry-form hzt-card" @submit=${this.handleSubmit}>
        <h2>${this.entry ? "Editar entrada" : "Nueva entrada"}</h2>

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
                .checked=${this.draft.status === "known"}
                @change=${this.selectKnown}
              />
              Conocida
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="unknown"
                .checked=${this.draft.status === "unknown"}
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

        ${this.showError ? b2`<p class="error" role="alert">La palabra es obligatoria</p>` : ""}

        <div class="actions">
          <button type="button" class="hzt-button hzt-button--outline" @click=${this.emitCancel}>
            Cancelar
          </button>
          <button type="submit" class="hzt-button hzt-button--primary">Guardar</button>
        </div>
      </form>
    `;
    }
    handleWordInput(event) {
      const value = event.target.value;
      this.draft = { ...this.draft, word: value };
      if (this.showError) {
        this.showError = false;
      }
    }
    handleTranslationInput(event) {
      const value = event.target.value;
      this.draft = { ...this.draft, translation: value };
    }
    handleNoteInput(event) {
      const value = event.target.value;
      this.draft = { ...this.draft, note: value };
    }
    selectKnown() {
      this.draft = { ...this.draft, status: "known" };
    }
    selectUnknown() {
      this.draft = { ...this.draft, status: "unknown" };
    }
    handleSubmit(event) {
      event.preventDefault();
      const word = this.draft.word.trim();
      if (!word) {
        this.showError = true;
        return;
      }
      const translation = this.draft.translation.trim();
      const note = this.draft.note.trim();
      const entry = {
        word,
        status: this.draft.status,
        ...translation ? { translation } : {},
        ...note ? { note } : {}
      };
      this.dispatchEvent(
        new CustomEvent("save-entry", {
          detail: { entry },
          bubbles: true,
          composed: true
        })
      );
    }
    emitCancel() {
      this.dispatchEvent(new CustomEvent("cancel-entry", { bubbles: true, composed: true }));
    }
  };
  __decorateClass([
    n4({ type: Object })
  ], ComponentDictionaryForm.prototype, "entry", 2);
  __decorateClass([
    r5()
  ], ComponentDictionaryForm.prototype, "draft", 2);
  __decorateClass([
    r5()
  ], ComponentDictionaryForm.prototype, "showError", 2);

  // src/components/componentDictionaryForm/index.ts
  register("component-dictionary-form", ComponentDictionaryForm);

  // src/components/pageDictionary/pageDictionary.ts
  var PageDictionary = class extends Page {
    constructor() {
      super(...arguments);
      this.entries = [];
      this.search = "";
      this.showForm = false;
    }
    async onPageInit() {
      await this.loadEntries();
    }
    async loadEntries() {
      this.entries = await this.api.getEntries();
    }
    get filteredEntries() {
      const query = this.search.trim().toLocaleLowerCase();
      if (!query) {
        return this.entries;
      }
      return this.entries.filter(
        (entry) => entry.word.toLocaleLowerCase().includes(query) || (entry.translation ?? "").toLocaleLowerCase().includes(query) || (entry.note ?? "").toLocaleLowerCase().includes(query)
      );
    }
    onSearchInput(event) {
      this.search = event.target.value;
    }
    onAddClick() {
      this.editing = void 0;
      this.showForm = true;
    }
    onEditEntry(event) {
      const { word } = event.detail;
      this.editing = this.entries.find((entry) => entry.word === word);
      this.showForm = true;
    }
    async onDeleteEntry(event) {
      const { word } = event.detail;
      if (!window.confirm("\xBFSeguro que quieres eliminar la entrada?")) {
        return;
      }
      await this.api.deleteEntry(word);
      await this.loadEntries();
    }
    async onSaveEntry(event) {
      const { entry } = event.detail;
      await this.api.upsertEntry(entry);
      this.showForm = false;
      this.editing = void 0;
      await this.loadEntries();
    }
    onCancelEntry() {
      this.showForm = false;
      this.editing = void 0;
    }
    render() {
      const entries = this.filteredEntries;
      return b2`
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

        ${this.showForm ? b2`
              <div class="form-wrap">
                <component-dictionary-form
                  .entry=${this.editing}
                  @save-entry=${this.onSaveEntry}
                  @cancel-entry=${this.onCancelEntry}
                ></component-dictionary-form>
              </div>
            ` : ""}

        <div class="entries">
          ${entries.length === 0 ? b2`
                <p class="empty">
                  ${this.entries.length === 0 ? "A\xFAn no hay entradas." : "No hay resultados para tu b\xFAsqueda."}
                </p>
              ` : entries.map(
        (entry) => b2`
                  <component-dictionary-entry-row
                    .entry=${entry}
                    @edit-entry=${this.onEditEntry}
                    @delete-entry=${this.onDeleteEntry}
                  ></component-dictionary-entry-row>
                `
      )}
        </div>
      </div>
    `;
    }
  };
  PageDictionary.styles = [
    ...Page.styles,
    styles.headerStyle,
    styles.buttonStyle,
    i`
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
    `
  ];
  __decorateClass([
    r5()
  ], PageDictionary.prototype, "entries", 2);
  __decorateClass([
    r5()
  ], PageDictionary.prototype, "search", 2);
  __decorateClass([
    r5()
  ], PageDictionary.prototype, "showForm", 2);
  __decorateClass([
    r5()
  ], PageDictionary.prototype, "editing", 2);
  PageDictionary = __decorateClass([
    api({ getEntries: getAllEntries, upsertEntry, deleteEntry: removeEntry })
  ], PageDictionary);

  // src/components/pageDictionary/index.ts
  register("page-dictionary", PageDictionary);

  // src/components/pageHiztegiApp/index.ts
  register("page-hiztegi-app", PageHiztegiApp);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
