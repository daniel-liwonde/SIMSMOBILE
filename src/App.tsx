import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Register  from './pages/Register';
import Menu from './pages/Menu';
import { DataProvider } from './pages/context/UserContext';
import Details from './pages/Details';
import Intro from './pages/Intro';
import Welcome from './components/Welcome';
import FeesInfo from './components/FeesInfo';
import FeesInfoIntro from './components/FeesInfoIntro';
import Programmes from './components/Programmes';
import OnlineApplication from './pages/OnlineApplication';
import Notifications_details from './pages/Notifications_details';
setupIonicReact(
  {
    mode: 'ios'
  }
);
const App: React.FC = () => (
  <IonApp>
    <DataProvider>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/Register">
          <Register />
        </Route>
        
        <Route path="/app">
           <Menu />
        </Route>
        <Route path="/info">
           <Intro/>
           </Route>
           <Route path="/fees">
           <FeesInfoIntro/>
           </Route>
           <Route path="/courses">
           <Programmes />
           </Route>
           <Route path="/applicationform">
           <OnlineApplication />
           </Route>
      </IonRouterOutlet>
    </IonReactRouter>
    </DataProvider>
  </IonApp>
);

export default App;
