import React, { Component } from "react";
import Portal from "./Portal";

export default class Modal extends Component {
  render() {
    const { children, toggle, active } = this.props;
    return (
      <Portal>
        {active && (
          <div style={styles.back}>
            <div style={styles.wrapper} onClick={toggle}>
              <div style={styles.window}>
                <button style={styles.closeBtn} onClick={toggle}>
                  X
                </button>
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
    background: "rgba(0, 0, 0, 0.7) ",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  wrapper: {
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  window: {
    position: "relative",
    background: "#fff",
    borderRadius: 5,
    padding: 15,
    boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
    zIndex: 10,
    width: 500,
    height: 600,
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
};
