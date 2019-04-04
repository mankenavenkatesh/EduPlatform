import React from "react";
import "./Well2.css";

const Well2 = props => {
  const { bucketIndex, index, stage, status, stage_color } = props;

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
      <p> </p>
    </div>
  );
};

export default Well2;
