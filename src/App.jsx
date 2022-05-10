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
      e = e.replace(' ', ',').replace(',,', ',').replace(' ', '').trim()
    }
    if(e[-1] && ",")e = e.slice(0,-2)
    setText(e)
    setViewTable(false)
  }


  const getData = () => {
    if(text!==''){
      const res = getSimpleTable(text, typeOfData)
      setTable(res)
      setViewTable(true)
    }
  }

  return (
    <>
      <div className='test_container'>
        <span>TEST: 2, 3, 5, 3, 2, 6, 3, 2, 2, 1, 0, 1, 0, 4, 1, 2, 1, 4, 5, 0, 3, 4, 2, 1, 2, 2, 0, 1, 0, 2</span>
        <Button
          variant='text'
          onClick={() => copyToClipboard('2, 3, 5, 3, 2, 6, 3, 2, 2, 1, 0, 1, 0, 4, 1, 2, 1, 4, 5, 0, 3, 4, 2, 1, 2, 2, 0, 1, 0, 2')}
        ><ContentCopyIcon /></Button>
      </div>
      <div className='text_head'>
        <TextField type="text"
          style={{width: '500px'}}
          onChange={handleGetAndChangeData}
          value={text} id="outlined-basic" label="Ingresar datos" variant="outlined"
        />
        <FormControl sx={{width: '120px'}}>
          <InputLabel id="demo-simple-select-label">Tipos de Datos</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeOfData}
            label="Tipos de Datos"
            onChange={(e) => setTypeOfData(e.target.value)}
          >
            <MenuItem value={0}>Población</MenuItem>
            <MenuItem value={1}>Muestra</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='getData'>
        <Button 
          onClick={getData}
          variant='contained'
        >Crear Tabla</Button>
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
          variant='contained'
          onClick={() => copyToClipboard(table?.simpleTableExcelFormated)}
        >Copiar tabla</Button>
        </div>
        <div className='getData'>
          <h3>Tendencias centrales</h3>
          <TableOfCentralDentencies
            N={table.N} 
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