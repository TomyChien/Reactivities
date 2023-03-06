import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';  //載入Activity物件定義
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashBoard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import userEvent from '@testing-library/user-event';
import LoadingComponent from './LoadingComponet';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);  //增加EditMode狀態並不需要指定類型
  const [loading, setLoading] = useState(true);   //初始化loading=true
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // axios.get<Activity[]>('http://localhost:5000/api/activities')
    // 改寫呼叫agent.Activities.list()取代
    agent.Activities.list()
    .then(response => {
        // console.log(response);
        // setActivities(response.data);
        // 日期資料只取T字元之前的年月日資料2022-10-22
        let activities: Activity[] =[]; //宣告activities變數為Activity空陣列
        response.forEach(activity => {  //針對response資料逐筆迴圈
          activity.date = activity.date.split('T')[0]; //比對日期資料
          activities.push(activity);
        })
        // setActivities(response);
        setActivities(activities);
        setLoading(false);
      })
  }, [])

  function handleSelectActivity(id:String){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: String) {    //id? 為可選參數
    //id ? =檢查id是否有任何內容
    // 有資料時執行handleSelectActivity(id)
    // 無資料時執行handleCancelSelectActivity()
    id ?  handleSelectActivity(id) : handleCancelSelectActivity();
    //設定為編輯模式
    setEditMode(true);
  }


  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    //增加submitting控制
    setSubmitting(true);
    
    //如果有activity.id資料時進行資料更新
    if(activity.id) {
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);

      })
    }else { //沒有activity.id時進行資料新增
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }


    // activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    //   : setActivities([...activities, {...activity, id: uuid()}]);

    // setEditMode(false);
    // setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){

    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);

    })

    //刪除瀏覽器DOM
    // setActivities([...activities.filter(x => x.id !== id)])

  }

  if (loading) return <LoadingComponent />


  return (
    
    <Fragment> {/*空白標籤 = <> </> */}
      {/* <Header as='h2' icon='users' content='Reactivities' /> */}
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop:'6em'}}>
        
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>

      {/* <header className="App-header">
        <List>
          {activities.map(activity => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>

        <Button content='test' />
        {ducks.map(duck => (
          <DuckItem duck={duck} key={duck.name}/>
        ))}
        <p>
          Edit <code>src/App.tsx</code> and save to reload OK.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </Fragment>
  );
}

export default App;
