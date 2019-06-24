import React, { Component } from 'react';
import axios from 'axios';

const CategoriasContext = new React.createContext();
export const CategoriasConsumer = CategoriasContext.Consumer;

class CategoriasProvider extends Component {

    token = 'OF35J6UPALHBK2IZCOH7';
    state = {
        categorias: []
    };

    obtenerCategorias = async () =>{

        let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`;
        const categorias = await axios.get(url);
        this.setState({categorias: categorias.data.categories});

    }

    componentDidMount(){
        this.obtenerCategorias();
    }

    /**
     * Genera un context donde este proveera la data que necesiten los 
     * hijos indiferente del grado de anidación
     * Se logra tambien agregando {this.props.children}  dentro del provider
     */
    render() {
        return (
            <CategoriasContext.Provider
                value={{categorias: this.state.categorias}}
            >
            {this.props.children} 
            </CategoriasContext.Provider>
        );
    }
}

export default CategoriasProvider;