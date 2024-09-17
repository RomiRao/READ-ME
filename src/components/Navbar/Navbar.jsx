import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import useBooks from "../../hooks/useBooks";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { items, addItems, delItems } = useContext(CartContext);
  const { filterBooks, books } = useBooks();
  const [isCartHovered, setIsCartHovered] = useState(false);

  // Update suggestions based on input
  useEffect(() => {
    if (input.trim() !== "") {
      filterBooks("name", input);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  // Update suggestions based on filtered books
  useEffect(() => {
    if (input.trim() !== "") {
      setSuggestions(books.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [books, input]);

  const handleInputChange = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleClickAway = useCallback(() => {
    setSuggestions([]);
    setIsFocused(false);
  }, []);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleAddItem = (e, book) => {
    e.stopPropagation();
    addItems(e, book);
  };

  const handleDeleteItem = (e, id, removeAll = false) => {
    e.stopPropagation();
    delItems(e, id, removeAll);
  };

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
        >
          <Badge badgeContent={items.length || null} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ backgroundColor: "#3F6059" }}>
          <AutoStoriesRoundedIcon sx={{ marginRight: 2 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            READ ME
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <ClickAwayListener onClickAway={handleClickAway}>
            <Search
              sx={{
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "#EBEBEB",
                },
                color: "#444444",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#3F6059" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={input}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                sx={{ height: "100%" }}
              />
              {isFocused && input.trim() !== "" && suggestions.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  <List>
                    {suggestions.map((book) => (
                      <ListItem
                        key={book.id}
                        onClick={() => navigate(`/detail/${book.id}`)}
                      >
                        <ListItemAvatar>
                          <Avatar alt="book cover" src={`${book.cover}`} />
                        </ListItemAvatar>
                        <ListItemText>{book.name}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Search>
          </ClickAwayListener>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{ position: "relative" }}
              onMouseEnter={() => setIsCartHovered(true)}
              onMouseLeave={() => setIsCartHovered(false)}
            >
              <IconButton
                size="large"
                aria-label="show notifications"
                disableRipple
                onClick={() => navigate(`/cart`)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 1,
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: "#EBEBEB",
                  },
                }}
              >
                <Badge badgeContent={items.length || null} color="error">
                  <ShoppingCartIcon sx={{ color: "#3F6059" }} />
                </Badge>
              </IconButton>

              {isCartHovered && items.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    width: "300px",
                    zIndex: 1,
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  <List>
                    {items.map((item) => (
                      <ListItem key={item.id}>
                        <ListItemAvatar>
                          <Avatar alt="book cover" src={`${item.cover}`} />
                        </ListItemAvatar>
                        <ListItemText>{item.name}</ListItemText>
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={(e) => handleDeleteItem(e, item.id)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={(e) => handleAddItem(e, item)}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={(e) => handleDeleteItem(e, item.id, true)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default Navbar;
