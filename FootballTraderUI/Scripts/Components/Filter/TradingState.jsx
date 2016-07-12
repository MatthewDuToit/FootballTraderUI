define(["react"],
    function(React) {
        return React.createClass({
            render: function () {
                return (
                <li>
                    <label className="checkbox" id={this.props.id}>
                        <span>{this.props.Name}</span><input type="checkbox" onClick={this.props.onChange}/>
                    </label>
                </li>
              );
            }
        });
    }
);