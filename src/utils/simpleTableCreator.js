function simpleTableCreator(data, format=0){

  data = data.split(',').map(e => e.trim() && parseInt(e))
  const filteredArray = data.filter( (ele,pos)=>data.indexOf(ele) == pos).sort((a,b) => a-b)
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
    const ri = parseFloat((fi/data.length))
    const Ri = parseFloat((Fi/data.length))
    const pi = ri*100
    const Pi = Ri*100

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

  if(format == 0) return simpleTableFormated

  let simpleTableNotFormated = ''

  for (let x=0;x<simpleTable.length;x++){
    for (let y=0;y<simpleTable[0].length;y++){
      if(y>0) simpleTableNotFormated += "	"
      simpleTableNotFormated += `${simpleTable[x][y]}`
    }
    simpleTableNotFormated += "\n"
  }
  return simpleTableNotFormated
}

export default simpleTableCreator