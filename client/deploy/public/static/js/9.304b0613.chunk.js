(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[9],{627:function(e,t,r){"use strict";function c(e,t){if(null==e)return{};var r,c,n=function(e,t){if(null==e)return{};var r,c,n={},a=Object.keys(e);for(c=0;c<a.length;c++)r=a[c],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(c=0;c<a.length;c++)r=a[c],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}r.d(t,"a",(function(){return c}))},628:function(e,t,r){"use strict";r.d(t,"a",(function(){return j}));var c=r(38),n=r(627),a=r(1),s=r.n(a),i=r(626),o=r(20),l=["name","text"],u=function(e){var t=e.name,r=e.text,a=Object(n.a)(e,l),s=t?"https://coreui.io/react/docs/components/".concat(t):e.href;return Object(o.jsx)("div",{className:"card-header-actions",children:Object(o.jsx)(i.db,Object(c.a)(Object(c.a)({},a),{},{href:s,rel:"noreferrer noopener",target:"_blank",className:"card-header-action",children:Object(o.jsx)("small",{className:"text-muted",children:r||"docs"})}))})},j=s.a.memo(u)},629:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var c=r(630);function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],c=!0,n=!1,a=void 0;try{for(var s,i=e[Symbol.iterator]();!(c=(s=i.next()).done)&&(r.push(s.value),!t||r.length!==t);c=!0);}catch(o){n=!0,a=o}finally{try{c||null==i.return||i.return()}finally{if(n)throw a}}return r}}(e,t)||Object(c.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},630:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var c=r(631);function n(e,t){if(e){if("string"===typeof e)return Object(c.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(c.a)(e,t):void 0}}},631:function(e,t,r){"use strict";function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,c=new Array(t);r<t;r++)c[r]=e[r];return c}r.d(t,"a",(function(){return c}))},711:function(e,t,r){"use strict";r.r(t);var c=r(629),n=r(1),a=r.n(n),s=r(626),i=r(632),o=(r(628),r(162)),l=r(20);t.default=function(){var e=a.a.useState(!0),t=Object(c.a)(e,2),r=(t[0],t[1],a.a.useState(!0)),n=Object(c.a)(r,2),u=(n[0],n[1],a.a.useState("")),j=Object(c.a)(u,2),b=(j[0],j[1],a.a.useState("")),d=Object(c.a)(b,2),m=(d[0],d[1],a.a.useState("")),O=Object(c.a)(m,2),h=(O[0],O[1],Object(o.c)((function(e){return e.user.email})));return Object(l.jsx)(s.wb,{children:Object(l.jsx)(s.u,{xs:"12",md:"12",children:Object(l.jsxs)(s.j,{children:[Object(l.jsxs)(s.n,{children:["Add Catagory",Object(l.jsx)("small",{children:" Inventory"})]}),Object(l.jsx)(s.k,{children:Object(l.jsxs)(s.J,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(l.jsxs)(s.K,{row:!0,children:[Object(l.jsx)(s.u,{md:"3",children:Object(l.jsx)(s.cb,{children:"Email"})}),Object(l.jsx)(s.u,{xs:"12",md:"9",children:Object(l.jsx)("p",{className:"form-control-static",children:h&&h})})]}),Object(l.jsxs)(s.K,{row:!0,children:[Object(l.jsx)(s.u,{md:"3",children:Object(l.jsx)(s.cb,{htmlFor:"text-input",children:"Catagory Name"})}),Object(l.jsxs)(s.u,{xs:"12",md:"9",children:[Object(l.jsx)(s.S,{id:"text-input",name:"text-input",placeholder:"Text"}),Object(l.jsx)(s.L,{children:"Catagory Display Name"})]})]}),Object(l.jsxs)(s.K,{row:!0,children:[Object(l.jsx)(s.u,{md:"3",children:Object(l.jsx)(s.cb,{htmlFor:"textarea-input",children:"Catagory Description"})}),Object(l.jsx)(s.u,{xs:"12",md:"9",children:Object(l.jsx)(s.Lb,{name:"textarea-input",id:"textarea-input",rows:"9",placeholder:"Content..."})})]}),Object(l.jsxs)(s.K,{row:!0,children:[Object(l.jsx)(s.u,{tag:"label",sm:"3",className:"col-form-label",children:"In Stock"}),Object(l.jsx)(s.u,{sm:"9",children:Object(l.jsx)(s.Hb,{className:"mr-1",color:"primary",defaultChecked:!0,shape:"pill"})})]}),Object(l.jsxs)(s.K,{row:!0,children:[Object(l.jsx)(s.cb,{col:!0,md:3,children:"Catagory Image (Optional)"}),Object(l.jsxs)(s.u,{xs:"12",md:"9",children:[Object(l.jsx)(s.U,{custom:!0,id:"custom-file-input"}),Object(l.jsx)(s.cb,{htmlFor:"custom-file-input",variant:"custom-file",children:"Choose file..."})]})]})]})}),Object(l.jsxs)(s.l,{children:[Object(l.jsxs)(s.f,{type:"submit",size:"sm",color:"primary",children:[Object(l.jsx)(i.a,{name:"cil-scrubber"})," Submit"]}),Object(l.jsxs)(s.f,{type:"reset",size:"sm",color:"danger",children:[Object(l.jsx)(i.a,{name:"cil-ban"})," Reset"]})]})]})})})}}}]);
//# sourceMappingURL=9.304b0613.chunk.js.map