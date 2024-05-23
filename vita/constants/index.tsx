import {
    Home,
    AddPhotoAlternateOutlined,
    GroupOutlined,
    BookmarksOutlined,
    FavoriteBorder,
  } from "@mui/icons-material";
  
  export const sidebarLinks = [
    {
      icon: <Home sx={{ color: "white", fontSize: "26px" }} />,
      route: "/social",
      label: "Publicaciones",
    },
    {
      icon: <AddPhotoAlternateOutlined sx={{ color: "white", fontSize: "26px" }} />,
      route: "/social/create-post",
      label: "Crear publicación",
    },
    {
      icon: <GroupOutlined sx={{ color: "white", fontSize: "26px" }} />,
      route: "/social/people",
      label: "Personas",
    },
    {
      icon: <BookmarksOutlined sx={{ color: "white", fontSize: "26px" }} />,
      route: "/social/saved-posts",
      label: "Guardar publicaciones",
    },
    {
      icon: <FavoriteBorder sx={{ color: "white", fontSize: "26px" }} />,
      route: "/social/liked-posts",
      label: "Publicaciones con like",
    },
  ];
  
  export const pageTitles = [
    {
      url: "/social",
      title: "Publicaciones",
    },
    {
      url: "/social/edit-profile",
      title: "Editar perfil",
    },
    {
      url: "/social/create-post",
      title: "Crear publicaciones",
    },
    {
      url: "/social/edit-post",
      title: "Editar publicacion",
    },
    {
      url: "/social/search", 
      title: "Buscar",
    },
    {
      url: "/social/saved-posts",
      title: "Publicaciones guardadas",
    },
    {
      url: "/social/liked-posts",
      title: "Publicaciones con like",
    }
  ];
  
  export const tabs = [
    {
      link: "publicaciones",
      name: "Publicaciones",
    },
    {
      link: "followers",
      name: "Seguidores",
    },
    {
      link: "following",
      name: "Seguiendo",
    },
  ];