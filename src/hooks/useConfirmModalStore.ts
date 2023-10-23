import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import {
  onOpenConfirm,
  onCloseConfirm,
  onConfirm
} from "../store/slices";

export const useConfirmModalStore = () => {

  const {
    isConfirmOpen,
    isConfirm,
    actionConfirm,
    message,
    textConfirm,
    textCancel
  } = useSelector((state: RootState) => state.confirmModal)

  const dispatch = useDispatch();

  // Confirm modal - Open
  const openConfirm = (payload: any) => {
    dispatch(onOpenConfirm(payload));
  }

  // Confirm modal - Open
  const closeConfirm = () => {
    dispatch(onCloseConfirm());
  }

  // Action confirm
  const confirm = () => {
    dispatch(onConfirm());
  }

  return {

    // Properties
    isConfirmOpen,
    isConfirm,
    actionConfirm,
    message,
    textConfirm,
    textCancel,

    // Methods
    openConfirm,
    closeConfirm,
    confirm

  }

}

