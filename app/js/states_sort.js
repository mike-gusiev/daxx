var StatesSort = {

    initSort: function () {
        this.sortData = {
            a: 'asc',
            b: 'asc'
        };
        $(window).on('states_rendered', this.sortRendered.bind(this));
    },

    sortRendered: function () {
        $(this.el).find('th').on('click', function (elem) {
            this.sortField(elem);
        }.bind(this));
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
    }

};
