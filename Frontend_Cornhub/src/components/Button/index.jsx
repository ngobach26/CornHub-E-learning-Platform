import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import classnames from "classnames";
import PropTypes from "prop-types";

const StyledButton = styled(LoadingButton)(() => ({
  borderRadius: 6,
}));

export default function Button(props) {
  const { label, ...otherProps } = props;

  return (
    <StyledButton
      {...otherProps}
      disableElevation
      className={classnames(
        "normal-case",
        {
          "bg-primary": props.variant === "contained",
          "rounded-none bg-inherit hover:bg-inherit text-primary":
            props.variant === "transparent",
        },
        props.className
      )}
    >
      {(label && label) || props.children}
    </StyledButton>
  );
}

Button.defaultProps = {
  variant: "contained",
};

Button.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(["contained", "outlined", "transparent"]),
};
