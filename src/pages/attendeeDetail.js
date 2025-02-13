import React, { useEffect, useState } from "react";
import ProgressBar from "../components/progressBar";
import image from "../assets/download.svg";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const AttendeeDetail = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const navigate = useNavigate();

  // refs
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const photoRef = useRef(null);
  const messageRef = useRef(null);

  // to retain input
  useEffect(() => {
    // Retrieve saved data from localStorage
    const savedFullName = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("email");
    const savedMessage = localStorage.getItem("message");
    if (savedFullName) setFullName(savedFullName);
    if (savedEmail) setEmail(savedEmail);
    if (savedMessage) setMessage(savedMessage);
  });

  const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formValidate = () => {
    let formErrors = {};
    if (!fullName.trim()) {
      formErrors.fullName = "Full name is required";
    }
    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!emailValidation(email)) {
      formErrors.email = "Invalid email";
    }
    if (!photo.trim()) {
      formErrors.photo = "Photo URL is required";
    }
    return formErrors;
  };

  

  // handle formChanges
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedErrors = { ...errors };

    if (value) {
      delete updatedErrors[name];
    }

    if (name === "fullName") setFullName(value);
    if (name === "email") setEmail(value);
    if (name === "message") setMessage(value);
    localStorage.setItem(name, value);
    setErrors(updatedErrors);
  };

  const handlePhotoChange = async (e) => {
    const { name, value } = e.target;
    let updatedErrors = { ...errors };
    const file = e.target.files[0];

    if (value) {
      delete updatedErrors[name];
    }
    setErrors(updatedErrors);

    if (!file) return;
    // const fileUrl = URL.createObjectURL(file);
    setFileUrl(file.name);
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImageURL = await res.json();
    console.log(uploadedImageURL.url);
    setLoading(false);
    setPhoto(uploadedImageURL.url);
    localStorage.setItem("photo", uploadedImageURL.url);
  };

  // scroll to error input
  const scrollToFirstError = (formErrors) => {
    if (formErrors.fullName) {
        fullNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (formErrors.email) {
        emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (formErrors.message) {
        messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }else if (formErrors.photo) {
      photoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const formErrors = formValidate();
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) {
      // setErrors(formErrors);
      scrollToFirstError(formErrors);
    } else {
      const category = localStorage.getItem("ticketCategory");
      const quantity = localStorage.getItem("ticketQuantity");
      const attendeeDetails = {
        fullName,
        email,
        photo,
        message,
        category,
        quantity,
      };
      localStorage.setItem("userDetails", JSON.stringify(attendeeDetails));
      navigate("/ticketPage");
    }
  };
  // keyboard navigation.
  const handleKeyDown = (event, nextRef, prevRef = null) => {
    if (event.key === "ArrowDown" && nextRef) {
      nextRef.current.focus();
    } else if (event.key === "ArrowUp" && prevRef) {
      prevRef.current.focus();
    }
  };

  useEffect(() => {
    const form = document.getElementById("attendeeForm");
    form.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleFormSubmission(e);
      }
    });
  });

  

  return (
    <div className="w-full flex items-center justify-center">
      <div className="ssm:w-[700px] ssm:h-[1106px] border border-primary-100 bg-primary-50 rounded-[40px] ssm:p-[48px] flex flex-col ssm:gap-[38px] gap-[32px] p-6">
        <ProgressBar title={"Attendee Details"} />
        <form
          id="attendeeForm"
          onSubmit={handleFormSubmission}
          aria-labelledby="form-title"
          className="ssm:w-[604px] ssm:h-[930px] ssm:p-[24px] ssm:rounded-[32px] flex flex-col gap-5 ssm:border ssm:border-primary-200 border-transparent ssm:bg-primary-150 bg-transparent"
        >
          <div className="ssm:w-[556px] ssm:h-[351px] w-[287px] h-[328px] mx-auto rounded-3xl px-[24px] pt-[24px] pb-[48px] p-[16px] flex flex-col gap-[32px] border border-primary-250 backdrop-blur-[14px] bg-primary-350">
            <p className="font-roboto text-[16px] leading-[24x] font-normal text-primary-300">
              Upload Profile Photo
            </p>
            <div className="relative">
              <div className="ssm:w-[508px] h-[200px] bg-[#000000]/20" />
              <label
                htmlFor="photo"
                className="cursor-pointer w-[240px] h-[240px] border-4 border-[#23a0b5] rounded-3xl bg-[#0e464e] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[16px]"
              >
                <input
                  id="photo"
                  name="photo"
                  ref={photoRef}
                  className="detail_input"
                  required
                  type="file"
                  onChange={handlePhotoChange}
                  aria-describedby="photo-error"
                  accept=".png, .jpg, .jpeg, .gif"
                  style={{ visibility: "hidden" }}
                  aria-invalid="true"
                  onKeyDown={(e) => handleKeyDown(e, fullNameRef)}
                />
                {/* <div className="absolute z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"> */}
                <img
                  src={image}
                  alt="download-icon"
                  className="w-[32px] h-[32px]"
                />
                <div className="flex flex-col items-center justify-center">
                  {loading ? (
                    <span className="font-roboto font-normal text-[16px] leading-[24px] text-primary-300">
                      Uploading....
                    </span>
                  ) : (
                    <>
                      <p className="font-roboto font-normal text-[16px] leading-[24px] text-primary-300">
                        Drag & drop or click to
                      </p>
                      <p className="font-roboto font-normal text-[16px] leading-[24px] text-primary-300">
                        upload
                      </p>
                      {fileUrl && <div className="mx-2 text-sm text-center text-primary-300 font-roboto text-wrap bg-primary-350 mt-1">{fileUrl}</div>}
                    </>
                  )}
                  {}
                </div>
                {/* </div> */}
                {errors.photo && (
                  <span
                    id="photo-error"
                    role="alert"
                    className="text-red-500 font-roboto text-sm mt-[1.5px]"
                  >
                    {errors.photo}
                  </span>
                )}
              </label>
            </div>
          </div>
          <div
            style={{ height: "4px", width: "100%", backgroundColor: "#07373f" }}
            className="rounded-[5px] mt-[16px]"
          />
          <div className="">
            <label
              htmlFor="fullName"
              className="font-roboto text-[16px] leading-[24x] font-normal text-primary-300"
            >
              Enter your name
            </label>

            <input
              className=" detail_input text-[#ffffff] mt-[8px] outline-none ssm:w-[556px] h-[48px] w-[287px] rounded-xl p-3 border border-primary-250 bg-transparent"
              name="fullName"
              id="fullName"
              ref={fullNameRef}
              type="text"
              value={fullName}
              required
              onChange={handleInputChange}
              aria-describedby="fullName-error"
              aria-invalid="true"
              onKeyDown={(e) => handleKeyDown(e, emailRef, photoRef)}
            />
            {errors.fullName && (
              <span
                id="fullName-error"
                role="alert"
                className="text-red-500 font-roboto text-sm mt-[1.5px]"
              >
                {errors.fullName}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="font-roboto text-[16px] leading-[24x] font-normal text-primary-300"
            >
              Enter your email *
            </label>
            <div className="relative">
              <span className="text-[#ffffff] font-roboto font-normal text-base flex items-center gap-3 absolute top-1/2 -translate-y-[30%] left-3 z-[10]">
                <svg
                  className="icon"
                  width="24px"
                  height="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                </svg>
              </span>
              <input
                className="detail_input outline-none text-[#ffffff] mt-[8px] pl-12 ssm:w-[556px] h-[48px] w-[287px] rounded-xl p-3 border border-primary-250 bg-transparent"
                name="email"
                id="email"
                type="email"
                ref={emailRef}
                value={email}
                placeholder="hello@avioflagos.io"
                onChange={handleInputChange}
                aria-describedby="email-error"
                aria-invalid="true"
                onKeyDown={(e) => handleKeyDown(e, messageRef, fullNameRef)}
                required
              />
            </div>

            {errors.email && (
              <span
                id="email-error"
                role="alert"
                className="text-red-500 font-roboto text-sm mt-[1.5px]"
              >
                {errors.email}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="message"
              className="font-roboto text-[16px] leading-[24x] font-normal text-primary-300 hidden ssm:block"
            >
              Special request?{" "}
              <span className="text-[#8e8d8d] font-normal text-[12px] ml-1">
                optional
              </span>
            </label>
            <label
              htmlFor="message"
              className="font-roboto text-[16px] leading-[24x] font-normal text-primary-300 ssm:hidden"
            >
              About the project{" "}
              <span className="text-[#8e8d8d] font-thin text-sm ml-2">
                optional
              </span>
            </label>
            <textarea
              className="detail_input placeholder:text-[#AAAAAA] outline-none placeholder:text-[16px] text-[#ffffff] mt-[8px] ssm:w-[556px] w-[287px] rounded-xl p-3 border border-primary-250 bg-transparent"
              name="message"
              id="message"
              ref={messageRef}
              type="text"
              placeholder="Textarea"
              value={message}
              onChange={handleInputChange}
              rows="4"
              cols="50"
              onKeyDown={(e) => handleKeyDown(e, null, emailRef)}
            ></textarea>
          </div>
          <div className="ssm:w-[556px] ssm:h-[48px] flex ssm:flex-row flex-col-reverse items-center justify-center gap-6">
            <a href={"/selectionPage"}>
              <button className="font-jeju text-base font-normal ssm:w-[266px] w-[287px] h-full border border-primary-500 rounded-lg px-6 py-3 text-primary-500">
                back
              </button>
            </a>
            <button
              type="submit"
              onClick={handleFormSubmission}
              className="font-jeju text-base font-normal ssm:w-[266px] w-[287px] h-full border text-[#ffffff] border-primary-500 bg-primary-500 rounded-lg px-6 py-3"
            >
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendeeDetail;
