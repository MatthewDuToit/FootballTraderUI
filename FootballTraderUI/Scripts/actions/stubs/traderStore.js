define(["../stubs/data/traderList"],
    function (data) {
        //// Actions
        return {
            load: function (callback) {
                callback(data);
            }
        }
    });