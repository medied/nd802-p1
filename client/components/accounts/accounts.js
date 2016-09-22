import { Template } from 'meteor/templating';

Template.createAccountTemp.onRendered(function () {
	$("#input-account").validate({
		rules: {
			accountName: {
				required: true
			},
			accountEmail: {
				required:true
			}, 
			accountPassword: {
				required: true,
				minlength: 10
			}
		},
		messages: {
			accountPassword: {
				required: "Password must be at least 10 characters long"
			}
		}
	});
});

Template.createAccountTemp.events({
	'submit form': function(event) {
		event.preventDefault();

		var emailVar = event.target.accountEmail.value;
		var passwordVar = event.target.accountPassword.value;

        // Create account 
		Accounts.createUser({
			email: emailVar,
			password: passwordVar
		},	function(error) {
				if (error) {
					sAlert.error(error);
				}
				else { 
					sAlert.success('Account successfully created!');
				}
		});

		// Hide account form after submitting
		Session.set("createNewAccount", !Session.get("createNewAccount"));
	}
});