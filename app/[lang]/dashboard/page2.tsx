"use client";
import React from "react";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import Image from "next/image";
import Author from "@/public/images/all-img/Author.png";
import { Icon } from "@iconify/react";

const Dashboard = () => {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem>Utility</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Dashboard</BreadcrumbItem>
      </Breadcrumbs>

      <div className="mt-5 text-default-900">
        <div className="w-full bg-[url('/images/all-img/profilebg.png')] flex justify-between text-white bg-cover bg-no-repeat rounded-md pt-3 px-5">
          <div className="flex items-center justify-between">
            <div>
              <Image
                src={Author}
                alt="User Profile"
                width={100}
                className="rounded-full"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-xl">Aqsa Rehman</h1>
              <h3>Software Engineer </h3>
            </div>
          </div>

          {/* second section */}

          <div className="flex">
            <div className="flex items-end ">
              <Icon icon="heroicons:map" className="h-4 w-4 mr-1 " />
              <label htmlFor="Territory">Territory : </label>
              <p> Lahore</p>

              <Icon icon="heroicons:calendar" className="h-4 w-4 ml-5 mr-1" />
              <label htmlFor="effective date" className="">
                Effective Date :{" "}
              </label>
              <p>1st April 2024</p>

              <Icon icon="heroicons:calendar" className="h-4 w-4 ml-5 mr-1" />
              <label htmlFor="Date Of joining">Date Of Joining : </label>
              <p>1st April 2024</p>
            </div>
            <div></div>
          </div>

          {/* 3rd Section */}
          <div >
            <h1>Trainings</h1>

            <div className="flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3 w-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3>Recently Done</h3>

              <Icon icon="heroicons:calendar" className="h-4 w-4 ml-5 mr-1" />
              <h3>
                <h3>Upcoming </h3>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
