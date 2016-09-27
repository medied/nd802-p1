import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Events } from '../../../imports/api/events-api.js';

Template.createEventTemp.onRendered(function () {
	$("#input-event").validate({
		rules: {
			eventName: {
				required: true
			},
			eventType: {
				required: true
			},
			eventHost: {
				required: true
			},
			eventStart: {
				required: true,
				startNotThePast: true
			},
			eventEnd: {
				required: true,
				endNotThePast: true,
				endsAfterStart: true
			},
			eventGuest: {
				required: true
			},
			eventAddress: {
				required: true
			},
			eventCity: {
				required: true
			},
			eventState: {
				required: true
			},
			eventZip: {
				required: true
			},
			eventCountry: {
				required: true
			}
		},
		messages: {
			eventStart: {
				startNotThePast: "Start date/time can't be in the past."
			},
			eventEnd: {
				endNotThePast: "End date/time can't be in the past.",
				endsAfterStart: "End date/time can't be before or the same as the Start date/time."
			}
		}
	});
});

Template.createEventTemp.events({
	'submit form': function(event) {
		event.preventDefault();

		var targetForm = event.target;
		var eventObj = {};

		// Construct event object 
		for (var i = 0; i < targetForm.length - 1; i++) {
			if (targetForm[i].localName != "fieldset") {
				// Make date and time more friendly readable 
				if (targetForm[i].name == "eventStart") {
					var startHolder = new Date(targetForm[i].value);
					
					var eventStartDate = startHolder.toDateString();
					var eventStartHour = startHolder.getHours();

					eventObj["eventStartDate"] = eventStartDate;
					eventObj["eventStartHour"] = eventStartHour;
				}else if (targetForm[i].name == "eventEnd") {
					var endHolder = new Date(targetForm[i].value);
					
					var eventEndDate = endHolder.toDateString();
					var eventEndHour = endHolder.getHours();

					eventObj["eventEndDate"] = eventEndDate;
					eventObj["eventEndHour"] = eventEndHour;
				} else {
					var theKey = targetForm[i].name;
					var theValue = targetForm[i].value;
					eventObj[theKey] = theValue;
				}
			}
		}

		// Insert event object into the collection
		Meteor.call('events.insert', eventObj, function(error) {
			if (error)
					console.log(error);
				else 
					sAlert.success('Event successfully created!');
		});

		// Hide event form after submitting
		Session.set("createNewEvent", false);
	},
	'click .datetimepicker': function(event) {
		$('.datetimepicker').datetimepicker();
		console.log("click on .datetimepicker");
	}
});