Template.createAccountTemp.events({
	'submit form': function(event) {
		event.preventDefault();
		// var nameVar = event.target.accountName.value;
		var emailVar = event.target.accountEmail.value;
		var passwordVar = event.target.accountPassword.value;
		console.log("Account form submitted");

        //input validation could be done here

        //Create account 
		Accounts.createUser({
			email: emailVar,
			password: passwordVar
		});


		Session.set("createNewAccount", !Session.get("createNewAccount"));
	}
});