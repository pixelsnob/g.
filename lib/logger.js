
module.exports = function (context) {
    return function () {
        console.log(`[ ${context} ]`, [ ...arguments ].join(', '));
    };
};

