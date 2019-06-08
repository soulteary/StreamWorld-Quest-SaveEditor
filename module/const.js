
module.exports = {
    // 存档文件文件头特殊标记
    TRAIT_HEAD: [0x53, 0x57, 0x47, 0x53, 0x01],
    // 存档文件校验值长度
    CRC_LENGTH: 4,

    // 存档文件金额特征字段
    TRAIT_MONEY: 'save_point',
    // 计划修改的金币数量
    CHEAT_MONEY: Buffer.from([0xFF, 0xFE]),

    // 火焰元素
    TRAIT_FIRE_BASIC: 'fire_basic',
    // 金属元素
    TRAIT_METAL_BASIC: 'metal_basic',
    // 魔法元素
    TRAIT_MYSTERIOUS_BASIC: 'mysterious_basic',
    // 自然元素
    TRAIT_NATURE_BASIC: 'nature_basic',
    // 幽灵元素
    TRAIT_SPOOKY_BASIC: 'spooky_basic',
    // 计划修改元素数量
    CHEAT_ELEMENT: Buffer.from([0x63]),
};