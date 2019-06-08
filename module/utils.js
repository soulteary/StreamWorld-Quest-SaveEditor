
const { crc32 } = require('crc');

function slice(array, start, end) {
    let length = array == null ? 0 : array.length
    if (!length) {
        return []
    }
    start = start == null ? 0 : start
    end = end === undefined ? length : end

    if (start < 0) {
        start = -start > length ? 0 : (length + start)
    }
    end = end > length ? length : end
    if (end < 0) {
        end += length
    }
    length = start > end ? 0 : ((end - start) >>> 0)
    start >>>= 0

    let index = -1
    const result = new Array(length)
    while (++index < length) {
        result[index] = array[index + start]
    }
    return result
}

function chunk(array, size) {
    size = Math.max(size, 0)
    const length = array == null ? 0 : array.length
    if (!length || size < 1) {
        return []
    }
    let index = 0
    let resIndex = 0
    const result = new Array(Math.ceil(length / size))

    while (index < length) {
        result[resIndex++] = slice(array, index, (index += size))
    }
    return result
}

function getDataFromBuffer(data, start, length) {
    if(length){
        return data.slice(start, start + length);
    }else{
        return data.slice(start, start + data.length);
    }
}

function isSameBuffer(buf, buf2) {
    return buf.every((char, idx) => char === buf2[idx]);
}

function readHexFromBuffer(data) {
    const buf = data.toString('hex').split('');
    return chunk(buf, 2).reverse().map(n => n.join('')).join('');
}

function calcHash(data) {
    return crc32(data).toString(16)
}

function calcDec(data) {
    const buf = data.toString('hex').split('');
    const hex = chunk(buf, 2).reverse().map(n => n.join('')).join('');
    return Number(`0x${hex}`);
}

module.exports = {
    chunk,
    calcHash,
    calcDec,
    getDataFromBuffer,
    isSameBuffer,
    readHexFromBuffer
}