'use client'
import { useEffect, useState } from "react";
import { Persona } from "./Interfaces/IPersona";
import MostrarPersonas from "./MostrarPersonas";


const  initialStatePersona:Persona = {
  id:"",
  apellido: "",
  nombre: "",
  edad: 0,
  colorFavorito: "",
  comentario: ""
}
export default function Home() {
  const miStorage = window.localStorage
  const [persona, setPersona] = useState(initialStatePersona)
  const [personaA,setPersonaA] = useState(initialStatePersona)
  const [personas, setPersonas] = useState<Persona[]>([])
  const [eNombre, setENombre] = useState("")
  const [refrescar, setRefrescar] = useState(false)

  useEffect(()=>{
    let listadoStr = miStorage.getItem("personas")
    if(listadoStr != null){
      let listado = JSON.parse(listadoStr)
      setPersonas(listado)
    }
  },[]) 

  const handleRegistrar = ()=>{
    const nuevaPersona = { ...persona, id: crypto.randomUUID()} 
    const nuevasPersonas = [...personas, nuevaPersona]
    miStorage.setItem("personas",JSON.stringify(nuevasPersonas))
    setPersonas(nuevasPersonas)
    setPersona(initialStatePersona) 
    setRefrescar(!refrescar) 
  }

  const [eEdad, setEEdad] = useState("")

  const handlePersona = (name:string,value:string)=>{
    if(name == "edad") {
      const edadNum = Number(value)
      setPersona({ ...persona, [name]: edadNum})
      if (edadNum <= 0){
        setEEdad("La edad debe ser mayor que 0")
      } else {
        setEEdad("")
      }

    }else {
    setPersona(
      { ...persona, [name] : value  }
    )
    if (name == "nombre" && value.length<3){
      setENombre("El nombre debe tener 3 caracteres como minimo")
    }else if(name=="nombre" && value.length>=3){
      setENombre("")
    }}
  }

  const handlePersonaA = (name: string, value: string) => {
    if (name == "edad"){
      setPersonaA({ ...personaA, [name] : Number(value)})
    } else {
      setPersonaA({ ...personaA, [name]: value})
    }
  }

  const handleActualizar = ()=>{
    const nuevasPersonas = personas.map(p =>
      p.id == personaA.id ? personaA : p
    )
    miStorage.setItem("personas", JSON.stringify(nuevasPersonas))
    setPersonas(nuevasPersonas)
    setPersonaA(initialStatePersona)
    setRefrescar(!refrescar)
  }

  const eliminarPersona =(id: string) => {
    const nuevasPersonas = personas.filter((p) => p.id !== id)
    miStorage.setItem("personas", JSON.stringify(nuevasPersonas))
    setPersonas(nuevasPersonas)
    setRefrescar(!refrescar)
  }

  const traerPersona = (p:Persona)=>{
    setPersonaA(p)
  }

  return (
        <>
        <form>
          <h1>{persona.nombre} {persona.apellido}</h1>
          <label>Nombre</label><br/>
          <input
              name="nombre" 
              type="text" 
              placeholder="Nombre"
              onChange={(e)=>{handlePersona(e.currentTarget.name,e.currentTarget.value)}}/><br/>
          <span>{eNombre}</span>
          
          <label>Apellido</label><br/>
          <input 
              name="apellido"
              type="text"
              placeholder="Apellido"
              onChange={(e)=>{handlePersona(e.currentTarget.name,e.currentTarget.value)}}/><br/>
          <span></span>

          <label>Edad</label><br/>
          <input
            name="edad"
            type="number"
            placeholder="Edad"
            value={persona.edad}
            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}/><br />
          <span>{eEdad}</span>

          <label>Color Favorito</label><br/>
          <select
            name="colorFavorito"
            value={persona.colorFavorito}
            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}>

              <option value="">Seleciona tu color favorito</option>
              <option value="Rojo">Rojo</option>
              <option value="Azul">Azul</option>
              <option value="Verde">Verde</option>
              <option value="Amarillo">Amarillo</option>
              <option value="Naranja">Naranja</option>
              <option value="Negro">Negro</option>
              <option value="Rosa">Rosa</option>
              </select><br/>

          <label>Comentario</label><br />
          <textarea
            name="comentario"
            placeholder="Escribe un comentario"
            value={persona.comentario}
            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
            /><br />

          <button 
          onClick={()=>{handleRegistrar()}}>Registrar</button>
        </form>
        <MostrarPersonas saludo = "Hola Como estas" traerPersona = {traerPersona} refrescar={refrescar} eliminarPersona={eliminarPersona}/>
        <form>
          <h1>{persona.nombre} {persona.apellido}</h1>
          <label>Nombre</label><br/>
          <input
              name="nombre" 
              type="text" 
              placeholder="Nombre"
              value={personaA.nombre}
              onChange={(e)=>{handlePersonaA(e.currentTarget.name,e.currentTarget.value)}}/><br/>
          <span>{eNombre}</span>
          
          <label>Apellido</label><br/>
          <input 
              name="apellido"
              type="text"
              placeholder="Apellido"
              value={personaA.apellido}
              onChange={(e)=>{handlePersonaA(e.currentTarget.name,e.currentTarget.value)}}/><br/>
          <span></span>

          <label>Edad</label><br/>
          <input
            name="edad"
            type="number"
            placeholder="Edad"
            value={personaA.edad}
            onChange={(e)=>{handlePersonaA(e.currentTarget.name, e.currentTarget.value)}}/><br/>
            <span>{eEdad}</span>

            <label>Color favorito</label><br/>
            <select
              name="colorFavorito" //nuevo
              value={personaA.colorFavorito}
              onChange={(e) => handlePersonaA(e.currentTarget.name, e.currentTarget.value)}>

              <option value="">Seleciona tu colo favorito</option>
              <option value="Rojo">Rojo</option>
              <option value="Azul">Azul</option>
              <option value="Verde">Verde</option>
              <option value="Amarillo">Amarillo</option>
              <option value="Naranja">Naranja</option>
              <option value="Negro">Negro</option>
              <option value="Rosa">Rosa</option>
              </select><br/>

            <label>Comentario</label><br />
            <textarea
              name="comentario"
              placeholder="Editar comentario"
              value={personaA.comentario}
              onChange={(e) => handlePersonaA(e.currentTarget.name, e.currentTarget.value)}
              /><br />

          <button 
          onClick={(e)=>{e.preventDefault(), handleActualizar()}}>Editar</button>
        </form>       
        </>
      );
}
