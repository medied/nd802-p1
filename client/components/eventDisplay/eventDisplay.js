import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Events } from '../../../imports/api/events-api.js';
 
import './eventDisplay.html';

Template.eventDisplayTemp.events({
	'click .delete'() {
		Meteor.call('events.remove', this._id);
	}
});