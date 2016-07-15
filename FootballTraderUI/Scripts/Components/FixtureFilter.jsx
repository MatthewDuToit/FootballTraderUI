define(["react",
    "jquery",
    "../lib/math",
    "../app/storage",
    "../app/api",
    "../app/globals",
    "../helpers/eventBus",
    "../enums/constants",
    "../actions/stubs/traderStore",
    "jsx!../Components/Filter/TraderDropdownSelectedText",
    "jsx!../Components/Filter/SelectAll",
    "jsx!../Components/Filter/TraderItem",
    "jsx!../Components/Filter/TradingStateItem"],
    function(React, $, math, storage, api, globals, eventBus, constants, traderStore, TraderDropdownSelectedText, SelectAll, TraderItem, TradingStateItem) {
        function interceptEvent(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
        
        var queryString = function (isRecent, traders, tradingStates) {
            var output = "?";

            output = output.concat("IsRecent=");
            output = output.concat(isRecent);
            output = output.concat("&FromDate=2016/07/14&ToDate=2016/07/15");
            if (traders !== "") {
                output = output.concat("&Trader=");
                output = output.concat(traders);
            };
            output = output.concat("&TradingState=");
            output = output.concat(tradingStates);
            output = output.concat("&UseCache=false");
            
            return output;
        };

        var loggedInUser = "content";

        var fixtureFilterContainer = React.createClass({
            getInitialState : function() {
                return {
                    isAllSelected: false,
                    isRecent: true,
                    isOpen: false,
                    openCloseString: "input-prepend filter-trader btn-group",
                    selectedTraders: [],
                    tradingStateFlag: 0,
                    traders: {},
                    tradingStates: {
                        1 : { id : 1, name : "Setup", isSelected : false },
                        2 : { id : 2, name : "PMA", isSelected : false },
                        4 : { id : 4, name : "Ready", isSelected : false },
                        8 : { id : 8, name : "In-play", isSelected : false },
                        16 : { id : 16, name : "Settled", isSelected : false },
                        32 : { id : 32, name : "NonPMA", isSelected : false }
                    }
                }
            },
            componentDidMount : function() {
                var self = this;
                self.load();
                
                eventBus.subscribe(constants.onSelectAll, function () {
                    var tradersTemp = {}
                    var selectedTradersTemp = [];

                    var temp;
                    for (var property in self.state.traders) {
                        temp = self.state.traders[property];
                        temp.isChecked = !self.state.isAllSelected;

                        tradersTemp[property] = temp;

                        if (!self.state.isAllSelected) {
                            selectedTradersTemp.push(temp.name);
                        }
                    }

                    self.setState({ isAllSelected : !self.state.isAllSelected });
                    self.setState({ traders: tradersTemp });
                    self.setState({ selectedTraders: selectedTradersTemp });
                });

                eventBus.subscribe(constants.onTraderItemSelected, function (sender, data) {
                    var tradersTemp = self.state.traders;
                    
                    tradersTemp[data.id].isChecked = !tradersTemp[data.id].isChecked;
                    
                    var selectedTradersTemp = self.state.selectedTraders;

                    if (data.isChecked) {
                        selectedTradersTemp.push(data.name);
                    } else {
                        selectedTradersTemp = _.without(selectedTradersTemp, data.name);
                    }

                    self.setState({ isAllSelected : (_.size(selectedTradersTemp) === _.size(tradersTemp)) });
                    self.setState({ traders : tradersTemp });
                    self.setState({ selectedTraders: selectedTradersTemp });
                });

                eventBus.subscribe(constants.onTradingStateItemSelected, function(sender, data) {
                    var flagValue = data.id;

                    var tradingStatesTemp = self.state.tradingStates;
                    tradingStatesTemp[flagValue].isSelected = !tradingStatesTemp[flagValue].isSelected;

                    var tradingStateFlagTemp = self.state.tradingStateFlag;

                    console.log("after");
                    console.log(tradingStateFlagTemp);

                    console.log(typeof (tradingStateFlagTemp));

                    if (tradingStatesTemp[flagValue].isSelected) {
                        tradingStateFlagTemp += flagValue;
                    } else {
                        tradingStateFlagTemp -= flagValue;
                    }

                    storage.save("inrunning.filter.tradingstate", tradingStateFlagTemp);

                    self.setState({ tradingStateFlag : tradingStateFlagTemp });
                    self.setState({ tradingStates: tradingStatesTemp });
                });
            },
            load : function () {
                var self = this;

                var loadedTraders;

                traderStore.load(function (data) {
                    loadedTraders =  data;
                });

                var selectedTradersTemp = [];

                var tradersTemp = {};

                var temp;
                for (var property in loadedTraders) {
                    temp = {
                        id: parseInt(property),
                        name: loadedTraders[property].Name,
                        location: loadedTraders[property].Location,
                        isChecked: (loadedTraders[property].Name === loggedInUser) ? true : false
                };
                    if (loadedTraders[property].Name === loggedInUser) {
                        selectedTradersTemp.push(loggedInUser);
                    }

                    tradersTemp[property] = temp;
                }

                self.setState({ traders: tradersTemp });
                self.setState({ selectedTraders: selectedTradersTemp });

                var retrievedFlag = parseInt(storage.load("inrunning.filter.tradingstate"));

                var tradingStatesTemp = self.state.tradingStates;

                var totalFlag = retrievedFlag;

                for (var i = 5; i >= 0; i--) {
                    var currentFlag = math.pow(2, i);
                    
                    if (totalFlag >= currentFlag) {
                        tradingStatesTemp[currentFlag].isSelected = true;
                        totalFlag -= currentFlag;
                    }
                }
                
                self.setState({ tradingStateFlag: retrievedFlag });
                self.setState({ tradingStates : tradingStatesTemp });
            },
            toggleOpenClose : function (event) {
                interceptEvent(event);

                this.setState({ isOpen : !this.state.isOpen });
                this.setState({ openCloseString : this.state.isOpen ? "input-prepend filter-trader btn-group open" : "input-prepend filter-trader btn-group" });
            },
            onFilterClick: function () {
                var tradersFilter = (this.state.isAllSelected) ? "alltraders" : this.state.selectedTraders.join(",");
                
                api.getFixtures(queryString(tradersFilter, this.state.tradingStateFlag), 0, function (response) {
                    //TODO: Hook in

                    console.log(response);
                });
            },
            onResetClick : function () {
                var tradersTemp = {}

                var temp;
                for (var property in this.state.traders) {
                    temp = this.state.traders[property];
                    temp.isChecked = false;

                    tradersTemp[property] = temp;
                }

                this.setState({ isAllSelected: false });
                this.setState({ traders : tradersTemp });
                this.setState({ selectedTraders : [] });

                var tradingStatesTemp = {}
                
                for (var property in this.state.tradingStates) {
                    temp = this.state.tradingStates[property];
                    temp.isSelected = false;

                    tradingStatesTemp[property] = temp;
                }
                
                storage.save("inrunning.filter.tradingstate", 0);

                this.setState({ tradingStates : tradingStatesTemp });
                this.setState({ tradingStateFlag : 0 });
            },
            render : function () {
                var self = this;
                
                var selectAll = <SelectAll traders = { self.state.traders } isAllSelected = { self.state.isAllSelected } />;

                var traderList = _.map(self.state.traders, function(it) {
                    var props = it;

                    return ([<TraderItem {...props} />]);
                });

                var tradingStatesList = _.map(self.state.tradingStates, function (it) {
                     var props = it;

                    return ([<TradingStateItem {...props} />]);
                });

                return (
                    <div id="fixtureFilter">
                        <div id = "filter-trader" className = "control-group">
                           <div className = {self.state.openCloseString}>
                                <span className = "add-on">Trader</span>
                                <button className = "btn btn-small" onClick = { this.toggleOpenClose }>
                                    <TraderDropdownSelectedText tradersSelected = { _.size(self.state.selectedTraders) } tradersTotal = { _.size(self.state.traders) } />
                                    <span className = "caret" style = {{ marginLeft: 9 + "px" }}></span>
                                </button>
                                <ul className = "dropdown-menu" style = {{ width: 350 + "px" }}>
                                    { selectAll }
                                    { traderList }
                                </ul>
                           </div>
                        </div>
                        <div id = "filter-trading-state" className = "control-group">
                            <div className = "input-prepend filter-trading-state btn-group">
                                <span className = "add-on">Trading State</span>
                                { tradingStatesList }
                            </div>
                        </div>
                        <div id = "filter-actions" className = "control-group filter-actions">
                            <button className = "btn btn-small btn-success" onClick = { this.onFilterClick }>Filter</button>
                            <button className = "btn btn-small" onClick = { this.onResetClick }>Reset</button>
                        </div>
                    </div>
              );
            }
        });

        return fixtureFilterContainer;
    }
);
