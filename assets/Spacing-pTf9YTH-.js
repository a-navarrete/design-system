import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as o}from"./index-DS8uCHcH.js";import"./index-xvgGumKd.js";import{M as c}from"./DocsRenderer-CFRXHY34-CupgAxYb.js";import"./index-fQJKFw6H.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preview-BDDuEFiS.js";import"./iframe-DU8AAoKg.js";import"./react-18-BvTtOSAe.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function p(s){const e={br:"br",code:"code",div:"div",h1:"h1",h2:"h2",p:"p",strong:"strong",...o(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(c,{title:"Tokens/Spacing"}),`
`,n.jsx(e.h1,{id:"spacing",children:"Spacing"}),`
`,n.jsxs(e.p,{children:["12 stops on a 4-point grid, pixel-numbered. Names mirror Figma's ",n.jsx(e.code,{children:"space/*"})," variables — ",n.jsx(e.code,{children:"var(--spacing-16)"})," is 16px both places."]}),`
`,n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px",marginTop:"24px"},children:[{name:"spacing-0",px:0},{name:"spacing-2",px:2},{name:"spacing-4",px:4},{name:"spacing-8",px:8},{name:"spacing-12",px:12},{name:"spacing-16",px:16},{name:"spacing-20",px:20},{name:"spacing-24",px:24},{name:"spacing-32",px:32},{name:"spacing-40",px:40},{name:"spacing-48",px:48},{name:"spacing-64",px:64}].map(({name:i,px:a})=>n.jsxs(e.div,{style:{display:"flex",alignItems:"center",gap:"16px"},children:[n.jsxs(e.div,{style:{width:"120px",fontFamily:"JetBrains Mono, monospace",fontSize:"12px",color:"#64686d"},children:[n.jsx(e.strong,{style:{color:"#181a1e"},children:i}),n.jsx(e.br,{}),a,"px"]}),n.jsx(e.div,{style:{height:"24px",width:`${a}px`,backgroundColor:"#1a00ff",borderRadius:"2px"}})]},i))}),`
`,n.jsx(e.h2,{id:"semantic-roles",children:"Semantic roles"}),`
`,n.jsxs(e.p,{children:[`| Role | Token | Pixels | Use |
|---|---|---|---|
| Gap XS | `,n.jsx(e.code,{children:"--gap-xs"}),` | 8 | Inline-tight rows |
| Gap SM | `,n.jsx(e.code,{children:"--gap-sm"}),` | 12 | Compact stacks |
| Gap MD | `,n.jsx(e.code,{children:"--gap-md"}),` | 16 | Default stacks |
| Gap LG | `,n.jsx(e.code,{children:"--gap-lg"}),` | 24 | Section breaks |
| Gap XL | `,n.jsx(e.code,{children:"--gap-xl"}),` | 32 | Page-level rhythm |
| Padding SM | `,n.jsx(e.code,{children:"--padding-sm"}),` | 12 | Compact components |
| Padding MD | `,n.jsx(e.code,{children:"--padding-md"}),` | 16 | Default components |
| Padding LG | `,n.jsx(e.code,{children:"--padding-lg"})," | 24 | Cards, dialogs |"]})]})}function M(s={}){const{wrapper:e}={...o(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(p,{...s})}):p(s)}export{M as default};
