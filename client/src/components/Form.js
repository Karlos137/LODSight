import React, { Component } from "react";

class Form extends Component {
  state = {
    email: "",
    textArea: "",
    msg: null,
    details: (
      <p className="details">
        Do pole "Váš e-mail" vložte e-mailovou adresu, na kterou si přejete
        zaslat upozornění po dokončení zpracování dat.
        <br />
        Do pole "Endpoint URL/Endpoint URL Dataset URI" zadejte na jednotlivé
        řádky buď URL endpointu nebo dvojici endpoint URL a dataset URI oddělené
        mezerou.
      </p>
    )
  };

  handleSubmit = e => {
    this.setState({ msg: <p>Data byla odeslána ke zpracování.</p> });

    const submitButton = document.querySelector("#submitBtn");
    submitButton.setAttribute("disabled", "");
    setTimeout(() => {
      submitButton.removeAttribute("disabled");
    }, 3000);
  };

  handleResetButton = e => {
    e.preventDefault();
    this.setState({ email: "", textArea: "", msg: null });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div className="row">
        <form
          action="/"
          method="POST"
          className="col s12"
          onSubmit={this.handleSubmit}
        >
          <div className="row">
            <div className="input-field col m6 offset-m3 s8 offset-s2">
              <input
                id="email"
                type="email"
                name="email"
                className="validate"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="email">Váš E-mail</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                name="textArea"
                id="textArea"
                className="materialize-textarea"
                value={this.state.textArea}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="textArea">
                Endpoint URL/Endpoint URL Dataset URI
              </label>
            </div>
          </div>
          <div className="row right-align">
            <button
              className="btn-small waves-effect waves-light reset-btn"
              onClick={this.handleResetButton}
            >
              Reset
            </button>
          </div>
          <div className="row center-align">
            <button
              id="submitBtn"
              className="btn waves-effect waves-light"
              type="submit"
            >
              Odeslat
              <i className="material-icons right">send</i>
            </button>
            <div className="row center-align">{this.state.msg}</div>
          </div>
          <div className="row center-align">{this.state.details}</div>
        </form>
      </div>
    );
  }
}

export default Form;
