import MicroODM from "./MicroODM";
module.exports = class ContextMicroODM extends MicroODM {
  constructor(params = undefined) {
    let documentPropertiesProxy = undefined;
    let joinNestedPropertiesAndAnotherParams = undefined;
    let nestedProperties = {};
    let validators = {};

    if (params !== undefined) {
      if (
        params.hasOwnProperty("nestedProperties") &&
        params.nestedProperties !== undefined &&
        params.nestedProperties instanceof Object
      ) {
        nestedProperties = params.nestedProperties;
        delete params.nestedProperties;
      }
      if (
        params.hasOwnProperty("validators") &&
        params.validators !== undefined &&
        params.validators instanceof Object
      ) {
        validators = params.validators;
        delete params.validators;
      }
    } else {
      params = {};
    }

    documentPropertiesProxy = new Proxy({}, validators);

    joinNestedPropertiesAndAnotherParams = {
      ...nestedProperties,
      ...params
    };

    Object.keys(joinNestedPropertiesAndAnotherParams).forEach(prop => {
      documentPropertiesProxy[prop] =
        joinNestedPropertiesAndAnotherParams[prop];
    });
    super(documentPropertiesProxy);
  }
};
