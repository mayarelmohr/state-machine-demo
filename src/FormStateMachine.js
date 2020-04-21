import React, { useState } from "react";
import { useMachine } from "@xstate/react";

import { Machine, assign } from "xstate";

const rateOrder = assign({
  rating: (_ctx, e) => e.value,
});

// loading: {
//     invoke: {
//       id: "fetchData",
//       src: (context, event) =>
//         new Promise((resolve, reject) => setTimeout(reject, 1000)),
//       onDone: {
//         target: "closed",
//       },
//       onError: {
//         target: "opened",
//       },
//     },
//   },
const feedbackMachine = Machine({
  id: "feedback",
  initial: "opened",
  context: {
    rating: 0,
  },
  states: {
    opened: {
      on: {
        CLOSE: "closed",
        RATE: {
          actions: rateOrder,
        },
        SUBMIT: "loading",
      },
    },
    loading: {
      on: {
        RESOLVE: "closed",
        REJECT: "opened",
      },
    },
    closed: { on: { OPEN: "opened" } },
  },
});
const Form = () => {
  /** add state machine
   * States:
   * feedback widget
   *  - open
   *  - closed
   *  ACTIONS:
   *      select rating
   *      submit
   *
   * Thank you message
   *  - open
   *  - closed
   *
   */

  const [current, send] = useMachine(feedbackMachine);
  console.log(current);
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    send("SUBMIT");
    setTimeout(() => {
      console.log("1 seconds Timer expired!!!");
      send("RESOLVE");
    }, 2000);
  };
  const handleRate = (val) => {
    send({
      type: "RATE",
      value: val,
    });
  };

  return (
    <div className="App">
      <p>Current State: {current.value}</p>
      {current.matches("closed") ? (
        <div className="feedback-container" hidden={current.matches("opened")}>
          <p>
            Thank you for your feedback!{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
          </p>
          <button
            type="button"
            onClick={() => {
              send("OPEN");
            }}
            className="submit-button"
          >
            Submit Feedback Again
          </button>
        </div>
      ) : (
        <form data-state={current.value} onSubmit={handleSubmit}>
          <legend> Rate your experience</legend>
          <fieldset>
            <button
              type="button"
              className={`emoji-button ${
                current.context.rating === 1 ? "selected" : ""
              }`}
              onClick={() => handleRate(1)}
            >
              <span role="img" aria-label="sad">
                😞
              </span>
              <span>Bad</span>
            </button>
            <button
              type="button"
              className={`emoji-button ${
                current.context.rating === 2 ? "selected" : ""
              }`}
              onClick={() => handleRate(2)}
            >
              <span role="img" aria-label="fine">
                🙂
              </span>
              <span>Okay</span>
            </button>
            <button
              type="button"
              className={`emoji-button ${
                current.context.rating === 3 ? "selected" : ""
              }`}
              onClick={() => handleRate(3)}
            >
              <span role="img" aria-label="happy">
                😀
              </span>
              <span>Awesome</span>
            </button>
          </fieldset>
          <label htmlFor="comments">Please add your comment here</label>
          <textarea
            value={comment}
            placeholder="Tell us that you love us"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <button
            type="submit"
            data-state={current.value}
            className="submit-button"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
