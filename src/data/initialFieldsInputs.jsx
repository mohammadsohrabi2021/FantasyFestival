import {
    AccountCircle,
    Phone,
    Instagram,
    Lock,
    Refresh,
  } from "@mui/icons-material";
  const initialFields = [
    {
      id: 1,
      placeholder: "نام و نام خانوادگی",
      name: "fullname",
      icon: <AccountCircle sx={{ color: "#ddd" }} />,
    },
    {
      id: 2,
      placeholder: "شماره همراه",
      name: "phone_number",
      icon: <Phone sx={{ color: "#ddd" }} />,
    },
    {
      id: 3,
      placeholder: "آی دی اینستاگرام",
      name: "instagram_id",
      icon: <Instagram sx={{ color: "#ddd" }} />,
    },
    // {id:4,placeholder:"کد روبه رو",name:"captcha_code",value:'captcha_code',icon:<Lock sx={{ color: "#ddd" }} />},
  ];
  export default initialFields;