import React, { Component } from "react";
import Portal from "./Portal";
import { MdClose } from "react-icons/md";

export default class Modal extends Component {
  render() {
    const { children, toggle, active } = this.props;
    return (
      <Portal>
        {active && (
          <div style={styles.back}>
            <div style={styles.wrapper} onClick={toggle}>
              <div style={styles.window}>
                <MdClose
                  size={24}
                  fill="#EA5656"
                  style={styles.closeBtn}
                  onClick={toggle}
                />
                <div>{children}</div>
              </div>
            </div>
          </div>
        )}
      </Portal>
    );
  }
}

const styles = {
  back: {
    // background: "rgba(0, 0, 0, 0.7) ",
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  },
  window: {
    position: "relative",
    background: "#fff",
    borderRadius: 15,
    padding: 30,
    boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
    minnWidth: 450,
    minHeight: 300,
    paddingTop: 40,
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    cursor: "pointer",
  },
};
