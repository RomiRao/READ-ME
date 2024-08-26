import { useState, useEffect, useContext } from "react";
import useBooks from "../../hooks/useBooks";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

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

// ICONS
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { items, addItems, delItems } = useContext(CartContext);
  const { filterBooks, books } = useBooks();
  const [isCartHovered, setIsCartHovered] = useState(false);

  useEffect(() => {
    if (input.trim() !== "") {
      filterBooks("name", input);
    } else {
      setSuggestions([]);
    }
  }, [input, filterBooks]);

  useEffect(() => {
    if (books.length > 0) {
      setSuggestions(books.slice(0, 5));
    }
  }, [books]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleClickAway = () => {
    setSuggestions([]);
    setIsFocused(false);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
        >
          <Badge badgeContent={items.length} color="error">
            <LocalMallIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
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
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={input}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              {isFocused && suggestions.length > 0 && (
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
                        button
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
                color="inherit"
              >
                <Badge
                  badgeContent={items.length !== 0 ? items.length : null}
                  color="error"
                >
                  <LocalMallIcon />
                </Badge>
              </IconButton>
              {isCartHovered && items.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    zIndex: 1,
                    width: 300,
                    maxHeight: 300,
                    overflowY: "auto",
                    padding: 2,
                  }}
                  onMouseEnter={() => setIsCartHovered(true)}
                  onMouseLeave={() => setIsCartHovered(false)}
                >
                  <List>
                    {items.map((item) => (
                      <ListItem key={item.id}>
                        <ListItemAvatar>
                          <Avatar src={item.cover} alt={item.name} />
                        </ListItemAvatar>
                        <Box>
                          <ListItemText primary={item.name} />
                          <Box
                            display="flex"
                            alignItems="center"
                            borderRadius={5}
                            sx={{
                              bgcolor: "#5399DE",
                              color: "white",
                              height: "30px",
                              maxWidth: "90px",
                            }}
                          >
                            <IconButton
                              onClick={(e) => handleDeleteItem(e, item.id)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>{`${item.quantity}`}</Typography>
                            <IconButton onClick={(e) => handleAddItem(e, item)}>
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        <IconButton
                          size="large"
                          edge="end"
                          color="inherit"
                          sx={{ alignSelf: "end" }}
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
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
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
      {renderMenu}
    </Box>
  );
}

export default Navbar;
