function roundedWith2Decimals (num) {
  num = Math.round((num + Number.EPSILON) * 100) / 100
  return num
}

function getSimpleTable(data, TT){
  data = data.split(',').map(e => e.trim() && parseFloat(e))
  let ARR_fi = [], ARR_Xi = []
  const N = data.length
  const filteredArray = data.filter((ele,pos)=>data.indexOf(ele) == pos).sort((a,b) => a-b)
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

  let simpleTableFormated = []

  for (let x = 0; x < simpleTable[0].length; x++) {
    simpleTableFormated[x] = [simpleTable[0][x]]
  }

  for(let x=0;x<simpleTable[0].length;x++){
    let formatData = ''
    for(let y=0;y<simpleTable.length;y++){
      y>0 ? formatData += `\n${simpleTable[y][x]}`
          : formatData += `${simpleTable[y][x]}`
    }
    simpleTableFormated[x][1] = formatData
  }

  let simpleTableExcelFormated = ''
  let horizontalTable = []
  for (let x=0;x<simpleTable.length;x++){
    for (let y=0;y<simpleTable[0].length;y++){
      if(y>0) simpleTableExcelFormated += "	"
      simpleTableExcelFormated += `${simpleTable[x][y]}`
    }
    simpleTableExcelFormated += "\n"
  }

  
  for (let x = 0; x < simpleTable[0].length; x++) {
    horizontalTable[x] = []
    for (let y = 0; y < simpleTable.length; y++) {
      horizontalTable[x][y] = simpleTable[y][x]      
    }
  }

  const element = Math.max(...ARR_fi)
  let indices = []
  let idx = ARR_fi.indexOf(element)
  while (idx != -1) {
    indices.push(idx)
    idx = ARR_fi.indexOf(element, idx + 1)
  }
  console.log(indices)
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

  let verticalTable = []

  for(let i=0;i<horizontalTable[0].length; i++){
    verticalTable[i] = []
    for(let x=0; x<horizontalTable.length; x++){
      verticalTable[i][x] = horizontalTable[x][i]
    }
  }
  const [a, ...restOfVerticalTable] = verticalTable
  verticalTable = [...restOfVerticalTable]
  Media /= N

  let Rango = Math.max(...filteredArray)-Math.min(...filteredArray)

  let Varianza = 0

  for (let x=0;x<verticalTable.length;x++){
    Varianza += (verticalTable[x][0]**2)*verticalTable[x][1]
    console.log("Xi^2: ", verticalTable[x][0]**2," * fi: ",verticalTable[x][1], " = ", Varianza)
  }
  console.log(verticalTable)
  Varianza /= (N-TT);
  Varianza -= Media**2
  Varianza = roundedWith2Decimals(Varianza)
  let DesviacionEstandar = roundedWith2Decimals(Math.sqrt(Varianza))
  let CoeficienteVariacion = roundedWith2Decimals(DesviacionEstandar/Media)

  const tendenciaCentral = { modaData, Mediana, Media }
  const parametrosDeispercion = { Rango, Varianza, DesviacionEstandar, CoeficienteVariacion}

  return { N, simpleTableExcelFormated, simpleTableFormated, horizontalTable, verticalTable, tendenciaCentral, parametrosDeispercion}
}

export default getSimpleTable