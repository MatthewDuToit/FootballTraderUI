define(["react", "../../helpers/eventBus", "../../enums/constants"],
    function (React, eventBus, constants) {

        var TraderItem = React.createClass({
            getInitialState : function() {
                return {
                    id: this.props.id,
                    isChecked: this.props.isChecked,
                    name: this.props.name,
                    location: this.props.location
                }
            },
            onChanged : function() {
                eventBus.publish(constants.onTraderItemSelected, { isChecked: !this.props.isChecked, id: this.props.id, name: this.props.name });
            },
            render : function() {
                var checkbox = this.props.isChecked ?
                    <input id="traderCheckBox" value="traderCheckbox" type="checkbox" checked="checked" onClick={ this.onChanged } /> :
                    <input id="traderCheckBox" value="traderCheckbox" type="checkbox" onClick={ this.onChanged } />;

                 return (
                    <li>
                        <label className="checkbox">
                            <span>{ this.props.name }{ this.props.location }</span>{ checkbox }
                        </label>
                    </li>
                 );
            }
       });

        return TraderItem;
});