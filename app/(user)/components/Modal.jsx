"use client";
import { useState, React } from "react";
import { useSession } from "next-auth/react";
import { Modal } from "antd";
import Link from "next/link"; // Add missing import

function CustomModal() {
  const { data: session, status } = useSession();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleCancel = () => {
    setIsEnrolling(false);
  };

  if (session) {
    return (
      <Modal
        title="Login Required"
        open={isEnrolling}
        onCancel={handleCancel}
        footer={null}
        centered
        // Add the centered prop
      >
        <p>Please login to enroll in this course.</p>
        <div className="flex justify-end mt-4">
          <Link
            href="/login"
            className="bg-[#1d4ed8] text-white rounded-md px-4 py-2 mr-2"
          >
            Login
          </Link>
          <button
            className="bg-[#787b7e] text-white rounded-md px-4 py-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal
        title="Login Required"
        open={isEnrolling}
        onCancel={handleCancel}
        footer={null}
        centered
        // Add the centered prop
      >
        <p>Please login to enroll in this course.</p>
        <div className="flex justify-end mt-4">
          <Link
            href="/login"
            className="bg-[#1d4ed8] text-white rounded-md px-4 py-2 mr-2"
          >
            Login
          </Link>
          <button
            className="bg-[#787b7e] text-white rounded-md px-4 py-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </Modal>
    );
  }
}

export default CustomModal;
