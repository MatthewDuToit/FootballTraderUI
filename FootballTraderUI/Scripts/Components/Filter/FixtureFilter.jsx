define(["react", "../../helpers/eventBus", "../../enums/constants", "../../actions/stubs/traderStore"],
    function(React, eventBus, constants, traderStore) {
        var TraderDropDownSelectedText = React.createClass({
            getInitialState: function () {
                return {
                    tradersSelected: this.props.tradersSelected,
                    tradersTotal: this.props.tradersTotal
                }
            },
            render: function () {
                var selectedText = this.props.tradersSelected === 0 ? "No Traders Selected" :
                    this.props.tradersSelected === this.props.tradersTotal ? "All Traders" : this.props.tradersSelected + " of " + this.props.tradersTotal + " traders selected";

                return <span>{selectedText}</span>;
            }
        });

        var SelectAll = React.createClass({
            getInitialState: function() {
                return {
                    traders: this.props.traders
                }
            },
            onChanged: function (e) {
                eventBus.publish(constants.onSelectAll, { isChecked: $(e.currentTarget)[0].checked });
            },
            render: function () {
                if (this.props.traders > 0) {
                    return (
                        <li>
                            <label className="checkbox">
                                <span>Select All</span><input type="checkbox" onClick={this.onChanged}  />
                            </label>
                        </li>
                    );
                } else {
                    return <li>There are no traders available to select.</li>;
                }
            }
        });

        var TraderItem = React.createClass({
            getInitialState: function() {
                return {
                    id: this.key,
                    isSelected: this.isSelected,
                    TraderName: this.props.Name,
                    Location: this.props.Location

                }
            },
            onChanged: function(e) {
                eventBus.publish(constants.onTraderItemSelected, { isChecked: $(e.currentTarget)[0].checked, id: this.state.TraderName });
            },
            render: function() {
                var checkbox = this.props.isSelected ?
                    <input id="traderCheckBox" value="traderCheckbox" type="checkbox" checked="checked" onClick={this.onChanged } /> :
                    <input id="traderCheckBox" value="traderCheckbox" type="checkbox" onClick={this.onChanged } />;
             
                 return (
                    <li>
                        <label className="checkbox">
                            <span>{this.state.TraderName}{ this.state.Location }</span>{checkbox}
                        </label>checkbox
                    </li>
                 );
            }
       });

        var tradingStateItem =  React.createClass({
            getInitialState: function() {
                return {
                    id: this.props.id,
                    StateName: this.props[1]
                }
            },
            onChanged : function(e) {
                eventBus.publish(constants.onTradingStateItemSelected, { isChecked: $(e.currentTarget)[0].checked, id: this.state.id });
            },
            render: function () {
                return (
                <li>
                    <label className="checkbox">
                        <span>{this.state.StateName}</span><input type="checkbox" onClick={this.onChanged} />
                    </label>
                </li>
                );
            }
        });

        var fixtureFilterContainer = React.createClass({
            getInitialState: function() {
                {/* TODO: add current user as default */}
                return {
                    isRecent: true,
                    selectedTraders: [], 
                    selectedTradingStates: 0,
                    traders: [],
                    isAllSelected: false
                }
            },
            componentDidMount: function() {
                var self = this;
                self.load();

                eventBus.subscribe(constants.onSelectAll, function (sender, data) {
                    data.isChecked ? self.state.selectedTraders = self.state.traders : self.state.selectedTraders = [];

                    self.setState({ isAllSelected: data.isChecked });
                });

                eventBus.subscribe(constants.onTraderItemSelected, function (sender, data) {
                    var traders;

                    if (data.isChecked) {
                        traders = self.state.selectedTraders;
                        traders.push(data.id);
                    }

                    else
                        traders = _.without(self.state.selectedTraders, data.id);

                    self.setState({ selectedTraders: traders });
                });

                eventBus.subscribe(constants.onTradingStateItemSelected, function(sender, data) {
                    var tradingStates;

                    if (data.isChecked)
                        tradingStates = self.state.selectedTradingStates += data.id;
                    else
                        tradingStates = self.state.selectedTradingStates -= data.id;

                    self.setState({ selectedTradingStates: tradingStates });
                });
            },
            load: function() {
                var self = this;

                traderStore.load(function (data) {
                    self.setState({ traders: data });
                });
            },
            render: function () {
                var self = this;

                var traders = this.state.traders;
                var traderList = _.map(traders, function(it) {
                    var props = it;

                    return ([<TraderItem key = {it.Id } isSelected = { self.state.isAllSelected } {...props}/>]);
                });

                var tradingStates = [[1, "Setup"], [2, "PMA"], [4, "Ready"], [8, "In-Play"], [16, "Settled"], [32, "NonPMA"]];
                var tradingStatesList = _.map(tradingStates, function(it) {
                    var props = it;
                    
                    return ([<tradingStateItem id = {it[0]} {...props} />]);
                });

                return (
                    <div id="fixtureFilter">
                        <div id="filterTrader" className="control-group">
                            <div className="input-prepend filter-trader btn-group">
                                <span className="add-on">Trader</span>
                                <button className="btn btn-small">
                                    <TraderDropDownSelectedText tradersSelected={self.state.selectedTraders.length} tradersTotal={self.state.traders.length} />
                                    <span className="caret" style={{ marginLeft: 9 + "px" }}></span>
                                </button>
                                <ul className="dropdown-menu" style={{ width: 350 + "px" }} >
                                    <SelectAll traders={self.state.traders.length} />
                                    {traderList}
                                </ul>
                            </div>
                        </div>
                        <div>{tradingStatesList}</div>
                  </div>
              );
            }
        });

        return fixtureFilterContainer;
    }
);