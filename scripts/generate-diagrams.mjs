import fs from 'node:fs';

const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const lines = (items, x, y, color='#c9cec8', size=17, gap=25) => items.map((t,i)=>`<text x="${x}" y="${y+i*gap}" fill="${color}" font-size="${size}">• ${esc(t)}</text>`).join('');
const box = ({x,y,w,h,title,sub='',items=[],color='#eef2ec'}) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#151817" stroke="${color}" stroke-width="3"/><text x="${x+22}" y="${y+37}" fill="#fff" font-size="23" font-weight="700">${esc(title)}</text>${sub?`<text x="${x+22}" y="${y+63}" fill="${color}" font-size="15">${esc(sub)}</text>`:''}${lines(items,x+22,y+(sub?94:70),'#c9cec8',15,22)}</g>`;
const arrow = (x1,y1,x2,y2,color='#99a29a',dash='') => `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="3" ${dash?`stroke-dasharray="${dash}"`:''} marker-end="url(#arrow)"/>`;
const base = (title, subtitle, accent, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc><defs><radialGradient id="bg"><stop stop-color="#1b201d"/><stop offset="1" stop-color="#090b0a"/></radialGradient><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="context-stroke"/></marker><filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="1600" height="1000" fill="url(#bg)"/><path d="M0 112 H1600" stroke="#2b302d"/><text x="45" y="61" fill="#fff" font-size="38" font-weight="750">${esc(title)}</text><rect x="45" y="80" width="510" height="5" rx="3" fill="${accent}"/><text x="45" y="105" fill="#aeb6af" font-size="17">${esc(subtitle)}</text>${body}<text x="1555" y="965" text-anchor="end" fill="#646c66" font-size="14">VICTHOR SANTOS · ARQUITETURA DO PROJETO</text></svg>`;

const delivery = base('System Delivery Order','Plataforma de pedidos com microsserviços e comunicação assíncrona','#c5f567',`
${box({x:610,y:140,w:380,h:105,title:'Clientes',sub:'Web · Mobile · App parceiro',color:'#c5f567'})}${arrow(800,245,800,300,'#c5f567')}
${box({x:585,y:300,w:430,h:105,title:'API Gateway',sub:'Spring Cloud Gateway · roteamento · autenticação',color:'#c5f567'})}
${arrow(800,405,800,448,'#c5f567')}<path d="M160 448 H1440" stroke="#687169" stroke-width="3"/>
${box({x:45,y:480,w:270,h:205,title:'User Service',sub:'Spring Boot',items:['Usuários e perfis','Autenticação','Endereços'],color:'#54a8ff'})}
${box({x:355,y:480,w:270,h:205,title:'Product Service',sub:'Spring Boot',items:['Restaurantes','Produtos e categorias','Preços e estoque'],color:'#63db7e'})}
${box({x:665,y:480,w:270,h:205,title:'Order Service',sub:'Spring Boot',items:['Pedidos e itens','Cálculo de valores','Status do pedido'],color:'#ff982f'})}
${box({x:975,y:480,w:270,h:205,title:'Payment Service',sub:'Spring Boot',items:['Pagamentos','Confirmações','Tratamento de falhas'],color:'#c078ff'})}
${box({x:1285,y:480,w:270,h:205,title:'Delivery Service',sub:'Spring Boot',items:['Entregas e rotas','Rastreamento','Atualização de status'],color:'#ff5964'})}
${[180,490,800,1110,1420].map(x=>arrow(x,448,x,480,'#879087')).join('')}
<rect x="280" y="735" width="1040" height="88" rx="18" fill="#151817" stroke="#ff982f" stroke-width="3"/><text x="800" y="771" text-anchor="middle" fill="#fff" font-size="25" font-weight="700">Message Broker</text><text x="800" y="799" text-anchor="middle" fill="#ffb260" font-size="17">RabbitMQ · eventos de domínio · processamento assíncrono</text>
${[180,490,800,1110,1420].map(x=>arrow(x,685,x,735,['#54a8ff','#63db7e','#ff982f','#c078ff','#ff5964'][[180,490,800,1110,1420].indexOf(x)])).join('')}
${['User DB','Product DB','Order DB','Payment DB','Delivery DB'].map((t,i)=>`<g><ellipse cx="${180+i*310}" cy="900" rx="105" ry="28" fill="#151817" stroke="${['#54a8ff','#63db7e','#ff982f','#c078ff','#ff5964'][i]}" stroke-width="3"/><path d="M${75+i*310} 900v35c0 38 210 38 210 0v-35" fill="#151817" stroke="${['#54a8ff','#63db7e','#ff982f','#c078ff','#ff5964'][i]}" stroke-width="3"/><text x="${180+i*310}" y="923" text-anchor="middle" fill="#fff" font-size="17">PostgreSQL · ${t}</text></g>`).join('')}
${[180,490,800,1110,1420].map(x=>arrow(x,823,x,872,'#687169')).join('')}`);

const finance = base('Controle Financeiro','API REST segura para gestão financeira pessoal','#b3b9ed',`
${box({x:575,y:150,w:450,h:110,title:'Cliente',sub:'Web · Mobile · Postman',color:'#b3b9ed'})}${arrow(800,260,800,355,'#b3b9ed')}
<text x="610" y="310" fill="#aeb6af" font-size="17">HTTPS · JSON · sessão autenticada</text>
${box({x:560,y:355,w:480,h:145,title:'API REST',sub:'Spring Boot · controllers · DTOs · validação',items:['Contas, categorias e transações'],color:'#c5f567'})}
${box({x:80,y:370,w:330,h:180,title:'Spring Security',sub:'Sessão · BCrypt · CSRF',items:['Cadastro e login','Controle de acesso','Isolamento por usuário'],color:'#67b7ff'})}
${arrow(410,445,560,445,'#67b7ff')}${arrow(560,480,410,480,'#67b7ff','9 8')}
${box({x:1180,y:370,w:340,h:180,title:'PostgreSQL',sub:'Persistência relacional',items:['Usuários e contas','Categorias','Transações'],color:'#65d998'})}
${arrow(1040,445,1180,445,'#65d998')}${arrow(1180,480,1040,480,'#65d998','9 8')}
${arrow(800,500,800,615,'#c5f567')}${box({x:530,y:615,w:540,h:230,title:'Camada de negócio',sub:'Services · regras · consistência',items:['Receitas e despesas','Saldo por conta','Extrato com filtros','Resumo financeiro mensal'],color:'#ffb45c'})}
<g transform="translate(155 675)"><rect width="270" height="160" rx="18" fill="#111412" stroke="#49514b" stroke-width="2"/><text x="22" y="38" fill="#fff" font-size="21" font-weight="700">Qualidade</text>${lines(['Flyway migrations','JUnit + H2','Clean Code'],22,72,'#c9cec8',15,23)}</g>
<g transform="translate(1175 675)"><rect width="270" height="160" rx="18" fill="#111412" stroke="#49514b" stroke-width="2"/><text x="22" y="38" fill="#fff" font-size="21" font-weight="700">Principais fluxos</text>${lines(['Autenticação','CRUD financeiro','Relatórios mensais'],22,72,'#c9cec8',15,23)}</g>`);

const tasks = base('Gerenciador de Tarefas','Aplicação Java em terminal com responsabilidades bem separadas','#edb882',`
${box({x:60,y:210,w:280,h:150,title:'Usuário',sub:'Terminal · entrada e saída',items:['Escolhe opções','Visualiza resultados'],color:'#edb882'})}
${box({x:480,y:175,w:320,h:160,title:'Main',sub:'tarefas.Main',items:['Ponto de entrada','Inicializa o menu'],color:'#c5f567'})}
${box({x:480,y:440,w:320,h:210,title:'Menu',sub:'ui.Menu',items:['Exibe opções','Lê comandos','Mostra resultados'],color:'#63b6ff'})}
${box({x:1000,y:175,w:430,h:210,title:'GerenciadorDeTarefas',sub:'service',items:['Adicionar e listar','Atualizar status','Remover tarefa'],color:'#63db7e'})}
${box({x:950,y:525,w:300,h:180,title:'Tarefa',sub:'model',items:['id','descrição','status'],color:'#ffb45c'})}
${box({x:1300,y:525,w:250,h:180,title:'StatusTarefa',sub:'enum',items:['PENDENTE','EM_ANDAMENTO','CONCLUÍDA'],color:'#ff6873'})}
${arrow(340,285,480,255,'#edb882')}${arrow(640,335,640,440,'#63b6ff')}${arrow(800,520,1000,300,'#63db7e')}${arrow(1215,385,1100,525,'#ffb45c')}${arrow(1300,615,1250,615,'#ff6873')}
<g transform="translate(60 740)"><rect width="700" height="175" rx="18" fill="#111412" stroke="#49514b" stroke-width="2"/><text x="24" y="38" fill="#fff" font-size="21" font-weight="700">Estrutura do projeto</text><text x="24" y="72" fill="#c9cec8" font-size="16" font-family="monospace">src/tarefas/</text><text x="50" y="100" fill="#c9cec8" font-size="16" font-family="monospace">├── model/  Tarefa.java · StatusTarefa.java</text><text x="50" y="128" fill="#c9cec8" font-size="16" font-family="monospace">├── service/ GerenciadorDeTarefas.java</text><text x="50" y="156" fill="#c9cec8" font-size="16" font-family="monospace">└── ui/ Menu.java · Main.java</text></g>
<g transform="translate(830 740)"><rect width="720" height="175" rx="18" fill="#111412" stroke="#49514b" stroke-width="2"/><text x="24" y="38" fill="#fff" font-size="21" font-weight="700">Fluxo principal</text>${lines(['Usuário inicia o programa','Menu recebe e valida a opção','Service executa a operação','Resultado volta ao terminal'],24,72,'#c9cec8',16,24)}</g>`);

fs.mkdirSync('dist/assets',{recursive:true});
fs.writeFileSync('dist/assets/delivery-architecture.svg',delivery);
fs.writeFileSync('dist/assets/finance-architecture.svg',finance);
fs.writeFileSync('dist/assets/tasks-architecture.svg',tasks);
