import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");

    const reset = function () {
        setName("");
        setInterviewer(null);
    };

    const cancel = function () {
        reset();
        props.onCancel();
    }
    function validate() {
        if (name === "") {
            setError("Student name cannot be blank");
            return;
        }

        setError("");
        props.onSave(name, interviewer);
    }
    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form onSubmit={event => event.preventDefault()} autoComplete="off">
                    <section className="appointment__validation">{error}</section>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        value={name}
                        onChange={event => {
                            setName(event.target.value);
                        }}
                        data-testid="student-name-input"
                    />


                </form>
                <InterviewerList
                    interviewers={props.interviewers}
                    value={interviewer}
                    onChange={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={(event) => cancel()}>Cancel</Button>
                    <Button confirm onSubmit={event => event.preventDefault()} onClick={event => validate()}>Save</Button>
                </section>
            </section>
        </main>
    )
}