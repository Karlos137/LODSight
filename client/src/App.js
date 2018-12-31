import React, { Component } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <main>
          <Header />
          <Form />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
