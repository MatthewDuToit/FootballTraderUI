define('bluebird', [], function () {
    return undefined;
});

require.config({
    baseUrl: '/scripts/lib',
    waitSeconds: 60,
    urlArgs: "v=" + (new Date).getTime(),
    "paths": {
        "react": "react-0.13.1",
        "react-dom": "react-dom",
        "JSXTransformer": "JSXTransformer",
        "jsx": "jsx",
        "text": "text",
        "jquery": "jquery-1.10.2",
        'eventEmitter' :  'jquery-pub-sub',
        "underscore": "underscore",
        "bootbox": "bootbox.min",
        "moment": "moment",
        "switch": "bootstrap-switch"
    },
    jsx: {
        fileExtension: '.jsx',
        harmony: true,
        stripTypes: true
    },
    "shim": {
        "jquery": {
            "exports": "$"
        },
        "underscore": {
            "exports": "_"
        }
    }
});

require(['react', 'react-dom', 'underscore',
    'jsx!../components/init'],
function (React, ReactDOM, _, init) {
    
   /// var initializeApplication = function () {
   // FixtureFilter = React.createFactory(FixtureFilter);
   // ReactDOM.render(FixtureFilter(), document.getElementById('traderFilterContainer'));

    init = React.createFactory(init);
    ReactDOM.render(init(), document.getElementById("FixtureFilterContainer"));

    //}

    /*
    eventBus.subscribe(constansts.INITIALIZE_APPLICATION, function(sender, result) {
        initializeApplication();
    });

    appDataStore.initialize();
    */
});


/*
require(['react', 'react-dom', 'underscore',
    'jsx!../components/filter/FixtureFilter',
    'jsx!../components/filter/FixtureSummaryNav',
    'jsx!../components/init',
    '../helpers/eventBus',
    '../enums/constants',
    '../actions/appDataStore'],
function (React, ReactDOM, _, FixtureFilter, FixtureSummaryNav, init, eventBus, constansts, appDataStore) {
    
    var initializeApplication = function () {

        FixtureFilter = React.createFactory(FixtureFilter);
        ReactDOM.render(FixtureFilter(), document.getElementById('FixtureFilterContainer'));

        FixtureSummaryNav = React.createFactory(FixtureSummaryNav);
        ReactDOM.render(FixtureSummaryNav(), document.getElementById('FixtureSummaryNavContainer'));


    }

    eventBus.subscribe(constansts.INITIALIZE_APPLICATION, function(sender, result) {
        initializeApplication();
    });

    appDataStore.initialize();

});

*/
