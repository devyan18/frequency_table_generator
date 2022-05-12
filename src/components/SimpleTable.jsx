import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

export default function SimpleTable({verticalTable}) {

  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, background: '#fff' }} size="small" aria-label="a dense table">
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
            {verticalTable.map((e,i) => (
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
  )
}
