import {Autocomplete} from "@mui/material";
import DMTTextInput from "./text-input";
import {useEffect} from "react";
import {useDispatch, useSelector} from "../../../store";
import {fetchBankBranches} from "../../../slices/utils";

const getValue = (options, value) => {
    return options?.find(opt => opt.branchName === value) ?? null;
}

const DMTBankBranches = props => {
    const { onChange, label, value, required=false, error, helperText, onBlur } = props;
    const dispatch = useDispatch();
    const { branches } = useSelector(({utils}) => utils)
    const handleOnChange = (event, value) => {
        if (value){
            onChange(value.branchName);
        }else{
            onChange('');
        }
    }


    useEffect( () => {
        dispatch(fetchBankBranches())
    },[])

    return (
        <>
            <Autocomplete
                options={branches}
                autoHighlight
                onChange={handleOnChange}
                value={getValue(branches, value)}
                getOptionLabel={(option) => option?.branchName}
                renderInput={(params) => (
                    <DMTTextInput
                        {...params}
                        label={label}
                        required={required}
                        error={error}
                        onBlur={onBlur}
                        helperText={helperText}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill

                        }}
                    />
                )}
            />
        </>
    )
}

export default DMTBankBranches;