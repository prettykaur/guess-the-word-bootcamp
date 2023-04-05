import React from "react";

class Navbar extends React.Component {
  render() {
    const { rounds, wins } = this.props;

    return (
      <div className="navbar-ctn">
        <p>
          Wins: {wins} / {rounds} rounds
        </p>
        <p>Round {rounds}</p>
      </div>
    );
  }
}

export default Navbar;
