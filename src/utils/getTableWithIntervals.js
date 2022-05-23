function getDiferentDatas(data) {
  return data.filter((e,i) => data.indexOf(e) == i).sort((a,b) => a-b)
}

const getAnplitud = (data) => {
  const numbers = getDiferentDatas(data)
  return 1+(3.322*Math.log10(Math.max(numbers)))
} 

export default function getTableWithIntervals (data) {
  const Amplitud = getAnplitud(data)
}