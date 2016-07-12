define(
    ["react", "jsx!../Components/Filter/FixtureFilter"],
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