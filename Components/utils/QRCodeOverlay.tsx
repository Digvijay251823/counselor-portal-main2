import React, { useRef, useState } from "react";
import Modal from "./Modal";
import { QrCodeIcon } from "@heroicons/react/16/solid";
import { useGlobalState } from "../context/state";
import QRCode from "qrcode.react";
import exportAsImage from "./ExportAsImage";

function QRCodeOverlay({ url, content }: { url: string; content: string }) {
  const [inOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useGlobalState();
  const [loading, setIsLoading] = useState(false);

  const qrCodeRef = useRef<any>();
  const downloadQRCode = async () => {
    const canvas = qrCodeRef.current;
    setIsLoading(true);
    try {
      await exportAsImage(canvas, content);
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "SUCCESS", message: "downloaded successfully" },
      });
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <p className="flex flex-col items-center" onClick={() => setIsOpen(true)}>
        <QrCodeIcon className="h-14 w-14" />
        QR Code
      </p>
      <Modal isOpen={inOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col">
          <div className="md:w-[300px] w-[90vw] bg-gradient-to-tr from-purple-500 to-red-500 flex items-center justify-center py-10 rounded-t-[20px]">
            <div className="bg-white rounded-2xl w-max p-5">
              <div ref={qrCodeRef}>
                <QRCode
                  value={url}
                  renderAs="canvas"
                  className="h-[400px] w-[400px]"
                />
              </div>
            </div>
          </div>
          <div
            className={`${
              state.theme.theme === "LIGHT" ? "bg-stone-800" : "bg-stone-900"
            } rounded-b-[20px]`}
          >
            <div className="py-10 flex items-center justify-center md:gap-10 gap-6">
              <button
                className="text-white bg-red-700 w-[100px] py-2.5"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-700 w-[100px] py-2.5"
                onClick={downloadQRCode}
              >
                {loading ? "Downloading..." : "Download"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QRCodeOverlay;
