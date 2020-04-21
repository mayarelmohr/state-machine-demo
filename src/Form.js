import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import { Machine, assign } from "xstate";

/**
 * States:
 * Opened:
 *  Submit
 *  Rating
 * loading
 *  Success
 *  failure
 * closed
 *  Open
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
        id: "sendData",
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
        OPEN: "opened",
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
            send("OPEN");
          }}
          className="submit-button"
        >
          Submit Feedback Again
        </button>
      </div>
    );
  }
  return (
    <div>
      <p>Current State: {current.value}</p>
      <form onSubmit={handleSubmit}>
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
            className={`emoji-button ${
              current.context.rating === 3 ? "selected" : ""
            }`}
          >
            <span role="img">😀</span> <span>Awesome</span>
          </button>
        </fieldset>
        <label htmlFor="comments">Please add your comment here</label>
        <textarea placeholder="Tell us if you love us"></textarea>
        <button
          type="submit"
          data-state={current.value}
          className="submit-button"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Form;
