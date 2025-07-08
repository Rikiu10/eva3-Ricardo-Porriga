'use client'
import React, { useEffect, useState } from "react";
import { Persona } from "./Interfaces/IPersona";
import MostrarPersonas from "./MostrarPersonas";


const  initialStatePersona:Persona = {
  id:"",
  apellido: "",
  nombre: "",
  edad: 0,
  colorFavorito: "",
  comentario: "",
  fechaNacimiento: ""
}
export default function Home() {
  const miStorage = window.localStorage
  const [persona, setPersona] = useState(initialStatePersona)
  const [personaA,setPersonaA] = useState(initialStatePersona)
  const [personas, setPersonas] = useState<Persona[]>([])
  const [refrescar, setRefrescar] = useState(false)
  const [eNombre, setENombre] = useState("")
  const [eApellido, setEApellido] = useState("")
  const [eEdad, setEEdad] = useState("")
  const [eColor, setEColor] = useState("")
  const [eComentario, setEComentario] = useState("")
  const [eFecha, setEFecha] = useState("")

  useEffect(()=>{
    let listadoStr = miStorage.getItem("personas")
    if(listadoStr != null){
      let listado = JSON.parse(listadoStr)
      setPersonas(listado)
    }
  },[]) 

  const handleRegistrar = (e: React.FormEvent)=>{
    e.preventDefault()
    
  if (eNombre || eEdad) {
    alert("Corrige los errores antes de registrar.");
    return;
    }

    const nuevaPersona = { ...persona, id: crypto.randomUUID()} 
    const nuevasPersonas = [...personas, nuevaPersona]
    miStorage.setItem("personas",JSON.stringify(nuevasPersonas))
    setPersonas(nuevasPersonas)
    setPersona(initialStatePersona) 
    setRefrescar(!refrescar) 
  }


  const handlePersona = (name:string,value:string)=>{
      if (name === "edad") {
    const edadNum = Number(value);
    setPersona({ ...persona, [name]: edadNum })

    if (edadNum <= 0) {
      setEEdad("La edad debe ser mayor a 0")
    } else if (edadNum > 120) {
      setEEdad("La edad no puede ser mayor a 120")
    } else {
      setEEdad("")
    }
    return;
  }

  setPersona({ ...persona, [name]: value });

  if (name === "nombre") {
    if (value.length < 3) {
      setENombre("El nombre debe tener al menos 3 caracteres");
    } else if (/\d/.test(value)) {
      setENombre("El nombre no puede contener números");
    } else {
      setENombre("");
    }
  }

  if (name === "apellido") {
    if (value.length < 3) {
      setEApellido("El apellido debe tener al menos 3 caracteres")
    } else if (/\d/.test(value)) {
      setEApellido("El apellido no puede contener números")
    } else {
      setEApellido("")
    }
  }

  if (name === "colorFavorito") {
    if (value === "") {
      setEColor("Selecciona un color")
    } else {
      setEColor("")
    }
  }

  if (name === "comentario") {
    if (value.length < 10) {
      setEComentario("Debe tener al menos 10 caracteres")
    } else if (value.length > 200) {
      setEComentario("Máximo 200 caracteres")
    } else {
      setEComentario("")
    }
  }

  if (name === "fechaNacimiento") {
    const hoy = new Date()
    const fechaIngresada = new Date(value)
    if (!value) {
      setEFecha("Debes ingresar una fecha")
    } else if (fechaIngresada > hoy) {
      setEFecha("La fecha no puede ser en el futuro")
    } else {
      setEFecha("")
    }
  }}

  const handlePersonaA = (name: string, value: string) => {
      if (name === "edad") {
    const edadNum = Number(value);
    setPersonaA({ ...personaA, [name]: edadNum });

    if (edadNum <= 0) {
      setEEdad("La edad debe ser mayor a 0");
    } else if (edadNum > 120) {
      setEEdad("La edad no puede ser mayor a 120");
    } else {
      setEEdad("");
    }
    return;
  }

  setPersonaA({ ...personaA, [name]: value });

  if (name === "nombre") {
    if (value.length < 3) {
      setENombre("El nombre debe tener al menos 3 caracteres");
    } else if (/\d/.test(value)) {
      setENombre("El nombre no puede contener números");
    } else {
      setENombre("");
    }
  }

  if (name === "apellido") {
    if (value.length < 3) {
      setEApellido("El apellido debe tener al menos 3 caracteres");
    } else if (/\d/.test(value)) {
      setEApellido("El apellido no puede contener números");
    } else {
      setEApellido("");
    }
  }

  if (name === "colorFavorito") {
    setEColor(value === "" ? "Selecciona un color" : "");
  }

  if (name === "comentario") {
    if (value.length < 10) {
      setEComentario("Debe tener al menos 10 caracteres");
    } else if (value.length > 200) {
      setEComentario("Máximo 200 caracteres");
    } else {
      setEComentario("");
    }
  }

  if (name === "fechaNacimiento") {
    const hoy = new Date();
    const fechaIngresada = new Date(value);
    if (!value) {
      setEFecha("Debes ingresar una fecha");
    } else if (fechaIngresada > hoy) {
      setEFecha("La fecha no puede ser en el futuro");
    } else {
      setEFecha("");
    }
  }}


  const handleActualizar = (e: React.FormEvent)=>{
    e.preventDefault()
    if (eNombre || eEdad) {
      alert("Corrige los errores antes de actualizar.");
      return;
    }

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
          <span>{eApellido}</span>

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
            <span>{eColor}</span>

          <label>Comentario</label><br />
          <textarea
            name="comentario"
            placeholder="Escribe un comentario"
            value={persona.comentario}
            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
          /><br />
          <span>{eComentario}</span>

          <label>Fecha de nacimiento</label><br />
          <input
            type="date"
            name="fechaNacimiento"
            value={persona.fechaNacimiento}
            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
          /><br />
          <span>{eFecha}</span>

          <button 
          onClick={(e)=>{handleRegistrar(e)}}>Registrar</button>
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
          <span>{eApellido}</span>

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
              <span>{eColor}</span>

            <label>Comentario</label><br />
            <textarea
              name="comentario"
              placeholder="Editar comentario"
              value={personaA.comentario}
              onChange={(e) => handlePersonaA(e.currentTarget.name, e.currentTarget.value)}
            /><br />
            <span>{eComentario}</span>

            <label>Fecha de nacimiento</label><br />
            <input
              type="date"
              name="fechaNacimiento"
              value={personaA.fechaNacimiento}
              onChange={(e) => handlePersonaA(e.currentTarget.name, e.currentTarget.value)}
            /><br />
            <span>{eFecha}</span>

          <button 
          onClick={(e)=>{e.preventDefault(), handleActualizar(e)}}>Editar</button>
        </form>       
        </>
      );
}
