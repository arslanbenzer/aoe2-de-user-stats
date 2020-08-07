import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    maxWidth: 600,
  },
});

const TableRatings = ({ matches }) => {

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Num Wins</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(matches.length > 0) ? matches.map((droplet, index) => {
            return (
              <TableRow key={index}>
                <TableCell >{index + 1}</TableCell>
                <TableCell >{droplet.rating}</TableCell>
                <TableCell >{droplet.num_wins}</TableCell>
                <TableCell >{new Date(droplet.timestamp * 1000).toLocaleString()}</TableCell>
              </TableRow >
            )
          }) : <tr><td colSpan="5">Loading...</td></tr>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableRatings