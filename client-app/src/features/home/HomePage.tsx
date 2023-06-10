import {Container, Header, Segment, Image, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead' style={{background: 'transparent'}}>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/play.png' alt='logo' style={{marginBottom: 12}}/>
                    Videos
                </Header>
                <Header as='h2' inverted content='Welcome to Videos'/>
                <Button as={Link} to='/videos' size='huge' inverted>
                    Take me to the Videos!
                </Button>
            </Container>
        </Segment>
    )
}