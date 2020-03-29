import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CodeTemplate from '../components/code/CodeTemplate';
import CodeLogin from '../containers/auth/CodeLogin';

interface CodeLoginPageProps extends RouteComponentProps {}
const CodeLoginPage: React.FC<CodeLoginPageProps> = ({ location, history }) => {
  return (
    <CodeTemplate>
      <CodeLogin location={location} history={history} />
    </CodeTemplate>
  );
};

export default CodeLoginPage;
