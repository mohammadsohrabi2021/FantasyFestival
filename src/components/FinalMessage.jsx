import React from "react";
import "../styles/ContactUs.scss";
import { Box, Typography } from "@mui/material";
function FinalMessage({ lotteryId }) {
  return (
    <div className="contact-us">
        <Box  textAlign="center">
      <Typography
        fontFamily={"vazir"}
        fontSize={"16px"}
        fontWeight={700}
        color={"#01820a"}
        lineHeight={"28px"}
        padding={"5px 20px"}
        textAlign={"center"}
      >
        ثبت نام شما انجام شد
      </Typography>
      <Typography
        fontFamily={"vazir"}
        fontSize={"16px"}
        fontWeight={"bold"}
        color={"#444"}
        lineHeight={"28px"}
        // textAlign={"justify"}
        display={"flex"}
        flexWrap={"wrap"}
        // px={{xs:'0 100px'}}
      >
        مطمئن شو که همه کسانی که من فالو کردم را فالو داشته باشی
      </Typography>
      <Typography
        mt={3}
        fontFamily={"vazir"}
        sx={{
          padding: "5px 20px",
          lineHeight: "28px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#444",
        }}
      >
        کد قرعه کشی پایین را تا زمان قرعه کشی نگه دارید
      </Typography>
      <Typography
        fontFamily={"vazir"}
        sx={{
          padding: "5px 20px",
          lineHeight: "28px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#444",
        }}
      >
        یا از این صفحه اسکرین شات بگیر
      </Typography>

      <Box
        sx={{
          padding: "7px 27px",
          backgroundColor: "#ffccfc",
          borderRadius: "5px",
          border: "2px solid #6f18a0",
          fontSize: "18px",
          fontWeight: "bold",
          marginTop: "20px",
          marginBottom: "40px",
          color: "#6f18a0",
          letterSpacing: "6px",
        }}
        width={"max-content"}
        margin={"auto"}
      >
        {lotteryId}
      </Box>
      </Box>
    </div>
  );
}

export default FinalMessage;
