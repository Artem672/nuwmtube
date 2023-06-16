import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {Link} from "react-router-dom";
import {Field, FieldProps, Form, Formik} from "formik";
import MyTextAreaInput from "../../../app/common/form/MyTextArea";
import {Button, Comment, Header, Loader, Segment} from "semantic-ui-react";
import './Chat.css'
import * as Yup from 'yup'
import {formatDistanceToNow} from "date-fns";

interface Props {
    videoId: string;
}

export default observer(function Chat({videoId}: Props) {
    const {commentStore} = useStore();

    useEffect(() => {
        if (videoId) {
            commentStore.createHubConnection(videoId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, videoId]);

    return (
        <div className="chat">
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='blue'
                style={{border: 'none', width: '800px'}}
            ><Header style={{fontSize: 14}}>Chat about the video</Header></Segment>
            <Segment attached clearing>
                <Formik
                    onSubmit={(values, {resetForm}) =>
                        commentStore.addComment(values).then(() => resetForm())}
                    initialValues={{body: ''}}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                >
                    {({isSubmitting, isValid, handleSubmit}) => (
                        <Form className='ui form'>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{position: 'relative'}}>
                                        <Loader active={isSubmitting}/>
                                        <textarea style={{fontSize: 14}}
                                                  placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                                                  rows={2}
                                                  {...props.field}
                                                  onKeyPress={e => {
                                                      if (e.key == 'Enter' && e.shiftKey) {
                                                          return;
                                                      }
                                                      if (e.key == 'Enter' && !e.shiftKey) {
                                                          e.preventDefault();
                                                          isValid && handleSubmit();
                                                      }
                                                  }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
                <Comment.Group style={{fontSize: 14}}>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id} style={{padding: 10}}>
                            <Comment.Avatar src={comment.image || '/assets/profile.png'}/>
                            <Comment.Content>
                                <Comment.Content style={{display: 'flex', alignItems: 'center'}}>
                                    <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                                        {comment.displayName}
                                    </Comment.Author>
                                    <Comment.Metadata>
                                        <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                                    </Comment.Metadata>
                                </Comment.Content>
                                <Comment.Text style={{whiteSpace: 'pre-wrap'}}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
            </Segment>


        </div>
    )
})