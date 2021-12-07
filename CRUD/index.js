const hbs = require('hbs');
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const session = require('express-session');
const { response } = require('express');

app.use(express.json());
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }))

//DATABASE
const dbConnection = require('./connection/db.js')
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const pathFile = "http://localhost:4000/uploads/"


app.use(
    session({
        cookie: {
            maxAge: 2 * 60 * 60 * 1000,
            secure: false,
            httpOnly: true
        },
        store: new session.MemoryStore(),
        saveUninitialized: false,
        resave: false,
        secret: 'secretValue'
    })
)

app.use((request, response, next) => {
    response.locals.message = request.session.message
    delete request.session.message
    next()
})

const uploadFile = require('./middlewares/uploadFile')


// const session = require('express-session');

const {dirname} = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', function(req, res){

    const query = `SELECT * FROM heroes_tb ORDER BY id DESC`
    // const query = `SELECT heroes_tb.*, type_tb.name FROM heroes_tb INNER JOIN type_tb ON heroes_tb.type_id = type_tb.id;`

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, (err, results) => {
            if(err) throw err
            
            let heroes = []
            
            for(let result of results){
                heroes.push({
                    ...result,
                    photo: pathFile + result.photo
                })
            }
            if(results.length == 0){
                heroes = false
            }
            res.render('index', {
                title : "home",
                heroes
            })
        })

        conn.release()
    })
    
})

app.get('/add-data', function(req, res){
    res.render('add-data', {
        title : "add-data"
    })
})

app.post('/add-data', uploadFile('photo') , function(request, response){
    const { name, type_id } = request.body
    const photo = request.file.filename

    if (name == '' || type_id == '') {
        request.session.message = {
            type: "danger",
            message: 'please insert all field'
        }
        return response.redirect('/add-data')
    }

    const query = `INSERT INTO heroes_tb (name, type_id, photo) VALUES ('${name}',${type_id}, '${photo}' );`

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, (err, results) => {
            if (err) {
                response.redirect('/add-data')
            } else {
                request.session.message = {
                    type: "success",
                    message: 'Success upload'
                }
                return response.redirect(`/info-data/${results.insertId}`)
            }
        })
        conn.release()
    })

})


app.get('/edit-data', function(req, res){
    res.render('edit-data', {
        title : "edit"
    })
})


app.get('/add-type', function(req, res){
    res.render('add-type', {
        title : "add-type"
    })
})

app.post('/add-type', function(request, response){
    const { name } = request.body

    if (name == '') {
        request.session.message = {
            type: "danger",
            message: 'please insert all field'
        }
        return response.redirect('/add-type')
    }

    const query = `INSERT INTO type_tb (name) VALUES ("${name}");`

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, (err, results) => {
            if (err) {
                response.redirect('/add-type')
            } else {
                request.session.message = {
                    type: "success",
                    message: 'Success upload'
                }
                return response.redirect(`/`)
            }
        })
        conn.release()
    })

})

app.get('/info-data/:id', function(req, res){
    const { id } = req.params;

    const query = `SELECT * FROM heroes_tb WHERE id = ${id}`
    // const query = `SELECT heroes_tb.*, type_tb.name FROM type_tb  INNER JOIN heroes_tb ON type_tb.id = heroes_tb.type_id ;`
    // const query = `SELECT heroes_tb.*, type_tb.name FROM heroes_tb INNER JOIN type_tb ON heroes_tb.type_Id = type_tb.${id}`

    // `SELECT * FROM hero`

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, (err, results) => {
            if(err) throw err

            const heroes = {
                ...results[0],
                photo: pathFile + results[0].photo
            }
            res.render('info-data', {
                title : "info-data",
                heroes
            })
        })
        conn.release()
    }) 
})
app.get('/delete-heroes/:id', function(request, response){
    const { id } = request.params

    const query = `DELETE FROM heroes_tb WHERE id = ${id};`

    dbConnection.getConnection((err, conn)=> {
        if(err)throw err

        conn.query(query, (err, results)=>{
            if(err){
                request.session.message = {
                    type: "danger",
                    message: err.sqlMessage
                }
                response.redirect('/')
            }else{
                request.message = {
                    type: 'succes',
                    message: 'Delete succesfully'
                }
                response.redirect('/')
            }
        })
        conn.release()
    })
})

app.get('/edit-data/:id', function(request, response){
    const{ id} = request.params;

    const query = `SELECT * FROM heroes_tb WHERE id = ${id};`
    // const query = `SELECT name_car, plat_number, price, photo, name_brand, name_type FROM tb_car INNER JOIN tb_brand ON tb_brand.id = tb_car.id INNER JOIN tb_type ON tb_car.type_id = tb_type.id`
    // console.log(query)

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, (err, results) => {
            if (err) throw err

            const heroes = {
                ...results[0],
                photo: pathFile + results[0].photo
            } 
            response.render('edit-data', {
                title : "Edit-data",
                heroes
            })
        })
        conn.release()
    })

})

app.post('/edit-data/:id', function(req, res) {
    var { id } = req.params;
    const { name, type_id } = req.body;

    const query = `UPDATE heroes_tb SET name = '${name}', type_id = ${type_id} WHERE id = ${id};`

   dbConnection.getConnection((err, conn) => {
        if (err) throw err

     conn.query(query, (err, results) => {

            if (err) throw err

            req.session.message = {
                type: "alert-success",
                message: "Register Success, Please Login to your account!",
                label: "Danger:"
            }

            res.redirect('/')
        })
        conn.release()
    })
})


app.unsubscribe(express.json())

app.listen(4000, function () {
    console.log("server is running on 4000")
})
