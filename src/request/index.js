const baseURL = import.meta.env.VITE_BASE_URL;

export async function getTodos(query = "") {
  const req = await fetch(baseURL + "/todos" + query);

  if (req.status === 200) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("Abdulloh xato qildi");
  }
}

export async function addTodo(todo) {
  const req = await fetch(baseURL + "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Abdulloh xato qildi");
  }
}

export async function deleteTodo(id) {
  const req = await fetch(baseURL + "/todos/" + id, {
    method: "DELETE",
  });
  if (req.status === 200) {
    return id;
  } else {
    throw new Error("Abdulloh xato qildi");
  }
}
