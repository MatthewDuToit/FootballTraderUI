define([], function () {

    var storage = {

        localStorageSupported: function () {
            return (typeof (Storage) !== "undefined");
        },
        save: function (key, value) {
            if (this.localStorageSupported()) {
                // Store
                localStorage.setItem(key, value);
            }
        },
        load: function (key) {
            if (this.localStorageSupported()) {
                // Retrieve
                return localStorage.getItem(key);
            }

            return '';
        }

    };

    return storage;

})
