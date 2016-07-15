define (["react"], function (React){
    var globals = {
        
    //ajaxInProgress: false,

    initialized: false,
    onFilterCallback: null,
        
    refreshing: false,
        
    editMode: false,
    fixtureEditModes: [],
    fixtures: {},
    disableMainLoader: false
        
};

globals.registerFixtureEditMode = function (observable) {

    observable.subscribe(function () {
        var result = false;
        globals.fixtureEditModes.forEach(function (obs) {
            if (obs() === true) result = true;
        });
        globals.editMode(result);
        globals.startStopAutoRefresh(!result);
    });
        
    globals.fixtureEditModes.push(observable);
};


    return globals;
})