import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: ()=>void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}


//activity: selectedActivity =>activity使用selectedActivity名稱
export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    //當我們use state hook時給一個變數名=activity 及活動名稱=setActivity
    const [activity, setActivity] = useState(initialState); //將initialState作為初始值傳遞

    //提交函數
    function handleSubmit(){
        // console.log(activity);
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        //建構值name,value = event.target
        const {name, value} = event.target;

        //傳播現有的activity用...activity
        //定位與名稱匹配的屬性[name]: value,例如=> title:'test'
        setActivity({...activity, [name]: value})

    }

    

    return(
        <Segment clearing>
            {/* 設定Form提交呼叫handleSubmit */}
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />

                
            </Form>
        </Segment>
    )
}