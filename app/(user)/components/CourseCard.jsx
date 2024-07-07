"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Smile } from "react-feather";
import Link from "next/link";
import { Modal, notification, message } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function CourseCard({ imageUrl, title, description, href, tiles }) {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isLoginRequired, setIsLoginRequired] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleEnroll = () => {
    if (session) {
      setIsEnrolling(true);
    } else {
      setIsLoginRequired(true);
    }
  };

  const handleCancel = () => {
    setIsEnrolling(false);
    setIsLoginRequired(false);
  };

  {
    /*//!!!!!!!!!!!!!!!!!!!!!!!!! ENROLL IN COURSE FUNC */
  }
  const EnrollCourse = async (title, href) => {
    const res = await fetch("api/setCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        CourseName: title,
        checkORadd: "add",
        id: href,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.message == "Course added") {
      message.success("Enrolled Successfully!");
      handleCancel();
      router.push(href);
    }
  };

  {
    /*//!!!!!!!!!!!!!!!!!!!!!!!!! CHECK ENROLL COURSE FUNC */
  }
  const CheckEnroll = async (title, href) => {
    if (session) {
      const res = await fetch("api/setCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          CourseName: title,
          checkORadd: "check",
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.message == "Already Enrolled") {
        console.log(title);
        notification.open({
          duration: 1.5,
          className: "bg-[#1d4ed8]",
          icon: <SmileOutlined style={{ color: "white" }} />,
          message: (
            <div>
              <h1 className="text-white text-lg font-bold">Alredy Enrolled!</h1>
              <h1 className="text-white font-bold">
                Redirecting to Course Page...
              </h1>
            </div>
          ),
        });
        router.push(href);
        handleCancel();
      } else {
        handleEnroll();
      }
    } else {
      setIsLoginRequired(true);
    }
  };

  return (
    <div className="bg-[#1e1f22] flex flex-col lg:flex-row p-5 mb-5 rounded-xl shadow-xl ">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-96 h-56 rounded-xl">
          <img
            className="object-cover rounded-xl w-full h-full"
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col justify-around mx-0 lg:mx-10 mt-5 lg:mt-0 w-full">
          <div className="flex flex-col">
            <div className="text-white font-normal text-3xl">{title}</div>
            <div className="text-[#787b7e] mt-4">{description}</div>
          </div>

          <div className={`flex-row mt-4 justify-between items-center flex`}>
            <div className="flex flex-row">
              <div className="bg-[#28292c] rounded-md flex justify-center items-center p-3">
                <h1 className="text-white ">
                  {description || title.split(" ")[0]}
                </h1>
              </div>
            </div>

            <div
              className="bg-[#1d4ed8] text-white rounded-md px-4 py-3 ml-auto hover:cursor-pointer"
              onClick={() => CheckEnroll(title, href)}
            >
              <ArrowRight />
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Enroll in Course"
        open={isEnrolling}
        onCancel={handleCancel}
        footer={null}
        centered // Add the centered prop
      >
        <p>Are you sure you want to enroll in this course?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCancel}
            className="bg-[#787b7e] text-white rounded-md 
            px-4 py-2 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => EnrollCourse(title, href)}
            className="bg-[#1d4ed8] text-white rounded-md 
            px-4 py-2 ml-2"
          >
            Enroll
          </button>
        </div>
      </Modal>

      <Modal
        title="Enroll in Course"
        open={isLoginRequired}
        onCancel={handleCancel}
        footer={null}
        centered // Add the centered prop
      >
        <p>Login Required!</p>
        <div className="flex justify-end mt-4">
          <Link
            href="/login"
            className="bg-[#1d4ed8] text-white rounded-md px-4 py-2 mr-2"
          >
            Login
          </Link>
          <button
            onClick={handleCancel}
            className="bg-[#787b7e] text-white rounded-md px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CourseCard;
