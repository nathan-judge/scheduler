import React, { Fragment } from "react";
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js"
import useVisualMode from "hooks/useVisualMode.js"
import Form from "./Form";


export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );
    return (
        <Fragment>
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                />
            )}
            {mode === CREATE && <Form name={props.name} value={props.value} interviewers={props.interviewers} onCancel={back} />}
        </Fragment>

    )
}

