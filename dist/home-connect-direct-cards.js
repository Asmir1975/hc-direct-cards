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
const Q = globalThis, de = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, he = /* @__PURE__ */ Symbol(), ye = /* @__PURE__ */ new WeakMap();
let De = class {
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
const Ge = (n) => new De(typeof n == "string" ? n : n + "", void 0, he), B = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new De(t, n, he);
}, Je = (n, e) => {
  if (de) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = Q.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, n.appendChild(i);
  }
}, be = de ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ge(t);
})(n) : n;
const { is: Ye, defineProperty: Qe, getOwnPropertyDescriptor: Xe, getOwnPropertyNames: et, getOwnPropertySymbols: tt, getPrototypeOf: it } = Object, ie = globalThis, ve = ie.trustedTypes, nt = ve ? ve.emptyScript : "", st = ie.reactiveElementPolyfillSupport, F = (n, e) => n, le = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? nt : null;
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
} }, Oe = (n, e) => !Ye(n, e), we = { attribute: !0, type: String, converter: le, reflect: !1, useDefault: !1, hasChanged: Oe };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ie.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let M = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = we) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Qe(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: o } = Xe(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? we;
  }
  static _$Ei() {
    if (this.hasOwnProperty(F("elementProperties"))) return;
    const e = it(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(F("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(F("properties"))) {
      const t = this.properties, i = [...et(t), ...tt(t)];
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
    return Je(e, this.constructor.elementStyles), e;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : le).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : le;
      this._$Em = s;
      const l = r.fromAttribute(t, o.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, o) {
    if (e !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[e]), i ??= r.getPropertyOptions(e), !((i.hasChanged ?? Oe)(o, t) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, i)))) return;
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
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[F("elementProperties")] = /* @__PURE__ */ new Map(), M[F("finalized")] = /* @__PURE__ */ new Map(), st?.({ ReactiveElement: M }), (ie.reactiveElementVersions ??= []).push("2.1.2");
const _e = globalThis, ke = (n) => n, te = _e.trustedTypes, $e = te ? te.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Re = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, Le = "?" + S, ot = `<${Le}>`, C = document, U = () => C.createComment(""), j = (n) => n === null || typeof n != "object" && typeof n != "function", ue = Array.isArray, rt = (n) => ue(n) || typeof n?.[Symbol.iterator] == "function", oe = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xe = /-->/g, Se = />/g, A = RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ze = /'/g, Ae = /"/g, Be = /^(?:script|style|textarea|title)$/i, at = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), _ = at(1), T = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), Ee = /* @__PURE__ */ new WeakMap(), E = C.createTreeWalker(C, 129);
function He(n, e) {
  if (!ue(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $e !== void 0 ? $e.createHTML(e) : e;
}
const lt = (n, e) => {
  const t = n.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = H;
  for (let l = 0; l < t; l++) {
    const a = n[l];
    let c, u, p = -1, g = 0;
    for (; g < a.length && (r.lastIndex = g, u = r.exec(a), u !== null); ) g = r.lastIndex, r === H ? u[1] === "!--" ? r = xe : u[1] !== void 0 ? r = Se : u[2] !== void 0 ? (Be.test(u[2]) && (s = RegExp("</" + u[2], "g")), r = A) : u[3] !== void 0 && (r = A) : r === A ? u[0] === ">" ? (r = s ?? H, p = -1) : u[1] === void 0 ? p = -2 : (p = r.lastIndex - u[2].length, c = u[1], r = u[3] === void 0 ? A : u[3] === '"' ? Ae : ze) : r === Ae || r === ze ? r = A : r === xe || r === Se ? r = H : (r = A, s = void 0);
    const b = r === A && n[l + 1].startsWith("/>") ? " " : "";
    o += r === H ? a + ot : p >= 0 ? (i.push(c), a.slice(0, p) + Re + a.slice(p) + S + b) : a + S + (p === -2 ? l : b);
  }
  return [He(n, o + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Z {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const l = e.length - 1, a = this.parts, [c, u] = lt(e, t);
    if (this.el = Z.createElement(c, i), E.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = E.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(Re)) {
          const g = u[r++], b = s.getAttribute(p).split(S), m = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: o, name: m[2], strings: b, ctor: m[1] === "." ? dt : m[1] === "?" ? ht : m[1] === "@" ? _t : ne }), s.removeAttribute(p);
        } else p.startsWith(S) && (a.push({ type: 6, index: o }), s.removeAttribute(p));
        if (Be.test(s.tagName)) {
          const p = s.textContent.split(S), g = p.length - 1;
          if (g > 0) {
            s.textContent = te ? te.emptyScript : "";
            for (let b = 0; b < g; b++) s.append(p[b], U()), E.nextNode(), a.push({ type: 2, index: ++o });
            s.append(p[g], U());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Le) a.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(S, p + 1)) !== -1; ) a.push({ type: 7, index: o }), p += S.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = C.createElement("template");
    return i.innerHTML = e, i;
  }
}
function O(n, e, t = n, i) {
  if (e === T) return e;
  let s = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const o = j(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = s : t._$Cl = s), s !== void 0 && (e = O(n, s._$AS(n, e.values), s, i)), e;
}
class ct {
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
    const { el: { content: t }, parts: i } = this._$AD, s = (e?.creationScope ?? C).importNode(t, !0);
    E.currentNode = s;
    let o = E.nextNode(), r = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new W(o, o.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (c = new ut(o, this, e)), this._$AV.push(c), a = i[++l];
      }
      r !== a?.index && (o = E.nextNode(), r++);
    }
    return E.currentNode = C, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class W {
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
    e = O(this, e, t), j(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== T && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : rt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Z.createElement(He(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(t);
    else {
      const o = new ct(s, this), r = o.u(this.options);
      o.p(t), this.T(r), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Ee.get(e.strings);
    return t === void 0 && Ee.set(e.strings, t = new Z(e)), t;
  }
  k(e) {
    ue(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new W(this.O(U()), this.O(U()), this, this.options)) : i = t[s], i._$AI(o), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = ke(e).nextSibling;
      ke(e).remove(), e = i;
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
  constructor(e, t, i, s, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(e, t = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = O(this, e, t, 0), r = !j(e) || e !== this._$AH && e !== T, r && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = o[0], a = 0; a < o.length - 1; a++) c = O(this, l[i + a], t, a), c === T && (c = this._$AH[a]), r ||= !j(c) || c !== this._$AH[a], c === h ? e = h : e !== h && (e += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    r && !s && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class dt extends ne {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class ht extends ne {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class _t extends ne {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = O(this, e, t, 0) ?? h) === T) return;
    const i = this._$AH, s = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== h && (i === h || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ut {
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
const pt = _e.litHtmlPolyfillSupport;
pt?.(Z, W), (_e.litHtmlVersions ??= []).push("3.3.3");
const mt = (n, e, t) => {
  const i = t?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = t?.renderBefore ?? null;
    i._$litPart$ = s = new W(e.insertBefore(U(), o), o, void 0, t ?? {});
  }
  return s._$AI(n), s;
};
const pe = globalThis;
let $ = class extends M {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = mt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return T;
  }
};
$._$litElement$ = !0, $.finalized = !0, pe.litElementHydrateSupport?.({ LitElement: $ });
const gt = pe.litElementPolyfillSupport;
gt?.({ LitElement: $ });
(pe.litElementVersions ??= []).push("4.2.2");
const ft = {
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
}, yt = {
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
function bt(n, e, t) {
  if (n.platform !== "homeconnect_ws") return;
  const i = yt[e][t] || ft[t] || [], s = n.unique_id?.split("-").pop(), o = i.findIndex((r) => r === n.translation_key || s && new RegExp("^" + r.replace("{cavity}", "\\d+") + "$").test(s));
  return o < 0 ? -1e3 : 1e3 - o;
}
function re(n) {
  return n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function vt(n, e, t, i) {
  const s = e.entity_id.split(".")[0];
  if (t.domains?.length && !t.domains.includes(s)) return -1e3;
  const o = bt(e, i.kind, t.key);
  if (o !== void 0) return n.states[e.entity_id] && n.states[e.entity_id].attributes.restored !== !0 ? o : -1e3;
  const r = n.states[e.entity_id], l = re([
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
    const u = t.domains.indexOf(s);
    a += (t.domains.length - u) * 8;
  }
  for (const u of t.aliases || []) {
    const p = re(u);
    l.includes(p) && (a = Math.max(a, 100 + p.length));
  }
  const c = re(t.key.replace(/_entity$/, "")).split(" ");
  return a += c.filter((u) => l.includes(u)).length * 4, (e.disabled_by || e.hidden_by) && (a -= 50), a;
}
async function Fe(n, e, t, i) {
  const s = await n.callWS({ type: "config/entity_registry/list" }), o = i.device_id ? s.find((c) => c.device_id === i.device_id && c.platform === "homeconnect_ws" && !c.disabled_by && !c.hidden_by && n.states[c.entity_id] && n.states[c.entity_id].attributes.restored !== !0) : s.find((c) => c.entity_id === e);
  if (!o?.device_id) throw new Error("The selected device has no active integration entity, or the anchor has no device registry link.");
  const r = s.filter((c) => c.device_id === o.device_id && !c.disabled_by && !c.hidden_by && (o.platform !== "homeconnect_ws" || c.platform === "homeconnect_ws")), l = {}, a = new Set(Object.entries(i).filter(([c, u]) => c !== "entity" && typeof u == "string" && u.includes(".")).map(([, c]) => c));
  for (const c of t.fields) {
    if (c.key === "entity" || i[c.key]) continue;
    const u = r.filter((p) => !a.has(p.entity_id)).map((p) => ({ entry: p, score: vt(n, p, c, t) })).filter(({ score: p }) => p >= 50).sort((p, g) => g.score - p.score || p.entry.entity_id.localeCompare(g.entry.entity_id));
    u[0] && !(u[0].score >= 980 && u[1]?.score === u[0].score) && (l[c.key] = u[0].entry.entity_id, a.add(u[0].entry.entity_id));
  }
  return { anchor: o, candidates: r, suggestions: l };
}
async function Ue(n, e, t, i) {
  return (await Fe(n, e, t, i)).suggestions;
}
function w(n) {
  return n?.device_id ? "device:" + n.device_id : n?.entity ? "entity:" + n.entity : "";
}
const wt = {
  "unit.min": "Min.",
  "time.elapsed": "Laufzeit",
  "time.done_in": "Fertig in",
  "time.done_at": "Fertig um {t}",
  "time.estimate": "Geschätzte Dauer",
  "time.done_at_start": "Fertig um {t} bei Start",
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
}, kt = { de: wt };
function se(n) {
  return (n?.language || n?.locale?.language || "en").toLowerCase().split(/[-_]/)[0];
}
function d(n, e, t) {
  return kt[se(n)]?.[e] || t;
}
function P(n, e) {
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
const je = "1.1.0";
function ae(n) {
  return typeof n == "boolean" ? String(n) : /^[A-Za-z0-9_./:%-]+$/.test(n) ? n : JSON.stringify(n);
}
function $t(n, e) {
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
    if (typeof r == "string" || typeof r == "boolean") return [`${o}: ${ae(r)}`];
    if (r && typeof r == "object") {
      const l = Object.entries(r).filter((a) => typeof a[1] == "string" && !!a[1].trim()).sort(([a], [c]) => a.localeCompare(c));
      return l.length ? [`${o}:`, ...l.map(([a, c]) => `  ${ae(a)}: ${ae(c)}`)] : [];
    }
    return [];
  }).join(`
`)}
`;
}
function xt(n) {
  return (n || "").replace(/[\r\n]+/g, " ").trim();
}
async function St(n, e, t, i) {
  const { candidates: s, suggestions: o } = await Fe(n, e, t, i), r = t.fields.flatMap((a) => {
    const c = i[a.key], u = o[a.key], p = typeof c == "string" ? c : typeof u == "string" ? `${u} (suggested)` : "—";
    return [`- ${a.key}: ${p}`];
  }), l = s.slice().sort((a, c) => a.entity_id.localeCompare(c.entity_id)).map((a) => {
    const c = xt(a.name || a.original_name);
    return `- ${a.entity_id}${c ? ` | ${c}` : ""}`;
  });
  return [
    "HC Direct Cards – entity discovery report",
    `Version: ${je}`,
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
const zt = [
  { id: "general", label: "General", icon: "mdi:information-outline" },
  { id: "program", label: "Program", icon: "mdi:tune-variant" },
  { id: "actions", label: "Actions", icon: "mdi:gesture-tap-button" },
  { id: "options", label: "Options", icon: "mdi:toggle-switch-outline" },
  { id: "status", label: "Status & care", icon: "mdi:heart-pulse" },
  { id: "settings", label: "Device settings", icon: "mdi:cog-outline" }
];
class V extends $ {
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
    const t = w(this._config);
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
    if (!this.hass || !this._config || !w(this._config) || this._discovering) return;
    const e = this._config.entity || "", t = w(this._config);
    this._discovering = !0, this._notice = "";
    try {
      const i = await Ue(this.hass, e, this.definition, this._config);
      if (w(this._config) !== t) return;
      const s = Object.fromEntries(Object.entries(i).filter(([r]) => !this._config?.[r])), o = Object.keys(s).length;
      this._config.device_id ? (this._detectedFields = s, this.notify({ ...this._config })) : this.notify({ ...this._config, ...s }), this._notice = o ? `${o} ${d(this.hass, "editor.detected", "matching entities added. Review every suggestion before saving.")}` : d(this.hass, "editor.no_matches", "No additional unambiguous matches were found.");
    } catch (i) {
      this._notice = i instanceof Error ? i.message : "Automatic discovery failed.";
    } finally {
      this._discovering = !1, w(this._config) && w(this._config) !== t && this.autoDetect();
    }
  }
  async copyYaml() {
    if (!(!this._config || this._copying)) {
      this._copying = "yaml";
      try {
        await Ce($t(this._config, this.definition)), this._notice = d(this.hass, "editor.yaml_copied", "YAML configuration copied to the clipboard.");
      } catch (e) {
        this._notice = e instanceof Error ? e.message : "Could not copy the YAML configuration.";
      } finally {
        this._copying = "";
      }
    }
  }
  async copyDiscoveryReport() {
    if (!(!this.hass || !w(this._config) || this._copying)) {
      this._copying = "report";
      try {
        const e = await St(this.hass, this._config.entity || "", this.definition, this._config);
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
    return _`<div class="field"><label>${P(this.hass, e)}</label><ha-selector
      .hass=${this.hass} .selector=${this.entitySelector(e)} .value=${t}
      @value-changed=${(i) => {
      this.change(e.key, i.detail.value), e.key === "entity" && i.detail.value && this.autoDetect();
    }}></ha-selector></div>`;
  }
  renderToggle(e, t, i) {
    if (!this._config) return h;
    const s = typeof this._config[e] == "boolean" ? !!this._config[e] : i;
    return _`<div class="toggle"><label for=${e}>${t}</label><ha-switch id=${e} .checked=${s} @change=${(o) => this.change(e, o.currentTarget.checked)}></ha-switch></div>`;
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
      <details><summary>${d(this.hass, "editor.manual_mapping", "Manual mapping (optional)")}</summary>${zt.map((e) => {
      const t = this.definition.fields.filter((i) => i.section === e.id);
      return t.length ? _`<section class="group"><h3 class="group-title"><ha-icon .icon=${e.icon}></ha-icon>${d(this.hass, `section.${e.id}`, e.label)}</h3><div class="fields">${t.map((i) => this.renderEntityField(i))}
          ${e.id === "program" ? this.renderProgramNames() : ""}
          ${e.id === "general" ? _`
            <button type="button" class="detect" ?disabled=${!w(this._config) || this._discovering} @click=${this.autoDetect}><ha-icon class=${this._discovering ? "loading" : ""} .icon=${this._discovering ? "mdi:loading" : "mdi:auto-fix"}></ha-icon>${d(this.hass, "editor.detect", "Detect device entities")}</button>
            <div class="tool-row">
              <button type="button" class="tool" ?disabled=${!!this._copying} @click=${this.copyYaml}><ha-icon icon="mdi:content-copy"></ha-icon>${d(this.hass, "editor.copy_yaml", "Copy YAML")}</button>
              <button type="button" class="tool" ?disabled=${!w(this._config) || !!this._copying} @click=${this.copyDiscoveryReport}><ha-icon class=${this._copying === "report" ? "loading" : ""} .icon=${this._copying === "report" ? "mdi:loading" : "mdi:clipboard-text-search-outline"}></ha-icon>${d(this.hass, "editor.copy_report", "Copy discovery report")}</button>
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
const K = [
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
    ...K.filter((n) => n.key !== "pause_entity" && n.key !== "resume_entity"),
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
}, I = {
  kind: "oven",
  cardType: "custom:hc-direct-oven-card",
  editorTag: "hc-direct-oven-card-editor",
  displayName: "HC Direct · Oven",
  description: "Program, temperature, timer and status controls for a Home Connect oven.",
  defaultName: "Oven",
  defaultIcon: "mdi:stove",
  accent: "#ff8a45",
  fields: [
    ...K,
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
}, D = {
  kind: "coffee",
  cardType: "custom:hc-direct-coffee-card",
  editorTag: "hc-direct-coffee-card-editor",
  displayName: "HC Direct · Coffee",
  description: "A drink-first controller for Home Connect coffee machines.",
  defaultName: "Coffee machine",
  defaultIcon: "mdi:coffee-maker",
  accent: "#b9794a",
  fields: [
    ...K.filter((n) => n.key !== "remaining_time_entity"),
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
    ...K.filter((n) => !["start_entity", "pause_entity", "resume_entity", "cancel_entity", "progress_entity", "remaining_time_entity", "start_in_entity"].includes(n.key)),
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
}, At = ["100", "200", "300", "400"], Et = {
  state: "Zone state",
  operation: "Operating state",
  power: "Power level",
  remaining: "Remaining time",
  frying: "Frying sensor",
  progress: "Progress"
}, Ct = At.flatMap((n) => Object.entries(Et).map(([e, t]) => ({
  key: "zone_" + n + "_" + e + "_entity",
  label: "Zone " + n + " · " + t,
  section: "status",
  kind: "status",
  domains: ["sensor"]
}))), R = {
  kind: "hob",
  cardType: "custom:hc-direct-hob-card",
  editorTag: "hc-direct-hob-card-editor",
  displayName: "HC Direct · Hob",
  description: "Read-only zones, residual heat and timers.",
  defaultName: "Hob",
  defaultIcon: "mdi:stove",
  accent: "#c75b30",
  fields: [
    ...K.filter((n) => ["entity", "status_entity", "operating_state_entity", "connection_entity"].includes(n.key)),
    ...Ct,
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
function v(n, e) {
  customElements.get(n) || customElements.define(n, e);
}
class Tt extends V {
  constructor() {
    super(...arguments), this.definition = N;
  }
}
v(N.editorTag, Tt);
class Mt extends V {
  constructor() {
    super(...arguments), this.definition = I;
  }
}
v(I.editorTag, Mt);
class Pt extends V {
  constructor() {
    super(...arguments), this.definition = D;
  }
}
v(D.editorTag, Pt);
class Nt extends V {
  constructor() {
    super(...arguments), this.definition = z;
  }
}
v(z.editorTag, Nt);
class It extends V {
  constructor() {
    super(...arguments), this.definition = R;
  }
}
v(R.editorTag, It);
const Dt = { ATTRIBUTE: 1 }, Ot = (n) => (...e) => ({ _$litDirective$: n, values: e });
let Rt = class {
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
const Ze = "important", Lt = " !" + Ze, Bt = Ot(class extends Rt {
  constructor(n) {
    if (super(n), n.type !== Dt.ATTRIBUTE || n.name !== "style" || n.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const o = typeof s == "string" && s.endsWith(Lt);
        i.includes("-") || o ? t.setProperty(i, o ? s.slice(0, -11) : s, o ? Ze : "") : t[i] = s;
      }
    }
    return T;
  }
}), Ht = B`
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
function Ft(n, e, t) {
  const i = e[t];
  return n && typeof i == "string" ? n.states[i] : void 0;
}
function Ut(n) {
  const e = /* @__PURE__ */ new Set();
  for (const [t, i] of Object.entries(n))
    (t === "entity" || t.endsWith("_entity")) && typeof i == "string" && i.includes(".") && e.add(i);
  return [...e];
}
function jt(n, e, t) {
  return n === e ? !1 : !n || !e || n.language !== e.language || n.locale?.language !== e.locale?.language ? !0 : t.some((i) => n.states[i] !== e.states[i]);
}
const Zt = /* @__PURE__ */ new Set(["unknown", "unavailable", "null", ""]);
function f(n) {
  return !!n && !Zt.has(String(n.state).toLowerCase());
}
function Te(n) {
  return (/enumtype|eventpresentstate|operationstate|powerstate/i.test(n) && n.includes(".") || n.includes(".") && /^[a-z_]+\./i.test(n) ? n.split(".").pop() : n).replace(/^BSH[._]Common[._]|^Dishcare[._]|^Cooking[._]|^LaundryCare[._]|^ConsumerProducts[._]CoffeeMaker[._]/i, "").replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim();
}
function k(n) {
  if (!n) return "";
  const e = n.state.trim().toLowerCase();
  return (e.split(/[.:/]/).filter(Boolean).pop() || e).replace(/[\s_-]+/g, "");
}
function qt(n) {
  const e = /^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i.exec(n);
  if (!e) return;
  const t = Number(e[1] || 0), i = Number(e[2] || 0) + Math.floor(Number(e[3] || 0) / 60);
  return t ? `${t}:${String(i).padStart(2, "0")} h` : `${i} min`;
}
function y(n, e) {
  if (!e) return d(n, "not_configured", "Not configured");
  if (!f(e)) return e?.state === "unavailable" ? d(n, "unavailable", "Unavailable") : d(n, "unknown", "Unknown");
  if (n.formatEntityState)
    try {
      const l = n.formatEntityState(e);
      if (l && l !== e.state) {
        const a = Te(e.state).toLowerCase();
        if (!/enumtype|eventpresentstate|operationstate|powerstate/i.test(e.state) || l.toLowerCase() !== a) return l;
      }
    } catch {
    }
  const t = k(e), i = {
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
  }, o = { de: 1 }[se(n)] ?? 0;
  if (i[t] && /enumtype|eventpresentstate|operationstate|powerstate/i.test(e.state)) return i[t][o];
  const r = qt(e.state);
  return r || `${Te(e.state)}${e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : ""}`;
}
function me(n) {
  if (!n || !f(n)) return;
  const e = Number.parseFloat(n.state.replace(",", "."));
  return Number.isFinite(e) ? e : void 0;
}
function Wt(n) {
  const e = me(n);
  if (e !== void 0)
    return Math.max(0, Math.min(100, e <= 1 && !n?.attributes.unit_of_measurement ? e * 100 : e));
}
function X(n) {
  return !n || !f(n) ? !1 : ["on", "open", "true", "active", "running", "run", "1", "present"].includes(k(n));
}
function Vt(n, e, t) {
  if (!n || !f(n)) return !1;
  const i = k(n);
  return t !== void 0 && Number.isFinite(Number(n.state)) ? Number(n.state) <= t : e ? e.includes(i) : !["off", "closed", "ok", "normal", "none", "false", "0", "available", "full", "notpresent", "ready", "good"].includes(i);
}
function Kt(n, e) {
  const t = n?.trim();
  return !t || t.length > 96 || /[;{}]/.test(t) ? e : /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(t) || /^[a-z]+$/i.test(t) || /^var\(--[a-z0-9_-]+\)$/i.test(t) || /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([\d\s.,%+\-/a-z]+\)$/i.test(t) ? t : e;
}
function Gt(n) {
  return n === "running" || n === "paused";
}
function Jt(...n) {
  const e = n.filter((i) => !!i && f(i));
  if (!e.length && n.some(Boolean)) return "unavailable";
  const t = e.map(k);
  return n[0] && f(n[0]) && ["off", "aus", "ausgeschaltet", "inactive"].includes(k(n[0])) ? "off" : t.some((i) => ["pause", "paused", "angehalten", "unterbrochen"].includes(i)) ? "paused" : t.some((i) => ["run", "running", "active", "inoperation", "betrieb", "heat", "heating", "brew", "brewing", "drying", "trocknen", "delayedstart", "aborting"].includes(i)) ? "running" : t.some((i) => ["off", "aus", "ausgeschaltet", "inactive", "standby"].includes(i)) ? "off" : "idle";
}
function q(n) {
  return n.attributes.readonly === !0;
}
function L(n) {
  return !n || n.state === "unavailable" || n.attributes.restored === !0 ? !1 : n.entity_id.startsWith("select.") || n.entity_id.startsWith("input_select.") ? (n.attributes.options?.length || 0) > 0 : f(n);
}
function Me(n, e, t) {
  const i = t.fill_quantity_select_entity, s = typeof i == "string" ? e.states[i] : void 0;
  return n === "fill_quantity_select_entity" ? L(s) : n === "fill_quantity_entity" ? !L(s) : !0;
}
function G(n) {
  if (!L(n) || q(n)) throw new Error("This entity is unavailable or read-only.");
}
async function Yt(n, e) {
  G(e);
  const t = e.entity_id.split(".")[0];
  if (t === "select" || t === "input_select") {
    const i = e.attributes.options || [], s = (a) => a.toLowerCase().split(/[.:/]/).filter(Boolean).pop()?.replace(/[\s_-]/g, "") || "", o = i.find((a) => ["on", "ein", "active"].includes(s(a))), r = i.find((a) => ["off", "aus", "inactive", "standby"].includes(s(a))), l = ["on", "ein", "active"].includes(k(e)) ? r : o;
    if (!l) throw new Error("This select has no recognizable on/off options.");
    await n.callService("select", "select_option", { entity_id: e.entity_id, option: l });
    return;
  }
  await n.callService(t, e.state === "on" ? "turn_off" : "turn_on", { entity_id: e.entity_id });
}
async function Pe(n, e) {
  if (e.state === "unavailable" || q(e)) throw new Error("This button is unavailable or read-only.");
  const t = e.entity_id.split(".")[0];
  if (t !== "button" && t !== "input_button") throw new Error("The configured action is not a button entity.");
  await n.callService(t, "press", { entity_id: e.entity_id });
}
async function qe(n, e, t) {
  G(e);
  const i = e.entity_id.split(".")[0];
  if (i !== "select" && i !== "input_select") throw new Error("The configured entity is not a select.");
  if (e.attributes.options && !e.attributes.options.includes(t)) throw new Error("This option is not offered by the entity.");
  await n.callService(i, "select_option", { entity_id: e.entity_id, option: t });
}
async function Qt(n, e, t) {
  G(e);
  const i = e.entity_id.split(".")[0];
  await n.callService(i, "set_value", { entity_id: e.entity_id, value: t });
}
async function Xt(n, e, t) {
  if (G(e), !e.entity_id.startsWith("light.")) throw new Error("Expected a light entity.");
  const i = Math.max(0, Math.min(100, Math.round(t)));
  await n.callService(
    "light",
    i === 0 ? "turn_off" : "turn_on",
    i === 0 ? { entity_id: e.entity_id } : { entity_id: e.entity_id, brightness_pct: i }
  );
}
async function ei(n, e, t) {
  if (G(e), !e.entity_id.startsWith("fan.")) throw new Error("Expected a fan entity.");
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
function ti(n, e, t) {
  return ce(e.state, t) || y(n, e);
}
const We = { s: 1, sec: 1, min: 60, h: 3600, d: 86400 };
function ii(n) {
  return Math.round(n * 1e6) / 1e6;
}
function Ne(n) {
  const e = n.attributes, t = String(e.unit_of_measurement ?? "").trim(), i = Number(e.min ?? 0), s = Number(e.max ?? 100), o = Number(e.step ?? 1) || 1, r = We[t.toLowerCase()] ?? 0, l = r > 0 && (e.device_class === "duration" || t.toLowerCase() === "min" || t.toLowerCase() === "s"), a = e.device_class === "temperature" || t === "°C" || t === "°F", c = l ? Math.max(o, 60 / r) : a ? Math.max(o, 5) : o;
  return { value: me(n), min: i, max: s, step: c, unit: t, duration: l, unitSeconds: l ? r : 0 };
}
function ni(n, e, t) {
  const i = e + t * n.step, s = n.min + Math.round((i - n.min) / n.step) * n.step;
  return ii(Math.max(n.min, Math.min(n.max, s)));
}
function ee(n, e) {
  const t = Math.round(e), i = Math.floor(t / 60), s = t % 60;
  return s ? `${i}:${String(s).padStart(2, "0")} ${d(n, "unit.min", "min")}` : i >= 60 ? `${Math.floor(i / 60)}:${String(i % 60).padStart(2, "0")} h` : `${i} ${d(n, "unit.min", "min")}`;
}
function Y(n) {
  const e = me(n);
  if (e === void 0 || !n) return;
  const t = We[String(n.attributes.unit_of_measurement ?? "").trim().toLowerCase()];
  return t ? e * t : void 0;
}
function si(n, e, t) {
  if (e.duration) return ee(n, t * e.unitSeconds);
  const i = t.toLocaleString(se(n), { maximumFractionDigits: 2 });
  return e.unit ? `${i} ${e.unit}` : i;
}
function oi(n) {
  const e = Y(n.remaining), t = Y(n.elapsed), i = Y(n.estimate), s = Y(n.startIn) ?? 0;
  if (n.active) {
    const o = e && e > 0 ? e : i && i > 60 ? i : void 0;
    return o === void 0 && !t ? void 0 : { phase: "active", elapsed: t || void 0, remaining: o, endsAt: o === void 0 ? void 0 : n.now + o * 1e3 };
  }
  if (n.status && f(n.status) && k(n.status) === "finished") {
    const o = Date.parse(n.status.last_changed);
    return Number.isFinite(o) ? { phase: "finished", finishedAt: o } : void 0;
  }
  if (i && i > 60) return { phase: "idle", estimate: i, endsAt: n.now + (s + i) * 1e3 };
}
function ri(n, e) {
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
  if (!e || !f(e)) return;
  const t = e.state.trim().toLowerCase();
  if (!t || t === "none" || t === "off") return;
  const i = li(t);
  return { text: y(n, e), tone: i, icon: ai[i] };
}
class di extends $ {
  constructor() {
    super(...arguments), this.valueLabels = {}, this.label = "", this.kind = "status", this.disabled = !1, this.busy = !1;
  }
  static {
    this.properties = { hass: { attribute: !1 }, entity: { attribute: !1 }, valueLabels: { attribute: !1 }, label: {}, kind: {}, disabled: { type: Boolean }, busy: { type: Boolean }, _pending: { state: !0 } };
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
    .stepper { flex: none; display: inline-flex; align-items: stretch; height: 37px; border: 1px solid color-mix(in srgb, var(--divider-color), var(--primary-text-color) 8%); border-radius: 11px; overflow: hidden; background: var(--card-background-color); }
    .stepper button { width: 38px; padding: 0; border: 0; color: var(--primary-text-color); background: transparent; font: inherit; font-size: 20px; line-height: 1; cursor: pointer; transition: background 120ms ease; }
    .stepper button:hover:not(:disabled) { background: color-mix(in srgb, var(--hc-accent), transparent 82%); }
    .stepper-value { min-width: 78px; padding: 0 6px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 650; font-variant-numeric: tabular-nums; white-space: nowrap; border-inline: 1px solid color-mix(in srgb, var(--divider-color), var(--primary-text-color) 8%); }
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
    const t = Ne(this.entity), i = this._pending ?? t.value;
    if (i === void 0) return;
    const s = ni(t, i, e);
    s !== i && (this._pending = s, this.requestUpdate(), clearTimeout(this._sendTimer), clearTimeout(this._clearTimer), this._sendTimer = setTimeout(() => {
      this._sendTimer = void 0, this.emit("number", s), this._clearTimer = setTimeout(() => {
        this._pending = void 0, this.requestUpdate();
      }, 4e3);
    }, 700));
  }
  emit(e, t) {
    !this.entity || this.disabled || this.busy || (e === "press" ? this.entity.state === "unavailable" : !L(this.entity)) || q(this.entity) || this.dispatchEvent(new CustomEvent("hcd-control", { detail: { entity: this.entity, action: e, value: t }, bubbles: !0, composed: !0 }));
  }
  render() {
    if (!this.entity || !this.hass) return h;
    const e = this.kind === "button" ? this.entity.state === "unavailable" : !L(this.entity), t = this.disabled || this.busy || e || q(this.entity);
    if (this.kind === "button")
      return _`<div class="line"><span class="label">${this.label}</span><button type="button" ?disabled=${t} @click=${() => this.emit("press")}>${this.label}</button></div>`;
    if (this.kind === "light" || this.kind === "fan") {
      const s = this.kind === "fan", o = this.entity.attributes.supported_color_modes, r = s ? (Number(this.entity.attributes.supported_features || 0) & 1) !== 0 : !!o?.some((a) => !["onoff", "unknown"].includes(a)), l = s ? Number(this.entity.attributes.percentage ?? 0) : this.entity.state === "off" ? 0 : Math.round(Number(this.entity.attributes.brightness ?? 255) / 255 * 100);
      return _`<div class="control">
        <div class="line"><span class="label">${this.label}</span><button class="switch ${X(this.entity) ? "on" : ""}" type="button" role="switch" aria-checked=${String(X(this.entity))} aria-label=${this.label} ?disabled=${t} @click=${() => this.emit("toggle")}></button></div>
        ${r ? _`<label class="number-head">${l}%<input aria-label=${this.label + " %"} type="range" min="0" max="100" step=${s ? Number(this.entity.attributes.percentage_step || 1) : 1} .value=${String(l)} ?disabled=${t} @change=${(a) => this.emit(s ? "fan" : "brightness", Number(a.target.value))}></label>` : h}
      </div>`;
    }
    if (this.kind === "toggle") {
      const s = X(this.entity);
      return _`<div class="line ${e ? "unavailable" : ""}"><span class="label">${this.label}</span><button class="switch ${s ? "on" : ""}" type="button" role="switch" aria-checked=${String(s)} aria-label=${this.label} ?disabled=${t} @click=${() => this.emit("toggle")}></button></div>`;
    }
    if (this.kind === "select") {
      const s = this.entity.attributes.options || [], o = s.includes(this.entity.state) || !f(this.entity) ? s : [this.entity.state, ...s];
      return _`<div class="line ${e ? "unavailable" : ""}"><label class="label" for="select">${this.label}</label><select id="select" ?disabled=${t} @change=${(r) => this.emit("select", r.target.value)}>${f(this.entity) ? h : _`<option value="" disabled selected>${y(this.hass, this.entity)}</option>`}${o.map((r) => _`<option .value=${r} ?selected=${r === this.entity?.state}>${ce(r, this.valueLabels) || y(this.hass, { ...this.entity, state: r })}</option>`)}</select></div>`;
    }
    if (this.kind === "number") {
      const s = Ne(this.entity), o = this._pending ?? s.value, r = o === void 0 ? y(this.hass, this.entity) : si(this.hass, s, o), l = o !== void 0 && o <= s.min, a = o !== void 0 && o >= s.max, c = d(this.hass, "action.decrease", "Decrease"), u = d(this.hass, "action.increase", "Increase");
      return _`<div class="line ${e ? "unavailable" : ""}"><span class="label">${this.label}</span><div class="stepper" role="group" aria-label=${this.label}>
        <button type="button" aria-label=${`${c}: ${this.label}`} ?disabled=${t || o === void 0 || l} @click=${() => this.tap(-1)}>−</button>
        <span class="stepper-value" aria-live="polite">${r}</span>
        <button type="button" aria-label=${`${u}: ${this.label}`} ?disabled=${t || o === void 0 || a} @click=${() => this.tap(1)}>+</button>
      </div></div>`;
    }
    const i = ce(this.entity.state, this.valueLabels) || y(this.hass, this.entity);
    return _`<button type="button" class="line status-line ${e ? "unavailable" : ""}" @click=${() => ge(this, this.entity.entity_id)} aria-label=${`${this.label}: ${i}`}><span class="label">${this.label}</span><span class="value">${i}</span></button>`;
  }
}
v("hcd-entity-control", di);
class hi extends $ {
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
    return _`<button type="button" @click=${() => this.open = !this.open} aria-expanded=${String(this.open)}><ha-icon .icon=${this.icon}></ha-icon><span class="title">${this.title}</span><ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon></button>${this.open ? _`<div class="body"><div class="clip"><div class="content"><slot></slot></div></div></div>` : ""}`;
  }
}
v("hcd-expandable-section", hi);
class _i extends $ {
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
    return _`<div class="row">${this.actions.map((e) => {
      const t = this.busyIds.has(e.entityId), i = this.confirmingId === e.entityId;
      return _`<button type="button" class="${e.primary ? "primary" : ""} ${e.danger ? "danger" : ""} ${i ? "confirming" : ""} ${t ? "busy" : ""}" ?disabled=${e.disabled || t} @click=${() => this.dispatchEvent(new CustomEvent("hcd-action", { detail: e, bubbles: !0, composed: !0 }))}><ha-icon .icon=${t ? "mdi:loading" : i ? "mdi:alert-circle-outline" : e.icon}></ha-icon><span>${i && e.confirmLabel || e.label}</span></button>`;
    })}</div>`;
  }
}
v("hcd-action-buttons", _i);
const ui = {
  program: { title: "Program", icon: "mdi:tune-variant" },
  options: { title: "Options", icon: "mdi:toggle-switch-outline" },
  status: { title: "Status & care", icon: "mdi:information-outline" },
  settings: { title: "Device settings", icon: "mdi:cog-outline" }
};
class J extends $ {
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
    this.styles = [Ht, B`
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
    const e = this._config?.entity || "", t = w(this._config);
    if (!this.hass || !t || this._config?.auto_detect === !1 || this._discovering || t === this._discoveryAnchor && this._registrySnapshot === this.hass.entities || !this._config?.device_id && Object.keys(this._config).some((s) => s.endsWith("_entity"))) return;
    this._discoveryAnchor = t, this._registrySnapshot = this.hass.entities;
    const i = this._manualConfig || this._config;
    this._discovering = !0, Ue(this.hass, e, this.definition, i).then((s) => {
      if (w(this._config) !== t) return;
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
    return this._config.device_id && (t?.entities !== this.hass?.entities || t?.devices?.[this._config.device_id] !== this.hass?.devices?.[this._config.device_id]) ? !0 : jt(t, this.hass, Ut(this._config));
  }
  getState(e) {
    return this._config && Ft(this.hass, this._config, e);
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
    return !!e && !X(e);
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
    if (!this._config || !this.hass) return h;
    const t = this.definition.fields.filter((i) => this.primaryFieldKeys().includes(i.key)).filter((i) => Me(i.key, this.hass, this._config)).map((i) => ({ field: i, entity: this.getState(i.key) })).filter((i) => !!i.entity);
    return _`<div class="primary-grid">${t.map(({ field: i, entity: s }) => _`
      <hcd-entity-control .hass=${this.hass} .entity=${s} .label=${P(this.hass, i)} .kind=${this.controlKind(i, s)}
        .valueLabels=${i.key === "selected_program_entity" ? this._config?.program_names || {} : {}}
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
      this.hass && (i === "brightness" && typeof s == "number" && await Xt(this.hass, t, s), i === "fan" && typeof s == "number" && await ei(this.hass, t, s), i === "press" && await Pe(this.hass, t), i === "toggle" && await Yt(this.hass, t), i === "select" && typeof s == "string" && await qe(this.hass, t, s), i === "number" && typeof s == "number" && await Qt(this.hass, t, s));
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
    const t = this.hass, i = (o, r = "") => _`<span class="time-chip">${o}${r ? _` <b>${r}</b>` : h}</span>`, s = (o, r, l) => d(t, o, r).replace("{t}", ri(t, l));
    return e.phase === "finished" ? _`<div class="times">${i(s("time.done_at", "Done at {t}", e.finishedAt))}</div>` : e.phase === "idle" ? _`<div class="times">${i(d(t, "time.estimate", "Estimated duration"), ee(t, e.estimate))}${i(s("time.done_at_start", "Done at {t} if started", e.endsAt))}</div>` : _`<div class="times">
      ${e.elapsed !== void 0 ? i(d(t, "time.elapsed", "Running"), ee(t, e.elapsed)) : h}
      ${e.remaining !== void 0 ? i(d(t, "time.done_in", "Done in"), ee(t, e.remaining)) : h}
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
    const i = (e === "paused" ? [["resume_entity", d(this.hass, "action.resume", "Resume"), "mdi:play", !0, !1], ["cancel_entity", d(this.hass, "action.cancel", "Cancel"), "mdi:stop", !1, !0]] : e === "running" ? [["pause_entity", d(this.hass, "action.pause", "Pause"), "mdi:pause", !1, !1], ["cancel_entity", d(this.hass, "action.cancel", "Cancel"), "mdi:stop", !1, !0]] : [["start_entity", d(this.hass, "action.start", "Start"), "mdi:play", !0, !1]]).flatMap(([s, o, r, l, a]) => {
      if (!this.definition.fields.some((g) => g.key === s)) return [];
      const c = this._config?.[s], u = typeof c == "string" ? this.hass?.states[c] : void 0, p = u?.entity_id.split(".")[0];
      return u ? [{ key: s, label: o, confirmLabel: a ? d(this.hass, "action.confirm_cancel", "Confirm cancel") : void 0, icon: r, entityId: c, primary: l, danger: a, disabled: u.state === "unavailable" || p !== "button" && p !== "input_button" }] : [];
    });
    return i.length ? _`<div class="primary-actions"><hcd-action-buttons .actions=${i} .busyIds=${this._busyIds} .confirmingId=${this._confirmingId}></hcd-action-buttons></div>` : h;
  }
  renderSection(e) {
    if (!this._config || e === "options" && this._config.show_options_section === !1 || e === "status" && this._config.show_status_section === !1 || e === "settings" && this._config.show_settings_section === !1) return h;
    const t = this.configuredFields(e);
    if (!t.length) return h;
    const i = ui[e];
    return _`<hcd-expandable-section .title=${d(this.hass, `section.${e}`, i.title)} .icon=${i.icon} .open=${!1}>
      <div class="section-grid ${e === "program" ? "program-grid" : ""}">${t.map(({ field: s, entity: o }) => _`
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
    if (!this._config || !this.hass) return h;
    if (!w(this._config) && !Object.keys(this._config).some((m) => m.endsWith("_entity")))
      return _`<ha-card><div class="daily-controls" style="padding-top:20px">${d(this.hass, "direct.select_device", "Choose the appliance in the card editor.")}</div></ha-card>`;
    const e = this.getState("operating_state_entity") || this.getState("status_entity") || this.getState("power_entity"), t = this.getState("power_entity"), i = Jt(t, e), s = Gt(i), o = i === "off" && t ? t : e, r = s ? this.getState("active_program_entity") || this.getState("selected_program_entity") : this.getState("selected_program_entity"), l = this.getState("remaining_time_entity") || this.getState("finish_at_entity"), a = Wt(this.getState("progress_entity")), c = this.definition.kind === "oven" || this.definition.kind === "dishwasher" ? oi({
      active: s,
      status: this.getState("operating_state_entity"),
      remaining: this.getState("remaining_time_entity"),
      elapsed: this.getState("elapsed_time_entity"),
      estimate: this.getState("estimated_time_entity"),
      startIn: this.getState("start_in_entity"),
      now: Date.now()
    }) : void 0, u = ci(this.hass, this.getState("messages_entity")), p = this.definition.fields.filter((m) => m.warning && m.key !== "messages_entity").map((m) => ({ field: m, entity: this.getState(m.key) })).filter(({ field: m, entity: x }) => x && Vt(x, m.warningStates, m.warningBelow)), g = this.definition.fields.filter((m) => m.prominent).map((m) => this.getState(m.key)).filter(f), b = Kt(this._config.accent_color, this.definition.accent);
    return _`<ha-card style=${Bt({ "--hc-accent": b })} @hcd-control=${this.handleControl} @hcd-action=${this.handleAction}>
      <div class="shell">
        <header class="card-header">
          <button class="identity" type="button" @click=${this.showMoreInfo}>
            <span class="eyebrow">HOME CONNECT DIRECT · ${d(this.hass, "device." + this.definition.kind, this.definition.defaultName)}</span>
            <span class="card-title">${this._config.name || this.hass.devices?.[this._config.device_id || ""]?.name_by_user || this.hass.devices?.[this._config.device_id || ""]?.name || d(this.hass, "device." + this.definition.kind, this.definition.defaultName)}</span>
          </button>
          <span class="state-label ${i}">${this.getState("connection_entity") ? _`<span class="connection-dot ${this.isOffline() ? "offline" : ""}" title=${d(this.hass, this.isOffline() ? "direct.disconnected" : "direct.connected", this.isOffline() ? "Device disconnected" : "Connected")}></span>` : h}${o ? y(this.hass, o) : d(this.hass, "ready", "Ready")}</span>
        </header>
        ${u ? _`<div class="warning-strip"><span class="notice ${u.tone}" role="status"><ha-icon .icon=${u.icon}></ha-icon>${u.text}</span></div>` : h}
        ${p.length ? _`<div class="warning-strip">${p.map(({ field: m, entity: x }) => _`<span class="notice">${P(this.hass, m)}${x?.entity_id.startsWith("binary_sensor.") ? "" : ": " + y(this.hass, x)}</span>`)}</div>` : h}
        ${s && f(r) ? _`<div class="now-running"><span>${ti(this.hass, r, this._config.program_names)}</span>${f(l) && !c ? _`<strong>${y(this.hass, l)}</strong>` : h}</div>` : h}
        ${s && a !== void 0 && this._config.show_progress !== !1 ? _`<div class="progress-line"><span style=${`width:${a}%`}></span></div>` : h}
        ${c ? this.renderTimes(c) : h}
        ${g.length ? _`<div class="key-metrics">${g.map((m) => _`<strong>${y(this.hass, m)}</strong>`)}</div>` : h}
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
class pi extends J {
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
v("hc-direct-dishwasher-card", pi);
class mi extends J {
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
v("hc-direct-oven-card", mi);
class gi extends J {
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
v("hc-direct-coffee-card", gi);
class fi extends J {
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
    const e = this.getState("hood_level_entity"), t = this.getState("fan_entity"), i = this.getState("working_light_entity"), s = this.getState("ambient_light_entity"), o = !L(e) || !!e && q(e) || !!e && this._busyIds.has(e.entity_id), r = e?.attributes.options || [];
    return _`
      <div class="hood-panel">
        <span class="section-label">${d(this.hass, "field.fan_entity", "Fan")}</span>
        ${e ? _`
          <div class="hood-level">${y(this.hass, e)}</div>
          <div class="stage-buttons">${r.map((l) => _`
            <button type="button" class="stage ${l === e.state ? "selected" : ""}" aria-pressed=${String(l === e.state)}
              aria-label=${y(this.hass, { ...e, state: l })} ?disabled=${o}
              @click=${() => {
      this.withBusy(e, () => qe(this.hass, e, l));
    }}>
              ${/^fanstage0*\d+$/i.test(l) ? Number(l.match(/\d+$/)[0]) : y(this.hass, { ...e, state: l })}
            </button>`)}</div>
        ` : t ? _`<hcd-entity-control .hass=${this.hass} .entity=${t} kind="fan" .label=${d(this.hass, "field.fan_entity", "Fan")}></hcd-entity-control>` : h}
      </div>
      ${[["working_light_entity", i], ["ambient_light_entity", s]].map(([l, a]) => a && typeof a != "string" ? _`
        <div class="inline-control"><hcd-entity-control .hass=${this.hass} .entity=${a} kind="light" .busy=${this._busyIds.has(a.entity_id)}
          .label=${P(this.hass, z.fields.find((c) => c.key === l))}></hcd-entity-control></div>` : h)}
      <div class="section-grid">${["grease_filter_entity", "carbon_filter_entity"].map((l) => {
      const a = this.getState(l);
      return a ? _`<hcd-entity-control .hass=${this.hass} .entity=${a} kind="status" .label=${P(this.hass, z.fields.find((c) => c.key === l))}></hcd-entity-control>` : h;
    })}</div>
    `;
  }
}
v(z.cardType.replace("custom:", ""), fi);
function yi(n) {
  return f(n) && ["residuelheat", "residualheat"].includes(k(n));
}
function bi(n, e) {
  return [n, e].some((t) => f(t) && ["active", "run", "pause", "actionrequired"].includes(k(t)));
}
const vi = [
  { side: "left", zones: ["200", "100"] },
  { side: "right", zones: ["300", "400"] }
];
function wi(n, e) {
  return f(e) && /(?:^|cookinghobprogram)powermovemode$/.test(k(e)) ? "move" : f(n) && k(n) === "joinmode" ? "join" : "";
}
class ki extends J {
  constructor() {
    super(...arguments), this.definition = R;
  }
  static getConfigElement() {
    return document.createElement(R.editorTag);
  }
  static getStubConfig() {
    return {};
  }
  primaryFieldKeys() {
    return ["bridge_mode_entity", "hob_mode_entity"];
  }
  renderPrimary() {
    if (!this.hass) return h;
    const e = (l) => ["state", "operation", "power", "remaining"].some((a) => !!this.getState("zone_" + l + "_" + a + "_entity")), t = this.getState("bridge_mode_entity"), i = this.getState("hob_mode_entity"), s = wi(t, i), o = i?.attributes.options?.filter((l) => /(?:[._])(?:powerlevelmode|powermovemode|fryingsensormode)$/i.test(l)) || [], r = i && { ...i, attributes: { ...i.attributes, options: o } };
    return _`
    <div class="section-grid">
      ${t ? _`<hcd-entity-control .hass=${this.hass} .entity=${t} kind="select" .label=${d(this.hass, "field.bridge_mode_entity", "Join / split zones")} .busy=${this._busyIds.has(t.entity_id)}></hcd-entity-control>` : h}
      ${r && o.length ? _`<hcd-entity-control .hass=${this.hass} .entity=${r} kind="select" .label=${d(this.hass, "field.hob_mode_entity", "Power mode")} .busy=${this._busyIds.has(r.entity_id)}></hcd-entity-control>` : h}
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
      const c = (Ke) => this.getState("zone_" + a + "_" + Ke + "_entity"), u = c("state"), p = c("operation"), g = c("power"), b = c("remaining"), m = c("frying"), x = yi(u), Ve = bi(u, p), fe = u || g || p || b;
      return _`<button type="button" data-zone=${a} class="zone ${x ? "hot" : Ve ? "active" : ""}" @click=${() => fe && ge(this, fe.entity_id)}
        aria-label=${"Zone " + a + ": " + y(this.hass, u || p)}>
        <span class="zone-title">Zone ${a}<span>${y(this.hass, p || u)}</span></span>
        <span class="zone-power">${y(this.hass, g)}</span>
        ${x ? _`<span class="hot-label">${d(this.hass, "direct.residual_heat", "Residual heat")}</span>` : h}
        ${f(b) ? _`<span class="zone-meta">${d(this.hass, "field.remaining_time_entity", "Remaining time")}: ${y(this.hass, b)}</span>` : h}
        ${f(m) && m.state !== "off" ? _`<span class="zone-meta">${d(this.hass, "direct.frying", "Frying sensor")}: ${y(this.hass, m)}</span>` : h}
      </button>`;
    })}</div>`)}</div><p class="read-only-note">${d(this.hass, "direct.hob_readonly", "Zone values are read-only. Tap a zone for details.")}</p>`;
  }
}
v(R.cardType.replace("custom:", ""), ki);
const $i = {
  dishwasher: ["dishwasher", "dish care", "dishcare", "geschirrspuler", "spulmaschine"],
  oven: ["oven", "backofen", "herd"],
  coffee: ["coffee maker", "coffeemaker", "coffee machine", "kaffeemaschine", "kaffeevollautomat", "espresso"],
  hood: ["hood", "dunstabzug", "haube", "extractor"],
  hob: ["hob", "kochfeld", "cooktop"]
};
function Ie(n) {
  return n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function xi(n, e, t) {
  const i = n.states[e];
  if (!i) return !1;
  const s = Ie([
    e,
    i.attributes.friendly_name,
    i.attributes.device_class,
    i.attributes.icon
  ].filter(Boolean).join(" "));
  return $i[t].some((o) => s.includes(Ie(o)));
}
const Si = [N, I, D, z, R];
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
console.info(`%c HOME-CONNECT-DIRECT-CARDS %c v${je} `, "color:white;background:#445b78;font-weight:700", "color:#445b78;background:#eef2f7");
