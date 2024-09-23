import { ObjectId } from 'mongodb';
import client from '../common/db.js';
import { Actor } from './actor.js';

const actorCollection = client.db('cine-db').collection('actores');

// insertar un actor
async function handleInsertActorRequest(req, res) {
    let data = req.body;
    let actor = { ...Actor };

    actor.idPelicula = data.idPelicula;
    actor.nombre = data.nombre;
    actor.edad = data.edad;
    actor.estaRetirado = data.estaRetirado;
    actor.premios = data.premios;

    // Validar _id de la película
    try {
        const peliculaExiste = await client.db('cine-db').collection('peliculas').findOne({ _id: new ObjectId(actor.idPelicula) });

        if (!peliculaExiste) {
            return res.status(400).send('Película no encontrada');
        }

        const result = await actorCollection.insertOne(actor);
        if (!result.acknowledged) {
            return res.status(400).send('Error al guardar registro');
        }
        return res.status(201).send(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

// obtener todos los actores
async function handleGetActoresRequest(req, res) {
    try {
        const actores = await actorCollection.find({}).toArray();
        res.status(200).send(actores);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// obtener un actor por ID
async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id;
    try {
        const oid = new ObjectId(id);
        const actor = await actorCollection.findOne({ _id: oid });
        if (!actor) {
            return res.status(404).send('Actor no encontrado');
        }
        return res.status(200).send(actor);
    } catch (error) {
        res.status(400).send('ID mal formado');
    }
}

// obtener actores por ID de película
async function handleGetActoresByPeliculaIdRequest(req, res) {
    let idPelicula = req.params.id;
    try {
        const oid = new ObjectId(idPelicula);
        const actores = await actorCollection.find({ idPelicula: oid.toString() }).toArray();
        return res.status(200).send(actores);
    } catch (error) {
        res.status(400).send('ID de película mal formado');
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};
