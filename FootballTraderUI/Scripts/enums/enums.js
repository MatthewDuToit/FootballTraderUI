define(["underscore", "../enums/enums"],
    function (_, enums) {
        "use strict";

        var baseEnum = {
            members: [],
            fromValue: function (val) {
                return _.find(this.members, function (m) {
                    return m.v === val;
                });
            }
        };

        var suspensionTypeEnum = {
            None: {
                desc: "None",
                name: "Unknown",
                v: 0
            },
            SuspendAll: {
                desc: "Suspend All",
                name: "SuspendAll",
                v: 1
            },
            ImportantPoints: {
                desc: "Suspend Important Points",
                name: "SuspendImportantPoints",
                v: 2
            },
            GameWinners: {
                desc: "Game Winners",
                name: "SuspendGameWinner",
                v: 3
            },
            GameRelatedDerivatives: {
                desc: "Game Related Derivatives",
                name: "SuspendGameDerivatives",
                v: 4
            },
            Core: {
                desc: "Core Markets",
                name: "SuspendCoreMarkets",
                v: 5
            },
            AllExceptGameWinner: {
                desc: "SuspendAllExceptNextGameWinner",
                name: "Unknown",
                v: 6
            },

            init: function () {
                this.members = [this.None, this.SuspendAll, this.ImportantPoints, this.GameWinners, this.GameRelatedDerivatives, this.Core, this.AllExceptGameWinner];
                return this;
            }
        }.init();

        var suspensionType = _.extend({}, baseEnum, suspensionTypeEnum);

        var tradingStateEnum = {
            None: {
                desc: "None",
                v: 0
            },
            Setup: {
                desc: "Setup",
                v: 1
            },
            Pma: {
                desc: "PMA",
                v: 2
            },
            Ready: {
                desc: "Ready",
                v: 4
            },
            InPlay: {
                desc: "In-Play",
                v: 8
            },
            Settled: {
                desc: "Settled",
                v: 16
            },
            NonPma: {
                desc: "Non-PMA",
                v: 32
            },

            init: function () {
                this.members = [this.None, this.Setup, this.Pma, this.Ready, this.InPlay, this.Settled, this.NonPma];
                return this;
            }
        }.init();

        var tradingState = _.extend({}, baseEnum, tradingStateEnum);

        var suspensionOwnerEnum = {
            None: {
                desc: "None",
                name: "Unknown",
                v: 0
            },
            Feed: {
                desc: "Feed",
                name: "Feed",
                v: 1
            },
            Trader: {
                desc: "Trader",
                name: "Trader",
                v: 2
            },
            TradingRules: {
                desc: "Trading Rules",
                name: "TradingRules",
                v: 3
            },

            init: function () {
                this.members = [this.None, this.Feed, this.Trader, this.TradingRules];
                return this;
            }
        }.init();

        var suspensionOwner = _.extend({}, baseEnum, suspensionOwnerEnum);

        return {
            suspensionType  : suspensionType,
            tradingState    : tradingState,
            suspensionOwner : suspensionOwner
        }
    });