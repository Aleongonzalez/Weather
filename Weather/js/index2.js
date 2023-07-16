const URL_API = 'https://www.el-tiempo.net/api/json/v2/'

const provincias = async () => {
    const response = await fetch(URL_API+'home')
    const data = await response.json()

    for(let k=0;k<data.provincias.length;k++){  
        document.getElementById('provincias').innerHTML +=`<option value=${data.provincias[k].CODPROV}>${data.provincias[k].NOMBRE_PROVINCIA}</option>`
    }
    

}

const municipios = async (codProv) => {
    const response = await fetch(URL_API+'municipios')
    const data = await response.json()
    document.getElementById('municipios').innerHTML =""
    for(let i=0;i<data.length;i++){
        if(data[i].CODPROV===codProv){
            document.getElementById('municipios').innerHTML +=`<option value=${data[i].CODIGOINE.slice(0,5)}>${data[i].NOMBRE}</option>`
        }
    }
   
}

const pintaTiempoGeneral = async () => {
    const response = await fetch(URL_API+'home')
    const data = await response.json()

    for(let i=0;i<data.today.p.length;i++){
        document.getElementById('today').innerHTML +=`<div>${data.today.p[i]}</div>`
    }
    for(let j=0;j<data.tomorrow.p.length;j++){
        document.getElementById('tomorrow').innerHTML +=`<div>${data.tomorrow.p[j]}</div>`
    }
}



provincias()
document.getElementsByTagName('body').onload=pintaTiempoGeneral()

const pintaTiempoProvincia = async (codProv) => {
    const response = await fetch(URL_API+'provincias/'+codProv)
    const data = await response.json()
    
    document.getElementById('today_prov').innerHTML = data.title + ' hoy'
    document.getElementById('today_prov_text').innerHTML =`<div>${data.today.p}</div>`
    document.getElementById('tomorrow_prov').innerHTML = data.title + ' mañana'
    document.getElementById('tomorrow_prov_text').innerHTML =`<div>${data.tomorrow.p}</div>`
    
}

const pintaTiempoMunicipio = async (codProv, codMunic) => {
    const response = await fetch(URL_API+'provincias/'+codProv+'/municipios/'+codMunic)
    const data = await response.json()
    const tipo_temp =['Actual','Máxima','Mínima']

    document.getElementById('muni_title').innerHTML = data.metadescripcion + ' hoy';
    document.getElementById('tempe').innerHTML=''
    for(let j=0;j<tipo_temp.length;j++){
        document.getElementById('tempe').innerHTML +=`<th class='text-center'>Temperatura ${tipo_temp[j]}</th>`
    }
    
    document.getElementById('temp_act').innerHTML = data.temperatura_actual
    document.getElementById('temp_max').innerHTML = data.temperaturas.max
    document.getElementById('temp_min').innerHTML = data.temperaturas.min
    document.getElementById('temps').innerHTML =''
    document.getElementById('sens').innerHTML = ''
    document.getElementById('horas').innerHTML ='<th></th>'
    document.getElementById('temps').innerHTML = '<td>Temperatura</td>'
    document.getElementById('sens').innerHTML = '<td>Sensación térmica</td>'
    for(let i = 0;i<data.pronostico.hoy.temperatura.length;i++){
        document.getElementById('horas').innerHTML += `<th>${[i]}:00</th>`
        document.getElementById('temps').innerHTML += `<td>${data.pronostico.hoy.temperatura[i]}</td>`
        document.getElementById('sens').innerHTML += `<td>${data.pronostico.hoy.sens_termica[i]}</td>`
    }
    console.log(codProv)
}


const result = document.querySelector("#prov_title");
document.querySelector("#provincias").addEventListener("change", (event) => {
   let codProv = event.target.value
   
   pintaTiempoProvincia(codProv)
   municipios(codProv)
   document.querySelector("#municipios").addEventListener("change", (event) => {
    let codMunic = event.target.value
  
    pintaTiempoMunicipio(codProv, codMunic)
   
 });
});



