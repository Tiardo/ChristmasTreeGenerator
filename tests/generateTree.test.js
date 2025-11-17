const { generateTree } = require('../src/app/generateTree');
const fs = require('fs');
const path = require('path');

    describe('generateTree', () => {
    const testOutputPath = path.join(__dirname, 'test_tree.txt');

    afterEach(() => {
        if (fs.existsSync(testOutputPath)) {
            fs.unlinkSync(testOutputPath);
        }
    });

    test('выбрасывает ошибку при количестве этажей менее 2х', () => {
        expect(() => generateTree(1, testOutputPath)).toThrow('Количество этажей должно быть от 2х до 20.');
    });
    test('выбрасывает ошибку при отрицательном количестве этажей', () => {
         expect(() => generateTree(-1, testOutputPath)).toThrow('Количество этажей должно быть от 2х до 20.');
    });
    test('выбрасывает ошибку при пороговом количестве этажей', () => {
         expect(() => generateTree(21, testOutputPath)).toThrow('Количество этажей должно быть от 2х до 20.');
    });

    test('Передаются не пустые данные', () => {
        generateTree(2, testOutputPath);
        const content = fs.readFileSync(testOutputPath, 'utf8');
        expect(content.trim()).not.toBe('');
    });

    test('генерирует ёлку с 2 этажами', () => {
        generateTree(2, testOutputPath);
        const content = fs.readFileSync(testOutputPath, 'utf8');
        expect(content).toBe('     W\n     *\n@* * * * * \n   TTTTT\n   TTTTT');
    });

    test('создаёт файл по указанному пути', () => {
        generateTree(2, testOutputPath);
        expect(fs.existsSync(testOutputPath)).toBe(true);
    });

    test('выбрасывает ошибку, если floors не является числом', () => {
        const nonNumericFloors = [undefined, null, '', ' ', NaN, Infinity];
        nonNumericFloors.forEach(floors => {
            expect(() => generateTree(floors, 'output.txt'))
                .toThrowError("Количество этажей должно быть от 2х до 20.");
        });
    });

    test('выбрасывает ошибку, если outputPath не указан', () => {
        const invalidPaths = [undefined, null, '', ' '];
        invalidPaths.forEach(path => {
            expect(() => generateTree(1, path))
                .toThrowError("Количество этажей должно быть от 2х до 20.");
        });
    });

});