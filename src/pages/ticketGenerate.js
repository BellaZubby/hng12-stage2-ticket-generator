import React, { useEffect, useState } from "react";
import ProgressBar from "../components/progressBar";
import { useNavigate } from "react-router-dom";
import barcode from "../assets/barcode.png";

const TicketGenerate = () => {
  const [attendeeDetails, setAttendeeDetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const storedDetails = localStorage.getItem("userDetails");
    if (storedDetails) {
      setAttendeeDetails(JSON.parse(storedDetails));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/selectionPage");
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="ssm:w-[700px] w-[335px] ssm:h-[1025px] border border-primary-100 bg-primary-50 rounded-[40px] ssm:p-[48px] flex flex-col ssm:gap-[38px] gap-[32px] p-6">
        <ProgressBar title={"Ready"} />
        <div className="flex flex-col items-center gap-[32px]">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-alatsi ssm:text-[32px] ssm:leading-[40.96px] text-[24px] leading-[33.6px] font-normal text-[#ffffff]">
              Your Ticket is Booked!
            </p>
            <p className="text-base font-roboto text-primary-300 font-bold hidden ssm:block">
              Check your email for a copy or you can download
            </p>
            <div className="flex flex-col items-center justify-center ssm:hidden">
              <p className="text-base font-roboto text-primary-300 font-bold">
                You can download or check
              </p>
              <p className="text-base font-roboto text-primary-300 font-bold">
                for a copy
              </p>
            </div>
          </div>

          <div className="ssm:w-[604px] ssm:h-[736px] px-[21px] py-[32px] flex flex-col items-center justify-center gap-[24px]">
            <div className="w-[300px] h-[600px] bg-[#70a6af]/20 border border-[#23a0b5] flex flex-col items-center justify-center">
              <div className="ssm:w-[260px] ssm:h-[446px] border border-primary-550 p-3 rounded-3xl flex flex-col items-center gap-[20px]">
                <div className="flex flex-col items-center gap-3 text-[#ffffff]">
                  <p className="text-[34px] font-roadRage font-normal leading-[34px]">
                    Techember Fest ” 25
                  </p>
                  <p className="text-[10px] font-roboto font-normal leading-[15px]">
                    📍 04 Rumens road, Ikoyi, Lagos
                  </p>
                  <p className="text-[10px] font-roboto font-normal leading-[15px]">
                    📅 March 15, 2025 | 7:00 PM
                  </p>
                </div>
                <div className="w-[140px] h-[140px] border-[4px] border-primary-550 rounded-[12px]">
                  <img
                    src={attendeeDetails.photo}
                    alt="image"
                    className="w-[100%] h-full object-cover rounded-[12px]"
                  />
                </div>
                <div className="w-full px-[4px] py-[6px] border border-[#133D44] bg-[#08343c] rounded-[8px] font-roboto flex flex-col gap-4">
                  <div className="border-b border-primary-300 flex gap-4 justify-center h-[45px]">
                    <div className="">
                      <p className="text-[#ffffff] text-[10px] leading-[15px] font-normal">
                        Enter your Name
                      </p>
                      <p className="text-[#ffffff] text-[12px] leading-[18px] font-bold mt-1">
                        {attendeeDetails.fullName}
                      </p>
                    </div>
                    <div className="w-[1px] h-[105px] bg-primary-300" />
                    <div>
                      <p className="text-[#ffffff] text-[10px] leading-[15px] font-normal">
                        Enter your Email*
                      </p>
                      <p className="text-[#ffffff] text-[12px] leading-[18px] font-bold mt-1">
                        {attendeeDetails.email}
                      </p>
                    </div>
                  </div>
                  <div className="border-b  border-primary-300 flex justify-between h-[45px] px-2">
                    <div className="">
                      <p className="text-[#ffffff] text-[10px] leading-[15px] font-normal">
                        Ticket Type
                      </p>
                      <p className="text-[#ffffff] text-[12px] leading-[18px] font-bold mt-1">
                        {attendeeDetails.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#ffffff] text-[10px] leading-[15px] font-normal">
                        Ticket For:
                      </p>
                      <p className="text-[#ffffff] text-[12px] leading-[18px] font-bold">
                        {attendeeDetails.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="ssm:w-[224px] ssm:h-[65px]">
                    <p className="text-[#ffffff] text-[10px] leading-[15px] font-normal">
                      Special request?
                    </p>
                    <p className="text-wrap text-[#ffffff] text-[10px] leading-[15px] font-normal">
                      {attendeeDetails.message}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <img
                  className="w-[100%] h-24 object-contain"
                  src={barcode}
                  alt="barcode"
                />
              </div>
            </div>
            <div className="ssm:w-[556px] ssm:h-[48px] flex ssm:flex-row flex-col-reverse items-center justify-center gap-6 mt-3">
              <button
                onClick={handleLogout}
                className="font-jeju text-base font-normal ssm:w-[266px] w-[287px] h-full border border-primary-500 rounded-lg px-6 py-3 text-primary-500"
              >
                Book Another Ticket
              </button>

              <button className="font-jeju text-base font-normal ssm:w-[266px] w-[287px] h-full border text-[#ffffff] border-primary-500 bg-primary-500 rounded-lg px-6 py-3">
                Download Ticket
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TicketGenerate;
