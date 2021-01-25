export class TaskService {
  constructor() {}

  // Định nghĩa phương thức getAllTask
  getAllTask = () => {
    const promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    return promise;
  };

  // định nghĩa hàm đưa dữ liệu về backend
  addTask = (task) => {
    // <= cần đúng định dạng backend quy định
    const promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: task, // {taskName:'abc'}
    });
    return promise;
  };

  // định nghĩa hàm xóa dữ liệu
  deleteTask = (taskName) => {
    const promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    return promise;
  };

  // định nghĩa hàm done dữ liệu
  doneTask = (taskName) => {
    const promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    return promise;
  };

  // định nghĩa hàm undo dữ liệu
  undoTask = (taskName) => {
    const promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    return promise;
  };


}
