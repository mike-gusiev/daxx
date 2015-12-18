var StatesSearch = {

    initSearch: function () {
        var searchTemplate = _.template($('#searchTemplate').html());
        $(this.el).parent().prepend(searchTemplate());
        $('#input-search').on('keyup', this.searchText.bind(this));
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
    }

};
