function simpleTableCreator(data){
  
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
    const ri = parseFloat((fi/data.length).toFixed(4))
    const Ri = parseFloat((Fi/data.length).toFixed(4))
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
      formatData += `\n${simpleTable[y][x]}`
    }
    simpleTableFormated[x][1] = formatData
  }

  return simpleTableFormated
}

export default simpleTableCreator