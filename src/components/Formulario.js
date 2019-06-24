import React, { Component } from 'react';
import { CategoriasConsumer } from '../context/CategoriasContext';
import { EventosConsumer } from '../context/EventosContext';

class Formulario extends Component {

    state = {
        nombre: '',
        categoria: ''
    }

    obtenerDatosEventoInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <EventosConsumer>
                {(value) => {
                    console.log(value);
                    return (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            value.obtenerEventos(this.state)
                        }}>
                            <fieldset className="uk-fieldset uk-margin">
                                <legend className="uk-legend uk-text-center">
                                    Busca tu evento por nombre o categoría
                                </legend>

                                <div className="uk-column-1-3@m uk-margin">
                                    <div className="uk-margin" uk-margin="true">
                                        <input 
                                            name="nombre"
                                            className="uk-input"
                                            type="text"
                                            placeholder="Nombre de Evento o Ciudad"
                                            onChange={this.obtenerDatosEventoInputs}
                                        />
                                    </div>

                                    <div className="uk-margin">
                                        <select className="uk-select" name="categoria" onChange={this.obtenerDatosEventoInputs}>
                                        <option value="">--Selecciona Categoría --</option>
                                        <CategoriasConsumer>
                                            {(value) => {
                                                return (
                                                    value.categorias.map(categoria => (
                                                        <option key={categoria.id} value={categoria.id} data-uk-form-select>
                                                            {categoria.name_localized}
                                                        </option>
                                                    ))
                                                )
                                            }}
                                        </CategoriasConsumer>
                                        </select>
                                    </div>
                                    <div>
                                        <input type="submit" vale="Buscar" className="uk-button uk-button-danger" />
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    )
                }}
                
            </EventosConsumer>
        );
    }
}

export default Formulario;