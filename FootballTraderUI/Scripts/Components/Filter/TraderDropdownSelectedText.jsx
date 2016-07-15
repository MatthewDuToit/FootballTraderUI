define(["react"],
    function(React) {

        var TraderDropdownSelectedText = React.createClass({
            getInitialState: function() {
                return {
                    tradersSelected: this.props.tradersSelected,
                    tradersTotal: this.props.tradersTotal
                }
            },
            render: function() {
                var selectedText = (this.props.tradersSelected === 0) ? "No Traders Selected" :
                (this.props.tradersSelected === this.props.tradersTotal) ? "All Traders" : this.props.tradersSelected + " of " + this.props.tradersTotal + " Traders Selected";

                return <span>{ selectedText }</span>;
            }
        });

        return TraderDropdownSelectedText;
});