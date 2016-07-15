define(['underscore', 'eventEmitter', '../enums/constants'],
    function (_, eventEmitter, constants) {
        var subscribe = function (eventId, func) {
            eventEmitter.subscribe(eventId, func);
        }

        var publish = function (eventId, args) {
            eventEmitter.publish(eventId, args);
        }

        return {
            subscribe: subscribe,
            publish: publish
        }
    }
);

