import "simplebar/dist/simplebar.min.css";

import SimpleBar from "simplebar-react";
import { forwardRef } from "react";
import { styled } from "@mui/material/styles";
// eslint-disable-next-line react/display-name
const ScrollbarRoot = styled(SimpleBar)``;

export const Scrollbar = forwardRef((props, ref) => {
    return <ScrollbarRoot ref={ref} {...props} />;
});
