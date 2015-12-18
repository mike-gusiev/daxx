var State = Backbone.Model.extend();

var States = Backbone.Collection.extend({
    model: State,
    url: '/data/states.json',

    search: function (letters) {
        if (letters === '') {
            return this;
        }
        var pattern = new RegExp(letters, 'gi');
        return this.filter(function (data) {
            return pattern.test(data.get('name'));
        });
    }
});

var StatesView = Backbone.View.extend({
    initialize: function () {
        _.bindAll(this, 'render');
        this.initCollection();
    },

    template: _.template($('#statesTemplate').html()),

    initCollection: function () {
        this.collection = new States;
        this.collection.fetch({
            success: this.render
        });
        this.collection.on('sort', this.render, this);
    },

    render: function () {
        $(this.el).html(this.template({
            states: this.collection.toJSON()
        }));
        $(window).trigger('states_rendered', true);
    }
});
