import React from "react";

const HomePage = () => {
  return (
    <div className="flex items-center gap-9 ssm:gap-12 flex-col relative mt-40 md:mt-24">
      <h1 className=" font-roadRage  text-[50px] ssm:text-[100px] font-semibold text-primary-300">
        TECHEMBER FEST <span>”</span> 25{" "}
      </h1>
      <a href="/selectionPage">
        <button className="bg-primary-500 px-[24px] py-[16px] rounded-xl text-primary-300 font-normal font-jeju">
          Proceed to get your Ticket
        </button>
      </a>
    </div>
  );
};

export default HomePage;
