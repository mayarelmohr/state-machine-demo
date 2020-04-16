import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 0,
      comment: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    debugger;
    const { rating, comment } = this.state;
    // do something with values
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        console.log("1 seconds Timer expired!!!");
        resolve();
      }, 1000);
    });
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
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
            onChange={e => {
              this.setState({ comment: e.target.value });
            }}
          ></textarea>
          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
