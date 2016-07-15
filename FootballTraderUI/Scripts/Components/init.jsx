define(
    ["react", "jsx!../Components/FixtureFilter"],
    function(React, FixtureFilter) {
        return React.createClass({
            render: function() {
                return (
                    <div>
                       <FixtureFilter />
                    </div>
                );
            }
        });
    }
)