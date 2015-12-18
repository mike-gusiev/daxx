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
        _.bindAll(this, 'render', 'initCollection', 'searchText', 'filterStates');
        this.initCollection();

        var searchTemplate = _.template($('#searchTemplate').html());
        $(this.el).parent().prepend(searchTemplate());
        $('#input-search').on('keyup', this.searchText);
    },

    template: _.template($('#statesTemplate').html()),

    initCollection: function () {
        this.collection = new States;
        this.collection.fetch({
            success: this.render
        });
        this.collection.on('sort', this.render, this);
    },

    searchText: function (elem) {
        var textValue = $(elem.currentTarget).val();
        if (textValue === '') {
            this.render();
            return;
        }
        this.filterStates(textValue);
    },

    filterStates: function (value) {
        var result = new States(this.collection.search(value));
        $(this.el).html(this.template({
            states: result.toJSON()
        }));
    },

    render: function () {
        $(this.el).html(this.template({
            states: this.collection.toJSON()
        }));
        $(window).trigger('states_rendered', true);
    }
});
