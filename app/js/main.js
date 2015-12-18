(function () {
    var app = new StatesView({
        el: $('.container')
    });
    _.extend(StatesView.prototype, StatesSort, StatesSearch);
    app.initSort();
    app.initSearch();
})();
