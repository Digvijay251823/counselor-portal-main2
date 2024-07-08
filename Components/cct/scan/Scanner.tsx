"use client";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  LinkIcon,
  QrCodeIcon,
} from "@heroicons/react/16/solid";
import React from "react";

import Link from "next/link";
import { useGlobalState } from "@/Components/context/state";
import CopyClipBoard from "@/Components/utils/CopyToClipBoard";
import { LinksActivator } from "@/Components/utils/LinksActivator";
import QRCodeOverlay from "@/Components/utils/QRCodeOverlay";

function Scanner() {
  const { state } = useGlobalState();
  const linkActivator = LinksActivator().toString();
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
                  url={`${linkActivator}/seva/cct`}
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
              <Link href={`${linkActivator}/seva/cct`}>
                <p className="flex items-center gap-1">
                  <LinkIcon className="h-5 w-5" />
                  Link
                </p>
              </Link>
            </div>
          </div>
          <QRCodeOverlay
            url={`${linkActivator}/seva/cct`}
            content="ActivitiesQrCode"
          />
        </div>
        {/* <div
          className={`flex items-center gap-5 w-max p-5 rounded-xl ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          }`}
        >
          <div>
            <p className="text-2xl font-bold">Sadhana</p>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1">
                <CopyClipBoard
                  url={`${linkActivator}/sadhana`}
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
              <Link href={"/counselee/sadhana"}>
                <p className="flex items-center gap-1">
                  <LinkIcon className="h-5 w-5" />
                  Link
                </p>
              </Link>
            </div>
          </div>
          <QRCodeOverlay url="" content="SadhanaQrCode" />
        </div> */}
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
                  url={`${linkActivator}/changecounselor`}
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
            url={`${linkActivator}/changecounselor`}
            content="ChangeCounselorQrCode"
          />
        </div>
      </div>
    </div>
  );
}

export default Scanner;
