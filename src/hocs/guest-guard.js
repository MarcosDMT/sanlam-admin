import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {useAuth} from "../hooks/use-auth";
import {SplashScreen} from "../components/splash-screen";

export const GuestGuard = (props) => {
    const { children } = props;
    const auth = useAuth();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(
        () => {
            if (!router.isReady) {
                return(  <SplashScreen/> );
            }

            if (auth.isAuthenticated) {
                router.push("/dashboard").catch(console.error);
            } else {
                setChecked(true);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.isReady]
    );

    if (!checked) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // not authenticated / authorized.

    return <>{children}</>;
};

GuestGuard.propTypes = {
    children: PropTypes.node,
};
