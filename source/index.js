import "@babel/polyfill";
class MicroODM {
  constructor(document = {}) {
    document.type = this.constructor.name.toLowerCase();
    document.name = this.constructor.name;
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
}

class CollectionODM {
  constructor(initialItens = []) {
    const configuration = {};
    this.document = {};
    this.document.type = this.constructor.name.toLowerCase();
    configuration.type = {
      get() {
        return this.document.type;
      },
      set(value) {
        this.document.type = value;
      }
    };
    Object.defineProperties(this, configuration);
    this.setOfItems = initialItens;
  }

  add(item) {
    this.setOfItems.push(item);
  }

  find(infoToSearch) {
    const keyToSearch = Object.keys(infoToSearch)[0];
    const indexIfFound = this.setOfItems.findIndex(itemToCompare => {
      return Object.keys(itemToCompare.document).find(keyFromItem => {
        if (keyFromItem === keyToSearch) {
          return (
            itemToCompare[keyFromItem].toString() ===
            infoToSearch[keyToSearch].toString()
          );
        }
      });
    });
    return this.setOfItems[indexIfFound];
  }

  delete(info) {
    const index = this.setOfItems.findIndex(item => item.id === info.id);
    this.setOfItems.splice(index, 1);
  }

  size() {
    return this.setOfItems.length;
  }

  export() {
    return JSON.stringify(this.setOfItems);
  }

  *iterator() {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of this.setOfItems) {
      yield item;
    }
  }
}

export { MicroODM, CollectionODM };
