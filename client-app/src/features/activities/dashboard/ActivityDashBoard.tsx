import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: String) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: String) => void;  //一樣要增加返回無效void
    closeForm: () => void; //不須任何參數返回無效=void
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}


export default function ActivityDashboard({activities, selectedActivity, selectActivity ,
    cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting}: Props) {
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
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm} 
                />}
                {/* 當編輯模式才出現closeForm功能 並傳遞至activity=所選活動*/}
                {editMode &&
                <ActivityForm 
                    closeForm={closeForm} 
                    activity={selectedActivity} 
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />} 

            </Grid.Column>
        </Grid>
    )
}