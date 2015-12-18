(function () {

    var app = new StatesView({
        el: $('.daxx')
    });
    _.extend(StatesView.prototype, StatesFilter);
    app.initSort();
})();
