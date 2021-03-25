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
import Maps from "./google-maps/Maps";
import PendingRequestsList from "./user-access/PendingRequestsList";
import AddNewTicket from "./tickets/AddNewTicket";
import SeePolls from "./poll/SeePolls";
import AddPoll from "./poll/AddPoll";
import Results from "./poll/Results";
import TicketsAdministratorAndPersonalView from "./tickets/TicketsAdministratorAndPersonalView";
import ListOfServiceProviders from "./service.providers/ListOfServiceProviders";
import SeePendingTickets from "./tickets.provider.view/SeePendingTickets";
import OfferDetails from "./offers/OfferDetails";
import SeeAssignedServiceOfferDetails from "./tickets/SeeAssignedServiceOfferDetails";
import ReviewDetails from "./service.providers/ReviewDetails";
import MyBuilding from "./user-view/MyBuilding";
import Polls from "./user-view/Polls";
import Vote from "./user-view/Vote";


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

                <Route exact path={'/pending-requests'} component={PendingRequestsList}/>

                <Route exact path={'/add-ticket'} component={AddNewTicket}/>

                <Route exact path={'/add-poll'} component={AddPoll}/>
                <Route exact path={'/see-polls'} component={SeePolls}/>
                <Route exact path={'/see-poll-result'} component={Results}/>

                <Route exact path={'/see-offers'} component={TicketsAdministratorAndPersonalView}/>

                <Route exact path={'/service-providers'} component={ListOfServiceProviders}/>
                <Route exact path={'/see-tickets'} component={SeePendingTickets}/>

                <Route exact path={'/pending-offers'} component={OfferDetails}/>
                <Route exact path={'/assigned-service-provider'} component={SeeAssignedServiceOfferDetails}/>
                <Route exact path={'/review-details'} component={ReviewDetails}/>

                <Route exact path={'/see-location'} component={Maps}/>

                <Route exact path={'/my-building'} component={MyBuilding}/>
                <Route exact path={'/polls'} component={Polls}/>
                <Route exact path={'/vote'} component={Vote}/>


          </Router>
        </UserProvider>
    </>
  );
}

export default App;
