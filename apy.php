
else if($action=='oferta'){
  $input = json_decode(file_get_contents('php://input'), true);
  $uuid = $input['uuid'] ?? '';
  $produto = $input['produto'] ?? '';
  $zap = $input['zap'] ?? '';
  $nome = $input['nome'] ?? 'Cliente';

  if(!$zap) { echo json_encode(["ok"=>false,"msg"=>"zap obrigatório"]); exit; }

  $leads = file_exists('leads.json') ? json_decode(file_get_contents('leads.json'), true) : [];
  $leads[] = ["uuid"=>$uuid,"nome"=>$nome,"zap"=>$zap,"produto"=>$produto,"data"=>date('Y-m-d H:i:s')];
  file_put_contents('leads.json', json_encode($leads));

  // aqui você pode mandar pro WhatsApp automaticamente depois
  echo json_encode(["ok"=>true,"msg"=>"te avisamos quando $produto entrar em oferta!"]);
}
