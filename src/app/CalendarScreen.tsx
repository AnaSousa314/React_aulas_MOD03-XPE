import React from "react";
import {
  // Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const useStyles = makeStyles({
  root:{
    height: "100%",
  },
  table: {
    minHeight: "100%",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(244, 244, 244)",
    }
  },
});


export default function CalendarScreen() {
  const classes = useStyles();

  return (
    <>
      <TableContainer className={classes.root} component={"div"}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {
                DAYS_OF_WEEK.map((day) => {
                  return (
                    <TableCell key={day} align="center">{day}</TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            
              <TableRow>
              {
                DAYS_OF_WEEK.map((day) => {
                  return (
                    <TableCell key={day} align="center">X</TableCell>
                  )
                })
              }
              </TableRow>
              <TableRow>
              {
                DAYS_OF_WEEK.map((day) => {
                  return (
                    <TableCell key={day} align="center">X</TableCell>
                  )
                })
              }
              </TableRow>
              <TableRow>
              {
                DAYS_OF_WEEK.map((day) => {
                  return (
                    <TableCell key={day} align="center">X</TableCell>
                  )
                })
              }
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
