import { Fragment, useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashBoard';
import LoadingComponent from './LoadingComponet';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  //Mxbox store
  const {titleStore} = useStore();
  const {activityStore} = useStore()

  useEffect(() => {
    
    //用mxbox store架構重構取代原本 .this(response => {...}
    activityStore.loadActivities();

  }, [activityStore])


  // if (loading) return <LoadingComponent />
  if (activityStore.loadingInitial) return <LoadingComponent />
  return (
    
    <Fragment> {/*空白標籤 = <> </> */}
      <NavBar />
      <Container style={{marginTop:'6em'}}>
        <h2>{titleStore.title}</h2>
        <Button content='Add Title!' positive onClick={titleStore.setTitle} />
        <ActivityDashboard  />
      </Container>
    </Fragment>
  );
}

export default observer(App);
