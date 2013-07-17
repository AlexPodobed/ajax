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



function getCoolStr(obj) {
    var arr_of_values = [],
        str_for_url = "?",
        key, i;

    for (key in obj) {
        arr_of_values.push(obj[key]);
    }

    for (i = 0; i < arr_of_values.length; i++) {
        str_for_url += 'operand' + (i + 1) + '=' + arr_of_values[i] + '&';
    }

    return str_for_url.slice(0, str_for_url.length - 1);
}

