import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#5e5e5e" }}>
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "#f0e792" }}>
                <h1>HOME</h1>
              </Link>
            </Typography>

            <Button
              variant="contained"
              style={{ backgroundColor: "#f0e792", color: "#2d3436" }}
              onClick={() => navigate("/tasks/new")}
            >
              NEW TASK
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
