const { selectPlatfromMap } = require('../constants');

exports.getSelectPlatform = (selectedPlatformMethod) => {
    const selectedPlatforms = Object.keys(selectPlatfromMap).map(key => ({
        value: key,
        label: selectPlatfromMap[key],
        isSelected: selectedPlatformMethod == key,
    }));

    return selectedPlatforms;
}