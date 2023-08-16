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
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "#f0e792" }}>
                PERN STACK
              </Link>
            </Typography>

            <Button
              variant="contained"
              color="secondary"
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
