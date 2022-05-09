import { useState } from 'react'
import { Button, TextField, InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import copyToClipboard from './utils/copyToClipboard'
import SimpleTable from './components/SimpleTable'
import TableOfCentralDentencies from './components/TableOfCentralDentencies'
import getSimpleTable from './utils/getSimpleTable'
import TableOfDesviacion from './components/TableOfDeviacion'


export default function App(){

  const [ table, setTable ] = useState([])
  const [ text, setText ] = useState('') 
  const [ viewTable, setViewTable ] = useState(false)
  const [ typeOfData, setTypeOfData ] = useState(0)

  const handleGetAndChangeData = (e) => {
    e = e.target.value
    let count = e.length
    for(let i=0;i<count;i++){
      e = e.replace(/[a-zA-Z]/, '')
      e = e.replace(' ', ',')
      e = e.replace(',,', ',')
      e = e.replace(' ', '')
      e = e.trim()
    }
    if(e[-1] && ",")e = e.slice(0,-2)
    setText(e)
    setViewTable(false)
  }


  const getData = () => {
    const res = getSimpleTable(text)
    setTable(res)
    setViewTable(true)
    setText('')
  }

  return (
    <>
      <p>TEST: 2, 3, 5, 3, 2, 6, 3, 2, 2, 1, 0, 1, 0, 4, 1, 2, 1, 4, 5, 0, 3, 4, 2, 1, 2, 2, 0, 1, 0, 2</p>
      <div className='getData'>
        <div>

        <TextField type="text"
          style={{width: '500px'}}
          onChange={handleGetAndChangeData}
          value={text} id="outlined-basic" label="Inset Data" variant="outlined"
          size='small'
          />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Type Of Data</InputLabel>
          <Select
            size='small'
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeOfData}
            label="Type Of Data"
            onChange={(e) => setTypeOfData(e.target.value)}
            >
            <MenuItem value={0}>Población</MenuItem>
            <MenuItem value={1}>Muestra</MenuItem>
          </Select>
        </FormControl>
            </div>
        <Button 
          onClick={getData}
          variant='contained'
        >Create Table</Button>
      </div>
      {
      viewTable && !!table &&
      <>
      <div className={'table_container'}>
        <SimpleTable verticalTable={table?.verticalTable}
        />
      </div>
      <div className='getData'>
        <Button
          endIcon={<ContentCopyIcon />}
          size='small'
          variant='contained'
          onClick={() => copyToClipboard(table?.simpleTableExcelFormated)}
        >Copy table</Button>
        </div>
        <div className='getData'>
          <h3>Tendencias centrales</h3>
          <TableOfCentralDentencies 
            tendenciaCentral={table?.tendenciaCentral}
          />
          <h3>Parámetros de disperción</h3>
          <TableOfDesviacion
            parametrosDeispercion={table?.parametrosDeispercion}
          />
        </div>
      </>
      }
    </>
  )
}