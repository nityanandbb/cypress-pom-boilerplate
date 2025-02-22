(function () {
  var fs, glob, list, path;

  fs = require("fs");

  glob = require("glob");

  path = require("path");

  /**
   * @param {Array} paths Path or array of paths to iterate over
   * @param {Object} [config] Configuration object
   * @param {Boolean} [config.recurse=false] Recurse into each directory?
   * @param {RegExp} [config.regex] Match files against a regex?
   * @param {Function} [iterator] Function to run on each file found
   * @return {Array} Files found
   */

  module.exports = list = function () {
    var args, config, iterator, paths, results, trypath;
    args = Array.prototype.slice.call(arguments);
    paths = args.shift();
    if (!Array.isArray(paths)) {
      paths = [paths];
    }
    config =
      typeof args[0] === "object" && Object.keys(args[0]).length
        ? args.shift()
        : {};
    if (config.recurse == null) {
      config.recurse = false;
    }
    if (config.match == null) {
      config.match = args[0] instanceof RegExp ? args.shift() : null;
    }
    if (typeof args[0] === "function") {
      iterator = args.shift();
    }
    results = [];
    while ((trypath = paths.shift())) {
      glob
        .sync(trypath, {
          nonegate: true,
        })
        .forEach(function (file) {
          var self;
          self = {
            path: path.dirname(file),
            full: file,
            file: path.basename(file),
            name: path.basename(file, path.extname(file)),
          };
          Object.defineProperty(self, "stat", {
            get: function () {
              return fs.statSync(self.full);
            },
          });
          if (config.recurse && fs.statSync(self.full).isDirectory()) {
            paths.push(self.full);
          }
          if (config.match && !file.match(config.match)) {
            return;
          }
          if (
            (config.type === "file" && !fs.statSync(self.full).isFile()) ||
            (config.type === "dir" && !fs.statSync(self.full).isDirectory())
          ) {
            return;
          }
          results.push(self);
          if (iterator) {
            return iterator.call(self, self);
          }
        });
    }
    return results;
  };
}).call(this);
