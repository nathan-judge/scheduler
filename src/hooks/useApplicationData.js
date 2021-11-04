import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewer: {}
    });
    console.log("TEST STATE", state)


    const setDay = day => setState({ ...state, day });


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

    function getDay(day) {
        const daysOfWeek = {
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0
        }
        return daysOfWeek[day]
    }


    function bookInterview(id, interview) {

        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        const currentDay = getDay(state.day)

        let day = {
            ...state.days[currentDay],
            spots: state.days[currentDay]
        }

        if (!state.appointments[id].interview) {
            day = {
                ...state.days[currentDay],
                spots: state.days[currentDay].spots - 1
            }
        } else {
            day = {
                ...state.days[currentDay],
                spots: state.days[currentDay].spots
            }
        }

        let days = state.days
        days[currentDay] = day;

        return axios.put(`/api/appointments/${id}`, { interview: interview })
            .then(res => {
                setState({ ...state, appointments, days })
                return res
            })
    }

    function cancelInterview(id) {

        const appointment = {
            ...state.appointments[id],
            interview: null
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        }
        const currentDay = getDay(state.day)

        const day = {
            ...state.days[currentDay],
            spots: state.days[currentDay].spots + 1
        }

        let days = state.days
        days[currentDay] = day;

        return axios.delete(`/api/appointments/${id}`)
            .then(res => {
                setState({ ...state, appointments, days })
                return res
            })
    }
    return {
        state,
        setDay,
        bookInterview,
        cancelInterview
    };
}
