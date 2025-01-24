"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

interface SigningData {
  title: string;
  message: string;
  requesterEmailAddress: string;
}

export default function EmbeddedSign() {
  const [signerData, setSignerData] = useState<SigningData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("signerData");
    if (storedData) {
      setSignerData(JSON.parse(storedData));
    }
  }, []);

  const fetchEmbeddedUrl = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/embedded-url`
      );
      console.log(response.data);
      const { embeddedUrl: url } = response.data;

      if (!url) {
        throw new Error("Failed to retrieve the embedded signing URL.");
      }
      return url;
    } catch (err) {
      // console.error("Error fetching embedded URL:", err);
      setError("Failed to fetch the embedded signing URL.");
      throw err;
    }
  };

  const openHelloSignClient = async (url: string) => {
    try {
      const HelloSign = (await import("hellosign-embedded")).default;
      const client = new HelloSign();
      client.open(url, {
        clientId: process.env.NEXT_PUBLIC_DROPBOX_SIGN_CLIENT_ID,
        skipDomainVerification: true,
        testMode: true,
      });
    } catch (err) {
      // console.error("Error initializing HelloSign client:", err);

      setError("An error occurred while initializing the signing process.");
      throw err;
    }
  };

  const handleSigning = async () => {
    setIsLoading(true);
    try {
      const url = await fetchEmbeddedUrl();
      openHelloSignClient(url);
    } catch (err) {
      // console.error("Error in signing process:", err);

      setError("An error occurred during the signing process.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transition-all duration-500 ease-in-out transform hover:scale-105">
        <h1 className="text-3xl font-serif mb-6 text-center text-gray-800">
          Sign Your Document
        </h1>
        {signerData && (
          <div className="mb-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Document Details
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Title:</span> {signerData.title}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Message:</span>{" "}
              {signerData.message}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Requester Email:</span>{" "}
              {signerData.requesterEmailAddress}
            </p>
          </div>
        )}
        {error && (
          <p className="text-red-600 bg-red-100 border border-red-400 rounded p-3 mb-4">
            {error}
          </p>
        )}
        {signerData ? (
          <div className="flex justify-center">
            <button
              onClick={handleSigning}
              disabled={isLoading}
              className={`px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                "Sign Document"
              )}
            </button>
          </div>
        ) : (
          <div className="text-xl font-serif mb-6 text-center text-gray-800">
            No Document to Sign
          </div>
        )}
      </div>
    </div>
  );
}
