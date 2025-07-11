let isEditing= false;
let editingMovieId=null;

//post method
async function createMovie(newMovie) {
    const response = await fetch("http://localhost:3000/movies",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
  body: JSON.stringify(newMovie)
});
 if(response.ok) {
    const createdMovie =await response.json();
    console.log("Pelicula creada",createdMovie);
    printMovies();//actualizar a la lista

 } else{
    console.log("Error al crear pelicula");
 }

} 
    

// Read GET Method
async function getMovies() {
    const response = await fetch("http://localhost:3000/movies", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json' //Equivalent to select RAW format in Json typefile
        }
    })
    const movieData = await response.json()
    console.log(movieData)
    return movieData
}
getMovies()


//Method PUT
async function upDateMovie(id,editedMovie) {
    const response = await fetch(`http://localhost:3000/movies/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
    
},
   body: JSON.stringify(editedMovie)
    });
if(response.ok){
    const upDatedMovie = await response.json();
    console.log("Pelicula actualizada", upDatedMovie);
    printMovies(); // actualiza la lista en pantalla
  } else {
    console.error("Error al actualizar pelicula.");
}
}



// Delete DELETE Method
 async function deleteMovie(id) {
    const response = await fetch(`http://localhost:3000/movies/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log(`Película con ID ${id} eliminada correctamente.`);
            printMovies(); // Recargar la lista después de eliminar
        } else {
            console.error("Error al eliminar la película.");
        }
    
}


//print
let moviesContainer = document.querySelector("section");
async function printMovies() {
    moviesContainer.innerHTML = "";
    const movies = await getMovies();
    movies.forEach(movie => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.director}</p>
            <p>${movie.description}</p>
            <button onclick="deleteMovie('${movie.id}')">Eliminar</button>
            <button onclick="editMovie('${movie.id}', '${movie.title}', '${movie.director}', \`${movie.description.replace(/`/g, '\\`')}\`)">Editar</button>
        `;
        moviesContainer.appendChild(div);
    });
}

function editMovie(id,title,director,description){
    document.getElementById("title").value=title;
    document.getElementById("director").value=director;
    document.getElementById("description").value=description;
    document.querySelector("#formMovie button").textContent = "Guardar cambios";//cambiar cuando este el formulario
    isEditing = true;
    editingMovieId = id;
}
// manejo de envio de formulario
const form = document.getElementById("formMovie");
form.addEventListener("submit", function (e) {
    e.preventDefault();  // NO recargues la página
    const movieData = {
        title: document.getElementById("title").value,
        writer: document.getElementById("director").value,
        description: document.getElementById("description").value
    };

if (editingMovieId) {
        upDateMovie(editingMovieId, movieData);
    } else {
        createMovie(movieData);
    }

    form.reset();
});
 
function resetForm() {
  document.getElementById("movie-form").reset();
  document.querySelector("#movie-section button").textContent = "Agregar película";
  isEditing = false;
  editingMovieId = null;
}
