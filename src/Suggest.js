function Suggest(list, filterFunction) {
  var suggest = ((this instanceof Suggest)? this : Object.create(Suggest.prototype));

  var defaultFilter = function(test) {
    return function(value){
      var v = (value.code + ' ' + value.name).toLowerCase();
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
