import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CircularUnderLoad() {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "rgb(204, 204, 204, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        }}
        >
            <CircularProgress disableShrink />
        </div>
    );
}