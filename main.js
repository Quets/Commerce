var process = {
		
			load: function(){
			
				var i_c = document.getElementById('i_c').value,
					i_i = document.getElementById('i_i').value,
					i_p = document.getElementById('i_p').value,
					i_v = document.getElementById('i_v').value;
					g_t = new Date();
					h_r = g_t.getHours() + ':' + g_t.getMinutes();
					d_t = g_t.getDate() + '/' + (Math.abs(g_t.getMonth()) + 1) + '/' + g_t.getUTCFullYear();
					
				process.setHistory(i_c, i_i, i_p, i_v, d_t, h_r);
				
			},
			
			setHistory: function( s_c, s_i, s_p, s_v, s_s, s_r){
			
				if(!localStorage.getItem('history')){ localStorage.setItem('history', 0) }
				
			    localStorage.setItem('history', Math.abs(localStorage.getItem('history')) + 1);
				
				var i = localStorage.getItem('history');
				
				localStorage.setItem('l_c-'+i, s_c);
				localStorage.setItem('l_i-'+i, s_i);
				localStorage.setItem('l_p-'+i, s_p);
				localStorage.setItem('l_v-'+i, s_v);
				localStorage.setItem('t_s-'+i, s_s);
				localStorage.setItem('h_r-'+i, s_r);
					
				console.log("Adicionando cliente numero "+ i);
				
				process.openClient(0);
				process.getHistory();
			
			},
			
			getHistory: function(){
				
				document.getElementById('info').innerHTML = '';
				
				if(localStorage.getItem('history')){
				
					
					document.getElementById('info').style.display = 'block';
					document.getElementById('error').style.display = 'none';
					
					for( i = localStorage.getItem('history'); i >= 1; i--){
						
						if(! localStorage.getItem('deleted' + i)){
							var l_c = localStorage.getItem('l_c-'+i),
								l_i = localStorage.getItem('l_i-'+i),
								l_p = localStorage.getItem('l_p-'+i),
								l_v = localStorage.getItem('l_v-'+i),
								t_s = localStorage.getItem('t_s-'+i);
								h_r = localStorage.getItem('h_r-'+i);
								
							document.getElementById('info').innerHTML +=  '<div id="'+i+'" onclick=\'process.dataRestore('+i+')\' class=\"client\">' 
																		+"<div class='close' onclick=\'process.removeHistory("+i+")\'>x</div>"
																		+'<div id="'+i+'_name" class=\'name\'>'+l_c +"</div>"
																		+'<div id="'+i+'_opt" class=\'option\'> Comprou '
																		+'<b id="'+i+'_option">'+l_p + '</b> ás '
																		+'<b id="'+i+'_hours">' + h_r + '</b> de '
																		+'<b id="'+i+'_date">' +t_s+'</b></div>'
																		+'<div id="'+i+'_inst" class=\'inst\'> Trabalha no(a) <b>'+l_i +"</b></div>"
																		+'<div id="'+i+'_price" class=\'price\'> Pagou <b>R$'+l_v +"</b></div>"
																		+'</div>';
						}
					}
				}
				
				else{
					
					document.getElementById('info').style.display = 'none';
					document.getElementById('error').style.display = 'block';
					
					console.log('Nenhum dado armazenado.')
					
				}
			},
			
			removeHistory: function(i){
				
				var t = confirm('Tem certeza que quer retirar esse pedido do histórico?');
				
				if(t == true){
					
					localStorage.removeItem('l_c-'+i);
					localStorage.removeItem('l_i-'+i);
					localStorage.removeItem('l_p-'+i);
					localStorage.removeItem('l_v-'+i);
					localStorage.removeItem('t_s-'+i);
					localStorage.removeItem('h_r-'+i);
					localStorage.setItem('deleted'+i, 'true');
					process.getHistory();
					
				}
				
			},
			
			openClient: function(opt){
				
				var c_a = document.getElementById('c_add'),
					c_i = document.getElementById('main');
						
				if(opt == 1){
					c_a.style.display = 'block';
					c_i.style.display = 'none';
					process.keyActive('addForm')
				}
				
				else if(opt == 0){
					c_a.style.display = 'none';
					c_i.style.display = 'block';
					process.getHistory();
				}
			},
			
			keyActive: function(str){
				
				if(str == 'addForm'){
					document.body.onkeydown = function(e){
					
						var which = e.which;
						
						if(which == 13){
							process.load();
						};
						
					}
				}
				
			},
					
			dataRestore: function(id){
				
				if(!sessionStorage.getItem((id + '_open'))){
					sessionStorage.setItem(id + "_open", "true");
					document.getElementById((id + '_inst')).style.display = 'block';
					document.getElementById((id + '_price')).style.display = 'block';
				}
				
				else{
					document.getElementById((id + '_inst')).style.display = 'none';
					document.getElementById((id + '_price')).style.display = 'none';
					sessionStorage.removeItem(id + "_open");
				}
				
			}
		}
		
		window.onload = function(){
			process.getHistory();
			document.getElementById('add_b').onclick = function(){process.openClient(1)}
			document.getElementById('sub_b').onclick = function(){process.openClient(0)}
		}
	
