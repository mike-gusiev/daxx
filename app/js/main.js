(function () {
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
            _.bindAll(this, 'render', 'initCollection', 'initProperties', 'sortField', 'searchText', 'filterStates');
            this.initCollection();
            this.initProperties();

            var searchTemplate = _.template($('#searchTemplate').html());
            $(this.el).parent().prepend(searchTemplate());
            $('#input-search').on('keyup', this.searchText);
        },

        template: _.template($('#statesTemplate').html()),

        events: {
            'click th': 'sortField'
        },

        initCollection: function () {
            this.collection = new States;
            this.collection.fetch({
                success: this.render
            });
            this.collection.on('sort', this.render, this);
        },

        initProperties: function () {
            this.sortData = {
                a: 'asc',
                b: 'asc'
            };
        },

        getFieldName: function (elem) {
            var index = elem.currentTarget.cellIndex;
            var field = 'name';
            if (index === 0) {
                field = 'abbreviation';
            }
            return field;
        },

        getSortType: function (elem) {
            var index = elem.currentTarget.cellIndex;
            var result = 'desc';
            var target = 'a';
            if (index === 1) {
                target = 'b';
            }
            if (this.sortData[target] === 'desc') {
                result = 'asc';
            }
            this.sortData[target] = result;
            return result;
        },

        sortField: function (elem) {
            var field = this.getFieldName(elem);
            var sortType = this.getSortType(elem);
            this.collection.comparator = function (a, b) {
                var val1 = a.get(field);
                var val2 = b.get(field);
                var result = 0;

                if (val1 > val2) {
                    result = 1;
                }
                if (val1 < val2) {
                    result = -1;
                }
                if (sortType === 'desc') {
                    result = -result;
                }
                return result;
            }.bind(this);
            this.collection.sort();
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
            console.log('render!');
            $(this.el).html(this.template({
                states: this.collection.toJSON()
            }));
        }
    });

    var app = new StatesView({
        el: $('.daxx')
    });
})();
