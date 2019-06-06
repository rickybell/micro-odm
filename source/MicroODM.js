module.exports = class MicroODM {
  constructor(document = {}) {
    // console.log("document", document);
    document.type = this.constructor.name.toLowerCase();
    document.className = this.constructor.name;
    this.document = document;

    if (!this.document._id) this.document._id = Math.random().toString();

    const configuration = {};
    Object.keys(document).forEach(prop => {
      configuration[prop] = {
        get() {
          return this.document[prop];
        },
        set(value) {
          this.document[prop] = value;
        }
      };
    });
    Object.defineProperties(this, configuration);
  }
  export() {
    return JSON.stringify(this.document);
  }
};
