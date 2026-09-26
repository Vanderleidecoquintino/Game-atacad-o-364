// ATACADÃO 364 - V9 FINAL - ORIGEM 0,0 = CAIXAS / ENTRADA
// Escala 1:100 - 1m = 37.8px - SEU CADERNO 100% AMARRADO
const PX = 37.8;
const COMPR_BAIA = 14, LARG_BAIA = 4, GAP = 3, CORR = 5, ALT_PEGA = 2.5, QTD = 13;
const QTD_PRAT = 7, COMP_PRAT = 2;
let posX = 1, posY = 0.8, coletados = 0;
const mapa = document.getElementById('mapa'), player = document.getElementById('player');

function criar(){
let xTotal = 0;
for(let b=0;b<QTD;b++){
 let x = b*(LARG_BAIA+GAP);
 let yBaixo = 500;
 let baiaB = document.createElement('div'); baiaB.className='baia';
 baiaB.style.left=(x*PX)+'px'; baiaB.style.top=yBaixo+'px';
 baiaB.style.width=(LARG_BAIA*PX)+'px'; baiaB.style.height=(COMPR_BAIA*PX)+'px';
 baiaB.style.background='#a7f3d0';
 for(let p=0;p<QTD_PRAT;p++){
  let pr=document.createElement('div'); pr.className='prat';
  pr.style.top=(p*COMP_PRAT*PX)+'px'; pr.style.height=(COMP_PRAT*PX)+'px';
  pr.innerText=`B${b+1} P${p+1} 2M WAY`;
  baiaB.appendChild(pr);
 }
 mapa.appendChild(baiaB);
 let yCima = yBaixo - CORR*PX - COMPR_BAIA*PX;
 let baiaC = document.createElement('div'); baiaC.className='baia';
 baiaC.style.left=(x*PX)+'px'; baiaC.style.top=yCima+'px';
 baiaC.style.width=(LARG_BAIA*PX)+'px'; baiaC.style.height=(COMPR_BAIA*PX)+'px';
 baiaC.style.background='#fde68a';
 for(let p=0;p<QTD_PRAT;p++){
  let pr=document.createElement('div'); pr.className='prat';
  pr.style.top=(p*COMP_PRAT*PX)+'px'; pr.style.height=(COMP_PRAT*PX)+'px';
  pr.innerText=b==1?`364 TAM B${b+1} P${p+1}`:`B${b+1} P${p+1}`;
  baiaC.appendChild(pr);
 }
 mapa.appendChild(baiaC);
 if(b<QTD-1){
  let gap=document.createElement('div'); gap.className='corredorV';
  gap.style.left=((x+LARG_BAIA)*PX)+'px'; gap.style.top=yCima+'px';
  gap.style.width=(GAP*PX)+'px'; gap.style.height=(COMPR_BAIA*2*PX + CORR*PX)+'px';
  mapa.appendChild(gap);
 }
 xTotal = x + LARG_BAIA + GAP;
}
let corr=document.createElement('div'); corr.className='corredorH';
corr.style.left='0px'; corr.style.top=(500 - CORR*PX)+'px';
corr.style.width=(xTotal*PX)+'px'; corr.style.height=(CORR*PX)+'px';
corr.innerHTML=`CORREDOR CENTRAL ${CORR}M - LARG ${CORR}M - GAP ${GAP}M ANDA TB - ALTURA PEGA ${ALT_PEGA}M - Mo M+${QTD} - 1:100`;
mapa.appendChild(corr);
document.getElementById('caixas').style.width=(xTotal*PX)+'px';
mapa.style.width=(xTotal*PX)+'px';
atualiza();
}
function atualiza(){
player.style.left=(posX*PX-12)+'px'; player.style.top=(1100 - posY*PX -10)+'px';
let local=''; if(posY<=2.5) local='CAIXAS/ENTRADA ORIGEM 0,0'; else if(posY<5) local='SAIDA CAIXAS'; else if(posY<19) local=`BAIA BAIXO ${COMPR_BAIA}M (7x${COMP_PRAT}M) FRENTE ${LARG_BAIA}M ALT ${ALT_PEGA}M`; else if(posY<24) local=`CORREDOR ${CORR}M + GAP ${GAP}M - AMBOS ANDAVEIS`; else local=`BAIA CIMA 364 TAM Mo M+${QTD}`;
document.getElementById('pos').innerHTML=`POS: X:${posX.toFixed(1)}m Y:${posY.toFixed(1)}m - ${local}<br>GAP ${GAP}M LARANJA + CORR ${CORR}M AMARELO = ANDAVEIS | ESCALA 1:100`;
document.getElementById('score').innerText=`X:${posX.toFixed(1)} Y:${posY.toFixed(1)} | ${coletados}/${QTD}`;
let wrap=document.getElementById('mapWrap'); wrap.scrollLeft=(posX*PX)-180; wrap.scrollTop=(1100 - posY*PX)-280;
}
function mover(dx,dy){posX+=dx*0.8; posY+=dy*0.8; if(posX<0) posX=0; if(posX>90) posX=90; if(posY<0) posY=0; if(posY>38) posY=38; atualiza();}
function coletar(){coletados++; alert(`📦 COLETADO!\nB${Math.floor(posX/(LARG_BAIA+GAP))+1} X:${posX.toFixed(1)} Y:${posY.toFixed(1)}\nALTURA ${ALT_PEGA}M OK - SEM EMPILHADEIRA\nORIGEM 0,0 = CAIXAS\nGAP ${GAP}M + CORR ${CORR}M ANDAVEIS`); atualiza();}
criar();
document.addEventListener('keydown', e=>{if(e.key=='ArrowUp') mover(0,1); if(e.key=='ArrowDown') mover(0,-1); if(e.key=='ArrowLeft') mover(-1,0); if(e.key=='ArrowRight') mover(1,0); if(e.key==' ') coletar();});
