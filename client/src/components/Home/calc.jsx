import * as React from 'react';
import { useState } from 'react';


 const Calc=()=> {
    let [aproxim, setAprox] = useState('')

    let [tiempoDeEj, setTiempoDeE
    ] = useState('')
    let [actividad, setActividad] = useState('')

  let age;  
  

    const handleAge= (e)=>{
        age = e.target.value
       
       
    }


    const HandleCalc = (e)=> {
        if (age === '1' || age === '2') {
            
            aproxim = '16-18 horas al día'
            tiempoDeEj = '60 minutos diarios'
            actividad = 'Estimulación temprana'
           
        }
        if (age >= 3 && age <= 16) {
            aproxim = '11-12 horas al día'
            tiempoDeEj = '60 minutos diarios'
            actividad = 'Correr, saltar, natacion...'
        }
        if (age >= 17 && age <= 29) {
            aproxim = '9-10 horas al día'
            tiempoDeEj = '60 minutos diarios'
            actividad = 'Deportes en equipo, baile, natacion...'
        }
        if (age >= 30  && age <= 39 ) {
            aproxim = '7-8 horas al día'
            tiempoDeEj = '225 minutos a la semana'
            actividad = 'Boxeo, andar en bici, ir al gimnasio, deportes en equipo'
        }
        if (age >= 40 && age <= 49) {
            aproxim = '7-8 horas al día'
            tiempoDeEj = '225 minutos a la semana'
            actividad = 'ir al gimnasio, practicar natación o actividades como el yoga o pilates'
        }
        if (age >= 50 && age <= 65 ) {
            aproxim = '7-8 horas al día'
            tiempoDeEj = '225 minutos a la semana'
            actividad = 'Andar en bici, hacer natación, salir a andar o trotar, practicar yoga o pilates'
        }

        if (age > 65) {
            aproxim = '7-8 horas al día'
            tiempoDeEj = 'Entre media hora y cuarenta y cinco minutos al día'
            actividad = 'Aeróbicos acuáticos, baile, caminata'
        }
        if(age === 0 ) {
            aproxim = ''
            tiempoDeEj = ''
            actividad = ''
        }

        setTiempoDeE(tiempoDeEj)
        setAprox(aproxim)
        setActividad(actividad)        
        
    }
   

    function SueñoI({aproxim, tiempoDeEj, actividad}) {
        
        return (
            <div >
            <div>Dormir: {aproxim}</div>
            <div>Tiempo de actividad: {tiempoDeEj} </div>
            <div>Actividad: {actividad}</div>
            <br />
            <div className='recomend' >Recuerda que no importa la actividad, lo importante es estar en movimiento</div>
            </div>
        )
    }
   


  return (

    <>
   
    <h4 className='titlerecomen'>Recomendaciones por edad</h4>
    <div className='sueñoEdad'>
        
    
        <input type="number" name="" id="" onChange={handleAge}
        min={1} max={120} defaultValue='0'
        />
        <input type="submit" value="Ver" onClick={HandleCalc}  />
  
        <div>  <SueñoI aproxim={aproxim}  tiempoDeEj={tiempoDeEj} actividad= {actividad}/>
         </div>

    </div>
    </>
  )
   
}
export default Calc;