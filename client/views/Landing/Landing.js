import React from 'react';
import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';


class Landing extends React.Component {
    render() {
        return (
            <Layout>
                <Time />
            </Layout>
        );
    }
}

export default Landing;
