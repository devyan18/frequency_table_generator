function roundedWith2Decimals (num) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

function getDataFiltrered(data){
  return data.split(',').map(e => e.trim() && parseFloat(e))
}

function getDiferentDatas(data) {
  return data.filter((e,i) => data.indexOf(e) == i).sort((a,b) => a-b)
}

function getSimpleTableExcelFormated(data){
  let simpleTableExcelFormated = ''
  for (let x=0;x<data.length;x++){
    for (let y=0;y<data[0].length;y++){
      if(y>0) simpleTableExcelFormated += "	"
      simpleTableExcelFormated += `${data[x][y]}`
    }
    simpleTableExcelFormated += "\n"
  }
  return simpleTableExcelFormated
}

function formatedSimpleTable(data){
  let simpleTableFormated = []

  for (let x = 0; x < data[0].length; x++) {
    simpleTableFormated[x] = [data[0][x]]
  }

  for(let x=0;x<data[0].length;x++){
    let formatData = ''
    for(let y=0;y<data.length;y++){
      y>0 ? formatData += `\n${data[y][x]}`
          : formatData += `${data[y][x]}`
    }
    simpleTableFormated[x][1] = formatData
  }
  return simpleTableFormated
}

function createSimpleTable(data, ARR_fi, ARR_Xi, filteredArray, N){
  let simpleTable = [0, 0, 0, 0]
  for (let x = 0; x < filteredArray.length; x++) {
    simpleTable[x] = []
    const Xi = filteredArray[x]
    const fi = data.filter(e => e == filteredArray[x]).length
    let Fi = 0
    
    if(!x==0) {
      Fi = fi + simpleTable[x-1][2] 
    }else {
      Fi = fi
    }
    const ri = parseFloat((fi/N))
    const Ri = parseFloat((Fi/N))
    const pi = ri*100
    const Pi = Ri*100
    ARR_fi.push(fi)
    ARR_Xi.push(Xi)
    simpleTable[x] = [Xi, fi, Fi, ri, Ri, pi, Pi] 
  }
  const names = ["Xi","fi","Fi","ri","Ri","pi","Pi"]
  simpleTable = [names, ...simpleTable]
  return simpleTable
}

function createVerticalTable(horizontalTable){
  let verticalTable = []

  for(let i=0;i<horizontalTable[0].length; i++){
    verticalTable[i] = []
    for(let x=0; x<horizontalTable.length; x++){
      verticalTable[i][x] = horizontalTable[x][i]
    }
  }
  return verticalTable
}

function createHorizontalTable(simpleTable){
  let horizontalTable = []
  
  for (let x = 0; x < simpleTable[0].length; x++) {
    horizontalTable[x] = []
    for (let y = 0; y < simpleTable.length; y++) {
      horizontalTable[x][y] = simpleTable[y][x]      
    }
  }
  return horizontalTable
}

function getCentralTrend(ARR_fi, ARR_Xi, data, N){
  const element = Math.max(...ARR_fi)
  let indices = []
  let idx = ARR_fi.indexOf(element)
  while (idx != -1) {
    indices.push(idx)
    idx = ARR_fi.indexOf(element, idx + 1)
  }
  const Mo = ARR_Xi.filter(e => indices.includes(e))
  const modaData = {
    Mo,
    typeMo: Mo.length > 2 ? "multimodal" : Mo.length > 1 ? "bimodal" : "unimodal"
  }

  let Mediana = 0

  const dataOrder = data.sort((a,b) => a-b)

  if(data.length%2==0){
    Mediana = (dataOrder[dataOrder.length/2]+dataOrder[(dataOrder.length/2)+1])/2
  }else {
    Mediana = dataOrder[((dataOrder.length-1)/2)]
  }

  let Media = 0
  for (let x=0;x<ARR_Xi.length;x++){
    Media += ARR_Xi[x]*ARR_fi[x]
  }
  Media /= N

  Media = roundedWith2Decimals(Media)
  return { modaData, Mediana, Media }
}

function getDispersionParameters(verticalTable, N, filteredArray, Media, TT){
  const [a, ...restOfVerticalTable] = verticalTable
  verticalTable = [...restOfVerticalTable]
  

  let Rango = Math.max(...filteredArray)-Math.min(...filteredArray)

  let Varianza = 0

  for (let x=0;x<verticalTable.length;x++){
    Varianza += (verticalTable[x][0]**2)*verticalTable[x][1]
  }
  Varianza /= (N-TT);
  Varianza -= Media**2
  Varianza = roundedWith2Decimals(Varianza)
  let DesviacionEstandar = roundedWith2Decimals(Math.sqrt(Varianza))
  let CoeficienteVariacion = roundedWith2Decimals(DesviacionEstandar/Media)

  return { Rango, Varianza, DesviacionEstandar, CoeficienteVariacion}
}

function getSimpleTable(data, TT){  
  data = getDataFiltrered(data)
  let ARR_fi = [], ARR_Xi = []
  const N = data.length
  const filteredArray = getDiferentDatas(data)
  const simpleTable = createSimpleTable(data, ARR_fi, ARR_Xi, filteredArray, N)
  const simpleTableFormated = formatedSimpleTable(simpleTable)
  const horizontalTable = createHorizontalTable(simpleTable)
  const verticalTable = createVerticalTable(horizontalTable)
  const tendenciaCentral = getCentralTrend(ARR_fi, ARR_Xi, data, N)
  const parametrosDeispercion = getDispersionParameters(verticalTable, N, filteredArray, tendenciaCentral.Media, TT)
  const simpleTableExcelFormated = getSimpleTableExcelFormated(data)

  return { N, simpleTableExcelFormated, simpleTableFormated, horizontalTable, verticalTable, tendenciaCentral, parametrosDeispercion}
}

export default getSimpleTable