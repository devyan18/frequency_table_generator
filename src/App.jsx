import { useState, useEffect } from 'react'
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getHost } from './utils/getHost';
import copyToClipboard from './utils/copyToClipboard';

export default function App(){

  const [ table, setTable ] = useState([])
  const [ isLoading, setIsLoading ] = useState(null) 

  const getData = () => {
    setIsLoading(true)
    fetch(`${getHost()}/st`, {
      method: 'POST',
      body: JSON.stringify({data: '2,3,5,3,2,6,3,2,2,1,0,1,0,4,1,2,1,4,5,0,3,4,2,1,2,2,0,1,0,2'}),
      headers: { 'Content-Type': 'application/json'} 
    }).then(data => data.json())
    .then(res => {setTable(res?.simpleTable); setIsLoading(false)})
  }

  return (
    <>
      <p>TEST: 2, 3, 5, 3, 2, 6, 3, 2, 2, 1, 0, 1, 0, 4, 1, 2, 1, 4, 5, 0, 3, 4, 2, 1, 2, 2, 0, 1, 0, 2</p>
      <Input type="text"
        style={{width: '300px'}}
      /><br />
      <Button onClick={getData}>Create Table</Button>
      <br  />
      {
      table?.verticalTable?.length > 0 && !isLoading &&
      <>
      <div className={'table_container'}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, background: '#fff' }} size="small" aria-label="a dense table">
          <TableHead sx={{background: '#1876D2'}}>
            <TableRow>
              <TableCell style={{ color: '#FFF'}} align='left'>Xi</TableCell>
              <TableCell style={{ color: '#FFF'}} align="left">fi</TableCell>
              <TableCell style={{ color: '#FFF'}} align="left">Fi</TableCell>
              <TableCell style={{ color: '#FFF'}} align="left">ri</TableCell>
              <TableCell style={{ color: '#FFF'}} align="left">Ri</TableCell>
              <TableCell style={{ color: '#FFF'}} align="left">pi%</TableCell>
              <TableCell style={{ color: '#FFF'}} align="left">Pi%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table.verticalTable.map((e,i) => (
              <TableRow 
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell style={{ color: '#000'}} align='left'>{e[0]}</TableCell>
                <TableCell style={{ color: '#000'}} align='left'>{e[1]}</TableCell>
                <TableCell style={{ color: '#000'}} align='left'>{e[2]}</TableCell>
                <TableCell style={{ color: '#000'}} align='left'>{e[3]}</TableCell>
                <TableCell style={{ color: '#000'}} align='left'>{e[4]}</TableCell>
                <TableCell style={{ color: '#000'}} align='left'>{e[5]}</TableCell>
                <TableCell style={{ color: '#000'}} align='left'>{e[6]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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