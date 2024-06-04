import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import '../styles/ContactUs.scss';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Lock, Refresh } from "@mui/icons-material";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import SendIcon from "@mui/icons-material/Send";
import initialFields from "../data/initialFieldsInputs";
import DialogMessage from "./DialogMessage";
// import BannerPage from "./BannerPage";

// Function to convert Persian numbers to English numbers
const convertPersianToEnglish = (str) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";
  return str.replace(
    /[۰-۹]/g,
    (char) => englishDigits[persianDigits.indexOf(char)]
  );
};

// Function to generate random captcha code
const fetchCaptcha = async () => {
  const response = await axios.get(`${BASE_URL}/gen/captcha`);
  return response.data;
};

const validationSchema = yup.object({
  fullname: yup
    .string("نام و نام خانوادگی خود را وارد کنید")
    .required("وارد کردن نام و نام خانوادگی الزامی است"),
  phone_number: yup
    .string("شماره همراه خود را وارد کنید")
    .transform((value) => convertPersianToEnglish(value)) // Convert Persian digits to English
    .matches(/^[0-9]{11}$/, "شماره همراه باید ۱۱ رقم باشد")
    .required("وارد کردن شماره همراه الزامی است"),
  instagram_id: yup
    .string("آی دی اینستاگرام خود را وارد کنید")
    .required("وارد کردن آی دی اینستاگرام الزامی است"),
  captcha_code: yup
    .string("کد روبه رو را وارد کنید")
    .required("وارد کردن کد روبه رو الزامی است"),
});


const ContactUs = ({ setIsSubmitted, setlLotteryId }) => {

 const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [errorMeasage, setErrorMeasage] = useState(null);


  const fetchCaptchaData = async () => {
    const captchaData = await fetchCaptcha();
    setCaptcha(captchaData);
  };

  useEffect(() => {
    // Generate a new captcha when the component is mounted
    fetchCaptchaData();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone_number: "",
      instagram_id: "",
      captcha_code: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      console.log({ ...values, captcha_id: captcha?.captcha_id });
      axios
        .post(`${BASE_URL}/form/submit`, {
          ...values,
          captcha_id: captcha?.captcha_id,
        }) // Include captcha_id in the submission if needed
        .then((response) => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setlLotteryId(response);
          resetForm();
          fetchCaptchaData(); // Fetch new captcha after successful submission
        })
        .catch((error) => {
          setIsSubmitting(false);
          setSubmitError(true);
          setErrorMeasage(error?.response?.data?.detail)
          console.error("There was an error!", error);
        });
    },
  });

  const textFieldStyles = {
    // marginBottom: "15px",
    backgroundColor: "#f7f7f7",
    borderRadius: "5px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ddd",
      },
      "&:hover fieldset": {
        borderColor: "#ccc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#aaa",
      },
      "& input": {
        padding: "15px", // Adjust padding to decrease height
        fontFamily: "vazir",
      },
    },
  };

  const helperTextStyles = {
    textAlign: "right",
    marginRight: "10px",
    fontFamily: "vazir",
  };
console.log(formik.touched,'formik.touched')
  return (
    <div className="contact-us">
      {/* <BannerPage /> */}
      <form onSubmit={formik.handleSubmit} style={{ padding: "0px 20px" }}>
        {initialFields.map((item) => (
          <TextField
            key={item?.id}
            placeholder={item?.placeholder}
            variant="outlined"
            fullWidth
            margin="normal"
            name={item?.name}
            value={formik.values.item?.name}
            onChange={formik.handleChange}
            error={
              formik.touched[item?.name] && Boolean(formik.errors[item?.name])
            }
            helperText={formik.touched[item?.name] && formik.errors[item?.name]}
            FormHelperTextProps={{ style: helperTextStyles }}
            sx={textFieldStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{item?.icon}</InputAdornment>
              ),
            }}
          />
        ))}

        <Box display="flex" alignItems="center">
          <TextField
            placeholder="کد روبه رو"
            variant="outlined"
            fullWidth
            margin="normal"
            name="captcha_code"
            value={formik.values.captcha_code}
            onChange={formik.handleChange}
            error={
              formik.touched.captcha_code && Boolean(formik.errors.captcha_code)
            }
            helperText={
              formik.touched.captcha_code && formik.errors.captcha_code
            }
            FormHelperTextProps={{ style: helperTextStyles }}
            sx={textFieldStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#ddd" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={fetchCaptchaData}>
                    <Refresh sx={{ color: "#ddd" }} />
                  </IconButton>
                  {captcha && (
                    <img src={`${BASE_URL}/${captcha?.link}`} alt="captcha" />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={4}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#a31299",
              gap: "10px",
              fontFamily: " vazir",
            }}
            fullWidth
          >
            ارسال
            <SendIcon sx={{ fontSize: "16px" }} />
          </Button>
        </Box>
      </form>
      <DialogMessage
        submitError={submitError}
        isSubmitting={isSubmitting}
        setSubmitError={setSubmitError}
        errorMeasage={errorMeasage}
      />
     </div>
 
  
  );
};

export default ContactUs;
