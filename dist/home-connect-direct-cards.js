/*!
MIT License

Copyright (c) 2026 Asmir1975
Copyright (c) 2026 leMax6608

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Bundled Lit packages:
BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
const J = globalThis, re = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ae = /* @__PURE__ */ Symbol(), pe = /* @__PURE__ */ new WeakMap();
let Te = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ae) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (re && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = pe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && pe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const qe = (n) => new Te(typeof n == "string" ? n : n + "", void 0, ae), B = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new Te(t, n, ae);
}, We = (n, e) => {
  if (re) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = J.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, n.appendChild(i);
  }
}, ge = re ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return qe(t);
})(n) : n;
const { is: Ve, defineProperty: Ke, getOwnPropertyDescriptor: Ge, getOwnPropertyNames: Je, getOwnPropertySymbols: Ye, getPrototypeOf: Qe } = Object, X = globalThis, me = X.trustedTypes, Xe = me ? me.emptyScript : "", et = X.reactiveElementPolyfillSupport, L = (n, e) => n, se = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Xe : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, Pe = (n, e) => !Ve(n, e), fe = { attribute: !0, type: String, converter: se, reflect: !1, useDefault: !1, hasChanged: Pe };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), X.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let T = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = fe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Ke(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: o } = Ge(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: s, set(r) {
      const l = s?.call(this);
      o?.call(this, r), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const e = Qe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const t = this.properties, i = [...Je(t), ...Ye(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(ge(s));
    } else e !== void 0 && t.push(ge(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return We(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : se).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : se;
      this._$Em = s;
      const l = r.fromAttribute(t, o.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, o) {
    if (e !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[e]), i ??= r.getPropertyOptions(e), !((i.hasChanged ?? Pe)(o, t) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), o !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: r } = o, l = this[s];
        r !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, o, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[L("elementProperties")] = /* @__PURE__ */ new Map(), T[L("finalized")] = /* @__PURE__ */ new Map(), et?.({ ReactiveElement: T }), (X.reactiveElementVersions ??= []).push("2.1.2");
const le = globalThis, ye = (n) => n, Q = le.trustedTypes, be = Q ? Q.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Me = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, Ne = "?" + x, tt = `<${Ne}>`, E = document, F = () => E.createComment(""), U = (n) => n === null || typeof n != "object" && typeof n != "function", ce = Array.isArray, it = (n) => ce(n) || typeof n?.[Symbol.iterator] == "function", te = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ve = /-->/g, we = />/g, A = RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $e = /'/g, ke = /"/g, Ie = /^(?:script|style|textarea|title)$/i, nt = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), h = nt(1), C = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), S = E.createTreeWalker(E, 129);
function Oe(n, e) {
  if (!ce(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return be !== void 0 ? be.createHTML(e) : e;
}
const st = (n, e) => {
  const t = n.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = H;
  for (let l = 0; l < t; l++) {
    const a = n[l];
    let c, p, u = -1, g = 0;
    for (; g < a.length && (r.lastIndex = g, p = r.exec(a), p !== null); ) g = r.lastIndex, r === H ? p[1] === "!--" ? r = ve : p[1] !== void 0 ? r = we : p[2] !== void 0 ? (Ie.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = A) : p[3] !== void 0 && (r = A) : r === A ? p[0] === ">" ? (r = s ?? H, u = -1) : p[1] === void 0 ? u = -2 : (u = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? A : p[3] === '"' ? ke : $e) : r === ke || r === $e ? r = A : r === ve || r === we ? r = H : (r = A, s = void 0);
    const m = r === A && n[l + 1].startsWith("/>") ? " " : "";
    o += r === H ? a + tt : u >= 0 ? (i.push(c), a.slice(0, u) + Me + a.slice(u) + x + m) : a + x + (u === -2 ? l : m);
  }
  return [Oe(n, o + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const l = e.length - 1, a = this.parts, [c, p] = st(e, t);
    if (this.el = j.createElement(c, i), S.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = S.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(Me)) {
          const g = p[r++], m = s.getAttribute(u).split(x), k = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: o, name: k[2], strings: m, ctor: k[1] === "." ? rt : k[1] === "?" ? at : k[1] === "@" ? lt : ee }), s.removeAttribute(u);
        } else u.startsWith(x) && (a.push({ type: 6, index: o }), s.removeAttribute(u));
        if (Ie.test(s.tagName)) {
          const u = s.textContent.split(x), g = u.length - 1;
          if (g > 0) {
            s.textContent = Q ? Q.emptyScript : "";
            for (let m = 0; m < g; m++) s.append(u[m], F()), S.nextNode(), a.push({ type: 2, index: ++o });
            s.append(u[g], F());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ne) a.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(x, u + 1)) !== -1; ) a.push({ type: 7, index: o }), u += x.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = E.createElement("template");
    return i.innerHTML = e, i;
  }
}
function O(n, e, t = n, i) {
  if (e === C) return e;
  let s = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const o = U(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = s : t._$Cl = s), s !== void 0 && (e = O(n, s._$AS(n, e.values), s, i)), e;
}
class ot {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, s = (e?.creationScope ?? E).importNode(t, !0);
    S.currentNode = s;
    let o = S.nextNode(), r = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new q(o, o.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (c = new ct(o, this, e)), this._$AV.push(c), a = i[++l];
      }
      r !== a?.index && (o = S.nextNode(), r++);
    }
    return S.currentNode = E, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class q {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = O(this, e, t), U(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== C && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : it(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = j.createElement(Oe(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(t);
    else {
      const o = new ot(s, this), r = o.u(this.options);
      o.p(t), this.T(r), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = xe.get(e.strings);
    return t === void 0 && xe.set(e.strings, t = new j(e)), t;
  }
  k(e) {
    ce(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new q(this.O(F()), this.O(F()), this, this.options)) : i = t[s], i._$AI(o), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = ye(e).nextSibling;
      ye(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ee {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(e, t = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = O(this, e, t, 0), r = !U(e) || e !== this._$AH && e !== C, r && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = o[0], a = 0; a < o.length - 1; a++) c = O(this, l[i + a], t, a), c === C && (c = this._$AH[a]), r ||= !U(c) || c !== this._$AH[a], c === d ? e = d : e !== d && (e += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    r && !s && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class rt extends ee {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class at extends ee {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class lt extends ee {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = O(this, e, t, 0) ?? d) === C) return;
    const i = this._$AH, s = e === d && i !== d || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== d && (i === d || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ct {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const dt = le.litHtmlPolyfillSupport;
dt?.(j, q), (le.litHtmlVersions ??= []).push("3.3.3");
const ht = (n, e, t) => {
  const i = t?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = t?.renderBefore ?? null;
    i._$litPart$ = s = new q(e.insertBefore(F(), o), o, void 0, t ?? {});
  }
  return s._$AI(n), s;
};
const de = globalThis;
let $ = class extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ht(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return C;
  }
};
$._$litElement$ = !0, $.finalized = !0, de.litElementHydrateSupport?.({ LitElement: $ });
const _t = de.litElementPolyfillSupport;
_t?.({ LitElement: $ });
(de.litElementVersions ??= []).push("4.2.2");
const ut = {
  connection_entity: ["connection"],
  acknowledge_event_entity: ["button_acknowledge_event"],
  power_entity: [
    "switch_power_state",
    "select_power_state"
  ],
  status_entity: [
    "sensor_power_state"
  ],
  operating_state_entity: [
    "sensor_operation_state"
  ],
  selected_program_entity: [
    "select_program"
  ],
  active_program_entity: [
    "sensor_active_program"
  ],
  progress_entity: [
    "sensor_program_progress"
  ],
  remaining_time_entity: [
    "sensor_remaining_program_time"
  ],
  start_entity: [
    "button_start_program"
  ],
  pause_entity: [
    "button_pause_program"
  ],
  resume_entity: [
    "button_resume_program"
  ],
  cancel_entity: [
    "button_abort_program"
  ],
  door_entity: [
    "binary_sensor_door_state",
    "sensor_door_state"
  ],
  child_lock_entity: [
    "switch_child_lock"
  ],
  duration_entity: [
    "number_duration"
  ],
  start_in_entity: [
    "number_start_in"
  ],
  finish_at_entity: [
    "sensor_finish_in"
  ]
}, pt = {
  coffee: {
    bean_amount_entity: [
      "select_bean_amount"
    ],
    fill_quantity_entity: [
      "number_fill_quantity"
    ],
    fill_quantity_select_entity: [
      "select_coffee_fill_quantity"
    ],
    coffee_temperature_entity: [
      "select_coffee_temperature"
    ],
    milk_ratio_entity: [
      "select_coffee_milk_ratio"
    ],
    bean_container_entity: [
      "select_bean_container"
    ],
    water_temperature_entity: [
      "select_hot_water_temperature"
    ],
    flow_rate_entity: [
      "select_flow_rate"
    ],
    multiple_beverages_entity: [
      "switch_multiple_beverages"
    ],
    water_tank_entity: [
      "sensor_water_tank"
    ],
    beans_empty_entity: [
      "binary_sensor_bean_container_empty"
    ],
    drip_tray_entity: [
      "sensor_drip_tray"
    ],
    cup_warmer_entity: [
      "switch_cup_warmer"
    ],
    messages_entity: [
      "sensor_eq700_messages"
    ],
    problem_entity: [
      "binary_sensor_eq700_problem"
    ],
    grounds_container_entity: [
      "sensor_pomace_container"
    ],
    bean_container_status_entity: [
      "sensor_bean_container"
    ],
    shot_count_entity: [
      "sensor_shot_count"
    ],
    aroma_entity: [
      "select_aroma_select"
    ],
    favorite_order_entity: [
      "select_favorite_order"
    ],
    phase_entity: [
      "sensor_coffeemaker_process_phase"
    ]
  },
  oven: {
    current_temperature_entity: [
      "sensor_oven_current_temperature",
      "sensor_oven_current_temperature_{cavity}"
    ],
    target_temperature_entity: [
      "number_oven_setpoint_temperature"
    ],
    level_entity: [
      "select_oven_level"
    ],
    rapid_preheat_entity: [
      "switch_oven_fast_pre_heat"
    ],
    water_tank_entity: [
      "sensor_oven_water_tank",
      "sensor_oven_water_tank_{cavity}"
    ],
    alarm_entity: [
      "number_setting_alarm_clock",
      "number_oven_setting_{cavity}_alarm_clock"
    ],
    display_brightness_entity: [
      "number_oven_display_brightness"
    ],
    key_tones_entity: [
      "switch_oven_button_tones"
    ],
    cooling_fan_entity: [
      "select_oven_cooling_fan_runtime"
    ],
    tone_duration_entity: [
      "select_oven_signal_duration"
    ],
    messages_entity: [
      "sensor_oven_message_{cavity}"
    ],
    meatprobe_temperature_entity: [
      "sensor_oven_cavity_meatprobe_temperature_{cavity}",
      "sensor_oven_current_meatprobe_temperature"
    ],
    meatprobe_target_entity: [
      "sensor_oven_meatprobe_target_temperature_{cavity}"
    ],
    meatprobe_plugged_entity: [
      "binary_sensor_oven_cavity_meatprobe_plugged_{cavity}"
    ]
  },
  dishwasher: {
    water_entity: [
      "sensor_water_forecast"
    ],
    energy_entity: [
      "sensor_energy_forecast"
    ],
    salt_entity: [
      "sensor_salt"
    ],
    rinse_aid_entity: [
      "sensor_rinse_aid"
    ],
    vario_speed_entity: [
      "switch_vario_speed_plus"
    ],
    hygiene_entity: [
      "switch_hygiene_plus"
    ],
    half_load_entity: [
      "switch_half_load"
    ],
    silent_entity: [
      "switch_silence_on_demand"
    ],
    care_entity: [
      "sensor_machine_care_reminder"
    ],
    messages_entity: [
      "sensor_dishwasher_message"
    ]
  },
  hood: {
    fan_entity: [
      "fan_hood"
    ],
    hood_level_entity: [
      "select_hood_venting_level"
    ],
    working_light_entity: [
      "light_cooking_lighting"
    ],
    ambient_light_entity: [
      "light_cooking_ambient_lighting"
    ],
    messages_entity: [
      "sensor_hood_filter_message"
    ],
    grease_filter_entity: [
      "sensor_grease_filter_saturation"
    ],
    carbon_filter_entity: [
      "sensor_carbon_filter_saturation"
    ],
    delayed_shutoff_entity: [
      "number_hood_delayed_shutoff_time"
    ],
    interval_on_entity: [
      "number_hood_interval_on"
    ],
    interval_off_entity: [
      "number_hood_interval_off"
    ],
    fan_profile_entity: [
      "select_hood_ventilation_profile"
    ],
    fan_startup_entity: [
      "select_hood_ventilation_startup"
    ],
    fan_shutdown_entity: [
      "select_hood_ventilation_shutdown"
    ],
    automatic_sensitivity_entity: [
      "number_hood_automatic_sensitivity"
    ],
    reset_grease_entity: [
      "button_hood_grease_filter_reset"
    ],
    reset_carbon_entity: [
      "button_hood_carbon_filter_reset"
    ]
  },
  hob: {
    alarm_entity: [
      "number_setting_alarm_clock"
    ],
    automatic_timer_entity: [
      "number_hob_automatic_timer"
    ],
    child_lock_entity: [
      "select_hob_automatic_key_lock"
    ],
    zone_100_state_entity: [
      "sensor_hob_zone_100_state"
    ],
    zone_100_operation_entity: [
      "sensor_hob_zone_100_operationstate"
    ],
    zone_100_power_entity: [
      "sensor_hob_zone_100_power_level"
    ],
    zone_100_remaining_entity: [
      "sensor_hob_zone_100_remaining_program_time"
    ],
    zone_100_frying_entity: [
      "sensor_hob_zone_100_frying_sensor_level"
    ],
    zone_100_progress_entity: [
      "sensor_hob_zone_100_program_progress"
    ],
    zone_200_state_entity: [
      "sensor_hob_zone_200_state"
    ],
    zone_200_operation_entity: [
      "sensor_hob_zone_200_operationstate"
    ],
    zone_200_power_entity: [
      "sensor_hob_zone_200_power_level"
    ],
    zone_200_remaining_entity: [
      "sensor_hob_zone_200_remaining_program_time"
    ],
    zone_200_frying_entity: [
      "sensor_hob_zone_200_frying_sensor_level"
    ],
    zone_200_progress_entity: [
      "sensor_hob_zone_200_program_progress"
    ],
    zone_300_state_entity: [
      "sensor_hob_zone_300_state"
    ],
    zone_300_operation_entity: [
      "sensor_hob_zone_300_operationstate"
    ],
    zone_300_power_entity: [
      "sensor_hob_zone_300_power_level"
    ],
    zone_300_remaining_entity: [
      "sensor_hob_zone_300_remaining_program_time"
    ],
    zone_300_frying_entity: [
      "sensor_hob_zone_300_frying_sensor_level"
    ],
    zone_300_progress_entity: [
      "sensor_hob_zone_300_program_progress"
    ],
    zone_400_state_entity: [
      "sensor_hob_zone_400_state"
    ],
    zone_400_operation_entity: [
      "sensor_hob_zone_400_operationstate"
    ],
    zone_400_power_entity: [
      "sensor_hob_zone_400_power_level"
    ],
    zone_400_remaining_entity: [
      "sensor_hob_zone_400_remaining_program_time"
    ],
    zone_400_frying_entity: [
      "sensor_hob_zone_400_frying_sensor_level"
    ],
    zone_400_progress_entity: [
      "sensor_hob_zone_400_program_progress"
    ],
    bridge_mode_entity: [
      "select_hob_bridge_zone_mode"
    ],
    hob_mode_entity: [
      "select_program"
    ],
    power_move_front_left_entity: [
      "select_hob_power_move_front_left"
    ],
    power_move_middle_left_entity: [
      "select_hob_power_move_middle_left"
    ],
    power_move_rear_left_entity: [
      "select_hob_power_move_rear_left"
    ],
    power_move_front_right_entity: [
      "select_hob_power_move_front_right"
    ],
    power_move_middle_right_entity: [
      "select_hob_power_move_middle_right"
    ],
    power_move_rear_right_entity: [
      "select_hob_power_move_rear_right"
    ]
  }
};
function gt(n, e, t) {
  if (n.platform !== "homeconnect_ws") return;
  const i = pt[e][t] || ut[t] || [], s = n.unique_id?.split("-").pop(), o = i.findIndex((r) => r === n.translation_key || s && new RegExp("^" + r.replace("{cavity}", "\\d+") + "$").test(s));
  return o < 0 ? -1e3 : 1e3 - o;
}
function ie(n) {
  return n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function mt(n, e, t, i) {
  const s = e.entity_id.split(".")[0];
  if (t.domains?.length && !t.domains.includes(s)) return -1e3;
  const o = gt(e, i.kind, t.key);
  if (o !== void 0) return n.states[e.entity_id] && n.states[e.entity_id].attributes.restored !== !0 ? o : -1e3;
  const r = n.states[e.entity_id], l = ie([
    e.entity_id,
    e.name,
    e.original_name,
    r?.attributes.friendly_name,
    r?.attributes.device_class,
    r?.attributes.unit_of_measurement,
    r?.attributes.icon
  ].filter(Boolean).join(" "));
  let a = 10;
  if (t.domains?.length) {
    const p = t.domains.indexOf(s);
    a += (t.domains.length - p) * 8;
  }
  for (const p of t.aliases || []) {
    const u = ie(p);
    l.includes(u) && (a = Math.max(a, 100 + u.length));
  }
  const c = ie(t.key.replace(/_entity$/, "")).split(" ");
  return a += c.filter((p) => l.includes(p)).length * 4, (e.disabled_by || e.hidden_by) && (a -= 50), a;
}
async function De(n, e, t, i) {
  const s = await n.callWS({ type: "config/entity_registry/list" }), o = i.device_id ? s.find((c) => c.device_id === i.device_id && c.platform === "homeconnect_ws" && !c.disabled_by && !c.hidden_by && n.states[c.entity_id] && n.states[c.entity_id].attributes.restored !== !0) : s.find((c) => c.entity_id === e);
  if (!o?.device_id) throw new Error("The selected device has no active integration entity, or the anchor has no device registry link.");
  const r = s.filter((c) => c.device_id === o.device_id && !c.disabled_by && !c.hidden_by && (o.platform !== "homeconnect_ws" || c.platform === "homeconnect_ws")), l = {}, a = new Set(Object.entries(i).filter(([c, p]) => c !== "entity" && typeof p == "string" && p.includes(".")).map(([, c]) => c));
  for (const c of t.fields) {
    if (c.key === "entity" || i[c.key]) continue;
    const p = r.filter((u) => !a.has(u.entity_id)).map((u) => ({ entry: u, score: mt(n, u, c, t) })).filter(({ score: u }) => u >= 50).sort((u, g) => g.score - u.score || u.entry.entity_id.localeCompare(g.entry.entity_id));
    p[0] && !(p[0].score >= 980 && p[1]?.score === p[0].score) && (l[c.key] = p[0].entry.entity_id, a.add(p[0].entry.entity_id));
  }
  return { anchor: o, candidates: r, suggestions: l };
}
async function Re(n, e, t, i) {
  return (await De(n, e, t, i)).suggestions;
}
function v(n) {
  return n?.device_id ? "device:" + n.device_id : n?.entity ? "entity:" + n.entity : "";
}
const ft = {
  "direct.move_rear": "Hinten",
  "direct.move_middle": "Mitte",
  "direct.move_front": "Vorne",
  "editor.manual_mapping": "Manuelle Zuordnung (optional)",
  "direct.select_device": "Wähle das Gerät im Karteneditor aus.",
  "editor.device": "Gerät",
  "field.bridge_mode_entity": "varioInduktion (Zonen verbinden)",
  "field.hob_mode_entity": "Betriebsart / PowerMode",
  "direct.join_missing": "Join-Entität nicht zugeordnet. Zonen-Verbindungsmodus in HA aktivieren oder im Editor zuordnen.",
  "field.power_move_front_left_entity": "powerMove-Stufe vorne links",
  "field.power_move_middle_left_entity": "powerMove-Stufe Mitte links",
  "field.power_move_rear_left_entity": "powerMove-Stufe hinten links",
  "field.power_move_front_right_entity": "powerMove-Stufe vorne rechts",
  "field.power_move_middle_right_entity": "powerMove-Stufe Mitte rechts",
  "field.power_move_rear_right_entity": "powerMove-Stufe hinten rechts",
  "field.connection_entity": "Verbindung",
  "direct.connected": "Verbunden",
  "direct.disconnected": "Gerät nicht verbunden",
  "device.hood": "Dunstabzugshaube",
  "device.hob": "Kochfeld",
  "direct.details": "Details & Einstellungen",
  "direct.residual_heat": "Restwärme",
  "direct.frying": "Bratsensor",
  "direct.hob_readonly": "Zonenwerte sind schreibgeschützt. Tippe eine Zone für Details an.",
  "field.fan_entity": "Lüfter",
  "field.hood_level_entity": "Haubenstufe",
  "field.working_light_entity": "Arbeitslicht",
  "field.ambient_light_entity": "Umgebungslicht",
  "field.grease_filter_entity": "Fettfilter-Sättigung",
  "field.carbon_filter_entity": "Aktivkohlefilter-Sättigung",
  "field.delayed_shutoff_entity": "Nachlaufzeit",
  "field.interval_on_entity": "Intervall Lüfter an",
  "field.interval_off_entity": "Intervall Lüfter aus",
  "field.fan_profile_entity": "Lüfterprofil",
  "field.fan_startup_entity": "Lüfter beim Einschalten",
  "field.fan_shutdown_entity": "Lüfter beim Ausschalten",
  "field.automatic_sensitivity_entity": "Sensibilität im Automatikmodus",
  "field.reset_grease_entity": "Fettfilter Status zurücksetzen",
  "field.reset_carbon_entity": "Aktivkohlefilter zurücksetzen",
  "field.automatic_timer_entity": "Automatischer Timer",
  "field.zone_100_state_entity": "Zone 100 · Status",
  "field.zone_100_operation_entity": "Zone 100 · Betriebszustand",
  "field.zone_100_power_entity": "Zone 100 · Leistungsstufe",
  "field.zone_100_remaining_entity": "Zone 100 · Restzeit",
  "field.zone_100_frying_entity": "Zone 100 · Bratsensor",
  "field.zone_100_progress_entity": "Zone 100 · Fortschritt",
  "field.zone_200_state_entity": "Zone 200 · Status",
  "field.zone_200_operation_entity": "Zone 200 · Betriebszustand",
  "field.zone_200_power_entity": "Zone 200 · Leistungsstufe",
  "field.zone_200_remaining_entity": "Zone 200 · Restzeit",
  "field.zone_200_frying_entity": "Zone 200 · Bratsensor",
  "field.zone_200_progress_entity": "Zone 200 · Fortschritt",
  "field.zone_300_state_entity": "Zone 300 · Status",
  "field.zone_300_operation_entity": "Zone 300 · Betriebszustand",
  "field.zone_300_power_entity": "Zone 300 · Leistungsstufe",
  "field.zone_300_remaining_entity": "Zone 300 · Restzeit",
  "field.zone_300_frying_entity": "Zone 300 · Bratsensor",
  "field.zone_300_progress_entity": "Zone 300 · Fortschritt",
  "field.zone_400_state_entity": "Zone 400 · Status",
  "field.zone_400_operation_entity": "Zone 400 · Betriebszustand",
  "field.zone_400_power_entity": "Zone 400 · Leistungsstufe",
  "field.zone_400_remaining_entity": "Zone 400 · Restzeit",
  "field.zone_400_frying_entity": "Zone 400 · Bratsensor",
  "field.zone_400_progress_entity": "Zone 400 · Fortschritt",
  "field.acknowledge_event_entity": "Meldung bestätigen",
  "field.start_in_entity": "Starten in",
  "field.messages_entity": "Meldungen",
  "field.fill_quantity_select_entity": "Menge",
  "field.aroma_entity": "aromaSelect",
  "field.shot_count_entity": "Schussanzahl",
  "field.problem_entity": "Problem",
  "field.grounds_container_entity": "Tresterbehälter",
  "field.bean_container_status_entity": "Bohnenbehälterstatus",
  "field.favorite_order_entity": "Favoritensortierung",
  "field.meatprobe_temperature_entity": "Aktuelle Bratenthermometer Temperatur",
  "field.meatprobe_target_entity": "Bratenthermometer Zieltemperatur",
  "field.meatprobe_plugged_entity": "Bratenthermometer eingesteckt",
  "section.general": "Allgemein",
  "section.program": "Programm",
  "section.actions": "Aktionen",
  "section.options": "Optionen",
  "section.status": "Status & Wartung",
  "section.settings": "Geräteeinstellungen",
  "section.appearance": "Darstellung",
  "section.layout": "Layout & Verhalten",
  "action.start": "Start",
  "action.pause": "Pause",
  "action.resume": "Fortsetzen",
  "action.cancel": "Abbrechen",
  "action.more_info": "Mehr Informationen",
  "action.toggle_details": "Details ein-/ausklappen",
  "action.confirm_cancel": "Abbrechen bestätigen",
  "action.dismiss": "Schließen",
  power: "Ein/Aus",
  progress: "Programmfortschritt",
  running: "Aktives Programm",
  paused: "Pausiert",
  ready: "Bereit",
  appliance_status: "Gerätestatus",
  working: "Wird ausgeführt…",
  not_configured: "Nicht konfiguriert",
  unavailable: "Nicht verfügbar",
  unknown: "Unbekannt",
  "device.dishwasher": "Spülmaschine",
  "device.oven": "Backofen",
  "device.coffee": "Kaffeemaschine",
  "field.entity": "Alternative: Anker-Entität",
  "field.power_entity": "Ein/Aus",
  "field.status_entity": "Status",
  "field.operating_state_entity": "Betriebszustand",
  "field.selected_program_entity": "Ausgewähltes Programm",
  "field.active_program_entity": "Aktives Programm",
  "field.progress_entity": "Programmfortschritt",
  "field.remaining_time_entity": "Restzeit",
  "field.start_entity": "Start",
  "field.pause_entity": "Pause",
  "field.resume_entity": "Fortsetzen",
  "field.cancel_entity": "Abbrechen",
  "field.phase_entity": "Programmphase",
  "field.door_entity": "Tür",
  "field.water_entity": "Geschätzter Wasserverbrauch",
  "field.energy_entity": "Geschätzter Energieverbrauch",
  "field.salt_entity": "Salz",
  "field.rinse_aid_entity": "Klarspüler",
  "field.vario_speed_entity": "VarioSpeed Plus",
  "field.hygiene_entity": "Hygiene Plus",
  "field.half_load_entity": "Halbe Ladung",
  "field.silent_entity": "Leise auf Knopfdruck",
  "field.care_entity": "Maschinenpflege Erinnerung",
  "field.filter_check_entity": "Filtersystem prüfen",
  "field.filter_entity": "Maschinenreinigungsfilter",
  "field.aquastop_entity": "AquaStop aufgetreten",
  "field.heater_scale_entity": "Wasserheizung verkalkt",
  "field.current_temperature_entity": "Aktuelle Temperatur",
  "field.target_temperature_entity": "Solltemperatur",
  "field.duration_entity": "Dauer",
  "field.level_entity": "Stufe",
  "field.rapid_preheat_entity": "Schnelles Vorheizen",
  "field.water_tank_entity": "Wassertank",
  "field.alarm_entity": "Alarm",
  "field.child_lock_entity": "Kindersicherung",
  "field.display_brightness_entity": "Displayhelligkeit",
  "field.key_tones_entity": "Tastenton",
  "field.cooling_fan_entity": "Gebläse-Nachlaufzeit",
  "field.tone_duration_entity": "Signalton",
  "field.power_state_entity": "Betriebszustand",
  "field.bean_amount_entity": "Stärke",
  "field.fill_quantity_entity": "Füllmenge",
  "field.coffee_temperature_entity": "Kaffeetemperatur",
  "field.milk_ratio_entity": "Kaffee-/Milch-Verhältnis",
  "field.bean_container_entity": "Bohnenbehälter",
  "field.water_temperature_entity": "Wassertemperatur",
  "field.flow_rate_entity": "Durchflussmenge",
  "field.multiple_beverages_entity": "Doppelbezug",
  "field.beans_empty_entity": "Bohnenbehälter leer",
  "field.drip_tray_entity": "Tropfschale",
  "field.cup_warmer_entity": "Tassenwärmer",
  "field.finish_at_entity": "Fertig in",
  "field.drying_target_entity": "Trockenziel",
  "field.speed_perfect_entity": "SpeedPerfect",
  "field.gentle_entity": "Sanft",
  "field.wrinkle_guard_entity": "Knitterschutz",
  "field.reload_entity": "Nachlegen möglich",
  "field.condensate_entity": "Kondensatbehälter",
  "field.lint_filter_entity": "Flusenfilter",
  "field.load_recommendation_entity": "Beladungsempfehlung",
  "field.drum_light_entity": "Trommellicht",
  "field.door_light_entity": "Tür-Ringlicht",
  "field.signal_volume_entity": "Signallautstärke",
  "field.brightness_entity": "Helligkeit",
  "field.auto_power_off_entity": "Automatische Abschaltung",
  "editor.intro": "Wähle dein Gerät. Alternativ kannst du eine Entität als Anker verwenden. Die automatische Erkennung nutzt die Geräte- und Entity-Registry und füllt nur leere Felder; jeder Vorschlag bleibt änderbar.",
  "editor.name": "Name überschreiben",
  "editor.icon": "Icon überschreiben",
  "editor.accent_color": "Akzentfarbe",
  "editor.detect": "Geräte-Entities erkennen",
  "editor.detected": "passende Entities ergänzt. Bitte alle Vorschläge vor dem Speichern prüfen.",
  "editor.no_matches": "Keine weiteren eindeutigen Zuordnungen gefunden.",
  "editor.copy_yaml": "YAML kopieren",
  "editor.copy_report": "Erkennungsbericht kopieren",
  "editor.program_names": "Programme manuell umbenennen",
  "editor.program_names_help": "Nur optionale Anzeigenamen. An Home Assistant wird weiterhin der unveränderte Originalwert gesendet.",
  "editor.custom_program_name": "Eigener Name",
  "editor.yaml_copied": "YAML-Konfiguration in die Zwischenablage kopiert.",
  "editor.report_copied": "Erkennungsbericht kopiert. Bitte vor dem Teilen persönliche Bezeichnungen prüfen.",
  "option.default_expanded": "Standardmäßig geöffnet",
  "option.animations": "Animationen",
  "option.confirm_cancel": "Programmabbruch durch zweiten Klick bestätigen",
  "option.show_progress": "Fortschritt anzeigen",
  "option.show_remaining_time": "Restzeit anzeigen",
  "option.show_status_section": "Statusbereich anzeigen",
  "option.show_options_section": "Optionsbereich anzeigen",
  "option.show_settings_section": "Geräteeinstellungen anzeigen"
}, yt = { de: ft };
function Be(n) {
  return (n?.language || n?.locale?.language || "en").toLowerCase().split(/[-_]/)[0];
}
function _(n, e, t) {
  return yt[Be(n)]?.[e] || t;
}
function P(n, e) {
  return _(n, `field.${e.key}`, e.label);
}
async function ze(n) {
  if (navigator.clipboard?.writeText)
    try {
      await navigator.clipboard.writeText(n);
      return;
    } catch {
    }
  const e = document.createElement("textarea");
  e.value = n, e.setAttribute("readonly", ""), e.style.position = "fixed", e.style.opacity = "0", document.body.appendChild(e), e.select();
  const t = document.execCommand("copy");
  if (e.remove(), !t) throw new Error("Could not copy to the clipboard.");
}
const He = "1.0.0";
function ne(n) {
  return typeof n == "boolean" ? String(n) : /^[A-Za-z0-9_./:%-]+$/.test(n) ? n : JSON.stringify(n);
}
function bt(n, e) {
  const t = [
    "type",
    "device_id",
    "entity",
    "name",
    "icon",
    "accent_color",
    ...e.fields.map((o) => o.key),
    "program_names",
    "default_expanded",
    "animations",
    "confirm_cancel",
    "show_progress",
    "show_remaining_time",
    "show_status_section",
    "show_options_section",
    "show_settings_section"
  ], i = Object.keys(n).filter((o) => !t.includes(o)).sort();
  return `${[.../* @__PURE__ */ new Set([...t, ...i])].flatMap((o) => {
    const r = n[o];
    if (typeof r == "string" || typeof r == "boolean") return [`${o}: ${ne(r)}`];
    if (r && typeof r == "object") {
      const l = Object.entries(r).filter((a) => typeof a[1] == "string" && !!a[1].trim()).sort(([a], [c]) => a.localeCompare(c));
      return l.length ? [`${o}:`, ...l.map(([a, c]) => `  ${ne(a)}: ${ne(c)}`)] : [];
    }
    return [];
  }).join(`
`)}
`;
}
function vt(n) {
  return (n || "").replace(/[\r\n]+/g, " ").trim();
}
async function wt(n, e, t, i) {
  const { candidates: s, suggestions: o } = await De(n, e, t, i), r = t.fields.flatMap((a) => {
    const c = i[a.key], p = o[a.key], u = typeof c == "string" ? c : typeof p == "string" ? `${p} (suggested)` : "—";
    return [`- ${a.key}: ${u}`];
  }), l = s.slice().sort((a, c) => a.entity_id.localeCompare(c.entity_id)).map((a) => {
    const c = vt(a.name || a.original_name);
    return `- ${a.entity_id}${c ? ` | ${c}` : ""}`;
  });
  return [
    "HC Direct Cards – entity discovery report",
    `Version: ${He}`,
    `Card: ${t.cardType}`,
    `Anchor: ${e}`,
    "",
    "Role mappings",
    ...r,
    "",
    "Enabled entities found on the same device",
    ...l.length ? l : ["- none"],
    "",
    "Privacy note: No entity states, attributes, device IDs, IP addresses or credentials are included. Entity IDs and names can still contain personal labels; review this report before sharing it.",
    ""
  ].join(`
`);
}
const $t = [
  { id: "general", label: "General", icon: "mdi:information-outline" },
  { id: "program", label: "Program", icon: "mdi:tune-variant" },
  { id: "actions", label: "Actions", icon: "mdi:gesture-tap-button" },
  { id: "options", label: "Options", icon: "mdi:toggle-switch-outline" },
  { id: "status", label: "Status & care", icon: "mdi:heart-pulse" },
  { id: "settings", label: "Device settings", icon: "mdi:cog-outline" }
];
class W extends $ {
  constructor() {
    super(...arguments), this._discovering = !1, this._copying = "", this._notice = "", this._detectedFields = {}, this._autoDetectedAnchor = "";
  }
  static {
    this.properties = {
      hass: { attribute: !1 },
      _config: { state: !0 },
      _discovering: { state: !0 },
      _copying: { state: !0 },
      _notice: { state: !0 }
    };
  }
  static {
    this.styles = B`
    :host { display: block; color: var(--primary-text-color); }
    * { box-sizing: border-box; }
    .editor { display: grid; gap: 14px; }
    .intro { color: var(--secondary-text-color); font-size: 13px; line-height: 1.45; }
    .group { padding: 12px; border: 1px solid var(--divider-color); border-radius: 14px; background: var(--card-background-color); }
    .group-title { display: flex; align-items: center; gap: 8px; margin: 0 0 12px; font-size: 14px; font-weight: 650; }
    .group-title ha-icon { --mdc-icon-size: 18px; color: var(--primary-color); }
    .fields { display: grid; gap: 13px; }
    .field { display: grid; gap: 5px; }
    label { font-size: 12px; color: var(--secondary-text-color); }
    input[type=text] { width: 100%; height: 42px; padding: 0 12px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 9px; font: inherit; }
    .toggle { min-height: 40px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .toggle label { color: var(--primary-text-color); font-size: 13px; }
    .detect { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; border-radius: 10px; padding: 0 14px; color: var(--text-primary-color, white); background: var(--primary-color); font: inherit; font-weight: 650; cursor: pointer; }
    .detect:disabled { opacity: .55; cursor: not-allowed; }
    .tool-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .tool { min-height: 40px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 10px; border: 1px solid var(--divider-color); border-radius: 10px; color: var(--primary-text-color); background: var(--secondary-background-color); font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }
    .tool:hover { border-color: var(--primary-color); }
    .tool:disabled { opacity: .55; cursor: not-allowed; }
    .tool ha-icon { --mdc-icon-size: 18px; }
    .program-names { border: 1px solid var(--divider-color); border-radius: 11px; background: color-mix(in srgb, var(--secondary-background-color), transparent 35%); }
    .program-names summary { min-height: 42px; display: flex; align-items: center; gap: 8px; padding: 0 11px; color: var(--primary-text-color); font-size: 13px; font-weight: 650; cursor: pointer; }
    .program-names summary ha-icon { --mdc-icon-size: 18px; color: var(--primary-color); }
    .program-names-body { display: grid; gap: 10px; padding: 0 11px 11px; }
    .program-names-help { margin: 0; color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
    .program-rename { display: grid; grid-template-columns: minmax(0, 1fr) minmax(140px, 1fr); align-items: center; gap: 9px; }
    .program-rename code { overflow: hidden; color: var(--secondary-text-color); font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
    .program-rename input { height: 36px; font-size: 12px; }
    .notice { font-size: 12px; color: var(--secondary-text-color); }
    .loading { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @media (max-width: 480px) { .tool-row, .program-rename { grid-template-columns: 1fr; } .program-rename { gap: 4px; } }
  `;
  }
  setConfig(e) {
    this._config = { ...e };
  }
  updated(e) {
    const t = v(this._config);
    t || (this._autoDetectedAnchor = ""), this.hass && t && t !== this._autoDetectedAnchor && (this._autoDetectedAnchor = t, this.autoDetect());
  }
  notify(e) {
    this._config = e, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  change(e, t) {
    if (!this._config) return;
    const i = { ...this._config };
    t === "" || t === void 0 ? delete i[e] : i[e] = t, e === "entity" && t && delete i.device_id, this.notify(i);
  }
  async autoDetect() {
    if (!this.hass || !this._config || !v(this._config) || this._discovering) return;
    const e = this._config.entity || "", t = v(this._config);
    this._discovering = !0, this._notice = "";
    try {
      const i = await Re(this.hass, e, this.definition, this._config);
      if (v(this._config) !== t) return;
      const s = Object.fromEntries(Object.entries(i).filter(([r]) => !this._config?.[r])), o = Object.keys(s).length;
      this._config.device_id ? (this._detectedFields = s, this.notify({ ...this._config })) : this.notify({ ...this._config, ...s }), this._notice = o ? `${o} ${_(this.hass, "editor.detected", "matching entities added. Review every suggestion before saving.")}` : _(this.hass, "editor.no_matches", "No additional unambiguous matches were found.");
    } catch (i) {
      this._notice = i instanceof Error ? i.message : "Automatic discovery failed.";
    } finally {
      this._discovering = !1, v(this._config) && v(this._config) !== t && this.autoDetect();
    }
  }
  async copyYaml() {
    if (!(!this._config || this._copying)) {
      this._copying = "yaml";
      try {
        await ze(bt(this._config, this.definition)), this._notice = _(this.hass, "editor.yaml_copied", "YAML configuration copied to the clipboard.");
      } catch (e) {
        this._notice = e instanceof Error ? e.message : "Could not copy the YAML configuration.";
      } finally {
        this._copying = "";
      }
    }
  }
  async copyDiscoveryReport() {
    if (!(!this.hass || !v(this._config) || this._copying)) {
      this._copying = "report";
      try {
        const e = await wt(this.hass, this._config.entity || "", this.definition, this._config);
        await ze(e), this._notice = _(this.hass, "editor.report_copied", "Entity discovery report copied. Review personal labels before sharing it.");
      } catch (e) {
        this._notice = e instanceof Error ? e.message : "Could not create the entity discovery report.";
      } finally {
        this._copying = "";
      }
    }
  }
  changeDevice(e) {
    if (!this._config) return;
    const t = { ...this._config };
    this._detectedFields = {};
    for (const i of this.definition.fields) delete t[i.key];
    e ? t.device_id = e : delete t.device_id, this.notify(t);
  }
  renderDeviceField() {
    const e = { coffee: "CoffeeMaker", oven: "Oven", dishwasher: "Dishwasher", hood: "Hood", hob: "Hob" };
    return h`<div class="field"><label>${_(this.hass, "editor.device", "Appliance")}</label><ha-selector
      .hass=${this.hass} .selector=${{ device: { filter: [{ integration: "homeconnect_ws", model: e[this.definition.kind] }] } }}
      .value=${this._config?.device_id || ""}
      @value-changed=${(t) => this.changeDevice(t.detail.value)}></ha-selector></div>`;
  }
  entitySelector(e) {
    const t = e.domains && e.domains.length === 1 ? e.domains[0] : e.domains;
    return { entity: t ? { domain: t } : {} };
  }
  renderEntityField(e) {
    if (!this._config || !this.hass) return d;
    const t = typeof (this._config[e.key] || this._detectedFields[e.key]) == "string" ? this._config[e.key] || this._detectedFields[e.key] : "";
    return h`<div class="field"><label>${P(this.hass, e)}</label><ha-selector
      .hass=${this.hass} .selector=${this.entitySelector(e)} .value=${t}
      @value-changed=${(i) => {
      this.change(e.key, i.detail.value), e.key === "entity" && i.detail.value && this.autoDetect();
    }}></ha-selector></div>`;
  }
  renderToggle(e, t, i) {
    if (!this._config) return d;
    const s = typeof this._config[e] == "boolean" ? !!this._config[e] : i;
    return h`<div class="toggle"><label for=${e}>${t}</label><ha-switch id=${e} .checked=${s} @change=${(o) => this.change(e, o.currentTarget.checked)}></ha-switch></div>`;
  }
  availablePrograms() {
    if (!this._config || !this.hass) return [];
    const e = [], t = (l, a = !1) => {
      if (typeof l != "string" || !l.trim() || e.includes(l)) return;
      const c = l.toLowerCase().replace(/[\s_.-]+/g, "");
      !a && (["unknown", "unavailable", "none", "null", "off"].includes(c) || /noprogram|notselected/.test(c)) || e.push(l);
    }, i = this._config.selected_program_entity || this._detectedFields.selected_program_entity, s = typeof i == "string" ? this.hass.states[i] : void 0;
    for (const l of s?.attributes.options || []) t(l);
    t(s?.state);
    const o = this._config.active_program_entity || this._detectedFields.active_program_entity, r = typeof o == "string" ? this.hass.states[o] : void 0;
    t(r?.state);
    for (const l of Object.keys(this._config.program_names || {})) t(l, !0);
    return e;
  }
  changeProgramName(e, t) {
    if (!this._config) return;
    const i = { ...this._config }, s = { ...i.program_names || {} }, o = t.trim();
    o ? s[e] = o : delete s[e], Object.keys(s).length ? i.program_names = s : delete i.program_names, this.notify(i);
  }
  renderProgramNames() {
    if (!this._config) return d;
    const e = this.availablePrograms();
    if (!e.length) return d;
    const t = this._config.program_names || {};
    return h`<details class="program-names"><summary><ha-icon icon="mdi:rename-box-outline"></ha-icon>${_(this.hass, "editor.program_names", "Rename programs manually")}</summary><div class="program-names-body">
      <p class="program-names-help">${_(this.hass, "editor.program_names_help", "Optional display names only. The original value is still sent to Home Assistant.")}</p>
      ${e.map((i) => h`<label class="program-rename"><code title=${i}>${i}</code><input type="text" .value=${t[i] || ""} placeholder=${_(this.hass, "editor.custom_program_name", "Custom name")} aria-label=${`${_(this.hass, "editor.custom_program_name", "Custom name")}: ${i}`} @change=${(s) => this.changeProgramName(i, s.currentTarget.value)}></label>`)}
    </div></details>`;
  }
  render() {
    return !this._config || !this.hass ? d : h`<div class="editor">
      <p class="intro">${_(this.hass, "editor.intro", "Choose the appliance. Its entities are detected automatically; manual assignments remain editable. An anchor entity is an alternative.")}</p>
      <section class="group"><h3 class="group-title">${_(this.hass, "editor.device", "Appliance")}</h3>${this.renderDeviceField()}</section>
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:palette-outline"></ha-icon>${_(this.hass, "section.appearance", "Appearance")}</h3><div class="fields">
        <div class="field"><label for="name">${_(this.hass, "editor.name", "Name override")}</label><input id="name" type="text" .value=${this._config.name || ""} placeholder=${this.definition.defaultName} @change=${(e) => this.change("name", e.currentTarget.value)}></div>
        <div class="field"><label for="icon">${_(this.hass, "editor.icon", "Icon override")}</label><input id="icon" type="text" .value=${this._config.icon || ""} placeholder=${this.definition.defaultIcon} @change=${(e) => this.change("icon", e.currentTarget.value)}></div>
        <div class="field"><label for="accent_color">${_(this.hass, "editor.accent_color", "Accent color")}</label><input id="accent_color" type="text" .value=${this._config.accent_color || ""} placeholder=${`${this.definition.accent} / var(--primary-color)`} @change=${(e) => this.change("accent_color", e.currentTarget.value)}></div>
      </div></section>
      <details><summary>${_(this.hass, "editor.manual_mapping", "Manual mapping (optional)")}</summary>${$t.map((e) => {
      const t = this.definition.fields.filter((i) => i.section === e.id);
      return t.length ? h`<section class="group"><h3 class="group-title"><ha-icon .icon=${e.icon}></ha-icon>${_(this.hass, `section.${e.id}`, e.label)}</h3><div class="fields">${t.map((i) => this.renderEntityField(i))}
          ${e.id === "program" ? this.renderProgramNames() : ""}
          ${e.id === "general" ? h`
            <button type="button" class="detect" ?disabled=${!v(this._config) || this._discovering} @click=${this.autoDetect}><ha-icon class=${this._discovering ? "loading" : ""} .icon=${this._discovering ? "mdi:loading" : "mdi:auto-fix"}></ha-icon>${_(this.hass, "editor.detect", "Detect device entities")}</button>
            <div class="tool-row">
              <button type="button" class="tool" ?disabled=${!!this._copying} @click=${this.copyYaml}><ha-icon icon="mdi:content-copy"></ha-icon>${_(this.hass, "editor.copy_yaml", "Copy YAML")}</button>
              <button type="button" class="tool" ?disabled=${!v(this._config) || !!this._copying} @click=${this.copyDiscoveryReport}><ha-icon class=${this._copying === "report" ? "loading" : ""} .icon=${this._copying === "report" ? "mdi:loading" : "mdi:clipboard-text-search-outline"}></ha-icon>${_(this.hass, "editor.copy_report", "Copy discovery report")}</button>
            </div>
            ${this._notice ? h`<div class="notice" role="status">${this._notice}</div>` : ""}` : ""}
        </div></section>` : d;
    })}</details>
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:eye-outline"></ha-icon>${_(this.hass, "section.layout", "Layout & behavior")}</h3><div class="fields">
        ${this.renderToggle("default_expanded", _(this.hass, "option.default_expanded", "Expanded by default"), !1)}
        ${this.renderToggle("animations", _(this.hass, "option.animations", "Animations"), !0)}
        ${this.renderToggle("confirm_cancel", _(this.hass, "option.confirm_cancel", "Require a second tap to cancel a program"), !0)}
        ${this.renderToggle("show_progress", _(this.hass, "option.show_progress", "Show progress"), !0)}
        ${this.renderToggle("show_remaining_time", _(this.hass, "option.show_remaining_time", "Show remaining time"), !0)}
        ${this.renderToggle("show_status_section", _(this.hass, "option.show_status_section", "Show status section"), !0)}
        ${this.definition.fields.some((e) => e.section === "options") ? this.renderToggle("show_options_section", _(this.hass, "option.show_options_section", "Show options section"), !0) : d}
        ${this.renderToggle("show_settings_section", _(this.hass, "option.show_settings_section", "Show device settings"), !0)}
      </div></section>
    </div>`;
  }
}
const V = [
  { key: "entity", label: "Alternative: anchor entity", section: "general" },
  { key: "connection_entity", label: "Connection", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["connection", "verbindung"] },
  { key: "power_entity", label: "Power", section: "general", domains: ["switch", "select"], aliases: ["power", "einschalter", "power state"] },
  { key: "status_entity", label: "Status", section: "general", domains: ["sensor", "select"], aliases: ["status", "power state"] },
  { key: "operating_state_entity", label: "Operating state", section: "general", domains: ["sensor", "select"], aliases: ["operating state", "betriebszustand", "operation state"] },
  { key: "selected_program_entity", label: "Selected program", section: "program", kind: "select", domains: ["select"], aliases: ["selected program", "ausgewahltes programm", "program"] },
  { key: "active_program_entity", label: "Active program", section: "program", kind: "status", domains: ["sensor"], aliases: ["active program", "aktives programm"] },
  { key: "progress_entity", label: "Program progress", section: "status", kind: "status", domains: ["sensor"], aliases: ["program progress", "programmfortschritt", "progress"] },
  { key: "remaining_time_entity", label: "Remaining time", section: "status", kind: "status", domains: ["sensor"], aliases: ["remaining program time", "verbleibende programmlaufzeit", "remaining time", "remaining duration"] },
  { key: "start_in_entity", label: "Start in", section: "program", kind: "number", domains: ["number"], aliases: ["start in", "startverzogerung"] },
  { key: "messages_entity", label: "Messages", section: "status", kind: "status", domains: ["sensor"], aliases: ["messages", "meldungen"], warning: !0 },
  { key: "acknowledge_event_entity", label: "Confirm message", section: "settings", kind: "button", domains: ["button"], aliases: ["confirm message"], allowWhileActive: !0 },
  { key: "start_entity", label: "Start", section: "actions", domains: ["button"], aliases: ["start"] },
  { key: "pause_entity", label: "Pause", section: "actions", domains: ["button"], aliases: ["pause"] },
  { key: "resume_entity", label: "Resume", section: "actions", domains: ["button"], aliases: ["resume", "fortsetzen"] },
  { key: "cancel_entity", label: "Cancel", section: "actions", domains: ["button"], aliases: ["cancel", "abbrechen"] }
], M = {
  kind: "dishwasher",
  cardType: "custom:hc-direct-dishwasher-card",
  editorTag: "hc-direct-dishwasher-card-editor",
  displayName: "HC Direct · Dishwasher",
  description: "Compact controls and status for a Home Connect dishwasher.",
  defaultName: "Dishwasher",
  defaultIcon: "mdi:dishwasher",
  accent: "#4f8cff",
  fields: [
    ...V.filter((n) => n.key !== "pause_entity" && n.key !== "resume_entity"),
    { key: "phase_entity", label: "Program phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["program phase", "programmphase"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tur"] },
    { key: "water_entity", label: "Estimated water", section: "status", kind: "status", domains: ["sensor"], aliases: ["water consumption", "wasserverbrauch"] },
    { key: "energy_entity", label: "Estimated energy", section: "status", kind: "status", domains: ["sensor"], aliases: ["energy consumption", "energieverbrauch"] },
    { key: "salt_entity", label: "Salt", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["salt", "salz"], warning: !0 },
    { key: "rinse_aid_entity", label: "Rinse aid", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["rinse aid", "klarspuler"], warning: !0 },
    { key: "vario_speed_entity", label: "VarioSpeed Plus", section: "options", kind: "toggle", domains: ["switch"], aliases: ["variospeed"] },
    { key: "hygiene_entity", label: "Hygiene Plus", section: "options", kind: "toggle", domains: ["switch"], aliases: ["hygiene plus"] },
    { key: "half_load_entity", label: "Half load", section: "options", kind: "toggle", domains: ["switch"], aliases: ["half load", "halbe ladung"] },
    { key: "silent_entity", label: "Silence On Demand", section: "options", kind: "toggle", domains: ["switch"], aliases: ["silent", "leise"] },
    { key: "filter_check_entity", label: "Check filter system", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["filtersystem prufen", "filter system check", "check filter system", "check filter"], warning: !0 },
    { key: "filter_entity", label: "Machine-care filter", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["maschinenreinigung filter", "machine care filter"], warning: !0 },
    { key: "aquastop_entity", label: "AquaStop triggered", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["aquastop aufgetreten", "aquastop triggered", "aquastop occurred", "aquastop"], warning: !0 },
    { key: "care_entity", label: "Machine care reminder", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["machine care", "maschinenreinigung"], warning: !0, warningBelow: 0 },
    { key: "heater_scale_entity", label: "Heater scale warning", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["heater scale", "wasserheizung verkalkt"], warning: !0 }
  ]
}, N = {
  kind: "oven",
  cardType: "custom:hc-direct-oven-card",
  editorTag: "hc-direct-oven-card-editor",
  displayName: "HC Direct · Oven",
  description: "Program, temperature, timer and status controls for a Home Connect oven.",
  defaultName: "Oven",
  defaultIcon: "mdi:stove",
  accent: "#ff8a45",
  fields: [
    ...V,
    { key: "meatprobe_temperature_entity", label: "Current meatprobe temperature", section: "status", kind: "status", domains: ["sensor"], aliases: ["meat probe temperature"] },
    { key: "meatprobe_target_entity", label: "Meatprobe target temperature", section: "status", kind: "status", domains: ["sensor"], aliases: ["meat probe target"] },
    { key: "meatprobe_plugged_entity", label: "Meatprobe plugged in", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["meat probe plugged"] },
    { key: "current_temperature_entity", label: "Current temperature", section: "status", kind: "status", domains: ["sensor"], aliases: ["current temperature", "aktuelle temperatur"], prominent: !0 },
    { key: "target_temperature_entity", label: "Target temperature", section: "program", kind: "number", domains: ["number"], aliases: ["target temperature", "sollwert temperatur"] },
    { key: "duration_entity", label: "Duration", section: "program", kind: "number", domains: ["number"], aliases: ["duration", "dauer"] },
    { key: "level_entity", label: "Level", section: "program", kind: "select", domains: ["select"], aliases: ["level", "stufe"] },
    { key: "rapid_preheat_entity", label: "Rapid preheat", section: "options", kind: "toggle", domains: ["switch"], aliases: ["rapid preheat", "schnelles vorheizen"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tur"], warning: !0 },
    { key: "water_tank_entity", label: "Water tank", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["water tank", "wassertank"], warning: !0 },
    { key: "alarm_entity", label: "Alarm clock", section: "settings", kind: "number", domains: ["number"], aliases: ["alarm clock", "timer"] },
    { key: "child_lock_entity", label: "Child lock", section: "settings", kind: "toggle", domains: ["switch", "select"], aliases: ["child lock", "kindersicherung"] },
    { key: "display_brightness_entity", label: "Display brightness", section: "settings", kind: "number", domains: ["number"], aliases: ["display brightness", "display helligkeit"] },
    { key: "key_tones_entity", label: "Button tone", section: "settings", kind: "toggle", domains: ["switch"], aliases: ["key tone", "tastentone"] },
    { key: "cooling_fan_entity", label: "Fan run-on time", section: "settings", kind: "select", domains: ["select"], aliases: ["cooling fan", "kuhllufter"] },
    { key: "tone_duration_entity", label: "Signal tone", section: "settings", kind: "select", domains: ["select"], aliases: ["tone duration", "tondauer"] }
  ]
}, I = {
  kind: "coffee",
  cardType: "custom:hc-direct-coffee-card",
  editorTag: "hc-direct-coffee-card-editor",
  displayName: "HC Direct · Coffee",
  description: "A drink-first controller for Home Connect coffee machines.",
  defaultName: "Coffee machine",
  defaultIcon: "mdi:coffee-maker",
  accent: "#b9794a",
  fields: [
    ...V.filter((n) => n.key !== "remaining_time_entity"),
    { key: "fill_quantity_select_entity", label: "Amount", section: "program", kind: "select", domains: ["select"], aliases: ["coffee fill quantity"] },
    { key: "aroma_entity", label: "aromaSelect", section: "program", kind: "select", domains: ["select"], aliases: ["aroma select"] },
    { key: "shot_count_entity", label: "Shot count", section: "status", kind: "status", domains: ["sensor"], aliases: ["shot count"] },
    { key: "problem_entity", label: "Problem", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["problem"], warning: !0 },
    { key: "grounds_container_entity", label: "Grounds container", section: "status", kind: "status", domains: ["sensor"], aliases: ["pomace container", "satzbehalter"], warning: !0, warningStates: ["missing", "full"] },
    { key: "bean_container_status_entity", label: "Bean container status", section: "status", kind: "status", domains: ["sensor"], aliases: ["bean container status"], warning: !0 },
    { key: "favorite_order_entity", label: "Favorite order", section: "settings", kind: "select", domains: ["select"], aliases: ["favorite order"] },
    { key: "phase_entity", label: "Process phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["process phase"] },
    { key: "bean_amount_entity", label: "Strength", section: "program", kind: "select", domains: ["select"], aliases: ["bean amount", "bohnenmenge"] },
    { key: "fill_quantity_entity", label: "Fill quantity", section: "program", kind: "number", domains: ["number"], aliases: ["fill quantity", "fullmenge"] },
    { key: "coffee_temperature_entity", label: "Coffee temperature", section: "program", kind: "select", domains: ["select"], aliases: ["coffee temperature", "kaffeetemperatur"] },
    { key: "milk_ratio_entity", label: "Coffee / milk ratio", section: "program", kind: "select", domains: ["select", "number"], aliases: ["coffee milk ratio", "kaffee milch verhaltnis"] },
    { key: "bean_container_entity", label: "Bean container", section: "program", kind: "select", domains: ["select"], aliases: ["bean container", "bohnenbehalter"] },
    { key: "water_temperature_entity", label: "Hot water temperature", section: "program", kind: "select", domains: ["select"], aliases: ["hot water temperature", "wassertemperatur"] },
    { key: "flow_rate_entity", label: "Flow rate", section: "program", kind: "select", domains: ["select"], aliases: ["flow rate", "durchflussmenge"] },
    { key: "multiple_beverages_entity", label: "Double cup", section: "program", kind: "toggle", domains: ["switch"], aliases: ["multiple beverages", "multiple beverage", "mehrere getranke", "mehrere getränke"] },
    { key: "water_tank_entity", label: "Water tank", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["water tank", "wassertank"], warning: !0 },
    { key: "beans_empty_entity", label: "Beans empty", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["beans empty", "bohnenbehalter leer"], warning: !0 },
    { key: "drip_tray_entity", label: "Drip tray", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["drip tray", "auffangschale"], warning: !0, warningStates: ["full", "notinserted"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tur"], warning: !0 },
    { key: "cup_warmer_entity", label: "Cup warmer", section: "settings", kind: "toggle", domains: ["switch"], aliases: ["cup warmer", "tassenwarmer"] },
    { key: "child_lock_entity", label: "Child lock", section: "settings", kind: "toggle", domains: ["switch"], aliases: ["child lock", "kindersicherung"] }
  ]
}, z = {
  kind: "hood",
  cardType: "custom:hc-direct-hood-card",
  editorTag: "hc-direct-hood-card-editor",
  displayName: "HC Direct · Hood",
  description: "Fan levels, light and filter status.",
  defaultName: "Hood",
  defaultIcon: "mdi:extractor-hood",
  accent: "#187d79",
  fields: [
    ...V.filter((n) => !["start_entity", "pause_entity", "resume_entity", "cancel_entity", "progress_entity", "remaining_time_entity", "start_in_entity"].includes(n.key)),
    {
      key: "fan_entity",
      label: "Fan",
      section: "program",
      kind: "fan",
      domains: [
        "fan"
      ],
      aliases: [
        "hood fan",
        "lufter"
      ]
    },
    {
      key: "hood_level_entity",
      label: "Hood level",
      section: "program",
      kind: "select",
      domains: [
        "select"
      ],
      aliases: [
        "haubenstufe"
      ]
    },
    {
      key: "working_light_entity",
      label: "Working light",
      section: "options",
      kind: "light",
      domains: [
        "light"
      ],
      aliases: [
        "working light",
        "arbeitslicht"
      ]
    },
    {
      key: "ambient_light_entity",
      label: "Ambient light",
      section: "options",
      kind: "light",
      domains: [
        "light"
      ],
      aliases: [
        "ambient light"
      ]
    },
    {
      key: "grease_filter_entity",
      label: "Grease filter saturation",
      section: "status",
      kind: "status",
      domains: [
        "sensor"
      ],
      aliases: [
        "grease filter saturation"
      ]
    },
    {
      key: "carbon_filter_entity",
      label: "Carbon filter saturation",
      section: "status",
      kind: "status",
      domains: [
        "sensor"
      ],
      aliases: [
        "carbon filter saturation"
      ]
    },
    {
      key: "delayed_shutoff_entity",
      label: "Fan run-on time",
      section: "program",
      kind: "number",
      domains: [
        "number"
      ],
      aliases: [
        "delayed shutoff time"
      ]
    },
    {
      key: "interval_on_entity",
      label: "Interval on",
      section: "settings",
      kind: "number",
      domains: [
        "number"
      ],
      aliases: [
        "interval on"
      ]
    },
    {
      key: "interval_off_entity",
      label: "Interval off",
      section: "settings",
      kind: "number",
      domains: [
        "number"
      ],
      aliases: [
        "interval off"
      ]
    },
    {
      key: "fan_profile_entity",
      label: "Fan profile",
      section: "settings",
      kind: "select",
      domains: [
        "select"
      ],
      aliases: [
        "ventilation profile"
      ]
    },
    {
      key: "fan_startup_entity",
      label: "Fan at power on",
      section: "settings",
      kind: "select",
      domains: [
        "select"
      ],
      aliases: [
        "ventilation startup"
      ]
    },
    {
      key: "fan_shutdown_entity",
      label: "Fan at power off",
      section: "settings",
      kind: "select",
      domains: [
        "select"
      ],
      aliases: [
        "ventilation shutdown"
      ]
    },
    {
      key: "automatic_sensitivity_entity",
      label: "Automatic mode sensitivity",
      section: "settings",
      kind: "number",
      domains: [
        "number"
      ],
      aliases: [
        "automatic sensitivity"
      ]
    },
    {
      key: "reset_grease_entity",
      label: "Reset grease filter status",
      section: "settings",
      kind: "button",
      domains: [
        "button"
      ],
      aliases: [
        "grease filter reset"
      ]
    },
    {
      key: "reset_carbon_entity",
      label: "Reset carbon filter",
      section: "settings",
      kind: "button",
      domains: [
        "button"
      ],
      aliases: [
        "carbon filter reset"
      ]
    }
  ]
}, kt = ["100", "200", "300", "400"], xt = {
  state: "Zone state",
  operation: "Operating state",
  power: "Power level",
  remaining: "Remaining time",
  frying: "Frying sensor",
  progress: "Progress"
}, zt = kt.flatMap((n) => Object.entries(xt).map(([e, t]) => ({
  key: "zone_" + n + "_" + e + "_entity",
  label: "Zone " + n + " · " + t,
  section: "status",
  kind: "status",
  domains: ["sensor"]
}))), D = {
  kind: "hob",
  cardType: "custom:hc-direct-hob-card",
  editorTag: "hc-direct-hob-card-editor",
  displayName: "HC Direct · Hob",
  description: "Read-only zones, residual heat and timers.",
  defaultName: "Hob",
  defaultIcon: "mdi:stove",
  accent: "#c75b30",
  fields: [
    ...V.filter((n) => ["entity", "status_entity", "operating_state_entity", "connection_entity"].includes(n.key)),
    ...zt,
    { key: "bridge_mode_entity", label: "varioInduction (join zones)", section: "program", kind: "select", domains: ["select"] },
    { key: "hob_mode_entity", label: "Power mode", section: "program", kind: "select", domains: ["select"] },
    { key: "power_move_front_left_entity", label: "powerMove level front left", section: "settings", kind: "select", domains: ["select"] },
    { key: "power_move_middle_left_entity", label: "powerMove level middle left", section: "settings", kind: "select", domains: ["select"] },
    { key: "power_move_rear_left_entity", label: "powerMove level rear left", section: "settings", kind: "select", domains: ["select"] },
    { key: "power_move_front_right_entity", label: "powerMove level front right", section: "settings", kind: "select", domains: ["select"] },
    { key: "power_move_middle_right_entity", label: "powerMove level middle right", section: "settings", kind: "select", domains: ["select"] },
    { key: "power_move_rear_right_entity", label: "powerMove level rear right", section: "settings", kind: "select", domains: ["select"] },
    { key: "alarm_entity", label: "Alarm clock", section: "program", kind: "number", domains: ["number"], aliases: ["alarm clock"] },
    { key: "automatic_timer_entity", label: "Automatic timer", section: "settings", kind: "number", domains: ["number"], aliases: ["automatic timer"] },
    { key: "child_lock_entity", label: "Child lock", section: "settings", kind: "select", domains: ["select"], aliases: ["child lock"] }
  ]
};
function b(n, e) {
  customElements.get(n) || customElements.define(n, e);
}
class At extends W {
  constructor() {
    super(...arguments), this.definition = M;
  }
}
b(M.editorTag, At);
class St extends W {
  constructor() {
    super(...arguments), this.definition = N;
  }
}
b(N.editorTag, St);
class Et extends W {
  constructor() {
    super(...arguments), this.definition = I;
  }
}
b(I.editorTag, Et);
class Ct extends W {
  constructor() {
    super(...arguments), this.definition = z;
  }
}
b(z.editorTag, Ct);
class Tt extends W {
  constructor() {
    super(...arguments), this.definition = D;
  }
}
b(D.editorTag, Tt);
const Pt = { ATTRIBUTE: 1 }, Mt = (n) => (...e) => ({ _$litDirective$: n, values: e });
let Nt = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
const Le = "important", It = " !" + Le, Ot = Mt(class extends Nt {
  constructor(n) {
    if (super(n), n.type !== Pt.ATTRIBUTE || n.name !== "style" || n.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return Object.keys(n).reduce((e, t) => {
      const i = n[t];
      return i == null ? e : e + `${t = t.includes("-") ? t : t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(n, [e]) {
    const { style: t } = n.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const i of this.ft) e[i] == null && (this.ft.delete(i), i.includes("-") ? t.removeProperty(i) : t[i] = null);
    for (const i in e) {
      const s = e[i];
      if (s != null) {
        this.ft.add(i);
        const o = typeof s == "string" && s.endsWith(It);
        i.includes("-") || o ? t.setProperty(i, o ? s.slice(0, -11) : s, o ? Le : "") : t[i] = s;
      }
    }
    return C;
  }
}), Dt = B`
  :host { display:block; --hc-accent:var(--primary-color,#147d79); }
  * { box-sizing:border-box; }
  ha-card { display:block; color:var(--primary-text-color); background:var(--ha-card-background,var(--card-background-color)); border:1px solid var(--divider-color); border-radius:18px; overflow:hidden; box-shadow:none; }
  .shell { container-type:inline-size; }
  .card-header { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:20px 20px 16px; }
  .identity { min-width:0; padding:0; background:none; color:inherit; border:0; text-align:left; font:inherit; cursor:pointer; }
  .eyebrow { display:block; font-size:9px; font-weight:750; letter-spacing:.12em; color:var(--secondary-text-color); line-height:1.6; text-transform:uppercase; }
  .card-title { display:block; margin-top:4px; font-size:21px; font-weight:650; letter-spacing:-.035em; overflow-wrap:anywhere; }
  .state-label { flex-shrink:0; font-size:11px; padding:6px 8px; border-radius:6px; background:var(--secondary-background-color); color:var(--secondary-text-color); }
  .connection-dot { display:inline-block; width:6px;height:6px;border-radius:50%;background:var(--success-color,#479c70);margin-right:6px; }
  .connection-dot.offline { background:var(--error-color,#bb4845); }
  .state-label.running { color:var(--primary-text-color); background:color-mix(in srgb,var(--hc-accent),transparent 91%); }
  .state-label.paused { color:var(--warning-color,#af6f18); }
  .daily-controls { padding:0 20px 18px; display:grid; gap:14px; }
  .power-row { padding:0 0 10px; border-bottom:1px solid var(--divider-color); }
  .now-running { margin:0 20px 12px; display:flex; flex-wrap:wrap; justify-content:space-between; gap:6px; font-size:13px; }
  .now-running strong { color:var(--hc-accent); }
  .progress-line { height:3px; margin:0 20px 14px; background:var(--divider-color); overflow:hidden; border-radius:2px; }
  .progress-line span { height:100%; display:block; background:var(--hc-accent); transition:width .25s ease; }
  .key-metrics { margin:0 20px 14px; display:flex; gap:12px; font-size:18px; }
  .warning-strip { padding:0 20px 12px; display:grid; gap:6px; }
  .notice { font-size:12px; padding:8px 10px; border-left:3px solid var(--warning-color,#d18420); background:color-mix(in srgb,var(--warning-color,#d18420),transparent 94%); overflow-wrap:anywhere; }
  footer { border-top:1px solid var(--divider-color); }
  .details-button { width:100%; min-height:44px; padding:10px 20px; border:0; background:transparent; color:var(--secondary-text-color); display:flex; justify-content:space-between; align-items:center; font:inherit; font-size:12px; cursor:pointer; }
  .details-content { display:grid; gap:12px; padding:0 20px 18px; }
  .primary-actions { margin-top:2px; }
  .error { margin:0 20px 18px; padding:10px; color:var(--error-color,#c64d41); background:color-mix(in srgb,var(--error-color,#c64d41),transparent 92%); border-radius:8px; font-size:12px; }
  .error button { color:inherit; border:0; background:none; cursor:pointer; float:right; }
  button:focus-visible,input:focus-visible,select:focus-visible { outline:2px solid var(--hc-accent);outline-offset:2px; }
  @container (max-width:340px) { .card-header { padding:16px; } .daily-controls,.details-content { padding-inline:16px; } .card-title { font-size:19px; } }
  @media (prefers-reduced-motion:reduce) { * { transition:none!important; } }
`;
function Rt(n, e, t) {
  const i = e[t];
  return n && typeof i == "string" ? n.states[i] : void 0;
}
function Bt(n) {
  const e = /* @__PURE__ */ new Set();
  for (const [t, i] of Object.entries(n))
    (t === "entity" || t.endsWith("_entity")) && typeof i == "string" && i.includes(".") && e.add(i);
  return [...e];
}
function Ht(n, e, t) {
  return n === e ? !1 : !n || !e || n.language !== e.language || n.locale?.language !== e.locale?.language ? !0 : t.some((i) => n.states[i] !== e.states[i]);
}
const Lt = /* @__PURE__ */ new Set(["unknown", "unavailable", "null", ""]);
function y(n) {
  return !!n && !Lt.has(String(n.state).toLowerCase());
}
function Ae(n) {
  return (/enumtype|eventpresentstate|operationstate|powerstate/i.test(n) && n.includes(".") || n.includes(".") && /^[a-z_]+\./i.test(n) ? n.split(".").pop() : n).replace(/^BSH[._]Common[._]|^Dishcare[._]|^Cooking[._]|^LaundryCare[._]|^ConsumerProducts[._]CoffeeMaker[._]/i, "").replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim();
}
function w(n) {
  if (!n) return "";
  const e = n.state.trim().toLowerCase();
  return (e.split(/[.:/]/).filter(Boolean).pop() || e).replace(/[\s_-]+/g, "");
}
function Ft(n) {
  const e = /^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i.exec(n);
  if (!e) return;
  const t = Number(e[1] || 0), i = Number(e[2] || 0) + Math.floor(Number(e[3] || 0) / 60);
  return t ? `${t}:${String(i).padStart(2, "0")} h` : `${i} min`;
}
function f(n, e) {
  if (!e) return _(n, "not_configured", "Not configured");
  if (!y(e)) return e?.state === "unavailable" ? _(n, "unavailable", "Unavailable") : _(n, "unknown", "Unknown");
  if (n.formatEntityState)
    try {
      const l = n.formatEntityState(e);
      if (l && l !== e.state) {
        const a = Ae(e.state).toLowerCase();
        if (!/enumtype|eventpresentstate|operationstate|powerstate/i.test(e.state) || l.toLowerCase() !== a) return l;
      }
    } catch {
    }
  const t = w(e), i = {
    run: ["Running", "Läuft"],
    running: ["Running", "Läuft"],
    active: ["Active", "Aktiv"],
    ready: ["Ready", "Bereit"],
    pause: ["Paused", "Pausiert"],
    paused: ["Paused", "Pausiert"],
    off: ["Off", "Aus"],
    on: ["On", "Ein"],
    inactive: ["Inactive", "Inaktiv"],
    finished: ["Finished", "Beendet"],
    completed: ["Completed", "Beendet"],
    error: ["Error", "Fehler"]
  }, o = { de: 1 }[Be(n)] ?? 0;
  if (i[t] && /enumtype|eventpresentstate|operationstate|powerstate/i.test(e.state)) return i[t][o];
  const r = Ft(e.state);
  return r || `${Ae(e.state)}${e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : ""}`;
}
function Fe(n) {
  if (!n || !y(n)) return;
  const e = Number.parseFloat(n.state.replace(",", "."));
  return Number.isFinite(e) ? e : void 0;
}
function Ut(n) {
  const e = Fe(n);
  if (e !== void 0)
    return Math.max(0, Math.min(100, e <= 1 && !n?.attributes.unit_of_measurement ? e * 100 : e));
}
function Y(n) {
  return !n || !y(n) ? !1 : ["on", "open", "true", "active", "running", "run", "1", "present"].includes(w(n));
}
function jt(n, e, t) {
  if (!n || !y(n)) return !1;
  const i = w(n);
  return t !== void 0 && Number.isFinite(Number(n.state)) ? Number(n.state) <= t : e ? e.includes(i) : !["off", "closed", "ok", "normal", "none", "false", "0", "available", "full", "notpresent", "ready", "good"].includes(i);
}
function Zt(n, e) {
  const t = n?.trim();
  return !t || t.length > 96 || /[;{}]/.test(t) ? e : /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(t) || /^[a-z]+$/i.test(t) || /^var\(--[a-z0-9_-]+\)$/i.test(t) || /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([\d\s.,%+\-/a-z]+\)$/i.test(t) ? t : e;
}
function qt(n) {
  return n === "running" || n === "paused";
}
function Wt(...n) {
  const e = n.filter((i) => !!i && y(i));
  if (!e.length && n.some(Boolean)) return "unavailable";
  const t = e.map(w);
  return n[0] && y(n[0]) && ["off", "aus", "ausgeschaltet", "inactive"].includes(w(n[0])) ? "off" : t.some((i) => ["pause", "paused", "angehalten", "unterbrochen"].includes(i)) ? "paused" : t.some((i) => ["run", "running", "active", "inoperation", "betrieb", "heat", "heating", "brew", "brewing", "drying", "trocknen", "delayedstart", "aborting"].includes(i)) ? "running" : t.some((i) => ["off", "aus", "ausgeschaltet", "inactive", "standby"].includes(i)) ? "off" : "idle";
}
function Z(n) {
  return n.attributes.readonly === !0;
}
function R(n) {
  return !n || n.state === "unavailable" || n.attributes.restored === !0 ? !1 : n.entity_id.startsWith("select.") || n.entity_id.startsWith("input_select.") ? (n.attributes.options?.length || 0) > 0 : y(n);
}
function Se(n, e, t) {
  const i = t.fill_quantity_select_entity, s = typeof i == "string" ? e.states[i] : void 0;
  return n === "fill_quantity_select_entity" ? R(s) : n === "fill_quantity_entity" ? !R(s) : !0;
}
function K(n) {
  if (!R(n) || Z(n)) throw new Error("This entity is unavailable or read-only.");
}
async function Vt(n, e) {
  K(e);
  const t = e.entity_id.split(".")[0];
  if (t === "select" || t === "input_select") {
    const i = e.attributes.options || [], s = (a) => a.toLowerCase().split(/[.:/]/).filter(Boolean).pop()?.replace(/[\s_-]/g, "") || "", o = i.find((a) => ["on", "ein", "active"].includes(s(a))), r = i.find((a) => ["off", "aus", "inactive", "standby"].includes(s(a))), l = ["on", "ein", "active"].includes(w(e)) ? r : o;
    if (!l) throw new Error("This select has no recognizable on/off options.");
    await n.callService("select", "select_option", { entity_id: e.entity_id, option: l });
    return;
  }
  await n.callService(t, e.state === "on" ? "turn_off" : "turn_on", { entity_id: e.entity_id });
}
async function Ee(n, e) {
  if (e.state === "unavailable" || Z(e)) throw new Error("This button is unavailable or read-only.");
  const t = e.entity_id.split(".")[0];
  if (t !== "button" && t !== "input_button") throw new Error("The configured action is not a button entity.");
  await n.callService(t, "press", { entity_id: e.entity_id });
}
async function Ue(n, e, t) {
  K(e);
  const i = e.entity_id.split(".")[0];
  if (i !== "select" && i !== "input_select") throw new Error("The configured entity is not a select.");
  if (e.attributes.options && !e.attributes.options.includes(t)) throw new Error("This option is not offered by the entity.");
  await n.callService(i, "select_option", { entity_id: e.entity_id, option: t });
}
async function Kt(n, e, t) {
  K(e);
  const i = e.entity_id.split(".")[0];
  await n.callService(i, "set_value", { entity_id: e.entity_id, value: t });
}
async function Gt(n, e, t) {
  if (K(e), !e.entity_id.startsWith("light.")) throw new Error("Expected a light entity.");
  const i = Math.max(0, Math.min(100, Math.round(t)));
  await n.callService(
    "light",
    i === 0 ? "turn_off" : "turn_on",
    i === 0 ? { entity_id: e.entity_id } : { entity_id: e.entity_id, brightness_pct: i }
  );
}
async function Jt(n, e, t) {
  if (K(e), !e.entity_id.startsWith("fan.")) throw new Error("Expected a fan entity.");
  await n.callService("fan", "set_percentage", { entity_id: e.entity_id, percentage: Math.max(0, Math.min(100, t)) });
}
function he(n, e) {
  n.dispatchEvent(new CustomEvent("hass-action", {
    detail: {
      config: { entity: e, tap_action: { action: "more-info" } },
      action: "tap"
    },
    bubbles: !0,
    composed: !0
  }));
}
function oe(n, e) {
  return e?.[n]?.trim() || void 0;
}
function Yt(n, e, t) {
  return oe(e.state, t) || f(n, e);
}
class Qt extends $ {
  constructor() {
    super(...arguments), this.valueLabels = {}, this.label = "", this.kind = "status", this.disabled = !1, this.busy = !1;
  }
  static {
    this.properties = { hass: { attribute: !1 }, entity: { attribute: !1 }, valueLabels: { attribute: !1 }, label: {}, kind: {}, disabled: { type: Boolean }, busy: { type: Boolean } };
  }
  static {
    this.styles = B`
    :host { display: block; min-width: 0; }
    .control { min-height: 48px; display: grid; gap: 6px; }
    .line { min-height: 45px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .label { flex:1; overflow-wrap:anywhere; min-width: 0; color: var(--secondary-text-color); font-size: 12px; font-weight: 520; }
    .value { padding: 4px 0; color: var(--primary-text-color); font-size: 13px; font-weight: 600; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .status-line { width: 100%; padding: 0; border: 0; color: inherit; background: transparent; text-align: left; font: inherit; cursor: pointer; }
    .status-line:hover .value { color: var(--hc-accent); }
    select { flex:0 1 62%; width:62%; max-width:62%; min-width:0; height: 37px; padding: 0 30px 0 11px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid color-mix(in srgb, var(--divider-color), var(--primary-text-color) 8%); border-radius: 11px; font: inherit; font-size: 13px; transition: border-color 150ms ease, box-shadow 150ms ease; }
    select:hover:not(:disabled) { border-color: color-mix(in srgb, var(--hc-accent), var(--divider-color) 45%); }
    .switch { position: relative; width: 42px; height: 24px; flex: none; border: 0; border-radius: 999px; padding: 2px; background: var(--switch-unchecked-track-color, var(--disabled-color)); cursor: pointer; transition: background 160ms ease; }
    .switch::after { content: ""; display: block; width: 20px; height: 20px; border-radius: 50%; background: var(--switch-unchecked-button-color, #fff); box-shadow: 0 1px 3px #0004; transition: transform 160ms ease; }
    .switch.on { background: var(--hc-accent); }
    .switch.on::after { transform: translateX(18px); }
    input[type=range] { width: 100%; height: 18px; accent-color: var(--hc-accent); cursor: pointer; }
    .number-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 12px; }
    .number-value { font-weight: 650; font-variant-numeric: tabular-nums; }
    .unavailable { opacity: .58; }
    button:disabled, select:disabled, input:disabled { cursor: not-allowed; opacity: .55; }
  `;
  }
  emit(e, t) {
    !this.entity || this.disabled || this.busy || (e === "press" ? this.entity.state === "unavailable" : !R(this.entity)) || Z(this.entity) || this.dispatchEvent(new CustomEvent("hcd-control", { detail: { entity: this.entity, action: e, value: t }, bubbles: !0, composed: !0 }));
  }
  render() {
    if (!this.entity || !this.hass) return d;
    const e = this.kind === "button" ? this.entity.state === "unavailable" : !R(this.entity), t = this.disabled || this.busy || e || Z(this.entity);
    if (this.kind === "button")
      return h`<div class="line"><span class="label">${this.label}</span><button type="button" ?disabled=${t} @click=${() => this.emit("press")}>${this.label}</button></div>`;
    if (this.kind === "light" || this.kind === "fan") {
      const s = this.kind === "fan", o = this.entity.attributes.supported_color_modes, r = s ? (Number(this.entity.attributes.supported_features || 0) & 1) !== 0 : !!o?.some((a) => !["onoff", "unknown"].includes(a)), l = s ? Number(this.entity.attributes.percentage ?? 0) : this.entity.state === "off" ? 0 : Math.round(Number(this.entity.attributes.brightness ?? 255) / 255 * 100);
      return h`<div class="control">
        <div class="line"><span class="label">${this.label}</span><button class="switch ${Y(this.entity) ? "on" : ""}" type="button" role="switch" aria-checked=${String(Y(this.entity))} aria-label=${this.label} ?disabled=${t} @click=${() => this.emit("toggle")}></button></div>
        ${r ? h`<label class="number-head">${l}%<input aria-label=${this.label + " %"} type="range" min="0" max="100" step=${s ? Number(this.entity.attributes.percentage_step || 1) : 1} .value=${String(l)} ?disabled=${t} @change=${(a) => this.emit(s ? "fan" : "brightness", Number(a.target.value))}></label>` : d}
      </div>`;
    }
    if (this.kind === "toggle") {
      const s = Y(this.entity);
      return h`<div class="line ${e ? "unavailable" : ""}"><span class="label">${this.label}</span><button class="switch ${s ? "on" : ""}" type="button" role="switch" aria-checked=${String(s)} aria-label=${this.label} ?disabled=${t} @click=${() => this.emit("toggle")}></button></div>`;
    }
    if (this.kind === "select") {
      const s = this.entity.attributes.options || [], o = s.includes(this.entity.state) || !y(this.entity) ? s : [this.entity.state, ...s];
      return h`<div class="line ${e ? "unavailable" : ""}"><label class="label" for="select">${this.label}</label><select id="select" ?disabled=${t} @change=${(r) => this.emit("select", r.target.value)}>${y(this.entity) ? d : h`<option value="" disabled selected>${f(this.hass, this.entity)}</option>`}${o.map((r) => h`<option .value=${r} ?selected=${r === this.entity?.state}>${oe(r, this.valueLabels) || f(this.hass, { ...this.entity, state: r })}</option>`)}</select></div>`;
    }
    if (this.kind === "number") {
      const s = Fe(this.entity) ?? Number(this.entity.attributes.min ?? 0), o = Number(this.entity.attributes.min ?? 0), r = Number(this.entity.attributes.max ?? 100), l = Number(this.entity.attributes.step ?? 1);
      return h`<div class="control ${e ? "unavailable" : ""}"><div class="number-head"><label class="label" for="range">${this.label}</label><span class="number-value">${f(this.hass, this.entity)}</span></div><input id="range" type="range" min=${o} max=${r} step=${l} .value=${String(s)} ?disabled=${t} @change=${(a) => this.emit("number", Number(a.target.value))}></div>`;
    }
    const i = oe(this.entity.state, this.valueLabels) || f(this.hass, this.entity);
    return h`<button type="button" class="line status-line ${e ? "unavailable" : ""}" @click=${() => he(this, this.entity.entity_id)} aria-label=${`${this.label}: ${i}`}><span class="label">${this.label}</span><span class="value">${i}</span></button>`;
  }
}
b("hcd-entity-control", Qt);
class Xt extends $ {
  constructor() {
    super(...arguments), this.title = "Section", this.icon = "mdi:tune-variant", this.open = !0;
  }
  static {
    this.properties = { title: {}, icon: {}, open: { type: Boolean, reflect: !0 } };
  }
  static {
    this.styles = B`
    :host { display: block; overflow: hidden; border: 1px solid color-mix(in srgb, var(--divider-color), transparent 28%); border-radius: 8px; background: transparent; }
    button { width: 100%; border: 0; background: none; color: inherit; padding: 11px 12px; display: flex; align-items: center; gap: 8px; font: inherit; cursor: pointer; transition: background 160ms ease; }
    button:hover { background: color-mix(in srgb, var(--hc-accent), transparent 95%); }
    button ha-icon:first-child { color: var(--hc-accent); --mdc-icon-size: 18px; }
    .title { flex: 1; text-align: left; font-weight: 600; font-size: 13px; }
    .chevron { --mdc-icon-size: 17px; color: var(--secondary-text-color); transition: transform 180ms ease; }
    :host([open]) .chevron { transform: rotate(180deg); }
    .body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 200ms ease; }
    :host([open]) .body { grid-template-rows: 1fr; }
    .clip { overflow: hidden; min-height: 0; }
    .content { padding: 0 12px 11px; }
    @media (prefers-reduced-motion: reduce) { .body, .chevron { transition: none; } }
  `;
  }
  render() {
    return h`<button type="button" @click=${() => this.open = !this.open} aria-expanded=${String(this.open)}><ha-icon .icon=${this.icon}></ha-icon><span class="title">${this.title}</span><ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon></button>${this.open ? h`<div class="body"><div class="clip"><div class="content"><slot></slot></div></div></div>` : ""}`;
  }
}
b("hcd-expandable-section", Xt);
class ei extends $ {
  constructor() {
    super(...arguments), this.actions = [], this.busyIds = /* @__PURE__ */ new Set(), this.confirmingId = "";
  }
  static {
    this.properties = { actions: { attribute: !1 }, busyIds: { attribute: !1 }, confirmingId: {} };
  }
  static {
    this.styles = B`
    :host { display:block; } .row { display:flex; gap:8px; flex-wrap:wrap; }
    button { min-height:44px; flex:1; display:flex; align-items:center; justify-content:center; gap:8px; border:1px solid var(--divider-color); border-radius:10px; padding:10px 16px; background:var(--card-background-color); color:var(--primary-text-color); font:inherit; font-size:13px; font-weight:600; cursor:pointer; }
    button.primary { background:var(--hc-accent); color:white; border-color:var(--hc-accent); }
    button.confirming { background:var(--warning-color,#b8691c); color:white; }
    button:disabled { opacity:.45; cursor:not-allowed; }
    ha-icon { --mdc-icon-size:18px; }
    button:focus-visible { outline:2px solid var(--hc-accent); outline-offset:2px; }
  `;
  }
  render() {
    return h`<div class="row">${this.actions.map((e) => {
      const t = this.busyIds.has(e.entityId), i = this.confirmingId === e.entityId;
      return h`<button type="button" class="${e.primary ? "primary" : ""} ${e.danger ? "danger" : ""} ${i ? "confirming" : ""} ${t ? "busy" : ""}" ?disabled=${e.disabled || t} @click=${() => this.dispatchEvent(new CustomEvent("hcd-action", { detail: e, bubbles: !0, composed: !0 }))}><ha-icon .icon=${t ? "mdi:loading" : i ? "mdi:alert-circle-outline" : e.icon}></ha-icon><span>${i && e.confirmLabel || e.label}</span></button>`;
    })}</div>`;
  }
}
b("hcd-action-buttons", ei);
const ti = {
  program: { title: "Program", icon: "mdi:tune-variant" },
  options: { title: "Options", icon: "mdi:toggle-switch-outline" },
  status: { title: "Status & care", icon: "mdi:information-outline" },
  settings: { title: "Device settings", icon: "mdi:cog-outline" }
};
class G extends $ {
  constructor() {
    super(...arguments), this._expanded = !1, this._busyIds = /* @__PURE__ */ new Set(), this._error = "", this._confirmingId = "", this._expandedByUser = !1, this._discoveryAnchor = "", this._discovering = !1;
  }
  static {
    this.properties = {
      hass: { attribute: !1 },
      _config: { state: !0 },
      _expanded: { state: !0 },
      _busyIds: { state: !0 },
      _error: { state: !0 },
      _confirmingId: { state: !0 }
    };
  }
  static {
    this.styles = [Dt, B`
    .section-grid { display:grid; grid-template-columns:minmax(0,1fr); gap:10px 20px; }
    .entity-slot { min-width:0; border-bottom:1px solid var(--divider-color); padding-block:6px; }
    .primary-grid { display:grid; gap:12px; }
    .primary-grid hcd-entity-control { padding:8px 0; border-bottom:1px solid var(--divider-color); }
    .zones { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
    .zone-pair { display:flex; flex-direction:column; gap:10px; min-width:0; }
    .zone-pair.combined { gap:0; border:2px solid var(--hc-accent); border-radius:16px; overflow:hidden; background:var(--secondary-background-color); }
    .pair-label { padding:8px 12px; font-size:12px; font-weight:650; color:var(--hc-accent); border-bottom:1px solid var(--divider-color); }
    .zone-pair.combined .zone { border-radius:0; border:0; flex:1; }
    .zone-pair.move { border-top:0; border-bottom:0; border-radius:0; background:transparent; }
    .zone-pair.move .pair-label { border:0; }
    .move-levels { display:flex; flex-direction:column; gap:22px; padding:14px 12px 22px; }
    .move-level { display:flex; align-items:center; justify-content:space-between; gap:8px; }
    .move-level span { font-size:12px; color:var(--secondary-text-color); }
    .move-level strong { font-size:26px; font-weight:650; }
    .zone-pair.move .zone { padding:8px 12px; background:transparent; }
    .zone-pair.move .zone-power { font-size:16px; margin:4px 0; }
    .zone-pair.combined .zone.hot { box-shadow:inset 3px 0 var(--warning-color,#d57825); }
    .zone { width:100%; min-width:0; text-align:left; color:inherit; background:var(--secondary-background-color); border:1px solid var(--divider-color); border-radius:14px; padding:14px; cursor:pointer; }
    .zone.active { border-color:var(--hc-accent); background:color-mix(in srgb,var(--hc-accent),transparent 94%); }
    .zone.hot { border-color:var(--warning-color,#d57825); }
    .zone-title { display:flex; justify-content:space-between; gap:8px; font-size:12px; font-weight:650; }
    .zone-power { display:block; margin:16px 0 8px; font-size:30px; font-weight:650; font-variant-numeric:tabular-nums; }
    .zone-meta { display:block; font-size:12px; color:var(--secondary-text-color); line-height:1.7; }
    .hot-label { color:var(--warning-color,#d57825); font-size:12px; }
    .stage-buttons { display:flex; gap:6px; flex-wrap:wrap; }
    .stage { min-width:44px; min-height:44px; border:1px solid var(--divider-color); border-radius:10px; padding:8px 12px; background:var(--card-background-color); color:var(--primary-text-color); font:inherit; cursor:pointer; }
    .stage.selected { background:var(--hc-accent); color:white; border-color:var(--hc-accent); }
    .stage:disabled { opacity:.45; cursor:not-allowed; }
    .hood-panel { padding:18px; border-radius:14px; border:1px solid var(--divider-color); background:var(--secondary-background-color); display:grid; gap:16px; }
    .section-label { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--secondary-text-color); }
    .hood-level { font-size:32px; font-weight:650; letter-spacing:-.04em; }
    .inline-control { padding:4px 0; }
    .read-only-note { margin:8px 0 0; color:var(--secondary-text-color); font-size:11px; }
    @container (max-width:420px) { .section-grid { grid-template-columns:1fr; } }
  `];
  }
  setConfig(e) {
    if (!e || typeof e != "object") throw new Error("Invalid card configuration.");
    const t = !this._config, i = this._config?.default_expanded !== e.default_expanded;
    this._manualConfig = { ...e }, this._discoveryAnchor = "", this._config = { ...e }, (t || i && !this._expandedByUser) && (this._expanded = e.default_expanded === !0);
  }
  updated() {
    const e = this._config?.entity || "", t = v(this._config);
    if (!this.hass || !t || this._config?.auto_detect === !1 || this._discovering || t === this._discoveryAnchor && this._registrySnapshot === this.hass.entities || !this._config?.device_id && Object.keys(this._config).some((s) => s.endsWith("_entity"))) return;
    this._discoveryAnchor = t, this._registrySnapshot = this.hass.entities;
    const i = this._manualConfig || this._config;
    this._discovering = !0, Re(this.hass, e, this.definition, i).then((s) => {
      if (v(this._config) !== t) return;
      const o = this._manualConfig || i, r = Object.fromEntries(Object.entries(s).filter(([l]) => !o[l]));
      this._config = { ...o, ...r };
    }).catch((s) => {
      this._error = s instanceof Error ? s.message : "Automatic discovery failed.";
    }).finally(() => {
      this._discovering = !1, this.requestUpdate();
    });
  }
  getCardSize() {
    return this._expanded ? 10 : this.definition.kind === "hob" || this.definition.kind === "hood" ? 6 : 7;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 3, rows: "auto" };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearConfirmation();
  }
  shouldUpdate(e) {
    if (!e.has("hass") || !this._config) return !0;
    const t = e.get("hass");
    return this._config.device_id && (t?.entities !== this.hass?.entities || t?.devices?.[this._config.device_id] !== this.hass?.devices?.[this._config.device_id]) ? !0 : Ht(t, this.hass, Bt(this._config));
  }
  getState(e) {
    return this._config && Rt(this.hass, this._config, e);
  }
  toggleExpanded() {
    this._expandedByUser = !0, this._expanded = !this._expanded;
  }
  infoEntityId() {
    if (this._config)
      for (const e of ["entity", "operating_state_entity", "status_entity", "power_state_entity", "power_entity"]) {
        const t = this._config[e];
        if (typeof t == "string" && t.includes(".")) return t;
      }
  }
  showMoreInfo() {
    const e = this.infoEntityId();
    e && he(this, e);
  }
  clearConfirmation() {
    this._confirmationTimer !== void 0 && window.clearTimeout(this._confirmationTimer), this._confirmationTimer = void 0, this._confirmingId = "";
  }
  supportsField(e) {
    return this.definition.fields.some((t) => t.key === e);
  }
  isOffline() {
    const e = this.getState("connection_entity");
    return !!e && !Y(e);
  }
  primaryFieldKeys() {
    const e = ["selected_program_entity"];
    return {
      coffee: [...e, "fill_quantity_select_entity", "fill_quantity_entity", "bean_amount_entity", "aroma_entity"],
      oven: [...e, "target_temperature_entity", "duration_entity"],
      dishwasher: e,
      hood: ["hood_level_entity", "fan_entity", "working_light_entity", "ambient_light_entity"],
      hob: []
    }[this.definition.kind] || [];
  }
  renderPrimary(e) {
    if (!this._config || !this.hass) return d;
    const t = this.definition.fields.filter((i) => this.primaryFieldKeys().includes(i.key)).filter((i) => Se(i.key, this.hass, this._config)).map((i) => ({ field: i, entity: this.getState(i.key) })).filter((i) => !!i.entity);
    return h`<div class="primary-grid">${t.map(({ field: i, entity: s }) => h`
      <hcd-entity-control .hass=${this.hass} .entity=${s} .label=${P(this.hass, i)} .kind=${this.controlKind(i, s)}
        .valueLabels=${i.key === "selected_program_entity" ? this._config?.program_names || {} : {}}
        .busy=${this._busyIds.has(s.entity_id)}></hcd-entity-control>
    `)}</div>`;
  }
  configuredFields(e) {
    return !this._config || !this.hass ? [] : this.definition.fields.filter((t) => t.section === e).filter((t) => !this.primaryFieldKeys().includes(t.key) && !t.key.startsWith("zone_")).filter((t) => Se(t.key, this.hass, this._config)).filter((t) => !["active_program_entity", "progress_entity", "remaining_time_entity"].includes(t.key)).map((t) => ({ field: t, entity: this.getState(t.key) })).filter(({ entity: t }) => !!t);
  }
  async withBusy(e, t) {
    if (!this._busyIds.has(e.entity_id)) {
      this._busyIds = new Set(this._busyIds).add(e.entity_id), this._error = "";
      try {
        await t();
      } catch (i) {
        this._error = i instanceof Error ? i.message : "The Home Assistant service call failed.";
      } finally {
        const i = new Set(this._busyIds);
        i.delete(e.entity_id), this._busyIds = i;
      }
    }
  }
  handleControl(e) {
    const { entity: t, action: i, value: s } = e.detail;
    this.withBusy(t, async () => {
      this.hass && (i === "brightness" && typeof s == "number" && await Gt(this.hass, t, s), i === "fan" && typeof s == "number" && await Jt(this.hass, t, s), i === "press" && await Ee(this.hass, t), i === "toggle" && await Vt(this.hass, t), i === "select" && typeof s == "string" && await Ue(this.hass, t, s), i === "number" && typeof s == "number" && await Kt(this.hass, t, s));
    });
  }
  handleAction(e) {
    const t = e.detail;
    if (t.danger && this._config?.confirm_cancel !== !1 && this._confirmingId !== t.entityId) {
      this.clearConfirmation(), this._confirmingId = t.entityId, this._confirmationTimer = window.setTimeout(() => this.clearConfirmation(), 5e3);
      return;
    }
    this.clearConfirmation();
    const i = this.hass?.states[t.entityId];
    i && this.withBusy(i, () => Ee(this.hass, i));
  }
  renderPower() {
    const e = this.getState("power_entity") || this.getState("power_state_entity");
    if (!e) return d;
    const t = e.entity_id.split(".")[0], i = t === "select" || t === "input_select" ? "select" : t === "light" ? "light" : t === "switch" || t === "input_boolean" ? "toggle" : "status";
    return h`<div class="power-row"><hcd-entity-control .hass=${this.hass} .entity=${e} .label=${_(this.hass, "power", "Power")} .kind=${i} .busy=${this._busyIds.has(e.entity_id)}></hcd-entity-control></div>`;
  }
  renderActions(e) {
    if (!this._config || !this.hass || e === "off" || e === "unavailable") return d;
    const i = (e === "paused" ? [["resume_entity", _(this.hass, "action.resume", "Resume"), "mdi:play", !0, !1], ["cancel_entity", _(this.hass, "action.cancel", "Cancel"), "mdi:stop", !1, !0]] : e === "running" ? [["pause_entity", _(this.hass, "action.pause", "Pause"), "mdi:pause", !1, !1], ["cancel_entity", _(this.hass, "action.cancel", "Cancel"), "mdi:stop", !1, !0]] : [["start_entity", _(this.hass, "action.start", "Start"), "mdi:play", !0, !1]]).flatMap(([s, o, r, l, a]) => {
      if (!this.definition.fields.some((g) => g.key === s)) return [];
      const c = this._config?.[s], p = typeof c == "string" ? this.hass?.states[c] : void 0, u = p?.entity_id.split(".")[0];
      return p ? [{ key: s, label: o, confirmLabel: a ? _(this.hass, "action.confirm_cancel", "Confirm cancel") : void 0, icon: r, entityId: c, primary: l, danger: a, disabled: p.state === "unavailable" || u !== "button" && u !== "input_button" }] : [];
    });
    return i.length ? h`<div class="primary-actions"><hcd-action-buttons .actions=${i} .busyIds=${this._busyIds} .confirmingId=${this._confirmingId}></hcd-action-buttons></div>` : d;
  }
  renderSection(e) {
    if (!this._config || e === "options" && this._config.show_options_section === !1 || e === "status" && this._config.show_status_section === !1 || e === "settings" && this._config.show_settings_section === !1) return d;
    const t = this.configuredFields(e);
    if (!t.length) return d;
    const i = ti[e];
    return h`<hcd-expandable-section .title=${_(this.hass, `section.${e}`, i.title)} .icon=${i.icon} .open=${!1}>
      <div class="section-grid ${e === "program" ? "program-grid" : ""}">${t.map(({ field: s, entity: o }) => h`
        <div class="entity-slot"><hcd-entity-control .hass=${this.hass} .entity=${o} .label=${P(this.hass, s)} .kind=${this.controlKind(s, o)}
          .valueLabels=${s.key === "selected_program_entity" || s.key === "active_program_entity" ? this._config?.program_names || {} : {}}
          .busy=${this._busyIds.has(o.entity_id)}></hcd-entity-control>
        </div>
      `)}</div>
    </hcd-expandable-section>`;
  }
  controlKind(e, t) {
    if (e.kind === "status" || e.kind === "button") return e.kind;
    const i = t.entity_id.split(".")[0];
    return i === "select" || i === "input_select" ? "select" : i === "number" || i === "input_number" ? "number" : i === "light" ? "light" : i === "fan" ? "fan" : i === "switch" || i === "input_boolean" ? "toggle" : "status";
  }
  render() {
    if (!this._config || !this.hass) return d;
    if (!v(this._config) && !Object.keys(this._config).some((g) => g.endsWith("_entity")))
      return h`<ha-card><div class="daily-controls" style="padding-top:20px">${_(this.hass, "direct.select_device", "Choose the appliance in the card editor.")}</div></ha-card>`;
    const e = this.getState("operating_state_entity") || this.getState("status_entity") || this.getState("power_entity"), t = this.getState("power_entity"), i = Wt(t, e), s = qt(i), o = i === "off" && t ? t : e, r = s ? this.getState("active_program_entity") || this.getState("selected_program_entity") : this.getState("selected_program_entity"), l = this.getState("remaining_time_entity") || this.getState("finish_at_entity"), a = Ut(this.getState("progress_entity")), c = this.definition.fields.filter((g) => g.warning).map((g) => ({ field: g, entity: this.getState(g.key) })).filter(({ field: g, entity: m }) => m && jt(m, g.warningStates, g.warningBelow)), p = this.definition.fields.filter((g) => g.prominent).map((g) => this.getState(g.key)).filter(y), u = Zt(this._config.accent_color, this.definition.accent);
    return h`<ha-card style=${Ot({ "--hc-accent": u })} @hcd-control=${this.handleControl} @hcd-action=${this.handleAction}>
      <div class="shell">
        <header class="card-header">
          <button class="identity" type="button" @click=${this.showMoreInfo}>
            <span class="eyebrow">HOME CONNECT DIRECT · ${_(this.hass, "device." + this.definition.kind, this.definition.defaultName)}</span>
            <span class="card-title">${this._config.name || this.hass.devices?.[this._config.device_id || ""]?.name_by_user || this.hass.devices?.[this._config.device_id || ""]?.name || _(this.hass, "device." + this.definition.kind, this.definition.defaultName)}</span>
          </button>
          <span class="state-label ${i}">${this.getState("connection_entity") ? h`<span class="connection-dot ${this.isOffline() ? "offline" : ""}" title=${_(this.hass, this.isOffline() ? "direct.disconnected" : "direct.connected", this.isOffline() ? "Device disconnected" : "Connected")}></span>` : d}${o ? f(this.hass, o) : _(this.hass, "ready", "Ready")}</span>
        </header>
        ${c.length ? h`<div class="warning-strip">${c.map(({ field: g, entity: m }) => h`<span class="notice">${P(this.hass, g)}${m?.entity_id.startsWith("binary_sensor.") ? "" : ": " + f(this.hass, m)}</span>`)}</div>` : d}
        ${s && y(r) ? h`<div class="now-running"><span>${Yt(this.hass, r, this._config.program_names)}</span>${y(l) ? h`<strong>${f(this.hass, l)}</strong>` : d}</div>` : d}
        ${s && a !== void 0 && this._config.show_progress !== !1 ? h`<div class="progress-line"><span style=${`width:${a}%`}></span></div>` : d}
        ${p.length ? h`<div class="key-metrics">${p.map((g) => h`<strong>${f(this.hass, g)}</strong>`)}</div>` : d}
        <div class="daily-controls">
          ${this.definition.kind !== "hood" ? this.renderPower() : d}
          ${this.renderPrimary(i)}
          ${this.renderActions(i)}
        </div>
        <footer><button class="details-button" type="button" @click=${this.toggleExpanded} aria-expanded=${String(this._expanded)}>${_(this.hass, "direct.details", "Details & settings")} <span>${this._expanded ? "−" : "+"}</span></button></footer>
        ${this._expanded ? h`<div class="details-content">
          ${this.renderSection("program")}
          ${this.renderSection("options")}
          ${this.renderSection("status")}
          ${this.renderSection("settings")}
        </div>` : d}
        ${this._error ? h`<div class="error" role="alert">${this._error}<button @click=${() => {
      this._error = "";
    }}>×</button></div>` : d}
      </div>
    </ha-card>`;
  }
}
class ii extends G {
  constructor() {
    super(...arguments), this.definition = M;
  }
  static getConfigElement() {
    return document.createElement(M.editorTag);
  }
  static getStubConfig() {
    return { name: M.defaultName };
  }
}
b("hc-direct-dishwasher-card", ii);
class ni extends G {
  constructor() {
    super(...arguments), this.definition = N;
  }
  static getConfigElement() {
    return document.createElement(N.editorTag);
  }
  static getStubConfig() {
    return { name: N.defaultName };
  }
}
b("hc-direct-oven-card", ni);
class si extends G {
  constructor() {
    super(...arguments), this.definition = I;
  }
  static getConfigElement() {
    return document.createElement(I.editorTag);
  }
  static getStubConfig() {
    return { name: I.defaultName };
  }
}
b("hc-direct-coffee-card", si);
class oi extends G {
  constructor() {
    super(...arguments), this.definition = z;
  }
  static getConfigElement() {
    return document.createElement(z.editorTag);
  }
  static getStubConfig() {
    return {};
  }
  renderPrimary() {
    if (!this.hass) return d;
    const e = this.getState("hood_level_entity"), t = this.getState("fan_entity"), i = this.getState("working_light_entity"), s = this.getState("ambient_light_entity"), o = !R(e) || !!e && Z(e) || !!e && this._busyIds.has(e.entity_id), r = e?.attributes.options || [];
    return h`
      <div class="hood-panel">
        <span class="section-label">${_(this.hass, "field.fan_entity", "Fan")}</span>
        ${e ? h`
          <div class="hood-level">${f(this.hass, e)}</div>
          <div class="stage-buttons">${r.map((l) => h`
            <button type="button" class="stage ${l === e.state ? "selected" : ""}" aria-pressed=${String(l === e.state)}
              aria-label=${f(this.hass, { ...e, state: l })} ?disabled=${o}
              @click=${() => {
      this.withBusy(e, () => Ue(this.hass, e, l));
    }}>
              ${/^fanstage0*\d+$/i.test(l) ? Number(l.match(/\d+$/)[0]) : f(this.hass, { ...e, state: l })}
            </button>`)}</div>
        ` : t ? h`<hcd-entity-control .hass=${this.hass} .entity=${t} kind="fan" .label=${_(this.hass, "field.fan_entity", "Fan")}></hcd-entity-control>` : d}
      </div>
      ${[["working_light_entity", i], ["ambient_light_entity", s]].map(([l, a]) => a && typeof a != "string" ? h`
        <div class="inline-control"><hcd-entity-control .hass=${this.hass} .entity=${a} kind="light" .busy=${this._busyIds.has(a.entity_id)}
          .label=${P(this.hass, z.fields.find((c) => c.key === l))}></hcd-entity-control></div>` : d)}
      <div class="section-grid">${["grease_filter_entity", "carbon_filter_entity"].map((l) => {
      const a = this.getState(l);
      return a ? h`<hcd-entity-control .hass=${this.hass} .entity=${a} kind="status" .label=${P(this.hass, z.fields.find((c) => c.key === l))}></hcd-entity-control>` : d;
    })}</div>
    `;
  }
}
b(z.cardType.replace("custom:", ""), oi);
function ri(n) {
  return y(n) && ["residuelheat", "residualheat"].includes(w(n));
}
function ai(n, e) {
  return [n, e].some((t) => y(t) && ["active", "run", "pause", "actionrequired"].includes(w(t)));
}
const li = [
  { side: "left", zones: ["200", "100"] },
  { side: "right", zones: ["300", "400"] }
];
function ci(n, e) {
  return y(e) && /(?:^|cookinghobprogram)powermovemode$/.test(w(e)) ? "move" : y(n) && w(n) === "joinmode" ? "join" : "";
}
class di extends G {
  constructor() {
    super(...arguments), this.definition = D;
  }
  static getConfigElement() {
    return document.createElement(D.editorTag);
  }
  static getStubConfig() {
    return {};
  }
  primaryFieldKeys() {
    return ["bridge_mode_entity", "hob_mode_entity"];
  }
  renderPrimary() {
    if (!this.hass) return d;
    const e = (l) => ["state", "operation", "power", "remaining"].some((a) => !!this.getState("zone_" + l + "_" + a + "_entity")), t = this.getState("bridge_mode_entity"), i = this.getState("hob_mode_entity"), s = ci(t, i), o = i?.attributes.options?.filter((l) => /(?:[._])(?:powerlevelmode|powermovemode|fryingsensormode)$/i.test(l)) || [], r = i && { ...i, attributes: { ...i.attributes, options: o } };
    return h`
    <div class="section-grid">
      ${t ? h`<hcd-entity-control .hass=${this.hass} .entity=${t} kind="select" .label=${_(this.hass, "field.bridge_mode_entity", "Join / split zones")} .busy=${this._busyIds.has(t.entity_id)}></hcd-entity-control>` : d}
      ${r && o.length ? h`<hcd-entity-control .hass=${this.hass} .entity=${r} kind="select" .label=${_(this.hass, "field.hob_mode_entity", "Power mode")} .busy=${this._busyIds.has(r.entity_id)}></hcd-entity-control>` : d}
    </div>
    ${t ? d : h`<p class="read-only-note">${_(this.hass, "direct.join_missing", "No Join entity assigned. Enable or assign the zone bridge mode entity in the editor.")}</p>`}
    <div class="zones">${li.map((l) => h`
      <div class="zone-pair ${s ? "combined " + s : ""}" data-side=${l.side}>
      ${s ? h`<div class="pair-label">${s === "move" ? "powerMove" : "Join"} · ${l.zones.join(" + ")}</div>` : d}
      ${s === "move" ? h`<div class="move-levels">
        ${["rear", "middle", "front"].map((a) => {
      const c = this.getState("power_move_" + a + "_" + l.side + "_entity");
      return h`<div class="move-level"><span>${_(this.hass, "direct.move_" + a, a === "rear" ? "Rear" : a === "middle" ? "Middle" : "Front")}</span><strong>${f(this.hass, c)}</strong></div>`;
    })}
      </div>` : d}
      ${l.zones.filter(e).map((a) => {
      const c = (Ze) => this.getState("zone_" + a + "_" + Ze + "_entity"), p = c("state"), u = c("operation"), g = c("power"), m = c("remaining"), k = c("frying"), _e = ri(p), je = ai(p, u), ue = p || g || u || m;
      return h`<button type="button" data-zone=${a} class="zone ${_e ? "hot" : je ? "active" : ""}" @click=${() => ue && he(this, ue.entity_id)}
        aria-label=${"Zone " + a + ": " + f(this.hass, p || u)}>
        <span class="zone-title">Zone ${a}<span>${f(this.hass, u || p)}</span></span>
        <span class="zone-power">${f(this.hass, g)}</span>
        ${_e ? h`<span class="hot-label">${_(this.hass, "direct.residual_heat", "Residual heat")}</span>` : d}
        ${y(m) ? h`<span class="zone-meta">${_(this.hass, "field.remaining_time_entity", "Remaining time")}: ${f(this.hass, m)}</span>` : d}
        ${y(k) && k.state !== "off" ? h`<span class="zone-meta">${_(this.hass, "direct.frying", "Frying sensor")}: ${f(this.hass, k)}</span>` : d}
      </button>`;
    })}</div>`)}</div><p class="read-only-note">${_(this.hass, "direct.hob_readonly", "Zone values are read-only. Tap a zone for details.")}</p>`;
  }
}
b(D.cardType.replace("custom:", ""), di);
const hi = {
  dishwasher: ["dishwasher", "dish care", "dishcare", "geschirrspuler", "spulmaschine"],
  oven: ["oven", "backofen", "herd"],
  coffee: ["coffee maker", "coffeemaker", "coffee machine", "kaffeemaschine", "kaffeevollautomat", "espresso"],
  hood: ["hood", "dunstabzug", "haube", "extractor"],
  hob: ["hob", "kochfeld", "cooktop"]
};
function Ce(n) {
  return n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function _i(n, e, t) {
  const i = n.states[e];
  if (!i) return !1;
  const s = Ce([
    e,
    i.attributes.friendly_name,
    i.attributes.device_class,
    i.attributes.icon
  ].filter(Boolean).join(" "));
  return hi[t].some((o) => s.includes(Ce(o)));
}
const ui = [M, N, I, z, D];
window.customCards = window.customCards || [];
for (const n of ui)
  window.customCards.some((e) => e.type === n.cardType.replace("custom:", "")) || window.customCards.push({
    type: n.cardType.replace("custom:", ""),
    name: n.displayName,
    description: n.description,
    preview: !0,
    documentationURL: "https://github.com/Asmir1975/hc-direct-cards",
    getEntitySuggestion: (e, t) => _i(e, t, n.kind) ? { config: { type: n.cardType, entity: t } } : null
  });
console.info(`%c HOME-CONNECT-DIRECT-CARDS %c v${He} `, "color:white;background:#445b78;font-weight:700", "color:#445b78;background:#eef2f7");
