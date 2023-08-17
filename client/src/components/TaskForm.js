import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (editing) {
      await fetch(`http://localhost:4000/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      await fetch("http://localhost:4000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
    }

    setLoading(false);
    navigate("/");
  };

  const handleChange = (event) =>
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`);
    const data = await res.json();
    setTask({ title: data.title, description: data.description });
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Card
          sx={{ backgroundColor: "#1e272e", color: "white" }}
          style={{ padding: "1rem" }}
        >
          <CardContent>
            <Typography variant="h6" textAlign="center" gutterBottom>
              {editing ? "EDIT TASK" : "CREATE TASK"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Write your title"
                fullWidth
                margin="normal"
                name="title"
                value={task.title}
                onChange={handleChange}
                InputProps={{ style: { color: "#1e272e" } }}
                InputLabelProps={{
                  style: {
                    color: "#1e272e",
                    fontSize: "15px",
                  },
                }}
                style={{ backgroundColor: "#f0e792" }}
              />
              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={5}
                fullWidth
                margin="normal"
                name="description"
                value={task.description}
                onChange={handleChange}
                InputProps={{ style: { color: "#1e272e" } }}
                InputLabelProps={{
                  style: {
                    color: "#1e272e",
                    fontSize: "15px",
                  },
                }}
                style={{ backgroundColor: "#f0e792" }}
              />
              <Button
                sx={{ backgroundColor: "#f0e792", color: "#1e272e", mt: 2 }}
                variant="contained"
                type="submit"
                disabled={!task.title || !task.description || loading}
              >
                {loading ? (
                  <CircularProgress color="warning" size={24} />
                ) : (
                  "SAVE"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
