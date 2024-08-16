import objMethods from '../constants/objMethods'

const getMethod = ({ module, object, action, context }) => {
    const obj = objMethods.find((item) => item.module === module);

    if (!obj || !obj.object || !obj.object[object]) {
        return false;
    }

    const actions = obj.object[object];

    if (!actions || !actions[action]) {
        return false;
    }

    const actionContext = actions[action];

    if (typeof actionContext === 'string') {
        return actionContext;
    }

    if (!actionContext || !actionContext[context]) {
        return false;
    }

    return actionContext[context];
}

export default getMethod;