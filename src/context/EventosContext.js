import React, { Component } from 'react';
import axios from 'axios';

const EventosContext = React.createContext();
export const EventosConsumer = EventosContext.Consumer;

class EventosProvider extends Component {
    state = {
        eventos: []
    };
    token = 'OF35J6UPALHBK2IZCOH7';
    orden= 'date';

    obtenerEventos = async (busqueda) =>{
        let url = `https://www.eventbriteapi.com/v3/events/search/?q=${busqueda.nombre}&categories=${busqueda.categoria}&token=${this.token}&sort_by=${this.orden}&locale=es_ES`;

        const eventos = await axios(url);

        console.log(eventos);
    }

    render() {
        return (
            <EventosContext.Provider
            value={
               {
                   eventos : this.state.eventos,
                   obtenerEventos: this.obtenerEventos
                }
            }
            >
                {this.props.children}
            </EventosContext.Provider>
        );
    }
}

export default EventosProvider;