import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
    const formatSpots = spots => {
        if (spots === 0) {
            return 'no spots remaining';
        } else if (spots === 1) {
            return `${spots} spot remaining`;
        } else {
            return `${spots} spots remaining`;
        }
    };
    const dayClass = classNames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": !props.spots
    });

    return (
        <li onClick={() => props.setDay(props.name)}>
            <h2 className={dayClass}>{props.name}
                <h6 className="text--light">{formatSpots(props.spots)}</h6>
            </h2>

        </li>
    );
}