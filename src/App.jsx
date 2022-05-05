import { useState } from 'react'
import simpleTableCreator from './utils/simpleTableCreator'
import Btn from './components/Btn'

const App = () =>  {
  const [text, setText] = useState('')
  const [table, setTable] = useState([])
  const [view, setView] = useState(false)
  const [fullTable, setFullTable] = useState('')

  const handleCreateSimpleTable = () => {
    setView(false)
    setTable(simpleTableCreator(text))
    setFullTable(simpleTableCreator(text, 1))
    setView(true)
  }

  return (
    <div>
      <p>TEST: 2, 3, 5, 3, 2, 6, 3, 2, 2, 1, 0, 1, 0, 4, 1, 2, 1, 4, 5, 0, 3, 4, 2, 1, 2, 2, 0, 1, 0, 2</p>
      <input type="text"
        style={{width: '300px'}}
        onChange={e => setText(e.target.value)}
      /><br />
      <button
        onClick={handleCreateSimpleTable}
      >Crear</button>
      <br/><br/>
      {
        view && 
        <>
        <Btn
        title={'Copy Full Table'}
        data={fullTable}
      /><br></br><br />
         {
          table.length > 0 && 
          table.map((e,i) => {
            return (
                <Btn
                  key={i}
                  title={e[0]}
                  data={e[1]}
                />
            )
          })}
        </>
      }
    </div>
  )
}

export default App
