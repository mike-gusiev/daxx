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

        template: _.template($('#statesTemplate').html()),

        events: {
            'click th': 'sortField'
        },

        sortField: function (elem) {
            var index = elem.currentTarget.cellIndex;
            if (index === 0) {
                alert('sortByPostal');
            }
            if (index === 1) {
                alert('sortState');
            }
        },

        render: function () {
            $(this.el).html(this.template({
                states: this.collection.toJSON()
            }));
        }
    });

    var app = new StatesView({
        el: $('.container')
    });
})();
