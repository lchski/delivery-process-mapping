const fs = require('fs');

const data = fs.readFileSync('data.json');

const steps = JSON.parse(data);

let processed;

const flattenTitle = (objToFlatten) => {
    return Object.entries(objToFlatten).map((entry) => {
        const key = entry[0];
        const value = entry[1];

        return {
            title: key,
            ...value
        };
    });
};

const processRelative = ({title, type, children, relatives}) => {
    return {
        title,
        type,
        children,
        relatives: flattenTitle(relatives)
    }
};

// Flatten steps
processed = flattenTitle(steps);

processed = processed.map(({title, type, order, relatives}) => {
    return {
        title,
        type,
        order,
        relatives: flattenTitle(relatives).map((relative) => processRelative(relative))
    }
});

fs.writeFileSync('processed.json', JSON.stringify(processed));
