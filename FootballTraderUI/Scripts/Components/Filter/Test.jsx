var TestBindingEventHandler = React.createClass({
        onChanged: function(idx, e) {
            alert("The index " + idx + " now contains " + e.target.value);
        },
        render: function() {
            var inputs = [0, 1, 2],
                inputElements = inputs.map(function(num, idx) {
                    return (
                        <div>
                            {idx}:<input type="text" onChange={this.onChanged.bind(this, idx)} />

                            <TradingStateItem onChange={this.onChanged.bind(this, idx)} value="1" name="Setup" />
                        </div>
                    );
                }.bind(this));

            return (
                <div>
                    {inputElements}
                </div>
            );
        }
});
 
React.render(<TestBindingEventHandler />, document.body);