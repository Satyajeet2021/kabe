import React, { PropTypes } from 'react'

const LoadingSpinner = () => (
    <div class="animation-container">
    <div class="square">
        <div class="line line-x one"></div>
            <div class="line line-y two"></div>
            <div class="line line-x three"></div>
            <div class="line line-y four"></div>
    </div>
    </div>
)

export default LoadingSpinner