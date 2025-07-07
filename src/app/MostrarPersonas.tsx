import React, { useEffect, useState } from 'react'
import { Persona } from './Interfaces/IPersona'

interface Props{
  saludo : string,
  traerPersona: (p:Persona) => void,
  refrescar: boolean,
  eliminarPersona: (id: string) => void
}

export const MostrarPersonas = (props:Props) => {
    const miStorage = window.localStorage
    const [personas, setPersonas] = useState<Persona[]>([])
     useEffect(()=>{
        let listadoStr = miStorage.getItem("personas")
        if(listadoStr != null){
          let listado = JSON.parse(listadoStr)
          setPersonas(listado)
        }
      },[props.refrescar])
    const queEditar = (index:number) => {
      alert("Le diste a "+index)
      props.traerPersona(personas[index])
    } 
  return (
    <>
    <h1>{props.saludo}</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Color favorito</th>
            <th>Comentario</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p,index)=>{
            return(
              <tr>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.edad}</td>
                <td>{p.colorFavorito}</td>
                <td>{p.comentario}</td>
                <td><button
                        onClick={()=>queEditar(index)}>Editar</button><button onClick={()=> props.eliminarPersona(p.id)}>Eliminar</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
export default MostrarPersonas
