"use client";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  LinkIcon,
  QrCodeIcon,
} from "@heroicons/react/16/solid";
import React from "react";
import { useGlobalState } from "../context/state";
import QRCodeOverlay from "../utils/QRCodeOverlay";
import { LinksActivator } from "../utils/LinksActivator";
import CopyClipBoard from "../utils/CopyToClipBoard";
import Link from "next/link";

interface Props {
  id: string;
  initiatedName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

function Scanner({ response }: { response: Props }) {
  const { state } = useGlobalState();
  const linksActivator = LinksActivator().toString();

  return (
    <div className="px-10">
      <div className="flex flex-wrap gap-5">
        <div
          className={`flex items-center gap-5 w-max p-5 rounded-xl ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          }`}
        >
          <div>
            <p className="text-2xl font-bold">Activities</p>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1">
                <CopyClipBoard
                  url={`${linksActivator}/counselee/activities/${response.id}`}
                  whenCopied={
                    <div className="flex items-center">
                      <i>Copy</i>
                      <i>
                        <ClipboardDocumentIcon className="h-5 w-5" />
                      </i>
                    </div>
                  }
                  NotCopied={
                    <div className="flex items-center">
                      <i>Copy</i>
                      <i>
                        <ClipboardDocumentCheckIcon className="h-5 w-5" />
                      </i>
                    </div>
                  }
                />
              </div>
              <Link href={`/counselee/activities/${response.id}`}>
                <p className="flex items-center gap-1">
                  <LinkIcon className="h-5 w-5" />
                  Link
                </p>
              </Link>
            </div>
          </div>
          <QRCodeOverlay
            url={`${linksActivator}/counselee/activities/${response.id}`}
            content="ActivitiesQrCode"
          />
        </div>
        <div
          className={`flex items-center gap-5 w-max p-5 rounded-xl ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          }`}
        >
          <div>
            <p className="text-2xl font-bold">Sadhana</p>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1">
                <CopyClipBoard
                  url={`${linksActivator}/counselee/sadhana/${response.id}`}
                  whenCopied={
                    <div className="flex items-center">
                      <i>Copy</i>
                      <i>
                        <ClipboardDocumentIcon className="h-5 w-5" />
                      </i>
                    </div>
                  }
                  NotCopied={
                    <div className="flex items-center">
                      <i>Copy</i>
                      <i>
                        <ClipboardDocumentCheckIcon className="h-5 w-5" />
                      </i>
                    </div>
                  }
                />
              </div>
              <Link href={`/counselee/sadhana/${response.id}`}>
                <p className="flex items-center gap-1">
                  <LinkIcon className="h-5 w-5" />
                  Link
                </p>
              </Link>
            </div>
          </div>
          <QRCodeOverlay
            url={`${linksActivator}/counselee/sadhana/${response.id}`}
            content="SadhanaQrCode"
          />
        </div>
        <div
          className={`flex items-center gap-5 w-max p-5 rounded-xl ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          }`}
        >
          <div>
            <p className="text-2xl font-bold">Attendance</p>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1">
                <CopyClipBoard
                  url={`${linksActivator}/counselee/attendance/${response.id}`}
                  whenCopied={
                    <div className="flex items-center">
                      <i>Copy</i>
                      <i>
                        <ClipboardDocumentIcon className="h-5 w-5" />
                      </i>
                    </div>
                  }
                  NotCopied={
                    <div className="flex items-center">
                      <i>Copy</i>
                      <i>
                        <ClipboardDocumentCheckIcon className="h-5 w-5" />
                      </i>
                    </div>
                  }
                />
              </div>
              <Link href={`/counselee/attendance/${response.id}`}>
                <p className="flex items-center gap-1">
                  <LinkIcon className="h-5 w-5" />
                  Link
                </p>
              </Link>
            </div>
          </div>
          <QRCodeOverlay
            url={`${linksActivator}/counselee/attendance/${response.id}`}
            content="AttendanceQrCode"
          />
        </div>

        <div
          className={`flex items-center gap-5 w-max p-5 rounded-xl ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          }`}
        >
          <div>
            <p className="text-2xl font-bold">Change Counselor</p>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1">
                <CopyClipBoard
                  url={`${linksActivator}/counselee/changecounselor/${response.id}`}
                  whenCopied={
                    <div className="flex items-center">
                      <i>Copy</i>
                      <i>
                        <ClipboardDocumentIcon className="h-5 w-5" />
                      </i>
                    </div>
                  }
                  NotCopied={
                    <div className="flex items-center">
                      <i>Copy</i>
                      <i>
                        <ClipboardDocumentCheckIcon className="h-5 w-5" />
                      </i>
                    </div>
                  }
                />
              </div>
              <Link href={"/changecounselor"}>
                <p className="flex items-center gap-1">
                  <LinkIcon className="h-5 w-5" />
                  Link
                </p>
              </Link>
            </div>
          </div>
          <QRCodeOverlay
            url={`${linksActivator}/counselee/changecounselor/${response.id}`}
            content="ChangeCounselorQrCode"
          />
        </div>
      </div>
    </div>
  );
}

export default Scanner;
