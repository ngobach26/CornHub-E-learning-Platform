import React from "react";
import { Link } from "react-router-dom";
import Brand from "../../assets/image/Brand";

export default function Logo(props) {
  const { variant } = props;

  const variants = {
    main: {
      width: 180,
      height: 70,
    },
    header: {
      width: 150,
      height: 50,
    },
    "header-md": {
      width: 145,
      height: 35,
    },
    footer: {
      width: 180,
      height: 50,
    },
  };

  const { width, height } = variants[variant];
  const BrandSVG = Brand.logoName;

  return (
    <div >
      <Link to="/">
        <svg {...BrandSVG.props} width={width} height={height}>
          {BrandSVG.props.children}
        </svg>
      </Link>
    </div>
  );
}
