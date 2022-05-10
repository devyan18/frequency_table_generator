import { Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copyToClipboard from '../utils/copyToClipboard'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

export default function TableOfCentralTendencies({tendenciaCentral, N}) {
  const {modaData, Mediana, Media} = tendenciaCentral
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, background: '#fff' }} size="small" aria-label="a dense table">
        <TableHead sx={{ background: '#1876D2' }}>
          <TableRow>
            <TableCell style={{ color: '#FFF' }} align='center'>Total</TableCell>
            <TableCell style={{ color: '#FFF' }} align='center'>Moda</TableCell>
            <TableCell style={{ color: '#FFF' }} align="center">Media</TableCell>
            <TableCell style={{ color: '#FFF' }} align="center">Mediana</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell style={{ color: '#000' }} align='center'>{N}</TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{modaData.Mo}</TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{Media}</TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{Mediana}</TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell style={{ color: '#000' }} align='center'>{
              <Button
                endIcon={<ContentCopyIcon />}
                variant='contained'
                onClick={() => copyToClipboard(`N\n${N}`)}
              >Copiar N</Button>}
            </TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{
              <Button
                endIcon={<ContentCopyIcon />}
                variant='contained'
                onClick={() => copyToClipboard(`Moda\n${modaData.Mo}`)}
              >Copiar Moda</Button>}
            </TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{
              <Button
                endIcon={<ContentCopyIcon />}
                variant='contained'
                onClick={() => copyToClipboard(`Media\n${Media}`)}
              >Copiar Media</Button>}
            </TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{
              <Button
                endIcon={<ContentCopyIcon />}
                variant='contained'
                onClick={() => copyToClipboard(`Mediana\n${Mediana}`)}
              >Copiar Mediana</Button>}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}