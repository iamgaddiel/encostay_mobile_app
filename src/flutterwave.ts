// import { useFlutterwave } from 'flutterwave-react-v3';


export const flutterwaveConfig = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: `${new Date().getDate()}`,
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };




//  import React from 'react';
// import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

// export default function App() {
//   const config = {
//     public_key: 'FLWPUBK-**************************-X',
//     tx_ref: Date.now(),
//     amount: 100,
//     currency: 'NGN',
//     payment_options: 'card,mobilemoney,ussd',
//     customer: {
//       email: 'user@gmail.com',
//        phone_number: '070********',
//       name: 'john doe',
//     },
//     customizations: {
//       title: 'my Payment Title',
//       description: 'Payment for items in cart',
//       logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
//     },
//   };

//   const handleFlutterPayment = useFlutterwave(config);

//   return (
//     <div className="App">
//      <h1>Hello Test user</h1>

//       <button
//         onClick={() => {
//           handleFlutterPayment({
//             callback: (response) => {
//                console.log(response);
//             },
//             onClose: () => {},
//           });
//         }}
//       >
//         Payment with React hooks
//       </button>
//     </div>
//   );
// }