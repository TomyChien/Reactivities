import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';



export default observer( function ActivityDashboard() {

    const {activityStore}=useStore();

    const {selectedActivity,editMode}=activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                {/* <List>
                        {activities.map(activity => (
                            <List.Item key={activity.id}>
                                {activity.title}
                            </List.Item>
                        )

                    )}
                </List> */}
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails />}
                {/* 當編輯模式才出現closeForm功能 並傳遞至activity=所選活動*/}
                {editMode &&
                <ActivityForm />} 

            </Grid.Column>
        </Grid>
    )
})