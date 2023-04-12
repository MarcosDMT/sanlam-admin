import {Modal, Slide} from "@mui/material";
import PropTypes from "prop-types";
import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import MKButton from "../../@mui-components/button";
import {Check} from "@mui/icons-material";

const DMTAlertModal = props => {
    const { open, onClose, onOk, product} = props;
    const handleOnClose = e => {
        onClose();
        onOk()
    }
    return (
        <>
            <Modal open={open} onClose={handleOnClose} sx={{ display: "grid", placeItems: "center" }}>
                <Slide direction="down" in={open} timeout={500}>
                    <MKBox
                        position="relative"
                        width="500px"
                        display="flex"
                        flexDirection="column"
                        borderRadius="xl"
                        bgColor="white"
                        shadow="xl"
                    >
                        <MKBox display="flex" alignItems="center" flexDirection={'column'} justifyContent="center" p={2}>
                            <MKTypography variant="h4" color={'success'} gutterBottom>Success</MKTypography>
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={onClose} />

                            <Check fontSize={'large'} color={'success'}/>
                            <MKTypography gutterBottom align={'center'}>
                                {`You have successfully registered for ${product} Plan.`}
                            </MKTypography>
                            <MKButton onClick={() => onOk()} color={'success'}>OK</MKButton>
                        </MKBox>
                    </MKBox>
                </Slide>
            </Modal>
        </>
    )
}

const CloseIcon = () => {
    return null;
}

CloseIcon.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    onClick: PropTypes.any,
    fontSize: PropTypes.string,
    sx: PropTypes.shape({ cursor: PropTypes.string }),
};

export default DMTAlertModal;