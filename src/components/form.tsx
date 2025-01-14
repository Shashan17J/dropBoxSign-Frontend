"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SigningDoc() {
  const [templateId, setTemplateId] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateEmail(emailAddress) && templateId.length == 40) {
      const toastId = toast.loading("Sending document...");
      try {
        const response = await axios.post(
          "/api/dropbox",
          {
            role,
            name,
            emailAddress,
            templateId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response) {
          toast.success("Document Sent Successfully");
        }
      } catch (error: any) {
        toast.error(error.response?.data?.error || error.message);
      }
      toast.dismiss(toastId);
    } else {
      toast.error("Enter Valid Email or Template ID");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 rounded-xl shadow-2xl p-8 space-y-6 transition-all duration-500 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-4xl font-serif mb-10 text-center text-gray-800">
            Sign With Dropbox Sign
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="templateId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Template ID
              </label>
              <input
                type="text"
                id="templateId"
                placeholder="Enter Template ID"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="w-full px-4 py-2 bg-white placeholder-gray-400 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                placeholder="Enter Role"
                value={role}
                onChange={(e) => setRole(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 bg-white placeholder-gray-400 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-white placeholder-gray-400 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="emailAddress"
                placeholder="Enter Email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full px-4 py-2 bg-white placeholder-gray-400 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Send Envelope
          </button>
        </form>
      </div>
    </div>
  );
}
