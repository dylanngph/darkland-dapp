import React from 'react'
import {Svg, SvgProps} from '@pancakeswap/uikit'

const GradientLogo: React.FC<SvgProps> = (props) => {
  return (
    // <Svg viewBox="0 0 48 48" {...props}>
    //   <path
    //     fillRule="evenodd"
    //     clipRule="evenodd"
    //     d="M14.9024 0C10.8947 0 7.87179 3.60289 8.60749 7.50271L10.3484 16.7306C4.45101 19.3061 0 23.7533 0 29.3333V32.7273C0 37.3405 3.08306 41.2029 7.39317 43.8102C11.7369 46.4379 17.6132 48 24 48C30.3868 48 36.2631 46.4379 40.6068 43.8102C44.9169 41.2029 48 37.3405 48 32.7273V29.3333C48 23.7236 43.5028 19.2593 37.5552 16.6889L39.2882 7.50271C40.0239 3.6029 37.001 0 32.9933 0C29.4567 0 26.5896 2.83809 26.5896 6.33904V14.147C25.7386 14.0899 24.8746 14.0606 24 14.0606C23.0897 14.0606 22.1908 14.0923 21.3061 14.1541V6.33904C21.3061 2.83809 18.4391 0 14.9024 0ZM17.8776 28.3637C17.8776 30.372 16.7811 32 15.4286 32C14.0761 32 12.9796 30.372 12.9796 28.3637C12.9796 26.3554 14.0761 24.7273 15.4286 24.7273C16.7811 24.7273 17.8776 26.3554 17.8776 28.3637ZM34.7757 28.3637C34.7757 30.372 33.6792 32 32.3267 32C30.9742 32 29.8777 30.372 29.8777 28.3637C29.8777 26.3554 30.9742 24.7273 32.3267 24.7273C33.6792 24.7273 34.7757 26.3554 34.7757 28.3637Z"
    //     fill="url(#paint0_linear)"
    //   />
    //   <defs>
    //     <linearGradient id="paint0_linear" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
    //       <stop stopColor="#7645D9" />
    //       <stop offset="1" stopColor="#5121B1" />
    //     </linearGradient>
    //   </defs>
    // </Svg>

    <Svg viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.84199 5.00181C5.35647 2.40193 7.35138 0 9.9962 0C12.3302 0 14.2222 1.89206 14.2222 4.22603V9.43607C14.806 9.39487 15.3992 9.37374 16 9.37374C16.5772 9.37374 17.1474 9.39324 17.709 9.43131V4.22603C17.709 1.89206 19.601 0 21.935 0C24.5798 0 26.5747 2.40193 26.0892 5.00181L24.9456 11.1259C28.8705 12.8395 31.8384 15.8157 31.8384 19.5556V21.8182C31.8384 24.8936 29.8038 27.4686 26.9594 29.2068C24.0928 30.9586 20.2149 32 16 32C11.7851 32 7.90719 30.9586 5.04062 29.2068C2.19624 27.4686 0.161621 24.8936 0.161621 21.8182V19.5556C0.161621 15.8355 3.09899 12.8708 6.99084 11.1538L5.84199 5.00181ZM23.48 11.9305L24.8183 4.76446C25.1552 2.96 23.7707 1.29293 21.935 1.29293C20.3151 1.29293 19.0019 2.60612 19.0019 4.22603V10.8562C18.5774 10.8018 18.1462 10.7586 17.709 10.7274C17.1484 10.6873 16.5782 10.6667 16 10.6667C15.3982 10.6667 14.8049 10.689 14.2222 10.7324C13.785 10.765 13.3537 10.8094 12.9293 10.8651V4.22603C12.9293 2.60612 11.6161 1.29293 9.9962 1.29293C8.16055 1.29293 6.77597 2.96 7.11295 4.76446L8.45562 11.9543C4.25822 13.5135 1.45455 16.3344 1.45455 19.5556V21.8182C1.45455 26.7274 7.96677 30.7071 16 30.7071C24.0332 30.7071 30.5455 26.7274 30.5455 21.8182V19.5556C30.5455 16.318 27.7131 13.4847 23.48 11.9305Z"
        fill="#633001"
      />
      <path
        d="M30.5455 21.8183C30.5455 26.7275 24.0333 30.7072 16 30.7072C7.96681 30.7072 1.45459 26.7275 1.45459 21.8183V19.5557H30.5455V21.8183Z"
        fill="#FEDC90"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.11298 4.7645C6.77601 2.96004 8.16058 1.29297 9.99624 1.29297C11.6161 1.29297 12.9293 2.60616 12.9293 4.22607V10.8652C13.9192 10.7351 14.9466 10.6667 16 10.6667C17.0291 10.6667 18.0333 10.732 19.0019 10.8562V4.22607C19.0019 2.60616 20.3151 1.29297 21.935 1.29297C23.7707 1.29297 25.1553 2.96004 24.8183 4.7645L23.4801 11.9306C27.7131 13.4847 30.5455 16.318 30.5455 19.5556C30.5455 24.4648 24.0333 28.4445 16 28.4445C7.96681 28.4445 1.45459 24.4648 1.45459 19.5556C1.45459 16.3345 4.25826 13.5135 8.45566 11.9543L7.11298 4.7645Z"
        fill="#D1884F"
      />
      <path
        className="left-eye"
        d="M11.9595 18.9091C11.9595 20.248 11.2359 21.3333 10.3433 21.3333C9.45075 21.3333 8.72717 20.248 8.72717 18.9091C8.72717 17.5702 9.45075 16.4849 10.3433 16.4849C11.2359 16.4849 11.9595 17.5702 11.9595 18.9091Z"
        fill="#633001"
      />
      <path
        className="right-eye"
        d="M23.1111 18.9091C23.1111 20.248 22.3875 21.3333 21.4949 21.3333C20.6024 21.3333 19.8788 20.248 19.8788 18.9091C19.8788 17.5702 20.6024 16.4849 21.4949 16.4849C22.3875 16.4849 23.1111 17.5702 23.1111 18.9091Z"
        fill="#633001"
      />
    </Svg>
  )
}

export default GradientLogo
