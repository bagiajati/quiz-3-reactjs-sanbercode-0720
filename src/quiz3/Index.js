import React from 'react'
import "./Style.css"
import MovieListEditor from "./MovieListEditor"
import { MovieProvider } from "./MovieContext"

const Home = () => {

    return (
        <>
        <body>
        <div className='kotakIndex'>
            <MovieProvider>
                <MovieListEditor />
            </MovieProvider>
        </div>
        <footer>
            <h5 class="copy">copyright &copy; 2020 by Sanbercode</h5>
        </footer>
        </body>
        </>
    )
}

export default Home