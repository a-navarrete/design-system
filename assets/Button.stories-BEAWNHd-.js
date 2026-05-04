import{fn as u}from"./index-DgAF9SIF.js";import{j as y}from"./jsx-runtime-D_zvdyIk.js";import"./index-CtOEgLBf.js";import"./_commonjsHelpers-CqkleIqs.js";const m=({label:p,primary:d=!0,className:g,...l})=>{const c=d?"button--primary":"button--secondary";return y.jsx("button",{type:"button",className:["button",c,g].filter(Boolean).join(" "),...l,children:p})};m.__docgenInfo={description:"Primary UI component for user interaction",methods:[],displayName:"Button",props:{label:{required:!0,tsType:{name:"string"},description:""},primary:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const v={title:"Example/Button",component:m,parameters:{layout:"centered",design:{type:"figma",url:"https://www.figma.com/design/iJ8gvICLXnbsh9ple9rogK/Design-Systems?node-id=2-5&m=dev"}},tags:["autodocs"],argTypes:{label:{control:"text"},primary:{control:"boolean"}},args:{onClick:u()}},e={args:{primary:!0,label:"Button"},parameters:{design:{type:"figma",url:"https://www.figma.com/design/iJ8gvICLXnbsh9ple9rogK/Design-Systems?node-id=2-5&m=dev"}}},r={args:{primary:!1,label:"Button"},parameters:{design:{type:"figma",url:"https://www.figma.com/design/iJ8gvICLXnbsh9ple9rogK/Design-Systems?node-id=2-5&m=dev"}}};var t,n,s;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    primary: true,
    label: 'Button'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/iJ8gvICLXnbsh9ple9rogK/Design-Systems?node-id=2-5&m=dev'
    }
  }
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var a,o,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    primary: false,
    label: 'Button'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/iJ8gvICLXnbsh9ple9rogK/Design-Systems?node-id=2-5&m=dev'
    }
  }
}`,...(i=(o=r.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const S=["Primary","Secondary"];export{e as Primary,r as Secondary,S as __namedExportsOrder,v as default};
