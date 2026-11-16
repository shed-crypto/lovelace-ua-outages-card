function e(e,t,o,a){var s,n=arguments.length,i=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,o):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(i=(n<3?s(i):n>3?s(t,o,i):s(t,o))||i);return n>3&&i&&Object.defineProperty(t,o,i),i}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,o=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),s=new WeakMap;let n=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&s.set(t,e))}return e}toString(){return this.cssText}};const i=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[a+1],e[0]);return new n(o,e,a)},r=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:u,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,g=globalThis,y=g.trustedTypes,f=y?y.emptyScript:"",w=g.reactiveElementPolyfillSupport,m=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},v=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),a=this.getPropertyDescriptor(e,o,t);void 0!==a&&d(this.prototype,e,a)}}static getPropertyDescriptor(e,t,o){const{get:a,set:s}=u(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const n=a?.call(this);s?.call(this,t),this.requestUpdate(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...c(e),...h(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(o)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of a){const a=document.createElement("style"),s=t.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=o.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,o);if(void 0!==a&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:b).toAttribute(t,o.type);this._$Em=e,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const o=this.constructor,a=o._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=o.getPropertyOptions(a),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=a;const n=s.fromAttribute(t,e.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(e,t,o,a=!1,s){if(void 0!==e){const n=this.constructor;if(!1===a&&(s=this[e]),o??=n.getPropertyOptions(e),!((o.hasChanged??v)(s,t)||o.useDefault&&o.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:a,wrapped:s},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[m("elementProperties")]=new Map,x[m("finalized")]=new Map,w?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=e=>e,T=$.trustedTypes,S=T?T.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+A,O=`<${C}>`,M=document,D=()=>M.createComment(""),H=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,P="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,L=/>/g,z=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,F=/"/g,B=/^(?:script|style|textarea|title)$/i,W=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),K=W(1),V=W(2),j=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Z=new WeakMap,q=M.createTreeWalker(M,129);function X(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const o=e.length-1,a=[];let s,n=2===t?"<svg>":3===t?"<math>":"",i=I;for(let t=0;t<o;t++){const o=e[t];let r,l,d=-1,u=0;for(;u<o.length&&(i.lastIndex=u,l=i.exec(o),null!==l);)u=i.lastIndex,i===I?"!--"===l[1]?i=U:void 0!==l[1]?i=L:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),i=z):void 0!==l[3]&&(i=z):i===z?">"===l[0]?(i=s??I,d=-1):void 0===l[1]?d=-2:(d=i.lastIndex-l[2].length,r=l[1],i=void 0===l[3]?z:'"'===l[3]?F:R):i===F||i===R?i=z:i===U||i===L?i=I:(i=z,s=void 0);const c=i===z&&e[t+1].startsWith("/>")?" ":"";n+=i===I?o+O:d>=0?(a.push(r),o.slice(0,d)+E+o.slice(d)+A+c):o+A+(-2===d?t:c)}return[X(e,n+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class Q{constructor({strings:e,_$litType$:t},o){let a;this.parts=[];let s=0,n=0;const i=e.length-1,r=this.parts,[l,d]=J(e,t);if(this.el=Q.createElement(l,o),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=q.nextNode())&&r.length<i;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(E)){const t=d[n++],o=a.getAttribute(e).split(A),i=/([.?@])?(.*)/.exec(t);r.push({type:1,index:s,name:i[2],strings:o,ctor:"."===i[1]?ae:"?"===i[1]?se:"@"===i[1]?ne:oe}),a.removeAttribute(e)}else e.startsWith(A)&&(r.push({type:6,index:s}),a.removeAttribute(e));if(B.test(a.tagName)){const e=a.textContent.split(A),t=e.length-1;if(t>0){a.textContent=T?T.emptyScript:"";for(let o=0;o<t;o++)a.append(e[o],D()),q.nextNode(),r.push({type:2,index:++s});a.append(e[t],D())}}}else if(8===a.nodeType)if(a.data===C)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf(A,e+1));)r.push({type:7,index:s}),e+=A.length-1}s++}}static createElement(e,t){const o=M.createElement("template");return o.innerHTML=e,o}}function Y(e,t,o=e,a){if(t===j)return t;let s=void 0!==a?o._$Co?.[a]:o._$Cl;const n=H(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,o,a)),void 0!==a?(o._$Co??=[])[a]=s:o._$Cl=s),void 0!==s&&(t=Y(e,s._$AS(e,t.values),s,a)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,a=(e?.creationScope??M).importNode(t,!0);q.currentNode=a;let s=q.nextNode(),n=0,i=0,r=o[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new te(s,s.nextSibling,this,e):1===r.type?t=new r.ctor(s,r.name,r.strings,this,e):6===r.type&&(t=new ie(s,this,e)),this._$AV.push(t),r=o[++i]}n!==r?.index&&(s=q.nextNode(),n++)}return q.currentNode=M,a}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,a){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),H(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,a="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=Q.createElement(X(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new ee(a,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new Q(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,a=0;for(const s of e)a===t.length?t.push(o=new te(this.O(D()),this.O(D()),this,this.options)):o=t[a],o._$AI(s),a++;a<t.length&&(this._$AR(o&&o._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,a,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=G}_$AI(e,t=this,o,a){const s=this.strings;let n=!1;if(void 0===s)e=Y(this,e,t,0),n=!H(e)||e!==this._$AH&&e!==j,n&&(this._$AH=e);else{const a=e;let i,r;for(e=s[0],i=0;i<s.length-1;i++)r=Y(this,a[o+i],t,i),r===j&&(r=this._$AH[i]),n||=!H(r)||r!==this._$AH[i],r===G?e=G:e!==G&&(e+=(r??"")+s[i+1]),this._$AH[i]=r}n&&!a&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ae extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class se extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class ne extends oe{constructor(e,t,o,a,s){super(e,t,o,a,s),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??G)===j)return;const o=this._$AH,a=e===G&&o!==G||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==G&&(o===G||a);a&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ie{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const re=$.litHtmlPolyfillSupport;re?.(Q,te),($.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class de extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const a=o?.renderBefore??t;let s=a._$litPart$;if(void 0===s){const e=o?.renderBefore??null;a._$litPart$=s=new te(t.insertBefore(D(),e),e,void 0,o??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}de._$litElement$=!0,de.finalized=!0,le.litElementHydrateSupport?.({LitElement:de});const ue=le.litElementPolyfillSupport;ue?.({LitElement:de}),(le.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},pe=(e=he,t,o)=>{const{kind:a,metadata:s}=o;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),n.set(o.name,e),"accessor"===a){const{name:a}=o;return{set(o){const s=t.get.call(this);t.set.call(this,o),this.requestUpdate(a,s,e,!0,o)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=o;return function(o){const s=this[a];t.call(this,o),this.requestUpdate(a,s,e,!0,o)}}throw Error("Unsupported decorator location: "+a)};function ge(e){return(t,o)=>"object"==typeof o?pe(e,t,o):((e,t,o)=>{const a=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),a?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function ye(e){return ge({...e,state:!0,attribute:!1})}const fe=[{role:"today",domain:"sensor",suffix:"_outages_today",translationKey:"outages_today"},{role:"tomorrow",domain:"sensor",suffix:"_outages_tomorrow",translationKey:"outages_tomorrow"},{role:"group",domain:"sensor",suffix:"_group",translationKey:"group"},{role:"nextOutage",domain:"sensor",suffix:"_next_outage",translationKey:"next_outage"},{role:"outageEnd",domain:"sensor",suffix:"_outage_end",translationKey:"outage_end"},{role:"scheduledOutage",domain:"binary_sensor",suffix:"_scheduled_outage",translationKey:"scheduled_outage"},{role:"addressStatus",domain:"sensor",suffix:"_address_status",translationKey:"address_status"},{role:"restoration",domain:"sensor",suffix:"_restoration",translationKey:"restoration"},{role:"groupsStatus",domain:"sensor",suffix:"_groups_status",translationKey:"groups_status"},{role:"connection",domain:"sensor",suffix:"_connection",translationKey:"connection"},{role:"scheduleUpdated",domain:"sensor",suffix:"_schedule_updated",translationKey:"schedule_updated"},{role:"lastUpdate",domain:"sensor",suffix:"_last_update",translationKey:"last_update"},{role:"calendar",domain:"calendar",suffix:"_outages",translationKey:"outages"}];function we(e){const t=e.indexOf(".");if(t<0)return null;const o=e.slice(t+1),a=[...fe].sort((e,t)=>t.suffix.length-e.suffix.length);for(const e of a)if(o.endsWith(e.suffix))return o.slice(0,o.length-e.suffix.length);return null}function me(e){const t=e.entity_id.split(".")[0];for(const o of fe)if(e.translation_key&&e.translation_key===o.translationKey&&t===o.domain)return o.role;for(const o of fe)if(t===o.domain&&e.entity_id.endsWith(o.suffix))return o.role;return null}function be(e,t,o){const a=e.entities;if(!a)return;const s=a[t]?.device_id;if(s)for(const e of Object.values(a)){if(!e||e.device_id!==s)continue;const t=me(e);t&&!o[t]&&(o[t]=e.entity_id)}}function ve(e,t,o){const a=we(t);if(a)for(const t of fe){if(o[t.role])continue;const s=`${t.domain}.${a}${t.suffix}`;e.states[s]&&(o[t.role]=s)}}function _e(e,t){const o={calendar:t.calendar_entity||void 0,tomorrow:t.tomorrow_entity||void 0,group:t.group_entity||void 0,nextOutage:t.next_outage_entity||void 0,outageEnd:t.outage_end_entity||void 0,scheduledOutage:t.scheduled_outage_entity||void 0,addressStatus:t.address_status_entity||void 0,restoration:t.restoration_entity||void 0,groupsStatus:t.groups_status_entity||void 0,connection:t.connection_entity||void 0,scheduleUpdated:t.schedule_updated_entity||void 0,lastUpdate:t.last_update_entity||void 0};if(t.entity){const a=t.entity.split(".")[0];if("sensor"===a&&!t.entity.endsWith("_group")){(null===we(t.entity)||t.entity.endsWith("_outages_today"))&&(o.today=t.entity)}be(e,t.entity,o),ve(e,t.entity,o),o.today||"sensor"!==a||(o.today=t.entity)}return o}function xe(e,t){const o={calendar:t.calendar_entity||void 0,today:t.today_entity||void 0,tomorrow:t.tomorrow_entity||void 0,group:t.group_entity||void 0,connection:t.connection_entity||void 0,lastUpdate:t.last_update_entity||void 0};return t.entity&&(t.entity.startsWith("calendar.")&&!o.calendar&&(o.calendar=t.entity),be(e,t.entity,o),ve(e,t.entity,o)),o}function $e(e,t){const o=Object.values(e.states);if("calendar"===t){const e=o.find(e=>e&&e.entity_id.startsWith("calendar.")&&e.entity_id.endsWith("_outages"));if(e)return e.entity_id}const a=o.find(e=>e&&e.entity_id.startsWith("sensor.")&&e.entity_id.endsWith("_outages_today"));if(a)return a.entity_id;const s=o.find(e=>e&&e.entity_id.startsWith("sensor.")&&"string"==typeof e.attributes.schedule);return s?.entity_id}const ke={uk:{cardDefaultTitle:"Графік відключень",weeklyDefaultTitle:"Графік на тиждень",groupPrefix:"Черга",today:"Сьогодні",tomorrow:"Завтра",hoursShort:"год",minShort:"хв",hourUnit:"год",noEntity:"Оберіть сутність інтеграції ua_outages у налаштуваннях картки",noSchedule:"Дані графіка ще не завантажені",noTomorrow:"Графік на завтра ще не опубліковано",noWeeklyData:"Дані тижневого календаря відсутні",powerOn:"Світло є",powerOnNoOutages:"Світло є • Запланованих відключень немає",nextOutageAt:"Наступне відключення о",possibleOutageAt:"Можливе відключення о",outageUntil:"Відключення до",outageOngoing:"Відключення триває",inPrefix:"Через",remainingSuffix:"залишилось",durationLabel:"тривалість",expectedRestoration:"Відновлення ~",batteryLabel:"АКБ",hoursHeader:"Години",daysHeader:"Дні",todayTag:"сьогодні",nowTag:"зараз",viewToday:"Сьогодні",viewWeek:"Тиждень",noOutagesToday:"Відключень не заплановано",batteryEnough:"вистачить",batteryReserve:"запас",weeklyPlanDisabledNotice:"Тижневий план вимкнено оператором — показані опубліковані дні",dayUnscheduledLabel:"Очікується графік",collapsedDaysPrefix:"Без прогнозу",slotOn:"Світло є",slotOff:"Світла немає",slotMaybe:"Можливе відключення",legOn:"Світло є",legOff:"Світла немає",legMaybe:"Можливе",legFirst:"Перші 30 хв",legSecond:"Другі 30 хв",connOk:"DTEK",connMirror:"Дзеркало",connOffline:"Офлайн",staleSuffix:"кеш",addressKinds:{emergency:"Аварійне відключення за адресою",planned:"Планові роботи за адресою",stabilization:"Стабілізаційне відключення",other:"Відключення за адресою"},weekdays:["Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота","Неділя"],weekdaysShort:["Пн","Вт","Ср","Чт","Пт","Сб","Нд"],editor:{entity:"Основна сутність (сенсор або календар)",title:"Заголовок картки (необов'язково)",style:"Стиль відображення",styleDtek:"Таблиця ДТЕК (00-01..23-24)",styleModern:"Сучасні плитки",styleTimeline:"Суцільна шкала + зараз",theme:"Колірна тема",themeAuto:"Авто (тема Home Assistant)",themeDtekLight:"ДТЕК Світла",themeDtekDark:"ДТЕК Темна",themeKioskDark:"Кіоск Темна (зелений/червоний)",themeOledBlack:"OLED Чорна (максимальний контраст)",layout:"Макет",layoutFull:"Повний",layoutCompact:"Компактний",layoutKiosk:"Кіоск (великий шрифт)",viewMode:"Режими перегляду",viewModeDailyOnly:"Лише добовий графік",viewModeSwitchable:"Перемикач Сьогодні / Тиждень",viewModeBoth:"Сьогодні + Тиждень разом",defaultView:"Початкова вкладка",modernGrid:"Сітка плиток (сучасний стиль)",intervalDisplay:"Формат інтервалів",intervalAuto:"Авто (за стилем картки)",intervalChips:"Кольорові чіпи інтервалів",intervalText:"Текстовий рядок",intervalBoth:"Чіпи + текст",intervalNone:"Приховати",weeklyView:"Вид тижневого графіка",weeklyAuto:"Авто (адаптивно для телефону/ПК)",weeklyBars:"Суцільні смуги 7×24 + зараз",weeklyTable:"Таблиця ДТЕК 7×24",weeklyList:"Компактний список по днях",mobileWeeklyView:"На вузькому екрані (при Авто)",mobileWeeklyList:"Список з об'єднаними інтервалами",mobileWeeklyBars:"7 суцільних кольорових смуг",emptyDaysMode:"Порожні дні без прогнозу",emptyDaysCompact:"Згорнути порожні дні в один рядок",emptyDaysHide:"Приховати порожні дні",emptyDaysShowAll:"Показувати всі 7 днів",rowOrder:"Порядок днів",rowOrderMonSun:"Пн–Нд (тиждень)",rowOrderRolling:"Від сьогодні (7 днів)",language:"Мова картки",langAuto:"Авто (мова HA)",sectionBattery:"Акумулятор / Інвертор (опціонально)",batteryEntity:"Сенсор заряду АКБ (%)",batteryRuntimeEntity:"Сенсор запасу часу АКБ (хв/год)",batteryLowThreshold:"Поріг низького заряду (%)",sectionVisibility:"Елементи картки",showHeader:"Показувати шапку",showGroupBadge:"Показувати бейдж черги",showRegion:"Показувати назву регіону",showConnection:"Показувати статус підключення",showCountdown:"Показувати живий таймер",showNowLine:"Показувати жовту лінію «зараз»",showTomorrow:"Показувати завтрашній день",showIntervalsText:"Показувати інтервали відключень",showLegend:"Показувати легенду",advancedOverrides:"Ручне перевизначення сутностей",calendarEntity:"Сутність календаря (calendar.*_outages)",todayEntity:"Сенсор на сьогодні",tomorrowEntity:"Сенсор на завтра",groupEntity:"Сенсор черги",nextOutageEntity:"Сенсор наступного відключення",outageEndEntity:"Сенсор кінця відключень",scheduledOutageEntity:"Бінарний сенсор планового відключення",addressStatusEntity:"Сенсор статусу за адресою",restorationEntity:"Сенсор часу відновлення",connectionEntity:"Сенсор підключення"}},en:{cardDefaultTitle:"Outage Schedule",weeklyDefaultTitle:"Weekly Schedule",groupPrefix:"Group",today:"Today",tomorrow:"Tomorrow",hoursShort:"h",minShort:"min",hourUnit:"h",noEntity:"Select a ua_outages entity in card configuration",noSchedule:"Schedule data is not available yet",noTomorrow:"Tomorrow's schedule is not published yet",noWeeklyData:"Weekly calendar data is unavailable",powerOn:"Power is on",powerOnNoOutages:"Power is on • No scheduled outages",nextOutageAt:"Next outage at",possibleOutageAt:"Possible outage at",outageUntil:"Outage until",outageOngoing:"Outage active",inPrefix:"In",remainingSuffix:"remaining",durationLabel:"duration",expectedRestoration:"Restoration ~",batteryLabel:"Battery",hoursHeader:"Hours",daysHeader:"Day",todayTag:"today",nowTag:"now",viewToday:"Today",viewWeek:"Week",noOutagesToday:"No scheduled outages",batteryEnough:"sufficient",batteryReserve:"reserve",weeklyPlanDisabledNotice:"Weekly forecast disabled by operator — showing published days",dayUnscheduledLabel:"Awaiting schedule",collapsedDaysPrefix:"No forecast",slotOn:"Power on",slotOff:"Outage",slotMaybe:"Possible outage",legOn:"On",legOff:"Off",legMaybe:"Maybe",legFirst:"First 30m",legSecond:"Second 30m",connOk:"DTEK",connMirror:"Mirror",connOffline:"Offline",staleSuffix:"cached",addressKinds:{emergency:"Emergency address outage",planned:"Planned address works",stabilization:"Stabilization outage",other:"Address outage"},weekdays:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],weekdaysShort:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],editor:{entity:"Primary entity (sensor or calendar)",title:"Card title (optional)",style:"Visual style",styleDtek:"DTEK Table (00-01..23-24)",styleModern:"Modern tiles",styleTimeline:"Continuous Timeline + now line",theme:"Color theme",themeAuto:"Auto (Home Assistant theme)",themeDtekLight:"DTEK Light",themeDtekDark:"DTEK Dark",themeKioskDark:"Kiosk Dark (green/red)",themeOledBlack:"OLED Black (high contrast)",layout:"Layout",layoutFull:"Full",layoutCompact:"Compact",layoutKiosk:"Kiosk (large text)",viewMode:"Card views",viewModeDailyOnly:"Daily only",viewModeSwitchable:"Today / Week switcher",viewModeBoth:"Today + Week stacked",defaultView:"Initial tab",modernGrid:"Tile grid (modern style)",intervalDisplay:"Interval display",intervalAuto:"Auto (by style)",intervalChips:"Color interval chips",intervalText:"Summary text",intervalBoth:"Chips + text",intervalNone:"Hidden",weeklyView:"Weekly layout",weeklyAuto:"Auto (responsive desktop/mobile)",weeklyBars:"Continuous 7x24 bars + now",weeklyTable:"DTEK 7x24 table",weeklyList:"Compact day list",mobileWeeklyView:"Mobile layout (when Auto)",mobileWeeklyList:"Day list with merged intervals",mobileWeeklyBars:"7 continuous color bars",emptyDaysMode:"Empty unscheduled days",emptyDaysCompact:"Collapse empty days into one line",emptyDaysHide:"Hide unscheduled days",emptyDaysShowAll:"Always show all 7 days",rowOrder:"Weekday order",rowOrderMonSun:"Mon–Sun (calendar week)",rowOrderRolling:"From today (next 7 days)",language:"Card language",langAuto:"Auto (HA locale)",sectionBattery:"Battery / Inverter (optional)",batteryEntity:"Battery SOC entity (%)",batteryRuntimeEntity:"Battery runtime entity (min/h)",batteryLowThreshold:"Low battery threshold (%)",sectionVisibility:"Visible card elements",showHeader:"Show header",showGroupBadge:"Show group pill",showRegion:"Show region subtitle",showConnection:"Show connection status",showCountdown:"Show live countdown",showNowLine:"Show yellow 'now' cursor line",showTomorrow:"Show tomorrow row",showIntervalsText:"Show outage intervals",showLegend:"Show legend",advancedOverrides:"Manual entity overrides",calendarEntity:"Calendar entity (calendar.*_outages)",todayEntity:"Today sensor",tomorrowEntity:"Tomorrow sensor",groupEntity:"Group sensor",nextOutageEntity:"Next outage sensor",outageEndEntity:"Outage end sensor",scheduledOutageEntity:"Scheduled outage binary sensor",addressStatusEntity:"Address status sensor",restorationEntity:"Restoration timestamp sensor",connectionEntity:"Connection sensor"}},ru:{cardDefaultTitle:"График отключений",weeklyDefaultTitle:"График на неделю",groupPrefix:"Очередь",today:"Сегодня",tomorrow:"Завтра",hoursShort:"ч",minShort:"мин",hourUnit:"ч",noEntity:"Выберите сущность интеграции ua_outages в настройках карточки",noSchedule:"Данные графика еще не загружены",noTomorrow:"График на завтра еще не опубликован",noWeeklyData:"Данные недельного календаря отсутствуют",powerOn:"Свет есть",powerOnNoOutages:"Свет есть • Запланированных отключений нет",nextOutageAt:"Следующее отключение в",possibleOutageAt:"Возможное отключение в",outageUntil:"Отключение до",outageOngoing:"Идет отключение",inPrefix:"Через",remainingSuffix:"осталось",durationLabel:"длительность",expectedRestoration:"Восстановление ~",batteryLabel:"АКБ",hoursHeader:"Часы",daysHeader:"День",todayTag:"сегодня",nowTag:"сейчас",viewToday:"Сегодня",viewWeek:"Неделя",noOutagesToday:"Отключений не запланировано",batteryEnough:"хватит",batteryReserve:"запас",weeklyPlanDisabledNotice:"Недельный план отключен оператором — показаны опубликованные дни",dayUnscheduledLabel:"Ожидается график",collapsedDaysPrefix:"Без прогноза",slotOn:"Свет есть",slotOff:"Света нет",slotMaybe:"Возможное отключение",legOn:"Свет есть",legOff:"Света нет",legMaybe:"Возможно",legFirst:"Первые 30 мин",legSecond:"Вторые 30 мин",connOk:"DTEK",connMirror:"Зеркало",connOffline:"Офлайн",staleSuffix:"кэш",addressKinds:{emergency:"Аварийное отключение по адресу",planned:"Плановые работы по адресу",stabilization:"Стабилизационное отключение",other:"Отключение по адресу"},weekdays:["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],weekdaysShort:["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],editor:{entity:"Основная сущность (сенсор или календарь)",title:"Заголовок карточки (необязательно)",style:"Стиль отображения",styleDtek:"Таблица ДТЭК (00-01..23-24)",styleModern:"Современные плитки",styleTimeline:"Сплошная шкала + сейчас",theme:"Цветовая тема",themeAuto:"Авто (тема Home Assistant)",themeDtekLight:"ДТЭК Светлая",themeDtekDark:"ДТЭК Темная",themeKioskDark:"Киоск Темная (зеленый/красный)",themeOledBlack:"OLED Черная (контраст)",layout:"Макет",layoutFull:"Полный",layoutCompact:"Компактный",layoutKiosk:"Киоск (крупный шрифт)",viewMode:"Режимы просмотра",viewModeDailyOnly:"Только суточный график",viewModeSwitchable:"Переключатель Сегодня / Неделя",viewModeBoth:"Сегодня + Неделя вместе",defaultView:"Начальная вкладка",modernGrid:"Сетка плиток (современный стиль)",intervalDisplay:"Формат интервалов",intervalAuto:"Авто (по стилю)",intervalChips:"Цветные чипы интервалов",intervalText:"Текстовая строка",intervalBoth:"Чипы + текст",intervalNone:"Скрыть",weeklyView:"Вид недельного графика",weeklyAuto:"Авто (адаптивно для телефона/ПК)",weeklyBars:"Сплошные полосы 7×24 + сейчас",weeklyTable:"Таблица ДТЭК 7×24",weeklyList:"Компактный список по дням",mobileWeeklyView:"На узком экране (при Авто)",mobileWeeklyList:"Список с объединенными интервалами",mobileWeeklyBars:"7 сплошных цветных полос",emptyDaysMode:"Пустые дни без прогноза",emptyDaysCompact:"Свернуть пустые дни в одну строку",emptyDaysHide:"Скрыть пустые дни",emptyDaysShowAll:"Показывать все 7 дней",rowOrder:"Порядок дней",rowOrderMonSun:"Пн–Вс (неделя)",rowOrderRolling:"От сегодня (7 дней)",language:"Язык карточки",langAuto:"Авто (язык HA)",sectionBattery:"Аккумулятор / Инвертор (необязательно)",batteryEntity:"Сенсор заряда АКБ (%)",batteryRuntimeEntity:"Сенсор запаса времени АКБ (мин/ч)",batteryLowThreshold:"Порог низкого заряда (%)",sectionVisibility:"Элементы карточки",showHeader:"Показывать шапку",showGroupBadge:"Показывать бейдж очереди",showRegion:"Показывать название региона",showConnection:"Показывать статус подключения",showCountdown:"Показывать живой таймер",showNowLine:"Показывать желтую линию «сейчас»",showTomorrow:"Показывать завтрашний день",showIntervalsText:"Показывать интервалы отключений",showLegend:"Показывать легенду",advancedOverrides:"Ручное переопределение сущностей",calendarEntity:"Сущность календаря (calendar.*_outages)",todayEntity:"Сенсор на сегодня",tomorrowEntity:"Сенсор на завтра",groupEntity:"Сенсор очереди",nextOutageEntity:"Сенсор следующего отключения",outageEndEntity:"Сенсор конца отключений",scheduledOutageEntity:"Бинарный сенсор планового отключения",addressStatusEntity:"Сенсор статуса по адресу",restorationEntity:"Сенсор времени восстановления",connectionEntity:"Сенсор подключения"}}};function Te(e,t){if("uk"===e||"en"===e||"ru"===e)return e;const o=(t??"uk").toLowerCase();return o.startsWith("uk")?"uk":o.startsWith("ru")?"ru":(o.startsWith("en"),"en")}function Se(e){return ke[e]}function Ee(e,t){const o=Math.max(0,Math.round(e)),a=ke[t],s=Math.floor(o/60),n=o%60;return 0===s?`${n} ${a.minShort}`:0===n?`${s} ${a.hoursShort}`:`${s} ${a.hoursShort} ${String(n).padStart(2,"0")} ${a.minShort}`}function Ae(e,t){const o=ke[t];return"0"===e?o.slotOff:"?"===e?o.slotMaybe:o.slotOn}function Ce(e){const t=e.size??13,o=e.accent?"var(--ua-bolt-warn, var(--warning-color, #eab308))":"var(--ua-bolt-color, var(--primary-text-color))",a=e.faded?"0.45":"0.92";return V`
    <svg
      width="${t}"
      height="${t}"
      viewBox="0 0 24 24"
      fill="none"
      style="opacity: ${a}; display: block;"
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
  `}const Oe=48,Me="Europe/Kyiv",De=new Map,He=new Map,Ne=new Map;function Pe(e){let t=Ne.get(e);return t||(t=new Intl.DateTimeFormat("en-CA",{timeZone:e,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}),Ne.set(e,t)),t}function Ie(e,t=Me){const o=function(e){let t=De.get(e);return t||(t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",weekday:"short"}),De.set(e,t)),t}(t).formatToParts(e),a={};for(const e of o)"literal"!==e.type&&(a[e.type]=e.value);const s=Number(a.hour??"0"),n=Number(a.minute??"0"),i=Math.min(47,Math.max(0,2*s+(n>=30?1:0)));return{dateIso:`${a.year}-${a.month}-${a.day}`,slotIndex:i,weekdayIndex:{Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6}[a.weekday??"Mon"]??0}}function Ue(e,t=Me){const o=Pe(t).formatToParts(e),a={};for(const e of o)"literal"!==e.type&&(a[e.type]=e.value);const s=Math.min(23,Math.max(0,Number(a.hour??"0")||0)),n=Math.min(59,Math.max(0,Number(a.minute??"0")||0)),i=60*s+n;return{hour:s,minute:n,totalMinutes:i,percent:Number((i/1440*100).toFixed(2))}}function Le(e,t){const[o,a,s]=e.split("-").map(Number),n=new Date(Date.UTC(o,a-1,s+t));return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function ze(e){const t=e.split("-");return 3!==t.length?e:`${t[2]}.${t[1]}`}function Re(e,t=Me){return function(e){let t=He.get(e);return t||(t=new Intl.DateTimeFormat("uk-UA",{timeZone:e,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}),He.set(e,t)),t}(t).format(e)}function Fe(e,t){const o=Ie(e,"UTC"),a=Ie(e,t),s=Pe("UTC").formatToParts(e),n=Pe(t).formatToParts(e),i=e=>{const t={};for(const o of e)"literal"!==o.type&&(t[o.type]=o.value);return 60*Number(t.hour??"0")+Number(t.minute??"0")},[r,l,d]=o.dateIso.split("-").map(Number),[u,c,h]=a.dateIso.split("-").map(Number);return Math.round((Date.UTC(u,c-1,h)-Date.UTC(r,l-1,d))/6e4)+i(n)-i(s)}function Be(e,t,o){const[a,s,n]=e.split("-").map(Number),i=Math.floor(t/2),r=t%2*30,l=new Date(Date.UTC(a,s-1,n,i,r,0)),d=Fe(l,o),u=new Date(l.getTime()-6e4*d),c=Fe(u,o),h=c!==d?new Date(l.getTime()-6e4*c):u,p=new Date(h.getTime()+18e5);return{start:h,end:p}}function We(e){let t=0,o=0;for(const a of e)"0"===a?t+=1:"?"===a&&(o+=1);return{outageHours:.5*t,possibleHours:.5*o}}function Ke(e){const t=30*e;return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}function Ve(e,t="0"){const o=[];let a=null;for(let s=0;s<=Oe;s++){const n=s<Oe&&e[s]===t;n&&null===a?a=s:n||null===a||(o.push({startSlot:a,endSlot:s,startLabel:Ke(a),endLabel:Ke(s),durationMinutes:30*(s-a),kind:t}),a=null)}return o}function je(e){const{hass:t,socEntityId:o,runtimeEntityId:a,lowThreshold:s,nextOutageDurationMinutes:n}=e;if(!t)return null;let i=null;const r=o?.trim();if(r&&t.states[r]){const e=Number.parseFloat(t.states[r]?.state??"");Number.isFinite(e)&&(i=Math.max(0,Math.min(100,Math.round(e))))}const l=a?.trim(),d=l?function(e){if(!e||"unknown"===e.state||"unavailable"===e.state)return null;const t=e.state.trim(),o=/^(\d{1,3}):(\d{2})(?::\d{2})?$/.exec(t);if(o)return 60*Number(o[1])+Number(o[2]);const a=Number.parseFloat(t);if(!Number.isFinite(a)||a<0)return null;const s="string"==typeof e.attributes.unit_of_measurement?e.attributes.unit_of_measurement.trim().toLowerCase():"";return"h"===s||"hr"===s||"hrs"===s||s.startsWith("hour")||s.startsWith("год")||"ч"===s?Math.round(60*a):"s"===s||"sec"===s||s.startsWith("сек")?Math.round(a/60):Math.round(a)}(t.states[l]):null;if(null===i&&null===d)return null;const u=Number.isFinite(s)?Math.max(1,Math.min(99,Number(s))):20;return{soc:i,runtimeMinutes:d,isLow:null!==i&&i<=u||null!==d&&d<=30,willLastNextOutage:null!==d&&null!=n?d>=n:null}}function Ge(e,t,o=Me){if(!e||"unavailable"===e.state||"unknown"===e.state)return{dateIso:t,published:!1,slots:null,outageHours:0,possibleHours:0,outagesText:"",dataStatus:"stale"};const a=e.attributes,s="string"==typeof a.date&&a.date?a.date:t,n=function(e){if("string"!=typeof e)return null;const t=e.trim();if(t.length!==Oe)return null;const o=[];for(let e=0;e<Oe;e++){const a=t[e];if("1"!==a&&"0"!==a&&"?"!==a)return null;o.push(a)}return o}(a.schedule),i=n??(Array.isArray(a.outages)?function(e,t,o=Me){if(!Array.isArray(e))return null;const a=[];for(const t of e){if(!t||"object"!=typeof t)continue;const e=t;if("string"!=typeof e.start||"string"!=typeof e.end)continue;const o=Date.parse(e.start),s=Date.parse(e.end);if(Number.isNaN(o)||Number.isNaN(s)||s<=o)continue;const n="possible"===e.kind?"?":"0";a.push({startMs:o,endMs:s,kind:n})}const s=new Array(Oe).fill("1");for(let e=0;e<Oe;e++){const n=Be(t,e,o),i=(n.start.getTime()+n.end.getTime())/2;for(const t of a)i>=t.startMs&&i<t.endMs&&(s[e]="0"===t.kind||"1"===s[e]?t.kind:s[e])}return s}(a.outages,s,o):null),r="boolean"==typeof a.published?a.published:null!==i,l=i?We(i):null,d=Number.parseFloat(e.state),u=l?l.outageHours:Number.isFinite(d)?d:0,c="string"==typeof a.outages_text&&a.outages_text?a.outages_text:i?function(e,t="0"){return Ve(e,t).map(e=>`${e.startLabel}-${e.endLabel}`).join(", ")}(i,"0"):"";return{dateIso:s,published:r&&null!==i,slots:r?i:null,outageHours:u,possibleHours:l?l.possibleHours:0,outagesText:c,dataStatus:"string"==typeof a.data_status?a.data_status:"fresh"}}function Ze(e){if(!e||"unavailable"===e.state||"unknown"===e.state)return null;const t=Date.parse(e.state);return Number.isNaN(t)?null:new Date(t)}function qe(e){if("string"==typeof e){const t=Date.parse(e);return Number.isNaN(t)?null:t}const t=e.dateTime??e.date;if(!t)return null;const o=Date.parse(t);return Number.isNaN(o)?null:o}function Xe(e){const t=e.timeZone??Me,{dateIso:o,weekdayIndex:a}=Ie(e.todayDate,t),s=Le(o,1),n=new Map,i=e.events.map(e=>{const t=function(e){if(!e)return null;const t=e.toLowerCase();return t.includes("можлив")||t.includes("possible")||t.includes("возможн")?"?":t.includes("відключ")||t.includes("планов")||t.includes("аварій")||t.includes("outage")||t.includes("works")||t.includes("отключ")||t.includes("работ")?"0":null}(e.summary),o=qe(e.start),a=qe(e.end);return t&&null!==o&&null!==a&&a>o?{kind:t,startMs:o,endMs:a}:null}).filter(e=>null!==e);for(let a=0;a<7;a++){const s=Le(o,a);if(s===e.todaySchedule?.dateIso&&e.todaySchedule.published&&e.todaySchedule.slots){n.set(s,{slots:[...e.todaySchedule.slots],hasSchedule:!0,source:"today"});continue}if(s===e.tomorrowSchedule?.dateIso&&e.tomorrowSchedule.published&&e.tomorrowSchedule.slots){n.set(s,{slots:[...e.tomorrowSchedule.slots],hasSchedule:!0,source:"tomorrow"});continue}const r=new Array(Oe).fill("1");let l=!1;for(let e=0;e<Oe;e++){const o=Be(s,e,t),a=(o.start.getTime()+o.end.getTime())/2;for(const t of i)a>=t.startMs&&a<t.endMs&&(l=!0,"0"!==t.kind&&"1"!==r[e]||(r[e]=t.kind))}n.set(s,{slots:r,hasSchedule:l,source:l?"calendar":"empty"})}const r=[];for(let e=0;e<7;e++){const t=Le(o,e),i=(a+e)%7,l=n.get(t);r.push({weekdayIndex:i,dateIso:t,isToday:t===o||0===e&&t!==s,hasSchedule:l?.hasSchedule??!1,source:l?.source??"empty",slots:l?.slots??new Array(Oe).fill("1")})}return"mon_sun"===e.rowOrder?[...r].sort((e,t)=>e.weekdayIndex-t.weekdayIndex):r}function Je(e){return String(e).padStart(2,"0")}function Qe(e,t){return"dtek_light"===e||"dtek_dark"===e||"kiosk_dark"===e||"oled_black"===e?e:"auto"!==e&&e?t?"dtek_dark":"dtek_light":"auto"}function Ye(e,t){return"0"===e?"var(--ua-off-bg)":"?"===e?"var(--ua-maybe-bg)":t?"var(--ua-today-on-bg)":"var(--ua-bg)"}function et(e){const t=Array.from({length:24},(e,t)=>t);return K`
    <thead>
      <tr>
        <th class="dtek-corner">${e}</th>
        ${t.map(e=>K`
            <th class="dtek-vhead-cell">
              <span class="dtek-vhead">${Je(e)}-${Je(e+1)}</span>
            </th>
          `)}
      </tr>
    </thead>
  `}function tt(e){const t=e.slots[2*e.hour]??"1",o=e.slots[2*e.hour+1]??"1",a=Boolean(e.highlightRow);let s="";return"0"===t&&"0"===o?s=Ce({size:12,accent:!1,faded:!1}):"?"===t&&"?"===o?s=Ce({size:12,accent:!1,faded:!0}):"1"===t&&"1"===o||(s=Ce({size:12,accent:!0,faded:!1})),K`
    <td>
      <button
        type="button"
        class="dtek-cell ${e.isNowHour?"is-now":""} ${e.compactRow?"compact-row":""}"
        aria-label="${Je(e.hour)}:00-${Je(e.hour+1)}:00"
        @mouseenter=${()=>e.onSelect?.(e.hour)}
        @click=${()=>e.onSelect?.(e.hour)}
      >
        <span class="dtek-cell-bg">
          <span style="background: ${Ye(t,a)}"></span>
          <span style="background: ${Ye(o,a)}"></span>
        </span>
        <span class="dtek-cell-icon">${s}</span>
      </button>
    </td>
  `}function ot(e,t){return K`
    <div class="legend">
      <span class="legend-item">
        <span class="legend-swatch" style="background: var(--ua-bg)"></span>
        <span>${e.legOn}</span>
      </span>
      <span class="legend-item">
        <span class="legend-swatch" style="background: var(--ua-off-bg)">
          ${Ce({size:10})}
        </span>
        <span>${e.legOff}</span>
      </span>
      ${t?K`
              <span class="legend-item">
                <span class="legend-swatch" style="background: var(--ua-maybe-bg)">
                  ${Ce({size:10,faded:!0})}
                </span>
                <span>${e.legMaybe}</span>
              </span>
            `:""}
      <span class="legend-item">
        <span
          class="legend-swatch"
          style="background: linear-gradient(90deg, var(--ua-off-bg) 50%, var(--ua-bg) 50%)"
        >
          ${Ce({size:10,accent:!0})}
        </span>
        <span>${e.legFirst}</span>
      </span>
      <span class="legend-item">
        <span
          class="legend-swatch"
          style="background: linear-gradient(90deg, var(--ua-bg) 50%, var(--ua-off-bg) 50%)"
        >
          ${Ce({size:10,accent:!0})}
        </span>
        <span>${e.legSecond}</span>
      </span>
    </div>
  `}function at(e){const t=e.slots[2*e.hour]??"1",o=e.slots[2*e.hour+1]??"1",a=t===o?Ae(t,e.lang):`:00 ${Ae(t,e.lang)} / :30 ${Ae(o,e.lang)}`,s=e.prefix?`${e.prefix} • `:"",n=e.tag?` (${e.tag})`:"";return`${s}${Je(e.hour)}:00–${Je(e.hour+1)}:00${n} • ${a}`}function st(){const e=Array.from({length:24},(e,t)=>t);return K`
    <div class="tl-hours">
      ${e.map(e=>K`<span class="tl-hour-lbl">${Je(e)}</span>`)}
    </div>
  `}function nt(e){const t=e.slots,o=void 0!==e.nowPercent&&null!==e.nowPercent?Math.min(100,Math.max(0,e.nowPercent)):null;return K`
    <div class="tl-track-wrap">
      <div class="tl-track ${e.mini?"mini":""}">
        ${Array.from({length:48},(o,a)=>{const s=t[a]??"1",n=Math.floor(a/2),i=a%2==1&&a<47,r=`${Je(n)}:${a%2==0?"00":"30"}`,l=a%2==0?n:n+1,d=a%2==0?"30":"00";return K`
            <button
              type="button"
              class="tl-slot ${function(e){return"0"===e?"st-off":"?"===e?"st-maybe":"st-on"}(s)} ${i?"hour-end":""}"
              aria-label="${r}-${Je(l)}:${d}"
              @mouseenter=${()=>e.onSelectHour?.(n)}
              @click=${()=>e.onSelectHour?.(n)}
            ></button>
          `})}
      </div>
      ${null!==o?K`<span class="tl-now-line" style="left: ${o}%"></span>`:G}
    </div>
  `}function it(e){const t=void 0!==e.nowPercent&&null!==e.nowPercent?Math.min(100,Math.max(0,e.nowPercent)):null,o=e.nowTimeLabel?`${e.nowTimeLabel}`:"";return K`
    <div class="tl-box" @mouseleave=${()=>e.onLeave?.()}>
      ${e.showNowBadge&&null!==t&&o?K`
              <span class="tl-now-badge" style="left: clamp(26px, ${t}%, calc(100% - 26px))">
                ${o}
              </span>
            `:G}
      ${st()}
      ${nt({slots:e.slots,mini:e.mini,nowPercent:t,onSelectHour:e.onSelectHour})}
    </div>
  `}function rt(e,t,o=!0){const a=Ve(e,"0"),s=Ve(e,"?");return 0===a.length&&0===s.length?o?K`<div class="chip-row"><span class="iv-chip ok">${t.noOutagesToday}</span></div>`:K``:K`
    <div class="chip-row">
      ${a.map(e=>K`<span class="iv-chip">+ ${e.startLabel}–${e.endLabel}</span>`)}
      ${s.map(e=>K`<span class="iv-chip maybe">? ${e.startLabel}–${e.endLabel}</span>`)}
    </div>
  `}function lt(e,t){return K`
    <div class="legend">
      <span class="legend-item">
        <span class="legend-swatch" style="background: var(--ua-tl-on)"></span>
        <span>${e.legOn}</span>
      </span>
      <span class="legend-item">
        <span class="legend-swatch" style="background: var(--ua-tl-off)"></span>
        <span>${e.legOff}</span>
      </span>
      ${t?K`
              <span class="legend-item">
                <span class="legend-swatch" style="background: var(--ua-tl-maybe)"></span>
                <span>${e.legMaybe}</span>
              </span>
            `:G}
    </div>
  `}const dt=i`
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
    --ua-tl-on: var(--ua-success);
    --ua-tl-off: var(--ua-error);
    --ua-tl-maybe: #d97706;
    --ua-now-line: #facc15;
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
    --ua-tl-on: #16a34a;
    --ua-tl-off: #dc2626;
    --ua-tl-maybe: #d97706;
    --ua-now-line: #eab308;
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
    --ua-tl-on: #10b981;
    --ua-tl-off: #ef4444;
    --ua-tl-maybe: #f59e0b;
    --ua-now-line: #facc15;
  }

  :host([data-theme="kiosk_dark"]) {
    --ua-bg: #080c14;
    --ua-sub: #101726;
    --ua-fg: #f1f5f9;
    --ua-muted: #94a3b8;
    --ua-border: #1e293b;
    --ua-accent: #facc15;
    --ua-success: #10b981;
    --ua-warning: #f59e0b;
    --ua-error: #ef4444;
    --ua-off-bg: #7f1d1d;
    --ua-maybe-bg: #78350f;
    --ua-on-bg: #064e3b;
    --ua-today-row-bg: #facc15;
    --ua-today-row-fg: #090d16;
    --ua-today-off-bg: #7f1d1d;
    --ua-today-maybe-bg: #78350f;
    --ua-today-on-bg: rgba(250, 204, 21, 0.08);
    --ua-bolt-color: #f1f5f9;
    --ua-bolt-warn: #facc15;
    --ua-tl-on: #059669;
    --ua-tl-off: #dc2626;
    --ua-tl-maybe: #d97706;
    --ua-now-line: #facc15;
  }

  :host([data-theme="oled_black"]) {
    --ua-bg: #000000;
    --ua-sub: #0f1115;
    --ua-fg: #ffffff;
    --ua-muted: #a1a1aa;
    --ua-border: #27272a;
    --ua-accent: #facc15;
    --ua-success: #22c55e;
    --ua-warning: #f59e0b;
    --ua-error: #ef4444;
    --ua-off-bg: #7f1d1d;
    --ua-maybe-bg: #713f12;
    --ua-on-bg: #14532d;
    --ua-today-row-bg: #facc15;
    --ua-today-row-fg: #000000;
    --ua-today-off-bg: #7f1d1d;
    --ua-today-maybe-bg: #713f12;
    --ua-today-on-bg: rgba(250, 204, 21, 0.09);
    --ua-bolt-color: #ffffff;
    --ua-bolt-warn: #facc15;
    --ua-tl-on: #15803d;
    --ua-tl-off: #dc2626;
    --ua-tl-maybe: #d97706;
    --ua-now-line: #facc15;
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

  /* Header view switcher */
  .view-tabs {
    display: inline-flex;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--ua-border);
    background: var(--ua-sub);
    padding: 2px;
    gap: 2px;
  }

  .view-tab {
    border: none;
    background: transparent;
    color: var(--ua-muted);
    font: inherit;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
  }

  .view-tab.active {
    background: var(--ua-yellow-bg);
    color: var(--ua-yellow-fg);
  }

  /* Interval chips */
  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }

  .iv-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    border: 1px solid color-mix(in srgb, var(--ua-tl-off) 55%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-tl-off) 16%, var(--ua-bg));
    color: var(--ua-fg);
  }

  .iv-chip.maybe {
    border-color: color-mix(in srgb, var(--ua-tl-maybe) 55%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-tl-maybe) 16%, var(--ua-bg));
  }

  .iv-chip.ok {
    border-color: color-mix(in srgb, var(--ua-tl-on) 55%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-tl-on) 14%, var(--ua-bg));
  }

  /* Continuous 24h timeline bar */
  .tl-box {
    position: relative;
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .tl-hours {
    display: grid;
    grid-template-columns: repeat(24, minmax(0, 1fr));
    font-size: 10px;
    line-height: 1.1;
    color: var(--ua-muted);
    font-variant-numeric: tabular-nums;
    user-select: none;
  }

  .tl-hour-lbl {
    text-align: left;
    padding-left: 2px;
    overflow: hidden;
  }

  .tl-track-wrap {
    position: relative;
  }

  .tl-track {
    display: grid;
    grid-template-columns: repeat(48, minmax(0, 1fr));
    height: 28px;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--ua-border);
  }

  .tl-track.mini {
    height: 18px;
  }

  :host([data-layout="kiosk"]) .tl-track {
    height: 36px;
  }

  .tl-slot {
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    height: 100%;
    background: var(--ua-tl-on);
  }

  .tl-slot.hour-end {
    border-right: 1px solid rgba(0, 0, 0, 0.25);
  }

  .tl-slot:last-child {
    border-right: none;
  }

  .tl-slot.st-on {
    background: var(--ua-tl-on);
  }

  .tl-slot.st-off {
    background: var(--ua-tl-off);
  }

  .tl-slot.st-maybe {
    background: var(--ua-tl-maybe);
  }

  .tl-slot:hover {
    filter: brightness(1.18);
  }

  .tl-now-line {
    position: absolute;
    top: -3px;
    bottom: -3px;
    width: 2px;
    background: var(--ua-now-line);
    box-shadow: 0 0 6px var(--ua-now-line);
    pointer-events: none;
    z-index: 6;
    transform: translateX(-50%);
  }

  .tl-now-badge {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    background: var(--ua-now-line);
    color: #111827;
    font-size: 9px;
    font-weight: 800;
    line-height: 1.2;
    padding: 1px 5px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 7;
    font-variant-numeric: tabular-nums;
  }

  /* Continuous 7x24 weekly timeline bars */
  .wbar-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .wbar-grid {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .wbar-axis-row,
  .wbar-row {
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr);
    align-items: center;
    gap: 6px;
  }

  .wbar-day {
    font-size: 11px;
    font-weight: 600;
    padding: 2px 5px;
    border-radius: 4px;
    background: var(--ua-sub);
    color: var(--ua-fg);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .wbar-row.is-today .wbar-day {
    background: var(--ua-today-row-bg);
    color: var(--ua-today-row-fg);
    font-weight: 700;
  }

  .wbar-row.is-empty .wbar-track {
    opacity: 0.45;
  }

  .wbar-rows-area {
    position: relative;
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 4px 6px;
    align-items: center;
  }

  .wbar-overlay-col {
    position: relative;
    grid-column: 2;
    grid-row: 1 / span 7;
    align-self: stretch;
    pointer-events: none;
    z-index: 6;
  }

  .wbar-now-line {
    position: absolute;
    top: -4px;
    bottom: -4px;
    width: 2px;
    background: var(--ua-now-line);
    box-shadow: 0 0 6px var(--ua-now-line);
    transform: translateX(-50%);
  }

  /* Mobile friendly weekly list */
  .wlist {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .wlist-card {
    border: 1px solid var(--ua-border);
    border-radius: 8px;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: var(--ua-sub);
  }

  .wlist-card.is-today {
    border-color: var(--ua-today-row-bg);
    background: color-mix(in srgb, var(--ua-today-row-bg) 8%, var(--ua-sub));
  }

  .wlist-card.is-empty {
    opacity: 0.68;
  }

  .wlist-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .wlist-day {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    font-size: 13px;
  }

  .wlist-today-tag {
    background: var(--ua-today-row-bg);
    color: var(--ua-today-row-fg);
    padding: 1px 6px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
  }

  .wlist-hours {
    font-size: 12px;
    font-weight: 600;
    color: var(--ua-muted);
    font-variant-numeric: tabular-nums;
  }

  .notice-banner {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px dashed var(--ua-border);
    background: var(--ua-sub);
    font-size: 12px;
    color: var(--ua-muted);
  }

  .collapsed-days {
    font-size: 12px;
    color: var(--ua-muted);
    padding: 4px 2px;
  }

  .week-divider {
    border-top: 1px solid var(--ua-border);
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .weekly-mobile-view {
    display: none;
  }

  @container ua-card (max-width: 459px) {
    .weekly-responsive .weekly-desktop-view {
      display: none;
    }

    .weekly-responsive .weekly-mobile-view {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

  @container ua-card (max-width: 380px) {
    .tl-hour-lbl:nth-child(even) {
      visibility: hidden;
    }

    .wbar-axis-row,
    .wbar-row,
    .wbar-rows-area {
      grid-template-columns: 44px minmax(0, 1fr);
    }
  }
`;async function ut(e){const t=`calendars/${encodeURIComponent(e.calendarId)}?start=${encodeURIComponent(e.startIso)}&end=${encodeURIComponent(e.endIso)}`,o=await e.hass.callApi("GET",t);return Array.isArray(o)?o:[]}function ct(e){const t=Array.from({length:24},(e,t)=>t);return K`
    <div class="table-scroll" @mouseleave=${()=>e.onHover(null)}>
      <table class="dtek-table">
        ${et(e.t.daysHeader)}
        <tbody>
          ${e.rows.map(o=>{const a=Math.max(0,e.allRows.indexOf(o));return K`
              <tr class=${o.isToday?"is-today-row":""}>
                <td class="dtek-day-cell ${o.isToday?"today-highlight":""}">
                  ${e.t.weekdays[o.weekdayIndex]}
                </td>
                ${t.map(t=>tt({slots:o.slots,hour:t,isNowHour:o.isToday&&t===e.nowHour,highlightRow:o.isToday,compactRow:!0,onSelect:t=>e.onHover({dayIdx:a,hour:t})}))}
              </tr>
            `})}
        </tbody>
      </table>
    </div>
  `}function ht(e){const{allRows:t,rows:o,t:a,nowPercent:s,nowTimeBadge:n}=e;return K`
    <div class="wbar-wrap" @mouseleave=${()=>e.onHover(null)}>
      <div class="wbar-axis-row">
        <span></span>
        <div
          style="position: relative; padding-top: ${null!==s&&n?"16px":"0"}"
        >
          ${null!==s&&n?K`
                  <span
                    class="tl-now-badge"
                    style="left: clamp(26px, ${s}%, calc(100% - 26px))"
                  >
                    ${n}
                  </span>
                `:G}
          ${st()}
        </div>
      </div>

      <div class="wbar-rows-area">
        ${o.map((o,s)=>{const n=Math.max(0,t.indexOf(o));return K`
            <div
              class="wbar-day ${o.isToday?"today-highlight":""}"
              style="grid-column: 1; grid-row: ${s+1}; ${o.isToday?"background: var(--ua-today-row-bg); color: var(--ua-today-row-fg);":""}"
            >
              ${a.weekdaysShort[o.weekdayIndex]} ${ze(o.dateIso).slice(0,2)}
            </div>
            <div
              class="${o.hasSchedule?"":"is-empty"}"
              style="grid-column: 2; grid-row: ${s+1};"
            >
              ${nt({slots:o.slots,mini:!0,nowPercent:null,onSelectHour:t=>e.onHover({dayIdx:n,hour:t})})}
            </div>
          `})}
        ${null!==s?K`
                <div
                  class="wbar-overlay-col"
                  style="grid-row: 1 / span ${Math.max(1,o.length)}"
                >
                  <span class="wbar-now-line" style="left: ${s}%"></span>
                </div>
              `:G}
      </div>
    </div>
  `}function pt(e){const{allRows:t,rows:o,collapsed:a,emptyDaysMode:s,t:n,nowPercent:i,showIntervals:r}=e;return K`
    <div class="wlist" @mouseleave=${()=>e.onHover(null)}>
      ${o.map(o=>{const a=Math.max(0,t.indexOf(o)),s=We(o.slots);return K`
          <div
            class="wlist-card ${o.isToday?"is-today":""} ${o.hasSchedule||o.isToday?"":"is-empty"}"
          >
            <div class="wlist-top">
              <div class="wlist-day">
                <span>${n.weekdays[o.weekdayIndex]} ${ze(o.dateIso)}</span>
                ${o.isToday?K`<span class="wlist-today-tag">${n.todayTag}</span>`:G}
              </div>
              <span class="wlist-hours">
                ${o.hasSchedule||o.isToday?`${s.outageHours.toFixed(1)} ${n.hourUnit}`:n.dayUnscheduledLabel}
              </span>
            </div>
            ${nt({slots:o.slots,mini:!0,nowPercent:o.isToday?i:null,onSelectHour:t=>e.onHover({dayIdx:a,hour:t})})}
            ${r&&(o.hasSchedule||o.isToday)?rt(o.slots,n,!0):G}
          </div>
        `})}
      ${"compact_empty"===s&&a.length>0?K`
              <div class="collapsed-days">
                ${n.collapsedDaysPrefix}:
                ${a.map(e=>`${n.weekdaysShort[e.weekdayIndex]} ${ze(e.dateIso)}`).join(", ")}
              </div>
            `:G}
    </div>
  `}function gt(e){const{rows:t,t:o,lang:a,weeklyView:s,mobileWeeklyView:n,emptyDaysMode:i,preferBarsOnDesktop:r,nowHour:l,nowPercent:d,nowTimeBadge:u,hoverCell:c,onHover:h,showNowLine:p,showIntervals:g,showLegend:y,weeklyPlanDisabled:f}=e,{visible:w,collapsed:m}=function(e,t){if("show_all"===t)return{visible:[...e],collapsed:[]};const o=e.filter(e=>e.hasSchedule||e.isToday),a=e.filter(e=>!e.hasSchedule&&!e.isToday);return 0===o.length&&e.length>0?{visible:[e[0]],collapsed:e.slice(1)}:{visible:o,collapsed:a}}(t,i),b="hide_unscheduled"===i?w:t,v=Math.max(0,t.findIndex(e=>e.isToday)),_=c&&c.dayIdx<t.length?c.dayIdx:v,x=c?.hour??l,$=t[_],k=$?at({slots:$.slots,hour:x,lang:a,prefix:`${o.weekdays[$.weekdayIndex]} ${ze($.dateIso)}`,tag:$.isToday&&x===l?o.nowTag:void 0}):"",T=p?d:null,S="timeline_bars"===s||"list"===s||"auto"===s&&r;let E;if("table"===s)E=ct({allRows:t,rows:b,t:o,nowHour:l,onHover:h});else if("timeline_bars"===s)E=ht({allRows:t,rows:b,t:o,nowPercent:T,nowTimeBadge:u,onHover:h});else if("list"===s)E=pt({allRows:t,rows:w,collapsed:m,emptyDaysMode:i,t:o,nowPercent:T,showIntervals:g,onHover:h});else{const e=r?ht({allRows:t,rows:b,t:o,nowPercent:T,nowTimeBadge:u,onHover:h}):ct({allRows:t,rows:b,t:o,nowHour:l,onHover:h}),a="compact_bars"===n?ht({allRows:t,rows:b,t:o,nowPercent:T,nowTimeBadge:u,onHover:h}):pt({allRows:t,rows:w,collapsed:m,emptyDaysMode:i,t:o,nowPercent:T,showIntervals:g,onHover:h});E=K`
      <div class="weekly-responsive">
        <div class="weekly-desktop-view">${e}</div>
        <div class="weekly-mobile-view">${a}</div>
      </div>
    `}const A=t.some(e=>!e.hasSchedule&&!e.isToday);return K`
    ${k?K`<div class="readout-row"><span class="hover-readout">${k}</span></div>`:G}
    ${f&&A?K`<div class="notice-banner">${o.weeklyPlanDisabledNotice}</div>`:G}
    ${E}
    ${y?K`<div class="footer">
            ${S?lt(o,!0):ot(o,!0)}
          </div>`:G}
  `}let yt=class extends de{constructor(){super(...arguments),this._now=new Date,this._hoverHour=null,this._activeView="today",this._weeklyEvents=[],this._weeklyHoverCell=null,this._weeklyFetchKey="",this._weeklyLastFetchMs=0,this._weeklyFetching=!1,this._timerId=null,this._onVisibility=()=>{"visible"===document.visibilityState&&(this._now=new Date)}}static{this.styles=dt}static getStubConfig(e){return{type:"custom:ua-outages-card",entity:(e?$e(e,"sensor"):void 0)??"sensor.ua_outages_outages_today",style:"dtek",theme:"auto",layout:"full"}}static getConfigElement(){return document.createElement("ua-outages-card-editor")}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={style:"dtek",theme:"auto",layout:"full",view_mode:"daily_only",default_view:"today",modern_grid:"2x12",interval_display:"auto",weekly_view:"auto",mobile_weekly_view:"list",empty_days_mode:"compact_empty",row_order:"mon_sun",language:"auto",show_header:!0,show_group_badge:!0,show_region:!0,show_connection:!0,show_countdown:!0,show_now_line:!0,show_tomorrow:!0,show_intervals_text:!0,show_legend:!0,...e},this._hoverHour=null,this._weeklyHoverCell=null,this._activeView=this._config.default_view??"today",this._weeklyFetchKey=""}updated(){this._maybeFetchWeeklyCalendar()}async _maybeFetchWeeklyCalendar(){if(!this.hass||!this._config||this._weeklyFetching)return;const e=this._config.view_mode??"daily_only";if(!("both"===e||"switchable"===e&&"week"===this._activeView))return;const t=_e(this.hass,this._config),o=t.calendar;if(!o||!this.hass.states[o])return;const a=this.hass.config?.time_zone||Me,{dateIso:s}=Ie(new Date,a),n=`${o}|${s}|${t.lastUpdate?this.hass.states[t.lastUpdate]?.state??"":""}`,i=Date.now();if(n===this._weeklyFetchKey&&i-this._weeklyLastFetchMs<3e5)return;this._weeklyFetching=!0;const r=`${Le(s,-1)}T00:00:00Z`,l=`${Le(s,8)}T23:59:59Z`;try{this._weeklyEvents=await ut({hass:this.hass,calendarId:o,startIso:r,endIso:l}),this._weeklyFetchKey=n,this._weeklyLastFetchMs=Date.now()}catch{}finally{this._weeklyFetching=!1}}getCardSize(){return"compact"===this._config?.layout?2:4}getGridOptions(){return{columns:12,min_columns:6,rows:"auto",min_rows:"compact"===this._config?.layout?2:3}}connectedCallback(){super.connectedCallback(),this._now=new Date,this._timerId=window.setInterval(()=>{"visible"===document.visibilityState&&(this._now=new Date)},3e4),document.addEventListener("visibilitychange",this._onVisibility)}disconnectedCallback(){null!==this._timerId&&(window.clearInterval(this._timerId),this._timerId=null),document.removeEventListener("visibilitychange",this._onVisibility),super.disconnectedCallback()}_syncHostAttributes(e,t){this.setAttribute("data-theme",e),this.setAttribute("data-layout",t)}_renderBatteryPill(e,t,o){const a=je({hass:this.hass,socEntityId:this._config?.battery_soc_entity,runtimeEntityId:this._config?.battery_runtime_entity,lowThreshold:this._config?.battery_low_threshold,nextOutageDurationMinutes:o.nextOutageDurationMinutes});if(!a)return G;const s=[e.batteryLabel];if(null!==a.soc&&s.push(`${a.soc}%`),null!==a.runtimeMinutes){const o=Ee(a.runtimeMinutes,t);!0===a.willLastNextOutage?s.push(`• ${e.batteryEnough} (${e.batteryReserve} ${o})`):s.push(`• ${e.batteryReserve} ${o}`)}return K`<span class="battery-pill ${a.isLow?"low":""}">${s.join(" ")}</span>`}_renderHero(e){const{t:t,lang:o,timing:a,scheduledOutageEntity:s,today:n,timeZone:i,isCompact:r}=e,l="on"===s?.state||"0"===a.currentKind,d=!l&&"?"===a.currentKind;let u="tone-success",c=t.powerOnNoOutages,h="";if(l){u="tone-error",c=a.currentEnd?`${t.outageUntil} ${Re(a.currentEnd,i)}`:t.outageOngoing;const e=[];null!==a.remainingMinutes&&e.push(`${Ee(a.remainingMinutes,o)} ${t.remainingSuffix}`),a.currentStart&&a.currentEnd&&e.push(`${Re(a.currentStart,i)}–${Re(a.currentEnd,i)}`),h=e.join(" • ")}else if(d)u="tone-warning",c=t.slotMaybe,a.nextOutageStart&&null!==a.nextOutageMinutesUntil&&(h=`${t.nextOutageAt} ${Re(a.nextOutageStart,i)} (${t.inPrefix.toLowerCase()} ${Ee(a.nextOutageMinutesUntil,o)})`);else if(a.nextOutageStart){c=`${t.powerOn} • ${t.nextOutageAt} ${Re(a.nextOutageStart,i)}`;const e=[];null!==a.nextOutageMinutesUntil&&e.push(`${t.inPrefix} ${Ee(a.nextOutageMinutesUntil,o)}`),null!==a.nextOutageDurationMinutes&&e.push(`${t.durationLabel} ${Ee(a.nextOutageDurationMinutes,o)}`),h=e.join(" • ")}else null===n.slots&&(u="tone-warning",c=t.noSchedule);const p=r?G:this._renderBatteryPill(t,o,a),g=l&&null!==a.progressPercent?K`
            <div class="progress-track">
              <div class="progress-fill" style="width: ${a.progressPercent}%"></div>
            </div>
          `:G;return K`
      <div class="hero ${u}">
        <div class="hero-top">
          <div class="hero-main">${c}</div>
          ${p}
        </div>
        ${h?K`<div class="hero-sub">${h}</div>`:G} ${g}
      </div>
    `}_renderAddressAlert(e,t,o,a){if(!t||"none"===t.state||"unavailable"===t.state||"unknown"===t.state)return G;const s=e.addressKinds[t.state]??e.addressKinds.other,n="string"==typeof t.attributes.reason?t.attributes.reason:"";let i="";if(o&&"unknown"!==o.state&&"unavailable"!==o.state){const t=Date.parse(o.state);Number.isNaN(t)||(i=`${e.expectedRestoration}${Re(new Date(t),a)}`)}const r=[n,i].filter(Boolean);return K`
      <div class="alert-banner">
        <div class="alert-title">${s}</div>
        ${r.length>0?K`<div>${r.join(" • ")}</div>`:G}
      </div>
    `}_renderDtekTable(e){const{t:t,today:o,tomorrow:a,nowHour:s,showTomorrow:n}=e,i=Array.from({length:24},(e,t)=>t),r=e=>{this._hoverHour=e},l=o.slots,d=a.published?a.slots:null;return K`
      <div class="table-scroll" @mouseleave=${()=>this._hoverHour=null}>
        <table class="dtek-table">
          ${et(t.hoursHeader)}
          <tbody>
            <tr>
              <td class="dtek-day-cell">${t.today} ${ze(o.dateIso)}</td>
              ${l?i.map(e=>tt({slots:l,hour:e,isNowHour:e===s,onSelect:r})):K`<td class="dtek-empty-row" colspan="24">${t.noSchedule}</td>`}
            </tr>
            ${n?K`
                    <tr>
                      <td class="dtek-day-cell">
                        ${t.tomorrow} ${ze(a.dateIso)}
                      </td>
                      ${d?i.map(e=>tt({slots:d,hour:e,isNowHour:!1})):K`<td class="dtek-empty-row" colspan="24">${t.noTomorrow}</td>`}
                    </tr>
                  `:G}
          </tbody>
        </table>
      </div>
    `}_renderModernTileGrid(e){const t=Array.from({length:24},(e,t)=>t),o=e.nowSlot>=0?Math.floor(e.nowSlot/2):-1,a=e.nowSlot>=0?e.nowSlot%2:-1,s=e=>"0"===e?"slot-off":"?"===e?"slot-maybe":"slot-on";return K`
      <div
        class=${"1x24"===e.gridMode?"grid-1x24":"grid-2x12"}
        @mouseleave=${()=>{e.interactive&&(this._hoverHour=null)}}
      >
        ${t.map(t=>{const n=e.slots[2*t]??"1",i=e.slots[2*t+1]??"1",r=t===o,l="1x24"===e.gridMode?String(t):Je(t);return K`
            <button
              type="button"
              class="hour-tile ${e.mini?"mini":""} ${r?"is-now":""}"
              aria-label="${Je(t)}:00-${Je(t+1)}:00"
              @mouseenter=${()=>{e.interactive&&(this._hoverHour=t)}}
              @click=${()=>{e.interactive&&(this._hoverHour=t)}}
            >
              <span
                class="half-slot ${s(n)} ${n!==i?"split":""} ${r&&0===a?"now-half":""}"
              ></span>
              <span
                class="half-slot ${s(i)} ${r&&1===a?"now-half":""}"
              ></span>
              <span class="hour-badge">${l}</span>
            </button>
          `})}
      </div>
    `}_renderConnection(e,t,o,a){const s=t.connection?this.hass?.states[t.connection]:void 0,n=t.scheduleUpdated?this.hass?.states[t.scheduleUpdated]:void 0;let i=s?.state;i&&"unknown"!==i&&"unavailable"!==i||(i="mirror"===o.dataStatus?"mirror":"stale"===o.dataStatus?"offline":"ok");const r="mirror"===i?"mirror":"offline"===i?"offline":"ok";let l="mirror"===i?e.connMirror:"offline"===i?e.connOffline:e.connOk;if(n&&"unknown"!==n.state&&"unavailable"!==n.state){const e=Date.parse(n.state);Number.isNaN(e)||(l=`${l} • ${Re(new Date(e),a)}`)}return K`
      <div class="conn">
        <span class="dot ${r}"></span>
        <span>${l}</span>
      </div>
    `}_renderTomorrowBlock(e){const{t:t,style:o,tomorrow:a,gridMode:s,showChips:n}=e;return K`
      <div class="tmr-box">
        <div class="readout-row">
          <span class="section-lbl">${t.tomorrow}</span>
          <span class="section-lbl">
            ${a.published?`${a.outageHours.toFixed(1)} ${t.hourUnit}`:"—"}
          </span>
        </div>
        ${a.published&&a.slots?K`
                ${"timeline"===o?it({slots:a.slots,mini:!0}):this._renderModernTileGrid({slots:a.slots,gridMode:s,nowSlot:-1,mini:!0})}
                ${n?rt(a.slots,t,!0):G}
              `:K`<div class="tmr-unpublished">${t.noTomorrow}</div>`}
      </div>
    `}render(){const e=this._config,t=this.hass,o=Te(e?.language,t?.locale?.language??t?.language),a=Se(o);if(!e||!t)return K`<ha-card><div class="empty-state">${a.noEntity}</div></ha-card>`;const s=e.style??"dtek",n=e.layout??"full",i=Qe(e.theme,Boolean(t.themes?.darkMode));this._syncHostAttributes(i,n);const r=_e(t,e),l=r.today;if(!l||!t.states[l])return K`<ha-card><div class="empty-state">${a.noEntity}</div></ha-card>`;const d=t.config?.time_zone||Me,{dateIso:u,slotIndex:c}=Ie(this._now,d),h=Le(u,1),p=t.states[l],g=r.tomorrow?t.states[r.tomorrow]:void 0,y=r.group?t.states[r.group]:void 0,f=r.nextOutage?t.states[r.nextOutage]:void 0,w=r.outageEnd?t.states[r.outageEnd]:void 0,m=r.scheduledOutage?t.states[r.scheduledOutage]:void 0,b=r.addressStatus?t.states[r.addressStatus]:void 0,v=r.restoration?t.states[r.restoration]:void 0,_=Ge(p,u,d),x=Ge(g,h,d),$=function(e){const t=e.timeZone??Me,o=e.now.getTime(),{dateIso:a,slotIndex:s}=Ie(e.now,t);let n="1";e.today.slots&&e.today.dateIso===a&&(n=e.today.slots[s]??"1");let i=null,r=Ze(e.outageEndEntity);if(e.outageEndEntity&&"string"==typeof e.outageEndEntity.attributes.start){const t=Date.parse(e.outageEndEntity.attributes.start);Number.isNaN(t)||(i=new Date(t))}if("0"===n&&e.today.slots&&(null===i||null===r)){let o=s;for(;o>0&&"0"===e.today.slots[o-1];)o-=1;let a=s+1;for(;a<Oe&&"0"===e.today.slots[a];)a+=1;if(null===i&&(i=Be(e.today.dateIso,o,t).start),null===r){const o=Le(e.today.dateIso,1);if(a===Oe&&e.tomorrow.slots&&e.tomorrow.dateIso===o&&"0"===e.tomorrow.slots[0]){let a=0;for(;a<Oe&&"0"===e.tomorrow.slots[a];)a+=1;r=Be(o,a-1,t).end}else r=Be(e.today.dateIso,a-1,t).end}}let l=null,d=null;if(null!==r&&r.getTime()>o&&(l=Math.max(0,Math.ceil((r.getTime()-o)/6e4)),null!==i&&r.getTime()>i.getTime())){const e=r.getTime()-i.getTime(),t=Math.min(e,Math.max(0,o-i.getTime()));d=Math.round(t/e*100)}let u=Ze(e.nextOutageEntity),c="number"==typeof e.nextOutageEntity?.attributes.duration_minutes?e.nextOutageEntity.attributes.duration_minutes:null;if(null===u){const o=[e.today,e.tomorrow];e:for(let n=0;n<o.length;n++){const i=o[n];if(i.slots)for(let o=i.dateIso===a?s+1:0;o<Oe;o++)if("0"===i.slots[o]||"?"===i.slots[o]){u=Be(i.dateIso,o,t).start;const a=i.slots[o];let s=1;for(;o+s<Oe&&i.slots[o+s]===a;)s+=1;if(0===n&&o+s===Oe&&e.tomorrow.slots&&e.tomorrow.dateIso===Le(i.dateIso,1)){let t=0;for(;t<Oe&&e.tomorrow.slots[t]===a;)s+=1,t+=1}c=30*s;break e}}}const h=null!==u&&u.getTime()>o?Math.max(0,Math.ceil((u.getTime()-o)/6e4)):null;return{currentKind:n,currentStart:i,currentEnd:r,remainingMinutes:l,progressPercent:d,nextOutageStart:u,nextOutageMinutesUntil:h,nextOutageDurationMinutes:c}}({today:_,tomorrow:x,now:this._now,nextOutageEntity:f,outageEndEntity:w,timeZone:d}),k="compact"===n,T=e.view_mode??"daily_only",S="daily_only"===T||"both"===T||"today"===this._activeView,E="both"===T||"switchable"===T&&"week"===this._activeView,A=!1!==e.show_header,C=!1!==e.show_group_badge,O=!k&&!1!==e.show_region,M=!1!==e.show_connection,D=!1!==e.show_countdown,H=!1!==e.show_now_line,N=!k&&!1!==e.show_tomorrow,P=e.interval_display??"auto",I=!1===e.show_intervals_text||k||"none"===P?"none":"auto"===P?"timeline"===s?"chips":"text":P,U="chips"===I||"both"===I,L="text"===I||"both"===I,z=!k&&!1!==e.show_legend,R=y&&"unknown"!==y.state&&"unavailable"!==y.state?y.state:null,F=e.title||function(e){const{friendlyName:t,fallbackTitle:o,groupVal:a,showGroupBadge:s}=e;if("string"!=typeof t||!t.trim())return o;let n=t.replace(/\s+(Outages today|Відключень сьогодні|Отключений сегодня)$/i,"").trim();if(a&&s){const e=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),t=new RegExp(`\\s*(?:[·•\\-|]\\s*|\\()(?:Черга|Group|Queue|Группа)\\s+${e}\\)?$`,"i");n=n.replace(t,"").trim()}return n||o}({friendlyName:p?.attributes.friendly_name,fallbackTitle:a.cardDefaultTitle,groupVal:R,showGroupBadge:C}),B="string"==typeof y?.attributes.region?y.attributes.region:"",W=Ue(this._now,d),V=`${a.nowTag.toUpperCase()} ${Je(W.hour)}:${Je(W.minute)}`,j=Math.floor(c/2),Z=this._hoverHour??j,q=_.slots?at({slots:_.slots,hour:Z,lang:o,tag:Z===j?a.nowTag:void 0}):"",X=_.outagesText?`${a.today}: ${_.outagesText} (${_.outageHours.toFixed(1)} ${a.hourUnit})`:`${a.today}: ${_.outageHours.toFixed(1)} ${a.hourUnit}`,J="dtek"===s||"dtek_light"===i||"dtek_dark"===i||"kiosk_dark"===i,Q=r.connection?t.states[r.connection]:void 0,Y=!1===Q?.attributes.weekly_schedule_shown,ee=E?Xe({events:this._weeklyEvents,todayDate:this._now,todaySchedule:_,tomorrowSchedule:x,rowOrder:e.row_order??"mon_sun",timeZone:d}):[],te=e.weekly_view??"auto",oe=e.mobile_weekly_view??"list",ae=e.empty_days_mode??"compact_empty";return K`
      <ha-card>
        <div class="wrap">
          ${A?K`
                  <div class="header">
                    <div class="header-left">
                      <div class="header-title-row">
                        <span class="title">${F}</span>
                        ${C&&R?K`<span class="badge-group ${J?"dtek-pill":""}"
                                >${a.groupPrefix} ${R}</span
                              >`:G}
                      </div>
                      ${O&&B?K`<span class="region">${B}</span>`:G}
                    </div>
                    <div class="header-right">
                      ${"switchable"===T?K`
                              <div class="view-tabs" role="tablist">
                                <button
                                  type="button"
                                  role="tab"
                                  class="view-tab ${"today"===this._activeView?"active":""}"
                                  aria-selected=${"today"===this._activeView?"true":"false"}
                                  @click=${()=>{this._activeView="today"}}
                                >
                                  ${a.viewToday}
                                </button>
                                <button
                                  type="button"
                                  role="tab"
                                  class="view-tab ${"week"===this._activeView?"active":""}"
                                  aria-selected=${"week"===this._activeView?"true":"false"}
                                  @click=${()=>{this._activeView="week"}}
                                >
                                  ${a.viewWeek}
                                </button>
                              </div>
                            `:G}
                      ${M?this._renderConnection(a,r,_,d):G}
                    </div>
                  </div>
                `:G}
          ${D?this._renderHero({t:a,lang:o,timing:$,scheduledOutageEntity:m,today:_,timeZone:d,isCompact:k}):G}
          ${k?G:this._renderAddressAlert(a,b,v,d)}
          ${S?K`
                  <div class="readout-row">
                    <span class="section-lbl">
                      ${a.today} (${_.outageHours.toFixed(1)} ${a.hourUnit})
                    </span>
                    ${q?K`<span class="hover-readout">${q}</span>`:G}
                  </div>

                  ${"dtek"===s?this._renderDtekTable({t:a,today:_,tomorrow:x,nowHour:j,showTomorrow:N}):K`
                          ${_.slots?"timeline"===s?it({slots:_.slots,nowPercent:H?W.percent:null,nowTimeLabel:V,showNowBadge:H,onSelectHour:e=>{this._hoverHour=e},onLeave:()=>{this._hoverHour=null}}):this._renderModernTileGrid({slots:_.slots,gridMode:e.modern_grid??"2x12",nowSlot:c,interactive:!0}):K`<div class="tmr-unpublished">${a.noSchedule}</div>`}
                          ${U&&_.slots?rt(_.slots,a,!0):G}
                          ${N?this._renderTomorrowBlock({t:a,style:s,tomorrow:x,gridMode:e.modern_grid??"2x12",showChips:U}):G}
                        `}
                  ${L||z?K`
                          <div class="footer">
                            ${L?K`<span>${X}</span>`:K`<span></span>`}
                            ${z?"dtek"===s?ot(a,!1):"timeline"===s?lt(a,Boolean(_.possibleHours>0)):K`
                                        <div class="legend">
                                          <span class="legend-item">
                                            <span class="legend-swatch slot-on"></span>
                                            <span>${a.legOn}</span>
                                          </span>
                                          <span class="legend-item">
                                            <span class="legend-swatch slot-off"></span>
                                            <span>${a.legOff}</span>
                                          </span>
                                          <span class="legend-item">
                                            <span class="legend-swatch slot-maybe"></span>
                                            <span>${a.legMaybe}</span>
                                          </span>
                                        </div>
                                      `:G}
                          </div>
                        `:G}
                `:G}
          ${E?K`
                  <div class=${S?"week-divider":""}>
                    ${gt({rows:ee,t:a,lang:o,weeklyView:te,mobileWeeklyView:oe,emptyDaysMode:ae,preferBarsOnDesktop:"timeline"===s||"kiosk_dark"===i||"oled_black"===i,nowHour:j,nowPercent:W.percent,nowTimeBadge:V,hoverCell:this._weeklyHoverCell,onHover:e=>{this._weeklyHoverCell=e},showNowLine:H,showIntervals:"none"!==I,showLegend:z,weeklyPlanDisabled:Y})}
                  </div>
                `:G}
        </div>
      </ha-card>
    `}};e([ge({attribute:!1})],yt.prototype,"hass",void 0),e([ye()],yt.prototype,"_config",void 0),e([ye()],yt.prototype,"_now",void 0),e([ye()],yt.prototype,"_hoverHour",void 0),e([ye()],yt.prototype,"_activeView",void 0),e([ye()],yt.prototype,"_weeklyEvents",void 0),e([ye()],yt.prototype,"_weeklyHoverCell",void 0),yt=e([ce("ua-outages-card")],yt);let ft=class extends de{constructor(){super(...arguments),this._events=[],this._hoverCell=null,this._lastFetchKey="",this._lastFetchMs=0,this._fetching=!1}static{this.styles=dt}static getStubConfig(e){return{type:"custom:ua-outages-weekly-card",entity:(e?$e(e,"calendar"):void 0)??"calendar.ua_outages_outages",theme:"auto",row_order:"mon_sun"}}static getConfigElement(){return document.createElement("ua-outages-weekly-card-editor")}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={theme:"auto",layout:"full",weekly_view:"auto",mobile_weekly_view:"list",empty_days_mode:"compact_empty",row_order:"mon_sun",language:"auto",show_header:!0,show_group_badge:!0,show_now_line:!0,show_intervals_text:!0,show_legend:!0,...e},this._hoverCell=null,this._lastFetchKey=""}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6,rows:"auto",min_rows:4}}updated(){this._maybeFetchCalendar()}async _maybeFetchCalendar(){if(!this.hass||!this._config||this._fetching)return;const e=xe(this.hass,this._config),t=e.calendar;if(!t||!this.hass.states[t])return;const o=this.hass.config?.time_zone||Me,{dateIso:a}=Ie(new Date,o),s=`${t}|${a}|${e.lastUpdate?this.hass.states[e.lastUpdate]?.state??"":""}`,n=Date.now();if(s===this._lastFetchKey&&n-this._lastFetchMs<3e5)return;this._fetching=!0;const i=`${Le(a,-1)}T00:00:00Z`,r=`${Le(a,8)}T23:59:59Z`;try{this._events=await ut({hass:this.hass,calendarId:t,startIso:i,endIso:r}),this._lastFetchKey=s,this._lastFetchMs=Date.now()}catch{}finally{this._fetching=!1}}render(){const e=this._config,t=this.hass,o=Te(e?.language,t?.locale?.language??t?.language),a=Se(o);if(!e||!t)return K`<ha-card><div class="empty-state">${a.noEntity}</div></ha-card>`;const s=Qe(e.theme,Boolean(t.themes?.darkMode)),n=e.layout??"full";this.setAttribute("data-theme",s),this.setAttribute("data-layout",n);const i=xe(t,e);if(!i.calendar&&!i.today)return K`<ha-card><div class="empty-state">${a.noEntity}</div></ha-card>`;const r=t.config?.time_zone||Me,l=new Date,{dateIso:d,slotIndex:u}=Ie(l,r),c=Le(d,1),h=i.today?Ge(t.states[i.today],d,r):void 0,p=i.tomorrow?Ge(t.states[i.tomorrow],c,r):void 0,g=Xe({events:this._events,todayDate:l,todaySchedule:h,tomorrowSchedule:p,rowOrder:e.row_order??"mon_sun",timeZone:r}),y=i.group?t.states[i.group]:void 0,f=y&&"unknown"!==y.state&&"unavailable"!==y.state?y.state:null,w=i.connection?t.states[i.connection]:void 0,m=!1===w?.attributes.weekly_schedule_shown,b=Ue(l,r),v=Math.floor(u/2),_=`${String(b.hour).padStart(2,"0")}:${String(b.minute).padStart(2,"0")}`,x=!1!==e.show_header,$=!1!==e.show_group_badge,k=e.weekly_view??"auto",T=e.mobile_weekly_view??"list",S=e.empty_days_mode??"compact_empty",E="kiosk_dark"===s||"oled_black"===s;return K`
      <ha-card>
        <div class="wrap">
          ${x?K`
                  <div class="header">
                    <div class="header-left">
                      <div class="header-title-row">
                        <span class="title">${e.title||a.weeklyDefaultTitle}</span>
                        ${$&&f?K`<span class="badge-group dtek-pill"
                                >${a.groupPrefix} ${f}</span
                              >`:G}
                      </div>
                    </div>
                  </div>
                `:G}
          ${gt({rows:g,t:a,lang:o,weeklyView:k,mobileWeeklyView:T,emptyDaysMode:S,preferBarsOnDesktop:E,nowHour:v,nowPercent:b.percent,nowTimeBadge:_,hoverCell:this._hoverCell,onHover:e=>{this._hoverCell=e},showNowLine:!1!==e.show_now_line,showIntervals:!1!==e.show_intervals_text,showLegend:!1!==e.show_legend,weeklyPlanDisabled:m})}
        </div>
      </ha-card>
    `}};e([ge({attribute:!1})],ft.prototype,"hass",void 0),e([ye()],ft.prototype,"_config",void 0),e([ye()],ft.prototype,"_events",void 0),e([ye()],ft.prototype,"_hoverCell",void 0),ft=e([ce("ua-outages-weekly-card")],ft);const wt=i`
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
  input[type="number"],
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 12px;
  }

  @media (max-width: 500px) {
    .toggles {
      grid-template-columns: 1fr;
    }
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

  details .form,
  details .toggles {
    margin-top: 10px;
  }
`;function mt(e,t){const o={};for(const[e,a]of Object.entries(t))void 0!==a&&""!==a&&(o[e]=a);e.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0}))}function bt(e){const t=function(e,t){if(!e)return[];const o=[];for(const a of Object.values(e.states)){if(!a)continue;const e=a.entity_id.split(".")[0];if(!t.includes(e))continue;const s="string"==typeof a.attributes.friendly_name?a.attributes.friendly_name:"";o.push({id:a.entity_id,label:s?`${s} (${a.entity_id})`:a.entity_id})}return o.sort((e,t)=>e.id.localeCompare(t.id))}(e.hass,e.domains);return K`
    <div class="field">
      <label>${e.labelText}</label>
      <input
        type="text"
        data-field=${e.field}
        list="${e.listId}"
        .value=${e.value}
        @change=${t=>{const o=t.target;e.onChange(o.value.trim()||void 0)}}
      />
      <datalist id="${e.listId}">
        ${t.map(e=>K`<option value="${e.id}">${e.label}</option>`)}
      </datalist>
    </div>
  `}function vt(e){return K`
    <div class="field">
      <label>${e.labelText}</label>
      <select
        data-field=${e.field}
        .value=${e.value}
        @change=${t=>e.onChange(t.target.value)}
      >
        ${e.choices.map(e=>K`<option value=${e.value}>${e.label}</option>`)}
      </select>
    </div>
  `}function _t(e){return K`
    <label class="toggle-item">
      <input
        type="checkbox"
        data-field=${e.field}
        .checked=${e.checked}
        @change=${t=>e.onChange(t.target.checked)}
      />
      <span>${e.labelText}</span>
    </label>
  `}function xt(e){return[{value:"auto",label:e.themeAuto},{value:"dtek_light",label:e.themeDtekLight},{value:"dtek_dark",label:e.themeDtekDark},{value:"kiosk_dark",label:e.themeKioskDark},{value:"oled_black",label:e.themeOledBlack}]}function $t(e){return[{value:"full",label:e.layoutFull},{value:"compact",label:e.layoutCompact},{value:"kiosk",label:e.layoutKiosk}]}function kt(e){return[{value:"auto",label:e.langAuto},{value:"uk",label:"Українська"},{value:"en",label:"English"},{value:"ru",label:"Русский"}]}function Tt(e){return[{value:"auto",label:e.weeklyAuto},{value:"timeline_bars",label:e.weeklyBars},{value:"table",label:e.weeklyTable},{value:"list",label:e.weeklyList}]}function St(e){return[{value:"list",label:e.mobileWeeklyList},{value:"compact_bars",label:e.mobileWeeklyBars}]}function Et(e){return[{value:"compact_empty",label:e.emptyDaysCompact},{value:"hide_unscheduled",label:e.emptyDaysHide},{value:"show_all",label:e.emptyDaysShowAll}]}function At(e){return[{value:"mon_sun",label:e.rowOrderMonSun},{value:"rolling",label:e.rowOrderRolling}]}let Ct=class extends de{constructor(){super(...arguments),this._config={type:"custom:ua-outages-card"}}static{this.styles=wt}setConfig(e){this._config={...e}}_update(e,t){const o={...this._config,[e]:t};this._config=o,mt(this,o)}_entityField(e,t,o,a){const s="string"==typeof this._config[t]?this._config[t]:"";return bt({hass:this.hass,field:String(t),labelText:e,value:s,domains:o,listId:a,onChange:e=>this._update(t,e)})}render(){const e=Te(this._config.language,this.hass?.locale?.language??this.hass?.language),t=Se(e).editor,o=this._config.style??"dtek",a=this._config.view_mode??"daily_only",s=this._config.weekly_view??"auto";return K`
      <div class="form">
        ${this._entityField(t.entity,"entity",["sensor","calendar","binary_sensor"],"ua-primary-list")}
        <div class="field">
          <label>${t.title}</label>
          <input
            type="text"
            data-field="title"
            .value=${this._config.title??""}
            @change=${e=>{const t=e.target;this._update("title",t.value.trim()||void 0)}}
          />
        </div>

        <div class="row-2">
          ${vt({field:"style",labelText:t.style,value:o,choices:[{value:"dtek",label:t.styleDtek},{value:"modern",label:t.styleModern},{value:"timeline",label:t.styleTimeline}],onChange:e=>this._update("style",e)})}
          ${vt({field:"theme",labelText:t.theme,value:this._config.theme??"auto",choices:xt(t),onChange:e=>this._update("theme",e)})}
        </div>

        <div class="row-2">
          ${vt({field:"layout",labelText:t.layout,value:this._config.layout??"full",choices:$t(t),onChange:e=>this._update("layout",e)})}
          ${vt({field:"language",labelText:t.language,value:this._config.language??"auto",choices:kt(t),onChange:e=>this._update("language",e)})}
        </div>

        <div class="row-2">
          ${vt({field:"view_mode",labelText:t.viewMode,value:a,choices:[{value:"daily_only",label:t.viewModeDailyOnly},{value:"switchable",label:t.viewModeSwitchable},{value:"both",label:t.viewModeBoth}],onChange:e=>this._update("view_mode",e)})}
          ${vt({field:"interval_display",labelText:t.intervalDisplay,value:this._config.interval_display??"auto",choices:[{value:"auto",label:t.intervalAuto},{value:"chips",label:t.intervalChips},{value:"text",label:t.intervalText},{value:"both",label:t.intervalBoth},{value:"none",label:t.intervalNone}],onChange:e=>this._update("interval_display",e)})}
        </div>

        ${"modern"===o?vt({field:"modern_grid",labelText:t.modernGrid,value:this._config.modern_grid??"2x12",choices:[{value:"2x12",label:"2×12"},{value:"1x24",label:"1×24"}],onChange:e=>this._update("modern_grid",e)}):G}
        ${"daily_only"!==a?K`
                <div class="row-2">
                  ${"switchable"===a?vt({field:"default_view",labelText:t.defaultView,value:this._config.default_view??"today",choices:[{value:"today",label:Se(e).viewToday},{value:"week",label:Se(e).viewWeek}],onChange:e=>this._update("default_view",e)}):G}
                  ${vt({field:"weekly_view",labelText:t.weeklyView,value:s,choices:Tt(t),onChange:e=>this._update("weekly_view",e)})}
                </div>
                <div class="row-2">
                  ${vt("auto"===s?{field:"mobile_weekly_view",labelText:t.mobileWeeklyView,value:this._config.mobile_weekly_view??"list",choices:St(t),onChange:e=>this._update("mobile_weekly_view",e)}:{field:"row_order",labelText:t.rowOrder,value:this._config.row_order??"mon_sun",choices:At(t),onChange:e=>this._update("row_order",e)})}
                  ${vt({field:"empty_days_mode",labelText:t.emptyDaysMode,value:this._config.empty_days_mode??"compact_empty",choices:Et(t),onChange:e=>this._update("empty_days_mode",e)})}
                </div>
                ${"auto"===s?vt({field:"row_order",labelText:t.rowOrder,value:this._config.row_order??"mon_sun",choices:At(t),onChange:e=>this._update("row_order",e)}):G}
              `:G}

        <details>
          <summary>${t.sectionBattery}</summary>
          <div class="form">
            ${this._entityField(t.batteryEntity,"battery_soc_entity",["sensor"],"ua-battery-list")}
            <div class="row-2">
              ${this._entityField(t.batteryRuntimeEntity,"battery_runtime_entity",["sensor"],"ua-bat-rt-list")}
              <div class="field">
                <label>${t.batteryLowThreshold}</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  data-field="battery_low_threshold"
                  .value=${String(this._config.battery_low_threshold??20)}
                  @change=${e=>{const t=Number(e.target.value);this._update("battery_low_threshold",Number.isFinite(t)?Math.min(99,Math.max(1,t)):void 0)}}
                />
              </div>
            </div>
          </div>
        </details>

        <details open>
          <summary>${t.sectionVisibility}</summary>
          <div class="toggles">
            ${_t({field:"show_header",labelText:t.showHeader,checked:!1!==this._config.show_header,onChange:e=>this._update("show_header",e)})}
            ${_t({field:"show_group_badge",labelText:t.showGroupBadge,checked:!1!==this._config.show_group_badge,onChange:e=>this._update("show_group_badge",e)})}
            ${_t({field:"show_region",labelText:t.showRegion,checked:!1!==this._config.show_region,onChange:e=>this._update("show_region",e)})}
            ${_t({field:"show_connection",labelText:t.showConnection,checked:!1!==this._config.show_connection,onChange:e=>this._update("show_connection",e)})}
            ${_t({field:"show_countdown",labelText:t.showCountdown,checked:!1!==this._config.show_countdown,onChange:e=>this._update("show_countdown",e)})}
            ${_t({field:"show_now_line",labelText:t.showNowLine,checked:!1!==this._config.show_now_line,onChange:e=>this._update("show_now_line",e)})}
            ${_t({field:"show_tomorrow",labelText:t.showTomorrow,checked:!1!==this._config.show_tomorrow,onChange:e=>this._update("show_tomorrow",e)})}
            ${_t({field:"show_intervals_text",labelText:t.showIntervalsText,checked:!1!==this._config.show_intervals_text,onChange:e=>this._update("show_intervals_text",e)})}
            ${_t({field:"show_legend",labelText:t.showLegend,checked:!1!==this._config.show_legend,onChange:e=>this._update("show_legend",e)})}
          </div>
        </details>

        <details>
          <summary>${t.advancedOverrides}</summary>
          <div class="form">
            ${this._entityField(t.calendarEntity,"calendar_entity",["calendar"],"ua-daily-cal-list")}
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
    `}};e([ge({attribute:!1})],Ct.prototype,"hass",void 0),e([ye()],Ct.prototype,"_config",void 0),Ct=e([ce("ua-outages-card-editor")],Ct);let Ot=class extends de{constructor(){super(...arguments),this._config={type:"custom:ua-outages-weekly-card"}}static{this.styles=wt}setConfig(e){this._config={...e}}_update(e,t){const o={...this._config,[e]:t};this._config=o,mt(this,o)}_entityField(e,t,o,a){const s="string"==typeof this._config[t]?this._config[t]:"";return bt({hass:this.hass,field:String(t),labelText:e,value:s,domains:o,listId:a,onChange:e=>this._update(t,e)})}render(){const e=Se(Te(this._config.language,this.hass?.locale?.language??this.hass?.language)).editor,t=this._config.weekly_view??"auto";return K`
      <div class="form">
        ${this._entityField(e.entity,"entity",["calendar","sensor"],"ua-weekly-primary")}

        <div class="field">
          <label>${e.title}</label>
          <input
            type="text"
            data-field="title"
            .value=${this._config.title??""}
            @change=${e=>this._update("title",e.target.value.trim()||void 0)}
          />
        </div>

        <div class="row-2">
          ${vt({field:"weekly_view",labelText:e.weeklyView,value:t,choices:Tt(e),onChange:e=>this._update("weekly_view",e)})}
          ${vt({field:"theme",labelText:e.theme,value:this._config.theme??"auto",choices:xt(e),onChange:e=>this._update("theme",e)})}
        </div>

        <div class="row-2">
          ${vt({field:"layout",labelText:e.layout,value:this._config.layout??"full",choices:$t(e),onChange:e=>this._update("layout",e)})}
          ${vt({field:"language",labelText:e.language,value:this._config.language??"auto",choices:kt(e),onChange:e=>this._update("language",e)})}
        </div>

        <div class="row-2">
          ${vt("auto"===t?{field:"mobile_weekly_view",labelText:e.mobileWeeklyView,value:this._config.mobile_weekly_view??"list",choices:St(e),onChange:e=>this._update("mobile_weekly_view",e)}:{field:"row_order",labelText:e.rowOrder,value:this._config.row_order??"mon_sun",choices:At(e),onChange:e=>this._update("row_order",e)})}
          ${vt({field:"empty_days_mode",labelText:e.emptyDaysMode,value:this._config.empty_days_mode??"compact_empty",choices:Et(e),onChange:e=>this._update("empty_days_mode",e)})}
        </div>

        ${"auto"===t?vt({field:"row_order",labelText:e.rowOrder,value:this._config.row_order??"mon_sun",choices:At(e),onChange:e=>this._update("row_order",e)}):G}

        <details open>
          <summary>${e.sectionVisibility}</summary>
          <div class="toggles">
            ${_t({field:"show_header",labelText:e.showHeader,checked:!1!==this._config.show_header,onChange:e=>this._update("show_header",e)})}
            ${_t({field:"show_group_badge",labelText:e.showGroupBadge,checked:!1!==this._config.show_group_badge,onChange:e=>this._update("show_group_badge",e)})}
            ${_t({field:"show_now_line",labelText:e.showNowLine,checked:!1!==this._config.show_now_line,onChange:e=>this._update("show_now_line",e)})}
            ${_t({field:"show_intervals_text",labelText:e.showIntervalsText,checked:!1!==this._config.show_intervals_text,onChange:e=>this._update("show_intervals_text",e)})}
            ${_t({field:"show_legend",labelText:e.showLegend,checked:!1!==this._config.show_legend,onChange:e=>this._update("show_legend",e)})}
          </div>
        </details>

        <details>
          <summary>${e.advancedOverrides}</summary>
          <div class="form">
            ${this._entityField(e.calendarEntity,"calendar_entity",["calendar"],"ua-wcal-list")}
            ${this._entityField(e.todayEntity,"today_entity",["sensor"],"ua-wtoday-list")}
            ${this._entityField(e.tomorrowEntity,"tomorrow_entity",["sensor"],"ua-wtmr-list")}
            ${this._entityField(e.groupEntity,"group_entity",["sensor"],"ua-wgrp-list")}
            ${this._entityField(e.connectionEntity,"connection_entity",["sensor"],"ua-wconn-list")}
          </div>
        </details>
      </div>
    `}};e([ge({attribute:!1})],Ot.prototype,"hass",void 0),e([ye()],Ot.prototype,"_config",void 0),Ot=e([ce("ua-outages-weekly-card-editor")],Ot);const Mt=[{type:"ua-outages-card",name:"UA Outages Card",description:"Today and tomorrow Ukrainian power outage schedule card with DTEK table and modern tile styles.",preview:!0,documentationURL:"https://github.com/shed-crypto/lovelace-ua-outages-card"},{type:"ua-outages-weekly-card",name:"UA Outages Weekly Card",description:"7x24 weekly power outage schedule matrix in DTEK table style.",preview:!0,documentationURL:"https://github.com/shed-crypto/lovelace-ua-outages-card"}];window.customCards=window.customCards||[];for(const e of Mt)window.customCards.some(t=>t.type===e.type)||window.customCards.push(e);console.info("UA-OUTAGES-CARD 0.1.0 loaded");
