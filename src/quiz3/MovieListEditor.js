import React, {useContext, useState, useEffect} from "react"
import axios from "axios"
import {MovieContext} from "./MovieContext"

const MovieListEditor = () => {
    const [daftarMovie, setDaftarMovie] = useContext(MovieContext)
    const [input, setInput] = useState({title: "", description: "", year: "", duration: "", genre: "", rating: ""})

    useEffect( () => {
        if (daftarMovie.lists === null){
        axios.get(`http://backendexample.sanbercloud.com/api/movies`)
        .then(res => {
            setDaftarMovie({
            ...daftarMovie, 
            lists: res.data.map(el=>{ 
                return {id: el.id,
                title: el.title, 
                description: el.description, 
                year: el.year,
                duration: el.duration,
                genre: el.genre,
                rating: el.rating
                }
            })
            })
        })
        }
    }, [setDaftarMovie])

    useEffect(()=>{
        if (daftarMovie.statusForm === "changeToEdit"){
        let dataMovie = daftarMovie.lists.find(x=> x.id === daftarMovie.selectedId)
        setInput({title: dataMovie.title, description: dataMovie.description, year: dataMovie.year, duration: dataMovie.duration, genre: dataMovie.genre, rating: dataMovie.genre})
        setDaftarMovie({...daftarMovie, statusForm: "edit"})
        }
    },[daftarMovie])

    const handleChange = (event) =>{
        let typeOfInput = event.target.name
        switch (typeOfInput){
            case "title": { setInput({...input, title: event.target.value}); break }
            case "description": { setInput({...input, description: event.target.value}); break }
            case "year": { setInput({...input, year: event.target.value}); break }
            case "duration": { setInput({...input, duration: event.target.value}); break }
            case "genre": { setInput({...input, genre: event.target.value}); break }
            case "rating": { setInput({...input, rating: event.target.value}); break }
            default:
            {break;}
        }
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault()

        let title = input.title
        let year = input.year.toString()
        let duration = input.duration.toString()
        let rating = input.rating.toString()
        
        if (title.replace(/\s/g,'') !== "" && year.replace(/\s/g,'') !== "" && duration.replace(/\s/g,'') !== "" && rating.replace(/\s/g,'') !== ""){      
            if (daftarMovie.statusForm === "create"){        
                axios.post(`http://backendexample.sanbercloud.com/api/movies`, {title: input.title, description: input.description, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating})
                .then(res => {
                    setDaftarMovie(
                    {statusForm: "create", selectedId: 0,
                    lists: [
                        ...daftarMovie.lists, 
                        { id: res.data.id, 
                        title: input.title, 
                        description: input.description,
                        year: input.year,
                        duration: input.duration,
                        genre: input.genre,
                        rating: input.rating
                        }]
                    })
                })
            } else if(daftarMovie.statusForm === "edit"){
                axios.put(`http://backendexample.sanbercloud.com/api/movies/${daftarMovie.selectedId}`, {title: input.title, description: input.description, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating})
                .then(() => {
                    let dataMovie = daftarMovie.lists.find(el=> el.id === daftarMovie.selectedId)
                    dataMovie.title = input.title
                    dataMovie.description = input.description
                    dataMovie.year = input.year
                    dataMovie.duration = input.duration
                    dataMovie.genre = input.genre
                    dataMovie.rating = input.rating
                    setDaftarMovie({statusForm: "create", selectedId: 0, lists: [...daftarMovie.lists]})
                })
            }
        setInput({title: "", description: "", year: 0, duration: 0, genre: "", rating: 0})
        }
    }

    const handleEdit = (event) =>{
        let idDataMovie = parseInt(event.target.value)
        setDaftarMovie({...daftarMovie, selectedId: idDataMovie, statusForm: "changeToEdit"})
    }

    const handleDelete = (event) => {
        let idDataMovie = parseInt(event.target.value)
        let newLists = daftarMovie.lists.filter(el => el.id !== idDataMovie)
        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idDataMovie}`)
        .then(res => { console.log(res) })
        setDaftarMovie({...daftarMovie, lists: [...newLists]})
    }

    return(
        <>
            <h1>Daftar Film</h1>
            { daftarMovie.lists !== null && daftarMovie.lists.map((item, index)=> {
                return(
                    <div>
                        <h3>{item.title}</h3>
                        <p>Rating: {item.rating} dari 10</p>
                        <p>Durasi: {item.duration} menit</p>
                        <p>Genre: {item.genre}</p>
                        <p>Tahun: {item.year}</p>
                        <p>Deskripsi: {item.description}</p>
                        <button onClick={handleEdit} value={item.id}>Edit</button>
                        &nbsp;
                        <button onClick={handleDelete} value={item.id}>Delete</button>
                        <br/>
                    </div>
                )
            })}

            <h1>Edit Daftar Film</h1>
            <div style={{width: "50%", margin: "0 auto", display: "block"}}>
            <div style={{border: "1px solid #aaa", padding: "20px"}}>
                <form onSubmit={handleSubmit}>
                <label style={{float: "left"}}>
                    Title:
                </label>
                <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/>
                <br/>
                <br/>
                <label style={{float: "left"}}>
                    Rating:
                </label>
                <input style={{float: "right"}} type="number" name="rating" value={input.rating} onChange={handleChange}/>
                <br/>
                <br/>
                <label style={{float: "left"}}>
                    Duration:
                </label>
                <input style={{float: "right"}} type="number" name="duration" value={input.duration} onChange={handleChange}/>
                <br/>
                <br/>
                <label style={{float: "left"}}>
                    Genre:
                </label>
                <input style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
                <br/>
                <br/>
                <label style={{float: "left"}}>
                    Year:
                </label>
                <input style={{float: "right"}} type="number" name="year" value={input.year} onChange={handleChange}/>
                <br/>
                <br/>
                <label style={{float: "left"}}>
                    Description:
                </label>
                <textarea style={{float: 'right'}} type="textarea" name='description' value={input.description} onChange={handleChange} />
                <br/>
                <br/>
                <br/>
                <div style={{width: "100%", paddingBottom: "20px"}}>
                    <button style={{ float: "right" }}>Submit</button>
                </div>
                </form>
            </div>
            </div>
        </>
    )
    
}

export default MovieListEditor