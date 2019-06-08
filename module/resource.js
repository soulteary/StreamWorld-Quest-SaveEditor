const { getDataFromBuffer } = require('./utils');
const {
    TRAIT_HEAD, CRC_LENGTH,
    TRAIT_FIRE_BASIC, TRAIT_METAL_BASIC, TRAIT_MYSTERIOUS_BASIC, TRAIT_NATURE_BASIC, TRAIT_SPOOKY_BASIC, CHEAT_ELEMENT
} = require('./const');


function findOffset(fileBuffer, findTrait) {
    let targetTrait = '';

    const allowList = ['fire', 'metal', 'mysterious', 'nature', 'spooky'];
    const traitList = [TRAIT_FIRE_BASIC, TRAIT_METAL_BASIC, TRAIT_MYSTERIOUS_BASIC, TRAIT_NATURE_BASIC, TRAIT_SPOOKY_BASIC];

    let pos = allowList.indexOf(findTrait);
    if (pos > -1) {
        targetTrait = traitList[pos];
    } else {
        console.error('存档文件格式有误。');
        process.exit(1);
    }

    let offset = 0;
    for (let i = TRAIT_HEAD.length + CRC_LENGTH, j = fileBuffer.length; i < j; i++) {
        let find = getDataFromBuffer(fileBuffer, i, targetTrait.length);
        if (find.toString() === targetTrait) {
            offset = i + targetTrait.length;
            break;
        }
    }
    if (!offset) {
        console.error('存档文件格式有误。');
        process.exit(1);
    }
    return offset;
}


/**
 * 获取存档元素
 *
 * @param {Buffer} fileBuffer
 */
function getElement(fileBuffer, trait) {
    const offset = findOffset(fileBuffer, trait);
    const buffer = getDataFromBuffer(fileBuffer, offset, 4);
    return buffer.readUInt16LE(0, 4);
}


/**
 * 更新存档元素
 *
 * @param {Buffer} fileBuffer
 * @param {String} trait
 */
function cheatElement(fileBuffer, trait) {
    const offset = findOffset(fileBuffer, trait);
    return Buffer.concat([
        fileBuffer.slice(0, offset),
        CHEAT_ELEMENT,
        fileBuffer.slice(offset + CHEAT_ELEMENT.length)
    ]);
}


module.exports = {
    getElement, cheatElement
};
