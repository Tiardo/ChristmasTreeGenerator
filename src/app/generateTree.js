const fs = require('fs');

function generateTree(floors, outputPath) {
    if (floors <= 1 || floors >= 21 || typeof floors !== 'number' || !Number.isInteger(floors))
    {
        throw new Error('Количество этажей должно быть от 2х до 20.');
    }

    const treeLines = [];
    const maxWidth = (floors + (floors - 1) * 3) * 2 + 1;

    const wSpaces = ' '.repeat(Math.floor((maxWidth - 1) / 2));
    treeLines.push(wSpaces + 'W');
    const starSpaces = ' '.repeat(Math.floor((maxWidth - 1) / 2));
    treeLines.push(starSpaces + '*');

    let linePlus = 1;

    for (let i = 2; i <= floors; i++) {
        let line = '';
        let branchWidth = (i + linePlus * 3) * 2;

        if (i % 2 !== 0) {
            branchWidth += 1;
        }
        if (i % 2 === 0) {
            branchWidth += 1;
        }

        const centerSpaces = ' '.repeat(Math.floor((maxWidth - branchWidth) / 2));
        line += centerSpaces;

        if (i % 2 === 0) {
            line += '@';
        }

        line += '* '.repeat(i + linePlus * 3);

        if (i % 2 !== 0) {
            line += '@';
        }

        linePlus += 1;
        treeLines.push(line);
    }

    const base = 'TTTTT';
    const baseSpaces = ' '.repeat(Math.floor((maxWidth - base.length) / 2));
    treeLines.push(baseSpaces + base);
    treeLines.push(baseSpaces + base);

    fs.writeFileSync(outputPath, treeLines.join('\n'), 'utf8');
    console.log(`Ёлка из ${floors} этажей сохранена в ${outputPath}`);
}


module.exports = { generateTree };
if (require.main === module) {
    const floors = parseInt(process.argv[2]);
    const outputPath = process.argv[3];

    if (!floors || !outputPath) {
        console.error('Используйте: node generateTree.js <количество_этажей> <путь_к_файлу>');
        process.exit(1);
    }
    generateTree(floors, outputPath);
}