import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const loadTask = async () => {
    const res = await fetch("http://localhost:4000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <>
      <h3>TASK LIST</h3>
      {tasks.map((task) => (
        <Card
          key={task.id}
          style={{ marginBottom: "0.7rem", backgroundColor: "#1e272e" }}
        >
          <CardContent
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Typography color="white">{task.title}</Typography>
              <Typography color="GrayText">{task.description}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`tasks/${task.id}/edit`)}
              >
                EDIT
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(task.id)}
                style={{ marginLeft: ".5rem" }}
              >
                DELETE
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
