// src/services/elementosService.js
import api from './axiosConfig';

/**
 * Servicio para gestionar las operaciones relacionadas con elementos geológicos
 */
const elementosService = {
  /**
   * Obtiene todos los fósiles
   * @returns {Promise<Array>} Lista de fósiles
   */
  async getFosiles() {
    const response = await api.get('/Fosiles');
    return Array.isArray(response.data) 
      ? response.data.map(fosil => ({ ...fosil, tipo: 'fosil' }))
      : [];
  },

  /**
   * Obtiene todas las rocas
   * @returns {Promise<Array>} Lista de rocas
   */
  async getRocas() {
    const response = await api.get('/Rocas');
    return Array.isArray(response.data) 
      ? response.data.map(roca => ({ ...roca, tipo: 'roca' }))
      : [];
  },

  /**
   * Obtiene todos los elementos (fósiles y rocas)
   * @returns {Promise<Array>} Lista combinada de elementos
   */
  async getTodosElementos() {
    const [fosiles, rocas] = await Promise.all([
      this.getFosiles(),
      this.getRocas()
    ]);
    
    return [...fosiles, ...rocas];
  },

  /**
   * Filtra fósiles según los criterios proporcionados
   * @param {Object} filtros - Criterios de filtrado
   * @returns {Promise<Array>} Lista de fósiles filtrados
   */
  async filtrarFosiles(filtros = {}) {
    const queryParams = this._construirQueryParams(filtros);
    const response = await api.get(`/Fosiles/filtro?${queryParams}`);
    
    return Array.isArray(response.data)
      ? response.data.map(fosil => ({ ...fosil, tipo: 'fosil' }))
      : [];
  },

  /**
   * Filtra rocas según los criterios proporcionados
   * @param {Object} filtros - Criterios de filtrado
   * @returns {Promise<Array>} Lista de rocas filtradas
   */
  async filtrarRocas(filtros = {}) {
    const queryParams = this._construirQueryParams(filtros);
    const response = await api.get(`/Rocas/filtro?${queryParams}`);
    
    return Array.isArray(response.data)
      ? response.data.map(roca => ({ ...roca, tipo: 'roca' }))
      : [];
  },

  /**
   * Filtra todos los elementos según los criterios proporcionados
   * @param {Object} filtros - Criterios de filtrado
   * @returns {Promise<Array>} Lista combinada de elementos filtrados
   */
  async filtrarElementos(filtros = {}) {
    // Si se especifica un tipo concreto, solo consultamos esa API
    if (filtros.tipo === 'fosil') {
      return await this.filtrarFosiles(filtros);
    } else if (filtros.tipo === 'roca') {
      return await this.filtrarRocas(filtros);
    }
    
    // Si no se especifica tipo, consultamos ambas APIs
    const [fosiles, rocas] = await Promise.all([
      this.filtrarFosiles(filtros),
      this.filtrarRocas(filtros)
    ]);
    
    return [...fosiles, ...rocas];
  },

  /**
   * Método helper para construir los parámetros de consulta URL
   * @private
   * @param {Object} filtros - Criterios de filtrado
   * @returns {String} Cadena de consulta URL
   */
  _construirQueryParams(filtros) {
    const queryParams = new URLSearchParams();
    
    if (filtros.paisId) {
      queryParams.append('paisId', filtros.paisId);
    }
    
    if (filtros.provinciaId) {
      queryParams.append('provinciaId', filtros.provinciaId);
    }
    
    if (filtros.localidad) {
      queryParams.append('localidad', filtros.localidad);
    }
    
    if (filtros.nombre) {
      queryParams.append('nombre', filtros.nombre);
    }
    
    return queryParams.toString();
  }
};

export default elementosService;