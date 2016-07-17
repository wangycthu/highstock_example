var symbols = [
	{ id:"0001.hk", text:"0001.hk aidfhsilhr sdilf"},
	{ id:"1398.hk", text:"1398.hk Aifoi dnei ijfg"},
	{ id:"0101.hk", text:"0101.hk SJOI NFDI iwejfgfhg"},
	{ id:"9021.tyo", text:"9021.tyo oifjasjfn vvslifjls"},
	{ id:"60118.sh", text:"60118.sh Djsijglsga fsl dlsdjg"},
	{ id:"0002.hk", text:"0002.hk aidfhsilhr sdilf"},
	{ id:"1399.hk", text:"1399.hk Aifoi dnei ijfg"},
	{ id:"0102.hk", text:"0102.hk SJOI NFDI iwejfgfhg"},
	{ id:"9022.tyo", text:"9022.tyo oifjasjfn vvslifjls"},
	{ id:"60119.sh", text:"60119.sh Djsijglsga fsl dlsdjg"},
	{ id:"0001.hk", text:"0003.hk aidfhsilhr sdilf"},
	{ id:"1400.hk", text:"1400.hk Aifoi dnei ijfg"},
	{ id:"0103.hk", text:"0103.hk SJOI NFDI iwejfgfhg"},
	{ id:"9023.tyo", text:"9023.tyo oifjasjfn vvslifjls"},
	{ id:"60120.sh", text:"60120.sh Djsijglsga fsl dlsdjg"}
];

var description = {
	"0001.hk": "aidfhsilhr sdilf",
	"1398.hk": "Aifoi dnei ijfg",
	"0101.hk": "SJOI NFDI iwejfgfhg",
	"9021.tyo": "oifjasjfn vvslifjls",
	"60118.sh": "Djsijglsga fsl dlsdjg",
	"0002.hk": "aidfhsilhr sdilf",
	"1399.hk": "Aifoi dnei ijfg",
	"0102.hk": "SJOI NFDI iwejfgfhg",
	"9022.tyo": "oifjasjfn vvslifjls",
	"60119.sh": "Djsijglsga fsl dlsdjg",
	"0003.hk": "aidfhsilhr sdilf",
	"1400.hk": "Aifoi dnei ijfg",
	"0103.hk": "SJOI NFDI iwejfgfhg",
	"9023.tyo": "oifjasjfn vvslifjls",
	"60120.sh": "Djsijglsga fsl dlsdjg"
};

$(function() {
	$(".clickable").click(function() {
		if ($(this).hasClass('checked')) {
			$(this).removeClass('checked');
		} else {
			$(this).addClass('checked');
		}
	});

	$("#single-query").select2({
		data: symbols,
		placeholder: "Search for a symbol",
		allowClear: true,
		minimumInputLength: 2,
		templateResult: function(symbol) {
			return "<div class='row-fluid'>" +
				"<div class='span2'>" + symbol.id + "</div>" +
				"<div class='span6'>" + description[symbol.id] + "</div>" +
				"</div>";
		},
		templateSelection: function(symbol) {
			if (!symbol.id) return "Search for a symbol";
			return symbol.id;
		},
		escapeMarkup: function(m) {
			return m;
		}
	});

	$("#multi-query").select2({
		data: Object.keys(description),
		multiple: true,
		tokenSeparators: [' ',','],
		minimumInputLength: 2,
		placeholder: "Input multiple symbols or paste symbols separated by space"
	});

});
