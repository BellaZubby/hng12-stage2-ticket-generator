import React, { useEffect, useState } from "react";
import ProgressBar from "../components/progressBar";
import { data } from "../hooks/ticketType";
import { useNavigate } from "react-router-dom";

const TicketSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedCategory) {
      const category = selectedCategory.ticketCategory;
      localStorage.setItem("ticketCategory", category);
      localStorage.setItem("ticketQuantity", quantity);
      navigate("/attendeePage");
    } else {
      alert("Please select a ticket category and quantity");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="ssm:w-[700px] ssm:h-[858px] border border-primary-100 bg-primary-50 rounded-[40px] ssm:p-[48px] flex flex-col ssm:gap-[38px] gap-[32px] p-6">
        <ProgressBar title={"Ticket Selection"} />
        <div className="ssm:w-[604px] ssm:h-[682px] ssm:p-[24px] ssm:rounded-[32px] flex flex-col gap-5 ssm:border ssm:border-primary-200 border-transparent ssm:bg-primary-150 bg-transparent">
          <div className="ssm:w-[556px] ssm:h-[200px] mx-auto rounded-3xl ssm:p-[24px] p-[16px] flex flex-col items-center justify-center gap-[8px] border-1-2 border-r-2 border-b-2 border-[#07363e] backdrop-blur-[14px] tech_background">
            <h3 className="font-roadRage font-normal ssm:text-[62px] ssm:leading-[62px] text-[42px] leading-[48px] text-primary-300">
              Techember Fest ” 25
            </h3>
            <div className=" hidden ssm:block">
              {/* desktop */}
              <p className="font-roboto text-[16px] text-center leading-[24px] font-normal text-primary-300 hidden ssm:block">
                Join us for an unforgettable experience at
              </p>
              <p className="font-roboto text-[16px] text-center leading-[24px] font-normal text-primary-300 hidden ssm:block">
                <span>[Event Name]!</span> Secure your spot now.
              </p>
            </div>

            <p className="font-roboto text-[16px] leading-[24px] font-normal text-primary-300 hidden ssm:block">
              {/* 04 Rumens Road, Ikoyi, Lagos */}
              📍<span style={{ marginRight: "20px" }}>[Event Location]</span>
              <span>| |</span>
              <span style={{ marginLeft: "20px" }}>
                March 15, 2025 | 7:00 PM
              </span>
            </p>
            {/* mobile */}
            <div className="mt-3 ssm:hidden">
              <p className="font-roboto text-[14px] leading-[21px] text-center font-normal text-primary-300 ssm:hidden">
                Join us for an unforgettable
              </p>
              <p className="font-roboto text-[14px] leading-[21px] text-center font-normal text-primary-300 ssm:hidden">
                experience at [Event Name]! Secure
              </p>
              <p className="font-roboto text-[14px] leading-[21px] text-center font-normal text-primary-300 ssm:hidden">
                your spot now.
              </p>
            </div>

            <div className="mt-4 ssm:hidden">
              <p className="font-roboto text-[16px] leading-[24px] font-normal text-primary-300 ssm:hidden">
                {/* 04 Rumens Road, Ikoyi, Lagos */}
                📍[Event Location]
              </p>
              <p className="font-roboto text-[16px] leading-[24px] font-normal text-primary-300 ssm:hidden">
                March 15, 2025 | 7:00PM
              </p>
            </div>
          </div>
          <div
            style={{ height: "4px", width: "100%", backgroundColor: "#07373f" }}
            className="rounded-[5px] mt-[16px]"
          />
          <div className="">
            <p className="font-roboto text-[16px] leading-[24x] font-normal text-primary-300">
              Select Ticket Type:
            </p>
            <div className="ssm:mt-[8px] ssm:w-[556px] ssm:h-[142px] rounded-[24px] border border-primary-250 bg-primary-350 p-4 flex ssm:flex-row flex-col justify-center gap-[16px]">
              {data.map((ticket, idx) => (
                <div
                  onClick={() => setSelectedCategory(ticket)}
                  key={idx}
                  className={`${
                    selectedCategory && selectedCategory.id === ticket.id
                      ? "border-white"
                      : ""
                  } ${
                    idx === 0
                      ? "ssm:w-[158px] ssm:h-[110px] p-3 rounded-xl border border-primary-450 bg-primary-400 flex flex-col gap-3 hover:border-white cursor-pointer"
                      : "ssm:w-[158px] ssm:h-[110px] p-3 rounded-xl border border-primary-450 bg-transparent flex flex-col gap-3 hover:border-white cursor-pointer"
                  }`}
                >
                  <span className="font-roboto font-semibold text-[24px] leading-[26.4px] text-[#ffffff]">
                    {ticket.amount}
                  </span>
                  <div className="ssm:mt-[8px]">
                    <p className="font-roboto text-base font-normal text-primary-300">
                      {ticket.title}
                    </p>
                    <span className="font-roboto font-normal text-[14px] ssm:leading-[20px] leading-[21px] text-[#D9D9D9]">
                      20/52
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="quantity"
              className="font-roboto text-[16px] leading-[24x] font-normal text-primary-300"
            >
              Number of Tickets
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              id="quantity"
              className="outline-none text-[#ffffff] mt-[8px] ssm:w-[556px] h-[48px] w-[287px] rounded-xl p-3 border border-primary-250 bg-transparent"
              name="quantity"
            >
              <option
                className="text-base font-roboto font-normal text-[#ffffff] bg-primary-350"
                value="1"
              >
                1
              </option>
              <option
                className="text-base font-roboto font-normal text-[#ffffff] bg-primary-350"
                value="2"
              >
                2
              </option>
              <option
                className="text-base font-roboto font-normal text-[#ffffff] bg-primary-350"
                value="3"
              >
                3
              </option>
            </select>
          </div>
          <div className="ssm:w-[556px] ssm:h-[48px] flex ssm:flex-row flex-col items-center justify-center gap-6 mt-3">
            <a href={"/"}>
              <button className="font-jeju text-base font-normal ssm:w-[266px] w-[287px] h-full border border-primary-500 rounded-lg px-6 py-3 text-primary-500">
                Cancel
              </button>
            </a>
            <button
              onClick={handleNext}
              className="font-jeju text-base font-normal ssm:w-[266px] w-[287px] h-full border text-[#ffffff] border-primary-500 bg-primary-500 rounded-lg px-6 py-3"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
