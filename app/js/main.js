(function () {
    var State = Backbone.Model.extend();

    var States = Backbone.Collection.extend({
        model: State,
        url: '/data/states.json'
    });

    var StatesView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'render');
            this.collection = new States;
            this.collection.fetch({
                success: this.render
            });
        },

        render: function () {
            console.log(this.collection.toJSON());
        }
    });

    var app = new StatesView({
        el: $('.container')
    });
})();
