define(["react", "../../helpers/eventBus", "../../enums/constants"],
    function (React, eventBus, constants) {

        var TradingStateItem =  React.createClass({
            getInitialState: function() {
                return {
                    id: this.props.id,
                    name: this.props.name,
                    isSelected: this.props.isSelected
                }
            },
            onClick : function () {
                var self = this;

                eventBus.publish(constants.onTradingStateItemSelected, { id : self.state.id });
            },
            render : function () {
                var btnCssClass = this.props.isSelected ? "btn btn-small active" : "btn btn-small";

                return (
                    <button type="button" className={ btnCssClass } onClick={ this.onClick }>{ this.props.name }</button>
                );
            }
        });

        return TradingStateItem;
});