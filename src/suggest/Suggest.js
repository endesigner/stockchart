function Suggest(list, filterFunction) {
  var suggest = ((this instanceof Suggest)? this : Object.create(Suggest.prototype));

  var defaultFilter = function(test) {
    return function(value){
      var v = (value[0] + ' ' + value[1]).toLowerCase();
      test = test.trim().toLowerCase();
      return RegExp(test).test(v);
    }
  };

  suggest._list = Array.isArray(list)? list : []
  suggest._filter = (typeof filterFunction === 'function')? filterFunction : defaultFilter;

  return suggest;
}

Suggest.prototype.get = function(hint) {
  return this._list.filter(this._filter(hint), this);
}

module.exports = Suggest;
