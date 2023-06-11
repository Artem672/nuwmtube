import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store";
import './ServerError.css'

export default observer(function ServerError() {
    const {commonStore} = useStore();
    const {error} = commonStore;
    return (
        <div className="container">
            <h1>Server Error</h1>
            <h5 className="sub-header" style={{color: 'red'}}>
                {error?.message}
            </h5>
            {error?.details && (
                <div className="segment">
                    <h4 className="sub-header" style={{color: 'teal'}}>
                        Stack trace
                    </h4>
                    <code style={{marginTop: '10px'}}>{error.details}</code>
                </div>
            )}
        </div>
    )
})