import AddNewTodoForm from "./AddNewTodoForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { filterData } from "../lib/redux-toolkit/slices/todo-slice";
import Modal from "./modal";

export default function Header() {
  const dispatch = useDispatch();
  function handleFilter(value) {
    dispatch(filterData(`?priority=${value}`));
  }

  return (
    <header className="py-5 shadow-md fixed left-0 right-0 bg-white">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <h1 className="font-medium text-3xl">Todo app</h1>
        <div className="flex items-center gap-5">
          <strong>Daraja bo'yicha filterlash:</strong>
          <Select onValueChange={handleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Daraja bo'yicha filterlash" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medium">O'rta</SelectItem>
              <SelectItem value="high">Yuqori</SelectItem>
              <SelectItem value="low">Quyi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Modal></Modal>
      </div>
    </header>
  );
}
