import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {}
  });
  console.log("TEST STATE", state)

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  const appointments = getAppointmentsForDay(state, state.day);

  const interviwersDay = getInterviewersForDay(state, state.day)
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data
      console.log("days", days)
      console.log("interview", interviewers)
      setState(prev => ({ ...prev, days: days, appointments: appointments, interviewers: interviewers }));
    });


  }, [])




  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={interviwersDay}
          />
        })}
      </section>
    </main>
  );
}


  // const setDays = days => setState(prev => ({ ...prev, days }));

  // const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
