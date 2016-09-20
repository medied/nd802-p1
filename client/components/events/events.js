import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Events } from '../../../imports/api/events-api.js';

// Template.createEventTemp.onRendered(function () {
// 	$("#input-event").validate({
// 		rules: {
// 			eventName: {
// 				required: true
// 			},
// 			eventType: {
// 				required: true
// 			},
// 			eventHost: {
// 				required: true
// 			},
// 			eventStart: {
// 				required: true
// 			},
// 			eventEnd: {
// 				required: true
// 			},
// 			eventGuest: {
// 				required: true
// 			},
// 			eventAddress: {
// 				required: true
// 			},
// 			eventCity: {
// 				required: true
// 			},
// 			eventState: {
// 				required: true
// 			},
// 			eventZip: {
// 				required: true
// 			},
// 			eventCountry: {
// 				required: true
// 			}
// 		}
// 		// messages: {} // (validate dates)
// 	});
// });

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
					console.log("Processing start date");
					// var dateKey = targetForm[i].name;
					var startHolder = new Date(targetForm[i].value);
					
					var eventStartDate = startHolder.toDateString();
					var eventStartHour = startHolder.getHours();

					eventObj["eventStartDate"] = eventStartDate;
					eventObj["eventStartHour"] = eventStartHour;
				}else if (targetForm[i].name == "eventEnd") {
					console.log("Processing end date");
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
		Meteor.call('events.insert', eventObj);

		// Hide event form after submitting
		Session.set("createNewEvent", false);
	}
});

// $.validator.addMethod( 'bookUnique', ( title ) => {
//   let exists = Books.findOne( { "title": title }, { fields: { "title": 1 } } );
//   return exists ? false : true;
// });