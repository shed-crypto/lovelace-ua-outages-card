function t(t,e,o,s){var n,a=arguments.length,r=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,o):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,s);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(r=(a<3?n(r):a>3?n(e,o,r):n(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let a=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new a(o,t,s)},i=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:u,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,g=globalThis,f=g.trustedTypes,y=f?f.emptyScript:"",m=g.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},_=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){const{get:s,set:n}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);n?.call(this,e),this.requestUpdate(t,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(i(t))}else void 0!==t&&e.push(i(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(o)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=o.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(void 0!==s&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:v).toAttribute(e,o.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const o=this.constructor,s=o._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=o.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const a=n.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,o,s=!1,n){if(void 0!==t){const a=this.constructor;if(!1===s&&(n=this[t]),o??=a.getPropertyOptions(t),!((o.hasChanged??_)(n,e)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:s,wrapped:n},a){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,o,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[b("elementProperties")]=new Map,$[b("finalized")]=new Map,m?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=t=>t,E=x.trustedTypes,A=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+O,C=`<${T}>`,M=document,D=()=>M.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,N="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,z=/>/g,R=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,L=/"/g,K=/^(?:script|style|textarea|title)$/i,j=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),W=j(1),B=j(2),G=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Z=new WeakMap,q=M.createTreeWalker(M,129);function J(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Q=(t,e)=>{const o=t.length-1,s=[];let n,a=2===e?"<svg>":3===e?"<math>":"",r=P;for(let e=0;e<o;e++){const o=t[e];let i,l,d=-1,u=0;for(;u<o.length&&(r.lastIndex=u,l=r.exec(o),null!==l);)u=r.lastIndex,r===P?"!--"===l[1]?r=I:void 0!==l[1]?r=z:void 0!==l[2]?(K.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=R):void 0!==l[3]&&(r=R):r===R?">"===l[0]?(r=n??P,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,i=l[1],r=void 0===l[3]?R:'"'===l[3]?L:F):r===L||r===F?r=R:r===I||r===z?r=P:(r=R,n=void 0);const c=r===R&&t[e+1].startsWith("/>")?" ":"";a+=r===P?o+C:d>=0?(s.push(i),o.slice(0,d)+S+o.slice(d)+O+c):o+O+(-2===d?e:c)}return[J(t,a+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let n=0,a=0;const r=t.length-1,i=this.parts,[l,d]=Q(t,e);if(this.el=X.createElement(l,o),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&i.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[a++],o=s.getAttribute(t).split(O),r=/([.?@])?(.*)/.exec(e);i.push({type:1,index:n,name:r[2],strings:o,ctor:"."===r[1]?st:"?"===r[1]?nt:"@"===r[1]?at:ot}),s.removeAttribute(t)}else t.startsWith(O)&&(i.push({type:6,index:n}),s.removeAttribute(t));if(K.test(s.tagName)){const t=s.textContent.split(O),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let o=0;o<e;o++)s.append(t[o],D()),q.nextNode(),i.push({type:2,index:++n});s.append(t[e],D())}}}else if(8===s.nodeType)if(s.data===T)i.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(O,t+1));)i.push({type:7,index:n}),t+=O.length-1}n++}}static createElement(t,e){const o=M.createElement("template");return o.innerHTML=t,o}}function Y(t,e,o=t,s){if(e===G)return e;let n=void 0!==s?o._$Co?.[s]:o._$Cl;const a=U(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t),n._$AT(t,o,s)),void 0!==s?(o._$Co??=[])[s]=n:o._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);q.currentNode=s;let n=q.nextNode(),a=0,r=0,i=o[0];for(;void 0!==i;){if(a===i.index){let e;2===i.type?e=new et(n,n.nextSibling,this,t):1===i.type?e=new i.ctor(n,i.name,i.strings,this,t):6===i.type&&(e=new rt(n,this,t)),this._$AV.push(e),i=o[++r]}a!==i?.index&&(n=q.nextNode(),a++)}return q.currentNode=M,s}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),U(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=X.createElement(J(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new X(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const n of t)s===e.length?e.push(o=new et(this.O(D()),this.O(D()),this,this.options)):o=e[s],o._$AI(n),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=V}_$AI(t,e=this,o,s){const n=this.strings;let a=!1;if(void 0===n)t=Y(this,t,e,0),a=!U(t)||t!==this._$AH&&t!==G,a&&(this._$AH=t);else{const s=t;let r,i;for(t=n[0],r=0;r<n.length-1;r++)i=Y(this,s[o+r],e,r),i===G&&(i=this._$AH[r]),a||=!U(i)||i!==this._$AH[r],i===V?t=V:t!==V&&(t+=(i??"")+n[r+1]),this._$AH[r]=i}a&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class nt extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class at extends ot{constructor(t,e,o,s,n){super(t,e,o,s,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??V)===G)return;const o=this._$AH,s=t===V&&o!==V||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==V&&(o===V||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const it=x.litHtmlPolyfillSupport;it?.(X,et),(x.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class dt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const s=o?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=o?.renderBefore??null;s._$litPart$=n=new et(e.insertBefore(D(),t),t,void 0,o??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ut=lt.litElementPolyfillSupport;ut?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:_},pt=(t=ht,e,o)=>{const{kind:s,metadata:n}=o;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(o.name,t),"accessor"===s){const{name:s}=o;return{set(o){const n=e.get.call(this);e.set.call(this,o),this.requestUpdate(s,n,t,!0,o)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=o;return function(o){const n=this[s];e.call(this,o),this.requestUpdate(s,n,t,!0,o)}}throw Error("Unsupported decorator location: "+s)};function gt(t){return(e,o)=>"object"==typeof o?pt(t,e,o):((t,e,o)=>{const s=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),s?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function ft(t){return gt({...t,state:!0,attribute:!1})}const yt=[{role:"today",domain:"sensor",suffix:"_outages_today",translationKey:"outages_today"},{role:"tomorrow",domain:"sensor",suffix:"_outages_tomorrow",translationKey:"outages_tomorrow"},{role:"group",domain:"sensor",suffix:"_group",translationKey:"group"},{role:"nextOutage",domain:"sensor",suffix:"_next_outage",translationKey:"next_outage"},{role:"outageEnd",domain:"sensor",suffix:"_outage_end",translationKey:"outage_end"},{role:"scheduledOutage",domain:"binary_sensor",suffix:"_scheduled_outage",translationKey:"scheduled_outage"},{role:"addressStatus",domain:"sensor",suffix:"_address_status",translationKey:"address_status"},{role:"restoration",domain:"sensor",suffix:"_restoration",translationKey:"restoration"},{role:"groupsStatus",domain:"sensor",suffix:"_groups_status",translationKey:"groups_status"},{role:"connection",domain:"sensor",suffix:"_connection",translationKey:"connection"},{role:"scheduleUpdated",domain:"sensor",suffix:"_schedule_updated",translationKey:"schedule_updated"},{role:"lastUpdate",domain:"sensor",suffix:"_last_update",translationKey:"last_update"},{role:"calendar",domain:"calendar",suffix:"_outages",translationKey:"outages"}];function mt(t){const e=t.indexOf(".");if(e<0)return null;const o=t.slice(e+1),s=[...yt].sort((t,e)=>e.suffix.length-t.suffix.length);for(const t of s)if(o.endsWith(t.suffix))return o.slice(0,o.length-t.suffix.length);return null}function bt(t){const e=t.entity_id.split(".")[0];for(const o of yt)if(t.translation_key&&t.translation_key===o.translationKey&&e===o.domain)return o.role;for(const o of yt)if(e===o.domain&&t.entity_id.endsWith(o.suffix))return o.role;return null}function vt(t,e,o){const s=t.entities;if(!s)return;const n=s[e]?.device_id;if(n)for(const t of Object.values(s)){if(!t||t.device_id!==n)continue;const e=bt(t);e&&!o[e]&&(o[e]=t.entity_id)}}function _t(t,e,o){const s=mt(e);if(s)for(const e of yt){if(o[e.role])continue;const n=`${e.domain}.${s}${e.suffix}`;t.states[n]&&(o[e.role]=n)}}function wt(t,e){const o={calendar:e.calendar_entity||void 0,today:e.today_entity||void 0,tomorrow:e.tomorrow_entity||void 0,group:e.group_entity||void 0,lastUpdate:e.last_update_entity||void 0};return e.entity&&(e.entity.startsWith("calendar.")&&!o.calendar&&(o.calendar=e.entity),vt(t,e.entity,o),_t(t,e.entity,o)),o}function $t(t,e){const o=Object.values(t.states);if("calendar"===e){const t=o.find(t=>t&&t.entity_id.startsWith("calendar.")&&t.entity_id.endsWith("_outages"));if(t)return t.entity_id}const s=o.find(t=>t&&t.entity_id.startsWith("sensor.")&&t.entity_id.endsWith("_outages_today"));if(s)return s.entity_id;const n=o.find(t=>t&&t.entity_id.startsWith("sensor.")&&"string"==typeof t.attributes.schedule);return n?.entity_id}const xt={uk:{cardDefaultTitle:"Графік відключень",weeklyDefaultTitle:"Графік на тиждень",groupPrefix:"Черга",today:"Сьогодні",tomorrow:"Завтра",hoursShort:"год",minShort:"хв",hourUnit:"год",noEntity:"Оберіть сутність інтеграції ua_outages у налаштуваннях картки",noSchedule:"Дані графіка ще не завантажені",noTomorrow:"Графік на завтра ще не опубліковано",noWeeklyData:"Дані тижневого календаря відсутні",powerOn:"Світло є",powerOnNoOutages:"Світло є • Запланованих відключень немає",nextOutageAt:"Наступне о",possibleOutageAt:"Можливе о",outageUntil:"Відключення до",outageOngoing:"Відключення триває",inPrefix:"Через",remainingSuffix:"залишилось",durationLabel:"тривалість",expectedRestoration:"Відновлення ~",batteryLabel:"АКБ",hoursHeader:"Години",daysHeader:"Дні",todayTag:"сьогодні",nowTag:"зараз",slotOn:"Світло є",slotOff:"Світла немає",slotMaybe:"Можливе відключення",legOn:"Світло є",legOff:"Світла немає",legMaybe:"Можливе",legFirst:"Перші 30 хв",legSecond:"Другі 30 хв",connOk:"DTEK",connMirror:"Дзеркало",connOffline:"Офлайн",staleSuffix:"кеш",addressKinds:{emergency:"Аварійне відключення за адресою",planned:"Планові роботи за адресою",stabilization:"Стабілізаційне відключення",other:"Відключення за адресою"},weekdays:["Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота","Неділя"],editor:{entity:"Основна сутність (сенсор або календар)",title:"Заголовок картки (необов'язково)",style:"Стиль відображення",styleDtek:"Таблиця ДТЕК (00-01..23-24)",styleModern:"Сучасні плитки",theme:"Колірна тема",themeAuto:"Авто (тема Home Assistant)",themeDtekLight:"ДТЕК Світла",themeDtekDark:"ДТЕК Темна",layout:"Макет",layoutFull:"Повний",layoutCompact:"Компактний",layoutKiosk:"Кіоск (великий шрифт)",modernGrid:"Сітка плиток (сучасний стиль)",rowOrder:"Порядок днів",rowOrderMonSun:"Пн–Нд (тиждень)",rowOrderRolling:"Від сьогодні (7 днів)",language:"Мова картки",langAuto:"Авто (мова HA)",batteryEntity:"Сенсор заряду АКБ (необов'язково)",showHeader:"Показувати шапку",showCountdown:"Показувати живий таймер",showTomorrow:"Показувати завтрашній день",showIntervalsText:"Показувати текстові інтервали",showLegend:"Показувати легенду",advancedOverrides:"Ручне перевизначення сутностей",calendarEntity:"Сутність календаря (calendar.*_outages)",todayEntity:"Сенсор на сьогодні",tomorrowEntity:"Сенсор на завтра",groupEntity:"Сенсор черги",nextOutageEntity:"Сенсор наступного відключення",outageEndEntity:"Сенсор кінця відключень",scheduledOutageEntity:"Бінарний сенсор планового відключення",addressStatusEntity:"Сенсор статусу за адресою",restorationEntity:"Сенсор часу відновлення",connectionEntity:"Сенсор підключення"}},en:{cardDefaultTitle:"Outage Schedule",weeklyDefaultTitle:"Weekly Schedule",groupPrefix:"Group",today:"Today",tomorrow:"Tomorrow",hoursShort:"h",minShort:"min",hourUnit:"h",noEntity:"Select a ua_outages entity in card configuration",noSchedule:"Schedule data is not available yet",noTomorrow:"Tomorrow's schedule is not published yet",noWeeklyData:"Weekly calendar data is unavailable",powerOn:"Power is on",powerOnNoOutages:"Power is on • No scheduled outages",nextOutageAt:"Next at",possibleOutageAt:"Possible at",outageUntil:"Outage until",outageOngoing:"Outage active",inPrefix:"In",remainingSuffix:"remaining",durationLabel:"duration",expectedRestoration:"Restoration ~",batteryLabel:"Battery",hoursHeader:"Hours",daysHeader:"Day",todayTag:"today",nowTag:"now",slotOn:"Power on",slotOff:"Outage",slotMaybe:"Possible outage",legOn:"On",legOff:"Off",legMaybe:"Maybe",legFirst:"First 30m",legSecond:"Second 30m",connOk:"DTEK",connMirror:"Mirror",connOffline:"Offline",staleSuffix:"cached",addressKinds:{emergency:"Emergency address outage",planned:"Planned address works",stabilization:"Stabilization outage",other:"Address outage"},weekdays:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],editor:{entity:"Primary entity (sensor or calendar)",title:"Card title (optional)",style:"Visual style",styleDtek:"DTEK Table (00-01..23-24)",styleModern:"Modern tiles",theme:"Color theme",themeAuto:"Auto (Home Assistant theme)",themeDtekLight:"DTEK Light",themeDtekDark:"DTEK Dark",layout:"Layout",layoutFull:"Full",layoutCompact:"Compact",layoutKiosk:"Kiosk (large text)",modernGrid:"Tile grid (modern style)",rowOrder:"Weekday order",rowOrderMonSun:"Mon–Sun (calendar week)",rowOrderRolling:"From today (next 7 days)",language:"Card language",langAuto:"Auto (HA locale)",batteryEntity:"Battery SOC entity (optional)",showHeader:"Show header",showCountdown:"Show live countdown",showTomorrow:"Show tomorrow row",showIntervalsText:"Show interval summary text",showLegend:"Show legend",advancedOverrides:"Manual entity overrides",calendarEntity:"Calendar entity (calendar.*_outages)",todayEntity:"Today sensor",tomorrowEntity:"Tomorrow sensor",groupEntity:"Group sensor",nextOutageEntity:"Next outage sensor",outageEndEntity:"Outage end sensor",scheduledOutageEntity:"Scheduled outage binary sensor",addressStatusEntity:"Address status sensor",restorationEntity:"Restoration timestamp sensor",connectionEntity:"Connection sensor"}},ru:{cardDefaultTitle:"График отключений",weeklyDefaultTitle:"График на неделю",groupPrefix:"Очередь",today:"Сегодня",tomorrow:"Завтра",hoursShort:"ч",minShort:"мин",hourUnit:"ч",noEntity:"Выберите сущность интеграции ua_outages в настройках карточки",noSchedule:"Данные графика еще не загружены",noTomorrow:"График на завтра еще не опубликован",noWeeklyData:"Данные недельного календаря отсутствуют",powerOn:"Свет есть",powerOnNoOutages:"Свет есть • Запланированных отключений нет",nextOutageAt:"Следующее в",possibleOutageAt:"Возможное в",outageUntil:"Отключение до",outageOngoing:"Идет отключение",inPrefix:"Через",remainingSuffix:"осталось",durationLabel:"длительность",expectedRestoration:"Восстановление ~",batteryLabel:"АКБ",hoursHeader:"Часы",daysHeader:"День",todayTag:"сегодня",nowTag:"сейчас",slotOn:"Свет есть",slotOff:"Света нет",slotMaybe:"Возможное отключение",legOn:"Свет есть",legOff:"Света нет",legMaybe:"Возможно",legFirst:"Первые 30 мин",legSecond:"Вторые 30 мин",connOk:"DTEK",connMirror:"Зеркало",connOffline:"Офлайн",staleSuffix:"кэш",addressKinds:{emergency:"Аварийное отключение по адресу",planned:"Плановые работы по адресу",stabilization:"Стабилизационное отключение",other:"Отключение по адресу"},weekdays:["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],editor:{entity:"Основная сущность (сенсор или календарь)",title:"Заголовок карточки (необязательно)",style:"Стиль отображения",styleDtek:"Таблица ДТЭК (00-01..23-24)",styleModern:"Современные плитки",theme:"Цветовая тема",themeAuto:"Авто (тема Home Assistant)",themeDtekLight:"ДТЭК Светлая",themeDtekDark:"ДТЭК Темная",layout:"Макет",layoutFull:"Полный",layoutCompact:"Компактный",layoutKiosk:"Киоск (крупный шрифт)",modernGrid:"Сетка плиток (современный стиль)",rowOrder:"Порядок дней",rowOrderMonSun:"Пн–Вс (неделя)",rowOrderRolling:"От сегодня (7 дней)",language:"Язык карточки",langAuto:"Авто (язык HA)",batteryEntity:"Сенсор заряда АКБ (необязательно)",showHeader:"Показывать шапку",showCountdown:"Показывать живой таймер",showTomorrow:"Показывать завтрашний день",showIntervalsText:"Показывать текстовые интервалы",showLegend:"Показывать легенду",advancedOverrides:"Ручное переопределение сущностей",calendarEntity:"Сущность календаря (calendar.*_outages)",todayEntity:"Сенсор на сегодня",tomorrowEntity:"Сенсор на завтра",groupEntity:"Сенсор очереди",nextOutageEntity:"Сенсор следующего отключения",outageEndEntity:"Сенсор конца отключений",scheduledOutageEntity:"Бинарный сенсор планового отключения",addressStatusEntity:"Сенсор статуса по адресу",restorationEntity:"Сенсор времени восстановления",connectionEntity:"Сенсор подключения"}}};function kt(t,e){if("uk"===t||"en"===t||"ru"===t)return t;const o=(e??"uk").toLowerCase();return o.startsWith("uk")?"uk":o.startsWith("ru")?"ru":(o.startsWith("en"),"en")}function Et(t){return xt[t]}function At(t,e){const o=Math.max(0,Math.round(t)),s=xt[e],n=Math.floor(o/60),a=o%60;return 0===n?`${a} ${s.minShort}`:0===a?`${n} ${s.hoursShort}`:`${n} ${s.hoursShort} ${String(a).padStart(2,"0")} ${s.minShort}`}function St(t,e){const o=xt[e];return"0"===t?o.slotOff:"?"===t?o.slotMaybe:o.slotOn}function Ot(t){const e=t.size??13,o=t.accent?"var(--ua-bolt-warn, var(--warning-color, #eab308))":"var(--ua-bolt-color, var(--primary-text-color))",s=t.faded?"0.45":"0.92";return B`
    <svg
      width="${e}"
      height="${e}"
      viewBox="0 0 24 24"
      fill="none"
      style="opacity: ${s}; display: block;"
      aria-hidden="true"
    >
      <path d="M13 2L5 14h6l-1 8 8-12h-6l1-8z" fill="${o}" />
      <path
        d="M3 3l18 18"
        stroke="${"var(--ua-bolt-color, var(--primary-text-color))"}"
        stroke-width="2.5"
        stroke-linecap="round"
      />
    </svg>
  `}function Tt(t){return String(t).padStart(2,"0")}function Ct(t,e){return"dtek_light"===t||"dtek_dark"===t?t:"auto"!==t&&t?e?"dtek_dark":"dtek_light":"auto"}function Mt(t,e){return"0"===t?"var(--ua-off-bg)":"?"===t?"var(--ua-maybe-bg)":e?"var(--ua-today-on-bg)":"var(--ua-bg)"}function Dt(t){const e=Array.from({length:24},(t,e)=>e);return W`
    <thead>
      <tr>
        <th class="dtek-corner">${t}</th>
        ${e.map(t=>W`
            <th class="dtek-vhead-cell">
              <span class="dtek-vhead">${Tt(t)}-${Tt(t+1)}</span>
            </th>
          `)}
      </tr>
    </thead>
  `}function Ut(t){const e=t.slots[2*t.hour]??"1",o=t.slots[2*t.hour+1]??"1",s=Boolean(t.highlightRow);let n="";return"0"===e&&"0"===o?n=Ot({size:12,accent:!1,faded:!1}):"?"===e&&"?"===o?n=Ot({size:12,accent:!1,faded:!0}):"1"===e&&"1"===o||(n=Ot({size:12,accent:!0,faded:!1})),W`
    <td>
      <button
        type="button"
        class="dtek-cell ${t.isNowHour?"is-now":""} ${t.compactRow?"compact-row":""}"
        aria-label="${Tt(t.hour)}:00-${Tt(t.hour+1)}:00"
        @mouseenter=${()=>t.onSelect?.(t.hour)}
        @click=${()=>t.onSelect?.(t.hour)}
      >
        <span class="dtek-cell-bg">
          <span style="background: ${Mt(e,s)}"></span>
          <span style="background: ${Mt(o,s)}"></span>
        </span>
        <span class="dtek-cell-icon">${n}</span>
      </button>
    </td>
  `}function Ht(t,e){return W`
    <div class="legend">
      <span class="legend-item">
        <span class="legend-swatch" style="background: var(--ua-bg)"></span>
        <span>${t.legOn}</span>
      </span>
      <span class="legend-item">
        <span class="legend-swatch" style="background: var(--ua-off-bg)">
          ${Ot({size:10})}
        </span>
        <span>${t.legOff}</span>
      </span>
      ${e?W`
              <span class="legend-item">
                <span class="legend-swatch" style="background: var(--ua-maybe-bg)">
                  ${Ot({size:10,faded:!0})}
                </span>
                <span>${t.legMaybe}</span>
              </span>
            `:""}
      <span class="legend-item">
        <span
          class="legend-swatch"
          style="background: linear-gradient(90deg, var(--ua-off-bg) 50%, var(--ua-bg) 50%)"
        >
          ${Ot({size:10,accent:!0})}
        </span>
        <span>${t.legFirst}</span>
      </span>
      <span class="legend-item">
        <span
          class="legend-swatch"
          style="background: linear-gradient(90deg, var(--ua-bg) 50%, var(--ua-off-bg) 50%)"
        >
          ${Ot({size:10,accent:!0})}
        </span>
        <span>${t.legSecond}</span>
      </span>
    </div>
  `}function Nt(t){const e=t.slots[2*t.hour]??"1",o=t.slots[2*t.hour+1]??"1",s=e===o?St(e,t.lang):`:00 ${St(e,t.lang)} / :30 ${St(o,t.lang)}`,n=t.prefix?`${t.prefix} • `:"",a=t.tag?` (${t.tag})`:"";return`${n}${Tt(t.hour)}:00–${Tt(t.hour+1)}:00${a} • ${s}`}const Pt=48,It="Europe/Kyiv",zt=new Map,Rt=new Map,Ft=new Map;function Lt(t){let e=Ft.get(t);return e||(e=new Intl.DateTimeFormat("en-CA",{timeZone:t,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}),Ft.set(t,e)),e}function Kt(t,e=It){const o=function(t){let e=zt.get(t);return e||(e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",weekday:"short"}),zt.set(t,e)),e}(e).formatToParts(t),s={};for(const t of o)"literal"!==t.type&&(s[t.type]=t.value);const n=Number(s.hour??"0"),a=Number(s.minute??"0"),r=Math.min(47,Math.max(0,2*n+(a>=30?1:0)));return{dateIso:`${s.year}-${s.month}-${s.day}`,slotIndex:r,weekdayIndex:{Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6}[s.weekday??"Mon"]??0}}function jt(t,e){const[o,s,n]=t.split("-").map(Number),a=new Date(Date.UTC(o,s-1,n+e));return`${a.getUTCFullYear()}-${String(a.getUTCMonth()+1).padStart(2,"0")}-${String(a.getUTCDate()).padStart(2,"0")}`}function Wt(t){const e=t.split("-");return 3!==e.length?t:`${e[2]}.${e[1]}`}function Bt(t,e=It){return function(t){let e=Rt.get(t);return e||(e=new Intl.DateTimeFormat("uk-UA",{timeZone:t,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}),Rt.set(t,e)),e}(e).format(t)}function Gt(t,e){const o=Kt(t,"UTC"),s=Kt(t,e),n=Lt("UTC").formatToParts(t),a=Lt(e).formatToParts(t),r=t=>{const e={};for(const o of t)"literal"!==o.type&&(e[o.type]=o.value);return 60*Number(e.hour??"0")+Number(e.minute??"0")},[i,l,d]=o.dateIso.split("-").map(Number),[u,c,h]=s.dateIso.split("-").map(Number);return Math.round((Date.UTC(u,c-1,h)-Date.UTC(i,l-1,d))/6e4)+r(a)-r(n)}function Vt(t,e,o){const[s,n,a]=t.split("-").map(Number),r=Math.floor(e/2),i=e%2*30,l=new Date(Date.UTC(s,n-1,a,r,i,0)),d=Gt(l,o),u=new Date(l.getTime()-6e4*d),c=Gt(u,o),h=c!==d?new Date(l.getTime()-6e4*c):u,p=new Date(h.getTime()+18e5);return{start:h,end:p}}function Zt(t){const e=30*t;return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}function qt(t,e,o=It){if(!t||"unavailable"===t.state||"unknown"===t.state)return{dateIso:e,published:!1,slots:null,outageHours:0,possibleHours:0,outagesText:"",dataStatus:"stale"};const s=t.attributes,n="string"==typeof s.date&&s.date?s.date:e,a=function(t){if("string"!=typeof t)return null;const e=t.trim();if(e.length!==Pt)return null;const o=[];for(let t=0;t<Pt;t++){const s=e[t];if("1"!==s&&"0"!==s&&"?"!==s)return null;o.push(s)}return o}(s.schedule),r=a??(Array.isArray(s.outages)?function(t,e,o=It){if(!Array.isArray(t))return null;const s=[];for(const e of t){if(!e||"object"!=typeof e)continue;const t=e;if("string"!=typeof t.start||"string"!=typeof t.end)continue;const o=Date.parse(t.start),n=Date.parse(t.end);if(Number.isNaN(o)||Number.isNaN(n)||n<=o)continue;const a="possible"===t.kind?"?":"0";s.push({startMs:o,endMs:n,kind:a})}const n=new Array(Pt).fill("1");for(let t=0;t<Pt;t++){const a=Vt(e,t,o),r=(a.start.getTime()+a.end.getTime())/2;for(const e of s)r>=e.startMs&&r<e.endMs&&(n[t]="0"===e.kind||"1"===n[t]?e.kind:n[t])}return n}(s.outages,n,o):null),i="boolean"==typeof s.published?s.published:null!==r,l=r?function(t){let e=0,o=0;for(const s of t)"0"===s?e+=1:"?"===s&&(o+=1);return{outageHours:.5*e,possibleHours:.5*o}}(r):null,d=Number.parseFloat(t.state),u=l?l.outageHours:Number.isFinite(d)?d:0,c="string"==typeof s.outages_text&&s.outages_text?s.outages_text:r?function(t,e="0"){const o=[];let s=null;for(let n=0;n<=Pt;n++){const a=n<Pt&&t[n]===e;a&&null===s?s=n:a||null===s||(o.push(`${Zt(s)}-${Zt(n)}`),s=null)}return o.join(", ")}(r,"0"):"";return{dateIso:n,published:i&&null!==r,slots:i?r:null,outageHours:u,possibleHours:l?l.possibleHours:0,outagesText:c,dataStatus:"string"==typeof s.data_status?s.data_status:"fresh"}}function Jt(t){if(!t||"unavailable"===t.state||"unknown"===t.state)return null;const e=Date.parse(t.state);return Number.isNaN(e)?null:new Date(e)}function Qt(t){if("string"==typeof t){const e=Date.parse(t);return Number.isNaN(e)?null:e}const e=t.dateTime??t.date;if(!e)return null;const o=Date.parse(e);return Number.isNaN(o)?null:o}const Xt=r`
  :host {
    display: block;
    --ua-bg: var(--ha-card-background, var(--card-background-color, #ffffff));
    --ua-sub: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
    --ua-fg: var(--primary-text-color, #1f2937);
    --ua-muted: var(--secondary-text-color, #6b7280);
    --ua-border: var(--divider-color, rgba(127, 127, 127, 0.25));
    --ua-accent: var(--primary-color, #03a9f4);
    --ua-success: var(--success-color, #16a34a);
    --ua-warning: var(--warning-color, #eab308);
    --ua-error: var(--error-color, #dc2626);
    --ua-off-bg: color-mix(in srgb, var(--ua-error) 34%, var(--ua-bg));
    --ua-maybe-bg: color-mix(in srgb, var(--ua-warning) 20%, var(--ua-bg));
    --ua-on-bg: color-mix(in srgb, var(--ua-success) 20%, var(--ua-bg));
    --ua-today-row-bg: #ffd600;
    --ua-today-row-fg: #14171f;
    --ua-today-off-bg: color-mix(in srgb, #ffd600 72%, var(--ua-bg));
    --ua-today-maybe-bg: color-mix(in srgb, #ffd600 28%, var(--ua-bg));
    --ua-today-on-bg: color-mix(in srgb, #ffd600 10%, var(--ua-bg));
    --ua-bolt-color: var(--ua-fg);
    --ua-bolt-warn: #eab308;
    --ua-yellow-bg: #ffd600;
    --ua-yellow-fg: #14171f;
  }

  :host([data-theme="dtek_light"]) {
    --ua-bg: #ffffff;
    --ua-sub: #f3f4f6;
    --ua-fg: #14171f;
    --ua-muted: #4b5563;
    --ua-border: #d1d5db;
    --ua-accent: #d97706;
    --ua-off-bg: #d1d5db;
    --ua-maybe-bg: #eef0f4;
    --ua-on-bg: #ffffff;
    --ua-today-row-bg: #ffd600;
    --ua-today-row-fg: #14171f;
    --ua-today-off-bg: #ffd600;
    --ua-today-maybe-bg: #fff3b0;
    --ua-today-on-bg: #fffbeb;
    --ua-bolt-color: #1f2937;
    --ua-bolt-warn: #eab308;
  }

  :host([data-theme="dtek_dark"]) {
    --ua-bg: #181b22;
    --ua-sub: #222733;
    --ua-fg: #f3f4f6;
    --ua-muted: #9ca3af;
    --ua-border: #363c4a;
    --ua-accent: #ffd600;
    --ua-off-bg: #3b4252;
    --ua-maybe-bg: #262c38;
    --ua-on-bg: #181b22;
    --ua-today-row-bg: #ffd600;
    --ua-today-row-fg: #14171f;
    --ua-today-off-bg: #9a7b00;
    --ua-today-maybe-bg: #38321b;
    --ua-today-on-bg: #222018;
    --ua-bolt-color: #e5e7eb;
    --ua-bolt-warn: #facc15;
  }

  ha-card {
    background: var(--ua-bg);
    color: var(--ua-fg);
    border-color: var(--ua-border);
    padding: 14px;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 1.4;
  }

  :host([data-layout="kiosk"]) ha-card {
    padding: 18px;
    font-size: 15px;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    container-type: inline-size;
    container-name: ua-card;
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 6px 10px;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    flex: 1 1 180px;
  }

  .header-title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 8px;
    min-width: 0;
  }

  .header-right {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .title {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }

  :host([data-layout="kiosk"]) .title {
    font-size: 18px;
  }

  .badge-group {
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    flex-shrink: 0;
    background: var(--ua-sub);
    color: var(--ua-fg);
    border: 1px solid var(--ua-border);
  }

  .badge-group.dtek-pill {
    background: var(--ua-yellow-bg);
    color: var(--ua-yellow-fg);
    border-color: transparent;
  }

  .region {
    font-size: 12px;
    color: var(--ua-muted);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .conn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--ua-muted);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dot.ok {
    background: var(--ua-success);
  }
  .dot.mirror {
    background: var(--ua-warning);
  }
  .dot.offline {
    background: var(--ua-error);
  }

  .hero {
    border-radius: 10px;
    border: 1px solid var(--ua-border);
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .hero.tone-success {
    border-color: color-mix(in srgb, var(--ua-success) 52%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-success) 10%, var(--ua-bg));
  }

  .hero.tone-error {
    border-color: color-mix(in srgb, var(--ua-error) 55%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-error) 12%, var(--ua-bg));
  }

  .hero.tone-warning {
    border-color: color-mix(in srgb, var(--ua-warning) 60%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-warning) 13%, var(--ua-bg));
  }

  .hero-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }

  .hero-main {
    font-size: 14px;
    font-weight: 600;
  }

  :host([data-layout="kiosk"]) .hero-main {
    font-size: 17px;
  }

  .hero-sub {
    font-size: 12px;
    color: var(--ua-muted);
  }

  .battery-pill {
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid var(--ua-border);
    background: var(--ua-sub);
    font-size: 12px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .battery-pill.low {
    border-color: var(--ua-error);
    color: var(--ua-error);
  }

  .progress-track {
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: var(--ua-sub);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: var(--ua-error);
    transition: width 0.3s ease;
  }

  .alert-banner {
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--ua-warning) 62%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-warning) 14%, var(--ua-bg));
    padding: 8px 10px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .alert-title {
    font-weight: 600;
  }

  .readout-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 4px 10px;
    font-size: 12px;
  }

  .section-lbl {
    color: var(--ua-muted);
    font-weight: 600;
  }

  .hover-readout {
    font-family: var(--code-font-family, monospace);
    font-variant-numeric: tabular-nums;
    color: var(--ua-fg);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .table-scroll {
    overflow-x: auto;
  }

  .dtek-table {
    width: 100%;
    min-width: 420px;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
    border: 1px solid var(--ua-border);
    border-radius: 8px;
    overflow: hidden;
  }

  .dtek-table th,
  .dtek-table td {
    border-right: 1px solid var(--ua-border);
    border-bottom: 1px solid var(--ua-border);
    padding: 0;
    text-align: center;
    vertical-align: middle;
  }

  .dtek-table th:last-child,
  .dtek-table td:last-child {
    border-right: none;
  }

  .dtek-table tbody tr:last-child td {
    border-bottom: none;
  }

  .dtek-corner {
    width: 88px;
    background: var(--ua-sub);
    font-size: 12px;
    font-weight: 600;
    padding: 0 6px;
  }

  .dtek-vhead-cell {
    background: var(--ua-sub);
    padding: 3px 0;
  }

  .dtek-vhead {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    display: inline-block;
    font-size: 11px;
    line-height: 1;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .dtek-day-cell {
    background: var(--ua-sub);
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    padding: 0 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dtek-day-cell.today-highlight {
    background: var(--ua-today-row-bg);
    color: var(--ua-today-row-fg);
  }

  .dtek-table tr.is-today-row td {
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--ua-today-row-bg) 75%, transparent),
      inset 0 -1px 0 color-mix(in srgb, var(--ua-today-row-bg) 75%, transparent);
  }

  .dtek-cell {
    position: relative;
    height: 28px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    width: 100%;
    display: block;
  }

  .dtek-cell.compact-row {
    height: 24px;
  }

  :host([data-layout="kiosk"]) .dtek-cell {
    height: 34px;
  }

  .dtek-cell:hover {
    outline: 2px solid var(--ua-fg);
    outline-offset: -2px;
    z-index: 4;
  }

  .dtek-cell.is-now {
    outline: 2px solid var(--ua-accent);
    outline-offset: -2px;
    z-index: 5;
  }

  .dtek-cell-bg {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .dtek-cell-icon {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .dtek-empty-row {
    font-size: 12px;
    color: var(--ua-muted);
    text-align: left;
    padding: 6px 10px;
  }

  /* Modern 24-hour tiles */
  .grid-2x12 {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 4px;
  }

  .grid-1x24 {
    display: grid;
    grid-template-columns: repeat(24, minmax(0, 1fr));
    gap: 2px;
  }

  .hour-tile {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 28px;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid var(--ua-border);
    cursor: pointer;
    padding: 0;
    background: none;
  }

  .hour-tile.mini {
    height: 22px;
  }

  :host([data-layout="kiosk"]) .hour-tile {
    height: 34px;
  }

  .hour-tile:hover {
    border-color: var(--ua-fg);
    z-index: 4;
  }

  .hour-tile.is-now {
    border: 2px solid var(--ua-accent);
    z-index: 5;
  }

  .half-slot {
    height: 100%;
    position: relative;
  }

  .half-slot.split {
    border-right: 1px dashed color-mix(in srgb, var(--ua-fg) 35%, transparent);
  }

  .half-slot.now-half::after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: var(--ua-accent);
  }

  .slot-on {
    background: var(--ua-on-bg);
  }

  .slot-off {
    background: var(--ua-off-bg);
  }

  .slot-maybe {
    background-color: var(--ua-maybe-bg);
    background-image: repeating-linear-gradient(
      -45deg,
      color-mix(in srgb, var(--ua-warning) 36%, transparent),
      color-mix(in srgb, var(--ua-warning) 36%, transparent) 3px,
      transparent 3px,
      transparent 6px
    );
  }

  .hour-badge {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    font-size: 12px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--ua-fg);
    text-shadow: 0 0 4px color-mix(in srgb, var(--ua-bg) 88%, transparent);
  }

  .tmr-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .tmr-unpublished {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px dashed var(--ua-border);
    font-size: 12px;
    color: var(--ua-muted);
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--ua-border);
    font-size: 12px;
    color: var(--ua-muted);
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .legend-swatch {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    border: 1px solid var(--ua-border);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .empty-state {
    padding: 16px;
    text-align: center;
    color: var(--ua-muted);
    font-size: 13px;
  }
`;let Yt=class extends dt{constructor(){super(...arguments),this._now=new Date,this._hoverHour=null,this._timerId=null,this._onVisibility=()=>{"visible"===document.visibilityState&&(this._now=new Date)}}static{this.styles=Xt}static getStubConfig(t){return{type:"custom:ua-outages-card",entity:(t?$t(t,"sensor"):void 0)??"sensor.ua_outages_outages_today",style:"dtek",theme:"auto",layout:"full"}}static getConfigElement(){return document.createElement("ua-outages-card-editor")}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={style:"dtek",theme:"auto",layout:"full",modern_grid:"2x12",language:"auto",show_header:!0,show_countdown:!0,show_tomorrow:!0,show_intervals_text:!0,show_legend:!0,...t},this._hoverHour=null}getCardSize(){return"compact"===this._config?.layout?2:4}getGridOptions(){return{columns:12,min_columns:6,rows:"auto",min_rows:"compact"===this._config?.layout?2:3}}connectedCallback(){super.connectedCallback(),this._now=new Date,this._timerId=window.setInterval(()=>{"visible"===document.visibilityState&&(this._now=new Date)},3e4),document.addEventListener("visibilitychange",this._onVisibility)}disconnectedCallback(){null!==this._timerId&&(window.clearInterval(this._timerId),this._timerId=null),document.removeEventListener("visibilitychange",this._onVisibility),super.disconnectedCallback()}_syncHostAttributes(t,e){this.setAttribute("data-theme",t),this.setAttribute("data-layout",e)}_renderBatteryPill(t){const e=this._config?.battery_soc_entity?.trim();if(!e||!this.hass)return V;const o=this.hass.states[e];if(!o)return V;const s=Number.parseFloat(o.state);if(!Number.isFinite(s))return V;const n=Math.max(0,Math.min(100,Math.round(s)));return W`
      <span class="battery-pill ${n<=20?"low":""}"> ${t.batteryLabel} ${n}% </span>
    `}_renderHero(t){const{t:e,lang:o,timing:s,scheduledOutageEntity:n,today:a,timeZone:r,isCompact:i}=t,l="on"===n?.state||"0"===s.currentKind,d=!l&&"?"===s.currentKind;let u="tone-success",c=e.powerOnNoOutages,h="";if(l){u="tone-error",c=s.currentEnd?`${e.outageUntil} ${Bt(s.currentEnd,r)}`:e.outageOngoing;const t=[];null!==s.remainingMinutes&&t.push(`${At(s.remainingMinutes,o)} ${e.remainingSuffix}`),s.currentStart&&s.currentEnd&&t.push(`${Bt(s.currentStart,r)}–${Bt(s.currentEnd,r)}`),h=t.join(" • ")}else if(d)u="tone-warning",c=e.slotMaybe,s.nextOutageStart&&null!==s.nextOutageMinutesUntil&&(h=`${e.nextOutageAt} ${Bt(s.nextOutageStart,r)} (${e.inPrefix.toLowerCase()} ${At(s.nextOutageMinutesUntil,o)})`);else if(s.nextOutageStart){c=`${e.powerOn} • ${e.nextOutageAt} ${Bt(s.nextOutageStart,r)}`;const t=[];null!==s.nextOutageMinutesUntil&&t.push(`${e.inPrefix} ${At(s.nextOutageMinutesUntil,o)}`),null!==s.nextOutageDurationMinutes&&t.push(`${e.durationLabel} ${At(s.nextOutageDurationMinutes,o)}`),h=t.join(" • ")}else null===a.slots&&(u="tone-warning",c=e.noSchedule);const p=i?V:this._renderBatteryPill(e),g=l&&null!==s.progressPercent?W`
            <div class="progress-track">
              <div class="progress-fill" style="width: ${s.progressPercent}%"></div>
            </div>
          `:V;return W`
      <div class="hero ${u}">
        <div class="hero-top">
          <div class="hero-main">${c}</div>
          ${p}
        </div>
        ${h?W`<div class="hero-sub">${h}</div>`:V} ${g}
      </div>
    `}_renderAddressAlert(t,e,o,s){if(!e||"none"===e.state||"unavailable"===e.state||"unknown"===e.state)return V;const n=t.addressKinds[e.state]??t.addressKinds.other,a="string"==typeof e.attributes.reason?e.attributes.reason:"";let r="";if(o&&"unknown"!==o.state&&"unavailable"!==o.state){const e=Date.parse(o.state);Number.isNaN(e)||(r=`${t.expectedRestoration}${Bt(new Date(e),s)}`)}const i=[a,r].filter(Boolean);return W`
      <div class="alert-banner">
        <div class="alert-title">${n}</div>
        ${i.length>0?W`<div>${i.join(" • ")}</div>`:V}
      </div>
    `}_renderDtekTable(t){const{t:e,today:o,tomorrow:s,nowHour:n,showTomorrow:a}=t,r=Array.from({length:24},(t,e)=>e),i=t=>{this._hoverHour=t},l=o.slots,d=s.published?s.slots:null;return W`
      <div class="table-scroll" @mouseleave=${()=>this._hoverHour=null}>
        <table class="dtek-table">
          ${Dt(e.hoursHeader)}
          <tbody>
            <tr>
              <td class="dtek-day-cell">${e.today} ${Wt(o.dateIso)}</td>
              ${l?r.map(t=>Ut({slots:l,hour:t,isNowHour:t===n,onSelect:i})):W`<td class="dtek-empty-row" colspan="24">${e.noSchedule}</td>`}
            </tr>
            ${a?W`
                    <tr>
                      <td class="dtek-day-cell">
                        ${e.tomorrow} ${Wt(s.dateIso)}
                      </td>
                      ${d?r.map(t=>Ut({slots:d,hour:t,isNowHour:!1})):W`<td class="dtek-empty-row" colspan="24">${e.noTomorrow}</td>`}
                    </tr>
                  `:V}
          </tbody>
        </table>
      </div>
    `}_renderModernTileGrid(t){const e=Array.from({length:24},(t,e)=>e),o=t.nowSlot>=0?Math.floor(t.nowSlot/2):-1,s=t.nowSlot>=0?t.nowSlot%2:-1,n=t=>"0"===t?"slot-off":"?"===t?"slot-maybe":"slot-on";return W`
      <div
        class=${"1x24"===t.gridMode?"grid-1x24":"grid-2x12"}
        @mouseleave=${()=>{t.interactive&&(this._hoverHour=null)}}
      >
        ${e.map(e=>{const a=t.slots[2*e]??"1",r=t.slots[2*e+1]??"1",i=e===o,l="1x24"===t.gridMode?String(e):Tt(e);return W`
            <button
              type="button"
              class="hour-tile ${t.mini?"mini":""} ${i?"is-now":""}"
              aria-label="${Tt(e)}:00-${Tt(e+1)}:00"
              @mouseenter=${()=>{t.interactive&&(this._hoverHour=e)}}
              @click=${()=>{t.interactive&&(this._hoverHour=e)}}
            >
              <span
                class="half-slot ${n(a)} ${a!==r?"split":""} ${i&&0===s?"now-half":""}"
              ></span>
              <span
                class="half-slot ${n(r)} ${i&&1===s?"now-half":""}"
              ></span>
              <span class="hour-badge">${l}</span>
            </button>
          `})}
      </div>
    `}_renderConnection(t,e,o,s){const n=e.connection?this.hass?.states[e.connection]:void 0,a=e.scheduleUpdated?this.hass?.states[e.scheduleUpdated]:void 0;let r=n?.state;r&&"unknown"!==r&&"unavailable"!==r||(r="mirror"===o.dataStatus?"mirror":"stale"===o.dataStatus?"offline":"ok");const i="mirror"===r?"mirror":"offline"===r?"offline":"ok";let l="mirror"===r?t.connMirror:"offline"===r?t.connOffline:t.connOk;if(a&&"unknown"!==a.state&&"unavailable"!==a.state){const t=Date.parse(a.state);Number.isNaN(t)||(l=`${l} • ${Bt(new Date(t),s)}`)}return W`
      <div class="conn">
        <span class="dot ${i}"></span>
        <span>${l}</span>
      </div>
    `}render(){const t=this._config,e=this.hass,o=kt(t?.language,e?.locale?.language??e?.language),s=Et(o);if(!t||!e)return W`<ha-card><div class="empty-state">${s.noEntity}</div></ha-card>`;const n=t.style??"dtek",a=t.layout??"full",r=Ct(t.theme,Boolean(e.themes?.darkMode));this._syncHostAttributes(r,a);const i=function(t,e){const o={tomorrow:e.tomorrow_entity||void 0,group:e.group_entity||void 0,nextOutage:e.next_outage_entity||void 0,outageEnd:e.outage_end_entity||void 0,scheduledOutage:e.scheduled_outage_entity||void 0,addressStatus:e.address_status_entity||void 0,restoration:e.restoration_entity||void 0,groupsStatus:e.groups_status_entity||void 0,connection:e.connection_entity||void 0,scheduleUpdated:e.schedule_updated_entity||void 0,lastUpdate:e.last_update_entity||void 0};if(e.entity){const s=e.entity.split(".")[0];"sensor"!==s||e.entity.endsWith("_group")||(null===mt(e.entity)||e.entity.endsWith("_outages_today"))&&(o.today=e.entity),vt(t,e.entity,o),_t(t,e.entity,o),o.today||"sensor"!==s||(o.today=e.entity)}return o}(e,t),l=i.today;if(!l||!e.states[l])return W`<ha-card><div class="empty-state">${s.noEntity}</div></ha-card>`;const d=e.config?.time_zone||It,{dateIso:u,slotIndex:c}=Kt(this._now,d),h=jt(u,1),p=e.states[l],g=i.tomorrow?e.states[i.tomorrow]:void 0,f=i.group?e.states[i.group]:void 0,y=i.nextOutage?e.states[i.nextOutage]:void 0,m=i.outageEnd?e.states[i.outageEnd]:void 0,b=i.scheduledOutage?e.states[i.scheduledOutage]:void 0,v=i.addressStatus?e.states[i.addressStatus]:void 0,_=i.restoration?e.states[i.restoration]:void 0,w=qt(p,u,d),$=qt(g,h,d),x=function(t){const e=t.timeZone??It,o=t.now.getTime(),{dateIso:s,slotIndex:n}=Kt(t.now,e);let a="1";t.today.slots&&t.today.dateIso===s&&(a=t.today.slots[n]??"1");let r=null,i=Jt(t.outageEndEntity);if(t.outageEndEntity&&"string"==typeof t.outageEndEntity.attributes.start){const e=Date.parse(t.outageEndEntity.attributes.start);Number.isNaN(e)||(r=new Date(e))}if("0"===a&&t.today.slots&&(null===r||null===i)){let o=n;for(;o>0&&"0"===t.today.slots[o-1];)o-=1;let s=n+1;for(;s<Pt&&"0"===t.today.slots[s];)s+=1;if(null===r&&(r=Vt(t.today.dateIso,o,e).start),null===i){const o=jt(t.today.dateIso,1);if(s===Pt&&t.tomorrow.slots&&t.tomorrow.dateIso===o&&"0"===t.tomorrow.slots[0]){let s=0;for(;s<Pt&&"0"===t.tomorrow.slots[s];)s+=1;i=Vt(o,s-1,e).end}else i=Vt(t.today.dateIso,s-1,e).end}}let l=null,d=null;if(null!==i&&i.getTime()>o&&(l=Math.max(0,Math.ceil((i.getTime()-o)/6e4)),null!==r&&i.getTime()>r.getTime())){const t=i.getTime()-r.getTime(),e=Math.min(t,Math.max(0,o-r.getTime()));d=Math.round(e/t*100)}let u=Jt(t.nextOutageEntity),c="number"==typeof t.nextOutageEntity?.attributes.duration_minutes?t.nextOutageEntity.attributes.duration_minutes:null;if(null===u){const o=[t.today,t.tomorrow];t:for(let a=0;a<o.length;a++){const r=o[a];if(r.slots)for(let o=r.dateIso===s?n+1:0;o<Pt;o++)if("0"===r.slots[o]||"?"===r.slots[o]){u=Vt(r.dateIso,o,e).start;const s=r.slots[o];let n=1;for(;o+n<Pt&&r.slots[o+n]===s;)n+=1;if(0===a&&o+n===Pt&&t.tomorrow.slots&&t.tomorrow.dateIso===jt(r.dateIso,1)){let e=0;for(;e<Pt&&t.tomorrow.slots[e]===s;)n+=1,e+=1}c=30*n;break t}}}const h=null!==u&&u.getTime()>o?Math.max(0,Math.ceil((u.getTime()-o)/6e4)):null;return{currentKind:a,currentStart:r,currentEnd:i,remainingMinutes:l,progressPercent:d,nextOutageStart:u,nextOutageMinutesUntil:h,nextOutageDurationMinutes:c}}({today:w,tomorrow:$,now:this._now,nextOutageEntity:y,outageEndEntity:m,timeZone:d}),k="compact"===a,E=!1!==t.show_header,A=!1!==t.show_group_badge,S=!1!==t.show_countdown,O=!k&&!1!==t.show_tomorrow,T=!k&&!1!==t.show_intervals_text,C=!k&&!1!==t.show_legend,M=f&&"unknown"!==f.state&&"unavailable"!==f.state?f.state:null,D=t.title||function(t){const{friendlyName:e,fallbackTitle:o,groupVal:s,showGroupBadge:n}=t;if("string"!=typeof e||!e.trim())return o;let a=e.replace(/\s+(Outages today|Відключень сьогодні|Отключений сегодня)$/i,"").trim();if(s&&n){const t=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),e=new RegExp(`\\s*(?:[·•\\-|]\\s*|\\()(?:Черга|Group|Queue|Группа)\\s+${t}\\)?$`,"i");a=a.replace(e,"").trim()}return a||o}({friendlyName:p?.attributes.friendly_name,fallbackTitle:s.cardDefaultTitle,groupVal:M,showGroupBadge:A}),U="string"==typeof f?.attributes.region?f.attributes.region:"",H=Math.floor(c/2),N=this._hoverHour??H,P=w.slots?Nt({slots:w.slots,hour:N,lang:o,tag:N===H?s.nowTag:void 0}):"",I=w.outagesText?`${s.today}: ${w.outagesText} (${w.outageHours.toFixed(1)} ${s.hourUnit})`:`${s.today}: ${w.outageHours.toFixed(1)} ${s.hourUnit}`;return W`
      <ha-card>
        <div class="wrap">
          ${E?W`
                  <div class="header">
                    <div class="header-left">
                      <div class="header-title-row">
                        <span class="title">${D}</span>
                        ${A&&M?W`<span class="badge-group ${"dtek"===n||"dtek_light"===r||"dtek_dark"===r?"dtek-pill":""}"
                                >${s.groupPrefix} ${M}</span
                              >`:V}
                      </div>
                      ${U&&!k?W`<span class="region">${U}</span>`:V}
                    </div>
                    <div class="header-right">
                      ${this._renderConnection(s,i,w,d)}
                    </div>
                  </div>
                `:V}
          ${S?this._renderHero({t:s,lang:o,timing:x,scheduledOutageEntity:b,today:w,timeZone:d,isCompact:k}):V}
          ${k?V:this._renderAddressAlert(s,v,_,d)}

          <div class="readout-row">
            <span class="section-lbl">
              ${s.today} (${w.outageHours.toFixed(1)} ${s.hourUnit})
            </span>
            ${P?W`<span class="hover-readout">${P}</span>`:V}
          </div>

          ${"dtek"===n?this._renderDtekTable({t:s,today:w,tomorrow:$,nowHour:H,showTomorrow:O}):W`
                  ${w.slots?this._renderModernTileGrid({slots:w.slots,gridMode:t.modern_grid??"2x12",nowSlot:c,interactive:!0}):W`<div class="tmr-unpublished">${s.noSchedule}</div>`}
                  ${O?W`
                          <div class="tmr-box">
                            <div class="readout-row">
                              <span class="section-lbl">${s.tomorrow}</span>
                              <span class="section-lbl">
                                ${$.published?`${$.outageHours.toFixed(1)} ${s.hourUnit}`:"—"}
                              </span>
                            </div>
                            ${$.published&&$.slots?this._renderModernTileGrid({slots:$.slots,gridMode:t.modern_grid??"2x12",nowSlot:-1,mini:!0}):W`<div class="tmr-unpublished">${s.noTomorrow}</div>`}
                          </div>
                        `:V}
                `}
          ${T||C?W`
                  <div class="footer">
                    ${T?W`<span>${I}</span>`:W`<span></span>`}
                    ${C?"dtek"===n?Ht(s,!1):W`
                              <div class="legend">
                                <span class="legend-item">
                                  <span class="legend-swatch slot-on"></span>
                                  <span>${s.legOn}</span>
                                </span>
                                <span class="legend-item">
                                  <span class="legend-swatch slot-off"></span>
                                  <span>${s.legOff}</span>
                                </span>
                                <span class="legend-item">
                                  <span class="legend-swatch slot-maybe"></span>
                                  <span>${s.legMaybe}</span>
                                </span>
                              </div>
                            `:V}
                  </div>
                `:V}
        </div>
      </ha-card>
    `}};t([gt({attribute:!1})],Yt.prototype,"hass",void 0),t([ft()],Yt.prototype,"_config",void 0),t([ft()],Yt.prototype,"_now",void 0),t([ft()],Yt.prototype,"_hoverHour",void 0),Yt=t([ct("ua-outages-card")],Yt);let te=class extends dt{constructor(){super(...arguments),this._events=[],this._hoverCell=null,this._lastFetchKey="",this._lastFetchMs=0,this._fetching=!1}static{this.styles=Xt}static getStubConfig(t){return{type:"custom:ua-outages-weekly-card",entity:(t?$t(t,"calendar"):void 0)??"calendar.ua_outages_outages",theme:"auto",row_order:"mon_sun"}}static getConfigElement(){return document.createElement("ua-outages-weekly-card-editor")}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={theme:"auto",row_order:"mon_sun",language:"auto",show_legend:!0,...t},this._hoverCell=null,this._lastFetchKey=""}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6,rows:"auto",min_rows:4}}updated(){this._maybeFetchCalendar()}async _maybeFetchCalendar(){if(!this.hass||!this._config||this._fetching)return;const t=wt(this.hass,this._config),e=t.calendar;if(!e||!this.hass.states[e])return;const o=this.hass.config?.time_zone||It,{dateIso:s}=Kt(new Date,o),n=`${e}|${s}|${t.lastUpdate?this.hass.states[t.lastUpdate]?.state??"":""}`,a=Date.now();if(n===this._lastFetchKey&&a-this._lastFetchMs<3e5)return;this._fetching=!0;const r=`${jt(s,-1)}T00:00:00Z`,i=`${jt(s,8)}T23:59:59Z`,l=`calendars/${encodeURIComponent(e)}?start=${encodeURIComponent(r)}&end=${encodeURIComponent(i)}`;try{const t=await this.hass.callApi("GET",l);this._events=Array.isArray(t)?t:[],this._lastFetchKey=n,this._lastFetchMs=Date.now()}catch{}finally{this._fetching=!1}}render(){const t=this._config,e=this.hass,o=kt(t?.language,e?.locale?.language??e?.language),s=Et(o);if(!t||!e)return W`<ha-card><div class="empty-state">${s.noEntity}</div></ha-card>`;const n=Ct(t.theme,Boolean(e.themes?.darkMode));this.setAttribute("data-theme",n);const a=wt(e,t);if(!a.calendar&&!a.today)return W`<ha-card><div class="empty-state">${s.noEntity}</div></ha-card>`;const r=e.config?.time_zone||It,i=new Date,{dateIso:l,slotIndex:d}=Kt(i,r),u=jt(l,1),c=a.today?qt(e.states[a.today],l,r):void 0,h=a.tomorrow?qt(e.states[a.tomorrow],u,r):void 0,p=function(t){const e=t.timeZone??It,{dateIso:o,weekdayIndex:s}=Kt(t.todayDate,e),n=jt(o,1),a=new Map,r=t.events.map(t=>{const e=function(t){if(!t)return null;const e=t.toLowerCase();return e.includes("можлив")||e.includes("possible")||e.includes("возможн")?"?":e.includes("відключ")||e.includes("планов")||e.includes("аварій")||e.includes("outage")||e.includes("works")||e.includes("отключ")||e.includes("работ")?"0":null}(t.summary),o=Qt(t.start),s=Qt(t.end);return e&&null!==o&&null!==s&&s>o?{kind:e,startMs:o,endMs:s}:null}).filter(t=>null!==t);for(let s=0;s<7;s++){const n=jt(o,s);if(n===t.todaySchedule?.dateIso&&t.todaySchedule.published&&t.todaySchedule.slots){a.set(n,[...t.todaySchedule.slots]);continue}if(n===t.tomorrowSchedule?.dateIso&&t.tomorrowSchedule.published&&t.tomorrowSchedule.slots){a.set(n,[...t.tomorrowSchedule.slots]);continue}const i=new Array(Pt).fill("1");for(let t=0;t<Pt;t++){const o=Vt(n,t,e),s=(o.start.getTime()+o.end.getTime())/2;for(const e of r)s>=e.startMs&&s<e.endMs&&("0"!==e.kind&&"1"!==i[t]||(i[t]=e.kind))}a.set(n,i)}const i=[];for(let t=0;t<7;t++){const e=jt(o,t),r=(s+t)%7;i.push({weekdayIndex:r,dateIso:e,isToday:e===o||0===t&&e!==n,slots:a.get(e)??new Array(Pt).fill("1")})}return"mon_sun"===t.rowOrder?[...i].sort((t,e)=>t.weekdayIndex-e.weekdayIndex):i}({events:this._events,todayDate:i,todaySchedule:c,tomorrowSchedule:h,rowOrder:t.row_order??"mon_sun",timeZone:r}),g=a.group?e.states[a.group]:void 0,f=g&&"unknown"!==g.state&&"unavailable"!==g.state?g.state:null,y=Math.floor(d/2),m=Math.max(0,p.findIndex(t=>t.isToday)),b=this._hoverCell?.dayIdx??m,v=this._hoverCell?.hour??y,_=p[b],w=_?Nt({slots:_.slots,hour:v,lang:o,prefix:`${s.weekdays[_.weekdayIndex]} ${Wt(_.dateIso)}`,tag:_.isToday&&v===y?s.nowTag:void 0}):"",$=Array.from({length:24},(t,e)=>e);return W`
      <ha-card>
        <div class="wrap">
          <div class="header">
            <div class="header-left">
              <div class="header-title-row">
                <span class="title">${t.title||s.weeklyDefaultTitle}</span>
                ${f?W`<span class="badge-group dtek-pill">${s.groupPrefix} ${f}</span>`:V}
              </div>
            </div>
          </div>
          ${w?W`<div class="readout-row"><span class="hover-readout">${w}</span></div>`:V}

          <div class="table-scroll" @mouseleave=${()=>this._hoverCell=null}>
            <table class="dtek-table">
              ${Dt(s.daysHeader)}
              <tbody>
                ${p.map((t,e)=>W`
                    <tr class=${t.isToday?"is-today-row":""}>
                      <td class="dtek-day-cell ${t.isToday?"today-highlight":""}">
                        ${s.weekdays[t.weekdayIndex]}
                      </td>
                      ${$.map(o=>Ut({slots:t.slots,hour:o,isNowHour:t.isToday&&o===y,highlightRow:t.isToday,compactRow:!0,onSelect:t=>{this._hoverCell={dayIdx:e,hour:t}}}))}
                    </tr>
                  `)}
              </tbody>
            </table>
          </div>

          ${!1!==t.show_legend?W`<div class="footer">${Ht(s,!0)}</div>`:V}
        </div>
      </ha-card>
    `}};t([gt({attribute:!1})],te.prototype,"hass",void 0),t([ft()],te.prototype,"_config",void 0),t([ft()],te.prototype,"_events",void 0),t([ft()],te.prototype,"_hoverCell",void 0),te=t([ct("ua-outages-weekly-card")],te);const ee=r`
  :host {
    display: block;
    color: var(--primary-text-color, #1f2937);
    font-size: 13px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media (max-width: 500px) {
    .row-2 {
      grid-template-columns: 1fr;
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  label {
    font-size: 12px;
    font-weight: 600;
    color: var(--secondary-text-color, #6b7280);
  }

  input[type="text"],
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid var(--divider-color, #cbd5e1);
    background: var(--card-background-color, #ffffff);
    color: var(--primary-text-color, #1f2937);
    font: inherit;
  }

  .toggles {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 4px;
  }

  .toggle-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--primary-text-color, #1f2937);
    cursor: pointer;
  }

  details {
    border: 1px solid var(--divider-color, #cbd5e1);
    border-radius: 8px;
    padding: 8px 10px;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    color: var(--secondary-text-color, #6b7280);
  }

  details .form {
    margin-top: 10px;
  }
`;function oe(t,e){const o={};for(const[t,s]of Object.entries(e))void 0!==s&&""!==s&&(o[t]=s);t.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0}))}function se(t){const e=function(t,e){if(!t)return[];const o=[];for(const s of Object.values(t.states)){if(!s)continue;const t=s.entity_id.split(".")[0];if(!e.includes(t))continue;const n="string"==typeof s.attributes.friendly_name?s.attributes.friendly_name:"";o.push({id:s.entity_id,label:n?`${n} (${s.entity_id})`:s.entity_id})}return o.sort((t,e)=>t.id.localeCompare(e.id))}(t.hass,t.domains);return W`
    <div class="field">
      <label>${t.labelText}</label>
      <input
        type="text"
        list="${t.listId}"
        .value=${t.value}
        @change=${e=>{const o=e.target;t.onChange(o.value.trim()||void 0)}}
      />
      <datalist id="${t.listId}">
        ${e.map(t=>W`<option value="${t.id}">${t.label}</option>`)}
      </datalist>
    </div>
  `}function ne(t){return W`
    <label class="toggle-item">
      <input
        type="checkbox"
        .checked=${t.checked}
        @change=${e=>t.onChange(e.target.checked)}
      />
      <span>${t.labelText}</span>
    </label>
  `}let ae=class extends dt{constructor(){super(...arguments),this._config={type:"custom:ua-outages-card"}}static{this.styles=ee}setConfig(t){this._config={...t}}_update(t,e){const o={...this._config,[t]:e};this._config=o,oe(this,o)}_entityField(t,e,o,s){const n="string"==typeof this._config[e]?this._config[e]:"";return se({hass:this.hass,labelText:t,value:n,domains:o,listId:s,onChange:t=>this._update(e,t)})}render(){const t=Et(kt(this._config.language,this.hass?.locale?.language??this.hass?.language)).editor,e=this._config.style??"dtek";return W`
      <div class="form">
        ${this._entityField(t.entity,"entity",["sensor","calendar","binary_sensor"],"ua-primary-list")}
        <div class="field">
          <label>${t.title}</label>
          <input
            type="text"
            .value=${this._config.title??""}
            @change=${t=>{const e=t.target;this._update("title",e.value.trim()||void 0)}}
          />
        </div>

        <div class="row-2">
          <div class="field">
            <label>${t.style}</label>
            <select
              .value=${e}
              @change=${t=>this._update("style",t.target.value)}
            >
              <option value="dtek">${t.styleDtek}</option>
              <option value="modern">${t.styleModern}</option>
            </select>
          </div>

          <div class="field">
            <label>${t.theme}</label>
            <select
              .value=${this._config.theme??"auto"}
              @change=${t=>this._update("theme",t.target.value)}
            >
              <option value="auto">${t.themeAuto}</option>
              <option value="dtek_light">${t.themeDtekLight}</option>
              <option value="dtek_dark">${t.themeDtekDark}</option>
            </select>
          </div>
        </div>

        <div class="row-2">
          <div class="field">
            <label>${t.layout}</label>
            <select
              .value=${this._config.layout??"full"}
              @change=${t=>this._update("layout",t.target.value)}
            >
              <option value="full">${t.layoutFull}</option>
              <option value="compact">${t.layoutCompact}</option>
              <option value="kiosk">${t.layoutKiosk}</option>
            </select>
          </div>

          <div class="field">
            <label>${t.language}</label>
            <select
              .value=${this._config.language??"auto"}
              @change=${t=>this._update("language",t.target.value)}
            >
              <option value="auto">${t.langAuto}</option>
              <option value="uk">Українська</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        </div>

        ${"modern"===e?W`
                <div class="field">
                  <label>${t.modernGrid}</label>
                  <select
                    .value=${this._config.modern_grid??"2x12"}
                    @change=${t=>this._update("modern_grid",t.target.value)}
                  >
                    <option value="2x12">2×12</option>
                    <option value="1x24">1×24</option>
                  </select>
                </div>
              `:V}
        ${this._entityField(t.batteryEntity,"battery_soc_entity",["sensor"],"ua-battery-list")}

        <div class="toggles">
          ${ne({labelText:t.showHeader,checked:!1!==this._config.show_header,onChange:t=>this._update("show_header",t)})}
          ${ne({labelText:t.showCountdown,checked:!1!==this._config.show_countdown,onChange:t=>this._update("show_countdown",t)})}
          ${ne({labelText:t.showTomorrow,checked:!1!==this._config.show_tomorrow,onChange:t=>this._update("show_tomorrow",t)})}
          ${ne({labelText:t.showIntervalsText,checked:!1!==this._config.show_intervals_text,onChange:t=>this._update("show_intervals_text",t)})}
          ${ne({labelText:t.showLegend,checked:!1!==this._config.show_legend,onChange:t=>this._update("show_legend",t)})}
        </div>

        <details>
          <summary>${t.advancedOverrides}</summary>
          <div class="form">
            ${this._entityField(t.tomorrowEntity,"tomorrow_entity",["sensor"],"ua-tmr-list")}
            ${this._entityField(t.groupEntity,"group_entity",["sensor"],"ua-grp-list")}
            ${this._entityField(t.nextOutageEntity,"next_outage_entity",["sensor"],"ua-nxt-list")}
            ${this._entityField(t.outageEndEntity,"outage_end_entity",["sensor"],"ua-end-list")}
            ${this._entityField(t.scheduledOutageEntity,"scheduled_outage_entity",["binary_sensor"],"ua-sched-list")}
            ${this._entityField(t.addressStatusEntity,"address_status_entity",["sensor"],"ua-addr-list")}
            ${this._entityField(t.restorationEntity,"restoration_entity",["sensor"],"ua-rest-list")}
            ${this._entityField(t.connectionEntity,"connection_entity",["sensor"],"ua-conn-list")}
          </div>
        </details>
      </div>
    `}};t([gt({attribute:!1})],ae.prototype,"hass",void 0),t([ft()],ae.prototype,"_config",void 0),ae=t([ct("ua-outages-card-editor")],ae);let re=class extends dt{constructor(){super(...arguments),this._config={type:"custom:ua-outages-weekly-card"}}static{this.styles=ee}setConfig(t){this._config={...t}}_update(t,e){const o={...this._config,[t]:e};this._config=o,oe(this,o)}_entityField(t,e,o,s){const n="string"==typeof this._config[e]?this._config[e]:"";return se({hass:this.hass,labelText:t,value:n,domains:o,listId:s,onChange:t=>this._update(e,t)})}render(){const t=Et(kt(this._config.language,this.hass?.locale?.language??this.hass?.language)).editor;return W`
      <div class="form">
        ${this._entityField(t.entity,"entity",["calendar","sensor"],"ua-weekly-primary")}

        <div class="field">
          <label>${t.title}</label>
          <input
            type="text"
            .value=${this._config.title??""}
            @change=${t=>this._update("title",t.target.value.trim()||void 0)}
          />
        </div>

        <div class="row-2">
          <div class="field">
            <label>${t.theme}</label>
            <select
              .value=${this._config.theme??"auto"}
              @change=${t=>this._update("theme",t.target.value)}
            >
              <option value="auto">${t.themeAuto}</option>
              <option value="dtek_light">${t.themeDtekLight}</option>
              <option value="dtek_dark">${t.themeDtekDark}</option>
            </select>
          </div>

          <div class="field">
            <label>${t.rowOrder}</label>
            <select
              .value=${this._config.row_order??"mon_sun"}
              @change=${t=>this._update("row_order",t.target.value)}
            >
              <option value="mon_sun">${t.rowOrderMonSun}</option>
              <option value="rolling">${t.rowOrderRolling}</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label>${t.language}</label>
          <select
            .value=${this._config.language??"auto"}
            @change=${t=>this._update("language",t.target.value)}
          >
            <option value="auto">${t.langAuto}</option>
            <option value="uk">Українська</option>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>

        ${ne({labelText:t.showLegend,checked:!1!==this._config.show_legend,onChange:t=>this._update("show_legend",t)})}

        <details>
          <summary>${t.advancedOverrides}</summary>
          <div class="form">
            ${this._entityField(t.calendarEntity,"calendar_entity",["calendar"],"ua-wcal-list")}
            ${this._entityField(t.todayEntity,"today_entity",["sensor"],"ua-wtoday-list")}
            ${this._entityField(t.tomorrowEntity,"tomorrow_entity",["sensor"],"ua-wtmr-list")}
            ${this._entityField(t.groupEntity,"group_entity",["sensor"],"ua-wgrp-list")}
          </div>
        </details>
      </div>
    `}};t([gt({attribute:!1})],re.prototype,"hass",void 0),t([ft()],re.prototype,"_config",void 0),re=t([ct("ua-outages-weekly-card-editor")],re);const ie=[{type:"ua-outages-card",name:"UA Outages Card",description:"Today and tomorrow Ukrainian power outage schedule card with DTEK table and modern tile styles.",preview:!0,documentationURL:"https://github.com/shed-crypto/lovelace-ua-outages-card"},{type:"ua-outages-weekly-card",name:"UA Outages Weekly Card",description:"7x24 weekly power outage schedule matrix in DTEK table style.",preview:!0,documentationURL:"https://github.com/shed-crypto/lovelace-ua-outages-card"}];window.customCards=window.customCards||[];for(const t of ie)window.customCards.some(e=>e.type===t.type)||window.customCards.push(t);console.info("UA-OUTAGES-CARD 0.1.0 loaded");
