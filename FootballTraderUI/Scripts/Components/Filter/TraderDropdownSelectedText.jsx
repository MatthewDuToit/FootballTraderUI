define(["react"],
    function (React) {
        return React.createClass({
            getInitialState: function() {
                return {
                    tradersSelected: 0,
                    tradersTotal: 0
                }
            },
            componentDidMount: function () {
                var self = this;

                self.tradersSelected = this.props.tradersSelected;
                self.tradersTotal = this.props.tradersTotal;
            },
            render: function () {
                var selectedText = this.tradersSelected === 0 ? "No Traders Selected" :
                        this.tradersSelected === this.tradersTotal ? "All Traders" : this.tradersSelected + " of " + this.tradersTotal + " traders selected";
                return (
                  <span>{selectedText}</span>
                );
            }
        });
    }
);