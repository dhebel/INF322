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

import { ListaCursos } from '../reducers/cursos';

@customElement('my-reportes')
export class Reportes extends connect(store)(LitElement) {
  @property({type: Object})
  private _cursos: ListaCursos = {};

  @property({type: String}) 
  private _page : string = '';

  @property({type: Number})
  private _selectedPlan = -1;

  /* Tanto resumenes academicos como reportes necesitan un usuario.
 * Se define uno aqui como ejemplo, pero deberia cargarse de storage. */
  @property({type: Object})
  private _user : any =  {
      nombre: 'Estudiante Ejemplo',
      rut: '12.345.678-9',
      rol: '2020073001-0',
      planes: [
        {id: 7300, ingreso:'01/03/2015', termino: null, tesista: true},
        {id:68001, ingreso:'02/02/2018', termino: null, tesista: false},
      ],
      notas: [
        {curso_id: 1, nota: 97, fecha: '2015/1', creditos: 5, plan: 7300},
        {curso_id: 3, nota: 82, fecha: '2015/1', creditos: 4, plan: 7300},
        {curso_id: 4, nota: 84, fecha: '2015/1', creditos: 4, plan: 7300},
        {curso_id: 5, nota: 40, fecha: '2015/2', creditos: 5, plan: 7300},
        {curso_id: 5, nota: 58, fecha: '2016/1', creditos: 5, plan: 7300},
        {curso_id: 3, nota: 100, fecha: '2018/1', creditos: 3, plan: 68001},
        {curso_id: 5, nota: 100, fecha: '2018/1', creditos: 3, plan: 68001},
      ]
  };

  //Lo mismo con los planes
  private _planes : any = {
      7300: {
          id: 7300,
          nombre: 'Ingeniería Civil Informática',
          tipo: "pregrado"
        },
      68001: {
          id: 68001,
          nombre: 'Magíster en Ciencias de la Ingeniería Informática',
          tipo: "postgrado"
        }
  }

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
      <h2>Resumen académico y reportes </h2>
      <div class="dropdown">
      <button class="dropbtn">Resumen académico</button>
      <div class="dropdown-content">
        ${this._user.planes.map((plan:any) => this._planes[plan.id]).map((plan:any) => html`
        <a href="resumen-academico/${plan.id}">${plan.nombre}</a>
        `)}
      </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">Certificados</button>
        <div class="dropdown-content">
          <a href="#">Solicitar certificado</a>
          <a href="#">Certificados exentos</a>
          <a href="#">Anular certificado</a>
          <a href="#">Listados de certificados</a>
        </div>
      </div>

      <!-- Luego de los menus mostramos el contenido dependiendo de la pagina -->
      ${this._user && this._page === 'resumen-academico' && this._selectedPlan >= 0? html`
      <!-- Renderizamos el contenido -->
      <table>
        ${this._user.notas.filter((nota:any) => nota.plan === this._selectedPlan).map((nota:any) => html`
        <tr>
            <td>${nota.fecha}</td>
            <td>${this._cursos[nota.curso_id].asignatura}</td>
            <td>${nota.nota}</td>
        </tr>
        `)}
      </table>
      `:''}
    `;
  
  }

  
  /* Como quieren mostrar contenido dependiendo de la pagina es necesario que lean state */
  stateChanged(state: RootState) {
    this._page = state.app!.page;
    this._cursos = state.cursos!.cursos;
    this._selectedPlan = state.app!.selectedPlan;
    console.log(this._selectedPlan);
  }
}
