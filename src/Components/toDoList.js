import React from "react";

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const toDoList = (props) => {
const {t, removeTask, onChnageToggle, onChnageCheckBox} = props
    return (
            <div className="show-task">
                <div>
                    <Checkbox {...label} 
                    onClick={() =>{onChnageCheckBox(t)}}
                    />
                    {t.title}
                </div>
                <div></div>
                <div>
                    <Button
                        variant="contained"
                        className="buttom-detial"
                        onClick={() => {
                            onChnageToggle(t)
                        }}
                    >
                        Detail
                    </Button>
                    <Button
                        variant="contained"
                        className="button-remove"
                        onClick={() => {
                            removeTask(t)
                        }}
                    >
                        Remove
                    </Button>
                </div>
            </div>
            )
}

export default toDoList;