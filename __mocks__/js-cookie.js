class Cookies {
  db = {};
  get = (key) => this.db[key];
  set = (key, value) => this.db[key] = value;
  remove = (key) => delete this.db[key];
}

module.exports = new Cookies();