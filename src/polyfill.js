Array.prototype.max = function () {
  return this.reduce(function (prev, v) {
    return prev > v ? prev : v;
  }, Number.NEGATIVE_INFINITY);
}