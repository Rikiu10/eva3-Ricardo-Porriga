'use client'
import { useEffect, useState } from "react";
import { Persona } from "./Interfaces/IPersona";
import MostrarPersonas from "./MostrarPersonas";


const  initialStatePersona:Persona = {
  id:"",
  apellido: "",
  nombre: ""
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
    miStorage.setItem("personas",JSON.stringify([...personas,persona]))
  }
  const handlePersona = (name:string,value:string)=>{
    setPersona(
      { ...persona, [name] : value  }
    )
    if (name == "nombre" && value.length<3){
      setENombre("El nombre debe tener 3 caracteres como minimo")
    }else if(name=="nombre" && value.length>=3){
      setENombre("")
    }
  }

  const handlePersonaA = (name: string, value: string) => {
    setPersonaA({ ...personaA, [name]: value})
  }

  const handleActualizar = ()=>{
    const nuevasPersonas = personas.map(p =>
      p.id == personaA.id ? personaA : p
    )
    localStorage.setItem("personas", JSON.stringify(nuevasPersonas))
    setPersonas(nuevasPersonas)
    setPersonaA(initialStatePersona)
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
          <button 
          onClick={()=>{handleRegistrar()}}>Registrar</button>
        </form>
        <MostrarPersonas saludo = "Hola Como estas" traerPersona = {traerPersona} refrescar={refrescar}/>
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
          <button 
          onClick={(e)=>{e.preventDefault(), handleActualizar()}}>Editar</button>
        </form>
        
        </>
      );
}
