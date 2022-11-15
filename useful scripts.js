// создать файлики по имени папок
let Folder = '.';
const fs = require('fs');
fs.readdir(Folder, (err, files) => {
    files.forEach(file => {
        fs.closeSync(fs.openSync(file + '\\' + file + '.css', 'w'));
        fs.closeSync(fs.openSync(file + '\\' + file + '.js', 'w'));
    });
});

// создать пустое тело
fs.readdir(Folder, (err, files) => {
    files.forEach(file => {
        fs.appendFileSync(file + '\\' + file + '.js', `export default function ${file}() {}`)
    });
});

// создать одну папку и в ней все это
let nd = 'Page404'
fs.mkdirSync(nd)
fs.closeSync(fs.openSync(nd + '\\' + nd + '.css', 'w'));
fs.appendFileSync(nd + '\\' + nd + '.js', `export default function ${nd}() {}`)

// в начало дабавляем импорт css
fs.readdir(Folder, (err, files) => {
    files.forEach(folder => {
        let fname = folder + '\\' + folder + '.js'
        let data = fs.readFileSync(fname); //read existing contents into data
        let fd = fs.openSync(fname, 'w+');
        let newdata = `import \'./${folder}.css\';\n\n`
        fs.writeSync(fd, newdata); //write new data
        fs.appendFileSync(fd, data);
        fs.close(fd);
    });
});