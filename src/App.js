import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import "./styling.css"
import React from 'react';
import HomePage from "./homepage/HomePage";
import Register from "./registration/Register";
import Login from "./login/Login";
import {UserProvider} from "./context/UserContext";
import Navbar from "./navbar/Navbar";
import Groups from "./groups/Groups";
import AddGroup from "./groups/AddGroup";
import GroupInfo from "./groups/GroupInfo";
import EditGroup from "./groups/EditGroup";
import AddBuilding from "./buildings/AddBuilding";
import SeeBuildings from "./buildings/SeeBuildings";
import AddAdministrator from "./addMembers/AddAdministrator";
import EditAdministrator from "./addMembers/EditAdministrator";
import AddPresident from "./addMembers/AddPresident";
import AddCensor from "./addMembers/AddCensor";
import EditPresident from "./addMembers/EditPresident";
import EditCensor from "./addMembers/EditCensor";
import AdminUserStatistics from "./admin-statistics/AdminUserStatistics";
import {MapContainer} from "./google-maps/Maps";

function App() {
  return (
    <>
        <UserProvider>
          <Router>
                <Navbar/>
                <Route exact path={'/'} component={HomePage}/>

                <Route exact path={'/register'} component={Register}/>
                <Route exact path={'/login'} component={Login}/>

                <Route exact path={'/groups'} component={Groups}/>
                <Route exact path={'/add-group'} component={AddGroup}/>
                <Route exact path={'/group'} component={GroupInfo}/>
                <Route exact path={'/edit-group'} component={EditGroup}/>

                <Route exact path={'/add-building'} component={AddBuilding}/>
                <Route exact path={'/see-buildings'} component={SeeBuildings}/>

                <Route exact path={'/add-administrator'} component={AddAdministrator}/>
                <Route exact path={'/edit-administrator'} component={EditAdministrator}/>
                <Route exact path={'/add-president'} component={AddPresident}/>
                <Route exact path={'/edit-president'} component={EditPresident}/>
                <Route exact path={'/add-censor'} component={AddCensor}/>
                <Route exact path={'/edit-censor'} component={EditCensor}/>

                <Route exact path={'/users-statistics'} component={AdminUserStatistics}/>

                <Route exact path={'/see-location'} component={MapContainer}/>


          </Router>
        </UserProvider>
    </>
  );
}

export default App;
