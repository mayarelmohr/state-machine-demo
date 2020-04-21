import React from "react";
import { useMachine } from "@xstate/react";
import { Machine, assign } from "xstate";

/**
 * 1. Finite set of states (e.g.,  `red`, `green`, `yellow` )
2. Finite set of actions (e.g., `TIMER`)
3. An initial state (e.g., `green`)
4. A transition function (e.g., `transition('green', 'TIMER') == 'yellow'`)
 */

const rateOrder = assign({
  rating: (_ctx, event) => event.value,
});

const feedbackMachine = Machine({
  id: "feedback",
  initial: "opened",
  context: {
    rating: 0,
  },
  states: {
    opened: {
      on: {
        SUBMIT: "loading",
        RATE: {
          actions: rateOrder,
        },
      },
    },
    loading: {
      invoke: {
        id: "fetchData",
        src: (context, event) =>
          new Promise((resolve, reject) => setTimeout(reject, 1000)),
        onDone: {
          target: "closed",
        },
        onError: {
          target: "opened",
        },
      },
    },
    closed: {
      on: {
        SUBMIT_FEEDBACK: "opened",
      },
    },
  },
});

const Form = () => {
  const [current, send] = useMachine(feedbackMachine);
  console.log(current);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    send("SUBMIT");
    // setTimeout(() => {
    //   console.log("submitted");
    //   send("SUCCEED");
    // }, 2000);
  };
  const handleRate = (val) => {
    send({
      type: "RATE",
      value: val,
    });
  };
  if (current.matches("closed")) {
    return (
      <div className="feedback-container">
        <p>Current State: {current.value}</p>
        <p>Thank you for your feedback! ❤️ </p>
        <button
          type="button"
          onClick={() => {
            send("SUBMIT_FEEDBACK");
          }}
          className="submit-button"
        >
          Submit Feedback Again
        </button>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Current State: {current.value}</p>
      <legend> Rate your experience</legend>
      <fieldset>
        <button
          type="button"
          onClick={() => {
            handleRate(1);
          }}
          className={`emoji-button ${
            current.context.rating === 1 ? "selected" : ""
          }`}
        >
          <span role="img">😞</span> <span>Bad</span>
        </button>
        <button
          type="button"
          onClick={() => {
            handleRate(2);
          }}
          className={`emoji-button ${
            current.context.rating === 2 ? "selected" : ""
          }`}
        >
          <span role="img">🙂</span> <span>Okay</span>
        </button>
        <button
          type="button"
          onClick={() => {
            handleRate(3);
          }}
          data-state={current.context.rating === 3 ? "selected" : ""}
          className="emoji-button"
        >
          <span role="img">😀</span> <span>Awesome</span>
        </button>
      </fieldset>
      <label htmlFor="comments">Please add your comment here</label>
      <textarea placeholder="Tell us that you love us"></textarea>
      <button
        type="submit"
        className="submit-button"
        data-state={current.value}
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default Form;
