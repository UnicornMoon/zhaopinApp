import{a as o}from"./user.21f8ebd6.js";import{d as n,r as c,c as r,a as _,b as i,F as l,T as m,o as p,g as f,_ as d}from"./index.b59b35ee.js";import"./request.9fb191dc.js";const g=["innerHTML"],v=n({__name:"serviceAgree",setup(u){const t=c({htmlText:""}),a=()=>history.back();return(async()=>{const e=await o({id:17});e?t.htmlText=e.records[0].content:m(e.msg)})(),(e,h)=>{const s=f("van-nav-bar");return p(),r(l,null,[_(s,{title:"\u670D\u52A1\u534F\u8BAE","left-text":"","left-arrow":"",onClickLeft:a}),i("div",{class:"text-agree",innerHTML:t.htmlText},null,8,g)],64)}}});const C=d(v,[["__scopeId","data-v-f589f205"]]);export{C as default};
