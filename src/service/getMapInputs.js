const getMapInputs = ({ mapaInfo, idInputs = [] }) => {
    return idInputs.reduce((obj, key) => {
        obj[key] = mapaInfo.get(key).info.value;
        return obj;
    }, {});
};

export default getMapInputs;