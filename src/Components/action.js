import React from "react"
import Button from '@mui/material/Button';

const action = ({ removeAction }) => {    return (
        <>
            <div className="action">
                <div className="bulk-action"> Bulk Action:</div>
                <div className="action-button">
                    <div>
                        <Button variant="contained" className="action-button-done">Done</Button>
                    </div>
                    <div>
                        <Button variant="contained" 
                        className="action-button-remove"
                        onClick={() => removeAction()}
                        >Remove</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default action
