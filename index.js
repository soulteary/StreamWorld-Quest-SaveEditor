const { readFileSync, writeFileSync, existsSync } = require('fs');
const { checkFileCRC, getBufferWithNewCRC } = require('./module/checksum');
const { getMoney, cheatMoney } = require('./module/money');
const { getElement, cheatElement } = require('./module/resource');


let fileName = './savegame_000.dat';

if (!existsSync(fileName)) {
    console.log('存档文件不存在', fileName);
    process.exit(0);
}

let saveData = readFileSync(fileName);
const hash = checkFileCRC(saveData)


const money = getMoney(saveData);
writeFileSync(fileName, getBufferWithNewCRC(cheatMoney(saveData)));
saveData = readFileSync(fileName);
console.log('背包金币', `${money} -> ${getMoney(saveData)}`);


const fire = getElement(saveData, 'fire');
writeFileSync(fileName, getBufferWithNewCRC(cheatElement(saveData, 'fire')));
saveData = readFileSync(fileName);
console.log('火焰元素', `${fire} -> ${getElement(saveData, 'fire')}`);


const metal = getElement(saveData, 'metal');
writeFileSync(fileName, getBufferWithNewCRC(cheatElement(saveData, 'metal')));
saveData = readFileSync(fileName);
console.log('金属元素', `${metal} -> ${getElement(saveData, 'metal')}`);


const mysterious = getElement(saveData, 'mysterious');
writeFileSync(fileName, getBufferWithNewCRC(cheatElement(saveData, 'mysterious')));
saveData = readFileSync(fileName);
console.log('魔法元素', `${mysterious} -> ${getElement(saveData, 'mysterious')}`);


const nature = getElement(saveData, 'nature');
writeFileSync(fileName, getBufferWithNewCRC(cheatElement(saveData, 'nature')));
saveData = readFileSync(fileName);
console.log('自然元素', `${nature} -> ${getElement(saveData, 'nature')}`);

const spooky = getElement(saveData, 'spooky');
writeFileSync(fileName, getBufferWithNewCRC(cheatElement(saveData, 'spooky')));
saveData = readFileSync(fileName);
console.log('幽灵元素', `${spooky} -> ${getElement(saveData, 'spooky')}`);



// 更新校验值
writeFileSync(fileName, getBufferWithNewCRC(saveData));
saveData = readFileSync(fileName);
const newHash = checkFileCRC(saveData);

console.log('更新哈希', `${hash} -> ${newHash}`)
