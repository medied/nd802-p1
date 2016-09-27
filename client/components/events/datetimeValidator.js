(function() { // Begin scoping function
	var inputStart; // Global to your code, invisible outside the scoping function

	$.validator.addMethod("startNotThePast", function (datetime) {
		inputStart = new Date(datetime);
		var dateNow = new Date(Date.now());
		
		if (inputStart < dateNow)
			return false;
		else
			return true;
	});

	$.validator.addMethod("endNotThePast", function (datetime) {
		var inputEnd = new Date(datetime);
		var dateNow = new Date(Date.now());
		
		if (inputEnd < dateNow)
			return false;
		else
			return true;
	});

	$.validator.addMethod("endsAfterStart", function (endDatetime) {
		var inputEnd = new Date(endDatetime);

		if (inputEnd <= inputStart)
			return false;
		else
			return true;
	});
})();  