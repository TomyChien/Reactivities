import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer( function ActivityList() {

    const {activityStore} = useStore();

    const {deleteActivity,loading, activitiesByDate} = activityStore;


    //增加target初始化狀態
    const [target, setTarget] = useState('');
    
    //增加控制Delete,event可以any但容易觸發改為
    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name); 
        deleteActivity(id);
    }



    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        {/* <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={activity.id} //增加name屬性控制那些Button才要重載
                                    loading={loading && target=== activity.id} 
                                    // onClick={() => deleteActivity(activity.id)} 
                                    onClick={(event) => handleActivityDelete(event,activity.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>

    )

})