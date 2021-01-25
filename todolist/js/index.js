import { Task } from "../models/task.js";
import { TaskService } from "../services/TaskService.js";

// khai báo đối tượng service
const taskSV = new TaskService();

const getAllTask = async () => {
  // dùng service để gọi api từ backend để lấy dữ liệu về
  try {
    const result = await taskSV.getAllTask();
    console.log("result", result.data);

    let taskToDo = result.data.filter((task) => task.status === false);
    console.log(taskToDo);
    renderTaskTodo(taskToDo);

    let taskCompleted = result.data.filter((task) => task.status === true);
    console.log(taskCompleted);
    renderTaskCompleted(taskCompleted);
  } catch (err) {
    //lỗi trong hàm try sẽ trả về biến err của catch
  }
};

const renderTaskTodo = (taskToDo) => {
  const listToDo = taskToDo.reduce((content, item, index) => {
    return (content += `        
    <li style="display:flex">
    <span style="cursor:pointer">${item.taskName}</span>
    <div>
       <span style="cursor:pointer" onclick="delTask('${item.taskName}')"><i class="fa fa-trash"></i></span>
       <span style="cursor:pointer" onclick="doneTask('${item.taskName}')"><i class="fa fa-check"></i></span>
    </div>
    </li>         
        `);
  }, "");
  document.getElementById("todo").innerHTML = listToDo;
};

const renderTaskCompleted = (taskCompleted) => {
  const listCompleted = taskCompleted.reduce((content, item, index) => {
    return (content += `        
    <li style="display:flex">
    <span style="cursor:pointer">${item.taskName}</span>
    <div>
       <span style="cursor:pointer" onclick="delTask('${item.taskName}')"><i class="fa fa-trash"></i></span>
       <span style="cursor:pointer" onclick="undoTask('${item.taskName}')"><i class="fa fa-redo"></i></span>
    </div>
    </li>        
        `);
  }, "");
  document.getElementById("completed").innerHTML = listCompleted;
};

getAllTask();

/**
 * ============== nghiệp vụ thêm task ================
 */

// B1: định nghĩa sự kiện click cho button #addItem
document.getElementById("addItem").onclick = async (event) => {
  // event.preventDefault();  => chặn sự kiện hiện tại của thẻ submit hay thẻ href thẻ a
  // event.target  => đại diện cho thẻ button đang được onclick

  // lấy thông tin người dùng nhập từ giao diện
  let contentTask = document.getElementById("newTask").value;

  // tạo ra object backend yêu cầu
  const taskModel = new Task();
  taskModel.taskName = contentTask;

  // gọi api đưa dữ liệu về server
  try {
    let result = await taskSV.addTask(taskModel);
    console.log("kết quả thêm task", result.data);

    // sau khi thêm thành công gọi api getAllTask từ hàm đã viết sẵn
    getAllTask();
  } catch (err) {
    console.log(err);
  }
};

/**
 * ============== nghiệp vụ xóa dữ liệu ================
 */

// định nghĩa sự kiện cho nút xóa

window.delTask = async (taskName) => {
  let cfm = confirm("Bạn có muốn xóa task này?");
  if (cfm) {
    // gọi api mỗi lần người dùng bấm nút xóa dữ liệu
    try {
      let result = await taskSV.deleteTask(taskName);
      console.log(result.data);
      // gọi lại hàm get task sau khi xóa
      getAllTask();
    } catch (err) {
      console.log(err);
    }
  }
};

/**
 * ============== nghiệp vụ done task ================
 */

window.doneTask = async (taskName) => {
  let cfm = confirm("Bạn đã làm xong task này?");
  if (cfm) {
    try {
      let result = await taskSV.doneTask(taskName);
      console.log(result.data);
      getAllTask();
    } catch (err) {
      console.log(err);
    }
  }
};


/**
 * ============== nghiệp vụ undo task ================
 */

window.undoTask = async (taskName) => {
  let cfm = confirm("Bạn muốn undo task này?");
  if (cfm) {
    try {
      let result = await taskSV.undoTask(taskName);
      console.log(result.data);
      getAllTask();
    } catch (err) {
      console.log(err);
    }
  }
};