import{m as d}from"./message.d763201b.js";import{d as f,c as s,a as r,b as t,F as _,k as y,l as g,o,f as c,t as a,e as k,g as l,_ as v}from"./index.b59b35ee.js";import"./message.76d98fe8.js";import"./request.9fb191dc.js";const B=c("\u70B9\u51FB\u67E5\u770B >"),L=f({__name:"systemList",setup(x){const u=()=>history.back(),n=d();return n.getSystemMessageList(),(F,h)=>{const i=l("van-nav-bar"),m=l("router-link");return o(),s(_,null,[r(i,{title:"\u7CFB\u7EDF\u6D88\u606F","left-arrow":"",onClickLeft:u}),t("dl",null,[(o(!0),s(_,null,y(g(n).systemMessageList,(e,p)=>(o(),s("dt",{key:p},[t("h3",null,[c(a(e.title),1),t("span",null,a(e.specific_time),1)]),t("p",null,a(e.content),1),r(m,{to:"/message/systemDetails/"+e.id},{default:k(()=>[B]),_:2},1032,["to"])]))),128))])],64)}}});const N=v(L,[["__scopeId","data-v-92e35942"]]);export{N as default};