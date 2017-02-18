const getFS = () => {
    let fs = module.exports.fs;
    if (!fs) {
        try {
            fs = require('graceful-fs');
        } catch (err) {
            console.error('Failed to load \'graceful-fs\', using \'fs\'.');
            console.error(err);
            fs = require('fs');
        }
    }

    return fs;
};

const validObject = obj => (obj !== undefined && obj !== null);
const validFunction = func => (validObject(func) && (typeof func ===
    'function'));

const stripBom = data => {
    /* Check if it's a buffer and convert to a string as needed. */
    if (typeof data !== 'string') {
        /* 'instanceof' is error-prone for this, use a duck-type check. */
        if (data && 'byteLength' in data && 'copy' in data && 'write' in data) {
            /* Convert to a string. */
            data = data.toString('utf8');
        }
    }

    return require('strip-bom')(data);
};

const copyMap = map => {
    if (!validObject(map)) {
        return null;
    }

    const copy = {};

    for (const attr in map) {
        if (Object.prototype.hasOwnProperty.call(map, attr)) {
            copy[attr] = map[attr];
        }
    }

    return copy;
};

const throwWrap = (options, prefix, throwable, callback) => {
    throwable.message = `${prefix}${throwable.message}`;
    if (validFunction(callback)) {
        return callback(throwable);
    }

    if (options.throws) {
        throw throwable;
    }

    console.error(throwable);
    return null;
};

const validateOptions = options => {
    const defaultOptions = copyMap(module.exports.options);

    if (typeof options === 'string') {
        defaultOptions.encoding = options;
        return defaultOptions;
    }

    return (options || defaultOptions);
};

const readData = (options, read, callback) => {
    const useCallback = validFunction(callback);
    const prefixFile = `'${read.file}': `;

    if (read.err) {
        return throwWrap(options, prefixFile, read.err, callback);
    }

    try {
        const obj = JSON.parse(stripBom(read.data), options.reviver);
        return (useCallback ? callback(read.err, obj) : obj);
    } catch (err) {
        return throwWrap(options, prefixFile, err, callback);
    }
};

const readFile = (file, options, callback) => {
    if (!validFunction(callback)) {
        if (!validFunction(options)) {
            console.error('No valid callback function provided.');
        }

        callback = options;
        options = null;
    }

    options = validateOptions(options);

    return getFS().readFile(file, options, (err, data) => {
        return readData(file, options, err, data, callback);
    });
};

const readFileSync = (file, options) => {
    options = validateOptions(options);

    try {
        const data = getFS().readFileSync(file, options);
        return readData(file, options, null, data, null);
    } catch (err) {
        return readData(file, options, err, null, null);
    }
};

const writeFile = (file, obj, options, callback) => {
    if (!validFunction(callback)) {
        if (!validFunction(options)) {
            console.error('No valid callback provided, using default.');
            options = err => {
                console.error(err);
            };
        }

        callback = options;
        options = null;
    }

    options = validateOptions(options);

    const json = JSON.stringify(obj, options.replacer, options.spaces);
    return getFS().writeFile(file, json, options, err => {
        return throwWrap(options, `'${file}': `, err, callback);
    });
};

const writeFileSync = (file, obj, options) => {
    options = validateOptions(options);

    const json = JSON.stringify(obj, options.replacer, options.spaces);
    try {
        getFS().writeFileSync(file, json, options);
        return true;
    } catch (err) {
        throwWrap(options, `'${file}': `, err, null);
        return false;
    }
};

/* Export our options, public functions and configurable fs. */
const moduleExport = require('module-export')(module);

/* Export the API */
moduleExport({
    readFile,
    readFileSync,
    writeFile,
    writeFileSync
});

/* Export configurables */
moduleExport({
    fs: null,
    options: {
        encoding: 'utf8',
        throws: false,
        reviver: null,
        replacer: null,
        spaces: 0
    }
});

/* Export test-only */
moduleExport({
    copyMap,
    getFS,
    stripBom,
    throwWrap,
    validateOptions,
    validFunction,
    validObject
}, true);
