const sqlite = require('sqlite3').verbose();
let express = require("express");
let app = express();
let cors = require('cors');
// let bodyParser = require('body-parser');

let db = my_database('./phones.db');

app.use(cors());
app.use(express.json());

app.get("/get", function(req, res) {
    db.all(`SELECT * FROM phones`, function(err, rows) {
        if(err) {
            res.status(500);
            res.json(err);
        }

    	return res.json(rows);
    });
});

app.get("/get/:id", function(req, res) {
    let id = req.params.id;

    db.all(`SELECT * FROM phones WHERE id = ?`, [id], function(err, rows) {
        if(err) {
            res.status(500);
            res.json(err);
        }

    	return res.json(rows);
    });
});

app.patch("/update", function(req, res) {
    let body = req.body;
    let set = '';
    let setValues = [];
    let id = body.id;

    for (let key in body) {
        if(!['brand', 'model', 'os', 'screensize', 'image'].includes(key)) continue;

        set += key + ' = ?, ';
        setValues.push(body[key]);
    }

    set = set.slice(0, -2);

    db.run(`
        UPDATE phones
        SET ${set}
        WHERE id = ${id}
    `, setValues, function(err, data) {
        if(err) {
            res.status(500);
            res.json(err);
        }

    	return res.json(data);
    });
});

app.delete('/delete/:id', function(req, res) {
    let id = req.params.id;

    db.run('DELETE FROM phones WHERE id = ?', [id], function(err, data) {
        res.json({data: data, err: err});
    });
});

app.post("/create", function(req, res) {
    let data = [req.body.brand, req.body.model, req.body.os, req.body.screensize, req.body.image];

    db.run(`
        INSERT INTO phones (brand, model, os, screensize, image)
        VALUES(?, ?, ?, ?, ?);
    `, data, function(err, data) {
        res.json({data: data, err: err});
    });
});

app.listen(3000);

function my_database(filename) {
	// Conncect to db by opening filename, create filename if it does not exist:
	var db = new sqlite.Database(filename, (err) => {
  		if (err) {
			console.error(err.message);
  		}
  		console.log('Connected to the phones database.');
	});
	// Create our phones table if it does not exist already:
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
		db.all(`select count(*) as count from phones`, function(err, result) {
			if (result[0].count == 0) {
				db.run(`INSERT INTO phones (brand, model, os, image, screensize) VALUES (?, ?, ?, ?, ?)`,
				["Fairphone", "FP3", "Android", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Fairphone_3_modules_on_display.jpg/320px-Fairphone_3_modules_on_display.jpg", "5.65"]);
				console.log('Inserted dummy phone entry into empty database');
			} else {
				console.log("Database already contains", result[0].count, " item(s) at startup.");
			}
		});
	});
	return db;
}
