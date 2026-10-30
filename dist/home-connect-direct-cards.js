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
const ee = globalThis, de = ee.ShadowRoot && (ee.ShadyCSS === void 0 || ee.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, he = /* @__PURE__ */ Symbol(), ye = /* @__PURE__ */ new WeakMap();
let Oe = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== he) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (de && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ye.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ye.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Je = (n) => new Oe(typeof n == "string" ? n : n + "", void 0, he), U = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new Oe(t, n, he);
}, Ye = (n, e) => {
  if (de) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = ee.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, n.appendChild(i);
  }
}, be = de ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Je(t);
})(n) : n;
const { is: Qe, defineProperty: Xe, getOwnPropertyDescriptor: et, getOwnPropertyNames: tt, getOwnPropertySymbols: it, getPrototypeOf: nt } = Object, ie = globalThis, ve = ie.trustedTypes, st = ve ? ve.emptyScript : "", rt = ie.reactiveElementPolyfillSupport, Z = (n, e) => n, le = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? st : null;
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
} }, Re = (n, e) => !Qe(n, e), we = { attribute: !0, type: String, converter: le, reflect: !1, useDefault: !1, hasChanged: Re };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ie.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let P = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = we) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Xe(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: r } = et(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: s, set(o) {
      const l = s?.call(this);
      r?.call(this, o), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? we;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Z("elementProperties"))) return;
    const e = nt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Z("properties"))) {
      const t = this.properties, i = [...tt(t), ...it(t)];
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
      for (const s of i) t.unshift(be(s));
    } else e !== void 0 && t.push(be(e));
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
    return Ye(e, this.constructor.elementStyles), e;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : le).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : le;
      this._$Em = s;
      const l = o.fromAttribute(t, r.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, r) {
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? Re)(r, t) || i.useDefault && i.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: r }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, r] of i) {
        const { wrapped: o } = r, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, r, l);
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
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[Z("elementProperties")] = /* @__PURE__ */ new Map(), P[Z("finalized")] = /* @__PURE__ */ new Map(), rt?.({ ReactiveElement: P }), (ie.reactiveElementVersions ??= []).push("2.1.2");
const _e = globalThis, $e = (n) => n, te = _e.trustedTypes, ke = te ? te.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Le = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, Fe = "?" + S, ot = `<${Fe}>`, T = document, q = () => T.createComment(""), W = (n) => n === null || typeof n != "object" && typeof n != "function", ue = Array.isArray, at = (n) => ue(n) || typeof n?.[Symbol.iterator] == "function", re = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xe = /-->/g, Se = />/g, A = RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ze = /'/g, Ae = /"/g, Be = /^(?:script|style|textarea|title)$/i, lt = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), _ = lt(1), M = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), Ee = /* @__PURE__ */ new WeakMap(), C = T.createTreeWalker(T, 129);
function He(n, e) {
  if (!ue(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ke !== void 0 ? ke.createHTML(e) : e;
}
const ct = (n, e) => {
  const t = n.length - 1, i = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = j;
  for (let l = 0; l < t; l++) {
    const a = n[l];
    let c, u, p = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, u = o.exec(a), u !== null); ) f = o.lastIndex, o === j ? u[1] === "!--" ? o = xe : u[1] !== void 0 ? o = Se : u[2] !== void 0 ? (Be.test(u[2]) && (s = RegExp("</" + u[2], "g")), o = A) : u[3] !== void 0 && (o = A) : o === A ? u[0] === ">" ? (o = s ?? j, p = -1) : u[1] === void 0 ? p = -2 : (p = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? A : u[3] === '"' ? Ae : ze) : o === Ae || o === ze ? o = A : o === xe || o === Se ? o = j : (o = A, s = void 0);
    const b = o === A && n[l + 1].startsWith("/>") ? " " : "";
    r += o === j ? a + ot : p >= 0 ? (i.push(c), a.slice(0, p) + Le + a.slice(p) + S + b) : a + S + (p === -2 ? l : b);
  }
  return [He(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class V {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, u] = ct(e, t);
    if (this.el = V.createElement(c, i), C.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = C.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(Le)) {
          const f = u[o++], b = s.getAttribute(p).split(S), m = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: r, name: m[2], strings: b, ctor: m[1] === "." ? ht : m[1] === "?" ? _t : m[1] === "@" ? ut : ne }), s.removeAttribute(p);
        } else p.startsWith(S) && (a.push({ type: 6, index: r }), s.removeAttribute(p));
        if (Be.test(s.tagName)) {
          const p = s.textContent.split(S), f = p.length - 1;
          if (f > 0) {
            s.textContent = te ? te.emptyScript : "";
            for (let b = 0; b < f; b++) s.append(p[b], q()), C.nextNode(), a.push({ type: 2, index: ++r });
            s.append(p[f], q());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Fe) a.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(S, p + 1)) !== -1; ) a.push({ type: 7, index: r }), p += S.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = T.createElement("template");
    return i.innerHTML = e, i;
  }
}
function L(n, e, t = n, i) {
  if (e === M) return e;
  let s = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const r = W(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = s : t._$Cl = s), s !== void 0 && (e = L(n, s._$AS(n, e.values), s, i)), e;
}
class dt {
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
    const { el: { content: t }, parts: i } = this._$AD, s = (e?.creationScope ?? T).importNode(t, !0);
    C.currentNode = s;
    let r = C.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new K(r, r.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (c = new pt(r, this, e)), this._$AV.push(c), a = i[++l];
      }
      o !== a?.index && (r = C.nextNode(), o++);
    }
    return C.currentNode = T, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class K {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = L(this, e, t), W(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== M && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : at(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && W(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = V.createElement(He(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(t);
    else {
      const r = new dt(s, this), o = r.u(this.options);
      r.p(t), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Ee.get(e.strings);
    return t === void 0 && Ee.set(e.strings, t = new V(e)), t;
  }
  k(e) {
    ue(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const r of e) s === t.length ? t.push(i = new K(this.O(q()), this.O(q()), this, this.options)) : i = t[s], i._$AI(r), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = $e(e).nextSibling;
      $e(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ne {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(e, t = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = L(this, e, t, 0), o = !W(e) || e !== this._$AH && e !== M, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = r[0], a = 0; a < r.length - 1; a++) c = L(this, l[i + a], t, a), c === M && (c = this._$AH[a]), o ||= !W(c) || c !== this._$AH[a], c === h ? e = h : e !== h && (e += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ht extends ne {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class _t extends ne {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class ut extends ne {
  constructor(e, t, i, s, r) {
    super(e, t, i, s, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = L(this, e, t, 0) ?? h) === M) return;
    const i = this._$AH, s = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== h && (i === h || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class pt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    L(this, e);
  }
}
const mt = _e.litHtmlPolyfillSupport;
mt?.(V, K), (_e.litHtmlVersions ??= []).push("3.3.3");
const gt = (n, e, t) => {
  const i = t?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = t?.renderBefore ?? null;
    i._$litPart$ = s = new K(e.insertBefore(q(), r), r, void 0, t ?? {});
  }
  return s._$AI(n), s;
};
const pe = globalThis;
let k = class extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = gt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return M;
  }
};
k._$litElement$ = !0, k.finalized = !0, pe.litElementHydrateSupport?.({ LitElement: k });
const ft = pe.litElementPolyfillSupport;
ft?.({ LitElement: k });
(pe.litElementVersions ??= []).push("4.2.2");
const yt = {
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
}, bt = {
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
    elapsed_time_entity: [
      "sensor_elapsed_program_time"
    ],
    estimated_time_entity: [
      "sensor_estimated_remaining_program_time"
    ],
    cavity_light_entity: [
      "light_oven_cavity"
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
    smart_start_entity: [
      "switch_smart_start"
    ],
    auto_smart_start_entity: [
      "switch_auto_smart_start"
    ],
    elapsed_time_entity: [
      "sensor_elapsed_program_time"
    ],
    estimated_time_entity: [
      "sensor_estimated_remaining_program_time"
    ],
    extra_dry_entity: [
      "switch_extra_dry"
    ],
    intensive_zone_entity: [
      "switch_intensiv_zone"
    ],
    speed_on_demand_entity: [
      "switch_speed_on_demand"
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
function vt(n, e, t) {
  if (n.platform !== "homeconnect_ws") return;
  const i = bt[e][t] || yt[t] || [], s = n.unique_id?.split("-").pop(), r = i.findIndex((o) => o === n.translation_key || s && new RegExp("^" + o.replace("{cavity}", "\\d+") + "$").test(s));
  return r < 0 ? -1e3 : 1e3 - r;
}
function oe(n) {
  return n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function wt(n, e, t, i) {
  const s = e.entity_id.split(".")[0];
  if (t.domains?.length && !t.domains.includes(s)) return -1e3;
  const r = vt(e, i.kind, t.key);
  if (r !== void 0) return n.states[e.entity_id] && n.states[e.entity_id].attributes.restored !== !0 ? r : -1e3;
  const o = n.states[e.entity_id], l = oe([
    e.entity_id,
    e.name,
    e.original_name,
    o?.attributes.friendly_name,
    o?.attributes.device_class,
    o?.attributes.unit_of_measurement,
    o?.attributes.icon
  ].filter(Boolean).join(" "));
  let a = 10;
  if (t.domains?.length) {
    const u = t.domains.indexOf(s);
    a += (t.domains.length - u) * 8;
  }
  for (const u of t.aliases || []) {
    const p = oe(u);
    l.includes(p) && (a = Math.max(a, 100 + p.length));
  }
  const c = oe(t.key.replace(/_entity$/, "")).split(" ");
  return a += c.filter((u) => l.includes(u)).length * 4, (e.disabled_by || e.hidden_by) && (a -= 50), a;
}
async function Ue(n, e, t, i) {
  const s = await n.callWS({ type: "config/entity_registry/list" }), r = i.device_id ? s.find((c) => c.device_id === i.device_id && c.platform === "homeconnect_ws" && !c.disabled_by && !c.hidden_by && n.states[c.entity_id] && n.states[c.entity_id].attributes.restored !== !0) : s.find((c) => c.entity_id === e);
  if (!r?.device_id) throw new Error("The selected device has no active integration entity, or the anchor has no device registry link.");
  const o = s.filter((c) => c.device_id === r.device_id && !c.disabled_by && !c.hidden_by && (r.platform !== "homeconnect_ws" || c.platform === "homeconnect_ws")), l = {}, a = new Set(Object.entries(i).filter(([c, u]) => c !== "entity" && typeof u == "string" && u.includes(".")).map(([, c]) => c));
  for (const c of t.fields) {
    if (c.key === "entity" || i[c.key]) continue;
    const u = o.filter((p) => !a.has(p.entity_id)).map((p) => ({ entry: p, score: wt(n, p, c, t) })).filter(({ score: p }) => p >= 50).sort((p, f) => f.score - p.score || p.entry.entity_id.localeCompare(f.entry.entity_id));
    u[0] && !(u[0].score >= 980 && u[1]?.score === u[0].score) && (l[c.key] = u[0].entry.entity_id, a.add(u[0].entry.entity_id));
  }
  return { anchor: r, candidates: o, suggestions: l };
}
async function je(n, e, t, i) {
  return (await Ue(n, e, t, i)).suggestions;
}
function $(n) {
  return n?.device_id ? "device:" + n.device_id : n?.entity ? "entity:" + n.entity : "";
}
const $t = {
  "unit.min": "Min.",
  "time.elapsed": "Laufzeit",
  "time.done_in": "Fertig in",
  "time.done_at": "Fertig um {t}",
  "time.estimate": "Geschätzte Dauer",
  "time.done_at_start": "Fertig um {t} bei Start",
  "time.starts_in": "Startet in",
  "time.done_in_delay": "Mit Verzögerung fertig in {d} um {t}",
  "time.smart_changes": "Smart Start: Zeiten können sich ändern",
  "hint.smart_start_locked": "Smart Start ist gesperrt, solange Automatischer Smart Start aus ist.",
  "field.elapsed_time_entity": "Verstrichene Programmlaufzeit",
  "field.estimated_time_entity": "Geschätzte Programmlaufzeit",
  "action.decrease": "Verringern",
  "action.increase": "Erhöhen",
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
  "field.cavity_light_entity": "Garraumlicht",
  "field.smart_start_entity": "Smart Start",
  "field.auto_smart_start_entity": "Automatischer Smart Start",
  "field.extra_dry_entity": "Extratrocknen",
  "field.intensive_zone_entity": "Intensivzone",
  "field.speed_on_demand_entity": "Schnell auf Knopfdruck",
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
}, kt = { de: $t };
function se(n) {
  return (n?.language || n?.locale?.language || "en").toLowerCase().split(/[-_]/)[0];
}
function d(n, e, t) {
  return kt[se(n)]?.[e] || t;
}
function I(n, e) {
  return d(n, `field.${e.key}`, e.label);
}
async function Ce(n) {
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
const Ze = "1.2.0";
function ae(n) {
  return typeof n == "boolean" ? String(n) : /^[A-Za-z0-9_./:%-]+$/.test(n) ? n : JSON.stringify(n);
}
function xt(n, e) {
  const t = [
    "type",
    "device_id",
    "entity",
    "name",
    "icon",
    "accent_color",
    ...e.fields.map((r) => r.key),
    "program_names",
    "default_expanded",
    "animations",
    "confirm_cancel",
    "show_progress",
    "show_remaining_time",
    "show_status_section",
    "show_options_section",
    "show_settings_section"
  ], i = Object.keys(n).filter((r) => !t.includes(r)).sort();
  return `${[.../* @__PURE__ */ new Set([...t, ...i])].flatMap((r) => {
    const o = n[r];
    if (typeof o == "string" || typeof o == "boolean") return [`${r}: ${ae(o)}`];
    if (o && typeof o == "object") {
      const l = Object.entries(o).filter((a) => typeof a[1] == "string" && !!a[1].trim()).sort(([a], [c]) => a.localeCompare(c));
      return l.length ? [`${r}:`, ...l.map(([a, c]) => `  ${ae(a)}: ${ae(c)}`)] : [];
    }
    return [];
  }).join(`
`)}
`;
}
function St(n) {
  return (n || "").replace(/[\r\n]+/g, " ").trim();
}
async function zt(n, e, t, i) {
  const { candidates: s, suggestions: r } = await Ue(n, e, t, i), o = t.fields.flatMap((a) => {
    const c = i[a.key], u = r[a.key], p = typeof c == "string" ? c : typeof u == "string" ? `${u} (suggested)` : "—";
    return [`- ${a.key}: ${p}`];
  }), l = s.slice().sort((a, c) => a.entity_id.localeCompare(c.entity_id)).map((a) => {
    const c = St(a.name || a.original_name);
    return `- ${a.entity_id}${c ? ` | ${c}` : ""}`;
  });
  return [
    "HC Direct Cards – entity discovery report",
    `Version: ${Ze}`,
    `Card: ${t.cardType}`,
    `Anchor: ${e}`,
    "",
    "Role mappings",
    ...o,
    "",
    "Enabled entities found on the same device",
    ...l.length ? l : ["- none"],
    "",
    "Privacy note: No entity states, attributes, device IDs, IP addresses or credentials are included. Entity IDs and names can still contain personal labels; review this report before sharing it.",
    ""
  ].join(`
`);
}
const At = [
  { id: "general", label: "General", icon: "mdi:information-outline" },
  { id: "program", label: "Program", icon: "mdi:tune-variant" },
  { id: "actions", label: "Actions", icon: "mdi:gesture-tap-button" },
  { id: "options", label: "Options", icon: "mdi:toggle-switch-outline" },
  { id: "status", label: "Status & care", icon: "mdi:heart-pulse" },
  { id: "settings", label: "Device settings", icon: "mdi:cog-outline" }
];
class G extends k {
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
    this.styles = U`
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
    const t = $(this._config);
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
    if (!this.hass || !this._config || !$(this._config) || this._discovering) return;
    const e = this._config.entity || "", t = $(this._config);
    this._discovering = !0, this._notice = "";
    try {
      const i = await je(this.hass, e, this.definition, this._config);
      if ($(this._config) !== t) return;
      const s = Object.fromEntries(Object.entries(i).filter(([o]) => !this._config?.[o])), r = Object.keys(s).length;
      this._config.device_id ? (this._detectedFields = s, this.notify({ ...this._config })) : this.notify({ ...this._config, ...s }), this._notice = r ? `${r} ${d(this.hass, "editor.detected", "matching entities added. Review every suggestion before saving.")}` : d(this.hass, "editor.no_matches", "No additional unambiguous matches were found.");
    } catch (i) {
      this._notice = i instanceof Error ? i.message : "Automatic discovery failed.";
    } finally {
      this._discovering = !1, $(this._config) && $(this._config) !== t && this.autoDetect();
    }
  }
  async copyYaml() {
    if (!(!this._config || this._copying)) {
      this._copying = "yaml";
      try {
        await Ce(xt(this._config, this.definition)), this._notice = d(this.hass, "editor.yaml_copied", "YAML configuration copied to the clipboard.");
      } catch (e) {
        this._notice = e instanceof Error ? e.message : "Could not copy the YAML configuration.";
      } finally {
        this._copying = "";
      }
    }
  }
  async copyDiscoveryReport() {
    if (!(!this.hass || !$(this._config) || this._copying)) {
      this._copying = "report";
      try {
        const e = await zt(this.hass, this._config.entity || "", this.definition, this._config);
        await Ce(e), this._notice = d(this.hass, "editor.report_copied", "Entity discovery report copied. Review personal labels before sharing it.");
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
    return _`<div class="field"><label>${d(this.hass, "editor.device", "Appliance")}</label><ha-selector
      .hass=${this.hass} .selector=${{ device: { filter: [{ integration: "homeconnect_ws", model: e[this.definition.kind] }] } }}
      .value=${this._config?.device_id || ""}
      @value-changed=${(t) => this.changeDevice(t.detail.value)}></ha-selector></div>`;
  }
  entitySelector(e) {
    const t = e.domains && e.domains.length === 1 ? e.domains[0] : e.domains;
    return { entity: t ? { domain: t } : {} };
  }
  renderEntityField(e) {
    if (!this._config || !this.hass) return h;
    const t = typeof (this._config[e.key] || this._detectedFields[e.key]) == "string" ? this._config[e.key] || this._detectedFields[e.key] : "";
    return _`<div class="field"><label>${I(this.hass, e)}</label><ha-selector
      .hass=${this.hass} .selector=${this.entitySelector(e)} .value=${t}
      @value-changed=${(i) => {
      this.change(e.key, i.detail.value), e.key === "entity" && i.detail.value && this.autoDetect();
    }}></ha-selector></div>`;
  }
  renderToggle(e, t, i) {
    if (!this._config) return h;
    const s = typeof this._config[e] == "boolean" ? !!this._config[e] : i;
    return _`<div class="toggle"><label for=${e}>${t}</label><ha-switch id=${e} .checked=${s} @change=${(r) => this.change(e, r.currentTarget.checked)}></ha-switch></div>`;
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
    const r = this._config.active_program_entity || this._detectedFields.active_program_entity, o = typeof r == "string" ? this.hass.states[r] : void 0;
    t(o?.state);
    for (const l of Object.keys(this._config.program_names || {})) t(l, !0);
    return e;
  }
  changeProgramName(e, t) {
    if (!this._config) return;
    const i = { ...this._config }, s = { ...i.program_names || {} }, r = t.trim();
    r ? s[e] = r : delete s[e], Object.keys(s).length ? i.program_names = s : delete i.program_names, this.notify(i);
  }
  renderProgramNames() {
    if (!this._config) return h;
    const e = this.availablePrograms();
    if (!e.length) return h;
    const t = this._config.program_names || {};
    return _`<details class="program-names"><summary><ha-icon icon="mdi:rename-box-outline"></ha-icon>${d(this.hass, "editor.program_names", "Rename programs manually")}</summary><div class="program-names-body">
      <p class="program-names-help">${d(this.hass, "editor.program_names_help", "Optional display names only. The original value is still sent to Home Assistant.")}</p>
      ${e.map((i) => _`<label class="program-rename"><code title=${i}>${i}</code><input type="text" .value=${t[i] || ""} placeholder=${d(this.hass, "editor.custom_program_name", "Custom name")} aria-label=${`${d(this.hass, "editor.custom_program_name", "Custom name")}: ${i}`} @change=${(s) => this.changeProgramName(i, s.currentTarget.value)}></label>`)}
    </div></details>`;
  }
  render() {
    return !this._config || !this.hass ? h : _`<div class="editor">
      <p class="intro">${d(this.hass, "editor.intro", "Choose the appliance. Its entities are detected automatically; manual assignments remain editable. An anchor entity is an alternative.")}</p>
      <section class="group"><h3 class="group-title">${d(this.hass, "editor.device", "Appliance")}</h3>${this.renderDeviceField()}</section>
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:palette-outline"></ha-icon>${d(this.hass, "section.appearance", "Appearance")}</h3><div class="fields">
        <div class="field"><label for="name">${d(this.hass, "editor.name", "Name override")}</label><input id="name" type="text" .value=${this._config.name || ""} placeholder=${this.definition.defaultName} @change=${(e) => this.change("name", e.currentTarget.value)}></div>
        <div class="field"><label for="icon">${d(this.hass, "editor.icon", "Icon override")}</label><input id="icon" type="text" .value=${this._config.icon || ""} placeholder=${this.definition.defaultIcon} @change=${(e) => this.change("icon", e.currentTarget.value)}></div>
        <div class="field"><label for="accent_color">${d(this.hass, "editor.accent_color", "Accent color")}</label><input id="accent_color" type="text" .value=${this._config.accent_color || ""} placeholder=${`${this.definition.accent} / var(--primary-color)`} @change=${(e) => this.change("accent_color", e.currentTarget.value)}></div>
      </div></section>
      <details><summary>${d(this.hass, "editor.manual_mapping", "Manual mapping (optional)")}</summary>${At.map((e) => {
      const t = this.definition.fields.filter((i) => i.section === e.id);
      return t.length ? _`<section class="group"><h3 class="group-title"><ha-icon .icon=${e.icon}></ha-icon>${d(this.hass, `section.${e.id}`, e.label)}</h3><div class="fields">${t.map((i) => this.renderEntityField(i))}
          ${e.id === "program" ? this.renderProgramNames() : ""}
          ${e.id === "general" ? _`
            <button type="button" class="detect" ?disabled=${!$(this._config) || this._discovering} @click=${this.autoDetect}><ha-icon class=${this._discovering ? "loading" : ""} .icon=${this._discovering ? "mdi:loading" : "mdi:auto-fix"}></ha-icon>${d(this.hass, "editor.detect", "Detect device entities")}</button>
            <div class="tool-row">
              <button type="button" class="tool" ?disabled=${!!this._copying} @click=${this.copyYaml}><ha-icon icon="mdi:content-copy"></ha-icon>${d(this.hass, "editor.copy_yaml", "Copy YAML")}</button>
              <button type="button" class="tool" ?disabled=${!$(this._config) || !!this._copying} @click=${this.copyDiscoveryReport}><ha-icon class=${this._copying === "report" ? "loading" : ""} .icon=${this._copying === "report" ? "mdi:loading" : "mdi:clipboard-text-search-outline"}></ha-icon>${d(this.hass, "editor.copy_report", "Copy discovery report")}</button>
            </div>
            ${this._notice ? _`<div class="notice" role="status">${this._notice}</div>` : ""}` : ""}
        </div></section>` : h;
    })}</details>
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:eye-outline"></ha-icon>${d(this.hass, "section.layout", "Layout & behavior")}</h3><div class="fields">
        ${this.renderToggle("default_expanded", d(this.hass, "option.default_expanded", "Expanded by default"), !1)}
        ${this.renderToggle("animations", d(this.hass, "option.animations", "Animations"), !0)}
        ${this.renderToggle("confirm_cancel", d(this.hass, "option.confirm_cancel", "Require a second tap to cancel a program"), !0)}
        ${this.renderToggle("show_progress", d(this.hass, "option.show_progress", "Show progress"), !0)}
        ${this.renderToggle("show_remaining_time", d(this.hass, "option.show_remaining_time", "Show remaining time"), !0)}
        ${this.renderToggle("show_status_section", d(this.hass, "option.show_status_section", "Show status section"), !0)}
        ${this.definition.fields.some((e) => e.section === "options") ? this.renderToggle("show_options_section", d(this.hass, "option.show_options_section", "Show options section"), !0) : h}
        ${this.renderToggle("show_settings_section", d(this.hass, "option.show_settings_section", "Show device settings"), !0)}
      </div></section>
    </div>`;
  }
}
const J = [
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
], N = {
  kind: "dishwasher",
  cardType: "custom:hc-direct-dishwasher-card",
  editorTag: "hc-direct-dishwasher-card-editor",
  displayName: "HC Direct · Dishwasher",
  description: "Compact controls and status for a Home Connect dishwasher.",
  defaultName: "Dishwasher",
  defaultIcon: "mdi:dishwasher",
  accent: "#4f8cff",
  fields: [
    ...J.filter((n) => n.key !== "pause_entity" && n.key !== "resume_entity"),
    { key: "phase_entity", label: "Program phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["program phase", "programmphase"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tur"] },
    { key: "water_entity", label: "Estimated water", section: "status", kind: "status", domains: ["sensor"], aliases: ["water consumption", "wasserverbrauch"] },
    { key: "energy_entity", label: "Estimated energy", section: "status", kind: "status", domains: ["sensor"], aliases: ["energy consumption", "energieverbrauch"] },
    { key: "salt_entity", label: "Salt", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["salt", "salz"], warning: !0 },
    { key: "rinse_aid_entity", label: "Rinse aid", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["rinse aid", "klarspuler"], warning: !0 },
    { key: "vario_speed_entity", label: "VarioSpeed Plus", section: "options", kind: "toggle", domains: ["switch"], aliases: ["variospeed"] },
    { key: "hygiene_entity", label: "Hygiene Plus", section: "options", kind: "toggle", domains: ["switch"], aliases: ["hygiene plus"] },
    { key: "elapsed_time_entity", label: "Elapsed program time", section: "status", kind: "status", domains: ["sensor"], aliases: ["elapsed program time", "verstrichene programmlaufzeit"] },
    { key: "estimated_time_entity", label: "Estimated program time", section: "status", kind: "status", domains: ["sensor"], aliases: ["estimated total program time", "estimated remaining program time"] },
    { key: "smart_start_entity", label: "Smart Start", section: "options", kind: "toggle", domains: ["switch"], aliases: ["smart start"] },
    { key: "auto_smart_start_entity", label: "Auto Smart Start", section: "settings", kind: "toggle", domains: ["switch"], aliases: ["auto smart start", "automatischer smart start"] },
    { key: "extra_dry_entity", label: "Extra drying", section: "options", kind: "toggle", domains: ["switch"], aliases: ["extra drying", "extratrocknen"] },
    { key: "intensive_zone_entity", label: "Intensive zone", section: "options", kind: "toggle", domains: ["switch"], aliases: ["intensive zone", "intensivzone"] },
    { key: "speed_on_demand_entity", label: "Speed on demand", section: "options", kind: "toggle", domains: ["switch"], aliases: ["speed on demand", "schnell auf knopfdruck"] },
    { key: "half_load_entity", label: "Half load", section: "options", kind: "toggle", domains: ["switch"], aliases: ["half load", "halbe ladung"] },
    { key: "silent_entity", label: "Silence On Demand", section: "options", kind: "toggle", domains: ["switch"], aliases: ["silent", "leise"] },
    { key: "filter_check_entity", label: "Check filter system", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["filtersystem prufen", "filter system check", "check filter system", "check filter"], warning: !0 },
    { key: "filter_entity", label: "Machine-care filter", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["maschinenreinigung filter", "machine care filter"], warning: !0 },
    { key: "aquastop_entity", label: "AquaStop triggered", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["aquastop aufgetreten", "aquastop triggered", "aquastop occurred", "aquastop"], warning: !0 },
    { key: "care_entity", label: "Machine care reminder", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["machine care", "maschinenreinigung"], warning: !0, warningBelow: 0 },
    { key: "heater_scale_entity", label: "Heater scale warning", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["heater scale", "wasserheizung verkalkt"], warning: !0 }
  ]
}, D = {
  kind: "oven",
  cardType: "custom:hc-direct-oven-card",
  editorTag: "hc-direct-oven-card-editor",
  displayName: "HC Direct · Oven",
  description: "Program, temperature, timer and status controls for a Home Connect oven.",
  defaultName: "Oven",
  defaultIcon: "mdi:stove",
  accent: "#ff8a45",
  fields: [
    ...J,
    { key: "meatprobe_temperature_entity", label: "Current meatprobe temperature", section: "status", kind: "status", domains: ["sensor"], aliases: ["meat probe temperature"] },
    { key: "meatprobe_target_entity", label: "Meatprobe target temperature", section: "status", kind: "status", domains: ["sensor"], aliases: ["meat probe target"] },
    { key: "meatprobe_plugged_entity", label: "Meatprobe plugged in", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["meat probe plugged"] },
    { key: "current_temperature_entity", label: "Current temperature", section: "status", kind: "status", domains: ["sensor"], aliases: ["current temperature", "aktuelle temperatur"], prominent: !0 },
    { key: "target_temperature_entity", label: "Target temperature", section: "program", kind: "number", domains: ["number"], aliases: ["target temperature", "sollwert temperatur"] },
    { key: "duration_entity", label: "Duration", section: "program", kind: "number", domains: ["number"], aliases: ["duration", "dauer"] },
    { key: "level_entity", label: "Level", section: "program", kind: "select", domains: ["select"], aliases: ["level", "stufe"] },
    { key: "rapid_preheat_entity", label: "Rapid preheat", section: "options", kind: "toggle", domains: ["switch"], aliases: ["rapid preheat", "schnelles vorheizen"] },
    { key: "elapsed_time_entity", label: "Elapsed program time", section: "status", kind: "status", domains: ["sensor"], aliases: ["elapsed program time", "verstrichene programmlaufzeit"] },
    { key: "estimated_time_entity", label: "Estimated program time", section: "status", kind: "status", domains: ["sensor"], aliases: ["estimated total program time", "estimated remaining program time"] },
    { key: "cavity_light_entity", label: "Cavity light", section: "options", kind: "light", domains: ["light"], aliases: ["cavity light", "garraumlicht"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tur"], warning: !0 },
    { key: "water_tank_entity", label: "Water tank", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["water tank", "wassertank"], warning: !0 },
    { key: "alarm_entity", label: "Alarm clock", section: "settings", kind: "number", domains: ["number"], aliases: ["alarm clock", "timer"] },
    { key: "child_lock_entity", label: "Child lock", section: "settings", kind: "toggle", domains: ["switch", "select"], aliases: ["child lock", "kindersicherung"] },
    { key: "display_brightness_entity", label: "Display brightness", section: "settings", kind: "number", domains: ["number"], aliases: ["display brightness", "display helligkeit"] },
    { key: "key_tones_entity", label: "Button tone", section: "settings", kind: "toggle", domains: ["switch"], aliases: ["key tone", "tastentone"] },
    { key: "cooling_fan_entity", label: "Fan run-on time", section: "settings", kind: "select", domains: ["select"], aliases: ["cooling fan", "kuhllufter"] },
    { key: "tone_duration_entity", label: "Signal tone", section: "settings", kind: "select", domains: ["select"], aliases: ["tone duration", "tondauer"] }
  ]
}, O = {
  kind: "coffee",
  cardType: "custom:hc-direct-coffee-card",
  editorTag: "hc-direct-coffee-card-editor",
  displayName: "HC Direct · Coffee",
  description: "A drink-first controller for Home Connect coffee machines.",
  defaultName: "Coffee machine",
  defaultIcon: "mdi:coffee-maker",
  accent: "#b9794a",
  fields: [
    ...J.filter((n) => n.key !== "remaining_time_entity"),
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
    ...J.filter((n) => !["start_entity", "pause_entity", "resume_entity", "cancel_entity", "progress_entity", "remaining_time_entity", "start_in_entity"].includes(n.key)),
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
}, Et = ["100", "200", "300", "400"], Ct = {
  state: "Zone state",
  operation: "Operating state",
  power: "Power level",
  remaining: "Remaining time",
  frying: "Frying sensor",
  progress: "Progress"
}, Tt = Et.flatMap((n) => Object.entries(Ct).map(([e, t]) => ({
  key: "zone_" + n + "_" + e + "_entity",
  label: "Zone " + n + " · " + t,
  section: "status",
  kind: "status",
  domains: ["sensor"]
}))), F = {
  kind: "hob",
  cardType: "custom:hc-direct-hob-card",
  editorTag: "hc-direct-hob-card-editor",
  displayName: "HC Direct · Hob",
  description: "Read-only zones, residual heat and timers.",
  defaultName: "Hob",
  defaultIcon: "mdi:stove",
  accent: "#c75b30",
  fields: [
    ...J.filter((n) => ["entity", "status_entity", "operating_state_entity", "connection_entity"].includes(n.key)),
    ...Tt,
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
function w(n, e) {
  customElements.get(n) || customElements.define(n, e);
}
class Mt extends G {
  constructor() {
    super(...arguments), this.definition = N;
  }
}
w(N.editorTag, Mt);
class Pt extends G {
  constructor() {
    super(...arguments), this.definition = D;
  }
}
w(D.editorTag, Pt);
class It extends G {
  constructor() {
    super(...arguments), this.definition = O;
  }
}
w(O.editorTag, It);
class Nt extends G {
  constructor() {
    super(...arguments), this.definition = z;
  }
}
w(z.editorTag, Nt);
class Dt extends G {
  constructor() {
    super(...arguments), this.definition = F;
  }
}
w(F.editorTag, Dt);
const Ot = { ATTRIBUTE: 1 }, Rt = (n) => (...e) => ({ _$litDirective$: n, values: e });
let Lt = class {
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
const qe = "important", Ft = " !" + qe, Bt = Rt(class extends Lt {
  constructor(n) {
    if (super(n), n.type !== Ot.ATTRIBUTE || n.name !== "style" || n.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const r = typeof s == "string" && s.endsWith(Ft);
        i.includes("-") || r ? t.setProperty(i, r ? s.slice(0, -11) : s, r ? qe : "") : t[i] = s;
      }
    }
    return M;
  }
}), Ht = U`
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
  .times { margin:0 20px 14px; display:flex; flex-wrap:wrap; gap:6px 8px; }
  .time-chip { padding:4px 10px; border-radius:999px; font-size:12px; font-variant-numeric:tabular-nums; color:var(--secondary-text-color); background:color-mix(in srgb, var(--hc-accent) 14%, transparent); }
  .time-chip b { color:var(--primary-text-color); font-weight:650; }
  .key-metrics { margin:0 20px 14px; display:flex; gap:12px; font-size:18px; }
  .warning-strip { padding:0 20px 12px; display:grid; gap:6px; }
  .notice.info { border-left-color:var(--info-color,#3d8bd9); background:color-mix(in srgb,var(--info-color,#3d8bd9),transparent 92%); }
  .notice.success { border-left-color:var(--success-color,#43a047); background:color-mix(in srgb,var(--success-color,#43a047),transparent 92%); }
  .notice ha-icon { --mdc-icon-size:16px; margin-right:6px; vertical-align:-3px; }
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
function Ut(n, e, t) {
  const i = e[t];
  return n && typeof i == "string" ? n.states[i] : void 0;
}
function jt(n) {
  const e = /* @__PURE__ */ new Set();
  for (const [t, i] of Object.entries(n))
    (t === "entity" || t.endsWith("_entity")) && typeof i == "string" && i.includes(".") && e.add(i);
  return [...e];
}
function Zt(n, e, t) {
  return n === e ? !1 : !n || !e || n.language !== e.language || n.locale?.language !== e.locale?.language ? !0 : t.some((i) => n.states[i] !== e.states[i]);
}
const qt = /* @__PURE__ */ new Set(["unknown", "unavailable", "null", ""]);
function g(n) {
  return !!n && !qt.has(String(n.state).toLowerCase());
}
function Te(n) {
  return (/enumtype|eventpresentstate|operationstate|powerstate/i.test(n) && n.includes(".") || n.includes(".") && /^[a-z_]+\./i.test(n) ? n.split(".").pop() : n).replace(/^BSH[._]Common[._]|^Dishcare[._]|^Cooking[._]|^LaundryCare[._]|^ConsumerProducts[._]CoffeeMaker[._]/i, "").replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim();
}
function v(n) {
  if (!n) return "";
  const e = n.state.trim().toLowerCase();
  return (e.split(/[.:/]/).filter(Boolean).pop() || e).replace(/[\s_-]+/g, "");
}
function Wt(n) {
  const e = /^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i.exec(n);
  if (!e) return;
  const t = Number(e[1] || 0), i = Number(e[2] || 0) + Math.floor(Number(e[3] || 0) / 60);
  return t ? `${t}:${String(i).padStart(2, "0")} h` : `${i} min`;
}
function y(n, e) {
  if (!e) return d(n, "not_configured", "Not configured");
  if (!g(e)) return e?.state === "unavailable" ? d(n, "unavailable", "Unavailable") : d(n, "unknown", "Unknown");
  if (n.formatEntityState)
    try {
      const l = n.formatEntityState(e);
      if (l && l !== e.state) {
        const a = Te(e.state).toLowerCase();
        if (!/enumtype|eventpresentstate|operationstate|powerstate/i.test(e.state) || l.toLowerCase() !== a) return l;
      }
    } catch {
    }
  const t = v(e), i = {
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
  }, r = { de: 1 }[se(n)] ?? 0;
  if (i[t] && /enumtype|eventpresentstate|operationstate|powerstate/i.test(e.state)) return i[t][r];
  const o = Wt(e.state);
  return o || `${Te(e.state)}${e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : ""}`;
}
function me(n) {
  if (!n || !g(n)) return;
  const e = Number.parseFloat(n.state.replace(",", "."));
  return Number.isFinite(e) ? e : void 0;
}
function Vt(n) {
  const e = me(n);
  if (e !== void 0)
    return Math.max(0, Math.min(100, e <= 1 && !n?.attributes.unit_of_measurement ? e * 100 : e));
}
function R(n) {
  return !n || !g(n) ? !1 : ["on", "open", "true", "active", "running", "run", "1", "present"].includes(v(n));
}
function Kt(n, e, t) {
  if (!n || !g(n)) return !1;
  const i = v(n);
  return t !== void 0 && Number.isFinite(Number(n.state)) ? Number(n.state) <= t : e ? e.includes(i) : !["off", "closed", "ok", "normal", "none", "false", "0", "available", "full", "notpresent", "ready", "good"].includes(i);
}
function Gt(n, e) {
  const t = n?.trim();
  return !t || t.length > 96 || /[;{}]/.test(t) ? e : /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(t) || /^[a-z]+$/i.test(t) || /^var\(--[a-z0-9_-]+\)$/i.test(t) || /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([\d\s.,%+\-/a-z]+\)$/i.test(t) ? t : e;
}
function Jt(n) {
  return n === "running" || n === "paused";
}
function Yt(...n) {
  const e = n.filter((i) => !!i && g(i));
  if (!e.length && n.some(Boolean)) return "unavailable";
  const t = e.map(v);
  return n[0] && g(n[0]) && ["off", "aus", "ausgeschaltet", "inactive"].includes(v(n[0])) ? "off" : t.some((i) => ["pause", "paused", "angehalten", "unterbrochen"].includes(i)) ? "paused" : t.some((i) => ["run", "running", "active", "inoperation", "betrieb", "heat", "heating", "brew", "brewing", "drying", "trocknen", "delayedstart", "aborting"].includes(i)) ? "running" : t.some((i) => ["off", "aus", "ausgeschaltet", "inactive", "standby"].includes(i)) ? "off" : "idle";
}
function B(n) {
  return n.attributes.readonly === !0;
}
function H(n) {
  return !n || n.state === "unavailable" || n.attributes.restored === !0 ? !1 : n.entity_id.startsWith("select.") || n.entity_id.startsWith("input_select.") ? (n.attributes.options?.length || 0) > 0 : g(n);
}
function Me(n, e, t) {
  const i = t.fill_quantity_select_entity, s = typeof i == "string" ? e.states[i] : void 0;
  return n === "fill_quantity_select_entity" ? H(s) : n === "fill_quantity_entity" ? !H(s) : !0;
}
function Y(n) {
  if (!H(n) || B(n)) throw new Error("This entity is unavailable or read-only.");
}
async function Qt(n, e) {
  Y(e);
  const t = e.entity_id.split(".")[0];
  if (t === "select" || t === "input_select") {
    const i = e.attributes.options || [], s = (a) => a.toLowerCase().split(/[.:/]/).filter(Boolean).pop()?.replace(/[\s_-]/g, "") || "", r = i.find((a) => ["on", "ein", "active"].includes(s(a))), o = i.find((a) => ["off", "aus", "inactive", "standby"].includes(s(a))), l = ["on", "ein", "active"].includes(v(e)) ? o : r;
    if (!l) throw new Error("This select has no recognizable on/off options.");
    await n.callService("select", "select_option", { entity_id: e.entity_id, option: l });
    return;
  }
  await n.callService(t, e.state === "on" ? "turn_off" : "turn_on", { entity_id: e.entity_id });
}
async function Pe(n, e) {
  if (e.state === "unavailable" || B(e)) throw new Error("This button is unavailable or read-only.");
  const t = e.entity_id.split(".")[0];
  if (t !== "button" && t !== "input_button") throw new Error("The configured action is not a button entity.");
  await n.callService(t, "press", { entity_id: e.entity_id });
}
async function We(n, e, t) {
  Y(e);
  const i = e.entity_id.split(".")[0];
  if (i !== "select" && i !== "input_select") throw new Error("The configured entity is not a select.");
  if (e.attributes.options && !e.attributes.options.includes(t)) throw new Error("This option is not offered by the entity.");
  await n.callService(i, "select_option", { entity_id: e.entity_id, option: t });
}
async function Xt(n, e, t) {
  Y(e);
  const i = e.entity_id.split(".")[0];
  await n.callService(i, "set_value", { entity_id: e.entity_id, value: t });
}
async function ei(n, e, t) {
  if (Y(e), !e.entity_id.startsWith("light.")) throw new Error("Expected a light entity.");
  const i = Math.max(0, Math.min(100, Math.round(t)));
  await n.callService(
    "light",
    i === 0 ? "turn_off" : "turn_on",
    i === 0 ? { entity_id: e.entity_id } : { entity_id: e.entity_id, brightness_pct: i }
  );
}
async function ti(n, e, t) {
  if (Y(e), !e.entity_id.startsWith("fan.")) throw new Error("Expected a fan entity.");
  await n.callService("fan", "set_percentage", { entity_id: e.entity_id, percentage: Math.max(0, Math.min(100, t)) });
}
function ge(n, e) {
  n.dispatchEvent(new CustomEvent("hass-action", {
    detail: {
      config: { entity: e, tap_action: { action: "more-info" } },
      action: "tap"
    },
    bubbles: !0,
    composed: !0
  }));
}
function ce(n, e) {
  return e?.[n]?.trim() || void 0;
}
function ii(n, e, t) {
  return ce(e.state, t) || y(n, e);
}
const Ve = { s: 1, sec: 1, min: 60, h: 3600, d: 86400 };
function ni(n) {
  return Math.round(n * 1e6) / 1e6;
}
function Ie(n, e = 0) {
  const t = n.attributes, i = String(t.unit_of_measurement ?? "").trim(), s = Number(t.min ?? 0), r = Number(t.max ?? 100), o = Number(t.step ?? 1) || 1, l = Ve[i.toLowerCase()] ?? 0, a = l > 0 && (t.device_class === "duration" || i.toLowerCase() === "min" || i.toLowerCase() === "s"), c = t.device_class === "temperature" || i === "°C" || i === "°F", u = a ? Math.max(o, Math.max(60, e) / l) : c ? Math.max(o, 5) : o;
  return { value: me(n), min: s, max: r, step: u, unit: i, duration: a, unitSeconds: a ? l : 0 };
}
function si(n, e, t) {
  const i = e + t * n.step, s = n.min + Math.round((i - n.min) / n.step) * n.step;
  return ni(Math.max(n.min, Math.min(n.max, s)));
}
function E(n, e) {
  const t = Math.round(e), i = Math.floor(t / 60), s = t % 60;
  return s ? `${i}:${String(s).padStart(2, "0")} ${d(n, "unit.min", "min")}` : i >= 60 ? `${Math.floor(i / 60)}:${String(i % 60).padStart(2, "0")} h` : `${i} ${d(n, "unit.min", "min")}`;
}
function X(n) {
  const e = me(n);
  if (e === void 0 || !n) return;
  const t = Ve[String(n.attributes.unit_of_measurement ?? "").trim().toLowerCase()];
  return t ? e * t : void 0;
}
function ri(n, e, t) {
  if (e.duration) return E(n, t * e.unitSeconds);
  const i = t.toLocaleString(se(n), { maximumFractionDigits: 2 });
  return e.unit ? `${i} ${e.unit}` : i;
}
function oi(n) {
  const e = X(n.remaining), t = X(n.elapsed), i = X(n.estimate), s = X(n.startIn) ?? 0, r = e && e > 0 ? e : i && i > 60 ? i : void 0;
  if (n.active && n.status && g(n.status) && v(n.status) === "delayedstart")
    return s ? { phase: "delayed", startsIn: s, remaining: r, endsIn: r === void 0 ? void 0 : s + r, endsAt: r === void 0 ? void 0 : n.now + (s + r) * 1e3, smartStart: n.smartStart } : void 0;
  if (n.active)
    return r === void 0 && !t ? void 0 : { phase: "active", elapsed: t || void 0, remaining: r, endsAt: r === void 0 ? void 0 : n.now + r * 1e3 };
  if (n.status && g(n.status) && v(n.status) === "finished") {
    const o = Date.parse(n.status.last_changed);
    return Number.isFinite(o) ? { phase: "finished", finishedAt: o } : void 0;
  }
  if (i && i > 60)
    return {
      phase: "idle",
      estimate: i,
      endsAt: n.now + i * 1e3,
      delayedEndsAt: s > 0 ? n.now + (s + i) * 1e3 : void 0,
      endsIn: s > 0 ? s + i : void 0,
      smartStart: n.smartStart
    };
}
function Ne(n, e) {
  const t = n.locale, i = { hour: "numeric", minute: "2-digit" };
  t?.time_format === "24" ? i.hourCycle = "h23" : t?.time_format === "12" && (i.hour12 = !0), t?.time_zone === "server" && n.config?.time_zone && (i.timeZone = n.config.time_zone);
  try {
    const s = se(n);
    return new Intl.DateTimeFormat(s, i).resolvedOptions().hourCycle?.startsWith("h2") && (i.hour = "2-digit"), new Date(e).toLocaleTimeString(s, i);
  } catch {
    return new Date(e).toLocaleTimeString();
  }
}
const ai = {
  info: "mdi:information-outline",
  success: "mdi:check-circle-outline",
  warning: "mdi:alert-outline"
};
function li(n) {
  const e = n.trim().toLowerCase().split(/[.:/]/).pop() || "";
  return /aborted|error|blocked|calcified|voltage|not_possible|too_high|failed/.test(e) ? "warning" : /finished|success|done|complete/.test(e) ? "success" : /^(insert|turn|open|close|leave|remove|place|refill|fill|wipe|prepare|subsequent|after|pyro|easy|clock|is_not|keep|empty|clean)/.test(e) || /(_now|_later|_info)$/.test(e) ? "info" : "warning";
}
function ci(n, e) {
  if (!e || !g(e)) return;
  const t = e.state.trim().toLowerCase();
  if (!t || t === "none" || t === "off") return;
  const i = li(t);
  return { text: y(n, e), tone: i, icon: ai[i] };
}
class di extends k {
  constructor() {
    super(...arguments), this.valueLabels = {}, this.label = "", this.kind = "status", this.disabled = !1, this.busy = !1, this.stepSeconds = 0, this.hint = "";
  }
  static {
    this.properties = { hass: { attribute: !1 }, entity: { attribute: !1 }, valueLabels: { attribute: !1 }, label: {}, kind: {}, disabled: { type: Boolean }, busy: { type: Boolean }, stepSeconds: { type: Number }, hint: {}, _pending: { state: !0 } };
  }
  static {
    this.styles = U`
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
    .stepper { flex: none; display: inline-flex; align-items: stretch; height: 37px; border: 1px solid color-mix(in srgb, var(--divider-color), var(--primary-text-color) 8%); border-radius: 11px; overflow: hidden; background: var(--card-background-color); }
    .stepper button { width: 38px; padding: 0; border: 0; color: var(--primary-text-color); background: transparent; font: inherit; font-size: 20px; line-height: 1; cursor: pointer; transition: background 120ms ease; }
    .stepper button:hover:not(:disabled) { background: color-mix(in srgb, var(--hc-accent), transparent 82%); }
    .stepper-value { min-width: 78px; padding: 0 6px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 650; font-variant-numeric: tabular-nums; white-space: nowrap; border-inline: 1px solid color-mix(in srgb, var(--divider-color), var(--primary-text-color) 8%); }
    .hint { margin: -4px 0 8px; font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
    .unavailable { opacity: .58; }
    button:disabled, select:disabled, input:disabled { cursor: not-allowed; opacity: .55; }
  `;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearTimeout(this._sendTimer), clearTimeout(this._clearTimer);
  }
  willUpdate(e) {
    const t = e.get("entity");
    t && this._pending !== void 0 && this._sendTimer === void 0 && t.state !== this.entity?.state && (this._pending = void 0);
  }
  tap(e) {
    if (!this.entity) return;
    const t = Ie(this.entity, this.stepSeconds), i = this._pending ?? t.value;
    if (i === void 0) return;
    const s = si(t, i, e);
    s !== i && (this._pending = s, this.requestUpdate(), clearTimeout(this._sendTimer), clearTimeout(this._clearTimer), this._sendTimer = setTimeout(() => {
      this._sendTimer = void 0, this.emit("number", s), this._clearTimer = setTimeout(() => {
        this._pending = void 0, this.requestUpdate();
      }, 4e3);
    }, 700));
  }
  emit(e, t) {
    !this.entity || this.disabled || this.busy || (e === "press" ? this.entity.state === "unavailable" : !H(this.entity)) || B(this.entity) || this.dispatchEvent(new CustomEvent("hcd-control", { detail: { entity: this.entity, action: e, value: t }, bubbles: !0, composed: !0 }));
  }
  render() {
    if (!this.entity || !this.hass) return h;
    const e = this.kind === "button" ? this.entity.state === "unavailable" : !H(this.entity), t = this.disabled || this.busy || e || B(this.entity);
    if (this.kind === "button")
      return _`<div class="line"><span class="label">${this.label}</span><button type="button" ?disabled=${t} @click=${() => this.emit("press")}>${this.label}</button></div>`;
    if (this.kind === "light" || this.kind === "fan") {
      const s = this.kind === "fan", r = this.entity.attributes.supported_color_modes, o = s ? (Number(this.entity.attributes.supported_features || 0) & 1) !== 0 : !!r?.some((a) => !["onoff", "unknown"].includes(a)), l = s ? Number(this.entity.attributes.percentage ?? 0) : this.entity.state === "off" ? 0 : Math.round(Number(this.entity.attributes.brightness ?? 255) / 255 * 100);
      return _`<div class="control">
        <div class="line"><span class="label">${this.label}</span><button class="switch ${R(this.entity) ? "on" : ""}" type="button" role="switch" aria-checked=${String(R(this.entity))} aria-label=${this.label} ?disabled=${t} @click=${() => this.emit("toggle")}></button></div>
        ${o ? _`<label class="number-head">${l}%<input aria-label=${this.label + " %"} type="range" min="0" max="100" step=${s ? Number(this.entity.attributes.percentage_step || 1) : 1} .value=${String(l)} ?disabled=${t} @change=${(a) => this.emit(s ? "fan" : "brightness", Number(a.target.value))}></label>` : h}
      </div>`;
    }
    if (this.kind === "toggle") {
      const s = R(this.entity);
      return _`<div class="line ${e ? "unavailable" : ""}"><span class="label">${this.label}</span><button class="switch ${s ? "on" : ""}" type="button" role="switch" aria-checked=${String(s)} aria-label=${this.label} ?disabled=${t} @click=${() => this.emit("toggle")}></button></div>${this.hint ? _`<div class="hint">${this.hint}</div>` : h}`;
    }
    if (this.kind === "select") {
      const s = this.entity.attributes.options || [], r = s.includes(this.entity.state) || !g(this.entity) ? s : [this.entity.state, ...s];
      return _`<div class="line ${e ? "unavailable" : ""}"><label class="label" for="select">${this.label}</label><select id="select" ?disabled=${t} @change=${(o) => this.emit("select", o.target.value)}>${g(this.entity) ? h : _`<option value="" disabled selected>${y(this.hass, this.entity)}</option>`}${r.map((o) => _`<option .value=${o} ?selected=${o === this.entity?.state}>${ce(o, this.valueLabels) || y(this.hass, { ...this.entity, state: o })}</option>`)}</select></div>`;
    }
    if (this.kind === "number") {
      const s = Ie(this.entity, this.stepSeconds), r = this._pending ?? s.value, o = r === void 0 ? y(this.hass, this.entity) : ri(this.hass, s, r), l = r !== void 0 && r <= s.min, a = r !== void 0 && r >= s.max, c = d(this.hass, "action.decrease", "Decrease"), u = d(this.hass, "action.increase", "Increase");
      return _`<div class="line ${e ? "unavailable" : ""}"><span class="label">${this.label}</span><div class="stepper" role="group" aria-label=${this.label}>
        <button type="button" aria-label=${`${c}: ${this.label}`} ?disabled=${t || r === void 0 || l} @click=${() => this.tap(-1)}>−</button>
        <span class="stepper-value" aria-live="polite">${o}</span>
        <button type="button" aria-label=${`${u}: ${this.label}`} ?disabled=${t || r === void 0 || a} @click=${() => this.tap(1)}>+</button>
      </div></div>`;
    }
    const i = ce(this.entity.state, this.valueLabels) || y(this.hass, this.entity);
    return _`<button type="button" class="line status-line ${e ? "unavailable" : ""}" @click=${() => ge(this, this.entity.entity_id)} aria-label=${`${this.label}: ${i}`}><span class="label">${this.label}</span><span class="value">${i}</span></button>`;
  }
}
w("hcd-entity-control", di);
class hi extends k {
  constructor() {
    super(...arguments), this.title = "Section", this.icon = "mdi:tune-variant", this.open = !0;
  }
  static {
    this.properties = { title: {}, icon: {}, open: { type: Boolean, reflect: !0 } };
  }
  static {
    this.styles = U`
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
    return _`<button type="button" @click=${() => this.open = !this.open} aria-expanded=${String(this.open)}><ha-icon .icon=${this.icon}></ha-icon><span class="title">${this.title}</span><ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon></button>${this.open ? _`<div class="body"><div class="clip"><div class="content"><slot></slot></div></div></div>` : ""}`;
  }
}
w("hcd-expandable-section", hi);
class _i extends k {
  constructor() {
    super(...arguments), this.actions = [], this.busyIds = /* @__PURE__ */ new Set(), this.confirmingId = "";
  }
  static {
    this.properties = { actions: { attribute: !1 }, busyIds: { attribute: !1 }, confirmingId: {} };
  }
  static {
    this.styles = U`
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
    return _`<div class="row">${this.actions.map((e) => {
      const t = this.busyIds.has(e.entityId), i = this.confirmingId === e.entityId;
      return _`<button type="button" class="${e.primary ? "primary" : ""} ${e.danger ? "danger" : ""} ${i ? "confirming" : ""} ${t ? "busy" : ""}" ?disabled=${e.disabled || t} @click=${() => this.dispatchEvent(new CustomEvent("hcd-action", { detail: e, bubbles: !0, composed: !0 }))}><ha-icon .icon=${t ? "mdi:loading" : i ? "mdi:alert-circle-outline" : e.icon}></ha-icon><span>${i && e.confirmLabel || e.label}</span></button>`;
    })}</div>`;
  }
}
w("hcd-action-buttons", _i);
const ui = {
  program: { title: "Program", icon: "mdi:tune-variant" },
  options: { title: "Options", icon: "mdi:toggle-switch-outline" },
  status: { title: "Status & care", icon: "mdi:information-outline" },
  settings: { title: "Device settings", icon: "mdi:cog-outline" }
};
class Q extends k {
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
    this.styles = [Ht, U`
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
    const e = this._config?.entity || "", t = $(this._config);
    if (!this.hass || !t || this._config?.auto_detect === !1 || this._discovering || t === this._discoveryAnchor && this._registrySnapshot === this.hass.entities || !this._config?.device_id && Object.keys(this._config).some((s) => s.endsWith("_entity"))) return;
    this._discoveryAnchor = t, this._registrySnapshot = this.hass.entities;
    const i = this._manualConfig || this._config;
    this._discovering = !0, je(this.hass, e, this.definition, i).then((s) => {
      if ($(this._config) !== t) return;
      const r = this._manualConfig || i, o = Object.fromEntries(Object.entries(s).filter(([l]) => !r[l]));
      this._config = { ...r, ...o };
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
    return this._config.device_id && (t?.entities !== this.hass?.entities || t?.devices?.[this._config.device_id] !== this.hass?.devices?.[this._config.device_id]) ? !0 : Zt(t, this.hass, jt(this._config));
  }
  getState(e) {
    return this._config && Ut(this.hass, this._config, e);
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
    e && ge(this, e);
  }
  clearConfirmation() {
    this._confirmationTimer !== void 0 && window.clearTimeout(this._confirmationTimer), this._confirmationTimer = void 0, this._confirmingId = "";
  }
  supportsField(e) {
    return this.definition.fields.some((t) => t.key === e);
  }
  isOffline() {
    const e = this.getState("connection_entity");
    return !!e && !R(e);
  }
  primaryFieldKeys() {
    const e = ["selected_program_entity"];
    return {
      coffee: [...e, "fill_quantity_select_entity", "fill_quantity_entity", "bean_amount_entity", "aroma_entity"],
      oven: [...e, "target_temperature_entity", "duration_entity", "start_in_entity"],
      dishwasher: [...e, "start_in_entity"],
      hood: ["hood_level_entity", "fan_entity", "working_light_entity", "ambient_light_entity"],
      hob: []
    }[this.definition.kind] || [];
  }
  /** A start delay moves in 15 minute steps; the appliance accepts any value (own device logs). */
  stepFor(e) {
    return e.key === "start_in_entity" ? 900 : 0;
  }
  /** Explains a locked Smart Start switch: the appliance locks it while Auto Smart Start is off. */
  hintFor(e, t) {
    if (e.key !== "smart_start_entity" || !B(t)) return "";
    const i = this.getState("auto_smart_start_entity");
    return i && v(i) === "off" ? d(this.hass, "hint.smart_start_locked", "Smart Start is locked while Auto Smart Start is off.") : "";
  }
  renderPrimary(e) {
    if (!this._config || !this.hass) return h;
    const t = this.definition.fields.filter((i) => this.primaryFieldKeys().includes(i.key)).filter((i) => Me(i.key, this.hass, this._config)).map((i) => ({ field: i, entity: this.getState(i.key) })).filter((i) => !!i.entity);
    return _`<div class="primary-grid">${t.map(({ field: i, entity: s }) => _`
      <hcd-entity-control .hass=${this.hass} .entity=${s} .label=${I(this.hass, i)} .kind=${this.controlKind(i, s)}
        .valueLabels=${i.key === "selected_program_entity" ? this._config?.program_names || {} : {}}
        .stepSeconds=${this.stepFor(i)} .hint=${this.hintFor(i, s)}
        .busy=${this._busyIds.has(s.entity_id)}></hcd-entity-control>
    `)}</div>`;
  }
  configuredFields(e) {
    return !this._config || !this.hass ? [] : this.definition.fields.filter((t) => t.section === e).filter((t) => !this.primaryFieldKeys().includes(t.key) && !t.key.startsWith("zone_")).filter((t) => Me(t.key, this.hass, this._config)).filter((t) => !["active_program_entity", "progress_entity", "remaining_time_entity"].includes(t.key)).map((t) => ({ field: t, entity: this.getState(t.key) })).filter(({ entity: t }) => !!t);
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
      this.hass && (i === "brightness" && typeof s == "number" && await ei(this.hass, t, s), i === "fan" && typeof s == "number" && await ti(this.hass, t, s), i === "press" && await Pe(this.hass, t), i === "toggle" && await Qt(this.hass, t), i === "select" && typeof s == "string" && await We(this.hass, t, s), i === "number" && typeof s == "number" && await Xt(this.hass, t, s));
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
    i && this.withBusy(i, () => Pe(this.hass, i));
  }
  renderTimes(e) {
    const t = this.hass, i = (o, l = "") => _`<span class="time-chip">${o}${l ? _` <b>${l}</b>` : h}</span>`, s = (o, l, a) => d(t, o, l).replace("{t}", Ne(t, a)), r = e.smartStart ? i(d(t, "time.smart_changes", "Smart Start: times can change")) : h;
    return e.phase === "delayed" ? _`<div class="times">${i(d(t, "time.starts_in", "Starts in"), E(t, e.startsIn))}${e.endsIn !== void 0 ? i(d(t, "time.done_in", "Done in"), E(t, e.endsIn)) : h}${e.endsAt !== void 0 ? i(s("time.done_at", "Done at {t}", e.endsAt)) : h}${r}</div>` : e.phase === "finished" ? _`<div class="times">${i(s("time.done_at", "Done at {t}", e.finishedAt))}</div>` : e.phase === "idle" ? _`<div class="times">${i(d(t, "time.estimate", "Estimated duration"), E(t, e.estimate))}${i(s("time.done_at_start", "Done at {t} if started", e.endsAt))}${e.delayedEndsAt !== void 0 ? i(d(t, "time.done_in_delay", "With the delay done in {d} at {t}").replace("{d}", E(t, e.endsIn)).replace("{t}", Ne(t, e.delayedEndsAt))) : h}${r}</div>` : _`<div class="times">
      ${e.elapsed !== void 0 ? i(d(t, "time.elapsed", "Running"), E(t, e.elapsed)) : h}
      ${e.remaining !== void 0 ? i(d(t, "time.done_in", "Done in"), E(t, e.remaining)) : h}
      ${e.endsAt !== void 0 ? i(s("time.done_at", "Done at {t}", e.endsAt)) : h}
    </div>`;
  }
  renderPower() {
    const e = this.getState("power_entity") || this.getState("power_state_entity");
    if (!e) return h;
    const t = e.entity_id.split(".")[0], i = t === "select" || t === "input_select" ? "select" : t === "light" ? "light" : t === "switch" || t === "input_boolean" ? "toggle" : "status";
    return _`<div class="power-row"><hcd-entity-control .hass=${this.hass} .entity=${e} .label=${d(this.hass, "power", "Power")} .kind=${i} .busy=${this._busyIds.has(e.entity_id)}></hcd-entity-control></div>`;
  }
  renderActions(e) {
    if (!this._config || !this.hass || e === "off" || e === "unavailable") return h;
    const i = (e === "paused" ? [["resume_entity", d(this.hass, "action.resume", "Resume"), "mdi:play", !0, !1], ["cancel_entity", d(this.hass, "action.cancel", "Cancel"), "mdi:stop", !1, !0]] : e === "running" ? [["pause_entity", d(this.hass, "action.pause", "Pause"), "mdi:pause", !1, !1], ["cancel_entity", d(this.hass, "action.cancel", "Cancel"), "mdi:stop", !1, !0]] : [["start_entity", d(this.hass, "action.start", "Start"), "mdi:play", !0, !1]]).flatMap(([s, r, o, l, a]) => {
      if (!this.definition.fields.some((f) => f.key === s)) return [];
      const c = this._config?.[s], u = typeof c == "string" ? this.hass?.states[c] : void 0, p = u?.entity_id.split(".")[0];
      return u ? [{ key: s, label: r, confirmLabel: a ? d(this.hass, "action.confirm_cancel", "Confirm cancel") : void 0, icon: o, entityId: c, primary: l, danger: a, disabled: u.state === "unavailable" || p !== "button" && p !== "input_button" }] : [];
    });
    return i.length ? _`<div class="primary-actions"><hcd-action-buttons .actions=${i} .busyIds=${this._busyIds} .confirmingId=${this._confirmingId}></hcd-action-buttons></div>` : h;
  }
  renderSection(e) {
    if (!this._config || e === "options" && this._config.show_options_section === !1 || e === "status" && this._config.show_status_section === !1 || e === "settings" && this._config.show_settings_section === !1) return h;
    const t = this.configuredFields(e);
    if (!t.length) return h;
    const i = ui[e];
    return _`<hcd-expandable-section .title=${d(this.hass, `section.${e}`, i.title)} .icon=${i.icon} .open=${!1}>
      <div class="section-grid ${e === "program" ? "program-grid" : ""}">${t.map(({ field: s, entity: r }) => _`
        <div class="entity-slot"><hcd-entity-control .hass=${this.hass} .entity=${r} .label=${I(this.hass, s)} .kind=${this.controlKind(s, r)}
          .valueLabels=${s.key === "selected_program_entity" || s.key === "active_program_entity" ? this._config?.program_names || {} : {}}
          .stepSeconds=${this.stepFor(s)} .hint=${this.hintFor(s, r)}
          .busy=${this._busyIds.has(r.entity_id)}></hcd-entity-control>
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
    if (!this._config || !this.hass) return h;
    if (!$(this._config) && !Object.keys(this._config).some((m) => m.endsWith("_entity")))
      return _`<ha-card><div class="daily-controls" style="padding-top:20px">${d(this.hass, "direct.select_device", "Choose the appliance in the card editor.")}</div></ha-card>`;
    const e = this.getState("operating_state_entity") || this.getState("status_entity") || this.getState("power_entity"), t = this.getState("power_entity"), i = Yt(t, e), s = Jt(i), r = i === "off" && t ? t : e, o = s ? this.getState("active_program_entity") || this.getState("selected_program_entity") : this.getState("selected_program_entity"), l = this.getState("remaining_time_entity") || this.getState("finish_at_entity"), a = Vt(this.getState("progress_entity")), c = this.definition.kind === "oven" || this.definition.kind === "dishwasher" ? oi({
      active: s,
      status: this.getState("operating_state_entity"),
      remaining: this.getState("remaining_time_entity"),
      elapsed: this.getState("elapsed_time_entity"),
      estimate: this.getState("estimated_time_entity"),
      startIn: this.getState("start_in_entity"),
      smartStart: R(this.getState("smart_start_entity")) || R(this.getState("auto_smart_start_entity")),
      now: Date.now()
    }) : void 0, u = ci(this.hass, this.getState("messages_entity")), p = this.definition.fields.filter((m) => m.warning && m.key !== "messages_entity").map((m) => ({ field: m, entity: this.getState(m.key) })).filter(({ field: m, entity: x }) => x && Kt(x, m.warningStates, m.warningBelow)), f = this.definition.fields.filter((m) => m.prominent).map((m) => this.getState(m.key)).filter(g), b = Gt(this._config.accent_color, this.definition.accent);
    return _`<ha-card style=${Bt({ "--hc-accent": b })} @hcd-control=${this.handleControl} @hcd-action=${this.handleAction}>
      <div class="shell">
        <header class="card-header">
          <button class="identity" type="button" @click=${this.showMoreInfo}>
            <span class="eyebrow">HOME CONNECT DIRECT · ${d(this.hass, "device." + this.definition.kind, this.definition.defaultName)}</span>
            <span class="card-title">${this._config.name || this.hass.devices?.[this._config.device_id || ""]?.name_by_user || this.hass.devices?.[this._config.device_id || ""]?.name || d(this.hass, "device." + this.definition.kind, this.definition.defaultName)}</span>
          </button>
          <span class="state-label ${i}">${this.getState("connection_entity") ? _`<span class="connection-dot ${this.isOffline() ? "offline" : ""}" title=${d(this.hass, this.isOffline() ? "direct.disconnected" : "direct.connected", this.isOffline() ? "Device disconnected" : "Connected")}></span>` : h}${r ? y(this.hass, r) : d(this.hass, "ready", "Ready")}</span>
        </header>
        ${u ? _`<div class="warning-strip"><span class="notice ${u.tone}" role="status"><ha-icon .icon=${u.icon}></ha-icon>${u.text}</span></div>` : h}
        ${p.length ? _`<div class="warning-strip">${p.map(({ field: m, entity: x }) => _`<span class="notice">${I(this.hass, m)}${x?.entity_id.startsWith("binary_sensor.") ? "" : ": " + y(this.hass, x)}</span>`)}</div>` : h}
        ${s && g(o) ? _`<div class="now-running"><span>${ii(this.hass, o, this._config.program_names)}</span>${g(l) && !c ? _`<strong>${y(this.hass, l)}</strong>` : h}</div>` : h}
        ${s && a !== void 0 && this._config.show_progress !== !1 ? _`<div class="progress-line"><span style=${`width:${a}%`}></span></div>` : h}
        ${c ? this.renderTimes(c) : h}
        ${f.length ? _`<div class="key-metrics">${f.map((m) => _`<strong>${y(this.hass, m)}</strong>`)}</div>` : h}
        <div class="daily-controls">
          ${this.renderPower()}
          ${this.renderPrimary(i)}
          ${this.renderActions(i)}
        </div>
        <footer><button class="details-button" type="button" @click=${this.toggleExpanded} aria-expanded=${String(this._expanded)}>${d(this.hass, "direct.details", "Details & settings")} <span>${this._expanded ? "−" : "+"}</span></button></footer>
        ${this._expanded ? _`<div class="details-content">
          ${this.renderSection("program")}
          ${this.renderSection("options")}
          ${this.renderSection("status")}
          ${this.renderSection("settings")}
        </div>` : h}
        ${this._error ? _`<div class="error" role="alert">${this._error}<button @click=${() => {
      this._error = "";
    }}>×</button></div>` : h}
      </div>
    </ha-card>`;
  }
}
class pi extends Q {
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
w("hc-direct-dishwasher-card", pi);
class mi extends Q {
  constructor() {
    super(...arguments), this.definition = D;
  }
  static getConfigElement() {
    return document.createElement(D.editorTag);
  }
  static getStubConfig() {
    return { name: D.defaultName };
  }
}
w("hc-direct-oven-card", mi);
class gi extends Q {
  constructor() {
    super(...arguments), this.definition = O;
  }
  static getConfigElement() {
    return document.createElement(O.editorTag);
  }
  static getStubConfig() {
    return { name: O.defaultName };
  }
}
w("hc-direct-coffee-card", gi);
class fi extends Q {
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
    if (!this.hass) return h;
    const e = this.getState("hood_level_entity"), t = this.getState("fan_entity"), i = this.getState("working_light_entity"), s = this.getState("ambient_light_entity"), r = !H(e) || !!e && B(e) || !!e && this._busyIds.has(e.entity_id), o = e?.attributes.options || [];
    return _`
      <div class="hood-panel">
        <span class="section-label">${d(this.hass, "field.fan_entity", "Fan")}</span>
        ${e ? _`
          <div class="hood-level">${y(this.hass, e)}</div>
          <div class="stage-buttons">${o.map((l) => _`
            <button type="button" class="stage ${l === e.state ? "selected" : ""}" aria-pressed=${String(l === e.state)}
              aria-label=${y(this.hass, { ...e, state: l })} ?disabled=${r}
              @click=${() => {
      this.withBusy(e, () => We(this.hass, e, l));
    }}>
              ${/^fanstage0*\d+$/i.test(l) ? Number(l.match(/\d+$/)[0]) : y(this.hass, { ...e, state: l })}
            </button>`)}</div>
        ` : t ? _`<hcd-entity-control .hass=${this.hass} .entity=${t} kind="fan" .label=${d(this.hass, "field.fan_entity", "Fan")}></hcd-entity-control>` : h}
      </div>
      ${[["working_light_entity", i], ["ambient_light_entity", s]].map(([l, a]) => a && typeof a != "string" ? _`
        <div class="inline-control"><hcd-entity-control .hass=${this.hass} .entity=${a} kind="light" .busy=${this._busyIds.has(a.entity_id)}
          .label=${I(this.hass, z.fields.find((c) => c.key === l))}></hcd-entity-control></div>` : h)}
      <div class="section-grid">${["grease_filter_entity", "carbon_filter_entity"].map((l) => {
      const a = this.getState(l);
      return a ? _`<hcd-entity-control .hass=${this.hass} .entity=${a} kind="status" .label=${I(this.hass, z.fields.find((c) => c.key === l))}></hcd-entity-control>` : h;
    })}</div>
    `;
  }
}
w(z.cardType.replace("custom:", ""), fi);
function yi(n) {
  return g(n) && ["residuelheat", "residualheat"].includes(v(n));
}
function bi(n, e) {
  return [n, e].some((t) => g(t) && ["active", "run", "pause", "actionrequired"].includes(v(t)));
}
const vi = [
  { side: "left", zones: ["200", "100"] },
  { side: "right", zones: ["300", "400"] }
];
function wi(n, e) {
  return g(e) && /(?:^|cookinghobprogram)powermovemode$/.test(v(e)) ? "move" : g(n) && v(n) === "joinmode" ? "join" : "";
}
class $i extends Q {
  constructor() {
    super(...arguments), this.definition = F;
  }
  static getConfigElement() {
    return document.createElement(F.editorTag);
  }
  static getStubConfig() {
    return {};
  }
  primaryFieldKeys() {
    return ["bridge_mode_entity", "hob_mode_entity"];
  }
  renderPrimary() {
    if (!this.hass) return h;
    const e = (l) => ["state", "operation", "power", "remaining"].some((a) => !!this.getState("zone_" + l + "_" + a + "_entity")), t = this.getState("bridge_mode_entity"), i = this.getState("hob_mode_entity"), s = wi(t, i), r = i?.attributes.options?.filter((l) => /(?:[._])(?:powerlevelmode|powermovemode|fryingsensormode)$/i.test(l)) || [], o = i && { ...i, attributes: { ...i.attributes, options: r } };
    return _`
    <div class="section-grid">
      ${t ? _`<hcd-entity-control .hass=${this.hass} .entity=${t} kind="select" .label=${d(this.hass, "field.bridge_mode_entity", "Join / split zones")} .busy=${this._busyIds.has(t.entity_id)}></hcd-entity-control>` : h}
      ${o && r.length ? _`<hcd-entity-control .hass=${this.hass} .entity=${o} kind="select" .label=${d(this.hass, "field.hob_mode_entity", "Power mode")} .busy=${this._busyIds.has(o.entity_id)}></hcd-entity-control>` : h}
    </div>
    ${t ? h : _`<p class="read-only-note">${d(this.hass, "direct.join_missing", "No Join entity assigned. Enable or assign the zone bridge mode entity in the editor.")}</p>`}
    <div class="zones">${vi.map((l) => _`
      <div class="zone-pair ${s ? "combined " + s : ""}" data-side=${l.side}>
      ${s ? _`<div class="pair-label">${s === "move" ? "powerMove" : "Join"} · ${l.zones.join(" + ")}</div>` : h}
      ${s === "move" ? _`<div class="move-levels">
        ${["rear", "middle", "front"].map((a) => {
      const c = this.getState("power_move_" + a + "_" + l.side + "_entity");
      return _`<div class="move-level"><span>${d(this.hass, "direct.move_" + a, a === "rear" ? "Rear" : a === "middle" ? "Middle" : "Front")}</span><strong>${y(this.hass, c)}</strong></div>`;
    })}
      </div>` : h}
      ${l.zones.filter(e).map((a) => {
      const c = (Ge) => this.getState("zone_" + a + "_" + Ge + "_entity"), u = c("state"), p = c("operation"), f = c("power"), b = c("remaining"), m = c("frying"), x = yi(u), Ke = bi(u, p), fe = u || f || p || b;
      return _`<button type="button" data-zone=${a} class="zone ${x ? "hot" : Ke ? "active" : ""}" @click=${() => fe && ge(this, fe.entity_id)}
        aria-label=${"Zone " + a + ": " + y(this.hass, u || p)}>
        <span class="zone-title">Zone ${a}<span>${y(this.hass, p || u)}</span></span>
        <span class="zone-power">${y(this.hass, f)}</span>
        ${x ? _`<span class="hot-label">${d(this.hass, "direct.residual_heat", "Residual heat")}</span>` : h}
        ${g(b) ? _`<span class="zone-meta">${d(this.hass, "field.remaining_time_entity", "Remaining time")}: ${y(this.hass, b)}</span>` : h}
        ${g(m) && m.state !== "off" ? _`<span class="zone-meta">${d(this.hass, "direct.frying", "Frying sensor")}: ${y(this.hass, m)}</span>` : h}
      </button>`;
    })}</div>`)}</div><p class="read-only-note">${d(this.hass, "direct.hob_readonly", "Zone values are read-only. Tap a zone for details.")}</p>`;
  }
}
w(F.cardType.replace("custom:", ""), $i);
const ki = {
  dishwasher: ["dishwasher", "dish care", "dishcare", "geschirrspuler", "spulmaschine"],
  oven: ["oven", "backofen", "herd"],
  coffee: ["coffee maker", "coffeemaker", "coffee machine", "kaffeemaschine", "kaffeevollautomat", "espresso"],
  hood: ["hood", "dunstabzug", "haube", "extractor"],
  hob: ["hob", "kochfeld", "cooktop"]
};
function De(n) {
  return n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function xi(n, e, t) {
  const i = n.states[e];
  if (!i) return !1;
  const s = De([
    e,
    i.attributes.friendly_name,
    i.attributes.device_class,
    i.attributes.icon
  ].filter(Boolean).join(" "));
  return ki[t].some((r) => s.includes(De(r)));
}
const Si = [N, D, O, z, F];
window.customCards = window.customCards || [];
for (const n of Si)
  window.customCards.some((e) => e.type === n.cardType.replace("custom:", "")) || window.customCards.push({
    type: n.cardType.replace("custom:", ""),
    name: n.displayName,
    description: n.description,
    preview: !0,
    documentationURL: "https://github.com/Asmir1975/hc-direct-cards",
    getEntitySuggestion: (e, t) => xi(e, t, n.kind) ? { config: { type: n.cardType, entity: t } } : null
  });
console.info(`%c HOME-CONNECT-DIRECT-CARDS %c v${Ze} `, "color:white;background:#445b78;font-weight:700", "color:#445b78;background:#eef2f7");
