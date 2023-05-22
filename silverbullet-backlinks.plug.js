var mod=(()=>{var d=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var M=Object.getOwnPropertyNames;var Z=Object.prototype.hasOwnProperty;var l=(e,t)=>{for(var n in t)d(e,n,{get:t[n],enumerable:!0})},W=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of M(t))!Z.call(e,s)&&s!==n&&d(e,s,{get:()=>t[s],enumerable:!(o=G(t,s))||o.enumerable});return e};var O=e=>W(d({},"__esModule",{value:!0}),e);var Ze={};l(Ze,{functionMapping:()=>B});function f(e){let t=atob(e),n=t.length,o=new Uint8Array(n);for(let s=0;s<n;s++)o[s]=t.charCodeAt(s);return o}function P(e){let t=e.split(",",2)[1];return f(t)}function R(e,t){return syscall("sandboxFetch.fetch",e,t)}function k(){globalThis.fetch=async function(e,t){let n=await R(e,t&&{method:t.method,headers:t.headers,body:t.body});return new Response(n.base64Body?f(n.base64Body):null,{status:n.status,headers:n.headers})}}typeof Deno>"u"&&(self.Deno={args:[],build:{arch:"x86_64"},env:{get(){}}});var x=new Map,y=0;function u(e){self.postMessage(e)}self.syscall=async(e,...t)=>await new Promise((n,o)=>{y++,x.set(y,{resolve:n,reject:o}),u({type:"sys",id:y,name:e,args:t})});function h(e,t){self.addEventListener("message",n=>{(async()=>{let o=n.data;switch(o.type){case"inv":{let s=e[o.name];if(!s)throw new Error(`Function not loaded: ${o.name}`);try{let i=await Promise.resolve(s(...o.args||[]));u({type:"invr",id:o.id,result:i})}catch(i){console.error(i),u({type:"invr",id:o.id,error:i.message})}}break;case"sysr":{let s=o.id,i=x.get(s);if(!i)throw Error("Invalid request id");x.delete(s),o.error?i.reject(new Error(o.error)):i.resolve(o.result)}break}})().catch(console.error)}),u({type:"manifest",manifest:t})}k();var m={};l(m,{readAsset:()=>F});var c=self.syscall;async function F(e,t="utf8"){let n=await c("asset.readAsset",e);switch(t){case"utf8":return new TextDecoder().decode(P(n));case"dataurl":return n}}var a={};l(a,{confirm:()=>ie,dispatch:()=>oe,downloadFile:()=>Q,filterBox:()=>$,flashNotification:()=>J,getCurrentPage:()=>Y,getCursor:()=>E,getSelection:()=>H,getText:()=>z,getUiOption:()=>ae,hidePanel:()=>_,insertAtCursor:()=>ne,insertAtPos:()=>ee,moveCursor:()=>re,navigate:()=>U,openUrl:()=>q,prompt:()=>se,reloadPage:()=>V,replaceRange:()=>te,save:()=>N,setPage:()=>T,setSelection:()=>S,setUiOption:()=>ce,showPanel:()=>X,vimEx:()=>le});typeof self>"u"&&(self={syscall:()=>{throw new Error("Not implemented here")}});var r=self.syscall;function Y(){return r("editor.getCurrentPage")}function T(e){return r("editor.setPage",e)}function z(){return r("editor.getText")}function E(){return r("editor.getCursor")}function H(){return r("editor.getSelection")}function S(e,t){return r("editor.setSelection",e,t)}function N(){return r("editor.save")}function U(e,t,n=!1,o=!1){return r("editor.navigate",e,t,n,o)}function V(){return r("editor.reloadPage")}function q(e){return r("editor.openUrl",e)}function Q(e,t){return r("editor.downloadFile",e,t)}function J(e,t="info"){return r("editor.flashNotification",e,t)}function $(e,t,n="",o=""){return r("editor.filterBox",e,t,n,o)}function X(e,t,n,o=""){return r("editor.showPanel",e,t,n,o)}function _(e){return r("editor.hidePanel",e)}function ee(e,t){return r("editor.insertAtPos",e,t)}function te(e,t,n){return r("editor.replaceRange",e,t,n)}function re(e,t=!1){return r("editor.moveCursor",e,t)}function ne(e){return r("editor.insertAtCursor",e)}function oe(e){return r("editor.dispatch",e)}function se(e,t=""){return r("editor.prompt",e,t)}function ie(e){return r("editor.confirm",e)}function ae(e){return r("editor.getUiOption",e)}function ce(e,t){return r("editor.setUiOption",e,t)}function le(e){return r("editor.vimEx",e)}var p={};l(p,{batchSet:()=>ue,clearPageIndex:()=>Pe,clearPageIndexForPage:()=>ye,del:()=>pe,deletePrefixForPage:()=>xe,get:()=>me,query:()=>fe,queryPrefix:()=>de,set:()=>ge});function ge(e,t,n){return r("index.set",e,t,n)}function ue(e,t){return r("index.batchSet",e,t)}function me(e,t){return r("index.get",e,t)}function pe(e,t){return r("index.delete",e,t)}function de(e){return r("index.queryPrefix",e)}function fe(e){return r("index.query",e)}function ye(e){return r("index.clearPageIndexForPage",e)}function xe(e,t){return r("index.deletePrefixForPage",e,t)}function Pe(){return r("index.clearPageIndex")}var g={};l(g,{del:()=>Ae,get:()=>Ce,set:()=>we});function we(e,t){return r("store.set",e,t)}function Ce(e){return r("store.get",e)}function Ae(e){return r("store.delete",e)}var v="showBacklinks";async function b(){let e=await I();if(await g.set(v,!e),e)await a.hidePanel("lhs");else{let t=await a.getCurrentPage();await A(t)}}async function w(){let e=await a.getCurrentPage();await A(e)}async function C(e){if(e.length===0){console.log("no page name supplied, ignoring navigation");return}let[t,n]=e.split("@");console.log(`navigating to ${e}`),await a.navigate(t,+n)}var Ie=`
  function processClick(e) {
    let pageName = e.currentTarget.getAttribute('data-page');
    if (!pageName) {
      console.log('no page value for:');
      console.log(e);
      pageName = '';
    }
    removeListeners();
    // send an event so the navigation happens internally preventing a full page reload
    sendEvent('backlink:navigateTo', pageName);
  }

  function getLinks() {
    return Array.from(document.getElementsByTagName('li'));
  }
  // remove listeners once we are done
  function removeListeners() {
    const links = getLinks();
    links.forEach((item) => item.removeEventListener('click', processClick));
  }

  // make li tags clickable
  const linkList = getLinks();
  linkList.forEach((item) => item.addEventListener('click', processClick));
`;async function A(e){if(await I()){let t=await Be(e),n=await m.readAsset("style.css"),o=t.length===0?"No links found":Ge(t);await a.showPanel("lhs",.5,`<html><head><style>${n}</style></head><body>
        <h2>Backlinks</h2>
        <ul>
        ${o}
        </ul>
        </body></html>`,Ie)}}async function I(){return!!await g.get(v)}async function Be(e){return(await p.queryPrefix(`pl:${e}:`)).map(({page:o,key:s})=>{let[,,i]=s.split(":");return`${o}@${i}`})}function Ge(e){return e.map(n=>`<li data-page="${n}">\u{1F587}\uFE0F&nbsp;<span class="wiki-link">[[</span><span class="wiki-link-page">${n}</span><span class="wiki-link">]]</span></li>`).join("")}var B={toggle:b,updateBacklinks:w,navigateTo:C},Me={name:"silverbullet-backlinks",version:.3,assets:{"style.css":{data:"data:text/css;base64,Ym9keSB7CiAgZm9udC1mYW1pbHk6IGdlb3JnaWEsdGltZXMsc2VyaWY7CiAgZm9udC1zaXplOiAxNHB0OwogIHdpZHRoOiAxMDAlOwogIG1hcmdpbi1sZWZ0OiBhdXRvOwogIG1hcmdpbi1yaWdodDogYXV0bzsKICBwYWRkaW5nLWxlZnQ6IDIwcHg7CiAgcGFkZGluZy1yaWdodDogMjBweDsKfQoKdGFibGUgewogIHdpZHRoOiAxMDAlOwogIGJvcmRlci1zcGFjaW5nOiAwOwp9Cgp1bCB7CiAgbWFyZ2luLWxlZnQ6IDA7CiAgcGFkZGluZy1sZWZ0OiAwOwp9CgpsaSB7CiAgbGlzdC1zdHlsZTogbm9uZTsKfQoKdGhlYWQgdHIgewogICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzsKICAgIGNvbG9yOiAjZWVlOwp9Cgp0aCwgdGQgewogICAgcGFkZGluZzogOHB4Owp9Cgp0Ym9keSB0cjpudGgtb2YtdHlwZShldmVuKSB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNmM2YzOwp9CgphW2hyZWZdIHsKICB0ZXh0LWRlY29yYXRpb246IG5vbmU7Cn0KCmJsb2NrcXVvdGUgewogIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzMzMzsKICBtYXJnaW4tbGVmdDogMnB4OwogIHBhZGRpbmctbGVmdDogMTBweDsKfQoKaHIgewogICAgbWFyZ2luOiAxZW0gMCAxZW0gMDsKICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgIGJvcmRlci1jb2xvcjogIzc3NzsKICAgIGJvcmRlci13aWR0aDogMDsKICAgIGJvcmRlci1zdHlsZTogZG90dGVkOwp9CgpocjphZnRlciB7CiAgICBjb250ZW50OiAiwrfCt8K3IjsKICAgIGxldHRlci1zcGFjaW5nOiAxZW07Cn0KCnNwYW4ud2lraS1saW5rIHsKCiAgY3Vyc29yOiBwb2ludGVyOwogIGNvbG9yOiAjYThhYmJkOwp9CgpzcGFuLndpa2ktbGluay1wYWdlIHsKICBjb2xvcjogIzAzMzBjYjsKICBjdXJzb3I6IHBvaW50ZXI7CiAgYmFja2dyb3VuZC1jb2xvcjogIzRkOGRmZjEyOwogIGJvcmRlci1yYWRpdXM6IDVweDsKICBwYWRkaW5nOiAwIDVweDsKfQ==",mtime:1684754788632}},functions:{toggle:{path:"./backlinks.ts:toggleBacklinks",command:{name:"Show Backlinks for current page",key:"ctrl-shift-b",mac:"Cmd-shift-b"}},updateBacklinks:{path:"./backlinks.ts:updateBacklinks",env:"client",events:["plug:load","editor:pageLoaded"]},navigateTo:{path:"./backlinks.ts:navigateTo",events:["backlink:navigateTo"]}}};h(B,Me);return O(Ze);})();
