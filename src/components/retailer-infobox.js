import React from "react"
import "../styles/retailer-infobox.scss"
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox"

export default props => {
  const { retailer } = props
  return (
    <InfoBox {...props} defaultOptions={{ boxClass: "retailer-infobox" }}>
      <div className="retailer-infobox__wrapper">
        <div className="retailer-infobox__address" title={retailer.address}>
          {retailer.address}
        </div>
        <div className="retailer-infobox__title">
          {retailer.location}
        </div>
        <div className="retailer-infobox__type">
          {retailer.type}
        </div>
        <div className="retailer-infobox__contact-information">
          {retailer.phones && retailer.phones.map((phoneNumber, index) => (
            <a className="retailer-infobox__phone-number" href={"tel:" + phoneNumber} key={index}>
              <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4MC41NiA0ODAuNTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4MC41NiA0ODAuNTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzY1LjM1NCwzMTcuOWMtMTUuNy0xNS41LTM1LjMtMTUuNS01MC45LDBjLTExLjksMTEuOC0yMy44LDIzLjYtMzUuNSwzNS42Yy0zLjIsMy4zLTUuOSw0LTkuOCwxLjggICAgYy03LjctNC4yLTE1LjktNy42LTIzLjMtMTIuMmMtMzQuNS0yMS43LTYzLjQtNDkuNi04OS04MWMtMTIuNy0xNS42LTI0LTMyLjMtMzEuOS01MS4xYy0xLjYtMy44LTEuMy02LjMsMS44LTkuNCAgICBjMTEuOS0xMS41LDIzLjUtMjMuMywzNS4yLTM1LjFjMTYuMy0xNi40LDE2LjMtMzUuNi0wLjEtNTIuMWMtOS4zLTkuNC0xOC42LTE4LjYtMjcuOS0yOGMtOS42LTkuNi0xOS4xLTE5LjMtMjguOC0yOC44ICAgIGMtMTUuNy0xNS4zLTM1LjMtMTUuMy01MC45LDAuMWMtMTIsMTEuOC0yMy41LDIzLjktMzUuNywzNS41Yy0xMS4zLDEwLjctMTcsMjMuOC0xOC4yLDM5LjFjLTEuOSwyNC45LDQuMiw0OC40LDEyLjgsNzEuMyAgICBjMTcuNiw0Ny40LDQ0LjQsODkuNSw3Ni45LDEyOC4xYzQzLjksNTIuMiw5Ni4zLDkzLjUsMTU3LjYsMTIzLjNjMjcuNiwxMy40LDU2LjIsMjMuNyw4Ny4zLDI1LjRjMjEuNCwxLjIsNDAtNC4yLDU0LjktMjAuOSAgICBjMTAuMi0xMS40LDIxLjctMjEuOCwzMi41LTMyLjdjMTYtMTYuMiwxNi4xLTM1LjgsMC4yLTUxLjhDNDAzLjU1NCwzNTUuOSwzODQuNDU0LDMzNi45LDM2NS4zNTQsMzE3Ljl6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTM0Ni4yNTQsMjM4LjJsMzYuOS02LjNjLTUuOC0zMy45LTIxLjgtNjQuNi00Ni4xLTg5Yy0yNS43LTI1LjctNTguMi00MS45LTk0LTQ2LjlsLTUuMiwzNy4xICAgIGMyNy43LDMuOSw1Mi45LDE2LjQsNzIuOCwzNi4zQzMyOS40NTQsMTg4LjIsMzQxLjc1NCwyMTIsMzQ2LjI1NCwyMzguMnoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNNDAzLjk1NCw3Ny44Yy00Mi42LTQyLjYtOTYuNS02OS41LTE1Ni03Ny44bC01LjIsMzcuMWM1MS40LDcuMiw5OCwzMC41LDEzNC44LDY3LjJjMzQuOSwzNC45LDU3LjgsNzksNjYuMSwxMjcuNSAgICBsMzYuOS02LjNDNDcwLjg1NCwxNjkuMyw0NDQuMzU0LDExOC4zLDQwMy45NTQsNzcuOHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
              {phoneNumber}
            </a>
          ))}
          {retailer.emails && retailer.emails.map((email, index) => (
            <a className="retailer-infobox__email-address" href={"mailto:" + email} key={index}>
              <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMzNC41IDMzNC41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMzQuNSAzMzQuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8cGF0aCBkPSJNMzMyLjc5NywxMy42OTljLTEuNDg5LTEuMzA2LTMuNjA4LTEuNjA5LTUuNDA0LTAuNzc2TDIuODkzLDE2My42OTVjLTEuNzQ3LDAuODEyLTIuODcyLDIuNTU1LTIuODkzLDQuNDgxICBzMS4wNjcsMy42OTMsMi43OTcsNC41NDJsOTEuODMzLDQ1LjA2OGMxLjY4NCwwLjgyNywzLjY5MiwwLjY0LDUuMTk2LTAuNDg0bDg5LjI4Ny02Ni43MzRsLTcwLjA5NCw3Mi4xICBjLTEsMS4wMjktMS41MSwyLjQzOC0xLjQsMy44NjhsNi45NzksOTAuODg5YzAuMTU1LDIuMDE0LDEuNTA1LDMuNzM2LDMuNDI0LDQuMzY3YzAuNTEzLDAuMTY4LDEuMDQsMC4yNSwxLjU2MSwwLjI1ICBjMS40MjksMCwyLjgxOS0wLjYxMywzLjc4Ni0xLjczM2w0OC43NDItNTYuNDgybDYwLjI1NSwyOC43OWMxLjMwOCwwLjYyNSwyLjgyMiwwLjY1MSw0LjE1MSwwLjA3MyAgYzEuMzI5LTAuNTc5LDIuMzQxLTEuNzA1LDIuNzc1LTMuMDg3TDMzNC4yNywxOC45NTZDMzM0Ljg2NCwxNy4wNjYsMzM0LjI4NSwxNS4wMDUsMzMyLjc5NywxMy42OTl6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
              {email}
            </a>
          ))}
          {retailer.fax && retailer.fax.map((faxNumber, index) => (
            <a className="retailer-infobox__fax" href={"fax:" + faxNumber} key={index}>
              <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE2IDE2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNiAxNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00LDEyLjV2M2g4di0zdi0ySDRWMTIuNXogTTUsMTEuNWg2djFINVYxMS41eiBNNSwxMy41aDZ2MUg1VjEzLjV6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBvbHlnb24gcG9pbnRzPSIxMiwzLjUgMTIsMC41IDQsMC41IDQsMy41IDQsNS41IDEyLDUuNSAgICIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0xNCwzLjVoLTF2MnYxSDN2LTF2LTJIMmMtMSwwLTIsMS0yLDJ2NWMwLDEsMSwyLDIsMmgxdi0ydi0xaDEwdjF2MmgxYzEsMCwyLTEsMi0ydi01ICAgIEMxNiw0LjUsMTUsMy41LDE0LDMuNXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
              {faxNumber}
            </a>
          ))}
        </div>
      </div>
    </InfoBox>
  )
}
