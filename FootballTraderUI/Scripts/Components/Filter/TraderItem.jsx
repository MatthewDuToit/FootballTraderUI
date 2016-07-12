define(["react", '../../helpers/eventBus', '../../enums/constants', 'jquery'],
    function(React, eventBus, constants, $) {
        return React.createClass({
            onChanged : function(e) {
                eventBus.publish(constants.onTraderItemSelected, { isChecked: $(e.currentTarget)[0].checked });
            },
            render: function () {
                return (
                <li>
                    <label className="checkbox">
                        <span>{this.props.Name}{ this.props.Location }</span><input type="checkbox" onClick={this.onChanged}/>
                    </label>
                </li>
              );
            }
        });
    }
);