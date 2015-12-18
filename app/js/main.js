(function () {

    var app = new StatesView({
        el: $('.daxx')
    });
    _.extend(StatesView.prototype, StatesSort, StatesSearch);
    app.initSort();
    app.initSearch();
})();
