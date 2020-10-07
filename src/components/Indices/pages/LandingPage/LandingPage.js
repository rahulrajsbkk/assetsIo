import React, { useContext } from "react";
import logo from "../../Static/image/gx-options.svg";
import { Link, Redirect } from "react-router-dom";
import { OptionsContext } from "../../ContextAPI/OptionContext";
import Zoom from "react-reveal/Zoom";

function LandingPage() {
  const { email } = useContext(OptionsContext);
  return (
    <>
      {email && email !== "Loading" ? <Redirect to="/"></Redirect> : ""}
      <div className="black-full-page text-white d-flex flex-column justify-content-around py-5">
        <Zoom>
          <img src={logo} alt="" className="token-logo mx-auto" />
          <div className="d-flex flex-column">
            <h1 className="token-title">TOKEN</h1>
            <h2 className="token-sub-title">Options</h2>
          </div>
          <div className="container px-3 d-flex">
            <div className="btn btn-outline-light col mx-2">CREATE</div>
            <Link to="/login" className="btn btn-outline-light col mx-2">
              ENTER
            </Link>
            <div className="btn btn-outline-light col mx-2">MOBILE</div>
          </div>
        </Zoom>
      </div>
    </>
  );
}

export default LandingPage;
