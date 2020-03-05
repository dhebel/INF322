/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { property, LitElement, html, css, customElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store, RootState } from '../store.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

@customElement('my-certificados')
export class Certificados extends connect(store)(LitElement) {
  @property({type: String}) 
  private _page : string = '';

  /* usuario de ejemplo para certificados, deberia salir del storage! */
  @property({type: Object})
  private _user : any =  {
      nombre: 'Estudiante Ejemplo',
      rut: '12.345.678-9',
      rol: '2020073001-0',
      sede: "Casa Central Valparaíso",
      carrera: "Ingeniería Civil Informática",
      calidad: "Regular",
      estado: "Matriculado"
  };


  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        :host {
            display: block;
        }

        .dropbtn {
          background-color: #faba25;
          color: white;
          padding: 16px;
          font-size: 16px;
          border: none;
          cursor: pointer;
        }
        
        /* The container <div> - needed to position the dropdown content */
        .dropdown {
          position: relative;
          display: inline-block;
        }
        
        /* Dropdown Content (Hidden by Default) */
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }
        
        /* Links inside the dropdown */
        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }
        
        /* Change color of dropdown links on hover */
        .dropdown-content a:hover {background-color: #f1f1f1}
        
        /* Show the dropdown menu on hover */
        .dropdown:hover .dropdown-content {
          display: block;
        }
        
        /* Change the background color of the dropdown button when the dropdown content is shown */
        .dropdown:hover .dropbtn {
          background-color: #e2a822;
        }
      `
    ];
  }
  
  protected render() {
    /* Para ir a las secciones respectivas podemos simplemente cambiar la pagina.
     * OJO: es necesario agregar las paginas validas en actions/app.ts */
    return html`
      <h2>Certificados</h2>

      <div class="dropdown">
        <button class="dropbtn">Certificados</button>
        <div class="dropdown-content">
          <a href="certificado-alumno-regular/">Certificado de alumno regular</a>
          <!-- Debe generar un pdf mas o menos con la informacion que en este momento se renderiza -->
        </div>
      </div>

      <!-- Contenido Certificado de alumno regular -->
      ${this._user && this._page === 'certificado-alumno-regular'? html`
      <!-- Renderizamos el contenido -->
      <table>
        <tr>CERTIFICADO DE EJEMPLO (Deberia ser generado como un pdf)</tr>
        <tr>${this._user.nombre}</tr>
        <tr>${this._user.sede}</tr>
        <tr>${this._user.carrera}</tr>
        <tr>${this._user.rut}</tr>
        <tr>${this._user.calidad}</tr>
        <tr>${this._user.estado}</tr>
      </table>
      `:''}
    `;
  
  }

  
  /* Como quieren mostrar contenido dependiendo de la pagina es necesario que lean state */
  stateChanged(state: RootState) {
    this._page = state.app!.page;
  }
}
