define(["react", "../../helpers/eventBus", "../../enums/constants"],
    function(React, eventBus, constants) {

        var SelectAll = React.createClass({
            getInitialState : function() {
                return {
                    isAllSelected: this.props.isAllSelected,
                    traders: this.props.traders
                }
            },
            onChanged : function () {
                eventBus.publish(constants.onSelectAll, { isChecked : this.props.isAllSelected });
            },
            render : function () {
                if (_.size(this.props.traders) > 0) {
                    var checkbox = this.props.isAllSelected ?
                    <input id="selectAllCheckBox" value="selectAllCheckbox" type="checkbox" checked="checked" onClick={ this.onChanged } /> :
                    <input id="selectAllCheckBox" value="selectAllCheckbox" type="checkbox" onClick={ this.onChanged } />;

                    return (
                        <li>
                            <label className="checkbox">
                                <span>{ this.props.isAllSelected ? "Unselect All" : "Select All"}</span>{ checkbox }
                            </label>
                        </li>
                    );
                } else {
                    return (
                        <li>
                            <span>There are no traders available to select.</span>
                        </li>
                    );
                }
            }
        });

        return SelectAll;
});