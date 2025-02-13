import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const pagePaths = ["/selectionPage", "/attendeePage", "/ticketPage"];

const ProgressBar = ({ title }) => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const currentPageIndex = pagePaths.indexOf(location.pathname);
    const progressPercentage =
      ((currentPageIndex + 1) / pagePaths.length) * 100;
    setProgress(progressPercentage);
    setPageIndex(currentPageIndex + 1);
  }, [location.pathname]);
  return (
    <div>
      <div className="flex ssm:items-center justify-between sm:flex-row gap-2">
        <p className="font-jeju font-normal text-[24px] leading-[24px] ssm:text-[32px] ssm:leading-[32px] text-[#ffffff]">
          {title}
        </p>
        <p
          style={{ color: "#FAFAFA" }}
          className="font-roboto font-normal text-base text-primary-300"
        >
          Step {pageIndex}/{pagePaths.length}
        </p>
      </div>

      <div
        style={{ height: "4px", width: "100%", backgroundColor: "#0e464f" }}
        className="rounded-[5px] mt-[16px]"
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#24a0b5",
          }}
          className="rounded-[5px]"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
