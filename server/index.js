import express from "express";
import cors from "cors";

import { PORT } from "./config.js";
import exphbs from "express-handlebars";

import empleadosRoutes from '../server/routes/empleados.routes.js'

import indexRoutes from "./routes/index.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js"


const app = express();
// const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

app.use(express.static('views'));

app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

app.use('*/Bootstrap-4-Multi-Select-BsMultiSelect',express.static('public/Bootstrap-4-Multi-Select-BsMultiSelect'));
app.use('*/css',express.static('public/css'));
app.use('*/js',express.static('public/js'));
app.use('*/images',express.static('public/images'));

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(indexRoutes);
app.use(usuariosRoutes);
app.use(empleadosRoutes)

app.listen(PORT);
console.log(`Server is listening on port: ${PORT}`);

app.get('/', (req, res) => {
    res.render('index.hbs');
});
