import React, { Component } from "react";
import { connect } from "react-redux";
import LoaderGif from "../../public/assets/img/icons/loading3.gif";
import Image from "next/image";

class FullPageLoader extends Component {
  state = {};
  render() {
    const { isLoading } = this.props;
    if (!isLoading) return null;

    return (
      <div className="loader-container">
        <div className="loader">
          <Image width="200px" height="200px" alt="loader" src={LoaderGif} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(FullPageLoader);
