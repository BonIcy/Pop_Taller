const express = require('express');

const {MongoClient} = require ('mongodb');
require('dotenv').config();
const router = express.Router();
const bases = process.env.MONGODB_URI;
const nombreBase = 'eps'

router.get('/uwu', async (req, res) =>{
    try {
        console.log('uwu');
    } catch (error) {
        console.log(error);
    }
})

router.get('/endpoint1', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db(nombreBase);
      const collection = db.collection('usuarios');
      const result = await collection.find().sort({ nombre: 1 }).toArray(); 
      client.close();
      res.json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  });

  router.get('/endpoint2', async (req, res) =>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('citas');
        const fecha = '2023-09-11'; 
        const result = await collection.find({ fecha: fecha }).toArray();
        result.sort((a, b) => (a.usuario.nombre > b.usuario.nombre ? 1 : -1));
        client.close();
        res.json(result);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error al obtener los datos' });
      }
});
module.exports = router

router.get('/endpoint3', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db(nombreBase);
      const collection = db.collection('doctores');
      const result = await collection.find({especialidad: "Pediatría"}).toArray(); 
      client.close();
      res.json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  });


  router.get('/endpoint4', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db(nombreBase);
      const collection = db.collection('citas');
      const numDoc = '1095930319'; 
      const fechita = '2023-03-02';
      const result = await collection.find({ 'usuarios.numDoc': numDoc, fecha: { $gte: fechita } }).sort({ fecha: 1 }).limit(1).toArray();
      client.close();
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'No se encontraron datos.' });
      }
      res.json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error al obtener datos' });
    }
});
router.get('/endpoint5', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db(nombreBase);
      const collection = db.collection('citas');
      const matricula = '005'; 
      const result = await collection.find({ 'doctores.matricula': matricula }).toArray();
      client.close();
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'No se encontraron datos' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error al obtener datos.' });
    }
});
  
  router.get('/endpoint6', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db(nombreBase);
      const collection = db.collection('citas');
      const fecha = '2023-04-12';
      const result = await collection.find({ fecha: fecha }).toArray();
      client.close();
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'No se encontraron citas para esta fecha' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error al obtener las citas para la fecha especificada.' });
    }
});
  

  
  
module.exports = router