const {
    chunk,
    getDataFromBuffer,
    calcHash,
    isSameBuffer,
    readHexFromBuffer,
} = require('./utils');

const { TRAIT_HEAD, CRC_LENGTH } = require('./const');

/**
 * 检查文件校验值是否正确
 *
 * @param {Buffer} fileBuffer
 * @returns {String} CRC
 */
function checkFileCRC(fileBuffer) {
    const headBuffer = getDataFromBuffer(fileBuffer, 0, TRAIT_HEAD.length);
    const hash = getDataFromBuffer(fileBuffer, TRAIT_HEAD.length, CRC_LENGTH);
    const checkHeadMatched = isSameBuffer(Buffer.from(TRAIT_HEAD), headBuffer);
    if (!checkHeadMatched) {
        console.error('文件头数据不匹配', checkHeadMatched);
        process.exit(1);
    }
    return readHexFromBuffer(hash);
}

/**
 * 计算存档的校验值
 *
 * @param {Buffer} fileBuffer
 * @returns {String} CRC
 */
function calcFileCRC(fileBuffer) {
    const hash = calcHash(fileBuffer.slice(TRAIT_HEAD.length + CRC_LENGTH, fileBuffer.length));
    return `00000000${hash}`.slice(-8);
}

/**
 * 更新文件的校验值
 *
 * @param {Buffer} fileBuffer
 * @returns {Buffer} newFileBuffer
 */
function getBufferWithNewCRC(fileBuffer) {
    const headBuffer = getDataFromBuffer(fileBuffer, 0, TRAIT_HEAD.length);
    const bodyBuffer = getDataFromBuffer(fileBuffer, TRAIT_HEAD.length + CRC_LENGTH);
    const hash = calcFileCRC(fileBuffer);

    function makeHexString(hash) {
        return Buffer.from(chunk(hash.split(''), 2).map(n => parseInt(`0x${n.join('')}`, 16)).reverse());
    }

    return Buffer.concat([headBuffer, makeHexString(hash), bodyBuffer]);
}


module.exports = {
    checkFileCRC, calcFileCRC, getBufferWithNewCRC
};
