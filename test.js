const sqlite = require('sqlite3').verbose();

let filename = './phones.db';

var db = new sqlite.Database(filename, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the phones database.');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS phones
        (id 	INTEGER PRIMARY KEY,
        brand	CHAR(100) NOT NULL,
        model 	CHAR(100) NOT NULL,
        os 	CHAR(10) NOT NULL,
        image 	CHAR(254) NOT NULL,
        screensize INTEGER NOT NULL
        )`);
});
