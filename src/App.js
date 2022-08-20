import React, { useEffect, useState, useContext } from "react";
import Home from "./components/accueil/Home";
import Account from "./components/account/Account";
import My from "./components/my articales/My";
import MainConf from "./components/conference/MainConf";
import CreateConf from "./components/conference/CreateConf";
import EditConf from "./components/conference/EditConf";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Conf from "./components/conference/Conf";
import Login2 from "./pages/Login2";
import Account2 from "./pages/Account2";
import PendingArticlesTable from "./components/articles/PendingArticlesTable";
import ReviewResultTable from "./components/articles/ReviewResultTable";
import AcceptedArticlesTable from "./components/articles/AcceptedArticlesTable";
import AssignArticles from "./components/articles/AssignArticles";
import Form from "./pages/Form";
import Admin from "./pages/Admin";
import AdminMain from "./pages/AdminMain";
import Layout from "./components/Layout";
import Confirm from "./pages/Confirm";
import RequireAuth from "./RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import ApplyForm from "./components/conference/ApplyForm";
import EditArticle from "./components/myarticles/EditArticle";
import { socket, SocketContext } from "./socket";
import { notifications } from "./data";
import Edit_art from "./components/edit_Article/Edit_art";
import EditFromRev from "./components/editfromrev/EditFromRev";
import Raport from "./components/raport/Raport";
import Check from "./components/Signup/Check";
import AuthorThnx from "./components/AuthorThnx";

function App() {
  // const socket = useContext(SocketContext);
  const [not, setNot] = useState(notifications);

  const [bool, setBool] = useState(false);
  //   socket.onmessage=function(e){
  //     console.log(e)
  //     const obj = JSON.parse(e["data"]);

  // for (let i = 0; i < obj.notifications.length; i++) {
  // console.log("here");
  // notifications.push(obj.notifications[i]);
  // console.log(notifications);
  // }
  // setNot(obj.notifications);
  // }
  //   useEffect(()=>{

  //   },[socket])
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route element={<RequireAuth bool={bool} />}>
            <Route path="/account" element={<Account />} />
            <Route path="/report/:id" element={<Raport/>} />
            <Route path="/account/EditArticle/:id" element={<EditArticle />} />
            <Route path="/pending/:id" element={<PendingArticlesTable />} />
            <Route path="/reviewing/:id" element={<ReviewResultTable />} />
            <Route path="/accepted/:id" element={<AcceptedArticlesTable />} />
            <Route path="/table/:id" element={<AssignArticles />} />
            <Route path="My" element={<My />} />
            <Route path="/Conf/:id/ApplyForm" element={<ApplyForm />} />
            <Route path="CreateConf" element={<CreateConf />} />
            <Route path="/EditConf/:id" element={<EditConf />} />
            <Route path="/Edit_art/:id" element={<Edit_art />} />
            <Route path="/EditFromRev/:id" element={<EditFromRev />} />
            

          </Route>

          <Route element={<RequireAuth bool={!bool} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="Conf/:id" element={<Conf />} />

          <Route path="/confirm" element={<Confirm />} />
          <Route path="/signup" element={<Form />} />
          <Route path="/login" element={<Login2 />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="MainConf" element={<MainConf />} />
          <Route path="/check" element={<Check />} />
          <Route path="/author" element={<AuthorThnx />} />

          {/* <Route path="/account" element={<Account/>}/> */}
        </Route>
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
