import React, { Component } from "react";
import { connect } from "react-redux";
import LoaderGif from "public/assets/img/icons/loading3.gif";

class FullPageLoader extends Component {
  state = {};
  render() {
    const { isLoading } = this.props;
    if (!isLoading) return null;

    return (
      <div className="loader-container">
        <div className="loader">
          <img alt="loader" src={LoaderGif} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(FullPageLoader);
