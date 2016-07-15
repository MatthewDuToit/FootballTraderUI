define(["require"], function (Require, fixtures, traders) {
    var _apiRootUrl = "http://localhost/IPAFootballRestService";
    var request = function (url, data, verb, headers) {
        if (!headers) headers = {};

        headers["X-Auth-Token"] = "Hello, lack of security";
        headers["X-Auth-User"] = "Hello, lack of security";

        var options = {
            url: url,// apiRootUrl + '/fixtures/' + this.fixtureId + path,
            context: this,
            headers: headers,
            data: data || null,
            type: verb || "GET",
            dataType: "json"
        };

        if (verb === "POST" || verb === "PUT" || verb === "DELETE") {
            options.contentType = 'application/json; charset=utf-8';
            options.data = JSON.stringify(data);
        }

        if (api.logRequests) {
            console.log({
                URL: options.url,
                TYPE: options.type,
                HEADERS: options.headers,
                DATA: options.data
            });
        }

        return $.ajax(options);
    };

    var api = {
        
        getTraderVariablesMetadata: function (callback) {
            var url = _apiRootUrl + '/variables/metadata';
            request(url).done(callback);
        },

        getTraders: function (callback) {
            var url = _apiRootUrl + '/trader/get';
            request(url).done(callback);
            callback(traders);
        },

        getFixtures: function (queryString, mode, successCallback, errorCallback) {
            var fixtureUrl = mode === 0 ? '/fixtures' : '/fixtureSummaries';
            var url = _apiRootUrl + fixtureUrl + queryString;
            request(url).done(successCallback).fail(errorCallback);
        },

        getFixture: function (fixtureId, callback) {
            var url = _apiRootUrl + '/fixture?fixtureId=' + fixtureId;
            request(url).done(callback);
        },
        getPointRecords: function (fixtureId, callback) {
            var url = _apiRootUrl + '/scorepoints?fixtureId=' + fixtureId;
            request(url).done(callback);
        },

        suspend: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/suspension?fixtureId=' + fixtureId;
            request(url, data, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },

        suspendImportantPoints: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/suspension/importantpoints?fixtureId=' + fixtureId;
            request(url, data, 'PUT').fail(callback);
        },

        suspendTotalPoints: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/suspension/totalpoints?fixtureId=' + fixtureId;
            request(url, data, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        suspendIndividualMarkets: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/suspension/individualmarkets?fixtureId=' + fixtureId;
            request(url, data, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        editScore: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/editscore?fixtureId=' + fixtureId;
            request(url, data, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        syncScore: function (fixtureId, callback) {
            var url = _apiRootUrl + '/synchronizescore?fixtureId=' + fixtureId;
            request(url, null, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        postVariables: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/variables?fixtureId=' + fixtureId;
            request(url, data, 'PUT').done(callback).fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },

        postAddOns: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/traderaddons?fixtureId=' + fixtureId;
            request(url, data, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },

        postTrader: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/trader/assign?fixtureId=' + fixtureId;
            request(url, data, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        forceSettlement: function (fixtureId, callback) {
            var url = _apiRootUrl + '/settle?fixtureId=' + fixtureId;
            request(url, null, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        forceRemove: function (fixtureId, callback) {
            var url = _apiRootUrl + '/remove?fixtureId=' + fixtureId;
            request(url, null, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        postMarketsAndLines: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/marketsandlinesoffering?fixtureId=' + fixtureId;
            request(url, data, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        postBaseVariables: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/variables?fixtureId=' + fixtureId;
            request(url, data, 'PUT').done(callback).fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        postGameFormat: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/gameformat?fixtureId=' + fixtureId;
            request(url, data, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        postSuspensionSettings: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/suspensionsettings?fixtureId=' + fixtureId;
            request(url, data, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        fixtureTakeControl: function (fixtureId, callback) {
            var url = _apiRootUrl + '/takecontrol?fixtureId=' + fixtureId;
            request(url, null, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        fixtureReleaseControl: function (fixtureId, callback) {
            var url = _apiRootUrl + '/releasecontrol?fixtureId=' + fixtureId;
            request(url, null, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        fixtureSetInPlay: function (fixtureId, callback) {
            var url = _apiRootUrl + '/setinplay?fixtureId=' + fixtureId;
            request(url, null, 'PUT').fail(callback); // The fail handler is called even when successful because dataType is 'json' and JQuery cannot parse the empty response.
        },
        calibrate: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/calibrate?fixtureId=' + fixtureId;
            request(url, data, 'PUT').done(callback).fail(callback);
        },
        getGameFormatVariablesMetadata: function (callback) {
            var url = _apiRootUrl + '/gameformat/metadata';
            request(url).done(callback);
        },
        postFirstServerSetting: function (fixtureId, data, callback) {
            var url = _apiRootUrl + '/nextserver?fixtureId=' + fixtureId;
            request(url, data, 'POST').fail(callback);
        },
        getFixtureAudit: function (fixtureId, callback) {
            var url = _apiRootUrl + '/fixture/audit/?fixtureId=' + fixtureId;
            request(url).done(callback);
        },
        applyCorrelationDefaults: function (fixtureId, callback) {
            var url = _apiRootUrl + '/applycorrelationdefaults?fixtureId=' + fixtureId;
            request(url, null, 'PUT').always(callback);
        },
        applyOvernightMode: function (fixtureId, isOvernightMode, callback) {
            var url = _apiRootUrl + '/overnightmode?fixtureId=' + fixtureId + '&isOvernightMode=' + isOvernightMode;
            request(url, null, 'POST').done(callback).fail(callback);
        },
        resetBrokenServiceGames: function (fixtureId, callback) {
            var url = _apiRootUrl + '/resetbrokenservicegames?fixtureId=' + fixtureId;
            request(url, null, 'PUT').done(callback).fail(callback);
        },
        resetFirstServerChangedBeforeMatchStart: function (fixtureId, callback) {
            var url = _apiRootUrl + '/resetfirstserverchangedbeforematchstart?fixtureId=' + fixtureId;
            request(url, null, 'PUT').done(callback).fail(callback);
        }
    };

    api.GameFormatVariables = {};
    api.TraderVariables = {};

    api.ajaxInProgress = false;
    api.logRequests = false;
    api.xAuthHeaders = null;

    return api;


})
