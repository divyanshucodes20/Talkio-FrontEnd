import { Add as AddIcon, Remove as RemoveIcon, Star as StarIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography, Tooltip } from "@mui/material";
import React, { memo } from "react";
import { transformImage } from "../../lib/features";
import { useChangeAdminMutation } from "../../redux/api/api";
import { useSearchParams,useNavigate } from "react-router-dom";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
  isAdmin = false,
}) => {
  const navigate=useNavigate();
  const { name, _id, avatar } = user;
  const chatId = useSearchParams()[0].get("group");

  const [changeAdmin, { isLoading: isChangingAdmin }] = useChangeAdminMutation();

  // Admin handler function
  const adminHandler = () => {
    changeAdmin({ chatId, userId: _id });
    navigate("/groups")
  };

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={transformImage(avatar)} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
        </Typography>

        {/* Add/Remove Button */}
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>

        {/* Admin Button */}
        {isAdmin && (
          <Tooltip title="Make Admin">
            <IconButton
              size="small"
              color="secondary"
              onClick={adminHandler}
              disabled={isChangingAdmin}
            >
              <StarIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
