const { green } = require("colors");
const Tarea = require("./tarea");

class Tareas {

    _listado = {}

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => listado.push(this._listado[key]))

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = "") {
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = ""){

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea
    }


    listadoCompleto() {

        console.log();

        for(let i = 0; i < this.listadoArr.length; i++) {
            let contador = (i+1).toString()+".";
            let titulo = this.listadoArr[i]["desc"];
            let estado = this.listadoArr[i]["completadoEn"]?"Completada".green:"Pendiente".red;
            console.log(`${contador.green} ${titulo} :: ${estado}`);
        }
    }

    listarPendientesCompletadas( completadas = true) {

        console.log();

        let indexCompletadas = 0;
        let indexPendientes = 0;
        
        this.listadoArr.forEach((tarea, ind) => {

            let titulo = this.listadoArr[ind]["desc"];
            let estado = this.listadoArr[ind]["completadoEn"]?"Completada".green:"Pendiente".red;

            if(completadas) {
                if(tarea.completadoEn) {
                    indexCompletadas += 1;
                    let indexCompletadasString = indexCompletadas.toString();
                    console.log(`${(indexCompletadasString+".").green} ${titulo} :: ${tarea.completadoEn.green}`);
                } 
            } else {
                if(!tarea.completadoEn) {
                    indexPendientes += 1;
                    let indexPendientesString = indexPendientes.toString();
                    console.log(`${(indexPendientesString+".").green} ${titulo} :: ${estado}`)
                }
            }
        })
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];

            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;