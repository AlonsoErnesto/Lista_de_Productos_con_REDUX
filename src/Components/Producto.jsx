import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../Actions/productoActions';

const Producto = ({producto}) => {

   const {nombre, precio, id} = producto;

   const dispatch = useDispatch();
   const history = useHistory();
   //Confirmar si desea eliminar el producto
   const confirmarEliminarProducto = id => {
      
      //preguntar al usuario
      
      Swal.fire({
         title: 'Eliminar',
         text: "Estas seguro en eliminar este producto?",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, Eliminar producto',
         cancelButtonText:'Cancelar'
       }).then((result) => {
         if (result.isConfirmed) {
         
            //pasarle al action
           dispatch(borrarProductoAction(id))
         }
       })
   }
   
   //function que redirige de forma programada
   const redireccionarEdicion = producto => {
   dispatch(obtenerProductoEditar(producto))
      history.push(`/productos/editar/${producto.id}`);
   }

   return ( 
      <tr>
         <td>{nombre}</td>
         <td><span className="font-weight-bold">  $  {precio}</span></td>
         <td className="acciones">
            <button type="button" onClick={()=>redireccionarEdicion(producto)} className="btn btn-primary mr-2">Editar</button>
            <button onClick={()=>confirmarEliminarProducto(id)} className="btn btn-danger" type="button">Eliminar</button>
         </td>
      </tr>
   );
}
 
export default Producto;