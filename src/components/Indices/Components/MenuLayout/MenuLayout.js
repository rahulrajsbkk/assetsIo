import React from "react";

function MenuLayout({ children, className }) {
  return (
    <div className={"menu-layout d-flex flex-column " + className}>
      {children}
    </div>
  );
}

export default MenuLayout;
