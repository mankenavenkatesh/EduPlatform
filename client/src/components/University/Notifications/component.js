import React, { Component } from 'react';
class Notifications extends Component {
    state = {}
    render() {
        return (<div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Registration No.</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Profile</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1.</td>
                        <td>10251A0494</td>
                        <td>Mani Maukthika</td>
                        <td>Verify Profile</td>
                        <td><a href="/uni-conveyance">View Profile</a></td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>10262B0598</td>
                        <td>Mary Moe</td>
                        <td>Certifcate Pending</td>
                        <td><a href="#">View Profile</a></td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>1027G0704</td>
                        <td>Sarang Parikh</td>
                        <td>Approve Profile</td>
                        <td><a href="#">View Profile</a></td>
                    </tr>
                </tbody>
            </table>
        </div>);
    }
}

export default Notifications;