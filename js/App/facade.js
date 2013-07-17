function Facade() {
  var methods = {
		'calc': 'calc.php',
		'calendar': 'calendar.php'
	}


	function getAjax() {
		return (XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject();
	}

	function buildURL(model, params) {
		return methods[model] + '?operand1=' + params.first + '&operand2=' + params.second;
	}

	this.useAjaxToSolve = function(model, params, callback) {
		var ajax = getAjax();

		ajax.onreadystatechange = function() {

			if (ajax.readyState === 4 && ajax.status === 200) {
				callback(ajax.responseText);
			}

		};
		ajax.open("GET", buildURL(model, params), true);
		ajax.send();
	};

}


// for models:

// calc model
var calc_facade = new Facade();

calc_facade.useAjaxToSolve('calc', params, callback);


//calendar model
var calendar_facade = new Facade();


this.solve = function(params, callback) {
  calc_facade.useAjaxToSolve('calendar', params, callback);
}
