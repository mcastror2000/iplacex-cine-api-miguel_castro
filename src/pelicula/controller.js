import { ObjectId } from 'mongodb';
import client from '../common/db.js';
import { Pelicula } from './pelicula.js';

const peliculaCollection = client.db('cine-db').collection('peliculas');



// insertar una pelicula

async function handleInsertPeliculaRequest(req, res) {
    let data = req.body;
    let pelicula = Pelicula;

    pelicula.nombre = data.nombre;
    pelicula.generos = data.generos;
    pelicula.anioEstreno = data.anioEstreno;

    await peliculaCollection.insertOne(pelicula)
        .then((data) => { if (data === null)  return res. status (400).send ('Error al guardar registro')
           
            return res.status(201).send(data); // Devuelve la película insertada 
        })
            .catch ((e) => {return res.status(500).send({error: e});})
}

//obtener peliculas
async function handleGetPeliculasRequest(req, res) {
    await peliculaCollection.find({}).toArray()
        .then(data => res.status(200).send(data))
        .catch(e => res.status(500).send({ error: e }));
}


//obtener peliculas por Id
async function handleGetPeliculaByIdRequest(req, res) {
    await peliculaCollection.find ({ })
        .then(data => { return res.status(200).send(data) })
        .catch(e => {res.status(500).send({ error: e })})
}

//actualizar peliculas por Id
async function handleUpdatePeliculaByIdRequest(req, res) {
    let id = req.params.id
    let película = req.body;

    try{
        let oid = ObjectId.createFromHexString(id)
       let query = {$set: pelicula} 
    
    await peliculaCollection.updateOne ({ _id:oid }, query)
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => {res.status(500).send({code: e.code })})
} catch (e){
    return res.status (400).send ('Id mas formado')
}}

// eliminar registro por Id
async function handleDeletePeliculaByIdRequest(req, res) {
    let id = req.params.id;
    try {
        let oid = ObjectId.createFromHexString(id);
        await peliculaCollection.deleteOne({ _id: oid })
            .then((data) => { return res.status(200).send(data); })
            .catch((e) => { return res.status(500).send({ error: e }); });
    } catch (e) { return res.status(400).send('Id mal formado'); }
}

export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest,
}