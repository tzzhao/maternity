(this.webpackJsonpmaternity=this.webpackJsonpmaternity||[]).push([[0],{68:function(t,e,a){},69:function(t,e,a){},75:function(t,e,a){"use strict";a.r(e);var n=a(32),r=a(0),o=a.n(r),c=a(9),i=a.n(c),s=(a(68),a(69),a(21)),l=a(22),u=a(27),d=a(25),j=a(108),p=a(107),b=a(97),h=a(98),O=a(99),f=a(17),v=a(20),m=a(14),y=a(24);function x(t){var e=new Date(t),a=""+(e.getMonth()+1),n=""+e.getDate(),r=e.getFullYear(),o=""+e.getHours(),c=""+e.getMinutes(),i=""+e.getSeconds();a.length<2&&(a="0"+a),n.length<2&&(n="0"+n),o.length<2&&(o="0"+o),c.length<2&&(c="0"+c),i.length<2&&(i="0"+i);var s=[r,a,n].join("-");return"".concat(s," ").concat(o,":").concat(c,":").concat(i)}var g,D,E=a(7),I=a.n(E),B=a(13),F=a(57),w={BREAST_FEED:"breastFeed",DIAPERS:"diapers",BABY_BOTTLE:"babyBottle"};function S(){return(S=Object(B.a)(I.a.mark((function t(){return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(F.a)("maternity",1,{upgrade:function(t,e,a,n){t.createObjectStore(w.BREAST_FEED,{keyPath:"start"}),t.createObjectStore(w.DIAPERS,{keyPath:"time"}),t.createObjectStore(w.BABY_BOTTLE,{keyPath:"start"})}});case 2:return g=t.sent,t.abrupt("return",g);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function T(){return(T=Object(B.a)(I.a.mark((function t(e){return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:g.put(w.BREAST_FEED,e);case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function k(){return(k=Object(B.a)(I.a.mark((function t(e){return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:g.put(w.DIAPERS,e);case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function M(){return(M=Object(B.a)(I.a.mark((function t(e){return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:g.put(w.BABY_BOTTLE,e);case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function C(){return N.apply(this,arguments)}function N(){return(N=Object(B.a)(I.a.mark((function t(){return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",g.getAll(w.BREAST_FEED));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function R(){return A.apply(this,arguments)}function A(){return(A=Object(B.a)(I.a.mark((function t(){return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",g.getAll(w.BABY_BOTTLE));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function L(){return P.apply(this,arguments)}function P(){return(P=Object(B.a)(I.a.mark((function t(){return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",g.getAll(w.DIAPERS));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(t){t[t.IDLE=0]="IDLE",t[t.FEEDING_R=1]="FEEDING_R",t[t.FEEDING_L=2]="FEEDING_L"}(D||(D={}));var _={data:{},status:D.IDLE,lastStart:void 0};function G(t){!function(t){T.apply(this,arguments)}(t)}var q=Object(y.b)({name:"breastFeed",initialState:_,reducers:{startRightBreastFeeding:function(t){t.status=D.FEEDING_R,t.lastStart=Math.round(Date.now()/1e3)},startLeftBreastFeeding:function(t){t.status=D.FEEDING_L,t.lastStart=Math.round(Date.now()/1e3)},stopBreastFeeding:function(t,e){var a=t.status,n=t.lastStart;if(void 0!==n&&a!==D.IDLE&&void 0!==e.payload){var r={start:n,duration:e.payload,type:a===D.FEEDING_R?"r":"l"};t.data=Object(m.a)(Object(m.a)({},t.data),{},Object(v.a)({},n,r)),G(r)}t.status=D.IDLE,t.lastStart=void 0},loadData:function(t,e){t.data=e.payload}}}),Y=q.actions,Q=q.reducer,J=a(2),U=function(t){Object(u.a)(a,t);var e=Object(d.a)(a);function a(t){var n;return Object(s.a)(this,a),(n=e.call(this,t)).getDuration=function(){var t=n.getNowTime()-n.state.startTime,e=Math.floor(t/60),a=Math.floor(e/60),r=e-60*a,o=t-60*e,c=n.getFormattedTime(a),i=n.getFormattedTime(r),s=n.getFormattedTime(o);return"".concat(c,":").concat(i,":").concat(s)},n.openModal=function(){n.clearInterval();var t=setInterval((function(){n.forceUpdate()}),1e3);n.setState({open:!0,startTime:n.getNowTime(),refreshInterval:t}),"r"===n.props.type?n.props.startRightBreastFeeding():n.props.startLeftBreastFeeding()},n.clearInterval=function(){void 0!==n.state.refreshInterval&&clearInterval(n.state.refreshInterval)},n.saveData=function(){n.clearInterval();var t=n.getNowTime();n.props.stopBreastFeeding(t-n.state.startTime),n.setState({open:!1,refreshInterval:void 0})},n.closeModal=function(){n.clearInterval(),n.setState({open:!1,refreshInterval:void 0}),n.props.stopBreastFeeding(void 0)},n.getNowTime=function(){return Math.round(Date.now()/1e3)},n.getFormattedTime=function(t){return t<10?"0".concat(t):t},n.state={open:!1,startTime:0,refreshInterval:void 0},n}return Object(l.a)(a,[{key:"render",value:function(){var t="r"===this.props.type?"droit":"gauche";return Object(J.jsxs)(J.Fragment,{children:[Object(J.jsxs)(j.a,{variant:"outlined",color:"primary",onClick:this.openModal,children:["Sein ",t]}),Object(J.jsxs)(p.a,{open:this.state.open,onClose:this.closeModal,children:[Object(J.jsxs)(b.a,{children:["Sein ",t]}),Object(J.jsx)(h.a,{children:this.getDuration()}),Object(J.jsxs)(O.a,{children:[Object(J.jsx)(j.a,{autoFocus:!0,variant:"contained",onClick:this.saveData,color:"primary",children:"Fini!"}),Object(J.jsx)(j.a,{autoFocus:!0,onClick:this.closeModal,color:"secondary",children:"Annuler"})]})]})]})}}]),a}(r.Component),W=Y,H=Object(f.b)(void 0,W)(U);function $(t){!function(t){k.apply(this,arguments)}(t)}var z,K=Object(y.b)({name:"Diaper",initialState:{data:{}},reducers:{logPeeDiaper:function(t){var e=Math.round(Date.now()/1e3),a={time:e,type:"p"};t.data=Object(m.a)(Object(m.a)({},t.data),{},Object(v.a)({},e,a)),$(a)},logStollDiaper:function(t){var e=Math.round(Date.now()/1e3),a={time:e,type:"s"};t.data=Object(m.a)(Object(m.a)({},t.data),{},Object(v.a)({},e,a)),$(a)},loadData:function(t,e){t.data=e.payload}}}),V=K.actions,X=K.reducer,Z=function(t){Object(u.a)(a,t);var e=Object(d.a)(a);function a(t){var n;return Object(s.a)(this,a),(n=e.call(this,t)).openModal=function(){n.setState({open:!0})},n.logPee=function(){n.props.logPeeDiaper(),n.closeModal()},n.logStool=function(){n.props.logStollDiaper(),n.closeModal()},n.closeModal=function(){n.setState({open:!1})},n.state={open:!1},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(J.jsxs)(J.Fragment,{children:[Object(J.jsx)(j.a,{variant:"outlined",color:"primary",onClick:this.openModal,children:"Couche"}),Object(J.jsxs)(p.a,{open:this.state.open,onClose:this.closeModal,children:[Object(J.jsx)(b.a,{children:"Couche"}),Object(J.jsxs)(O.a,{children:[Object(J.jsx)(j.a,{autoFocus:!0,onClick:this.logPee,variant:"contained",color:"primary",children:"Pipi"}),Object(J.jsx)(j.a,{autoFocus:!0,onClick:this.logStool,variant:"contained",color:"primary",children:"Caca"}),Object(J.jsx)(j.a,{autoFocus:!0,onClick:this.closeModal,variant:"contained",color:"secondary",children:"Annuler"})]})]})]})}}]),a}(r.Component),tt=V,et=Object(f.b)(void 0,tt)(Z),at=a(110),nt=a(109),rt=a(100),ot=a(111);!function(t){t[t.IDLE=0]="IDLE",t[t.FEEDING=1]="FEEDING"}(z||(z={}));var ct={data:{},status:z.IDLE,lastStart:void 0};function it(t){!function(t){M.apply(this,arguments)}(t)}var st=Object(y.b)({name:"babyBottle",initialState:ct,reducers:{startBabyBottle:function(t){t.status=z.FEEDING,t.lastStart=Math.round(Date.now()/1e3)},stopBabyBottle:function(t,e){var a=t.status,n=t.lastStart;if(void 0!==n&&a!==z.IDLE&&void 0!==e.payload){var r=e.payload,o={start:n,duration:r.duration,quantity:r.quantity};t.data=Object(m.a)(Object(m.a)({},t.data),{},Object(v.a)({},n,o)),it(o)}t.status=z.IDLE,t.lastStart=void 0},loadData:function(t,e){t.data=e.payload}}}),lt=st.actions,ut=st.reducer,dt="bottleQuantity";var jt=function(t){Object(u.a)(a,t);var e=Object(d.a)(a);function a(t){var n;return Object(s.a)(this,a),(n=e.call(this,t)).handleChange=function(t){var e=Number(t.target.value);NaN===e&&(e=n.state.quantity),n.setState({quantity:e}),function(t){localStorage.setItem(dt,t.toString())}(e)},n.getDuration=function(){var t=n.getNowTime()-n.state.startTime,e=Math.floor(t/60),a=Math.floor(e/60),r=e-60*a,o=t-60*e,c=n.getFormattedTime(a),i=n.getFormattedTime(r),s=n.getFormattedTime(o);return"".concat(c,":").concat(i,":").concat(s)},n.openModal=function(){n.clearInterval();var t=setInterval((function(){n.forceUpdate()}),1e3);n.setState({open:!0,startTime:n.getNowTime(),refreshInterval:t}),n.props.startBabyBottle()},n.clearInterval=function(){void 0!==n.state.refreshInterval&&clearInterval(n.state.refreshInterval)},n.saveData=function(){n.clearInterval();var t=n.getNowTime();n.props.stopBabyBottle({duration:t-n.state.startTime,quantity:n.state.quantity}),n.setState({open:!1,refreshInterval:void 0})},n.closeModal=function(){n.clearInterval(),n.setState({open:!1,refreshInterval:void 0}),n.props.stopBabyBottle(void 0)},n.getNowTime=function(){return Math.round(Date.now()/1e3)},n.getFormattedTime=function(t){return t<10?"0".concat(t):t},n.state={open:!1,startTime:0,refreshInterval:void 0,quantity:Number(localStorage.getItem(dt)||"0")},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(J.jsxs)(J.Fragment,{children:[Object(J.jsx)(j.a,{variant:"outlined",color:"primary",onClick:this.openModal,children:"Biberon"}),Object(J.jsxs)(p.a,{open:this.state.open,onClose:this.closeModal,children:[Object(J.jsx)(b.a,{children:"Biberon"}),Object(J.jsxs)(h.a,{children:[Object(J.jsx)("div",{children:this.getDuration()}),Object(J.jsxs)(at.a,{children:[Object(J.jsx)(nt.a,{value:this.state.quantity,onChange:this.handleChange,endAdornment:Object(J.jsx)(rt.a,{position:"end",children:"mL"}),type:"number"}),Object(J.jsx)(ot.a,{children:"Quantit\xe9"})]})]}),Object(J.jsxs)(O.a,{children:[Object(J.jsx)(j.a,{autoFocus:!0,variant:"contained",onClick:this.saveData,color:"primary",children:"Fini!"}),Object(J.jsx)(j.a,{autoFocus:!0,onClick:this.closeModal,color:"secondary",children:"Annuler"})]})]})]})}}]),a}(r.Component),pt=lt,bt=Object(f.b)(void 0,pt)(jt),ht=a(47),Ot=a(101),ft=a(96),vt=a(102),mt=a(103),yt=a(104),xt=a(105),gt=a(106),Dt=function(t){Object(u.a)(a,t);var e=Object(d.a)(a);function a(){return Object(s.a)(this,a),e.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return Object(J.jsx)(Ot.a,{component:ft.a,children:Object(J.jsxs)(vt.a,{"aria-label":"simple table",children:[Object(J.jsx)(mt.a,{children:Object(J.jsxs)(yt.a,{children:[Object(J.jsx)(xt.a,{children:"Date"}),Object(J.jsx)(xt.a,{children:"Type"}),Object(J.jsx)(xt.a,{children:"Dur\xe9e"}),Object(J.jsx)(xt.a,{children:"Qt\xe9"}),Object(J.jsx)(xt.a,{})]})}),Object(J.jsx)(gt.a,{children:this.renderRows()})]})})}},{key:"renderRows",value:function(){var t=this,e=[].concat(Object(ht.a)(Object.values(this.props.babyBottle)),Object(ht.a)(Object.values(this.props.breastFeed)),Object(ht.a)(Object.values(this.props.diaper)));return e.sort((function(t,e){var a=t.start||t.time;return(e.start||e.time)-a})),e.map((function(e){return e.time?t.renderDiaperRow(e):e.quantity?t.renderBabyBottleRow(e):t.renderBreastFeedRow(e)}))}},{key:"renderBreastFeedRow",value:function(t){return Object(J.jsxs)(yt.a,{children:[Object(J.jsx)(xt.a,{children:x(1e3*t.start)}),Object(J.jsxs)(xt.a,{children:["Sein ","l"===t.type?"(G)":"(D)"]}),Object(J.jsxs)(xt.a,{children:[t.duration,"s"]}),Object(J.jsx)(xt.a,{}),Object(J.jsx)(xt.a,{})]})}},{key:"renderDiaperRow",value:function(t){return Object(J.jsxs)(yt.a,{children:[Object(J.jsx)(xt.a,{children:x(1e3*t.time)}),Object(J.jsxs)(xt.a,{children:["Couche (","p"===t.type?"P":"C",")"]}),Object(J.jsx)(xt.a,{}),Object(J.jsx)(xt.a,{}),Object(J.jsx)(xt.a,{})]})}},{key:"renderBabyBottleRow",value:function(t){return Object(J.jsxs)(yt.a,{children:[Object(J.jsx)(xt.a,{children:x(1e3*t.start)}),Object(J.jsx)(xt.a,{children:"Biberon"}),Object(J.jsxs)(xt.a,{children:[t.duration,"s"]}),Object(J.jsx)(xt.a,{children:t.quantity}),Object(J.jsx)(xt.a,{})]})}}]),a}(r.PureComponent),Et=Object(f.b)((function(t){return{babyBottle:t.babyBottle.data,breastFeed:t.breastFeed.data,diaper:t.diaper.data}}))(Dt);function It(){return Object(J.jsxs)("div",{className:"App",children:[Object(J.jsx)("header",{className:"App-header"}),Object(J.jsxs)("div",{className:"actions",children:[Object(J.jsx)(H,{type:"l"}),Object(J.jsx)(H,{type:"r"}),Object(J.jsx)(bt,{}),Object(J.jsx)(et,{})]}),Object(J.jsx)("div",{children:Object(J.jsx)(Et,{})})]})}var Bt=Object(y.a)({reducer:{babyBottle:ut,breastFeed:Q,diaper:X}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ft(t,e){var a={};return t.forEach((function(t){a[t[e]]=t})),a}(function(){return S.apply(this,arguments)})().then((function(){Promise.all([R(),C(),L()]).then((function(t){var e=Object(n.a)(t,3),a=e[0],r=e[1],o=e[2];console.log(a,r,o),Bt.dispatch(lt.loadData(Ft(a,"start"))),Bt.dispatch(Y.loadData(Ft(r,"start"))),Bt.dispatch(V.loadData(Ft(o,"time")))}))})),i.a.render(Object(J.jsx)(o.a.StrictMode,{children:Object(J.jsx)(f.a,{store:Bt,children:Object(J.jsx)(It,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[75,1,2]]]);
//# sourceMappingURL=main.0574af44.chunk.js.map