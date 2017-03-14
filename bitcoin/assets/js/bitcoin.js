/**
 * @author	Albin CAUDERLIER
 * @date	24/02/2017
 * 
 * Script jQuery appelant l'API de BlockCypher.com et affichant les données.
 * 
 */
var url_ws="";
var hash = "";
$(document).ready(function() {
	
	$.ajax({
		url : "https://api.blockcypher.com/v1/btc/main",
		dataType : "json",
		contentType : "application/json; charset=utf-8",
		type : "GET",
		timeout:	"5000",
		async : false,

		success : function(data) {
			$('#bitcoin_block_number').append(data.height);
			$('#bitcoin_network_hash').append(data.hash);
			$('#bitcoin_blocks').append(data.time);
			$('#medium_fees').append(data.medium_fee_per_kb);
			$('#peer_count').append(data.peer_count);
			hash = data.hash;
			url_ws = "https://api.blockcypher.com/v1/btc/main/blocks/"+hash;
		},

		error : function(xhr, status, err) {
			$('#bitcoin_block_number').append(err+" N/A");
		}
	});
	$.ajax({
		url : "https://api.blockcypher.com/v1/btc/main/blocks/0000000000000000189bba3564a63772107b5673c940c16f12662b3e8546b412",
		dataType : "json",
		contentType : "application/json; charset=utf-8",
		type : "GET",
		timeout:	"5000",
		async : false,

		success : function(data) {
			$('#transaction').append(data.total);
		},

		error : function(xhr, status, err) {
			$('#transaction').append(err+" N/A");
		}
	});
	
	
	
});
