(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},$={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:a,d:o,D:d,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},_="en",y={};y[_]=m;var g=function(t){return t instanceof D},b=function t(e,n,i){var s;if(!e)return _;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;y[a]=e,s=a}return!i&&s&&(_=s),s||!i&&_},M=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},w=$;w.l=b,w.i=g,w.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function m(t){this.$L=b(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(h);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return w},v.isValid=function(){return!(this.$d.toString()===f)},v.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return M(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<M(t)},v.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,c=!!w.u(e)||e,f=w.p(t),h=function(t,e){var i=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},p=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,$=this.$D,_="set"+(this.$u?"UTC":"");switch(f){case u:return c?h(1,0):h(31,11);case l:return c?h(1,v):h(0,v+1);case a:var y=this.$locale().weekStart||0,g=(m<y?m+7:m)-y;return h(c?$-g:$+(6-g),v);case o:case d:return p(_+"Hours",0);case r:return p(_+"Minutes",1);case s:return p(_+"Seconds",2);case i:return p(_+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var a,c=w.p(t),f="set"+(this.$u?"UTC":""),h=(a={},a[o]=f+"Date",a[d]=f+"Date",a[l]=f+"Month",a[u]=f+"FullYear",a[r]=f+"Hours",a[s]=f+"Minutes",a[i]=f+"Seconds",a[n]=f+"Milliseconds",a)[c],p=c===o?this.$D+(e-this.$W):e;if(c===l||c===u){var m=this.clone().set(d,1);m.$d[h](p),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[w.p(t)]()},v.add=function(n,c){var d,f=this;n=Number(n);var h=w.p(c),p=function(t){var e=M(f);return w.w(e.date(e.date()+Math.round(t*n)),f)};if(h===l)return this.set(l,this.$M+n);if(h===u)return this.set(u,this.$y+n);if(h===o)return p(1);if(h===a)return p(7);var m=(d={},d[s]=t,d[r]=e,d[i]=1e3,d)[h]||1,v=this.$d.getTime()+n*m;return w.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},d=function(t){return w.s(r%12||12,t,"0")},h=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:w.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:w.s(r,2,"0"),h:d(1),hh:d(2),a:h(r,o,!0),A:h(r,o,!1),m:String(o),mm:w.s(o,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(p,(function(t,e){return e||m[t]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,d,f){var h,p=w.p(d),m=M(n),v=(m.utcOffset()-this.utcOffset())*t,$=this-m,_=w.m(this,m);return _=(h={},h[u]=_/12,h[l]=_,h[c]=_/3,h[a]=($-v)/6048e5,h[o]=($-v)/864e5,h[r]=$/e,h[s]=$/t,h[i]=$/1e3,h)[p]||$,f?_:w.a(_)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return y[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},v.clone=function(){return w.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),T=D.prototype;return M.prototype=T,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,D,M),t.$i=!0),M},M.locale=b,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=y[_],M.Ls=y,M.p={},M}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:a,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof _},f=function(t,e,n){return new _(t,n,e.$l)},h=function(t){return e.p(t)+"s"},p=function(t){return t<0},m=function(t){return p(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},$=function(t,e){return t?p(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},_=function(){function p(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return f(t*u[h(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[h(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(c);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=p.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*u[n]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/a),t%=a,this.$d.months=m(t/l),t%=l,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/s),t%=s,this.$d.minutes=m(t/i),t%=i,this.$d.seconds=m(t/n),t%=n,this.$d.milliseconds=t},v.toISOString=function(){var t=$(this.$d.years,"Y"),e=$(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=$(n,"D"),s=$(this.$d.hours,"H"),r=$(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=$(o,"S"),l=t.negative||e.negative||i.negative||s.negative||r.negative||a.negative,c=s.format||r.format||a.format?"T":"",u=(l?"-":"")+"P"+t.format+e.format+i.format+c+s.format+r.format+a.format;return"P"===u||"-P"===u?"P0D":u},v.toJSON=function(){return this.toISOString()},v.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,e){return e||String(i[t])}))},v.as=function(t){return this.$ms/u[h(t)]},v.get=function(t){var e=this.$ms,n=h(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?m(e/u[n]):this.$d[n],0===e?0:e},v.add=function(t,e,n){var i;return i=e?t*u[h(e)]:d(t)?t.$ms:f(t,this).$ms,f(this.$ms+i*(n?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return f(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},p}();return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return f(t,{$l:n},e)},s.isDuration=d;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(t,e){return d(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return d(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}}()},181:function(t){t.exports=function(){"use strict";return function(t,e,n){var i=function(t,e){if(!e||!e.length||!e[0]||1===e.length&&!e[0].length)return null;var n;1===e.length&&e[0].length>0&&(e=e[0]),n=e[0];for(var i=1;i<e.length;i+=1)e[i].isValid()&&!e[i][t](n)||(n=e[i]);return n};n.max=function(){var t=[].slice.call(arguments,0);return i("isAfter",t)},n.min=function(){var t=[].slice.call(arguments,0);return i("isBefore",t)}}}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}var i=n(484),s=n.n(i),r=n(181),o=n.n(r),a=n(646),l=n.n(a);const c="D MMM",u="HH:mm",d="DD/MM/YY[&nbsp;]HH:mm",f=["everything","future","present","past"],h=f[0],p=["day","event","time","price","offers"],m=p[0],v=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];function $(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function _(t,e){return t?s()(t).format(e):""}s().extend(o()),s().extend(l());const y=(t,e)=>t.find((t=>t.type===e));function g(t,e){return Array.isArray(e)?t.filter((t=>e.find((e=>t.id===e)))):t.find((t=>t.id===e))}function b(t,e,n){return`<section class="trip-main__trip-info  trip-info">\n        <div class="trip-info__main">\n          <h1 class="trip-info__title">${function(t,e){const n=((t,e=[])=>e.length>0?[...new Set(e.map((e=>t.find((t=>e.destination===t.id)))).map((t=>t.name)))]:[...new Set(t.map((t=>t.name)))])(e,t);return n.length>3?`${n.at(0)} &mdash;...&mdash; ${n.at(-1)}`:n.join(" &mdash; ")}(t,n)}</h1>\n\n          <p class="trip-info__dates">${i=t,_(s().min(i.map((t=>s()(t.dateFrom)))),c)}&nbsp;&mdash;&nbsp;${(t=>_(s().max(t.map((t=>s()(t.dateTo)))),c))(t)}</p>\n        </div>\n\n        <p class="trip-info__cost">\n          Total: &euro;&nbsp;<span class="trip-info__cost-value">${((t,e)=>{const n=t.map((t=>t.basePrice)).reduce(((t,e)=>t+e),0),i=t.map((t=>t.offers)).flat(1/0);return n+e.map((t=>t.offers)).flat().filter((t=>i.find((e=>e===t.id)))).map((t=>t.price)).reduce(((t,e)=>t+e),0)})(t,e)}</span>\n        </p>\n      </section>`;var i}class M{constructor({points:t,offers:e,destinations:n}){this.points=t,this.offers=e,this.destinations=n}getTemplate(){return b(this.points,this.offers,this.destinations)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class w{getTemplate(){return`<form class="trip-filters" action="#" method="get">\n      ${f.map((t=>function(t){return`<div class="trip-filters__filter">\n      <input id="filter-${t}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${t}" ${h===t?"checked":""}>\n      <label class="trip-filters__filter-label" for="filter-${t}">${t}</label>\n    </div>`}(t))).join("")}\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>`}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class D{getTemplate(){return`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      ${p.map((t=>{return`<div class="trip-sort__item  trip-sort__item--${e=t}">\n      <input id="sort-${e}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${e}" ${m===e?"checked":""}>\n      <label class="trip-sort__btn" for="sort-${e}">${e}</label>\n    </div>`;var e})).join("")}\n    </form>`}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class T{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class S{constructor({point:t,offers:e,destinations:n}){this.point=t,this.offers=e,this.destinations=n}getTemplate(){return function(t,e,n){const{type:i,dateFrom:r,dateTo:o,isFavorite:a,basePrice:l,offers:c,destination:d}=t,f=g(n,d),{name:h}=f,p=g(y(e,i).offers,c);return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime=${r}>${_(r,"MMM DD")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${i} ${h}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime=${r}>${_(r,u)}</time>\n            &mdash;\n            <time class="event__end-time" datetime=${o}>${_(o,u)}</time>\n          </p>\n          <p class="event__duration">${function(t,e){const n=s()(e).diff(t);return n<36e5?s().duration(n).format("mm[M]"):n<864e5?s().duration(n).format("HH[H] mm[M]"):s().duration(n).format("DD[D] HH[H] mm[M]")}(r,o)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${l}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${p.map((t=>function({title:t,price:e}){return`<li class="event__offer">\n        <span class="event__offer-title">${t}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${e}</span>\n    </li>`}(t))).join("")}\n        </ul>\n        <button class="event__favorite-btn ${a&&"event__favorite-btn--active"}" onclick="this.classList.toggle('event__favorite-btn--active')" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class C{constructor({point:t,offers:e,destinations:n}){this.point=t,this.offers=e,this.destinations=n}getTemplate(){return function(t,e,n){const{id:i,type:s,dateFrom:r,dateTo:o,basePrice:a,offers:l,destination:c}=t,u=y(e,s),f=g(n,c),{name:h}=f;return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-${i}">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${s}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${i}" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n\n                ${v.map((t=>function(t,e,n){return`<div class="event__type-item">\n      <input id="event-type-${t}-${n}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${e===t?"checked":""}>\n      <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-${n}">${i=t,i.charAt(0).toUpperCase()+i.substring(1)}</label>\n    </div>`;var i}(t,s,i))).join("")}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-${i}">\n              ${s}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-${i}" type="text" name="event-destination" value='${h}' list="destination-list-${i}">\n            <datalist id="destination-list-${i}">\n              ${n.map((t=>`<option value=${t.name}></option>`))}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-${i}">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-${i}" type="text" name="event-start-time" value=${_(r,d)}>\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-${i}">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-${i}" type="text" name="event-end-time" value=${_(o,d)}>\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-${i}">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-${i}" type="text" name="event-price" value=${a}>\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Delete</button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </header>\n        <section class="event__details">\n          ${function({offers:t},e){return 0!==t.length?`<section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n        <div class="event__available-offers">\n          ${t.map((t=>function(t,e){const{id:n,title:i,price:s}=t;return`<div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id=${n} type="checkbox" name=${n} ${e.includes(n)?"checked":""}>\n      <label class="event__offer-label" for=${n}>\n        <span class="event__offer-title">${i}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${s}</span>\n      </label>\n    </div>`}(t,e))).join("")}\n        </div>\n      </section>`:""}(u,l)}\n          ${function(t){const{description:e,pictures:n}=t||{};return e.length>0||n.length>0?`<section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">${e}</p>\n\n        ${function(t){return t.length>0?`<div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${t.map((({src:t,description:e})=>`<img class="event__photo" src=${t} alt=${e}>`)).join("")}\n        </div>\n      </div>`:""}(n)}\n      </section>`:""}(f)}\n        </section>\n      </form>\n    </li>`}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const x=[{id:"d-1",description:"Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.",name:"Amsterdam",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/1.jpg",description:"Amsterdam beautiful place"},{src:"https://22.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Amsterdam old city"}]},{id:"d-2",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/6.jpg",description:"Chamonix parliament building"},{src:"https://22.objects.htmlacademy.pro/static/destinations/5.jpg",description:"Chamonix old city"},{src:"https://22.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Chamonix beautiful place"}]},{id:"d-3",description:"Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.",name:"Geneva",pictures:[]}],O=[{type:"taxi",offers:[{id:"of-01",title:"Upgrade to a business class",price:$(5,400)},{id:"of-02",title:"Choose the radio station",price:$(5,400)},{id:"of-03",title:"Choose temperature",price:$(5,400)}]},{type:"bus",offers:[{id:"of-04",title:"Infotainment system",price:$(5,400)},{id:"of-05",title:"Order meal",price:$(5,400)},{id:"of-06",title:"Choose seats",price:$(5,400)}]},{type:"train",offers:[{id:"of-07",title:"Book a taxi at the arrival point",price:$(5,400)},{id:"of-08",title:"Order a breakfast",price:$(5,400)},{id:"of-09",title:"Wake up at a certain time",price:$(5,400)}]},{type:"flight",offers:[{id:"of-10",title:"Choose meal",price:$(5,400)},{id:"of-11",title:"Choose seats",price:117},{id:"of-12",title:"Upgrade to comfort class",price:$(5,400)},{id:"of-13",title:"Upgrade to business class",price:$(5,400)},{id:"of-14",title:"Add luggage",price:$(5,400)},{id:"of-15",title:"Business lounge",price:$(5,400)}]},{type:"check-in",offers:[{id:"of-16",title:"Choose the time of check-in",price:$(5,400)},{id:"of-17",title:"Choose the time of check-out",price:$(5,400)},{id:"of-18",title:"Add breakfast",price:$(5,400)},{id:"of-19",title:"Laundry",price:$(5,400)},{id:"of-20",title:"Order a meal from the restaurant",price:$(5,400)}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"of-21",title:"Choose meal",price:$(5,400)},{id:"of-22",title:"Choose seats",price:$(5,400)},{id:"of-23",title:"Upgrade to comfort class",price:$(5,400)},{id:"of-24",title:"Upgrade to business class",price:$(5,400)}]},{type:"drive",offers:[{id:"of-25",title:"With automatic transmission",price:$(5,400)},{id:"of-26",title:"With air conditioning",price:$(5,400)}]},{type:"restaurant",offers:[{id:"of-27",title:"Choose live music",price:$(5,400)},{id:"of-28",title:"Choose VIP area",price:$(5,400)}]}];function k(t){return function(t){const e=$(0,t.length-1);return t.slice(0,e)}(function(t){for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}(y(O,t).offers.map((t=>t.id))))}const H=[{id:"p-01",basePrice:$(10,1e3),dateFrom:"2024-09-18T10:30:00.845Z",dateTo:"2024-09-18T11:00:00.000Z",destination:"d-1",isFavorite:!!$(0,1),offers:k("taxi"),type:"taxi"},{id:"p-02",basePrice:$(10,1e3),dateFrom:"2024-09-18T12:25:00.000Z",dateTo:"2024-09-18T13:35:00.000Z",destination:"d-2",isFavorite:!!$(0,1),offers:k("flight"),type:"flight"},{id:"p-03",basePrice:$(10,1e3),dateFrom:"2024-09-18T14:30:00.000Z",dateTo:"2024-09-18T16:05:00.000Z",destination:"d-2",isFavorite:!!$(0,1),offers:k("drive"),type:"drive"},{id:"p-04",basePrice:$(10,1e3),dateFrom:"2024-09-18T16:20:00.000Z",dateTo:"2024-09-18T17:00:00.000Z",destination:"d-2",isFavorite:!!$(0,1),offers:k("check-in"),type:"check-in"},{id:"p-05",basePrice:$(10,1e3),dateFrom:"2024-09-19T13:00:00.000Z",dateTo:"2024-09-19T14:20:00.000Z",destination:"d-2",isFavorite:!!$(0,1),offers:k("sightseeing"),type:"sightseeing"},{id:"p-07",basePrice:$(10,1e3),dateFrom:"2024-09-19T16:00:00.000Z",dateTo:"2024-09-19T17:00:00.000Z",destination:"d-2",isFavorite:!!$(0,1),offers:k("bus"),type:"bus"},{id:"p-08",basePrice:$(10,1e3),dateFrom:"2024-09-19T18:00:00.000Z",dateTo:"2024-09-19T19:00:00.000Z",destination:"d-3",isFavorite:!!$(0,1),offers:k("train"),type:"train"},{id:"p-09",basePrice:$(10,1e3),dateFrom:"2024-09-20T08:25:00.000Z",dateTo:"2024-09-20T09:25:00.000Z",destination:"d-3",isFavorite:!!$(0,1),offers:k("restaurant"),type:"restaurant"},{id:"p-10",basePrice:$(10,1e3),dateFrom:"2024-09-20T08:25:00.000Z",dateTo:"2024-09-20T09:25:00.000Z",destination:"d-3",isFavorite:!!$(0,1),offers:k("ship"),type:"ship"}],F=document.querySelector(".trip-main"),Y=document.querySelector(".trip-controls__filters"),L=document.querySelector(".trip-events"),P=new class{#t=[];#e=[];#n=[];init(){this.#t=function(){const t=Array.from({length:0});for(;t.length<8;){const n=(e=H)[Math.floor(Math.random()*e.length)];t.includes(n)||t.push(n)}var e;return t}(),this.#e=O,this.#n=x}getPoints(){return this.#t}getOffers(){return this.#e}getDestinations(){return this.#n}};P.init();const j=new class{pointListView=new T;sortListView=new D;filterListView=new w;constructor({infoContainer:t,filterContainer:e,tripContainer:n,tripModel:i}){this.infoContainer=t,this.filterContainer=e,this.tripContainer=n,this.tripModel=i}init(){const t=this.tripModel.getPoints(),n=this.tripModel.getOffers(),i=this.tripModel.getDestinations();this.tripPoint=[...t],e(new M({points:t,offers:n,destinations:i}),this.infoContainer,"afterbegin"),e(this.filterListView,this.filterContainer),e(this.sortListView,this.tripContainer),e(this.pointListView,this.tripContainer),e(new C({point:this.tripPoint[0],offers:n,destinations:i}),this.pointListView.getElement());for(let t=1;t<this.tripPoint.length;t++)e(new S({point:this.tripPoint[t],offers:n,destinations:i}),this.pointListView.getElement())}}({infoContainer:F,filterContainer:Y,tripContainer:L,tripModel:P});j.init()})()})();
//# sourceMappingURL=bundle.a41865ff8cfcd1001f12.js.map