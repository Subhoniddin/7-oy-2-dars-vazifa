import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { buttonVariants } from "./ui/button";
import AddNewTodoForm from "./AddNewTodoForm";
import { useDispatch, useSelector } from "react-redux";
import { isOpenModal } from "../lib/redux-toolkit/slices/todo-slice";

function Modal() {
  const dispatch = useDispatch();

  function handlemodal() {
    dispatch(isOpenModal(false));
  }

  const { openModal } = useSelector((state) => state.todo);
  return (
    <Dialog open={openModal} onOpenChange={handlemodal}>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        <PlusCircle />
        New
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yangi todo qo'shish</DialogTitle>
          <DialogDescription>
            Siz bu yerda yangi todo qo'shishingiz mumkin
          </DialogDescription>
        </DialogHeader>
        <AddNewTodoForm />
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
