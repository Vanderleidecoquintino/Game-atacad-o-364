// backend.js - roda com: node backend.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const COLS=13, ROWS=19;

function gerarLab(){
  let lab=[];
  for(let y=0;y<ROWS;y++){
    lab[y]=[];
    for(let x=0;x<COLS;x++){
      if(y==0||y==8||y==17||x==0||x==12) lab[y][x]=0;
      else if(x%2==1) lab[y][x]=1;
      else lab[y][x]=0;
    }
  }
  return lab;
}

const PRODUTOS = [
  {id:1, nome:"TANG 364", x:10, y:1, foto:"IMG-20260926-WA7510.jpg", corredor:"C11"},
  {id:2, nome:"ARROZ", x:2, y:2, foto:"arroz.jpg", corredor:"C3"},
  {id:3, nome:"FEIJÃO", x:4, y:2, foto:"feijao.jpg", corredor:"C5"},
  {id:4, nome:"ÓLEO", x:6, y:2, foto:"oleo.jpg", corredor:"C7"},
  {id:5, nome:"BISCOITO", x:8, y:2, foto:"biscoito.jpg", corredor:"C9"},
  {id:6, nome:"REFRI", x:2, y:5, foto:"refri.jpg", corredor:"C3"},
  {id:7, nome:"LIMPEZA", x:4, y:5, foto:"limpeza.jpg", corredor:"C5"},
  {id:8, nome:"HIGIENE", x:6, y:5, foto:"higiene.jpg", corredor:"C7"},
  {id:9, nome:"FRIOS", x:8, y:5, foto:"frios.jpg", corredor:"C9"},
  {id:10, nome:"PADARIA", x:2, y:10, foto:"padaria.jpg", corredor:"C3"},
  {id:11, nome:"CARNES", x:4, y:10, foto:"carnes.jpg", corredor:"C5"},
  {id:12, nome:"FRUTAS", x:6, y:10, foto:"frutas.jpg", corredor:"C7"},
  {id:13, nome:"BEBIDAS", x:8, y:10, foto:"bebidas.jpg", corredor:"C9"},
  {id:14, nome:"RAÇÃO", x:10, y:10, foto:"racao.jpg", corredor:"C11"},
];

app.get('/api/matrix', (req,res)=>{
  res.json({
    cols:COLS,
    rows:ROWS,
    lab: gerarLab(),
    entrada:{x:12,y:15},
    produtos: PRODUTOS
  });
});

app.get('/api/produtos', (req,res)=>{
  res.json(PRODUTOS);
});

app.post('/api/produto', (req,res)=>{
  let {nome,x,y,foto} = req.body;
  PRODUTOS.push({id:PRODUTOS.length+1,nome,x,y,foto,corredor:`C${x+1}`});
  res.json({ok:true, produtos:PRODUTOS});
});

app.listen(3000, ()=> console.log('✅ BACKEND RODANDO NA PORTA 3000 - http://localhost:3000/api/matrix'));
