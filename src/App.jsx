import { useState } from 'react'
import simpleTableCreator from './simpleTableCreator'

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

const Btn = ({title, data}) => {

  const [copied, setCopied] = useState(false)

  const handleCopiedData = () => {
    copyToClipboard(data)
    setCopied(true)
  }

  return (
    <>
      <button
      style={{ width: '60px' }}
        onClick={handleCopiedData}
      >
        {
          !copied ? title : "Copied"
        }
      </button>
    </>
  )
}

const App = () =>  {
  const [data, setData] = useState('')
  const [table, setTable] = useState([])

  const handleCreateSimpleTable = () => {
    setTable([])
    setTable(simpleTableCreator(data))
  }
  return (
    <div>
      <input type="text"
        onChange={e => setData(e.target.value)}
      />
      <button
        onClick={handleCreateSimpleTable}
      >Crear</button><br/><br/>
      {
        table.length > 0 && 
          table.map((e,i) => {
            return (
                <Btn
                  pick={pick}
                  key={i}
                  title={e[0]}
                  data={e[1]}
                />
            )
          })
      }
    </div>
  )
}

export default App
