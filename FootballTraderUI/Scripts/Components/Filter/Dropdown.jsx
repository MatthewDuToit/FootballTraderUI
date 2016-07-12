define(["react", "jquery", "../../lib/select-box"],
    function(React, $, selectBox) {
        var SelectBox = React.createFactory(selectBox);

        var div = React.createElement("div", { className: "example" }, "");
        var option = React.createElement("option", null, "");
        var h1 = React.createElement("h1", null, "Multi Select Example");

        var Example = React.createClass({
            displayName: 'Example',
            getInitialState: function() {
                return {
                    colors: this.props.colors
                };
            },
            handleMultiChange: function(colors) {
                this.setState({ colors: colors });
            },
            render: function() {
                return(
                    <div>
                        <SelectBox label="Favorite Colors" onChange={this.handleMultiChange} value={this.state.colors} multiple={true}>
                            <option id='red' value='Red'/>
                            <option id='blue' value='Blue' />
                            <option id='green' value='Green' />
                        </SelectBox>
                    </div>
                );
            }


        });

        //React.render(Example(null), $('#Dropdown'));

        return Example;
    }
);