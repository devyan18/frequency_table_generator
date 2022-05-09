import { useState } from 'react'
import {
  Button,
  Input,
  CircularProgress,
  TextField
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getHost } from './utils/getHost';
import copyToClipboard from './utils/copyToClipboard';
import SimpleTable from './components/SimpleTable';

export default function App(){

  const [ table, setTable ] = useState([])
  const [ isLoading, setIsLoading ] = useState(null) 
  const [ text, setText ] = useState('') 



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
  }

  const getData = () => {
    setIsLoading(true)
    fetch(`${getHost()}/st`, {
      method: 'POST',
      body: JSON.stringify({data: text}),
      headers: { 'Content-Type': 'application/json'} 
    }).then(data => data.json())
    .then(res => {setTable(res?.simpleTable); setIsLoading(false); setText('')})
  }

  return (
    <>
      <p>TEST: 2, 3, 5, 3, 2, 6, 3, 2, 2, 1, 0, 1, 0, 4, 1, 2, 1, 4, 5, 0, 3, 4, 2, 1, 2, 2, 0, 1, 0, 2</p>
      <div className='getData'>
        <TextField type="text"
          style={{width: '500px'}}
          onChange={handleGetAndChangeData}
          value={text} id="outlined-basic" label="Inset Data" variant="outlined"
          size='small'
        />
        <Button 
          onClick={getData}
          variant='contained'
        >Create Table</Button>
      </div>
      {
      table?.verticalTable?.length > 0 && !isLoading &&
      <>
      <div className={'table_container'}>
        <SimpleTable verticalTable={table.verticalTable}
        />
      </div>
      <Button
        endIcon={<ContentCopyIcon />}
        size='small'
        variant='contained'
        onClick={() => copyToClipboard(table.simpleTableExcelFormated)}
      >Copy table</Button>
      </>
      }
      {
        isLoading == true &&
        <CircularProgress  /> 
      }
    </>
  )
}