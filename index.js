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

module.exports.MicroODM;

// class CollectionODM {
//   constructor(initialItens = {}) {
//     const configuration = {};
//     this.document = {};
//     this.document.type = this.constructor.name.toLowerCase();
//     configuration.type = {
//       get() {
//         return this.document.type;
//       },
//       set(value) {
//         this.document.type = value;
//       }
//     };
//     Object.defineProperties(this, configuration);
//     this.setOfItems = initialItens;
//   }

//   add(item) {
//     this.setOfItems.push(item);
//   }

//   find(info) {
//     const index = this.setOfItems.findIndex(item => {
//       return Object.keys(item).find(
//         key => item[key].toString() === info.toString()
//       );
//     });
//     return this.setOfItems[index];
//   }

//   delete(info) {
//     const index = this.setOfItems.findIndex(item => item.id === info.id);
//     this.setOfItems.splice(index, 1);
//   }

//   size() {
//     return this.setOfItems.length;
//   }

//   export() {
//     return JSON.stringify(this.setOfItems);
//   }

//   *iterator() {
//     // eslint-disable-next-line no-restricted-syntax
//     for (const item of this.setOfItems) {
//       yield item;
//     }
//   }
// }

// module.exports.CollectionODM;
