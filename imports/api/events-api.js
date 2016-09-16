import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
	Meteor.publish('events', function eventsPublication() {
		return Events.find({});
	});
}

Meteor.methods({
	'events.insert'(eventObj) {
		Events.insert({
			eventObj,
			createdAt: new Date()
		});		
	}
});