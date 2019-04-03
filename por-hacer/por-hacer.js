const fs = require('fs');

let listadoPorHacer = []; // arreglo vacio
const guardarDB = ()=>{
  // Antes necesito convertir en un json
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile('db/data.json', data, (err)=>{
    if(err) throw new Error('No se puedo grabar', err);
  })
}

const cargarDB = ()=>{
  try {
    listadoPorHacer = require('../db/data.json');
  } catch (error) {
    listadoPorHacer = [];
  }
}

const crear = (descripcion)=>{
    cargarDB(); // se carga el nuevo objeto al arreglo
    let porHacer = {
      descripcion,// descripcion:descripcion en Emacs6 solo puedo escribir descripcion y    taria bien de igual forma
      completado:false
    };
       listadoPorHacer.push(porHacer); // se agrega el nuevo objeto al arreglo
    guardarDB(); // se guarda el nuevo arreglo con los nuebos objetos
    return porHacer;
}

const getListado = ()=>{
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado=true)=>{
  //cargar la base de datos
  cargarDB();
  // buscar en el arreglo lo que coincida con la descripcion
  let index = listadoPorHacer.findIndex(tarea=> tarea.descripcion === descripcion)
  if(index >=0){
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  }else{
    return false;
  }
}

const borrar = (descripcion) =>{
  cargarDB();
  let nuevoListado = listadoPorHacer.filter(tarea=>{
    // voy a retornar los elementos que sean distintos a la descripcion que le envio, por eso los borra
    // por que omite el valor del arreglo que coincide con mi descripcion
    return tarea.descripcion !== descripcion;
  });

  if (listadoPorHacer.length === nuevoListado.length) {
    return false;
  }else{
    listadoPorHacer = nuevoListado;
    guardarDB();
    return true;
  }
}
module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
}