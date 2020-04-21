import React, { useState } from "react";

const Form = () => {
  return (
    <div className="App">
      {/*<div className="feedback-container">
        <p>Thank you for your feedback! ❤️ </p>
        <button type="button" className="submit-button">
          Submit Feedback Again
        </button>
  </div>*/}
      <form>
        <legend> Rate your experience</legend>
        <fieldset>
          <button type="button" className="emoji-button">
            <span role="img">😞</span> <span>Bad</span>
          </button>
          <button type="button" className="emoji-button">
            <span role="img">🙂</span> <span>Okay</span>
          </button>
          <button type="button" className="emoji-button">
            <span role="img">😀</span> <span>Awesome</span>
          </button>
        </fieldset>
        <label htmlFor="comments">Please add your comment here</label>
        <textarea placeholder="Tell us if you love us"></textarea>
        <button type="submit" className="submit-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Form;
