import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Events } from '../../../imports/api/events-api.js';

// Template.createEventTemp.onCreated(function eventTempOnCreated() {
// 	Meteor.subscribe('events');
// });

Template.createEventTemp.events({
	'submit form': function(event) {
		event.preventDefault();
		// console.log("Event form submitted");

		var targetForm = event.target;
		var eventObj = {};

		for (var i = 0; i < targetForm.length - 1; i++) {
			if (targetForm[i].localName != "fieldset") {
				var theKey = targetForm[i].name;
				var theValue = targetForm[i].value;
				// console.log("i, name, value: ", i, theKey, theValue);
				eventObj[theKey] = theValue;
			}
		}
		// console.log("The event object: ", eventObj);

		// Insert event object into the collection
		Meteor.call('events.insert', eventObj);


	}
});