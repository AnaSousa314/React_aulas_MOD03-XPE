import React, { useEffect, useState } from "react";
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
import { ICalendar, IEvent, getCalendarsEndpoint, getEventsEndpoint } from "./backend";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const useStyles = makeStyles({
  root: {
    // height: "100%",
  },
  table: {
    minHeight: "100%",
    borderTop: "1px solid rgb(244, 244, 244)",
    tableLayout: "fixed",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(244, 244, 244)",
    },
    "& td": {
      verticalAlign: "top",
      overflow: "hidden",
      padding: "8px 4px",
    },
  },
  dayOfMonth: {
    fontWeight: 500,
    marginBottom: "4px",
  },
  eventss: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    whiteSpace: "nowrap",
    margin: "4px 0px",
  },
  eventBackground: {
    display: "inline-block",
    color: "white",
    padding: "2px",
    borderRadius: "4px"
  }
});

export default function CalendarScreen() {
  const classes = useStyles();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const weeks = generateCalendar(getToday(), events, calendars);
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    Promise.all([getCalendarsEndpoint(), 
      getEventsEndpoint(firstDate, lastDate)
    ]).then(
      ([calendars, events]) =>{
        setCalendars(calendars);
        setEvents(events);
      })
  }, [firstDate, lastDate]);

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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="8px 16px"
          >
            <Box flex="1">
              <IconButton aria-label="Próximo Mês">
                <Icon>chevron_left</Icon>
              </IconButton>
              <Box component="strong" margin="16px">
                Junho de 2021
              </Box>
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
              {weeks.map((week, index) => (
                <TableRow key={index}>
                  {week.map((cell) => {
                    return (
                      <TableCell key={cell.date} align="center">
                        <div className={classes.dayOfMonth}>
                          {cell.dayOfMonth}
                        </div>

                        {cell.events.map((event) => {
                          const color = event.calendar.color;

                          return(
                          <button className={classes.eventss}>
                            {event.time && (
                              <>
                                <Icon style={{color}} fontSize="inherit">watch_later</Icon>
                                <Box component="span" margin="0 4px">
                                  {event.time}
                                </Box>
                              </>
                            )}
                            {event.time ? <span>{event.desc}</span> : <span className={classes.eventBackground} style={{backgroundColor: color}}>{event.desc}</span>}
                            
                          </button>
                        )})}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: (IEvent & {calendar: ICalendar})[];
}

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  calendars: ICalendar[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + "T10:00:00");
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);
  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);

  console.log(allEvents);
  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
      const dayStr = currentDay.getDate().toString().padStart(2, "0");

      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;
      week.push({
        dayOfMonth: currentDay.getDate(),
        date: isoDate,
        events: allEvents.filter((e) => e.date === isoDate).map(e => {
          const calendar = calendars.find(cal => cal.id === e.calendarId)!;
          return {...e, calendar}
        }),
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}

function getToday() {
  return "2021-06-17";
}
