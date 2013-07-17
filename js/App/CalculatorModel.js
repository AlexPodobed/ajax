function CalculatorModel() {

        function getAjax() {
                return (XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject();
        };

        this.useAjaxToSolve = function(uri, params, callback){
                var   ajax = getAjax();

                ajax.onreadystatechange = function() {

                        if (ajax.readyState === 4 && ajax.status === 200) {
                                callback(ajax.responseText);
                        }

                };
                ajax.open("GET", uri + "?operand1=" + params.first + "&operand2=" + params.second, true);
                ajax.send();
        };

        return this;
}

/*
 params{
   first: value,
   second: value
 }
*/
