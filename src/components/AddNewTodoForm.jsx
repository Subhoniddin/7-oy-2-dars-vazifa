import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { validation } from "../lib/utils";
import { toast } from "sonner";
import { addTodo } from "../request";
import { useDispatch, useSelector } from "react-redux";
import { addData, isOpenModal } from "../lib/redux-toolkit/slices/todo-slice";
import { useState } from "react";

export default function AddNewTodoForm() {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setDisable(true);
    const formData = new FormData(e.target);
    const sendData = {};
    formData.forEach((value, key) => {
      if (key === "completed") {
        sendData[key] = value === "completed";
      } else {
        sendData[key] = value;
      }
    });

    const result = validation(sendData);

    if (result) {
      const { target, message } = result;
      e.target[target]?.focus();
      toast.info(message);
      setDisable(false);
    } else {
      addTodo(sendData)
        .then((res) => {
          dispatch(addData(res));
          dispatch(isOpenModal(false));
          toast.success("Ma'lumot muvaffaqiyatli qo'shildi ⚡️");
        })
        .catch(({ message }) => {
          toast.error(message);
        })
        .finally(() => {});
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Sarlavha*</Label>
        <Input
          name="title"
          type="text"
          id="title"
          placeholder="Sarlavhani kiriting"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Holati*</Label>
        <RadioGroup name="completed" defaultValue="uncompleted">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="completed" id="completed" />
            <Label htmlFor="completed">Bajarilgan ✅</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="uncompleted" id="uncompleted" />
            <Label htmlFor="uncompleted">Bajarilmagan ❌</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Muhimlilik darajasi*</Label>
        <Select defaultValue="low" name="priority">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Daraja" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">Yuqori</SelectItem>
            <SelectItem value="medium">O'rta</SelectItem>
            <SelectItem value="low">Quyi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button disabled={disable}>Tasdiqlash</Button>
    </form>
  );
}
