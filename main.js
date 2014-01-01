var process = {
		
			load: function(){
			
				var i_c = document.getElementById('i_c').value, // Nome do cliente
					i_i = document.getElementById('i_i').value, // Instituição
					i_p = document.getElementById('i_p').value, // Compra
					i_v = document.getElementById('i_v').value; // Valor
					g_t = new Date();
					h_r = g_t.getHours() + ':' + g_t.getMinutes();
					d_t = g_t.getDate() + '/' + (Math.abs(g_t.getMonth()) + 1) + '/' + g_t.getUTCFullYear();
					
				process.setHistory(i_c, i_i, i_p, i_v, d_t, h_r);
				
			},
			
			setHistory: function( s_c, s_i, s_p, s_v, s_s, s_r){
			
				if(!localStorage.getItem('registro')){ localStorage.setItem('registro', 0) }
				
			    localStorage.setItem('registro', Math.abs(localStorage.getItem('registro')) + 1);
				
				var i = localStorage.getItem('registro');
				
				localStorage.setItem('registro.nome.'+i, s_c);
				localStorage.setItem('registro.inst.'+i, s_i);
				localStorage.setItem('registro.prod.'+i, s_p);
				localStorage.setItem('registro.valr.'+i, s_v);
				localStorage.setItem('registro.data.'+i, s_s);
				localStorage.setItem('registro.hour.'+i, s_r);
					
				console.log("Adicionando cliente numero "+ i);
				
				process.openClient(0);
				process.getHistory();
			
			},
			
			getHistory: function(){
				
				document.getElementById('info').innerHTML = '';
				
				if(localStorage.getItem('registro')){
				
					var n_dat, 
						j_dat;
					
					document.getElementById('info').style.display = 'block';
					document.getElementById('error').style.display = 'none';
					
					for( i = localStorage.getItem('registro'); i >= 1; i--){
						
						if(! localStorage.getItem('registro.deleted.' + i)){
							var l_c  = localStorage.getItem('registro.nome.'+i),
								l_i  = localStorage.getItem('registro.inst.'+i),
								l_p  = localStorage.getItem('registro.prod.'+i),
								l_v  = localStorage.getItem('registro.valr.'+i),
								date = localStorage.getItem('registro.data.'+i),
								h_r  = localStorage.getItem('registro.hour.'+i);
							
							if(n_dat != date){ j_dat = "<div class='date'>" + date + "</div>" }
							else{ j_dat = '' }
							
							document.getElementById('info').innerHTML +=  '<div id="'+i+'" class=\"client\">' 
																		+"<div class='close' onclick=\'process.removeHistory("+i+")\'>x</div>"
																		+j_dat 
																		+'<div id="'+i+'_name" onmousedown=\'process.dataRestore('+i+')\' class=\'name\'>'+l_c +"</div>"
																		+'<div id="'+i+'_opt" onmousedown=\'process.dataRestore('+i+')\' class=\'option\'> Comprou '
																		+'<b id="'+i+'_option">'+l_p + '</b> ás '
																		+'<b class="hours" id="'+i+'_hours">' + h_r + '</b></div>'
																		+'<div id="'+i+'_inst" class=\'inst\'> Trabalha no(a) <b>'+l_i +"</b></div>"
																		+'<div id="'+i+'_price" class=\'price\'> Pagou <b>R$'+l_v +"</b></div>"
																		+'<div class="opt" id="'+i+'_opto">'
																		+'<div class=\"b_p\" onclick=\"process.goPerfil('+i+')\">Atividade recente.</div>'
																		+'<div class=\"b_p\">Editar.</div>'
																		+'</div>'
																		+'</div>';
																		
							n_dat = date;
						}
						
						else if(document.getElementById('info').innerHTML == ''){
						
						
							document.getElementById('info').style.display = 'none';
							document.getElementById('error').style.display = 'block';
							
							console.log('Nenhum dado armazenado.');
							localStorage.clear();
						}
					}
				}
				
				else{
					
					
					
					document.getElementById('info').style.display = 'none';
					document.getElementById('error').style.display = 'block';
					
					console.log('Nenhum dado armazenado.');
					localStorage.clear();
					
				}
			},
			
			removeHistory: function(i){
				
				var t = confirm('Tem certeza que quer retirar esse pedido do histórico?');
				
				if(t == true){
					
					var l_c  = localStorage.getItem('registro.nome.'+i),
						l_i  = localStorage.getItem('registro.inst.'+i),
						l_p  = localStorage.getItem('registro.prod.'+i),
						l_v  = localStorage.getItem('registro.valr.'+i),
						date = localStorage.getItem('registro.data.'+i),
						h_r  = localStorage.getItem('registro.hour.'+i);
						
					localStorage.setItem('registro.deleted.'+i, 'true');
					process.getHistory();
					
				}
				
			},
			
			openClient: function(opt){
				
				var c_a = document.getElementById('c_add'),
					c_p = document.getElementById('perfil'),
					c_i = document.getElementById('main');
						
				if(opt == 1){
					c_a.style.display = 'block';
					c_i.style.display = 'none';
					process.keyActive('addForm')
				}
				
				else if(opt == 0){
					c_a.style.display = 'none';
					c_p.style.display = 'none';
					c_i.style.display = 'block';
					process.getHistory();
				}
			},
					
			dataRestore: function(id){
				
				if(!sessionStorage.getItem((id + '_open'))){
					sessionStorage.setItem(id + "_open", "true");
					document.getElementById((id + '_inst')).style.display = 'block';
					document.getElementById((id + '_opto')).style.display = 'block';
					document.getElementById((id + '_price')).style.display = 'block';
				}
				
				else{
					document.getElementById((id + '_inst')).style.display = 'none';
					document.getElementById((id + '_price')).style.display = 'none';
					document.getElementById((id + '_opto')).style.display = 'none';
					sessionStorage.removeItem(id + "_open");
				}
				
			},
			
			goPerfil: function(id){
			
				console.log("Abrindo perfil do cliente: Coletando dados.");
					
				var n_dat, 
					j_dat;
				
				var l_c_p = localStorage.getItem('l_c-' + id);
							sessionStorage.setItem('l_c_p', l_c_p);
				
				document.getElementById('main').style.display = 'none';
				document.getElementById('perfil').style.display = 'block';
				document.getElementById('p_n').innerHTML = l_c_p;
				document.getElementById('info_p').innerHTML = '';
				
				for( i = localStorage.getItem('registro'); i >= 1; i--){
						
						if(! localStorage.getItem('registro.deleted.' + i)){
							
							
							var l_c  = localStorage.getItem('registro.nome.'+i),
								l_i  = localStorage.getItem('registro.inst.'+i),
								l_p  = localStorage.getItem('registro.prod.'+i),
								l_v  = localStorage.getItem('registro.valr.'+i),
								date = localStorage.getItem('registro.data.'+i),
								h_r  = localStorage.getItem('registro.hour.'+i);
						
							if(l_c == l_c_p){
								console.log("Localizado registro nº"+ i);
								
								if(n_dat != date){ j_dat = "<div class='date'>" + date + "</div>" }
								else{ j_dat = '' }
							
								document.getElementById('info_p').innerHTML += '<div id="'+i+'" class=\"client\">' 
																			+"<div class='close' onclick=\'process.removeHistory("+i+")\'>x</div>"
																			+j_dat 
																			+'<div id="'+i+'_name" onmousedown=\'process.dataRestore('+i+')\' class=\'name\'>'+l_c +"</div>"
																			+'<div id="'+i+'_opt" onmousedown=\'process.dataRestore('+i+')\' class=\'option\'> Comprou '
																			+'<b id="'+i+'_option">'+l_p + '</b> ás '
																			+'<b class="hours" id="'+i+'_hours">' + h_r + '</b></div>'
																			+'<div id="'+i+'_inst" class=\'inst\'> Trabalha no(a) <b>'+l_i +"</b></div>"
																			+'<div id="'+i+'_price" class=\'price\'> Pagou <b>R$'+l_v +"</b></div>"
																			+'</div>';
																			
								n_dat = date;
							
							}
				
						}
				}
			},
			
			menu: {
				
				select: function(num){
					
					var m_0 = document.getElementById('menu.li.0'),
						m_1 = document.getElementById('menu.li.1');
					
					if(num == 0){
						m_0.className = "li selected";
						m_1.className = "li";
					}
					
					else if(num == 1){
						m_0.className = "li";
						m_1.className = "li selected";
						process.menu.openStatic();
					}
					
				},	
				
				openStatic: function(id){
				
					console.log("/n Inicializando estatisticas.");
					
					var info = document.getElementById('info_p'),
						stat = document.getElementById('static'),
						st_c = document.getElementById('static.compras'),
						st_t = document.getElementById('static.dinheiro.total'),
						l_c_p = sessionStorage.getItem('l_c_p'),
						st_c_c = new Number(0),
						st_t_c = new Number(0),
						l_s = new Array(),
						l_s_c = new Array()
						l_c_s = 0;	
					
					info.style.display = 'none';
					stat.style.display = 'block';
					
					for( i = localStorage.getItem('registro'); i >= 1; i--){
						
						if(! localStorage.getItem('registro.deleted.' + i)){
							
							
							var l_c  = localStorage.getItem('registro.nome.'+i),
								l_i  = localStorage.getItem('registro.inst.'+i),
								l_p  = localStorage.getItem('registro.prod.'+i),
								l_v  = localStorage.getItem('registro.valr.'+i),
								date = localStorage.getItem('registro.data.'+i),
								h_r  = localStorage.getItem('registro.hour.'+i);
							
							
							
							if(l_c == l_c_p){
							
								st_c_c++;
								
								l_v = l_v.replace(',','.');
								l_v = new Number(l_v);
								
								st_t_c =  new Number(st_t_c + l_v);
								
								l_s[i] = l_i;
							}
						}
					
					}
					
					
					st_c.innerHTML = st_c_c;
					
					if(!/['.']/.test(st_t_c)){
						st_t_c = st_t_c + ',00';
					}
					st_t.innerHTML = st_t_c;
					
					var l_s_c;
					
					for(o = 0;o <= l_c_s.length; o++){
						console.log('Calculando as compras: {id:'+l_s_c[o]+'}');
					}
					
				}
				
				
			},
			
			tabela: {
				add: function(){
					
					var item = document.getElementById('tabela.item').value,
						value = document.getElementById('tabela.price').value,
						end = function(){
						document.getElementById('tabela.item').value = '';
						document.getElementById('tabela.price').value = '';
						};
					
					for( t = 1; t <= localStorage.getItem("tabela"); t++){
					
						if(! localStorage.getItem('tabela.deleted.' + t)){
							if(item == localStorage.getItem('tabela.item.' + t)){
								var j = confirm("O Item citado já está registrado na tabela. Deseja atualiza-lo?");
								if(j){ s = t }
								else{ end();return false; }
							}
						}
						
					}
					
					if(item.length >= 24){
						alert("O Item possui um nome muito grande. Abrevia-lo talvez seja uma opção viavel.");
						return false;
					}
					
					// Hinstancia da tabela.
					if(s){ t = s }
					else{
					
						if(!localStorage.getItem('tabela')){ localStorage.setItem('tabela', 0) }
							localStorage.setItem('tabela', Math.abs(localStorage.getItem('tabela')) + 1);
						
						var t = localStorage.getItem('tabela');
					
					}
					
					localStorage.setItem(("tabela.item." + t), item);
					localStorage.setItem(("tabela.value." + t), value);
					
					process.tabela.get();
					end();
				},
				
				get: function(){
					
					document.getElementById('tabela.content').innerHTML = '';
					
					if(localStorage.getItem("tabela")){
						for( t = 1; t <= localStorage.getItem("tabela"); t++){
						
							if(! localStorage.getItem('tabela.deleted.' + t)){
							
							var l_i = localStorage.getItem("tabela.item." + t), // Item
								l_v = localStorage.getItem("tabela.value." + t); // Valo
							
							document.getElementById('tabela.content').innerHTML += "<div>"
																				 +"<div class='tabela_item_CV'>"
																				 +	l_i 
																				 +"</div>"
																				 +"<div class='tabela_preco_CV'>"
																				 +	l_v 
																				 +"</div>"
																				 +"<div class='close_CV' onclick='process.tabela.remove("+t+")'>x</div>"
																				 +"</div>";
							
							}
						}
					}
				},
				
				remove: function(id){
					var t = confirm('Tem certeza que quer retirar esse item da tabela?');
				
					if(t == true){
						
						localStorage.removeItem('tabela.item.'+id),
						localStorage.removeItem('tabela.value.'+id);
							
						localStorage.setItem('tabela.deleted.'+id, 'true');
						process.tabela.get();
						
					}
				}
				
			}
		}
		
		window.onload = function(){
		
			var ur = window.location.href;
			
			if(/index.html/.test(ur)){
				process.getHistory();
				document.getElementById('sub_b_1').onclick = function(){process.openClient(0)}
			}
			
			else if(/d.html/.test(ur)){
				process.tabela.get();
			}
		}
	
