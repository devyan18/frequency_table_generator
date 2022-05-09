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

export default function TableOfDesviacion({parametrosDeispercion}) {
  const {Rango, Varianza, DesviacionEstandar, CoeficienteVariacion } = parametrosDeispercion
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, background: '#fff' }} size="small" aria-label="a dense table">
        <TableHead sx={{ background: '#1876D2' }}>
          <TableRow>
            <TableCell style={{ color: '#FFF' }} align='center'>Rango</TableCell>
            <TableCell style={{ color: '#FFF' }} align="center">Varianza</TableCell>
            <TableCell style={{ color: '#FFF' }} align="center">Desviacion Estándar</TableCell>
            <TableCell style={{ color: '#FFF' }} align="center">Coeficiente de Variacion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell style={{ color: '#000' }} align='center'>{Rango}</TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{Varianza}</TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{DesviacionEstandar}</TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{CoeficienteVariacion}</TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell style={{ color: '#000' }} align='center'>{
              <Button
                endIcon={<ContentCopyIcon />}
                size='small'
                variant='contained'
                onClick={() => copyToClipboard(`Rango\n${Rango}`)}
              >Copy Rango</Button>}
            </TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{
              <Button
                endIcon={<ContentCopyIcon />}
                size='small'
                variant='contained'
                onClick={() => copyToClipboard(`Varianza\n${Varianza}`)}
              >Copy Varianza</Button>}
            </TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{
              <Button
                endIcon={<ContentCopyIcon />}
                size='small'
                variant='contained'
                onClick={() => copyToClipboard(`DesviacionEstandar\n${DesviacionEstandar}`)}
              >Copy DesviacionEstandar</Button>}
            </TableCell>
            <TableCell style={{ color: '#000' }} align='center'>{
              <Button
                endIcon={<ContentCopyIcon />}
                size='small'
                variant='contained'
                onClick={() => copyToClipboard(`Coeficiente de Variacion\n${CoeficienteVariacion}`)}
              >Copy Coeficiente de Variacion</Button>}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}