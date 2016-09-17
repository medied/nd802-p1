import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Events } from '../../../imports/api/events-api.js';

// Template.createEventTemp.onCreated(function eventTempOnCreated() {
// 	Meteor.subscribe('events');
// });

Template.createEventTemp.events({
	'submit form': function(event) {
		event.preventDefault();

		var targetForm = event.target;
		var eventObj = {};

		// Construct event object 
		for (var i = 0; i < targetForm.length - 1; i++) {
			if (targetForm[i].localName != "fieldset") {
				var theKey = targetForm[i].name;
				var theValue = targetForm[i].value;
				eventObj[theKey] = theValue;
			}
		}

		// Insert event object into the collection
		Meteor.call('events.insert', eventObj);


	}
});