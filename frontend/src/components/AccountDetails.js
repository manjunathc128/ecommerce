// import React, { useEffect, useState } from "react";
// import styles from "./AccountDetails.module.css";
// import { useAuthContext } from "../context/AuthContext/AuthContext";
// import { useNavigate } from "react-router-dom";

// const AccountDetails = () => {
//   const { username, email } = useAuthContext();
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     address: "",
//     phonenumber: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!username || !email) {
//       navigate("/account/signin");
//       return;
//     }

//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/profile?username=${username}&email=${email}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch user details");
//         }

//         const data = await response.json();
//         setUserDetails(data);
//         setFormData({
//           username: data.username,
//           email: data.email,
//           password: "",
//           confirmPassword: "",
//           address: data.address,
//           phonenumber: data.phonenumber,
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [username, email, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSave = async () => {
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/profile/update", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update user details");
//       }

//       const data = await response.json();
//       setUserDetails(data);
//       setIsEditing(false);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.accountDetails}>
//       <h2 className={styles.title}>Account Details</h2>
//       <div className={styles.accountInfo}>
//         <div className={styles.field}>
//           <strong>Username:</strong>
//           {isEditing ? (
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               className={styles.input}
//             />
//           ) : (
//             <span>{userDetails?.username}</span>
//           )}
//         </div>
//         <div className={styles.field}>
//           <strong>Email:</strong>
//           {isEditing ? (
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className={styles.input}
//             />
//           ) : (
//             <span>{userDetails?.email}</span>
//           )}
//         </div>
//         <div className={styles.field}>
//           <strong>Password:</strong>
//           {isEditing ? (
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className={styles.input}
//               placeholder="New Password"
//             />
//           ) : (
//             <span>••••••••</span>
//           )}
//         </div>
//         {isEditing && (
//           <div className={styles.field}>
//             <strong>Confirm Password:</strong>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               className={styles.input}
//               placeholder="Confirm New Password"
//             />
//           </div>
//         )}
//         <div className={styles.field}>
//           <strong>Address:</strong>
//           {isEditing ? (
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               className={styles.input}
//             />
//           ) : (
//             <span>{userDetails?.address}</span>
//           )}
//         </div>
//         <div className={styles.field}>
//           <strong>Phone Number:</strong>
//           {isEditing ? (
//             <input
//               type="text"
//               name="phonenumber"
//               value={formData.phonenumber}
//               onChange={handleInputChange}
//               className={styles.input}
//             />
//           ) : (
//             <span>{userDetails?.phonenumber}</span>
//           )}
//         </div>
//       </div>

//       <div className={styles.actions}>
//         {isEditing ? (
//           <>
//             <button onClick={handleSave} className={styles.button}>
//               Save
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className={styles.buttonSecondary}
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button onClick={() => setIsEditing(true)} className={styles.button}>
//             Edit
//           </button>
//         )}
//       </div>

//       <h3 className={styles.subtitle}>Orders</h3>
//       {userDetails?.orders?.length > 0 ? (
//         <ul className={styles.list}>
//           {userDetails.orders.map((order, index) => (
//             <li key={index} className={styles.listItem}>
//               <div className={styles.listItemField}>
//                 Product ID: {order.product}
//               </div>
//               <div className={styles.listItemField}>
//                 Quantity: {order.quantity}
//               </div>
//               <div className={styles.listItemField}>
//                 Purchased At: {new Date(order.purchasedAt).toLocaleString()}
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div className={styles.noData}>No orders found.</div>
//       )}

//       <h3 className={styles.subtitle}>Cart</h3>
//       {userDetails?.cart?.length > 0 ? (
//         <ul className={styles.list}>
//           {userDetails.cart.map((item, index) => (
//             <li key={index} className={styles.listItem}>
//               <div className={styles.listItemField}>
//                 Product ID: {item.product}
//               </div>
//               <div className={styles.listItemField}>
//                 Quantity: {item.quantity}
//               </div>
//               <div className={styles.listItemField}>
//                 Added At: {new Date(item.addedAt).toLocaleString()}
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div className={styles.noData}>Your cart is empty.</div>
//       )}
//     </div>
//   );
// };

// export default AccountDetails;

import React, { useEffect, useState } from "react";
import styles from "./AccountDetails.module.css";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const { username, email, dispatch } = useAuthContext();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phonenumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || !email) {
      navigate("/account/signin");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/profile?username=${username}&email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUserDetails(data);
        setFormData({
          username: data.username,
          email: data.email,
          password: "",
          confirmPassword: "",
          address: data.address,
          phonenumber: data.phonenumber,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username, email, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      const data = await response.json();

      // Update local state with the response data
      setUserDetails({
        ...userDetails,
        username: data.user.username,
        email: data.user.email,
        address: data.user.address,
        phonenumber: data.user.phonenumber,
      });

      // Reset form data (except password fields)
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      });

      setIsEditing(false);
      setError(null);
      dispatch({
        type: "UPDATE",
        payload: { username: data.user.username, email: data.user.email },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.accountDetails}>
      <h2 className={styles.title}>Account Details</h2>
      <div className={styles.accountInfo}>
        <div className={styles.field}>
          <strong>Username:</strong>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles.input}
            />
          ) : (
            <span>{userDetails?.username}</span>
          )}
        </div>
        <div className={styles.field}>
          <strong>Email:</strong>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
            />
          ) : (
            <span>{userDetails?.email}</span>
          )}
        </div>
        <div className={styles.field}>
          <strong>Password:</strong>
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="New Password"
            />
          ) : (
            <span>••••••••</span>
          )}
        </div>
        {isEditing && (
          <div className={styles.field}>
            <strong>Confirm Password:</strong>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Confirm New Password"
            />
          </div>
        )}
        <div className={styles.field}>
          <strong>Address:</strong>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={styles.input}
            />
          ) : (
            <span>{userDetails?.address}</span>
          )}
        </div>
        <div className={styles.field}>
          <strong>Phone Number:</strong>
          {isEditing ? (
            <input
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleInputChange}
              className={styles.input}
            />
          ) : (
            <span>{userDetails?.phonenumber}</span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <button onClick={handleSave} className={styles.button}>
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={styles.buttonSecondary}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className={styles.button}>
            Edit
          </button>
        )}
      </div>

      <h3 className={styles.subtitle}>Orders</h3>
      {userDetails?.orders?.length > 0 ? (
        <ul className={styles.list}>
          {userDetails.orders.map((order, index) => (
            <li key={index} className={styles.listItem}>
              <div className={styles.listItemField}>
                Product ID: {order.product}
              </div>
              <div className={styles.listItemField}>
                Quantity: {order.quantity}
              </div>
              <div className={styles.listItemField}>
                Purchased At: {new Date(order.purchasedAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noData}>No orders found.</div>
      )}

      <h3 className={styles.subtitle}>Cart</h3>
      {userDetails?.cart?.length > 0 ? (
        <ul className={styles.list}>
          {userDetails.cart.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <div className={styles.listItemField}>
                Product ID: {item.product}
              </div>
              <div className={styles.listItemField}>
                Quantity: {item.quantity}
              </div>
              <div className={styles.listItemField}>
                Added At: {new Date(item.addedAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noData}>Your cart is empty.</div>
      )}
    </div>
  );
};

export default AccountDetails;
