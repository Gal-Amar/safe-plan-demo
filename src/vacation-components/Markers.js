import React, { useState } from "react";
import { AzureMapHtmlMarker, useCreatePopup } from "react-azure-maps";
import { data } from "azure-maps-control";
//Drawing the popup
const SvgComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={28}>
    <path
      fill="{secondaryColor}"
      d="M11.988 16.615a5.15 5.15 0 0 1-2.268-.525 4.909 4.909 0 0 1-2.805-4.442 5.019 5.019 0 0 1 5.072-4.936h.012a5.03 5.03 0 0 1 5.085 4.961 4.907 4.907 0 0 1-.549 2.224 5.114 5.114 0 0 1-4.548 2.718zm0-8.06a3.173 3.173 0 0 0-3.226 3.099 3.081 3.081 0 0 0 1.77 2.782 3.299 3.299 0 0 0 4.365-1.386 3.049 3.049 0 0 0 .342-1.381A3.184 3.184 0 0 0 12 8.555h-.012z"
    />
    <path
      fill="{color}"
      d="M11.999.922A10.908 10.908 0 0 0 .923 11.654a10.639 10.639 0 0 0 4.418 8.598l6.658 6.464 6.658-6.463a10.537 10.537 0 0 0 2.198-15.041A11.182 11.182 0 0 0 11.999.923zm1.873 14.341a4.221 4.221 0 0 1-5.589-1.789 3.945 3.945 0 0 1-.445-1.8 4.164 4.164 0 0 1 8.323-.037 4.028 4.028 0 0 1-2.289 3.626Z"
    />
    <path
      fill="{secondaryColor}"
      d="m11.999 28-7.256-7.044A11.611 11.611 0 0 1 0 11.653 11.844 11.844 0 0 1 11.988.001a.102.102 0 0 1 .02 0 12.164 12.164 0 0 1 9.577 4.647 11.357 11.357 0 0 1 2.299 8.614 11.521 11.521 0 0 1-4.63 7.695zm-.01-26.157a9.997 9.997 0 0 0-10.143 9.812 9.769 9.769 0 0 0 4.04 7.853l.099.083 6.014 5.838 6.113-5.922a9.7 9.7 0 0 0 3.945-6.505 9.533 9.533 0 0 0-1.933-7.229 10.305 10.305 0 0 0-8.116-3.931h-.021zm.021 14.772a5.11 5.11 0 0 1-4.547-2.718 4.868 4.868 0 0 1 .932-5.743 5.118 5.118 0 0 1 3.58-1.46h.024a5.031 5.031 0 0 1 5.084 4.938 4.92 4.92 0 0 1-2.805 4.457 5.152 5.152 0 0 1-2.269.525zm-.011-8.079h-.015a3.277 3.277 0 0 0-2.295.933 3.029 3.029 0 0 0-.587 3.58 3.297 3.297 0 0 0 4.364 1.386 3.092 3.092 0 0 0 1.772-2.795 3.185 3.185 0 0 0-3.239-3.105z"
    />
    <text
      x={12}
      y={17}
      style={{
        fontSize: 14,
        fill: "#000",
        textAnchor: "middle",
      }}
    >
      {"{text}"}
    </text>
  </svg>
);
//Creating Azure map marker component
const Markers = ({ marker }) => {
  const [visible, setVisible] = useState(false);

  let point = new data.Position(marker.lng, marker.lat);

  return (
    <AzureMapHtmlMarker
      markerContent={<SvgComponent />}
      isPopupVisible={visible}
      options={{
        position: [point[0], point[1]],
        secondaryColor: "#57333d",
        text: "",
        color: "#bda8a3",
        popup: useCreatePopup({
          options: {
            closeButton: false,
            pixelOffset: [0, -40],
          },
          popupContent: <div className="popup">{marker.name}</div>,
        }),
      }}
      events={[
        {
          eventName: "mouseenter",
          callback: () => {
            setVisible(true);
          },
        },
        {
          eventName: "mouseleave",
          callback: () => {
            setVisible(false);
          },
        },
      ]}
    />
  );
};

export default Markers;
