import { enqueueSnackbar } from "notistack";


export const caseHandler = (message, type) =>{
    enqueueSnackbar(message, {variant: type})
}
