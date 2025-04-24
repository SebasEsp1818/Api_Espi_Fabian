import express from 'express'; 
import fs from "fs";
import bodyParser from "body-parser"; 

const app = express();
app.use(bodyParser.json());

const readData = () =>  {

try{
    const data = fs.readFileSync("./db.json");
return (JSON.parse(data));
} catch (error){
    console.log(error);
}

};

const writeData = (data) => {
   try {
       fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error){
        console.log(error);
    }
};


app.get("/", (req, res ) => {
    res.send("Welcome to my first API withy Node js!")
}); 

app.get("/movies", (req, res) => {
    const data = readData();
    res.json(data.movies);
});

app.get("/movies/:id", (req, res) => {
const data = readData();
const id = parseInt(req.params.id);
const movie = data.movies.find((book) => book.id === id);
res.json(movie)
});

app.post("/movie", (req, res) => {
    const data =readData();
    const body =req.body;
    const newMovie = {
        id: data.movies.length + 1,
        ...body,
    };
    data.movies.push(newMovie);
    writeData(data);
    res.json(newMovie)
})

app.put("/movies/:id")

app.listen(3000, () => {
    console.log('server listening on port 3000')
});