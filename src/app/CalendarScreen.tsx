import React from "react";
import {
  Box,
  // Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Button,
  FormControlLabel,
  Checkbox,
  Icon,
  IconButton,
  Avatar,
} from "@material-ui/core";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const useStyles = makeStyles({
  root: {
    // height: "100%",
  },
  table: {
    minHeight: "100%",
    borderTop: "1px solid rgb(244, 244, 244)",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(244, 244, 244)",
    },
  },
});

export default function CalendarScreen() {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" height="100%" alignItems="stretch">
        <Box
          borderRight="1px solid rgb(244, 244, 244)"
          width="16em"
          padding="8px 16px"
        >
          <h2>Agenda React</h2>

          <Button variant="contained" color="primary">
            Novo Evento
          </Button>

          <Box marginTop="64px">
            <h3>Agendas</h3>

            <FormControlLabel control={<Checkbox />} label="Pessoal" />
            <FormControlLabel control={<Checkbox />} label="Trabalho" />
          </Box>
        </Box>

        <TableContainer className={classes.root} component={"div"}>
          <Box display="flex" justifyContent="space-between" alignItems="center" padding="8px 16px">
            <Box flex="1">
              <IconButton aria-label="Próximo Mês">
                <Icon>chevron_left</Icon>
              </IconButton>
              <Box component="strong" margin="16px">Junho de 2021</Box>
              <IconButton aria-label="Mês Anterior">
                <Icon>chevron_right</Icon>
              </IconButton>
            </Box>

            {/* <Box flex="1" component="h3" margin="16px">Junho de 2021</Box> versão do professor aula 3.4 min 12:57*/}
            <Box>
              <IconButton aria-label="Usuário">
                <Avatar>
                  <Icon>person</Icon>
                </Avatar>
              </IconButton>
            </Box>
          </Box>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {DAYS_OF_WEEK.map((day) => {
                  return (
                    <TableCell key={day} align="center">
                      {day}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {DAYS_OF_WEEK.map((day) => {
                  return (
                    <TableCell key={day} align="center">
                      X
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                {DAYS_OF_WEEK.map((day) => {
                  return (
                    <TableCell key={day} align="center">
                      X
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                {DAYS_OF_WEEK.map((day) => {
                  return (
                    <TableCell key={day} align="center">
                      X
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
