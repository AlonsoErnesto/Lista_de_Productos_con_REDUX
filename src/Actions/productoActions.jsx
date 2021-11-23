 import {
   AGREGAR_PRODUCTO,
   AGREGAR_PRODUCTO_EXITO,
   AGREGAR_PRODUCTO_ERROR,
  //  LISTAR PRODUCTOS
  COMENZAR_DESCARGA_PRODUCTOS,
  COMENZAR_DESCARGA_EXITO,
  COMENZAR_DESCARGA_ERROR,
   //ELIINAR PRODCUTOS
   OBTENER_PRODUCTO_ELIMINAR,
   PRODUCTO_ELIMINADO_EXITO,
   PRODUCTO_ELIMINADO_ERROR,
  //  EDITAR PRODCUTOS,
    COMENZAR_EDICION_PRODUCTO,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
 } from '../types/index';
 
 import clienteAxios from '../config/axios';
 
 import Swal from 'sweetalert2'
 
 //Crear nuevos productos Reducer
 export function crearNuevoProductoAction(producto){
   return async (dispatch) => {
      dispatch(agregarProducto())
   
    try {
      //insertar en la API
      await clienteAxios.post('/productos',producto);
      // Si todo esta bien, actualizar el state
      dispatch(agregarProductoExito(producto));
      
      //alerta
      Swal.fire(
        'Correcto',
        'El producto se agrego correctamente',
        'success'
      );
    } catch (error) {
    
      // Si hay un error cambia el state
      dispatch(agregarProductoError(true));
      
      //alerta de error
      Swal.fire({
        icon:'error',
        title: 'Hubo un error',
        text:'Se encontro un error, intentelo de nuevo.'
      })
    }
   
  }
}


const agregarProducto = () => ({

  type:AGREGAR_PRODUCTO,
  payload:true
  
  
})


// si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    
    type:AGREGAR_PRODUCTO_EXITO,
    payload:producto
  
})


// si existe un error como respuesta
const agregarProductoError = estado => ({ 
    type:AGREGAR_PRODUCTO_ERROR,
    paylod:estado

})


// FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BASE DE DATOS DE

export function obtenerProductosAction() {
  
    return async (dispatch) =>{
      dispatch(descargarProductos());
      
      try {
        const respuesta = await clienteAxios.get('/productos');
        dispatch(descargarProductoseExitosa(respuesta.data));
      } catch (error) {
        console.log(error)
        dispatch(descargarProductosError())
      }
      
    }
  
}


  const descargarProductos = () => ({
      type: COMENZAR_DESCARGA_PRODUCTOS,
      payload:true
  })


const descargarProductoseExitosa = productos =>({
  
    type: COMENZAR_DESCARGA_EXITO,
    payload: productos

})

const descargarProductosError = () => ({
    type: COMENZAR_DESCARGA_ERROR,
    payload:true
})

//Selecicona y elimina el producto 

export function borrarProductoAction(id){
    return async (dispatch) => {
      dispatch(obtenerProductoEliminar(id));
      
      try {
          await clienteAxios.delete(`/productos/${id}`)
          dispatch(eliminarProductoExito());
          //si se eliminar mostrar alerta
          Swal.fire(
            'Eliminado!',
            'Este producto se a elimino.',
            'success'
          )
      } catch (error) {
        dispatch(eliminarProductoError());
      }
      
    }
}

const obtenerProductoEliminar = id => ({
  type:OBTENER_PRODUCTO_ELIMINAR,
  payload: id
  
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    
})
const eliminarProductoError = () => ({
    type:PRODUCTO_ELIMINADO_ERROR,
    payload:true
})

//COLOCAR PRODUCTO EN EDICION
export function obtenerProductoEditar(producto) {
    return (dispatch)=>{
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    
    type:OBTENER_PRODUCTO_EDITAR,
    payload:producto
  
})

//EDITA UN REGISTRO EN LA APi Y STATE
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      await clienteAxios.put(`/productos/${producto.id}`,producto)
      dispatch(editarProductoExito(producto))
    } catch (error) {
      dispatch(editarProductoError(producto))
    }
  }
}

const editarProducto = () => ({
    type:COMENZAR_EDICION_PRODUCTO,
    
})
const editarProductoExito = producto => ({
    type:PRODUCTO_EDITADO_EXITO,
    payload:producto
})

const editarProductoError = producto => ({
  type:PRODUCTO_EDITADO_ERROR,
  payload:true

})