(function () {
    var State = Backbone.Model.extend();

    var States = Backbone.Collection.extend({
        model: State,
        url: '/data/states.json'
    });

    var StatesView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'render', 'sortField');
            this.collection = new States;
            this.collection.fetch({
                success: this.render
            });
            this.collection.on('sort', this.render, this);
        },

        template: _.template($('#statesTemplate').html()),

        events: {
            'click th': 'sortField'
        },

        sortField: function (elem) {
            var index = elem.currentTarget.cellIndex;
            this.collection.comparator = function (a, b) {
                var field = 'name';
                if (index === 0) {
                    field = 'abbreviation';
                }
                if (a.get(field) > b.get(field)) {
                    return 1;
                }
                if (a.get(field) < b.get(field)) {
                    return -1;
                }
                if (a.get(field) === b.get(field)) {
                    return 0;
                }
            };
            this.collection.sort();
        },

        render: function () {
            console.log('render!');
            $(this.el).html(this.template({
                states: this.collection.toJSON()
            }));
        }
    });

    var app = new StatesView({
        el: $('.container')
    });
})();
