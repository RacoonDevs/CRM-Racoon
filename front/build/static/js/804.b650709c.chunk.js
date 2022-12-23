"use strict";(self.webpackChunkcrm_racoon=self.webpackChunkcrm_racoon||[]).push([[804],{8507:function(n,e,t){var i,o,r=t(168),a=(t(2791),t(2260)),s=t(184);e.Z=function(n){var e=n.text,t=n.bgColor,i=n.textColor,o=n.onClick,r=n.size,a=n.children;return(0,s.jsxs)(l,{onClick:o,type:"submit",name:"send",textColor:i,bgColor:t,children:[(0,s.jsx)(d,{size:r,children:a}),e||"Button"]})};var l=a.Z.button(i||(i=(0,r.Z)(["\n  background-color: ",";\n  cursor: pointer;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 10px;\n  color: ",";\n  font-weight: bold;\n  max-width: fit-content;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);\n  gap: 10px;\n  white-space: nowrap;\n  transition: 0.2s ease-in-out;\n  &:hover {\n    scale: 1.1;\n  }\n"])),(function(n){return n.bgColor?n.bgColor:"#0063C9"}),(function(n){return n.textColor?n.textColor:"#fff"})),d=a.Z.span(o||(o=(0,r.Z)(["\n  /* width: ",";\n  height: ","; */\n"])),(function(n){return n.size?n.size:"24px"}),(function(n){return n.size?n.size:"24px"}))},808:function(n,e,t){t.d(e,{Z:function(){return p}});var i,o,r,a=t(168),s=(t(2791),t(2260)),l=t(6355),d=t(7278),u=t(184),c=function(n){var e=n.size,t=n.fill;return(0,u.jsx)("svg",{width:null!==e&&void 0!==e?e:"35",height:null!==e&&void 0!==e?e:"35",viewBox:"0 0 35 35",fill:null!==t&&void 0!==t?t:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,u.jsx)("path",{d:"M2.91675 16.0415L13.1251 2.9165V10.2082C30.5565 10.2082 32.5676 24.3219 32.0834 32.0832C31.3513 28.1675 31.0115 21.8748 13.1251 21.8748V29.1665L2.91675 16.0415Z",stroke:"white",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})},x=t(8507),h=t(5116),p=function(n){var e=n.width,t=n.height,i=n.bgColor,o=n.children,r=n.nameSection,a=n._isHeaderButtons,s=n._needCancel,p=n._needSave,v=n._needOptionalButton,b=n._onOptionalButton,Z=n._optionalButtonLabel,j=n._onSave,w=n._onCancel;return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(f,{width:e,height:t,bgColor:i,children:[(0,u.jsxs)("div",{className:"flex justify-between pb-4 ",children:[(0,u.jsx)(g,{children:r?(0,u.jsx)(d.H2,{text:r}):""}),a?(0,u.jsxs)("div",{className:"flex justify-end gap-4 w-full",children:[s&&(0,u.jsx)("div",{children:(0,u.jsx)(x.Z,{bgColor:"#EA5656",text:"Volver",onClick:w,children:(0,u.jsx)(c,{size:20})})}),p&&(0,u.jsx)("div",{children:(0,u.jsx)(x.Z,{text:"Guardar",onClick:j,children:(0,u.jsx)(l.TvB,{})})}),v&&(0,u.jsx)("div",{children:(0,u.jsx)(h.Z,{bgColor:"green",text:Z,onClick:b})})]}):""]}),o]})})},f=s.Z.div(i||(i=(0,a.Z)(["\n  width: ",";\n  min-height: 70vh;\n  height: ",";\n  background-color: ",";\n  box-shadow: 0px 0px 7px 7px rgba(0, 0, 0, 0.1);\n  border-radius: 10px;\n  padding: 10px 30px 30px;\n"])),(function(n){return n.width?n.size:"100%"}),(function(n){return n.height?n.size:"auto"}),(function(n){return n.bgColor?n.bgColor:"#fff"})),g=s.Z.div(o||(o=(0,a.Z)(["\n  padding: 15px 0;\n  width: 50%;\n"])));s.Z.div(r||(r=(0,a.Z)(["\n  padding: 0 0 15px;\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n"])))},6766:function(n,e,t){var i,o,r,a,s=t(168),l=(t(2791),t(2260)),d=(t(732),t(184));e.Z=function(n){var e=n.width,t=n.height,i=n.label,o=n.value,r=n.data,a=n.onChange;return(0,d.jsxs)(u,{children:[(0,d.jsx)(c,{value:o,type:"",width:e,height:t,onChange:a,required:!0,children:r.map((function(n,e){return(0,d.jsx)(h,{value:e,children:n},e)}))}),i?(0,d.jsx)(x,{children:i}):""]})};var u=l.Z.div(i||(i=(0,s.Z)(["\n  width: 100%;\n  min-height: 40px;\n  position: relative;\n"]))),c=l.Z.select(o||(o=(0,s.Z)(["\n  width: ",";\n  height: ",";\n  border: 0;\n  background: #ffffff;\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  font-size: 16px;\n  padding: 8px;\n"])),(function(n){var e;return null!==(e=n.width)&&void 0!==e?e:"100%"}),(function(n){var e;return null!==(e=n.height)&&void 0!==e?e:"35px"})),x=l.Z.label(r||(r=(0,s.Z)(["\n  color: #58585f;\n  font-size: 16px;\n  font-weight: bold;\n  position: absolute;\n  top: -5px;\n  left: 0;\n  padding: 10px 0 10px 10px;\n  pointer-events: none;\n  transition: 0.3s ease-in-out;\n"]))),h=l.Z.option(a||(a=(0,s.Z)(["\n  color: #58585f;\n"])))},7929:function(n,e,t){var i,o,r,a,s=t(168),l=(t(2791),t(2260)),d=(t(732),t(6355)),u=t(184);e.Z=function(n){var e=n.width,t=n.height,i=n.label,o=n.value,r=n.onChange,a=n.isVisible,s=n.setIsVisible,l=n.name;return(0,u.jsxs)(c,{children:[(0,u.jsx)(x,{name:l,value:o,type:a?"text":"password",width:e,height:t,onChange:r,required:!0}),i?(0,u.jsx)(h,{children:i}):"",!a&&(0,u.jsx)(p,{onClick:function(){return s(!a)},children:(0,u.jsx)(d.dSq,{size:20})}),a&&(0,u.jsx)(p,{onClick:function(){return s(!a)},children:(0,u.jsx)(d.tgn,{size:20})})]})};var c=l.Z.div(i||(i=(0,s.Z)(["\n  width: 100%;\n  min-height: 40px;\n  position: relative;\n"]))),x=l.Z.input(o||(o=(0,s.Z)(["\n  width: ",";\n  height: ",";\n  border: 0;\n  background: #ffffff;\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  font-size: 16px;\n  padding: 8px;\n"])),(function(n){var e;return null!==(e=n.width)&&void 0!==e?e:"100%"}),(function(n){var e;return null!==(e=n.height)&&void 0!==e?e:"40px"})),h=l.Z.label(r||(r=(0,s.Z)(["\n  color: #58585f;\n  font-size: 16px;\n  font-weight: bold;\n  position: absolute;\n  top: -5px;\n  left: 0;\n  padding: 10px 0 10px 10px;\n  pointer-events: none;\n  transition: 0.3s ease-in-out;\n"]))),p=l.Z.span(a||(a=(0,s.Z)(["\n  min-width: 30px;\n  height: 100%;\n  fill: #585858;\n  position: absolute;\n  top: -5px;\n  right: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])))},3509:function(n,e,t){var i,o,r,a=t(168),s=(t(2791),t(2260)),l=(t(732),t(184));e.Z=function(n){var e=n.width,t=n.height,i=n.type,o=n.label,r=n.value,a=n.onChange,s=n.name;return(0,l.jsxs)(d,{children:[(0,l.jsx)(u,{name:s,value:r,type:i,width:e,height:t,onChange:a,required:!0}),o?(0,l.jsx)(c,{children:o}):""]})};var d=s.Z.div(i||(i=(0,a.Z)(["\n  width: 100%;\n  min-height: 40px;\n  position: relative;\n"]))),u=s.Z.input(o||(o=(0,a.Z)(["\n  width: ",";\n  height: ",";\n  border: 0;\n  background: #ffffff;\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  font-size: 16px;\n  padding: 8px;\n"])),(function(n){var e;return null!==(e=n.width)&&void 0!==e?e:"100%"}),(function(n){var e;return null!==(e=n.height)&&void 0!==e?e:"40px"})),c=s.Z.label(r||(r=(0,a.Z)(["\n  color: #58585f;\n  font-size: 16px;\n  font-weight: bold;\n  position: absolute;\n  top: -5px;\n  left: 0;\n  padding: 10px 0 10px 10px;\n  pointer-events: none;\n  transition: 0.3s ease-in-out;\n"])))},804:function(n,e,t){t.r(e);var i=t(1413),o=t(885),r=t(2791),a=t(5218),s=t(808),l=t(3509),d=t(6871),u=t(3701),c=t(7929),x=t(9668),h=t(6766),p=t(184);e.default=function(){var n=(0,r.useContext)(u.Z).userData,e=(0,d.s0)(),f=(0,r.useState)(!1),g=(0,o.Z)(f,2),v=g[0],b=g[1],Z=(0,r.useState)(""),j=(0,o.Z)(Z,2),w=j[0],m=j[1],C=(0,r.useState)(!1),k=(0,o.Z)(C,2),_=k[0],z=k[1],y=(0,r.useState)({user_name:"",email:"",password:"",name:"",status:"",created_by:n.datos_sesion.id}),S=(0,o.Z)(y,2),V=S[0],B=S[1],N=function(n){return a.Am.error(n)};return(0,p.jsxs)(s.Z,{_isHeaderButtons:!0,height:"auto",nameSection:"Agregar usuario",_onCancel:function(){return e(-1)},_onSave:function(){b(!0),V.email&&V.name&&V.status&&V.password&&V.user_name?V.password!==w&&(N("Las contrase\xf1as no son iguales"),b(!1)):(N("Todos los campos son obligatorios"),b(!1))},children:[(0,p.jsxs)("div",{className:"justify-center grid grid-cols-1 md:grid-cols-2",children:[(0,p.jsxs)("div",{className:"border-4 rounded-md border-slate-200 p-5 grid gap-5",children:[(0,p.jsx)(l.Z,{label:"Nombre",value:V.name,onChange:function(n){return B((0,i.Z)((0,i.Z)({},V),{},{name:n.target.value}))}}),(0,p.jsx)(l.Z,{label:"Correo electr\xf3nico",value:V.email,onChange:function(n){return B((0,i.Z)((0,i.Z)({},V),{},{email:n.target.value}))}}),(0,p.jsx)(l.Z,{label:"Nombre de usuario",value:V.user_name,onChange:function(n){return B((0,i.Z)((0,i.Z)({},V),{},{user_name:n.target.value}))}}),(0,p.jsx)(h.Z,{data:["Inactivo","Activo"],label:"Estatus",value:V.status,onChange:function(n){return B((0,i.Z)((0,i.Z)({},V),{},{status:n.target.value}))}}),(0,p.jsx)(c.Z,{label:"Contrase\xf1a",value:V.password,onChange:function(n){return B((0,i.Z)((0,i.Z)({},V),{},{password:n.target.value}))},isVisible:_,setIsVisible:z}),(0,p.jsx)(c.Z,{label:"Repetir Contrase\xf1a",value:w,onChange:function(n){return m(n.target.value)},isVisible:_,setIsVisible:z})]}),(0,p.jsx)("div",{className:"flex justify-center",children:(0,p.jsx)("img",{src:t(6046),alt:"create",width:350})})]}),(0,p.jsx)("span",{className:"flex justify-center",children:(0,p.jsx)(x.Z,{color:"#0063C9",size:25,loading:v})}),(0,p.jsx)(a.x7,{})]})}},6046:function(n,e,t){n.exports=t.p+"static/media/img_create.9f8ece16e2fa1d77f34f.png"}}]);
//# sourceMappingURL=804.b650709c.chunk.js.map