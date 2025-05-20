import { useEffect } from "react";
import Loading from "./Loading";
import Todo from "./Todo";
import { getTodos } from "../request";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, setData } from "../lib/redux-toolkit/slices/todo-slice";
import { toast } from "sonner";

export default function Todos() {
  const { data, loading, filter } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoading(true));
    getTodos(filter)
      .then(
        (res) => {
          dispatch(setData(res));
        },
        ({ message }) => {
          toast.error(message);
        }
      )
      .finally(() => {
        dispatch(isLoading(false));
      });
  }, [filter]);

  if (loading) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <Loading />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <p>No data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 container mx-auto px-5 pb-10 pt-[116px]">
      {data.map(({ completed, title, id, priority }) => {
        return (
          <Todo
            completed={completed}
            key={id}
            title={title}
            priority={priority}
            id={id}
          />
        );
      })}
    </div>
  );
}
