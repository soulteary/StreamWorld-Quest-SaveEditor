const { getDataFromBuffer } = require('./utils');
const { TRAIT_HEAD, CRC_LENGTH, TRAIT_MONEY, CHEAT_MONEY } = require('./const');


function findMoneyOffset(fileBuffer) {
    // 从 Hash 后开始查找数值
    let moneyOffset = 0;
    for (let i = TRAIT_HEAD.length + CRC_LENGTH, j = fileBuffer.length; i < j; i++) {
        let find = getDataFromBuffer(fileBuffer, i, TRAIT_MONEY.length);
        if (find.toString() === TRAIT_MONEY) {
            moneyOffset = i + TRAIT_MONEY.length;
            break;
        }
    }
    if (!moneyOffset) {
        console.error('存档文件格式有误。');
        process.exit(1);
    }
    return moneyOffset;
}

/**
 * 获取存档金钱
 *
 * @param {Buffer} fileBuffer
 */
function getMoney(fileBuffer) {
    const offset = findMoneyOffset(fileBuffer);

    const buffer = getDataFromBuffer(fileBuffer, offset, 4);
    return buffer.readUInt16LE(0, 4);
}


/**
 * 更新存档金额
 *
 * @param {Buffer} fileBuffer
 */
function cheatMoney(fileBuffer) {
    const offset = findMoneyOffset(fileBuffer);
    return Buffer.concat([
        fileBuffer.slice(0, offset),
        CHEAT_MONEY,
        fileBuffer.slice(offset + CHEAT_MONEY.length)
    ]);
}

module.exports = {
    findMoneyOffset, getMoney, cheatMoney
};
