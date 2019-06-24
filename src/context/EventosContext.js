import React, { Component } from "react";
import axios from "axios";

//Se crea el context
// https://reactjs.org/docs/context.html
const EventosContext = React.createContext();

// se genera el consumer
// https://www.toptal.com/react/react-context-api
export const EventosConsumer = EventosContext.Consumer;

class EventosProvider extends Component {
    state = {
        eventos: []
    };

    token = "OF35J6UPALHBK2IZCOH7";
    orden = "date";

    /**
     * Metodo para obtener los eventos de acuerdo al state del Formulario
     */
    obtenerEventos = async busqueda => {
        let url = `https://www.eventbriteapi.com/v3/events/search/?q=${
            busqueda.nombre
        }&categories=${busqueda.categoria}&token=${this.token}&sort_by=${
            this.orden
        }&locale=es_ES`;

        const eventos = await axios(url);

        this.setState({
            eventos: eventos.data.events
        });
    };

    render() {
        //Se pasan via value los eventos obtenidos así como el método que se ejecutara cuando 
        // se procedaq a buscar eventos
        return (
            <EventosContext.Provider
                value={{
                    eventos: this.state.eventos,
                    obtenerEventos: this.obtenerEventos
                }}
            >
                {this.props.children}
            </EventosContext.Provider>
        );
    }
}

export default EventosProvider;