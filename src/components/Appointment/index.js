import React, { Fragment } from "react";
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js"

export default function Appointment(props) {

    return (
        <Fragment>
            <Header time={props.time}></Header>
            {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} ></Show> :

                props.id === "last" ? null :
                    <Empty id={props.id}></Empty>}
        </Fragment>

    )
}