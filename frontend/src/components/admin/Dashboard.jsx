import React ,{useEffect}from "react";
import Sidebar from "./Sidebar.jsx";
import "./dashboard.css";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title, } from 'chart.js';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../redux/action/productAction.js";
import { getAllOrders } from "../../redux/action/orderAction.js";
import { getAllUsers } from "../../redux/action/userAction.js";
// import MetaData from "../layout/MetaData";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,);
const Dashboard = () => {
    
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState= {
    labels: ["Initial_Amount", "Amount_Earned"],
    datasets: [
      {
        label: "AMOUNT",
        data: [0,totalAmount],
        backgroundColor: "rgb(10, 22,19)",
        borderColor :"rgba(10,22, 19,.4)",
        hoverBackgroundColor: "rgb(156, 0, 60)",
    //  fill :false,
    //     tension :0,
        
      },
    ],
  };
  const doughnutState= {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        label: "Stocks",
        data: [ outOfStock,products.length-outOfStock],
        backgroundColor: ["rgba(197, 72, 49,0.2)","rgba(184, 97, 69,0.5)"],
        borderColor :["rgb(197, 72, 49)","rgb(97, 97, 69)"],
        hoverBackgroundColor: ["rgb(156, 0, 60)","rgb(130, 42,129)"],
        borderWidth:.5,
        
      },
    ],
  };



  return (
    <div className="dashboard">
      {/* <MetaData title="Dashboard - Admin Panel" /> */}
      <Sidebar />

       <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

      <div className="dashboardSummary">
          <div>
            <p>
              Total Amount
               <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
      
        <div className="lineChart">
          <Line data={lineState} />
        </div> 

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div> 
    </div>
  );
};

export default Dashboard;
