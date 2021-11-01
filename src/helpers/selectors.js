export const getAppointmentsForDay = (state, day) => {
    // console.log("test state and day", state, day)

    const foundDay = state.days.find((dayObj) => {
        return dayObj.name === day
    });
    const appointments = (foundDay ? foundDay.appointments : []).map((appointmentId) => {
        return state.appointments[appointmentId]
    });
    return appointments;


};

export function getInterview(state, interview) {
    if (!interview) return null;
    const interviewObj = {
        student: interview.student
    };
    interviewObj.interviewer = state.interviewers[interview.interviewer];
    return interviewObj;
}

export const getInterviewersForDay = (state, day) => {

    const foundDay = state.days.find((dayObj) => {
        return dayObj.name === day
    });
    console.log("test found day.....", foundDay)
    if (foundDay === undefined) {
        return []
    }
    const interviwers = foundDay.interviewers.map((day) => {
        return state.interviewers[day]
    })

    return interviwers;


};

