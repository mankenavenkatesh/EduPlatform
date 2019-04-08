import React from "react";
import "./styles.css";

const OneStep = props => {
    const { index, stage, status, stage_color } = props;

    return (
        <div className="stepwizard-step">
            <button
                type="button"
                className={`btn btn-${stage_color} btn-circle ${status}`}
            >
                {index}
            </button>
            <p>{stage}</p>
            <br />
        </div>
    );
};

export default OneStep;
