import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function Loading(): JSX.Element {
  return (
    <Div>
      <svg
        height="200"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 100 100"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style={{ display: 'block' }}>
          <circle cx="53.92" cy="50" fill="rgba(255, 255, 255, 0.25)" r="4">
            <animate
              attributeName="cx"
              begin="-0.67s"
              calcMode="linear"
              dur="1"
              keyTimes="0;1"
              repeatCount="indefinite"
              values="95;35"
            />
            <animate
              attributeName="fill-opacity"
              begin="-0.67s"
              calcMode="linear"
              dur="1"
              keyTimes="0;0.2;1"
              repeatCount="indefinite"
              values="0;1;1"
            />
          </circle>
          <circle cx="74.32" cy="50" fill="rgba(255, 255, 255, 0.25)" r="4">
            <animate
              attributeName="cx"
              begin="-0.33s"
              calcMode="linear"
              dur="1"
              keyTimes="0;1"
              repeatCount="indefinite"
              values="95;35"
            />
            <animate
              attributeName="fill-opacity"
              begin="-0.33s"
              calcMode="linear"
              dur="1"
              keyTimes="0;0.2;1"
              repeatCount="indefinite"
              values="0;1;1"
            />
          </circle>
          <circle cx="94.12" cy="50" fill="rgba(255, 255, 255, 0.25)" r="4">
            <animate
              attributeName="cx"
              begin="0s"
              calcMode="linear"
              dur="1"
              keyTimes="0;1"
              repeatCount="indefinite"
              values="95;35"
            />
            <animate
              attributeName="fill-opacity"
              begin="0s"
              calcMode="linear"
              dur="1"
              keyTimes="0;0.2;1"
              repeatCount="indefinite"
              values="0;1;1"
            />
          </circle>
        </g>
        <g transform="translate(-15 0)">
          <path
            d="M50 50L20 50A30 30 0 0 0 80 50Z"
            fill="#303028"
            transform="rotate(1.31994 50 50)"
          >
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="1s"
              calcMode="linear"
              keyTimes="0;0.5;1"
              repeatCount="indefinite"
              type="rotate"
              values="0 50 50;45 50 50;0 50 50"
            />
          </path>
          <path
            d="M50 50L20 50A30 30 0 0 1 80 50Z"
            fill="#303028"
            transform="rotate(-1.31994 50 50)"
          >
            <animateTransform
              attributeName="transform"
              begin="0s"
              calcMode="linear"
              dur="1s"
              keyTimes="0;0.5;1"
              repeatCount="indefinite"
              type="rotate"
              values="0 50 50;-45 50 50;0 50 50"
            />
          </path>
        </g>
      </svg>
    </Div>
  );
}
