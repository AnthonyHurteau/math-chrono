(self.webpackChunkmath_chrono=self.webpackChunkmath_chrono||[]).push([[733,515],{9515:function(e,t,n){"use strict";n.r(t),n.d(t,{chalkboard:function(){return d},dashboard:function(){return m},default:function(){return h}});var r=n(2791),o=n(6445),i=n(1889),a=n(2455),s=n(1979),c=n(821),l=n(8290),u=n(184),d="chalkboard",m="dashboard",p=(0,a.Z)((function(e){return{baseContainer:function(e){var t=e.isMobile,n=e.pxHeight;return{padding:"2% calc(2% - 10px) 2% 2%",marginTop:"5%",height:null!==n&&void 0!==n?n:"calc(100vh - ".concat(t?90:140,"px)")}},chalkboardContainer:{background:e.palette.chalkboard.background,backgroundAttachment:"local",color:"white",border:"solid",borderColor:"black",borderRadius:e.shape.borderRadius,borderImage:"url(".concat("/math-chrono","/wood.png) 200 / 12px"),borderImageOutset:"8px",overflow:"auto",boxShadow:"0 8px 16px 0 rgba(0,0,0,0.7)",transition:"0.5s","&:hover":{boxShadow:"0 12px 24px 0 rgba(0,0,0,0.7)"},"&::-webkit-scrollbar, & *::-webkit-scrollbar":{background:e.palette.chalkboard.background},"&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner":{background:e.palette.chalkboard.background}},dashboardContainer:{marginTop:"0 !important"}}}));function h(e){var t=e.isMobile,n=e.isForm,a=e.component,d=e.componentType,h=e.pxHeight,x=p({isMobile:t,pxHeight:h}),f=(0,s.Z)((0,l.Z)("dark")),g=(0,r.useCallback)((function(e){return n?e.formWrapper(e.children):e.children}),[n]);return(0,u.jsx)(c.Z,{theme:f,children:(0,u.jsx)(o.Z,{className:"container",children:(0,u.jsxs)(i.ZP,{container:!0,justifyContent:"center",alignItems:"center",children:[(0,u.jsx)(i.ZP,{item:!0,xs:0,sm:2}),(0,u.jsx)(i.ZP,{item:!0,sm:8,children:(0,u.jsx)(g,{formWrapper:function(e){return(0,u.jsx)("form",{children:e})},children:(0,u.jsx)(i.ZP,{container:!0,justifyContent:"center",alignItems:"center",className:"".concat(x.baseContainer," ").concat(d===m?x.dashboardContainer:x.chalkboardContainer),children:a})})}),(0,u.jsx)(i.ZP,{item:!0,xs:0,sm:2})]})})})}},9203:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Q}});var r=n(9439),o=n(2791),i=n(7762),a=n(1279);function s(e,t){return e.isTables?function(e,t){var n="",r=e.tablesSelection.filter((function(t){return t.value&&t.label<=e.tablesMaximum})),o=r[u(0,r.length-1)].label,i=c(e.negativeNumbers,e.tablesMaximum),s=l(t);"*"===s?n=o+s+i:"/"===s&&(n=(0,a.ku)(o+"*"+i)+s+o);return n}(e,t):e.isTables?void 0:function(e,t){for(var n="",r=0;r<e.operands;r++){n+=c(e.negativeNumbers,e.maximum),r<e.operands-1&&(n+=l(t))}return n=function(e,t,n){var r=n;(isNaN((0,a.ku)(n))||(0,a.ku)(n)===1/0)&&(r=s(e,t));(0,a.ku)(n)%1!==0&&(r=s(e,t));!e.negativeNumbers&&(0,a.ku)(n)<0&&(r=s(e,t));return r}(e,t,n),n}(e,t)}function c(e,t){var n;return e?(n=u(1,t).toString(),1===u(0,2)&&(n="(-"+n+")")):e||(n=u(1,t).toString()),n}function l(e){return e[u(0,Number(e.length)-1)]}function u(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1)+e)}function d(e){return e=(e=(e=(e=(e=e.replaceAll("+"," + ")).replaceAll("-"," - ")).replaceAll("( - ","(-")).replaceAll("*"," x ")).replaceAll("/"," \xf7 ")}var m=n(5547),p=n(4767),h=n(4554),x=n(1889),f=n(6151),g=n(890),b=n(2455),j=n(184),v="150px",w="50px",Z=(0,b.Z)((function(e){return{root:function(e){return{position:"relative",height:e?v:w,width:e?v:w}},rootCircle:{fill:"none",stroke:"none"},rootPathElapsed:{strokeWidth:"7px",stroke:e.palette.primary.main},rootLabel:function(e){return{position:"absolute",height:e?v:w,width:e?v:w,top:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"48px"}},rootPathRemaining:{strokeWidth:"7px",strokeLinecap:"round",transform:"rotate(90deg)",transformOrigin:"center",transition:"1s linear all",stroke:"currentcolor"},green:{color:e.palette.success.main},orange:{color:"orange"},red:{color:e.palette.error.main},rootSvg:{transform:"scaleX(-1)"}}}));function k(e){var t=e.start,n=e.end,i=e.timeLimit,a=e.timeLeft,s=e.setTimeLeft,c=e.isMdPlus,l=Z(c),u=Math.floor(i/3),d=Math.floor(i/6),m=(0,o.useMemo)((function(){return{info:{color:"green"},warning:{color:"orange",threshold:u},alert:{color:"red",threshold:d}}}),[u,d]),p=(0,o.useState)(m.info.color),h=(0,r.Z)(p,2),x=h[0],f=h[1],g=(0,o.useState)(283),b=(0,r.Z)(g,2),v=b[0],w=b[1],k=(0,o.useRef)(!1),C=(0,o.useRef)(null),S=(0,o.useRef)(0),T=(0,o.useCallback)((function(){var e=a/i;return e-1/i*(1-e)}),[a,i]),N=(0,o.useCallback)((function(){var e="".concat((283*T()).toFixed(0)," 283");w(e)}),[T]),y=(0,o.useCallback)((function(){var e=m.alert,t=m.warning;a<=e.threshold?f(e.color):a<=t.threshold&&f(t.color)}),[a,m]),M=(0,o.useCallback)((function(){k.current=!0,C.current=setInterval((function(){S.current++,s(a-S.current)}),1e3)}),[s,a]);return(0,o.useEffect)((function(){N(),y(a),(0===a&&k.current||n)&&(clearInterval(C.current),k.current=!1)}),[a,n,N,y]),(0,o.useEffect)((function(){t&&!k.current&&a>0&&!n&&M()}),[t,a,n,M]),(0,j.jsxs)("div",{className:l.root,children:[c?(0,j.jsx)("svg",{className:l.rootSvg,viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",children:(0,j.jsxs)("g",{className:l.rootCircle,children:[(0,j.jsx)("circle",{className:l.rootPathElapsed,cx:"50",cy:"50",r:"45"}),(0,j.jsx)("path",{id:"base-timer-path-remaining",strokeDasharray:v,className:"".concat(l.rootPathRemaining," ").concat(l[x]),d:" M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0 "})]})}):null,(0,j.jsx)("span",{id:"base-timer-label",className:l.rootLabel,children:function(e){var t=Math.floor(e/60),n=e%60;return n<10&&(n="0".concat(n)),"".concat(t,":").concat(n)}(a)})]})}var C=n(3168),S=n(3504),T=n(7482),N=(0,b.Z)((function(e){return{root:{position:"sticky",top:"-3%",padding:"2%",zIndex:2,width:"100%"},flexCenter:{display:"flex",justifyContent:"center"},rowPadding:{paddingTop:"3%"},stickyPadding:{paddingBottom:"3%"},progressIndicator:{fontSize:"36px"}}}));function y(e){var t=e.params,n=e.operations,i=e.start,a=e.countdonwnStart,s=e.setCountdownStart,c=e.countdownEnded,l=e.timeLimit,u=e.timeLeft,d=e.setTimeLeft,m=e.setOpenCompletedDialog,p=e.end,b=e.setEnd,v=e.progress,w=e.isMobile,Z=e.isMdPlus,y=N(),M=(0,C.$)(),E=(0,r.Z)(M,1)[0];return(0,j.jsx)(h.Z,{className:y.root,children:(0,j.jsxs)(x.ZP,{container:!0,justifyContent:"space-around",alignItems:"center",children:[(0,j.jsxs)(x.ZP,{xs:12,md:4,item:!0,order:{xs:2,sm:1},className:y.stickyPadding,children:[w&&t.isTime?null:(0,j.jsxs)("span",{className:y.progressIndicator,children:[n.filter((function(e){return e.answer})).length,"/",n.length]}),(0,j.jsx)(T.Z,{color:"primary",variant:"determinate",value:v})]}),t.isTime?(0,j.jsx)(x.ZP,{item:!0,xs:12,md:4,order:{xs:1,sm:3},className:y.flexCenter+" "+y.stickyPadding,children:(0,j.jsx)(k,{start:i,end:p,timeLimit:l,timeLeft:u,setTimeLeft:d,isMdPlus:Z})}):null,(0,j.jsx)(x.ZP,{item:!0,xs:12,md:4,order:{xs:3,sm:2},className:(w?y.rowPadding:"")+" "+y.stickyPadding,children:p?(0,j.jsx)(o.Fragment,{children:(0,j.jsx)(f.Z,{variant:"contained",component:S.rU,to:"/params",color:"primary",children:(0,j.jsx)(g.Z,{children:E("math.back")})})}):i&&c&&!p?(0,j.jsx)(f.Z,{variant:"contained",color:"error",onClick:function(){b(!0),m(!0)},children:(0,j.jsx)(g.Z,{color:"black",children:E("math.done")})}):(0,j.jsx)(f.Z,{variant:"contained",color:"success",onClick:function(){a||s(!0)},children:(0,j.jsx)(g.Z,{children:E("math.start")})})})]})})}var M=n(9515),E=n(6125),P=n(3208),A=(0,b.Z)((function(e){return{root:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:3,fontSize:200}}}));function L(e){var t=e.countdonwnStart,n=e.setCountdownEnded,i=A(),a=(0,o.useState)(),s=(0,r.Z)(a,2),c=s[0],l=s[1];return(0,o.useEffect)((function(){t&&l(0)}),[t]),(0,j.jsxs)("div",{className:i.root,children:[(0,j.jsx)(P.Z,{in:0===c,timeout:500,onEnter:function(){setTimeout((function(){l(null)}),1e3)},onExited:function(){return l(1)},unmountOnExit:!0,children:(0,j.jsx)("div",{children:"3"})}),(0,j.jsx)(P.Z,{in:1===c,timeout:500,onEnter:function(){setTimeout((function(){l(null)}),1e3)},onExited:function(){return l(2)},unmountOnExit:!0,children:(0,j.jsx)("div",{children:"2"})}),(0,j.jsx)(P.Z,{in:2===c,timeout:500,onEnter:function(){setTimeout((function(){l(null)}),1e3)},onExited:function(){return l(3)},unmountOnExit:!0,children:(0,j.jsx)("div",{children:"1"})}),(0,j.jsx)(P.Z,{in:3===c,timeout:500,onEnter:function(){setTimeout((function(){l(null)}),1e3)},onExited:function(){return n(!0)},unmountOnExit:!0,children:(0,j.jsx)("div",{children:"GO!"})})]})}var O=n(1413),R=n(5931),D=n(3542),F=n(195),I=n(7123),z=o.forwardRef((function(e,t){return(0,j.jsx)(R.Z,(0,O.Z)({direction:"up",ref:t},e))})),B=(0,b.Z)((function(e){return{root:{textAlign:"center"},rightAnswers:{fontSize:"28px",color:e.palette.success.main},totalOperations:{fontSize:"28px",color:e.palette.primary.main}}}));function H(e){var t=e.openCompletedDialog,n=e.setOpenCompletedDialog,i=e.operations,a=e.totalTime,s=e.isTime,c=B(),l=(0,C.$)().i18n,u=(0,C.$)(),d=(0,r.Z)(u,1)[0],m=function(){n(!1)};return(0,j.jsx)("div",{children:(0,j.jsxs)(D.Z,{open:t,TransitionComponent:z,keepMounted:!0,onClose:m,"aria-describedby":"completed-dialog",children:[(0,j.jsxs)(F.Z,{className:c.root,children:[(0,j.jsx)(g.Z,{color:"primary",sx:{fontSize:"36px"},children:d("completed.title")}),(0,j.jsx)("p",{children:d("completed.result")}),(0,j.jsxs)("p",{children:[d("completed.resultText1")," ",function(){var e=i.filter((function(e){return e.isRightAnswer})).length,t="fr"===l.language?e<=1:1===e;return(0,j.jsxs)(o.Fragment,{children:[(0,j.jsxs)("span",{className:c.rightAnswers,children:[e," "]}),d(t?"completed.resultText2singular":"completed.resultText2plural")]})}()," ",d("completed.resultText3")," ",(0,j.jsx)("span",{className:c.totalOperations,children:i.length}),s?null:"!"]}),s?(0,j.jsxs)("p",{children:[d("completed.resultText4")," ",(0,j.jsx)("span",{className:c.rightAnswers,children:function(){var e=function(e){var t=Math.floor(e/3600),n=e%3600,r=Math.floor(n/60),o=n%60,i=Math.ceil(o);return{hours:t,minutes:r,seconds:i}}(a);return(e.hours>0?"".concat(e.hours," ").concat(e.hours>1?d("completed.hours"):d("completed.hour")," "):"")+(e.minutes>0?"".concat(e.minutes," ").concat(e.minutes>1?d("completed.minutes"):d("completed.minute")," "):"")+"".concat(e.seconds," ").concat(e.seconds>1?d("completed.seconds"):d("completed.second"))}()}),"!"]}):null,(0,j.jsx)(g.Z,{color:"primary",sx:{fontSize:"36px"},children:function(){var e=i.filter((function(e){return e.isRightAnswer})).length*(100/i.length);return 100===e?d("completed.done5"):e>=80?d("completed.done4"):e>=60?d("completed.done3"):e>=40?d("completed.done2"):e<40?d("completed.done1"):void 0}()})]}),(0,j.jsx)(I.Z,{children:(0,j.jsx)(f.Z,{variant:"outlined",color:"primary",onClick:m,children:(0,j.jsx)(g.Z,{children:"Ok"})})})]})})}var W=n(7391),$=n(2065),q=n(9877),_=n(627),G=n(1672),K=(0,b.Z)((function(e){return{operation:{paddingBottom:"15px",display:"flex",alignItems:"baseline"},answerBox:{position:"relative",display:"flex",alignItems:"center",borderRadius:e.shape.borderRadius,transition:"2s",padding:"5px"},rightAnswer:{backgroundColor:(0,$.Fq)(e.palette.success.main,.3)},wrongAnswer:{backgroundColor:(0,$.Fq)(e.palette.error.main,.3)},textFieldBox:{width:"90px",flex:"0 0 auto"},answerFabContainer:{position:"absolute",top:0,right:0},negativeFab:{position:"absolute",right:"10px",bottom:"60px"}}}));function U(e){var t=e.operations,n=e.operationAnswer,i=e.timeLeft,a=e.end,s=e.params,c=e.isMobile,l=e.openCompletedDialog,u=K(),d=(0,G.u)(),m=(0,C.$)(),p=(0,r.Z)(m,1)[0],f=(0,o.useState)(0),g=(0,r.Z)(f,2),b=g[0],v=g[1],w=(0,o.useRef)([]);return(0,j.jsx)("form",{children:(0,j.jsxs)(x.ZP,{container:!0,justifyContent:"space-around",alignItems:"center",spacing:2,className:u.rowPadding,children:[t.map((function(e,t){return(0,j.jsx)(x.ZP,{item:!0,className:u.operation,children:(0,j.jsxs)(h.Z,{className:!l&&a?e.isRightAnswer?u.answerBox+" "+u.rightAnswer:u.answerBox+" "+u.wrongAnswer:u.answerBox,children:[(0,j.jsx)(h.Z,{children:e.operationText}),(0,j.jsx)(h.Z,{children:"\xa0=\xa0"}),(0,j.jsx)(h.Z,{className:u.textFieldBox,children:(0,j.jsx)(W.Z,{id:"input-"+t,label:p("params.numberLabel"),disabled:0===i||a,type:"number",variant:"outlined",color:"primary",inputRef:function(e){w.current[t]=e,e&&b===t&&e.focus()},onKeyPress:function(e){!function(e){"enter"===e.key.toLowerCase()&&(v(b+1),e.preventDefault())}(e)},onFocus:function(e){v(t),n(e.target.value,t)},onChange:function(e){n(e.target.value,t)}})}),(0,j.jsx)(_.Z,{in:!l&&a&&!e.isRightAnswer,timeout:1e3,children:(0,j.jsx)(h.Z,{className:u.answerFabContainer,children:(0,j.jsx)(q.Z,{variant:"extended",sx:{backgroundColor:d.palette.success.main},size:"small","aria-label":"answer",children:e.rightAnswer})})})]})},"operation-"+t)})),(0,j.jsx)(_.Z,{in:s.negativeNumbers&&s.negativeButtonMobile&&c&&!(0===i||a),timeout:1e3,children:(0,j.jsx)(h.Z,{className:u.negativeFab,children:(0,j.jsx)(q.Z,{color:"secondary","aria-label":"negative",sx:{fontSize:"48px",fontWeight:"bold"},onClick:function(){return function(){var e=w.current[b],t=e.value;e.value=Number(t?-1*t:-1),e.focus()}()},children:"-"})})})]})})}var X=(0,b.Z)((function(e){return{text:function(e){return{fontSize:e?"32px":"56px"}},start:function(e){return{fontSize:e?"42px":"64px",transform:"rotate(-5deg)",paddingTop:"20px"}}}}));function J(e){var t=e.isMobile,n=e.params,i=e.operations,a=e.operationAnswer,s=e.countdonwnStart,c=e.countdownEnded,l=e.setCountdownEnded,u=e.start,d=e.end,m=e.timeLimit,p=e.timeLeft,x=e.openCompletedDialog,f=e.setOpenCompletedDialog,g=e.correctedOperations,b=X(t),v=(0,C.$)(),w=(0,r.Z)(v,1)[0];return(0,j.jsxs)(o.Fragment,{children:[(0,j.jsx)(L,{countdonwnStart:s,setCountdownEnded:l}),(0,j.jsx)(_.Z,{in:!u&&!s,timeout:t?1500:700,unmountOnExit:!0,children:(0,j.jsxs)(h.Z,{children:[(0,j.jsx)("span",{className:b.text,children:w("math.text1")}),(0,j.jsx)("br",{}),(0,j.jsx)(h.Z,{className:"".concat(b.text," ").concat(b.start),children:w("math.start")}),(0,j.jsx)("br",{}),(0,j.jsx)("span",{className:b.text,children:w("math.text2")})]})}),(0,j.jsx)(E.Z,{in:u&&c,timeout:t?1500:700,children:(0,j.jsx)(U,{operations:i,operationAnswer:a,timeLeft:p,end:d,params:n,isMobile:t,openCompletedDialog:x})}),(0,j.jsx)(H,{openCompletedDialog:x,setOpenCompletedDialog:f,operations:g,totalTime:m-p,isTime:n.isTime})]})}function Q(e){var t=e.isMobile,n=e.isMdPlus,c=e.params,l=(0,o.useState)((function(){return function(e){for(var t=function(e){var t=[];return e.addition&&!e.isTables&&t.push("+"),e.substraction&&!e.isTables&&t.push("-"),(!e.isTables&&e.multiplication||e.isTables&&e.tablesMultiplication)&&t.push("*"),(!e.isTables&&e.division||e.isTables&&e.tablesDivision)&&t.push("/"),t}(e),n=[],r=0;r<e.amount;r++){var o=s(e,t);n.push({id:r+1,operation:o,operationText:d(o)})}return n}(c)})),u=(0,r.Z)(l,1)[0],h=(0,o.useState)([]),x=(0,r.Z)(h,2),f=x[0],g=x[1],b=(0,o.useState)(0),v=(0,r.Z)(b,2),w=v[0],Z=v[1],k=(0,o.useState)(!1),C=(0,r.Z)(k,2),S=C[0],T=C[1],N=(0,o.useState)(!1),E=(0,r.Z)(N,2),P=E[0],A=E[1],L=(0,o.useState)(!1),O=(0,r.Z)(L,2),R=O[0],D=O[1],F=function(e){var t=new Date(e),n=t.getHours(),r=t.getMinutes(),o=t.getSeconds();return(0,m.Z)(n)+(0,p.Z)(r)+o}(c.time),I=(0,o.useState)(F),z=(0,r.Z)(I,2),B=z[0],H=z[1],W=(0,o.useState)(!1),$=(0,r.Z)(W,2),q=$[0],_=$[1],G=(0,o.useState)(!1),K=(0,r.Z)(G,2),U=K[0],X=K[1],Q=100/u.length;return(0,o.useEffect)((function(){R&&T(!0)}),[R]),(0,o.useEffect)((function(){U&&g(function(e){var t,n=(0,i.Z)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;null===r.answer||""===r.answer?r.isRightAnswer=!1:(0,a.ku)(r.operation)===Number(r.answer)?r.isRightAnswer=!0:r.isRightAnswer=!1,r.rightAnswer=(0,a.ku)(r.operation)}}catch(o){n.e(o)}finally{n.f()}return e}(u))}),[U,u]),(0,j.jsxs)(o.Fragment,{children:[(0,j.jsx)(M.default,{componentType:M.dashboard,pxHeight:"".concat(t?140:190,"px"),component:(0,j.jsx)(y,{params:c,operations:u,start:S,countdonwnStart:P,setCountdownStart:A,countdownEnded:R,timeLimit:F,timeLeft:B,setTimeLeft:H,setOpenCompletedDialog:_,end:U,setEnd:X,progress:w,isMobile:t,isMdPlus:n})}),(0,j.jsx)(M.default,{pxHeight:"calc(100vh - ".concat(t?240:330,"px)"),component:(0,j.jsx)(J,{isMobile:t,params:c,operations:u,operationAnswer:function(e,t){u[t].answer=e,function(){var e=u.filter((function(e){return e.answer})).length;Z(e*Q)}()},countdonwnStart:P,countdownEnded:R,setCountdownEnded:D,start:S,end:U,timeLimit:F,timeLeft:B,openCompletedDialog:q,setOpenCompletedDialog:_,correctedOperations:f})})]})}},5042:function(){}}]);
//# sourceMappingURL=733.1d3c2f4b.chunk.js.map