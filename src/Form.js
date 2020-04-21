import React, { useState } from "react";

// setRating = (rating = 0) => {
//   this.setState({ rating: rating});
// }

const Form = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isThankYouMessageVisible, setThankYouVisibility] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { rating, comment } = this.state;
    // do something with values
    setTimeout(() => {
      console.log("1 seconds Timer expired!!!");
      this.setState({ isThankYouMessageVisible: true });
    }, 2000);
  };

  return (
    <div className="App">
      <div
        className="feedback-container"
        hidden={!this.state.isThankYouMessageVisible}
      >
        <p>Thank you for your feedback! ❤️ </p>
        <button
          type="button"
          onClick={() => {
            this.setState({ isThankYouMessageVisible: false });
          }}
          className="submit-button"
        >
          Submit Feedback Again
        </button>
      </div>
      <form
        hidden={this.state.isThankYouMessageVisible}
        onSubmit={this.handleSubmit}
      >
        <legend> Rate your experience</legend>
        <fieldset>
          <button
            type="button"
            className={`emoji-button ${
              this.state.rating === 1 ? "selected" : ""
            }`}
            onClick={() => {
              this.setState({ rating: 1 });
            }}
          >
            <span role="img">😞</span> <span>Bad</span>
          </button>
          <button
            type="button"
            className={`emoji-button ${
              this.state.rating === 2 ? "selected" : ""
            }`}
            onClick={() => {
              this.setState({ rating: 2 });
            }}
          >
            <span role="img">🙂</span> <span>Okay</span>
          </button>
          <button
            type="button"
            className={`emoji-button ${
              this.state.rating === 3 ? "selected" : ""
            }`}
            onClick={() => {
              this.setState({ rating: 3 });
            }}
          >
            <span role="img">😀</span> <span>Awesome</span>
          </button>
        </fieldset>
        <label htmlFor="comments">Please add your comment here</label>
        <textarea
          value={this.state.comment}
          placeholder="Tell us that you love us"
          onChange={(e) => {
            this.setState({ comment: e.target.value });
          }}
        ></textarea>
        <button type="submit" className="submit-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Form;
