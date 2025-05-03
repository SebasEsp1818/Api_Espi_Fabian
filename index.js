import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const readData = () => {
  try {
    const data = fs.readFileSync('./db.json');
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return { movies: [] }; // en caso de error, devolver estructura vacía
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2)); // formato legible
  } catch (error) {
    console.log(error);
  }
};

// Ruta principal
app.get('/', (req, res) => {
  res.send('Welcome to my first API with Node.js!');
});

// Obtener todas las películas
app.get('/movies', (req, res) => {
  const data = readData();
  res.json(data.movies);
});

// Obtener una película por ID
app.get('/movies/:id', (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const movie = data.movies.find((movie) => movie.id === id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

app.post("/movie", (req, res) => {
    const data = readData();
    const body = req.body;
  
    const newMovie = {
      id: data.movies.length + 1,
      ...body,
    };
  
    data.movies.push(newMovie);
    writeData(data);
  
    res.json(newMovie);
  });
  

// Actualizar una película por ID
app.put('/movies/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.movies.findIndex((movie) => movie.id === id);
  
    if (index !== -1) {
      data.movies[index] = { id, ...req.body };
      writeData(data);
      res.json(data.movies[index]);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  });
  

// Eliminar una película por ID
app.delete('/movies/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.movies.findIndex((movie) => movie.id === id);
  
    if (index !== -1) {
      const deletedMovie = data.movies.splice(index, 1)[0];
      writeData(data);
      res.json({ message: 'Movie deleted successfully', movie: deletedMovie });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  });
  

// Iniciar servidor
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
