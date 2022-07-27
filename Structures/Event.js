/*
Handler des évènements
Lien de la vidéo : https://www.youtube.com/watch?v=uE5gEKd2se4
*/

/** @format */

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {Client} client
 * @param {Discord.ClientEvents[K]} eventArgs
 */

/**
 * @template {keyof Discord.ClientEvents} K
 */

class Event {

	/**
	 * @param {K} event
	 * @param {RunFunction<K>} runFunction
	 */

	constructor(event, runFunction) {

		this.event = event;
		this.run = runFunction;
	}
}

module.exports = Event;

