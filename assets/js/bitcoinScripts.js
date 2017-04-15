var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var myObj = this.responseText;
				var json = JSON.parse(myObj);
				document.getElementById("bitcoin_block_number").innerHTML = json.height;
				document.getElementById("bitcoin_network_hash").innerHTML = json.hash;
				document.getElementById("bitcoin_blocks").innerHTML = json.time;
				document.getElementById("medium_fees").innerHTML = json.medium_fee_per_kb;
				document.getElementById("peer_count").innerHTML = json.peer_count;
				document.getElementById("transaction").innerHTML = json.last_fork_hash;
			}
		};
		
		xmlhttp.open("GET", "https://api.blockcypher.com/v1/btc/main", true);
		xmlhttp.send();
		
		
		function selectChange()
		{
			
			var selects = document.getElementById("mode_saisie");
			
			document.getElementById("adresse").placeholder = selects.options[selects.selectedIndex].text;
			//alert(selects.options[selects.selectedIndex].value);// will gives u 2
			//var selectedText = selects.options[selects.selectedIndex].text;// gives u value2
		}
		
		
		
		function syntaxHighlight(json) {
			json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					match = match.replace(/['"]+/g, '');
					cls = 'key';
				} else {
					match = match.replace(/['"]+/g, '');
					if(/^[0-9a-zA-Z]{34}$/.test(match))
					{
						match = '<a href="javascript:MiseAJourModal(\'' + match + '\',\''+"adresse"+'\')">'+match+'</a>';
						cls = 'adresse';
					} else if(/^[0-9a-fA-F]{64}$/.test(match))
					{
						var bool = true;
						for(var i=0; i<5; i++)
						{
							if(match[i] != "0")
							{
								bool = false;
							}
						}
						if(bool)
						{
							match = '<a href="javascript:MiseAJourModal(\'' + match + '\',\''+"hash_b"+'\')">'+match+'</a>';
							cls = 'adresse';
						}
						else
						{
							match = '<a href="javascript:MiseAJourModal(\'' + match + '\',\''+"hash_tx"+'\')">'+match+'</a>';
							cls = 'adresse';
						}
					} else{
						
						cls = 'string';
					}
					
				}
				} else if (/true|false/.test(match)) {
					cls = 'boolean';
				} else if (/null/.test(match)) {
					cls = 'null';
				} 
				return '<span class="' + cls + '">' + match + '</span>';
			});
		}
		

		
		function MiseAJourModal(var1, var2)
		{
			$('#myModal').modal('show');
			var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() 
				{
					
					if (this.readyState == 4) 
					{
						if(this.status == 200)
						{
							var myObj = this.responseText;
							var json = JSON.stringify(JSON.parse(myObj),undefined,4);
							
							document.getElementById("paragraphe").innerHTML = syntaxHighlight(json);
							$('#myModal').modal('show');
						}
						else
						{
							document.getElementById("paragraphe").innerHTML = "Problème dans l'exécution de la requête http.";
							$('#myModal').modal('show');
						}
					}
					
				};
			if(var2 == "adresse")
			{
				xmlhttp.open("GET", "https://api.blockcypher.com/v1/btc/main/addrs/"+var1, true);
				xmlhttp.send();
			} else if(var2 == "hash_b")
			{
				xmlhttp.open("GET", "https://api.blockcypher.com/v1/btc/main/blocks/"+var1, true);
				xmlhttp.send();
			} else if(var2 == "hash_tx")
			{
				xmlhttp.open("GET", "https://api.blockcypher.com/v1/btc/main/txs/"+var1, true);
				xmlhttp.send();
			} else if(var2 == "index")
			{
				xmlhttp.open("GET", "https://api.blockcypher.com/v1/btc/main/blocks/"+var1+"?txstart=1&limit=1", true);
				xmlhttp.send();
			} 
			
		}
		
		
		
		
		function recherche()
		{
			var selects = document.getElementById("mode_saisie");
			var valeur = selects.options[selects.selectedIndex].value;
			var data = document.getElementById("adresse").value;
			
			if(valeur == "adresse")
			{
				var isadress = /^[0-9a-zA-Z]{34}$/.test(data);
				if(isadress)
				{
					MiseAJourModal(data,"adresse");
				}
				else
				{
					document.getElementById("paragraphe").innerHTML = "Adresse invalide.";
					$('#myModal').modal('show');
				}
			}
			else if(valeur == "hash_tx")
			{
				var ishash = /^[0-9a-fA-F]{64}$/.test(data);
				if(ishash)
				{
					MiseAJourModal(data, "hash_tx");
				}
				else
				{
					document.getElementById("paragraphe").innerHTML = "Hash de transaction invalide.";
					$('#myModal').modal('show');
				}	
			}
			else if(valeur == "hash_b")
			{
				var ishash = /^[0-9a-fA-F]{64}$/.test(data);
				if(ishash)
				{
					MiseAJourModal(data, "hash_b");
				}
				else
				{
					document.getElementById("paragraphe").innerHTML = "Hash de block invalide.";
					$('#myModal').modal('show');
				}
			}
			else if(valeur == "index")
			{
				if(data == parseInt(data))
				{
					MiseAJourModal(data, "index");
				}
				else
				{
					document.getElementById("paragraphe").innerHTML = "Index de block invalide.";
					$('#myModal').modal('show');
				}
			}	
		}
		
	function CreerQR()
			{
				data = document.getElementById("adresse_qrcode").value;
				var isadress = /^[0-9a-zA-Z]{34}$/.test(data);
				if(isadress)
				{
					document.getElementById("qrcode").innerHTML = "";
					var qrcode = new QRCode(document.getElementById("qrcode"), {
						width : 200,
						height : 200
					});
					qrcode.makeCode(data);
				}
				else
				{
					$('#ModalQR').modal('show');
				}
			}