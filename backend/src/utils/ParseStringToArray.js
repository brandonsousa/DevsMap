module.exports = function parseStringToArray(stringToArray){
    return stringToArray.split(',').map(array => array.trim())
}