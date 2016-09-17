import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Events } from '../imports/api/events-api.js';

import './main.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('events');
});

Template.body.onRendered(function () {
	Session.set("createNewAccount", false);
	Session.set("createNewEvent", false);
});

Template.body.helpers({
	createNewAccount: function () {
		return Session.get("createNewAccount");
	},
	createNewEvent: function () {
		return Session.get("createNewEvent");
	},
	eventsCreated() {
		return Events.find({}, { sort: { createdAt: -1 } });
	}
});

Template.body.events({
	'click #new-account': function(event){
		Session.set("createNewAccount", !Session.get("createNewAccount"));
		//Avoid the two forms to be displayed at the same time
		if (Session.get("createNewEvent") == true){
			Session.set("createNewEvent", false);
		}
		console.log("Changed createNewAccount to: ", Session.get("createNewAccount"));
	},
	'click #new-event': function(event){
		console.log("Clicked on button: " + event.currentTarget.id);
		Session.set("createNewEvent", !Session.get("createNewEvent"));
		//Avoid the two forms to be displayed at the same time
		if (Session.get("createNewAccount") == true){
			Session.set("createNewAccount", false);
		}
		console.log("Changed createNewAccount to: ", Session.get("createNewEvent"));
	}
});