import React from 'react';
import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import Weather from '../../components/Weather/Weather';


class Landing extends React.PureComponent {
    render() {
        return (
            <Layout>
                <Time />
                <Weather />
            </Layout>
        );
    }
}

export default Landing;
